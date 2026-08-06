import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { clinic, treatments, doctors, whatsappHref } from "@/lib/site";

export const Route = createFileRoute("/randevu")({
  validateSearch: (search: Record<string, unknown>) => ({
    doktor: typeof search.doktor === "string" ? search.doktor : undefined,
    tedavi: typeof search.tedavi === "string" ? search.tedavi : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Online Randevu | Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği" },
      {
        name: "description",
        content:
          "Sultangazi Yeni Yaşam Polikliniği'nden online randevu alın. Ücretsiz ilk muayene, aynı gün dönüş.",
      },
      { property: "og:title", content: "Online Randevu | Yeni Yaşam Klinik" },
      { property: "og:description", content: "Formu doldurun, sizi arayalım." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Appointment,
});

const times = ["09:00 – 12:00", "12:00 – 15:00", "15:00 – 18:00", "18:00 – 21:00"];

function Appointment() {
  const { doktor, tedavi } = Route.useSearch();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const matchedDoctor = doctors.find((d) => d.name === doktor)?.name;
  const matchedTreatment = treatments.find((t) => t.slug === tedavi || t.title === tedavi)?.title;


  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSending(true);
    const message = [
      "Online randevu talebi",
      `Ad Soyad: ${data.get("name")}`,
      `Telefon: ${data.get("phone")}`,
      `Tedavi: ${data.get("treatment")}`,
      `Tercih edilen hekim: ${data.get("doctor")}`,
      `Tercih edilen saat: ${data.get("time")}`,
      `Not: ${data.get("note") || "-"}`,
    ].join("\n");

    const href = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(href, "_blank", "noopener,noreferrer");
    setSending(false);
    setSent(true);
  }


  return (
    <>
      <PageHero
        eyebrow="Randevu"
        title="Randevunuzu bir dakikada oluşturun."
        text="Formu gönderdiğinizde talebiniz WhatsApp üzerinden kliniğe iletilir. Çalışma saatleri içinde ortalama 15 dakika içinde dönüş yapıyoruz."
      />

      <section className="section-y pt-4 md:pt-10">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal>
            {sent ? (
              <div className="rounded-[2rem] border border-border bg-card p-10 text-center shadow-soft">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-muted text-navy">
                  <Check className="size-6" strokeWidth={1.6} />
                </span>
                <h2 className="mt-6 text-2xl font-semibold text-navy">Talebiniz hazırlandı</h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-graphite">
                  WhatsApp penceresi açılmadıysa aşağıdaki bağlantıdan bize doğrudan ulaşabilirsiniz.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex rounded-full bg-navy px-6 py-3.5 text-sm font-medium text-primary-foreground"
                >
                  WhatsApp'ı aç
                </a>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-[2rem] border border-border bg-card p-7 shadow-soft md:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Ad Soyad">
                    <input
                      name="name"
                      required
                      placeholder="Adınız ve soyadınız"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-navy"
                    />
                  </Field>
                  <Field label="Telefon">
                    <input
                      name="phone"
                      required
                      type="tel"
                      placeholder="05__ ___ __ __"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-navy"
                    />
                  </Field>
                  <Field label="Tedavi">
                    <select
                      name="treatment"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-navy"
                    >
                      <option>Genel muayene</option>
                      {treatments.map((t) => (
                        <option key={t.slug}>{t.title}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Tercih edilen hekim">
                    <select
                      name="doctor"
                      defaultValue={matchedDoctor ?? "Fark etmez"}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-navy"
                    >
                      <option>Fark etmez</option>
                      {doctors.map((d) => (
                        <option key={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Tercih edilen saat">
                    <select
                      name="time"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-navy"
                    >
                      {times.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="mt-6">
                  <Field label="Not (isteğe bağlı)">
                    <textarea
                      name="note"
                      rows={4}
                      placeholder="Şikâyetinizi kısaca yazabilirsiniz."
                      className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-navy"
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy-soft disabled:opacity-60"
                >
                  {sending && <Loader2 className="size-4 animate-spin" strokeWidth={1.6} />}
                  Randevu talebi gönder
                </button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Bilgileriniz yalnızca randevu planlaması için kullanılır.
                </p>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="rounded-[2rem] bg-gradient-mist p-8 md:p-10">
              <h2 className="text-lg font-semibold text-navy">Randevu öncesi</h2>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-graphite">
                {[
                  "İlk muayene ve tedavi planlaması ücretsizdir.",
                  "Varsa önceki röntgen ve tedavi kayıtlarınızı getirin.",
                  "Kullandığınız ilaçları ve kronik rahatsızlıkları belirtin.",
                  "Randevunuza 5 dakika önce gelmeniz yeterlidir.",
                ].map((x) => (
                  <li key={x} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-navy" strokeWidth={1.8} />
                    {x}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-border pt-8">
                <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Çalışma saatleri</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {clinic.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-6">
                      <span className="text-graphite">{h.day}</span>
                      <span className="text-foreground">{h.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`tel:${clinic.phone}`}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-6 py-3.5 text-sm font-medium text-navy"
              >
                {clinic.phoneDisplay}
              </a>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs tracking-[0.16em] text-muted-foreground uppercase">{label}</span>
      {children}
    </label>
  );
}
