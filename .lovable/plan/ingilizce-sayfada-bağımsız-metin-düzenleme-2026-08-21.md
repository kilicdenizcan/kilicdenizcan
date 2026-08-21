# İngilizce sayfada bağımsız metin düzenleme

## Sorun

İngilizce görünüm, Türkçe sayfanın üzerine canlı olarak uygulanan bir çeviri katmanı ile oluşuyor: sayfadaki metinler kaynak dosyalarda Türkçe duruyor, İngilizceleri tarayıcıda yerine yazılıyor. Görsel düzenleyici bir metni değiştirebilmek için onu kaynak dosyada bulmak zorunda olduğundan, EN modunda gördüğünüz "Our Doctors" gibi metinlere dokunamıyor — bu yüzden değişikliğe izin vermedi.

## Çözüm

İngilizce tarafa özel, önceliği en yüksek bir "İngilizce metin sözlüğü" kuruyoruz:

- Türkçe kaynak metin → sizin istediğiniz İngilizce karşılık.
- Bu sözlükte bir karşılık varsa, yapay zekâ çevirisi ve önbellek yok sayılır; her zaman sizin yazdığınız İngilizce görünür.
- Sözlükte olmayan her şey eskisi gibi otomatik çevrilir. Yani Türkçe sayfada yaptığınız her değişiklik İngilizceye otomatik yansımaya devam eder.
- Yalnızca İngilizceyi değiştirmek istediğinizde Türkçe metne hiç dokunulmaz.

Örnek: "Hekimlerimiz" → "Doctors" (otomatik çeviri "Our Doctors" yerine).

## Nasıl kullanacaksınız

1. İngilizce sayfada beğenmediğiniz bir metni bana yazarsınız ("EN: Hekimlerimiz yerine Doctors olsun").
2. Ben o satırı İngilizce sözlüğe eklerim; Türkçe içerik hiç etkilenmez.

Görsel düzenleyici ile doğrudan İngilizce görünüm üzerinde tıklayıp yazmak teknik olarak mümkün değil (o metinler kaynak dosyada bulunmuyor), ama bu yöntemle sonuç aynı: İngilizce sayfa istediğiniz gibi, Türkçeden bağımsız kalır.

## Teknik detaylar

- Yeni dosya: `src/lib/i18n/overrides.en.ts` — `Record<string, string>` (TR kaynak → EN nihai metin).
- `TranslateProvider.tsx` içindeki `lookup` sırası: `overridesEn` → `dictionary` → AI/DB önbelleği.
- Başlangıç olarak "Hekimlerimiz" → "Doctors" girişi eklenir ve navigasyon/başlıklardaki karşılıkları kontrol edilir.
- Metin düğümü değiştirme mantığı ve `data-no-translate` davranışı aynen korunur; sunucu çeviri fonksiyonu ve önbellek tablosu değişmez.
