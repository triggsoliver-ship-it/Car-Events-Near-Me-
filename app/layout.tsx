import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Car Events Near Me — Every UK car event, bookable in one place",
  description:
    "Find and book UK car events near you — classic shows, meets, track days, auctions and motorsport festivals. Search by region, county, town, date and price.",
  metadataBase: new URL("https://careventsnearme.uk"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
