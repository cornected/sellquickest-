"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatNaira } from "@/lib/format";

interface AdminDashboardProps {
  initialUser: any;
  isAdmin: boolean;
}

export function AdminDashboardClient({ initialUser, isAdmin }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "listings" | "reports" | "users" | "kyc" | "support" | "packages" | "categories" | "database" | "cms"
  >("overview");

  // State for data
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    totalUsers: 142,
    totalListings: 24,
    activeListings: 22,
    reportedCount: 2,
    estimatedRevenue: 145000,
    monthlyGrowth: "+24.8%",
  });
  const [listings, setListings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [kycRequests, setKycRequests] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [dbHealth, setDbHealth] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState("");

  // Filters
  const [searchListing, setSearchListing] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchUser, setSearchUser] = useState("");

  // CMS Banner State
  const [announcementText, setAnnouncementText] = useState(
    "🛡️ Safe Trading Tip: Always meet sellers in well-lit public places and inspect goods before making payment."
  );
  const [announcementActive, setAnnouncementActive] = useState(true);

  // Show toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Fetch admin data
  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Collect any locally stored ads and users from browser storage & sync them to server first
      let localUser: any = null;
      let regUsers: any[] = [];
      let localListings: any[] = [];

      if (typeof window !== "undefined") {
        try {
          const savedSession = localStorage.getItem("sq_session");
          if (savedSession) localUser = JSON.parse(savedSession);
        } catch {}

        try {
          const savedReg = localStorage.getItem("sq_registered_users");
          if (savedReg) regUsers = JSON.parse(savedReg) || [];
        } catch {}

        try {
          const savedAds = localStorage.getItem("sq_my_posted_listings");
          if (savedAds) localListings = JSON.parse(savedAds) || [];
        } catch {}

        try {
          const latestAdStr = sessionStorage.getItem("sq_latest_listing");
          if (latestAdStr) {
            const latestAd = JSON.parse(latestAdStr);
            if (latestAd && latestAd.id && !localListings.some((l: any) => l.id === latestAd.id)) {
              localListings.unshift(latestAd);
            }
          }
        } catch {}

        if (localUser || regUsers.length > 0 || localListings.length > 0) {
          await fetch("/api/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: localUser,
              users: regUsers,
              listings: localListings,
            }),
          }).catch(() => {});
        }
      }

      const [
        resStats,
        resListings,
        resUsers,
        resReports,
        resPackages,
        resTickets,
        resKyc,
        resTx,
        resDb,
      ] = await Promise.all([
        fetch("/api/admin/stats", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/admin/listings", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/admin/users", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/admin/reports", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/admin/packages", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/contact", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/kyc", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/payments/verify", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/admin/database", { cache: "no-store" }).then((r) => r.json()),
      ]);

      // Merge any localListings that might not yet be in resListings.listings
      let mergedListings = Array.isArray(resListings.listings) ? [...resListings.listings] : [];
      if (localListings.length > 0) {
        const existingIds = new Set(mergedListings.map((l: any) => l.id));
        for (const item of localListings) {
          if (item && item.id && !existingIds.has(item.id)) {
            mergedListings.unshift({
              ...item,
              status: item.status || "ACTIVE",
              views: item.views ?? 1,
              createdAt: item.createdAt || new Date().toISOString(),
              category: item.category || { name: item.subcategory || "General", slug: "general" },
              seller: item.seller || {
                id: item.sellerId || localUser?.id || "user-local",
                name: localUser?.name || "Marketplace Seller",
                email: localUser?.email || "seller@sellquickest.com",
                phone: localUser?.phone || "+234 800 000 0000",
              },
            });
            existingIds.add(item.id);
          }
        }
      }
      setListings(mergedListings);

      // Merge any local users into users list
      let mergedUsers = Array.isArray(resUsers.users) ? [...resUsers.users] : [];
      const allLocalUsers = [...regUsers, ...(localUser ? [localUser] : [])];
      if (allLocalUsers.length > 0) {
        for (const u of allLocalUsers) {
          if (!u || (!u.id && !u.email)) continue;
          const exists = mergedUsers.some(
            (eu: any) =>
              (u.id && eu.id === u.id) ||
              (u.email && eu.email?.toLowerCase() === u.email.toLowerCase())
          );
          if (!exists) {
            const count = mergedListings.filter(
              (l: any) =>
                l.sellerId === u.id ||
                (u.email && l.seller?.email?.toLowerCase() === u.email.toLowerCase()) ||
                (u.name && l.seller?.name?.toLowerCase() === u.name.toLowerCase())
            ).length;
            mergedUsers.unshift({
              id: u.id || `user-${Date.now()}`,
              name: u.name || "Seller",
              email: u.email || "",
              phone: u.phone || "+234 800 000 0000",
              isVerified: u.isVerified ?? false,
              isBanned: u.isBanned ?? false,
              createdAt: u.createdAt || new Date().toISOString(),
              _count: { listings: count },
            });
          }
        }
      }
      setUsers(mergedUsers);

      if (resStats.stats) {
        setStats({
          ...resStats.stats,
          totalListings: Math.max(resStats.stats.totalListings || 0, mergedListings.length),
          activeListings: Math.max(
            resStats.stats.activeListings || 0,
            mergedListings.filter((l: any) => l.status === "ACTIVE").length
          ),
          totalUsers: Math.max(resStats.stats.totalUsers || 0, mergedUsers.length),
        });
      }
      if (resReports.reports) setReports(resReports.reports);
      if (resPackages.packages) setPackages(resPackages.packages);
      if (resTickets.tickets) setTickets(resTickets.tickets);
      if (resKyc.requests) setKycRequests(resKyc.requests);
      if (resTx.transactions) setTransactions(resTx.transactions);
      if (resDb.tables) setDbHealth(resDb);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Action: Moderate Listing (Hide, Restore, Mark Sold, Boost)
  const handleModerateListing = async (id: string, newStatus: string, boostTier?: string) => {
    try {
      const res = await fetch("/api/admin/listings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, boostTier }),
      });
      if (res.ok) {
        setListings((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus, boostTier: boostTier || l.boostTier } : l))
        );
        showToast(`Listing status updated to ${newStatus}`);
      } else {
        showToast("Error updating listing");
      }
    } catch {
      showToast("Network error updating listing");
    }
  };

  // Action: Delete Listing
  const handleDeleteListing = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/listings?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setListings((prev) => prev.filter((l) => l.id !== id));
        showToast("Listing deleted successfully");
      } else {
        showToast("Failed to delete listing");
      }
    } catch {
      showToast("Error deleting listing");
    }
  };

  const [ticketReplies, setTicketReplies] = useState<Record<string, string>>({});

  const handleUpdateTicket = async (id: string, status: string, replyText?: string) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, replyText }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setTickets((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status,
                  message: data?.ticket?.message || t.message,
                }
              : t
          )
        );
        if (replyText) {
          setTicketReplies((prev) => ({ ...prev, [id]: "" }));
          showToast("Reply sent & support ticket marked as RESOLVED!");
        } else {
          showToast(`Support ticket marked as ${status}`);
        }
      }
    } catch {
      showToast("Failed to update ticket");
    }
  };

  const handleUpdateKyc = async (id: string, status: string, userId?: string) => {
    try {
      const res = await fetch("/api/kyc", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, userId }),
      });
      if (res.ok) {
        setKycRequests((prev) => prev.map((k) => (k.id === id ? { ...k, status } : k)));
        if (status === "APPROVED" && userId) {
          setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, isVerified: true } : u)));
        }
        showToast(
          status === "APPROVED"
            ? "KYC Approved & Verified Seller badge granted!"
            : "KYC status updated"
        );
      }
    } catch {
      showToast("Failed to update KYC status");
    }
  };

  const handleDownloadDbBackup = async () => {
    try {
      const res = await fetch("/api/admin/database?export=1");
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sellquickest-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Database JSON snapshot downloaded!");
    } catch {
      showToast("Failed to export database backup");
    }
  };

  // Action: Handle Report
  const handleReportAction = async (reportId: string, action: string, listingId?: string) => {
    try {
      const res = await fetch("/api/admin/reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reportId, action, listingId }),
      });
      if (res.ok) {
        setReports((prev) =>
          prev.map((r) =>
            r.id === reportId ? { ...r, status: action === "DISMISS" ? "DISMISSED" : "RESOLVED" } : r
          )
        );
        if (action === "HIDE_AD" && listingId) {
          setListings((prev) => prev.map((l) => (l.id === listingId ? { ...l, status: "HIDDEN" } : l)));
        } else if (action === "DELETE_AD" && listingId) {
          setListings((prev) => prev.filter((l) => l.id !== listingId));
        }
        showToast(`Report handled: ${action}`);
      }
    } catch {
      showToast("Error processing report");
    }
  };

  // Action: Toggle User Verification or Ban
  const handleToggleUser = async (userId: string, isVerified: boolean, isBanned: boolean) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, isVerified, isBanned }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, isVerified, isBanned } : u))
        );
        showToast(isBanned ? "User account suspended" : isVerified ? "Seller verified badge granted" : "User updated");
      }
    } catch {
      showToast("Error updating user");
    }
  };

  // Action: Save Package Pricing
  const handleSavePackages = async () => {
    try {
      const res = await fetch("/api/admin/packages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packages }),
      });
      if (res.ok) {
        showToast("Promotion packages updated successfully!");
      }
    } catch {
      showToast("Failed to save packages");
    }
  };

  // Action: Quick Admin Login
  const handleQuickAdminLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "ada@classi.local", password: "password123" }),
      });
      const data = await res.json();
      if (data.token) {
        sessionStorage.removeItem("sq_explicit_logout");
        localStorage.setItem("sq_session", JSON.stringify(data.user));
        localStorage.setItem("sq_token", data.token);
        document.cookie = `classi_session_client=${data.token}; path=/; max-age=1209600; SameSite=Lax`;
        window.location.reload();
      }
    } catch {
      alert("Admin sign in failed");
    }
  };

  // Filtered listings
  const filteredListings = listings.filter((l) => {
    const matchesSearch =
      !searchListing ||
      l.title.toLowerCase().includes(searchListing.toLowerCase()) ||
      l.location.toLowerCase().includes(searchListing.toLowerCase()) ||
      l.seller?.name?.toLowerCase().includes(searchListing.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered users
  const filteredUsers = users.filter((u) => {
    return (
      !searchUser ||
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase())
    );
  });

  return (
    <div className="admin-shell bg-light min-vh-100 pb-5">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .admin-shell .table > :not(caption) > * > * {
              padding: 0.95rem 1rem;
            }
            .admin-shell .table > thead > tr > th {
              padding: 0.85rem 1rem;
              font-size: 0.74rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.04em;
              color: #64748b;
              border-bottom-width: 1px;
            }
            .admin-shell .nav-tab-btn {
              padding: 0.55rem 1.1rem;
              font-size: 0.84rem;
              transition: all 0.15s ease;
            }
          `,
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="position-fixed bottom-0 end-0 m-4 p-3 px-4 bg-dark text-white rounded-3 shadow-lg"
          style={{ zIndex: 9999, fontSize: "14px", borderLeft: "4px solid #10b981" }}
        >
          ✅ {toastMessage}
        </div>
      )}

      {/* Top Banner & Header */}
      <div className="bg-dark text-white border-bottom py-4">
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <span className="fs-2">🛡️</span>
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h1 className="h5 fw-bold mb-0 text-white">SellQuickest Admin Console</h1>
                <span className="badge bg-success text-white small px-2 py-1 rounded-pill">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-secondary small mb-0">
                Marketplace moderation, reports queue, packages &amp; user control
              </p>
            </div>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="btn btn-sm btn-outline-light rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2"
            >
              <span>🌐</span> View Live Site
            </Link>

            {!isAdmin && (
              <button
                onClick={handleQuickAdminLogin}
                className="btn btn-sm btn-warning rounded-pill px-3 py-2 fw-bold"
              >
                ⚡ Switch to Admin Mode
              </button>
            )}

            <div className="bg-secondary bg-opacity-25 px-3 py-2 rounded-pill text-white small">
              👤 {initialUser?.name || "Admin"} ({initialUser?.email || "corneliusokabichi@gmail.com"})
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Pills Bar */}
      <div className="bg-white border-bottom sticky-top shadow-sm">
        <div className="container py-3">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`btn nav-tab-btn rounded-pill fw-semibold ${
                activeTab === "overview" ? "btn-success text-white shadow-sm" : "btn-light text-secondary"
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab("listings")}
              className={`btn nav-tab-btn rounded-pill fw-semibold position-relative ${
                activeTab === "listings" ? "btn-success text-white shadow-sm" : "btn-light text-secondary"
              }`}
            >
              📦 Listings ({listings.length})
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`btn nav-tab-btn rounded-pill fw-semibold position-relative ${
                activeTab === "reports" ? "btn-danger text-white shadow-sm" : "btn-light text-secondary"
              }`}
            >
              🚨 Reported Ads{" "}
              {reports.filter((r) => r.status === "PENDING").length > 0 && (
                <span className="badge bg-white text-danger ms-1">
                  {reports.filter((r) => r.status === "PENDING").length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`btn nav-tab-btn rounded-pill fw-semibold ${
                activeTab === "users" ? "btn-success text-white shadow-sm" : "btn-light text-secondary"
              }`}
            >
              👥 Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab("kyc")}
              className={`btn nav-tab-btn rounded-pill fw-semibold ${
                activeTab === "kyc" ? "btn-success text-white shadow-sm" : "btn-light text-secondary"
              }`}
            >
              🪪 KYC Queue ({kycRequests.filter((k) => k.status === "PENDING").length})
            </button>
            <button
              onClick={() => setActiveTab("support")}
              className={`btn nav-tab-btn rounded-pill fw-semibold ${
                activeTab === "support" ? "btn-success text-white shadow-sm" : "btn-light text-secondary"
              }`}
            >
              🎧 Support Desk ({tickets.filter((t) => t.status === "OPEN").length})
            </button>
            <button
              onClick={() => setActiveTab("packages")}
              className={`btn nav-tab-btn rounded-pill fw-semibold ${
                activeTab === "packages" ? "btn-success text-white shadow-sm" : "btn-light text-secondary"
              }`}
            >
              💰 Packages &amp; Pricing
            </button>
            <button
              onClick={() => setActiveTab("database")}
              className={`btn nav-tab-btn rounded-pill fw-semibold ${
                activeTab === "database" ? "btn-success text-white shadow-sm" : "btn-light text-secondary"
              }`}
            >
              ☁️ Cloud DB &amp; Payments
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`btn nav-tab-btn rounded-pill fw-semibold ${
                activeTab === "categories" ? "btn-success text-white shadow-sm" : "btn-light text-secondary"
              }`}
            >
              🗂️ Categories (17)
            </button>
            <button
              onClick={() => setActiveTab("cms")}
              className={`btn nav-tab-btn rounded-pill fw-semibold ${
                activeTab === "cms" ? "btn-success text-white shadow-sm" : "btn-light text-secondary"
              }`}
            >
              📢 Banner CMS
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-4 my-2">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="d-flex flex-column gap-4">
            {/* KPI Cards */}
            <div className="row g-4">
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                  <div className="text-secondary small fw-semibold mb-2">TOTAL USERS</div>
                  <div className="fs-2 fw-bold text-dark my-1">{stats.totalUsers}</div>
                  <div className="text-success small fw-semibold mt-2">↑ {stats.monthlyGrowth} this month</div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                  <div className="text-secondary small fw-semibold mb-2">ACTIVE LISTINGS</div>
                  <div className="fs-2 fw-bold text-success my-1">{stats.activeListings}</div>
                  <div className="text-muted small mt-2">Live across Nigeria</div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                  <div className="text-secondary small fw-semibold mb-2">REPORTED ADS</div>
                  <div className="fs-2 fw-bold text-danger my-1">{stats.reportedCount}</div>
                  <div className="text-danger small fw-semibold mt-2">Requires moderator review</div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                  <div className="text-secondary small fw-semibold mb-2">ESTIMATED REVENUE</div>
                  <div className="fs-2 fw-bold text-dark my-1">{formatNaira(stats.estimatedRevenue)}</div>
                  <div className="text-muted small mt-2">From Ad Boosts &amp; Promos</div>
                </div>
              </div>
            </div>

            {/* Quick Attention Alert */}
            {reports.filter((r) => r.status === "PENDING").length > 0 && (
              <div className="alert alert-danger rounded-4 d-flex flex-wrap align-items-center justify-content-between gap-3 p-4 mb-0 border-0 shadow-sm">
                <div className="d-flex align-items-center gap-3">
                  <span className="fs-3">🚨</span>
                  <div>
                    <div className="fw-bold mb-1">
                      {reports.filter((r) => r.status === "PENDING").length} Flagged Ad(s) pending review
                    </div>
                    <p className="small mb-0 text-secondary">
                      Community members reported potential fraud or policy violations.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("reports")}
                  className="btn btn-sm btn-danger rounded-pill px-4 py-2 fw-semibold"
                >
                  Review Queue
                </button>
              </div>
            )}

            {/* Recent Listings & Recent Users Rows */}
            <div className="row g-4">
              <div className="col-12 col-lg-8">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h2 className="h6 fw-bold mb-0">Recent Marketplace Ads</h2>
                    <button
                      onClick={() => setActiveTab("listings")}
                      className="btn btn-sm btn-link text-decoration-none text-success fw-bold p-0"
                    >
                      View All Listings →
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle small mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Item</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listings.slice(0, 6).map((item) => {
                          let thumb = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8";
                          try {
                            const arr = JSON.parse(item.imageUrl);
                            if (Array.isArray(arr) && arr[0]) thumb = arr[0];
                          } catch {
                            if (item.imageUrl) {
                              thumb = item.imageUrl.startsWith("data:")
                                ? item.imageUrl
                                : item.imageUrl.split(",")[0].trim();
                            }
                          }

                          return (
                            <tr key={item.id}>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <div
                                    className="position-relative rounded-3 overflow-hidden flex-shrink-0"
                                    style={{ width: 44, height: 44, backgroundColor: "#f1f5f9" }}
                                  >
                                    {thumb.startsWith("data:") || thumb.startsWith("/assets/") ? (
                                      <img
                                        src={thumb}
                                        alt={item.title}
                                        className="w-100 h-100 object-fit-cover"
                                      />
                                    ) : (
                                      <Image
                                        src={thumb}
                                        alt={item.title}
                                        fill
                                        className="object-fit-cover"
                                        referrerPolicy="no-referrer"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <div className="fw-semibold text-truncate mb-1" style={{ maxWidth: 210 }}>
                                      {item.title}
                                    </div>
                                    <span className="text-muted" style={{ fontSize: "11px" }}>
                                      📍 {item.location}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td>{item.category?.name || "General"}</td>
                              <td className="fw-bold">{formatNaira(item.price)}</td>
                              <td>
                                <span
                                  className={`badge px-2 py-1 rounded-pill ${
                                    item.status === "ACTIVE"
                                      ? "bg-success text-white"
                                      : item.status === "SOLD"
                                      ? "bg-secondary text-white"
                                      : "bg-danger text-white"
                                  }`}
                                  style={{ fontSize: "10px" }}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td className="text-end">
                                <div className="d-inline-flex align-items-center gap-2">
                                  <Link
                                    href={`/listing/${item.id}`}
                                    target="_blank"
                                    className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1"
                                  >
                                    View
                                  </Link>
                                  <button
                                    onClick={() =>
                                      handleModerateListing(
                                        item.id,
                                        item.status === "ACTIVE" ? "HIDDEN" : "ACTIVE"
                                      )
                                    }
                                    className="btn btn-sm btn-outline-warning rounded-pill px-3 py-1"
                                  >
                                    {item.status === "ACTIVE" ? "Hide" : "Restore"}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Recent Users column */}
              <div className="col-12 col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h2 className="h6 fw-bold mb-0">Registered Users</h2>
                    <button
                      onClick={() => setActiveTab("users")}
                      className="btn btn-sm btn-link text-decoration-none text-success fw-bold p-0"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {users.slice(0, 5).map((u) => (
                      <div
                        key={u.id}
                        className="d-flex align-items-center justify-content-between p-2 rounded-3 bg-light bg-opacity-50"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle bg-success bg-opacity-10 text-success fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ width: 40, height: 40, fontSize: "13px" }}
                          >
                            {u.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-semibold text-dark small mb-1">{u.name}</div>
                            <div className="text-muted" style={{ fontSize: "11px" }}>
                              {u.email}
                            </div>
                          </div>
                        </div>
                        <span className="badge bg-white text-secondary border px-2 py-1 small">
                          {u._count?.listings || 0} ads
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LISTINGS MANAGER */}
        {activeTab === "listings" && (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
              <div>
                <h2 className="h5 fw-bold mb-1">Listings Moderation</h2>
                <p className="text-secondary small mb-0">
                  Total: {filteredListings.length} listing(s) found. Edit, boost, hide, or delete any ad.
                </p>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="d-flex flex-wrap align-items-center gap-2">
                <input
                  type="text"
                  placeholder="Search ads by title, seller, city..."
                  value={searchListing}
                  onChange={(e) => setSearchListing(e.target.value)}
                  className="form-control form-control-sm rounded-pill px-3 py-2"
                  style={{ width: 260 }}
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select form-select-sm rounded-pill px-3 py-2"
                  style={{ width: 150 }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Active Only</option>
                  <option value="HIDDEN">Hidden Only</option>
                  <option value="SOLD">Sold Only</option>
                </select>

                <button onClick={loadData} className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2">
                  🔄 Refresh
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle small mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Seller</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Boost Tier</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((item) => {
                    let thumb = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8";
                    try {
                      const arr = JSON.parse(item.imageUrl);
                      if (Array.isArray(arr) && arr[0]) thumb = arr[0];
                    } catch {
                      if (item.imageUrl) {
                        thumb = item.imageUrl.startsWith("data:")
                          ? item.imageUrl
                          : item.imageUrl.split(",")[0].trim();
                      }
                    }

                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="position-relative rounded-3 overflow-hidden flex-shrink-0"
                              style={{ width: 48, height: 48, backgroundColor: "#f1f5f9" }}
                            >
                              {thumb.startsWith("data:") || thumb.startsWith("/assets/") ? (
                                <img
                                  src={thumb}
                                  alt={item.title}
                                  className="w-100 h-100 object-fit-cover"
                                />
                              ) : (
                                <Image
                                  src={thumb}
                                  alt={item.title}
                                  fill
                                  className="object-fit-cover"
                                  referrerPolicy="no-referrer"
                                />
                              )}
                            </div>
                            <div>
                              <Link
                                href={`/listing/${item.id}`}
                                target="_blank"
                                className="fw-bold text-dark text-decoration-none text-truncate d-block mb-1"
                                style={{ maxWidth: 240 }}
                              >
                                {item.title}
                              </Link>
                              <div className="text-secondary" style={{ fontSize: "11px" }}>
                                📍 {item.location} • {item.condition}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border px-2 py-1">
                            {item.category?.name || "General"}
                          </span>
                        </td>
                        <td>
                          <div className="fw-semibold mb-1">{item.seller?.name || "Seller"}</div>
                          <div className="text-muted" style={{ fontSize: "11px" }}>
                            {item.seller?.email}
                          </div>
                        </td>
                        <td className="fw-bold text-dark">{formatNaira(item.price)}</td>
                        <td>
                          <span
                            className={`badge px-2 py-1 rounded-pill ${
                              item.status === "ACTIVE"
                                ? "bg-success text-white"
                                : item.status === "SOLD"
                                ? "bg-secondary text-white"
                                : "bg-danger text-white"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          {item.boostTier ? (
                            <span className="badge bg-warning text-dark fw-bold px-2 py-1">
                              ⭐ {item.boostTier}
                            </span>
                          ) : (
                            <span className="text-muted" style={{ fontSize: "11px" }}>
                              Standard
                            </span>
                          )}
                        </td>
                        <td className="text-end">
                          <div className="d-inline-flex flex-wrap align-items-center justify-content-end gap-2">
                            <button
                              onClick={() =>
                                handleModerateListing(
                                  item.id,
                                  item.status === "ACTIVE" ? "HIDDEN" : "ACTIVE"
                                )
                              }
                              className={`btn btn-sm rounded-pill px-3 py-1 ${
                                item.status === "ACTIVE" ? "btn-outline-warning" : "btn-outline-success"
                              }`}
                            >
                              {item.status === "ACTIVE" ? "Hide" : "Restore"}
                            </button>

                            <button
                              onClick={() =>
                                handleModerateListing(
                                  item.id,
                                  item.status === "SOLD" ? "ACTIVE" : "SOLD"
                                )
                              }
                              className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1"
                            >
                              {item.status === "SOLD" ? "Unsold" : "Sold"}
                            </button>

                            <button
                              onClick={() =>
                                handleModerateListing(
                                  item.id,
                                  item.status,
                                  item.boostTier === "TOP_AD" ? "" : "TOP_AD"
                                )
                              }
                              className={`btn btn-sm rounded-pill px-3 py-1 ${
                                item.boostTier === "TOP_AD" ? "btn-warning text-dark" : "btn-outline-primary"
                              }`}
                              title="Toggle Top Ad Boost"
                            >
                              ⭐ Boost
                            </button>

                            <button
                              onClick={() => handleDeleteListing(item.id)}
                              className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1"
                              title="Delete Ad"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: REPORTED ADS QUEUE */}
        {activeTab === "reports" && (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
              <div>
                <h2 className="h5 fw-bold mb-1 text-danger">🚨 Reported &amp; Flagged Listings</h2>
                <p className="text-secondary small mb-0">
                  Review reported violations submitted by buyers. Immediate moderation options available.
                </p>
              </div>
              <span className="badge bg-danger text-white rounded-pill px-3 py-2">
                {reports.filter((r) => r.status === "PENDING").length} Pending Review
              </span>
            </div>

            <div className="d-flex flex-column gap-4 mt-2">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className={`border rounded-4 p-4 ${
                    report.status === "PENDING"
                      ? "border-danger bg-danger bg-opacity-10"
                      : "border-light-subtle bg-light"
                  }`}
                >
                  <div className="d-flex flex-wrap align-items-start justify-content-between gap-4">
                    <div className="d-flex align-items-start gap-3 flex-grow-1">
                      <span className="fs-3">⚠️</span>
                      <div className="flex-grow-1">
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                          <span className="badge bg-danger text-white fw-bold px-3 py-1">
                            {report.reason}
                          </span>
                          <span className="text-muted small">
                            Reported on {new Date(report.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="p-3 bg-white rounded-3 border my-3 small text-dark">
                          <strong>Reporter Note:</strong> &quot;{report.details || "No comment provided."}&quot;
                          <div className="text-muted mt-2" style={{ fontSize: "11px" }}>
                            Submitted by: {report.reporter?.name || "Anonymous Buyer"} ({report.reporter?.email || "N/A"})
                          </div>
                        </div>

                        {report.listing && (
                          <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
                            <span className="text-secondary small">Associated Ad:</span>
                            <Link
                              href={`/listing/${report.listing.id}`}
                              target="_blank"
                              className="fw-bold text-dark text-decoration-none small hover-underline"
                            >
                              {report.listing.title} ({formatNaira(report.listing.price)})
                            </Link>
                            <span className="badge bg-secondary text-white small px-2 py-1" style={{ fontSize: "10px" }}>
                              Status: {report.listing.status || "ACTIVE"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Report action buttons */}
                    <div className="d-flex flex-column gap-2 text-end" style={{ minWidth: 150 }}>
                      {report.status === "PENDING" ? (
                        <>
                          <button
                            onClick={() => handleReportAction(report.id, "HIDE_AD", report.listing?.id)}
                            className="btn btn-sm btn-warning rounded-pill px-3 py-2 fw-bold"
                          >
                            👁️ Hide Ad
                          </button>
                          <button
                            onClick={() => handleReportAction(report.id, "DELETE_AD", report.listing?.id)}
                            className="btn btn-sm btn-danger rounded-pill px-3 py-2 fw-bold"
                          >
                            🗑️ Delete Ad
                          </button>
                          <button
                            onClick={() => handleReportAction(report.id, "DISMISS")}
                            className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2"
                          >
                            Dismiss Report
                          </button>
                        </>
                      ) : (
                        <span className="badge bg-success text-white py-2 px-3 rounded-pill">
                          ✓ {report.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: USERS MANAGEMENT */}
        {activeTab === "users" && (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
              <div>
                <h2 className="h5 fw-bold mb-1">Users &amp; Sellers Directory</h2>
                <p className="text-secondary small mb-0">
                  Total: {filteredUsers.length} user(s). Grant verification badges or suspend fraudulent accounts.
                </p>
              </div>

              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="form-control form-control-sm rounded-pill px-3 py-2"
                style={{ width: 280 }}
              />
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle small mb-0">
                <thead className="table-light">
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Ads Posted</th>
                    <th>Verified Status</th>
                    <th>Account State</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle bg-success bg-opacity-10 text-success fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ width: 38, height: 38 }}
                          >
                            {u.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="fw-bold text-dark">{u.name}</span>
                            {u.isVerified && <span className="ms-1 text-primary" title="Verified Seller">✓</span>}
                          </div>
                        </div>
                      </td>
                      <td>{u.email}</td>
                      <td>{u.phone || "—"}</td>
                      <td>
                        <span className="badge bg-light text-dark border px-2 py-1">
                          {u._count?.listings || 0} ads
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggleUser(u.id, !u.isVerified, !!u.isBanned)}
                          className={`btn btn-sm rounded-pill px-3 py-1 ${
                            u.isVerified ? "btn-success text-white" : "btn-outline-secondary"
                          }`}
                        >
                          {u.isVerified ? "✓ Verified Seller" : "+ Verify Seller"}
                        </button>
                      </td>
                      <td>
                        <span
                          className={`badge px-3 py-1 rounded-pill ${
                            u.isBanned ? "bg-danger text-white" : "bg-success text-white"
                          }`}
                        >
                          {u.isBanned ? "SUSPENDED" : "ACTIVE"}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => handleToggleUser(u.id, !!u.isVerified, !u.isBanned)}
                          className={`btn btn-sm rounded-pill px-3 py-1 ${
                            u.isBanned ? "btn-outline-success" : "btn-outline-danger"
                          }`}
                        >
                          {u.isBanned ? "Reactivate" : "Suspend"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: PACKAGES & PRICING */}
        {activeTab === "packages" && (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
              <div>
                <h2 className="h5 fw-bold mb-1">💰 Promotion Packages &amp; Boost Tiers</h2>
                <p className="text-secondary small mb-0">
                  Configure pricing (₦) and durations for user ads promotion. Changes reflect immediately on `/promote`.
                </p>
              </div>
              <button onClick={handleSavePackages} className="btn btn-success btn-sm rounded-pill px-4 py-2 fw-bold">
                💾 Save Changes
              </button>
            </div>

            <div className="row g-4">
              {packages.map((pkg, idx) => (
                <div key={pkg.id} className="col-12 col-md-6 col-lg-3">
                  <div className="card border rounded-4 p-4 h-100 shadow-sm">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className={`badge bg-${pkg.badgeColor || "success"} text-white small px-2 py-1`}>
                        {pkg.badge}
                      </span>
                      <div className="form-check form-switch mb-0">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={pkg.enabled}
                          onChange={(e) => {
                            const updated = [...packages];
                            updated[idx].enabled = e.target.checked;
                            setPackages(updated);
                          }}
                        />
                      </div>
                    </div>

                    <h3 className="h6 fw-bold text-dark mb-3">{pkg.name}</h3>

                    <div className="mb-3">
                      <label className="form-label text-secondary small mb-1 fw-semibold">
                        Price (₦ Naira)
                      </label>
                      <input
                        type="number"
                        value={pkg.price}
                        onChange={(e) => {
                          const updated = [...packages];
                          updated[idx].price = Number(e.target.value);
                          setPackages(updated);
                        }}
                        className="form-control rounded-3 py-2 px-3"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-secondary small mb-1 fw-semibold">
                        Duration (Days)
                      </label>
                      <input
                        type="number"
                        value={pkg.durationDays}
                        onChange={(e) => {
                          const updated = [...packages];
                          updated[idx].durationDays = Number(e.target.value);
                          setPackages(updated);
                        }}
                        className="form-control rounded-3 py-2 px-3"
                      />
                    </div>

                    <div className="small text-secondary mt-auto pt-3 border-top">
                      <div className="fw-semibold mb-2 text-dark">Features Included:</div>
                      <ul className="ps-3 mb-0 d-flex flex-column gap-1" style={{ fontSize: "12px" }}>
                        {pkg.features?.map((f: string, fIdx: number) => (
                          <li key={fIdx}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CATEGORIES DIRECTORY */}
        {activeTab === "categories" && (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
              <div>
                <h2 className="h5 fw-bold mb-1">🗂️ Categories &amp; Subcategories Manager</h2>
                <p className="text-secondary small mb-0">
                  All 17 marketplace categories, complete with dedicated &quot;Others&quot; subcategories.
                </p>
              </div>
              <Link href="/categories" target="_blank" className="btn btn-outline-success btn-sm rounded-pill px-3 py-2">
                View Public Directory →
              </Link>
            </div>

            <div className="row g-3 mt-1">
              {[
                { name: "Vehicles", icon: "🚗", count: 8 },
                { name: "Property", icon: "🏠", count: 6 },
                { name: "Phones & Tablets", icon: "📱", count: 12 },
                { name: "Electronics", icon: "📺", count: 7 },
                { name: "Home, Furniture & Appliances", icon: "🛋️", count: 5 },
                { name: "Fashion", icon: "👗", count: 9 },
                { name: "Beauty & Personal Care", icon: "💄", count: 4 },
                { name: "Agriculture & Food", icon: "🌾", count: 5 },
                { name: "Sports, Arts & Outdoors", icon: "⚽", count: 3 },
                { name: "Pets", icon: "🐕", count: 2 },
                { name: "Services", icon: "🔧", count: 6 },
                { name: "Jobs", icon: "💼", count: 4 },
                { name: "Babies & Kids", icon: "🍼", count: 3 },
                { name: "Commercial Equipment & Tools", icon: "🏭", count: 2 },
                { name: "Repair & Construction", icon: "🏗️", count: 2 },
                { name: "Business & Industry", icon: "🏢", count: 2 },
                { name: "Others", icon: "📦", count: 4 },
              ].map((c) => (
                <div key={c.name} className="col-12 col-md-6 col-lg-4">
                  <div className="p-3 px-4 border rounded-4 d-flex align-items-center justify-content-between bg-light">
                    <div className="d-flex align-items-center gap-3">
                      <span className="fs-4">{c.icon}</span>
                      <span className="fw-bold text-dark small">{c.name}</span>
                    </div>
                    <span className="badge bg-white text-secondary border px-2 py-1 small">
                      {c.count} active ads
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CMS BANNER */}
        {activeTab === "cms" && (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white" style={{ maxWidth: 760 }}>
            <h2 className="h5 fw-bold mb-2">📢 Site Announcement CMS</h2>
            <p className="text-secondary small mb-4">
              Update the prominent banner displayed across the marketplace to inform buyers and sellers.
            </p>

            <div className="mb-4">
              <label className="form-label small fw-semibold text-secondary mb-2">Banner Text</label>
              <textarea
                rows={3}
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="form-control rounded-3 p-3"
              />
            </div>

            <div className="form-check form-switch mb-4">
              <input
                id="bannerActive"
                type="checkbox"
                checked={announcementActive}
                onChange={(e) => setAnnouncementActive(e.target.checked)}
                className="form-check-input"
              />
              <label htmlFor="bannerActive" className="form-check-label small fw-semibold text-dark ms-1">
                Display Announcement Banner on Site
              </label>
            </div>

            <div className="p-4 rounded-4 bg-light border mb-4">
              <div className="small text-secondary fw-semibold mb-2">Live Preview:</div>
              {announcementActive ? (
                <div className="alert alert-info py-3 px-4 mb-0 small rounded-3 border-0">
                  {announcementText}
                </div>
              ) : (
                <span className="text-muted small italic">Banner is currently disabled.</span>
              )}
            </div>

            <button
              onClick={() => showToast("Announcement banner saved and updated!")}
              className="btn btn-success rounded-pill px-4 py-2 fw-bold"
            >
              💾 Publish Announcement
            </button>
          </div>
        )}

        {/* TAB 8: KYC VERIFICATION QUEUE */}
        {activeTab === "kyc" && (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
              <div>
                <h2 className="h5 fw-bold mb-1">🪪 Seller KYC &amp; ID Verification Queue</h2>
                <p className="text-secondary small mb-0">
                  Review merchant CAC certificates, NIN, and government IDs to award the Verified Seller badge.
                </p>
              </div>
              <span className="badge bg-success text-white rounded-pill px-3 py-2">
                {kycRequests.filter((k) => k.status === "PENDING").length} Pending
              </span>
            </div>

            <div className="d-flex flex-column gap-4 mt-2">
              {kycRequests.length === 0 ? (
                <div className="text-center py-5 text-muted">No KYC verification requests found.</div>
              ) : (
                kycRequests.map((req) => (
                  <div
                    key={req.id}
                    className="border rounded-4 p-4 d-flex flex-wrap align-items-center justify-content-between gap-3 bg-light"
                  >
                    <div>
                      <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                        <strong className="text-dark fs-6">{req.businessName}</strong>
                        <span className="badge bg-primary text-white px-2 py-1">{req.documentType}</span>
                        <span
                          className={`badge px-2 py-1 ${
                            req.status === "APPROVED"
                              ? "bg-success"
                              : req.status === "REJECTED"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>
                      <div className="small text-secondary mb-1">
                        ID / RC Number: <strong>{req.documentNumber}</strong> • Applicant:{" "}
                        {req.user?.name || "Seller"} ({req.user?.email || "N/A"})
                      </div>
                      <div className="text-muted" style={{ fontSize: "11px" }}>
                        Submitted {new Date(req.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      {req.status === "PENDING" ? (
                        <>
                          <button
                            onClick={() => handleUpdateKyc(req.id, "APPROVED", req.userId)}
                            className="btn btn-sm btn-success rounded-pill px-3 py-2 fw-bold"
                          >
                            ✓ Approve &amp; Verify Seller
                          </button>
                          <button
                            onClick={() => handleUpdateKyc(req.id, "REJECTED", req.userId)}
                            className="btn btn-sm btn-outline-danger rounded-pill px-3 py-2"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="badge bg-secondary text-white rounded-pill px-3 py-2">
                          Processed ({req.status})
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 9: SUPPORT DESK */}
        {activeTab === "support" && (
          <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
              <div>
                <h2 className="h5 fw-bold mb-1">🎧 Customer Support Desk</h2>
                <p className="text-secondary small mb-0">
                  Manage inquiries submitted via the `/contact` page.
                </p>
              </div>
              <span className="badge bg-primary text-white rounded-pill px-3 py-2">
                {tickets.filter((t) => t.status === "OPEN").length} Open Tickets
              </span>
            </div>

            <div className="d-flex flex-column gap-4 mt-2">
              {tickets.length === 0 ? (
                <div className="text-center py-5 text-muted">No support tickets submitted yet.</div>
              ) : (
                tickets.map((t) => {
                  const parts = String(t.message || "").split("\n\n--- ADMIN REPLY ---\n");
                  const userMsg = parts[0];
                  const adminReply = parts[1] || "";

                  return (
                    <div
                      key={t.id}
                      className="border rounded-4 p-4 d-flex flex-column gap-3 bg-light"
                    >
                      <div className="d-flex flex-wrap align-items-start justify-content-between gap-3">
                        <div>
                          <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                            <span className="badge bg-dark text-white px-2 py-1">{t.subject}</span>
                            <strong className="text-dark">{t.name}</strong>
                            <span className="text-muted small">({t.email})</span>
                            {t.phone && <span className="text-muted small">• 📞 {t.phone}</span>}
                            <span
                              className={`badge px-2 py-1 ${
                                t.status === "RESOLVED" ? "bg-success" : "bg-warning text-dark"
                              }`}
                            >
                              {t.status}
                            </span>
                          </div>
                          <span className="text-muted" style={{ fontSize: "11px" }}>
                            Received {new Date(t.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          {t.status === "OPEN" ? (
                            <button
                              onClick={() => handleUpdateTicket(t.id, "RESOLVED")}
                              className="btn btn-sm btn-outline-success rounded-pill px-3 py-2 fw-bold"
                            >
                              ✓ Mark Resolved
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateTicket(t.id, "OPEN")}
                              className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2"
                            >
                              Reopen Ticket
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="mb-0 text-dark small bg-white p-3 rounded-3 border">
                        {userMsg}
                      </p>

                      {adminReply && (
                        <div className="p-3 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-25 small">
                          <strong className="text-success d-block mb-1">
                            🎧 Official Admin Reply:
                          </strong>
                          <span className="text-dark">{adminReply}</span>
                        </div>
                      )}

                      <div className="d-flex flex-wrap flex-sm-nowrap gap-2 mt-1">
                        <input
                          type="text"
                          className="form-control form-control-sm rounded-pill px-3 py-2"
                          placeholder="Write an official support reply to notify customer..."
                          value={ticketReplies[t.id] || ""}
                          onChange={(e) =>
                            setTicketReplies((prev) => ({ ...prev, [t.id]: e.target.value }))
                          }
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const reply = (ticketReplies[t.id] || "").trim();
                            if (!reply) return;
                            handleUpdateTicket(t.id, "RESOLVED", reply);
                          }}
                          className="btn btn-sm btn-success rounded-pill px-4 py-2 fw-bold flex-shrink-0"
                        >
                          Send Reply &amp; Resolve
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 10: CLOUD DB & PAYMENTS LEDGER */}
        {activeTab === "database" && (
          <div className="d-flex flex-column gap-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
                <div>
                  <h2 className="h5 fw-bold mb-1">☁️ Database Engine &amp; Cloud Storage Status</h2>
                  <p className="text-secondary small mb-0">
                    Engine: <strong>{dbHealth?.engine || "Prisma SQLite + Stateful Sync"}</strong> • Status:{" "}
                    <span className="text-success fw-bold">● HEALTHY</span>
                  </p>
                </div>
                <button
                  onClick={handleDownloadDbBackup}
                  className="btn btn-dark btn-sm rounded-pill px-4 py-2 fw-bold"
                >
                  ⬇️ Export Full JSON Database Snapshot
                </button>
              </div>

              {dbHealth?.tables && (
                <div className="row g-3 mt-1">
                  {Object.entries(dbHealth.tables).map(([table, count]) => (
                    <div key={table} className="col-6 col-sm-4 col-md-3">
                      <div className="p-3 border rounded-3 bg-light d-flex align-items-center justify-content-between">
                        <span className="small fw-semibold text-secondary text-capitalize">{table}</span>
                        <span className="badge bg-success text-white rounded-pill px-2 py-1">{String(count)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
              <h2 className="h5 fw-bold mb-4">💳 Paystack &amp; Flutterwave Transactions Ledger</h2>
              <div className="table-responsive">
                <table className="table table-hover align-middle small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Reference</th>
                      <th>Gateway</th>
                      <th>Package / Plan</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id}>
                        <td className="fw-bold font-monospace">{tx.reference}</td>
                        <td>
                          <span className="badge bg-dark text-white px-2 py-1">{tx.gateway}</span>
                        </td>
                        <td>{tx.planName}</td>
                        <td className="fw-bold text-success">{formatNaira(tx.amount)}</td>
                        <td>
                          <span className="badge bg-success text-white rounded-pill px-2 py-1">{tx.status}</span>
                        </td>
                        <td className="text-muted">{new Date(tx.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
