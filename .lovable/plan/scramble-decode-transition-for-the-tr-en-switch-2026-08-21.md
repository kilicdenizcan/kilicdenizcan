# Scramble/decode transition for the TR ↔ EN switch

Replace the current fade with a refined character-decode animation: when the language is toggled, visible text briefly cycles through neutral glyphs and then resolves, character by character, into the translated text.

## How it should feel

- Duration ~450–600 ms total per element, with a small stagger so text resolves left-to-right and top-to-bottom rather than all at once.
- Scramble alphabet stays typographically calm: Latin letters, a few dots/slashes/dashes — no katakana, no neon, no green.
- Characters that already match (spaces, punctuation, digits, shared words) stay put, so the movement reads as "decoding", not noise.
- Text keeps its final width where possible (scrambled string is padded to the longer of source/target) so layout does not jitter.
- Only text currently on screen animates; off-screen sections simply swap, keeping the switch fast.
- Respects `prefers-reduced-motion`: those users get the existing quick fade instead.

## Scope

- Runs on the manual TR/EN toggle only. Route navigation and first page load keep the current instant, flash-free behaviour.
- Applies to body copy, headings, buttons and nav labels. Proper nouns marked as non-translatable (clinic name, doctor names, address) do not scramble, since their text is unchanged.

## Technical notes

- New module `src/lib/i18n/scramble.ts`: given a text node, its source string and its target string, it drives a `requestAnimationFrame` loop that writes intermediate frames into the node and finally the exact target value. Includes per-node cancellation so a fast double toggle cannot leave a node stuck mid-scramble.
- `src/lib/i18n/TranslateProvider.tsx`:
  - `applyTranslations` gains an optional "animate" mode. In that mode, instead of assigning the translated value directly, it hands nodes whose value actually changes to the scramble driver; attributes (`placeholder`, `aria-label`, `title`, `alt`) always swap instantly.
  - `setLang` triggers the animated pass; the MutationObserver pass stays instant so scramble frames never re-trigger themselves (a guard flag marks nodes being animated).
  - Stagger derived from each node's bounding-box position; nodes outside the viewport are skipped for animation.
- `src/styles.css`: drop the `lang-swap` opacity keyframe from the toggle path, keep it only as the reduced-motion fallback; add a subtle blur/opacity easing on animating elements for the cinematic feel.
