import { redirect } from "next/navigation";
import { PostAdForm } from "@/components/PostAdForm";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function PostPage() {
  const user = await getSession();
  if (!user) redirect("/login?next=/post");
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main
      className="container-xl py-4 min-vh-100"
      style={{ maxWidth: "1200px" }}
    >
      <h1 className="h3 fw-bold">Post an ad</h1>
      <p className="text-secondary">
        Reach buyers in your city. Be honest about condition and price.
      </p>
      <PostAdForm categories={categories} />
    </main>
  );
}
