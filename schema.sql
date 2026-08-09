-- ASIMPTOT - Birleşik Supabase PostgreSQL Schema
-- Bu dosyayı Supabase SQL Editor'e yapıştırıp çalıştırarak tabloları kurabilirsiniz.
-- =================================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =================================================================================
-- ENUMS
-- =================================================================================
CREATE TYPE user_role_enum AS ENUM ('lisans_alan', 'onlisans');
CREATE TYPE progress_status_enum AS ENUM ('not_started', 'studying', 'solved', 'review');
CREATE TYPE mistake_reason_enum AS ENUM ('knowledge_gap', 'carelessness', 'logic_error', 'time_limit');

-- =================================================================================
-- 1. KULLANICI PROFİLLERİ (PROFILES)
-- Supabase Auth tablosuyla (auth.users) ilişkili özel profil verileri.
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    email VARCHAR(255) UNIQUE,
    friend_code TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'onlisans',
    role_label TEXT,
    selected_exams TEXT[] DEFAULT '{"kpss_lisans"}',
    active_exam TEXT DEFAULT 'kpss_lisans',
    avatar_url TEXT,
    daily_question_target INTEGER DEFAULT 100,
    streak_count INTEGER DEFAULT 0,
    target_exam_date TIMESTAMPTZ,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) - Profiller
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kullanıcılar herkesin profilini görebilir" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Kullanıcılar sadece kendi profilini güncelleyebilir" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- =================================================================================
-- 2. MÜFREDAT İLERLEMESİ (CURRICULUM PROGRESS)
-- Kullanıcıların hangi derste hangi konuyu bitirdiğini tutar.
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.curriculum_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    exam_type TEXT NOT NULL,
    course_name TEXT NOT NULL,
    unit_name TEXT NOT NULL,
    topic_name TEXT NOT NULL,
    status progress_status_enum NOT NULL DEFAULT 'not_started',
    importance_level INT DEFAULT 3,
    notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, exam_type, topic_name)
);

-- RLS - Müfredat
ALTER TABLE public.curriculum_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kullanıcı kendi müfredatını görebilir" ON public.curriculum_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Kullanıcı kendi müfredatını güncelleyebilir" ON public.curriculum_progress FOR ALL USING (auth.uid() = user_id);

-- =================================================================================
-- 3. YANLIŞ KUTUSU (MISTAKES VAULT)
-- Denemelerde yapılan yanlış sorular ve AI çözümleri
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.mistakes_vault (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    topic TEXT,
    reason_tag TEXT NOT NULL,                -- 'Bilgi Eksikliği', 'İşlem Hatası' vb.
    reason mistake_reason_enum DEFAULT 'knowledge_gap',
    image_url TEXT,
    notes TEXT,
    is_solved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS - Yanlış Kutusu (Gizli)
ALTER TABLE public.mistakes_vault ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kullanıcı sadece kendi yanlış kutusunu görebilir" ON public.mistakes_vault FOR ALL USING (auth.uid() = user_id);

-- =================================================================================
-- 4. ARKADAŞLIK VE DUO (FRIENDSHIPS)
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.friendships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id1 UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    user_id2 UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending',           -- 'pending', 'accepted'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id1, user_id2)
);

-- RLS - Arkadaşlık
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kullanıcı kendi arkadaşlık bağlantılarını görebilir" ON public.friendships FOR SELECT USING (auth.uid() = user_id1 OR auth.uid() = user_id2);
CREATE POLICY "Kullanıcı arkadaşlık isteği gönderebilir" ON public.friendships FOR INSERT WITH CHECK (auth.uid() = user_id1);
CREATE POLICY "Kullanıcı kendi arkadaşlık isteğini güncelleyebilir" ON public.friendships FOR UPDATE USING (auth.uid() = user_id1 OR auth.uid() = user_id2);

-- =================================================================================
-- 5. CANLI AKIŞ GÖNDERİLERİ (FEED POSTS)
-- 3 kademeli (Gizli, Genel, Hoca) soru ve not paylaşımları
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.feed_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    visibility TEXT NOT NULL DEFAULT 'public_community', -- 'private_friends', 'public_community', 'admin_support'
    subject TEXT NOT NULL,
    question_text TEXT NOT NULL,
    image_url TEXT,
    answer_text TEXT,
    answer_image_url TEXT,
    is_resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS - Feed Akışı
ALTER TABLE public.feed_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Genel gönderileri herkes okuyabilir" ON public.feed_posts FOR SELECT USING (visibility = 'public_community' OR visibility = 'admin_support' OR auth.uid() = author_id);
-- Not: private_friends kısmı Supabase üzerinde bir function ile detaylı çözülecektir.
CREATE POLICY "Kullanıcı kendi gönderisini düzenleyebilir" ON public.feed_posts FOR ALL USING (auth.uid() = author_id);

