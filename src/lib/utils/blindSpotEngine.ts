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
  if (!mistakes || mistakes.length === 0) {
    return [];
  }

  // Aggregate real user mistakes by subject & topic
  const topicMap = new Map<string, { subject: string; topic: string; count: number }>();

  mistakes.forEach((m) => {
    const subject = m.subject || "Genel Kültür";
    const topic = m.topic || m.questionText?.slice(0, 35) || "Genel Konu";
    const key = `${subject}::${topic}`;

    const existing = topicMap.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      topicMap.set(key, { subject, topic, count: 1 });
    }
  });

  const generated: BlindSpotItem[] = [];

  topicMap.forEach((val, key) => {
    // Calculated based on actual recorded mistake count
    const totalAttempts = val.count + 1;
    const errorRate = Math.min(100, Math.round((val.count / totalAttempts) * 100));
    const urgency = errorRate >= 60 || val.count >= 2 ? "high" : "medium";

    generated.push({
      id: `bs-${key.replace(/[^a-z0-9]/gi, "-")}`,
      subject: val.subject,
      topic: val.topic,
      errorRate,
      mistakeCount: val.count,
      totalAttempts,
      urgency,
      advice: `${val.subject} dersinin "${val.topic}" konusunda Yanlış Kutuna eklenmiş ${val.count} adet hatalı soru tespit edildi.`,
      recommendedAction: "Bu konudaki yanlış soru kartlarını incele ve pratik yap.",
    });
  });

  return generated.sort((a, b) => b.errorRate - a.errorRate).slice(0, 5);
}
