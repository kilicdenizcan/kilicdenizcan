# Timeline Madde Aralığını Artırma — Hakkımızda

## Hedef
Hakkımızda sayfasındaki "Adım adım büyüdük" timeline'ında, her maddenin açıklaması ile bir sonraki maddenin yılı arasındaki dikey boşluğu artırarak maddelerin birbirinden daha net ayrılmasını sağlamak.

## Mevcut durum
`src/routes/hakkimizda.tsx` satır 105:
```
<li className="relative grid gap-1 pb-24 pl-8 last:pb-0 md:grid-cols-[8rem_1fr] md:gap-8">
```
- `pb-24` (6rem) madde arası dikey boşluk.
- Önceki iterasyonlarda `pb-12 → pb-16 → pb-24` olarak artırıldı, kullanıcı yeterli bulmadı.

## Değişiklik
`pb-24` değerini `pb-32` (8rem) değerine çıkar. Bu, her maddenin açıklaması ile bir sonraki yıl arasında belirgin bir nefes alanı yaratır, maddeleri gözle rahat ayırt edilir kılar.

Diğer sınıflar (`gap-1`, `md:gap-8`, `pl-8`) ve `last:pb-0` korunur.

## Dosya
- `src/routes/hakkimizda.tsx` — satır 105, `pb-24` → `pb-32`
