import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./provider/provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learnix Labs",
  icons: {
    icon: "/icons/siteIcon/logo.svg",
  },
  description: "A secure LMS for exclusive content with progress tracking and payouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <Providers>
            <main className="pt-15 md:pt-0">{children}</main>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
