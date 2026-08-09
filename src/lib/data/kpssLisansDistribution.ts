export interface QuestionDistRow {
  topic: string;
  y2016: number;
  y2018: number;
  y2020: number;
  y2022: number;
  y2024: number;
  avg: number;
  importance: "Yüksek" | "Orta" | "Standart";
  probabilityPercent?: number;
}

export const kpssLisansDistributionData: Record<string, QuestionDistRow[]> = {
  "Türkçe": [
    { topic: "Paragrafta Anlam ve Yapı", y2016: 15, y2018: 15, y2020: 15, y2022: 15, y2024: 15, avg: 15.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Sözel Mantık", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Sözcükte Anlam", y2016: 2, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.2, importance: "Orta", probabilityPercent: 100 },
    { topic: "Cümlede Anlam", y2016: 2, y2018: 1, y2020: 2, y2022: 2, y2024: 2, avg: 1.8, importance: "Orta", probabilityPercent: 100 },
    { topic: "Sözcük Türleri", y2016: 2, y2018: 1, y2020: 2, y2022: 2, y2024: 2, avg: 1.8, importance: "Orta", probabilityPercent: 85 },
    { topic: "Sözcükte Yapı", y2016: 3, y2018: 2, y2020: 1, y2022: 1, y2024: 1, avg: 1.6, importance: "Orta", probabilityPercent: 85 },
    { topic: "Cümlenin Ögeleri", y2016: 1, y2018: 0, y2020: 1, y2022: 1, y2024: 1, avg: 0.8, importance: "Standart", probabilityPercent: 75 },
    { topic: "Dil Bilgisi Ses Olayları", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart", probabilityPercent: 85 },
    { topic: "Yazım Kuralları", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart", probabilityPercent: 100 },
    { topic: "Noktalama İşaretleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart", probabilityPercent: 100 }
  ],
  "Matematik": [
    { topic: "Sayılar & Ebob-Ekok", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Rasyonel Sayılar & Ondalık", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Sayısal Mantık", y2016: 3, y2018: 4, y2020: 3, y2022: 4, y2024: 4, avg: 3.6, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Sayı ve Kesir Problemleri", y2016: 2, y2018: 3, y2020: 2, y2022: 3, y2024: 3, avg: 2.6, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Grafik Problemleri", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Geometri (Üçgen, Dörtgen, Analitik)", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Üslü & Köklü Sayılar", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta", probabilityPercent: 100 },
    { topic: "Çarpanlara Ayırma & Denklem Çözme", y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2024: 1, avg: 1.4, importance: "Orta", probabilityPercent: 85 },
    { topic: "Kümeler & Fonksiyonlar", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 2, avg: 1.6, importance: "Orta", probabilityPercent: 85 },
    { topic: "Olasılık & Olasılık Mantığı", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart", probabilityPercent: 85 }
  ],
  "Tarih": [
    { topic: "Atatürk İnkılapları ve İlkeleri", y2016: 5, y2018: 5, y2020: 5, y2022: 5, y2024: 5, avg: 5.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Milli Mücadele Dönemi", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Osmanlı Devleti Kültür ve Medeniyeti", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Çağdaş Türk ve Dünya Tarihi", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Türk-İslam Devletleri & Medeniyeti", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta", probabilityPercent: 85 },
    { topic: "İslamiyet Öncesi Türk Tarihi", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart", probabilityPercent: 75 }
  ],
  "Coğrafya": [
    { topic: "Türkiye'nin Fiziki Özellikleri", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Madenler, Enerji & Sanayi", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Türkiye'nin İklimi & Bitki Örtüsü", y2016: 3, y2018: 2, y2020: 3, y2022: 2, y2024: 2, avg: 2.4, importance: "Orta", probabilityPercent: 100 },
    { topic: "Nüfus, Yerleşme & Göçler", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta", probabilityPercent: 100 },
    { topic: "Türkiye'nin Coğrafi Konumu", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 2, avg: 1.6, importance: "Orta", probabilityPercent: 85 }
  ],
  "Vatandaşlık": [
    { topic: "Temel Hukuk Kavramları", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "1982 Anayasası & Yürütme Organı", y2016: 3, y2018: 2, y2020: 3, y2022: 2, y2024: 2, avg: 2.4, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "İdare Hukuku & İdari Teşkilat", y2016: 3, y2018: 2, y2020: 3, y2022: 2, y2024: 2, avg: 2.4, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Yasama & Yargı Organları", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 2, avg: 1.6, importance: "Orta", probabilityPercent: 85 },
    { topic: "Güncel Bilgiler & Uluslararası Örgütler", y2016: 6, y2018: 6, y2020: 6, y2022: 6, y2024: 6, avg: 6.0, importance: "Yüksek", probabilityPercent: 100 }
  ],
  "Hukuk": [
    { topic: "Anayasa Hukuku", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "İdare Hukuku & İdari Yargı", y2016: 7, y2018: 7, y2020: 7, y2022: 7, y2024: 7, avg: 7.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Ceza Hukuku (Genel Hükümler)", y2016: 5, y2018: 5, y2020: 5, y2022: 5, y2024: 5, avg: 5.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Medeni Hukuk (Kişiler, Eşya, Miras)", y2016: 6, y2018: 6, y2020: 6, y2022: 6, y2024: 6, avg: 6.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Borçlar Hukuku (Genel Hükümler)", y2016: 6, y2018: 6, y2020: 6, y2022: 6, y2024: 6, avg: 6.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Ticaret Hukuku (Şirketler & Evrak)", y2016: 6, y2018: 6, y2020: 6, y2022: 6, y2024: 6, avg: 6.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "İcra ve İflas Hukuku", y2016: 6, y2018: 6, y2020: 6, y2022: 6, y2024: 6, avg: 6.0, importance: "Yüksek", probabilityPercent: 100 }
  ],
  "İktisat": [
    { topic: "Mikro İktisat & Tüketici Teorisi", y2016: 12, y2018: 12, y2020: 12, y2022: 12, y2024: 12, avg: 12.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Makro İktisat & IS-LM Dengesi", y2016: 10, y2018: 10, y2020: 10, y2022: 10, y2024: 10, avg: 10.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Para, Banka ve Kredi", y2016: 6, y2018: 6, y2020: 6, y2022: 6, y2024: 6, avg: 6.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Uluslararası İktisat & Dış Ticaret", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Orta", probabilityPercent: 100 },
    { topic: "İktisadi Büyüme & Türkiye Ekonomisi", y2016: 8, y2018: 8, y2020: 8, y2022: 8, y2024: 8, avg: 8.0, importance: "Yüksek", probabilityPercent: 100 }
  ],
  "Maliye": [
    { topic: "Maliye Teorisi & Kamusal Mallar", y2016: 6, y2018: 6, y2020: 6, y2022: 6, y2024: 6, avg: 6.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Kamu Giderleri & Harcamalar", y2016: 6, y2018: 6, y2020: 6, y2022: 6, y2024: 6, avg: 6.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Kamu Gelirleri & Vergi Teorisi", y2016: 8, y2018: 8, y2020: 8, y2022: 8, y2024: 8, avg: 8.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Devlet Bütçesi & Borçlanma", y2016: 8, y2018: 8, y2020: 8, y2022: 8, y2024: 8, avg: 8.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Maliye Politikası & Türk Vergi Sistemi", y2016: 12, y2018: 12, y2020: 12, y2022: 12, y2024: 12, avg: 12.0, importance: "Yüksek", probabilityPercent: 100 }
  ],
  "Uluslararası İlişkiler": [
    { topic: "Uluslararası İlişkiler Teorileri", y2016: 10, y2018: 10, y2020: 10, y2022: 10, y2024: 10, avg: 10.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Siyasi Tarih (1648'den Günümüze)", y2016: 10, y2018: 10, y2020: 10, y2022: 10, y2024: 10, avg: 10.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Uluslararası Hukuk & Örgütler", y2016: 10, y2018: 10, y2020: 10, y2022: 10, y2024: 10, avg: 10.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Türk Dış Politikası", y2016: 10, y2018: 10, y2020: 10, y2022: 10, y2024: 10, avg: 10.0, importance: "Yüksek", probabilityPercent: 100 }
  ]
};
