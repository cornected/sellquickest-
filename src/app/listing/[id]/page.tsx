import { parseSpareDetails } from "@/lib/spare-parts-options";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ListingCard } from "@/components/ListingCard";
import { prisma } from "@/lib/db";
import { formatNaira, timeAgo } from "@/lib/format";
import { InteractiveRatingConsole } from "@/components/InteractiveRatingConsole";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 💡 CORRECTED: Switched back to use 'seller' exactly as your database schema demands
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { seller: true, category: true },
  });
  if (!listing) notFound();
  let spareDetails: NonNullable<ReturnType<typeof parseSpareDetails>> | null = null;
  let genericSpecs: Record<string, any> | null = null;
  try {
    const rawParsed = JSON.parse(listing.spareDetails || "null");
    spareDetails = parseSpareDetails(rawParsed);
    if (
      !spareDetails &&
      rawParsed &&
      typeof rawParsed === "object" &&
      !Array.isArray(rawParsed)
    ) {
      genericSpecs = rawParsed;
    }
  } catch {
    // Older listings may not contain structured part details.
  }

  const related = await prisma.listing.findMany({
    where: { categoryId: listing.categoryId, NOT: { id: listing.id } },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="container py-4">
      {/* Inline style utility ensures the Next.js image fill behaves perfectly */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .listing-hero-wrapper {
          position: relative !important;
          width: 100% !important;
          height: 400px !important;
          background-color: #f8fafc;
        }
      `,
        }}
      />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ fontSize: "14px" }}>
          <li className="breadcrumb-item">
            <Link
              href="/"
              className="text-sq text-decoration-none"
              style={{ color: "#10b981" }}
            >
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              href={`/browse`}
              className="text-sq text-decoration-none"
              style={{ color: "#10b981" }}
            >
              {listing.category?.name || "Marketplace"}
            </Link>
          </li>
          <li
            className="breadcrumb-item active text-dark"
            aria-current="page"
            style={{ fontWeight: 500 }}
          >
            Ad Detail
          </li>
        </ol>
      </nav>
      <div className="row g-4">
        {/* LEFT COLUMN PANEL: GALLERY & CONTENT */}
        {(() => {
          // AUTOMATIC STRING SPLITTER MATRIX: Unpacks comma-separated assets cleanly
          let verifiedImages = ["/placeholder.png"];

          if (listing.imageUrl && listing.imageUrl.trim() !== "") {
            try {
              const parsedImages = JSON.parse(listing.imageUrl);
              if (Array.isArray(parsedImages))
                verifiedImages = parsedImages.filter(
                  (url): url is string =>
                    typeof url === "string" &&
                    url.trim() !== "" &&
                    url.trim() !== "https://unsplash.com",
                );
              else if (listing.imageUrl.trim() !== "https://unsplash.com")
                verifiedImages = [listing.imageUrl.trim()];
            } catch {
              verifiedImages = listing.imageUrl
                .split(",")
                .map((url: string) => url.trim())
                .filter(
                  (url: string) => url !== "" && url !== "https://unsplash.com",
                );
            }
          }

          if (verifiedImages.length === 0) {
            verifiedImages = ["/placeholder.png"];
          }

          return (
            <div className="col-lg-8">
              <div
                className="card border-0 shadow-sm overflow-hidden mb-4"
                style={{ borderRadius: "24px", backgroundColor: "#ffffff" }}
              >
                {/* MAIN PAGE SLIDER SYSTEM */}
                <div
                  id="listingDetailsCarousel"
                  className="carousel slide bg-black"
                  data-bs-ride="false"
                >
                  {/* SLIDER DOT INDICATORS */}
                  {verifiedImages.length > 1 && (
                    <div className="carousel-indicators mb-2">
                      {verifiedImages.map((_, idx) => (
                        <button
                          key={`indicator-${idx}`}
                          type="button"
                          data-bs-target="#listingDetailsCarousel"
                          data-bs-slide-to={idx}
                          className={idx === 0 ? "active" : ""}
                          aria-current={idx === 0 ? "true" : "false"}
                          aria-label={`Slide ${idx + 1}`}
                        ></button>
                      ))}
                    </div>
                  )}

                  {/* MAIN PAGE CAROUSEL VIEWPORT */}
                  <div className="carousel-inner" style={{ height: "500px" }}>
                    {verifiedImages.map((imgUrl, idx) => (
                      <div
                        key={`slide-node-${idx}`}
                        className={`carousel-item h-100 ${idx === 0 ? "active" : ""}`}
                      >
                        <div
                          className="position-relative w-100 h-100"
                          style={{ cursor: "zoom-in" }}
                          data-bs-toggle="modal"
                          data-bs-target="#fullscreenLightboxModal"
                          data-bs-slide-to={idx}
                        >
                          <Image
                            src={imgUrl}
                            alt={`${listing.title} - View ${idx + 1}`}
                            fill
                            className="object-fit-cover"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            priority={idx === 0}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* MAIN PAGE SIDE ARROWS */}
                  {verifiedImages.length > 1 && (
                    <>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#listingDetailsCarousel"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#listingDetailsCarousel"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </>
                  )}
                </div>

                {/* INTERACTIVE THUMBNAIL INDICATOR TRACK */}
                {verifiedImages.length > 1 && (
                  <div
                    id="mainPageThumbTrack" // 💡 ADD THIS ID LINE HERE TO ACTIVATE SCROLLING
                    className="p-3 bg-light border-bottom d-flex gap-2 overflow-x-auto"
                    style={{
                      scrollbarWidth: "thin",
                      whiteSpace: "nowrap",
                      scrollBehavior: "smooth",
                      transition: "scroll 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
                    }} // 💡 ADDED SMOOTH SCROLLING
                  >
                    {verifiedImages.map((imgUrl, idx) => (
                      <button
                        key={`thumb-node-${idx}`}
                        type="button"
                        // ... leave your loop contents exactly as they are

                        data-bs-target="#listingDetailsCarousel"
                        data-bs-slide-to={idx}
                        className="position-relative rounded-3 overflow-hidden p-0 bg-transparent flex-shrink-0 thumbnail-indicator-btn main-page-thumb-btn" // 💡 ADDED ANCHOR CLASS: main-page-thumb-btn
                        style={{
                          width: "76px",
                          height: "76px",
                          cursor: "pointer",
                          border:
                            idx === 0
                              ? "3px solid #10b981"
                              : "2px solid #e2e8f0",
                          transition: "all 0.2s ease-in-out",
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                      >
                        <Image
                          src={imgUrl}
                          alt={`Thumbnail item allocation slot ${idx + 1}`}
                          fill
                          className="object-fit-cover"
                          sizes="76px"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* ⚡ STEP 1 SCRIPT: TRACKS CAROUSEL SLIDES AND AUTO-SCROLLS HIDING THUMBNAILS */}
                <Script
                  id="main-thumb-scroll-sync"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
    (function() {
      var carouselEl = document.getElementById('listingDetailsCarousel');
      if (!carouselEl) return;

      carouselEl.addEventListener('slide.bs.carousel', function (event) {
        var targetIndex = event.to;
        var trackContainer = document.getElementById('mainPageThumbTrack');
        var thumbButtons = carouselEl.parentElement.querySelectorAll('.main-page-thumb-btn');
        
        thumbButtons.forEach(function (btn, index) {
          if (index === targetIndex) {
            // Highlight the active thumbnail border cleanly
            btn.style.border = '3px solid #10b981';
            
            // Calculate center-alignment coordinates to slide the row smoothly into view
            if (trackContainer) {
              var containerWidth = trackContainer.clientWidth;
              var btnLeft = btn.offsetLeft;
              var btnWidth = btn.clientWidth;
              trackContainer.scrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2);
            }
          } else {
            btn.style.border = '2px solid #e2e8f0';
          }
        });
      });
    })();
  `,
                  }}
                />

                {/* METRICS VIEW CARD INFO BLOCK */}
                {/* CORE PRODUCT METRICS AND DATA LAYOUT */}
                <div className="card-body p-4">
                  {/* 1. TITLE & PRICE SIDE-BY-SIDE ON THE SAME LINE */}
                  <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                    <h1 className="h3 fw-bold m-0" style={{ color: "#0f172a" }}>
                      {listing.title}
                    </h1>
                    <p
                      className="h3 fw-bold m-0 text-nowrap"
                      style={{ color: "#10b981", letterSpacing: "-1px" }}
                    >
                      {formatNaira(listing.price)}
                    </p>
                  </div>

                  <p className="text-secondary" style={{ fontSize: "13px" }}>
                    📍 {listing.location || "Lagos"} ·{" "}
                    {listing.condition || "Used"} · posted{" "}
                    <span suppressHydrationWarning>
                      {timeAgo(listing.createdAt)}
                    </span>
                  </p>

                  {/* (CURRENT SPECIFICATION DESIGNS - UNTOUCHED) */}
                  <div className="row g-2 my-4">
                    <div className="col-6 col-sm-4">
                      <div className="p-3 bg-light rounded-4">
                        <div
                          className="text-secondary"
                          style={{ fontSize: "11px" }}
                        >
                          Condition
                        </div>
                        <div
                          className="fw-bold text-dark mt-1"
                          style={{ fontSize: "14px" }}
                        >
                          {listing.condition || "Used"}
                        </div>
                      </div>
                    </div>

                    <div className="col-6 col-sm-4">
                      <div className="p-3 bg-light rounded-4">
                        <div
                          className="text-secondary"
                          style={{ fontSize: "11px" }}
                        >
                          Status
                        </div>
                        <div
                          className="fw-bold text-success mt-1"
                          style={{ fontSize: "14px" }}
                        >
                          Active
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. NEAT DATA TABLE FORMAT ADDED DIRECTLY UNDERNEATH */}
                  <div className="table-responsive my-4">
                    <table
                      className="table table-borderless m-0"
                      style={{ fontSize: "14px" }}
                    >
                      <tbody>
                        <tr className="border-bottom border-light">
                          <td
                            className="text-secondary py-2.5 ps-0"
                            style={{ width: "40%" }}
                          >
                            Location
                          </td>
                          <td className="fw-semibold text-dark py-2.5">
                            {listing.location || "Lagos"}
                          </td>
                        </tr>
                        <tr className="border-bottom border-light">
                          <td className="text-secondary py-2.5 ps-0">
                            Item Condition
                          </td>
                          <td className="fw-semibold text-dark py-2.5">
                            {listing.condition || "Used"}
                          </td>
                        </tr>
                        <tr className="border-bottom border-light">
                          <td className="text-secondary py-2.5 ps-0">
                            Ad Placement Status
                          </td>
                          <td className="fw-semibold text-success py-2.5">
                            Verified ✓
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="border-bottom border-light w-100 my-4" />

                  <h2 className="h5 mt-4 fw-bold" style={{ color: "#0f172a" }}>
                    Description
                  </h2>

                  {/* 3. FULL-WIDTH DESCRIPTION PARAGRAPH BLOCK */}
                  <p
                    className="mb-0 text-muted w-100"
                    style={{
                      whiteSpace: "pre-wrap",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    {listing.description}
                  </p>
                  {spareDetails && (
                    <dl className="row g-3 mt-3 mb-0">
                      {[
                        ["Vehicle Make", spareDetails.make],
                        ["Vehicle Model", spareDetails.model],
                        ["Part Type", spareDetails.type],
                        ["Part Subtype", spareDetails.subtype],
                      ].map(([label, value]) => (
                        <div key={label} className="col-12 col-md-6">
                          <dt className="small text-secondary fw-normal">
                            {label}
                          </dt>
                          <dd
                            className="mb-0 text-dark"
                            style={{
                              fontSize: "14px",
                              overflowWrap: "anywhere",
                            }}
                          >
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {genericSpecs && (
                    <div className="mt-4 pt-3 border-top border-light-subtle">
                      <h3 className="h6 fw-bold mb-3 text-dark">
                        Key Specifications
                      </h3>
                      <div className="row g-2">
                        {Object.entries(genericSpecs)
                          .filter(([k, v]) => {
                            if (k.startsWith("custom") || !v) return false;
                            if (Array.isArray(v) && v.length === 0)
                              return false;
                            return true;
                          })
                          .map(([key, rawVal]) => {
                            const val = Array.isArray(rawVal)
                              ? rawVal.join(", ")
                              : String(rawVal);
                            const label = key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase());
                            return (
                              <div key={key} className="col-12 col-sm-6">
                                <div className="p-2.5 rounded-3 bg-light d-flex flex-column">
                                  <span
                                    className="text-secondary"
                                    style={{ fontSize: "11px" }}
                                  >
                                    {label}
                                  </span>
                                  <span
                                    className="fw-semibold text-dark text-truncate mt-0.5"
                                    style={{ fontSize: "13px" }}
                                  >
                                    {val}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>

                {/* FULLSCREEN INTERACTIVE CAROUSEL LIGHTBOX MODAL */}
                <div
                  className="modal fade"
                  id="fullscreenLightboxModal"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {/* 💡 STEP 3 OVERRIDE: Custom inline styles to slow down the slide speed to match the main page pace perfectly */}
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
      #lightboxInnerCarousel .carousel-item {
        transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) !important;
         -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) !important;
   
      }
    `,
                    }}
                  />

                  <div className="modal-dialog modal-dialog-centered modal-fullscreen-md-down modal-xl">
                    <div className="modal-content bg-dark border-0 rounded-4 overflow-hidden position-relative">
                      {/* 🌟 STEP 2 FRAMEWORK: FLOATING NUMBER COUNTER INDICATOR (Top Left Corner) */}
                      {verifiedImages.length > 1 && (
                        <div
                          id="lightboxSlideCounter"
                          className="position-absolute top-0 start-0 z-3 m-3 px-3 py-1.5 rounded-pill text-white fw-semibold shadow-sm"
                          style={{
                            backgroundColor: "rgba(15, 23, 42, 0.7)",
                            backdropFilter: "blur(4px)",
                            fontSize: "13px",
                          }}
                        >
                          1 / {verifiedImages.length}
                        </div>
                      )}

                      {/* Modal Exit Header Element (Top Right Corner) */}
                      <div className="modal-header border-0 p-3 pb-0 justify-content-end position-absolute top-0 end-0 z-3">
                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>

                      {/* SIDE-BY-SIDE SPLIT LAYOUT GRID */}
                      <div className="modal-body p-0 text-white">
                        <div className="d-flex flex-column flex-md-row min-vh-75">
                          {/* 1. LEFT / MAIN SIDE: PRIMARY THEATER STAGE CONTAINER */}
                          {/* 💡 THEATER FIX: Added p-3 p-md-4 padding to generate an elegant black border around the canvas */}
                          <div className="flex-grow-1 position-relative d-flex align-items-center justify-content-center bg-black p-3 p-md-4">
                            <div
                              id="lightboxInnerCarousel"
                              className="carousel slide w-100"
                              data-bs-ride="false"
                            >
                              <div className="carousel-inner">
                                {verifiedImages.map((imgUrl, idx) => (
                                  <div
                                    key={`zoom-slide-${idx}`}
                                    className={`carousel-item ${idx === 0 ? "active" : ""}`}
                                  >
                                    {/* Preserved rounded-4 curved edges inside the floating layout pad context */}
                                    <div
                                      className="position-relative w-100 rounded-4 overflow-hidden"
                                      style={{
                                        height: "75vh",
                                        maxHeight: "600px",
                                      }}
                                    >
                                      <Image
                                        src={imgUrl}
                                        alt={`${listing.title} - Full Zoom View ${idx + 1}`}
                                        fill
                                        className="object-fit-cover rounded-4"
                                        sizes="(max-width: 1200px) 100vw, 85vw"
                                        unoptimized
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* INTERACTIVE CAROUSEL FLIP CONTROLS */}
                              {verifiedImages.length > 1 && (
                                <>
                                  <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#lightboxInnerCarousel"
                                    data-bs-slide="prev"
                                    style={{ left: "10px" }}
                                  >
                                    <span
                                      className="carousel-control-prev-icon"
                                      aria-hidden="true"
                                      style={{
                                        filter:
                                          "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
                                      }}
                                    ></span>
                                    <span className="visually-hidden">
                                      Previous
                                    </span>
                                  </button>
                                  <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#lightboxInnerCarousel"
                                    data-bs-slide="next"
                                    style={{ right: "10px" }}
                                  >
                                    <span
                                      className="carousel-control-next-icon"
                                      aria-hidden="true"
                                      style={{
                                        filter:
                                          "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
                                      }}
                                    ></span>
                                    <span className="visually-hidden">
                                      Next
                                    </span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          {/* 2. RIGHT SIDE: MINIMALIST NARROW VERTICAL THUMBNAIL RAIL */}
                          {verifiedImages.length > 1 && (
                            <div
                              id="modalLightboxThumbTrack" // 💡 STEP 2 FIX: INSERT THIS EXACT ID PROMPT LINE HERE
                              className="bg-secondary bg-opacity-25 border-start border-secondary p-3 d-flex flex-row flex-md-column gap-2 overflow-auto align-items-center"
                              style={{
                                width: "100%",
                                maxWidth: "120px",
                                maxHeight: "80vh",
                                scrollbarWidth: "none",
                                scrollBehavior: "smooth", // 💡 STEP 2 FIX: ADD SMOOTH SCROLL GYRATION FOCUS
                                zIndex: 2,
                                // 💡 ADDED FOR ULTRA-SMOOTH RENDERING VELOCITY:
                                transition:
                                  "scroll 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
                              }}
                            >
                              <div
                                className="text-secondary small fw-bold mb-1 d-none d-md-block text-center w-100"
                                style={{
                                  fontSize: "10px",
                                  letterSpacing: "0.5px",
                                  opacity: 0.8,
                                }}
                              >
                                ALL ({verifiedImages.length})
                              </div>

                              {verifiedImages.map((imgUrl, idx) => (
                                <button
                                  key={`modal-sidebar-thumb-${idx}`}
                                  type="button"
                                  data-bs-target="#lightboxInnerCarousel"
                                  data-bs-slide-to={idx}
                                  className="position-relative rounded-3 overflow-hidden p-0 bg-transparent flex-shrink-0 lightbox-sidebar-thumb-btn"
                                  style={{
                                    width: "90px",
                                    height: "90px",
                                    cursor: "pointer",
                                    border:
                                      idx === 0
                                        ? "3px solid #10b981"
                                        : "2px solid rgba(255,255,255,0.15)",
                                    transition: "all 0.2s ease",
                                  }}
                                  aria-label={`Jump view target element ${idx + 1}`}
                                >
                                  <Image
                                    src={imgUrl}
                                    alt={`Vertical tracking item ${idx + 1}`}
                                    fill
                                    className="object-fit-cover"
                                    sizes="80px"
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NATIVE BRIDGE SCRIPT ROUTE: Manages modal initialization and bidirectional thumbnail highlighting sync updates */}
                {/* ⚡ PROVEN SYNCHRONIZATION ENGINE: FIXES COUNTERS, VERTICAL CLICK NAVIGATION, AND SPEEDS */}
                {/* ⚡ THE PERFECT SYNCHRONIZATION ENGINE: BULLETPROOF AUTO-SCROLL USING NATIVE SCROLL INTO VIEW */}
                {/* ⚡ SYNCHRONIZATION ENGINE: SCOPED SCROLLS FOR BOTH MAIN PAGE & THEATER LIGHTBOX */}
                <Script
                  id="carousel-sync-bridge"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
      (function() {
        var mainCarouselEl = document.getElementById('listingDetailsCarousel');
        var modalEl = document.getElementById('fullscreenLightboxModal');
        var innerCarouselEl = document.getElementById('lightboxInnerCarousel');
        var counterEl = document.getElementById('lightboxSlideCounter');

        // Scoped helper that scrolls ONLY inside the track element container without shifting the main page body window
        function centerThumbInsideTrack(trackContainer, targetBtn, isVertical) {
          if (!trackContainer || !targetBtn) return;
          
          if (isVertical) {
            // Fullscreen vertical alignment tracking calculations
            var containerHeight = trackContainer.clientHeight;
            var btnTop = targetBtn.offsetTop;
            var btnHeight = targetBtn.clientHeight;
            trackContainer.scrollTop = btnTop - (containerHeight / 2) + (btnHeight / 2);
          } else {
            // Main page horizontal alignment tracking calculations
            var containerWidth = trackContainer.clientWidth;
            var btnLeft = targetBtn.offsetLeft;
            var btnWidth = targetBtn.clientWidth;
            trackContainer.scrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2);
          }
        }

        // ==========================================================
        // 📸 A. FULLSCREEN LIGHTBOX SLIDER CONTROLLER
        // ==========================================================
        if (innerCarouselEl) {
          innerCarouselEl.addEventListener('slide.bs.carousel', function (event) {
            var targetIndex = event.to;
            var trackContainer = document.getElementById('modalLightboxThumbTrack');
            var modalThumbs = innerCarouselEl.parentElement.parentElement.querySelectorAll('.lightbox-sidebar-thumb-btn');
            
            if (counterEl && modalThumbs.length > 0) {
              counterEl.innerText = (targetIndex + 1) + ' / ' + modalThumbs.length;
            }

            modalThumbs.forEach(function (btn, index) {
              if (index === targetIndex) {
                btn.style.border = '3px solid #10b981';
                centerThumbInsideTrack(trackContainer, btn, true); // Smooth vertical slider sync
              } else {
                btn.style.border = '2px solid rgba(255,255,255,0.15)';
              }
            });
          });
        }

        // ==========================================================
        // 🏠 B. MAIN PAGE HORIZONTAL SLIDER CONTROLLER
        // ==========================================================
        if (mainCarouselEl) {
          mainCarouselEl.addEventListener('slide.bs.carousel', function (event) {
            var targetIndex = event.to;
            var trackContainer = document.getElementById('mainPageThumbTrack'); // 💡 Targets horizontal track wrapper
            var thumbButtons = mainCarouselEl.parentElement.querySelectorAll('.thumbnail-indicator-btn');
            
            thumbButtons.forEach(function (btn, index) {
              if (index === targetIndex) {
                btn.style.border = '3px solid #10b981';
                centerThumbInsideTrack(trackContainer, btn, false); // 💡 SCOPED AUTO-SCROLL: Moves track row left/right only!
              } else {
                btn.style.border = '2px solid #e2e8f0';
              }
            });
          });
        }

        // ==========================================================
        // 🚀 C. MODAL POPUP LAUNCH STATE INITIALIZER
        // ==========================================================
        if (modalEl) {
          modalEl.addEventListener('show.bs.modal', function (event) {
            var triggerElement = event.relatedTarget;
            var slideIndex = triggerElement.getAttribute('data-bs-slide-to');
            
            if (innerCarouselEl && slideIndex !== null) {
              if (typeof bootstrap !== 'undefined') {
                var carouselInstance = bootstrap.Carousel.getOrCreateInstance(innerCarouselEl);
                var parsedIndex = parseInt(slideIndex, 10);
                
                carouselInstance.to(parsedIndex);
                
                if (counterEl) {
                  var totalSlides = innerCarouselEl.querySelectorAll('.carousel-item').length;
                  counterEl.innerText = (parsedIndex + 1) + ' / ' + totalSlides;
                }
                
                var trackContainer = document.getElementById('modalLightboxThumbTrack');
                var modalThumbs = innerCarouselEl.parentElement.parentElement.querySelectorAll('.lightbox-sidebar-thumb-btn');
                modalThumbs.forEach(function (btn, index) {
                  if (index === parsedIndex) {
                    btn.style.border = '3px solid #10b981';
                    setTimeout(function() {
                      centerThumbInsideTrack(trackContainer, btn, true); // Snap vertical lane cleanly on modal mount
                    }, 100);
                  } else {
                    btn.style.border = '2px solid rgba(255,255,255,0.15)';
                  }
                });
              }
            }
          });
        }
      })();
    `,
                  }}
                />
              </div>
            </div>
          );
        })()}

        {/* =============================================================================
            🎯 RIGHT COLUMN PANEL: REFINED SELLER INFORMATION WITH 5-STAR RATING MATRIX
            ============================================================================= */}

        {/* 🚨 LOCATE AND UPDATE THIS LINE ON THE RIGHT COLUMN Wrapper: */}

        <div className="col-12 col-lg-4 ms-auto" style={{ maxWidth: "390px" }}>
          <div
            className="d-flex flex-column gap-4"
            style={{ position: "sticky", top: "2rem" }}
          >
            {/* HIGH-UTILITY SELLER INFORMATION CARD */}
            <aside
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* 💡 ADJUSTMENT 4: ENLARGED TOP RIGHT CORNER STATUS BADGE ICON (Scaled up to 26px) */}
              <div
                style={{
                  position: "absolute",
                  top: "55px",
                  right: "22px",
                  fontSize: "35px", // Pushed size from 20px to 26px for bold prominence
                  zIndex: 10,
                  filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))",
                }}
                title="Verified Top Seller"
              >
                🔰
              </div>

              <div className="card-body p-4">
                <p
                  className="text-uppercase text-muted small mb-3 font-weight-bold"
                  style={{ letterSpacing: "0.8px", fontSize: "11px" }}
                >
                  Seller Information
                </p>

                {/* Identity Hub (Avatar & Name) */}
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      backgroundColor: "rgb(232, 247, 240)",
                      color: "#10b981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      fontWeight: 700,
                    }}
                  >
                    {listing.seller?.name?.charAt(0).toUpperCase() || "S"}
                  </div>
                  <div style={{ paddingRight: "35px" }}>
                    {" "}
                    {/* Expanded padding clearance for the larger badge asset */}
                    <h2
                      className="h6 fw-bold mb-1"
                      style={{ color: "#0f172a", margin: 0 }}
                    >
                      {listing.seller?.name || "SellQuickest Merchant"}
                    </h2>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#10b981",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span>✓</span> Verified Profile
                    </div>
                  </div>
                </div>

                {/* 💡 COPY AND USE THIS EXACT LINE FOR SHARPER, DARKER SEPARATORS: */}
                <div
                  style={{
                    borderBottom: "1px solid rgba(15, 23, 42, 0.12)",
                    width: "100%",
                  }}
                />

                {/* STRUCTURED SELLER METRICS ROWS CONTAINER */}
                <div
                  style={{ fontSize: "13px", color: "#475569" }}
                  className="mb-4"
                >
                  <div className="d-flex justify-content-between py-2">
                    <span>Seller Type:</span>
                    <strong style={{ color: "#0f172a", fontWeight: 500 }}>
                      Individual Seller
                    </strong>
                  </div>
                  <div className="border-bottom border-light w-100" />

                  <div className="d-flex justify-content-between py-2">
                    <span>Location:</span>
                    <strong style={{ color: "#0f172a", fontWeight: 500 }}>
                      {listing.location || "Lagos, Nigeria"}
                    </strong>
                  </div>
                  <div className="border-bottom border-light w-100" />

                  <div className="d-flex justify-content-between py-2">
                    <span>Member since:</span>
                    <strong style={{ color: "#0f172a", fontWeight: 500 }}>
                      {listing.seller?.createdAt
                        ? new Date(listing.seller.createdAt).getFullYear()
                        : "2026"}
                    </strong>
                  </div>
                  <div className="border-bottom border-light w-100" />

                  <div className="d-flex justify-content-between py-2">
                    <span>Seller activity:</span>
                    <strong style={{ color: "#10b981", fontWeight: 500 }}>
                      ● Active now
                    </strong>
                  </div>

                  <div className="border-bottom border-light w-100" />

                  <InteractiveRatingConsole
                    initialRating={4.9}
                    initialReviews={24}
                  />

                  <div className="border-bottom border-light w-100 mb-4" />
                </div>

                {/* SIDE-BY-SIDE REACTION BUTTONS CONNECTIONS MATRIX */}
                <div
                  className="d-flex gap-2 mb-2"
                  style={{ marginTop: "-10px" }}
                >
                  {listing.seller?.phone && (
                    <a
                      href={`tel:${listing.seller.phone.replace(/\s/g, "")}`}
                      className="btn fw-bold d-flex align-items-center justify-content-center gap-1.5 text-decoration-none flex-grow-1"
                      style={{
                        height: "46px",
                        backgroundColor: "#10b981",
                        color: "#ffffff",
                        borderRadius: "14px",
                        border: "none",
                        fontSize: "13px",
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.12)",
                      }}
                    >
                      📞 Call Seller
                    </a>
                  )}

                  <Link
                    href={`/messages/chat?listingId=${listing.id}`}
                    className="btn d-flex align-items-center justify-content-center text-decoration-none flex-grow-1"
                    style={{
                      height: "46px",
                      backgroundColor: "#ffffff",
                      color: "#10b981",
                      borderRadius: "14px",
                      fontWeight: 600,
                      fontSize: "13px",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                    }}
                  >
                    💬 Live Chat
                  </Link>
                </div>

                {/* Master Vendor Profile Navigation Baseline Hook */}
                <Link
                  href={`/seller/${listing.seller?.id || ""}`}
                  className="btn w-100 d-flex align-items-center justify-content-center text-decoration-none"
                  style={{
                    height: "38px",
                    backgroundColor: "transparent",
                    color: "#64748b",
                    borderRadius: "14px",
                    fontWeight: 500,
                    fontSize: "13px",
                    border: "none",
                    marginTop: "4px",
                  }}
                >
                  View Seller Profile →
                </Link>
              </div>
            </aside>

            {/* Protective Safe Trading Tips Card Base */}
            <div
              style={{
                backgroundColor: "rgb(232, 247, 240)",
                borderRadius: "24px",
                padding: "1.75rem",
                border: "1px solid rgba(16, 185, 129, 0.08)",
              }}
            >
              <div
                className="d-flex align-items-center gap-2 mb-2.5"
                style={{ color: "#0f172a", fontWeight: 600, fontSize: "14px" }}
              >
                <span>🛡</span> Safe Trading Tips
              </div>
              <ul
                className="d-flex flex-column gap-2 m-0 p-0 list-unstyled"
                style={{
                  fontSize: "13px",
                  color: "#334155",
                  lineHeight: "1.5",
                }}
              >
                <li className="d-flex align-items-start gap-2">
                  <span style={{ color: "#10b981" }}>✔</span>
                  <span>
                    Inspect the product physically before making payments.
                  </span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <span style={{ color: "#10b981" }}>✔</span>
                  <span>
                    Always set up meetings in secure public locations.
                  </span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <span style={{ color: "#10b981" }}>✔</span>
                  <span>
                    Never send deposits or financial down-payments to strangers.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* REPLICATED SIMILAR RECOMMENDATIONS FEED ROW MATRIX */}
      {related.length > 0 && (
        <section className="mt-5 pt-3">
          <h2
            className="h4 fw-bold mb-3"
            style={{ color: "#0f172a", letterSpacing: "-0.5px" }}
          >
            Similar ads
          </h2>
          <div className="row g-3">
            {related.map((item) => (
              <div key={item.id} className="col-6 col-lg-3">
                <ListingCard
                  listing={{
                    ...item,
                    imageUrl: item.imageUrl || null,
                    location: item.location || null,
                    medalTier: null,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
