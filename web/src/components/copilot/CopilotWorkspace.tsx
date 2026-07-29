"use client";

import { useId, useState } from "react";
import type {
  AdjacentStreet,
  ComparisonResult,
  ComplianceResult,
  DecisionReport,
  LandUse,
  MassingOption,
  Point,
  SiteInput,
} from "@/lib/compliance";
import {
  buildDecisionReport,
  compareOptions,
  computeCompliance,
  generateMassingOptions,
  getZoneById,
  landUseLabels,
  validateSiteInput,
  zoneRegulations,
} from "@/lib/compliance";
import { SiteCanvasInput } from "./SiteCanvasInput";
import { AdjacentStreetsInput } from "./AdjacentStreetsInput";
import { MassingResults } from "./MassingResults";

interface ResultState {
  compliance: ComplianceResult;
  options: MassingOption[];
  comparison: ComparisonResult;
  report: DecisionReport;
}

const landUses: LandUse[] = ["residential", "mixed", "commercial", "office"];

export function CopilotWorkspace() {
  const uid = useId();
  const [polygon, setPolygon] = useState<Point[]>([]);
  const [orientationDeg, setOrientationDeg] = useState(0);
  const [streets, setStreets] = useState<AdjacentStreet[]>([
    { side: "south", widthMeters: 12, kind: "اصلی" },
  ]);
  const [zoneId, setZoneId] = useState(zoneRegulations[0].id);
  const [allowedUse, setAllowedUse] = useState<LandUse>("residential");
  const [plannedUnitCount, setPlannedUnitCount] = useState<string>("");

  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultState | null>(null);

  function handleGenerate() {
    const zone = getZoneById(zoneId);
    if (!zone) {
      setErrors(["منطقه ضوابط انتخاب‌شده معتبر نیست."]);
      return;
    }

    const site: SiteInput = {
      id: "site-draft",
      polygon,
      orientationDeg,
      adjacentStreets: streets,
      zoneId,
      allowedUse,
      plannedUnitCount: plannedUnitCount ? Number(plannedUnitCount) : undefined,
    };

    const validation = validateSiteInput(site);
    if (!validation.valid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    setErrors([]);
    const compliance = computeCompliance(site, zone);
    const options = generateMassingOptions(site, compliance);
    const comparison = compareOptions(site, compliance, options);
    const report = buildDecisionReport(compliance, options, comparison);
    setResult({ compliance, options, comparison, report });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-8 no-print">
        <section>
          <h2 className="mb-4 font-display text-lg font-black text-charcoal">۱. شکل و متراژ زمین</h2>
          <SiteCanvasInput polygon={polygon} onChange={setPolygon} />
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-black text-charcoal">۲. جهت‌گیری و معابر مجاور</h2>
          <div className="mb-4">
            <label htmlFor={`${uid}-orientation`} className="mb-1.5 block text-xs font-bold text-charcoal/70">
              جهت نمای اصلی (درجه، ۰ = شمال)
            </label>
            <input
              id={`${uid}-orientation`}
              type="number"
              min={0}
              max={359}
              value={orientationDeg}
              onChange={(e) => setOrientationDeg(Number(e.target.value))}
              className="w-32 border border-charcoal/15 bg-warm-white px-3 py-2 text-sm"
            />
          </div>
          <AdjacentStreetsInput streets={streets} onChange={setStreets} />
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-black text-charcoal">۳. کاربری و ضوابط منطقه</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${uid}-zone`} className="mb-1.5 block text-xs font-bold text-charcoal/70">
                پهنه/منطقه ضوابط
              </label>
              <select
                id={`${uid}-zone`}
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                className="w-full border border-charcoal/15 bg-warm-white px-3 py-2 text-sm"
              >
                {zoneRegulations.map((z) => (
                  <option key={z.id} value={z.id}>{z.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${uid}-use`} className="mb-1.5 block text-xs font-bold text-charcoal/70">
                کاربری مجاز
              </label>
              <select
                id={`${uid}-use`}
                value={allowedUse}
                onChange={(e) => setAllowedUse(e.target.value as LandUse)}
                className="w-full border border-charcoal/15 bg-warm-white px-3 py-2 text-sm"
              >
                {landUses.map((u) => (
                  <option key={u} value={u}>{landUseLabels[u]}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${uid}-units`} className="mb-1.5 block text-xs font-bold text-charcoal/70">
                تعداد واحد برنامه‌ریزی‌شده <span className="font-normal text-charcoal/40">(اختیاری — در صورت خالی بودن برآورد می‌شود)</span>
              </label>
              <input
                id={`${uid}-units`}
                type="number"
                min={1}
                value={plannedUnitCount}
                onChange={(e) => setPlannedUnitCount(e.target.value)}
                placeholder="مثلاً ۴"
                className="w-32 border border-charcoal/15 bg-warm-white px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        {errors.length > 0 && (
          <div role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            <ul className="space-y-1">
              {errors.map((err, i) => (
                <li key={i}>• {err}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerate}
          className="w-full border border-charcoal bg-charcoal px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-warm-white shadow-arch-md transition-all hover:bg-material-glass"
        >
          تولید گزینه‌های Massing و گزارش
        </button>
      </div>

      <div>
        {result ? (
          <MassingResults
            compliance={result.compliance}
            options={result.options}
            comparison={result.comparison}
            report={result.report}
          />
        ) : (
          <div className="flex h-full min-h-[300px] items-center justify-center border border-dashed border-charcoal/20 px-6 text-center text-sm text-charcoal/40">
            پس از تکمیل فرم سمت راست، نتایج موتور ضوابط، گزینه‌های massing، مقایسه و گزارش تصمیم اینجا نمایش داده می‌شود.
          </div>
        )}
      </div>
    </div>
  );
}
