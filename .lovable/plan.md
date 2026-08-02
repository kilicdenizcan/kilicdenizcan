Beyaz çerçeveyi kaldırmak ve orijinal logonun kalitesini korumak için favicon'u yeniden üreteceğim.

1. Kaynak görsel
   - Orijinal yüksek çözünürlüklü logo: `src/assets/logo-mark-new.jpg.asset.json` (JPEG 1417×1134, lacivert zemin üzerinde beyaz diş figürü).

2. Favicon üretimi
   - ImageMagick ile orijinalden merkeze hizalı, arka planı lacivert (#06264C) kare bir kırpma yap.
   - Çıktı: `public/favicon.png`, 512×512 piksel, PNG.
   - Köşeleri şeffaf olmayacak; tamamen logonun kendi lacivert tonuyla doldurulacak. Böylece tarayıcı sekmesinde beyaz çerçeve oluşmayacak.
   - Yüksek kaliteli yeniden örnekleme (Lanczos) kullanılarak detaylar korunacak.

3. Eski ikonu temizleme
   - `public/favicon.ico` kalıntısını sil.
   - `src/routes/__root.tsx` zaten `/favicon.png` olarak referans veriyor; değişikliğe gerek yok.

4. Doğrulama
   - Üretilen `favicon.png` dosyasını açarak köşelerde beyaz/şeffaf alan kalmadığını ve diş figürünün net olduğunu kontrol et.
   - Önizlemede `/favicon.png` URL'sinin doğru geldiğinden emin ol.