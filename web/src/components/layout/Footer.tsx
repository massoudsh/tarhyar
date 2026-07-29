import Link from "next/link";

const columns = [
  { href: "/copilot", label: "کوپایلوت" },
  { href: "/services", label: "خدمات" },
  { href: "/projects", label: "نمونه تحلیل‌ها" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس" },
];

const socials = [
  { label: "اینستاگرام", href: "https://instagram.com" },
  { label: "واتساپ", href: "https://wa.me/989121234567" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-material-asphalt text-warm-white">
      <div className="material-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-content border-x border-warm-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-warm-white/12 pb-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 font-display text-2xl font-black">
              <span className="relative h-10 w-10 bg-warm-white" aria-hidden="true">
                <span className="absolute right-2 top-2 h-2 w-6 bg-charcoal" />
                <span className="absolute bottom-2 right-2 h-2 w-5 bg-charcoal" />
              </span>
              طرح‌یار
            </div>
            <p className="mt-6 max-w-sm text-sm leading-8 text-warm-white/58">
              کوپایلوت هوشمند تحلیل ضوابط شهرداری و تولید گزینه‌های Massing — پیش از AutoCAD، Revit یا Rhino، طرح‌یار به دفاتر معماری کمک می‌کند بهترین گزینه را با اطمینان انتخاب کنند.
            </p>
          </div>

          <nav aria-label="لینک‌های فوتر">
            <p className="mb-5 border-r-4 border-material-glass pr-3 text-xs font-bold uppercase tracking-[0.24em] text-warm-white/80">
              Navigation
            </p>
            <ul className="space-y-0 border-t border-warm-white/12">
              {columns.map((item) => (
                <li key={item.href} className="border-b border-warm-white/12">
                  <Link href={item.href} className="block py-3 text-sm text-warm-white/68 transition-colors hover:text-warm-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-5 border-r-4 border-material-glass pr-3 text-xs font-bold uppercase tracking-[0.24em] text-warm-white/80">
              Contact
            </p>
            <ul className="space-y-0 border-t border-warm-white/12">
              {socials.map((s) => (
                <li key={s.href} className="border-b border-warm-white/12">
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="block py-3 text-sm text-warm-white/68 transition-colors hover:text-warm-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-warm-white/35">
              © {new Date().getFullYear()} TARHYAR AI COPILOT
            </p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="relative -mb-6 border-t border-warm-white/10 text-center font-display text-[18vw] font-black leading-none tracking-tighter text-warm-white/[0.045]">
        COPILOT
      </div>
    </footer>
  );
}
