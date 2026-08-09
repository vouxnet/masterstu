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

export const bulentExactKitapSecData: Record<string, QuestionDistRow[]> = {
  "Türkçe": [
    {
      "topic": "Sözcükte Anlam",
      "y2016": 2,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.2,
      "importance": "Standart"
    },
    {
      "topic": "Cümlede Anlam",
      "y2016": 2,
      "y2018": 1,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 1.8,
      "importance": "Orta"
    },
    {
      "topic": "Sözcük Türleri",
      "y2016": 2,
      "y2018": 1,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 1.8,
      "importance": "Orta"
    },
    {
      "topic": "Sözcükte Yapı",
      "y2016": 3,
      "y2018": 2,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.6,
      "importance": "Orta"
    },
    {
      "topic": "Cümlenin Ögeleri",
      "y2016": 1,
      "y2018": 0,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 0.8,
      "importance": "Standart"
    },
    {
      "topic": "Cümle Türleri",
      "y2016": 1,
      "y2018": 1,
      "y2020": 0,
      "y2022": 1,
      "y2024": 0,
      "avg": 0.6,
      "importance": "Standart"
    },
    {
      "topic": "Dil Bilgisi Ses Olayları",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Yazım Kuralları",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Noktalama İşaretleri",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Anlatım Bozuklukları",
      "y2016": 0,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 0.8,
      "importance": "Standart"
    },
    {
      "topic": "Paragrafta Anlam",
      "y2016": 14,
      "y2018": 15,
      "y2020": 14,
      "y2022": 16,
      "y2024": 15,
      "avg": 14.8,
      "importance": "Yüksek"
    },
    {
      "topic": "Paragrafta Anlatım Biçim",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Sözel Mantık",
      "y2016": 4,
      "y2018": 4,
      "y2020": 4,
      "y2022": 4,
      "y2024": 4,
      "avg": 4,
      "importance": "Yüksek"
    }
  ],
  "Matematik": [
    {
      "topic": "Temel Kavramlar",
      "y2016": 2,
      "y2018": 3,
      "y2020": 3,
      "y2022": 3,
      "y2024": 1,
      "avg": 2.4,
      "importance": "Orta"
    },
    {
      "topic": "Rasyonel Sayılar- Ondalıklı Sayılar",
      "y2016": 2,
      "y2018": 2,
      "y2020": 2,
      "y2022": 2,
      "y2024": 5,
      "avg": 2.6,
      "importance": "Orta"
    },
    {
      "topic": "Basit Eşitsizlikler",
      "y2016": 2,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.2,
      "importance": "Standart"
    },
    {
      "topic": "Mutlak Değer",
      "y2016": 2,
      "y2018": 2,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.4,
      "importance": "Standart"
    },
    {
      "topic": "Üslü Sayılar",
      "y2016": 2,
      "y2018": 2,
      "y2020": 3,
      "y2022": 2,
      "y2024": 2,
      "avg": 2.2,
      "importance": "Orta"
    },
    {
      "topic": "Köklü Sayılar",
      "y2016": 2,
      "y2018": 2,
      "y2020": 2,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.6,
      "importance": "Orta"
    },
    {
      "topic": "Çarpanlara Ayırma",
      "y2016": 2,
      "y2018": 2,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 2,
      "importance": "Orta"
    },
    {
      "topic": "Oran- Orantı",
      "y2016": 2,
      "y2018": 2,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.4,
      "importance": "Standart"
    },
    {
      "topic": "Denklem Çözme",
      "y2016": 1,
      "y2018": 2,
      "y2020": 2,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.4,
      "importance": "Standart"
    },
    {
      "topic": "Problemler",
      "y2016": 2,
      "y2018": 2,
      "y2020": 2,
      "y2022": 8,
      "y2024": 8,
      "avg": 4.4,
      "importance": "Yüksek"
    },
    {
      "topic": "Kümeler",
      "y2016": 2,
      "y2018": 2,
      "y2020": 2,
      "y2022": 2,
      "y2024": 1,
      "avg": 1.8,
      "importance": "Orta"
    },
    {
      "topic": "Fonksiyonlar",
      "y2016": 1,
      "y2018": 3,
      "y2020": 2,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.6,
      "importance": "Orta"
    },
    {
      "topic": "İşlem",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Permütasyon / Konbinasyon",
      "y2016": 0,
      "y2018": 0,
      "y2020": 0,
      "y2022": 0,
      "y2024": 1,
      "avg": 0.2,
      "importance": "Standart"
    },
    {
      "topic": "Olasılık",
      "y2016": 7,
      "y2018": 2,
      "y2020": 2,
      "y2022": 1,
      "y2024": 1,
      "avg": 2.6,
      "importance": "Orta"
    },
    {
      "topic": "Sayısal Mantık",
      "y2016": 3,
      "y2018": 3,
      "y2020": 6,
      "y2022": 4,
      "y2024": 4,
      "avg": 4,
      "importance": "Yüksek"
    },
    {
      "topic": "Geometrik Kavramlar ve Açılar",
      "y2016": 1,
      "y2018": 2,
      "y2020": 1,
      "y2022": 2,
      "y2024": 1,
      "avg": 1.4,
      "importance": "Standart"
    },
    {
      "topic": "Çokgenler ve Dörtgenler",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Çember ve Daire",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Analitik Geometri",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Katı Cisimler",
      "y2016": 0,
      "y2018": 0,
      "y2020": 0,
      "y2022": 0,
      "y2024": 0,
      "avg": 0,
      "importance": "Standart"
    }
  ],
  "Tarih": [
    {
      "topic": "İslamiyet Öncesi Türk Tarihi-İlk ve Orta Çağda Türk Dünyası",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "İslamiyet Öncesi Türk Devletlerinde Kültür ve Uygarlık",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "İlk Türk İslam Devletleri -Türklerin İslamiyeti Kabulü",
      "y2016": 1,
      "y2018": 2,
      "y2020": 0,
      "y2022": 2,
      "y2024": 0,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "İlk Türk İslam Devletlerinde Kültür ve Uygarlık",
      "y2016": 2,
      "y2018": 1,
      "y2020": 2,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.4,
      "importance": "Standart"
    },
    {
      "topic": "Osmanlı Devleti Siyaseti",
      "y2016": 6,
      "y2018": 5,
      "y2020": 3,
      "y2022": 3,
      "y2024": 3,
      "avg": 4,
      "importance": "Yüksek"
    },
    {
      "topic": "Osmanlı Devleti Kültür ve Uygarlık",
      "y2016": 3,
      "y2018": 2,
      "y2020": 5,
      "y2022": 5,
      "y2024": 5,
      "avg": 4,
      "importance": "Yüksek"
    },
    {
      "topic": "20. Yüzyıl Osmanlı Devleti",
      "y2016": 3,
      "y2018": 3,
      "y2020": 4,
      "y2022": 4,
      "y2024": 4,
      "avg": 3.6,
      "importance": "Yüksek"
    },
    {
      "topic": "Kurtuluş Savaşı",
      "y2016": 3,
      "y2018": 2,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 2.2,
      "importance": "Orta"
    },
    {
      "topic": "İnkılap Tarihi",
      "y2016": 3,
      "y2018": 3,
      "y2020": 5,
      "y2022": 5,
      "y2024": 5,
      "avg": 4.2,
      "importance": "Yüksek"
    },
    {
      "topic": "Atatürk Dönemi İç ve Dış Politikalar",
      "y2016": 1,
      "y2018": 4,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 2.2,
      "importance": "Orta"
    },
    {
      "topic": "Atatürk'ün İlke ve İnkılapları",
      "y2016": 2,
      "y2018": 1,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 1.8,
      "importance": "Orta"
    },
    {
      "topic": "Çağdaş Türk ve Dünya Edebiyatı",
      "y2016": 3,
      "y2018": 3,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 2.4,
      "importance": "Orta"
    }
  ],
  "Coğrafya": [
    {
      "topic": "Türkiye'nin İklimi ve Bitki Örtüsü",
      "y2016": 2,
      "y2018": 2,
      "y2020": 2,
      "y2022": 1,
      "y2024": 2,
      "avg": 1.8,
      "importance": "Orta"
    },
    {
      "topic": "Türkiye'nin Fiziki Özellikleri",
      "y2016": 5,
      "y2018": 5,
      "y2020": 4,
      "y2022": 6,
      "y2024": 5,
      "avg": 5,
      "importance": "Yüksek"
    },
    {
      "topic": "Türkiye'de Nüfus ve Yerleşme",
      "y2016": 3,
      "y2018": 1,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 2,
      "importance": "Orta"
    },
    {
      "topic": "Tarım",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 2,
      "y2024": 1,
      "avg": 1.2,
      "importance": "Standart"
    },
    {
      "topic": "Hayvancılık",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Madenler ve Enerji Kaynakları",
      "y2016": 1,
      "y2018": 2,
      "y2020": 3,
      "y2022": 3,
      "y2024": 2,
      "avg": 2.2,
      "importance": "Orta"
    },
    {
      "topic": "Sanayi ve Endüstri",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 2,
      "avg": 1.2,
      "importance": "Standart"
    },
    {
      "topic": "Ulaşım",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Ticaret",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Turizm",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 2,
      "avg": 1.2,
      "importance": "Standart"
    },
    {
      "topic": "Bölgeler Coğrafyası",
      "y2016": 0,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 0.8,
      "importance": "Standart"
    }
  ],
  "Vatandaşlık": [
    {
      "topic": "Temel Hukuk Kavramları",
      "y2016": 1,
      "y2018": 2,
      "y2020": 3,
      "y2022": 2,
      "y2024": 2,
      "avg": 2,
      "importance": "Orta"
    },
    {
      "topic": "Anayasal Kavramlar",
      "y2016": 1,
      "y2018": 1,
      "y2020": 0,
      "y2022": 1,
      "y2024": 4,
      "avg": 1.4,
      "importance": "Standart"
    },
    {
      "topic": "Türk Anayasa Tarihi",
      "y2016": 1,
      "y2018": 1,
      "y2020": 0,
      "y2022": 1,
      "y2024": 0,
      "avg": 0.6,
      "importance": "Standart"
    },
    {
      "topic": "Temel Hak Ödevler",
      "y2016": 1,
      "y2018": 1,
      "y2020": 0,
      "y2022": 0,
      "y2024": 0,
      "avg": 0.4,
      "importance": "Standart"
    },
    {
      "topic": "Yasama",
      "y2016": 1,
      "y2018": 2,
      "y2020": 3,
      "y2022": 2,
      "y2024": 0,
      "avg": 1.6,
      "importance": "Orta"
    },
    {
      "topic": "Yürütme",
      "y2016": 1,
      "y2018": 1,
      "y2020": 2,
      "y2022": 1,
      "y2024": 2,
      "avg": 1.4,
      "importance": "Standart"
    },
    {
      "topic": "Yargı",
      "y2016": 1,
      "y2018": 1,
      "y2020": 2,
      "y2022": 0,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "İdare Hukuku",
      "y2016": 3,
      "y2018": 2,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 2.2,
      "importance": "Orta"
    }
  ],
  "Hukuk": [
    {
      "topic": "Anayasa Hukuku (TBMM, AYM, Haklar)",
      "y2016": 8,
      "y2018": 7,
      "y2020": 8,
      "y2022": 8,
      "y2024": 8,
      "avg": 7.8,
      "importance": "Yüksek"
    },
    {
      "topic": "İdare Hukuku & İdari Yargı",
      "y2016": 7,
      "y2018": 7,
      "y2020": 7,
      "y2022": 7,
      "y2024": 7,
      "avg": 7,
      "importance": "Yüksek"
    },
    {
      "topic": "Ceza Hukuku (Genel & Özel)",
      "y2016": 6,
      "y2018": 6,
      "y2020": 5,
      "y2022": 6,
      "y2024": 5,
      "avg": 5.6,
      "importance": "Yüksek"
    },
    {
      "topic": "Medeni Hukuk & Borçlar Hukuku",
      "y2016": 6,
      "y2018": 6,
      "y2020": 6,
      "y2022": 6,
      "y2024": 6,
      "avg": 6,
      "importance": "Yüksek"
    },
    {
      "topic": "Ticaret Hukuku & İcra İflas",
      "y2016": 5,
      "y2018": 6,
      "y2020": 6,
      "y2022": 5,
      "y2024": 6,
      "avg": 5.6,
      "importance": "Yüksek"
    }
  ],
  "İktisat": [
    {
      "topic": "Mikro İktisat (Fayda, Üretici, Piyasalar)",
      "y2016": 12,
      "y2018": 12,
      "y2020": 12,
      "y2022": 12,
      "y2024": 12,
      "avg": 12,
      "importance": "Yüksek"
    },
    {
      "topic": "Makro İktisat (IS-LM, Milli Gelir)",
      "y2016": 10,
      "y2018": 10,
      "y2020": 10,
      "y2022": 10,
      "y2024": 10,
      "avg": 10,
      "importance": "Yüksek"
    },
    {
      "topic": "Para-Banka & Merkez Bankacılığı",
      "y2016": 4,
      "y2018": 4,
      "y2020": 4,
      "y2022": 4,
      "y2024": 4,
      "avg": 4,
      "importance": "Orta"
    },
    {
      "topic": "Uluslararası İktisat & Büyüme",
      "y2016": 5,
      "y2018": 5,
      "y2020": 5,
      "y2022": 5,
      "y2024": 5,
      "avg": 5,
      "importance": "Yüksek"
    },
    {
      "topic": "İktisadi Düşünceler & Türkiye Ekonomisi",
      "y2016": 5,
      "y2018": 5,
      "y2020": 5,
      "y2022": 5,
      "y2024": 5,
      "avg": 5,
      "importance": "Yüksek"
    }
  ],
  "Maliye": [
    {
      "topic": "Maliye Teorisi & Kamusal Mallar",
      "y2016": 6,
      "y2018": 6,
      "y2020": 6,
      "y2022": 6,
      "y2024": 6,
      "avg": 6,
      "importance": "Yüksek"
    },
    {
      "topic": "Kamu Harcamaları & Gelirleri",
      "y2016": 7,
      "y2018": 7,
      "y2020": 7,
      "y2022": 7,
      "y2024": 7,
      "avg": 7,
      "importance": "Yüksek"
    },
    {
      "topic": "Türk Vergi Sistemi",
      "y2016": 8,
      "y2018": 8,
      "y2020": 8,
      "y2022": 8,
      "y2024": 8,
      "avg": 8,
      "importance": "Yüksek"
    },
    {
      "topic": "Devlet Bütçesi & Borçlanma",
      "y2016": 7,
      "y2018": 7,
      "y2020": 7,
      "y2022": 7,
      "y2024": 7,
      "avg": 7,
      "importance": "Yüksek"
    }
  ],
  "Uluslararası İlişkiler": [
    {
      "topic": "Siyasi Tarih (Vestfalya, Savaşlar)",
      "y2016": 12,
      "y2018": 12,
      "y2020": 12,
      "y2022": 12,
      "y2024": 12,
      "avg": 12,
      "importance": "Yüksek"
    },
    {
      "topic": "Uluslararası İlişkiler Teorileri",
      "y2016": 10,
      "y2018": 10,
      "y2020": 10,
      "y2022": 10,
      "y2024": 10,
      "avg": 10,
      "importance": "Yüksek"
    },
    {
      "topic": "Türk Dış Politikası",
      "y2016": 9,
      "y2018": 9,
      "y2020": 9,
      "y2022": 9,
      "y2024": 9,
      "avg": 9,
      "importance": "Yüksek"
    },
    {
      "topic": "Uluslararası Hukuk & Örgütler",
      "y2016": 9,
      "y2018": 9,
      "y2020": 9,
      "y2022": 9,
      "y2024": 9,
      "avg": 9,
      "importance": "Yüksek"
    }
  ]
};
