/**
 * English-only overrides.
 * Key = exact Turkish source string, value = the final English text.
 *
 * Highest priority: entries here win over `dictionary` and over the
 * AI translation cache. Editing a value here changes ONLY the English
 * version of the site; the Turkish content is untouched.
 */
export const overridesEn: Record<string, string> = {
  Hekimlerimiz: "Doctors",

  // --- Hekim sayfası: etiketler ---
  MEZUNİYET: "EDUCATION",
  Diller: "Languages",
  Türkçe: "Turkish",
  "Türkçe, İngilizce": "Turkish, English",

  // --- Üniversiteler ---
  "İstanbul Üniversitesi": "Istanbul University",
  "Gazi Üniversitesi": "Gazi University",
  "İzmir Katip Çelebi Üniversitesi": "Izmir Katip Celebi University",
  "Biruni Üniversitesi": "Biruni University",

  // --- Ünvanlar ---
  "Kurucu Hekim - Genel Diş Hekimliği": "Founding Dentist - General Dentistry",
  Ortodonti: "Orthodontics",
  "Genel Diş Hekimliği": "General Dentistry",

  // --- Biyografiler ---
  "1986 yılında İstanbul Üniversitesi - Çapa'dan mezun oldu. İmplantoloji, endodonti gibi birçok tedaviye yönelik çok sayıda eğitimler aldı. 2004-2005 yıllarında eğitmen diş hekimliği kapsamında pilot okul çalışması koordinatörlüğü yapmıştır. 40 yıldır etik-deontolojik kurallarına uygun şekilde hizmet veren hekimimiz \"Sürekli diş hekimi\"  sertifikasına sahip olup kendini sürekli yenilemektedir.":
    "He graduated from Istanbul University - Çapa in 1986. He completed extensive training in many fields, including implantology and endodontics. Between 2004 and 2005 he coordinated a pilot school programme within the scope of instructor dentistry. Serving in line with ethical and deontological principles for 40 years, he holds the \"Continuous Dentist\" certificate and constantly keeps himself up to date.",
  "Gazi Üniversitesi diş hekimliği fakültesinden mezun oldum. Okan Üniversitesi Ortodonti Ana Bilim Dalı'nda doktora(pHd) yapmaktayım. Ortodontik tedavilerle çocuklarda, gençlerde ve yetişkinlerde dişlerin ve çenelerin konumunu, birbirleriyle olan ilişkisini ve kapanış problemlerini tedavi ediyorum. Mesleki becerilerimi geliştirmek için ortodonti ve diş hekimliği alanındaki güncel gelişmeleri takip ediyorum.":
    "I graduated from the Faculty of Dentistry at Gazi University. I am currently pursuing a PhD at the Department of Orthodontics of Okan University. Through orthodontic treatment I correct the position of teeth and jaws, their relationship with each other and bite problems in children, adolescents and adults. To improve my professional skills I follow current developments in orthodontics and dentistry closely.",
  "İstanbul Üniversitesi - Çapa'dan mezun oldum. Çocuklarla iletişim kurmak ve onları ağız ve diş sağlığı konusunda bilgilendirmek ilgi alanımdır. Endodonti alanında çeşitli kurslara katıldım. Mesleki becerilerimi geliştirmek için diş hekimliği alanındaki güncel gelişmeleri takip ediyorum.":
    "I graduated from Istanbul University - Çapa. Communicating with children and educating them about oral and dental health is a special interest of mine. I have attended various courses in endodontics. To improve my professional skills I follow current developments in dentistry closely.",
  "İzmir Katip Çelebi Üniversitesi’nden mezun oldum. Mezuniyetimden sonra özellikle endodonti alanında çeşitli kurslara katıldım.Mesleğimin güncel gelişmelerini çeşitli seminer ve kongreler ile yakından takip etmekteyim.":
    "I graduated from Izmir Katip Celebi University. After graduating I attended various courses, particularly in endodontics. I follow the latest developments in my profession closely through seminars and congresses.",
  "Biruni Üniversitesi'nden mezun oldum. Kanal tedavisi üzerine ileri seviye kurslar aldım ve pratikte uygulamaktayım . Ön bölge estetik dolgular, kuronlar, köprüler yapmaktan keyif alıyorum.":
    "I graduated from Biruni University. I have taken advanced courses in root canal treatment and apply them in practice. I especially enjoy performing anterior aesthetic fillings, crowns and bridges.",

  // --- Uzmanlık etiketleri ---
  "Koruyucu diş hekimliği": "Preventive dentistry",
  "İmplant-implant üstü uygulamalar": "Implants and implant-supported restorations",
  "Kanal tedavisi": "Root canal treatment",
  "Şeffaf-metal braket tel tedavisi": "Clear and metal bracket treatment",
  "Şeffaf plak tedavisi": "Clear aligner treatment",
  "Ortognatik cerrahi": "Orthognathic surgery",
  "Çene gelişimi ve ortopedik tedaviler": "Jaw development and orthopaedic treatment",
  Myobrace: "Myobrace",
  "Çocuk diş hekimliği": "Pediatric dentistry",
  "Estetik kompozit lamina": "Aesthetic composite veneers",
  "Metal porselen ve zirkonya kuron": "Metal-porcelain and zirconia crowns",
  "Detertraj-Küretaj": "Scaling and curettage",
  "İmplant üstü protez": "Implant-supported prosthesis",
  "Diş beyazlatma": "Teeth whitening",
  "Estetik laminate veneer": "Aesthetic laminate veneers",
  "Zirkonya kuron": "Zirconia crown",
};
