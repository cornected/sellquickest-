import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession, setSession, verifySessionToken, SessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function resolveRequestUser(req: NextRequest): Promise<SessionUser | null> {
  let user = await getSession();
  if (!user) {
    const authHeader =
      req.headers.get("authorization") || req.headers.get("x-session-token");
    if (authHeader) {
      user = verifySessionToken(authHeader);
    }
  }
  return user;
}

export async function POST(req: NextRequest) {
  try {
    let sessionUser = await resolveRequestUser(req);

    const contentType = req.headers.get("content-type") || "";
    let avatarUrl = "";
    let fallbackId = "";
    let fallbackName = "";
    let fallbackEmail = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      fallbackId = String(formData.get("userId") || "").trim();
      fallbackName = String(formData.get("userName") || "").trim();
      fallbackEmail = String(formData.get("userEmail") || "").trim();

      const precompressed = formData.get("avatarDataUrl");
      const file = formData.get("avatar") as File | null;

      if (typeof precompressed === "string" && precompressed.startsWith("data:image/")) {
        avatarUrl = precompressed;
      } else if (file && file instanceof File) {
        if (!file.type.startsWith("image/")) {
          return NextResponse.json(
            { error: "Please upload an image file (PNG, JPG, WEBP)." },
            { status: 400 }
          );
        }

        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: "Image file is too large. Maximum size is 5MB." },
            { status: 400 }
          );
        }

        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        avatarUrl = `data:${file.type};base64,${base64}`;
      } else {
        return NextResponse.json(
          { error: "No image file provided." },
          { status: 400 }
        );
      }
    } else {
      const body = await req.json();
      avatarUrl = body.avatarUrl;
      fallbackId = String(body.userId || "").trim();
      fallbackName = String(body.userName || "").trim();
      fallbackEmail = String(body.userEmail || "").trim();
    }

    if (!sessionUser && fallbackId) {
      sessionUser = {
        id: fallbackId,
        name: fallbackName || "SellQuickest Member",
        email: fallbackEmail || `user-${fallbackId}@sellquickest.ng`,
      };
    }

    if (!sessionUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!avatarUrl || typeof avatarUrl !== "string") {
      return NextResponse.json(
        { error: "Invalid avatar data provided." },
        { status: 400 }
      );
    }

    // Update database and memory/disk store (including name & email so user record is complete)
    const updated = await prisma.user.update({
      where: { id: sessionUser.id },
      data: {
        name: sessionUser.name || fallbackName || "SellQuickest Member",
        email: (sessionUser.email || fallbackEmail || `user-${sessionUser.id}@sellquickest.ng`)
          .toLowerCase()
          .trim(),
        avatarUrl,
      },
    });

    // Update current session cookie (setSession safely omits large data: URLs from cookie header)
    await setSession({
      ...sessionUser,
      avatarUrl: updated.avatarUrl || avatarUrl,
    });

    try {
      revalidatePath("/", "layout");
    } catch {}

    return NextResponse.json({
      success: true,
      avatarUrl: updated.avatarUrl || avatarUrl,
      message: "Profile image updated successfully.",
    });
  } catch (error: any) {
    console.error("Avatar upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update profile photo." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const sessionUser = await resolveRequestUser(req);
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: sessionUser.id },
      data: { avatarUrl: null },
    });

    await setSession({
      ...sessionUser,
      avatarUrl: null,
    });

    try {
      revalidatePath("/", "layout");
    } catch {}

    return NextResponse.json({
      success: true,
      message: "Profile image removed.",
    });
  } catch (error: any) {
    console.error("Avatar delete error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to remove profile photo." },
      { status: 500 }
    );
  }
}
