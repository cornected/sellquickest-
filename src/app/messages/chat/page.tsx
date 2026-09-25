import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ChatWindow } from "./ChatWindow";

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ listingId?: string }>;
}) {
  const user = await getSession();
  const { listingId } = await searchParams;

  if (!listingId) {
    redirect("/messages");
  }

  if (!user) {
    redirect(`/login?next=/messages/chat?listingId=${listingId}`);
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: {
      seller: true,
      category: true,
    },
  });

  if (!listing) {
    redirect("/messages");
  }

  return (
    <main className="container py-4" style={{ maxWidth: "880px" }}>
      <ChatWindow listing={listing} currentUser={user} />
    </main>
  );
}
