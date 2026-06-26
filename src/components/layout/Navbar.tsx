"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { TatreezBorder } from "@/components/patterns/Patterns";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/#services", label: "خدماتنا" },
  { href: "/portfolio", label: "أعمالنا" },
  { href: "/#zarif", label: "زريف الطول" },
  { href: "/about", label: "عنا" },
  { href: "/contact", label: "تواصل" },
];

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href;
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 nav-glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo size="nav" variant="circle" />

        <ul className="hidden items-center lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive(pathname, link.href)
                    ? "bg-zeriv-red/10 text-zeriv-red"
                    : "text-zeriv-muted hover:bg-zeriv-surface hover:text-zeriv-fg"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden rounded-full bg-zeriv-green font-bold shadow-lg shadow-zeriv-green/25 hover:bg-zeriv-green-light sm:inline-flex"
          >
            <Link href="/contact">ابدأ مشروعك</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "إغلاق" : "القائمة"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <TatreezBorder />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/[0.06] bg-zeriv-surface lg:hidden"
          >
            <ul className="flex flex-col gap-0.5 px-5 py-3 sm:px-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-sm font-medium",
                      isActive(pathname, link.href)
                        ? "bg-zeriv-red/10 text-zeriv-red"
                        : "text-zeriv-muted hover:bg-zeriv-surface"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
