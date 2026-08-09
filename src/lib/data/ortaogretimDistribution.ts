export interface QuestionDistRow {
  topic: string;
  y2016: number;
  y2018: number;
  y2020: number;
  y2022: number;
  y2024: number;
  avg: number;
  importance: "Yüksek" | "Orta" | "Standart";
}

export const ortaogretimDistribution: Record<string, QuestionDistRow[]> = {
  "Türkçe": [
    { topic: "Paragraf (Ana Fikir, Yardımcı Düşünce)", y2016: 15, y2018: 15, y2020: 16, y2022: 14, y2024: 15, avg: 15.0, importance: "Yüksek" },
    { topic: "Sözel Mantık", y2016: 4, y2018: 4, y2020: 3, y2022: 5, y2024: 4, avg: 4.0, importance: "Orta" },
    { topic: "Sözcükte ve Cümlede Anlam", y2016: 4, y2018: 3, y2020: 5, y2022: 4, y2024: 4, avg: 4.0, importance: "Orta" },
    { topic: "Yazım Kuralları ve Noktalama", y2016: 4, y2018: 5, y2020: 3, y2022: 4, y2024: 4, avg: 4.0, importance: "Orta" },
    { topic: "Dil Bilgisi", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Standart" }
  ],
  "Matematik": [
    { topic: "Problemler (Sayı, Kesir, Yüzde, Oran)", y2016: 10, y2018: 10, y2020: 10, y2022: 11, y2024: 9, avg: 10.0, importance: "Yüksek" },
    { topic: "Sayısal Mantık", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Orta" },
    { topic: "Temel Kavramlar, Rasyonel Sayılar", y2016: 5, y2018: 6, y2020: 4, y2022: 5, y2024: 5, avg: 5.0, importance: "Orta" },
    { topic: "Üslü Köklü Sayılar", y2016: 4, y2018: 4, y2020: 5, y2022: 3, y2024: 4, avg: 4.0, importance: "Orta" },
    { topic: "Tablo Grafik Yorumlama", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Standart" },
    { topic: "Geometri", y2016: 4, y2018: 3, y2020: 4, y2022: 4, y2024: 5, avg: 4.0, importance: "Standart" }
  ],
  "Tarih": [
    { topic: "Osmanlı (Siyasi + Kültür)", y2016: 9, y2018: 8, y2020: 9, y2022: 10, y2024: 9, avg: 9.0, importance: "Yüksek" },
    { topic: "Atatürk İlke ve İnkılapları", y2016: 9, y2018: 10, y2020: 9, y2022: 9, y2024: 8, avg: 9.0, importance: "Yüksek" },
    { topic: "Kurtuluş Savaşı", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Orta" },
    { topic: "Çağdaş Türk Tarihi", y2016: 3, y2018: 3, y2020: 3, y2022: 2, y2024: 4, avg: 3.0, importance: "Orta" },
    { topic: "Türk-İslam Devletleri", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Standart" },
    { topic: "İlk Türk Devletleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" }
  ],
  "Coğrafya": [
    { topic: "Beşeri ve Ekonomik Özellikler", y2016: 9, y2018: 9, y2020: 8, y2022: 9, y2024: 10, avg: 9.0, importance: "Yüksek" },
    { topic: "Fiziki Özellikler", y2016: 5, y2018: 5, y2020: 6, y2022: 5, y2024: 4, avg: 5.0, importance: "Orta" },
    { topic: "İklim ve Bitki Örtüsü", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Standart" },
    { topic: "Coğrafi Konum", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" }
  ],
  "Vatandaşlık": [
    { topic: "Anayasa Hukuku", y2016: 5, y2018: 5, y2020: 5, y2022: 4, y2024: 6, avg: 5.0, importance: "Yüksek" },
    { topic: "Temel Hukuk Kavramları", y2016: 3, y2018: 3, y2020: 3, y2022: 4, y2024: 2, avg: 3.0, importance: "Orta" },
    { topic: "İdare Hukuku", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" }
  ],
  "Güncel Bilgiler": [
    { topic: "Güncel Olaylar ve Genel Kültür", y2016: 6, y2018: 6, y2020: 6, y2022: 6, y2024: 6, avg: 6.0, importance: "Yüksek" }
  ]
};
