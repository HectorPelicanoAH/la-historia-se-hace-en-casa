import type { Metadata } from "next";
import "./globals.css";
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const site = process.env.NEXT_PUBLIC_SITE_URL || "https://hectorpelicanoah.github.io/la-historia-se-hace-en-casa";
export const metadata: Metadata = { metadataBase: new URL(site), title: "La historia se hace en casa · El libro del bosque", description: "Un libro ilustrado interactivo para viajar en familia por cuatro estaciones de la prehistoria.", icons: { icon: `${base}/favicon.svg` }, openGraph: { title: "La historia se hace en casa · El libro del bosque", description: "Abre el libro, acércate a sus ilustraciones y descubre el primer año de historias.", locale: "es_ES", type: "website", url: site, images: [`${site}/og.png`] }, other: { "screen-orientation": "landscape" } };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="es"><body>{children}</body></html>; }
