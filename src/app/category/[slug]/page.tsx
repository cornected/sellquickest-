import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSubcategoriesForCategory } from "@/lib/categoriesData";
import { CategoryListingSection } from "@/components/CategoryListingSection";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    sub?: string;
    minPrice?: string;
    maxPrice?: string;
    condition?: string;
    sort?: string;
  }>;
}) {
  const { slug } = await params;
  const searchParamsResolved = await searchParams;
  const selectedSub =
    typeof searchParamsResolved?.sub === "string" &&
    searchParamsResolved.sub.trim() !== ""
      ? searchParamsResolved.sub.trim()
      : undefined;

  const minPriceNum = searchParamsResolved?.minPrice
    ? parseInt(searchParamsResolved.minPrice, 10)
    : undefined;
  const maxPriceNum = searchParamsResolved?.maxPrice
    ? parseInt(searchParamsResolved.maxPrice, 10)
    : undefined;
  const conditionFilter = searchParamsResolved?.condition;
  const sortOption = searchParamsResolved?.sort;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: { listings: { orderBy: { createdAt: "desc" } } },
  });

  if (!category) notFound();

  const subcategories = getSubcategoriesForCategory(
    category.slug,
    category.name
  );

  // Filter listings by subcategory if one is selected
  let filteredListings = category.listings;
  if (selectedSub) {
    const subClean = selectedSub.toLowerCase();
    const keywords = subClean
      .split(/[\s,&/()\-]+/)
      .map((w) => w.trim())
      .filter((w) => w.length > 2);

    filteredListings = category.listings.filter((l) => {
      // Check structured spare/metadata details
      if (l.spareDetails && l.spareDetails.toLowerCase().includes(subClean)) {
        return true;
      }
      const titleLower = (l.title || "").toLowerCase();
      const descLower = (l.description || "").toLowerCase();

      // Check complete phrase match
      if (titleLower.includes(subClean) || descLower.includes(subClean)) {
        return true;
      }

      // Check keyword match
      return (
        keywords.length > 0 &&
        keywords.some((kw) => titleLower.includes(kw) || descLower.includes(kw))
      );
    });
  }

  // Price range filters
  if (minPriceNum !== undefined && !isNaN(minPriceNum)) {
    filteredListings = filteredListings.filter((l) => l.price >= minPriceNum);
  }
  if (maxPriceNum !== undefined && !isNaN(maxPriceNum)) {
    filteredListings = filteredListings.filter((l) => l.price <= maxPriceNum);
  }

  // Condition filter
  if (conditionFilter && conditionFilter !== "all") {
    filteredListings = filteredListings.filter((l) => {
      const cond = (l.condition || "").toLowerCase();
      if (conditionFilter === "brand_new") return cond.includes("new");
      if (conditionFilter === "foreign_used")
        return cond.includes("foreign") || cond.includes("tokunbo");
      if (conditionFilter === "local_used")
        return cond.includes("local") || cond.includes("nigerian");
      return true;
    });
  }

  // Sorting
  if (sortOption === "price_asc") {
    filteredListings = [...filteredListings].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price_desc") {
    filteredListings = [...filteredListings].sort((a, b) => b.price - a.price);
  } else {
    filteredListings = [...filteredListings].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return (
    <main className="container py-4">
      {/* BREADCRUMB */}
      <nav aria-label="breadcrumb" className="mb-2">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li
            className={`breadcrumb-item ${!selectedSub ? "active fw-semibold text-dark" : ""}`}
          >
            {selectedSub ? (
              <Link
                href={`/category/${slug}`}
                className="text-decoration-none text-secondary"
              >
                {category.icon} {category.name}
              </Link>
            ) : (
              <>
                {category.icon} {category.name}
              </>
            )}
          </li>
          {selectedSub && (
            <li
              className="breadcrumb-item active fw-semibold text-dark"
              aria-current="page"
            >
              {selectedSub}
            </li>
          )}
        </ol>
      </nav>

      {/* HEADER TITLE */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 fw-bold mb-0 d-flex align-items-center gap-2">
          <span>{category.icon}</span>
          <span>{category.name}</span>
          {selectedSub && (
            <span className="text-secondary fw-normal fs-5">
              / {selectedSub}
            </span>
          )}
          <span className="fs-6 fw-normal text-secondary ms-1">
            ({filteredListings.length}{" "}
            {filteredListings.length === 1 ? "ad" : "ads"})
          </span>
        </h1>

        <Link href="/post" className="btn btn-sq text-white btn-sm px-3 py-2 rounded-pill fw-semibold">
          + Post Ad in {category.name}
        </Link>
      </div>

      {/* SUBCATEGORIES PILL NAVIGATION BAR */}
      {subcategories.length > 0 && (
        <section className="mb-4" aria-label="Subcategories">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="text-uppercase text-secondary fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
              Explore Subcategories
            </span>
            {selectedSub && (
              <Link
                href={`/category/${slug}`}
                className="text-decoration-none text-danger small fw-semibold"
              >
                ✕ Clear filter
              </Link>
            )}
          </div>

          <div
            className="d-flex flex-wrap gap-2 align-items-center p-2 rounded-4"
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* "All" Category Pill */}
            <Link
              href={`/category/${slug}`}
              className={`btn btn-sm rounded-pill px-3 py-2 fw-medium text-decoration-none transition-all ${
                !selectedSub
                  ? "btn-sq text-white shadow-sm"
                  : "bg-white text-secondary border border-light-subtle"
              }`}
              style={{
                fontSize: "0.85rem",
                transition: "all 0.15s ease",
              }}
            >
              All ({category.listings.length})
            </Link>

            {/* Individual Subcategory Pills */}
            {subcategories.map((sub) => {
              const isActive = selectedSub === sub.name;
              return (
                <Link
                  key={sub.name}
                  href={`/category/${slug}?sub=${encodeURIComponent(sub.name)}`}
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-medium text-decoration-none transition-all d-flex align-items-center gap-1 ${
                    isActive
                      ? "btn-sq text-white shadow-sm"
                      : "bg-white text-secondary border border-light-subtle"
                  }`}
                  style={{
                    fontSize: "0.85rem",
                    transition: "all 0.15s ease",
                  }}
                >
                  {sub.icon && <span>{sub.icon}</span>}
                  <span>{sub.name}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* FILTER, SORT BAR & UNIFIED GRID / LIST LISTINGS */}
      <CategoryListingSection
        filteredListings={filteredListings}
        slug={slug}
        categoryName={category.name}
        selectedSub={selectedSub || undefined}
      />
    </main>
  );
}
