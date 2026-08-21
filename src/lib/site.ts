import doctor1 from "@/assets/musa-kilic.png";
import doctor2 from "@/assets/bilge-coskun.png";
import doctor3 from "@/assets/zehra-isik.png";
import doctor4 from "@/assets/beyza-oglakci.png";


export const clinic = {
  name: "Özel Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği",
  shortName: "Yeni Yaşam",
  phoneDisplay: "0553 841 71 73",
  phone: "+905538417173",
  phone2Display: "0212 536 49 56",
  phone2: "+902125364956",
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

/** Belirli bir tedavi başlığı için WhatsApp randevu bağlantısı üretir. */
export function whatsappHrefWithTreatment(treatmentTitle: string) {
  const text = `Merhaba, Yeni Yaşam Ağız ve Diş Sağlığı Polikliniği'nden ${treatmentTitle} tedavisi hakkında bilgi almak ve randevu almak istiyorum.`;
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(text)}`;
}

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
  { value: "10.000+", label: "Mutlu hasta", detail: "tedavi tamamlandı" },
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
  branchStep?: {
    afterStep: number;
    title: string;
    options: { title: string; text: string }[];
  };
  faq: { q: string; a: string }[];
};

export const treatments: Treatment[] = [
  {
    slug: "koruyucu-dis-hekimligi",
    title: "Koruyucu Diş Hekimliği",
    short: "Çürük oluşmadan önce koruyucu önlemlerle sağlıklı gülüşler.",
    summary:
      "Kliniğimizde koruyucu diş hekimliği sadece diş taşı temizliği değil, bütüncül bir sağlık yaklaşımıdır. Diş taşı temizliği ve her kapsamlı işlem yaptıran hastaya ücretsiz ağız ve diş sağlığı eğitimi verilir; çocuk hastalara bakteri plağı boyaması yapılır, diş fırçalama eğitimi verilip fırçalama takvimi oluşturulur. Çocuk dişlerine flor uygulaması yapılır; genç ve süt dişlerini çürüğe karşı korumak için fissür örtücü uygulaması gerçekleştirilir.",
    duration: "",
    sessions: "",
    anesthesia: "",
    benefits: [
      "Çürük oluşmadan önce erken müdahale",
      "Çocuklarda doğru fırçalama alışkanlığı",
      "Süt ve genç dişlerin korunması",
      "Bütüncül ağız sağlığı eğitimi",
    ],
    steps: [
      { title: "Risk değerlendirmesi", text: "Ağız içi muayene, çürük riski ve diş eti sağlığı değerlendirilir." },
      { title: "Profesyonel temizlik", text: "Ultrasonik temizlik ve parlatma ile diş taşları ve plak uzaklaştırılır." },
      { title: "Koruyucu uygulamalar", text: "Gerektiğinde flor ve fissür örtücü uygulaması yapılır." },
      { title: "Eğitim ve takvim", text: "Hasta ve ebeveyne bireysel fırçalama tekniği ve takvimi önerilir." },
    ],
    faq: [
      { q: "Koruyucu işlemler ne kadar gerekli?", a: "Çürük ve diş eti hastalıklarının büyük bölümü önlenebilir. Erken yaşta başlayan koruyucu uygulamalar, ileride daha invaziv tedavilere ihtiyacı ciddi ölçüde azaltır." },
      { q: "Kaç yaşında başlanmalı?", a: "İlk diş hekimi ziyareti ilk süt dişi çıktıktan sonra, en geç 1 yaşında yapılmalıdır. Fissür örtücü ve flor uygulamaları genellikle süt ve kalıcı dişlerin çıkışı tamamlandığı dönemlerde planlanır." },
    ],
  },
  {
    slug: "implant",
    title: "Diş İmplantı",
    short: "Eksik dişin yerine, ömür boyu kullanılabilen titanyum kök.",
    summary:
      "İmplant tedavisi, kaybedilen dişin kökünü titanyum bir vida ile yeniden oluşturur. Yeni Yaşam'da her implant planlaması panoramik röntgen, RVG ve 3B dijital tomografi \u00a0ile yapılır; böylece işlem hem daha kısa hem de öngörülebilir olur.\n",
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
      { title: "Cerrahi uygulama", text: "Lokal anestezi altında ağrısız yerleştirme." },
      { title: "Üst yapı", text: "Dijital ölçü ile zirkonyum veya metal porselen hazırlanır ve implanta sabitlenir." },
    ],
    branchStep: {
      afterStep: 2,
      title: "Uygulama yöntemi",
      options: [
        { title: "Osseointegrasyon (gerek varsa)", text: "İmplantın kemikle kaynaşması için 2–3 ay beklenir." },
        { title: "İmmediat uygulama-yükleme", text: "Diş çekildiği gibi implant yerleştirilir ve diş yapılır." },
        {
          title: "Fast&Fixed İmplant",
          text: "Bütün dişlerin çekilmesi sonucunda uygulanan metottur. Dişler çekildikten sonra implantlar hemen yerleştirilir ve üzerine diş yapılır.",
        },
      ],
    },
    faq: [
      { q: "İmplant tedavisi ağrılı mıdır?", a: "İşlem lokal anestezi altında yapılır ve hasta ağrı hissetmez. Sonrasında hafif hassasiyet 1–2 gün sürebilir." },
      { q: "İmplant ne kadar dayanır?", a: "İmplant ömründe kesinlik kavramı yoktur. Düzenli bakım ve altı aylık kontroller implantların ömrünü ciddi oranda uzatır.\u00a0" },
    ],
  },
  {
    slug: "gulus-tasarimi",
    title: "Gülüş Tasarımı",
    short: "Yüz hatlarınıza özel, dijital olarak planlanan doğal gülüş.",
    summary:
      "Gülüş tasarımı yalnızca diş beyazlatmak değildir. Yüz simetriniz, dudak hattınız ve konuşma biçiminiz analiz edilerek size özel bir gülüş kurgulanır; Diode Laser ile Gingivoplasti (diş eti estetiği) ve Gingivektomi (hastalıklı diş eti operasyonu) yapılarak gülüş tasarımı uygulanır.\u00a0",
    duration: "Değişkenlik gösterir",
    sessions: "Değişkenlik gösterir",
    anesthesia: "Gerektiğinde lokal",
    benefits: [
      "Kalıcı tedavi öncesi önizleme\u00a0",
      "Yüz oranlarına uygun doğal görünüm",
      "Minimum diş aşındırması",
      "Uzun ömürlü, leke tutmayan yüzeyler",
    ],
    steps: [
      { title: "Analiz", text: "Fotoğraf, video ve dijital ölçü ile gülüş analizi yapılır." },
      { title: "Özel tasarım", text: "Yeni gülüşünüz tasarlanır ve birlikte revize edilir." },
      { title: "Prova", text: "Geçici mock-up veya geçici diş ile yeni gülüşünüzü ağzınızda deneyimlersiniz." },
      { title: "Uygulama", text: "Onaylanan tasarım laminate, zirkonyum veya metal destekli porselen ile kalıcı hale getirilir." },
    ],
    faq: [
      { q: "Sonucu önceden görebilir miyim?", a: "Evet. Dijital tasarım ve ağız içi prova ile tedaviye başlamadan olası sonucu görürsünüz." },
      { q: "Dişlerim çok aşındırılır mı?", a: "Laminate uygulamalarında aşındırma çoğu vakada 0.3–0.5 mm ile sınırlıdır." },
    ],
  },
  {
    slug: "zirkonyum",
    title: "Estetik Uygulamalar",
    short: "Metal içermeyen, ışığı doğal diş gibi geçiren estetik kron.",
    summary:
      "Zirkonyum, e-max, empress kronlar ve lamine uygulamaları.\u00a0",
    duration: "Değişkenlik gösterir",
    sessions: "3-4 seans",
    anesthesia: "Lokal anestezi",
    benefits: [
      "Doğal ışık geçirgenliği",
      "Diş etinde gri yansıma yapmaz",
      "Yüksek kırılma direnci",
      "Doku dostu, alerji yapmaz",
    ],
    steps: [
      { title: "Hazırlık", text: "Diş minimal düzeyde hazırlanır. Akabinde dijital veya konvensiyonel ölçü alınır." },
      { title: "Renk seçimi", text: "Doğal dişlerinizle uyumlu renk gün ışığında belirlenir." },
      { title: "Prova", text: "Alt ve üst yapı provaları ile uyum kontrol edilir.\u00a0" },
      { title: "Yapıştırma", text: "Yapılan iş uygun malzeme ile simante edilerek sabitlenir." },
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
    duration: "Ortalama 20 dakika kontrol",
    sessions: "Değişkenlik gösterir",
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
      { q: "Yetişkinler ortodonti olabilir mi?", a: "Evet. Diş eti sağlığı uygun olan her hasta için ortodontik tedavi mümkündür." },
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
      { title: "Tanışma", text: "Çocuk hastamız klinik ekibi ile tanışır, güven ortamı sağlanır." },
      { title: "Muayene", text: "Çürük ve gelişim kontrolü oyunlaştırılarak yapılır." },
      { title: "Tedavi", text: "Gerekli görülen tedaviler yapılır." },
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
    sessions: "2-3 seans",
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
      { q: "Kanal tedavili dişe kaplama şart mı?", a: "Doku desteği zayıf dişlerde kırılmayı önlemek için kaplama önerilir." },
    ],
  },
  {
    slug: "dis-beyazlatma",
    title: "Diş Beyazlatma",
    short: "Tek seansta, mine yapısına zarar vermeden birkaç ton açılma.",
    summary:
      "Ofis tipi beyazlatma ile tek seansta belirgin sonuç alınır; ev tipi sistemle bu sonuç uzun süre korunur. Uygulama öncesi diş eti koruması ve hassasiyet yönetimi standardımızdır.",
    duration: "1 saat",
    sessions: "1–2 seans",
    anesthesia: "Gerekmez",
    benefits: [
      "Tek seansta görünür sonuç",
      "Mine yapısına zarar vermeyen jel",
      "Hassasiyet azaltıcı protokol",
      
    ],
    steps: [
      { title: "Ön kontrol", text: "Çürük ve diş eti sağlığı değerlendirilir, gerekirse temizlik yapılır." },
      { title: "İzolasyon", text: "Diş eti bariyeri uygulanır." },
      { title: "Uygulama", text: "Beyazlatma jeli ışıkla aktive edilir." },
      { title: "Koruma", text: "Beslenme önerileri ve ağız bakımı eğitimi verilerek sürecin korunması sağlanır." },
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
      { title: "Ultrasonik temizlik", text: "Diş taşları, titreşim vasıtasıyla dişe zarar vermeden uzaklaştırılır." },
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
      "Gömülü 20'lik dişler ağrı, sıkışma ve çapraşıklığa yol açabilir. Panoramik röntgen (gerekli durumlarda 3B tomografi) ile sinir komşuluğu değerlendirildikten sonra cerrahi işlem kısa sürede ve konforlu şekilde tamamlanır.",
    duration: "20–40 dakika",
    sessions: "Tek seans",
    anesthesia: "Lokal anestezi",
    benefits: [
      "Panoramik röntgen / 3B tomografi ile güvenli planlama",
      "Tek seansta tedavi",
      "Dikiş ve iyileşme protokolü",
      "Sonrası ağrı yönetimi desteği",
    ],
    steps: [
      { title: "Görüntüleme", text: "Röntgen veya tomografi ile diş ve sinir ilişkisi incelenir." },
      { title: "Cerrahi", text: "Lokal anestezi altında diş çıkarılır." },
      { title: "Dikiş", text: "Bölge kapatılır, iyileşme hızlandırılır." },
      { title: "Kontrol", text: "10 gün sonra dikiş alınır ve iyileşme değerlendirilir." },
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
      "Diş eti hastalıkları, diş kaybının en sık nedenidir ve çoğu zaman ağrısız ilerler. Diş eti şekillendirmeleri yapılarak estetik görünüm sağlanır. Diş eti çekilmesi vakalarında greft uygulamasıyla diş eti görünümü düzeltilir.\u00a0",
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
      { title: "Diğer tedaviler", text: "Diş eti şekillendirmesi ve greft uygulaması yapılır." },
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
      "Dolgu tedavisi, çürük nedeniyle kaybedilen diş dokusunu diş rengindeki kompozit veya porselen malzemeyle yeniden oluşturur. Erken müdahale ile kanal tedavisi ihtiyacı büyük ölçüde önlenir; işlem tek seansta tamamlanır.",
    duration: "20–40 dakika",
    sessions: "Tek seans (Inley \u00a02 seans)",
    anesthesia: "Lokal anestezi",
    benefits: [
      "Diş rengiyle uyumlu",
      "Inley harici tek seansta tamamlanma",
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

export type Doctor = {
  name: string;
  role: string;
  /** Gerçek portre geldiğinde doldurulur; boşsa gri yer tutucu gösterilir. */
  image?: string;
  careerStart: { year: number; month: number };
  experience: string;
  languages: string;
  bio: string;
  focus: string[];
};

export const doctors: Doctor[] = [
  {
    name: "Dt. Musa Kılıç",
    role: "Kurucu Hekim - Genel Diş Hekimliği",
    image: doctor1,
    careerStart: founderCareerStart,
    experience: "40 Yıl deneyim",
    languages: "Türkçe",
    bio: "1986 yılında İstanbul Üniversitesi - Çapa'dan mezun oldu. Cerrahi rehber destekli implantoloji ve ileri kemik greftleme uygulamaları üzerine yurt içi ve yurt dışında eğitimler aldı. Bugüne kadar binlerce hastayı tedaviye kavuşturmuş deneyimli hekimimize kendinizi güvenle emanet edebilirsiniz.",
    focus: ["İmplant cerrahisi", "Kemik greftleme", "Protez planlama"],
  },
  {
    name: "Dt. Burçe Nur Yılmaz",
    role: "Ortodonti",
    careerStart: { year: 2014, month: 5 },
    experience: "Gazi Üniversitesi",
    languages: "Türkçe, İngilizce",
    bio: "...",
    focus: ["Braket tel tedavisi", "Şeffaf plak tedavisi", "Ortodonti uygulamaları"],
  },
  {
    name: "Dt. Bilge Coşkun",
    role: "Genel Diş Hekimliği",
    image: doctor2,
    careerStart: { year: 2015, month: 6 },
    experience: "İstanbul Üniversitesi ",
    languages: "Türkçe, İngilizce",
    bio: "İstanbul Üniversitesi - Çapa'dan mezun oldum. Çocuklarla iletişim kurmak ve onları ağız ve diş sağlığı konusunda bilgilendirmek ilgi alanımdır. Endodonti alanında çeşitli kurslara katıldım. Mesleki becerilerimi geliştirmek için diş hekimliği alanındaki güncel gelişmeleri takip ediyorum.\n",
    focus: ["Çocuk diş hekimliği", "Estetik kompozit lamina", "Metal porselen ve zirkonya kuron"],
  },
  {
    name: "Dt. Zehra Işık",
    role: "Genel Diş Hekimliği",
    image: doctor3,
    careerStart: { year: 2017, month: 6 },
    experience: "İzmir Katip Çelebi Üniversitesi",
    languages: "Türkçe, İngilizce",
    bio: "İzmir Katip Çelebi Üniversitesi’nden mezun oldum. Mezuniyetimden sonra özellikle endodonti alanında çeşitli kurslara katıldım.Mesleğimin güncel gelişmelerini çeşitli seminer ve kongreler ile yakından takip etmekteyim.",
    focus: ["Detertraj-Küretaj", "Kanal tedavisi", "Çocuk diş hekimliği", "Metal porselen ve zirkonya kuron"],
  },
  {
    name: "Dt. Beyza Oğlakçı",
    role: "Genel Diş Hekimliği",
    image: doctor4,
    careerStart: { year: 2016, month: 9 },
    experience: "Biruni Üniversitesi",
    languages: "Türkçe, İngilizce",
    bio: "Biruni Üniversitesi'nden mezun oldum. Kanal tedavisi üzerine ileri seviye kurslar aldım ve pratikte uygulamaktayım . Ön bölge estetik dolgular, kuronlar, köprüler yapmaktan keyif alıyorum.",
    focus: ["İmplant üstü protez", "Diş beyazlatma", "Estetik laminate veneer", "Zirkonya kuron"],
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
