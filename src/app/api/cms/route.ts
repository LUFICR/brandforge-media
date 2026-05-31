import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const CONTENT_FILE = join(process.cwd(), "src/data/content.json");
const API_KEY = process.env.CMS_API_KEY || "";

function validateApiKey(request: NextRequest): boolean {
  const key = request.headers.get("x-api-key");
  if (!API_KEY || !key) return false;
  return key === API_KEY;
}

export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (existsSync(CONTENT_FILE)) {
    try {
      const raw = readFileSync(CONTENT_FILE, "utf-8");
      return NextResponse.json(JSON.parse(raw));
    } catch {
      return NextResponse.json({ status: "ok", content: null });
    }
  }

  return NextResponse.json({ status: "ok", content: null });
}

export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const content = body.content;

    if (!content || typeof content !== "object") {
      return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
    }

    writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Content updated" });
  } catch {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
