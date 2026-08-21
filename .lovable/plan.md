# Mobilde TR/EN Dil Değiştiriciyi Yerleştirme

## Sorun
Üst bardaki TR/EN dil seçici `hidden sm:flex` ile gizli; mobilde (≥640px altı) hiç görünmüyor. Hamburger menü açıldığında da dil seçici yer almıyor.

## Çözüm
Dil değiştiriciyi mobil hamburger menüsünün içine, en üste yerleştir. Menü açıldığında kullanıcı dil seçeneklerini görebilir ve değiştirebilir.

### Değişiklik: `src/components/site/Navbar.tsx`
1. Mobil menü panelinin (`motion.div` içindeki `div`) en üstüne, menü linklerinden önce, mevcut TR/EN butonlarıyla aynı görsel stilde bir dil seçici satırı ekle.
2. Masaüstündeki (`sm:flex`) dil seçici olduğu yerde kalsın — yalnızca menü içindeki versiyon `lg:hidden` ile mobilde gösterilsin.
3. Menü kapanışında (`onClick={() => setOpen(false)`) dil butonları menüyü kapatmasın; yalnızca dili değiştirsin.

## Görsel
Mobil menü açılınca:
```
┌─────────────────────────┐
│  [TR] [EN]     ← üstte  │
│ ─────────────────────── │
│ Ana Sayfa               │
│ Klinik                  │
│ ...                     │
│ [ Randevu Al ]          │
└─────────────────────────┘
```

## Notlar
- Stiller masaüstündeki seçiciyle birebir tutarlı olacak (yuvarlak pill, navy aktif durum).
- `data-no-translate` attribute gerekmez; "TR"/"EN" sabit kısa kodlardır.
- Bu değişiklik yalnızca Navbar'ı etkiler; başka dosyaya dokunulmaz.
