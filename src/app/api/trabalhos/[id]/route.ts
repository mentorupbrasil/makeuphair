import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { deleteUpload } from "@/lib/upload";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const trabalho = await prisma.trabalho.update({
    where: { id },
    data: body,
    include: { fotos: { orderBy: { ordem: "asc" } } },
  });
  return NextResponse.json(trabalho);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const trabalho = await prisma.trabalho.findUnique({
    where: { id },
    include: { fotos: true },
  });
  if (!trabalho) return NextResponse.json({ error: "Not found" }, { status: 404 });

  for (const foto of trabalho.fotos) {
    await deleteUpload(foto.url);
  }
  await prisma.trabalho.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
