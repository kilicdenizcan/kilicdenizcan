# Vercel'de logonun görünmemesi

## Sorun (doğrulandı)

Navbar ve Footer, logoyu `src/assets/logo-mark-new.jpg.asset.json` üzerinden alıyor. Bu dosyanın içindeki adres `/__l5e/assets-v1/...` ile başlayan, yalnızca Lovable barındırmasında çalışan bir yol. Vercel'de bu yol yok, görsel 404 dönüyor ve tarayıcı kırık resim (mavi soru işareti) gösteriyor.

## Çözüm

Görseli değiştirmeden, aynı dosyayı projeye gerçek bir dosya olarak indirip normal bir görsel importu ile kullanmak.

1. Mevcut logo görselini CDN'den indirip `src/assets/logo-mark-new.jpg` olarak projeye kaydet (aynı görsel, aynı kalite).
2. `src/components/site/Navbar.tsx` içinde `logoMark.url` yerine doğrudan görsel importu kullan (`import logoMark from "@/assets/logo-mark-new.jpg"` → `src={logoMark}`). Boyut ve stiller aynı kalır.
3. `src/components/site/Footer.tsx` için aynı değişikliği yap.
4. Artık kullanılmayan `.asset.json` işaretçi dosyalarını temizle.
5. Önizlemede logonun üst barda ve alt bilgi alanında doğru göründüğünü kontrol et.

## Not

Görsel artık build çıktısına dahil olacağı için Vercel, Lovable ve her ortamda aynı şekilde yüklenir.
