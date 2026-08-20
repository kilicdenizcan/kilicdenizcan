# Hakkımızda Timeline Yenilemesi

## Hedef
“Adım adım büyüdük” bölümünü, her dönemin yıl–başlık–açıklama bütünlüğünün ilk bakışta anlaşılacağı yeni bir timeline yapısına dönüştürmek.

## Mevcut durum
- Timeline şu anda tek bir dikey çizgi üzerinde sıralanıyor.
- Maddeler arasında `pb-32` boşluk bulunmasına rağmen ayrım yalnızca boşlukla sağlandığı için açıklamanın hangi yıla ait olduğu görsel olarak yeterince güçlü değil.
- İçerik verileri doğru ve ayrı bir `timeline` dizisinde tutuluyor; metinleri değiştirmeden yalnızca sunum yapısı yenilenebilir.

## Yeni düzen
- Her dönemi kendi belirgin yatay satırı/bloku içinde göstermek.
- Yılı solda güçlü, sabit genişlikli bir alan içinde; başlık ve açıklamayı sağda birlikte konumlandırmak.
- Her maddenin altına ince bir ayırıcı çizgi ekleyerek bir sonraki yıldan net biçimde ayırmak.
- Dikey çizgi ve küçük nokta sistemini kaldırmak; böylece boşluğa bağımlı olmayan, daha okunaklı ve premium bir kronoloji oluşturmak.
- Mobilde yıl, başlık ve açıklamayı aynı blok içinde üst üste; geniş ekranda yıl ile içeriği iki sütun halinde göstermek.
- Mevcut animasyon, renk tokenları ve tipografi korunacak.

## Doğrulama
- Hakkımızda sayfasını mobil ve masaüstü genişliklerinde kontrol etmek.
- Özellikle 2007 açıklaması ile 2022 yılının farklı maddeler olarak açıkça algılandığını doğrulamak.

## Dosya
- `src/routes/hakkimizda.tsx`