# Tedavi sayfasındaki WhatsApp butonuna tedavi adı ekleme

`/tedaviler/$slug` sayfasındaki "Bu tedavi için yazın" butonu şu anda genel `whatsappHref` adresini kullanıyor. Kullanıcı tıkladığında mesajda tedavi bilgisi geçmiyor; bu nedenle WhatsApp konuşması sadece genel randevu talebi olarak başlıyor.

## Yapılacaklar

1. `/src/routes/tedaviler/$slug.tsx` içindeki "Bu tedavi için yazın" bağlantısına, açık olan tedavinin başlığını içeren özel bir WhatsApp mesajı üretilecek.
2. Mesaj içeriği örnek: "Merhaba, Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği'nden **Diş İmplantı** tedavisi hakkında bilgi almak ve randevu almak istiyorum."
3. URL doğru şekilde `encodeURIComponent` ile oluşturulacak; hem Türkçe karakterler hem boşluklar güvenle kodlanacak.
4. Diğer sayfalarda kullanılan genel `whatsappHref` (menü, WhatsApp yüzer buton, iletişim sayfası vb.) değişmeyecek; yalnızca tedavi detay sayfasındaki bu buton etkilenecek.

## Teknik notlar

- `t.title` (örneğin "Diş İmplantı") mesaj metnine `t.slug` yerine doğrudan başlık olarak eklenecek, böylece kullanıcı klinik tarafında anlamlı okunur.
- Kod tekrarını önlemek için gerekirse `src/lib/site.ts` içinde `whatsappHrefWithTreatment(title: string)` gibi küçük bir yardımcı fonksiyon oluşturulabilir; ancak değişiklik tek sayfada kalıyorsa inline olarak da kalabilir.
- Mevcut `clinic.whatsappText` sabiti referans alınarak klinik adı ve selam aynen korunacak.

## Ek gözlem

Önizlemede `/doktorlar` rotasında "40 Yıl" / "0 Yıl" şeklinde bir hydration uyumsuzluğu görülüyor. Bu, `yearsSince` yardımcısının sunucu ve istemci tarafında farklı değer üretmesinden kaynaklanıyor olabilir. Bu planın kapsamı dışında tutulabilir veya onayla beraber aynı turda giderilebilir.
