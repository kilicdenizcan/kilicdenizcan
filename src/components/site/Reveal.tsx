import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 24, blur = true, className }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setForced(true);
      return;
    }
    const timer = window.setTimeout(() => setForced(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  if (reduce) return <div className={className}>{children}</div>;

  const shown = inView || forced;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(10px)" : "none" }}
      animate={
        shown
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: blur ? "blur(10px)" : "none" }
      }
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
