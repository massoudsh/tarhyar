// گزارش تصمیم قابل‌ارائه (Decision Report) — issue #21
// تولید خودکار متن/داده گزارش از خروجی مقایسه‌گر: چرا گزینه پیشنهادی بهتر
// است و گزینه‌های دیگر کجا ریسک دارند — قابل ارائه مستقیم به کارفرما.

import type {
  ComparisonResult,
  ComplianceResult,
  DecisionReport,
  MassingOption,
  OptionRiskNote,
} from "./types";
import { massingShapeLabels } from "./types";

export function buildDecisionReport(
  compliance: ComplianceResult,
  options: MassingOption[],
  comparison: ComparisonResult
): DecisionReport {
  const recommended = options.find((o) => o.id === comparison.recommendedOptionId);
  const recommendedMetric = comparison.metrics.find(
    (m) => m.optionId === comparison.recommendedOptionId
  );

  const rationale: string[] = [];
  if (recommended && recommendedMetric) {
    rationale.push(
      `گزینه پیشنهادی «${recommended.label}» (${massingShapeLabels[recommended.shape]}) با امتیاز کلی ${recommendedMetric.overallScore} از ۱۰۰، بالاترین ترکیب سطح مفید، نورگیری و تامین پارکینگ را در میان ${options.length} گزینه بررسی‌شده دارد.`
    );
    rationale.push(
      `سطح مفید برآوردی: ${recommendedMetric.netUsableAreaSqm} متر مربع از زیربنای کل ${recommended.gfaSqm} متر مربع.`
    );
    rationale.push(
      `تامین پارکینگ: ${recommended.parkingProvided} واحد در برابر ${compliance.requiredParkingSpaces} واحد موردنیاز طبق ضوابط (نسبت تامین: ${recommendedMetric.parkingAdequacyRatio}).`
    );
    if (recommendedMetric.complianceRiskScore > 30) {
      rationale.push(
        `توجه: امتیاز ریسک ضوابطی این گزینه ${recommendedMetric.complianceRiskScore} از ۱۰۰ است — پیش از نهایی‌سازی، هشدارهای زیر را بررسی کنید.`
      );
    }
  } else {
    rationale.push("هیچ گزینه‌ای برای پیشنهاد نهایی موجود نیست — ورودی سایت/ضوابط را بررسی کنید.");
  }

  const risksByOption: OptionRiskNote[] = options.map((option) => {
    const metric = comparison.metrics.find((m) => m.optionId === option.id);
    const risks = [...option.warnings];
    if (metric && metric.parkingAdequacyRatio < 1) {
      risks.push(
        `کمبود پارکینگ: ${option.parkingProvided} واحد تامین‌شده در برابر ${compliance.requiredParkingSpaces} واحد موردنیاز.`
      );
    }
    if (!compliance.zone.verified) {
      risks.push("ضوابط منطقه مبنای این محاسبه هنوز با دستور نقشه رسمی راستی‌آزمایی نشده است.");
    }
    return { optionId: option.id, risks };
  });

  return {
    generatedAt: new Date().toISOString(),
    siteAreaSqm: compliance.siteAreaSqm,
    zoneLabel: compliance.zone.label,
    recommendedOptionId: comparison.recommendedOptionId,
    rationale,
    risksByOption,
    comparisonSummary: comparison.metrics,
  };
}
