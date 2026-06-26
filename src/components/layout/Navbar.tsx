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
          ? "text-[#D4AF37]"
          : "text-white/40 hover:text-white/70",
        className
      )}
    >
      {label}
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 bg-[#D4AF37] rounded-full"
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Logo size="nav" variant="nav" />

        {/* Center navigation */}
        <nav className="hidden lg:flex" aria-label="التنقل الرئيسي">
          <ul className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-black/40 backdrop-blur-xl px-2 py-1">
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
            className="hidden sm:inline-flex items-center rounded-full bg-[#D4AF37] px-5 py-2 text-xs font-bold text-black transition-all duration-300 hover:bg-[#E5C148]"
          >
            ابدأ مشروعك
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 lg:hidden hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-colors"
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
            className="overflow-hidden border-b border-white/[0.06] bg-[#0B0B0B]/95 backdrop-blur-2xl lg:hidden"
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
