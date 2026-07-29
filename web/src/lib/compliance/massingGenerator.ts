// مولد گزینه Massing — issue #19
// تولید ۳ تا ۵ گزینه حجمی/جانمایی معتبر بر اساس ورودی سایت + محدودیت‌های
// موتور ضوابط. الگوریتم فعلی procedural generation ساده (ترکیب پاخور/طبقات/شکل)
// است؛ رتبه‌بندی و توضیح نهایی گزینه‌ها بر عهده مقایسه‌گر (issue #20) است.

import type {
  ComplianceResult,
  MassingOption,
  MassingShape,
  SiteInput,
} from "./types";
import { calculateRequiredParking } from "./ruleEngine";

interface ShapeProfile {
  shape: MassingShape;
  /** نسبتی از پاخور قابل ساخت برآوردشده که این شکل اشغال می‌کند (۰ تا ۱) */
  footprintRatio: number;
  /** ضریب کارایی هندسی برای برآورد سطح مفید در مقایسه‌گر */
  efficiencyFactor: number;
  labelSuffix: string;
}

const SHAPE_PROFILES: ShapeProfile[] = [
  { shape: "compact", footprintRatio: 0.55, efficiencyFactor: 0.86, labelSuffix: "فشرده" },
  { shape: "spread", footprintRatio: 0.95, efficiencyFactor: 0.8, labelSuffix: "گسترده" },
  { shape: "courtyard", footprintRatio: 0.7, efficiencyFactor: 0.74, labelSuffix: "با حیاط مرکزی" },
  { shape: "split", footprintRatio: 0.65, efficiencyFactor: 0.78, labelSuffix: "دوتکه" },
];

/**
 * تولید ۳ تا ۵ گزینه massing با ترکیب متفاوت پاخور/طبقات، در محدوده
 * سقف‌های موتور ضوابط (سطح اشغال، تراکم/زیربنای کل، تعداد طبقات).
 */
export function generateMassingOptions(
  site: SiteInput,
  compliance: ComplianceResult
): MassingOption[] {
  const options: MassingOption[] = [];
  const { estimatedBuildableFootprintSqm, maxTotalGfaSqm, maxFloors, zone } = compliance;

  for (const profile of SHAPE_PROFILES) {
    const footprintAreaSqm = Math.max(
      0,
      Math.round(estimatedBuildableFootprintSqm * profile.footprintRatio)
    );
    if (footprintAreaSqm <= 0) continue;

    // تعداد طبقات لازم برای رسیدن به سقف زیربنای مجاز با این پاخور، محدود به maxFloors
    const idealFloors = footprintAreaSqm > 0 ? maxTotalGfaSqm / footprintAreaSqm : 0;
    const floors = Math.max(1, Math.min(maxFloors, Math.round(idealFloors)));

    const gfaSqm = Math.round(footprintAreaSqm * floors);
    const warnings: string[] = [];

    if (gfaSqm > maxTotalGfaSqm) {
      warnings.push("زیربنای کل این گزینه از سقف تراکم مجاز بیشتر است — نیاز به کاهش پاخور یا طبقات.");
    }
    if (footprintAreaSqm > compliance.maxOccupancyAreaSqm) {
      warnings.push("پاخور این گزینه از سقف سطح اشغال مجاز بیشتر است.");
    }

    const estimatedUnitCount =
      site.plannedUnitCount ?? Math.max(1, Math.floor(gfaSqm / 60));
    const parkingProvided = calculateRequiredParking(
      { ...site, plannedUnitCount: estimatedUnitCount },
      zone,
      gfaSqm
    );

    options.push({
      id: `${site.id}-${profile.shape}`,
      label: `گزینه ${profile.labelSuffix} — ${floors} طبقه`,
      shape: profile.shape,
      footprintAreaSqm,
      floors,
      gfaSqm,
      parkingProvided,
      estimatedUnitCount,
      efficiencyFactor: profile.efficiencyFactor,
      description: describeOption(profile, footprintAreaSqm, floors, gfaSqm),
      compliant: warnings.length === 0,
      warnings,
    });
  }

  // اطمینان از حداقل ۳ گزینه: اگر برخی شکل‌ها به دلیل محدودیت شدید حذف شدند،
  // یک گزینهٔ محافظه‌کارانه (۷۰٪ سطح اشغال، طبقات پایه) اضافه می‌شود.
  if (options.length < 3 && estimatedBuildableFootprintSqm > 0) {
    const footprintAreaSqm = Math.round(estimatedBuildableFootprintSqm * 0.4);
    const floors = Math.max(1, Math.min(maxFloors, 2));
    const gfaSqm = Math.round(footprintAreaSqm * floors);
    const estimatedUnitCount = Math.max(1, Math.floor(gfaSqm / 60));
    options.push({
      id: `${site.id}-fallback`,
      label: `گزینه محافظه‌کارانه — ${floors} طبقه`,
      shape: "compact",
      footprintAreaSqm,
      floors,
      gfaSqm,
      parkingProvided: calculateRequiredParking(
        { ...site, plannedUnitCount: estimatedUnitCount },
        zone,
        gfaSqm
      ),
      estimatedUnitCount,
      efficiencyFactor: 0.85,
      description: "گزینه کم‌ریسک با پاخور محدود، برای پروژه‌هایی که اولویت با کاهش ریسک تاییدیه است.",
      compliant: true,
      warnings: [],
    });
  }

  return options.slice(0, 5);
}

function describeOption(
  profile: ShapeProfile,
  footprintAreaSqm: number,
  floors: number,
  gfaSqm: number
): string {
  const base = `پاخور حدود ${footprintAreaSqm} متر مربع در ${floors} طبقه (زیربنای کل ≈ ${gfaSqm} متر مربع).`;
  switch (profile.shape) {
    case "compact":
      return `${base} توده فشرده با نمای کمتر رو به معابر جانبی — مناسب برای حفظ حریم همسایگی و کاهش سایه‌اندازی.`;
    case "spread":
      return `${base} توده گسترده با پاخور بیشتر — واحدهای بیشتر در طبقات کمتر، اما نورگیری داخلی محدودتر.`;
    case "courtyard":
      return `${base} حیاط مرکزی برای نورگیری و تهویه طبیعی بهتر واحدهای میانی — کارایی سطح مفید کمی کمتر.`;
    case "split":
      return `${base} دو توده مجزا با فاصله میانی — نورگیری جانبی بهتر برای هر دو توده، circulation نیازمند طراحی دقیق‌تر.`;
    default:
      return base;
  }
}
