import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { faqs } from "@/lib/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/sss")({
  head: () => ({
    meta: [
      { title: "Sık Sorulan Sorular | Yeni Yaşam Ağız ve Diş Sağlığı" },
      {
        name: "description",
        content:
          "Randevu, ücretler, sterilizasyon, taksit ve tedavi süreçleri hakkında en çok merak edilen soruların yanıtları.",
      },
      { property: "og:title", content: "Sık Sorulan Sorular | Yeni Yaşam Klinik" },
      { property: "og:description", content: "Tedavi öncesi merak ettiğiniz her şey." },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHero
        eyebrow="S.S.S."
        title="Cevabını en çok aradığınız sorular."
        text="Aradığınızı bulamazsanız WhatsApp hattımızdan yazın; hekimlerimiz aynı gün içinde yanıtlıyor."
      />

      <section className="section-y pt-4 md:pt-10">
        <div className="container-page max-w-3xl">
          <Reveal>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`q${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-6 text-left text-base font-medium text-navy hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-sm leading-relaxed text-graphite">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Sorunuzun cevabı burada yoksa." text="Kısaca yazın; hekimlerimiz size özel yanıt versin." />
    </>
  );
}
