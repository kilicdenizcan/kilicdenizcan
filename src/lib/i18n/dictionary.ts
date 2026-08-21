/**
 * Turkish → English static dictionary (manual translations).
 * Key = exact Turkish source string, value = English translation.
 * Static labels used across components/routes live here. Dynamic data
 * (treatments, doctors, faqs, reviews) is translated on-the-fly by the
 * translate service with AI fallback + DB cache.
 */
export const dictionary: Record<string, string> = {
  // Brand
  "AĞIZ VE DİŞ SAĞLIĞI POLİKLİNİĞİ": "ORAL & DENTAL HEALTH CLINIC",
  "Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği": "Yeni Yaşam Oral & Dental Health Clinic",

  // Nav
  "Ana Sayfa": "Home",
  Klinik: "Clinic",
  "Hekimlerimiz": "Our Doctors",
  Tedaviler: "Treatments",
  Blog: "Blog",
  "S.S.S.": "FAQ",
  İletişim: "Contact",
  "Randevu Al": "Book Appointment",
  "Menüyü aç": "Open menu",
  "Menüyü kapat": "Close menu",

  // CTA band
  "Gülümsemeniz için doğru zaman, şimdi.": "The right time for your smile is now.",
  "Ücretsiz muayene ve tedavi planlaması için randevunuzu oluşturun. Kısaca yazın; yetkililerimiz size özel yanıt versin.":
    "Book an appointment for a free examination and treatment plan. Write us briefly; our team will give you a personalised answer.",
  "WhatsApp Randevu": "WhatsApp Appointment",
  "Online Randevu Formu": "Online Appointment Form",
  "WhatsApp ile yazın": "Write us on WhatsApp",

  // Footer
  "Sultangazi'de ağız ve diş sağlığında dijital planlama, etik süreç yönetimi, sterilizasyon standardı ve estetik hekimliği bir araya getiren poliklinik.":
    "A clinic in Sultangazi combining digital planning, ethical process management, sterilisation standards and aesthetic dentistry in oral and dental health.",
  Hakkımızda: "About Us",
  "Sık Sorulan Sorular": "Frequently Asked Questions",
  "Online Randevu": "Online Appointment",
  "Pazartesi – Cumartesi": "Monday – Saturday",


  // PageHero (shared static labels)
  "Randevu saati, ücret ve süre bilgisini hemen alın.":
    "Get your appointment time, price and duration right away.",

  // randevu (appointment)
  "Randevu Oluştur": "Book Appointment",
  "Tercih edilen doktor": "Preferred doctor",
  "Tercih edilen saat": "Preferred time",
  "Tedavi türü": "Treatment type",
  "Tedavi seçin": "Select a treatment",
  "Hekim seçin": "Select a doctor",
  "Öncelik tanımlamayın": "No preference",
  "Açıklama": "Message",
  "Ad Soyad": "Full name",
  "Telefon": "Phone",
  "Tarih seçin": "Select a date",
  "Seans süresi": "Session duration",
  "Genel": "General",
  "Randevu Talebi": "Appointment Request",
  "Gönder": "Submit",
  "Hekimimiz belirlenmedi.": "No doctor selected.",

  // doktorlar
  "Randevu al": "Book now",

  // iletişim / iletişim
  "Bize ulaşın": "Contact us",
  "Adres": "Address",
  "Çalışma Saatleri": "Opening Hours",
  "Kapalı": "Closed",


  // randevu page hero
  "Size en uygun zamanı birlikte belirleyelim.": "Let's find the best time for you together.",
  "Tedavi ihtiyacınızı kısaca yazın; uzman ekibimiz sizinle iletişime geçsin.":
    "Briefly describe your treatment need and our expert team will get in touch.",

  // WhatsApp floating
  "Bize yazın": "Message us",

  // common words
  "Yıllık deneyim": "Years of experience",
  "Mutlu hasta": "Happy patients",
  "Sterilizasyon": "Sterilisation",
  "Google puanı": "Google rating",
};
