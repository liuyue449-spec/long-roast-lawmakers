// The Long Roast: Lawmakers and the File They Cannot Convert
// Entry program: writes one satirical sentence to entry.txt.
//
// The sentence is fixed and deterministic: the same bytes on every run.
// Output directory: $MAKEFUN_OUTPUT_DIR when set, otherwise /output
// (the program/v1 sandbox provides /output; the env var keeps local runs
// and other harnesses working without touching the entry text).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "The senator who spent nine months writing the AI Safety Act — defining 'algorithm' three different ways — just emailed the final draft to his staff as a Pages file and asked them to turn it into one of those PDFs the kids use.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 320 characters,
// not only white space. Fail loudly here rather than shipping a bad file.
const chars = [...ROAST].length;
if (chars < 1 || chars > 320) {
  throw new Error(`Roast is ${chars} characters; the gate allows 1 to 320.`);
}
if (!ROAST.trim()) {
  throw new Error("Roast is only white space.");
}
if (!ROAST.endsWith(".") || ROAST.includes("?") || ROAST.includes("!")) {
  throw new Error("Roast must be exactly one sentence ending in a period.");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ROAST + "\n", "utf8");
console.log(`Wrote ${chars} characters to ${join(outDir, "entry.txt")}`);
