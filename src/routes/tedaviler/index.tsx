import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { treatments } from "@/lib/site";

export const Route = createFileRoute("/tedaviler/")({
  head: () => ({
    meta: [
      { title: "Tedaviler | İmplant, Gülüş Tasarımı, Zirkonyum | Yeni Yaşam" },
      {
        name: "description",
        content:
          "İmplant, gülüş tasarımı, zirkonyum, ortodonti, çocuk diş hekimliği, kanal tedavisi ve daha fazlası. Sultangazi Yeni Yaşam Polikliniği.",
      },
      { property: "og:title", content: "Tedaviler | Yeni Yaşam Klinik" },
      {
        property: "og:description",
        content: "Her tedavi için ayrı plan, dijital süreç ve şeffaf fiyatlandırma.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TreatmentsPage,
});

function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tedaviler"
        title="On bir tedavi alanı, tek bir standart."
        text="Her tedavi başlığında süreç, süre, konfor ve maliyet önceden konuşulur. Aşağıdaki başlıklardan detaylı bilgiye ulaşabilirsiniz."
      />

      <section className="section-y pt-4 md:pt-10">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 0.06}>
              <Link
                to="/tedaviler/$slug"
                params={{ slug: t.slug }}
                className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <div>
                  <h2 className="text-xl font-semibold text-navy">{t.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{t.short}</p>
                </div>
                <div className="mt-10 flex items-center justify-between">
                  <span className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {t.sessions}
                  </span>
                  <ArrowUpRight
                    className="size-4 text-navy transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.6}
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Hangi tedaviye ihtiyacınız olduğundan emin değilseniz." text="Ücretsiz muayene ve dijital röntgen sonrası size en az müdahaleli seçeneği sunuyoruz." />
    </>
  );
}
