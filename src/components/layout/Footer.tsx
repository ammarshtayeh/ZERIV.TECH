import Link from "next/link";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Dribbble,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { DiamondSeparator, TatreezBorder } from "@/components/patterns/Patterns";
import { services } from "@/lib/mock-data";

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 7h-7v2h7V7zm1.726 10c-.442 2.391-2.852 4-5.726 4-3.59 0-6.5-2.91-6.5-6.5S8.41 8 12 8c2.874 0 5.284 1.609 5.726 4H19c-.442-1.391-1.852-2.5-3.5-2.5-2.21 0-4 1.79-4 4s1.79 4 4 4c1.648 0 3.058-1.109 3.5-2.5h4.726zM2 18h7v-2H2v2zm0-6h7v-2H2v2z" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://www.instagram.com/zeriv.tech?igsh=a3FxcDBkdGtjaHkw", icon: Instagram, label: "Instagram" },
  { href: "https://behance.net", icon: BehanceIcon, label: "Behance" },
  { href: "https://www.linkedin.com/in/zeriv-tech-307a733b3/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://dribbble.com", icon: Dribbble, label: "Dribbble" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-zeriv-dark-2">
      <TatreezBorder />
      <div className="noise-overlay absolute inset-0" />
      <div className="tatreez-bg-pattern absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo size="md" />
            <p className="mt-4 font-heritage text-sm text-zeriv-offwhite/60">
              تقنية حديثة بروح فلسطينية
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs text-zeriv-offwhite/40">
              <span className="text-zeriv-red">تصميم</span>
              <DiamondSeparator className="text-zeriv-red/40" />
              <span className="text-zeriv-red">كود</span>
              <DiamondSeparator className="text-zeriv-red/40" />
              <span className="text-zeriv-green">هوية</span>
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-zeriv-red">
              خدماتنا
            </h3>
            <ul className="space-y-2 text-sm text-zeriv-offwhite/55">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link
                    href="/services"
                    className="transition-colors hover:text-zeriv-red"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-zeriv-red">
              روابط سريعة
            </h3>
            <ul className="space-y-2 text-sm text-zeriv-offwhite/55">
              <li>
                <Link href="/" className="transition-colors hover:text-zeriv-red">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-zeriv-red">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link href="/#zarif" className="transition-colors hover:text-zeriv-red">
                  زريف الطول
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="transition-colors hover:text-zeriv-red">
                  أعمالنا
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-zeriv-red">
                  عنا
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-zeriv-red">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-zeriv-red">
              تواصل
            </h3>
            <ul className="space-y-3 text-sm text-zeriv-offwhite/55">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-zeriv-red/60" />
                <a
                  href="mailto:ammar.shtayeh@gmail.com"
                  className="transition-colors hover:text-zeriv-red"
                >
                  ammar.shtayeh@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-zeriv-red/60" />
                <a
                  href="tel:+972595537190"
                  className="transition-colors hover:text-zeriv-red"
                  dir="ltr"
                >
                  +972 59 553 7190
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-zeriv-red/60" />
                <span>فلسطين</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zeriv-offwhite/50 transition-all hover:border-zeriv-red/40 hover:bg-zeriv-red/5 hover:text-zeriv-red"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="section-divider mt-12" />
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-zeriv-offwhite/30">
            © {new Date().getFullYear()} ZERIV TECH — زريف الطول. جميع الحقوق
            محفوظة.
          </p>
          <p className="font-heritage text-xs text-zeriv-offwhite/40">
            صُنع بروح فلسطينية 🇵🇸
          </p>
        </div>
      </div>
    </footer>
  );
}
