import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatNaira } from "@/lib/format";
import { SellerStorefrontView } from "@/components/SellerStorefrontView";

export default async function SellerStorefrontPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const seller = await prisma.user.findUnique({
    where: { id },
    include: {
      listings: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!seller) notFound();

  const totalListings = seller.listings.length;
  const activeListings = seller.listings.filter((l) => l.status !== "SOLD");
  const memberSince = seller.createdAt
    ? new Date(seller.createdAt).getFullYear()
    : 2026;

  // Phone & WhatsApp setup
  const rawPhone = seller.phone || "";
  const digitsOnly = rawPhone.replace(/\D/g, "");
  let waNumber = digitsOnly;
  if (waNumber.startsWith("0")) {
    waNumber = "234" + waNumber.slice(1);
  } else if (waNumber.length === 10) {
    waNumber = "234" + waNumber;
  }
  const waText = encodeURIComponent(
    `Hello ${seller.name}! I saw your store on SellQuickest and would like to inquire about your listings.`
  );
  const waUrl = waNumber ? `https://wa.me/${waNumber}?text=${waText}` : null;

  return (
    <main className="container py-4 pb-5 min-vh-100">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/browse" className="text-decoration-none text-secondary">
              Marketplace
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            {seller.name}&apos;s Store
          </li>
        </ol>
      </nav>

      {/* STOREFRONT HERO BANNER */}
      <div
        className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white"
        style={{ borderRadius: "24px" }}
      >
        {/* Top Gradient Header Stripe */}
        <div
          style={{
            height: "120px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
            position: "relative",
          }}
        >
          <div
            className="position-absolute end-0 top-0 m-3 d-none d-sm-block text-white opacity-25 fw-bold"
            style={{ fontSize: "2rem", letterSpacing: "2px" }}
          >
            STOREFRONT
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="px-4 pb-4 position-relative" style={{ marginTop: "-50px" }}>
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between gap-3">
            {/* Avatar & Info */}
            <div className="d-flex align-items-end gap-4 flex-wrap">
              <div
                className="rounded-circle shadow-sm border border-4 border-white position-relative overflow-hidden d-flex align-items-center justify-content-center text-white fw-bold"
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "#059669",
                  fontSize: "36px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                }}
              >
                {seller.avatarUrl ? (
                  <Image
                    src={seller.avatarUrl}
                    alt={seller.name}
                    fill
                    className="object-fit-cover"
                    sizes="100px"
                  />
                ) : (
                  seller.name.charAt(0).toUpperCase()
                )}
              </div>

              <div className="pb-1">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <h1 className="h4 fw-bold text-dark mb-0">{seller.name}</h1>
                  <span
                    className="badge bg-success bg-opacity-10 text-success fw-semibold px-2.5 py-1"
                    style={{ fontSize: "11px", borderRadius: "12px" }}
                  >
                    ✓ Verified Merchant
                  </span>
                </div>

                <div className="d-flex align-items-center gap-3 text-secondary small mt-1 flex-wrap">
                  <span>★ 4.9 Rating (24 reviews)</span>
                  <span>•</span>
                  <span>Member since {memberSince}</span>
                  <span>•</span>
                  <span>{totalListings} total items ({activeListings.length} active)</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div className="d-flex align-items-center gap-2 mt-3 mt-md-0 w-100 w-md-auto flex-wrap">
              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm fw-bold px-3.5 py-2 text-white text-decoration-none rounded-pill shadow-2xs d-inline-flex align-items-center gap-1.5"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <span>💬</span> WhatsApp
                </a>
              )}

              {seller.phone && (
                <a
                  href={`tel:${seller.phone.replace(/\s/g, "")}`}
                  className="btn btn-sm btn-sq text-white fw-bold px-3.5 py-2 text-decoration-none rounded-pill shadow-2xs d-inline-flex align-items-center gap-1.5"
                >
                  <span>📞</span> Call Seller
                </a>
              )}

              <Link
                href={`/messages?sellerId=${seller.id}`}
                className="btn btn-sm btn-light border text-secondary fw-semibold px-3 py-2 rounded-pill shadow-2xs"
              >
                ✉️ Message
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* STORE ITEMS SECTION */}
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="h5 fw-bold text-dark mb-0">Items for Sale ({activeListings.length})</h2>
      </div>

      <SellerStorefrontView
        initialListings={JSON.parse(JSON.stringify(seller.listings))}
        sellerName={seller.name}
      />
    </main>
  );
}
