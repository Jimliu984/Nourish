import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/lib/QueryWrapper";
import ChatPopup from "./components/ai-textbox/ChatPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nourish",
  description: "Plan your weekly meals!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = [
    { name: "Meal Plan", href: "/", icon: "📅" },
    { name: "Recipes", href: "/recipes", icon: "🍽️" },
  ];
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <header className="p-4 space-x-4 items-center flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground sticky top-0 shadow-md px-8">
            <Link href={"/"} className="text-2xl font-bold">
              Nourish
            </Link>
            <div className="justify-end flex-1 flex space-x-2">
              {pages.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className="text-primary hover:underline align-middle"
                >
                  <div className="rounded-lg border border-primary/20 px-3 py-1 hover:bg-primary hover:text-primary-foreground transition inline-flex items-center">
                    <div className="inline-block mr-1">{page.icon}</div>
                    {page.name}
                  </div>
                </Link>
              ))}
            </div>
          </header>
          <Toaster />
          {children}
          <ChatPopup />
        </Providers>
      </body>
    </html>
  );
}
