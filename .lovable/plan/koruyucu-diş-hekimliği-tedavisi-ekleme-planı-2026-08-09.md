# Koruyucu Diş Hekimliği Tedavisi Ekleme Planı

## Hedef
Tedaviler listesinin başına "Koruyucu Diş Hekimliği" adlı yeni bir tedavi eklemek. Bu tedavinin seans/süre bilgisi olmayacak ve içeriğinde ücretsiz ağız-diş sağlığı eğitimi, çocuk diş fırçalama eğitimi/takvimi, flor uygulaması ve fissür uygulaması yer alacak.

## Yapılacaklar

1. **Yeni tedavi verisini ekle (`src/lib/site.ts`)**
   - `treatments` dizisinin en başına (index 0) yeni `Treatment` nesnesi ekle.
   - `slug`: `koruyucu-dis-hekimligi`
   - `title`: `Koruyucu Diş Hekimliği`
   - `short`: Çürük oluşmadan önce koruyucu önlemlerle sağlıklı gülüşler.
   - `summary`: Diş taşı temizliği ve her kapsamlı işlem yaptıran hastaya ücretsiz ağız ve diş sağlığı eğitimi; çocuk hastalara diş fırçalama eğitimi ve fırçalama takvimi; çocuk dişlerine flor uygulaması; genç ve süt dişlerini çürüğe karşı korumak için fissür uygulaması.
   - `duration`, `sessions`, `anesthesia`: boş bırakılacak.
   - `benefits`: koruyucu yaklaşımın avantajları (örn. çürük riskini azaltma, erken tanı, çocuklarda alışkanlık kazandırma).
   - `steps`: tedavi süreci adımları (örn. risk değerlendirmesi, profesyonel temizlik, eğitim, flor/fissür uygulaması, takip).
   - `faq`: en az iki soru-cevap.
     - Bu işlemler ne kadar gerekli?
     - Kaç yaşında başlanmalı?

2. **Tedaviler listesi kartını uyarla (`src/routes/tedaviler/index.tsx`)**
   - Kartın altındaki seans etiketi için `t.sessions` değeri varsa göster, yoksa `—` göster.
   - Bu, yeni tedavinin listelenirken boş etiket yerine "—" görünmesini sağlar.

3. **Tedavi detay sayfasını uyarla (`src/routes/tedaviler/$slug.tsx`)**
   - İşlem süresi / Seans / Anestezi gridini koşullu hale getir: `duration`, `sessions`, `anesthesia` değerlerinden en az biri boşsa bu bütün grid gizlenir.
   - Bu, Koruyucu Diş Hekimliği için hiçbir süre/seans kutusu görünmemesini sağlar.
   - Diğer sayfalar etkilenmez; mevcut tüm tedaviler aynı şekilde görünmeye devam eder.

4. **Randevu sayfası entegrasyonu**
   - Mevcut dinamik yapı zaten `tedavi` query parametresi ile çalışıyor. Yeni slug otomatik olarak randevu formundaki "Tercih edilen tedavi" seçeneğine dahil olacak.
   - Ek bir kod değişikliği gerekmeyebilir; ancak yeni tedavinin `title` değerinin formda doğru göründüğü test edilecek.

5. **SEO / head metadatası**
   - Dinamik `tedaviler/$slug.tsx` rotası zaten `loaderData.title` ve `loaderData.short` kullanıyor. Yeni tedavi otomatik olarak kendi başlık ve açıklamasını taşıyacak.
   - `tedaviler/index.tsx` head metadatasında tedavi isimleri varsa, "Koruyucu Diş Hekimliği" de açıklamaya eklenecek.

6. **Doğrulama**
   - `bun run build` veya `tsgo` ile tip ve derleme kontrolü.
   - `/tedaviler` ve `/tedaviler/koruyucu-dis-hekimligi` sayfaları önizlemede kontrol edilecek; listedeki ilk sırada, detayda süresiz/seanssız ve içeriklerin doğru olduğu doğrulanacak.
