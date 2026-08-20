"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/plants", label: "دليل النباتات" },
  { href: "/tools", label: "أدوات العناية" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-leaf text-lg text-white shadow-sm">
            🌿
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-leaf-dark">دليل الإنقاذ</span>
            <span className="block text-xs text-muted">رعاية النباتات المنزلية</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="التنقل الرئيسي">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-leaf text-white"
                    : "text-foreground/80 hover:bg-leaf-soft hover:text-leaf-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl border border-line bg-card text-lg md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          className="border-t border-line bg-card px-4 py-3 md:hidden"
          aria-label="قائمة الجوال"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-base font-semibold hover:bg-leaf-soft"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
