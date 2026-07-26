import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "خدمات | طرح‌یار",
  description:
    "طراحی، توسعه فنی، و مدیریت اجرا — یک دیدگاه واحد از ایده تا تحویل",
};

const services = [
  {
    number: "۰۱",
    title: "طراحی معماری",
    tagline: "از ایده تا نقشه",
    description:
      "فرایند طراحی با درک دقیق از سبک زندگی، نیازها، و آرزوهای شما شروع می‌شود. سپس مفهوم اولیه شکل می‌گیرد، بررسی می‌شود، و به مجموعه کامل نقشه‌های اجرایی تبدیل می‌شود.",
    items: [
      "برنامه‌ریزی فضایی و مطالعات اولیه",
      "طراحی مفهومی و رندرینگ",
      "نقشه‌های معماری کامل",
      "هماهنگی با مشاوران سازه و تأسیسات",
      "مجوزها و ضوابط شهرداری",
    ],
  },
  {
    number: "۰۲",
    title: "توسعه فنی",
    tagline: "دقت در جزئیات",
    description:
      "جزئیات اجرایی، مشخصات فنی مصالح، و هماهنگی کامل بین تمام مشاوران. این مرحله تضمین می‌کند که آنچه طراحی شده، دقیقاً ساخته شود.",
    items: [
      "نقشه‌های جزئیات اجرایی",
      "مشخصات فنی مصالح و تجهیزات",
      "هماهنگی مشاوران سازه، مکانیک، الکتریک",
      "برآورد دقیق هزینه",
      "جدول زمان‌بندی اجرا",
    ],
  },
  {
    number: "۰۳",
    title: "مدیریت اجرا",
    tagline: "کنترل از آغاز تا تحویل",
    description:
      "حضور منظم در کارگاه، نظارت بر کیفیت اجرا، کنترل هزینه، و مدیریت پیمانکاران. هدف: دقیقاً آنچه طراحی شده، در بودجه و زمان تعیین‌شده تحویل داده شود.",
    items: [
      "نظارت کارگاهی منظم",
      "کنترل کیفیت مصالح و اجرا",
      "مدیریت و هماهنگی پیمانکاران",
      "کنترل بودجه و مغایرت‌گیری",
      "گزارش‌دهی منظم به کارفرما",
    ],
  },
];

const workflowSteps = [
  { step: "۱", title: "جلسه اول", desc: "آشنایی، درک نیاز، بررسی زمین یا ملک" },
  { step: "۲", title: "طراحی مفهومی", desc: "ارائه دو یا سه گزینه طراحی اولیه" },
  { step: "۳", title: "توسعه طرح", desc: "تکامل طرح انتخابی تا سطح اجرایی" },
  { step: "۴", title: "مجوزها", desc: "اخذ تأییدیه‌های شهرداری و نظام مهندسی" },
  { step: "۵", title: "اجرا", desc: "نظارت مستمر بر کارگاه و مدیریت پیمانکاران" },
  { step: "۶", title: "تحویل", desc: "بررسی نهایی، رفع نواقص، و تحویل پروژه" },
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
            یک دیدگاه واحد از <span className="text-material-glass">ایده تا تحویل</span>
          </h1>
          <p className="mt-6 max-w-xl text-warm-white/50 leading-relaxed text-lg">
            طراحی و اجرا در زیر یک سقف — بدون شکاف بین آنچه تصور می‌شود و
            آنچه ساخته می‌شود.
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
              Process
            </p>
            <h2 className="text-3xl font-black text-charcoal">
              مراحل همکاری
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
          پروژه‌ای در ذهن دارید؟
        </h2>
        <p className="text-charcoal/60 mb-8 max-w-md mx-auto">
          با یک جلسه کوتاه شروع کنیم — بدون تعهد، فقط یک گفتگو.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border border-charcoal bg-charcoal px-8 py-4 text-warm-white shadow-arch-md transition-all hover:bg-material-glass hover:shadow-arch-lg focus-visible:ring-2 focus-visible:ring-material-glass/40 focus-visible:ring-offset-2"
        >
          درخواست جلسه مشاوره
        </Link>
      </section>
    </main>
  );
}
