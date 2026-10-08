import { SearchBar } from "@/components/SearchBar";
import { prisma } from "@/lib/db";
import CategoryGridExpander from "@/components/homepage/CategoryGridExpander";
import { TrendingAdsSection } from "@/components/TrendingAdsSection";
import { Footer } from "@/components/Footer";

const DEFAULT_CATEGORIES = [
  { id: "cat-1", name: "Vehicles", slug: "vehicles", icon: "🚗", _count: { listings: 8 } },
  { id: "cat-2", name: "Property", slug: "property", icon: "🏠", _count: { listings: 5 } },
  { id: "cat-3", name: "Phones & Tablets", slug: "phones-tablets", icon: "📱", _count: { listings: 12 } },
  { id: "cat-4", name: "Electronics", slug: "electronics", icon: "📺", _count: { listings: 7 } },
  { id: "cat-5", name: "Home, Furniture & Appliances", slug: "home", icon: "🛋️", _count: { listings: 4 } },
  { id: "cat-6", name: "Fashion", slug: "fashion", icon: "👗", _count: { listings: 9 } },
  { id: "cat-7", name: "Beauty & Personal Care", slug: "beauty", icon: "💄", _count: { listings: 3 } },
  { id: "cat-8", name: "Sports, Arts & Outdoors", slug: "sports", icon: "⚽", _count: { listings: 2 } },
  { id: "cat-9", name: "Jobs", slug: "jobs", icon: "💼", _count: { listings: 4 } },
  { id: "cat-10", name: "Services", slug: "services", icon: "🔧", _count: { listings: 6 } },
  { id: "cat-11", name: "Pets", slug: "pets", icon: "🐕", _count: { listings: 2 } },
  { id: "cat-12", name: "Agriculture & Food", slug: "agriculture", icon: "🌾", _count: { listings: 5 } },
  { id: "cat-13", name: "Babies & Kids", slug: "babies-kids", icon: "🍼", _count: { listings: 3 } },
  { id: "cat-14", name: "Commercial Equipment & Tools", slug: "commercial-equipment", icon: "🏭", _count: { listings: 1 } },
  { id: "cat-15", name: "Repair & Construction", slug: "repair-construction", icon: "🏗️", _count: { listings: 2 } },
  { id: "cat-16", name: "Business & Industry", slug: "business-industry", icon: "🏢", _count: { listings: 1 } },
];

