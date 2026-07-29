import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(100, "نام خیلی طولانی است"),
  phone: z
    .string()
    .regex(/^(\+98|0)?9\d{9}$/, "شماره موبایل معتبر وارد کنید (مثال: 09121234567)")
    .transform((v) => v.replace(/\s/g, "")),
  email: z
    .string()
    .email("آدرس ایمیل معتبر وارد کنید")
    .optional()
    .or(z.literal("")),
  projectType: z
    .enum(
      [
        "دفتر معماری کوچک (۱ تا ۵ نفر)",
        "دفتر معماری متوسط/بزرگ",
        "شرکت طراحی-ساخت (Design-Build)",
        "سازنده/توسعه‌دهنده (Developer)",
        "سایر",
      ] as const
    )
    .refine((v) => v.length > 0, { message: "نوع دفتر را انتخاب کنید" }),
  area: z.string().max(50).optional(),
  message: z
    .string()
    .min(20, "شرح پروژه باید حداقل ۲۰ کاراکتر باشد")
    .max(2000, "متن خیلی طولانی است"),
});

export type ContactInput = z.infer<typeof contactSchema>;
