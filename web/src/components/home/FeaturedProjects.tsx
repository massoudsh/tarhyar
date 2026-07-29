import Link from "next/link";
import { projects } from "@/data/projects";

const tickerItems = projects.map((p) => `${p.title} — ${p.year}`);

export function FeaturedProjects() {
  return (
    <section className="bg-material-sand py-20 sm:py-24">
      <div className="mx-auto max-w-content border-x border-charcoal/10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-charcoal/12 pb-8">
          <div>
            <p className="mb-4 border-r-4 border-material-glass pr-3 text-xs font-black uppercase tracking-[0.26em] text-charcoal/55">
              Sample Analyses
            </p>
            <h2 className="font-display text-4xl font-black text-charcoal sm:text-5xl">نمونه تحلیل‌ها</h2>
          </div>
          <Link href="/projects" className="border border-charcoal px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-charcoal hover:text-warm-white">
            همه نمونه‌ها ←
          </Link>
        </div>

        <div className="mt-8 grid auto-rows-[18rem] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="group relative overflow-hidden border border-charcoal/12 bg-warm-white p-5 shadow-arch-sm">
              <div className="absolute inset-0 concrete-texture opacity-65" style={{ backgroundColor: p.coverColor }} aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/18 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-between text-warm-white">
                <span className="w-fit border border-warm-white/40 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-warm-white/80">{p.type}</span>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-warm-white/62">{p.year} / {p.location}</p>
                  <h3 className="text-2xl font-black leading-tight transition-colors group-hover:text-material-sand">{p.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-14 overflow-hidden border-y border-charcoal/12 bg-warm-white py-4" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8 text-lg font-black uppercase tracking-wide text-charcoal/45">
              {item}<span className="text-material-glass">✳</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
