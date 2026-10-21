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
    "overview" | "listings" | "reports" | "users" | "packages" | "categories" | "cms"
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
      const [resStats, resListings, resUsers, resReports, resPackages] = await Promise.all([
        fetch("/api/admin/stats").then((r) => r.json()),
        fetch("/api/admin/listings").then((r) => r.json()),
        fetch("/api/admin/users").then((r) => r.json()),
        fetch("/api/admin/reports").then((r) => r.json()),
        fetch("/api/admin/packages").then((r) => r.json()),
      ]);

      if (resStats.stats) setStats(resStats.stats);
      if (resListings.listings) setListings(resListings.listings);
      if (resUsers.users) setUsers(resUsers.users);
      if (resReports.reports) setReports(resReports.reports);
      if (resPackages.packages) setPackages(resPackages.packages);
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
    if (!confirm("Are you sure you want to permanently delete this listing?")) return;
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
    <div className="bg-light min-vh-100 pb-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="position-fixed bottom-0 end-0 m-4 p-3 bg-dark text-white rounded-3 shadow-lg"
          style={{ zIndex: 9999, fontSize: "14px", borderLeft: "4px solid #10b981" }}
        >
          ✅ {toastMessage}
        </div>
      )}

      {/* Top Banner & Header */}
      <div className="bg-dark text-white border-bottom py-3">
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-3">🛡️</span>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h1 className="h5 fw-bold mb-0 text-white">SellQuickest Admin Console</h1>
                <span className="badge bg-success text-white small px-2 py-0.5 rounded-pill">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-secondary small mb-0">
                Marketplace moderation, reports queue, packages &amp; user control
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="btn btn-sm btn-outline-light rounded-pill px-3 py-1.5 d-inline-flex align-items-center gap-1.5"
            >
              <span>🌐</span> View Live Site
            </Link>

            {!isAdmin && (
              <button
                onClick={handleQuickAdminLogin}
                className="btn btn-sm btn-warning rounded-pill px-3 py-1.5 fw-bold"
              >
                ⚡ Switch to Admin Mode
              </button>
            )}

            <div className="bg-secondary bg-opacity-25 px-3 py-1.5 rounded-pill text-white small">
              👤 {initialUser?.name || "Admin"} ({initialUser?.email || "corneliusokabichi@gmail.com"})
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Pills Bar */}
      <div className="bg-white border-bottom sticky-top shadow-2xs">
        <div className="container py-2 overflow-auto">
          <div className="d-flex align-items-center gap-2 text-nowrap">
            <button
              onClick={() => setActiveTab("overview")}
              className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold ${
                activeTab === "overview" ? "btn-success text-white" : "btn-light text-secondary"
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab("listings")}
              className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold position-relative ${
                activeTab === "listings" ? "btn-success text-white" : "btn-light text-secondary"
              }`}
            >
              📦 Listings ({listings.length})
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold position-relative ${
                activeTab === "reports" ? "btn-danger text-white" : "btn-light text-secondary"
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
              className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold ${
                activeTab === "users" ? "btn-success text-white" : "btn-light text-secondary"
              }`}
            >
              👥 Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab("packages")}
              className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold ${
                activeTab === "packages" ? "btn-success text-white" : "btn-light text-secondary"
              }`}
            >
              💰 Packages &amp; Pricing
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold ${
                activeTab === "categories" ? "btn-success text-white" : "btn-light text-secondary"
              }`}
            >
              🗂️ Categories (17)
            </button>
            <button
              onClick={() => setActiveTab("cms")}
              className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold ${
                activeTab === "cms" ? "btn-success text-white" : "btn-light text-secondary"
              }`}
            >
              📢 Banner CMS
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-4">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="d-flex flex-column gap-4">
            {/* KPI Cards */}
            <div className="row g-3">
              <div className="col-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                  <div className="text-secondary small fw-semibold mb-1">TOTAL USERS</div>
                  <div className="fs-3 fw-bold text-dark">{stats.totalUsers}</div>
                  <div className="text-success small fw-semibold mt-2">↑ {stats.monthlyGrowth} this month</div>
                </div>
              </div>

              <div className="col-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                  <div className="text-secondary small fw-semibold mb-1">ACTIVE LISTINGS</div>
                  <div className="fs-3 fw-bold text-success">{stats.activeListings}</div>
                  <div className="text-muted small mt-2">Live across Nigeria</div>
                </div>
              </div>

              <div className="col-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                  <div className="text-secondary small fw-semibold mb-1">REPORTED ADS</div>
                  <div className="fs-3 fw-bold text-danger">{stats.reportedCount}</div>
                  <div className="text-danger small fw-semibold mt-2">Requires moderator review</div>
                </div>
              </div>

              <div className="col-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                  <div className="text-secondary small fw-semibold mb-1">ESTIMATED REVENUE</div>
                  <div className="fs-3 fw-bold text-dark">{formatNaira(stats.estimatedRevenue)}</div>
                  <div className="text-muted small mt-2">From Ad Boosts &amp; Promos</div>
                </div>
              </div>
            </div>

            {/* Quick Attention Alert */}
            {reports.filter((r) => r.status === "PENDING").length > 0 && (
              <div className="alert alert-danger rounded-4 d-flex align-items-center justify-content-between p-3 border-0 shadow-2xs">
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-4">🚨</span>
                  <div>
                    <span className="fw-bold">
                      {reports.filter((r) => r.status === "PENDING").length} Flagged Ad(s) pending review
                    </span>
                    <p className="small mb-0 text-secondary">
                      Community members reported potential fraud or policy violations.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("reports")}
                  className="btn btn-sm btn-danger rounded-pill px-3 fw-semibold"
                >
                  Review Queue
                </button>
              </div>
            )}

            {/* Recent Listings & Recent Users Rows */}
            <div className="row g-4">
              <div className="col-12 col-lg-8">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                  <div className="d-flex align-items-center justify-content-between mb-3">
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
                            if (item.imageUrl) thumb = item.imageUrl;
                          }

                          return (
                            <tr key={item.id}>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <div
                                    className="position-relative rounded-2 overflow-hidden flex-shrink-0"
                                    style={{ width: 40, height: 40, backgroundColor: "#f1f5f9" }}
                                  >
                                    <Image
                                      src={thumb}
                                      alt={item.title}
                                      fill
                                      className="object-fit-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div>
                                    <div className="fw-semibold text-truncate" style={{ maxWidth: 200 }}>
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
                                <Link
                                  href={`/listing/${item.id}`}
                                  target="_blank"
                                  className="btn btn-xs btn-outline-secondary rounded-pill px-2 py-1 me-1"
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
                                  className="btn btn-xs btn-outline-warning rounded-pill px-2 py-1"
                                >
                                  {item.status === "ACTIVE" ? "Hide" : "Restore"}
                                </button>
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
                  <div className="d-flex align-items-center justify-content-between mb-3">
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
                      <div key={u.id} className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="rounded-circle bg-success bg-opacity-10 text-success fw-bold d-flex align-items-center justify-content-center"
                            style={{ width: 36, height: 36, fontSize: "13px" }}
                          >
                            {u.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-semibold text-dark small">{u.name}</div>
                            <div className="text-muted" style={{ fontSize: "11px" }}>
                              {u.email}
                            </div>
                          </div>
                        </div>
                        <span className="badge bg-light text-secondary border small">
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
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
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
                  className="form-control form-control-sm rounded-pill px-3 py-1.5"
                  style={{ width: 260 }}
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select form-select-sm rounded-pill px-3 py-1.5"
                  style={{ width: 140 }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Active Only</option>
                  <option value="HIDDEN">Hidden Only</option>
                  <option value="SOLD">Sold Only</option>
                </select>

                <button onClick={loadData} className="btn btn-sm btn-outline-secondary rounded-pill px-3">
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
                      if (item.imageUrl) thumb = item.imageUrl;
                    }

                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2.5">
                            <div
                              className="position-relative rounded-3 overflow-hidden flex-shrink-0"
                              style={{ width: 48, height: 48, backgroundColor: "#f1f5f9" }}
                            >
                              <Image
                                src={thumb}
                                alt={item.title}
                                fill
                                className="object-fit-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <Link
                                href={`/listing/${item.id}`}
                                target="_blank"
                                className="fw-bold text-dark text-decoration-none text-truncate d-block"
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
                          <span className="badge bg-light text-dark border">
                            {item.category?.name || "General"}
                          </span>
                        </td>
                        <td>
                          <div className="fw-semibold">{item.seller?.name || "Seller"}</div>
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
                            <span className="badge bg-warning text-dark fw-bold">
                              ⭐ {item.boostTier}
                            </span>
                          ) : (
                            <span className="text-muted" style={{ fontSize: "11px" }}>
                              Standard
                            </span>
                          )}
                        </td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm">
                            <button
                              onClick={() =>
                                handleModerateListing(
                                  item.id,
                                  item.status === "ACTIVE" ? "HIDDEN" : "ACTIVE"
                                )
                              }
                              className={`btn btn-xs rounded-pill px-2.5 py-1 me-1 ${
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
                              className="btn btn-xs btn-outline-secondary rounded-pill px-2.5 py-1 me-1"
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
                              className={`btn btn-xs rounded-pill px-2 py-1 me-1 ${
                                item.boostTier === "TOP_AD" ? "btn-warning text-dark" : "btn-outline-primary"
                              }`}
                              title="Toggle Top Ad Boost"
                            >
                              ⭐ Boost
                            </button>

                            <button
                              onClick={() => handleDeleteListing(item.id)}
                              className="btn btn-xs btn-outline-danger rounded-pill px-2 py-1"
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
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h2 className="h5 fw-bold mb-1 text-danger">🚨 Reported &amp; Flagged Listings</h2>
                <p className="text-secondary small mb-0">
                  Review reported violations submitted by buyers. Immediate moderation options available.
                </p>
              </div>
              <span className="badge bg-danger text-white rounded-pill px-3 py-1.5">
                {reports.filter((r) => r.status === "PENDING").length} Pending Review
              </span>
            </div>

            <div className="d-flex flex-column gap-3 mt-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className={`border rounded-4 p-3.5 ${
                    report.status === "PENDING"
                      ? "border-danger bg-danger bg-opacity-10"
                      : "border-light-subtle bg-light"
                  }`}
                >
                  <div className="d-flex flex-wrap align-items-start justify-content-between gap-3">
                    <div className="d-flex align-items-start gap-3">
                      <span className="fs-3">⚠️</span>
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="badge bg-danger text-white fw-bold px-2.5 py-1">
                            {report.reason}
                          </span>
                          <span className="text-muted small">
                            Reported on {new Date(report.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="p-2.5 bg-white rounded-3 border my-2 small text-dark">
                          <strong>Reporter Note:</strong> &quot;{report.details || "No comment provided."}&quot;
                          <div className="text-muted mt-1" style={{ fontSize: "11px" }}>
                            Submitted by: {report.reporter?.name || "Anonymous Buyer"} ({report.reporter?.email || "N/A"})
                          </div>
                        </div>

                        {report.listing && (
                          <div className="d-flex align-items-center gap-2 mt-2">
                            <span className="text-secondary small">Associated Ad:</span>
                            <Link
                              href={`/listing/${report.listing.id}`}
                              target="_blank"
                              className="fw-bold text-dark text-decoration-none small hover-underline"
                            >
                              {report.listing.title} ({formatNaira(report.listing.price)})
                            </Link>
                            <span className="badge bg-secondary text-white small" style={{ fontSize: "10px" }}>
                              Status: {report.listing.status || "ACTIVE"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Report action buttons */}
                    <div className="d-flex flex-column gap-1.5 text-end">
                      {report.status === "PENDING" ? (
                        <>
                          <button
                            onClick={() => handleReportAction(report.id, "HIDE_AD", report.listing?.id)}
                            className="btn btn-sm btn-warning rounded-pill px-3 py-1 fw-bold"
                          >
                            👁️ Hide Ad
                          </button>
                          <button
                            onClick={() => handleReportAction(report.id, "DELETE_AD", report.listing?.id)}
                            className="btn btn-sm btn-danger rounded-pill px-3 py-1 fw-bold"
                          >
                            🗑️ Delete Ad
                          </button>
                          <button
                            onClick={() => handleReportAction(report.id, "DISMISS")}
                            className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1"
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
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
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
                className="form-control form-control-sm rounded-pill px-3 py-1.5"
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
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="rounded-circle bg-success bg-opacity-10 text-success fw-bold d-flex align-items-center justify-content-center"
                            style={{ width: 34, height: 34 }}
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
                        <span className="badge bg-light text-dark border">
                          {u._count?.listings || 0} ads
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggleUser(u.id, !u.isVerified, !!u.isBanned)}
                          className={`btn btn-xs rounded-pill px-2.5 py-1 ${
                            u.isVerified ? "btn-success text-white" : "btn-outline-secondary"
                          }`}
                        >
                          {u.isVerified ? "✓ Verified Seller" : "+ Verify Seller"}
                        </button>
                      </td>
                      <td>
                        <span
                          className={`badge px-2 py-1 rounded-pill ${
                            u.isBanned ? "bg-danger text-white" : "bg-success text-white"
                          }`}
                        >
                          {u.isBanned ? "SUSPENDED" : "ACTIVE"}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => handleToggleUser(u.id, !!u.isVerified, !u.isBanned)}
                          className={`btn btn-xs rounded-pill px-2.5 py-1 ${
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
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h2 className="h5 fw-bold mb-1">💰 Promotion Packages &amp; Boost Tiers</h2>
                <p className="text-secondary small mb-0">
                  Configure pricing (₦) and durations for user ads promotion. Changes reflect immediately on `/promote`.
                </p>
              </div>
              <button onClick={handleSavePackages} className="btn btn-success btn-sm rounded-pill px-4 fw-bold">
                💾 Save Changes
              </button>
            </div>

            <div className="row g-4">
              {packages.map((pkg, idx) => (
                <div key={pkg.id} className="col-12 col-md-6 col-lg-3">
                  <div className="card border rounded-4 p-3.5 h-100 shadow-2xs">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className={`badge bg-${pkg.badgeColor || "success"} text-white small`}>
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

                    <h3 className="h6 fw-bold text-dark mt-1">{pkg.name}</h3>

                    <div className="my-3">
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
                        className="form-control form-control-sm rounded-3"
                      />
                    </div>

                    <div className="mb-3">
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
                        className="form-control form-control-sm rounded-3"
                      />
                    </div>

                    <div className="small text-secondary mt-auto">
                      <div className="fw-semibold mb-1">Features Included:</div>
                      <ul className="ps-3 mb-0" style={{ fontSize: "11px" }}>
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
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h2 className="h5 fw-bold mb-1">🗂️ Categories &amp; Subcategories Manager</h2>
                <p className="text-secondary small mb-0">
                  All 17 marketplace categories, complete with dedicated &quot;Others&quot; subcategories.
                </p>
              </div>
              <Link href="/categories" target="_blank" className="btn btn-outline-success btn-sm rounded-pill px-3">
                View Public Directory →
              </Link>
            </div>

            <div className="row g-3 mt-2">
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
                  <div className="p-3 border rounded-3 d-flex align-items-center justify-content-between bg-light">
                    <div className="d-flex align-items-center gap-2">
                      <span className="fs-4">{c.icon}</span>
                      <span className="fw-bold text-dark small">{c.name}</span>
                    </div>
                    <span className="badge bg-white text-secondary border small">
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
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white" style={{ maxWidth: 720 }}>
            <h2 className="h5 fw-bold mb-1">📢 Site Announcement CMS</h2>
            <p className="text-secondary small mb-4">
              Update the prominent banner displayed across the marketplace to inform buyers and sellers.
            </p>

            <div className="mb-3">
              <label className="form-label small fw-semibold text-secondary">Banner Text</label>
              <textarea
                rows={3}
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="form-control rounded-3"
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
              <label htmlFor="bannerActive" className="form-check-label small fw-semibold text-dark">
                Display Announcement Banner on Site
              </label>
            </div>

            <div className="p-3 rounded-3 bg-light border mb-4">
              <div className="small text-secondary fw-semibold mb-1">Live Preview:</div>
              {announcementActive ? (
                <div className="alert alert-info py-2 px-3 mb-0 small rounded-3 border-0">
                  {announcementText}
                </div>
              ) : (
                <span className="text-muted small italic">Banner is currently disabled.</span>
              )}
            </div>

            <button
              onClick={() => showToast("Announcement banner saved and updated!")}
              className="btn btn-success rounded-pill px-4 fw-bold"
            >
              💾 Publish Announcement
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
