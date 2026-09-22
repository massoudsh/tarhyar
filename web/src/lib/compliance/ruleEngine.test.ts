import { describe, expect, it } from "vitest";
import { hasSelfIntersection, validateSiteInput } from "./ruleEngine";
import type { SiteInput } from "./types";

const validSite: SiteInput = {
  id: "test-site",
  polygon: [
    { x: 0, y: 0 },
    { x: 12, y: 0 },
    { x: 12, y: 25 },
    { x: 0, y: 25 },
  ],
  orientationDeg: 0,
  adjacentStreets: [{ side: "south", widthMeters: 12, kind: "اصلی" }],
  zoneId: "r122",
  allowedUse: "residential",
};

describe("site geometry validation", () => {
  it("accepts a simple polygon", () => {
    expect(hasSelfIntersection(validSite.polygon)).toBe(false);
    expect(validateSiteInput(validSite).valid).toBe(true);
  });

  it("rejects a self-intersecting polygon", () => {
    const site = {
      ...validSite,
      polygon: [
        { x: 0, y: 0 },
        { x: 12, y: 25 },
        { x: 12, y: 0 },
        { x: 0, y: 25 },
      ],
    };

    expect(hasSelfIntersection(site.polygon)).toBe(true);
    expect(validateSiteInput(site).errors).toContain(
      "اضلاع زمین نباید یکدیگر را قطع کنند؛ ترتیب رأس‌ها را بررسی کنید."
    );
  });

  it("rejects a fractional planned unit count", () => {
    const result = validateSiteInput({ ...validSite, plannedUnitCount: 2.5 });
    expect(result.errors).toContain("تعداد واحد برنامه‌ریزی‌شده باید یک عدد صحیحِ حداقل ۱ باشد.");
  });
});
