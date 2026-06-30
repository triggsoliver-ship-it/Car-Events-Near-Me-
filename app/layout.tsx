import "./globals.css";
import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PWARegister from "@/components/PWARegister";

const SITE_URL = "https://careventsnearme.uk";
const SITE_NAME = "Car Events Near Me";
const TITLE = "Car Events Near Me — Every UK car event, bookable in one place";
const DESCRIPTION =
  "Find and book UK car events near you — classic shows, meets, track days, auctions and motorsport festivals. Search by region, county, town, date and price.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s — Car Events Near Me",
  },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  keywords: [
    "UK car events",
    "car shows",
    "car meets",
    "track days",
    "classic car shows",
    "motorsport festivals",
    "car auctions",
    "autojumble",
    "car events near me",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Car Events",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0e14",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />
        {children}
        <Footer />
        <PWARegister />
      </body>
    </html>
  );
}
