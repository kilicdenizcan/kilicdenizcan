/**
 * Calm "decode" text transition used when switching languages.
 *
 * Each character resolves from a short burst of neutral latin glyphs into its
 * final letter, staggered across the string. Characters that are identical in
 * both languages (spaces, punctuation, digits) never scramble, so the effect
 * reads as decoding rather than noise.
 */

const GLYPHS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ·/-—:";

const running = new Map<Text, number>();

export function isScrambling(node: Text) {
  return running.has(node);
}

export function cancelScrambles() {
  for (const id of running.values()) cancelAnimationFrame(id);
  running.clear();
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

type Options = {
  /** ms before this node starts resolving */
  delay?: number;
  /** total scramble duration in ms */
  duration?: number;
  onDone?: () => void;
};

export function scrambleText(node: Text, from: string, to: string, options: Options = {}) {
  const { delay = 0, duration = 480, onDone } = options;

  const existing = running.get(node);
  if (existing !== undefined) cancelAnimationFrame(existing);

  const length = Math.max(from.length, to.length);
  // Per-character window inside the total duration (staggered left → right).
  const spread = duration * 0.55;
  const perChar = length > 1 ? spread / (length - 1) : 0;
  const charDuration = duration - spread;

  const start = performance.now() + delay;

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

    let out = "";
    for (let i = 0; i < length; i += 1) {
      const target = to[i] ?? "";
      const source = from[i] ?? "";

      // Untouched characters (identical or whitespace) never scramble.
      if (target === source || target === " " || target === "") {
        out += target;
        continue;
      }

      const charStart = i * perChar;
      if (elapsed < charStart) {
        out += source === " " ? " " : randomGlyph();
      } else if (elapsed < charStart + charDuration) {
        out += Math.random() < 0.35 ? target : randomGlyph();
      } else {
        out += target;
      }
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
