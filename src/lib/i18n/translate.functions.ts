import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  lang: z.enum(["tr", "en"]),
  texts: z.array(z.string()).max(120),
});

async function sha1(text: string) {
  const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const translateServer = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }): Promise<Record<string, string>> => {
    const { lang, texts } = data;
    if (lang === "tr" || texts.length === 0) return {};

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const hashes = await Promise.all(texts.map((t) => sha1(t)));
    const byHash = new Map(hashes.map((h, i) => [h, texts[i]!]));

    const out: Record<string, string> = {};
    const { data: rows } = await supabaseAdmin
      .from("translation_cache")
      .select("source_hash, source, translated")
      .eq("lang", lang)
      .in("source_hash", hashes);

    const found = new Set<string>();
    for (const row of rows ?? []) {
      out[row.source] = row.translated;
      found.add(row.source_hash);
    }

    const missing = hashes.filter((h) => !found.has(h)).map((h) => byHash.get(h)!);
    if (missing.length === 0) return out;

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return out;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-5.6-sol",
        reasoning_effort: "none",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You translate Turkish dental clinic website copy into clear, natural English. Keep it simple and understandable, keep proper nouns, doctor titles (Dt.), names, numbers and punctuation intact. Return JSON: {\"items\":[\"...\"]} with translations in the same order and same count as the input array. Do not add explanations.",
          },
          { role: "user", content: JSON.stringify({ items: missing }) },
        ],
      }),
    });

    if (!res.ok) {
      console.error("translate gateway error", res.status, await res.text());
      return out;
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    let items: string[] = [];
    try {
      const parsed = JSON.parse(json.choices?.[0]?.message?.content ?? "{}") as { items?: string[] };
      items = Array.isArray(parsed.items) ? parsed.items : [];
    } catch {
      items = [];
    }
    if (items.length !== missing.length) return out;

    const inserts = await Promise.all(
      missing.map(async (source, i) => ({
        source_hash: await sha1(source),
        lang,
        source,
        translated: items[i]!,
      })),
    );
    for (const row of inserts) out[row.source] = row.translated;

    await supabaseAdmin.from("translation_cache").upsert(inserts, { onConflict: "source_hash,lang" });

    return out;
  });
