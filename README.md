# ∞ Asimptot

> *"Her çözülen soru seni hedefe bir adım daha yaklaştırır. Asla durma. Asimptotik ol."*

---

## 📜 Manifesto

Biz sıradan bir sınav uygulaması değiliz.

Biz, **beynin nasıl öğrendiğini bilen** ve bunu silaha dönüştüren bir platformuz. Ebbinghaus'un unutma eğrisini izleriz — hangi konuyu ne zaman unutacağını senden önce biliriz. Algoritmik triyaj motorumuz, hangi konuya 1 saat ayırırsan kaç net kazanacağını hesaplar. Sana soru çözdürmeyiz — **seni stratejist yaparız.**

Motivasyonu şansa bırakmayız. **Streak freeze** ile serini korursun, **günlük görevler** ile hedefe kilitlenirsin, **haftalık lig** ile rakiplerini geçersin, **PvP düello** ile bilgini savaş alanında test edersin. Her gün bir adım daha. Her gün asimptotik.

Sınav günü geldiğinde ÖSYM'nin baskısını ilk kez hissetmezsin — çünkü biz seni **stres simülasyonuyla** çoktan hazırladık. Tam ekran, geri sayım, çıkarsan sınavın biter. Gerçek sınav bizimkinden kolay gelecek.

**Nörobilim × Oyunlaştırma × Yapay Zeka.**

Üç silahı tek platformda birleştiren Türkiye'nin ilk sınav fetih sistemi.

> **Hedefe asimptotik. Her gün bir adım daha. ∞**

---

## 🚀 Deployment ve Kaynak Kod

