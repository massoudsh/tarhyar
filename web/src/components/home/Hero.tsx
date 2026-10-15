import Link from "next/link";

function BlueprintBlock() {
  return (
    <div className="relative h-full min-h-[32rem] overflow-hidden border border-warm-white/16 bg-material-glass blueprint shadow-arch-lg">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-material-asphalt/10 to-material-asphalt/45" />
      <div className="absolute left-8 top-8 h-44 w-44 border border-warm-white/25" aria-hidden="true" />
      <div className="absolute left-20 top-20 h-28 w-28 border border-warm-white/20" aria-hidden="true" />
      <div className="absolute bottom-0 right-12 flex items-end gap-0" aria-hidden="true">
        {["h-52", "h-72", "h-44", "h-64"].map((height, i) => (
          <div key={i} className={`${height} w-20 border border-warm-white/22 bg-material-asphalt/50 p-2`}>
            <div className="grid h-full grid-cols-2 gap-1">
              {Array.from({ length: 16 }).map((_, j) => (
                <span key={j} className="border border-warm-white/14" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 left-8 border border-warm-white/20 bg-warm-white px-5 py-4 text-charcoal">
        <p className="text-xs font-black uppercase tracking-[0.22em]">SITE IN.</p>
        <p className="mt-1 text-xs font-black uppercase tracking-[0.22em]">OPTIONS OUT.</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-material-asphalt text-warm-white">
      <div className="material-grid absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-content border-x border-warm-white/10 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-10">
        <div className="flex min-h-[36rem] flex-col justify-between border-b border-warm-white/10 pb-8 lg:border-b-0 lg:border-l lg:pb-0 lg:pl-10">
          <div>
            <p className="mb-10 w-fit border-r-4 border-material-glass pr-4 text-xs font-black tracking-[0.16em] text-warm-white/72 sm:text-sm">
              کوپایلوت طراحی و ضوابط معماری
            </p>
            <h1 className="max-w-3xl font-display text-[2.75rem] font-black leading-[1.45] tracking-[-0.035em] text-warm-white sm:text-6xl sm:leading-[1.35] lg:text-[5.25rem] lg:leading-[1.3]">
              <span className="block">زمین را بفهمید،</span>
              <span className="block text-material-sand">گزینه‌ها را بسازید،</span>
              <span className="block">با اطمینان تصمیم بگیرید</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-9 text-warm-white/58 sm:text-lg">
              طرح‌یار ظرفیت زمین را تحلیل می‌کند، ضوابط منطقه را اعمال می‌کند و چند گزینه Massing قابل مقایسه تولید می‌کند — پیش از ورود به AutoCAD، Revit یا Rhino.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
            <Link href="/copilot" className="border border-warm-white bg-warm-white px-7 py-4 text-center text-xs font-black uppercase tracking-[0.22em] text-charcoal transition-colors hover:bg-material-glass hover:text-warm-white">
              امتحان کوپایلوت ←
            </Link>
            <div className="grid grid-cols-3 border border-warm-white/14">
              {["۳ تا ۵ گزینه", "۳ منطقه تهران", "ساعت‌ها نه روزها"].map((item) => (
                <span key={item} className="border-l border-warm-white/14 px-4 py-4 text-center text-xs font-bold text-warm-white/70 last:border-l-0">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 lg:pt-0 lg:pr-10">
          <BlueprintBlock />
        </div>
      </div>
    </section>
  );
}
