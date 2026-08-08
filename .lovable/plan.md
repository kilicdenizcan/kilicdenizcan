Telefon numarası alanlarına ikinci hat ekleme planı

## Hedef
Ana sayfanın üst (Navbar) çubuğundaki telefon numarasının yanına ikinci bir numara eklemek: **0212 536 49 56**. Kullanıcı ayrıca telefon bilgilerinin genel olarak iki numara ile gösterilmesini istedi.

## Yapılacaklar

### 1. Veri kaynağı güncelleme
- Dosya: `src/lib/site.ts`
- Mevcut `clinic` nesnesine sabit hat için iki alan eklenir:
  - `phone2`: `+902125364956`
  - `phone2Display`: `0212 536 49 56`

### 2. Navbar (üst bar)
- Dosya: `src/components/site/Navbar.tsx`
- Mevcut telefon bağlantısının yanına/yanına ikinci `tel:` bağlantısı eklenir.
- Her iki numara da aynı ikon/telefon stiliyle gösterilir, fazla genişlememesi için masaüstü görünümde yatay, gerekiyorsa mobilde yığılmış veya kısaltılmış biçimde düzenlenir.

### 3. Footer
- Dosya: `src/components/site/Footer.tsx`
- İletişim bölümündeki telefon satırına ikinci numara da eklenir; numaralar alt alta veya yanyana gösterilir.

### 4. İletişim sayfası
- Dosya: `src/routes/iletisim.tsx`
- Telefon bilgisi kartına ikinci numara da eklenir; her iki numara tıklanabilir `tel:` bağlantısı olur.

### 5. Doğrulama
- `bun run build` veya `tsgo` ile tip kontrolü ve derleme çalıştırılır.
- Önizlemede Navbar, Footer ve İletişim sayfasında her iki numaranın göründüğü kontrol edilir.

## Teknik notlar
- Yeni numaralar `clinic` nesnesinden beslenecek; böylece ileride değişiklik gerektiğinde tek noktadan güncellenebilir.
- `tel:` protokolü için uluslararası format (`+902125364956`) kullanılır, gösterimde yerel format (`0212 536 49 56`) korunur.
- Mevcut görsel tasarım (navy, beyaz, soft gölgeler) ve tipografi bozulmadan korunur.