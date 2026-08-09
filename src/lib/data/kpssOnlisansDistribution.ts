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

export const kpssOnlisansDistributionData: Record<string, QuestionDistRow[]> = {
  "Türkçe": [
    { topic: "Sözcükte Anlam ve Sözcük GruplarÄ±", y2016: 3, y2018: 3, y2020: 2, y2022: 3, y2024: 2, avg: 2.6, importance: "Yüksek" },
    { topic: "Cümlede Anlam ve Cümle Yorumu", y2016: 3, y2018: 2, y2020: 3, y2022: 3, y2024: 3, avg: 2.8, importance: "Yüksek" },
    { topic: "Paragrafta Ana DüşŸünce ve YardÄ±mcÄ± DüşŸüncüler", y2016: 12, y2018: 13, y2020: 12, y2022: 12, y2024: 13, avg: 12.4, importance: "Yüksek" },
    { topic: "Paragrafta YapÄ±, Ä°kiye Bölme ve AkÄ±şŸÄ± Bozan Cümle", y2016: 3, y2018: 3, y2020: 4, y2022: 3, y2024: 3, avg: 3.2, importance: "Yüksek" },
    { topic: "Ses Bilgisi", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Sözcük Türleri (Ä°sim, SÄ±fat, Zamir, Zarf, Edat)", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Fiiller, Fiilimsiler ve Cümle ElemanlarÄ±", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "YazÄ±m KurallarÄ± ve Büyük Harfler", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Noktalama Ä°şŸaretleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "AnlatÄ±m BozukluÄŸu", y2016: 1, y2018: 1, y2020: 0, y2022: 1, y2024: 0, avg: 0.6, importance: "Standart" },
    { topic: "Sözel MantÄ±k Tablo OluşŸturma", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Sözel MantÄ±k SÄ±ralama ve EşŸleşŸtirme", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" }
  ],
  "Matematik": [
    { topic: "Temel Kavramlar ve SayÄ± Kümeleri", y2016: 3, y2018: 2, y2020: 3, y2022: 3, y2024: 3, avg: 2.8, importance: "Yüksek" },
    { topic: "Tek-İ‡ift SayÄ±lar ve ArdÄ±şŸÄ±k SayÄ±lar", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Bölme-Bölünebilme KurallarÄ± ve EBOB-EKOK", y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2024: 2, avg: 1.6, importance: "Orta" },
    { topic: "Rasyonel SayÄ±lar ve OndalÄ±k Kesirler", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "İœslü SayÄ±lar ve İœslü Denklemler", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Köklü SayÄ±lar ve Ä°şŸlemler", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 1, avg: 1.4, importance: "Standart" },
    { topic: "Basit EşŸitsizlikler ve AralÄ±klar", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Mutlak DeÄŸer", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "İ‡arpanlara AyÄ±rma ve İ–zdeşŸlikler", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Oran-OrantÄ± ve 1. Dereceden Denklemler", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "SayÄ± ve Kesir Problemleri", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "YaşŸ Problemleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Yüzde, Kİ¢r-Zarar ve Ä°skonto Problemleri", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "KarÄ±şŸÄ±m Problemleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "HÄ±z ve Hareket Problemleri", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 1, avg: 1.4, importance: "Standart" },
    { topic: "Ä°şŸçi ve Havuz Problemleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "SayÄ±sal MantÄ±k ve şekil-SayÄ± Ä°lişŸkileri", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Grafik Okuma ve Yorumlama (Daire/Sütun)", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Geometri: DoÄŸruda ve İœçgende AçÄ±lar", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Geometri: İ–zel İœçgenler ve İœçgende Alan", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Geometri: Dörtgenler ve İ‡okgenler", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Geometri: İ‡ember, Daire ve Geometrik Cisimler", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" }
  ],
  "Tarih": [
    { topic: "Ä°slamiyet İ–ncesi Türk Tarihi ve Kültür Medeniyet", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Ä°lk Türk-Ä°slam Devletleri ve Türkiye SelçuklularÄ±", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "OsmanlÄ± Devleti KuruluşŸ ve Yükselme Dönemleri", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "OsmanlÄ± Devleti Duraklama, Gerileme ve DaÄŸÄ±lma", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek" },
    { topic: "OsmanlÄ± Kültür ve Medeniyeti (Devlet, TÄ±mar, Ordu)", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "20. YüzyÄ±l BaşŸlarÄ±nda OsmanlÄ± (Trablusgarp, Balkan, I. Dünya)", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "KurtuluşŸ SavaşŸÄ± HazÄ±rlÄ±k Dönemi (Kongreler, I. TBMM)", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "KurtuluşŸ SavaşŸÄ± Muharebeler Dönemi ve AntlaşŸmalar", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Atatürk Ä°nkÄ±laplarÄ± (Siyasal, Hukuk, EÄŸitim, Ekonomi)", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek" },
    { topic: "Atatürk Ä°lkeleri ve Atatürk Dönemi DÄ±şŸ Politika", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "İ‡aÄŸdaşŸ Türk ve Dünya Tarihi", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" }
  ],
  "CoÄŸrafya": [
    { topic: "Türkiye'nin CoÄŸrafi Konumu, Meridyen ve KomşŸularÄ±", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Türkiye'nin Yeryüzü şekillerinin OluşŸumu (DaÄŸlar, Ovalar)", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Türkiye'nin AkarsularÄ±, Gölleri ve KÄ±yÄ± Tipleri", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Türkiye'de Ä°klim Tipleri, YaÄŸÄ±şŸ ve Bitki İ–rtüsü", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Türkiye'de Nüfusun DaÄŸÄ±lÄ±şŸÄ±, YapÄ±sÄ± ve Göçler", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "KÄ±r ve Kent YerleşŸme Tipleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Türkiye'de TarÄ±m İœrünleri, Sulama ve HayvancÄ±lÄ±k", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Türkiye'nin Madenleri ve Enerji KaynaklarÄ±", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Sanayi DallarÄ± ve KuruluşŸ Faktörleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "UlaşŸÄ±m AÄŸlarÄ±, Ä°ç/DÄ±şŸ Ticaret ve Turizm Merkezleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Bölgesel KalkÄ±nma Projeleri (GAP, DAP, DOKAP, KOP)", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" }
  ],
  "VatandaşŸlÄ±k": [
    { topic: "Hukuka GirişŸ, Sosyal Hayat KurallarÄ± ve Hukuk Türleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Hak KavramÄ±, KişŸilik ve Ehliyet Türleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Anayasa Hukuku ve 1982 AnayasasÄ± Temel Ä°lkeleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Temel Hak ve İ–devler (KişŸi, Sosyal, Siyasi Haklar)", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Yasama OrganÄ±: TBMM YapÄ±sÄ±, Seçimler ve Kanunlar", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Yürütme OrganÄ±: CumhurbaşŸkanÄ± ve Kararnameler", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "YargÄ± OrganÄ±: Yüksek Mahkemeler (AYM, YargÄ±tay, DanÄ±şŸtay)", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Ä°dare Hukuku ve Ä°dari TeşŸkilat (Merkez / TaşŸra)", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" }
  ]
};

