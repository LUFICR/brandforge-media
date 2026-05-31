import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { SiteContent, defaultSiteContent } from "./siteContent";

const CONTENT_FILE = join(process.cwd(), "src/data/content.json");

export function getSiteContent(): SiteContent {
  if (existsSync(CONTENT_FILE)) {
    try {
      const raw = readFileSync(CONTENT_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return { ...defaultSiteContent, ...parsed };
    } catch {
      return defaultSiteContent;
    }
  }
  return defaultSiteContent;
}
