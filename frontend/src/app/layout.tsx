import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Web3Providers } from "../../components/Web3Providers";

export const metadata: Metadata = {
  title: "Regen Peru DAO 🌿 | Impacto Social con Blockchain",
  description: "Una DAO para el voluntariado y la regeneración en Perú. Vota por proyectos de impacto social usando tecnología blockchain en la red Base.",
  keywords: [
    "DAO",
    "Peru",
    "Blockchain",
    "Base",
    "Impacto Social",
    "Voluntariado",
    "Regen",
  ],
  authors: [{ name: "Regen Peru DAO" }],
  creator: "Regen Peru DAO",
  openGraph: {
    title: "Regen Peru DAO 🌿",
    description: "Únete a la primera DAO de impacto social en Perú. Tu voz decide qué proyectos financiamos.",
    url: "https://regen.pe",
    siteName: "Regen Peru DAO",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regen Peru DAO 🌿",
    description: "Una DAO para el voluntariado y la regeneración en Perú.",
    creator: "@RegenPeru",
  },
  metadataBase: new URL("https://regen.pe"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PE">
      <body>
        <Web3Providers>
          {children}
          <Toaster position="bottom-right" richColors closeButton theme="light" />
        </Web3Providers>
      </body>
    </html>
  );
}
