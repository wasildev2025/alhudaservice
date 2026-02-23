import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al-Huda Services | Professional Transport & Ziyarat Packages",
  description: "Breathtakingly fast, premium transport and Ziyarat services in Saudi Arabia. Book your Pick & Drop, Ziyarat packages, or order premium Madinah dates.",
  keywords: ["Al-Huda", "Ziyarat", "Makkah", "Madinah", "Transport", "Saudi Arabia", "Khajoor"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
