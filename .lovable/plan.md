# Tedavi seçimini randevu formuna entegre etme

Hekimlerde olduğu gibi, bir tedavi sayfasından randevuya geçildiğinde randevu formundaki "Tedavi" alanı o tedavi ile otomatik dolu gelecek. Tedavi listesi tek kaynaktan (site verisi) beslendiği için yeni tedavi eklenip çıkarıldığında entegrasyon kendiliğinden çalışmaya devam eder.

## Yapılacaklar

1. `/randevu` sayfasına `tedavi` adında ikinci bir URL parametresi eklenecek (mevcut `doktor` parametresi aynen kalır).
2. Randevu formundaki "Tedavi" seçim kutusu, gelen `tedavi` değeri tedavi listesinde varsa onu önceden seçili gösterecek; yoksa varsayılan "Genel muayene" kalacak.
3. Tedavi detay sayfasındaki "Online randevu" butonu, o tedavinin kimliğini randevu sayfasına taşıyacak.
4. Tedaviler listesi sayfasındaki kartlarda ve ana sayfadaki tedavi bağlantılarında davranış değişmeyecek; sadece detay sayfasındaki randevu butonu tedaviyi taşır.
5. Diğer sayfalardaki genel "Online Randevu" bağlantıları (menü, alt bilgi, CTA bandı) tedavi seçmeden çalışmaya devam eder.

## Teknik notlar

- `src/routes/randevu.tsx` içindeki `validateSearch`, `doktor` yanında `tedavi?: string` de döndürecek.
- Eşleşme tedavi `slug` değeri üzerinden yapılacak; form `option` etiketleri `treatments` dizisinden geldiği için ad değişse bile bozulmaz.
- `src/routes/tedaviler/$slug.tsx` içindeki `Link` çağrısı `search={{ doktor: undefined, tedavi: t.slug }}` olacak.
- `doktor: undefined` gönderen mevcut `Link`'lere (`CtaBand`, `Navbar`, `Footer`, ana sayfa) `tedavi: undefined` eklenerek tip uyumu korunacak.
