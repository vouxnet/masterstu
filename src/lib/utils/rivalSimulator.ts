import { bulentExactKitapSecData } from "@/src/lib/data/bulentFullDistribution";
import { StudyLog } from "@/src/lib/store/useStudyLogStore";

export interface RivalActivity {
  id: string;
  subject: string;
  durationMinutes: number;
  timeAgo: string;
  activityType: 'study' | 'exam' | 'flashcard';
}

export interface RivalComparison {
  subject: string;
  eliteAvgHoursPerWeek: number;
  userHoursThisWeek: number;
  gap: number;
  gapStatus: 'ahead' | 'behind' | 'on_track';
}

const timeAgoStrings = [
  "1 dk önce", "3 dk önce", "5 dk önce", "12 dk önce", "18 dk önce",
  "24 dk önce", "35 dk önce", "42 dk önce", "55 dk önce", 
  "1 saat önce", "2 saat önce", "3 saat önce"
];

const activityTypes: ('study' | 'exam' | 'flashcard')[] = ['study', 'study', 'study', 'flashcard', 'exam'];

// Helper to get weighted subjects
function getWeightedSubjects() {
  const subjects: { name: string; weight: number }[] = [];
  
  Object.entries(bulentExactKitapSecData).forEach(([lesson, topics]) => {
    // Treat the lesson as the subject, or we can use topics as subject.
    // The requirement says subject: 'İdare Hukuku', which is a topic in Hukuk or Vatandaşlık.
    topics.forEach(topic => {
      let weight = 1;
      if (topic.importance === "Yüksek") weight = 4;
      else if (topic.importance === "Orta") weight = 2;
      subjects.push({ name: topic.topic, weight });
    });
  });
  
  return subjects;
}

export function generateRivalFeed(examType: string, count: number): RivalActivity[] {
  const subjects = getWeightedSubjects();
  const totalWeight = subjects.reduce((sum, s) => sum + s.weight, 0);
  
  const activities: RivalActivity[] = [];
  
  for (let i = 0; i < count; i++) {
    // Weighted random selection
    let randomVal = Math.random() * totalWeight;
    let selectedSubject = subjects[0].name;
    
    for (const s of subjects) {
      randomVal -= s.weight;
      if (randomVal <= 0) {
        selectedSubject = s.name;
        break;
      }
    }
    
    const durationMinutes = Math.floor(Math.random() * 61) + 30; // 30-90 mins
    const timeAgo = timeAgoStrings[Math.floor(Math.random() * timeAgoStrings.length)];
    const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    
    activities.push({
      id: `rival-${Date.now()}-${i}`,
      subject: selectedSubject,
      durationMinutes,
      timeAgo,
      activityType
    });
  }
  
  return activities;
}

export function generateRivalComparison(
  examType: string,
  userLogs: StudyLog[]
): RivalComparison[] {
  // Aggregate user logs for the last week per subject
  const userSubjectMinutes: Record<string, number> = {};
  
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  userLogs.forEach(log => {
    if (new Date(log.createdAt) >= weekAgo) {
      if (!userSubjectMinutes[log.subject]) {
        userSubjectMinutes[log.subject] = 0;
      }
      userSubjectMinutes[log.subject] += log.durationMinutes;
    }
  });

  const subjects = getWeightedSubjects();
  // Filter for unique subjects to prevent duplicates and only show top ones for dashboard
  const uniqueSubjects = new Map<string, {name: string, weight: number}>();
  subjects.forEach(s => {
    if (!uniqueSubjects.has(s.name)) {
      uniqueSubjects.set(s.name, s);
    }
  });

  // Pick top 5 subjects based on weight to display in comparison
  const topSubjects = Array.from(uniqueSubjects.values())
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5);

  return topSubjects.map(s => {
    let eliteAvgHoursPerWeek = 3;
    if (s.weight === 4) eliteAvgHoursPerWeek = 5; // Yüksek
    if (s.weight === 2) eliteAvgHoursPerWeek = 4; // Orta

    const userMinutes = userSubjectMinutes[s.name] || 0;
    const userHoursThisWeek = Number((userMinutes / 60).toFixed(1));
    
    const gap = Number((userHoursThisWeek - eliteAvgHoursPerWeek).toFixed(1));
    
    let gapStatus: 'ahead' | 'behind' | 'on_track';
    if (gap >= 0) {
      gapStatus = 'ahead';
    } else if (gap >= -1) {
      gapStatus = 'on_track';
    } else {
      gapStatus = 'behind';
    }
    
    return {
      subject: s.name,
      eliteAvgHoursPerWeek,
      userHoursThisWeek,
      gap,
      gapStatus
    };
  });
}
