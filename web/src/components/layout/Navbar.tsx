import Link from "next/link";

const navItems = [
  { href: "/copilot", label: "کوپایلوت" },
  { href: "/projects", label: "پروژه‌ها" },
  { href: "/services", label: "خدمات" },
  { href: "/about", label: "درباره" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-warm-white/92 backdrop-blur-md">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <nav className="grid min-h-20 grid-cols-[1fr_auto] items-center gap-4 border-x border-charcoal/10 px-4 sm:grid-cols-[1fr_auto_1fr] sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-3 font-display text-xl font-black tracking-tight text-charcoal transition-opacity hover:opacity-70"
          >
            <span className="relative flex h-9 w-9 items-center justify-center bg-charcoal text-sm text-warm-white" aria-hidden="true">
              <span className="absolute inset-x-1 top-2 h-1.5 bg-warm-white" />
              <span className="absolute bottom-2 right-2 h-1.5 w-5 bg-warm-white" />
            </span>
            طرح‌یار
          </Link>

          <ul className="hidden items-center gap-0 sm:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-x border-charcoal/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-charcoal/70 transition-colors hover:bg-charcoal hover:text-warm-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="justify-self-end border border-charcoal bg-charcoal px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-warm-white transition-colors hover:bg-material-glass"
          >
            تماس ←
          </Link>
        </nav>

        <ul className="flex border-x border-t border-charcoal/10 sm:hidden">
          {navItems.map((item) => (
            <li key={item.href} className="flex-1 border-l border-charcoal/10 last:border-l-0">
              <Link
                href={item.href}
                className="block px-3 py-3 text-center text-xs font-bold text-charcoal/70 hover:bg-charcoal hover:text-warm-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
