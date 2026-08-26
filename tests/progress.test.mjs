import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("app/story-experience.tsx", "utf8");

test("incluye el primer año con sus cuatro estaciones", () => {
  for (const season of ["Primavera", "Verano", "Otoño", "Invierno"]) assert.match(source, new RegExp(`season:\\"${season}\\"`));
  assert.equal((source.match(/image:\"station-[1-4]-/g) || []).length, 4);
});

test("ofrece cuatro hallazgos por estación", () => {
  assert.equal((source.match(/question:\"/g) || []).length, 16);
});

test("usa una clave de progreso versionada", () => assert.match(source, /historia-en-casa-progress-v2/));
