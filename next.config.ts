import type { NextConfig } from "next";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const isExport = process.env.STATIC_EXPORT === "true";
const config: NextConfig = { basePath, assetPrefix: basePath || undefined, output: isExport ? "export" : undefined, trailingSlash: isExport, images: { unoptimized: isExport } };
export default config;
