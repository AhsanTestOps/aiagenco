import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Syne } from "next/font/google";
import { siteDetails } from "@/data/common/siteDetails";
import { AuthProvider } from '@/context/AuthContext';

import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aiagenco.dev'),
  title: {
    default: siteDetails.metadata.title,
    template: '%s | AIAgenco',
  },
  description: siteDetails.metadata.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: {
      default: siteDetails.metadata.title,
      template: '%s | AIAgenco',
    },
    description: siteDetails.metadata.description,
    url: 'https://www.aiagenco.dev',
    type: "website",
    siteName: 'AIAgenco',
    images: [
      {
        url: "/images/22/og-image.jpg",
        width: 1200,
        height: 675,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ["/images/22/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={syne.className}>
        <AuthProvider>
          {siteDetails.googleAnalyticsId && (
            <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />
          )}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
