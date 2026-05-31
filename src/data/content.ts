import { Redis } from "@upstash/redis";
import { SiteContent, defaultSiteContent } from "./siteContent";

const CONTENT_KEY = "brandforge:site-content";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || url === "https://your-redis.upstash.io" || token === "your-token-here") {
    return null;
  }
  try {
    return new Redis({ url, token });
  } catch {
    return null;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const redis = getRedis();
    if (!redis) return defaultSiteContent;

    const data = await redis.get<SiteContent>(CONTENT_KEY);
    if (data) return { ...defaultSiteContent, ...data };
  } catch {
    // Fall back to defaults if Redis is unreachable
  }

  return defaultSiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<boolean> {
  try {
    const redis = getRedis();
    if (!redis) return false;

    await redis.set(CONTENT_KEY, content);
    return true;
  } catch {
    return false;
  }
}
