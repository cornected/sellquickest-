import { execSync } from "node:child_process";

const resolvedUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL ||
  "postgresql://postgres:postgres@localhost:5432/sellquickest?schema=public";

const env = {
  ...process.env,
  DATABASE_URL: resolvedUrl,
};

try {
  execSync("npx prisma generate", { stdio: "inherit", env });
} catch (err) {
  console.warn("Prisma generate warning:", err?.message || err);
}

const hasRemoteDb =
  Boolean(process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL) &&
  !resolvedUrl.includes("localhost") &&
  !resolvedUrl.includes("127.0.0.1");

if (hasRemoteDb) {
  try {
    execSync("npx prisma db push --accept-data-loss", { stdio: "inherit", env });
  } catch (err) {
    console.warn("Prisma db push warning:", err?.message || err);
  }
}
