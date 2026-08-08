# Randevu Sayfası Select Menüleri — Tasarım İyileştirme Planı

## Hedef
Randevu al formundaki açılır menüleri (Tedavi, Tercih edilen hekim, Tercih edilen saat) native HTML `<select>` görünümünden kurtarıp; site genelindeki premium, yuvarlak hatlı, soft-gölge, minimal ama detaylı tasarım diline uygun hale getirmek. Kullanıcı "basit" durduğunu belirttiği için menülerin hem kapalı hem açık halleri daha yumuşak, özel ve markaya uygun olmalı.

## Mevcut Durum
- `src/routes/randevu.tsx` içinde 3 adet native `<select>` kullanılıyor.
- Temel stil: `rounded-xl border border-border bg-background px-4 py-3.5 text-sm`.
- Açılan liste tarayıcının kendi native menüsü: köşeli hatlar, mavi seçili arka plan (ekran görüntüsündeki gibi), markaya uygun olmayan vurgu rengi.

## Yapılacaklar

1. **Component Seçimi**
   - shadcn/ui `Select` component'ini kullan. Radix UI tabanlı olduğu için açılan menüyü tamamen özelleştirebiliriz ve site tasarımına uygun stiller verebiliriz.
   - Eğer projede kurulu değilse `npx shadcn add select` ile ekle.

2. **Tasarım Kararları**
   - **Kapalı durum (Trigger):** Daha yumuşak, form kartına uygun `rounded-2xl` veya `rounded-[1.5rem]` köşeler. Hafif yükseklik (`h-12` / `py-3.5`).
   - **Renkler:** Arka plan `bg-background`, kenarlık `border-border`, metin `text-foreground`. Hover'da `bg-muted` veya çok hafif `bg-mist` geçişi.
   - **Focus:** `ring-2 ring-aqua/30 ring-offset-2 ring-offset-background` veya `border-aqua` ile markanın su yeşili tonunda nazik bir vurgu.
   - **Ok ikonu:** `ChevronDown` (Lucide), ince stroke (`strokeWidth={1.5}`), `text-muted-foreground`. Açıldığında 180° dönebilir (eğer shadcn Select bu veriyi expose ediyorsa; aksi halde statik kalabilir).
   - **Açık menü (Content):** `rounded-2xl`, `border border-border`, `bg-popover`, `shadow-lift` (soft lift gölge), aynı genişlikte trigger ile hizalı. Küçük bir `padding` (p-1.5) ve seçenekler arası yumuşak geçişler.
   - **Seçenekler (Item):** `rounded-xl`, hover'da `bg-muted`, seçili durumda `bg-navy/10 text-navy` veya `bg-aqua/10 text-aqua` (mavi yerine marka tonları). Varsayılan mavi vurguyu tamamen kaldır.
   - **Boşluk ve tipografi:** Label ile aynı tipografik dil; seçenekler `text-sm` ve `leading-relaxed`.

3. **Form Entegrasyonu**
   - shadcn Select, form submit ile doğrudan `name` değeri göndermez; bu nedenle her Select için gizli `<input type="hidden" name="..." />` veya `value` state'i kullanılarak form verisi korunur.
   - `defaultValue` mantığı (query parametrelerinden gelen `doktor` ve `tedavi` eşleşmeleri) korunur.
   - "Tercih edilen saat" için de başlangıç değeri (`times[0]`) state veya hidden input ile sağlanır.

4. **Değiştirilecek Dosyalar**
   - `src/routes/randevu.tsx`: Üç native `<select>` yerine shadcn `Select` kullanımı.
   - `src/components/ui/select.tsx` (shadcn kurulumu sonrası): Varsayılan stiller yukarıdaki tasarım kararlarına göre override edilir.
   - Gerekirse `src/styles.css`: Select'e özel token veya utility eklenir (örn. select menüsüne özel yumuşak gölge).

5. **Kontrol ve Doğrulama**
   - Build al (`bun run build` veya `lovable-exec test`).
   - `/randevu` sayfasında üç menünün de kapalı ve açık hallerini, hover/focus durumlarını, mobilde dokunma hedef boyutlarını kontrol et.
   - Form gönderildiğinde WhatsApp mesajında doğru tedavi, hekim ve saat bilgisinin geldiğini doğrula.

## Teknik Notlar
- Native `<select>`'in sınırlı stil imkânları nedeniyle sadece CSS ile bu görünümü tamamen markaya uydurmak mümkün değil; bu yüzden shadcn Select geçişi en temiz ve sürdürülebilir çözüm.
- Mevcut `Field` wrapper'ı ve form submit akışı korunur; sadece input/Select kısmı değişir.
- Ekstra bir kütüphane kurulumu gerektirmez; shadcn Select zaten Radix + Tailwind ile çalışır.
