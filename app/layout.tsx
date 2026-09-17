import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CreditCardPromos.ph | Philippine Credit Card Promos",
  description: "Browse current credit card promotions from banks in the Philippines.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
