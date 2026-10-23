import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProfileClientView } from "@/components/ProfileClientView";

export default async function ProfilePage() {
  const sessionUser = await getSession();

  let dbUser: any = null;
  if (sessionUser?.id) {
    try {
      dbUser = await prisma.user.findUnique({
        where: { id: sessionUser.id },
        include: {
          _count: {
            select: { listings: true },
          },
        },
      });
    } catch {}
  }

  return <ProfileClientView serverSessionUser={sessionUser} dbUser={dbUser} />;
}