- **Canlı Sistem:** [masterstu.vercel.app](https://masterstu.vercel.app)
- **Kaynak Kod:** [github.com/asimptotnet/masterstu](https://github.com/asimptotnet/masterstu)
- **Veritabanı:** Supabase PostgreSQL (Frankfurt)
- **Auth:** Supabase Auth (Email + Google OAuth)

---

**Asimptot**, Türkiye'deki tüm ÖSYM sınav adayları için (*KPSS Lisans + A Grubu, KPSS Önlisans, KPSS Ortaöğretim, YDS/YÖKDİL, ALES/DGS, YKS-TYT, YKS-AYT*) geliştirilmiş **uçtan uca sınav hazırlık ekosistemidir**.

- 🎯 **Kişiselleştirilmiş Hazırlık**: Öğrenci sınavını seçtiği anda tüm platform (müfredat, kartlar, takvim, denemeler) o sınava göre şekillenir
- 🧠 **Yeni Eğitim Modelleri**: Akıllı algoritma bazlı AI Koç, Spaced Repetition (SRS) ile hızlandırılmış öğrenme, zayıf konu odaklı çalışma programları
- 📊 **An Be An Takip**: Çalışma saatleri, çözülen sorular, deneme netleri, streak — her aktivite kaydedilir ve analiz edilir
- 👥 **Sosyal Öğrenme Motoru**: Partner/arkadaş sistemi, ortak çalışma, 1v1 bilgi düellosu, soru paylaşımı, topluluk etkileşimi
- 🔥 **Motivasyon ve Oyunlaştırma**: Duo Streak, konfeti, düello skorları, rozet sistemi, partner rekabeti
- 🎙️ **Multimedya Eğitim**: Podcast Arşivi (yönetici + kullanıcı yüklemeli ses içerikleri)
- 📱 **Çoklu Platform**: Web (Next.js) + Mobil (React Native / Expo ile ayrı native uygulama)

---

## ⚠️ PROJE DURUMU (SON GÜNCELLEME: 2026-08-10)

### Aktif Sınav Tipleri (Tam İçerikli)
| Sınav | Müfredat | Flashcard | Soru Dağılımı | Puan Hesaplama | ÖSYM Simülasyon |
|-------|----------|-----------|---------------|----------------|-----------------|
| ✅ KPSS Lisans + A Grubu | ✅ (10 yıl verisi) | ✅ (16 kart) | ✅ (83 konu) | ✅ | ✅ (120 Soru / 130 Dk) |
| ✅ KPSS Önlisans | ✅ (10 yıl verisi) | ✅ (5 kart) | ✅ (64 konu) | ✅ | ✅ (120 Soru / 130 Dk) |

### Pasif Sınav Tipleri (Kilitli — "Yakında" Rozeti)
| Sınav | Durum |
|-------|-------|
| 🔒 KPSS Ortaöğretim | Metadata var, içerik hazırlanıyor |
| 🔒 YDS / YÖKDİL | Metadata var, içerik hazırlanıyor |
| 🔒 ALES / DGS | Metadata var, içerik hazırlanıyor |
| 🔒 YKS - TYT | Eklenecek |
| 🔒 YKS - AYT | Eklenecek |

### Mevcut Mimari & Güvenlik
- **Auth**: Supabase Auth (Email + Google OAuth) + Zorunlu Onboarding Yönlendirmesi
- **Duo Kodu**: `#İSİM-HEX` formatında otomatik atanan, değiştirilemez sabit kimlik (`#BULENT-4A8E`, `#SENA-91F4`)
- **Database**: Supabase PostgreSQL (Frankfurt bölgesi, 10 tablo, RLS aktif, auto-profile tetikleyicisi)
- **Deployment**: Vercel (`masterstu.vercel.app`)
- **State**: Zustand + localStorage (oturumlar arası arkadaşlıklar ve sınav seçimleri kalıcı)
- **AI & Algoritmalar**: %100 Algoritmik Triyaj (ROI) + Ebbinghaus Unutma Eğrisi ($0 API Maliyeti)

---

## 🌟 MODÜLLER VE ROTALAR

### 📱 Sayfalar (Routes)

| Rota | Sayfa | Durum | Açıklama |
|------|-------|-------|----------|
| `/` | Gösterge Paneli | ✅ Aktif | Geri sayım, Pomodoro, Todo, Sprint Modu, Hafıza Barları, Rakip Radarı, 22 Güncel Bilgi |
| `/login` | Giriş Ekranı | ✅ Aktif | Supabase Auth + Google OAuth (Onboarding korumalı) |
| `/onboarding` | Sınav Seçimi | ✅ Aktif | Çoklu sınav seçimi, aktif sınav ataması, otomatik `#İSİM-HEX` Duo kodu |
| `/curriculum` | Müfredat Takibi | ✅ Aktif | Akordiyon konular, durum döngüsü, sınav bazlı filtreleme |
| `/flashcards` | Bilgi Kartları | ✅ Aktif | Tinder-tarzı kaydırma, SRS Leitner, sınav bazlı filtreleme |
| `/mistakes` | Yanlış Kutusu | ✅ Aktif | Tam CRUD, partner yorum, fotoğraf desteği, LocalStorage kalıcı |
| `/exams` | Deneme & Net | ✅ Aktif | Puan hesaplama, deneme kaydetme, sınav bazlı filtreleme |
| `/question-distribution` | Soru Dağılımları | ✅ Aktif | 10 yıllık gerçek ÖSYM verisi (Lisans/Önlisans) |
| `/shared-qa` | Canlı Soru Akışı | ✅ Aktif | 3 kademeli görünürlük, CRUD, görsel yükleme |
| `/friends` | Arkadaşlık Pano | ✅ Aktif | Sabit kod ile ekleme, dürt, tebrik, asimetrik performans karşılaştırma |
| `/ai-hub` | Akıllı Çalışma Merkezi | ✅ Aktif | 5 sekme: AI Koç, Konu Tahmini, Podcast, 📊 Triyaj, 🔥 ÖSYM Simülasyonu |
| `/ai-schedule` | AI Haftalık Takvim | ✅ Aktif | Müfredat + log verisiyle dinamik 7 günlük plan |
| `/placement` | Atama Hedefi | ✅ Aktif | 40 kadro, arama/filtre, progress bar, ✅🟡⛔ kartlar |
| `/skill-tree` | Yetenek Ağacı | ✅ Aktif | RPG skill tree, 5 seviye, XP barı, yumuşak kilit, konfeti |
| `/settings` | Profil & Ayarlar | ✅ Aktif | Cihazdan fotoğraf yükleme (Base64), şifre değiştirme, sabit Duo kodu |

### 🧠 State Management (Zustand Store'ları)

| Store | Persist Key | Açıklama | Durum |
|-------|-------------|----------|---------|
| `useAuthStore.ts` | `asimptot_auth_v1` | Profil, partner, `activeExam` öncelikli kalıcılık, `updateUserPassword`, default Asimptot SVG avatar | ✅ Persist Aktif |
| `useCurriculumStore.ts` | `asimptot_curriculum_v1` | Konu ilerleme, `getTopicsForExam()`, `examTypeToRole()` | ✅ Persist Aktif |
| `useFriendStore.ts` | `kpss_friends_v2` | Arkadaş listesi (Oturum kapansa da silinmez, kalıcı) | ✅ Persist Aktif |
| `useStudyLogStore.ts` | `asimptot_study_log_v1` | Aktivite logları, streak freeze (🧊), examType filtreli getter'lar | ✅ Persist Aktif |
| `useExamHistoryStore.ts` | `asimptot_exam_history_v1` | Deneme geçmişi, examType filtreli getter'lar | ✅ Persist Aktif |

### 📂 Veri Dosyaları (`src/lib/data/`)

| Dosya | İçerik |
|-------|--------|
| `curriculumData.ts` | 5 sınav tipi için 83+ konu |
| `flashcardsData.ts` | 51 flashcard (ÖSYM etiketli) |
| `kpssLisansDistribution.ts` | KPSS Lisans 10 yıllık soru dağılımı (9 ders, 83 konu) |
| `kpssOnlisansDistribution.ts` | KPSS Önlisans 10 yıllık soru dağılımı (5 ders, 64 konu) |
| `duelQuestions.ts` | **235+ Açıklamalı ÖSYM Sorusu** (Önlisans + Lisans ayrımı, 120 soruluk sınav havuzu) |
| `placementData.ts` | 40 kadro (25 Lisans + 15 Önlisans, merkez/taşra, zorluk) |
| `dailyFacts.ts` | 150 hap bilgi (7 kategori, kaynak referansları) |
| `skillTreeData.ts` | RPG yetenek ağacı (~20 node, 5 seviye) |

### 🧩 Bileşenler (`src/components/`)

| Bileşen | Konum | İşlev |
|---------|-------|-------|
| `Header.tsx` | navigation/ | Üst bar, sınav pill bar değiştirici, streak rozeti, çıkış |
| `Sidebar.tsx` | navigation/ | Sol menü (Ana Merkez + Pratik & Sosyal), 🎯 Atama + 🌳 Ağaç linkleri |
| `CountdownTimer.tsx` | dashboard/ | Aktif sınava geri sayım |
| `PartnerWidget.tsx` | dashboard/ | Partner durumu, dürt/tebrik, asimetrik performans karşılaştırma |
| `PomodoroWidget.tsx` | dashboard/ | 25dk çalışma / 5dk mola sayacı |
| `TodoSummary.tsx` | dashboard/ | Günlük yapılacaklar listesi |
| `QuickNavHub.tsx` | dashboard/ | Modüllere hızlı erişim kartları |
| `MemoryDecayWidget.tsx` | 🆕 dashboard/ | Ebbinghaus hafıza barları (yeşil→sarı→kırmızı, pulse) |
| `RivalRadarWidget.tsx` | 🆕 dashboard/ | Rakip radarı canlı feed + elit karşılaştırma |
| `SprintModeWidget.tsx` | 🆕 dashboard/ | Gece sprint modu (19:00-06:00), 15dk mini Pomodoro |
| `DailyFactWidget.tsx` | 🆕 dashboard/ | Günün bilgisi (60 fact, 7 kategori) |
| `ExamSimulator.tsx` | 🆕 exam-sim/ | Fullscreen ÖSYM simülasyonu, durdurulamaz timer, PES ETTİ |
| `QuickActionModal.tsx` | modals/ | Hızlı soru/not ekleme modalı |

### 🔧 Utility Motorlar (`src/lib/utils/`)

| Dosya | İşlev |
|-------|-------|
| `memoryDecay.ts` | Ebbinghaus: `retention = e^(-t/S)`, stability, status hesaplama |
| `triyajEngine.ts` | ROI motoru: `expectedNetGain / estimatedStudyHours`, focus/maintain/skip |
| `rivalSimulator.ts` | Algoritmik sanal rakip üreteci (dağılım ağırlıklı) |
| `performanceNormalizer.ts` | 4 metrik normalizasyon (net + tutarlılık + müfredat + düello) |

---

## 🗺️ GELİŞTİRME YOL HARİTASI (EXECUTION PLAN)

### ✅ FAZ 1: "Temel Tamir" — TAMAMLANDI (2026-08-08)
- [x] `useAuthStore`'a `persist` middleware eklendi (`asimptot_auth_v1`)
- [x] OCR Sorumatik ve sahte TTS Podcast sekmeleri AI Hub'dan kaldırıldı
- [x] Tüm sayfalardan ölü importlar temizlendi
- [x] `kpssLisansDistribution.ts` encoding — dosya zaten temizdi
- [x] İki `schema.sql` tek unified dosyada birleştirildi (10 tablo + RLS + indexler)
- [x] Flashcard ilerleme durumu LocalStorage'a kaydediliyor (`asimptot_flashcard_progress_v1`)
- [x] Ayarlar sayfası pasif butonlar → "Yakında" rozeti
- [x] YKS-TYT ve YKS-AYT `EXAM_METADATA`'ya eklendi (kilitli)
- [x] Soru Dağılımları linki Sidebar'a eklendi

### ✅ FAZ 2: "Veri Katmanı" — TAMAMLANDI (2026-08-08)
- [x] `useStudyLogStore` oluşturuldu — activityType/subject/duration/questions/examType logları
- [x] `useExamHistoryStore` oluşturuldu — GY/GK/Alan net, tahmini puan, not, silme
- [x] PomodoroWidget: 25dk oturum bitince otomatik `addLog()` + toast bildirimi + "Bugün: N Oturum" rozeti
- [x] Exams sayfası: "Deneme Kaydet" butonu + not alanı + açılır geçmiş listesi + silme
- [x] Dashboard: 4'lü haftalık istatistik bar (🔥 Streak / ⏱ Bu Hafta Dk / 📖 Aktif Gün / 📈 Son Net)
- [x] Dashboard: Hardcoded `completedQuestionsToday` kaldırıldı, `getTodayStats()` ile gerçek veri

### ✅ FAZ 2.5: "Eksik Düzeltmeler" — TAMAMLANDI (2026-08-08)

- [x] **Header streak**: `Header.tsx` satır 83 — `useStudyLogStore().getStreakCount()` ile gerçek veri
- [x] **PomodoroWidget stale closure**: `useRef` pattern ile düzeltildi — doğru ders/sınav logu atılıyor
- [x] **Onboarding → Müfredat sync**: `resetAllTopics(role)` sınav değişiminde tetikleniyor
- [x] **sendFriendRequest**: `pendingRequests`'e gerçekten ekliyor, duplicate kontrolü var
- [x] **Misafir Kullanıcı (Guest)**: Gerçek Supabase Auth eklendi, eski test kullanıcıları temizlendi
- [x] **supabase/schema.sql silindi**: Eski dosya kaldırıldı
- [x] **Curriculum store key**: `kpss_curriculum_storage_v3` → `asimptot_curriculum_v1`
- [x] **Müfredat log**: Konu tıklanınca `addLog({ activityType: "curriculum" })` çağrılıyor
- [x] **Flashcard log**: Biliyorum/Bilmiyorum'da `addLog({ activityType: "flashcard" })` çağrılıyor
- [x] **Flashcard yukarı drag**: `drag` tüm yönler aktif, yukarı kaydırınca hata bildirimi modalı açılıyor (3 seçenek, localStorage'a kaydediyor)

---

### ✅ FAZ 3: "İçerik Zenginleştirme" — TAMAMLANDI (2026-08-08)

#### 🃏 Flashcard Sistemi (4 Yönlü Etkileşim)
- [x] **Tap → Kart Çevirme**: Ön yüz (soru) → arka yüz (cevap) flip animasyonu (Faz 2.5'te zaten çalışıyordu)
- [x] **Yukarı Kaydır → Hata Bildir**: Modal açılır, 3 seçenek, `asimptot_card_reports_v1` localStorage'a kaydedilir (Faz 2.5'te eklendi)
- [x] **Flashcard SRS**: Leitner kutusu algoritması — 5 kutu (1/3/7/14/30 gün aralık), kutu seviyesi kart altında gösteriliyor
- [x] Hata bildirim listesi localStorage'da tutuluyor (admin paneli Faz 4'te)

#### ⚔️ Düello & AI Hub
- [x] **60 gerçek KPSS sorusu** (`duelQuestions.ts`) — Anayasa(12), İdare(10), Tarih(10), Coğrafya(8), İktisat(8), Türkçe(6), Matematik(6)
- [x] **Yeni düello mekanizması**: 5 tur / 30sn geri sayım / 4 seçenekli (A-B-C-D) / bot rakip / doğru-yanlış renklendirme / skor tablosu
- [x] **Podcast Arşivi tab'ı**: 6 mock episode, play butonu, süre, dinlenme sayısı, resmi rozet (gerçek upload Faz 5'te)
- [x] **Konu Tahmini tab'ı**: `kpssLisansDistribution` + `kpssOnlisansDistribution` verilerinden top 15 konu, yükseliş/düşüş trendi, önem derecesi

#### 🧠 AI Modülleri Gerçek Veriye Bağlanma
- [x] **AI Koç**: İstatistik satırı (Bugün/Seri/Bu Hafta/Son Net) + zayıf konular (not_started/studying) + güçlü konular (solved) + net trend analizi
- [x] **AI Takvim**: `useCurriculumStore` eksik konularından öncelik sırası, `useStudyLogStore` az çalışılan dersler, dinamik 7 günlük plan

#### 🔧 Sistem Tutarlılığı (Faz 2.5'te tamamlandı)
- [x] Header Streak gerçek veri, Onboarding kilitli sınavlar (🔒 Yakında), Müfredat sync, Arkadaş sistemi

#### 📱 PWA (Mobil Hazırlık)
- [x] `public/manifest.json` oluşturuldu (Asimptot adı, ikon, standalone, theme_color)
- [x] `layout.tsx`'e meta taglar eklendi (theme-color, apple-mobile-web-app-capable, apple-mobile-web-app-title)

### 🚀 FAZ 4: "Elit Özellikler" — 6 DALGA HALİNDE GELİŞTİRME PLANI

> **Vizyon:** Kullanıcıları sisteme kilitleyecek, dışarıda bulamayacakları "haksız rekabet avantajı" ve güçlü FOMO (kaybetme korkusu) yaratan 9 elit özellik.
> **Kritik Kural:** Dalga 0 (Sınav Bazlı Veri İzolasyonu) tüm sistemin temelidir. Dalga 0 tamamlanmadan hiçbir elit özellik başlamaz.

---

#### ✅ DALGA 0: "Sınav Bazlı Veri İzolasyonu" — TAMAMLANDI (2026-08-08)

> Her sınav kendi evreninde yaşıyor. Sınav değiştirildiğinde tüm panel anında güncelleniyor.

##### Store Refaktörü (Sınav Bazlı İzolasyon)
- [x] `useAuthStore` → `selectedExams: ExamType[]` + `activeExam: ExamType` + `setActiveExam()` (zaten mevcuttu)
- [x] `useStudyLogStore` → tüm getter'lara `examType?` parametresi eklendi + `getLogsForExam()` + `addLog` otomatik examType
- [x] `useExamHistoryStore` → tüm getter'lara `examType?` parametresi eklendi + `getResultsForExam()` + `addResult` otomatik examType
- [x] `useCurriculumStore` → `getTopicsForExam(examType)` + `examTypeToRole()` yardımcı fonksiyonu eklendi
- [x] Flashcard → `examTypeToRole(activeExam)` ile sınava göre kart filtreleme

##### Sınav Değiştirici (Header Pill Bar)
- [x] Header'da sınav pill bar: rounded-full, indigo aktif, glass-card pasif, shortLabel kullanımı
- [x] "Ekle" butonu → `/onboarding` linki
- [x] Sınav değiştirildiğinde TÜM panel güncelleniyor:
  - ✅ Geri sayım, Müfredat, Çalışma logları, Deneme geçmişi
  - ✅ Flashcard, Düello, Soru dağılımı, AI Koç, AI Takvim

##### Onboarding (zaten çalışıyordu)
- [x] Çoklu sınav seçimi → `selectedExams` dizisine kaydediyor
- [x] İlk seçilen → `activeExam` olarak atanıyor
- [x] Müfredat otomatik yükleniyor

---

#### ✅ DALGA 1: "Kayıp Korkusu Motoru" — TAMAMLANDI (2026-08-08)

##### ⑧ Unutma Eğrisi (Ebbinghaus Paneli)
- [x] `src/lib/utils/memoryDecay.ts` — Ebbinghaus formülü: `retention = e^(-t/S)`, stability 1-30, status hesaplama
- [x] `src/components/dashboard/MemoryDecayWidget.tsx` — Eriyen barlar widget (yeşil→sarı→kırmızı, animate-pulse kritik)
- [x] Dashboard'a "Hafıza Durumu" paneli eklendi — framer-motion animasyonlu
- [x] "Acil Tekrar Et" butonu → /curriculum linkli
- [x] Özet: "X konu kritik, Y konu eriyor"

##### ① Algoritmik Triyaj (Zaman/Net ROI Motoru)
- [x] `src/lib/utils/triyajEngine.ts` — ROI formülü: `expectedNetGain / estimatedStudyHours`
- [x] AI Hub'a 5. sekme: "📊 Triyaj" — ROI'ye göre sıralı, 15 konu gösterimli
- [x] "Bırak" konular gri + line-through (ROI < 0.1)
- [x] 🎯 Odaklan / 📌 Koru / ⏭️ Bırak rozet sistemi
- [x] Üstte özet: "Bu 3 konuya odaklanırsan tahminen +X.X net artış"

---

#### ✅ DALGA 2: "Hedef Somutlaştırma" — TAMAMLANDI (2026-08-08)

##### ② Canlı Atama ve Hedef Simülatörü
- [x] `src/lib/data/placementData.ts` — 40 kadro (25 Lisans + 15 Önlisans, merkez/taşra, zorluk seviyeleri)
- [x] `src/app/(dashboard)/placement/page.tsx` — Atama simülatörü sayfası (arama, filtre, progress bar)
- [x] Sidebar'a "🎯 Atama Hedefi" linki
- [x] Canlı progress bar + kadro kartları: ✅ Yeşil / 🟡 Sarı / ⛔ Kırmızı
- [x] "Kendi kadro hedefini gir" custom target seçeneği

##### ⑦ Acımasız ÖSYM Simülasyonu
- [x] `src/components/exam-sim/ExamSimulator.tsx` — Fullscreen API + durdurulamaz timer (React Portal ile düzgün render için güncellendi)
- [x] AI Hub'a 6. sekme: "🔥 ÖSYM Simülasyonu"
- [x] Sınav süresi seçimi: 30dk (15 soru) / 60dk (30 soru) / 120dk (60 soru)
- [x] Fullscreen çıkış: 1. uyarı (10sn geri sayım), 2. "PES ETTİ" damgası
- [x] Sonuç: Net, doğru/yanlış/boş, stres skoru, TAMAMLADI/PES ETTİ rozeti
- [x] Geçmiş simülasyonlar localStorage'da (`asimptot_simulations_v1`)

---

#### ✅ DALGA 3: "Sosyal Rekabet" — TAMAMLANDI (2026-08-08)

##### ③ Rakip Radarı
- [x] `src/lib/utils/rivalSimulator.ts` — Algoritmik sanal rakip üreteci (sınav dağılım ağırlıklı)
- [x] `src/components/dashboard/RivalRadarWidget.tsx` — Dashboard widget (canlı feed + karşılaştırma)
- [x] Canlı feed: "Bir elit aday **X** çalışıyor" + pulse animasyonu
- [x] Karşılaştırma barları: User vs Elit saat/hafta, Geride/Önde/Takipte rozetleri

##### ⑤ Asimetrik Duo Rekabet Motoru
- [x] `src/lib/utils/performanceNormalizer.ts` — 4 metrik normalizasyon (0.4×net + 0.3×tutarlılık + 0.2×müfredat + 0.1×düello)
- [x] `PartnerWidget.tsx` güncellendi → iki taraflı progress bar + haftalık skor + shimmer efekti
- [x] Haftalık karşılaştırma mesajları: 🏆 Geçtin / 🔥 Geride / ⚡ Başa baş

---

#### ✅ DALGA 4: "Yaşam Tarzı Adaptasyonu" — TAMAMLANDI (2026-08-08)

##### ⑥ Mesai Sonrası Hızlandırıcı (Micro-Sprint)
- [x] `src/components/dashboard/SprintModeWidget.tsx` — Gece sprint modu (19:00-06:00 aktif)
- [x] 3 hızlı sprint aksiyonu: Zayıf Konu / Erime Kurtarma / Flash Sprint
- [x] Mini Pomodoro: 15 dk timer + tamamlama animasyonu
- [x] Sprint istatistikleri localStorage'da (`asimptot_sprint_v1`)
- [x] Koyu mor/lacivert gece teması

##### ④ Bilişsel Yetenek Ağacı (RPG Skill Tree)
- [x] `src/lib/data/skillTreeData.ts` — 5 seviyeli ağaç (Başlangıç→Gelişen→İleri→Uzman→Elit), ~20 node
- [x] `src/app/(dashboard)/skill-tree/page.tsx` — Yetenek ağacı sayfası + XP barı
- [x] Sidebar'a "🌳 Yetenek Ağacı" linki
- [x] Yumuşak kilit: Kilitli nodlar gri/blur, tıklayınca uyarı modalı
- [x] Kilit açma konfeti animasyonu
- [x] `useCurriculumStore` entegrasyonu (tamamlanan konular = XP)

---

#### ✅ DALGA 5: "Otonom Zeka" — TAMAMLANDI (2026-08-08)

##### ⑨ Otonom İçerik Ajanları
- [x] `src/lib/data/dailyFacts.ts` — 60 hap bilgi (Hukuk, İktisat, Tarih, Coğrafya, Vatandaşlık, Maliye, Genel Kültür)
- [x] `src/components/dashboard/DailyFactWidget.tsx` — "Günün Bilgisi" widget (kategori badge, kaynak, sınav relevansı)
- [x] Dashboard'a eklendi — "Sonraki İpucu" butonu ile rastgele fact gösterimi
- [ ] **Faz B (Supabase sonrası):** `daily_facts` tablosu + admin CRUD
- [ ] **Faz C (AI sonrası):** Resmi Gazete RSS tarama + LLM → hap bilgi

---

> 🏆 **FAZ 4 — TÜM 6 DALGA TAMAMLANDI!** Build: 18/18 sayfa, 0 hata. (2026-08-08)

---

#### 📊 Soru Havuzu Durumu (TAMAMLANDI — 2026-08-09)
- [x] **Katman 1:** 60 → 200+ soruya genişletildi (9 ders, doğrulanmış veriler)
- [ ] **Katman 2:** Geçmiş yıl ÖSYM soruları (kamuya açık) derle ve formatla
- [ ] **Katman 3:** Kullanıcı soru önerisi → admin onay → havuza ekleme
- [ ] **Katman 4:** AI ile parametrik soru üretimi (özellikle Matematik/İktisat)

---

### 🚀 FAZ 5: "Haksız Rekabet Avantajı" — VİRAL BÜYÜME + BAĞIMLILIK MEKANİKLERİ

> **Vizyon:** Rakiplerde OLMAYAN özelliklerle kullanıcıya "Bunu başka yerde bulamam" hissi yaratmak.
> **Pazar Analizi:** Türkiye'de SRS, PvP düello, atama simülatörü, RPG ağacı ve lig sistemi olan HİÇBİR uygulama yok.

#### 🌊 DALGA 1: Hemen Yapılabilir (Supabase Gerektirmez) — ✅ 6/6 TAMAMLANDI (2026-08-09)

##### ① Streak Freeze + Streak Sigorta ✅
- [x] `useStudyLogStore` → `streakFreezes`, `streakInsurance`, `streakFreezeUsedDates` eklendi
- [x] 3+ gün seri = 1 Streak Freeze kazanımı (1 gün kaçırma hakkı)
- [x] 30+ gün seri = Streak Sigorta (2 gün koruma)
- [x] Dashboard'da freeze rozeti gösterimi (🧊×1)

##### ② Günlük Görev Sistemi (Daily Quests) ✅
- [x] `src/lib/store/useDailyQuestStore.ts` — Günlük kişiselleştirilmiş görev üreteci
- [x] `src/components/dashboard/DailyQuestWidget.tsx` — "Bugünün Görevleri" widget
- [x] Görev tipleri: 20 soru çöz, 30dk çalış, 10 flashcard, 1 deneme, seriyi koru
- [x] Tamamlanan görev → XP + konfeti animasyonu

##### ③ Atama İlerleme Barı (Duygusal Bağ) ✅
- [x] `src/components/dashboard/PlacementProgressWidget.tsx` — Dashboard widget
- [x] Kullanıcı hedef kadro seçer (placementData.ts'den)
- [x] Her deneme neti → ilerleme barı güncellenir: "Ankara DHMİ: %73 Tamamlandı"
- [x] Bar dolunca → konfeti + "HEDEFİNE ULAŞTIN!" animasyonu

##### ④ Paylaşılabilir Başarı Kartları (Viral Motor) ✅
- [x] `src/components/share/AchievementCard.tsx` — html-to-image ile PNG oluşturma
- [x] Günlük istatistik kartı: soru sayısı, başarı, streak
- [x] Düello galibiyet kartı + haftalık özet kartı
- [x] "İndir" butonu → PNG indirme → WhatsApp/Instagram Story

##### ⑤ Haftalık Lig Sistemi (Duolingo Tarzı) ✅
- [x] `src/lib/store/useLeagueStore.ts` — Lig state yönetimi
- [x] 6 lig: Bronz → Gümüş → Altın → Platin → Elmas → Obsidyen
- [x] Haftalık XP sıralaması + 14 simüle rakip (Türk isimleri)
- [x] Üst 3 → bir üst lige, alt 3 → bir alt lige
- [x] Lig rozeti Header'da görünür
- [x] `src/app/(dashboard)/league/page.tsx` — Lig sıralama sayfası (19. sayfa)

##### ⑥ Akıllı Çözüm Açıklamaları ✅
- [x] `duelQuestions.ts` → 78 soruya `explanation` alanı eklendi
- [x] Açıklama: "Doğru cevap B çünkü..." + kaynak referansı formatı
- [x] İlgili kaynak referansı: "Anayasa Md. 146", "Md. 75" vb.
- [x] Düello + ÖSYM Simülasyonu sonuç ekranında 💡 açıklama gösterimi

#### 🌊 DALGA 2: Supabase Sonrası (Gerçek Backend Gerekli)

##### ⑦ Sanal Kütüphane (Beraber Çalışma Odaları)
- [ ] Supabase Realtime ile canlı çalışma odası
- [ ] "Şu an 247 kişi Asimptot'ta çalışıyor" gösterimi
- [ ] Arkadaş davet et → birlikte Pomodoro çalıştır
- [ ] Odaklanma süresi → XP kazanımı
- [ ] Oda bazlı sohbet (ders konuşmaları)

##### ⑧ Mikro Podcast (3dk Sesli Dersler)
- [ ] Supabase Storage ile gerçek ses dosyası yükleme
- [ ] Her bölüm tek KPSS konusu (Tanzimat, Deflasyon, Md.13...)
- [ ] Format: 2dk ders + 1dk 3 soru-cevap
- [ ] Günde 1 yeni bölüm yayını
- [ ] Offline indirme desteği

##### ⑨ Canlı Turnuva (Pazar 20:00 Türkiye Geneli)
- [ ] Supabase Realtime + Auth ile gerçek kullanıcı eşleşmesi
- [ ] Her Pazar 20:00 → zaman sınırlı canlı sınav (FOMO)
- [ ] Anlık Türkiye sıralaması: "Şu an 42. sıradasın!"
- [ ] Kaçıranlar o haftanın sıralamasına giremez
- [ ] Haftalık turnuva şampiyonu → özel rozet

##### ⑩ AI Hata Deseni Analizi (Kör Nokta Teşhisi)
- [ ] Yanlış yapılan soruların konu/tip bazlı cluster analizi
- [ ] "Son 50 sorunuzda %80 hatayı Md.13 konusunda yapıyorsunuz"
- [ ] "Bu kör noktayı kapatmak için şu 5 soruyu çöz" önerisi
- [ ] LLM entegrasyonu ile doğal dilde koçluk (Faz 6 sonrası)

---

### ☁️ FAZ 6: "Bulut Geçişi" — DURUMU: BEKLİYOR (Supabase anahtarları gerekli)
- [ ] Supabase Auth entegrasyonu (email/password + OAuth)
- [ ] Tüm store'ların PostgreSQL'e bağlanması (localStorage → Supabase)
- [ ] Supabase Storage (podcast dosyaları, kullanıcı yüklemeleri)
- [ ] Supabase Realtime (düello, partner durumu, rakip radarı gerçek veri)
- [ ] Rakip Radarı → gerçek anonim kullanıcı verisiyle çalışma
- [ ] Topluluk soru havuzu → DB'de saklanır, admin onay sistemi
- [ ] Vercel deployment + custom domain

## 🛠️ TEKNİK YIĞIN (TECH STACK)

| Katman | Teknoloji |
|--------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Dil** | TypeScript 5.5 |
| **UI** | React 18 + Tailwind CSS 3.4 |
| **Animasyon** | Framer Motion 11 |
| **State** | Zustand 4.5 + persist middleware |
| **İkonlar** | Lucide React |
| **Efektler** | canvas-confetti |
| **CSS** | Glassmorphism dark mode (özel token'lar) |
| **Fontlar** | Inter (sans) + Outfit (display) |
| **Renkler** | Background #0B0F19, Indigo #6366F1, Emerald #10B981, Amber #F59E0B |
| **DB (Planlanan)** | Supabase PostgreSQL |
| **Auth (Planlanan)** | Supabase Auth |
| **Storage (Planlanan)** | Supabase Storage |
| **Hosting (Planlanan)** | Vercel |

---

## 🗂️ DİZİN YAPISI

```
src/
├── app/
│   ├── (dashboard)/          # Korumalı rotalar (layout ile sarılı)
│   │   ├── page.tsx          # Ana gösterge paneli (7 widget)
│   │   ├── layout.tsx        # Header + Sidebar + MobileNav wrapper
│   │   ├── ai-hub/           # Akıllı Çalışma Merkezi (6 sekme)
│   │   ├── ai-schedule/      # AI Haftalık Takvim
│   │   ├── curriculum/       # Müfredat Takibi (sınav bazlı)
│   │   ├── exams/            # Deneme & Net Hesaplama (sınav bazlı)
│   │   ├── flashcards/       # Kaydır-Öğren Kartları (sınav bazlı)
│   │   ├── friends/          # Arkadaşlık & Duo Pano
│   │   ├── mistakes/         # Yanlış Kutusu
│   │   ├── placement/        # 🆕 Atama Hedef Simülatörü (40 kadro)
│   │   ├── question-distribution/  # ÖSYM Soru Dağılımları
│   │   ├── settings/         # Profil & Ayarlar
│   │   ├── shared-qa/        # Canlı Soru Akışı
│   │   └── skill-tree/       # 🆕 RPG Yetenek Ağacı (5 seviye)
│   ├── login/                # Giriş ekranı
│   └── onboarding/           # Sınav seçim ekranı
├── components/
│   ├── navigation/           # Header (sınav pill bar), Sidebar
│   ├── dashboard/            # Countdown, Partner, Pomodoro, Todo, QuickNav,
│   │                         # 🆕 MemoryDecay, RivalRadar, SprintMode, DailyFact
│   ├── exam-sim/             # 🆕 ExamSimulator (fullscreen ÖSYM simülasyonu)
│   └── modals/               # QuickActionModal
├── lib/
│   ├── store/                # Zustand state (5 store, examType filtreli)
│   ├── data/                 # Müfredat, flashcard, dağılım, kadro, dailyFacts, skillTree
│   ├── utils/                # 🆕 memoryDecay, triyajEngine, rivalSimulator, performanceNormalizer
│   ├── services/             # Mock DB servisleri (Supabase'e dönüşecek)
│   ├── supabase/             # Supabase client kurulumu (placeholder)
│   └── utils.ts              # cn() ve formatTimeRemaining()
├── middleware.ts              # Route koruması (cookie bazlı)
└── globals.css               # Tailwind + Glassmorphism token'ları
```

---



---

## 🏃 KURULUM VE ÇALIŞTIRMA

```bash
# Bağımlılıkları yükle
npm install

# Üretim derlemesi yap
npm run build

# Sunucuyu başlat (localhost:3000)
npm start

# VEYA geliştirme modunda çalıştır
npm run dev
```

---

## 📐 MİMARİ KARARLAR

1. **AI = Akıllı Algoritma ($0 maliyet)**: LLM API kullanılmıyor. AI Koç, AI Takvim, Konu Tahmini, SRS hepsi istatistiksel/algoritmik hesaplama ile çalışıyor.
2. **OCR Sorumatik KALDIRILDI**: Kullanıcı kararı. Maliyet ve karmaşıklık nedeniyle.
3. **Sahte TTS Podcast KALDIRILDI**: Yerine gerçek dosya upload'lu Podcast Arşivi gelecek.
4. **Pasif Sınavlar**: YKS/TYT/AYT + diğerleri onboarding/header'da görünür ama kilitli. Sadece KPSS Lisans ve Önlisans aktif.
5. **Supabase > Firebase**: İlişkisel veri yapısı (kullanıcı→sınav→ders→konu→ilerleme) için PostgreSQL daha uygun.

---

## 📱 MOBİL STRATEJİ

```
Web       →  Next.js 14 + PWA (manifest.json + meta taglar mevcut)
             Tarayıcıda tam çalışır, ana ekrana eklenebilir

Mobil     →  React Native (Expo) ile ayrı native uygulama
             Aynı TypeScript / Zustand store mantığı transfer edilir
             App Store + Google Play dağıtımı
             Capacitor KULLANILMAYACAK — direkt native kod yazılacak
```

**Neden bu strateji?**
- TypeScript bilgisi ve Zustand store mantığı **doğrudan React Native'e taşınır**
- Glassmorphism tasarımı React Native'de `expo-blur` + `LinearGradient` ile yeniden yapılır
- Native performans ve native navigasyon (bottom tabs, stack navigator)
- Push notification, kamera, dosya sistemi gibi native API'lere tam erişim
- Tek dil (TypeScript) ile hem web hem mobil geliştirme

---

## 👑 25 Dünya Çapı Mühendislik & Liderlik Disiplini Rolü Tablosu

Bu dosya ve proje mimarisi, AI agentic pair-programming sistemi tarafından **dünyanın en yetenekli ve en üst düzey AI başmühendisi** unvanıyla 25 rol üstlenilerek yürütülmektedir:

1. **Chief Technology Officer (CTO) & Technical Lead**: Tüm vizyonun üst düzey teknik liderliği, mimari standartlar ve sıfır hata yönetim anlayışı.
2. **Product Manager**: Ulusal SaaS ürün vizyonu, roadmap, 6 dalga geliştirme planı ve pazar stratejileri.
3. **Product Owner**: User story kabul kriterleri, sprint & backlog yönetimi, Dalga önceliklendirme.
4. **Software Architect**: Next.js 14 App Router, Zustand state, sınav bazlı veri izolasyonu, SaaS multi-tenant mimarisi.
5. **Senior Frontend Engineer**: TypeScript, React 18, Next.js dynamic routing, component mimarisi.
6. **AI & Algorithm Engineer**: Algoritmik AI Koç, Konu Tahmini, Triyaj ROI motoru, SRS motoru tasarımı.
7. **Machine Learning Specialist**: Spaced Repetition (SRS/Leitner) algoritması, Ebbinghaus unutma eğrisi decay modeli, kullanıcı performans tahminleme.
8. **UI Designer**: Modern Dark Mode Glassmorphism, renk paletleri (Indigo `#6366F1`, Emerald `#10B981`, Amber `#F59E0B`).
9. **UX Researcher**: ÖSYM adaylarının ergonomi, hızlı kaydırma, düello ve sınav simülasyonu kullanıcı psikolojisi analizi.
10. **Interaction Designer**: Micro-interactions, konfeti patlamaları, sürükleme jestleri, yumuşak kilit UX'i.
11. **Motion Designer**: Framer Motion layout transition, smooth accordion, kart uçurma ve eriyen bar efektleri.
12. **JavaScript Engineer**: Pure ES6+, Zustand persist middleware, async state sync, Record<ExamType, Data> pattern.
13. **Tailwind CSS & Design System Expert**: Tailwind utility classes, glassmorphism utilities, custom keyframe animations, responsive grid, dark mode theming.
14. **Data Visualization Engineer**: Net grafikleri, ÖSYM 10 yıllık soru yoğunluğu tabloları, Ebbinghaus eriyen barlar, kadro progress bar.
15. **Growth & Gamification Strategist**: Oyunlaştırma mekanizmaları, Duo Streak, PvP Liderlik Tabloları, 1v1 Düello, XP/seviye sistemi, Yetenek Ağacı.
16. **Content & Pedagogical Expert**: Tüm ulusal sınavlar (KPSS, YDS, ALES, YKS) müfredat hassasiyeti, akılda kalıcı pedagojik bilgi hafıza çapaları.
17. **DevOps & Infrastructure Specialist**: Production build optimizasyonu, Vercel deployment, Supabase altyapı, PWA manifest, React Native CI/CD.
18. **Accessibility Expert**: WCAG 2.1 uyumlu kontrast oranları, klavye ve dokunmatik erişilebilirlik.
19. **QA Engineer**: Automated type-checking (`npm run build`), routing verification, zero-error policy, 16/16 sayfa doğrulama.
20. **Security Engineer**: Route middleware koruması, Supabase RLS, private friend data isolation, sınav bazlı veri izolasyonu.
21. **Behavioral Psychology & FOMO Strategist**: Unutma eğrisi kayıp korkusu, rekabet dürtüsü tasarımı, "haksız avantaj" hissi mühendisliği, Dalga 1-3 psikolojik motor tasarımı.
22. **Mobile (React Native) Architect**: Expo ile native uygulama mimarisi, Zustand store transferi, expo-blur/LinearGradient ile glassmorphism, native navigasyon tasarımı.
23. **Data Engineer & ETL Specialist**: Kadro veritabanı derleme (memurlar.net/kamuajans.com), ÖSYM açık veri toplama, sınav bazlı veri pipeline tasarımı, soru havuzu genişletme stratejisi.
24. **Competitive Intelligence Analyst**: Rakip Radarı algoritması, piyasa analizi, "dışarıda bulamayacakları özellik" stratejisi, kullanıcı kilit mekanizmaları.
25. **Simulation & Stress Test Engineer**: ÖSYM Acımasız Simülasyonu — Fullscreen API, çıkış engelleme, durdurulamaz timer, stres dayanıklılık skoru, PES ETTİ damgası mekaniği.

---

*Bu README, başka bir AI ajanı projeyi okuduğunda kaldığı yerden devam edebilmesi için tam bir "Handover Document" olarak tasarlanmıştır. Detaylı dosya analizi için `SYSTEM_ARCHITECTURE.md` dosyasına bakınız.*
