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
    default: "طرح‌یار | کوپایلوت هوشمند طراحی و ضوابط معماری",
    template: "%s | طرح‌یار",
  },
  description:
    "طرح‌یار زمین را تحلیل می‌کند، ضوابط منطقه را اعمال می‌کند و چند گزینه Massing قابل مقایسه تولید می‌کند — پیش از AutoCAD، Revit یا Rhino. کوپایلوت طراحی و ضوابط برای دفاتر معماری ایران.",
  keywords: ["کوپایلوت معماری", "ضوابط شهرداری", "تحلیل ظرفیت زمین", "Massing", "دفتر معماری", "طرح تفصیلی"],
  authors: [{ name: "طرح‌یار" }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: "طرح‌یار",
    title: "طرح‌یار | کوپایلوت هوشمند طراحی و ضوابط معماری",
    description:
      "لایه تصمیم‌سازی طراحی برای دفاتر معماری ایران: تحلیل ظرفیت زمین، ضوابط منطقه و گزینه‌های Massing — پیش از ورود به AutoCAD/Revit/Rhino.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "طرح‌یار — کوپایلوت طراحی و ضوابط" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "طرح‌یار | کوپایلوت هوشمند طراحی و ضوابط معماری",
    description: "تحلیل ظرفیت زمین و تولید گزینه‌های Massing — پیش از AutoCAD/Revit/Rhino",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": siteUrl,
  name: "طرح‌یار",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "کوپایلوت هوشمند تحلیل ضوابط شهرداری و تولید گزینه‌های Massing برای دفاتر معماری، شرکت‌های طراحی-ساخت و سازنده‌های ایرانی.",
  url: siteUrl,
  offers: {
    "@type": "Offer",
    category: "SaaS subscription",
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
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
