import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  { name: "Vehicles", slug: "vehicles", icon: "🚗" },
  { name: "Property", slug: "property", icon: "🏠" },
  { name: "Phones & Tablets", slug: "phones-tablets", icon: "📱" },
  { name: "Electronics", slug: "electronics", icon: "📺" },
  { name: "Home, Furniture & Appliances", slug: "home", icon: "🛋️" },
  { name: "Fashion", slug: "fashion", icon: "👗" },
  { name: "Beauty & Personal Care", slug: "beauty", icon: "💄" },
  { name: "Sports, Arts & Outdoors", slug: "sports", icon: "⚽" },
  { name: "Jobs", slug: "jobs", icon: "💼" },
  { name: "Services", slug: "services", icon: "🔧" },
  { name: "Pets", slug: "pets", icon: "🐕" },
  { name: "Agriculture & Food", slug: "agriculture", icon: "🌾" },
  { name: "Babies & Kids", slug: "babies-kids", icon: "🍼" },
  { name: "Commercial Equipment & Tools", slug: "commercial-equipment", icon: "🏭" },
  { name: "Repair & Construction", slug: "repair-construction", icon: "🏗️" },
  { name: "Business & Industry", slug: "business-industry", icon: "🏢" },
];

type SeedListing = {
  title: string;
  description: string;
  price: number;
  location: string;
  condition: string;
  imageUrl: string;
  category: string;
  seller: "ada" | "chidi";
  spareDetails?: string;
};

