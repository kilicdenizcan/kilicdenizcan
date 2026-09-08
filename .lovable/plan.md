# Google Yorumları Otomatik Entegrasyonu

## Hedef
Anasayfadaki hasta yorumları bölümünü Google'dan otomatik çeken bir sisteme bağla. Elle yorum girme/güncelleme kalmasın. Kriter: **4 yıldız ve üzeri** ve **sadece yıldızdan ibaret olmayan, içinde yazılı metin olan** yorumlar gösterilsin. Google Places API bir istekte en fazla **5 en güncel** yorum döndürür (bu bir rate-limit değil, sabit tavan) — yani site en güncel 5 yorumdan kritere uyanları gösterir; yeni yorum gelince en eski otomatik düşer. Bu, istediğiniz "en üste yeni, en eski kaldırılır" davranışıdır.

## Yaklaşım (özet)
- **Google Places API (New) — Text Search** tek bir istekle klinik bilgisi + `rating` + `userRatingCount` + `reviews` döner. `reviews` en güncel 5 yorumdur.
- Sunucu tarafında **24 saatlik önbellek** (Supabase `site_cache` tablosu) → Google'a günde yalnızca 1 istek gider; maliyet ~$1/ay ($200/aylık ücretsiz krediye sığar).
- **API anahtarı yoksa veya istek başarısız olursa** mevcut statik `reviews` listesi gösterilir (geri dönüşüm/stopgap).
- Tarihler API'den gelen `publishTime`'dan **Türkçe göreli formata** ("dün", "geçen hafta", "x ay önce", "x yıl önce") otomatik hesaplanır → her zaman güncel kalır, elle güncelleme yok.

## Değişiklikler

### 1. `src/lib/site.ts` — Leyla Çelik eklenir (statik yedek listesi)
- `reviews` dizisine 5. eleman olarak eklenir:
  - name: `Leyla Çelik`
  - text: `İlgi alakanız her zaman çok güzel oldu çok memnunuz sizlerden iyiki tanımışız🌺`
  - rating: `5`
  - date: `yeni`
- `visibleReviews` filtresi (rating>=4 && metin) değişmez; Leyla Çelik otomatik seçilir.
- Statik liste, API bağlanana kadar ve bağlanamazsa yedek olarak kullanılır.

### 2. Yeni: `src/lib/google-reviews.functions.ts`
- `getGoogleReviews = createServerFn({ method: "GET" }).handler(...)` (public, auth gerektirmez; anasayfa SSR/client'tan çağrılır).
- Handler içinde:
  1. `process.env['GOOGLE_PLACES_API_KEY']` okunur. Yoksa → `null` döner (statik yedek kullanılır).
  2. `supabaseAdmin`'i (dinamik `await import("@/integrations/supabase/client.server")`) ile `site_cache` tablosundan `key='google_reviews'` satırı okunur. `fetched_at` son 24 saatten yeni ise → `value` döner.
  3. Değilse → `https://places.googleapis.com/v1/places:searchText` çağrılır:
     - `textQuery`: `"Özel Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği, Sultangazi, İstanbul"`
     - header `X-Goog-Api-Key` + `X-Goog-FieldMask: places.id,places.displayName,places.rating,places.userRatingCount,places.reviews`
     - `places[0]` alınır (adreste "Yeni Yaşam" içeren ilk eşleşme).
  4. `reviews` filtrelenir: `rating >= 4 && text.trim().length > 0`. `publishTime`'dan Türkçe göreli tarih hesaplanır (`formatRelativeDateTR`). `publishTime`'a göre yeni→eski sıralanır.
  5. Sonuç `{ rating, userRatingCount, reviews: [{name, text, rating, date}] }` olarak `site_cache`'e upsert edilir (`fetched_at = now()`), döndürülür.
  6. Herhangi hata → `null` (statik yedek).
- Yardımcı: `formatRelativeDateTR(iso)` → dün / geçen hafta / x gün önce / x hafta önce / x ay önce / x yıl önce.

### 3. Yeni migration — `site_cache` tablosu
```sql
create table public.site_cache (
  key text primary key,
  value jsonb not null,
  fetched_at timestamptz not null default now()
);
grant all on public.site_cache to service_role;
alter table public.site_cache enable row level security;
-- policy yok: yalnızca service_role (sunucu fonksiyonu) erişir; anon/auth kilitli
```

### 4. `src/routes/index.tsx` — yorum bölümü canlıya bağlanır
- Mevcut `visibleReviews.map(...)` kısmı: `useQuery` ile `getGoogleReviews` çağrılır; `const reviewsToShow = liveData?.reviews?.length ? liveData.reviews : visibleReviews;` ile gösterilir.
- SSR statik listeyi gösterir (API sonucu gelmeden önce); hidrasyon sonrası canlı liste tak edilir (yanıp sönme yok, statik ilk çerçeveyi verir).
- Bölüm başlığı "Google'da 4.6 ortalama." ve yıldız çipi olduğu gibi kalır (minimum etki).
- Tarihler canlı yorumlarda `date` alanından (otomatik göreli) gösterilir.

### 5. Gizli anahtar: `GOOGLE_PLACES_API_KEY`
- Kod `process.env['GOOGLE_PLACES_API_KEY']` okur; anahtar yoksa sistem statik yedeğe döner (site çalışır).
- Anahtarı siz oluşturup güvenli forma girersiniz (aşağıdaki adımlar).

## Sizin yapacağınız: Google Places API anahtarı oluşturma (adım adım)
1. https://console.cloud.google.com adresinden Google hesabınızla giriş yapın.
2. Yeni proje oluşturun (örn. "Yeni Yasam Yorumlar").
3. **Faturalandırma** etkinleştirin (Places API gerektirir; ayda $200 ücretsiz kredi yeter — günde 1 istekle ~$1/ay).
4. APIs & Services → Library → **"Places API (New)"** aratıp **Enable** deyin. (Eski "Places API" değil, "Places API (New)" — `places.googleapis.com`.)
5. APIs & Services → Credentials → **Create Credentials → API key**.
6. Anahtarı düzenle: API restrictions → "Places API (New)" ile sınırlandırın (güvenlik).
7. Anahtarı kopyalayın ve bana verin (güvenli sekret formundan `GOOGLE_PLACES_API_KEY` olarak ekleyeceğim).

## Doğrulama
- API anahtarı olmadan: anasayfa mevcut 5 statik yorumu gösterir (Leyla Çelik dahil).
- API anahtarı eklenince: anasayfa Google'dan gelen en güncel 5 yorumu (4★+, metinli) gösterir; tarihler göreli ve otomatik.
- Network'te `places.googleapis.com/v1/places:searchText` isteği günde ~1 kez görünür (önbellek).
- Google'a hiçbir kişisel/sağlık/randevu verisi gitmez — yalnızca public yorum ve yer verisi okunur.

## Dokunulmayacaklar
Mevcut tasarım, içerik, component, routing, form sistemi, WhatsApp, GA4 entegrasyonu ve diğer işlevler değiştirilmez. Yalnızca yorum listesi veri kaynağı statik→canlıya geçer.
