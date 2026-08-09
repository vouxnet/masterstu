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

export const kpssLisansDistributionData: Record<string, QuestionDistRow[]> = {
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
      "topic": "Sözcükte YapÄ±",
      "y2016": 3,
      "y2018": 2,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.6,
      "importance": "Orta"
    },
    {
      "topic": "Cümlenin İ–geleri",
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
      "topic": "Dil Bilgisi Ses OlaylarÄ±",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "YazÄ±m KurallarÄ±",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Noktalama Ä°şŸaretleri",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "AnlatÄ±m BozukluklarÄ±",
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
      "topic": "Paragrafta AnlatÄ±m Biçim",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Sözel MantÄ±k",
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
      "topic": "Rasyonel SayÄ±lar- OndalÄ±klÄ± SayÄ±lar",
      "y2016": 2,
      "y2018": 2,
      "y2020": 2,
      "y2022": 2,
      "y2024": 5,
      "avg": 2.6,
      "importance": "Orta"
    },
    {
      "topic": "Basit EşŸitsizlikler",
      "y2016": 2,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.2,
      "importance": "Standart"
    },
    {
      "topic": "Mutlak DeÄŸer",
      "y2016": 2,
      "y2018": 2,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.4,
      "importance": "Standart"
    },
    {
      "topic": "İœslü SayÄ±lar",
      "y2016": 2,
      "y2018": 2,
      "y2020": 3,
      "y2022": 2,
      "y2024": 2,
      "avg": 2.2,
      "importance": "Orta"
    },
    {
      "topic": "Köklü SayÄ±lar",
      "y2016": 2,
      "y2018": 2,
      "y2020": 2,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.6,
      "importance": "Orta"
    },
    {
      "topic": "İ‡arpanlara AyÄ±rma",
      "y2016": 2,
      "y2018": 2,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 2,
      "importance": "Orta"
    },
    {
      "topic": "Oran- OrantÄ±",
      "y2016": 2,
      "y2018": 2,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.4,
      "importance": "Standart"
    },
    {
      "topic": "Denklem İ‡özme",
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
      "topic": "Ä°şŸlem",
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
      "topic": "OlasÄ±lÄ±k",
      "y2016": 7,
      "y2018": 2,
      "y2020": 2,
      "y2022": 1,
      "y2024": 1,
      "avg": 2.6,
      "importance": "Orta"
    },
    {
      "topic": "SayÄ±sal MantÄ±k",
      "y2016": 3,
      "y2018": 3,
      "y2020": 6,
      "y2022": 4,
      "y2024": 4,
      "avg": 4,
      "importance": "Yüksek"
    },
    {
      "topic": "Geometrik Kavramlar ve AçÄ±lar",
      "y2016": 1,
      "y2018": 2,
      "y2020": 1,
      "y2022": 2,
      "y2024": 1,
      "avg": 1.4,
      "importance": "Standart"
    },
    {
      "topic": "İ‡okgenler ve Dörtgenler",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "İ‡ember ve Daire",
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
      "topic": "KatÄ± Cisimler",
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
      "topic": "Ä°slamiyet İ–ncesi Türk Tarihi-Ä°lk ve Orta İ‡aÄŸda Türk DünyasÄ±",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Ä°slamiyet İ–ncesi Türk Devletlerinde Kültür ve UygarlÄ±k",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Ä°lk Türk Ä°slam Devletleri -Türklerin Ä°slamiyeti Kabulü",
      "y2016": 1,
      "y2018": 2,
      "y2020": 0,
      "y2022": 2,
      "y2024": 0,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Ä°lk Türk Ä°slam Devletlerinde Kültür ve UygarlÄ±k",
      "y2016": 2,
      "y2018": 1,
      "y2020": 2,
      "y2022": 1,
      "y2024": 1,
      "avg": 1.4,
      "importance": "Standart"
    },
    {
      "topic": "OsmanlÄ± Devleti Siyaseti",
      "y2016": 6,
      "y2018": 5,
      "y2020": 3,
      "y2022": 3,
      "y2024": 3,
      "avg": 4,
      "importance": "Yüksek"
    },
    {
      "topic": "OsmanlÄ± Devleti Kültür ve UygarlÄ±k",
      "y2016": 3,
      "y2018": 2,
      "y2020": 5,
      "y2022": 5,
      "y2024": 5,
      "avg": 4,
      "importance": "Yüksek"
    },
    {
      "topic": "20. YüzyÄ±l OsmanlÄ± Devleti",
      "y2016": 3,
      "y2018": 3,
      "y2020": 4,
      "y2022": 4,
      "y2024": 4,
      "avg": 3.6,
      "importance": "Yüksek"
    },
    {
      "topic": "KurtuluşŸ SavaşŸÄ±",
      "y2016": 3,
      "y2018": 2,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 2.2,
      "importance": "Orta"
    },
    {
      "topic": "Ä°nkÄ±lap Tarihi",
      "y2016": 3,
      "y2018": 3,
      "y2020": 5,
      "y2022": 5,
      "y2024": 5,
      "avg": 4.2,
      "importance": "Yüksek"
    },
    {
      "topic": "Atatürk Dönemi Ä°ç ve DÄ±şŸ Politikalar",
      "y2016": 1,
      "y2018": 4,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 2.2,
      "importance": "Orta"
    },
    {
      "topic": "Atatürk'ün Ä°lke ve Ä°nkÄ±laplarÄ±",
      "y2016": 2,
      "y2018": 1,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 1.8,
      "importance": "Orta"
    },
    {
      "topic": "İ‡aÄŸdaşŸ Türk ve Dünya EdebiyatÄ±",
      "y2016": 3,
      "y2018": 3,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 2.4,
      "importance": "Orta"
    }
  ],
  "CoÄŸrafya": [
    {
      "topic": "Türkiye'nin Ä°klimi ve Bitki İ–rtüsü",
      "y2016": 2,
      "y2018": 2,
      "y2020": 2,
      "y2022": 1,
      "y2024": 2,
      "avg": 1.8,
      "importance": "Orta"
    },
    {
      "topic": "Türkiye'nin Fiziki İ–zellikleri",
      "y2016": 5,
      "y2018": 5,
      "y2020": 4,
      "y2022": 6,
      "y2024": 5,
      "avg": 5,
      "importance": "Yüksek"
    },
    {
      "topic": "Türkiye'de Nüfus ve YerleşŸme",
      "y2016": 3,
      "y2018": 1,
      "y2020": 2,
      "y2022": 2,
      "y2024": 2,
      "avg": 2,
      "importance": "Orta"
    },
    {
      "topic": "TarÄ±m",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 2,
      "y2024": 1,
      "avg": 1.2,
      "importance": "Standart"
    },
    {
      "topic": "HayvancÄ±lÄ±k",
      "y2016": 1,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Madenler ve Enerji KaynaklarÄ±",
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
      "topic": "UlaşŸÄ±m",
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
      "topic": "Bölgeler CoÄŸrafyasÄ±",
      "y2016": 0,
      "y2018": 1,
      "y2020": 1,
      "y2022": 1,
      "y2024": 1,
      "avg": 0.8,
      "importance": "Standart"
    }
  ],
  "VatandaşŸlÄ±k": [
    {
      "topic": "Temel Hukuk KavramlarÄ±",
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
      "topic": "Temel Hak İ–devler",
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
      "topic": "YargÄ±",
      "y2016": 1,
      "y2018": 1,
      "y2020": 2,
      "y2022": 0,
      "y2024": 1,
      "avg": 1,
      "importance": "Standart"
    },
    {
      "topic": "Ä°dare Hukuku",
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
      "topic": "Ä°dare Hukuku & Ä°dari YargÄ±",
      "y2016": 7,
      "y2018": 7,
      "y2020": 7,
      "y2022": 7,
      "y2024": 7,
      "avg": 7,
      "importance": "Yüksek"
    },
    {
      "topic": "Ceza Hukuku (Genel & İ–zel)",
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
      "topic": "Ticaret Hukuku & Ä°cra Ä°flas",
      "y2016": 5,
      "y2018": 6,
      "y2020": 6,
      "y2022": 5,
      "y2024": 6,
      "avg": 5.6,
      "importance": "Yüksek"
    }
  ],
  "Ä°ktisat": [
    {
      "topic": "Mikro Ä°ktisat (Fayda, İœretici, Piyasalar)",
      "y2016": 12,
      "y2018": 12,
      "y2020": 12,
      "y2022": 12,
      "y2024": 12,
      "avg": 12,
      "importance": "Yüksek"
    },
    {
      "topic": "Makro Ä°ktisat (IS-LM, Milli Gelir)",
      "y2016": 10,
      "y2018": 10,
      "y2020": 10,
      "y2022": 10,
      "y2024": 10,
      "avg": 10,
      "importance": "Yüksek"
    },
    {
      "topic": "Para-Banka & Merkez BankacÄ±lÄ±ÄŸÄ±",
      "y2016": 4,
      "y2018": 4,
      "y2020": 4,
      "y2022": 4,
      "y2024": 4,
      "avg": 4,
      "importance": "Orta"
    },
    {
      "topic": "UluslararasÄ± Ä°ktisat & Büyüme",
      "y2016": 5,
      "y2018": 5,
      "y2020": 5,
      "y2022": 5,
      "y2024": 5,
      "avg": 5,
      "importance": "Yüksek"
    },
    {
      "topic": "Ä°ktisadi DüşŸünceler & Türkiye Ekonomisi",
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
      "topic": "Kamu HarcamalarÄ± & Gelirleri",
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
  "UluslararasÄ± Ä°lişŸkiler": [
    {
      "topic": "Siyasi Tarih (Vestfalya, SavaşŸlar)",
      "y2016": 12,
      "y2018": 12,
      "y2020": 12,
      "y2022": 12,
      "y2024": 12,
      "avg": 12,
      "importance": "Yüksek"
    },
    {
      "topic": "UluslararasÄ± Ä°lişŸkiler Teorileri",
      "y2016": 10,
      "y2018": 10,
      "y2020": 10,
      "y2022": 10,
      "y2024": 10,
      "avg": 10,
      "importance": "Yüksek"
    },
    {
      "topic": "Türk DÄ±şŸ PolitikasÄ±",
      "y2016": 9,
      "y2018": 9,
      "y2020": 9,
      "y2022": 9,
      "y2024": 9,
      "avg": 9,
      "importance": "Yüksek"
    },
    {
      "topic": "UluslararasÄ± Hukuk & İ–rgütler",
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

