import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const displayFont = Vazirmatn({
  subsets: ["arabic"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tarhyar.ir";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "طرح‌یار | معماری مسکونی لوکس — طراحی و مدیریت اجرا",
    template: "%s | طرح‌یار",
  },
  description:
    "بپیچیده‌ترین مسکن‌های خصوصی در تهران را از ایده تا تحویل طراحی و مدیریت می‌کنیم. کنترل، دقت، اقتدار.",
  keywords: ["معماری مسکونی", "طراحی ویلا", "مدیریت پروژه", "معمار تهران", "معماری لوکس"],
  authors: [{ name: "فرهاد اسکندری" }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: "طرح‌یار | معماری مسکونی",
    title: "طرح‌یار | معماری مسکونی لوکس — طراحی و مدیریت اجرا",
    description:
      "بپیچیده‌ترین مسکن‌های خصوصی در تهران را از ایده تا تحویل طراحی و مدیریت می‌کنیم.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "طرح‌یار معماری" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "طرح‌یار | معماری مسکونی لوکس",
    description: "طراحی و مدیریت اجرا — یک دیدگاه واحد از ایده تا تحویل",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": siteUrl,
  name: "دفتر معماری طرح‌یار",
  description: "طراحی معماری مسکونی لوکس و مدیریت اجرا در تهران",
  url: siteUrl,
  telephone: "+98-912-123-4567",
  email: "info@tarhyar.ir",
  address: {
    "@type": "PostalAddress",
    addressLocality: "تهران",
    addressRegion: "الهیه",
    addressCountry: "IR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.7974,
    longitude: 51.4077,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={displayFont.variable}>
      <head>
        <link href="https://fonts.cdnfonts.com/css/dana" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-persian">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
