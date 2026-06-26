"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { TatreezBorder } from "@/components/patterns/Patterns";
import { useNavActive, type NavItemId } from "@/hooks/useNavActive";
import { cn } from "@/lib/utils";

const navLinks: { href: string; label: string; id: NavItemId }[] = [
  { href: "/", label: "الرئيسية", id: "home" },
  { href: "/#services", label: "خدماتنا", id: "services" },
  { href: "/portfolio", label: "أعمالنا", id: "portfolio" },
  { href: "/#zarif", label: "زريف الطول", id: "zarif" },
  { href: "/about", label: "عنا", id: "about" },
  { href: "/contact", label: "تواصل", id: "contact" },
];

function NavLink({
  href,
  label,
  active,
  onClick,
  className,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300",
        active
          ? "nav-link-active text-white shadow-md shadow-zeriv-red/35"
          : "text-zeriv-muted hover:bg-zeriv-surface/80 hover:text-zeriv-fg",
        className
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const activeId = useNavActive();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 nav-glass-premium">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo size="nav" variant="nav" />

        <nav className="hidden flex-1 justify-center lg:flex" aria-label="التنقل الرئيسي">
          <ul className="nav-pill flex items-center gap-0.5 rounded-full p-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  active={activeId === link.id}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:gap-2.5">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden rounded-full bg-zeriv-green px-5 font-bold shadow-lg shadow-zeriv-green/30 hover:bg-zeriv-green-light sm:inline-flex"
          >
            <Link href="/contact">ابدأ مشروعك</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
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
            className="overflow-hidden border-b border-zeriv-border bg-zeriv-surface/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    active={activeId === link.id}
                    onClick={() => setOpen(false)}
                    className="block w-full text-right"
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
