import type { Metadata, Viewport } from "next";

import { DEFAULT_VIEWPORT, FALLBACK_SEO } from "@/app.config";
import { lexend } from "@/app/fonts";
import BreadcrumbResponsive from "@/components/layouts/breadcrumb";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers/providers";
import "@/styles/globals.css";
import { Toaster } from "@components/ui/sonner";

export const metadata: Metadata = {
  ...FALLBACK_SEO,
};

export const viewport: Viewport = { ...DEFAULT_VIEWPORT };

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
      <body
        className={cn(
          lexend.className,
          "min-h-screen space-y-2",
          "bg-gray-100 dark:bg-gray-900",
        )}
      >
        <Providers>
          <Header />
          <BreadcrumbResponsive />
          {children}
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
