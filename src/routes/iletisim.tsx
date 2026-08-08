import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { clinic, whatsappHref } from "@/lib/site";

export const Route = createFileRoute("/iletisim")({
  head: () => ({
    meta: [
      { title: "İletişim ve Yol Tarifi | Yeni Yaşam Klinik Sultangazi" },
      {
        name: "description",
        content:
          "75. Yıl Mah. Cumhuriyet Cad. No:69 Kat:2 Sultangazi / İstanbul. Telefon, WhatsApp, çalışma saatleri ve yol tarifi.",
      },
      { property: "og:title", content: "İletişim | Yeni Yaşam Klinik" },
      { property: "og:description", content: "Sultangazi'deki kliniğimize ulaşım ve iletişim bilgileri." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Sultangazi'nin merkezinde, kolay ulaşım."
        text="Cumhuriyet Caddesi üzerinde, metrobüs ve minibüs duraklarına yürüme mesafesinde. Bina önünde kısa süreli park imkânı bulunur."
      />

      <section className="section-y pt-4 md:pt-10">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="space-y-8">
                {[
                  { icon: MapPin, label: "Adres", value: clinic.address },
                  { icon: Mail, label: "E-posta", value: clinic.email, href: `mailto:${clinic.email}` },
                ].map((c) => (
                  <div key={c.label} className="flex gap-4">
                    <c.icon className="mt-1 size-5 shrink-0 text-navy" strokeWidth={1.5} />
                    <div className="min-w-0">
                      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="mt-1.5 block text-base text-foreground hover:text-navy">
                          {c.value}
                        </a>
                      ) : (
                        <p className="mt-1.5 text-base leading-relaxed text-foreground">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-4">
                  <Phone className="size-5 shrink-0 text-navy" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Telefon</p>
                    <div className="mt-1.5 flex flex-col gap-1">
                      <a href={`tel:${clinic.phone}`} className="block text-base text-foreground hover:text-navy">
                        {clinic.phoneDisplay}
                      </a>
                      <a href={`tel:${clinic.phone2}`} className="block text-base text-foreground hover:text-navy">
                        {clinic.phone2Display}
                      </a>
                    </div>
                  </div>
                </div>

              <div className="flex gap-4">
                <Clock className="mt-1 size-5 shrink-0 text-navy" strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Çalışma saatleri</p>
                  <ul className="mt-3 space-y-2">
                    {clinic.hours.map((h) => (
                      <li key={h.day} className="flex gap-6 text-sm">
                        <span className="w-40 text-graphite">{h.day}</span>
                        <span className="text-foreground">{h.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy-soft"
                >
                  <MessageCircle className="size-4" strokeWidth={1.6} />
                  WhatsApp
                </a>
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-navy transition-colors hover:bg-muted"
                >
                  <Navigation className="size-4" strokeWidth={1.6} />
                  Yol tarifi al
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[2rem] border border-border">
              <iframe
                title="Yeni Yaşam Kliniği konum haritası"
                src={clinic.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[26rem] w-full lg:h-[34rem]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
