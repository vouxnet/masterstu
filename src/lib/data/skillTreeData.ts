export interface SkillNode {
  id: string;
  title: string;
  course: string;
  tier: 1 | 2 | 3 | 4 | 5;
  xpRequired: number;
  prerequisites: string[];
  description: string;
  iconEmoji: string;
}

export interface SkillTier {
  level: number;
  title: string;
  color: string;
  minXP: number;
}

export const skillTiers: SkillTier[] = [
  { level: 1, title: 'Başlangıç', color: 'gray', minXP: 0 },
  { level: 2, title: 'Gelişen', color: 'emerald', minXP: 20 },
  { level: 3, title: 'İleri', color: 'blue', minXP: 50 },
  { level: 4, title: 'Uzman', color: 'purple', minXP: 100 },
  { level: 5, title: 'Elit', color: 'amber', minXP: 180 },
];

export const onlisansSkillTree: SkillNode[] = [
  // Tier 1
  {
    id: "st-on-tr-1",
    title: "Sözcükte ve Cümlede Anlam",
    course: "Türkçe",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "Gerçek, mecaz anlam ve cümle yorumlama teknikleri.",
    iconEmoji: "📖"
  },
  {
    id: "st-on-mat-1",
    title: "Temel Kavramlar & Sayılar",
    course: "Matematik",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "Sayı kümeleri, tek-çift ve asal sayılar.",
    iconEmoji: "🔢"
  },
  {
    id: "st-on-tar-1",
    title: "İslamiyet Öncesi Türk Tarihi",
    course: "Tarih",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "Hunlar, Göktürkler, Uygurlar ve devlet teşkilatı.",
    iconEmoji: "🏹"
  },
  {
    id: "st-on-cog-1",
    title: "Türkiye'nin Coğrafi Konumu",
    course: "Coğrafya",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "Matematiksel ve özel konum, yerel saatler.",
    iconEmoji: "🗺️"
  },

  // Tier 2
  {
    id: "st-on-tr-2",
    title: "Paragrafta Yapı ve Ana Düşünce",
    course: "Türkçe",
    tier: 2,
    xpRequired: 20,
    prerequisites: ["st-on-tr-1"],
    description: "Paragraf tamamlama, akışı bozan cümle ve yardımcı düşünceler.",
    iconEmoji: "✍️"
  },
  {
    id: "st-on-mat-2",
    title: "Rasyonel Sayılar & Denklemler",
    course: "Matematik",
    tier: 2,
    xpRequired: 20,
    prerequisites: ["st-on-mat-1"],
    description: "Rasyonel-ondalık sayılar ve 1. dereceden denklemler.",
    iconEmoji: "➗"
  },
  {
    id: "st-on-vat-2",
    title: "Temel Hukuk Kavramları",
    course: "Vatandaşlık",
    tier: 2,
    xpRequired: 20,
    prerequisites: [],
    description: "Sosyal hayatı düzenleyen kurallar ve hak kavramı.",
    iconEmoji: "⚖️"
  },
  {
    id: "st-on-tar-2",
    title: "Osmanlı Siyasi Tarihi",
    course: "Tarih",
    tier: 2,
    xpRequired: 20,
    prerequisites: ["st-on-tar-1"],
    description: "Kuruluş, yükselme ve duraklama dönemi gelişmeleri.",
    iconEmoji: "🕌"
  },

  // Tier 3
  {
    id: "st-on-mat-3",
    title: "KPSS Problemler Ustası",
    course: "Matematik",
    tier: 3,
    xpRequired: 50,
    prerequisites: ["st-on-mat-2"],
    description: "Sayı, kesir, yaş, yüzde ve kar-zarar problemleri.",
    iconEmoji: "📈"
  },
  {
    id: "st-on-tar-3",
    title: "İnkılap Tarihi ve Kurtuluş Savaşı",
    course: "Tarih",
    tier: 3,
    xpRequired: 50,
    prerequisites: ["st-on-tar-2"],
    description: "Kongreler, TBMM'nin açılması ve cepheler.",
    iconEmoji: "🇹🇷"
  },
  {
    id: "st-on-cog-3",
    title: "Türkiye Fiziki ve Beşeri Coğrafyası",
    course: "Coğrafya",
    tier: 3,
    xpRequired: 50,
    prerequisites: ["st-on-cog-1"],
    description: "Yer şekilleri, iklim, nüfus ve yerleşme.",
    iconEmoji: "🏔️"
  },

  // Tier 4
  {
    id: "st-on-vat-4",
    title: "1982 Anayasası ve İdare Hukuku",
    course: "Vatandaşlık",
    tier: 4,
    xpRequired: 100,
    prerequisites: ["st-on-vat-2"],
    description: "TBMM, Cumhurbaşkanlığı, HSK ve İdari Teşkilat.",
    iconEmoji: "🏛️"
  },
  {
    id: "st-on-mat-4",
    title: "Sayısal ve Sözel Mantık",
    course: "Matematik & Türkçe",
    tier: 4,
    xpRequired: 100,
    prerequisites: ["st-on-mat-3", "st-on-tr-2"],
    description: "Tablo çizme, sıralama ve analitik mantık soruları.",
    iconEmoji: "🧠"
  },

  // Tier 5
  {
    id: "st-on-elite",
    title: "Önlisans Şampiyonu",
    course: "Genel Önlisans",
    tier: 5,
    xpRequired: 180,
    prerequisites: ["st-on-vat-4", "st-on-mat-4", "st-on-tar-3"],
    description: "KPSS Önlisans tüm müfredatında tam hakimiyet ve usta seviye.",
    iconEmoji: "👑"
  }
];

