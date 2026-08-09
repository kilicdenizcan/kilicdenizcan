# İmplant süreç şeması: 3 yola ayrılan adım

İmplant tedavisi sayfasındaki "Nasıl ilerliyoruz?" akışı, diğer tedavilerden farklı olarak dallanan bir şema haline gelecek.

## Akış

```text
1  Dijital planlama
2  Cerrahi uygulama
        |
   -----+-----------------------------
   |              |                  |
 Klasik        İmmediat          Fast & Fixed
 (osseo-       uygulama-         İmplant
  integrasyon)  yükleme
   |              |                  |
   -----------------------------------
        |
3  Üst yapı
```

## İçerik

Ortak adımlar (değişmiyor):
1. Dijital planlama
2. Cerrahi uygulama
3. (son adım) Üst yapı — Dijital ölçü ile zirkonyum veya metal porselen hazırlanır ve implanta sabitlenir.

Ayrışan 3 seçenek:
- Osseointegrasyon (gerek varsa) — İmplantın kemikle kaynaşması için 2–3 ay beklenir.
- İmmediat uygulama-yükleme — Diş çekildiği gibi implant yerleştirilir ve diş yapılır.
- Fast&Fixed İmplant — Bütün dişlerin çekilmesi sonucunda uygulanan metottur. Dişler çekildikten sonra implantlar hemen yerleştirilir ve üzerine diş yapılır.

## Tasarım

- Dallanma bloğu, mevcut numaralı liste akışının içinde "3" numarasıyla yer alır; başlığı "Uygulama yöntemi" gibi bir üst başlık, altında 3 kart yan yana (mobilde alt alta).
- Kartlar sitedeki mevcut dille uyumlu: yuvarlak köşe, ince border, soft gölge, lacivert başlık, grafit açıklama.
- Kartların üstünde ve altında ince bağlantı çizgileri ile "aynı sonuca bağlanma" görsel olarak belirtilir; son adım (Üst yapı) 4 numarayla devam eder.
- Animasyonlar mevcut `Reveal` bileşeniyle sıralı olarak gelir.

## Teknik

- `src/lib/site.ts`: `Treatment` tipine opsiyonel `branchStep?: { title: string; options: { title: string; text: string }[] }` alanı eklenir; sadece `implant` kaydında doldurulur, `steps` dizisinden 3. madde çıkarılır.
- `src/routes/tedaviler/$slug.tsx`: adım listesi render'ı, `branchStep` varsa 2. adımdan sonra dallanma bloğunu, ardından kalan adımı doğru numarayla gösterecek şekilde güncellenir. `branchStep` olmayan tedavilerde görünüm birebir aynı kalır.
