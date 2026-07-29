// نمونه تحلیل‌های طرح‌یار — نه پروژه‌های اجراشده واقعی.
// هر رکورد، خروجی شبیه‌سازی‌شده‌ی خط‌لوله کوپایلوت (ورودی سایت → موتور ضوابط →
// مولد Massing → مقایسه‌گر → گزارش تصمیم) روی یک زمین نمونه در یکی از سه منطقه
// دیتاست پیش‌نویس ضوابط است (نگاه کنید به lib/compliance/zones.ts).
// چون دیتاست ضوابط هنوز verified:false است، این‌ها نمونه‌های آموزشی/دمو هستند،
// نه پروژه‌های واقعیِ اجراشده یا دارای مجوز.

export type ProjectType = "منطقه ۱" | "منطقه ۳" | "منطقه ۵";

export interface GalleryItem {
  /** Caption shown beneath the image placeholder */
  caption: string;
  /** Aspect ratio class: "aspect-[4/3]" | "aspect-[3/4]" | "aspect-square" */
  aspect: string;
  /** Background color used as placeholder until real image is provided */
  color: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  type: ProjectType;
  year: string;
  location: string;
  area: string;
  status: string;
  /** Scope clarification: what the copilot analyzed on this sample site */
  roleNote?: string;
  scope: string[];
  materials: string[];
  gallery: GalleryItem[];
  description: string;
  designerNote: string;
  coverColor: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    slug: "zone1-sample-analysis",
    title: "زمین نمونه — منطقه ۱ (پهنه R122)",
    subtitle: "از ۴ گزینه Massing به یک تصمیم قابل دفاع",
    type: "منطقه ۱",
    year: "۱۴۰۵",
    location: "منطقه ۱، تهران — پهنه مسکونی R122",
    area: "۳۰۰ متر مربع (زمین)",
    status: "نمونه تحلیل — پیش از اخذ مجوز",
    roleNote:
      "دامنه این تحلیل: ورودی سایت + موتور ضوابط + ۴ گزینه Massing + گزارش تصمیم (بدون طراحی تفصیلی و بدون اجرا)",
    scope: [
      "تحلیل سطح اشغال و تراکم مجاز",
      "بررسی ارتفاع و تعداد طبقات مجاز",
      "تخمین پارکینگ لازم",
      "تولید ۴ گزینه Massing",
      "مقایسه و رتبه‌بندی گزینه‌ها",
    ],
    materials: [
      "ورودی سایت (Site Input)",
      "موتور ضوابط (Rule Engine)",
      "مولد Massing",
      "مقایسه‌گر گزینه‌ها",
      "گزارش تصمیم",
    ],
    gallery: [
      { caption: "گزینه گسترده — بیشترین سطح مفید", aspect: "aspect-[16/9]", color: "#c8c4bc" },
      { caption: "گزینه حیاط مرکزی — بیشترین نورگیری", aspect: "aspect-[4/3]", color: "#d4d1cc" },
      { caption: "گزینه دوتکه — ریسک عقب‌نشینی", aspect: "aspect-[3/4]", color: "#bab6ae" },
      { caption: "دیاگرام رتبه‌بندی گزینه‌ها", aspect: "aspect-square", color: "#ccc8c0" },
    ],
    description:
      "روی یک زمین ۳۰۰ متری در منطقه ۱ (پهنه R122)، طرح‌یار سقف ضوابط را محاسبه کرد: حداکثر سطح اشغال ۶۰٪، تراکم ۱۸۰٪، تا ۵ طبقه. بر این اساس ۴ گزینه Massing — فشرده، گسترده، حیاط مرکزی و دوتکه — تولید شد. مقایسه‌گر نشان داد گزینه «حیاط مرکزی» بهترین ترکیب نورگیری و سطح مفید را دارد، در حالی که گزینه «دوتکه» در عقب‌نشینی جبهه عقب به مرز ریسک نزدیک می‌شود.",
    designerNote:
      "ریسکی که در روش دستی معمولاً دیرتر دیده می‌شود — فاصله ناکافی از عقب‌نشینی در گزینه دوتکه — همان ابتدای فاز Concept flag شد.",
    coverColor: "#d4d1cc",
    accentColor: "#5c6148",
  },
  {
    slug: "zone3-sample-analysis",
    title: "زمین نمونه — منطقه ۳ (پهنه R121)",
    subtitle: "تراکم متوسط، تصمیم دقیق‌تر",
    type: "منطقه ۳",
    year: "۱۴۰۵",
    location: "منطقه ۳، تهران — پهنه مسکونی R121",
    area: "۲۵۰ متر مربع (زمین)",
    status: "نمونه تحلیل — پیش از اخذ مجوز",
    roleNote:
      "دامنه این تحلیل: ورودی سایت + موتور ضوابط + ۴ گزینه Massing + گزارش تصمیم (بدون طراحی تفصیلی و بدون اجرا)",
    scope: [
      "تحلیل سطح اشغال و تراکم مجاز",
      "بررسی ارتفاع و تعداد طبقات مجاز",
      "تخمین پارکینگ لازم",
      "تولید ۴ گزینه Massing",
      "مقایسه و رتبه‌بندی گزینه‌ها",
    ],
    materials: [
      "ورودی سایت (Site Input)",
      "موتور ضوابط (Rule Engine)",
      "مولد Massing",
      "مقایسه‌گر گزینه‌ها",
      "گزارش تصمیم",
    ],
    gallery: [
      { caption: "گزینه دوتکه — بهترین سطح مفید و نور", aspect: "aspect-[16/9]", color: "#eae8e5" },
      { caption: "گزینه گسترده — ریسک تراکم", aspect: "aspect-[4/3]", color: "#e4e0da" },
      { caption: "گزینه فشرده — تامین کامل پارکینگ", aspect: "aspect-[3/4]", color: "#d6d2cc" },
      { caption: "دیاگرام رتبه‌بندی گزینه‌ها", aspect: "aspect-square", color: "#ccc8c2" },
    ],
    description:
      "در منطقه ۳ (پهنه R121)، سقف ضوابط پایین‌تر است: سطح اشغال ۶۰٪، تراکم ۱۲۰٪، حداکثر ۴ طبقه. از ۴ گزینه تولیدشده، گزینه «گسترده» با پیش‌روی بیشتر روی زمین، به مرز سقف تراکم نزدیک شد و به‌عنوان ریسک ضوابطی flag شد. گزینه «دوتکه» با تفکیک حجم به دو بلوک، بهترین تعادل سطح مفید، نورگیری و تامین پارکینگ را نشان داد.",
    designerNote:
      "مقایسه‌گر نشان داد گزینه با بیشترین متراژ ظاهری همیشه بهترین گزینه نیست — وقتی ریسک تراکم و کیفیت نورگیری با هم دیده شود، گزینه دوتکه امتیاز بالاتری گرفت.",
    coverColor: "#eae8e5",
    accentColor: "#7a6b5a",
  },
  {
    slug: "zone5-sample-analysis",
    title: "زمین نمونه — منطقه ۵ (پهنه R111)",
    subtitle: "تراکم پایه، اولویت با پارکینگ و فشردگی",
    type: "منطقه ۵",
    year: "۱۴۰۵",
    location: "منطقه ۵، تهران — پهنه مسکونی R111",
    area: "۲۰۰ متر مربع (زمین)",
    status: "نمونه تحلیل — پیش از اخذ مجوز",
    roleNote:
      "دامنه این تحلیل: ورودی سایت + موتور ضوابط + ۴ گزینه Massing + گزارش تصمیم (بدون طراحی تفصیلی و بدون اجرا)",
    scope: [
      "تحلیل سطح اشغال و تراکم مجاز",
      "بررسی ارتفاع و تعداد طبقات مجاز",
      "تخمین پارکینگ لازم",
      "تولید ۴ گزینه Massing",
      "مقایسه و رتبه‌بندی گزینه‌ها",
    ],
    materials: [
      "ورودی سایت (Site Input)",
      "موتور ضوابط (Rule Engine)",
      "مولد Massing",
      "مقایسه‌گر گزینه‌ها",
      "گزارش تصمیم",
    ],
    gallery: [
      { caption: "گزینه فشرده — کمترین ریسک ضوابطی", aspect: "aspect-[16/9]", color: "#c4c0b8" },
      { caption: "گزینه حیاط مرکزی — ریسک کاهش سطح اشغال", aspect: "aspect-[4/3]", color: "#c0bcb4" },
      { caption: "گزینه گسترده — تامین پارکینگ محدود", aspect: "aspect-[3/4]", color: "#b0aca4" },
      { caption: "دیاگرام رتبه‌بندی گزینه‌ها", aspect: "aspect-square", color: "#b8b4ac" },
    ],
    description:
      "منطقه ۵ (پهنه R111) کم‌ترین سقف تراکم را در این سه نمونه دارد: تراکم ۱۰۰٪، حداکثر ۳ طبقه. روی زمین ۲۰۰ متری، گزینه «حیاط مرکزی» با کاهش سطح اشغال قابل‌ساخت، ریسک نرسیدن به متراژ مفید هدف را نشان داد. گزینه «فشرده» با استفاده کامل از سطح اشغال مجاز و فرم ساده، بالاترین امتیاز مقایسه‌گر را در سطح مفید و تامین پارکینگ گرفت.",
    designerNote:
      "در زمین‌های کوچک با سقف تراکم پایین، گزینه فشرده معمولاً برنده می‌شود — اما مقایسه‌گر این را به‌عنوان یک محاسبه، نه یک فرض پیش‌فرض، نشان می‌دهد.",
    coverColor: "#c4c0b8",
    accentColor: "#5c6148",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
