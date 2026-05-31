import { NextRequest, NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/data/content";
import { SiteContent } from "@/data/siteContent";

const API_KEY = process.env.CMS_API_KEY || "";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
  };
}

function validateApiKey(request: NextRequest): boolean {
  const key = request.headers.get("x-api-key");
  if (!API_KEY || !key) return false;
  return key === API_KEY;
}

export async function OPTIONS() {
  return NextResponse.json(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders() });
  }

  const content = await getSiteContent();
  return NextResponse.json({ status: "ok", content }, { headers: corsHeaders() });
}

export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders() });
  }

  try {
    const body = await request.json();
    const content = body.content as SiteContent;

    if (!content || typeof content !== "object") {
      return NextResponse.json({ error: "Invalid content payload" }, { status: 400, headers: corsHeaders() });
    }

    const saved = await saveSiteContent(content);
    if (!saved) {
      return NextResponse.json({ error: "Failed to save — check Upstash config" }, { status: 500, headers: corsHeaders() });
    }

    return NextResponse.json({ success: true, message: "Content updated" }, { headers: corsHeaders() });
  } catch {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500, headers: corsHeaders() });
  }
}
