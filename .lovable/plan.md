# GA4 Entegrasyonu Planı

## Hedef
Yeni Yaşam kliniği sitesine Google Analytics 4 (Measurement ID: **G-P8TMD8EXMR**) ekle. Sadece bu entegrasyon için gerekli minimum değişiklikler; mevcut tasarım, içerik, component, routing, form sistemi ve işlevler dokunulmaz kalır.

## Yaklaşım
Sağlanan Measurement ID doğrudan kullanılır (konnektör akışı gerekmez). gtag.js tarayıcıda çalışır; SSR/iş mantığına karışmaz.

## Değişiklikler

### 1. Yeni dosya: `src/lib/analytics.ts`
- `GA_MEASUREMENT_ID = "G-P8TMD8EXMR"` sabiti.
- `initGtag()` — gtag.js loader + ilk `config` çağrısı (yalnız client'ta, `window` varken).
- `trackPageView(path)` — `gtag('event', 'page_view', { page_path, page_title })` tetikler. `lastTrackedPath` modül değişkeniyle aynı path tekrar gönderilmesini engeller.
- Tüm fonksiyonlar `typeof window === 'undefined'` guard'lı; SSR'de no-op.

### 2. `src/routes/__root.tsx` — minimum editler
- **head() scripts** alanına iki script eklenir:
  - gtag.js harici yükleyici (`async`): `https://www.googletagmanager.com/gtag/js?id=G-P8TMD8EXMR`
  - inline config: `window.dataLayer`, `gtag('js', ...)`, `gtag('config', 'G-P8TMD8EXMR', { send_page_view: false })` — GA'nın otomatik ilk page_view'i devre dışı; ilk ve sonraki tüm page_view'ler tek yerden (trackPageView) gönderilir.
- **RootComponent** içinde `useRouter()` ile `router.subscribe` kuran `useEffect` eklenir; her gezinmede `trackPageView(toLocation.pathname)` çağrılır. Abonelik mount edildiğinde ilk yükleme için de `trackPageView(location.pathname)` bir kez tetiklenir (config `send_page_view:false` olduğundan otomatik page_view yok → çift sayım önlenir). `trackPageView` içindeki `lastTrackedPath` ile aynı path tekrar gönderilmez (geri/ileri/yenileme dahil).

Başka dosyaya dokunulmaz.

## Gereksinim karşılığı
- **Tüm sayfalarda çalışır**: head script'leri tüm route'larda render edilir (kök layout).
- **SPA page_view**: router aboneliği her istemci-tarafı geçişinde tek bir `page_view` gönderir. İlk yüklemede yalnızca bir adet (config `send_page_view:false` + tek trackPageView). Aynı path tekrar gönderilmez.
- **PII yok**: Sadece `page_path` ve `page_title` gönderilir. Randevu formu, WhatsApp yönlendirmesi, doktor/randevu/sağlık verisi GA'ye hiçbir şekilde iletilmez — form gönderimi veya buton tıklamalarında event eklenmez.
- **Minimum etki**: Yalnızca `analytics.ts` (yeni) ve `__root.tsx` (2 küçük ekleme). Diğer dosyalar değiştirilmez, refactor yapılmaz.

## Teknik notlar
- TanStack Router'ın `router.subscribe` callback'i `{ fromLocation, toLocation }` alır; `toLocation.pathname` ile `trackPageView` çağrılır. `analytics.ts` içindeki `lastTrackedPath` modül değişkeni ile aynı path tekrar gönderilmez.bilir (basit eşitlik kontrolü).
- `Scripts`/`HeadContent` zaten __root.tsx'te; mevcut yapıya uygun.
- Inline script'ler `dangerouslySetInnerHTML` gerekmez — TanStack head script `children` alanı destekler.

## Doğrulama
- Build/dev sunucusu hata vermez.
- Önizlemede Network sekmesinde `gtag/js` ve `collect` istekleri görünür.
- Sayfalar arası geçişte (örn. `/` → `/doktorlar` → `/tedaviler`) her geçişte bir `page_view` event'i gönderilir.
