export interface BlindSpotItem {
  id: string;
  subject: string;
  topic: string;
  errorRate: number; // 0-100 percentage
  mistakeCount: number;
  totalAttempts: number;
  urgency: "high" | "medium"; // high >= 60%, medium >= 40%
  advice: string;
  recommendedAction: string;
}

export function computeBlindSpots(
  mistakes: Array<{ subject: string; topic?: string; questionText?: string }>,
  historyResults: Array<{ gyWrong?: number; gkWrong?: number; alanWrong?: number; notes?: string }> = [],
  activeExam: string = "kpss_lisans"
): BlindSpotItem[] {
  // Aggregate mistakes by subject & topic
  const topicMap = new Map<string, { subject: string; topic: string; count: number }>();

  mistakes.forEach((m) => {
    const subject = m.subject || "Genel Kültür";
    const topic = m.topic || m.questionText?.slice(0, 30) || "Genel Konu";
    const key = `${subject}::${topic}`;

    const existing = topicMap.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      topicMap.get(key);
      topicMap.set(key, { subject, topic, count: 1 });
    }
  });

  // Default high-probability ÖSYM blindspot fallback patterns if user has few mistakes recorded
  const defaultBlindSpots: BlindSpotItem[] = [
    {
      id: "bs-default-1",
      subject: "Anayasa Hukuku",
      topic: "Temel Hak ve Hürriyetlerin Sınırlanması (Md. 13)",
      errorRate: 75,
      mistakeCount: 4,
      totalAttempts: 5,
      urgency: "high",
      advice: "Olağanüstü hallerde hak sınırlama ilkeleri ve kanunilik şartı sorusunda sıklıkla çeldiriciye düşüyorsun.",
      recommendedAction: "Anayasa Md. 13 ve Md. 15 maddelerini 3 kez oku.",
    },
    {
      id: "bs-default-2",
      subject: "Tarih",
      topic: "İstiklal Yolu ve Kongreler Kronolojisi",
      errorRate: 60,
      mistakeCount: 3,
      totalAttempts: 5,
      urgency: "medium",
      advice: "Amasya Genelgesi ile Erzurum Kongresi kararlarını birbiriyle karıştırma eğilimi tespit edildi.",
      recommendedAction: "Kongre kararları karşılaştırma tablosunu incele.",
    },
    {
      id: "bs-default-3",
      subject: "Coğrafya",
      topic: "Türkiye İklimi & Rüzgarlar (Kayıp Sakal)",
      errorRate: 50,
      mistakeCount: 2,
      totalAttempts: 4,
      urgency: "medium",
      advice: "Karayel, Yıldız, Poyraz, Samyeli, Kıble, Lodos yön kodlamasında kararsızlık yaşanıyor.",
      recommendedAction: "KAYIP SAKAL harita kodlamasını tekrar et.",
    },
  ];

  if (mistakes.length === 0) {
    return defaultBlindSpots;
  }

  const generated: BlindSpotItem[] = [];

  topicMap.forEach((val, key) => {
    const totalAttempts = val.count + 2; // Est. attempts
    const errorRate = Math.min(100, Math.round((val.count / totalAttempts) * 100));
    const urgency = errorRate >= 60 ? "high" : "medium";

    generated.push({
      id: `bs-${key.replace(/[^a-z0-9]/gi, "-")}`,
      subject: val.subject,
      topic: val.topic,
      errorRate,
      mistakeCount: val.count,
      totalAttempts,
      urgency,
      advice: `${val.subject} dersinin "${val.topic}" konusunda yaptığın ${val.count} yanlış tespit edildi.`,
      recommendedAction: "Yanlış Kutusu kartlarını incele ve pratik yap.",
    });
  });

  return generated.sort((a, b) => b.errorRate - a.errorRate).slice(0, 5);
}
