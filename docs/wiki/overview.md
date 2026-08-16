# Overview — طرح‌یار (TarhYar)

کوپایلوت هوشمند طراحی و بررسی ضوابط معماری برای دفاتر طراحی و شرکت‌های طراحی-ساخت در تهران. پوزیشنینگ: کوپایلوت ضوابط و طراحی — نه گالری نمونه‌کار.

## پشته فنی
Next.js 15 (App Router) + React 19 + TypeScript + TailwindCSS + Framer Motion (حداقلی). داده استاتیک (فعلاً بدون دیتابیس). استقرار: آروان‌کلود (Docker/Container + CDN)، خروجی `standalone`.

## ساختار کد (`web/src/`)
```
app/            صفحات: home, about, contact, projects, services, copilot, api
components/     home, contact, copilot, projects, layout
data/           projects.ts (داده استاتیک پروژه‌ها)
lib/            contactSchema.ts (Zod validation)، compliance/ (منطق کوپایلوت ضوابط)
```

## دامنه فعلی (MVP)
شش صفحه: خانه، پروژه‌ها، جزئیات پروژه، خدمات، درباره ما، تماس — به‌علاوه بخش «کوپایلوت» (بررسی ضوابط/massing). بدون بلاگ، بدون حساب کاربری، بدون CMS (فاز ۲).

## نقشه‌راه (خلاصه)
M1 پایه/طراحی ✅ در حال تکمیل → M2 پروژه‌ها → M3 خدمات/درباره/تماس → M4 بهینه‌سازی و استقرار. جزئیات کامل در [ROADMAP.md](../../ROADMAP.md) و [ARCHITECTURE.md](../../ARCHITECTURE.md) (توجه: بخش‌هایی از ARCHITECTURE.md هنوز پوزیشنینگ اولیهٔ «سایت معماری مسکونی لوکس» را دارد و باید در بازبینی بعدی با پوزیشنینگ کوپایلوت هم‌راستا شود — در `log.md` ثبت شده).

## مخزن
[github.com/massoudsh/tarhyar](https://github.com/massoudsh/tarhyar) — شاخهٔ اصلی `main`.
