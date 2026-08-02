Plan: Reduce navbar logo tooth figure size

The current navbar logo renders the tooth image at `size-10` inside a `size-10` navy circular container. The user reports the tooth figure looks like it is about to overflow and wants a more relaxed, centered appearance with no overflow risk.

What will be done:
1. In `src/components/site/Navbar.tsx`, keep the circular container at `size-10` with `overflow-hidden` and `rounded-full`.
2. Reduce the inner `<img>` from `size-10` to `size-8` (or add equivalent padding) so the tooth figure renders smaller and sits comfortably inside the circle, with visible navy background on all sides.
3. Keep the image centered via the container’s `place-items-center` and `object-cover`.
4. Verify the result in the live preview.

No data, copy, or other components will change. The change is isolated to the logo styling in the Navbar.