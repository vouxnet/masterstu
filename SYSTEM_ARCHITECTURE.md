# 🏗️ Asimptot — Sistem Mimarisi ve Kod Haritası (Architecture Map)

> Bu belge, yapay zeka asistanlarının projeyi saniyeler içinde analiz edebilmesi için oluşturulmuş bir **Sistem Haritasıdır**. Detaylı proje açıklaması, durum ve yol haritası için `README.md` dosyasına bakınız.

---

## 📦 1. Proje Altyapısı (Tech Stack)
- **Framework**: Next.js 14 (App Router)
- **Dil**: TypeScript 5.5
- **Styling**: Tailwind CSS 3.4 + `globals.css` (Özel Glassmorphism ve Premium UI Token'ları)
- **Animasyon**: Framer Motion 11
- **State Management**: Zustand 4.5 (useCurriculumStore ve useFriendStore persist ile, useAuthStore persist EKLENECEK)
- **İkonlar**: Lucide React
- **Efektler**: canvas-confetti
- **Fontlar**: Inter (sans), Outfit (display)

---

## 📂 2. Dosya Yapısı ve Detaylı Açıklamalar

### 🌍 A. Routing (Sayfalar — `src/app`)

Tüm dashboard sayfaları `(dashboard)` route grubu içindedir ve `layout.tsx` ile sarılıdır (Header + Sidebar + MobileNav).

| Dosya | İşlev | Durum |
|-------|-------|-------|
| `(dashboard)/page.tsx` | Ana Dashboard — CountdownTimer, PartnerWidget, PomodoroWidget, TodoSummary, QuickNavHub, MemoryDecay, RivalRadar, SprintMode, 22 Güncel Bilgi | ✅ Aktif |
| `(dashboard)/ai-hub/page.tsx` | Akıllı Çalışma Merkezi — AI Koç, Konu Tahmini, Podcast Arşivi, 📊 Triyaj, 🔥 120 Soruluk ÖSYM Simülasyonu | ✅ Aktif |
| `(dashboard)/ai-schedule/page.tsx` | AI Haftalık Takvim — Dinamik 7 günlük ders çalışma programı | ✅ Aktif |
| `(dashboard)/curriculum/page.tsx` | Müfredat Takibi — Akordiyon konular, durum döngüsü, sınav bazlı filtreleme | ✅ Aktif |
| `(dashboard)/exams/page.tsx` | Deneme & Net Hesaplama — GY/GK/Alan net, ÖSYM P3/P93/P48 puan hesaplama, geçmiş kayıtlar | ✅ Aktif |
| `(dashboard)/flashcards/page.tsx` | Bilgi Kartları — Tinder-tarzı kaydırma, ders filtresi, Leitner SRS | ✅ Aktif |
| `(dashboard)/friends/page.tsx` | Arkadaşlık & Duo — Otomatik `#İSİM-HEX` kopyalanabilir sabit kod ile ekleme, dürt, tebrik, konfeti | ✅ Aktif |
| `(dashboard)/mistakes/page.tsx` | Yanlış Kutusu — Tam CRUD, etiketler, partner yorum, fotoğraf desteği | ✅ Aktif |
| `(dashboard)/placement/page.tsx` | Atama Hedefi — 40 KPSS kadrosu, net hedefi, progress bar | ✅ Aktif |
| `(dashboard)/question-distribution/page.tsx` | ÖSYM 10 Yıllık Soru Dağılımları — Gerçek ÖSYM verisi (Lisans / Önlisans) | ✅ Aktif |
| `(dashboard)/settings/page.tsx` | Profil & Ayarlar — Cihazdan fotoğraf yükleme (Base64), şifre güncelleme, sabit Duo kodu | ✅ Aktif |
| `(dashboard)/shared-qa/page.tsx` | Canlı Soru Akışı — 3 kademeli görünürlük, CRUD, resim yükleme | ✅ Aktif |
| `(dashboard)/skill-tree/page.tsx` | RPG Yetenek Ağacı — 5 seviyeli kilit açma, XP hesabı | ✅ Aktif |
| `login/page.tsx` | Giriş — Supabase Auth (Email + Google OAuth) ve Zorunlu Onboarding yönlendirmesi | ✅ Aktif |
| `onboarding/page.tsx` | Sınav Seçimi — Çoklu sınav seçimi, aktif sınav ayarı, otomatik Duo kodu ataması | ✅ Aktif |

### 🧠 B. State Management (`src/lib/store/`)

| Dosya | Persist | İçerik | Durum |
|-------|---------|--------|-------|
| `useAuthStore.ts` | ✅ `asimptot_auth_v1` | Profile, partner, activeExam (localStorage öncelikli), updateUserPassword, default Asimptot SVG avatar | ✅ Persist Aktif |
| `useCurriculumStore.ts` | ✅ `kpss_curriculum_storage_v3` | topics dizisi, toggleTopicStatus, resetAllTopics | ✅ Persist Aktif |
| `useFriendStore.ts` | ✅ `kpss_friends_v2` | friends dizisi (oturum kapansa da silinmez, kalıcı), pendingRequests, sendFriendRequest, sendPoke, sendCheer | ✅ Persist Aktif |
| `useDailyQuestStore.ts` | ✅ `asimptot_daily_quests_v1` | Günlük görevler, XP takip motoru, `updateQuestProgress` | ✅ Persist Aktif |
| `useStudyLogStore.ts` | ✅ `asimptot_study_log_v1` | Aktivite logları, streak freeze (🧊), examType filtreli getter'lar | ✅ Persist Aktif |
| `useExamHistoryStore.ts` | ✅ `asimptot_exam_history_v1` | Deneme ve ÖSYM simülasyon geçmişi, examType filtreli getter'lar | ✅ Persist Aktif |

### 📊 C. Statik Veri Dosyaları (`src/lib/data/`)

| Dosya | İçerik | Boyut |
|-------|--------|-------|
| `curriculumData.ts` | 5 sınav tipi × konu listeleri (83+ konu) | 14 KB |
| `flashcardsData.ts` | 51 ÖSYM etiketli flashcard | 18 KB |
| `kpssLisansDistribution.ts` | KPSS Lisans 10 yıllık soru dağılımı (9 ders, 83 konu) | 17 KB |
| `kpssOnlisansDistribution.ts` | KPSS Önlisans 10 yıllık soru dağılımı (5 ders, 64 konu) | 10 KB |
| `duelQuestions.ts` | **235+ Açıklamalı ÖSYM Sorusu** (Önlisans + Lisans ayrımı, 120 soruluk tam sınav havuzu) | 105 KB |
| `placementData.ts` | 40 kadro (25 Lisans + 15 Önlisans) | 12 KB |
| `dailyFacts.ts` | 150 hap bilgi (7 kategori) | 22 KB |
| `skillTreeData.ts` | RPG yetenek ağacı (~20 node, 5 seviye) | 8 KB |

### 🔌 D. Servisler ve Altyapı (`src/lib/services/`, `src/lib/supabase/`)

| Dosya | İçerik |
|-------|--------|
| `services/db.ts` | Gerçek Supabase çağrılarına taşındı (eski Mock sistem silindi) |
| `supabase/client.ts` | `@supabase/ssr` browser client |
| `supabase/server.ts` | `@supabase/ssr` server client |

### 🧩 E. Bileşenler (`src/components/`)

| Bileşen | İşlev |
|---------|-------|
| `navigation/Header.tsx` | Üst bar: logo, sınav değiştirici, Duo Streak rozeti, profil kartı, çıkış |
| `navigation/Sidebar.tsx` | Sol menü: profil kartı + ayarlar linki, "Ana Merkez" grubu (4 link), "Pratik & Sosyal" grubu (5 link), hızlı eylem butonu |
| `dashboard/CountdownTimer.tsx` | Aktif sınava geri sayım (1sn interval) |
| `dashboard/PartnerWidget.tsx` | Partner kartı: ilerleme yüzdesi, dürt/tebrik/soru butonları |
| `dashboard/PomodoroWidget.tsx` | 25dk çalışma / 5dk mola sayacı, ders seçimi |
| `dashboard/TodoSummary.tsx` | Günlük yapılacaklar listesi, ekleme/tamamlama |
| `dashboard/QuickNavHub.tsx` | 6 modüle hızlı erişim kartları |
| `modals/QuickActionModal.tsx` | Hızlı soru/not ekleme modalı |
| `exam-sim/ExamSimulator.tsx` | React Portal kullanılarak tam ekran ÖSYM simülasyonu |

### 🔒 F. Middleware (`src/middleware.ts`)
- Sadece Supabase session kontrolü yapar
- Korumalı rotalar için geçerli auth kontrolü (Ziyaretçi veya Login)

---

## 📐 3. Mimari Kararlar

| Karar | Detay |
|-------|-------|
| **AI = Algoritma ($0)** | LLM API yok. AI Koç = istatistik, AI Takvim = algoritmik dağıtım, SRS = Leitner formülü |
| **OCR Sorumatik KALDIRILDI** | Kullanıcı kararı + maliyet |
| **Sahte TTS KALDIRILDI** | Yerine gerçek dosya upload'lu Podcast Arşivi gelecek |
| **Supabase > Firebase** | İlişkisel veri yapısı için PostgreSQL daha uygun |
| **Pasif Sınavlar** | YKS/TYT/AYT kilitli görünecek, sadece KPSS Lisans + Önlisans aktif |

---

## 🚀 4. Geliştirme Fazları

Detaylar için `README.md`'deki "GELİŞTİRME YOL HARİTASI" bölümüne bakınız.

| Faz | Özet | Durum |
|-----|------|-------|
| Faz 1 | Temel Tamir (persist, temizlik, pasif sınavlar, schema birleştirme) | ✅ TAMAMLANDI (2026-08-08) |
| Faz 2 | Veri Katmanı (StudyLog, ExamHistory, Pomodoro log, Deneme kaydet, Dashboard istatistikler) | ✅ TAMAMLANDI (2026-08-08) |
| Faz 2.5 | Eksik Düzeltmeler (10 bug fix: streak, stale closure, friend req, log entegrasyonu) | ✅ TAMAMLANDI (2026-08-08) |
| Faz 3 | İçerik (60 soru düello, Podcast, Konu Tahmini, AI Koç gerçek veri, SRS Leitner, PWA) | ✅ TAMAMLANDI (2026-08-08) |
| Faz 4 | Elit Özellikler — 6 dalga (aşağıda detay) | ✅ TAMAMLANDI (2026-08-08) |
| Faz 4.5 | İçerik Genişletme (200+ soru, 150 fact, 3 yeni sınav, 51 flashcard, 3 distribution) | ✅ TAMAMLANDI (2026-08-09) |
| Faz 5 | Haksız Rekabet Avantajı — Dalga 1: 5/6 tamamlandı (aşağıda detay) | ✅ DALGA 1 TAMAMLANDI (2026-08-09) |
| Faz 6 | Bulut Geçişi (Supabase Auth/DB, Vercel deploy `masterstu.vercel.app`) | ✅ KISMEN TAMAM (2026-08-09) |

### Faz 4 — Elit Özellikler (6 Dalga)

> ✅ **Dalga 0 tamamlandı (2026-08-08).** Tüm store'lar examType bazlı filtreleme destekliyor, Header'da sınav pill bar aktif.

| Dalga | Özellikler | Yeni/Değişen Dosyalar | Bağımlılık |
|-------|-----------|----------------------|-----------|
| ✅ Dalga 0 | **Sınav Bazlı Veri İzolasyonu** — Store getter'lar examType filtreli, Header sınav pill bar, `getTopicsForExam()`, `examTypeToRole()` | `useStudyLogStore`, `useExamHistoryStore`, `useCurriculumStore`, `Header.tsx`, tüm sayfalar | ✅ TAMAMLANDI |
| ✅ Dalga 1 | Unutma Eğrisi (Ebbinghaus) + Algoritmik Triyaj (ROI) | `memoryDecay.ts`, `MemoryDecayWidget.tsx`, `triyajEngine.ts`, AI Hub triage tab | ✅ TAMAMLANDI |
| ✅ Dalga 2 | Canlı Atama Simülatörü + ÖSYM Stres Simülasyonu | `placementData.ts`, `placement/page.tsx`, `ExamSimulator.tsx`, AI Hub simulation tab | ✅ TAMAMLANDI |
| ✅ Dalga 3 | Rakip Radarı + Asimetrik Duo Motor | `rivalSimulator.ts`, `RivalRadarWidget.tsx`, `performanceNormalizer.ts`, `PartnerWidget.tsx` | ✅ TAMAMLANDI |
| ✅ Dalga 4 | Micro-Sprint (Akşam Modu) + Yetenek Ağacı (RPG) | `SprintModeWidget.tsx`, `skillTreeData.ts`, `skill-tree/page.tsx`, Sidebar link | ✅ TAMAMLANDI |
| ✅ Dalga 5 | Otonom İçerik Ajanları + Günün Bilgisi | `dailyFacts.ts` (60 fact), `DailyFactWidget.tsx`, Dashboard entegrasyonu | ✅ TAMAMLANDI |

### Faz 4 — Tasarım Kararları

| Karar | Detay |
|-------|-------|
| **Sınav bazlı izolasyon** | Flat array korundu, getter'lara `examType?` filtre eklendi. `getTopicsForExam()` + `examTypeToRole()` ile sınav→rol eşlemesi. ✅ TAMAMLANDI |
| **Ebbinghaus formülü** | `retention = e^(-t/S)`, S = çalışma tekrarına göre 1-30 arası |
| **Triyaj ROI** | `ROI = (ortalama_soru × iyileşme_olasılığı) / tahmini_saat` |
| **Kadro verisi** | memurlar.net/kamuajans.com açık veriler, admin CRUD ile güncellenir |
| **Yetenek ağacı kilidi** | Yumuşak kilit — uyarı verir ama kullanıcı isterse geçer |
| **Soru havuzu** | 60 → 200+ TAMAMLANDI (9 ders, doğrulanmış Anayasa maddeleri + ÖSYM verileri) |
| **Rakip radarı** | Supabase öncesi algoritmik simülasyon, sonra gerçek anonim veri |
| **Mobil strateji** | Capacitor YOK → React Native (Expo) ile direkt native uygulama |

### Faz 4.5 — İçerik Genişletme (TAMAMLANDI — 2026-08-09)

| İçerik | Önce | Sonra | Dosya |
|--------|:----:|:-----:|-------|
| Soru Bankası | 60 | 200+ | `duelQuestions.ts` |
| Flashcard | 21 | 51 | `flashcardsData.ts` |
| Günün Bilgisi | 60 | 150 | `dailyFacts.ts` |
| Müfredat Konuları | 44 | 83 | `curriculumData.ts` |
| Aktif Sınavlar | 2 | 5 | `onboarding/page.tsx` |
| Soru Dağılımı | 2 | 5 | `ortaogretim/yds/alesDistribution.ts` |

### Faz 5 — Haksız Rekabet Avantajı (10 Özellik, 2 Dalga)

> **Pazar Analizi:** Türkiye'deki HİÇBİR sınav uygulamasında SRS, PvP düello, atama simülatörü, RPG ağacı ve lig sistemi yok.

| # | Özellik | Dalga | Yeni Dosyalar | Durum |
|---|---------|:-----:|---------------|:-----:|
| ① | Streak Freeze + Sigorta | 1 | `useStudyLogStore` güncellendi | ✅ |
| ② | Günlük Görev Sistemi | 1 | `useDailyQuestStore.ts`, `DailyQuestWidget.tsx` | ✅ |
| ③ | Atama İlerleme Barı | 1 | `PlacementProgressWidget.tsx` | ✅ |
| ④ | Paylaşılabilir Başarı Kartları | 1 | `AchievementCard.tsx`, `html-to-image` | ✅ |
| ⑤ | Haftalık Lig Sistemi | 1 | `useLeagueStore.ts`, `league/page.tsx` | ✅ |
| ⑥ | Akıllı Çözüm Açıklamaları | 1 | `duelQuestions.ts` güncelle | ⏳ |
| ⑦ | Sanal Kütüphane | 2 | Yeni sayfa + Supabase Realtime | Faz 6 |
| ⑧ | Mikro Podcast | 2 | Yeni sayfa + Supabase Storage | Faz 6 |
| ⑨ | Canlı Turnuva | 2 | Yeni sayfa + Supabase Realtime+Auth | Faz 6 |
| ⑩ | AI Hata Deseni Analizi | 2 | Yeni bileşen + LLM API | Faz 6 |

---

*Bu dosya bir AI ajanı tarafından okunduğunda, projenin tüm teknik detaylarını anlaması ve kaldığı yerden devam etmesi için yeterli bilgiyi sağlar.*
