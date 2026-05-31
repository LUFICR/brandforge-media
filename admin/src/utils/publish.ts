// ═══════════════════════════════════════════════════════════════════════════
// 🚀 PUBLISH SYSTEM — Push content to your live website
// ═══════════════════════════════════════════════════════════════════════════

const PUBLISH_CONFIG_KEY = 'bf-publish-config';

export interface PublishConfig {
  websiteUrl: string;   // e.g. https://brandforge-media.vercel.app
  apiKey: string;       // Secret key (same on both dashboard + website)
}

export function getPublishConfig(): PublishConfig {
  try {
    const raw = localStorage.getItem(PUBLISH_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { websiteUrl: 'https://brandforge-media.vercel.app', apiKey: 'brandforge-cms-2024-secret' };
}

export function savePublishConfig(config: PublishConfig): void {
  try {
    localStorage.setItem(PUBLISH_CONFIG_KEY, JSON.stringify(config));
  } catch { /* ignore */ }
}

export function isPublishConfigured(): boolean {
  const config = getPublishConfig();
  return config.websiteUrl.length > 5 && config.apiKey.length > 5;
}

export interface PublishResult {
  success: boolean;
  message: string;
}

export async function publishToWebsite(content: unknown): Promise<PublishResult> {
  const config = getPublishConfig();

  if (!config.websiteUrl || !config.apiKey) {
    return { success: false, message: 'Publish not configured. Go to Settings → Publish Setup.' };
  }

  // Clean URL
  const baseUrl = config.websiteUrl.replace(/\/+$/, '');
  const endpoint = `${baseUrl}/api/cms`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
      body: JSON.stringify({ content, timestamp: Date.now() }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const msg = (data as Record<string, string>).error || `Server error: ${response.status}`;
      return { success: false, message: msg };
    }

    return { success: true, message: 'Published! Your website is now updated.' };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';

    if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
      return {
        success: false,
        message: 'Cannot reach your website. Check the URL and make sure the API route is set up.',
      };
    }

    return { success: false, message: `Publish failed: ${message}` };
  }
}

export async function testConnection(): Promise<PublishResult> {
  const config = getPublishConfig();
  if (!config.websiteUrl || !config.apiKey) {
    return { success: false, message: 'Enter your website URL and API key first.' };
  }

  const baseUrl = config.websiteUrl.replace(/\/+$/, '');
  const endpoint = `${baseUrl}/api/cms`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'x-api-key': config.apiKey },
    });

    if (response.ok) {
      return { success: true, message: 'Connected! Your website API is working.' };
    }

    if (response.status === 401 || response.status === 403) {
      return { success: false, message: 'API key is incorrect. Check it matches your website.' };
    }

    if (response.status === 404) {
      return { success: false, message: 'API route not found. Make sure you added app/api/cms/route.ts to your Next.js project.' };
    }

    return { success: false, message: `Server responded with status ${response.status}` };
  } catch {
    return { success: false, message: 'Cannot reach your website. Check the URL.' };
  }
}
