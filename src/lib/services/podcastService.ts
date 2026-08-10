export interface PodcastEpisode {
  id: string;
  title: string;
  subject: string;
  duration: string;
  audioUrl: string;
  authorName: string;
  authorAvatar?: string;
  isOfficial: boolean;
  plays: number;
  createdAt: string;
}

const PODCAST_STORAGE_KEY = "asimptot_podcasts_v1";

export const INITIAL_PODCASTS: PodcastEpisode[] = [
  {
    id: "pod-1",
    title: "1982 Anayasası Haklar ve Hürriyetler (3dk Özet)",
    subject: "Anayasa Hukuku",
    duration: "03:15",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    authorName: "Asimptot Akademik Kadro",
    isOfficial: true,
    plays: 1420,
    createdAt: "2026-08-01",
  },
  {
    id: "pod-2",
    title: "İstiklal Yolu ve Erzurum Kongresi Kararları",
    subject: "Tarih",
    duration: "02:50",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    authorName: "Asimptot Akademik Kadro",
    isOfficial: true,
    plays: 980,
    createdAt: "2026-08-02",
  },
  {
    id: "pod-3",
    title: "Türkiye İklimi & Rüzgarlar Püf Noktalar",
    subject: "Coğrafya",
    duration: "03:05",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    authorName: "Asimptot Akademik Kadro",
    isOfficial: true,
    plays: 2100,
    createdAt: "2026-08-04",
  },
  {
    id: "pod-4",
    title: "İdari Yargılama Usulü Kanunu (İYUK) 30 Saniyelik İpuçları",
    subject: "İdare Hukuku",
    duration: "02:40",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    authorName: "Asimptot Akademik Kadro",
    isOfficial: true,
    plays: 750,
    createdAt: "2026-08-05",
  },
];

export const podcastService = {
  getEpisodes(): PodcastEpisode[] {
    if (typeof window === "undefined") return INITIAL_PODCASTS;
    try {
      const stored = localStorage.getItem(PODCAST_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(PODCAST_STORAGE_KEY, JSON.stringify(INITIAL_PODCASTS));
        return INITIAL_PODCASTS;
      }
      return JSON.parse(stored);
    } catch (e) {
      return INITIAL_PODCASTS;
    }
  },

  saveEpisode(newEp: PodcastEpisode) {
    if (typeof window === "undefined") return;
    try {
      const current = this.getEpisodes();
      const updated = [newEp, ...current];
      localStorage.setItem(PODCAST_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  },

  async uploadAudioFileToSupabase(file: File): Promise<string> {
    try {
      const { createClient } = await import("@/src/lib/supabase/client");
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `podcast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `user_podcasts/${fileName}`;

      const { data, error } = await supabase.storage.from("podcasts").upload(filePath, file);
      if (error) {
        // Fallback to local Data URL if bucket does not exist
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
      }

      const { data: publicUrlData } = supabase.storage.from("podcasts").getPublicUrl(filePath);
      return publicUrlData.publicUrl;
    } catch (e) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    }
  },
};
