export interface CurriculumTopic {
  id: string;
  userRole: "lisans_alan" | "onlisans" | "ortaogretim" | "yds" | "ales";
  course: string;
  unit: string;
  topic: string;
  questionWeight: number; // estimated number of questions in ÖSYM exams
  status: "not_started" | "studying" | "solved" | "review";
  osymFrequencyPercent?: number; // e.g. 100 for 100%
  osymAnalysisNote?: string; // e.g. "🔥 Her Yıl Çıkar (Son 10 yılda 21 soru)"
}

export const initialCurriculumData: CurriculumTopic[] = [
  // ==================== KPSS ÖNLİSANS (RESMİ ÖSYM KONU LİSTESİ & ANALİZ) ====================
  // 1. TÜRKÇE (30 SORU)
  { id: "onl-tr-1", userRole: "onlisans", course: "Türkçe", unit: "Anlam Bilgisi", topic: "Sözcükte Anlam ve Sözcük Grupları", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Çıkar (1-2 Soru)" },
  { id: "onl-tr-2", userRole: "onlisans", course: "Türkçe", unit: "Anlam Bilgisi", topic: "Cümlede Anlam ve Cümle Yorumu", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Çıkar (1-2 Soru)" },
  { id: "onl-tr-3", userRole: "onlisans", course: "Türkçe", unit: "Dil Bilgisi", topic: "Sözcük Türleri (İsim, Sıfat, Zamir, Zarf, Edat)", questionWeight: 1, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Çok Yüksek İhtimal" },
  { id: "onl-tr-4", userRole: "onlisans", course: "Türkçe", unit: "Dil Bilgisi", topic: "Sözcükte Yapı ve Ekler", questionWeight: 1, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Düzenli Sorulur" },
  { id: "onl-tr-5", userRole: "onlisans", course: "Türkçe", unit: "Dil Bilgisi", topic: "Cümlenin Ögeleri ve Cümle Türleri", questionWeight: 1, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Sık Çıkar" },
  { id: "onl-tr-6", userRole: "onlisans", course: "Türkçe", unit: "Dil Bilgisi", topic: "Ses Olayları ve Ses Bilgisi", questionWeight: 1, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Düzenli Sorulur" },
  { id: "onl-tr-7", userRole: "onlisans", course: "Türkçe", unit: "Yazım ve Noktalama", topic: "Yazım Kuralları ve Büyük Harflerin Kullanımı", questionWeight: 1, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 1 Soru" },
  { id: "onl-tr-8", userRole: "onlisans", course: "Türkçe", unit: "Yazım ve Noktalama", topic: "Noktalama İşaretleri", questionWeight: 1, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 1 Soru" },
  { id: "onl-tr-9", userRole: "onlisans", course: "Türkçe", unit: "Dil Bilgisi", topic: "Anlatım Bozuklukları", questionWeight: 1, status: "not_started", osymFrequencyPercent: 70, osymAnalysisNote: "📌 Dönemsel Sorulur" },
  { id: "onl-tr-10", userRole: "onlisans", course: "Türkçe", unit: "Paragraf", topic: "Paragrafta Anlam, Ana Düşünce ve Yardımcı Düşünce", questionWeight: 15, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Sınavın %50'si (14-15 Soru)" },
  { id: "onl-tr-11", userRole: "onlisans", course: "Türkçe", unit: "Paragraf", topic: "Paragrafta Yapı ve Anlatım Biçimleri", questionWeight: 1, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Çıkar" },
  { id: "onl-tr-12", userRole: "onlisans", course: "Türkçe", unit: "Sözel Mantık", topic: "Sözel Mantık Tablo ve Sıralama Soruları", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 4 Soru" },

  // 2. MATEMATİK & GEOMETRİ (30 SORU)
  { id: "onl-mat-1", userRole: "onlisans", course: "Matematik", unit: "Temel Matematik", topic: "Temel Kavramlar ve Sayı Kümeleri", questionWeight: 1, status: "not_started", osymFrequencyPercent: 57, osymAnalysisNote: "📌 2 Yılda Bir Çıkar" },
  { id: "onl-mat-2", userRole: "onlisans", course: "Matematik", unit: "Temel Matematik", topic: "Sayılar, Bölünebilme ve EBOB-EKOK", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 3 Soru" },
  { id: "onl-mat-3", userRole: "onlisans", course: "Matematik", unit: "Temel Matematik", topic: "Rasyonel Sayılar ve Ondalıklı Sayılar", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 2 Soru" },
  { id: "onl-mat-4", userRole: "onlisans", course: "Matematik", unit: "Cebir", topic: "Basit Eşitsizlikler ve Mutlak Değer", questionWeight: 1, status: "not_started", osymFrequencyPercent: 57, osymAnalysisNote: "📌 Düzenli Sorulur" },
  { id: "onl-mat-5", userRole: "onlisans", course: "Matematik", unit: "Cebir", topic: "Üslü Sayılar ve Köklü Sayılar", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 1-2 Soru" },
  { id: "onl-mat-6", userRole: "onlisans", course: "Matematik", unit: "Cebir", topic: "Denklem Çözme ve Çarpanlara Ayırma", questionWeight: 1, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 1 Soru" },
  { id: "onl-mat-7", userRole: "onlisans", course: "Matematik", unit: "Problemler", topic: "Sayı ve Kesir Problemleri", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 2-3 Soru" },
  { id: "onl-mat-8", userRole: "onlisans", course: "Matematik", unit: "Problemler", topic: "Yaş, İşçi ve Havuz Problemleri", questionWeight: 1, status: "not_started", osymFrequencyPercent: 71, osymAnalysisNote: "⚡ Yüksek İhtimal" },
  { id: "onl-mat-9", userRole: "onlisans", course: "Matematik", unit: "Problemler", topic: "Hareket-Hız ve Yüzde-Kâr-Zarar Problemleri", questionWeight: 1, status: "not_started", osymFrequencyPercent: 71, osymAnalysisNote: "⚡ Yüksek İhtimal" },
  { id: "onl-mat-10", userRole: "onlisans", course: "Matematik", unit: "Problemler", topic: "Karışım ve Grafik Problemleri", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 1-2 Soru (Grafik)" },
  { id: "onl-mat-11", userRole: "onlisans", course: "Matematik", unit: "Mantık & Kümeler", topic: "Kümeler, Fonksiyonlar ve Olasılık", questionWeight: 3, status: "not_started", osymFrequencyPercent: 86, osymAnalysisNote: "⚡ Her Yıl 2-3 Soru" },
  { id: "onl-mat-12", userRole: "onlisans", course: "Matematik", unit: "Sayısal Mantık", topic: "Sayısal Mantık ve Şekil-Sayı İlişkileri", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 3 Soru" },
  { id: "onl-mat-13", userRole: "onlisans", course: "Matematik", unit: "Cebir", topic: "Faktöriyel", questionWeight: 2, status: "not_started", osymFrequencyPercent: 60, osymAnalysisNote: "📌 Son Yıllarda Her Sınavda 2 Soru!" },

  // 3. TARİH (27 SORU)
  { id: "onl-tar-1", userRole: "onlisans", course: "Tarih", unit: "İslamiyet Öncesi Türk Tarihi", topic: "İslamiyet Öncesi Türk Tarihi ve Kültür Medeniyeti", questionWeight: 2, status: "not_started", osymFrequencyPercent: 70, osymAnalysisNote: "⚡ Düzenli Sorulur (1-2 Soru)" },
  { id: "onl-tar-2", userRole: "onlisans", course: "Tarih", unit: "Türk-İslam Tarihi", topic: "İlk Türk İslam Devletleri ve Kültür Medeniyeti", questionWeight: 3, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Her Yıl 2 Soru" },
  { id: "onl-tar-3", userRole: "onlisans", course: "Tarih", unit: "Osmanlı Siyasi Tarihi", topic: "Osmanlı Devleti Kuruluş, Yükselme ve Duraklama Dönemleri", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 2-3 Soru" },
  { id: "onl-tar-4", userRole: "onlisans", course: "Tarih", unit: "Osmanlı Siyasi Tarihi", topic: "Osmanlı Devleti Gerileme, Dağılma ve 20. Yüzyıl", questionWeight: 2, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Yüksek İhtimal" },
  { id: "onl-tar-5", userRole: "onlisans", course: "Tarih", unit: "Osmanlı Medeniyeti", topic: "Osmanlı Devleti Kültür ve Medeniyeti", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 4 Soru" },
  { id: "onl-tar-6", userRole: "onlisans", course: "Tarih", unit: "Milli Mücadele", topic: "Milli Mücadele Hazırlık ve Muharebeler Dönemi", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 4 Soru" },
  { id: "onl-tar-7", userRole: "onlisans", course: "Tarih", unit: "İnkılap Tarihi", topic: "Atatürk İnkılapları, İlkeleri ve İç/Dış Politikalar", questionWeight: 5, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 5 Soru" },
  { id: "onl-tar-8", userRole: "onlisans", course: "Tarih", unit: "Çağdaş Tarih", topic: "Çağdaş Türk ve Dünya Tarihi", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 3-4 Soru" },

  // 4. COĞRAFYA (18 SORU)
  { id: "onl-cog-1", userRole: "onlisans", course: "Coğrafya", unit: "Coğrafi Konum", topic: "Türkiye'nin Coğrafi Konumu ve Özellikleri", questionWeight: 2, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Her Yıl 1-2 Soru" },
  { id: "onl-cog-2", userRole: "onlisans", course: "Coğrafya", unit: "Fiziki Coğrafya", topic: "Türkiye'nin İklimi, Bitki Örtüsü ve Fiziki Özellikleri", questionWeight: 6, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Sınavın %30'u (4-6 Soru)" },
  { id: "onl-cog-3", userRole: "onlisans", course: "Coğrafya", unit: "Beşeri Coğrafya", topic: "Türkiye'de Nüfus, Yerleşme ve Göçler", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 2 Soru" },
  { id: "onl-cog-4", userRole: "onlisans", course: "Coğrafya", unit: "Ekonomik Coğrafya", topic: "Tarım, Hayvancılık, Madenler ve Enerji Kaynakları", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 4 Soru" },
  { id: "onl-cog-5", userRole: "onlisans", course: "Coğrafya", unit: "Ekonomik Coğrafya", topic: "Sanayi, Ulaşım, Ticaret ve Turizm", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 4 Soru" },

  // 5. VATANDAŞLIK (9 SORU)
  { id: "onl-vat-1", userRole: "onlisans", course: "Vatandaşlık", unit: "Hukuka Giriş", topic: "Temel Hukuk Kavramları ve Hukuk Düzeni", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 3 Soru" },
  { id: "onl-vat-2", userRole: "onlisans", course: "Vatandaşlık", unit: "Anayasa Hukuku", topic: "Anayasal Kavramlar, Yasama ve Yargı Organları", questionWeight: 2, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Her Yıl 1-2 Soru" },
  { id: "onl-vat-3", userRole: "onlisans", course: "Vatandaşlık", unit: "Anayasa Hukuku", topic: "1982 Anayasası Yürütme Organı ve Cumhurbaşkanlığı", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 2 Soru" },
  { id: "onl-vat-4", userRole: "onlisans", course: "Vatandaşlık", unit: "İdare Hukuku", topic: "İdare Hukuku ve İdari Teşkilat Yapısı", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 2-3 Soru" },

  // ==================== RESMİ ÖSYM KPSS LİSANS GY-GK VE ALAN BİLGİSİ (A GRUBU) ====================
  // LİSANS TÜRKÇE (30 SORU)
  { id: "lis-tr-1", userRole: "lisans_alan", course: "Türkçe", unit: "Anlam Bilgisi", topic: "Sözcükte Anlam, Deyim ve Atasözleri", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl 1-2 Soru" },
  { id: "lis-tr-2", userRole: "lisans_alan", course: "Türkçe", unit: "Anlam Bilgisi", topic: "Cümlede Anlam ve Cümle Yorumlama", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl 2 Soru" },
  { id: "lis-tr-3", userRole: "lisans_alan", course: "Türkçe", unit: "Dil Bilgisi", topic: "Sözcük Türleri ve Yapısı", questionWeight: 2, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Düzenli Sorulur" },
  { id: "lis-tr-4", userRole: "lisans_alan", course: "Türkçe", unit: "Dil Bilgisi", topic: "Cümlenin Ögeleri ve Cümle Türleri", questionWeight: 1, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Sık Çıkar" },
  { id: "lis-tr-5", userRole: "lisans_alan", course: "Türkçe", unit: "Yazım ve Noktalama", topic: "Yazım Kuralları ve Noktalama İşaretleri", questionWeight: 2, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 2 Soru" },
  { id: "lis-tr-6", userRole: "lisans_alan", course: "Türkçe", unit: "Paragraf", topic: "Paragrafta Anlam, Ana Fikir ve Yardımcı Düşünce", questionWeight: 15, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Sınavın %50'si (15 Soru)" },
  { id: "lis-tr-7", userRole: "lisans_alan", course: "Türkçe", unit: "Sözel Mantık", topic: "Sözel Mantık ve Akıl Yürütme Soruları", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 4 Soru" },

  // LİSANS MATEMATİK & GEOMETRİ (30 SORU)
  { id: "lis-mat-1", userRole: "lisans_alan", course: "Matematik", unit: "Temel Matematik", topic: "Temel Kavramlar, Bölünebilme ve EBOB-EKOK", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl 3 Soru" },
  { id: "lis-mat-2", userRole: "lisans_alan", course: "Matematik", unit: "Rasyonel & Cebir", topic: "Rasyonel Sayılar, Üslü ve Köklü Sayılar", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl 4 Soru" },
  { id: "lis-mat-3", userRole: "lisans_alan", course: "Matematik", unit: "Denklem & Çarpanlar", topic: "Çarpanlara Ayırma ve Denklem Çözme", questionWeight: 2, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Yüksek İhtimal" },
  { id: "lis-mat-4", userRole: "lisans_alan", course: "Matematik", unit: "Problemler", topic: "Sayı, Kesir, Yaş, Yüzde-Kâr-Zarar Problemleri", questionWeight: 5, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl 5 Soru" },
  { id: "lis-mat-5", userRole: "lisans_alan", course: "Matematik", unit: "Problemler", topic: "Hareket-Hız, Karışım ve Grafik Problemleri", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl 3 Soru" },
  { id: "lis-mat-6", userRole: "lisans_alan", course: "Matematik", unit: "Kümeler & Olasılık", topic: "Kümeler, Fonksiyonlar ve Olasılık Mantığı", questionWeight: 3, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Her Yıl 3 Soru" },
  { id: "lis-mat-7", userRole: "lisans_alan", course: "Matematik", unit: "Sayısal Mantık", topic: "Sayısal Mantık ve Analitik Akıl Yürütme", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl 4 Soru" },
  { id: "lis-mat-8", userRole: "lisans_alan", course: "Matematik", unit: "Geometri", topic: "Geometri (Açılar, Üçgenler, Analitik Geometri)", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 3 Soru" },

  // LİSANS TARİH (27 SORU)
  { id: "lis-tar-1", userRole: "lisans_alan", course: "Tarih", unit: "İslamiyet Öncesi Türk Tarihi", topic: "İslamiyet Öncesi Türk Tarihi ve Teşkilatı", questionWeight: 1, status: "not_started", osymFrequencyPercent: 75, osymAnalysisNote: "📌 Her Yıl 1 Soru" },
  { id: "lis-tar-2", userRole: "lisans_alan", course: "Tarih", unit: "Türk-İslam Tarihi", topic: "İlk Türk-İslam Devletleri ve Medeniyeti", questionWeight: 2, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Her Yıl 2 Soru" },
  { id: "lis-tar-3", userRole: "lisans_alan", course: "Tarih", unit: "Osmanlı Siyasi Tarihi", topic: "Osmanlı Devleti Kuruluş, Yükselme ve Islahatlar", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl 3 Soru" },
  { id: "lis-tar-4", userRole: "lisans_alan", course: "Tarih", unit: "Osmanlı Medeniyeti", topic: "Osmanlı Kültür ve Medeniyeti (İdare, Ordu, Toprak)", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 4 Soru" },
  { id: "lis-tar-5", userRole: "lisans_alan", course: "Tarih", unit: "Milli Mücadele", topic: "Trablusgarp, Balkan Savaşları ve 1. Dünya Savaşı", questionWeight: 2, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Düzenli Sorulur" },
  { id: "lis-tar-6", userRole: "lisans_alan", course: "Tarih", unit: "Milli Mücadele", topic: "Milli Mücadele Hazırlık ve Muharebeler Dönemi", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 4 Soru" },
  { id: "lis-tar-7", userRole: "lisans_alan", course: "Tarih", unit: "İnkılap Tarihi", topic: "Atatürk İnkılapları, İlkeleri ve İç/Dış Politika", questionWeight: 5, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 5 Soru" },
  { id: "lis-tar-8", userRole: "lisans_alan", course: "Tarih", unit: "Çağdaş Tarih", topic: "Çağdaş Türk ve Dünya Tarihi", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 3 Soru" },

  // LİSANS COĞRAFYA (18 SORU)
  { id: "lis-cog-1", userRole: "lisans_alan", course: "Coğrafya", unit: "Coğrafi Konum", topic: "Türkiye'nin Coğrafi Konumu ve Etkileri", questionWeight: 2, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Her Yıl 1-2 Soru" },
  { id: "lis-cog-2", userRole: "lisans_alan", course: "Coğrafya", unit: "Fiziki Coğrafya", topic: "Türkiye'nin Yeryüzü Şekilleri, İklimi ve Su Varlığı", questionWeight: 5, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Sınavın %30'u (5 Soru)" },
  { id: "lis-cog-3", userRole: "lisans_alan", course: "Coğrafya", unit: "Beşeri Coğrafya", topic: "Türkiye'de Nüfus, Yerleşme ve Göç Hareketleri", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 3 Soru" },
  { id: "lis-cog-4", userRole: "lisans_alan", course: "Coğrafya", unit: "Ekonomik Coğrafya", topic: "Tarım, Hayvancılık, Madenler ve Enerji Kaynakları", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 4 Soru" },
  { id: "lis-cog-5", userRole: "lisans_alan", course: "Coğrafya", unit: "Ekonomik Coğrafya", topic: "Sanayi, Ulaşım, Ticaret ve Turizm", questionWeight: 4, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 4 Soru" },

  // LİSANS VATANDAŞLIK & GÜNCEL (15 SORU)
  { id: "lis-vat-1", userRole: "lisans_alan", course: "Vatandaşlık", unit: "Hukuka Giriş", topic: "Temel Hukuk Kavramları ve Hukuk İlkeleri", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 3 Soru" },
  { id: "lis-vat-2", userRole: "lisans_alan", course: "Vatandaşlık", unit: "Anayasa Hukuku", topic: "1982 Anayasası Esasları, Yasama ve Yargı Organları", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 3 Soru" },
  { id: "lis-vat-3", userRole: "lisans_alan", course: "Vatandaşlık", unit: "Anayasa Hukuku", topic: "1982 Anayasası Yürütme ve Cumhurbaşkanlığı Kararnameleri", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 3 Soru" },
  { id: "lis-vat-4", userRole: "lisans_alan", course: "Vatandaşlık", unit: "İdare Hukuku", topic: "İdare Hukuku ve İdari Teşkilat Yapısı", questionWeight: 3, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 3 Soru" },
  { id: "lis-vat-5", userRole: "lisans_alan", course: "Vatandaşlık", unit: "Güncel Bilgiler", topic: "Güncel Sosyo-Politik Bilgiler ve Uluslararası Kuruluşlar", questionWeight: 6, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Her Yıl Kesin 6 Soru" },

  // LİSANS ALAN BİLGİSİ - HUKUK (40 SORU)
  { id: "h-1", userRole: "lisans_alan", course: "Hukuk", unit: "Anayasa Hukuku", topic: "Anayasa Hukukunun Temel Kavramları ve 1982 Anayasası", questionWeight: 6, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 6 Soru" },
  { id: "h-2", userRole: "lisans_alan", course: "Hukuk", unit: "İdare Hukuku", topic: "İdari Teşkilat, İdari İşlemler ve İdari Yargılama (Danıştay)", questionWeight: 7, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 7 Soru" },
  { id: "h-3", userRole: "lisans_alan", course: "Hukuk", unit: "Ceza Hukuku", topic: "Ceza Hukuku Genel Hükümler ve Suç Teorisi", questionWeight: 5, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 5 Soru" },
  { id: "h-4", userRole: "lisans_alan", course: "Hukuk", unit: "Medeni Hukuk", topic: "Medeni Hukuk (Başlangıç, Kişiler, Eşya Hukuku)", questionWeight: 6, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 6 Soru" },
  { id: "h-5", userRole: "lisans_alan", course: "Hukuk", unit: "Borçlar Hukuku", topic: "Borçlar Hukuku Genel Hükümler ve Sözleşmeler", questionWeight: 6, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 6 Soru" },
  { id: "h-6", userRole: "lisans_alan", course: "Hukuk", unit: "Ticaret Hukuku", topic: "Ticari İşletme, Şirketler Hukuku ve Kıymetli Evrak", questionWeight: 6, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 6 Soru" },
  { id: "h-7", userRole: "lisans_alan", course: "Hukuk", unit: "İcra İflas", topic: "İcra ve İflas Hukuku Esasları", questionWeight: 4, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Kesin 4 Soru" },

  // LİSANS ALAN BİLGİSİ - İKTİSAT (40 SORU)
  { id: "i-1", userRole: "lisans_alan", course: "İktisat", unit: "Mikro İktisat", topic: "Tüketici ve Üretici Teorisi, Piyasa Türleri", questionWeight: 12, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Sınavın %30'u (12 Soru)" },
  { id: "i-2", userRole: "lisans_alan", course: "İktisat", unit: "Makro İktisat", topic: "IS-LM Modeli, Enflasyon, İşsizlik ve Toplam Talep", questionWeight: 10, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 10 Soru" },
  { id: "i-3", userRole: "lisans_alan", course: "İktisat", unit: "Para & Banka", topic: "Para Teorisi, Bankacılık ve Merkez Bankası Politikaları", questionWeight: 6, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 6 Soru" },
  { id: "i-4", userRole: "lisans_alan", course: "İktisat", unit: "Uluslararası İktisat", topic: "Uluslararası Ticaret Teorileri ve Döviz Kuru Sistemleri", questionWeight: 5, status: "not_started", osymFrequencyPercent: 85, osymAnalysisNote: "⚡ Kesin 5 Soru" },
  { id: "i-5", userRole: "lisans_alan", course: "İktisat", unit: "Büyüme & Türkiye", topic: "İktisadi Büyüme Modelleri ve Türkiye Ekonomisi", questionWeight: 7, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 7 Soru" },

  // LİSANS ALAN BİLGİSİ - MALİYE (40 SORU)
  { id: "m-1", userRole: "lisans_alan", course: "Maliye", unit: "Maliye Teorisi", topic: "Kamusal Mallar, Dışsallıklar ve Kamu Tercihi", questionWeight: 6, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 6 Soru" },
  { id: "m-2", userRole: "lisans_alan", course: "Maliye", unit: "Kamu Giderleri", topic: "Kamu Harcamalarının Sınıflandırılması ve Artış Teorileri", questionWeight: 6, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 6 Soru" },
  { id: "m-3", userRole: "lisans_alan", course: "Maliye", unit: "Kamu Gelirleri", topic: "Vergi Teorisi, Verginin Yansıması ve Laffer Eğrisi", questionWeight: 8, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 8 Soru" },
  { id: "m-4", userRole: "lisans_alan", course: "Maliye", unit: "Devlet Bütçesi", topic: "Bütçe İlkeleri, Bütçe Kanunu ve Borçlanma", questionWeight: 8, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 8 Soru" },
  { id: "m-5", userRole: "lisans_alan", course: "Maliye", unit: "Maliye Politikası", topic: "Maliye Politikası ve Türk Vergi Sistemi (Gelir, Kurumlar, KDV)", questionWeight: 12, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Sınavın %30'u (12 Soru)" },

  // LİSANS ALAN BİLGİSİ - ULUSLARARASI İLİŞKİLER (40 SORU)
  { id: "ui-1", userRole: "lisans_alan", course: "Uluslararası İlişkiler", unit: "Teoriler", topic: "Uluslararası İlişkiler Teorileri (Realizm, Liberalizm, İnşacılık)", questionWeight: 10, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 10 Soru" },
  { id: "ui-2", userRole: "lisans_alan", course: "Uluslararası İlişkiler", unit: "Siyasi Tarih", topic: "1648 Vestfalya'dan Günümüze Siyasi Tarih", questionWeight: 10, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 10 Soru" },
  { id: "ui-3", userRole: "lisans_alan", course: "Uluslararası İlişkiler", unit: "Uluslararası Hukuk", topic: "Uluslararası Hukuk ve Uluslararası Örgütler (BM, NATO, AB)", questionWeight: 10, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 10 Soru" },
  { id: "ui-4", userRole: "lisans_alan", course: "Uluslararası İlişkiler", unit: "Türk Dış Politikası", topic: "Türk Dış Politikası Dönemleri ve Kriz Yönetimi", questionWeight: 10, status: "not_started", osymFrequencyPercent: 100, osymAnalysisNote: "🔥 Kesin 10 Soru" },

  // ==================== ORTAÖĞRETİM (LİSE) ====================
  { id: "ort-tr-1", userRole: "ortaogretim", course: "Türkçe", unit: "Sözcükte Anlam", topic: "Sözcükte Anlam", questionWeight: 1, status: "not_started" },
  { id: "ort-tr-2", userRole: "ortaogretim", course: "Türkçe", unit: "Cümlede Anlam", topic: "Cümlede Anlam", questionWeight: 1, status: "not_started" },
  { id: "ort-tr-3", userRole: "ortaogretim", course: "Türkçe", unit: "Paragraf", topic: "Paragraf (Ana Fikir)", questionWeight: 1, status: "not_started" },
  { id: "ort-tr-4", userRole: "ortaogretim", course: "Türkçe", unit: "Yazım ve Noktalama", topic: "Yazım ve Noktalama", questionWeight: 1, status: "not_started" },
  { id: "ort-mat-1", userRole: "ortaogretim", course: "Matematik", unit: "Temel Kavramlar", topic: "Temel Kavramlar ve Dört İşlem", questionWeight: 1, status: "not_started" },
  { id: "ort-mat-2", userRole: "ortaogretim", course: "Matematik", unit: "Bölünebilme", topic: "Bölünebilme ve EBOB-EKOK", questionWeight: 1, status: "not_started" },
  { id: "ort-mat-3", userRole: "ortaogretim", course: "Matematik", unit: "Problemler", topic: "Problemler (Sayı, Kesir, Yüzde)", questionWeight: 1, status: "not_started" },
  { id: "ort-mat-4", userRole: "ortaogretim", course: "Matematik", unit: "Geometri", topic: "Geometri Temelleri", questionWeight: 1, status: "not_started" },
  { id: "ort-tar-1", userRole: "ortaogretim", course: "Tarih", unit: "Osmanlı Siyasi Tarihi", topic: "Osmanlı Siyasi Tarihi", questionWeight: 1, status: "not_started" },
  { id: "ort-tar-2", userRole: "ortaogretim", course: "Tarih", unit: "Atatürk İlke ve İnkılapları", topic: "Atatürk İlke ve İnkılapları", questionWeight: 1, status: "not_started" },
  { id: "ort-tar-3", userRole: "ortaogretim", course: "Tarih", unit: "Kurtuluş Savaşı", topic: "Kurtuluş Savaşı", questionWeight: 1, status: "not_started" },
  { id: "ort-cog-1", userRole: "ortaogretim", course: "Coğrafya", unit: "Türkiye'nin Fiziki Yapısı", topic: "Türkiye'nin Fiziki Yapısı", questionWeight: 1, status: "not_started" },
  { id: "ort-cog-2", userRole: "ortaogretim", course: "Coğrafya", unit: "Türkiye'nin Beşeri ve Ekonomik Yapısı", topic: "Türkiye'nin Beşeri ve Ekonomik Yapısı", questionWeight: 1, status: "not_started" },
  { id: "ort-vat-1", userRole: "ortaogretim", course: "Vatandaşlık", unit: "Anayasa ve Temel Hukuk", topic: "Anayasa ve Temel Hukuk", questionWeight: 1, status: "not_started" },
  { id: "ort-vat-2", userRole: "ortaogretim", course: "Güncel Bilgiler", unit: "Güncel Bilgiler", topic: "Güncel Bilgiler", questionWeight: 1, status: "not_started" },

  // ==================== YDS / YÖKDİL İNGİLİZCE ====================
  { id: "yds-1", userRole: "yds", course: "Vocabulary", unit: "Academic Words", topic: "Academic Words", questionWeight: 1, status: "not_started" },
  { id: "yds-2", userRole: "yds", course: "Vocabulary", unit: "Phrasal Verbs", topic: "Phrasal Verbs", questionWeight: 1, status: "not_started" },
  { id: "yds-3", userRole: "yds", course: "Grammar", unit: "Tenses", topic: "Tenses", questionWeight: 1, status: "not_started" },
  { id: "yds-4", userRole: "yds", course: "Grammar", unit: "Modals & Conditionals", topic: "Modals & Conditionals", questionWeight: 1, status: "not_started" },
  { id: "yds-5", userRole: "yds", course: "Grammar", unit: "Prepositions & Conjunctions", topic: "Prepositions & Conjunctions", questionWeight: 1, status: "not_started" },
  { id: "yds-6", userRole: "yds", course: "Reading", unit: "Cloze Test", topic: "Cloze Test Strategies", questionWeight: 1, status: "not_started" },
  { id: "yds-7", userRole: "yds", course: "Reading", unit: "Sentence Completion", topic: "Sentence Completion", questionWeight: 1, status: "not_started" },
  { id: "yds-8", userRole: "yds", course: "Translation", unit: "English to Turkish", topic: "English to Turkish", questionWeight: 1, status: "not_started" },

  // ==================== ALES (SAYISAL & SÖZEL MANTIK) ====================
  { id: "ales-1", userRole: "ales", course: "Sayısal", unit: "Temel Sayılar", topic: "Temel Matematik ve Sayısal Mantık", questionWeight: 1, status: "not_started" },
  { id: "ales-2", userRole: "ales", course: "Sayısal", unit: "Problemler", topic: "Gelişmiş Mantık Problemleri", questionWeight: 1, status: "not_started" },
  { id: "ales-3", userRole: "ales", course: "Sözel", unit: "Paragraf Mantığı", topic: "Paragraf ve Sözel Akıl Yürütme", questionWeight: 1, status: "not_started" },
  { id: "ales-4", userRole: "ales", course: "Sözel", unit: "Sözel Mantık", topic: "Karmaşık Sözel Mantık Bulmacaları", questionWeight: 1, status: "not_started" }
];
