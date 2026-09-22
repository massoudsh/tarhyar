// موتور ضوابط (Compliance Rule Engine) — issue #18
// محاسبه‌ی عددی مستقل (بدون وابستگی به خروجی مستقیم LLM) برای اعمال ضوابط
// سطح اشغال، تراکم، عقب‌نشینی، ارتفاع مجاز و حداقل پارکینگ روی یک ورودی سایت.

import type {
  ComplianceResult,
  Point,
  SiteInput,
  SiteInputValidation,
  ZoneRegulation,
} from "./types";

/** مساحت چندضلعی به روش شولیس (shoelace) — بر حسب متر مربع، همیشه مثبت */
export function polygonArea(polygon: Point[]): number {
  if (polygon.length < 3) return 0;
  let sum = 0;
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    sum += a.x * b.y - b.x * a.y;
  }
  return Math.abs(sum) / 2;
}

/** محیط چندضلعی — متر */
export function polygonPerimeter(polygon: Point[]): number {
  if (polygon.length < 3) return 0;
  let sum = 0;
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    sum += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return sum;
}

function orientation(a: Point, b: Point, c: Point): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function segmentsIntersect(a: Point, b: Point, c: Point, d: Point): boolean {
  const abC = orientation(a, b, c);
  const abD = orientation(a, b, d);
  const cdA = orientation(c, d, a);
  const cdB = orientation(c, d, b);
  return abC * abD < 0 && cdA * cdB < 0;
}

export function hasSelfIntersection(polygon: Point[]): boolean {
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    for (let j = i + 1; j < polygon.length; j++) {
      if (Math.abs(i - j) <= 1 || (i === 0 && j === polygon.length - 1)) continue;
      const c = polygon[j];
      const d = polygon[(j + 1) % polygon.length];
      if (segmentsIntersect(a, b, c, d)) return true;
    }
  }
  return false;
}

/** اعتبارسنجی هندسی/فیلدی ورودی سایت (بخشی از issue #17) */
export function validateSiteInput(site: SiteInput): SiteInputValidation {
  const errors: string[] = [];

  if (site.polygon.length < 3) {
    errors.push("چندضلعی زمین باید حداقل ۳ رأس داشته باشد.");
  }
  if (site.polygon.some((point) => !Number.isFinite(point.x) || !Number.isFinite(point.y))) {
    errors.push("مختصات تمام رأس‌های زمین باید عددی و معتبر باشند.");
  }
  if (site.polygon.length >= 4 && hasSelfIntersection(site.polygon)) {
    errors.push("اضلاع زمین نباید یکدیگر را قطع کنند؛ ترتیب رأس‌ها را بررسی کنید.");
  }

  const areaSqm = polygonArea(site.polygon);
  if (areaSqm <= 0) {
    errors.push("مساحت محاسبه‌شده زمین صفر یا نامعتبر است — رأس‌ها را بررسی کنید.");
  }
  if (areaSqm > 0 && areaSqm < 20) {
    errors.push("مساحت زمین بسیار کوچک به نظر می‌رسد (کمتر از ۲۰ متر مربع).");
  }

  if (!Number.isFinite(site.orientationDeg) || site.orientationDeg < 0 || site.orientationDeg >= 360) {
    errors.push("جهت‌گیری باید بین ۰ تا ۳۶۰ درجه باشد.");
  }

  if (site.plannedUnitCount != null && (!Number.isInteger(site.plannedUnitCount) || site.plannedUnitCount < 1)) {
    errors.push("تعداد واحد برنامه‌ریزی‌شده باید یک عدد صحیحِ حداقل ۱ باشد.");
  }

  if (site.adjacentStreets.length === 0) {
    errors.push("حداقل یک معبر مجاور باید مشخص شود.");
  }
  for (const street of site.adjacentStreets) {
    if (street.widthMeters <= 0) {
      errors.push(`عرض معبر ضلع ${street.side} باید بزرگتر از صفر باشد.`);
    }
  }

  if (!site.zoneId) {
    errors.push("انتخاب پهنه/منطقه ضوابط الزامی است.");
  }

  return { valid: errors.length === 0, areaSqm, errors };
}

