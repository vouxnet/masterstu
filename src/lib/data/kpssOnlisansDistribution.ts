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
    { topic: "Sözcükte Anlam", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 2, avg: 1.6, importance: "Orta" },
    { topic: "Cümlede Anlam", y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2024: 1, avg: 1.4, importance: "Orta" },
    { topic: "Sözcük Türleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Sözcükte Yapı", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Cümlenin Ögeleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Cümle Türleri", y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2024: 0, avg: 0.4, importance: "Standart" },
    { topic: "Dil Bilgisi Ses Olayları", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Yazım Kuralları", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Noktalama İşaretleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Anlatım Bozuklukları", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Paragrafta Anlam", y2016: 14, y2018: 15, y2020: 14, y2022: 15, y2024: 15, avg: 14.6, importance: "Yüksek" },
    { topic: "Paragrafta Anlatım Biçimi", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Sözel Mantık", y2016: 4, y2018: 1, y2020: 4, y2022: 4, y2024: 4, avg: 3.4, importance: "Yüksek" }
  ],
  "Matematik": [
    { topic: "Temel Kavramlar", y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2024: 0, avg: 0.4, importance: "Standart" },
    { topic: "Sayılar - Ebob-Ekok", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Rasyonel Sayılar - Ondalıklı Sayılar", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Basit Eşitsizlikler", y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2024: 0, avg: 0.4, importance: "Standart" },
    { topic: "Mutlak Değer", y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2024: 1, avg: 0.6, importance: "Standart" },
    { topic: "Üslü Sayılar", y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2024: 1, avg: 1.4, importance: "Orta" },
    { topic: "Denklem Çözme", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Sayı Problemleri", y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2024: 1, avg: 1.4, importance: "Orta" },
    { topic: "Kesir Problemleri", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Yaş Problemleri", y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2024: 1, avg: 0.6, importance: "Standart" },
    { topic: "İşçi ve Havuz Problemleri", y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2024: 1, avg: 0.6, importance: "Standart" },
    { topic: "Hareket-Hız Problemleri", y2016: 1, y2018: 1, y2020: 1, y2022: 0, y2024: 0, avg: 0.6, importance: "Standart" },
    { topic: "Yüzde-Kâr-Zarar Problemleri", y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2024: 0, avg: 0.4, importance: "Standart" },
    { topic: "Karışım Problemleri", y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2024: 0, avg: 0.4, importance: "Standart" },
    { topic: "Grafik Problemleri", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 2, avg: 1.6, importance: "Orta" },
    { topic: "Kümeler ve Problemleri", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 2, avg: 1.6, importance: "Orta" },
    { topic: "Fonksiyonlar", y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2024: 1, avg: 0.6, importance: "Standart" },
    { topic: "Olasılık", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Sayısal Mantık", y2016: 2, y2018: 3, y2020: 2, y2022: 3, y2024: 3, avg: 2.6, importance: "Yüksek" },
    { topic: "Şekil Yetenek", y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2024: 0, avg: 0.4, importance: "Standart" }
  ],
  "Tarih": [
    { topic: "İslamiyet Öncesi Türk Tarihi", y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2024: 0, avg: 0.4, importance: "Standart" },
    { topic: "İslamiyet Öncesi Türk Devletlerinde Kültür Medeniyet", y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2024: 1, avg: 1.4, importance: "Orta" },
    { topic: "İlk Türk İslam Devletleri", y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2024: 1, avg: 1.4, importance: "Orta" },
    { topic: "İlk Türk İslam Devletlerinde Kültür ve Medeniyet", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Osmanlı Devleti Kuruluş ve Yükselme Dönemi", y2016: 2, y2018: 1, y2020: 2, y2022: 1, y2024: 1, avg: 1.4, importance: "Orta" },
    { topic: "17. Yüzyıl Osmanlı Devleti Duraklama Dönemi", y2016: 3, y2018: 1, y2020: 3, y2022: 1, y2024: 1, avg: 1.8, importance: "Orta" },
    { topic: "18. Yüzyıl Osmanlı Devleti Gerileme Dönemi", y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2024: 1, avg: 0.6, importance: "Standart" },
    { topic: "19. Yüzyıl Osmanlı Devleti Dağılma Dönemi", y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2024: 1, avg: 0.6, importance: "Standart" },
    { topic: "20. Yüzyıl Osmanlı Devleti", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Osmanlı Devleti Kültür ve Medeniyet", y2016: 1, y2018: 4, y2020: 1, y2022: 4, y2024: 4, avg: 2.8, importance: "Yüksek" },
    { topic: "Milli Mücadele Dönemi", y2016: 3, y2018: 4, y2020: 3, y2022: 4, y2024: 4, avg: 3.6, importance: "Yüksek" },
    { topic: "İnkılap Tarihi", y2016: 3, y2018: 5, y2020: 3, y2022: 5, y2024: 5, avg: 4.2, importance: "Yüksek" },
    { topic: "Atatürk Dönemi İç ve Dış Politikalar", y2016: 5, y2018: 1, y2020: 5, y2022: 1, y2024: 1, avg: 2.6, importance: "Yüksek" },
    { topic: "Çağdaş Türk ve Dünya Tarihi", y2016: 2, y2018: 4, y2020: 2, y2022: 4, y2024: 4, avg: 3.2, importance: "Yüksek" }
  ],
  "Coğrafya": [
    { topic: "Türkiye'nin Coğrafi Konumu", y2016: 1, y2018: 2, y2020: 1, y2022: 2, y2024: 2, avg: 1.6, importance: "Orta" },
    { topic: "Türkiye'nin İklimi ve Bitki Örtüsü", y2016: 3, y2018: 2, y2020: 3, y2022: 2, y2024: 2, avg: 2.4, importance: "Orta" },
    { topic: "Türkiye'nin Fiziki Özellikleri", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Yüksek" },
    { topic: "Türkiye'de Nüfus ve Yerleşme", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Tarım", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Hayvancılık", y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2024: 1, avg: 0.6, importance: "Standart" },
    { topic: "Madenler ve Enerji Kaynakları", y2016: 2, y2018: 2, y2020: 2, y2022: 2, y2024: 2, avg: 2.0, importance: "Orta" },
    { topic: "Sanayi ve Endüstri", y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2024: 1, avg: 0.6, importance: "Standart" },
    { topic: "Ulaşım", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Ticaret", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Turizm", y2016: 1, y2018: 1, y2020: 1, y2022: 1, y2024: 1, avg: 1.0, importance: "Orta" },
    { topic: "Bölgeler Coğrafyası", y2016: 1, y2018: 0, y2020: 1, y2022: 0, y2024: 0, avg: 0.4, importance: "Standart" }
  ],
  "Vatandaşlık": [
    { topic: "Temel Hukuk Kavramları", y2016: 3, y2018: 3, y2020: 3, y2022: 3, y2024: 3, avg: 3.0, importance: "Yüksek" },
    { topic: "Anayasal Kavramlar", y2016: 0, y2018: 0, y2020: 0, y2022: 0, y2024: 0, avg: 0.0, importance: "Standart" },
    { topic: "Türk Anayasa Tarihi", y2016: 0, y2018: 0, y2020: 0, y2022: 0, y2024: 0, avg: 0.0, importance: "Standart" },
    { topic: "Temel Hak Ödevler", y2016: 0, y2018: 0, y2020: 0, y2022: 0, y2024: 0, avg: 0.0, importance: "Standart" },
    { topic: "Yasama", y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2024: 1, avg: 0.6, importance: "Standart" },
    { topic: "Yürütme", y2016: 3, y2018: 2, y2020: 3, y2022: 2, y2024: 2, avg: 2.4, importance: "Orta" },
    { topic: "Yargı", y2016: 0, y2018: 1, y2020: 0, y2022: 1, y2024: 1, avg: 0.6, importance: "Standart" },
    { topic: "İdare Hukuku", y2016: 3, y2018: 2, y2020: 3, y2022: 2, y2024: 2, avg: 2.4, importance: "Orta" }
  ]
};
