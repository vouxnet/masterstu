import { CurriculumTopic } from '@/src/lib/data/curriculumData';
import { StudyLog } from '@/src/lib/store/useStudyLogStore';
import { examTypeToRole } from '@/src/lib/store/useCurriculumStore';

export interface TopicMemoryState {
  topicId: string;
  topic: string;
  course: string;
  lastStudiedDate: string | null; // ISO date or null if never studied
  studyCount: number; // how many times studied
  retention: number; // 0-100 percentage
  stability: number; // S value
  status: 'critical' | 'decaying' | 'fresh' | 'never_studied';
  daysUntilCritical: number; // days until retention drops below 40%
}

export function getStability(studyCount: number): number {
  if (studyCount === 0) return 0;
  if (studyCount === 1) return 1;
  if (studyCount === 2) return 3;
  if (studyCount === 3) return 7;
  if (studyCount === 4) return 14;
  return 30;
}

export function calculateRetention(daysSinceLastStudy: number, stability: number): number {
  if (stability === 0) return 0;
  const retention = Math.exp(-daysSinceLastStudy / stability);
  return Math.max(0, Math.min(100, retention * 100));
}

export function getMemoryStatus(retention: number, studyCount: number): TopicMemoryState['status'] {
  if (studyCount === 0) return 'never_studied';
  if (retention < 40) return 'critical';
  if (retention <= 70) return 'decaying';
  return 'fresh';
}

export function computeMemoryMap(
  topics: CurriculumTopic[],
  logs: StudyLog[],
  examType: string
): TopicMemoryState[] {
  const role = examTypeToRole(examType);
  const relevantTopics = topics.filter((t) => t.userRole === role);
  
  const relevantLogs = logs.filter((l) => l.examType === examType);
  
  const now = new Date();
  // Strip time for accurate day calculation
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const memoryStates: TopicMemoryState[] = relevantTopics.map((topic) => {
    const topicLogs = relevantLogs.filter((l) => l.subject === topic.course || l.subject === topic.topic);
    
    const studyCount = topicLogs.length;
    let lastStudiedDate: string | null = null;
    let daysSinceLastStudy = 0;
    
    if (studyCount > 0) {
      const sortedLogs = [...topicLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      lastStudiedDate = sortedLogs[0].date;
      const lastStudyStr = lastStudiedDate.split('T')[0];
      const lastStudyDateParts = lastStudyStr.split('-');
      const lastStudy = new Date(
        parseInt(lastStudyDateParts[0], 10),
        parseInt(lastStudyDateParts[1], 10) - 1,
        parseInt(lastStudyDateParts[2], 10)
      );
      
      const diffTime = today.getTime() - lastStudy.getTime();
      daysSinceLastStudy = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    }
    
    const stability = getStability(studyCount);
    const retention = studyCount > 0 ? calculateRetention(daysSinceLastStudy, stability) : 0;
    const status = getMemoryStatus(retention, studyCount);
    
    let daysUntilCritical = 0;
    if (studyCount > 0 && retention >= 40) {
      const tTotal = -stability * Math.log(0.4);
      daysUntilCritical = Math.max(0, Math.ceil(tTotal - daysSinceLastStudy));
    }
    
    return {
      topicId: topic.id,
      topic: topic.topic,
      course: topic.course,
      lastStudiedDate,
      studyCount,
      retention,
      stability,
      status,
      daysUntilCritical,
    };
  });
  
  return memoryStates.sort((a, b) => {
    if (a.status === 'never_studied' && b.status !== 'never_studied') return 1;
    if (a.status !== 'never_studied' && b.status === 'never_studied') return -1;
    return a.retention - b.retention;
  });
}
