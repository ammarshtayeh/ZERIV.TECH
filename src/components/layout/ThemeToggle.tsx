"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = (resolvedTheme ?? theme) === "dark";

  if (!mounted) {
    return (
      <div className="h-9 w-[4.5rem] rounded-full border border-zeriv-border bg-zeriv-surface" />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-all",
        "border-zeriv-border bg-zeriv-surface hover:border-zeriv-red/40",
        isDark ? "text-zeriv-white" : "text-zeriv-black"
      )}
      aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
    >
      {isDark ? (
        <>
          <Sun className="h-3.5 w-3.5 text-zeriv-red" />
          <span>فاتح</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-zeriv-green" />
          <span>داكن</span>
        </>
      )}
    </button>
  );
}
