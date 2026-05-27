import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Yuana Motor - Bengkel Terpercaya",
  description: "Solusi terbaik untuk perawatan dan perbaikan kendaraan Anda. Mekanik berpengalaman, sparepart original, dan layanan profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
