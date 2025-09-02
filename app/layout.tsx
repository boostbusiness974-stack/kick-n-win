import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kick'n Win ⚡ Pronostics sans argent",
  description:
    "Pronostique sans argent, grimpe au classement et gagne des Kicks !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
        {children}
      </body>
    </html>
  );
}