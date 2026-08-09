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

export const senaExactKitapSecData: Record<string, QuestionDistRow[]> = {
  "Türkçe": [
    { topic: "Sözcükte Anlam ve Sözcük Grupları", y2016: 3, y2018: 3, y2020: 2, y2022: 3, y2024: 2, avg: 2.6, importance: "Yüksek" },
    { topic: "Cümlede Anlam ve Cümle Yorumu", y2016: 3, y2018: 2, y2020: 3, y2022: 3, y2024: 3, avg: 2.8, importance: "Yüksek" },
    { topic: "Paragrafta Ana Düşünce ve Yardımcı Düşüncüler", y2016: 12, y2018: 13, y2020: 12, y2022: 12, y2024: 13, avg: 12.4, importance: "Yüksek" },
    { topic: "Paragrafta Yapı, İkiye Bölme ve Akışı Bozan Cümle", y2016: 3, y2018: 3, y2020: 4, y2022: 3, y2024: 3, avg: 3.2, importance: "Yüksek" },
    { topic: "Ses Bilgisi", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Sözcük Türleri (İsim, Sıfat, Zamir, Zarf, Edat)", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Fiiller, Fiilimsiler ve Cümle Elemanları", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Yazım Kuralları ve Büyük Harfler", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Noktalama İşaretleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Anlatım Bozukluğu", y2016: 1, y2018: 1, y2020: 0, y2022: 1, y2024: 0, avg: 0.6, importance: "Standart" },
    { topic: "Sözel Mantık Tablo Oluşturma", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Sözel Mantık Sıralama ve Eşleştirme", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" }
  ],
  "Matematik": [
    { topic: "Temel Kavramlar ve Sayı Kümeleri", y2016: 3, y2018: 2, y2020: 3, y2022: 3, y2024: 3, avg: 2.8, importance: "Yüksek" },
    { topic: "Tek-Çift Sayılar ve Ardışık Sayılar", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Bölme-Bölünebilme Kuralları ve EBOB-EKOK", y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2024: 2, avg: 1.6, importance: "Orta" },
    { topic: "Rasyonel Sayılar ve Ondalık Kesirler", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Üslü Sayılar ve Üslü Denklemler", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Köklü Sayılar ve İşlemler", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 1, avg: 1.4, importance: "Standart" },
    { topic: "Basit Eşitsizlikler ve Aralıklar", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Mutlak Değer", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Çarpanlara Ayırma ve Özdeşlikler", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Oran-Orantı ve 1. Dereceden Denklemler", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Sayı ve Kesir Problemleri", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Yaş Problemleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Yüzde, Kâr-Zarar ve İskonto Problemleri", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Karışım Problemleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Hız ve Hareket Problemleri", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 1, avg: 1.4, importance: "Standart" },
    { topic: "İşçi ve Havuz Problemleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Sayısal Mantık ve Şekil-Sayı İlişkileri", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Grafik Okuma ve Yorumlama (Daire/Sütun)", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Geometri: Doğruda ve Üçgende Açılar", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Geometri: Özel Üçgenler ve Üçgende Alan", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Geometri: Dörtgenler ve Çokgenler", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Geometri: Çember, Daire ve Geometrik Cisimler", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" }
  ],
  "Tarih": [
    { topic: "İslamiyet Öncesi Türk Tarihi ve Kültür Medeniyet", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "İlk Türk-İslam Devletleri ve Türkiye Selçukluları", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Osmanlı Devleti Kuruluş ve Yükselme Dönemleri", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Osmanlı Devleti Duraklama, Gerileme ve Dağılma", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek" },
    { topic: "Osmanlı Kültür ve Medeniyeti (Devlet, Tımar, Ordu)", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "20. Yüzyıl Başlarında Osmanlı (Trablusgarp, Balkan, I. Dünya)", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Kurtuluş Savaşı Hazırlık Dönemi (Kongreler, I. TBMM)", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Kurtuluş Savaşı Muharebeler Dönemi ve Antlaşmalar", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Atatürk İnkılapları (Siyasal, Hukuk, Eğitim, Ekonomi)", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek" },
    { topic: "Atatürk İlkeleri ve Atatürk Dönemi Dış Politika", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Çağdaş Türk ve Dünya Tarihi", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" }
  ],
  "Coğrafya": [
    { topic: "Türkiye'nin Coğrafi Konumu, Meridyen ve Komşuları", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Türkiye'nin Yeryüzü Şekillerinin Oluşumu (Dağlar, Ovalar)", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Türkiye'nin Akarsuları, Gölleri ve Kıyı Tipleri", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Türkiye'de İklim Tipleri, Yağış ve Bitki Örtüsü", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Türkiye'de Nüfusun Dağılışı, Yapısı ve Göçler", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Kır ve Kent Yerleşme Tipleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Türkiye'de Tarım Ürünleri, Sulama ve Hayvancılık", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Türkiye'nin Madenleri ve Enerji Kaynakları", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Sanayi Dalları ve Kuruluş Faktörleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Ulaşım Ağları, İç/Dış Ticaret ve Turizm Merkezleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Bölgesel Kalkınma Projeleri (GAP, DAP, DOKAP, KOP)", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" }
  ],
  "Vatandaşlık": [
    { topic: "Hukuka Giriş, Sosyal Hayat Kuralları ve Hukuk Türleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Hak Kavramı, Kişilik ve Ehliyet Türleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Anayasa Hukuku ve 1982 Anayasası Temel İlkeleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Temel Hak ve Ödevler (Kişi, Sosyal, Siyasi Haklar)", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Yasama Organı: TBMM Yapısı, Seçimler ve Kanunlar", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Yürütme Organı: Cumhurbaşkanı ve Kararnameler", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "Yargı Organı: Yüksek Mahkemeler (AYM, Yargıtay, Danıştay)", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" },
    { topic: "İdare Hukuku ve İdari Teşkilat (Merkez / Taşra)", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Standart" }
  ]
};
