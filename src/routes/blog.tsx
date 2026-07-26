import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { posts } from "@/lib/site";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Ağız ve Diş Sağlığı Rehberi | Yeni Yaşam Klinik" },
      {
        name: "description",
        content:
          "İmplant, gülüş tasarımı, çocuk diş hekimliği ve diş eti sağlığı hakkında hekimlerimizin kaleme aldığı rehberler.",
      },
      { property: "og:title", content: "Blog | Yeni Yaşam Klinik" },
      { property: "og:description", content: "Hekimlerimizden ağız ve diş sağlığı rehberleri." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Hekimlerimizin kaleminden."
        text="Kliniğe gelmeden önce bilmek istedikleriniz. Kısa, sade ve reklam dili olmadan yazılmış rehberler."
      />

      <section className="section-y pt-4 md:pt-10">
        <div className="container-page grid gap-4 md:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <article className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift md:p-10">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full border border-border px-3 py-1">{p.category}</span>
                    <span>{p.date}</span>
                    <span>· {p.read}</span>
                  </div>
                  <h2 className="mt-6 text-2xl leading-tight font-semibold text-navy">{p.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-graphite">{p.excerpt}</p>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-navy">
                  Yakında yayında
                  <ArrowUpRight className="size-4" strokeWidth={1.6} />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Yazıda cevabını bulamadığınız bir konu mu var?" text="Hekimlerimize doğrudan sorun; yanıtı hem size iletelim hem de bir sonraki yazıya ekleyelim." />
    </>
  );
}
