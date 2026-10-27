import type { Metadata } from "next";
import { Bricolage_Grotesque, Hind } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const body = Hind({
  variable: "--font-body",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "BNB Enterprises | Rooftop Solar in Raipur & Chhattisgarh",
    template: "%s | BNB Enterprises",
  },
  description:
    "BNB Enterprises – Rooftop solar installation across Chhattisgarh (Raipur, Bhilai, Bilaspur, Korba & all 33 districts). PM Surya Ghar + CG state subsidy up to ₹1,08,000. Free site survey.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hi" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
