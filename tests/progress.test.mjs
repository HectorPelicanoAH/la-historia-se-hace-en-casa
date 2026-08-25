import test from "node:test";import assert from "node:assert/strict";import fs from "node:fs";
const source=fs.readFileSync("app/story-experience.tsx","utf8");
test("incluye seis años y 24 estaciones",()=>{const block=source.match(/const years=\[([\s\S]*?)\n\];/)?.[1]||"";const rows=[...block.matchAll(/^ \["[^\n]+"\],?$/gm)];assert.equal(rows.length,6);for(const row of rows)assert.equal((row[0].match(/","/g)||[]).length,4)});
test("usa una clave de progreso versionada",()=>assert.match(source,/historia-en-casa-progress-v1/));