const listings: SeedListing[] = [
  {
    title: "Toyota Camry 2018 — tokunbo, low mileage",
    description:
      "Clean tokunbo Camry. AC ice cold, engine and gearbox sound. First owner in Nigeria. Inspection welcome in Ikeja.",
    price: 14500000,
    location: "Lagos, Ikeja",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    category: "vehicles",
    seller: "chidi",
  },
  {
    title: "Honda Accord 2015 EX-L",
    description:
      "Well maintained Accord with leather seats and reverse camera. Duty complete. Serious buyers only.",
    price: 9800000,
    location: "Abuja, Wuse 2",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    category: "vehicles",
    seller: "ada",
  },
  {
    title: "3-bedroom flat for rent — Lekki Phase 1",
    description:
      "Spacious 3-bed with 24hr light, prepaid meter, and estate security. Available from next month. Agency fee applies.",
    price: 4500000,
    location: "Lagos, Lekki",
    condition: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    category: "property",
    seller: "ada",
  },
  {
    title: "Self-contain (studio) — Yaba",
    description:
      "Newly painted self-contain close to UNILAG. Water and light available. Suitable for students.",
    price: 650000,
    location: "Lagos, Yaba",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    category: "property",
    seller: "chidi",
  },
  {
    title: "iPhone 14 Pro Max 256GB — UK used",
    description:
      "Face ID working, battery 89%. Comes with box and charging cable. No FaceTime issues.",
    price: 720000,
    location: "Lagos, Computer Village",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    category: "phones-tablets",
    seller: "ada",
    spareDetails: JSON.stringify({
      brand: "Apple",
      model: "iPhone 14 Pro Max",
      storage: "256 GB",
      ram: "6 GB",
      operatingSystem: "iOS (Apple)",
      batteryHealth: "85% - 89%",
      simConfig: "Physical SIM + eSIM",
      network: "5G + 4G LTE Supported",
      lockStatus: "Factory Unlocked (Worldwide)",
      color: "Deep Purple",
      screenCondition: "Original Factory Screen (True Tone / 120Hz Working)",
      faceIdTouchId: "Face ID Working 100%",
      features: [
        "5G Network Enabled",
        "OLED / Super Retina Display",
        "120Hz Fast Refresh Rate",
        "Face ID / 3D Facial Recognition",
        "Original Box & Manuals",
        "Clean IMEI / No Blacklist",
        "Factory Unlocked (Worldwide)",
        "iCloud Clean / No FRP Lock",
      ],
    }),
  },
  {
    title: "Samsung Galaxy S23 Ultra 512GB",
    description:
      "Brand new sealed. Dual SIM. 1 year warranty. Pickup at Computer Village or delivery nationwide.",
    price: 980000,
    location: "Lagos, Ikeja",
    condition: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=80",
    category: "phones-tablets",
    seller: "chidi",
    spareDetails: JSON.stringify({
      brand: "Samsung",
      model: "Galaxy S23 Ultra",
      storage: "512 GB",
      ram: "12 GB",
      operatingSystem: "Android",
      batteryHealth: "5000 mAh+ (Android All-Day Battery)",
      simConfig: "Dual Physical SIM (Nano-SIM + Nano-SIM)",
      network: "5G + 4G LTE Supported",
      lockStatus: "Factory Unlocked (Worldwide)",
      color: "Phantom Black",
      features: [
        "5G Network Enabled",
        "Dual SIM (Physical + Nano)",
        "Under-Display Fingerprint Sensor",
        "Fast Charging Support",
        "Water & Dust Resistant (IP68)",
        "Follow-Come Original Charger Included",
        "Original Box & Manuals",
      ],
    }),
  },
  {
    title: "iPad Air 5th gen 64GB Wi-Fi",
    description:
      "Lightly used for school notes. Apple Pencil not included. Screen protector already on.",
    price: 410000,
    location: "Accra, East Legon",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80",
    category: "phones-tablets",
    seller: "ada",
    spareDetails: JSON.stringify({
      brand: "Apple",
      tabletType: "Apple iPad Air",
      model: "iPad Air (5th Generation, M1)",
      storage: "64 GB",
      ram: "8 GB",
      screenSize: "10.0 - 10.9 inches (Standard)",
      connectivity: "WiFi Only (No SIM Tray)",
      operatingSystem: "iPadOS (Apple)",
      color: "Space Gray",
      features: [
        "Screen Protector Pre-Installed",
        "Clean iCloud / No Locks",
        "Original Charger & Cable",
      ],
    }),
  },
  {
    title: "MacBook Pro 14\" M2 — 16GB / 512GB",
    description:
      "Developer machine, battery cycle count under 80. Charger included. Keyboard English (US).",
    price: 1850000,
    location: "Lagos, Victoria Island",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    category: "electronics",
    seller: "chidi",
  },
  {
    title: "Hisense 55\" 4K Smart TV",
    description:
      "Brand new, unopened carton. Netflix and YouTube apps. Home delivery in Lagos.",
    price: 385000,
    location: "Lagos, Surulere",
    condition: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80",
    category: "electronics",
    seller: "ada",
  },
  {
    title: "PlayStation 5 Disc + 2 pads",
    description:
      "PS5 with FIFA 24 and God of War. Both DualSense pads working. No box.",
    price: 620000,
    location: "Abuja, Gwarinpa",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80",
    category: "electronics",
    seller: "chidi",
  },
  {
    title: "6-seater L-shaped sofa (grey)",
    description:
      "Comfortable fabric sofa, almost new. Moving out of Lekki so selling fast. Buyer handles logistics.",
    price: 280000,
    location: "Lagos, Lekki",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    category: "home",
    seller: "ada",
  },
  {
    title: "Thermocool double-door fridge 250L",
    description:
      "Working perfectly. No rust. Suitable for a small family. Pickup in Port Harcourt.",
    price: 195000,
    location: "Port Harcourt, GRA",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80",
    category: "home",
    seller: "chidi",
  },
  {
    title: "Standing fan + 1.5HP AC (split)",
    description:
      "Bundle: standing fan and LG split unit. AC recently gas-charged. Installation extra.",
    price: 240000,
    location: "Ibadan, Bodija",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1617104551722-3b2d51366400?auto=format&fit=crop&w=1200&q=80",
    category: "home",
    seller: "ada",
  },
  {
    title: "Nike Dunk Low — size 43 (EU)",
    description:
      "Original Dunks, worn twice. Box and extra laces included. Meet-up at Palms Mall.",
    price: 85000,
    location: "Lagos, Lekki",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    category: "fashion",
    seller: "chidi",
  },
  {
    title: "Ankara mixed lot — 12 yards",
    description:
      "Quality wax print, assorted patterns. Wholesale price for tailors and resellers.",
    price: 48000,
    location: "Lagos, Balogun",
    condition: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80",
    category: "fashion",
    seller: "ada",
  },
  {
    title: "Men's 2-piece native (agbada) — size L",
    description:
      "Tailored agbada, worn once for a wedding. Clean and pressed. Can adjust sleeve length.",
    price: 35000,
    location: "Kano, Sabon Gari",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80",
    category: "fashion",
    seller: "chidi",
  },
  {
    title: "Shea butter wholesale — 20 litres",
    description:
      "Unrefined shea from Northern Ghana. Great for soap and lotion makers.",
    price: 42000,
    location: "Accra, Makola",
    condition: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=80",
    category: "beauty",
    seller: "ada",
  },
  {
    title: "Dyson Airwrap complete (UK used)",
    description:
      "All attachments present. Voltage 220–240. Transformer not needed.",
    price: 310000,
    location: "Lagos, Ikoyi",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&w=1200&q=80",
    category: "beauty",
    seller: "ada",
  },
  {
    title: "Full gym dumbbell set 2–20kg",
    description:
      "Hex dumbbells plus bench. Perfect for a home gym. Heavy — pickup only.",
    price: 175000,
    location: "Abuja, Maitama",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    category: "sports",
    seller: "chidi",
  },
  {
    title: "Mountain bike 29\" — barely used",
    description:
      "Alloy frame, 21-speed. Bought last year, used on weekends only.",
    price: 125000,
    location: "Nairobi, Westlands",
    condition: "Used",
    imageUrl:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
    category: "sports",
    seller: "ada",
  },
  {
    title: "Front-end developer (contract) — remote OK",
    description:
      "Looking for a React/Next.js contractor for a 3-month marketplace build. Send portfolio and rate.",
    price: 800000,
    location: "Lagos, Remote",
    condition: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    category: "jobs",
    seller: "chidi",
  },
  {
    title: "Generator repair & servicing",
    description:
      "Honda, Elepaq, and Perkins. House call in Lagos mainland. Spare parts extra.",
    price: 15000,
    location: "Lagos, Mushin",
    condition: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
    category: "services",
    seller: "chidi",
  },
  {
    title: "German shepherd puppies (vaccinated)",
    description:
      "8 weeks old, both parents on site. First shots done. Serious homes only — not for resale.",
    price: 180000,
    location: "Ibadan, Ring Road",
    condition: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=1200&q=80",
    category: "pets",
    seller: "ada",
  },
  {
    title: "Fresh catfish — 200kg weekly supply",
    description:
      "Farm-raised catfish. Wholesale to restaurants and pepper-soup joints. Delivery in Lagos.",
    price: 2200,
    location: "Lagos, Ikorodu",
    condition: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=1200&q=80",
    category: "agriculture",
    seller: "chidi",
  },
  {
    title: "Rice 50kg bag — ofada & foreign",
    description:
      "Clean ofada and imported rice. Price is per 50kg bag of ofada. Bulk discount available.",
    price: 72000,
    location: "Abeokuta, Lafenwa",
    condition: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
    category: "agriculture",
    seller: "ada",
  },
];

async function main() {
  await prisma.listing.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);

  const ada = await prisma.user.create({
    data: {
      name: "Ada Okonkwo",
      email: "ada@classi.local",
      phone: "0803 111 2222",
      passwordHash,
    },
  });

  const chidi = await prisma.user.create({
    data: {
      name: "Chidi Balogun",
      email: "chidi@classi.local",
      phone: "0805 333 4444",
      passwordHash,
    },
  });

  const sellers = { ada, chidi };

  const createdCategories = await Promise.all(
    categories.map((c) => prisma.category.create({ data: c })),
  );

  const categoryBySlug = Object.fromEntries(
    createdCategories.map((c) => [c.slug, c]),
  );

  for (const item of listings) {
    const category = categoryBySlug[item.category];
    if (!category) continue;
    await prisma.listing.create({
      data: {
        title: item.title,
        description: item.description,
        price: item.price,
        location: item.location,
        condition: item.condition,
        imageUrl: item.imageUrl,
        spareDetails: item.spareDetails || null,
        sellerId: sellers[item.seller].id,
        categoryId: category.id,
      },
    });
  }
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
