import { PrismaClient } from "@prisma/client";
import { DEMO_CATEGORIES, DEMO_LISTINGS, DEMO_USERS } from "../src/lib/demoData";

const prisma = new PrismaClient();

async function main() {
  await prisma.paymentTransaction.deleteMany().catch(() => {});
  await prisma.kycVerification.deleteMany().catch(() => {});
  await prisma.savedListing.deleteMany().catch(() => {});
  await prisma.supportTicket.deleteMany().catch(() => {});
  await prisma.notification.deleteMany().catch(() => {});
  await prisma.adReport.deleteMany().catch(() => {});
  await prisma.message.deleteMany().catch(() => {});
  await prisma.review.deleteMany().catch(() => {});
  await prisma.listing.deleteMany().catch(() => {});
  await prisma.category.deleteMany().catch(() => {});
  for (const user of Object.values(DEMO_USERS)) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
      },
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        isVerified: user.id === "user-ada-101",
        isBanned: false,
        passwordHash:
          user.passwordHash ||
          "$2b$10$uX/eSItR0lvQzqcpP0PsyuodlKdts79Pp3iHxNtxWfaYUw5dEvKiy",
      },
    });
  }

  for (const cat of DEMO_CATEGORIES) {
    await prisma.category.create({
      data: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
      },
    });
  }

  for (const item of DEMO_LISTINGS) {
    await prisma.listing.create({
      data: {
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        location: item.location,
        condition: item.condition,
        imageUrl: item.imageUrl,
        status: item.status || "ACTIVE",
        views: item.views || 10,
        boostTier: item.boostTier || null,
        spareDetails: item.spareDetails || null,
        sellerId: item.sellerId,
        categoryId: item.categoryId,
      },
    });
  }

  await prisma.adReport.createMany({
    data: [
      {
        id: "rep-001",
        reason: "Suspected Counterfeit / Fake Item",
        details:
          "Seller claims this is original Apple iPhone 14 Pro Max but photos show mismatched font and bezel.",
        status: "PENDING",
        listingId: "demo-listing-3",
        reporterId: "user-chidi-102",
      },
      {
        id: "rep-002",
        reason: "Unrealistic Price / Advance Payment Request",
        details:
          "Seller demanded upfront ₦50,000 reservation fee before inspection.",
        status: "PENDING",
        listingId: "demo-listing-1",
        reporterId: "user-ada-101",
      },
      {
        id: "rep-003",
        reason: "Wrong Category / Spam Keyword Stuffing",
        details: "Listed with duplicate keywords across multiple categories.",
        status: "RESOLVED",
        listingId: "demo-listing-5",
        reporterId: "user-ada-101",
      },
    ],
  });

  await prisma.review.createMany({
    data: [
      {
        id: "rev-1",
        rating: 5,
        comment:
          "Very honest and reliable seller! The item was exactly as described. We met at Ikeja City Mall.",
        buyerId: "user-chidi-102",
        sellerId: "user-ada-101",
        listingId: "demo-listing-2",
      },
      {
        id: "rev-2",
        rating: 5,
        comment:
          "Quick transaction and courteous communication. Tested everything on the spot and made transfer.",
        buyerId: "user-ada-101",
        sellerId: "user-chidi-102",
        listingId: "demo-listing-1",
      },
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        id: "msg-seed-1",
        text: "Hello! Is this Toyota Camry 2018 still available for inspection in Ikeja?",
        read: true,
        senderId: "user-ada-101",
        receiverId: "user-chidi-102",
        listingId: "demo-listing-1",
      },
      {
        id: "msg-seed-2",
        text: "Yes, it is available! You can inspect it today at Ikeja City Mall parking lot.",
        read: false,
        senderId: "user-chidi-102",
        receiverId: "user-ada-101",
        listingId: "demo-listing-1",
      },
    ],
  });

  await prisma.notification.create({
    data: {
      id: "notif-seed-1",
      title: "New reply from Chidi Eze",
      text: "Yes, it is available! You can inspect it today at Ikeja City Mall parking lot.",
      type: "message",
      listingId: "demo-listing-1",
      listingTitle: "Toyota Camry 2018 — tokunbo, low mileage",
      read: false,
      userId: "user-ada-101",
    },
  });

  await prisma.supportTicket.create({
    data: {
      id: "tkt-seed-1",
      name: "Tunde Adeyemi",
      email: "tunde@example.com",
      phone: "0803 456 7890",
      subject: "Ad Posting & Promotion",
      message: "Hello, I boosted my Toyota Highlander listing with Paystack and want to confirm my 7-day Top Ad duration.",
      status: "OPEN",
    },
  });

  await prisma.kycVerification.create({
    data: {
      id: "kyc-seed-1",
      businessName: "Chidi Motors & Auto Imports Ltd",
      documentType: "CAC Certificate",
      documentNumber: "RC-1948204",
      documentUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      status: "PENDING",
      userId: "user-chidi-102",
    },
  });

  await prisma.paymentTransaction.createMany({
    data: [
      {
        id: "tx-seed-1",
        reference: "SQ-PAY-894021",
        planName: "TOP AD (7 Days)",
        amount: 3500,
        gateway: "PAYSTACK",
        status: "SUCCESS",
        listingId: "demo-listing-1",
        userId: "user-chidi-102",
      },
      {
        id: "tx-seed-2",
        reference: "SQ-FLW-541098",
        planName: "URGENT SALE (3 Days)",
        amount: 2000,
        gateway: "FLUTTERWAVE",
        status: "SUCCESS",
        listingId: "demo-listing-3",
        userId: "user-ada-101",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
