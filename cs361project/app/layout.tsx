import type { Metadata } from "next";
import Navbar from "@/app/ui/navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Market Simulator",
  description: "Track an experimental portfolio!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} w-full h-screen`}>
      <body className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full h-screen px-[106px] py-16 bg-white rounded-lg shadow-md">
          {children}
        </div>
      </body>
    </html>
  );
}
