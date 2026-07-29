"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, type ProjectType } from "@/data/projects";

const filterOptions: { label: string; value: "all" | ProjectType }[] = [
  { label: "همه", value: "all" },
  { label: "منطقه ۱", value: "منطقه ۱" },
  { label: "منطقه ۳", value: "منطقه ۳" },
  { label: "منطقه ۵", value: "منطقه ۵" },
];

export function ProjectFilter() {
  const [active, setActive] = useState<"all" | ProjectType>("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.type === active);

  return (
    <div>
      <div role="tablist" className="mb-10 grid gap-2 sm:flex" aria-label="فیلتر پروژه‌ها">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active === opt.value}
            onClick={() => setActive(opt.value)}
            className={[
              "border px-5 py-3 text-xs font-black uppercase tracking-[0.18em] transition-colors",
              active === opt.value
                ? "border-charcoal bg-charcoal text-warm-white"
                : "border-charcoal/15 bg-warm-white text-charcoal/65 hover:bg-material-sand hover:text-charcoal",
            ].join(" ")}
          >
            {opt.label}
            <span className="mr-3 opacity-60">
              {opt.value === "all" ? projects.length : projects.filter((p) => p.type === opt.value).length}
            </span>
          </button>
        ))}
      </div>

      <ul className="grid auto-rows-[22rem] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <li key={project.slug} className={i === 0 ? "lg:col-span-2" : ""}>
            <Link href={`/projects/${project.slug}`} className="group relative block h-full overflow-hidden border border-charcoal/12 bg-warm-white p-5 shadow-arch-sm transition-transform hover:-translate-y-1">
              <div className="absolute inset-0 concrete-texture opacity-70" style={{ backgroundColor: project.coverColor }} aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-between text-warm-white">
                <div className="flex items-start justify-between gap-4">
                  <span className="border border-warm-white/40 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-warm-white/82">{project.type}</span>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-warm-white/55">0{i + 1}</span>
                </div>
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-warm-white/62">{project.year} / {project.location} / {project.area}</p>
                  <h2 className="text-2xl font-black leading-tight transition-colors group-hover:text-material-sand">{project.title}</h2>
                  <p className="mt-2 max-w-md text-sm leading-7 text-warm-white/68">{project.subtitle}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
