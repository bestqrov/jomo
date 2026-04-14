

import React from "react";
import type { Metadata } from "next";
import QueryProvider from "./QueryProvider";
import ThemeToggle from "@/components/ThemeToggle";
import FormValidationProvider from "@/components/FormValidationProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArwaPark",
  description: "ArwaPark fleet management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 dark:bg-[#0a0a0a]">
        <QueryProvider>
          {children}
          <ThemeToggle />
          <FormValidationProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
