// مدل داده هسته کوپایلوت ضوابط/طراحی طرح‌یار
// پیاده‌سازی ایشو #17 (مدل داده ورودی سایت) + انواع مشترک برای موتور ضوابط،
// مولد massing، مقایسه‌گر و گزارش تصمیم (ایشو‌های #18 تا #21).

/** یک نقطه در سیستم مختصات محلی سایت (متر) */
export interface Point {
  x: number;
  y: number;
}

/** جهت اصلی معبر مجاور نسبت به قطعه */
export type StreetSide = "north" | "south" | "east" | "west";

export type StreetKind = "اصلی" | "فرعی" | "بن‌بست";

export interface AdjacentStreet {
  side: StreetSide;
  /** عرض معبر پس از تعریض (متر) */
  widthMeters: number;
  kind: StreetKind;
}

export type LandUse = "residential" | "commercial" | "mixed" | "office";

export const landUseLabels: Record<LandUse, string> = {
  residential: "مسکونی",
  commercial: "تجاری",
  mixed: "مختلط",
  office: "اداری",
};

/**
 * ورودی سایت — issue #17
 * شکل زمین به صورت چندضلعی ساده (بدون خودتقاطع)، به همراه متراژ،
 * جهت‌گیری، معابر مجاور و کاربری مجاز.
 */
export interface SiteInput {
  id: string;
  /** رأس‌های چندضلعی زمین به ترتیب (متر)، حداقل ۳ نقطه */
  polygon: Point[];
  /** جهت نمای اصلی/محور طولی زمین — درجه، صفر = شمال، در جهت عقربه ساعت */
  orientationDeg: number;
  adjacentStreets: AdjacentStreet[];
  zoneId: string;
  allowedUse: LandUse;
  /** تعداد واحد برنامه‌ریزی‌شده در صورت وجود (برای برآورد پارکینگ/مساحت مفید) */
  plannedUnitCount?: number;
  notes?: string;
}

/** نتیجه اعتبارسنجی هندسی/فیلدی ورودی سایت */
export interface SiteInputValidation {
  valid: boolean;
  areaSqm: number;
  errors: string[];
}

// ---------------------------------------------------------------------------
// موتور ضوابط — issue #18 (تعریف داده) — پیاده‌سازی محاسبات در ruleEngine.ts

export interface ParkingRule {
  use: LandUse;
  /** یک واحد پارکینگ به ازای هر N مترمربع زیربنا (اگر تعریف شده) */
  sqmPerSpace?: number;
  /** یک واحد پارکینگ به ازای هر واحد مسکونی/اداری (اگر تعریف شده) */
  spacesPerUnit?: number;
  /** حداقل متراژ واحد که این قاعده برایش اعمال می‌شود */
  minUnitAreaSqm?: number;
}

export interface ZoneRegulation {
  id: string;
  district: string;
  /** کد پهنه طرح تفصیلی، مثل R122 */
  pahneCode: string;
  label: string;
  /** حداکثر سطح اشغال مجاز (٪ از مساحت زمین) */
  maxOccupancyPercent: number;
  /** حداکثر تراکم ساختمانی مجاز (٪ از مساحت زمین → زیربنای کل) */
  maxDensityPercent: number;
  maxFloors: number;
  minFrontSetbackMeters: number;
  minSideSetbackMeters: number;
  minRearSetbackMeters: number;
  /** حداقل سهم فضای سبز از سطح باز قطعه (٪) */
  minOpenSpaceGreenPercent: number;
  parkingRules: ParkingRule[];
  allowedUses: LandUse[];
  /** منبع و وضعیت راستی‌آزمایی — طبق چک‌لیست ایشو #16 */
  source: string;
  verified: boolean;
  lastUpdated: string;
}

export interface ComplianceResult {
  zone: ZoneRegulation;
  siteAreaSqm: number;
  maxOccupancyAreaSqm: number;
  maxTotalGfaSqm: number;
  maxFloors: number;
  requiredParkingSpaces: number;
  /** برآورد سادهٔ مساحت قابل ساخت پس از کسر عقب‌نشینی‌های اجباری از هر ضلع */
  estimatedBuildableFootprintSqm: number;
  warnings: string[];
}

// ---------------------------------------------------------------------------
// مولد گزینه Massing — issue #19

export type MassingShape = "compact" | "spread" | "courtyard" | "split";

export const massingShapeLabels: Record<MassingShape, string> = {
  compact: "توده فشرده (پاخور کم، طبقات بیشتر)",
  spread: "توده گسترده (پاخور زیاد، طبقات کمتر)",
  courtyard: "حیاط مرکزی",
  split: "توده دوتکه",
};

export interface MassingOption {
  id: string;
  label: string;
  shape: MassingShape;
  footprintAreaSqm: number;
  floors: number;
  gfaSqm: number;
  parkingProvided: number;
  estimatedUnitCount: number;
  /** ضریب کارایی هندسی این شکل (۰ تا ۱) — برای برآورد سطح مفید در مقایسه‌گر */
  efficiencyFactor: number;
  description: string;
  compliant: boolean;
  warnings: string[];
}

// ---------------------------------------------------------------------------
// مقایسه‌گر گزینه‌ها — issue #20

export interface OptionComparisonMetric {
  optionId: string;
  netUsableAreaSqm: number;
  sunlightScore: number; // ۰ تا ۱۰
  circulationScore: number; // ۰ تا ۱۰
  parkingAdequacyRatio: number; // provided / required
  complianceRiskScore: number; // ۰ تا ۱۰۰، کمتر بهتر
  overallScore: number; // ۰ تا ۱۰۰، بیشتر بهتر
}

export interface ComparisonResult {
  metrics: OptionComparisonMetric[];
  recommendedOptionId: string;
}

// ---------------------------------------------------------------------------
// گزارش تصمیم قابل‌ارائه — issue #21

export interface OptionRiskNote {
  optionId: string;
  risks: string[];
}

export interface DecisionReport {
  generatedAt: string;
  siteAreaSqm: number;
  zoneLabel: string;
  recommendedOptionId: string;
  rationale: string[];
  risksByOption: OptionRiskNote[];
  comparisonSummary: OptionComparisonMetric[];
}
