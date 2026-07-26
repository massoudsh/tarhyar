import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "درباره | طرح‌یار",
  description:
    "بیست سال تجربه در طراحی و اجرای معماری مسکونی لوکس در تهران و حومه",
};

const stats = [
  { value: "۱۵+", label: "سال تجربه" },
  { value: "۴۰+", label: "پروژه اجراشده" },
  { value: "۱۲۰+", label: "خانواده خشنود" },
  { value: "۸", label: "جایزه ملی" },
];

const philosophy = [
  {
    title: "کنترل",
    desc: "هر پروژه از لحظه اول تا لحظه تحویل زیر یک نظارت واحد است. این یعنی وحدت بین ایده و اجرا.",
  },
  {
    title: "دقت",
    desc: "جزئیات تفاوت را می‌سازند. از زاویه یک دیوار تا رنگ یک دستگیره — همه‌چیز با دقت تعیین می‌شود.",
  },
  {
    title: "اقتدار",
    desc: "یک معمار باید بتواند به وضوح بگوید چرا. هر تصمیم دلیل دارد، هر دلیل قابل توضیح است.",
  },
  {
    title: "آرامش",
    desc: "فضاهایی می‌سازم که در آن‌ها نفس کشیدن آسان‌تر است. سکوت بصری نوعی لوکس است.",
  },
];

const experience = [
  {
    period: "۱۴۰۰ — اکنون",
    role: "موسس و معمار ارشد",
    place: "دفتر طرح‌یار — تهران",
  },
  {
    period: "۱۳۹۵ — ۱۴۰۰",
    role: "معمار ارشد",
    place: "دفتر معماری سپهر",
  },
  {
    period: "۱۳۹۰ — ۱۳۹۵",
    role: "معمار",
    place: "گروه طراحی آرین",
  },
  {
    period: "۱۳۸۵ — ۱۳۹۰",
    role: "فارغ‌التحصیل کارشناسی‌ارشد معماری",
    place: "دانشگاه تهران",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Intro */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          {/* Portrait placeholder */}
          <div
            className="border border-charcoal/12 bg-material-asphalt overflow-hidden shadow-arch-lg concrete-texture"
            aria-label="تصویر معمار"
          >
            <div className="h-full w-full bg-gradient-to-br from-espresso-light to-espresso" />
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-medium tracking-[0.3em] text-material-glass uppercase">
              About
            </p>
            <h1 className="font-display text-4xl font-black text-charcoal sm:text-5xl">
              فرهاد اسکندری
            </h1>
            <p className="mt-2 text-charcoal/50">معمار مسکونی</p>

            <div className="mt-8 space-y-5 text-charcoal/70 leading-[2] text-base">
              <p>
                بیست‌وپنج سال است که فضاهای مسکونی طراحی می‌کنم — از آپارتمان‌های
                کوچک در تهران تا ویلاهای چند‌هزارمتری در البرز. در این سال‌ها
                فهمیدم که معماری خوب نه در حجم، که در دقت نهفته است.
              </p>
              <p>
                در سال ۱۴۰۰ دفتر طرح‌یار را با یک هدف مشخص تأسیس کردم: ارائه خدمات
                طراحی و اجرا زیر یک سقف واحد، با کنترل کامل بر کیفیت در هر مرحله.
                این مدل در ایران غیرمعمول است — و همین تفاوت را می‌سازد.
              </p>
              <p>
                کارهای من اغلب ساده به نظر می‌رسند. این سادگی نتیجه سال‌ها تمرین
                در حذف کردن آن چیزی است که لازم نیست.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-black text-material-glass">{s.value}</p>
                  <p className="mt-1 text-xs text-charcoal/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative overflow-hidden bg-material-asphalt material-grid py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <header className="mb-14">
            <p className="mb-3 text-sm font-medium tracking-[0.3em] text-material-glass uppercase">
              Philosophy
            </p>
            <h2 className="text-3xl font-black text-warm-white">
              فلسفه طراحی
            </h2>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {philosophy.map((item) => (
              <article
                key={item.title}
                className={`border border-charcoal/12 bg-warm-white p-6 shadow-arch-sm`}
              >
                <h3 className="text-lg font-bold text-charcoal mb-3">{item.title}</h3>
                <p className="text-charcoal/70 text-sm leading-[1.9]">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <header className="mb-12">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] text-material-glass uppercase">
            Experience
          </p>
          <h2 className="text-3xl font-black text-charcoal">سابقه حرفه‌ای</h2>
        </header>
        <ol className="space-y-0">
          {experience.map((exp, i) => (
            <li key={i} className="grid grid-cols-[1fr_auto] gap-6 border-b border-warm-grey-deep/40 py-8 last:border-none sm:grid-cols-[12rem_1fr]">
              <p className="text-sm text-charcoal/40 font-mono">{exp.period}</p>
              <div>
                <p className="font-bold text-charcoal">{exp.role}</p>
                <p className="mt-1 text-sm text-material-glass">{exp.place}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="bg-warm-grey/40 py-16 sm:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-charcoal">بیایید با هم کار کنیم</h2>
            <p className="mt-2 text-charcoal/60 text-sm">
              اگر پروژه‌ای دارید که به دقت و کنترل نیاز دارد، اینجا هستم.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 border border-charcoal bg-charcoal px-7 py-3.5 text-sm font-black uppercase tracking-[0.14em] text-warm-white shadow-arch-md transition-all hover:bg-material-glass focus-visible:ring-2 focus-visible:ring-material-glass/40 focus-visible:ring-offset-2"
          >
            تماس بگیرید
          </Link>
        </div>
      </section>
    </main>
  );
}
