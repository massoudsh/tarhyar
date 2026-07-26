import type { Metadata } from "next";
import { ProjectFilter } from "@/components/projects/ProjectFilter";

export const metadata: Metadata = {
  title: "پروژه‌ها | طرح‌یار",
  description: "مجموعه پروژه‌های معماری مسکونی لوکس — از ویلاهای اجراشده تا مطالعات مفهومی",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-material-asphalt py-24 text-warm-white sm:py-32">
        <div className="material-grid absolute inset-0 opacity-75" aria-hidden="true" />
        <div className="relative mx-auto max-w-content border-x border-warm-white/10 px-4 sm:px-6 lg:px-8">
          <p className="mb-6 w-fit border-r-4 border-material-glass pr-4 text-xs font-black uppercase tracking-[0.28em] text-warm-white/70">
            Portfolio Grid
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-black leading-tight text-warm-white sm:text-7xl">
            پروژه‌ها به‌عنوان مستندات ساخت
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-warm-white/58">
            هر کارت، یک قطعه از سیستم طراحی و اجراست: موقعیت، متریال، وضعیت و نقش معمار در یک گرید دقیق.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content border-x border-charcoal/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ProjectFilter />
      </section>
    </main>
  );
}
