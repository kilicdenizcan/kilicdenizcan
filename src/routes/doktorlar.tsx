import { createFileRoute, Link } from "@tanstack/react-router";
import { Languages, BriefcaseMedical, UserRound } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { doctors } from "@/lib/site";

export const Route = createFileRoute("/doktorlar")({
  head: () => ({
    meta: [
      { title: "Hekimlerimiz | Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği" },
      {
        name: "description",
        content:
          "İmplantoloji, estetik diş hekimliği ve ortodonti alanlarında deneyimli hekim kadromuzla tanışın.",
      },
      { property: "og:title", content: "Hekimlerimiz | Yeni Yaşam Klinik" },
      {
        property: "og:description",
        content: "Tedavinizi yürütecek hekimin deneyimi, uzmanlık alanı ve yaklaşımı.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Doctors,
});

function Doctors() {
  return (
    <>
      <PageHero
        eyebrow="Ekip"
        title="Tedavinizi kimin yürüteceğini bilerek gelin."
        text="Yeni Yaşam'da her hastanın bir sorumlu hekimi vardır. Planlamayı yapan hekim, tedavinin son kontrolünü de yapar."
      />

      <section className="section-y pt-4 md:pt-8">
        <div className="container-page space-y-6">
          {doctors.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.06}>
              <article className="grid gap-8 overflow-hidden rounded-[2rem] border border-border bg-card md:grid-cols-[minmax(0,22rem)_1fr] md:gap-12">
                <div className="flex aspect-4/5 items-center justify-center overflow-hidden border-b border-border bg-muted md:aspect-auto md:border-r md:border-b-0">
                  {d.image ? (
                    <img
                      src={d.image}
                      alt={`${d.name} portresi`}
                      loading="lazy"
                      width={912}
                      height={1104}
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserRound className="size-16 text-border" strokeWidth={1} aria-hidden />
                  )}
                </div>

                <div className="p-8 md:py-12 md:pr-12 md:pl-0">
                  <h2 className="text-2xl font-semibold text-navy md:text-3xl">{d.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{d.role}</p>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite">{d.bio}</p>

                  <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div className="flex gap-3">
                      <BriefcaseMedical className="mt-0.5 size-4 shrink-0 text-navy" strokeWidth={1.6} />
                      <div>
                        <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Deneyim</dt>
                        <dd className="mt-1 text-sm text-foreground" suppressHydrationWarning>
                          {d.experience}
                        </dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Languages className="mt-0.5 size-4 shrink-0 text-navy" strokeWidth={1.6} />
                      <div>
                        <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Diller</dt>
                        <dd className="mt-1 text-sm text-foreground">{d.languages}</dd>
                      </div>
                    </div>
                  </dl>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {d.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-border bg-muted px-3.5 py-1.5 text-xs text-graphite"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/randevu"
                    search={{ doktor: d.name, tedavi: undefined }}
                    className="mt-9 inline-flex rounded-full bg-navy px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy-soft"
                  >
                    {d.name.split(" ").slice(-2).join(" ")} ile randevu
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Hangi hekimle görüşeceğinizden emin değil misiniz?" text="Şikâyetinizi kısaca yazın, sizi doğru uzmanla eşleştirip aynı gün dönüş yapalım." />
    </>
  );
}
