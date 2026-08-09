// Mock Database Service - Supabase'e geçmeden önceki Asenkron Simülasyon Katmanı
// Gerçek anahtarlar girildiğinde bu dosya doğrudan supabase.from('...').select() vb. işlemleri yapacak.

export const dbService = {
  // 1. Fetch Curriculum Progress
  fetchCurriculumProgress: async (userId: string, examType: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Gerçekte burada supabase'den veri dönecek.
        // Şimdilik LocalStorage'da tutulan yapıyı bozmamak için null dönüyoruz,
        // Store kendi içindeki veriyi kullanmaya devam edecek.
        resolve(null);
      }, 500); // 500ms ağ (network) gecikmesi simülasyonu
    });
  },

  // 2. Update Topic Status
  updateTopicStatus: async (userId: string, topicId: string, newStatus: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, topicId, newStatus });
      }, 300); // 300ms ağ gecikmesi
    });
  },

  // 3. Fetch Mistakes
  fetchMistakes: async (userId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 600);
    });
  },

  // 4. Fetch Feed Posts
  fetchFeedPosts: async (visibilityTier: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 800);
    });
  }
};
