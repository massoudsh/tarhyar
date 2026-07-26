import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "صفحه یافت نشد | طرح‌یار",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-black text-material-glass select-none" aria-hidden>
        ۴۰۴
      </p>
      <h1 className="mt-6 font-display text-2xl font-black text-charcoal">
        این صفحه وجود ندارد
      </h1>
      <p className="mt-3 max-w-sm text-charcoal/50 text-sm leading-relaxed">
        شاید آدرس اشتباه وارد شده یا صفحه جابه‌جا شده است.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="border border-charcoal bg-charcoal px-7 py-3 text-sm font-black uppercase tracking-[0.14em] text-warm-white shadow-arch-sm transition-all hover:bg-material-glass focus-visible:ring-2 focus-visible:ring-material-glass/40 focus-visible:ring-offset-2"
        >
          برگشت به صفحه اصلی
        </Link>
        <Link
          href="/projects"
          className="border border-charcoal/15 px-7 py-3 text-sm font-black uppercase tracking-[0.14em] text-charcoal/80 transition-all hover:bg-charcoal hover:text-warm-white"
        >
          مشاهده پروژه‌ها
        </Link>
      </div>
    </main>
  );
}
