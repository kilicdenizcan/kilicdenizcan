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
  { year: "2009", title: "İlk muayenehane", text: "Sultangazi 75. Yıl Mahallesi'nde iki üniteli bir muayenehane olarak açıldık." },
  { year: "2014", title: "Poliklinik ruhsatı", text: "Ekibimiz büyüdü, Sağlık Bakanlığı ruhsatlı ağız ve diş sağlığı polikliniğine dönüştük." },
  { year: "2018", title: "Dijital dönüşüm", text: "3B tomografi, ağız içi tarayıcı ve dijital gülüş tasarımı protokolü kliniğe girdi." },
  { year: "2022", title: "Yeni klinik", text: "Beş üniteli, ayrı sterilizasyon ünitesine sahip yeni kliniğimize taşındık." },
  { year: "2025", title: "12.000+ hasta", text: "Bugüne kadar 12.000'den fazla hastanın tedavisi tamamlandı." },
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
        title={`${clinicYears} yıldır aynı mahallede, aynı standartla.`}
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
          <ol className="mt-14 border-l border-border">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <li className="relative grid gap-2 pb-12 pl-8 last:pb-0 md:grid-cols-[8rem_1fr] md:gap-8">
                  <span className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-navy" />
                  <span className="text-sm font-semibold text-navy">{t.year}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">{t.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-graphite">{t.text}</p>
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
            { img: lounge, alt: "Klinik bekleme salonu", label: "Bekleme salonu" },
            { img: sterilization, alt: "Sterilizasyon ünitesi", label: "Sterilizasyon ünitesi" },
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
