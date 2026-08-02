import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";

export const clinic = {
  name: "Özel Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği",
  shortName: "Yeni Yaşam",
  phoneDisplay: "0553 841 71 73",
  phone: "+905538417173",
  whatsapp: "905538417173",
  whatsappText:
    "Merhaba, Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği'nden randevu almak istiyorum.",
  email: "yeniyasamclinic@gmail.com",
  address: "75. Yıl Mah. Cumhuriyet Cad. No:69 Kat:2, Sultangazi / İstanbul",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Özel+Yeni+Yaşam+Ağız+ve+Diş+Sağlığı+Polikliniği+Sultangazi",
  mapEmbed:
    "https://www.google.com/maps?q=75.%20Y%C4%B1l%20Mahallesi%20Cumhuriyet%20Caddesi%20No%3A69%20Sultangazi%20%C4%B0stanbul&output=embed",
  hours: [
    { day: "Pazartesi – Cumartesi", value: "09:00 – 21:00" },
    { day: "Pazar", value: "Kapalı" },
  ],
} as const;

export const whatsappHref = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
  clinic.whatsappText,
)}`;

/** Verilen başlangıç tarihinden bugüne tamamlanan yıl sayısı. */
export function yearsSince(startYear: number, startMonth = 5) {
  const now = new Date();
  let years = now.getFullYear() - startYear;
  if (now.getMonth() + 1 < startMonth) years -= 1;
  return Math.max(0, years);
}

/** Kliniğin/kurucu hekimin mesleki başlangıcı (Mayıs 1986). */
export const founderCareerStart = { year: 1986, month: 5 } as const;
/** Kliniğin kuruluşu (2009). */
export const clinicFoundedYear = 2009;

export const stats = [
  { value: "4.6", label: "Google puanı", detail: "görüşleriniz bizim için değerli." },
  {
    value: `${yearsSince(founderCareerStart.year, founderCareerStart.month)}+`,
    label: "Yıllık deneyim",
    detail: "Sultangazi'de",
  },
  { value: "12.000+", label: "Mutlu hasta", detail: "tedavi tamamlandı" },
  { value: "%100", label: "Sterilizasyon", detail: "tek kullanımlık set" },
];


export type Treatment = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  duration: string;
  sessions: string;
  anesthesia: string;
  benefits: string[];
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const treatments: Treatment[] = [
  {
    slug: "implant",
    title: "Diş İmplantı",
    short: "Eksik dişin yerine, ömür boyu kullanılabilen titanyum kök.",
    summary:
      "İmplant tedavisi, kaybedilen dişin kökünü titanyum bir vida ile yeniden oluşturur. Yeni Yaşam'da her implant planlaması 3B dijital tomografi ve cerrahi rehber ile yapılır; böylece işlem hem daha kısa hem de öngörülebilir olur.",
    duration: "30–60 dakika",
    sessions: "2 seans + iyileşme",
    anesthesia: "Lokal anestezi",
    benefits: [
      "Komşu dişlere dokunulmaz, doğal diş yapısı korunur",
      "Çene kemiği erimesi durdurulur",
      "Doğal dişe en yakın çiğneme gücü",
      "Doğru bakımla ömür boyu kullanım",
    ],
    steps: [
      { title: "Dijital planlama", text: "3B tomografi ile kemik hacmi ölçülür, implant konumu milimetrik planlanır." },
      { title: "Cerrahi uygulama", text: "Lokal anestezi altında, rehber destekli ve ağrısız yerleştirme." },
      { title: "Osseointegrasyon", text: "İmplantın kemikle kaynaşması için 2–3 ay beklenir, geçici diş yapılır." },
      { title: "Üst yapı", text: "Dijital ölçü ile zirkonyum kron hazırlanır ve implanta sabitlenir." },
    ],
    faq: [
      { q: "İmplant tedavisi ağrılı mıdır?", a: "İşlem lokal anestezi altında yapılır ve hasta ağrı hissetmez. Sonrasında hafif hassasiyet 1–2 gün sürebilir." },
      { q: "İmplant ne kadar dayanır?", a: "Düzenli bakım ve altı aylık kontrollerle implantlar ömür boyu kullanılabilir." },
    ],
  },
  {
    slug: "gulus-tasarimi",
    title: "Gülüş Tasarımı",
    short: "Yüz hatlarınıza özel, dijital olarak planlanan doğal gülüş.",
    summary:
      "Gülüş tasarımı yalnızca diş beyazlatmak değildir. Yüz simetriniz, dudak hattınız ve konuşma biçiminiz analiz edilerek size özel bir gülüş kurgulanır; tedaviye başlamadan önce sonucu dijital olarak görürsünüz.",
    duration: "45 dakika analiz",
    sessions: "3–5 seans",
    anesthesia: "Gerektiğinde lokal",
    benefits: [
      "Tedavi öncesi dijital önizleme (mock-up)",
      "Yüz oranlarına uygun doğal görünüm",
      "Minimum diş aşındırması",
      "Uzun ömürlü, leke tutmayan yüzeyler",
    ],
    steps: [
      { title: "Analiz", text: "Fotoğraf, video ve dijital ölçü ile gülüş analizi yapılır." },
      { title: "Dijital tasarım", text: "Yeni gülüşünüz ekranda tasarlanır ve birlikte revize edilir." },
      { title: "Prova", text: "Geçici mock-up ile yeni gülüşünüzü ağzınızda deneyimlersiniz." },
      { title: "Uygulama", text: "Onaylanan tasarım laminate veya zirkonyum ile kalıcı hale getirilir." },
    ],
    faq: [
      { q: "Sonucu önceden görebilir miyim?", a: "Evet. Dijital tasarım ve ağız içi prova ile tedaviye başlamadan sonucu görürsünüz." },
      { q: "Dişlerim çok aşındırılır mı?", a: "Laminate uygulamalarında aşındırma çoğu vakada 0.3–0.5 mm ile sınırlıdır." },
    ],
  },
  {
    slug: "zirkonyum",
    title: "Zirkonyum Kaplama",
    short: "Metal içermeyen, ışığı doğal diş gibi geçiren estetik kron.",
    summary:
      "Zirkonyum kronlar, metal destekli kaplamaların aksine ışığı geçirdiği için doğal diş görünümü verir. Diş eti kenarında gri hat oluşturmaz ve alerjik reaksiyon riski taşımaz.",
    duration: "60 dakika",
    sessions: "2–3 seans",
    anesthesia: "Lokal anestezi",
    benefits: [
      "Doğal ışık geçirgenliği",
      "Diş etinde gri yansıma yapmaz",
      "Yüksek kırılma direnci",
      "Doku dostu, alerji yapmaz",
    ],
    steps: [
      { title: "Hazırlık", text: "Diş minimal düzeyde hazırlanır ve dijital ölçü alınır." },
      { title: "Renk seçimi", text: "Doğal dişlerinizle uyumlu renk gün ışığında belirlenir." },
      { title: "Prova", text: "Alt yapı provası ile uyum kontrol edilir." },
      { title: "Yapıştırma", text: "Kron kalıcı simantasyon ile sabitlenir." },
    ],
    faq: [
      { q: "Zirkonyum sararır mı?", a: "Hayır. Yüzeyi gözeneksiz olduğu için çay, kahve ve sigara lekesi tutmaz." },
      { q: "Ömrü ne kadardır?", a: "Düzenli bakımla 10–15 yıl ve üzeri kullanım sağlanır." },
    ],
  },
  {
    slug: "ortodonti",
    title: "Ortodonti",
    short: "Şeffaf plak ve modern braketlerle konforlu diş düzeltme.",
    summary:
      "Çapraşık dişler yalnızca estetik değil, çiğneme ve diş eti sağlığı sorunudur. Şeffaf plak (aligner) ve estetik braket seçenekleriyle tedavi sürecini günlük hayatınızı aksatmadan tamamlarsınız.",
    duration: "20 dakika kontrol",
    sessions: "6–24 ay",
    anesthesia: "Gerekmez",
    benefits: [
      "Şeffaf plak ile fark edilmeyen tedavi",
      "Dijital simülasyon ile süreç takibi",
      "Daha kolay temizlik, daha sağlıklı diş eti",
      "Çene eklemi üzerindeki yükün dengelenmesi",
    ],
    steps: [
      { title: "Ölçü ve röntgen", text: "Dijital tarama ve sefalometrik analiz yapılır." },
      { title: "Tedavi planı", text: "Diş hareketleri simüle edilir, süre netleştirilir." },
      { title: "Uygulama", text: "Plak seti teslim edilir veya braketler yapıştırılır." },
      { title: "Pekiştirme", text: "Tedavi sonrası retainer ile sonuç kalıcı hale getirilir." },
    ],
    faq: [
      { q: "Şeffaf plak günde kaç saat takılmalı?", a: "Günde en az 20–22 saat takılması tedavi süresinin planlandığı gibi ilerlemesini sağlar." },
      { q: "Yetişkinler ortodonti olabilir mi?", a: "Evet. Diş eti sağlığı uygun olan her yaşta ortodontik tedavi mümkündür." },
    ],
  },
  {
    slug: "cocuk-dis-hekimligi",
    title: "Çocuk Diş Hekimliği",
    short: "Korkusuz ilk deneyim, koruyucu tedavi odaklı yaklaşım.",
    summary:
      "Çocuklarda amacımız tedaviden önce güven kurmaktır. Tanışma seansı, oyunlaştırılmış anlatım ve koruyucu uygulamalarla diş hekimi korkusu oluşmadan sağlıklı alışkanlıklar kazandırırız.",
    duration: "20–40 dakika",
    sessions: "6 ayda bir kontrol",
    anesthesia: "Topikal / lokal",
    benefits: [
      "Tanışma seansı ile korkusuz başlangıç",
      "Fissür örtücü ve flor uygulaması",
      "Süt dişi çürüklerinde erken müdahale",
      "Ebeveyne yönelik bakım eğitimi",
    ],
    steps: [
      { title: "Tanışma", text: "Çocuk kliniği ve ekibi ile tanışır, işlem yapılmaz." },
      { title: "Muayene", text: "Çürük ve gelişim kontrolü oyunlaştırılarak yapılır." },
      { title: "Koruyucu uygulama", text: "Fissür örtücü ve flor ile çürük riski azaltılır." },
      { title: "Takip", text: "6 aylık periyotlarla gelişim izlenir." },
    ],
    faq: [
      { q: "İlk diş hekimi ziyareti ne zaman olmalı?", a: "İlk süt dişi çıktıktan sonra, en geç 1 yaşında ilk kontrol önerilir." },
      { q: "Süt dişi çürüğü tedavi edilmeli mi?", a: "Evet. Süt dişleri kalıcı dişlerin yer tutucusudur ve enfeksiyon kaynağı olabilir." },
    ],
  },
  {
    slug: "kanal-tedavisi",
    title: "Kanal Tedavisi",
    short: "Dişi çekmeden kurtaran, tek seansta biten mikro tedavi.",
    summary:
      "İlerlemiş çürük veya travma sonucu iltihaplanan diş sinirinin temizlenmesi işlemidir. Rotary sistemler ve apeks bulucu cihazlar sayesinde çoğu vaka tek seansta ve ağrısız tamamlanır.",
    duration: "45–90 dakika",
    sessions: "1–2 seans",
    anesthesia: "Lokal anestezi",
    benefits: [
      "Diş çekilmeden korunur",
      "Çoğu vakada tek seans",
      "Dijital apeks ölçümü ile hassas çalışma",
      "Tedavi sonrası ağrı minimumda",
    ],
    steps: [
      { title: "Teşhis", text: "Dijital röntgen ve canlılık testi ile kök durumu belirlenir." },
      { title: "Temizlik", text: "Kanal sistemi rotary eğeler ile şekillendirilir ve dezenfekte edilir." },
      { title: "Dolgu", text: "Kanallar biyouyumlu materyal ile sızdırmaz şekilde doldurulur." },
      { title: "Restorasyon", text: "Diş, dolgu veya kron ile fonksiyona kazandırılır." },
    ],
    faq: [
      { q: "Kanal tedavisi ağrılı mı?", a: "Anestezi altında ağrı hissedilmez. Sonrasındaki hassasiyet birkaç gün içinde geçer." },
      { q: "Kanal tedavili dişe kaplama şart mı?", a: "Arka dişlerde kırılmayı önlemek için kaplama önerilir." },
    ],
  },
  {
    slug: "dis-beyazlatma",
    title: "Diş Beyazlatma",
    short: "Tek seansta, mine yapısına zarar vermeden birkaç ton açılma.",
    summary:
      "Ofis tipi beyazlatma ile tek seansta belirgin sonuç alınır; ev tipi sistemle bu sonuç uzun süre korunur. Uygulama öncesi diş eti koruması ve hassasiyet yönetimi standardımızdır.",
    duration: "45 dakika",
    sessions: "1–2 seans",
    anesthesia: "Gerekmez",
    benefits: [
      "Tek seansta görünür sonuç",
      "Mine yapısına zarar vermeyen jel",
      "Hassasiyet azaltıcı protokol",
      "Ev tipi set ile kalıcılık",
    ],
    steps: [
      { title: "Ön kontrol", text: "Çürük ve diş eti sağlığı değerlendirilir, gerekirse temizlik yapılır." },
      { title: "İzolasyon", text: "Diş eti bariyeri uygulanır." },
      { title: "Uygulama", text: "Beyazlatma jeli ışıkla aktive edilir." },
      { title: "Koruma", text: "Ev tipi set ve beslenme önerileri verilir." },
    ],
    faq: [
      { q: "Beyazlatma dişe zarar verir mi?", a: "Hekim kontrolünde yapılan uygulamalar mine yapısına zarar vermez." },
      { q: "Etkisi ne kadar sürer?", a: "Beslenme ve sigara alışkanlığına bağlı olarak 1–2 yıl korunur." },
    ],
  },
  {
    slug: "dis-temizligi",
    title: "Diş Taşı Temizliği",
    short: "Diş eti sağlığının temeli: ultrasonik temizlik ve parlatma.",
    summary:
      "Diş taşı, diş eti çekilmesi ve diş kaybının en yaygın sebebidir. Ultrasonik temizlik ve air-flow parlatma ile diş yüzeyleri pürüzsüzleştirilir, diş eti kanaması kısa sürede geriler.",
    duration: "30–45 dakika",
    sessions: "6 ayda bir",
    anesthesia: "Gerekmez",
    benefits: [
      "Diş eti kanamasının durması",
      "Ağız kokusunun azalması",
      "Diş yüzeyinde doğal parlaklık",
      "Diş kaybı riskinin azalması",
    ],
    steps: [
      { title: "Muayene", text: "Diş eti cep ölçümleri yapılır." },
      { title: "Ultrasonik temizlik", text: "Diş taşları titreşimle, çizmeden uzaklaştırılır." },
      { title: "Air-flow", text: "Çay, kahve ve sigara lekeleri temizlenir." },
      { title: "Parlatma", text: "Yüzey cilalanarak yeni birikim geciktirilir." },
    ],
    faq: [
      { q: "Diş taşı temizliği dişleri aşındırır mı?", a: "Hayır. Ultrasonik uçlar yalnızca taşa etki eder, mineyi aşındırmaz." },
      { q: "Ne sıklıkla yaptırmalıyım?", a: "Genel öneri 6 ayda birdir; sigara kullananlarda daha sık olabilir." },
    ],
  },
  {
    slug: "yirmilik-dis",
    title: "20'lik Diş Cerrahisi",
    short: "Gömülü dişlerde planlı, hızlı ve konforlu cerrahi.",
    summary:
      "Gömülü 20'lik dişler ağrı, sıkışma ve çapraşıklığa yol açabilir. 3B tomografi ile sinir komşuluğu değerlendirildikten sonra cerrahi işlem kısa sürede ve konforlu şekilde tamamlanır.",
    duration: "20–40 dakika",
    sessions: "Tek seans",
    anesthesia: "Lokal anestezi",
    benefits: [
      "3B tomografi ile güvenli planlama",
      "Kısa işlem süresi",
      "Dikiş ve iyileşme protokolü",
      "Sonrası ağrı yönetimi desteği",
    ],
    steps: [
      { title: "Görüntüleme", text: "Tomografi ile diş ve sinir ilişkisi incelenir." },
      { title: "Cerrahi", text: "Lokal anestezi altında diş çıkarılır." },
      { title: "Dikiş", text: "Bölge kapatılır, iyileşme hızlandırılır." },
      { title: "Kontrol", text: "7 gün sonra dikiş alınır ve iyileşme değerlendirilir." },
    ],
    faq: [
      { q: "Yüzüm şişer mi?", a: "İlk 48 saatte hafif ödem olabilir; soğuk uygulama ile hızla geriler." },
      { q: "Her 20'lik diş çekilmeli mi?", a: "Hayır. Ağız içinde doğru konumda ve temizlenebilen dişler korunur." },
    ],
  },
  {
    slug: "dis-eti-tedavisi",
    title: "Diş Eti Tedavisi",
    short: "Kanayan ve çekilen diş etleri için periodontal bakım.",
    summary:
      "Diş eti hastalıkları, diş kaybının en sık nedenidir ve çoğu zaman ağrısız ilerler. Yeni Yaşam'da diş eti cep ölçümleri, detartraj ve küretaj protokolü ile iltihap kontrol altına alınır; ileri vakalarda cerrahi destek planlanır.",
    duration: "45–60 dakika",
    sessions: "1–4 seans",
    anesthesia: "Gerektiğinde lokal anestezi",
    benefits: [
      "Diş eti kanaması ve iltihabın kontrolü",
      "Diş eti çekilmesinin yavaşlatılması",
      "Ağız kokusunun azalması",
      "Dişlerin uzun süre korunması",
    ],
    steps: [
      { title: "Periodontal muayene", text: "Diş eti cep derinlikleri ölçülür, röntgen ile kemik seviyesi değerlendirilir." },
      { title: "Detartraj", text: "Diş taşı ve plak tüm yüzeylerden uzaklaştırılır." },
      { title: "Küretaj", text: "Diş eti cebi içindeki iltihaplı doku lokal anestezi altında temizlenir." },
      { title: "Kontrol", text: "4–6 hafta sonra iyileşme değerlendirilir ve bakım planı verilir." },
    ],
    faq: [
      { q: "Diş eti tedavisi ağrılı mıdır?", a: "Yüzeyel temizlik ağrısızdır; derin küretaj işlemlerinde lokal anestezi uygulanır." },
      { q: "Çekilen diş eti geri gelir mi?", a: "Çekilme kendiliğinden geri gelmez, ancak tedavi ile ilerlemesi durdurulur; ileri vakalarda greft uygulanabilir." },
    ],
  },
  {
    slug: "dolgu",
    title: "Dolgu",
    short: "Çürüyen dişte doku kaybını estetik kompozit ile onarma.",
    summary:
      "Dolgu tedavisi, çürük nedeniyle kaybedilen diş dokusunu diş rengindeki kompozit malzemeyle yeniden oluşturur. Erken müdahale ile kanal tedavisi ihtiyacı büyük ölçüde önlenir; işlem tek seansta tamamlanır.",
    duration: "20–40 dakika",
    sessions: "Tek seans",
    anesthesia: "Lokal anestezi",
    benefits: [
      "Diş rengiyle birebir uyum",
      "Tek seansta tamamlanma",
      "Sağlam dokunun korunması",
      "Kanal tedavisi riskinin azalması",
    ],
    steps: [
      { title: "Muayene", text: "Çürüğün derinliği klinik ve radyolojik olarak belirlenir." },
      { title: "Temizleme", text: "Çürük doku uzaklaştırılır, sağlam doku korunur." },
      { title: "Uygulama", text: "Kompozit tabakalar halinde yerleştirilip ışıkla sertleştirilir." },
      { title: "Cila", text: "Kapanış kontrol edilir, yüzey parlatılır." },
    ],
    faq: [
      { q: "Dolgu ne kadar dayanır?", a: "Ağız bakımı ve kapanışa bağlı olarak ortalama 5–10 yıl kullanılabilir." },
      { q: "Dolgudan sonra ne zaman yemek yiyebilirim?", a: "Kompozit dolgular anında sertleşir; anestezi etkisi geçtikten sonra yiyebilirsiniz." },
    ],
  },
];

export const doctors = [
  {
    name: "Dt. Musa Kılıç",
    role: "Kurucu Hekim",
    image: doctor1,
    careerStart: founderCareerStart,
    experience: `${yearsSince(founderCareerStart.year, founderCareerStart.month)} Yıl`,
    languages: "Türkçe",
    bio: "1986 yılında İstanbul Üniversitesi - Çapa'dan mezun oldu. Cerrahi rehber destekli implantoloji ve ileri kemik greftleme uygulamaları üzerine yurt içi ve yurt dışında eğitimler aldı. Bugüne kadar binlerce hastayı tedaviye kavuşturmuş deneyimli hekimimize kendinizi güvenle emanet edebilirsiniz.",
    focus: ["İmplant cerrahisi", "Kemik greftleme", "Protez planlama"],
  },
  {
    name: "Dt. Burçe Nur Yılmaz",
    role: "Ortodonti",
    image: doctor2,
    careerStart: { year: 2014, month: 5 },
    experience: `${yearsSince(2014, 5)} yıl klinik deneyim`,
    languages: "Türkçe, İngilizce, Almanca",
    bio: "Dijital gülüş tasarımı ve laminate uygulamaları üzerine uzmanlaştı. Tedavi öncesi dijital önizleme protokolünü kliniğe kazandırdı.",
    focus: ["Gülüş tasarımı", "Laminate veneer", "Zirkonyum"],
  },
  {
    name: "Dr. Dt. Emre Demir",
    role: "Ortodonti Uzmanı",
    image: doctor3,
    experience: "10 yıl klinik deneyim",
    languages: "Türkçe, İngilizce",
    bio: "Şeffaf plak tedavileri ve erken dönem çene gelişimi yönlendirmesi üzerine çalışıyor. Yetişkin ortodontisinde görünmez tedavi seçeneklerine odaklanıyor.",
    focus: ["Şeffaf plak", "Sabit ortodonti", "Çocuk ortodontisi"],
  },
];

export type Review = {
  name: string;
  text: string;
  date: string;
  rating: number;
};

/**
 * Google işletme profilinden alınan hasta yorumları.
 * Yeni yorum eklemek için buraya bir satır ekleyin.
 * Sitede yalnızca rating >= 4 olan ve metin içeren yorumlar gösterilir.
 */
export const reviews: Review[] = [
  {
    name: "Talha Gurle",
    text: "Güler yüzlü bir yaklaşım, herkes oldukça ilgiliydi. Hem bilgilendirme hem de titiz çalışması sayesinde güvene bilirsiniz. Kesinlikle tavsiye ederim.",
    date: "10 ay önce",
    rating: 5,
  },
  {
    name: "Cumali Türkmenoğlu",
    text: "En iyisi",
    date: "bir yıl önce",
    rating: 5,
  },
  {
    name: "Berivan Ayazzz",
    text: "Kanal tedavi ve yirmilik dişim için gitmiştim. Çok güleryüzlü doktorlarımız ve oradaki asistanlar. Normalde diş doktorundan çok korkan birisiydim; herkes dişini çekince çok ağrıyacak dediler, inanın hissetmedim. Herkese çok teşekkür ederim.",
    date: "bir yıl önce",
    rating: 5,
  },
  {
    name: "Özge Yilmaz",
    text: "Özellikle Musa Hoca olmak üzere tüm hekimler başarılı.",
    date: "bir yıl önce",
    rating: 5,
  },
];

/** Sitede gösterilen yorumlar: 4 yıldız ve üzeri, metin içerenler. */
export const visibleReviews: Review[] = reviews.filter(
  (r) => r.rating >= 4 && r.text.trim().length > 0,
);

export const faqs = [
  {
    q: "Randevu almadan gelebilir miyim?",
    a: "Acil durumlarda aynı gün içinde sizi değerlendirmeye çalışıyoruz. Ancak bekleme süresi olmaması için WhatsApp veya telefon üzerinden randevu almanızı öneriyoruz.",
  },
  {
    q: "İlk muayene ücretli mi?",
    a: "İlk muayene ve tedavi planlaması ücretsizdir. Gerekli görülen dijital röntgen de muayeneye dahildir.",
  },
  {
    q: "Anlaşmalı olduğunuz kurumlar var mı?",
    a: "Özel sağlık sigortaları ve kurumsal anlaşmalarımız bulunmaktadır. Detaylar için kliniğimizi arayabilirsiniz.",
  },
  {
    q: "Taksit imkânı sunuyor musunuz?",
    a: "Tüm kredi kartlarına vade farksız taksit seçenekleri ve tedaviye özel ödeme planları sunuyoruz.",
  },
  {
    q: "Sterilizasyon süreciniz nasıl işliyor?",
    a: "Tüm aletler B sınıfı otoklav ile steril edilir, poşetlenerek saklanır ve hasta önünde açılır. Tek kullanımlık malzemeler her hasta sonrası imha edilir.",
  },
  {
    q: "Şehir dışından geliyorum, tedavi kaç günde biter?",
    a: "Şehir dışından, yurtdışından gelen hastalarımıza süreç şeffaf şekilde anlatılmaktadır. Bütün tedavilerimizi acele etmeden, etik deontolojik kurallar çerçevesinde tamamlarız.",
  },
  {
    q: "Diş hekimi korkum var, ne yapabilirim?",
    a: "Bütün hastalarımıza tedavi süreçlerini şeffaf bir şekilde aktarıyoruz. Sürprizlerle karşılaşmayacaksınız. Sağlıkta temel unsurlardan birinin güven olduğunun farkındayız. Korkularınızı aşabileceğiniz, güvene dayalı bir zemin oluşturuyoruz.",
  },
];

export const posts = [
  {
    slug: "implant-tedavisi-rehberi",
    title: "İmplant tedavisi hakkında bilmeniz gereken 7 şey",
    excerpt:
      "İmplant kimlere uygulanır, süreç ne kadar sürer, ağrılı mıdır? Hekimlerimizin en sık aldığı soruları yanıtladık.",
    date: "12 Mart 2025",
    read: "6 dk okuma",
    category: "İmplantoloji",
  },
  {
    slug: "gulus-tasarimi-nasil-planlanir",
    title: "Gülüş tasarımı nasıl planlanır?",
    excerpt:
      "Dijital gülüş tasarımında yüz analizi, mock-up provası ve materyal seçimi adım adım nasıl ilerler?",
    date: "28 Şubat 2025",
    read: "5 dk okuma",
    category: "Estetik",
  },
  {
    slug: "cocuklarda-dis-hekimi-korkusu",
    title: "Çocuklarda diş hekimi korkusu nasıl önlenir?",
    excerpt:
      "İlk ziyaretin zamanlaması ve ebeveynlerin kullandığı dil, çocuğun ömür boyu diş sağlığını belirliyor.",
    date: "9 Şubat 2025",
    read: "4 dk okuma",
    category: "Pedodonti",
  },
  {
    slug: "dis-eti-kanamasi",
    title: "Diş eti kanaması neden olur?",
    excerpt:
      "Fırçalarken görülen kanama masum değildir. Erken dönemde müdahale, diş kaybını önlemenin en etkili yolu.",
    date: "21 Ocak 2025",
    read: "4 dk okuma",
    category: "Periodontoloji",
  },
];
