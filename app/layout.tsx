import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Elevé Media",
    template: "%s | Elevé Media",
  },
  description:
    "Elevé Media is a global talent management and creator representation agency with aligned incentives, creator growth strategy and brand partnerships.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Elevé Media",
    description:
      "The people behind the creators you see online. Global talent management for digital-first creators and brands.",
    url: "/",
    siteName: "Elevé Media",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevé Media",
    description:
      "The people behind the creators you see online. Global talent management, creator representation and brand partnerships.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}