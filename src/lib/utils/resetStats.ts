export function clearAllUserStats(examType: string = 'kpss_lisans') {
  if (typeof window === 'undefined') return;
  try {
    const { useStudyLogStore } = require("@/src/lib/store/useStudyLogStore");
    const { useExamHistoryStore } = require("@/src/lib/store/useExamHistoryStore");
    const { useDailyQuestStore } = require("@/src/lib/store/useDailyQuestStore");
    const { useFriendStore } = require("@/src/lib/store/useFriendStore");

    const { useCurriculumStore, examTypeToRole } = require("@/src/lib/store/useCurriculumStore");

    if (useStudyLogStore?.getState()?.clearLogs) useStudyLogStore.getState().clearLogs();
    if (useExamHistoryStore?.getState()?.clearHistory) useExamHistoryStore.getState().clearHistory();
    if (useDailyQuestStore?.getState()?.resetQuests) useDailyQuestStore.getState().resetQuests();
    if (useFriendStore?.getState()?.resetFriends) useFriendStore.getState().resetFriends();

    
    const role = examTypeToRole ? examTypeToRole(examType) : "lisans_alan";
    if (useCurriculumStore?.getState()?.resetAllTopics) useCurriculumStore.getState().resetAllTopics(role);
    
    localStorage.removeItem('asimptot_flashcard_progress_v1');
    localStorage.removeItem('asimptot_simulations_v1');
    localStorage.removeItem('asimptot_sprint_v1');
    localStorage.removeItem('asimptot_card_reports_v1');
  } catch (e) {
    console.error("Error clearing user stats:", e);
  }
}