export const lisansSkillTree: SkillNode[] = [
  // Tier 1
  {
    id: "st-h-1",
    title: "Anayasa Hukuku Temelleri",
    course: "Hukuk",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "Devlet biçimleri ve anayasanın temel ilkeleri.",
    iconEmoji: "⚖️"
  },
  {
    id: "st-i-1",
    title: "Tüketici Teorisi",
    course: "İktisat",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "Mikro iktisadın temeli, fayda maksimizasyonu.",
    iconEmoji: "📈"
  },
  {
    id: "st-tr-1",
    title: "Sözcükte ve Cümlede Anlam",
    course: "Türkçe",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "Gerçek, mecaz ve yan anlam kavramları.",
    iconEmoji: "📖"
  },
  {
    id: "st-mat-1",
    title: "Temel Sayılar & Cebir",
    course: "Matematik",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "Sayı kümeleri ve temel kavramlar.",
    iconEmoji: "🔢"
  },

  // Tier 2
  {
    id: "st-h-2",
    title: "Temel Haklar ve Ödevler",
    course: "Hukuk",
    tier: 2,
    xpRequired: 20,
    prerequisites: ["st-h-1"],
    description: "1982 Anayasasına göre kişi hakları.",
    iconEmoji: "📜"
  },
  {
    id: "st-i-2",
    title: "IS-LM Makro Modeli",
    course: "İktisat",
    tier: 2,
    xpRequired: 20,
    prerequisites: ["st-i-1"],
    description: "Mal ve para piyasası dengesi.",
    iconEmoji: "📉"
  },
  {
    id: "st-tr-2",
    title: "Paragraf & Dil Bilgisi",
    course: "Türkçe",
    tier: 2,
    xpRequired: 20,
    prerequisites: ["st-tr-1"],
    description: "Cümle yorumu ve anlam ilişkileri.",
    iconEmoji: "✍️"
  },

  // Tier 3
  {
    id: "st-h-3",
    title: "İdari Teşkilat & Danıştay",
    course: "Hukuk",
    tier: 3,
    xpRequired: 50,
    prerequisites: ["st-h-2"],
    description: "Merkezden ve yerinden yönetim ilkeleri.",
    iconEmoji: "🏢"
  },
  {
    id: "st-tar-3",
    title: "Osmanlı & İnkılap Tarihi",
    course: "Tarih",
    tier: 3,
    xpRequired: 50,
    prerequisites: ["st-tr-2"],
    description: "Osmanlı devlet teşkilatı ve İnkılaplar.",
    iconEmoji: "🕌"
  },

  // Tier 4
  {
    id: "st-h-4",
    title: "Borçlar Hukuku Temelleri",
    course: "Hukuk",
    tier: 4,
    xpRequired: 100,
    prerequisites: ["st-h-3"],
    description: "Borç ilişkisinin doğumu ve haksız fiil.",
    iconEmoji: "🤝"
  },
  {
    id: "st-mat-4",
    title: "Analitik ve Sayısal Mantık",
    course: "Matematik",
    tier: 4,
    xpRequired: 100,
    prerequisites: ["st-mat-1"],
    description: "Sayısal ve sözel mantık analizi.",
    iconEmoji: "🧠"
  },

  // Tier 5
  {
    id: "st-elite",
    title: "Master Lisans Adayı",
    course: "Genel",
    tier: 5,
    xpRequired: 180,
    prerequisites: ["st-h-4", "st-mat-4"],
    description: "Tüm alanlarda usta seviye.",
    iconEmoji: "👑"
  }
];

export const getSkillTreeForExam = (exam: string): SkillNode[] => {
  switch (exam) {
    case "kpss_onlisans":
      return onlisansSkillTree;
    case "kpss_lisans":
    default:
      return lisansSkillTree;
  }
};
