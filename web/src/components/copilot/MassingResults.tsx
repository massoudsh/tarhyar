"use client";

import type {
  ComparisonResult,
  ComplianceResult,
  DecisionReport,
  MassingOption,
} from "@/lib/compliance";
import { massingShapeLabels } from "@/lib/compliance";

interface Props {
  compliance: ComplianceResult;
  options: MassingOption[];
  comparison: ComparisonResult;
  report: DecisionReport;
}

export function MassingResults({ compliance, options, comparison, report }: Props) {
  const metricsById = new Map(comparison.metrics.map((m) => [m.optionId, m]));

  return (
    <div className="space-y-10">
      {/* موتور ضوابط — issue #18 */}
      <section>
        <h3 className="mb-4 font-display text-lg font-black text-charcoal">۱. خروجی موتور ضوابط</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="مساحت زمین" value={`${compliance.siteAreaSqm.toFixed(0)} م²`} />
          <Stat label="سقف سطح اشغال" value={`${compliance.maxOccupancyAreaSqm.toFixed(0)} م²`} />
          <Stat label="سقف زیربنای کل" value={`${compliance.maxTotalGfaSqm.toFixed(0)} م²`} />
          <Stat label="حداکثر طبقات" value={`${compliance.maxFloors}`} />
          <Stat label="پارکینگ موردنیاز" value={`${compliance.requiredParkingSpaces}`} />
          <Stat label="پاخور قابل ساخت (برآورد)" value={`${compliance.estimatedBuildableFootprintSqm.toFixed(0)} م²`} />
          <Stat label="منطقه/پهنه" value={compliance.zone.pahneCode} />
          <Stat label="وضعیت راستی‌آزمایی" value={compliance.zone.verified ? "تایید شده" : "نیازمند تایید"} warn={!compliance.zone.verified} />
        </div>
        {compliance.warnings.length > 0 && (
          <ul className="mt-4 space-y-1.5 border-r-2 border-accent-bronze bg-material-glass/5 px-4 py-3 text-xs text-charcoal/70">
            {compliance.warnings.map((w, i) => (
              <li key={i}>⚠ {w}</li>
            ))}
          </ul>
        )}
      </section>

      {/* مولد massing — issue #19 */}
      <section>
        <h3 className="mb-4 font-display text-lg font-black text-charcoal">۲. گزینه‌های Massing تولیدشده</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => {
            const isRecommended = option.id === comparison.recommendedOptionId;
            const metric = metricsById.get(option.id);
            return (
              <div
                key={option.id}
                className={`border p-4 ${isRecommended ? "border-charcoal bg-charcoal text-warm-white" : "border-charcoal/15 bg-warm-white"}`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                    {massingShapeLabels[option.shape]}
                  </span>
                  {isRecommended && (
                    <span className="border border-warm-white/40 px-2 py-0.5 text-[10px] font-bold">پیشنهادی</span>
                  )}
                </div>
                <h4 className="mb-2 font-display text-base font-black">{option.label}</h4>
                <p className={`mb-3 text-xs leading-relaxed ${isRecommended ? "opacity-80" : "text-charcoal/60"}`}>
                  {option.description}
                </p>
                <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  <dt className="opacity-60">پاخور</dt>
                  <dd className="text-left font-bold">{option.footprintAreaSqm} م²</dd>
                  <dt className="opacity-60">زیربنای کل</dt>
                  <dd className="text-left font-bold">{option.gfaSqm} م²</dd>
                  <dt className="opacity-60">پارکینگ تامین‌شده</dt>
                  <dd className="text-left font-bold">{option.parkingProvided}</dd>
                  {metric && (
                    <>
                      <dt className="opacity-60">امتیاز کلی</dt>
                      <dd className="text-left font-bold">{metric.overallScore}/۱۰۰</dd>
                    </>
                  )}
                </dl>
                {option.warnings.length > 0 && (
                  <p className={`mt-3 text-[11px] ${isRecommended ? "text-warm-grey" : "text-red-600"}`}>
                    ⚠ {option.warnings.join(" ")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* مقایسه‌گر — issue #20 */}
      <section>
        <h3 className="mb-4 font-display text-lg font-black text-charcoal">۳. مقایسه گزینه‌ها</h3>
        <div className="overflow-x-auto border border-charcoal/10">
          <table className="w-full min-w-[640px] text-xs">
            <thead>
              <tr className="border-b border-charcoal/10 bg-material-sand/50 text-charcoal/70">
                <th className="px-3 py-2.5 text-right font-bold">گزینه</th>
                <th className="px-3 py-2.5 text-right font-bold">سطح مفید</th>
                <th className="px-3 py-2.5 text-right font-bold">نورگیری</th>
                <th className="px-3 py-2.5 text-right font-bold">circulation</th>
                <th className="px-3 py-2.5 text-right font-bold">تامین پارکینگ</th>
                <th className="px-3 py-2.5 text-right font-bold">ریسک ضوابطی</th>
                <th className="px-3 py-2.5 text-right font-bold">امتیاز کلی</th>
              </tr>
            </thead>
            <tbody>
              {options.map((option) => {
                const m = metricsById.get(option.id)!;
                const isRecommended = option.id === comparison.recommendedOptionId;
                return (
                  <tr key={option.id} className={`border-b border-charcoal/5 ${isRecommended ? "bg-material-glass/10 font-bold" : ""}`}>
                    <td className="px-3 py-2.5">{option.label}</td>
                    <td className="px-3 py-2.5">{m.netUsableAreaSqm} م²</td>
                    <td className="px-3 py-2.5">{m.sunlightScore}/۱۰</td>
                    <td className="px-3 py-2.5">{m.circulationScore}/۱۰</td>
                    <td className="px-3 py-2.5">{(m.parkingAdequacyRatio * 100).toFixed(0)}٪</td>
                    <td className="px-3 py-2.5">{m.complianceRiskScore}/۱۰۰</td>
                    <td className="px-3 py-2.5">{m.overallScore}/۱۰۰</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* گزارش تصمیم — issue #21 */}
      <section className="border border-charcoal/15 bg-material-sand/30 p-6 print:border-charcoal">
        <div className="mb-4 flex items-center justify-between no-print">
          <h3 className="font-display text-lg font-black text-charcoal">۴. گزارش تصمیم قابل‌ارائه</h3>
          <button
            type="button"
            onClick={() => window.print()}
            className="border border-charcoal bg-charcoal px-4 py-2 text-xs font-bold text-warm-white hover:bg-material-glass"
          >
            چاپ / خروجی PDF
          </button>
        </div>
        <p className="mb-1 text-xs text-charcoal/50">
          تولید شده در {new Date(report.generatedAt).toLocaleDateString("fa-IR")} — منطقه: {report.zoneLabel}
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-charcoal">
          {report.rationale.map((line, i) => (
            <li key={i}>• {line}</li>
          ))}
        </ul>

        <div className="mt-6">
          <h4 className="mb-2 text-sm font-bold text-charcoal">ریسک‌های شناسایی‌شده به تفکیک گزینه</h4>
          <div className="space-y-2">
            {report.risksByOption.map((r) => {
              const option = options.find((o) => o.id === r.optionId);
              if (r.risks.length === 0) return null;
              return (
                <div key={r.optionId} className="text-xs text-charcoal/70">
                  <span className="font-bold">{option?.label}:</span>{" "}
                  {r.risks.join(" · ")}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="border border-charcoal/10 bg-warm-white px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/45">{label}</p>
      <p className={`font-display text-sm font-black ${warn ? "text-accent-bronze" : "text-charcoal"}`}>{value}</p>
    </div>
  );
}
