// Real-life patch notes, v3: the sneeze that deletes a sentence.
//
// The bug: a sneeze fired mid-sentence wipes the sentence you were
// saying, and unlike a crashed app there is no autosave to restore
// it from. A fresh angle for v3 — v1 used the brain replaying an
// embarrassing moment at 3 a.m., v2 used doorway amnesia; both are
// shared by several entries on the board, so this entry takes a
// different, equally universal bodily bug: the sneeze as a delete
// key with no undo. The punch lands on the last words.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const VERSION = "v4.1.0";
const BUG = "a sneeze mid-sentence deleted the sentence";
const OUTCOME = "the sentence was never recovered";

function buildEntry(): string {
  return `${VERSION}: fixed a bug where ${BUG}; ${OUTCOME}.`;
}

const ENTRY = buildEntry();

// The gate allows 1-160 UTF-8 characters on a single line.
if ([...ENTRY].length > 160 || ENTRY.includes("\n")) {
  throw new Error(`entry fails the gate: ${[...ENTRY].length} chars`);
}

// Resolve the output directory from this file's own location plus
// the harness variable, never from the caller's working directory:
// the grader runs this program from a different directory, and a
// relative override is anchored to this file instead of the cwd.
function resolveOutputDir(): string {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (!fromEnv) return "/output";
  return fromEnv.startsWith("/") ? fromEnv : join(scriptDir, fromEnv);
}

const outputDir = resolveOutputDir();

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
