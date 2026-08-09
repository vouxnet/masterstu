export interface QuestionDistRow {
  topic: string;
  y2012?: number;
  y2014?: number;
  y2016: number;
  y2018: number;
  y2020: number;
  y2022: number;
  y2023?: number;
  y2024?: number;
  avg: number;
  importance: "Yüksek" | "Orta" | "Standart";
  probabilityPercent: number;
}

export const kpssOnlisansDistributionData: Record<string, QuestionDistRow[]> = {
  "Türkçe": [
    { topic: "Paragrafta Anlam ve Yapı", y2016: 14, y2018: 15, y2020: 14, y2022: 15, y2024: 15, avg: 14.6, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Sözel Mantık", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Sözcükte Anlam", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 2, avg: 1.6, importance: "Orta", probabilityPercent: 100 },
    { topic: "Cümlede Anlam", y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2024: 1, avg: 1.4, importance: "Orta", probabilityPercent: 100 },
    { topic: "Yazım Kuralları", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta", probabilityPercent: 100 },
    { topic: "Noktalama İşaretleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta", probabilityPercent: 100 },
    { topic: "Ses Olayları & Dil Bilgisi", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta", probabilityPercent: 85 },
    { topic: "Sözcük Türleri ve Yapı", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta", probabilityPercent: 85 }
  ],
  "Matematik": [
    { topic: "Temel Kavramlar", y2012: 1, y2014: 1, y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2023: 0, avg: 0.6, importance: "Standart", probabilityPercent: 57 },
    { topic: "Sayılar - Ebob-Ekok", y2012: 5, y2014: 3, y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2023: 3, avg: 3.3, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Rasyonel Sayılar - Ondalıklı Sayılar", y2012: 2, y2014: 1, y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2023: 2, avg: 1.9, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Basit Eşitsizlikler", y2012: 1, y2014: 1, y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2023: 0, avg: 0.6, importance: "Standart", probabilityPercent: 57 },
    { topic: "Mutlak Değer", y2012: 0, y2014: 1, y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2023: 1, avg: 0.6, importance: "Standart", probabilityPercent: 57 },
    { topic: "Üslü Sayılar", y2012: 2, y2014: 1, y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2023: 1, avg: 1.4, importance: "Orta", probabilityPercent: 100 },
    { topic: "Köklü Sayılar", y2012: 0, y2014: 0, y2016: 0, y2018: 1, y2020: 0, y2022: 0, y2023: 0, avg: 0.1, importance: "Standart", probabilityPercent: 14 },
    { topic: "Faktöriyel", y2012: 0, y2014: 0, y2016: 0, y2018: 0, y2020: 0, y2022: 2, y2023: 2, avg: 0.6, importance: "Orta", probabilityPercent: 60 },
    { topic: "Çarpanlara Ayırma", y2012: 1, y2014: 1, y2016: 1, y2018: 2, y2020: 1, y2022: 0, y2023: 0, avg: 0.9, importance: "Orta", probabilityPercent: 71 },
    { topic: "Oran - Orantı", y2012: 2, y2014: 1, y2016: 1, y2018: 0, y2020: 1, y2022: 1, y2023: 1, avg: 1.1, importance: "Orta", probabilityPercent: 86 },
    { topic: "Denklem Çözme", y2012: 2, y2014: 1, y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2023: 1, avg: 1.1, importance: "Orta", probabilityPercent: 100 },
    { topic: "Sayı Problemleri", y2012: 1, y2014: 1, y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2023: 1, avg: 1.3, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Kesir Problemleri", y2012: 0, y2014: 1, y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2023: 1, avg: 0.9, importance: "Orta", probabilityPercent: 86 },
    { topic: "Yaş Problemleri", y2012: 0, y2014: 1, y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2023: 1, avg: 0.6, importance: "Standart", probabilityPercent: 57 },
    { topic: "İşçi ve Havuz Problemleri", y2012: 1, y2014: 1, y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2023: 1, avg: 0.7, importance: "Standart", probabilityPercent: 71 },
    { topic: "Hareket-Hız Problemleri", y2012: 1, y2014: 1, y2016: 1, y2018: 1, y2020: 1, y2022: 0, y2023: 0, avg: 0.7, importance: "Standart", probabilityPercent: 71 },
    { topic: "Yüzde-Kar-Zarar Problemleri", y2012: 2, y2014: 0, y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2023: 0, avg: 0.6, importance: "Standart", probabilityPercent: 43 },
    { topic: "Karışım Problemleri", y2012: 1, y2014: 0, y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2023: 0, avg: 0.4, importance: "Standart", probabilityPercent: 43 },
    { topic: "Grafik Problemleri", y2012: 1, y2014: 2, y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2023: 2, avg: 1.6, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Kümeler ve Problemleri", y2012: 0, y2014: 1, y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2023: 2, avg: 1.3, importance: "Orta", probabilityPercent: 86 },
    { topic: "Fonksiyonlar", y2012: 0, y2014: 1, y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2023: 1, avg: 0.6, importance: "Standart", probabilityPercent: 57 },
    { topic: "İşlem", y2012: 0, y2014: 1, y2016: 0, y2018: 0, y2020: 0, y2022: 0, y2023: 0, avg: 0.1, importance: "Standart", probabilityPercent: 14 },
    { topic: "Modüler Aritmetik", y2012: 0, y2014: 0, y2016: 0, y2018: 0, y2020: 0, y2022: 0, y2023: 0, avg: 0.0, importance: "Standart", probabilityPercent: 0 },
    { topic: "Permütasyon", y2012: 1, y2014: 1, y2016: 0, y2018: 0, y2020: 0, y2022: 0, y2023: 0, avg: 0.3, importance: "Standart", probabilityPercent: 28 },
    { topic: "Kombinasyon", y2012: 0, y2014: 0, y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2023: 0, avg: 0.3, importance: "Standart", probabilityPercent: 28 },
    { topic: "Olasılık", y2012: 0, y2014: 1, y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2023: 1, avg: 0.9, importance: "Orta", probabilityPercent: 86 },
    { topic: "Sayısal Mantık", y2012: 2, y2014: 2, y2016: 2, y2018: 3, y2020: 2, y2022: 3, y2023: 3, avg: 2.4, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Şekil Yetenek", y2012: 0, y2014: 1, y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2023: 0, avg: 0.4, importance: "Standart", probabilityPercent: 43 }
  ],
  "Tarih": [
    { topic: "İnkılap Tarihi ve Atatürk İlkeleri", y2016: 3, y2018: 5, y2020: 3, y2022: 5, y2024: 5, avg: 4.2, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Milli Mücadele Dönemi", y2016: 3, y2018: 4, y2020: 3, y2022: 4, y2024: 4, avg: 3.6, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Osmanlı Devleti Kültür ve Medeniyet", y2016: 1, y2018: 4, y2020: 1, y2022: 4, y2024: 4, avg: 2.8, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Çağdaş Türk ve Dünya Tarihi", y2016: 2, y2018: 4, y2020: 2, y2022: 4, y2024: 4, avg: 3.2, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "İlk Türk İslam Devletleri", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta", probabilityPercent: 85 },
    { topic: "İslamiyet Öncesi Türk Tarihi", y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2024: 1, avg: 1.4, importance: "Orta", probabilityPercent: 70 }
  ],
  "Coğrafya": [
    { topic: "Türkiye'nin Fiziki Özellikleri", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Türkiye'nin İklimi ve Bitki Örtüsü", y2016: 3, y2018: 2, y2020: 3, y2022: 2, y2024: 2, avg: 2.4, importance: "Orta", probabilityPercent: 100 },
    { topic: "Türkiye'de Nüfus ve Yerleşme", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta", probabilityPercent: 100 },
    { topic: "Madenler, Enerji ve Sanayi", y2016: 2, y2018: 3, y2020: 2, y2022: 3, y2024: 3, avg: 2.6, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Türkiye'nin Coğrafi Konumu", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 2, avg: 1.6, importance: "Orta", probabilityPercent: 85 }
  ],
  "Vatandaşlık": [
    { topic: "Temel Hukuk Kavramları", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "1982 Anayasası ve Yürütme", y2016: 3, y2018: 2, y2020: 3, y2022: 2, y2024: 2, avg: 2.4, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "İdare Hukuku ve Teşkilat", y2016: 3, y2018: 2, y2020: 3, y2022: 2, y2024: 2, avg: 2.4, importance: "Yüksek", probabilityPercent: 100 },
    { topic: "Yasama ve Yargı Organları", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 2, avg: 1.6, importance: "Orta", probabilityPercent: 85 }
  ]
};
