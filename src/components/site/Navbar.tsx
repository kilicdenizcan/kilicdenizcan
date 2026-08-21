import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import logoMark from "@/assets/logo-mark-new.jpg";
import { clinic } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useTranslate } from "@/lib/i18n/TranslateProvider";

const links = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/hakkimizda", label: "Klinik" },
  { to: "/doktorlar", label: "Hekimlerimiz" },
  { to: "/tedaviler", label: "Tedaviler" },
  { to: "/blog", label: "Blog" },
  { to: "/sss", label: "S.S.S." },
  { to: "/iletisim", label: "İletişim" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useTranslate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5">
      <div className="container-page">
        <nav
          className={cn(
            "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-4 py-2.5 transition-all duration-700 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-5",
            "glass-panel",
            scrolled ? "shadow-soft" : "shadow-none",
          )}
        >
          <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-navy">
              <img
                src={logoMark}
                alt="Yeni Yaşam Klinik logosu"
                width={40}
                height={40}
                className="size-8 object-cover"
              />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[0.95rem] font-semibold text-navy">Yeni Yaşam</span>
              <span className="block truncate text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
                AĞIZ VE DİŞ SAĞLIĞI POLİKLİNİĞİ
              </span>
            </span>
          </Link>

          <ul className="hidden items-center justify-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="relative rounded-full px-3.5 py-2 text-sm text-graphite transition-colors duration-300 hover:text-navy [&.active]:text-navy [&.active]:font-medium"
                >
                  {t(l.label)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden items-center rounded-full border border-border p-0.5 text-xs sm:flex">
              {(["tr", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    "rounded-full px-2.5 py-1 uppercase transition-colors",
                    lang === l ? "bg-navy text-primary-foreground" : "text-graphite hover:text-navy",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href={`tel:${clinic.phone}`}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-graphite transition-colors hover:text-navy xl:flex"
            >
              <Phone className="size-4" strokeWidth={1.6} />
              {clinic.phoneDisplay}
            </a>

            <Link
              to="/randevu"
              search={{ doktor: undefined, tedavi: undefined }}
              className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-all duration-500 hover:bg-navy-soft sm:inline-flex"
            >
              {t("Randevu Al")}
            </Link>
            <button
              type="button"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-background/60 text-navy lg:hidden"
            >
              {open ? <X className="size-5" strokeWidth={1.6} /> : <Menu className="size-5" strokeWidth={1.6} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="container-page lg:hidden [transform:translateZ(0)]"
          >
            <div className="mt-3 rounded-3xl border border-border/70 bg-background p-4 shadow-lift">
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block border-b border-border/60 py-3.5 text-base text-graphite last:border-0 [&.active]:text-navy [&.active]:font-medium"
                    >
                      {t(l.label)}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/randevu"
                search={{ doktor: undefined, tedavi: undefined }}
                onClick={() => setOpen(false)}
                className="mt-4 block rounded-full bg-navy px-5 py-3.5 text-center text-sm font-medium text-primary-foreground"
              >
                {t("Randevu Al")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
