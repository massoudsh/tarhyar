import Link from "next/link";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-material-asphalt py-20 text-warm-white sm:py-24">
      <div className="material-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-content gap-4 border-x border-warm-white/10 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <Link href="/contact" className="group min-h-80 border border-warm-white/14 bg-material-glass p-7 text-warm-white transition-transform hover:-translate-y-1">
          <div className="flex h-full flex-col justify-between blueprint">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-warm-white/72">Talk to the team</p>
            <div>
              <h2 className="font-display text-4xl font-black leading-tight">صحبت با تیم طرح‌یار</h2>
              <span className="mt-8 inline-block border border-warm-white bg-warm-white px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-charcoal group-hover:bg-charcoal group-hover:text-warm-white">
                رزرو تماس ←
              </span>
            </div>
          </div>
        </Link>

        <div className="border border-warm-white/14 bg-warm-white p-7 text-charcoal">
          <p className="mb-8 border-r-4 border-material-glass pr-3 text-xs font-black uppercase tracking-[0.24em] text-charcoal/50">
            Rules understood. Options ranked.
          </p>
          <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">
            طرح‌یار کوپایلوت ضوابط و طراحی دفاتر معماری ایران است
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-charcoal/62">
            اگر دفتر شما در فاز Concept می‌خواهد چند گزینه massing را سریع و در سقف ضوابط منطقه بررسی کند، مسیر را با یک تست کوتاه شروع کنیم.
          </p>
          <Link href="/copilot" className="mt-8 inline-block border border-charcoal bg-charcoal px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-warm-white transition-colors hover:bg-material-glass">
            امتحان کوپایلوت ←
          </Link>
        </div>
      </div>
    </section>
  );
}
