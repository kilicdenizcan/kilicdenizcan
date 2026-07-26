import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile randevu al"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-navy px-4 py-4 text-primary-foreground shadow-lift transition-transform duration-500 hover:scale-[1.04] sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="size-5 shrink-0" strokeWidth={1.6} />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500 group-hover:max-w-[10rem] sm:inline">
        WhatsApp'tan yazın
      </span>
    </a>
  );
}
