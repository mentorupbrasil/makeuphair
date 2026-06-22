import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { unlink } from "fs/promises";
import path from "path";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const midia = await prisma.midia.update({ where: { id }, data: body });
  return NextResponse.json(midia);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const midia = await prisma.midia.findUnique({ where: { id } });
  if (!midia) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (midia.url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", midia.url));
    } catch { /* file may not exist */ }
  }

  await prisma.midia.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
