import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "تماس | طرح‌یار",
  description: "درخواست جلسه مشاوره رایگان برای پروژه معماری مسکونی شما",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-content border-x border-charcoal/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">
        <div className="lg:col-span-2">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] text-material-glass uppercase">Contact</p>
          <h1 className="font-display text-4xl font-black text-charcoal sm:text-5xl">تماس</h1>
          <p className="mt-5 text-charcoal/60 leading-[2] text-base">
            پروژه‌ای دارید؟ بگذارید بشنویم. اولین جلسه همیشه رایگان است.
          </p>
          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-charcoal/12 bg-material-sand" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-charcoal/70">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium text-charcoal">واتساپ</p>
                <a href="https://wa.me/989121234567" target="_blank" rel="noopener noreferrer" className="mt-0.5 block text-sm text-charcoal/60 hover:text-material-glass transition-colors" dir="ltr">+98 912 123 4567</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-charcoal/12 bg-material-sand" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-charcoal/70">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium text-charcoal">ایمیل</p>
                <a href="mailto:info@tarhyar.ir" className="mt-0.5 block text-sm text-charcoal/60 hover:text-material-glass transition-colors" dir="ltr">info@tarhyar.ir</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-charcoal/12 bg-material-sand" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-charcoal/70">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium text-charcoal">دفتر</p>
                <p className="mt-0.5 text-sm text-charcoal/60">الهیه، تهران</p>
              </div>
            </div>
          </div>
          <div className="mt-10 border border-charcoal/12 bg-material-asphalt p-5 material-grid">
            <p className="text-xs text-warm-white/60 leading-relaxed">معمولاً ظرف ۲۴ ساعت پاسخ می‌دهیم.</p>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="border border-charcoal/12 bg-warm-white p-8 shadow-arch-md sm:p-10">
            <h2 className="mb-6 text-xl font-bold text-charcoal">فرم درخواست مشاوره</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
