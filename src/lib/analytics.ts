// Google Analytics 4 (gtag.js) helper.
// Measurement ID is the clinic's GA4 property. Browser-only; no-op during SSR.

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

/** Loads gtag.js and issues the initial config with automatic page_view disabled. */
export function initGtag(): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  // send_page_view: false — automatic first page_view is disabled so the
  // only page_view events come from trackPageView below (no double counting).
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

/**
 * Sends a single page_view event for the given path. No-ops if the path is
 * identical to the last one tracked, preventing duplicate page views on
 * repeated navigations to the same route.
 */
export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  if (path === lastTrackedPath) return;

  lastTrackedPath = path;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: typeof document !== "undefined" ? document.title : "",
  });
}
