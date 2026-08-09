# Canlı önizlemede sayfaların boş görünmesi

## Tespit edilen durum

Canlı önizleme penceresinde ana içerik alanları bembeyaz görünüyor ve hiçbir şeye tıklanamıyor. Yeni sekmede site normal çalışıyor.

Önizleme üzerinde yaptığım ölçüm sonucu: sayfadaki bölümler DOM'da mevcut ve yükseklikleri normal, ancak animasyon sarmalayıcısı olan tüm bloklar `opacity: 0; filter: blur(10px)` durumunda takılı kalmış. Yani içerik var ama görünmez; görünmez olduğu için de tıklanamıyor.

Sebep: `src/components/site/Reveal.tsx` bileşeni "görünür alana girince göster" (whileInView) mantığıyla çalışıyor. Bu mantık, tarayıcının IntersectionObserver özelliğine bağlı. Gömülü önizleme çerçevesi ölçeklendirilip/kaydırıldığında bu tetikleyici çalışmıyor, animasyon hiç başlamıyor ve içerik kalıcı olarak gizli kalıyor.

## Çözüm

`Reveal` bileşenini "her koşulda görünür olur" hale getirmek:

- Görünür alana girme tetiklemesi çalışırsa bugünkü animasyon aynen kalır (fade + slide + blur).
- Tetikleme kısa bir süre içinde (yaklaşık 1 saniye) gerçekleşmezse, içerik otomatik olarak görünür duruma geçer. Böylece animasyonun hiç başlamadığı ortamlarda sayfa asla boş kalmaz.
- Ayrıca gözlemci desteklenmiyorsa doğrudan görünür render edilir.

Bu değişiklik tek dosyada yapılır ve tüm sayfaları (ana sayfa, tedaviler, hekimler, iletişim vb.) aynı anda düzeltir; tasarım ve animasyon hissi normal koşullarda değişmez.

## Teknik

- `src/components/site/Reveal.tsx`: `whileInView` yerine `useInView` (motion/react) + `animate` kontrollü yapı; `useEffect` içinde `setTimeout` tabanlı güvenlik ağı ile `shown` durumu zorlanır. `viewport={{ once: true }}` davranışı korunur, `delay`/`y`/`blur` prop'ları aynı kalır.
- Doğrulama: önizleme içinde çalıştırılacak bir kontrol ile bölümlerin `opacity` değerinin 1'e ulaştığı ve linklerin tıklanabildiği teyit edilir.
