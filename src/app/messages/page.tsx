import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { MessagesList } from "./MessagesList";

export default async function MessagesPage() {
  const user = await getSession();
  if (!user) redirect("/login?next=/messages");

  return (
    <main className="container py-4" style={{ maxWidth: "880px" }}>
      {/* BREADCRUMB */}
      <nav aria-label="breadcrumb" className="mb-2">
        <ol className="breadcrumb small text-secondary mb-0">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
            Messages & Chat
          </li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Messages & Chat</h1>
          <p className="text-secondary small mb-0">
            Real-time chat with buyers and sellers on SellQuickest
          </p>
        </div>
        <Link href="/" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
          Browse Ads
        </Link>
      </div>

      <MessagesList />
    </main>
  );
}
