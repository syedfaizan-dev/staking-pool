import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/common/Sidebar";  // Import Sidebar
import { headers } from "next/headers";
import ContextProvider from "@/context";
import 'react-loading-skeleton/dist/skeleton.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syed Faaiz Pools",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const getHeaders = await headers()
  const cookies = getHeaders.get('cookie')
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider cookies={cookies}>
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
