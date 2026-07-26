import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-gradient-mist pt-36 pb-16 md:pt-48 md:pb-24">
      <div className="container-page">
        <Reveal>
          <p className="text-eyebrow">{eyebrow}</p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold text-navy md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite md:text-lg">{text}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
