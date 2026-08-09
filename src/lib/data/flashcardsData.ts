export interface FlashcardItem {
  id: string;
  userRole: "lisans_alan" | "onlisans" | "ortaogretim" | "yds" | "ales";
  subject: string;
  question: string;
  answer: string;
  osymTag: string; // e.g. 'ÖSYM 2019-2024 Çıkmış Soru'
  memoryTip?: string;
  difficulty?: "zor" | "orta" | "kolay";
}

export const flashcardsDatabase: FlashcardItem[] = [
  // ==================== LİSANS + ALAN (KULLANICI 1) ====================
  // HUKUK
  {
    id: "fc-h-1",
    userRole: "lisans_alan",
    subject: "Hukuk",
    question: "Anayasa Mahkemesi üye sayısı kaçtır ve üyelerin görev süresi kaç yıldır?",
    answer: "AYM 15 üyeden oluşur. Üyeler 12 yıl için seçilir. Bir üye iki defa seçilemez.",
    osymTag: "ÖSYM 2019 - 2024 Çıkmış Soru",
    memoryTip: "💡 15 Üye / 12 Yıl / Tek Seçimlik Hak.",
  },
  {
    id: "fc-h-2",
    userRole: "lisans_alan",
    subject: "Hukuk",
    question: "İdari yargıda iptal davası açma genel süresi Danıştay ve İdare Mahkemelerinde kaç gündür?",
    answer: "Danıştay ve İdare Mahkemelerinde dava açma süresi 60 gün, Vergi Mahkemelerinde ise 30 gündür.",
    osymTag: "ÖSYM 2018 - 2023 Çıkmış Soru",
    memoryTip: "💡 Danıştay/İdare: 60 Gün | Vergi: 30 Gün.",
  },
  {
    id: "fc-h-3",
    userRole: "lisans_alan",
    subject: "Hukuk",
    question: "Ceza Hukukunda 'Kanunsuz Suç ve Ceza Olmaz' ilkesinin sonuçları nelerdir?",
    answer: "Örf-adet ile suç/ceza konulamaz, kıyas yasaktır, ceza kuralları geriye yürümez (failin aleyhine ise).",
    osymTag: "ÖSYM 2020 - 2024 Çıkmış Soru",
    memoryTip: "💡 Kıyas Yasak / Geriye Yürümezlik / Kanunilik.",
  },
  {
    id: "fc-h-4",
    userRole: "lisans_alan",
    subject: "Hukuk",
    question: "Medeni Hukuka göre gaip ihbarı süreleri ölüm tehlikesi ve uzun süre haber alınamama durumunda kaç yıldır?",
    answer: "Ölüm tehlikesi içinde kaybolmada 1 yıl; uzun süre haber alınamada 5 yıl geçmesi gerekir.",
    osymTag: "ÖSYM 2017 - 2023 Çıkmış Soru",
    memoryTip: "💡 Tehlike: 1 Yıl | Haber Alınamama: 5 Yıl.",
  },
  {
    id: "fc-h-5",
    userRole: "lisans_alan",
    subject: "Hukuk",
    question: "Borçlar Hukukunda alacaklı temerrüdünün (direniminin) şartları ve sonuçları nelerdir?",
    answer: "Borçlu ifayı usulüne uygun teklif etmiş olmalı, alacaklı haklı sebep olmadan reddetmelidir. Borçlu tevdi hakkı kazanır.",
    osymTag: "ÖSYM 2019 - 2024 Çıkmış Soru",
    memoryTip: "💡 Tevdi (Emanet) Hakkı ve Hasarın Geçişi.",
  },

  // İKTİSAT
  {
    id: "fc-i-1",
    userRole: "lisans_alan",
    subject: "İktisat",
    question: "LM Eğrisinin yatay (esnekliği sonsuz) olduğu duruma ne ad verilir ve maliye politikasının etkinliği nasıldır?",
    answer: "Likitide Tuzakları (Liquidity Trap). Bu durumda para politikası tamamen etkisizdir, maliye politikası TAM ETKİLİDİR.",
    osymTag: "ÖSYM 2018 - 2024 Çıkmış Soru",
    memoryTip: "💡 Likitide Tuzakları -> Maliye Tam Etkili!",
  },
  {
    id: "fc-i-2",
    userRole: "lisans_alan",
    subject: "İktisat",
    question: "Monopolcü bir firmanın marjinal hasılatı (MR) ile fiyatı (P) ve talep esnekliği (e) arasındaki ilişkiyi gösteren formül nedir?",
    answer: "MR = P * (1 - 1/e) (Amoroso-Robinson Formülü).",
    osymTag: "ÖSYM 2016 - 2023 Çıkmış Soru",
    memoryTip: "💡 Amoroso-Robinson: MR = P(1 - 1/e).",
  },
  {
    id: "fc-i-3",
    userRole: "lisans_alan",
    subject: "İktisat",
    question: "Fisher Denklemine göre reel faiz oranı nasıl hesaplanır?",
    answer: "Reel Faiz = Nominal Faiz - Beklenen Enflasyon Oranı (r = i - π^e).",
    osymTag: "ÖSYM 2020 - 2024 Çıkmış Soru",
    memoryTip: "💡 Reel = Nominal - Enflasyon.",
  },
  {
    id: "fc-i-4",
    userRole: "lisans_alan",
    subject: "İktisat",
    question: "Heckscher-Ohlin (Faktör Donatımı) Teorisine göre bir ülke hangi malları ihraç eder?",
    answer: "Ülke, nispi olarak bol ve ucuz sahip olduğu faktörü yoğun olarak kullanan malları ihraç eder.",
    osymTag: "ÖSYM 2019 - 2023 Çıkmış Soru",
    memoryTip: "💡 Bol Faktör = Yoğun İhracat.",
  },

  // MALİYE
  {
    id: "fc-m-1",
    userRole: "lisans_alan",
    subject: "Maliye",
    question: "Laffer Eğrisi vergi oranları ile vergi gelirleri arasındaki nasıl bir ilişkiyi ifade eder?",
    answer: "Çan eğrisi şeklindedir. Belirli bir optimum vergi oranından sonra vergi oranlarının artırılması vergi gelirlerini AZALTIR.",
    osymTag: "ÖSYM 2017 - 2024 Çıkmış Soru",
    memoryTip: "💡 Optimum Vergi Oranı Aşılırsa Gelir Düşer.",
  },
  {
    id: "fc-m-2",
    userRole: "lisans_alan",
    subject: "Maliye",
    question: "5018 Sayılı Kamu Mali Yönetimi Kanununa göre Merkezi Yönetim Bütçe Tasarısı TBMM'ye ne zaman sunulur?",
    answer: "Mali yıl başından en az 75 gün önce Cumhurbaşkanı tarafından TBMM'ye sunulur.",
    osymTag: "ÖSYM 2019 - 2024 Çıkmış Soru",
    memoryTip: "💡 75 Gün Önce / Cumhurbaşkanı.",
  },
  {
    id: "fc-m-3",
    userRole: "lisans_alan",
    subject: "Maliye",
    question: "Wagner Kanunu kamu harcamaları hakkında ne ileri sürer?",
    answer: "Devlet Faaliyetlerinin Artması Kanunu: Sanayileşme ve milli gelir arttıkça kamu harcamaları milli gelirden daha hızlı artar.",
    osymTag: "ÖSYM 2018 - 2023 Çıkmış Soru",
    memoryTip: "💡 Wagner = Kamu Harcamalarının Sürekli Artışı.",
  },

  // ULUSLARARASI İLİŞKİLER
  {
    id: "fc-ui-1",
    userRole: "lisans_alan",
    subject: "Uluslararası İlişkiler",
    question: "Modern devletler sisteminin ve egemen devlet ilkesinin doğuşu sayılan antlaşma hangisidir?",
    answer: "1648 Vestfalya Barışı (Peace of Westphalia). 30 Yıl Savaşları'nı sona erdirmiştir.",
    osymTag: "ÖSYM 2016 - 2024 Çıkmış Soru",
    memoryTip: "💡 1648 Vestfalya = Ulusal Egemenlik ve Eşitlik.",
  },
  {
    id: "fc-ui-2",
    userRole: "lisans_alan",
    subject: "Uluslararası İlişkiler",
    question: "Neorealizmin (Yapısal Realizm) kurucusu kimdir ve uluslararası sistemin temel özelliğini ne olarak tanımlar?",
    answer: "Kenneth Waltz (Theory of International Politics - 1979). Sistemi ANARŞİK yapıda görür.",
    osymTag: "ÖSYM 2018 - 2024 Çıkmış Soru",
    memoryTip: "💡 K. Waltz = Neorealizm / Anarşik Sistem.",
  },
  {
    id: "fc-ui-3",
    userRole: "lisans_alan",
    subject: "Uluslararası İlişkiler",
    question: "Birleşmiş Milletler Güvenlik Konseyi'nin (BMGK) daimi 5 üyesi (Veto yetkisi olan devletler) kimlerdir?",
    answer: "ABD, Rusya, Çin, İngiltere, Fransa (P5 ülkeleri).",
    osymTag: "ÖSYM 2019 - 2024 Çıkmış Soru",
    memoryTip: "💡 P5: ABD, Rusya, Çin, İngiltere, Fransa (FİRÇA).",
  },
  {
    id: "fc-ui-4",
    userRole: "lisans_alan",
    subject: "Uluslararası İlişkiler",
    question: "Türkiye'nin NATO'ya resmi katılım yılı ve katıldığı diğer ülke hangisidir?",
    answer: "18 Şubat 1952 yılında Yunanistan ile birlikte resmi üye olmuştur.",
    osymTag: "ÖSYM 2017 - 2023 Çıkmış Soru",
    memoryTip: "💡 1952 / Türkiye + Yunanistan.",
  },

  // ==================== ÖNLİSANS ====================
  {
    id: "fc-sen-1",
    userRole: "onlisans",
    subject: "Tarih",
    question: "Mustafa Kemal Paşa'nın 'Geldikleri gibi giderler' sözünü söylediği tarih ve yer neresidir?",
    answer: "13 Kasım 1918 tarihinde İtilaf Donanması İstanbul'a demirlediğinde İstanbul Haydarpaşa Garı'nda söylemiştir.",
    osymTag: "ÖSYM Önlisans 2020 Çıkmış Soru",
    memoryTip: "💡 13 Kasım 1918 / Haydarpaşa İstanbul.",
  },
  {
    id: "fc-sen-2",
    userRole: "onlisans",
    subject: "Vatandaşlık",
    question: "1982 Anayasası'na göre milletvekili seçilme yaşı kaçtır?",
    answer: "18 yaştır (2017 Anayasa değişikliği ile 18 yaşa düşürülmüştür).",
    osymTag: "ÖSYM Önlisans 2022 Çıkmış Soru",
    memoryTip: "💡 Milletvekili Seçilme Yaşı = 18.",
  },
  {
    id: "fc-sen-3",
    userRole: "onlisans",
    subject: "Coğrafya",
    question: "Türkiye'de en çok ihraç edilen ve döviz kazandıran madenimiz hangisidir?",
    answer: "Mermer (Doğaltaş) ve Bor madenidir.",
    osymTag: "ÖSYM Önlisans 2021 Çıkmış Soru",
    memoryTip: "💡 İhracat Şampiyonu Maden: Mermer.",
  },
  {
    id: "fc-sen-4",
    userRole: "onlisans",
    subject: "Türkçe",
    question: "Yazım kurallarında 'unvan', 'laboratuvar', 'traraş', 'kılavuz' kelimelerinin doğru yazılışı nasıldır?",
    answer: "Unvan (unvan doğru), Laboratuvar (doğru), Tıraş ('ı' var), Kılavuz ('ı' var).",
    osymTag: "ÖSYM Önlisans 2023 Çıkmış Soru",
    memoryTip: "💡 Tıraş (ı'lı) / Kılavuz (ı'lı) / Unvan.",
  },
  {
    id: "fc-sen-5",
    userRole: "onlisans",
    subject: "Matematik",
    question: "Hız problemlerinde karşılaşma zamanı t_karşılaşma formülü nedir?",
    answer: "t = Yol / (V1 + V2) (Zıt yönde hareket eden araçların hızları toplanır).",
    osymTag: "ÖSYM Önlisans 2019 Çıkmış Soru",
    memoryTip: "💡 Zıt Yön = Hızlar Toplanır (V1 + V2).",
  },
  // ==================== ORTAÖĞRETİM (KULLANICI 3) ====================
  { id: "fc-ort-1", userRole: "ortaogretim", subject: "Tarih", question: "Atatürk İlkeleri nelerdir?", answer: "Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık.", osymTag: "ÖSYM Çıkmış Soru" },
  { id: "fc-ort-2", userRole: "ortaogretim", subject: "Tarih", question: "Cumhuriyet ne zaman ilan edilmiştir?", answer: "29 Ekim 1923.", osymTag: "ÖSYM Çıkmış Soru" },
  { id: "fc-ort-3", userRole: "ortaogretim", subject: "Tarih", question: "Mudanya Ateşkes Antlaşması hangi savaştan sonra imzalanmıştır?", answer: "Büyük Taarruz.", osymTag: "ÖSYM Çıkmış Soru" },
  { id: "fc-ort-4", userRole: "ortaogretim", subject: "Vatandaşlık", question: "Yasama yetkisi kime aittir?", answer: "TBMM'ye aittir.", osymTag: "ÖSYM Çıkmış Soru" },
  { id: "fc-ort-5", userRole: "ortaogretim", subject: "Vatandaşlık", question: "Yürütme yetkisi kimdedir?", answer: "Cumhurbaşkanı.", osymTag: "ÖSYM Çıkmış Soru" },
  { id: "fc-ort-6", userRole: "ortaogretim", subject: "Vatandaşlık", question: "Anayasa Mahkemesi kaç üyeden oluşur?", answer: "15 üye.", osymTag: "ÖSYM Çıkmış Soru" },
  { id: "fc-ort-7", userRole: "ortaogretim", subject: "Coğrafya", question: "Türkiye'nin en fazla yağış alan bölgesi hangisidir?", answer: "Karadeniz Bölgesi.", osymTag: "ÖSYM Çıkmış Soru" },
  { id: "fc-ort-8", userRole: "ortaogretim", subject: "Coğrafya", question: "Türkiye'nin en sıcak bölgesi yazın hangisidir?", answer: "Güneydoğu Anadolu Bölgesi.", osymTag: "ÖSYM Çıkmış Soru" },
  { id: "fc-ort-9", userRole: "ortaogretim", subject: "Matematik", question: "A ve B sayılarının EBOB ve EKOK çarpımı neye eşittir?", answer: "A x B'ye eşittir.", osymTag: "ÖSYM Çıkmış Soru" },
  { id: "fc-ort-10", userRole: "ortaogretim", subject: "Matematik", question: "Karenin alanı nasıl hesaplanır?", answer: "Bir kenarının karesi (a²).", osymTag: "ÖSYM Çıkmış Soru" },

  // ==================== YDS (KULLANICI 4) ====================
  { id: "fc-yds-1", userRole: "yds", subject: "Vocabulary", question: "Accommodate kelimesinin anlamı nedir?", answer: "Barındırmak, yer sağlamak.", osymTag: "YDS Çıkmış Soru" },
  { id: "fc-yds-2", userRole: "yds", subject: "Vocabulary", question: "Deteriorate kelimesinin anlamı nedir?", answer: "Kötüleşmek, bozulmak.", osymTag: "YDS Çıkmış Soru" },
  { id: "fc-yds-3", userRole: "yds", subject: "Vocabulary", question: "Implement kelimesinin anlamı nedir?", answer: "Uygulamak, yerine getirmek.", osymTag: "YDS Çıkmış Soru" },
  { id: "fc-yds-4", userRole: "yds", subject: "Vocabulary", question: "Obsolete kelimesinin anlamı nedir?", answer: "Eskiyen, modası geçmiş.", osymTag: "YDS Çıkmış Soru" },
  { id: "fc-yds-5", userRole: "yds", subject: "Grammar", question: "Type 2 Conditionals (If Clause) yapısı nasıldır?", answer: "If + Simple Past, would/could/might + V1.", osymTag: "YDS Çıkmış Soru" },
  { id: "fc-yds-6", userRole: "yds", subject: "Grammar", question: "Present Perfect Tense'in en yaygın zaman zarfları nelerdir?", answer: "Just, yet, already, since, for, recently, lately.", osymTag: "YDS Çıkmış Soru" },
  { id: "fc-yds-7", userRole: "yds", subject: "Grammar", question: "Despite ve In spite of arkasından ne alır?", answer: "İsim veya V-ing alır, cümle (SVO) almaz.", osymTag: "YDS Çıkmış Soru" },
  { id: "fc-yds-8", userRole: "yds", subject: "Reading", question: "Skimming ve Scanning nedir?", answer: "Skimming ana fikri bulmak, Scanning belirli bir bilgiyi aramak için okumaktır.", osymTag: "YDS Strateji" },
  { id: "fc-yds-9", userRole: "yds", subject: "Reading", question: "Referans (Reference) sorularında neye dikkat edilmeli?", answer: "It, they, this, such gibi zamirlerin bir önceki cümlede neyi işaret ettiğine.", osymTag: "YDS Strateji" },
  { id: "fc-yds-10", userRole: "yds", subject: "Reading", question: "Cloze testlerde bağlaç seçerken neye bakılır?", answer: "Boşluktan önceki ve sonraki cümleler arasındaki anlam ilişkisine (zıtlık, neden-sonuç).", osymTag: "YDS Strateji" },

  // ==================== ALES (KULLANICI 5) ====================
  { id: "fc-ales-1", userRole: "ales", subject: "Sayısal", question: "İki basamaklı en küçük asal sayı kaçtır?", answer: "11.", osymTag: "ALES Çıkmış Soru" },
  { id: "fc-ales-2", userRole: "ales", subject: "Sayısal", question: "Pisagor teoremi formülü nedir?", answer: "a² + b² = c².", osymTag: "ALES Çıkmış Soru" },
  { id: "fc-ales-3", userRole: "ales", subject: "Sayısal", question: "Dairenin alanı formülü nedir?", answer: "πr².", osymTag: "ALES Çıkmış Soru" },
  { id: "fc-ales-4", userRole: "ales", subject: "Sayısal", question: "Ortalama hız nasıl hesaplanır?", answer: "Toplam Yol / Toplam Zaman.", osymTag: "ALES Çıkmış Soru" },
  { id: "fc-ales-5", userRole: "ales", subject: "Sözel", question: "Paragrafta ana düşünce genellikle nerede bulunur?", answer: "Giriş veya sonuç cümlesinde.", osymTag: "ALES Çıkmış Soru" },
  { id: "fc-ales-6", userRole: "ales", subject: "Sözel", question: "Akışı bozan cümleyi bulurken neye dikkat edilir?", answer: "Konunun farklı bir yönüne veya zamanına geçen cümleye.", osymTag: "ALES Çıkmış Soru" },
  { id: "fc-ales-7", userRole: "ales", subject: "Sözel", question: "Mecaz anlam nedir?", answer: "Sözcüğün gerçek anlamından tamamen uzaklaşarak kazandığı yeni anlam.", osymTag: "ALES Çıkmış Soru" },
  { id: "fc-ales-8", userRole: "ales", subject: "Mantık", question: "Sıralama sorularında ilk adım ne olmalıdır?", answer: "Sabit ve kesin bilgileri tabloya yerleştirmek.", osymTag: "ALES Strateji" },
  { id: "fc-ales-9", userRole: "ales", subject: "Mantık", question: "Eşleştirme sorularında kaç tablo çizilir?", answer: "Değişken sayısına göre ana bir tablo, bazen ihtimaller için ek sütunlar.", osymTag: "ALES Strateji" },
  { id: "fc-ales-10", userRole: "ales", subject: "Mantık", question: "Koşullu önermelerde 'A ise B' ne anlama gelir?", answer: "A gerçekleşiyorsa B kesinlikle gerçekleşir, ancak B gerçekleşiyorsa A gerçekleşmek zorunda değildir.", osymTag: "ALES Strateji" },
];
