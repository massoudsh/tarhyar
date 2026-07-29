import type { Metadata } from "next";
import { ProjectFilter } from "@/components/projects/ProjectFilter";

export const metadata: Metadata = {
  title: "نمونه تحلیل‌ها | طرح‌یار",
  description: "نمونه‌های تحلیل کوپایلوت روی زمین‌های نمونه در سه منطقه تهران — ضوابط، گزینه‌های Massing و دلیل انتخاب",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-material-asphalt py-24 text-warm-white sm:py-32">
        <div className="material-grid absolute inset-0 opacity-75" aria-hidden="true" />
        <div className="relative mx-auto max-w-content border-x border-warm-white/10 px-4 sm:px-6 lg:px-8">
          <p className="mb-6 w-fit border-r-4 border-material-glass pr-4 text-xs font-black uppercase tracking-[0.28em] text-warm-white/70">
            Sample Analyses
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-black leading-tight text-warm-white sm:text-7xl">
            نمونه تحلیل‌ها با طرح‌یار
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-warm-white/58">
            هر کارت، خروجی خط‌لوله کوپایلوت روی یک زمین نمونه است: ضوابط منطقه، گزینه‌های Massing، مقایسه و دلیل انتخاب گزینه برتر.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content border-x border-charcoal/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ProjectFilter />
      </section>
    </main>
  );
}
