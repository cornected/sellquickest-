import { SessionUser } from "@/lib/auth";

export function isUserAdmin(user: SessionUser | null | undefined): boolean {
  if (!user) return false;
  const email = (user.email || "").toLowerCase().trim();
  return (
    email === "corneliusokabichi@gmail.com" ||
    email === "ada@classi.local" ||
    email.startsWith("admin@") ||
    email.includes("admin") ||
    (user as any).role === "ADMIN"
  );
}

export const DEMO_ADMIN_USER = {
  id: "admin-cornelius-01",
  name: "Cornelius (Admin)",
  email: "corneliusokabichi@gmail.com",
};
