// Six Words to a Payday — entry program.
//
// Reads the six-word story from entry.txt at the repository root and writes
// it, unchanged, to entry.txt in the output directory named by
// MAKEFUN_OUTPUT_DIR (or MAKEFUN_BOT_DIR, falling back to ./output).
// The entry itself is exactly six words and 41 characters, inside the
// gate's 1–60 character window. Node 22 stdlib only, no network, no clock.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(repoRoot, "entry.txt"), "utf8").trim();

const words = text.split(/\s+/).filter(Boolean);
if (words.length !== 6) {
  throw new Error(`entry must be exactly six words, got ${words.length}`);
}
if (text.length > 60) {
  throw new Error(`entry must be at most 60 characters, got ${text.length}`);
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  join(repoRoot, "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
