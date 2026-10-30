import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { isUserAdmin } from "@/lib/adminAuth";
import { AdminDashboardClient } from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Command Center — SellQuickest Nigeria",
  description: "Moderation dashboard, flagged ads review, users directory, and package settings for SellQuickest.",
};

export default async function AdminPage() {
  const sessionUser = await getSession();
  const isAdmin = isUserAdmin(sessionUser);

  return (
    <main className="w-100 min-vh-100 bg-light">
      <AdminDashboardClient
        initialUser={sessionUser || { id: "admin-guest", name: "Guest Admin", email: "corneliusokabichi@gmail.com" }}
        isAdmin={isAdmin}
      />
    </main>
  );
}
