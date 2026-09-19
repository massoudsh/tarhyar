import { describe, expect, it } from "vitest";
import { getProjectBySlug, projects } from "./projects";

describe("sample analysis catalog", () => {
  it("contains unique slugs and sample analyses", () => {
    expect(projects.length).toBe(3);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(projects.every((project) => project.status.includes("نمونه تحلیل"))).toBe(true);
  });

  it("resolves known and unknown slugs", () => {
    expect(getProjectBySlug("zone1-sample-analysis")?.type).toBe("منطقه ۱");
    expect(getProjectBySlug("missing-project")).toBeUndefined();
  });
});