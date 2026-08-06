import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { whatsappHref } from "@/lib/site";
import { Reveal } from "./Reveal";

export function CtaBand({
  title = "Gülümsemeniz için doğru zaman, şimdi.",
  text = "Ücretsiz muayene ve tedavi planlaması için randevunuzu oluşturun. Kısaca yazın; yetkililerimiz size özel yanıt versin.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-page pb-24 md:pb-32">
      <Reveal>
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-navy px-6 py-16 text-primary-foreground md:px-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-[1.08] font-semibold md:text-5xl">{title}</h2>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/70 md:text-lg">{text}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-medium text-navy transition-transform duration-500 hover:scale-[1.02]"
              >
                WhatsApp Randevu
                <ArrowUpRight className="size-4" strokeWidth={1.6} />
              </a>
              <Link
                to="/randevu"
                search={{ doktor: undefined, tedavi: undefined }}
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-medium transition-colors hover:bg-white/10"
              >
                Online Randevu Formu
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
