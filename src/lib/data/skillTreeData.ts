export interface SkillNode {
  id: string;
  title: string; // e.g. 'Anayasa Hukuku Temelleri'
  course: string; // e.g. 'Hukuk'
  tier: 1 | 2 | 3 | 4 | 5; // skill level
  xpRequired: number; // topics to complete to unlock
  prerequisites: string[]; // IDs of prerequisite nodes
  description: string;
  iconEmoji: string; // e.g. '⚖️'
}

export interface SkillTier {
  level: number;
  title: string; // 'Başlangıç', 'Gelişen', 'İleri', 'Uzman', 'Elit'
  color: string; // tailwind color class
  minXP: number;
}

export const skillTiers: SkillTier[] = [
  { level: 1, title: 'Başlangıç', color: 'gray', minXP: 0 },
  { level: 2, title: 'Gelişen', color: 'emerald', minXP: 10 },
  { level: 3, title: 'İleri', color: 'blue', minXP: 25 },
  { level: 4, title: 'Uzman', color: 'purple', minXP: 50 },
  { level: 5, title: 'Elit', color: 'amber', minXP: 80 },
];

export const lisansSkillTree: SkillNode[] = [
  // Tier 1 (Basic)
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
    id: "st-m-1",
    title: "Maliye Teorisi",
    course: "Maliye",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "Kamusal mallar ve dışsallıklar.",
    iconEmoji: "💰"
  },
  {
    id: "st-ui-1",
    title: "Modern Devletler Sistemi",
    course: "Uluslararası İlişkiler",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "1648 Vestfalya Barışı ve sonrası.",
    iconEmoji: "🌍"
  },
  {
    id: "st-tr-1",
    title: "Sözcükte Anlam",
    course: "Türkçe",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "Gerçek, mecaz ve yan anlam kavramları.",
    iconEmoji: "📖"
  },
  {
    id: "st-mat-1",
    title: "Temel Sayılar",
    course: "Matematik",
    tier: 1,
    xpRequired: 0,
    prerequisites: [],
    description: "Sayı kümeleri ve temel kavramlar.",
    iconEmoji: "🔢"
  },

  // Tier 2 (Developing)
  {
    id: "st-h-2",
    title: "Temel Haklar ve Ödevler",
    course: "Hukuk",
    tier: 2,
    xpRequired: 10,
    prerequisites: ["st-h-1"],
    description: "1982 Anayasasına göre kişi hakları.",
    iconEmoji: "📜"
  },
  {
    id: "st-i-2",
    title: "IS-LM Modeli",
    course: "İktisat",
    tier: 2,
    xpRequired: 10,
    prerequisites: ["st-i-1"],
    description: "Mal ve para piyasası dengesi.",
    iconEmoji: "📉"
  },
  {
    id: "st-m-2",
    title: "Vergi Teorisi",
    course: "Maliye",
    tier: 2,
    xpRequired: 10,
    prerequisites: ["st-m-1"],
    description: "Verginin yansıması ve Laffer Eğrisi.",
    iconEmoji: "🏛️"
  },
  {
    id: "st-ui-2",
    title: "Güç Dengesi Kuramı",
    course: "Uluslararası İlişkiler",
    tier: 2,
    xpRequired: 10,
    prerequisites: ["st-ui-1"],
    description: "Realizm ve neorealizm (Waltz) teorileri.",
    iconEmoji: "⚔️"
  },
  {
    id: "st-tr-2",
    title: "Cümlede Anlam",
    course: "Türkçe",
    tier: 2,
    xpRequired: 10,
    prerequisites: ["st-tr-1"],
    description: "Cümle yorumu ve anlam ilişkileri.",
    iconEmoji: "✍️"
  },
  {
    id: "st-mat-2",
    title: "Cebirsel İfadeler",
    course: "Matematik",
    tier: 2,
    xpRequired: 10,
    prerequisites: ["st-mat-1"],
    description: "Rasyonel ve ondalık sayılar.",
    iconEmoji: "➗"
  },

  // Tier 3 (Advanced)
  {
    id: "st-h-3",
    title: "İdari Teşkilat",
    course: "Hukuk",
    tier: 3,
    xpRequired: 25,
    prerequisites: ["st-h-2", "st-m-2"],
    description: "Merkezden ve yerinden yönetim ilkeleri.",
    iconEmoji: "🏢"
  },
  {
    id: "st-i-3",
    title: "Makroekonomik Denge",
    course: "İktisat",
    tier: 3,
    xpRequired: 25,
    prerequisites: ["st-i-2", "st-mat-2"],
    description: "Toplam arz ve toplam talep analizi.",
    iconEmoji: "🔄"
  },
  {
    id: "st-tar-3",
    title: "Osmanlı Medeniyeti",
    course: "Tarih",
    tier: 3,
    xpRequired: 25,
    prerequisites: ["st-tr-2", "st-ui-2"],
    description: "Osmanlı devlet teşkilatı ve idaresi.",
    iconEmoji: "🕌"
  },
  {
    id: "st-cog-3",
    title: "Türkiye Fiziki Coğrafyası",
    course: "Coğrafya",
    tier: 3,
    xpRequired: 25,
    prerequisites: ["st-mat-2"],
    description: "Dağlar, ovalar ve iklim tipleri.",
    iconEmoji: "🗺️"
  },

  // Tier 4 (Expert)
  {
    id: "st-h-4",
    title: "Borçlar Hukuku Temelleri",
    course: "Hukuk",
    tier: 4,
    xpRequired: 50,
    prerequisites: ["st-h-3", "st-i-3"],
    description: "Borç ilişkisinin doğumu ve haksız fiil.",
    iconEmoji: "🤝"
  },
  {
    id: "st-tar-4",
    title: "İnkılap Tarihi",
    course: "Tarih",
    tier: 4,
    xpRequired: 50,
    prerequisites: ["st-tar-3", "st-cog-3"],
    description: "Kurtuluş Savaşı ve kongreler dönemi.",
    iconEmoji: "🇹🇷"
  },
  {
    id: "st-mat-4",
    title: "Analitik Düşünce",
    course: "Matematik",
    tier: 4,
    xpRequired: 50,
    prerequisites: ["st-mat-2", "st-i-3"],
    description: "Sayısal ve sözel mantık analizi.",
    iconEmoji: "🧠"
  },

  // Tier 5 (Elite)
  {
    id: "st-elite",
    title: "Master Aday",
    course: "Genel",
    tier: 5,
    xpRequired: 80,
    prerequisites: ["st-h-4", "st-tar-4", "st-mat-4"],
    description: "Tüm alanlarda uzmanlık ve elit seviye.",
    iconEmoji: "👑"
  }
];
