import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fzr-v",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Search RISC-V instruction</title>
        <meta name="description" content="Search RISC-V instructions" />
        <meta property="og:title" content="Search RISC-V instruction" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Search RISC-V instructions" />
        <meta property="og:url" content="https://fzr-v.vercel.app/" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
