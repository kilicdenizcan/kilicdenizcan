import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

export function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, next)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full cursor-ew-resize overflow-hidden rounded-[2rem] bg-muted select-none sm:aspect-[16/10]"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      <img
        src={afterImg}
        alt="Gülüş tasarımı sonrası diş görünümü"
        loading="lazy"
        width={1200}
        height={912}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={beforeImg}
          alt="Tedavi öncesi diş görünümü"
          loading="lazy"
          width={1200}
          height={912}
          className="size-full object-cover"
        />
      </div>

      <span className="absolute top-5 left-5 rounded-full bg-navy/80 px-3 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-sm">
        Öncesi
      </span>
      <span className="absolute top-5 right-5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium text-navy backdrop-blur-sm">
        Sonrası
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-background/90" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background text-navy shadow-lift">
          <MoveHorizontal className="size-5" strokeWidth={1.6} />
        </span>
      </div>

      <label className="sr-only" htmlFor="ba-range">
        Öncesi sonrası karşılaştırma
      </label>
      <input
        id="ba-range"
        type="range"
        min={2}
        max={98}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
