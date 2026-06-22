import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { blobOptions } from "@/lib/upload";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathname = path.join("/");

  const result = await get(pathname, {
    access: "private",
    ...blobOptions(),
  });

  if (!result?.stream) {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
