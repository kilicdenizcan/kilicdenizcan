## Amaç
Sitede sabit yazılmış "40 Yıl", "40+", "12 yıl", "10 yıl" gibi deneyim ifadelerini, her yıl elle güncellemek yerine başlangıç tarihinden otomatik hesaplanan değerlere çevirmek.

## Nasıl çalışacak
`src/lib/site.ts` içine küçük bir yardımcı fonksiyon eklenir:

```text
yearsSince(başlangıçYılı, başlangıçAyı) -> bugünün tarihine göre tam yıl
```

Sayfa her açıldığında tarayıcıdaki güncel tarihe göre hesaplanır; yıl dönümü geçtiğinde sayı kendiliğinden +1 olur. Örnek: Dt. Musa Kılıç için başlangıç 1986 Mayıs → bugün 40, Mayıs 2027'de otomatik 41.

## Değişecek yerler (hepsi `src/lib/site.ts`)
1. **Yardımcı fonksiyon** `yearsSince` eklenir.
2. **Hekimler**: her hekim için `experience` metni yerine `careerStart: { year, month }` alanı tutulur; `experience` bundan üretilir:
   - Dt. Musa Kılıç → 1986 Mayıs (şu an "40 Yıl")
   - Dt. Burçe Nur Yılmaz → 2014 Mayıs (şu an "12 yıl klinik deneyim")
   - Dr. Dt. Emre Demir → 2016 Mayıs (şu an "10 yıl klinik deneyim")
   Metin biçimleri bugünküyle birebir aynı kalır, sadece sayı dinamikleşir.
3. **Ana sayfa istatistiği**: `{ value: "40+", label: "Yıllık deneyim" }` → klinik/kurucu başlangıcından hesaplanan `${yıl}+`.

## Ek olarak (onaylarsanız)
`hakkimizda` sayfasında "15 yılı aşkın deneyim" / "15 yıldır aynı mahallede" ifadeleri var; zaman çizelgesindeki 2009 kuruluşuna göre bugün 17 olması gerekiyor. Bunları da aynı otomatik hesaplamaya bağlarım.

## Teknik not
Değer render sırasında hesaplanacağı için sunucu ve tarayıcı tarafında aynı sonucu verir (yıl bazlı olduğu için hydration uyuşmazlığı riski yok). Ay bilgisini Mayıs olarak varsaydım; farklı bir ay isterseniz tek satırda değiştirilebilir.
