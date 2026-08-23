// Google Analytics 4 (gtag.js) helper.
// Measurement ID is the clinic's GA4 property. Browser-only; no-op during SSR.
// The gtag.js loader and initial config (with automatic page_view disabled)
// live in src/routes/__root.tsx head scripts; this module only sends page_view
// events and de-duplicates them by path.

export const GA_MEASUREMENT_ID = "G-P8TMD8EXMR";

// Tracks the last path a page_view was sent for, so the same path is never
// reported twice (initial load + SPA navigation, or back/forward/reload).
let lastTrackedPath: string | null = null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Sends a single page_view event for the given path. No-ops if the path is
 * identical to the last one tracked, preventing duplicate page views on
 * repeated navigations to the same route.
 */
export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  if (path === lastTrackedPath) {
    // eslint-disable-next-line no-console
    console.debug("[GA4] suppressed dup page_view:", path);
    return;
  }

  lastTrackedPath = path;
  // eslint-disable-next-line no-console
  console.debug("[GA4] send page_view:", path);
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: typeof document !== "undefined" ? document.title : "",
  });
}
