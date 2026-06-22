-- CreateTable
CREATE TABLE "Trabalho" (
    "id" TEXT NOT NULL,
    "instagram" TEXT,
    "clienteNome" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "destaqueHome" BOOLEAN NOT NULL DEFAULT false,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trabalho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrabalhoFoto" (
    "id" TEXT NOT NULL,
    "trabalhoId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" "TipoMidia" NOT NULL DEFAULT 'FOTO',
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TrabalhoFoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrabalhoFoto" ADD CONSTRAINT "TrabalhoFoto_trabalhoId_fkey" FOREIGN KEY ("trabalhoId") REFERENCES "Trabalho"("id") ON DELETE CASCADE ON UPDATE CASCADE;
