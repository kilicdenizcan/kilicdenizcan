import { createFileRoute } from "@tanstack/react-router";
import lounge from "@/assets/gallery-lounge.jpg";
import sterilization from "@/assets/gallery-sterilization.jpg";
import heroClinic from "@/assets/hero-clinic.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { founderCareerStart, yearsSince } from "@/lib/site";

const clinicYears = yearsSince(founderCareerStart.year, founderCareerStart.month);

export const Route = createFileRoute("/hakkimizda")({
  head: () => ({
    meta: [
      { title: "Hakkımızda | Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği" },
      {
        name: "description",
        content:
          "2009'dan bu yana Sultangazi'de hizmet veren Yeni Yaşam Polikliniği'nin hikâyesi, misyonu, değerleri ve klinik standartları.",
      },
      { property: "og:title", content: "Hakkımızda | Yeni Yaşam Klinik" },
      {
        property: "og:description",
        content: `Sultangazi'de ${clinicYears} yılı aşkın deneyim, dijital diş hekimliği ve sterilizasyon standardı.`,
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: About,
});

const timeline = [
  { year: "1986", title: "Mesleki Başlangıç", text: "Dt. Musa Kılıç, İstanbul Üniversitesi Çapa Diş Hekimliği Fakültesi'nden mezun oldu ve Sultangazi'de muayenehanesini açtı." },
  { year: "1989", title: "Sultangazi'de İkinci Adım", text: "Muayenehanemizi 1989 yılında taşıdık." },
  { year: "2007", title: "Sultangazi'de Üçüncü Adım", text: "Muayenehanemizi taşıyıp büyüterek sizlere daha iyi hizmet sunduk." },
  { year: "2022", title: "Modern Poliklinik", text: "Üç üniteli, dijital altyapılı ve ileri sterilizasyon standartlarına sahip yeni kliniğimize taşındık." },
  { year: "2026", title: "10.000+ hasta", text: "Bugüne kadar 10.000'den fazla hastanın tedavisi tamamlandı." },
];

const values = [
  { title: "Şeffaflık", text: "Tedavi planı, süre ve ücret yazılı olarak paylaşılır. Plan dışına çıkılmaz." },
  { title: "Koruyucu hekimlik", text: "Önce en az müdahaleli seçenek konuşulur; gereksiz işlem önerilmez." },
  { title: "Zamana saygı", text: "Randevu saatine uyulur, aynı anda birden fazla hasta alınmaz." },
  { title: "Ölçülebilir kalite", text: "Her vaka fotoğraf ve dijital kayıtla belgelenir, sonuç takip edilir." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="Klinik"
        title={`${clinicYears} yıldır aynı bölgede, aynı standartla.`}
        text="Yeni Yaşam, Sultangazi'de küçük bir muayenehane olarak başladı. Bugün üç üniteli, dijital altyapılı bir poliklinik; ama çalışma biçimimiz ilk günkü gibi: aceleye getirmeden, açıklayarak."
      />

      <section className="container-page -mt-4 pb-20 md:pb-28">
        <Reveal>
          <div className="overflow-hidden rounded-[2.5rem]">
            <img
              src={heroClinic}
              alt="Yeni Yaşam Kliniği tedavi odası"
              loading="lazy"
              width={1600}
              height={1104}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="section-y bg-gradient-mist">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="text-eyebrow">Misyon</p>
            <h2 className="mt-6 text-3xl leading-[1.1] font-semibold text-navy md:text-4xl">
              Toplumun ağız ve diş sağlığını sağlamak.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-graphite">
              Misyonumuz, toplum ağız ve diş sağlığı sorunlarının bilimsel yöntemlerle çözümünün sağlanması ve korunmasıdır.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-eyebrow">Vizyon</p>
            <h2 className="mt-6 text-3xl leading-[1.1] font-semibold text-navy md:text-4xl">
              Örnek teşkil edecek bir kurum olmak.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-graphite">
              Vizyonumuz, ağız ve diş sağlığında&nbsp;tıbbi etiğe ve deontoloji kurallarına uygun sağlık hizmeti üretip&nbsp;hijyen ve hizmet kalitesinde örnek bir kurum olmak.&nbsp;
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <p className="text-eyebrow">Yolculuk</p>
            <h2 className="mt-6 max-w-2xl text-3xl leading-[1.08] font-semibold text-navy md:text-5xl">
              Adım adım büyüdük.
            </h2>
          </Reveal>
          <ol className="mt-14 border-y border-border">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <li className="grid gap-5 border-b border-border py-9 last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-12 md:py-12">
                  <span className="text-4xl font-semibold leading-none text-navy md:text-5xl">{t.year}</span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold text-navy md:text-2xl">{t.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-graphite md:text-base">{t.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-gradient-mist">
        <div className="container-page">
          <Reveal>
            <p className="text-eyebrow">Değerlerimiz</p>
            <h2 className="mt-6 max-w-2xl text-3xl leading-[1.08] font-semibold text-navy md:text-5xl">
              Dört ilke.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <article className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft">
                  <h3 className="text-lg font-semibold text-navy">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-4 md:grid-cols-2">
          {[
            { img: lounge, alt: "Klinik bekleme salonu", label: "Bekleme Salonu" },
            { img: sterilization, alt: "Sterilizasyon ünitesi", label: "Muayene Odası" },
          ].map((g, i) => (
            <Reveal key={g.label} delay={i * 0.1}>
              <figure className="overflow-hidden rounded-3xl bg-muted">
                <img
                  src={g.img}
                  alt={g.alt}
                  loading="lazy"
                  width={1408}
                  height={912}
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="px-1 py-4 text-sm text-muted-foreground">{g.label}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Kliniğimizi yerinde görün." text="Tedaviye karar vermeden önce gelin, ekibimizle tanışın ve tüm sorularınızı sorun." />
    </>
  );
}
