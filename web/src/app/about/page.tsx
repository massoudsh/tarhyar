import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "درباره | طرح‌یار",
  description:
    "چرا طرح‌یار ساخته شد و چه مسئله‌ای را برای دفاتر معماری ایران حل می‌کند",
};

const stats = [
  { value: "۳", label: "منطقه اولیه پوشش‌داده‌شده" },
  { value: "۳–۵", label: "گزینه Massing در هر تحلیل" },
  { value: "۶", label: "لایه در خط‌لوله راه‌حل" },
  { value: "Pre-MVP", label: "فاز فعلی محصول" },
];

const philosophy = [
  {
    title: "شفافیت ضوابط",
    desc: "هر عدد — سطح اشغال، تراکم، پارکینگ — از یک قاعده مشخص می‌آید، نه حدس. منبع هر ضابطه قابل ردیابی است.",
  },
  {
    title: "گزینه‌محوری",
    desc: "به‌جای یک ایده اول، حداقل ۳ تا ۵ گزینه واقعی و قابل مقایسه پیش از تصمیم‌گیری روی میز است.",
  },
  {
    title: "زودهنگام بودن",
    desc: "ریسک ضوابطی — پارکینگ کم، تخطی از سطح اشغال — در همان فاز Concept دیده می‌شود، نه در فاز اخذ پروانه.",
  },
  {
    title: "مکمل، نه جایگزین",
    desc: "طرح‌یار پیش از AutoCAD/Revit/Rhino می‌نشیند و به آن‌ها خروجی می‌دهد — جایگزین ابزار ترسیم شما نیست.",
  },
];

const roadmap = [
  {
    period: "فاز ۰",
    role: "Discovery",
    place: "تعریف wedge اول و دیتاست پیش‌نویس ضوابط ۳ منطقه تهران — در حال انجام",
  },
  {
    period: "فاز ۱",
    role: "MVP",
    place: "موتور ظرفیت زمین + مولد گزینه Massing — در حال ساخت",
  },
  {
    period: "فاز ۲",
    role: "Risk Flagging",
    place: "هشدار زودهنگام ریسک ضوابطی — برنامه بعدی",
  },
  {
    period: "فاز ۳ و ۴",
    role: "Collaboration & Scale",
    place: "همکاری تیمی، قیمت‌گذاری SaaS و گسترش جغرافیایی — آینده",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Intro */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          {/* Diagram placeholder */}
          <div
            className="border border-charcoal/12 bg-material-asphalt overflow-hidden shadow-arch-lg concrete-texture"
            aria-label="نمودار مفهومی خط‌لوله کوپایلوت"
          >
            <div className="h-full w-full bg-gradient-to-br from-espresso-light to-espresso" />
          </div>

          {/* Mission */}
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-medium tracking-[0.3em] text-material-glass uppercase">
              About
            </p>
            <h1 className="font-display text-4xl font-black text-charcoal sm:text-5xl">
              طرح‌یار
            </h1>
            <p className="mt-2 text-charcoal/50">کوپایلوت طراحی و ضوابط برای دفاتر معماری</p>

            <div className="mt-8 space-y-5 text-charcoal/70 leading-[2] text-base">
              <p>
                هر پروژه ساختمانی، قبل از این‌که نقشه شود، یک تصمیم است: زمین چقدر ظرفیت دارد؟
                کدام حجم بهترین جواب طراحی و اقتصادی را می‌دهد؟ در دفاتر معماری ایرانی این تصمیم‌ها
                معمولاً بر پایه تجربه فردی و چک‌لیست دستی گرفته می‌شود — نه چون معمار توانایی
                ندارد، بلکه چون ابزار مناسبی برای بررسی سریع چند گزینه در کنار ضوابط پیچیده
                منطقه‌ای وجود ندارد.
              </p>
              <p>
                AutoCAD، Revit و Rhino ابزارهای قدرتمندی برای ترسیم و مدل‌سازی‌اند، اما بعد از
                تصمیم وارد می‌شوند، نه پیش از آن. طرح‌یار دقیقاً همان جای خالی را پر می‌کند: لایه‌ای
                که سایت را می‌فهمد، ضوابط منطقه را اعمال می‌کند، چند گزینه Massing تولید می‌کند و
                توضیح می‌دهد چرا یک گزینه بهتر است.
              </p>
              <p>
                نسخه اول روی یک wedge مشخص تمرکز دارد — تحلیل ظرفیت زمین و تولید گزینه‌های
                Massing — با دیتاست دستی چند منطقه پرتقاضای تهران. هدف نهایی، تبدیل‌شدن به لایه
                هوشمند تصمیم‌سازی طراحی و ضوابط برای معماری ایران است.
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
              اصول طرح‌یار
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

      {/* Roadmap timeline */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <header className="mb-12">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] text-material-glass uppercase">
            Roadmap
          </p>
          <h2 className="text-3xl font-black text-charcoal">نقشه‌راه محصول</h2>
        </header>
        <ol className="space-y-0">
          {roadmap.map((exp, i) => (
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
            <h2 className="text-2xl font-black text-charcoal">می‌خواهید پایلوت اولیه باشید؟</h2>
            <p className="mt-2 text-charcoal/60 text-sm">
              اگر دفتر معماری یا شرکت طراحی-ساخت هستید، خوشحال می‌شویم درباره پایلوت رایگان صحبت کنیم.
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
