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

  // Email delivery — plug in Resend / SendGrid here
  // Example with Resend (uncomment and add RESEND_API_KEY env):
  //
  // const { Resend } = await import("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "طرح‌یار <noreply@tarhyar.ir>",
  //   to: "info@tarhyar.ir",
  //   subject: `درخواست مشاوره جدید — ${data.name}`,
  //   text: [
  //     `نام: ${data.name}`,
  //     `موبایل: ${data.phone}`,
  //     `ایمیل: ${data.email ?? "—"}`,
  //     `نوع پروژه: ${data.projectType}`,
  //     `متراژ: ${data.area ?? "—"}`,
  //     `توضیحات:\n${data.message}`,
  //   ].join("\n"),
  // });

  // In development / before email is configured, log to console
  if (process.env.NODE_ENV !== "production") {
    console.log("[contact] new submission:", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      projectType: data.projectType,
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
