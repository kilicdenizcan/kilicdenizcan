/**
 * Calm "decode" text transition used when switching languages.
 *
 * Each character resolves from a short burst of neutral latin glyphs into its
 * final letter, staggered across the string. Characters that are identical in
 * both languages (spaces, punctuation, digits) never scramble, so the effect
 * reads as decoding rather than noise.
 */

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const running = new Map<Text, number>();

export function isScrambling(node: Text) {
  return running.has(node);
}

export function cancelScrambles() {
  for (const id of running.values()) cancelAnimationFrame(id);
  running.clear();
}

/** Case-matched neutral glyph, so the silhouette of the word stays calm. */
function glyphFor(target: string) {
  const pool = target === target.toUpperCase() && target !== target.toLowerCase() ? UPPER : LOWER;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Soft ease-out so the reveal decelerates instead of snapping. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type Options = {
  /** ms before this node starts resolving */
  delay?: number;
  /** total scramble duration in ms */
  duration?: number;
  onDone?: () => void;
};

/** How often a still-unresolved character picks a new glyph (ms). */
const CHURN = 70;

export function scrambleText(node: Text, from: string, to: string, options: Options = {}) {
  const { delay = 0, duration = 900, onDone } = options;

  const existing = running.get(node);
  if (existing !== undefined) cancelAnimationFrame(existing);

  const length = Math.max(from.length, to.length);
  const start = performance.now() + delay;

  // Stable per-character glyphs, refreshed slowly, so text does not strobe.
  const glyphs: string[] = new Array(length).fill("");
  let lastChurn = -Infinity;

  const finish = () => {
    running.delete(node);
    node.nodeValue = to;
    onDone?.();
  };

  const frame = (now: number) => {
    const elapsed = now - start;
    if (elapsed < 0) {
      running.set(node, requestAnimationFrame(frame));
      return;
    }
    if (elapsed >= duration) {
      finish();
      return;
    }

    const progress = easeOut(Math.min(elapsed / duration, 1));
    // Characters resolve left to right along the eased progress line.
    const resolvedUpTo = progress * length;
    const churn = elapsed - lastChurn >= CHURN;
    if (churn) lastChurn = elapsed;

    let out = "";
    for (let i = 0; i < length; i += 1) {
      const target = to[i] ?? "";
      const source = from[i] ?? "";

      if (i < resolvedUpTo || target === source || target === " " || target === "") {
        out += target;
        continue;
      }

      if (churn || !glyphs[i]) glyphs[i] = glyphFor(target);
      out += glyphs[i];
    }

    node.nodeValue = out;
    running.set(node, requestAnimationFrame(frame));
  };

  running.set(node, requestAnimationFrame(frame));
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
