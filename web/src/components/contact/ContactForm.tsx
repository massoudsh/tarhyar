"use client";

import { useState, useId } from "react";
import { contactSchema } from "@/lib/contactSchema";

type FormState = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  area: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const projectTypes = [
  "دفتر معماری کوچک (۱ تا ۵ نفر)",
  "دفتر معماری متوسط/بزرگ",
  "شرکت طراحی-ساخت (Design-Build)",
  "سازنده/توسعه‌دهنده (Developer)",
  "سایر",
] as const;

function clientValidate(data: FormState): FieldErrors {
  const result = contactSchema.safeParse(data);
  if (result.success) return {};
  const errs: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof FormState;
    if (!errs[key]) errs[key] = issue.message;
  }
  return errs;
}

const fieldBase =
  "w-full border bg-warm-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 transition-colors focus:outline-none focus:ring-2 focus:ring-material-glass/20";
const fieldNormal =
  "border-warm-grey-deep/70 hover:border-charcoal/30 focus:border-material-glass/60";
const fieldErr = "border-red-400 focus:ring-red-300";

export function ContactForm() {
  const uid = useId();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    area: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    const errs = clientValidate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      document.getElementById(`${uid}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else if (res.status === 429) {
        setServerError("تعداد درخواست‌ها بیش از حد مجاز است. لطفاً چند دقیقه صبر کنید.");
        setStatus("idle");
      } else {
        const json = await res.json().catch(() => ({})) as { error?: string };
        setServerError(json.error ?? "خطایی رخ داد. دوباره تلاش کنید.");
        setStatus("idle");
      }
    } catch {
      setServerError("اتصال به سرور برقرار نشد. دوباره تلاش کنید.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-charcoal/12 bg-material-sand px-8 py-14 text-center shadow-arch-sm">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center bg-material-glass" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warm-white">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-charcoal mb-2">درخواست ارسال شد</h3>
        <p className="text-charcoal/70 text-sm leading-relaxed">
          در اسرع وقت — معمولاً ظرف ۲۴ ساعت — با شما تماس می‌گیریم.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {serverError && (
        <div role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-medium text-charcoal">
          نام و نام‌خانوادگی <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id={`${uid}-name`} name="name" type="text" autoComplete="name"
          value={form.name} onChange={handleChange}
          aria-describedby={errors.name ? `${uid}-name-err` : undefined}
          aria-invalid={!!errors.name}
          className={`${fieldBase} ${errors.name ? fieldErr : fieldNormal}`}
          placeholder="فرهاد اسکندری"
        />
        {errors.name && <p id={`${uid}-name-err`} role="alert" className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Phone + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-phone`} className="mb-2 block text-sm font-medium text-charcoal">
            شماره موبایل <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel"
            value={form.phone} onChange={handleChange} dir="ltr"
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
            aria-invalid={!!errors.phone}
            className={`${fieldBase} text-left ${errors.phone ? fieldErr : fieldNormal}`}
            placeholder="09121234567"
          />
          {errors.phone && <p id={`${uid}-phone-err`} role="alert" className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="mb-2 block text-sm font-medium text-charcoal">
            ایمیل <span className="text-charcoal/30 text-xs font-normal">(اختیاری)</span>
          </label>
          <input
            id={`${uid}-email`} name="email" type="email" autoComplete="email"
            value={form.email} onChange={handleChange} dir="ltr"
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            aria-invalid={!!errors.email}
            className={`${fieldBase} text-left ${errors.email ? fieldErr : fieldNormal}`}
            placeholder="name@example.com"
          />
          {errors.email && <p id={`${uid}-email-err`} role="alert" className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      {/* Project type + area */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-projectType`} className="mb-2 block text-sm font-medium text-charcoal">
            نوع پروژه <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id={`${uid}-projectType`} name="projectType"
            value={form.projectType} onChange={handleChange}
            aria-describedby={errors.projectType ? `${uid}-pt-err` : undefined}
            aria-invalid={!!errors.projectType}
            className={`${fieldBase} ${errors.projectType ? fieldErr : fieldNormal}`}
          >
            <option value="">انتخاب کنید</option>
            {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.projectType && <p id={`${uid}-pt-err`} role="alert" className="mt-1.5 text-xs text-red-500">{errors.projectType}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-area`} className="mb-2 block text-sm font-medium text-charcoal">متراژ تقریبی</label>
          <input
            id={`${uid}-area`} name="area" type="text"
            value={form.area} onChange={handleChange}
            className={`${fieldBase} ${fieldNormal}`}
            placeholder="مثلاً ۵۰۰ متر"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor={`${uid}-message`} className="mb-2 block text-sm font-medium text-charcoal">
          شرح پروژه <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${uid}-message`} name="message" rows={5}
          value={form.message} onChange={handleChange}
          aria-describedby={errors.message ? `${uid}-msg-err` : undefined}
          aria-invalid={!!errors.message}
          className={`${fieldBase} resize-none ${errors.message ? fieldErr : fieldNormal}`}
          placeholder="موقعیت ملک، ایده‌های اولیه، زمان‌بندی مدنظر..."
        />
        {errors.message && <p id={`${uid}-msg-err`} role="alert" className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit" disabled={status === "submitting"}
        className="w-full border border-charcoal bg-charcoal px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-warm-white shadow-arch-md transition-all hover:bg-material-glass disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-material-glass/40 focus-visible:ring-offset-2"
      >
        {status === "submitting" ? "در حال ارسال..." : "ارسال درخواست"}
      </button>
      <p className="text-xs text-charcoal/40 text-center">فیلدهای ستاره‌دار الزامی هستند</p>
    </form>
  );
}
