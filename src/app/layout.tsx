import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { BootstrapClient } from "@/components/BootstrapClient";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/auth"; // FIXED: Restored getSession import
import { prisma } from "@/lib/db"; // FIXED: Restored prisma database import
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SellQuickest — Buy and sell near you",
  description:
    "Classifieds marketplace to post ads, search listings, and contact sellers.",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  const user = await getSession();

  // 1. Fetch unread counts safely...
  let unreadMessagesCount = 0;
  let unreadNotificationsCount = 0;

  // 2. NEW DYNAMIC STATE COUNTER: Aggregate total ads for each state from the listing table
  const stateCountsRaw = await prisma.listing
    .groupBy({
      by: ["location"],
      _count: {
        _all: true,
      },
    })
    .catch(() => []);

  // Format the database counts into a clean key-value object map (e.g., { "Lagos": 14, "Oyo": 2 })
  const stateAdCounts: Record<string, number> = {};
  stateCountsRaw.forEach((item) => {
    if (item.location) {
      stateAdCounts[item.location] = item._count._all;
    }
  });

  return (
    <html lang="en" className="h-100">
      <body
        className={`${montserrat.className} d-flex flex-column min-vh-100 bg-body-tertiary`}
      >
        <BootstrapClient />

        <Header
          session={{ user }}
          unreadMessages={unreadMessagesCount}
          unreadNotifications={unreadNotificationsCount}
        />

        {/* 3. Pass the state counts into your page layout tree via a children container or map wrapper if needed, 
            but since SearchBar inside page.tsx is a server component child, let's feed it there instead! */}
        {children}
      </body>
    </html>
  );
}
