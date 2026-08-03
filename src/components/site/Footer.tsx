import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logoMark from "@/assets/logo-mark-new.jpg";
import { clinic, treatments, whatsappHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-gradient-navy text-primary-foreground">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-navy border border-black/20">
                <img
                  src={logoMark.url}
                  alt="Yeni Yaşam Klinik"
                  loading="lazy"
                  width={32}
                  height={32}
                  className="size-8 object-cover"
                />
              </span>
              <span className="text-lg font-semibold">Yeni Yaşam</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/65">
              Sultangazi'de ağız ve diş sağlığında dijital planlama, etik süreç yönetimi, sterilizasyon standardı ve
              estetik hekimliği bir araya getiren poliklinik.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground/50">
              Tedaviler
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {treatments.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link
                    to="/tedaviler/$slug"
                    params={{ slug: t.slug }}
                    className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground/50">
              Klinik
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { to: "/hakkimizda", label: "Hakkımızda" },
                { to: "/doktorlar", label: "Hekimlerimiz" },
                { to: "/blog", label: "Blog" },
                { to: "/sss", label: "Sık Sorulan Sorular" },
                { to: "/iletisim", label: "İletişim" },
                { to: "/randevu", label: "Online Randevu" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground/50">
              İletişim
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-primary-foreground/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
                <span>{clinic.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
                <a href={`tel:${clinic.phone}`} className="hover:text-primary-foreground">
                  {clinic.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
                <a href={`mailto:${clinic.email}`} className="hover:text-primary-foreground">
                  {clinic.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
                <span>Pazartesi – Cumartesi 09:00 – 21:00</span>
              </li>
            </ul>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full border border-white/25 px-5 py-2.5 text-sm transition-colors hover:bg-white/10"
            >
              WhatsApp ile yazın
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {clinic.name}</p>
          
        </div>
      </div>
    </footer>
  );
}
