import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || "image/jpeg";
      const base64Url = `data:${mimeType};base64,${buffer.toString("base64")}`;

      return NextResponse.json({
        success: true,
        url: base64Url,
        fileName: file.name,
        size: file.size,
      });
    }

    const body = await req.json();
    if (!body.dataUrl) {
      return NextResponse.json({ error: "Image data required" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      url: String(body.dataUrl),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Image upload failed" },
      { status: 500 }
    );
  }
}
