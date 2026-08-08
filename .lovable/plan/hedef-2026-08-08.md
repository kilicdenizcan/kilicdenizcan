İletişim sayfasında telefon numaralarını tek başlık altında toplama planı

## Hedef
İletişim sayfasında iki telefon numarasını tek bir "Telefon" başlığı ve simgesi altında birleştirmek; simgenin her iki numara yazısını da dikey olarak ortalamasını sağlamak.

## Yapılacaklar

### 1. İletişim kartı yapısını güncelleme
- Dosya: `src/routes/iletisim.tsx`
- Mevcut iletişim listesinde telefon iki ayrı satır olarak gösteriliyor. Bunlar tek satırda birleştirilir:
  - Tek `Phone` ikonu kullanılır.
  - Tek "Telefon" etiketi kullanılır.
  - İki numara alt alta veya yanyana gösterilir, her ikisi de `tel:` bağlantısı olur.
- Simgeyi her iki numara yazısına göre dikey ortalamak için `items-center` kullanılır; üstte kalmaması sağlanır.

### 2. Diğer iletişim öğeleri
- Adres ve e-posta satırları mevcut düzenlerini korur.
- Çalışma saatleri bloğu aşağıdaki yapısı olduğu gibi kalır.

### 3. Doğrulama
- `bun run build` ile derleme ve tip kontrolü çalıştırılır.
- Önizlemede İletişim sayfasında telefon satırının tek ikon/başlık altında, simgenin ortalanmış şekilde göründüğü kontrol edilir.

## Teknik notlar
- Telefon verileri `src/lib/site.ts` içindeki `clinic.phone` / `clinic.phoneDisplay` ve `clinic.phone2` / `clinic.phone2Display` alanlarından gelmeye devam eder.
- Mevcut görsel tasarım (navy ikon, muted etiket, boşluklar) korunur.