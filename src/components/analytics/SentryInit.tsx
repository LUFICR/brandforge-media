"use client";

import { useEffect } from "react";

export function SentryInit() {
  useEffect(() => {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (!dsn || dsn.includes("your-sentry-dsn")) return;

    import("@sentry/browser").then((Sentry) => {
      Sentry.init({
        dsn,
        tracesSampleRate: 0.1,
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 1.0,
        environment: process.env.NODE_ENV,
        beforeSend(event) {
          if (event.exception?.values?.[0]?.value?.includes("ResizeObserver")) {
            return null;
          }
          return event;
        },
      });
    });
  }, []);

  return null;
}
