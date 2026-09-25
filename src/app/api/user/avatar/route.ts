import { NextRequest, NextResponse } from "next/server";
import { getSession, setSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const sessionUser = await getSession();
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";
    let avatarUrl = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("avatar") as File | null;
      if (!file || !(file instanceof File)) {
        return NextResponse.json(
          { error: "No image file provided." },
          { status: 400 }
        );
      }

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
      const body = await req.json();
      avatarUrl = body.avatarUrl;
    }

    if (!avatarUrl || typeof avatarUrl !== "string") {
      return NextResponse.json(
        { error: "Invalid avatar data provided." },
        { status: 400 }
      );
    }

    // Update database
    const updated = await prisma.user.update({
      where: { id: sessionUser.id },
      data: { avatarUrl },
    });

    // Update current session cookie
    await setSession({
      ...sessionUser,
      avatarUrl: updated.avatarUrl,
    });

    return NextResponse.json({
      success: true,
      avatarUrl: updated.avatarUrl,
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

export async function DELETE() {
  try {
    const sessionUser = await getSession();
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
