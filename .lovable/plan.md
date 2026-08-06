# Hekim kadrosu: 3 yeni hekim + geçici boş görsel alanı

## Amaç
Musa Kılıç dışındaki hekimlerde stok fotoğraflar kaldırılacak; yerine aynı ölçüde, gri arka planlı boş bir görsel çerçevesi kalacak. Ayrıca 3 yeni hekim eklenecek ve onlar da aynı boş çerçeveyi kullanacak.

## Yapılacaklar

### 1. Hekim verisi (src/lib/site.ts)
- `image` alanı isteğe bağlı hale gelir. Sadece Dt. Musa Kılıç'ta gerçek fotoğraf kalır; diğerlerinde `image` kaldırılır (stok görsel importları da temizlenir).
- Mevcut hekimler: Dt. Burçe Nur Yılmaz (Ortodonti) korunur, Dr. Dt. Emre Demir korunur.
- Yeni eklenecek 3 hekim, mevcut şablona birebir uygun temsili içerikle:
  - **Dt. Bilge Coşkun** — Restoratif Diş Tedavisi; deneyim, "Türkçe, İngilizce"; estetik dolgu / kanal tedavisi / diş eti odaklı kısa biyografi.
  - **Dt. Zehra Işık** — Pedodonti (Çocuk Diş Hekimliği); deneyim, "Türkçe"; çocuk hastalarda kaygı yönetimi ve koruyucu tedavi odaklı biyografi.
  - **Dt. Beyza Oğlakçı** — Endodonti / Genel Diş Hekimliği; deneyim, "Türkçe, İngilizce"; mikroskop destekli kanal tedavisi odaklı biyografi.
- Deneyim değerleri, sitedeki mevcut otomatik hesaplama (`yearsSince`) ile verilir; böylece yıl geçtikçe kendiliğinden artar.

### 2. Boş görsel çerçevesi
- Hekimler sayfası (`src/routes/doktorlar.tsx`) ve ana sayfadaki hekim kartlarında (`src/routes/index.tsx`), `image` yoksa fotoğraf yerine aynı oranı koruyan gri (muted) yüzeyli, ince kenarlıklı bir yer tutucu render edilir; ortada soluk bir hekim/kişi ikonu bulunur.
- Ölçü, köşe yuvarlaklığı ve düzen fotoğraflı kartla birebir aynı kalır, böylece gerçek fotoğraflar geldiğinde sadece `image` alanı doldurulacak.

### 3. Yan etkiler
- Randevu sayfasındaki hekim listesi zaten `site.ts` verisinden geliyor; yeni hekimler otomatik olarak seçilebilir listeye düşer, ek iş gerekmez.
- Hekimler sayfasında görülen "0 Yıl / 40 Yıl" hydration uyuşmazlığı, deneyim hesabının sunucu ve tarayıcıda aynı sonucu üretecek şekilde düzeltilmesiyle giderilir.

## Teknik notlar
- Dosyalar: `src/lib/site.ts`, `src/routes/doktorlar.tsx`, `src/routes/index.tsx`.
- `doctors` tipinde `image?: string` yapılır; kullanılmayan stok görsel importları kaldırılır.
