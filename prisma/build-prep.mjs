import { execSync } from "node:child_process";
import fs from "node:fs";

const resolvedUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL ||
  "postgresql://postgres:postgres@localhost:5432/sellquickest?schema=public";

const env = {
  ...process.env,
  DATABASE_URL: resolvedUrl,
};

// 1. Self-heal missing node_modules on cold container wake-up
if (!fs.existsSync("node_modules/.bin/next")) {
  console.log("Installing dependencies before starting...");
  try {
    execSync("npm install --no-audit --no-fund", { stdio: "inherit", env });
  } catch (err) {
    console.warn("npm install warning:", err?.message || err);
  }
}

// 2. Remove any stale Next.js dev lock file
try {
  if (fs.existsSync(".next/dev/lock")) {
    fs.rmSync(".next/dev/lock", { force: true });
  }
} catch {
  // ignore
}

// 3. Ensure Prisma Client is generated
if (!fs.existsSync("node_modules/.prisma/client/default.js")) {
  try {
    execSync("npx prisma generate", { stdio: "inherit", env });
  } catch (err) {
    console.warn("Prisma generate warning:", err?.message || err);
  }
}

// 4. Push schema if connected to a remote database
const hasRemoteDb =
  Boolean(
    process.env.DATABASE_URL ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL
  ) &&
  !resolvedUrl.includes("localhost") &&
  !resolvedUrl.includes("127.0.0.1");

if (hasRemoteDb) {
  try {
    execSync("npx prisma db push --accept-data-loss", { stdio: "inherit", env });
  } catch (err) {
    console.warn("Prisma db push warning:", err?.message || err);
  }
}