-- =================================================================================
-- 6. FLASHCARDS (Akıllı Bilgi Kartları - SRS)
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.flashcards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_role user_role_enum NOT NULL,
    subject VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    osym_year_tag VARCHAR(50),
    memory_tip TEXT,
    next_review_date TIMESTAMPTZ DEFAULT NOW(),
    repetition_interval INT DEFAULT 1,
    ease_factor NUMERIC(3,2) DEFAULT 2.5,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =================================================================================
-- 7. ÇALIŞMA GÜNLÜĞÜ (Study Log)
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.study_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL, -- 'pomodoro', 'curriculum', 'exam', 'flashcard'
    subject TEXT,
    topic TEXT,
    duration_minutes INTEGER DEFAULT 0,
    questions_solved INTEGER DEFAULT 0,
    correct_count INTEGER DEFAULT 0,
    wrong_count INTEGER DEFAULT 0,
    exam_type TEXT,
    study_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.study_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kullanıcı kendi study log'unu yönetebilir" ON public.study_logs FOR ALL USING (auth.uid() = user_id);

-- =================================================================================
-- 8. DENEME GEÇMİŞİ (Exam History)
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.exam_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    exam_type TEXT NOT NULL,
    exam_title VARCHAR(150),
    total_time INT,
    gy_correct INTEGER DEFAULT 0,
    gy_wrong INTEGER DEFAULT 0,
    gk_correct INTEGER DEFAULT 0,
    gk_wrong INTEGER DEFAULT 0,
    alan_correct INTEGER DEFAULT 0,
    alan_wrong INTEGER DEFAULT 0,
    gy_net NUMERIC(5,2),
    gk_net NUMERIC(5,2),
    alan_net NUMERIC(5,2),
    total_net NUMERIC(5,2),
    net_score NUMERIC(5,2) NOT NULL DEFAULT 0.0,
    estimated_score NUMERIC(7,3),
    subject_breakdown JSONB DEFAULT '{}'::jsonb,
    notes TEXT,
    exam_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.exam_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kullanıcı kendi deneme geçmişini yönetebilir" ON public.exam_history FOR ALL USING (auth.uid() = user_id);

-- =================================================================================
-- 9. PODCAST ARŞİVİ (Podcast Episodes)
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.podcast_episodes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    uploader_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    subject TEXT NOT NULL,
    exam_type TEXT,
    audio_url TEXT NOT NULL,
    cover_image_url TEXT,
    duration_seconds INTEGER DEFAULT 0,
    play_count INTEGER DEFAULT 0,
    upvote_count INTEGER DEFAULT 0,
    is_official BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.podcast_episodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Herkes podcast dinleyebilir" ON public.podcast_episodes FOR SELECT USING (true);
CREATE POLICY "Kullanıcı kendi podcast'ini yönetebilir" ON public.podcast_episodes FOR ALL USING (auth.uid() = uploader_id);

-- =================================================================================
-- 10. DÜELLO SORU HAVUZU (Duel Questions)
-- =================================================================================
CREATE TABLE IF NOT EXISTS public.duel_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_type TEXT NOT NULL,
    subject TEXT NOT NULL,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_index INTEGER NOT NULL CHECK (correct_index BETWEEN 0 AND 3),
    difficulty TEXT DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.duel_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Herkes düello sorularını görebilir" ON public.duel_questions FOR SELECT USING (true);

-- =================================================================================
-- INDEXES
-- =================================================================================
CREATE INDEX IF NOT EXISTS idx_curriculum_progress_user ON public.curriculum_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_mistakes_user ON public.mistakes_vault(user_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_author ON public.feed_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_receiver ON public.feed_posts(receiver_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_role ON public.flashcards(user_role);
CREATE INDEX IF NOT EXISTS idx_study_logs_user ON public.study_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_study_logs_date ON public.study_logs(study_date);
CREATE INDEX IF NOT EXISTS idx_exam_history_user ON public.exam_history(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_history_date ON public.exam_history(exam_date);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_uploader ON public.podcast_episodes(uploader_id);
CREATE INDEX IF NOT EXISTS idx_duel_questions_exam_type ON public.duel_questions(exam_type);
CREATE INDEX IF NOT EXISTS idx_duel_questions_subject ON public.duel_questions(subject);

-- =================================================================================
-- Trigger: Yeni üye olunduğunda otomatik Profiles kaydı açma
-- =================================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, friend_code, email)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name',
    '#' || UPPER(SUBSTRING(new.raw_user_meta_data->>'name' FROM 1 FOR 4)) || (FLOOR(RANDOM() * 9000) + 1000)::TEXT,
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
