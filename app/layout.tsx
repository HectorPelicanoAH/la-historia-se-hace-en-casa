import type { Metadata } from "next";
import "./globals.css";
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const site = process.env.NEXT_PUBLIC_SITE_URL || "https://hectorpelicanoah.github.io/la-historia-se-hace-en-casa";
export const metadata: Metadata = { metadataBase: new URL(site), title: "La historia se hace en casa · Cuento interactivo", description: "Un cuento familiar interactivo para descubrir la historia, observar pistas y hacer actividades en casa.", icons: { icon: `${base}/favicon.svg` }, openGraph: { title: "La historia se hace en casa · Cuento interactivo", description: "Un viaje familiar por la historia para leer, descubrir y hacer.", locale: "es_ES", type: "website", url: site, images: [`${site}/og.png`] } };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="es"><body>{children}</body></html>; }
