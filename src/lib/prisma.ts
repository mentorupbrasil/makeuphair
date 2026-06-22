import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { normalizeNeonUrl } from "@/lib/db-connection";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const raw = process.env.DATABASE_URL;

  if (!raw) {
    throw new Error(
      "DATABASE_URL não configurada. Use a connection string do Neon (postgresql://...)."
    );
  }

  const connectionString = normalizeNeonUrl(raw);
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export function isReadonlyDatabaseError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("SQLITE_READONLY") ||
    message.includes("read-only") ||
    message.includes("readonly database")
  );
}
