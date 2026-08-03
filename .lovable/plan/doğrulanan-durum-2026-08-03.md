Tarayıcıda kalan eski favicon önbelleğini kesin olarak aşmak için ikonu yeni bir dosya adıyla sunacağım.

## Doğrulanan durum

- Mevcut `public/favicon.png` 512×512 ve tamamen opak; köşeleri lacivert, beyaz veya şeffaf bir çerçeve içermiyor.
- Önizleme sunucusu da bu doğru dosyayı `/favicon.png` adresinden döndürüyor.
- Ekran görüntüsündeki beyaz, yuvarlatılmış kare bu nedenle dosyanın kendisinden değil tarayıcının daha önce kaydettiği favicon sürümünden geliyor.

## Uygulama

1. Mevcut yüksek kaliteli ve çerçevesiz ikonu yeni, benzersiz bir adla `public/yeniyasam-favicon.png` olarak oluştur.
2. `src/routes/__root.tsx` içindeki favicon bağlantısını bu yeni dosya adına geçir; ayrıca tarayıcı uyumluluğu için `shortcut icon` bağlantısı ekle.
3. Eski favicon yolunu artık sayfa başlığında kullanma; böylece tarayıcı eski önbelleği eşleştiremez.
4. Önizlemede yeni dosya yolunun 200 döndüğünü ve render edilen `<head>` içinde yeni favicon bağlantısının bulunduğunu doğrula.
5. Chromium'u temiz bir tarayıcı profiliyle açarak sekme ikonunun lacivert kare zemin ve beyaz diş simgesiyle, beyaz çerçevesiz göründüğünü kontrol et.