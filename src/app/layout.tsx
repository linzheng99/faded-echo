import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from "@/components/Navbar";
import {
  ClerkProvider,
} from '@clerk/nextjs'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-24">
              <Navbar />
            </div>
            <div className="px-4 pt-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-[calc(100vh-96px)]">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
