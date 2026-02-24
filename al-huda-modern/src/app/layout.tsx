import type { Metadata } from "next";
import "./globals.css";
import WhatsAppFab from "@/components/ui/WhatsAppFab";

export const metadata: Metadata = {
  title: {
    template: '%s | Al-Huda Services',
    default: 'Al-Huda Services - Premium Ziyarat & Transport in Makkah & Madinah',
  },
  description: 'Book professional transport, custom Ziyarat packages, and purchase premium Madinah dates (Khajoor). Trusted by thousands of pilgrims globally.',
  keywords: ['Umrah taxi', 'Makkah Ziyarat', 'Madinah dates', 'Ajwa Khajoor', 'Jeddah airport transfer', 'Hajj transport'],
  openGraph: {
    title: 'Al-Huda Services - Premium Ziyarat & Transport',
    description: 'Trusted by thousands of pilgrims for Umrah and Hajj transport.',
    url: 'https://alhudaservices.com',
    siteName: 'Al-Huda Services',
    locale: 'en_SA', // Localized to Saudi Arabia English
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <WhatsAppFab
          phoneNumber="+966501234567"
          message="Hello Al-Huda Services, I need assistance with a booking!"
        />
      </body>
    </html>
  );
}
