# "Diğer tedaviler" bölümünün kaldırılması

## Hedef
Tedavi detay sayfalarının (`/tedaviler/$slug`) altında yer alan "Diğer tedaviler" bölümü kaldırılacak. Kullanıcılar bir tedaviyi incelerken başka tedavilere atlama seçeneği sunulmayacak.

## Değişiklik
Dosya: `src/routes/tedaviler/$slug.tsx`

1. **`others` değişkenini sil** (satır 51) — artık kullanılmayacak:
   `const others = treatments.filter((x) => x.slug !== t.slug).slice(0, 3);`

2. **"Diğer tedaviler" bölümünü sil** (satır 215–238) — son `<section>` bloğu (CtaBand'tan önceki bölüm).

Not: `treatments` ve `ArrowUpRight` import'ları dosyada başka yerlerde kullanıldığı için korunacak; yalnızca bu bölüm ve ona ait yerel değişken kaldırılacak.

## Sonuç
Her tedavi sayfası kendi içeriğiyle sonlanacak; kullanıcı tedaviler arasında doğrudan bağlantılarla değil, yalnızca üst menü veya alt menü üzerinden gezinecek.
