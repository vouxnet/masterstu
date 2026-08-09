import { createClient } from '@/src/lib/supabase/client';

export const dbService = {
  async fetchCurriculumProgress(userId: string, examType: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('curriculum_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('exam_type', examType);
    if (error) return null;
    return data;
  },
  
  async updateTopicStatus(userId: string, examType: string, topicName: string, status: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('curriculum_progress')
      .upsert({
        user_id: userId,
        exam_type: examType,
        topic_name: topicName,
        status: status,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,exam_type,topic_name' });
    return { success: !error };
  }
};
