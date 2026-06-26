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
    <footer className="relative border-t border-white/[0.06] bg-[#080808]">
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm text-white/30 font-light">
              تقنية حديثة بروح فلسطينية 🇵🇸
            </p>
            <p className="mt-2 text-xs text-[#ce1126]">
              We Design. We Code. We Elevate.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] uppercase text-[#007a3d]">
              خدماتنا
            </h3>
            <ul className="space-y-2.5 text-sm text-white/30">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link
                    href="/services"
                    className="transition-colors hover:text-[#ce1126]"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] uppercase text-[#007a3d]">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-sm text-white/30">
              <li><Link href="/" className="transition-colors hover:text-[#ce1126]">الرئيسية</Link></li>
              <li><Link href="/#services" className="transition-colors hover:text-[#ce1126]">خدماتنا</Link></li>
              <li><Link href="/portfolio" className="transition-colors hover:text-[#ce1126]">أعمالنا</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-[#ce1126]">عنا</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-[#ce1126]">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] uppercase text-[#007a3d]">
              تواصل
            </h3>
            <ul className="space-y-3 text-sm text-white/30">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#ce1126]/50" />
                <a href="mailto:ammar.shtayeh@gmail.com" className="transition-colors hover:text-[#ce1126]">
                  ammar.shtayeh@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#ce1126]/50" />
                <a href="tel:+972595537190" className="transition-colors hover:text-[#ce1126]" dir="ltr">
                  +972 59 553 7190
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#ce1126]/50" />
                <span>فلسطين</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-2.5">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] text-white/30 transition-all hover:border-[#ce1126]/40 hover:text-[#ce1126]"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-[#007a3d]/20 to-transparent" />
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[11px] text-white/20">
            © {new Date().getFullYear()} ZERIV TECH. جميع الحقوق محفوظة.
          </p>
          <p className="text-[11px] text-white/20">
            صُنع بروح فلسطينية 🇵🇸
          </p>
        </div>
      </div>
    </footer>
  );
}
