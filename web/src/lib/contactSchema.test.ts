import { describe, expect, it } from "vitest";
import { contactSchema } from "./contactSchema";

const validRequest = {
  name: "مریم احمدی",
  phone: "09121234567",
  email: "maryam@example.com",
  projectType: "دفتر معماری کوچک (۱ تا ۵ نفر)",
  area: "۳۰۰ متر",
  message: "برای بررسی ظرفیت زمین و تولید گزینه های اولیه مشاوره می خواهم.",
};

describe("contactSchema", () => {
  it("accepts a complete pilot request", () => {
    expect(contactSchema.safeParse(validRequest).success).toBe(true);
  });

  it("allows an empty optional email", () => {
    expect(contactSchema.safeParse({ ...validRequest, email: "" }).success).toBe(true);
  });

  it("rejects invalid phone numbers and short messages", () => {
    const result = contactSchema.safeParse({ ...validRequest, phone: "123", message: "کوتاه" });
    expect(result.success).toBe(false);
  });
});