import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  ScanLine,
  HeartHandshake,
  Star,
  Sparkles,
  UserRound,
} from "lucide-react";
import heroClinic from "@/assets/hero-clinic.jpg";
import lounge from "@/assets/gallery-lounge.jpg";
import sterilization from "@/assets/gallery-sterilization.jpg";
import { Reveal } from "@/components/site/Reveal";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { CtaBand } from "@/components/site/CtaBand";
import { clinic, doctors, faqs, visibleReviews, stats, treatments, whatsappHref } from "@/lib/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yeni Yaşam Klinik | Sultangazi Ağız ve Diş Sağlığı Polikliniği" },
      {
        name: "description",
        content:
          "Sultangazi'de implant, gülüş tasarımı, zirkonyum ve ortodonti. Dijital planlama, ücretsiz ilk muayene ve aynı gün randevu imkânı.",
      },
      { property: "og:title", content: "Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği" },
      {
        property: "og:description",
        content: "Gülümsemenizi güvenle yeniden tasarlıyoruz. Sultangazi / İstanbul.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-[100svh] items-end overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10 scale-110">
          <img
            src={heroClinic}
            alt="Yeni Yaşam Kliniği modern tedavi odası"
            width={1600}
            height={1104}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/45 to-navy/60" />
        </motion.div>

        <motion.div style={{ opacity: fade }} className="container-page pt-36 pb-14 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[0.7rem] font-semibold tracking-[0.24em] text-primary-foreground/70 uppercase"
          >
            Sultangazi · İstanbul
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-4xl text-4xl leading-[1.03] font-semibold text-primary-foreground sm:text-6xl lg:text-7xl"
          >
            Gülümsemenizi güvenle yeniden tasarlıyoruz.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-base leading-relaxed text-primary-foreground/75 md:text-lg"
          >
            Dijital planlama, mikroskobik hassasiyet ve sakin bir klinik deneyimi. İmplanttan gülüş
            tasarımına kadar her tedavi, size özel bir plan ve tek bir hekim sorumluluğuyla yürütülür.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-medium text-navy shadow-lift transition-transform duration-500 hover:scale-[1.02]"
            >
              WhatsApp Randevu
              <ArrowUpRight className="size-4" strokeWidth={1.6} />
            </a>
            <Link
              to="/randevu"
              search={{ doktor: undefined, tedavi: undefined }}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 text-sm font-medium text-primary-foreground backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Online Randevu
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-background">
        <div className="container-page grid grid-cols-2 gap-y-10 py-12 md:grid-cols-4 md:py-16">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="px-1 md:px-4">
                <p className="text-3xl font-semibold text-navy md:text-4xl">{s.value}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{s.label}</p>
                <p className="text-sm text-muted-foreground">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-y bg-gradient-mist">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <p className="text-eyebrow">Yaklaşımımız</p>
            <h2 className="mt-6 text-3xl leading-[1.08] font-semibold text-navy md:text-5xl">
              Acele edilmeyen, açıklanan ve planlanan diş hekimliği.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-graphite">
              Her hasta için ortalama 45 dakikalık bir ilk değerlendirme ayırıyoruz. Röntgen ve
              dijital tarama sonrası tedavi seçeneklerini, sürelerini ve maliyetlerini yazılı olarak
              paylaşıyoruz. Sürpriz yok, baskı yok.
            </p>
            <Link
              to="/hakkimizda"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-navy"
            >
              Kliniğimizi tanıyın
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.6} />
            </Link>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: ScanLine, title: "Dijital planlama", text: "3B tomografi, dijital ölçü ve cerrahi rehber ile öngörülebilir sonuç." },
              { icon: ShieldCheck, title: "Sterilizasyon", text: "B sınıfı otoklav, poşetli saklama ve hasta önünde açılan setler." },
              { icon: HeartHandshake, title: "Tek hekim sorumluluğu", text: "Tedavinizi başlatan hekim, süreci sonuna kadar yürütür." },
              { icon: Sparkles, title: "Konfor odaklı", text: "Sedasyon seçeneği, sessiz cihazlar ve dakikliğe saygılı randevu düzeni." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <article className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <f.icon className="size-6 text-navy" strokeWidth={1.4} />
                  <h3 className="mt-6 text-lg font-semibold text-navy">{f.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-graphite">{f.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-eyebrow">Tedaviler</p>
                <h2 className="mt-6 max-w-2xl text-3xl leading-[1.08] font-semibold text-navy md:text-5xl">
                  Her tedavi için ayrı bir plan, ayrı bir uzmanlık.
                </h2>
              </div>
              <Link
                to="/tedaviler"
                className="group inline-flex items-center gap-2 text-sm font-medium text-navy"
              >
                Tüm tedaviler
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.6} />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 3) * 0.06}>
                <Link
                  to="/tedaviler/$slug"
                  params={{ slug: t.slug }}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-navy">{t.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-graphite">{t.short}</p>
                  </div>
                  <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-navy">
                    Detaylı bilgi
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="section-y bg-gradient-mist">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="text-eyebrow">Öncesi / Sonrası</p>
            <h2 className="mt-6 text-3xl leading-[1.08] font-semibold text-navy md:text-5xl">
              Sonucu tedaviye başlamadan görürsünüz.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-graphite">
              Dijital gülüş tasarımında hedeflenen sonucu ekranda ve ağzınızdaki geçici provada
              görürsünüz. Onayınız olmadan kalıcı işlem yapılmaz.
            </p>
            <Link
              to="/tedaviler/$slug"
              params={{ slug: "gulus-tasarimi" }}
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-navy"
            >
              Gülüş tasarımı süreci
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.6} />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfter />
          </Reveal>
        </div>
      </section>

      {/* Doctors */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <p className="text-eyebrow">Hekimlerimiz</p>
            <h2 className="mt-6 max-w-2xl text-3xl leading-[1.08] font-semibold text-navy md:text-5xl">
              Tedavinizi yürütecek ekiple önce tanışın.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {doctors.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08}>
                <article className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:shadow-lift">
                  <div className="flex aspect-4/5 items-center justify-center overflow-hidden bg-muted">
                    {d.image ? (
                      <img
                        src={d.image}
                        alt={`${d.name} portresi`}
                        loading="lazy"
                        width={912}
                        height={1104}
                        className="size-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                      />
                    ) : (
                      <UserRound className="size-14 text-border" strokeWidth={1} aria-hidden />
                    )}
                  </div>

                  <div className="p-7">
                    <h3 className="text-lg font-semibold text-navy">{d.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d.role}</p>
                    <p
                      className="mt-4 text-sm leading-relaxed text-graphite"
                      suppressHydrationWarning
                    >
                      {d.experience}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <Link
              to="/doktorlar"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-navy"
            >
              Tüm ekibi görün
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.6} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-y bg-gradient-mist">
        <div className="container-page">
          <Reveal>
            <p className="text-eyebrow">Klinik</p>
            <h2 className="mt-6 max-w-2xl text-3xl leading-[1.08] font-semibold text-navy md:text-5xl">
              Sakin, ferah ve tamamen steril bir ortam.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {[
              { img: lounge, alt: "Klinik bekleme salonu", label: "Bekleme salonu" },
              { img: sterilization, alt: "Sterilizasyon odası", label: "Sterilizasyon ünitesi" },
            ].map((g, i) => (
              <Reveal key={g.label} delay={i * 0.1}>
                <figure className="group overflow-hidden rounded-3xl bg-muted">
                  <img
                    src={g.img}
                    alt={g.alt}
                    loading="lazy"
                    width={1408}
                    height={912}
                    className="aspect-[4/3] size-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]"
                  />
                  <figcaption className="px-1 py-4 text-sm text-muted-foreground">{g.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-y">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-eyebrow">Hasta yorumları</p>
                <h2 className="mt-6 max-w-2xl text-3xl leading-[1.08] font-semibold text-navy md:text-5xl">
                  Google'da 4.6 ortalama.
                </h2>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-soft">
                <span className="text-sm font-semibold text-navy">Google</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-navy text-navy" strokeWidth={0} />
                  ))}
                </span>
                <span className="text-sm text-muted-foreground">4.6 / görüşleriniz değerli</span>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 0.07}>
                <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-8">
                  <span className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, k) => (
                      <Star key={k} className="size-3.5 fill-navy text-navy" strokeWidth={0} />
                    ))}
                  </span>
                  <p className="mt-5 grow text-sm leading-relaxed text-graphite">"{r.text}"</p>
                  <div className="mt-7 flex items-center justify-between text-sm">
                    <span className="font-medium text-navy">{r.name}</span>
                    <span className="text-muted-foreground">{r.date}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-gradient-mist">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="text-eyebrow">Sık sorulanlar</p>
            <h2 className="mt-6 text-3xl leading-[1.08] font-semibold text-navy md:text-5xl">
              Merak edilenler.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-graphite">
              Aradığınız cevabı bulamadıysanız {clinic.phoneDisplay} numaralı hattımızdan bize
              ulaşabilirsiniz.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.slice(0, 5).map((f, i) => (
                <AccordionItem key={f.q} value={`i${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-6 text-left text-base font-medium text-navy hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-sm leading-relaxed text-graphite">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Link to="/sss" className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-navy">
              Tüm sorular
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.6} />
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="pt-24 md:pt-32">
        <CtaBand />
      </div>
    </>
  );
}
