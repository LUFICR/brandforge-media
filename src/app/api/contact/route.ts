import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

function validatePayload(body: unknown): { valid: boolean; error?: string; data?: ContactPayload } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { name, email, phone, service, message } = body as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return { valid: false, error: "Name is required (min 2 characters)" };
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: "Valid email is required" };
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return { valid: false, error: "Message is required (min 10 characters)" };
  }

  if (name.length > 100 || email.length > 254 || message.length > 2000) {
    return { valid: false, error: "Input exceeds maximum length" };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: typeof phone === "string" ? phone.trim() : undefined,
      service: typeof service === "string" ? service.trim() : undefined,
      message: message.trim(),
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { allowed, remaining } = await checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "X-RateLimit-Remaining": "0", "Retry-After": "60" },
        }
      );
    }

    const body = await request.json();
    const { valid, error, data } = validatePayload(body);

    if (!valid || !data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!web3formsKey || web3formsKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      console.log("[Contact Form Submission]", data);
      return NextResponse.json(
        { success: true, message: "Message received (dev mode)" },
        { headers: { "X-RateLimit-Remaining": String(remaining) } }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: `New inquiry from ${data.name} — BrandForge Media`,
        from_name: data.name,
        email: data.email,
        phone: data.phone || "Not provided",
        service: data.service || "Not specified",
        message: data.message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Web3Forms responded with ${response.status}`);
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
