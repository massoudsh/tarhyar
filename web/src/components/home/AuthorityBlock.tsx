const alternatives = [
  {
    tag: "ترسیم",
    quote: "این ابزارها برای مدل‌سازی و ترسیم عالی‌اند، اما موتور ضوابط ندارند و بعد از تصمیم اولیه وارد کار می‌شوند، نه پیش از آن.",
    name: "AutoCAD · Revit · Rhino",
    role: "ابزار ترسیم، نه تصمیم‌سازی",
  },
  {
    tag: "بین‌المللی",
    quote: "پوشش ضوابط ایران و کاداستر/طرح تفصیلی شهرداری‌های ایران را ندارند و workflow دفتر ایرانی را نمی‌شناسند.",
    name: "Rule-checker های بین‌المللی",
    role: "بدون پوشش ضوابط ایران",
  },
  {
    tag: "دستی",
    quote: "مقیاس‌پذیر نیست، فرد-وابسته است و نتیجه‌ای مستند و قابل مقایسه بین گزینه‌ها تولید نمی‌کند.",
    name: "تجربه فردی معمار + Excel",
    role: "فرد-وابسته، غیرقابل‌مقیاس",
  },
];

const stats = [
  { value: "۳", label: "منطقه تهران در دیتاست اولیه" },
  { value: "۳ تا ۵", label: "گزینه Massing در هر تحلیل" },
  { value: "فاز ۱", label: "MVP — در حال ساخت" },
];

export function AuthorityBlock() {
  return (
    <section className="bg-warm-white py-20 sm:py-24">
      <div className="mx-auto max-w-content border-x border-charcoal/10 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <div className="border border-charcoal/12 bg-material-asphalt p-7 text-warm-white material-grid">
            <p className="mb-6 border-r-4 border-material-glass pr-3 text-xs font-black uppercase tracking-[0.24em] text-warm-white/70">
              Why TarhYar
            </p>
            <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">
              جایی که ابزارهای فعلی متوقف می‌شوند، طرح‌یار شروع می‌کند
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {alternatives.map((a) => (
              <article key={a.name} className="border border-charcoal/12 bg-warm-white p-5 shadow-arch-sm">
                <div className="mb-7 flex items-center justify-between border-b border-charcoal/10 pb-4">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-charcoal/45">[ جایگزین ]</span>
                  <span className="text-lg font-black text-material-glass">{a.tag}</span>
                </div>
                <p className="min-h-24 text-sm leading-7 text-charcoal/72">{a.quote}</p>
                <div className="mt-7 border-t border-charcoal/10 pt-4">
                  <p className="text-sm font-black text-charcoal">{a.name}</p>
                  <p className="mt-1 text-xs text-charcoal/45">{a.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="border border-charcoal/12 bg-material-sand p-6">
              <p className="font-display text-5xl font-black text-charcoal">{s.value}</p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-charcoal/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
