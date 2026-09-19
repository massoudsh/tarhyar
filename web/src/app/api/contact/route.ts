import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";

// Simple in-memory rate limiter (resets on cold start — sufficient for MVP)
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const maxRequests = 3;

  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < windowMs
  );
  if (timestamps.length >= maxRequests) return true;

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "تعداد درخواست‌ها بیش از حد مجاز است. لطفاً چند دقیقه صبر کنید." },
      { status: 429 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "فرمت داده نامعتبر است." }, { status: 400 });
  }

  // Validate with Zod
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return NextResponse.json({ error: "اطلاعات نامعتبر", fieldErrors }, { status: 422 });
  }

  const data = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !recipient) {
    return NextResponse.json(
      { error: "فرم تماس هنوز برای دریافت پیام‌ها پیکربندی نشده است." },
      { status: 503 },
    );
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
      to: [recipient],
      subject: `درخواست پایلوت جدید از ${data.name}`,
      text: [
        `نام: ${data.name}`,
        `موبایل: ${data.phone}`,
        `ایمیل: ${data.email || "—"}`,
        `نوع دفتر: ${data.projectType}`,
        `متراژ: ${data.area || "—"}`,
        "",
        data.message,
      ].join("\n"),
    }),
  });

  if (!emailResponse.ok) {
    return NextResponse.json(
      { error: "ارسال پیام انجام نشد. دوباره تلاش کنید." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
