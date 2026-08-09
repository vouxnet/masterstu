import { ExamResult } from "../store/useExamHistoryStore";
import { StudyLog } from "../store/useStudyLogStore";
import { CurriculumTopic } from "../data/curriculumData";

export interface PerformanceScore {
  userName: string;
  examType: string;
  netImprovementPercent: number; // 0-100
  studyConsistency: number; // 0-100
  curriculumProgress: number; // 0-100
  duelWinRate: number; // 0-100
  totalScore: number; // 0-100
}

export function calculatePerformanceScore(
  examResults: ExamResult[],
  studyLogs: StudyLog[],
  topics: CurriculumTopic[],
  userName: string,
  examType: string
): PerformanceScore {
  // 1. Net Improvement (Last 3 Exams)
  let netImprovementPercent = 50;
  if (examResults.length >= 2) {
    const recent = examResults.slice(0, 3).reverse(); // oldest of the recent 3 first
    const oldest = recent[0].totalNet || 0;
    const latest = recent[recent.length - 1].totalNet || 0;
    const delta = latest - oldest;
    // Assuming +/- 20 net change maps to 0-100, 0 change is 50
    netImprovementPercent = Math.max(0, Math.min(100, 50 + (delta / 20) * 50));
  } else if (examResults.length === 1) {
    netImprovementPercent = 50; // Neutral if only 1 exam
  } else {
    netImprovementPercent = 0; // No exams yet
  }

  // 2. Study Consistency (Active days in last 7 days)
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentLogs = studyLogs.filter((log) => new Date(log.date) >= weekAgo);
  const activeDates = new Set(recentLogs.map((l) => l.date));
  const studyConsistency = Math.min(100, (activeDates.size / 7) * 100);

  // 3. Curriculum Progress
  let curriculumProgress = 0;
  if (topics.length > 0) {
    const completed = topics.filter(
      (t) => t.status === "solved" || t.status === "review"
    ).length;
    curriculumProgress = (completed / topics.length) * 100;
  }

  // 4. Duel Win Rate (Placeholder)
  const duelWinRate = 50;

  // 5. Total Score
  const totalScore = 
    0.4 * netImprovementPercent +
    0.3 * studyConsistency +
    0.2 * curriculumProgress +
    0.1 * duelWinRate;

  return {
    userName,
    examType,
    netImprovementPercent,
    studyConsistency,
    curriculumProgress,
    duelWinRate,
    totalScore: Math.round(totalScore * 10) / 10,
  };
}

// Generate semi-random but consistent scores using a weekly seed
export function simulatePartnerScore(partnerName: string, examType: string): PerformanceScore {
  const now = new Date();
  const weekSeed = Math.floor(now.getTime() / (7 * 24 * 60 * 60 * 1000));
  
  // Simple hash function for string
  let nameHash = 0;
  for (let i = 0; i < partnerName.length; i++) {
    nameHash = partnerName.charCodeAt(i) + ((nameHash << 5) - nameHash);
  }
  
  // Pseudo-random generator based on seed and hash
  const pseudoRandom = (seedOffset: number) => {
    const x = Math.sin(weekSeed + nameHash + seedOffset) * 10000;
    return x - Math.floor(x);
  };

  const netImprovementPercent = 40 + pseudoRandom(1) * 40; // 40-80
  const studyConsistency = 50 + pseudoRandom(2) * 50; // 50-100
  const curriculumProgress = 30 + pseudoRandom(3) * 60; // 30-90
  const duelWinRate = 30 + pseudoRandom(4) * 40; // 30-70

  const totalScore = 
    0.4 * netImprovementPercent +
    0.3 * studyConsistency +
    0.2 * curriculumProgress +
    0.1 * duelWinRate;

  return {
    userName: partnerName,
    examType,
    netImprovementPercent: Math.round(netImprovementPercent),
    studyConsistency: Math.round(studyConsistency),
    curriculumProgress: Math.round(curriculumProgress),
    duelWinRate: Math.round(duelWinRate),
    totalScore: Math.round(totalScore * 10) / 10,
  };
}
