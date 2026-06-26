"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
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
        "relative px-4 py-2 text-sm font-medium transition-all duration-300",
        active
          ? "text-[#ce1126]"
          : "text-zeriv-fg-soft hover:text-zeriv-fg",
        className
      )}
    >
      {label}
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 bg-[#ce1126] rounded-full"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  );
}

export function Navbar() {
  const activeId = useNavActive();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-zeriv-bg/70 backdrop-blur-md border-b border-zeriv-border">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Logo size="nav" variant="nav" />

        {/* Center navigation */}
        <nav className="hidden lg:flex" aria-label="التنقل الرئيسي">
          <ul className="flex items-center gap-1 rounded-full border border-zeriv-border bg-zeriv-surface/40 backdrop-blur-xl px-2 py-1">
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

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center rounded-full bg-[#ce1126] px-5 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-[#9d0c1b]"
          >
            ابدأ مشروعك
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zeriv-border text-zeriv-fg-soft lg:hidden hover:border-[#ce1126]/30 hover:text-[#ce1126] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-zeriv-border bg-zeriv-bg/95 backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    active={activeId === link.id}
                    onClick={() => setOpen(false)}
                    className="block w-full text-right py-3"
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
