import { execSync, spawnSync } from "node:child_process";

const result = spawnSync("npx", ["prisma", "migrate", "status"], {
  encoding: "utf8",
  shell: true,
});

const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
process.stdout.write(output);

if (output.includes("Database schema is up to date")) {
  console.log("\n✓ Migrations up to date — skipping deploy");
  process.exit(0);
}

if (output.includes("not yet been applied")) {
  console.log("\n→ Applying pending migrations...");
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
  process.exit(0);
}

process.exit(result.status ?? 1);
