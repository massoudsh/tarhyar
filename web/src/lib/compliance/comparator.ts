// مقایسه‌گر گزینه‌ها (Option Comparator) — issue #20
// محاسبه معیارهای مقایسه هر گزینه massing: سطح مفید، تخمین نورگیری،
// کیفیت circulation، پارکینگ تأمین‌شده، و ریسک ضوابطی — و رتبه‌بندی نهایی.

import type {
  ComparisonResult,
  ComplianceResult,
  MassingOption,
  OptionComparisonMetric,
  SiteInput,
} from "./types";

/** تخمین امتیاز نورگیری (۰ تا ۱۰) بر اساس شکل توده و تعداد طبقات */
function estimateSunlightScore(option: MassingOption): number {
  const shapeBase: Record<MassingOption["shape"], number> = {
    compact: 6.5,
    spread: 5,
    courtyard: 8.5,
    split: 7.5,
  };
  const floorPenalty = Math.max(0, option.floors - 3) * 0.4;
  return Math.max(1, Math.min(10, shapeBase[option.shape] - floorPenalty));
}

/** تخمین کیفیت circulation (۰ تا ۱۰) — توده‌های ساده امتیاز بالاتر، توده‌های چندپاره نیازمند طراحی دقیق‌تر */
function estimateCirculationScore(option: MassingOption): number {
  const shapeBase: Record<MassingOption["shape"], number> = {
    compact: 8,
    spread: 6.5,
    courtyard: 6,
    split: 5,
  };
  return shapeBase[option.shape];
}

/** امتیاز ریسک ضوابطی (۰ تا ۱۰۰، کمتر بهتر) بر اساس هشدارهای گزینه + فاصله از سقف‌های مجاز */
function estimateComplianceRisk(option: MassingOption, compliance: ComplianceResult): number {
  let risk = option.warnings.length * 25;

  const gfaUsageRatio = compliance.maxTotalGfaSqm > 0 ? option.gfaSqm / compliance.maxTotalGfaSqm : 0;
  if (gfaUsageRatio > 0.98) risk += 15; // خیلی نزدیک به سقف، حاشیه خطای کم
  if (!compliance.zone.verified) risk += 10; // ضوابط منبع هنوز راستی‌آزمایی نشده

  return Math.max(0, Math.min(100, risk));
}

export function compareOptions(
  site: SiteInput,
  compliance: ComplianceResult,
  options: MassingOption[]
): ComparisonResult {
  const metrics: OptionComparisonMetric[] = options.map((option) => {
    const netUsableAreaSqm = Math.round(option.gfaSqm * option.efficiencyFactor);
    const sunlightScore = Number(estimateSunlightScore(option).toFixed(1));
    const circulationScore = Number(estimateCirculationScore(option).toFixed(1));
    const parkingAdequacyRatio =
      compliance.requiredParkingSpaces > 0
        ? Number((option.parkingProvided / compliance.requiredParkingSpaces).toFixed(2))
        : 1;
    const complianceRiskScore = estimateComplianceRisk(option, compliance);

    // امتیاز کلی: وزن‌دهی ساده — سطح مفید نسبی، نور، circulation، تامین پارکینگ، منهای ریسک
    const usableAreaRatio =
      compliance.maxTotalGfaSqm > 0 ? netUsableAreaSqm / compliance.maxTotalGfaSqm : 0;
    const overallScore = Math.round(
      Math.max(
        0,
        Math.min(
          100,
          usableAreaRatio * 30 +
            (sunlightScore / 10) * 20 +
            (circulationScore / 10) * 15 +
            Math.min(1, parkingAdequacyRatio) * 20 -
            complianceRiskScore * 0.15
        )
      )
    );

    return {
      optionId: option.id,
      netUsableAreaSqm,
      sunlightScore,
      circulationScore,
      parkingAdequacyRatio,
      complianceRiskScore,
      overallScore,
    };
  });

  const recommended = metrics.reduce(
    (best, m) => (m.overallScore > best.overallScore ? m : best),
    metrics[0]
  );

  return {
    metrics,
    recommendedOptionId: recommended?.optionId ?? "",
  };
}
