import type { Metadata } from "next";
import { CopilotWorkspace } from "@/components/copilot/CopilotWorkspace";

export const metadata: Metadata = {
  title: "کوپایلوت ضوابط و Massing",
  description:
    "ورودی شکل زمین، اعمال خودکار ضوابط منطقه، تولید گزینه‌های massing، مقایسه و گزارش تصمیم قابل‌ارائه — نسخه اولیه MVP طرح‌یار.",
};

export default function CopilotPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 border-x border-t border-charcoal/10 px-4 py-8 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent-bronze">MVP — نسخه اولیه</span>
        <h1 className="mt-3 font-display text-3xl font-black text-charcoal sm:text-4xl">
          کوپایلوت ضوابط و تحلیل ظرفیت زمین
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-charcoal/60">
          شکل زمین را رسم کنید، معابر و کاربری را مشخص کنید تا موتور ضوابط سقف‌های مجاز را محاسبه کند،
          چند گزینه massing تولید و مقایسه شود، و یک گزارش تصمیم قابل‌ارائه به کارفرما آماده گردد.
          ضوابط استفاده‌شده در این نسخه پیش‌نویس هستند و پیش از تصمیم واقعی باید با شهرداری منطقه راستی‌آزمایی شوند.
        </p>
      </div>

      <div className="border-x border-b border-charcoal/10 px-4 py-8 sm:px-6">
        <CopilotWorkspace />
      </div>
    </div>
  );
}