export default async function HomePage() {
  // Aggregate real-time data safely with fallbacks so the site never throws a 500 error
  const [categoriesRaw, stateCountsRaw] = await Promise.all([
    prisma.category
      .findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { listings: true } } },
      })
      .catch(() => DEFAULT_CATEGORIES as any),
    prisma.listing
      .groupBy({
        by: ["location"],
        _count: { _all: true },
      })
      .catch(() => []),
  ]);

  const categories = categoriesRaw && categoriesRaw.length > 0 ? categoriesRaw : DEFAULT_CATEGORIES;

  const trendingRaw = await prisma.listing
    .findMany({
      orderBy: { createdAt: "desc" },
      take: 24,
    })
    .catch(() => []);

  // 💡 Check and provide reliable fallback
  const trending = trendingRaw.map((item) => ({
    ...item,
    imageUrl:
      item.imageUrl &&
      !item.imageUrl.includes("404") &&
      item.imageUrl.trim() !== "" &&
      item.imageUrl.trim() !== "https://unsplash.com"
        ? item.imageUrl
        : "/placeholder.png",
  }));

  const stateAdCounts: Record<string, number> = {};
  stateCountsRaw.forEach((item) => {
    if (item.location) {
      stateAdCounts[item.location] = item._count._all;
    }
  });

  return (
    //  Replace it with this clean bounding tag line:
    <main className="min-vh-100 position-relative overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .minimal-hero-section {
          padding: 5.5rem 0 4.5rem 0;
          position: relative;
          text-align: center;
          background-color: #f8fafc; 
          background-image: radial-gradient(circle at 85% 15%, rgba(16, 185, 129, 0.06) 0%, transparent 45%),
                            radial-gradient(circle at 15% 85%, rgba(59, 130, 246, 0.05) 0%, transparent 40%);
          border-bottom: 1px solid rgba(0,0,0,0.02);
        }
        .main-brand-title { 
          font-weight: 800 !important; 
          font-size: 3.25rem !important; 
          letter-spacing: -1.5px !important; 
          color: #0f172a !important; 
          margin-bottom: 0.75rem !important; 
          line-height: 1.15 !important;
        }
        .main-brand-title span { color: #10b981 !important; }
        .sub-brand-copy { color: #64748b; font-weight: 500; font-size: 0.95rem; max-width: 520px; margin: 0 auto 2.25rem auto; line-height: 1.6; }
        @media (max-width: 768px) {
          .main-brand-title { 
            font-size: 2.25rem !important; 
            letter-spacing: -1px !important;
          }
          .minimal-hero-section { padding: 3.5rem 0 2.75rem 0; }
          .sub-brand-copy { margin-bottom: 1.75rem; }
        }
        .hero-search-wrapper { max-width: 900px; width: 100%; margin: 0 auto; position: relative; z-index: 10; }
        .sparkle-node { position: absolute; user-select: none; pointer-events: none; animation: floatAnimation 4s ease-in-out infinite; }
        .st-1 { top: 20%; left: 8%; font-size: 1.6rem; color: #fcd34d; animation-duration: 4.5s; }
        .st-2 { top: 45%; left: 14%; font-size: 0.9rem; color: #a7f3d0; animation-duration: 6s; animation-delay: 0.5s; }
        .st-3 { top: 25%; right: 10%; font-size: 1.4rem; color: #93c5fd; animation-duration: 5s; animation-delay: 0.2s; }
        .st-4 { top: 55%; right: 7%; font-size: 1rem; color: #fef08a; animation-duration: 5.5s; animation-delay: 0.8s; }
        .st-5 { top: 12%; left: 50%; font-size: 1.1rem; color: #cbd5e1; animation-duration: 7s; }
        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-10px) scale(1.1); opacity: 1; }
        }
        
        .category-grid-container { 
          display: grid !important; 
          grid-template-columns: repeat(6, 1fr) !important; 
          gap: 16px !important; 
          width: 100% !important;
        }
        
        .category-image-capsule-card {
          width: 99% !important;    
          height: 135px !important;    
          border-radius: 18px !important;
          text-decoration: none !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 1rem 0.75rem !important;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: 1px solid rgba(0,0,0,0.005) !important;
        }
        
        .category-image-capsule-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 10px 20px rgba(15, 23, 42, 0.03) !important;
          filter: brightness(0.97); 
        }
        
        .category-capsule-graphic { font-size: 2.1rem; line-height: 1; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; }
        
        .category-capsule-title {
          font-size: 0.8rem !important;
          font-weight: 401 !important;
          color: #1e293b !important; 
          text-align: center !important;
          width: 100%;
          white-space: normal !important; 
          line-height: 1.2;
        }

        @media (max-width: 1200px) { .category-grid-container { grid-template-columns: repeat(5, 1fr) !important; gap: 14px !important; } }
        @media (max-width: 992px) { .category-grid-container { grid-template-columns: repeat(4, 1fr) !important; gap: 12px !important; } .category-image-capsule-card { height: 115px !important; } }
        @media (max-width: 768px) { .category-grid-container { grid-template-columns: repeat(3, 1fr) !important; gap: 10px !important; } .category-image-capsule-card { height: 100px !important; border-radius: 14px !important; } .category-capsule-graphic { font-size: 1.8rem; margin-bottom: 6px; } .category-capsule-title { font-size: 0.75rem !important; } }
        @media (max-width: 480px) { .category-grid-container { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; } .category-image-capsule-card { height: 95px !important; .category-capsule-graphic { font-size: 1.6rem; margin-bottom: 4px; } }
      `,
        }}
      />

      {/* Hero Search Canvas */}
      <section className="minimal-hero-section px-3">
        <div className="sparkle-node st-1">✦</div>
        <div className="sparkle-node st-2">✧</div>
        <div className="sparkle-node st-3">✦</div>
        <div className="sparkle-node st-4">✧</div>
        <div className="sparkle-node st-5">✦</div>

        <div className="container">
          <h1 className="main-brand-title">
            Sell<span>Quickest</span>
          </h1>
          <p className="sub-brand-copy">
            Browse verified listings near you, instantly connect with local
            sellers, and post your item adverts completely free today.
          </p>
          <div className="hero-search-wrapper">
            <SearchBar stateAdCounts={stateAdCounts} />
          </div>
        </div>
      </section>

      {/* Categories Layer */}
      <section className="container py-5 mt-2">
        <CategoryGridExpander categories={categories || []} />
      </section>

      {/* Dynamic Trending Split Component Layer */}
      <TrendingAdsSection
        initialListings={JSON.parse(JSON.stringify(trending))}
      />
    </main>
  );
}
