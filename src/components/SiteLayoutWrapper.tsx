"use client";

import { usePathname } from "next/navigation";
import { MarketplaceRightSidebar } from "./MarketplaceRightSidebar";

// Pages that must NOT have the right sidebar according to user instructions:
// 1. Homepage ("/")
// 2. Promote Ad ("/promote")
// 3. Seller Guide ("/seller-guide")
// 4. Safety Tips ("/safety")
// 5. About Us ("/about")
// 6. How It Works ("/how-it-works")
// 7. Contact ("/contact")
// 8. Careers ("/careers")
const EXCLUDED_EXACT_PATHS = [
  "/",
  "/promote",
  "/seller-guide",
  "/safety",
  "/about",
  "/how-it-works",
  "/contact",
  "/careers",
];

export function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  // Check if current page is explicitly excluded
  const isExcluded =
    EXCLUDED_EXACT_PATHS.includes(pathname) ||
    pathname.startsWith("/listing/"); // /listing/[id] has its own integrated 2-column layout

  if (isExcluded) {
    return <>{children}</>;
  }

  return (
    <div className="sidebar-layout-container container py-4 flex-grow-1">
      <div className="row g-4 align-items-start">
        {/* Main Content Column */}
        <div className="col-12 col-lg-8 col-xl-8.5 main-content-col">
          {children}
        </div>

        {/* Right Sidebar Column */}
        <div className="col-12 col-lg-4 col-xl-3.5 d-none d-lg-block right-sidebar-col">
          <MarketplaceRightSidebar />
        </div>
      </div>
    </div>
  );
}
