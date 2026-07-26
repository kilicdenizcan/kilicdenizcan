import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, Clock, Repeat, Syringe } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { treatments, whatsappHref, type Treatment } from "@/lib/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/tedaviler/$slug")({
  loader: ({ params }): Treatment => {
    const treatment = treatments.find((t) => t.slug === params.slug);
    if (!treatment) throw notFound();
    return treatment;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Yeni Yaşam Klinik Sultangazi` },
          { name: "description", content: loaderData.short },
          { property: "og:title", content: `${loaderData.title} | Yeni Yaşam Klinik` },
          { property: "og:description", content: loaderData.short },
          { property: "og:type", content: "article" },
        ]
      : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: loaderData.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          },
        ]
      : [],
  }),
  component: TreatmentDetail,
});

function TreatmentDetail() {
  const t: Treatment = Route.useLoaderData();
  const others = treatments.filter((x) => x.slug !== t.slug).slice(0, 3);

  return (
    <>
      <section className="bg-gradient-mist pt-36 pb-16 md:pt-48 md:pb-24">
        <div className="container-page">
          <Reveal>
            <Link
              to="/tedaviler"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy"
            >
              <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={1.6} />
              Tüm tedaviler
            </Link>
            <h1 className="mt-8 max-w-3xl text-4xl leading-[1.05] font-semibold text-navy md:text-6xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-graphite md:text-lg">
              {t.summary}
            </p>

            <dl className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                { icon: Clock, label: "İşlem süresi", value: t.duration },
                { icon: Repeat, label: "Seans", value: t.sessions },
                { icon: Syringe, label: "Anestezi", value: t.anesthesia },
              ].map((m) => (
                <div key={m.label} className="flex gap-3">
                  <m.icon className="mt-0.5 size-4 shrink-0 text-navy" strokeWidth={1.6} />
                  <div>
                    <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{m.label}</dt>
                    <dd className="mt-1 text-sm text-foreground">{m.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="text-eyebrow">Süreç</p>
              <h2 className="mt-6 text-3xl leading-[1.1] font-semibold text-navy md:text-4xl">
                Nasıl ilerliyoruz?
              </h2>
            </Reveal>
            <ol className="mt-10 space-y-8">
              {t.steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <li className="grid grid-cols-[2.5rem_1fr] gap-5">
                    <span className="grid size-10 place-items-center rounded-full border border-border text-sm font-medium text-navy">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-navy">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-graphite">{s.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1}>
            <aside className="rounded-3xl border border-border bg-card p-8 shadow-soft lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold text-navy">Öne çıkan faydalar</h2>
              <ul className="mt-6 space-y-4">
                {t.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-graphite">
                    <Check className="mt-0.5 size-4 shrink-0 text-navy" strokeWidth={1.8} />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy-soft"
              >
                Bu tedavi için yazın
                <ArrowUpRight className="size-4" strokeWidth={1.6} />
              </a>
              <Link
                to="/randevu"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-3.5 text-sm font-medium text-navy transition-colors hover:bg-muted"
              >
                Online randevu
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-gradient-mist">
        <div className="container-page grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <p className="text-eyebrow">Sık sorulanlar</p>
            <h2 className="mt-6 text-3xl leading-[1.1] font-semibold text-navy md:text-4xl">
              {t.title} hakkında.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {t.faq.map((f, i) => (
                <AccordionItem key={f.q} value={`f${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-6 text-left text-base font-medium text-navy hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-sm leading-relaxed text-graphite">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <p className="text-eyebrow">Diğer tedaviler</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.06}>
                <Link
                  to="/tedaviler/$slug"
                  params={{ slug: o.slug }}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-navy">{o.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-graphite">{o.short}</p>
                  </div>
                  <ArrowUpRight className="mt-8 size-4 text-navy" strokeWidth={1.6} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
