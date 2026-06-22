import { NextResponse } from "next/server";
import { prisma, isReadonlyDatabaseError } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

export async function GET() {
  const midias = await prisma.midia.findMany({
    orderBy: [{ destaqueHome: "desc" }, { ordem: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(midias);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Arquivo obrigatório" }, { status: 400 });

  try {
    const { url, tipo } = await saveUpload(file);
    const midia = await prisma.midia.create({
      data: {
        url,
        tipo,
        titulo: (form.get("titulo") as string) || null,
        destaqueHome: form.get("destaqueHome") === "true",
        ordem: Number(form.get("ordem") || 0),
      },
    });
    return NextResponse.json(midia, { status: 201 });
  } catch (e) {
    if (isReadonlyDatabaseError(e)) {
      return NextResponse.json(
        {
          error:
            "Banco de dados indisponível. Configure DATABASE_URL do Neon na Vercel (postgresql://...).",
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erro no upload" },
      { status: 400 }
    );
  }
}
