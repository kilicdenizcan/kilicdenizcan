# İngilizce Dil Desteği (TR / EN)

Üst bara bir **TR | EN** anahtarı eklenecek. EN seçildiğinde sitedeki tüm metinler İngilizce görünecek; Türkçe içerikte yaptığınız değişiklikler İngilizce tarafa otomatik yansıyacak.

## Nasıl çalışacak

1. **Sözlük (elle çeviri)**: Sitedeki mevcut tüm Türkçe metinler (menü, ana sayfa, hakkımızda, hekimler, tedaviler ve tüm tedavi detayları, blog, S.S.S., iletişim, randevu formu, footer) için sade ve anlaşılır İngilizce karşılıklar hazırlanır. Bunlar anında, gecikmesiz gösterilir.
2. **AI yedeği**: Türkçe bir metni değiştirdiğinizde veya yeni bir tedavi/soru eklediğinizde, sözlükte karşılığı olmayan metin otomatik olarak AI ile çevrilir ve önbelleğe alınır. İkinci ziyaretten itibaren anında gelir.
3. **Tercih hatırlanır**: Seçilen dil tarayıcıda saklanır; sonraki ziyarette aynı dille açılır. Adres `?lang=en` ile paylaşılabilir.

## Dil değiştirici

- Masaüstünde üst barda telefon numarasının yanında küçük, sade bir **TR | EN** anahtarı (aktif dil lacivert, diğeri gri).
- Mobil menüde aynı anahtar menünün üstünde yer alır.
- Mevcut fontlar (Manrope / Instrument Serif) İngilizce karakterleri zaten tam destekliyor; font bozulması olmayacak.

## Çeviri kapsamı ve kurallar

- Klinik adı, hekim isimleri, adres ve marka ifadeleri çevrilmez (örn. "Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği" olduğu gibi kalır, yanına açıklayıcı "Oral & Dental Health Clinic" ibaresi eklenebilir).
- Tıbbi terimler standart İngilizce karşılıklarıyla verilir (implant, root canal treatment, zirconia crown, orthodontics, pedodontics/children's dentistry, gum treatment, filling, preventive dentistry, smile design).
- Sayfa başlıkları ve meta açıklamalar da dile göre değişir; EN'de `og:title` / `og:description` İngilizce olur.
- WhatsApp otomatik mesajı da seçili dile göre gönderilir (EN'de İngilizce mesaj).
- Randevu formundaki etiketler, seçenekler ve doğrulama mesajları çevrilir; seçilen tedavi/hekim adları dil ile uyumlu gösterilir.

## Teknik detaylar

- Lovable Cloud etkinleştirilir: çeviri önbelleği için tek bir tablo (`translations`: kaynak metin hash'i, dil, çeviri). Herkese açık okuma, yazma yalnızca sunucu tarafında.
- Sunucu fonksiyonu (`translate`): gelen metinleri önce önbellekte arar, eksikleri Lovable AI Gateway ile toplu çevirir (klinik/tıbbi terim sözlüğü içeren bir sistem talimatıyla), sonucu tabloya yazar.
- `src/lib/i18n/` altında: `LanguageProvider` (context + localStorage + `?lang` senkronizasyonu), `useT()` hook'u, `en.ts` elle çeviri sözlüğü.
- Metin kaynağı `src/lib/site.ts` olduğu gibi Türkçe kalır — İngilizce katman üstüne bindirilir, böylece Türkçe içerikte yaptığınız her düzenleme tek yerden yönetilir.
- SSR/hidrasyon uyumu için dil, ilk render'da sunucuda `?lang` parametresinden okunur.

## Uygulama sırası

1. Cloud + `translations` tablosu ve çeviri sunucu fonksiyonu.
2. `LanguageProvider`, `useT()` ve dil anahtarı (Navbar + mobil menü).
3. Ortak bileşenler (Footer, CtaBand, PageHero, WhatsApp butonu) ve ana sayfa.
4. Hakkımızda, Hekimlerimiz, Tedaviler + tedavi detay sayfaları.
5. Blog, S.S.S., İletişim, Randevu formu.
6. Sayfa başlıkları/meta, EN kontrolü ve son gözden geçirme.
