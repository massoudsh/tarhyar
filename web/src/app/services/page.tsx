import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "خدمات | طرح‌یار",
  description:
    "چگونه طرح‌یار از ورودی سایت تا گزارش تصمیم، دفاتر معماری را در فاز Concept همراهی می‌کند",
};

const services = [
  {
    number: "۰۱",
    title: "ورودی سایت و ضوابط",
    tagline: "از شکل زمین تا محدودیت‌های قانونی",
    description:
      "شکل زمین را رسم یا مختصات را وارد کنید و جهت‌گیری، معابر مجاور و کاربری مجاز را مشخص کنید. طرح‌یار بلافاصله محدودیت‌های ضوابط منطقه — سطح اشغال، تراکم، طبقات، عقب‌نشینی و پارکینگ — را روی همان زمین اعمال می‌کند.",
    items: [
      "رسم دستی یا ورود مختصات زمین",
      "جهت‌گیری و معابر مجاور",
      "کاربری مجاز",
      "موتور ضوابط منطقه (سطح اشغال/تراکم/طبقات/پارکینگ)",
      "دیتاست اولیه: مناطق ۱، ۳ و ۵ تهران",
    ],
  },
  {
    number: "۰۲",
    title: "تولید گزینه Massing",
    tagline: "۳ تا ۵ گزینه، نه ۱ یا ۲",
    description:
      "بر پایه سقف ضوابط و برنامه فیزیکی، طرح‌یار چند گزینه حجمی — فشرده، گسترده، حیاط مرکزی، دوتکه — تولید می‌کند تا فاز Concept با گزینه‌های واقعی بیشتری شروع شود، نه یک ایده اول.",
    items: [
      "گزینه فشرده",
      "گزینه گسترده",
      "گزینه حیاط مرکزی",
      "گزینه دوتکه",
      "همه گزینه‌ها در سقف مجاز ضوابط",
    ],
  },
  {
    number: "۰۳",
    title: "مقایسه و گزارش تصمیم",
    tagline: "چرا این گزینه، نه آن یکی",
    description:
      "هر گزینه از نظر سطح مفید، نورگیری، circulation، تامین پارکینگ و ریسک ضوابطی مقایسه می‌شود؛ خروجی یک گزارش تصمیم قابل ارائه به کارفرماست — قابل چاپ یا PDF.",
    items: [
      "سطح مفید (net usable area)",
      "تخمین نورگیری",
      "کیفیت circulation",
      "تامین پارکینگ",
      "ریسک ضوابطی هر گزینه",
      "خروجی چاپ/PDF",
    ],
  },
];

const workflowSteps = [
  { step: "۱", title: "ورودی سایت", desc: "رسم زمین، جهت‌گیری، معابر و کاربری" },
  { step: "۲", title: "موتور ضوابط", desc: "اعمال سطح اشغال، تراکم، طبقات و پارکینگ منطقه" },
  { step: "۳", title: "گزینه‌های Massing", desc: "۳ تا ۵ گزینه حجمی در سقف ضوابط" },
  { step: "۴", title: "مقایسه گزینه‌ها", desc: "سطح مفید، نورگیری، circulation، پارکینگ، ریسک" },
  { step: "۵", title: "گزارش تصمیم", desc: "دلیل انتخاب گزینه برتر، آماده ارائه به کارفرما" },
  { step: "۶", title: "پل به CAD", desc: "خروجی پایه برای Rhino / Revit / AutoCAD" },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-material-asphalt material-grid py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-medium tracking-[0.3em] text-material-glass uppercase">
            Services
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-black leading-[1.25] text-warm-white sm:text-5xl lg:text-6xl">
            از ورودی سایت تا <span className="text-material-glass">گزارش تصمیم</span>
          </h1>
          <p className="mt-6 max-w-xl text-warm-white/50 leading-relaxed text-lg">
            طرح‌یار پیش از AutoCAD، Revit یا Rhino می‌نشیند و لایه تصمیم‌سازی فاز Concept را می‌سازد.
          </p>
        </div>
      </section>

      {/* Services detail */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {services.map((service, i) => (
            <article
              key={service.number}
              className={[
                "grid gap-12 lg:grid-cols-2 lg:gap-20 items-start",
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : "",
              ].join(" ")}
            >
              {/* Text */}
              <div>
                <span className="text-6xl font-black text-warm-grey-deep/60">
                  {service.number}
                </span>
                <h2 className="mt-4 text-2xl font-bold text-charcoal sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-material-glass">{service.tagline}</p>
                <p className="mt-5 text-charcoal/70 leading-[2] text-base">
                  {service.description}
                </p>
              </div>
              {/* Items list */}
              <div className={`border border-charcoal/12 bg-warm-white p-8 shadow-arch-sm`}>
                <ul className="space-y-4">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-charcoal/72 text-sm leading-relaxed">
                      <span
                        className="mt-1.5 h-2 w-2 bg-material-glass shrink-0"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Workflow timeline */}
      <section className="bg-warm-grey/40 py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <header className="mb-14 text-center">
            <p className="mb-3 text-sm font-medium tracking-[0.3em] text-material-glass uppercase">
              Pipeline
            </p>
            <h2 className="text-3xl font-black text-charcoal">
              خط‌لوله کوپایلوت
            </h2>
          </header>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div
              className="absolute top-6 right-[2.75rem] left-[2.75rem] hidden h-px bg-warm-grey-deep/60 lg:block"
              aria-hidden
            />
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
              {workflowSteps.map((s) => (
                <li key={s.step} className="flex flex-col items-center text-center lg:relative">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-material-glass bg-material-glass text-warm-white text-sm font-medium shadow-arch-sm relative z-10">
                    {s.step}
                  </span>
                  <h3 className="mt-4 font-bold text-charcoal text-sm">{s.title}</h3>
                  <p className="mt-2 text-xs text-charcoal/50 leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-black text-charcoal mb-4">
          می‌خواهید روی زمین خودتان امتحان کنید؟
        </h2>
        <p className="text-charcoal/60 mb-8 max-w-md mx-auto">
          کوپایلوت را رایگان روی یک زمین نمونه امتحان کنید یا برای پایلوت دفتر خود با ما صحبت کنید.
        </p>
        <Link
          href="/copilot"
          className="inline-flex items-center gap-2 border border-charcoal bg-charcoal px-8 py-4 text-warm-white shadow-arch-md transition-all hover:bg-material-glass hover:shadow-arch-lg focus-visible:ring-2 focus-visible:ring-material-glass/40 focus-visible:ring-offset-2"
        >
          امتحان کوپایلوت
        </Link>
      </section>
    </main>
  );
}
