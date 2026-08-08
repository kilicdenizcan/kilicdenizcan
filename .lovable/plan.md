Navbar'da tek telefon, diğer alanlarda her iki telefon numarası

## Hedef
Ana sayfa üst barında (Navbar) yalnızca 0553 ile başlayan cep telefonu görünsün; Footer ve İletişim sayfası gibi diğer alanlarda her iki numara (0553 841 71 73 ve 0212 536 49 56) yer almaya devam etsin.

## Yapılacaklar

### 1. Navbar düzenlemesi
- Dosya: `src/components/site/Navbar.tsx`
- Mevcut iki numaralı gösterim kaldırılır.
- Yalnızca `clinic.phone` / `clinic.phoneDisplay` gösterilecek şekilde tek telefon bağlantısı geri getirilir.
- Mobil menü ve genel düzen bozulmadan korunur.

### 2. Footer'da ikinci numarayı koruma
- Dosya: `src/components/site/Footer.tsx`
- Mevcut iki numaralı liste (0553 ve 0212) olduğu gibi kalır.

### 3. İletişim sayfasında ikinci numarayı koruma
- Dosya: `src/routes/iletisim.tsx`
- Mevcut iki numaralı telefon satırları olduğu gibi kalır.

### 4. Doğrulama
- `bun run build` ile tip kontrolü ve derleme çalıştırılır.
- Önizlemede Navbar'da tek numara, Footer ve İletişim'de her iki numaranın göründüğü kontrol edilir.

## Teknik notlar
- `src/lib/site.ts` içindeki `phone2` ve `phone2Display` alanları olduğu gibi kalır; sadece Navbar'da kullanılmaz hale getirilir.
- Mevcut görsel tasarım ve tipografi korunur.