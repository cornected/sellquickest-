import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PostAuthGuard } from "@/components/PostAuthGuard";

export default async function PostPage() {
  const user = await getSession();
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="w-100 py-1 min-vh-100">
      <h1 className="h3 fw-bold">Post an ad</h1>
      <p className="text-secondary small mb-3">
        Reach buyers in your city. Be honest about condition and price.
      </p>
      <PostAuthGuard serverUser={user} categories={categories} />
    </main>
  );
}
