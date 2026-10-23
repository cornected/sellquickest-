import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SettingsClientView } from "@/components/SettingsClientView";

export default async function SettingsPage() {
  const sessionUser = await getSession();
  let dbUser: any = null;
  if (sessionUser?.id) {
    dbUser = await prisma.user.findUnique({ where: { id: sessionUser.id } }).catch(() => null);
  }

  return <SettingsClientView serverUser={dbUser || sessionUser} />;
}
