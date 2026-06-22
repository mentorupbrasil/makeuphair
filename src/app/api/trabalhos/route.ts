import { NextResponse } from "next/server";
import { prisma, isReadonlyDatabaseError } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

export async function GET() {
  const trabalhos = await prisma.trabalho.findMany({
    include: { fotos: { orderBy: { ordem: "asc" } } },
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(trabalhos);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await request.formData();
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length !== 3) {
    return NextResponse.json({ error: "Selecione exatamente 3 fotos por modelo" }, { status: 400 });
  }

  const instagram = (form.get("instagram") as string)?.trim() || null;
  const clienteNome = (form.get("clienteNome") as string)?.trim() || null;
  const ordem = Number(form.get("ordem") || 0);
  const destaqueHome = form.get("destaqueHome") === "true";

  try {
    const fotosData = [];
    for (let i = 0; i < files.length; i++) {
      const { url, tipo } = await saveUpload(files[i]);
      fotosData.push({ url, tipo, ordem: i });
    }

    const trabalho = await prisma.trabalho.create({
      data: {
        instagram,
        clienteNome,
        ordem,
        destaqueHome,
        fotos: { create: fotosData },
      },
      include: { fotos: { orderBy: { ordem: "asc" } } },
    });

    return NextResponse.json(trabalho, { status: 201 });
  } catch (e) {
    if (isReadonlyDatabaseError(e)) {
      return NextResponse.json({ error: "Banco de dados indisponível." }, { status: 503 });
    }
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erro no upload" },
      { status: 400 }
    );
  }
}
