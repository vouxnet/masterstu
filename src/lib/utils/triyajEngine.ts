import { CurriculumTopic } from "@/src/lib/data/curriculumData";
import { bulentExactKitapSecData } from "@/src/lib/data/bulentFullDistribution";
import { senaExactKitapSecData } from "@/src/lib/data/senaFullDistribution";

export interface TriyajResult {
  topic: string;
  course: string;
  avgQuestions: number; // avg questions per exam for this topic
  importance: string; // 'Yüksek' | 'Orta' | 'Düşük' | 'Standart'
  currentStatus: string; // 'not_started' | 'studying' | 'solved'
  improvementPotential: number; // 0-1 probability of improvement
  estimatedStudyHours: number; // hours needed
  expectedNetGain: number; // expected net gain from studying this
  roi: number; // ROI = expectedNetGain / estimatedStudyHours
  recommendation: 'focus' | 'maintain' | 'skip'; // action recommendation
}

export function computeTriyaj(
  examType: string,
  curriculumTopics: CurriculumTopic[]
): TriyajResult[] {
  const distributionData = examType === 'kpss_onlisans' ? senaExactKitapSecData : bulentExactKitapSecData;
  const results: TriyajResult[] = [];

  for (const [course, topics] of Object.entries(distributionData)) {
    for (const distTopic of topics) {
      // Find matching curriculum topic
      const curTopic = curriculumTopics.find(t => t.course === course && t.topic === distTopic.topic);
      
      const currentStatus = curTopic?.status || 'not_started';
      
      let improvementPotential = 0;
      if (currentStatus === 'not_started') improvementPotential = 0.7;
      else if (currentStatus === 'studying') improvementPotential = 0.4;
      else if (currentStatus === 'solved' || currentStatus === 'review') improvementPotential = 0.1;
      
      let estimatedStudyHours = 4;
      if (distTopic.importance === 'Yüksek') estimatedStudyHours = 8;
      else if (distTopic.importance === 'Orta') estimatedStudyHours = 4;
      else if (distTopic.importance === 'Standart' || distTopic.importance === 'Düşük') estimatedStudyHours = 2;

      const expectedNetGain = distTopic.avg * improvementPotential;
      const roi = expectedNetGain / estimatedStudyHours;
      
      let recommendation: 'focus' | 'maintain' | 'skip' = 'skip';
      if (roi >= 0.3) recommendation = 'focus';
      else if (roi >= 0.1) recommendation = 'maintain';
      
      results.push({
        topic: distTopic.topic,
        course,
        avgQuestions: distTopic.avg,
        importance: distTopic.importance,
        currentStatus,
        improvementPotential,
        estimatedStudyHours,
        expectedNetGain,
        roi,
        recommendation
      });
    }
  }

  // Sort by ROI descending
  return results.sort((a, b) => b.roi - a.roi);
}

export function getTopFocusTopics(results: TriyajResult[], n: number): TriyajResult[] {
  return results.filter(r => r.recommendation === 'focus').slice(0, n);
}

export function calculateExpectedGain(results: TriyajResult[], n: number): number {
  const topN = getTopFocusTopics(results, n);
  return topN.reduce((sum, r) => sum + r.expectedNetGain, 0);
}
