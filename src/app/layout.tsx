import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "BrandForge Media | Premium Digital Marketing Agency",
  description:
    "We help businesses grow online with social media management, website design, branding, and digital marketing. Premium solutions for ambitious businesses.",
  keywords: [
    "digital marketing agency",
    "social media management",
    "website design",
    "branding",
    "SEO services",
    "BrandForge Media",
    "digital marketing India",
    "graphic design",
    "video editing",
  ],
  metadataBase: new URL("https://brandforge-media.vercel.app"),
  openGraph: {
    title: "BrandForge Media | Premium Digital Marketing Agency",
    description:
      "We help businesses grow online with social media management, website design, branding, and digital marketing.",
    type: "website",
    locale: "en_IN",
    siteName: "BrandForge Media",
    url: "https://brandforge-media.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandForge Media | Premium Digital Marketing Agency",
    description:
      "We help businesses grow online with social media management, website design, branding, and digital marketing.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://brandforge-media.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} dark`}
    >
      <body className="min-h-dvh bg-background text-foreground font-sans antialiased">
        <JsonLd />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
