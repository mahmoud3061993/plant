import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mahmoudelkousy.online"),
  title: {
    default: "دليل إنقاذ ورعاية النباتات المنزلية",
    template: "%s | دليل الإنقاذ",
  },
  description:
    "كل اللي محتاج تعرفه عشان تختار النبات المناسب، تعتني بيه صح، وتعرف تتصرف لو ظهرت عليه مشكلة.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="site-grid min-h-full font-sans text-foreground">
        <div className="flex min-h-full flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