/** برآورد تعداد پارکینگ موردنیاز طبق ضوابط منطقه */
export function calculateRequiredParking(
  site: SiteInput,
  zone: ZoneRegulation,
  totalGfaSqm: number
): number {
  const rule = zone.parkingRules.find((r) => r.use === site.allowedUse);
  if (!rule) return 0;

  if (rule.spacesPerUnit != null) {
    const unitArea = rule.minUnitAreaSqm ?? 60;
    const unitCount = site.plannedUnitCount ?? Math.max(1, Math.floor(totalGfaSqm / unitArea));
    return Math.ceil(unitCount * rule.spacesPerUnit);
  }

  if (rule.sqmPerSpace != null && rule.sqmPerSpace > 0) {
    return Math.ceil(totalGfaSqm / rule.sqmPerSpace);
  }

  return 0;
}

/**
 * محاسبه اصلی موتور ضوابط: با گرفتن ورودی سایت + ضوابط منطقه،
 * سقف‌های مجاز ساخت (سطح اشغال، زیربنای کل، طبقات، پارکینگ) را برمی‌گرداند.
 */
export function computeCompliance(site: SiteInput, zone: ZoneRegulation): ComplianceResult {
  const warnings: string[] = [];
  const siteAreaSqm = polygonArea(site.polygon);

  if (!zone.allowedUses.includes(site.allowedUse)) {
    warnings.push(
      `کاربری «${site.allowedUse}» در پهنه ${zone.pahneCode} (${zone.district}) مجاز شمرده نشده — نیاز به بررسی دقیق‌تر یا دستور نقشه.`
    );
  }
  if (!zone.verified) {
    warnings.push(
      "این رکورد ضوابط هنوز با کارشناس محلی/دستور نقشه رسمی راستی‌آزمایی نشده (verified: false)."
    );
  }

  const maxOccupancyAreaSqm = (siteAreaSqm * zone.maxOccupancyPercent) / 100;
  const maxTotalGfaSqm = (siteAreaSqm * zone.maxDensityPercent) / 100;

  // برآورد ساده پاخور قابل ساخت پس از کسر عقب‌نشینی‌های اجباری از محیط زمین.
  // این یک تقریب مبتنی بر «کوچک‌سازی یکنواخت» است، نه offset دقیق هندسی چندضلعی،
  // و برای مولد massing (issue #19) به عنوان سقف بالایی کفایت می‌کند.
  const avgSetback =
    (site.adjacentStreets.length > 0 ? zone.minFrontSetbackMeters : 0) +
    zone.minSideSetbackMeters +
    zone.minRearSetbackMeters;
  const perimeter = polygonPerimeter(site.polygon);
  const setbackAreaLoss = perimeter > 0 ? (avgSetback / 3) * perimeter * 0.5 : 0;
  const estimatedBuildableFootprintSqm = Math.max(
    0,
    Math.min(maxOccupancyAreaSqm, siteAreaSqm - setbackAreaLoss)
  );

  if (estimatedBuildableFootprintSqm < maxOccupancyAreaSqm * 0.5) {
    warnings.push(
      "عقب‌نشینی‌های اجباری نسبت به مساحت زمین زیاد است؛ پاخور قابل ساخت واقعی به‌طور محسوسی کمتر از سقف سطح اشغال مجاز خواهد بود."
    );
  }

  const maxFloors = zone.maxFloors;
  const requiredParkingSpaces = calculateRequiredParking(site, zone, maxTotalGfaSqm);

  return {
    zone,
    siteAreaSqm,
    maxOccupancyAreaSqm,
    maxTotalGfaSqm,
    maxFloors,
    requiredParkingSpaces,
    estimatedBuildableFootprintSqm,
    warnings,
  };
}
