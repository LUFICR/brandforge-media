import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimit: Ratelimit | null = null;

function getRatelimit() {
  if (ratelimit) return ratelimit;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    analytics: true,
    prefix: "brandforge:ratelimit",
  });

  return ratelimit;
}

export async function checkRateLimit(identifier: string): Promise<{ allowed: boolean; remaining: number }> {
  const limiter = getRatelimit();

  if (!limiter) {
    return { allowed: true, remaining: 99 };
  }

  const { success, remaining } = await limiter.limit(identifier);
  return { allowed: success, remaining };
}
