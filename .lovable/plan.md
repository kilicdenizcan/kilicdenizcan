# Türkçe metinlerin düzenlenememesi

## Nedeni

Dil sistemi, sayfadaki her metni tarayıcıda canlı olarak izliyor ve ilk gördüğü hâlini "orijinal Türkçe" olarak hafızasına alıyor. Sayfada herhangi bir değişiklik olduğunda (görsel düzenleyicinin yaptığı düzenleme dahil), sistem metni hafızasındaki eski Türkçe hâline geri yazıyor. Sonuç: Türkçe modda yaptığınız düzenleme anında eski metne dönüyor, yani "kaydolmuyor" gibi görünüyor.

Ayrıca Türkçe modda bile tüm metinler sürekli taranıp arka planda çeviri için sıraya alınıyor; bu da düzenleme sırasında gereksiz müdahale yaratıyor.

## Çözüm

Dil Türkçe iken çeviri katmanı tamamen devre dışı kalacak:

- Türkçe modda hiçbir metin DOM üzerinde değiştirilmeyecek, geri yazılmayacak. Sayfa kaynak dosyalarda ne yazıyorsa o görünecek — böylece görsel düzenleyici sorunsuz çalışacak.
- İngilizceye geçildiğinde orijinal Türkçe metinler o anda yeniden okunacak; yani düzenlemeden sonraki güncel Türkçe metin baz alınacak.
- Türkçeye geri dönüldüğünde metinler güncel kaynak metne dönecek (eski, önbellekteki hâline değil).
- Arka plan çeviri ön-yüklemesi korunacak, ancak sayfaya dokunmadan çalışacak.

## Teknik detaylar

`src/lib/i18n/TranslateProvider.tsx`:

- `applyTranslations` içinde `active === "tr"` durumunda: metin düğümlerine ve attribute'lara yazma yapılmayacak; sadece eksik dizeler önbellek ısıtması için toplanacak (yazma yok).
- TR'ye geri dönerken tek seferlik bir "restore" adımı çalışacak (dil değişimi tetiklediğinde), sonrasında MutationObserver TR modunda metinleri geri yazmayacak.
- Dil EN'e geçtiğinde `originalsRef` / `attrOriginalsRef` sıfırlanacak ki güncel Türkçe metinler kaynak olarak alınsın.
- `data-no-translate`, sözlük öncelik sırası (`overridesEn` → `dictionary` → `generatedEn` → önbellek) ve scramble animasyonu aynen korunacak.
