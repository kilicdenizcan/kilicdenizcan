## Plan: Favicon güncelleme

### Current state
- `public/favicon.ico` currently serves the Lovable logo.
- `src/routes/__root.tsx` references `/favicon.ico` in `head().links`.
- User uploaded `yeniyasamsonkaliteliyazısızortalanmış-2.jpg`, which is the navy-centered white tooth logo they now want as the site icon.

### Implementation

1. **Generate the circular favicon**
   - Use ImageMagick to create a 64×64 circular PNG from the uploaded image:
     - Crop/resize to a square around the tooth logo.
     - Apply a circular mask so the icon is a navy circle with the white tooth in the center, with transparent corners (true circular favicon).
   - Save the result to `public/favicon.png`.

2. **Update the root route head metadata**
   - In `src/routes/__root.tsx`:
     - Replace `{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }` with `{ rel: "icon", type: "image/png", href: "/favicon.png" }`.
   - Also remove the outdated `image: "/favicon.ico"` in the JSON-LD schema (replace with a real clinic image or omit if none is available).

3. **Remove the old Lovable favicon**
   - Delete `public/favicon.ico` so it cannot accidentally be served by old clients or cached links.

4. **Verify**
   - Run a build/typecheck to ensure no broken paths.
   - Open the preview in a browser tab to confirm the new circular tooth logo appears instead of the Lovable logo.

### Deliverable
A circular navy/white tooth logo as the browser tab favicon across the site.