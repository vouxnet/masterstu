export interface CurriculumTopic {
  id: string;
  userRole: "lisans_alan" | "onlisans" | "ortaogretim" | "yds" | "ales";
  course: string;
  unit: string;
  topic: string;
  questionWeight: number; // estimated number of questions in ÖSYM exams
  status: "not_started" | "studying" | "solved" | "review";
}

export const initialCurriculumData: CurriculumTopic[] = [  // ==================== KPSS ÖNLİSANS (RESMİ ÖSYM KONU LİSTESİ) ====================
  // 1. TÜRKÇE (30 SORU)
  { id: "onl-tr-1", userRole: "onlisans", course: "Türkçe", unit: "Anlam Bilgisi", topic: "Sözcükte Anlam ve Sözcük Grupları", questionWeight: 2, status: "not_started" },
  { id: "onl-tr-2", userRole: "onlisans", course: "Türkçe", unit: "Anlam Bilgisi", topic: "Cümlede Anlam ve Cümle Yorumu", questionWeight: 2, status: "not_started" },
  { id: "onl-tr-3", userRole: "onlisans", course: "Türkçe", unit: "Dil Bilgisi", topic: "Sözcük Türleri (İsim, Sıfat, Zamir, Zarf, Edat)", questionWeight: 1, status: "not_started" },
  { id: "onl-tr-4", userRole: "onlisans", course: "Türkçe", unit: "Dil Bilgisi", topic: "Sözcükte Yapı ve Ekler", questionWeight: 1, status: "not_started" },
  { id: "onl-tr-5", userRole: "onlisans", course: "Türkçe", unit: "Dil Bilgisi", topic: "Cümlenin Ögeleri ve Cümle Türleri", questionWeight: 1, status: "not_started" },
  { id: "onl-tr-6", userRole: "onlisans", course: "Türkçe", unit: "Dil Bilgisi", topic: "Ses Olayları ve Ses Bilgisi", questionWeight: 1, status: "not_started" },
  { id: "onl-tr-7", userRole: "onlisans", course: "Türkçe", unit: "Yazım ve Noktalama", topic: "Yazım Kuralları ve Büyük Harflerin Kullanımı", questionWeight: 1, status: "not_started" },
  { id: "onl-tr-8", userRole: "onlisans", course: "Türkçe", unit: "Yazım ve Noktalama", topic: "Noktalama İşaretleri", questionWeight: 1, status: "not_started" },
  { id: "onl-tr-9", userRole: "onlisans", course: "Türkçe", unit: "Dil Bilgisi", topic: "Anlatım Bozuklukları", questionWeight: 1, status: "not_started" },
  { id: "onl-tr-10", userRole: "onlisans", course: "Türkçe", unit: "Paragraf", topic: "Paragrafta Anlam, Ana Düşünce ve Yardımcı Düşünce", questionWeight: 15, status: "not_started" },
  { id: "onl-tr-11", userRole: "onlisans", course: "Türkçe", unit: "Paragraf", topic: "Paragrafta Yapı ve Anlatım Biçimleri", questionWeight: 1, status: "not_started" },
  { id: "onl-tr-12", userRole: "onlisans", course: "Türkçe", unit: "Sözel Mantık", topic: "Sözel Mantık Tablo ve Sıralama Soruları", questionWeight: 4, status: "not_started" },

  // 2. MATEMATİK & GEOMETRİ (30 SORU)
  { id: "onl-mat-1", userRole: "onlisans", course: "Matematik", unit: "Temel Matematik", topic: "Temel Kavramlar ve Sayı Kümeleri", questionWeight: 1, status: "not_started" },
  { id: "onl-mat-2", userRole: "onlisans", course: "Matematik", unit: "Temel Matematik", topic: "Sayılar, Bölünebilme ve EBOB-EKOK", questionWeight: 3, status: "not_started" },
  { id: "onl-mat-3", userRole: "onlisans", course: "Matematik", unit: "Temel Matematik", topic: "Rasyonel Sayılar ve Ondalıklı Sayılar", questionWeight: 2, status: "not_started" },
  { id: "onl-mat-4", userRole: "onlisans", course: "Matematik", unit: "Cebir", topic: "Basit Eşitsizlikler ve Mutlak Değer", questionWeight: 1, status: "not_started" },
  { id: "onl-mat-5", userRole: "onlisans", course: "Matematik", unit: "Cebir", topic: "Üslü Sayılar ve Köklü Sayılar", questionWeight: 2, status: "not_started" },
  { id: "onl-mat-6", userRole: "onlisans", course: "Matematik", unit: "Cebir", topic: "Denklem Çözme ve Çarpanlara Ayırma", questionWeight: 1, status: "not_started" },
  { id: "onl-mat-7", userRole: "onlisans", course: "Matematik", unit: "Problemler", topic: "Sayı ve Kesir Problemleri", questionWeight: 2, status: "not_started" },
  { id: "onl-mat-8", userRole: "onlisans", course: "Matematik", unit: "Problemler", topic: "Yaş, İşçi ve Havuz Problemleri", questionWeight: 1, status: "not_started" },
  { id: "onl-mat-9", userRole: "onlisans", course: "Matematik", unit: "Problemler", topic: "Hareket-Hız ve Yüzde-Kâr-Zarar Problemleri", questionWeight: 1, status: "not_started" },
  { id: "onl-mat-10", userRole: "onlisans", course: "Matematik", unit: "Problemler", topic: "Karışım ve Grafik Problemleri", questionWeight: 2, status: "not_started" },
  { id: "onl-mat-11", userRole: "onlisans", course: "Matematik", unit: "Mantık & Kümeler", topic: "Kümeler, Fonksiyonlar ve Olasılık", questionWeight: 3, status: "not_started" },
  { id: "onl-mat-12", userRole: "onlisans", course: "Matematik", unit: "Sayısal Mantık", topic: "Sayısal Mantık ve Şekil-Sayı İlişkileri", questionWeight: 3, status: "not_started" },

  // 3. TARİH (27 SORU)
  { id: "onl-tar-1", userRole: "onlisans", course: "Tarih", unit: "İslamiyet Öncesi Türk Tarihi", topic: "İslamiyet Öncesi Türk Tarihi ve Kültür Medeniyeti", questionWeight: 2, status: "not_started" },
  { id: "onl-tar-2", userRole: "onlisans", course: "Tarih", unit: "Türk-İslam Tarihi", topic: "İlk Türk İslam Devletleri ve Kültür Medeniyeti", questionWeight: 3, status: "not_started" },
  { id: "onl-tar-3", userRole: "onlisans", course: "Tarih", unit: "Osmanlı Siyasi Tarihi", topic: "Osmanlı Devleti Kuruluş, Yükselme ve Duraklama Dönemleri", questionWeight: 3, status: "not_started" },
  { id: "onl-tar-4", userRole: "onlisans", course: "Tarih", unit: "Osmanlı Siyasi Tarihi", topic: "Osmanlı Devleti Gerileme, Dağılma ve 20. Yüzyıl", questionWeight: 2, status: "not_started" },
  { id: "onl-tar-5", userRole: "onlisans", course: "Tarih", unit: "Osmanlı Medeniyeti", topic: "Osmanlı Devleti Kültür ve Medeniyeti", questionWeight: 4, status: "not_started" },
  { id: "onl-tar-6", userRole: "onlisans", course: "Tarih", unit: "Milli Mücadele", topic: "Milli Mücadele Hazırlık ve Muharebeler Dönemi", questionWeight: 4, status: "not_started" },
  { id: "onl-tar-7", userRole: "onlisans", course: "Tarih", unit: "İnkılap Tarihi", topic: "Atatürk İnkılapları, İlkeleri ve İç/Dış Politikalar", questionWeight: 5, status: "not_started" },
  { id: "onl-tar-8", userRole: "onlisans", course: "Tarih", unit: "Çağdaş Tarih", topic: "Çağdaş Türk ve Dünya Tarihi", questionWeight: 4, status: "not_started" },

  // 4. COĞRAFYA (18 SORU)
  { id: "onl-cog-1", userRole: "onlisans", course: "Coğrafya", unit: "Coğrafi Konum", topic: "Türkiye'nin Coğrafi Konumu ve Özellikleri", questionWeight: 2, status: "not_started" },
  { id: "onl-cog-2", userRole: "onlisans", course: "Coğrafya", unit: "Fiziki Coğrafya", topic: "Türkiye'nin İklimi, Bitki Örtüsü ve Fiziki Özellikleri", questionWeight: 6, status: "not_started" },
  { id: "onl-cog-3", userRole: "onlisans", course: "Coğrafya", unit: "Beşeri Coğrafya", topic: "Türkiye'de Nüfus, Yerleşme ve Göçler", questionWeight: 2, status: "not_started" },
  { id: "onl-cog-4", userRole: "onlisans", course: "Coğrafya", unit: "Ekonomik Coğrafya", topic: "Tarım, Hayvancılık, Madenler ve Enerji Kaynakları", questionWeight: 4, status: "not_started" },
  { id: "onl-cog-5", userRole: "onlisans", course: "Coğrafya", unit: "Ekonomik Coğrafya", topic: "Sanayi, Ulaşım, Ticaret ve Turizm", questionWeight: 4, status: "not_started" },

  // 5. VATANDAŞLIK (9 SORU)
  { id: "onl-vat-1", userRole: "onlisans", course: "Vatandaşlık", unit: "Hukuka Giriş", topic: "Temel Hukuk Kavramları ve Hukuk Düzeni", questionWeight: 3, status: "not_started" },
  { id: "onl-vat-2", userRole: "onlisans", course: "Vatandaşlık", unit: "Anayasa Hukuku", topic: "Anayasal Kavramlar, Yasama ve Yargı Organları", questionWeight: 2, status: "not_started" },
  { id: "onl-vat-3", userRole: "onlisans", course: "Vatandaşlık", unit: "Anayasa Hukuku", topic: "1982 Anayasası Yürütme Organı ve Cumhurbaşkanlığı", questionWeight: 2, status: "not_started" },
  { id: "onl-vat-4", userRole: "onlisans", course: "Vatandaşlık", unit: "İdare Hukuku", topic: "İdare Hukuku ve İdari Teşkilat Yapısı", questionWeight: 2, status: "not_started" },

  // ==================== KPSS LİSANS + ALAN ====================
  { id: "h-1", userRole: "lisans_alan", course: "Hukuk", unit: "Anayasa Hukuku", topic: "Anayasa Hukukunun Temel Kavramları ve Devlet Biçimleri", questionWeight: 2, status: "not_started" },
  { id: "h-2", userRole: "lisans_alan", course: "Hukuk", unit: "Anayasa Hukuku", topic: "1982 Anayasası Temel Haklar ve Ödevler Tablosu", questionWeight: 2, status: "not_started" },
  { id: "h-3", userRole: "lisans_alan", course: "Hukuk", unit: "İdare Hukuku", topic: "İdari Teşkilat: Merkezden Yönetim ve Yerinden Yönetim", questionWeight: 3, status: "not_started" },
  { id: "h-4", userRole: "lisans_alan", course: "Hukuk", unit: "Borçlar Hukuku", topic: "Borç İlişkisinin Doğumu ve Haksız Fiil Sorumluluğu", questionWeight: 3, status: "not_started" },
  { id: "i-1", userRole: "lisans_alan", course: "İktisat", unit: "Mikro İktisat", topic: "Tüketici Teorisi ve Fayda Maksimizasyonu", questionWeight: 4, status: "not_started" },
  { id: "i-2", userRole: "lisans_alan", course: "İktisat", unit: "Makro İktisat", topic: "IS-LM Modeli: Mal ve Para Piyasası Dengesi", questionWeight: 4, status: "not_started" },
  { id: "m-1", userRole: "lisans_alan", course: "Maliye", unit: "Maliye Teorisi", topic: "Kamusal Mallar ve Dışsallıklar", questionWeight: 3, status: "not_started" },
  { id: "m-2", userRole: "lisans_alan", course: "Maliye", unit: "Kamu Gelirleri", topic: "Verginin Yansıması ve Laffer Eğrisi", questionWeight: 4, status: "not_started" },
  { id: "ui-1", userRole: "lisans_alan", course: "Uluslararası İlişkiler", unit: "Siyasi Tarih", topic: "1648 Vestfalya Barışı ve Modern Devletler Sistemi", questionWeight: 3, status: "not_started" },
  { id: "ui-2", userRole: "lisans_alan", course: "Uluslararası İlişkiler", unit: "Teoriler", topic: "Realizm, Neorealizm (Waltz) ve Güç Dengesi Kuramı", questionWeight: 4, status: "not_started" },

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
  { id: "yds-9", userRole: "yds", course: "Translation", unit: "Turkish to English", topic: "Turkish to English", questionWeight: 1, status: "not_started" },
  { id: "yds-10", userRole: "yds", course: "Reading", unit: "Reading Comprehension", topic: "Reading Comprehension", questionWeight: 1, status: "not_started" },
  { id: "yds-11", userRole: "yds", course: "Reading", unit: "Dialogue Completion", topic: "Dialogue Completion", questionWeight: 1, status: "not_started" },
  { id: "yds-12", userRole: "yds", course: "Reading", unit: "Paragraph Analysis", topic: "Paragraph Analysis (Irrelevant Sentence, Completion)", questionWeight: 1, status: "not_started" },

  // ==================== ALES / DGS ====================
  { id: "ales-1", userRole: "ales", course: "Sayısal", unit: "Temel Matematik", topic: "Temel Matematik", questionWeight: 1, status: "not_started" },
  { id: "ales-2", userRole: "ales", course: "Sayısal", unit: "Problemler", topic: "Problemler", questionWeight: 1, status: "not_started" },
  { id: "ales-3", userRole: "ales", course: "Sayısal", unit: "Geometri", topic: "Geometri", questionWeight: 1, status: "not_started" },
  { id: "ales-4", userRole: "ales", course: "Sayısal", unit: "Sayısal Mantık", topic: "Sayısal Mantık", questionWeight: 1, status: "not_started" },
  { id: "ales-5", userRole: "ales", course: "Sayısal", unit: "Grafik ve Tablo", topic: "Grafik ve Tablo Yorumlama", questionWeight: 1, status: "not_started" },
  { id: "ales-6", userRole: "ales", course: "Sözel", unit: "Sözcükte ve Cümlede Anlam", topic: "Sözcükte ve Cümlede Anlam", questionWeight: 1, status: "not_started" },
  { id: "ales-7", userRole: "ales", course: "Sözel", unit: "Paragraf Ana Düşünce", topic: "Paragraf Ana Düşünce", questionWeight: 1, status: "not_started" },
  { id: "ales-8", userRole: "ales", course: "Sözel", unit: "Paragraf Yapısı", topic: "Paragraf Yapısı", questionWeight: 1, status: "not_started" },
  { id: "ales-9", userRole: "ales", course: "Sözel", unit: "Paragraf Tamamlama", topic: "Paragraf Tamamlama", questionWeight: 1, status: "not_started" },
  { id: "ales-10", userRole: "ales", course: "Sözel", unit: "Akışı Bozan Cümle", topic: "Akışı Bozan Cümle", questionWeight: 1, status: "not_started" },
  { id: "ales-11", userRole: "ales", course: "Sözel", unit: "Cümle Sıralama", topic: "Cümle Sıralama", questionWeight: 1, status: "not_started" },
  { id: "ales-12", userRole: "ales", course: "Sözel", unit: "Sözel Mantık", topic: "Sözel Mantık", questionWeight: 1, status: "not_started" },
];
