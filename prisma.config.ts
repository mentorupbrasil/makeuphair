import "dotenv/config";
import { defineConfig } from "prisma/config";

/** Migrations precisam de conexão direta (sem pooler) para advisory locks. */
function migrationDatabaseUrl(): string {
  const direct =
    process.env.DIRECT_URL ??
    process.env.DATABASE_URL_UNPOOLED ??
    process.env.POSTGRES_URL_NON_POOLING;

  if (direct) return direct;

  const pooled = process.env.DATABASE_URL;
  if (!pooled) {
    throw new Error("DATABASE_URL is not set");
  }

  if (pooled.includes("-pooler.")) {
    return pooled.replace("-pooler.", ".");
  }

  return pooled;
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: migrationDatabaseUrl(),
  },
});
