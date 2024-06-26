import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import {cn} from "@/lib/cn";
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";
import {Toaster} from "@/app/_components/ui/toaster";

const rubik = Rubik({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'auto'
})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className="scroll-smooth h-full">
    <body className={cn(
      "min-h-screen bg-background font-sans antialiased flex flex-col overflow-x-hidden",
      rubik.variable
    )}>
      <SessionProvider session={session}>
        <Header/>
          <main className="w-full grow">
            {children}
          </main>
        <Footer/>
        <Toaster />
      </SessionProvider>
    </body>
    </html>
);
}
