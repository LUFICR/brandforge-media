import { Redis } from "@upstash/redis";
import { SiteContent, defaultSiteContent } from "./siteContent";

const CONTENT_KEY = "brandforge:site-content";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getSiteContent(): Promise<SiteContent> {
  const redis = getRedis();
  if (!redis) return defaultSiteContent;

  try {
    const data = await redis.get<SiteContent>(CONTENT_KEY);
    if (data) return { ...defaultSiteContent, ...data };
  } catch {
    // Fall back to defaults if Redis is unreachable
  }

  return defaultSiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  try {
    await redis.set(CONTENT_KEY, content);
    return true;
  } catch {
    return false;
  }
}
