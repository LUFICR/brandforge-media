import { useState, useEffect } from 'react';
import { useSiteData } from '../../../contexts/SiteDataContext';
import {
  getPublishConfig,
  savePublishConfig,
  publishToWebsite,
  testConnection,
  isPublishConfigured,
} from '../../../utils/publish';
import {
  Rocket, Globe, Key, CheckCircle, AlertCircle, Wifi,
  WifiOff, Loader2, Copy, Check, ChevronDown, ChevronRight,
  Save
} from 'lucide-react';

export default function PublishSettings() {
  const { content } = useSiteData();

  const [websiteUrl, setWebsiteUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [configSaved, setConfigSaved] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  // Connection test
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  // Publish
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');
  const [publishMessage, setPublishMessage] = useState('');

  // Setup guide toggle
  const [showGuide, setShowGuide] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load saved config
  useEffect(() => {
    const config = getPublishConfig();
    setWebsiteUrl(config.websiteUrl);
    setApiKey(config.apiKey);
    setIsConfigured(isPublishConfigured());
  }, []);

  const handleSaveConfig = () => {
    savePublishConfig({ websiteUrl: websiteUrl.trim(), apiKey: apiKey.trim() });
    setConfigSaved(true);
    setIsConfigured(isPublishConfigured());
    setTimeout(() => setConfigSaved(false), 2000);
  };

  const handleTestConnection = async () => {
    setTestStatus('testing');
    setTestMessage('');
    const result = await testConnection();
    setTestStatus(result.success ? 'success' : 'error');
    setTestMessage(result.message);
  };

  const handlePublish = async () => {
    setPublishStatus('publishing');
    setPublishMessage('');
    const result = await publishToWebsite(content);
    setPublishStatus(result.success ? 'success' : 'error');
    setPublishMessage(result.message);
    if (result.success) {
      setTimeout(() => setPublishStatus('idle'), 5000);
    }
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // The code the user needs to add to their Next.js project
  const apiRouteCode = `import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const CMS_KEY = "brandforge-cms-content";
const API_KEY = process.env.CMS_API_KEY || "";

function verifyKey(req: NextRequest) {
  return req.headers.get("x-api-key") === API_KEY;
}

// GET — website reads content
export async function GET(req: NextRequest) {
  if (!verifyKey(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await redis.get(CMS_KEY);
  return NextResponse.json({ content: data, ok: true });
}

// POST — dashboard pushes content
export async function POST(req: NextRequest) {
  if (!verifyKey(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  await redis.set(CMS_KEY, JSON.stringify(body.content));
  return NextResponse.json({ ok: true });
}`;

  const contentHelperCode = `import { Redis } from "@upstash/redis";
import { cache } from "react";

const redis = Redis.fromEnv();
const CMS_KEY = "brandforge-cms-content";

// Default content (fallback if Redis is empty)
import defaultContent from "@/data/siteContent.json";

// Cached per-request (Next.js deduplication)
export const getContent = cache(async () => {
  try {
    const raw = await redis.get(CMS_KEY);
    if (raw) {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      return { ...defaultContent, ...parsed };
    }
  } catch (e) {
    console.error("CMS fetch error:", e);
  }
  return defaultContent;
});`;

  const componentExampleCode = `// In any Server Component (e.g. app/page.tsx):
import { getContent } from "@/lib/cms";

export default async function Home() {
  const content = await getContent();

  return (
    <div>
      <h1>{content.hero.titleLine1}</h1>
      {/* rest of your components */}
    </div>
  );
}

// Pass content to Client Components as props:
<Hero content={content.hero} />
<Services content={content.services} />`;

  const envVarsCode = `# Add these to your Vercel Environment Variables:
# (Settings → Environment Variables)

CMS_API_KEY=${apiKey || 'your-secret-key-here'}

# You should already have these from Upstash:
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token`;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Rocket className="w-6 h-6 text-violet-400" />
          Publish to Website
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Press Publish → Your live website updates instantly. No code needed after one-time setup.
        </p>
      </div>

      {/* ═══ PUBLISH BUTTON (Main Action) ═══ */}
      <div className={`rounded-xl p-5 sm:p-8 border text-center ${
        isConfigured
          ? 'bg-gradient-to-br from-violet-500/10 to-emerald-500/10 border-violet-500/20'
          : 'bg-gray-800/50 border-gray-700/50'
      }`}>
        {isConfigured ? (
          <>
            <h3 className="text-xl font-bold text-white mb-2">Ready to Publish</h3>
            <p className="text-gray-400 text-sm mb-6">Your changes will go live on your website immediately</p>
            <button
              onClick={handlePublish}
              disabled={publishStatus === 'publishing'}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all min-h-[56px] ${
                publishStatus === 'success'
                  ? 'bg-emerald-500 text-white'
                  : publishStatus === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-xl hover:shadow-violet-500/25 active:scale-[0.98]'
              } disabled:opacity-70`}
            >
              {publishStatus === 'publishing' ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Publishing...</>
              ) : publishStatus === 'success' ? (
                <><CheckCircle className="w-5 h-5" /> Published!</>
              ) : publishStatus === 'error' ? (
                <><AlertCircle className="w-5 h-5" /> Try Again</>
              ) : (
                <><Rocket className="w-5 h-5" /> 🚀 Publish to Website</>
              )}
            </button>
            {publishMessage && (
              <p className={`mt-4 text-sm ${publishStatus === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                {publishMessage}
              </p>
            )}
          </>
        ) : (
          <>
            <WifiOff className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Not Connected Yet</h3>
            <p className="text-gray-400 text-sm mb-2">Configure your website URL and API key below to enable publishing</p>
          </>
        )}
      </div>

      {/* ═══ CONNECTION SETTINGS ═══ */}
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          Connection Settings
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Website URL</label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://brandforge-media.vercel.app"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base"
            />
            <p className="text-xs text-gray-600 mt-1">Your live website's URL (without trailing slash)</p>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm text-gray-400 mb-2">
              <Key className="w-4 h-4" /> API Secret Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter a secret key (e.g. my-super-secret-123)"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none text-base font-mono"
            />
            <p className="text-xs text-gray-600 mt-1">Must match the CMS_API_KEY in your website's Vercel environment variables</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSaveConfig}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all min-h-[44px] ${
                configSaved ? 'bg-emerald-500 text-white' : 'bg-violet-500 hover:bg-violet-600 text-white'
              }`}
            >
              <Save className="w-4 h-4" />
              {configSaved ? 'Saved!' : 'Save Config'}
            </button>

            <button
              onClick={handleTestConnection}
              disabled={testStatus === 'testing'}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors min-h-[44px] disabled:opacity-70"
            >
              {testStatus === 'testing' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : testStatus === 'success' ? (
                <Wifi className="w-4 h-4 text-emerald-400" />
              ) : testStatus === 'error' ? (
                <WifiOff className="w-4 h-4 text-red-400" />
              ) : (
                <Wifi className="w-4 h-4" />
              )}
              Test Connection
            </button>
          </div>

          {testMessage && (
            <div className={`p-3 rounded-lg text-sm flex items-start gap-2 ${
              testStatus === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}>
              {testStatus === 'success' ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
              {testMessage}
            </div>
          )}
        </div>
      </div>

      {/* ═══ ONE-TIME SETUP GUIDE ═══ */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="w-full flex items-center justify-between p-4 sm:p-6 text-left min-h-[56px]"
        >
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            📋 One-Time Setup Guide
            <span className="text-xs font-normal text-gray-500 bg-gray-700/50 px-2 py-0.5 rounded-full">10 minutes</span>
          </h3>
          {showGuide ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
        </button>

        {showGuide && (
          <div className="px-4 sm:px-6 pb-6 space-y-6 border-t border-gray-700/50 pt-6">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-sm text-amber-400">
              ⚠️ You only need to do this <strong>ONCE</strong>. After setup, you'll never touch code again — just press Publish!
            </div>

            {/* Step 1 */}
            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                Create the API route in your Next.js project
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Create this file: <code className="text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded text-xs">app/api/cms/route.ts</code>
              </p>
              <div className="relative">
                <pre className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto border border-gray-700"><code>{apiRouteCode}</code></pre>
                <button
                  onClick={() => copyCode(apiRouteCode, 'api')}
                  className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  {copiedCode === 'api' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                Create the content reader
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Create this file: <code className="text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded text-xs">src/lib/cms.ts</code>
              </p>
              <div className="relative">
                <pre className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto border border-gray-700"><code>{contentHelperCode}</code></pre>
                <button
                  onClick={() => copyCode(contentHelperCode, 'helper')}
                  className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  {copiedCode === 'helper' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                Add environment variables on Vercel
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Go to <strong>Vercel Dashboard → Your Project → Settings → Environment Variables</strong> and add:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto border border-gray-700"><code>{envVarsCode}</code></pre>
                <button
                  onClick={() => copyCode(envVarsCode, 'env')}
                  className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  {copiedCode === 'env' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-500 text-white text-xs flex items-center justify-center font-bold">4</span>
                Update your page.tsx to read from CMS
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Update your components to use the content from the CMS:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto border border-gray-700"><code>{componentExampleCode}</code></pre>
                <button
                  onClick={() => copyCode(componentExampleCode, 'component')}
                  className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  {copiedCode === 'component' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 5 */}
            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">5</span>
                Deploy & export the default content
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Push the changes to GitHub → Vercel auto-deploys. Then also export your content from this dashboard's 
                <strong> Export/Import</strong> and save it as <code className="text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded text-xs">src/data/siteContent.json</code> in your project 
                (this is the fallback if Redis is empty).
              </p>
            </div>

            {/* Done */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-emerald-400 font-semibold">✅ That's it! Setup complete.</p>
              <p className="text-sm text-gray-400 mt-1">
                From now on, just edit content here and press <strong className="text-white">"🚀 Publish to Website"</strong>. 
                Your live site updates in seconds. No code, no deploys, no files.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* How it works diagram */}
      <div className="bg-gray-800/50 rounded-xl p-5 sm:p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">⚡ How It Works</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
          <div className="flex-1 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">📝</div>
            <p className="text-white font-medium text-sm">Edit in Dashboard</p>
            <p className="text-gray-500 text-xs mt-1">Change any text, image, or content</p>
          </div>
          <div className="text-gray-600 text-xl hidden sm:block">→</div>
          <div className="text-gray-600 text-xl sm:hidden">↓</div>
          <div className="flex-1 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">🚀</div>
            <p className="text-white font-medium text-sm">Press Publish</p>
            <p className="text-gray-500 text-xs mt-1">Content sent to your website's database</p>
          </div>
          <div className="text-gray-600 text-xl hidden sm:block">→</div>
          <div className="text-gray-600 text-xl sm:hidden">↓</div>
          <div className="flex-1 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
            <div className="text-2xl mb-2">🌐</div>
            <p className="text-emerald-400 font-medium text-sm">Website Updated!</p>
            <p className="text-gray-500 text-xs mt-1">Live in seconds, no deploy needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
