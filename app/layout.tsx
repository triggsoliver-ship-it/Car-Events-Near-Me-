import "./globals.css";
import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PWARegister from "@/components/PWARegister";

export const metadata: Metadata = {
  title: "Car Events Near Me — Every UK car event, bookable in one place",
  description:
    "Find and book UK car events near you — classic shows, meets, track days, auctions and motorsport festivals. Search by region, county, town, date and price.",
  metadataBase: new URL("https://careventsnearme.uk"),
  applicationName: "Car Events Near Me",
  manifest: "/manifest.webmanifest",
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
  themeColor: "#ff5118",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <PWARegister />
      </body>
    </html>
  );
}
