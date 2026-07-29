// دیتابیس ضوابط منطقه‌ای — issue #16
// «جمع‌آوری و ساخت‌یافته‌سازی ضوابط ۲-۳ منطقه پرتقاضای تهران»
//
// این نسخه یک دیتاست *پیش‌نویس* است: مقادیر بر اساس الگوهای عمومی منتشرشده
// طرح تفصیلی شهر تهران (پهنه‌های مسکونی R) و مثال‌های رایج صنعتی ساخته شده‌اند
// تا موتور ضوابط/مولد massing قابل توسعه و تست باشند.
//
// طبق چک‌لیست خود ایشو، مرحله آخر («بررسی صحت با یک معمار/کارشناس محلی» و
// دریافت «دستور نقشه» رسمی برای هر قطعه) هنوز انجام نشده — به همین دلیل هر
// رکورد `verified: false` دارد. قبل از استفاده در تصمیم واقعی معماری،
// این مقادیر باید با شهرداری منطقه مربوطه راستی‌آزمایی شوند.

import type { ZoneRegulation } from "./types";

export const zoneRegulations: ZoneRegulation[] = [
  {
    id: "tehran-d1-r122",
    district: "منطقه ۱",
    pahneCode: "R122",
    label: "منطقه ۱ — پهنه مسکونی R122 (قطعات کوچک، گذر تعریض‌شده)",
    maxOccupancyPercent: 60,
    maxDensityPercent: 180,
    maxFloors: 5,
    minFrontSetbackMeters: 0,
    minSideSetbackMeters: 0,
    minRearSetbackMeters: 3,
    minOpenSpaceGreenPercent: 50,
    allowedUses: ["residential", "mixed"],
    parkingRules: [
      { use: "residential", spacesPerUnit: 1, minUnitAreaSqm: 60 },
      { use: "mixed", sqmPerSpace: 100 },
    ],
    source:
      "طرح تفصیلی شهر تهران — نمونه استخراجی از مثال کاربردی پهنه R122 (منطقه ۱، گذر ۱۲ متری). نیازمند تایید نهایی با دستور نقشه رسمی شهرداری منطقه ۱.",
    verified: false,
    lastUpdated: "2026-07-29",
  },
  {
    id: "tehran-d3-r121",
    district: "منطقه ۳",
    pahneCode: "R121",
    label: "منطقه ۳ — پهنه مسکونی R121 (تراکم متوسط)",
    maxOccupancyPercent: 60,
    maxDensityPercent: 120,
    maxFloors: 4,
    minFrontSetbackMeters: 0,
    minSideSetbackMeters: 0,
    minRearSetbackMeters: 3,
    minOpenSpaceGreenPercent: 50,
    allowedUses: ["residential"],
    parkingRules: [{ use: "residential", spacesPerUnit: 1, minUnitAreaSqm: 60 }],
    source:
      "طرح تفصیلی شهر تهران — الگوی عمومی پهنه‌بندی مسکونی منطقه ۳ (تراکم ساختمانی رایج ۱۰۰ تا ۱۲۰٪ طبق جدول پهنه R). نیازمند تایید نهایی با دستور نقشه رسمی شهرداری منطقه ۳.",
    verified: false,
    lastUpdated: "2026-07-29",
  },
  {
    id: "tehran-d5-r111",
    district: "منطقه ۵",
    pahneCode: "R111",
    label: "منطقه ۵ — پهنه مسکونی R111 (تراکم پایه)",
    maxOccupancyPercent: 60,
    maxDensityPercent: 100,
    maxFloors: 3,
    minFrontSetbackMeters: 0,
    minSideSetbackMeters: 0,
    minRearSetbackMeters: 3,
    minOpenSpaceGreenPercent: 50,
    allowedUses: ["residential"],
    parkingRules: [{ use: "residential", spacesPerUnit: 1, minUnitAreaSqm: 60 }],
    source:
      "طرح تفصیلی شهر تهران — الگوی عمومی پهنه‌بندی مسکونی منطقه ۵ (تراکم پایه رایج ۸۰ تا ۱۰۰٪). نیازمند تایید نهایی با دستور نقشه رسمی شهرداری منطقه ۵.",
    verified: false,
    lastUpdated: "2026-07-29",
  },
];

export function getZoneById(zoneId: string): ZoneRegulation | undefined {
  return zoneRegulations.find((z) => z.id === zoneId);
}

export function getZonesByDistrict(district: string): ZoneRegulation[] {
  return zoneRegulations.filter((z) => z.district === district);
}

export const zoneDistricts = Array.from(new Set(zoneRegulations.map((z) => z.district)));
