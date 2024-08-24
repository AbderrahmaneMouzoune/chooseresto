import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata, Viewport } from "next";

import { FALLBACK_SEO } from "@/app.config";
import { lexend } from "@/app/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Toaster } from "@components/ui/sonner";
import BreadcrumbResponsive from "@layouts/breadcrumb";
import Footer from "@layouts/footer";
import Header from "@layouts/header";

export const metadata: Metadata = {
  ...FALLBACK_SEO,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#333333" />
      </head>
      <body className={cn(lexend.className, "min-h-screen space-y-2")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <BreadcrumbResponsive />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
