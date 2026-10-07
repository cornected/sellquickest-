import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { CATEGORY_SUBCATEGORIES_MAP } from "@/lib/categoriesData";

export const metadata: Metadata = {
  title: "All Categories & Subcategories — SellQuickest Nigeria",
  description:
    "Browse all categories and subcategories on SellQuickest: Vehicles, Phones, Real Estate, Electronics, Fashion, Home Appliances, Jobs, and more.",
};

export default async function CategoriesPage() {
  const dbCategories = await prisma.category.findMany({
    include: {
      _count: {
        select: { listings: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <main className="container py-4 pb-5" style={{ maxWidth: "1080px" }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Categories Directory
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white text-center">
        <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-1.5 rounded-pill mx-auto mb-2">
          EXPLORE MARKETPLACE
        </span>
        <h1 className="fw-bold text-dark mb-2">All Marketplace Categories</h1>
        <p className="lead text-secondary mx-auto mb-0" style={{ maxWidth: "620px" }}>
          Find exactly what you are looking for by exploring our full directory of product categories and subcategories.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="row g-4">
        {dbCategories.map((cat) => {
          const subInfoList = CATEGORY_SUBCATEGORIES_MAP[cat.slug] || [];
          const subcategories = subInfoList.length > 0
            ? subInfoList.map((s) => s.name)
            : ["All Items", "Accessories", "Brand New", "Pre-Owned"];

          return (
            <div key={cat.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 rounded-4 shadow-sm p-4 bg-white d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="fs-3">{cat.icon}</span>
                      <h2 className="h6 fw-bold text-dark mb-0">
                        <Link
                          href={`/category/${cat.slug}`}
                          className="text-dark text-decoration-none hover:text-success"
                        >
                          {cat.name}
                        </Link>
                      </h2>
                    </div>
                    <span className="badge bg-light text-secondary rounded-pill px-2.5 py-1 small">
                      {cat._count.listings} ads
                    </span>
                  </div>

                  <ul className="list-unstyled d-flex flex-column gap-1.5 mb-3" style={{ fontSize: "13px" }}>
                    {subcategories.slice(0, 5).map((sub, idx) => (
                      <li key={idx}>
                        <Link
                          href={`/search?q=${encodeURIComponent(sub)}`}
                          className="text-secondary text-decoration-none hover:text-success d-flex align-items-center justify-content-between"
                        >
                          <span>• {sub}</span>
                          <span className="text-muted small">›</span>
                        </Link>
                      </li>
                    ))}
                    {subcategories.length > 5 && (
                      <li className="text-muted small ps-2 pt-1">
                        + {subcategories.length - 5} more subcategories
                      </li>
                    )}
                  </ul>
                </div>

                <div className="pt-2 border-top">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="btn btn-outline-success btn-sm w-100 rounded-pill fw-medium"
                  >
                    View All {cat.name} →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
