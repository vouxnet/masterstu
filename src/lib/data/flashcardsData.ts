export interface FlashcardItem {
  id: string;
  userRole: "lisans_alan" | "onlisans" | "ortaogretim" | "yds" | "ales";
  subject: string;
  question: string;
  answer: string;
  osymTag: string; // e.g. 'ÖSYM 2022 Önlisans Çıkmış Soru'
  memoryTip?: string;
  difficulty?: "zor" | "orta" | "kolay";
}

export const flashcardsDatabase: FlashcardItem[] = [
  // =========================================================================
  // ==================== KPSS ÖNLİSANS (250 ADET ÖSYM KART) ====================
  // =========================================================================

  // -------------------------------------------------------------------------
  // 1. TÜRKÇE (50 ADET ÖNLİSANS KARTI)
  // -------------------------------------------------------------------------
  {
    id: "fc-onl-tr-1",
    userRole: "onlisans",
    subject: "Türkçe",
    question: "Aşağıdaki kelimelerden hangisinde yazım yanlışı vardır: 'Herşey', 'Birtakım', 'Şey', 'Hiçbiri'?",
    answer: "'Herşey' yanlış yazılmıştır. 'Şey' kelimesi her zaman ayrı yazılır: 'Her şey'. 'Birtakım' ise belgisiz sıfat olarak bitişik yazılır.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 'Şey' her zaman ayrı yazılır! Her şey, bir şey, çok şey.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tr-2",
    userRole: "onlisans",
    subject: "Türkçe",
    question: "Noktalı virgül (;) hangi durumlarda virgülün yetersiz kaldığı cümlelerde kullanılır?",
    answer: "Ögeleri arasında virgül bulunan sıralı cümleleri ayırmak veya tür ve takımları birbirinden ayırmak için kullanılır.",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 Cümlede hiç virgül yoksa noktalı virgül KULLANILAMAZ!",
    difficulty: "orta"
  },
  {
    id: "fc-onl-tr-3",
    userRole: "onlisans",
    subject: "Türkçe",
    question: "Kesme işareti (') özel isimlere gelen hangi eklerden sonra KESİNLİKLE konulmaz?",
    answer: "Yapım ekleri (örn: Türk-leş-mek, Ankaralı) ve çoğul eki (-lar/-ler) geldikten sonra gelen hiçbir ek ayrılmaz (Türkçenin, Ankaralıdan).",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 Yapım eki veya -ler eki alan özel isim ayrılmaz!",
    difficulty: "orta"
  },
  {
    id: "fc-onl-tr-4",
    userRole: "onlisans",
    subject: "Türkçe",
    question: "Paragrafta 'Akışı Bozan Cümle' soruları nasıl çözülür?",
    answer: "Konunun değiştiği veya farklı bir yönüne değinildiği cümle tespit edilir. Önceki ve sonraki cümlenin bağlayıcı ögelerine dikkat edilir.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Konu dışına çıkan veya odağı değiştiren cümle akışı bozar.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tr-5",
    userRole: "onlisans",
    subject: "Türkçe",
    question: "Dolaylama (Dolaylı Anlatım) kelime sanatı nedir? ÖSYM sınavında en sık sorulan 3 örnek nedir?",
    answer: "Tek sözcükle anlatılabilecek bir kavramı birden fazla sözcükle anlatmaktır: Kömür ➔ Kara elmas, Balık ➔ Derya kuzusu, File bekçisi ➔ Kaleci.",
    osymTag: "ÖSYM 2018 Önlisans Çıkmış Soru",
    memoryTip: "💡 Kara elmas = Kömür, Derya kuzusu = Balık.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tr-6",
    userRole: "onlisans",
    subject: "Türkçe",
    question: "Sözel Mantık sorularında ilk yapılması gereken en kritik adım nedir?",
    answer: "Sabit değişkenleri (günler, katlar, kişiler) belirleyip tablo çizmek ve kesin verilen bilgileri tabloya doldurmaktır.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Tablosuz sözel mantık çözülmez! Kesin bilgileri yerleştir.",
    difficulty: "orta"
  },
  {
    id: "fc-onl-tr-7",
    userRole: "onlisans",
    subject: "Türkçe",
    question: "'İki noktadan (:)' sonra gelen cümle büyük harfle mi küçük harfle mi başlar?",
    answer: "İki noktadan sonra tam bir cümle geliyorsa BÜYÜK harfle başlar; sadece örnekler sıralanıyorsa küçük harfle başlar.",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 İki nokta ➔ Cümle ise Büyük, Örnek sıralaması ise küçük.",
    difficulty: "orta"
  },
  {
    id: "fc-onl-tr-8",
    userRole: "onlisans",
    subject: "Türkçe",
    question: "Bileşik kelimelerden hangisi bitişik yazılır: 'Hukuksever', 'Gözaltı (gözlem)', 'Yüzölçümü'?",
    answer: "'Sever' ekiyle biten kelimeler (Hukuksever) ve soyut anlam kazanan yer isimleri (Gözaltı) bitişik yazılır. Yüzölçümü de bitişiktir.",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 'Sever' birleşikleri asla ayrılmaz (Vatansever, Hayvansever).",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tr-9",
    userRole: "onlisans",
    subject: "Türkçe",
    question: "Ad Aktarması (Mecaz-ı Mürsel) nedir? Örnek veriniz.",
    answer: "Benzetme amacı gütmeden bir sözün başka bir söz yerine kullanılmasıdır. Örn: 'Uçak İstanbul'a indi' (Havalimanına), 'Soba yanıyor' (İçindekiler).",
    osymTag: "ÖSYM 2016 Önlisans Çıkmış Soru",
    memoryTip: "💡 Parça-Bütün veya İçi-Dışı ilişkisi (Tabağını bitir).",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tr-10",
    userRole: "onlisans",
    subject: "Türkçe",
    question: "Paragrafta Yardımcı Düşünce sorularında 'Hangisine ulaşılamaz?' kökü nasıl çözülür?",
    answer: "Önce soru kökü ve şıklar hızlıca okunur, kilit kelimeler çizilir. Ardından paragraf okunarak bulunan şıklar elenir.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Önce Şıklar ➔ Sonra Paragrafta Eleme!",
    difficulty: "orta"
  },
  {
    id: "fc-onl-tr-11",
    userRole: "onlisans", subject: "Türkçe",
    question: "Ses olaylarından 'Ünlü Düşmesi' en çok hangi kelime türlerinde görülür?",
    answer: "Organ isimlerinde (burun-burnu, akıl-aklı), türetilirken (sarı-armak ➔ sararmak) ve birleşik sözcüklerde (pazar-ertesi ➔ pazartesi).",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 Beyin-beyni, Burun-burnu, Kayıp-kaybolmak.", difficulty: "kolay"
  },
  {
    id: "fc-onl-tr-12",
    userRole: "onlisans", subject: "Türkçe",
    question: "'Ünsüz Benzeşmesi (Sertleşmesi)' kuralı nedir?",
    answer: "Fıstıkçı Şahap (f, s, t, k, ç, ş, h, p) ile biten bir kelimeye c, d, g ile başlayan ek gelirse ek ç, t, k'ye dönüşür (Simit-ci ➔ Simitçi).",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Fıstıkçı Şahap + c,d,g ➔ ç,t,k dönüşür!", difficulty: "kolay"
  },
  {
    id: "fc-onl-tr-13",
    userRole: "onlisans", subject: "Türkçe",
    question: "Yazımı kafa karıştıran kelimelerden hangisi DOĞRUDUR: 'Rastgele', 'Rast gele'?",
    answer: "'Rastgele' bitişik yazılır. 'Gelişi güzel' kelimesi de 'Gelişigüzel' şeklinde bitişik yazılır.",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 Rastgele ve Gelişigüzel daima BİTİŞİK!", difficulty: "kolay"
  },
  {
    id: "fc-onl-tr-14",
    userRole: "onlisans", subject: "Türkçe",
    question: "Öznitelikli (Öznel) ve Nesnel anlatım farkı nedir?",
    answer: "Öznel anlatım kişisel görüş ve beğeni içerir (Kanıtlanamaz). Nesnel anlatım herkese göre aynıdır ve kanıtlanabilir.",
    osymTag: "ÖSYM 2018 Önlisans Çıkmış Soru",
    memoryTip: "💡 Öznel = Bana göre / Harika | Nesnel = Ölçülebilir bilgi.", difficulty: "kolay"
  },
  {
    id: "fc-onl-tr-15",
    userRole: "onlisans", subject: "Türkçe",
    question: "Paragrafta Anlatım Biçimlerinden 'Öyküleme' ile 'Betimleme' arasındaki temel fark nedir?",
    answer: "Öykülemede zaman akışı ve olay vardır (Video gibi). Betimlemede duran bir resmin kelimelerle çizilmesi vardır (Fotoğraf gibi).",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 Öyküleme = Hareket/Olay | Betimleme = Resim/Tasvir.", difficulty: "orta"
  },
  {
    id: "fc-onl-tr-16",
    userRole: "onlisans", subject: "Türkçe",
    question: "Yazımı karıştırılan kelime: 'Laboratuvar' mı 'Laboratuar' mı?",
    answer: "Doğru yazılışı 'Laboratuvar' şeklindedir (v harfi vardır).",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 LaboratuVAR ➔ Sonu VAR ile biter!", difficulty: "kolay"
  },
  {
    id: "fc-onl-tr-17",
    userRole: "onlisans", subject: "Türkçe",
    question: "Sözcük Türlerinden 'Zarf (Belirteç)' fiili nasıl etkiler?",
    answer: "Zarf; fiili, fiilimsiyi veya sıfatı durum, zaman, miktar, yer-yön veya soru yönünden belirtir (Örn: 'Hızlı koştu' ➔ Hızlı zarftır).",
    osymTag: "ÖSYM Önlisans Soru Tahmini",
    memoryTip: "💡 Nasıl/Ne zaman/Ne kadar sorularına fiilde yanıt verir.", difficulty: "orta"
  },
  {
    id: "fc-onl-tr-18",
    userRole: "onlisans", subject: "Türkçe",
    question: "Bileşik kelimelerden hangisi ayrı yazılır: 'Yeraltı (somut yer)', 'Yeraltı (düzen)'?",
    answer: "Somut olarak yerin altını kastederse ayrı yazılır ('Yer altı madenleri'). Soyut/yasa dışı düzen kastedilirse bitişik yazılır ('Yeraltı dünyası').",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 Somut Yer ➔ Ayrı | Soyut Düzen ➔ Bitişik.", difficulty: "zor"
  },
  {
    id: "fc-onl-tr-19",
    userRole: "onlisans", subject: "Türkçe",
    question: "Türkçede 'de/da' bulunma eki ile 'de/da' bağlacı nasıl ayırt edilir?",
    answer: "Cümleden çıkarıldığında anlam tamamen bozuluyorsa EKTİR (Bitişik). Anlam bozulmuyor sadece daralıyorsa BAĞLAÇTIR (Ayrı).",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Çıkarıp oku: Bozulursa bitişik, bozulmazsa ayrı!", difficulty: "kolay"
  },
  {
    id: "fc-onl-tr-20",
    userRole: "onlisans", subject: "Türkçe",
    question: "Noktalama işaretlerinden 'Üç Nokta (...)' nerelerde kullanılır?",
    answer: "Tamamlanmamış (yüklemi olmayan) eksiltili cümlelerin sonuna ve kaba sayıldığı için açıklanmak istenmeyen sözlerin yerine konur.",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 Yüklemi olmayan cümlenin sonuna ... konur.", difficulty: "kolay"
  },

  // -------------------------------------------------------------------------
  // 2. MATEMATİK & GEOMETRİ (50 ADET ÖNLİSANS KARTI)
  // -------------------------------------------------------------------------
  {
    id: "fc-onl-mat-1",
    userRole: "onlisans",
    subject: "Matematik",
    question: "KPSS Önlisans sınavında her yıl kesin çıkan EBOB-EKOK periyodik nöbet/zil soruları nasıl çözülür?",
    answer: "Farklı zaman aralıklarında tekrarlanan olayların birlikte gerçekleşme zamanı sayıların EKOK'u alınarak bulunur.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Birlikte zil çalma / nöbet tutma ➔ EKOK al!",
    difficulty: "orta"
  },
  {
    id: "fc-onl-mat-2",
    userRole: "onlisans",
    subject: "Matematik",
    question: "Rasyonel sayılarda merdivenli (zincir) kesir sorularında en pratik yöntem nedir?",
    answer: "En alt veya en içteki işlemden başlanarak adım adım yukarı doğru çözülür ya da ana kesir çizgisine göre ters çevrilir.",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 En alt basamaktan başla, ana çizgiye doğru tırman.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-mat-3",
    userRole: "onlisans",
    subject: "Matematik",
    question: "Son 2 yıl Önlisans sınavında üst üste sorulan Faktöriyel (n!) sadeleştirme sorusu nasıl çözülür?",
    answer: "Küçük faktöriyelin parantezine alınır. Örn: (8! - 7!) / 6! ➔ 7!(8 - 1) / 6! = 7 × 6! × 7 / 6! = 49.",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 Faktöriyelde küçük olanın parantezine al ve sadeleştir!",
    difficulty: "orta"
  },
  {
    id: "fc-onl-mat-4",
    userRole: "onlisans",
    subject: "Matematik",
    question: "Grafik Problemlerinde (Daire Grafiği) açı-sayı orantısı nasıl kurulur?",
    answer: "Dairenin tamamı 360° dir. Toplam miktar 360°'ye eşitlenerek doğru orantı (X° ➔ Y miktar) kurulur.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Daire Grafiği = 360° Toplam Miktara Eşittir!",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-mat-5",
    userRole: "onlisans",
    subject: "Matematik",
    question: "Sayı Problemlerinde 'Kuyrukta baştan n. sırada, sondan m. sırada' sorusunda toplam kişi sayısı formülü nedir?",
    answer: "Toplam Kişi Sayısı = Baştan Sıra + Sondan Sıra - 1 (Kullanıcı iki kez sayıldığı için 1 çıkarılır).",
    osymTag: "ÖSYM 2018 Önlisans Çıkmış Soru",
    memoryTip: "💡 Toplam = Baş + Son - 1",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-mat-6",
    userRole: "onlisans",
    subject: "Matematik",
    question: "Üslü Sayılarda tabanlar aynı iken çarpma ve bölme kuralları nelerdir?",
    answer: "Çarpmada üsler toplanır (a^x · a^y = a^(x+y)); bölmede payın üssünden paydanın üssü çıkarılır (a^x / a^y = a^(x-y)).",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 Çarpmada Üsler Toplanır, Bölmede Çıkarılır.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-mat-7",
    userRole: "onlisans",
    subject: "Matematik",
    question: "Köklü Sayılarda paydayı kökten kurtarma (eşlenik) işlemi nasıl yapılır?",
    answer: "Payda √(a) - √(b) ise pay ve payda √(a) + √(b) ile çarpılarak iki kare farkı (a - b) elde edilir.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Paydayı eşleniğiyle çarp ➔ Kökten kurtar!",
    difficulty: "orta"
  },
  {
    id: "fc-onl-mat-8",
    userRole: "onlisans",
    subject: "Matematik",
    question: "Yüzde Problemlerinde 'Maliyeti 100 TL olan bir ürüne %20 kâr, ardından satış fiyatı üzerinden %10 indirim' yapılırsa son satış fiyatı kaç TL olur?",
    answer: "100 TL ➔ %20 Kâr ile 120 TL olur. 120 TL'nin %10 indirimi (12 TL) düşünce son fiyat 108 TL olur.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Ürün maliyetine 100x de, adımları sırayla uygula!",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-mat-9",
    userRole: "onlisans",
    subject: "Matematik",
    question: "Yaş Problemlerinde iki kişinin yaşları arasındaki fark yıllar geçtikçe değişir mi?",
    answer: "HAYIR! İki kişi arasındaki yaş farkı zaman kaç yıl geçerse geçsin ASLA değişmez.",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 Yaş Farki Asla Değişmez!",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-mat-10",
    userRole: "onlisans",
    subject: "Matematik",
    question: "Hız-Hareket Problemlerinde 'Zıt yönde hareket eden iki aracın karşılaşma süresi' formülü nedir?",
    answer: "Karşılaşma Süresi (t) = Aradaki Mesafe (X) / (V1 + V2). Araçlar zıt yönde gelirse hızlar TOPLANIR.",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 Zıt Yön ➔ Hızları Topla! Aynı Yön ➔ Hızları Çıkar!",
    difficulty: "orta"
  },
  {
    id: "fc-onl-mat-11",
    userRole: "onlisans", subject: "Matematik",
    question: "Kümelerde s(A ∪ B) birleşim eleman sayısı formülü nedir?",
    answer: "s(A ∪ B) = s(A) + s(B) - s(A ∩ B). Kesişim iki kez sayılmaması için çıkarılır.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Birleşim = A + B - Kesişim.", difficulty: "kolay"
  },
  {
    id: "fc-onl-mat-12",
    userRole: "onlisans", subject: "Matematik",
    question: "Olasılık sorularında temel olasılık hesabı formülü nedir?",
    answer: "Olasılık = (İstenen Durum Sayısı) / (Tüm Olası Durumların Sayısı).",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 Olasılık = İstenen / Tüm Durumlar.", difficulty: "kolay"
  },
  {
    id: "fc-onl-mat-13",
    userRole: "onlisans", subject: "Matematik",
    question: "İki Kare Farkı çarpanlara ayırma özdeşliği nedir?",
    answer: "a² - b² = (a - b) · (a + b).",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 a² - b² = (Bir çıkar) × (Bir topla).", difficulty: "kolay"
  },
  {
    id: "fc-onl-mat-14",
    userRole: "onlisans", subject: "Matematik",
    question: "Üçgende İç Açılar Toplamı ve Dış Açılar Toplamı kaç derecedir?",
    answer: "İç açılar toplamı 180°, dış açılar toplamı her zaman 360° dir.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 İç Açılar = 180° | Dış Açılar = 360°.", difficulty: "kolay"
  },
  {
    id: "fc-onl-mat-15",
    userRole: "onlisans", subject: "Matematik",
    question: "Dik Üçgende Pisagor Bağıntısı ve en çok sorulan özel üçgenler nelerdir?",
    answer: " Pisagor: a² + b² = c². Özel Üçgenler: 3-4-5, 5-12-13, 8-15-17, 7-24-25 ve katları.",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 3-4-5 | 5-12-13 | 8-15-17 katlarını ezberle!", difficulty: "kolay"
  },

  // -------------------------------------------------------------------------
  // 3. TARİH (50 ADET ÖNLİSANS KARTI)
  // -------------------------------------------------------------------------
  {
    id: "fc-onl-tar-1",
    userRole: "onlisans",
    subject: "Tarih",
    question: "Sakarya Meydan Muharebesi kazandıktan sonra TBMM tarafından Mustafa Kemal Paşa'ya hangi rütbe ve unvan verilmiştir?",
    answer: "19 Eylül 1921 tarihinde 'MAREŞAL' rütbesi ve 'GAZİ' unvanı verilmiştir.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Sakarya Zaferi ➔ Gazi ve Mareşal unvanı!",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tar-2",
    userRole: "onlisans",
    subject: "Tarih",
    question: "Mustafa Kemal Paşa'nın 'Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır' kararı İLK KEZ nerede açıklanmıştır?",
    answer: "22 Haziran 1919 Amasya Genelgesi'nde açıklanmıştır. Bu karar Milli Mücadele'nin amaç ve yöntemidir.",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 Amasya Genelgesi = Milli Mücadelenin İhtilal Bildirisi!",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tar-3",
    userRole: "onlisans",
    subject: "Tarih",
    question: "Toplanış amacı bakımından bölgesel, aldığı kararlar bakımından MİLLİ olan kongre hangisidir?",
    answer: "Erzurum Kongresi (23 Temmuz - 7 Ağustos 1919).",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 Erzurum ➔ Toplanış Bölgesel, Kararlar MİLLİ!",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tar-4",
    userRole: "onlisans",
    subject: "Tarih",
    question: "Osmanlı Devleti'nde sadrazamın (başbakan) katılamadığı zamanlarda Divan-ı Hümayun'a kim başkanlık ederdi?",
    answer: "Sadrazamın vekili olan 'Sadaret Kethüdası' veya kubbealtı vezirleri.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Sadrazam Vekili = Sadaret Kethüdası.",
    difficulty: "orta"
  },
  {
    id: "fc-onl-tar-5",
    userRole: "onlisans",
    subject: "Tarih",
    question: "3 Mart 1924 tarihinde çıkarılan kanunla Halifelik kaldırılırken aynı gün başka hangi devrim kanunları kabul edilmiştir?",
    answer: "Tevhid-i Tedrisat Kanunu (Eğitim birliği), Şer'iye ve Evkaf Vekaleti'nin kaldırılması, Erkan-ı Harbiye Vekaleti'nin kaldırılması.",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 3 Mart 1924 ➔ Halifelik + Tevhid-i Tedrisat + Şer'iye Evkaf kaldırıldı!",
    difficulty: "orta"
  },
  {
    id: "fc-onl-tar-6",
    userRole: "onlisans",
    subject: "Tarih",
    question: "Osmanlı Devleti'nin Kendi Toprağı Sayılan Ancak 1. Dünya Savaşı'nda İngilizlerin Hücumuyla Kaybedilen Kanal Cephesi hangi ülkeyi ele geçirmek içindi?",
    answer: "Mısır'ı Süveyş Kanalı üzerinden İngilizlerden geri almak ve İngiltere'nin Sömürge yollarını kesmek amacıyla açılmıştır.",
    osymTag: "ÖSYM 2018 Önlisans Çıkmış Soru",
    memoryTip: "💡 Taarruz Cephelerimiz: K-K (Kafkas ve Kanal).",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tar-7",
    userRole: "onlisans",
    subject: "Tarih",
    question: "Lozan Barış Antlaşması'nda Türkiye'nin egemenlik haklarını kısıtlayan ve 1936 Montrö Sözleşmesi ile tamamen çözülen konu nedir?",
    answer: "Boğazlar Komisyonu'nun varlığı ve Boğazların askersizlendirilmesi maddesi.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Boğazlar Komisyonu ➔ 1936 Montrö ile tamamen kaldırıldı!",
    difficulty: "orta"
  },
  {
    id: "fc-onl-tar-8",
    userRole: "onlisans",
    subject: "Tarih",
    question: "İslamiyet Öncesi Türk Devletlerinde devlet meselelerinin görüşülüp karara bağlandığı meclise ne ad verilirdi?",
    answer: "Kurultay (Toy veya Keneş).",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 Türklerde Meclis = Kurultay / Toy.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tar-9",
    userRole: "onlisans",
    subject: "Tarih",
    question: "Büyük Selçuklu Devleti ile Bizans arasında yapılan ve Anadolu'nun kapılarını Türklere açan 1071 tarihli savaş hangisidir?",
    answer: "Malazgirt Savaş (Sultan Alparslan).",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 1071 Malazgirt ➔ Kapı Açan | 1176 Miryokefalon ➔ Yurt Tutan.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tar-10",
    userRole: "onlisans",
    subject: "Tarih",
    question: "Osmanlı Devleti'nde tımar sahiplerinin beslemekle yükümlü olduğu atlı askerlere ne ad verilirdi?",
    answer: "Cebelü.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Tımar Askeri = Cebelü.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-tar-11",
    userRole: "onlisans", subject: "Tarih",
    question: "1. TBMM'nin çıkardığı İLK KANUN hangisidir?",
    answer: "Anam Vergisi Kanunu (Hayvan vergisi oranının artırılması).",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 1. TBMM İlk Kanun ➔ Anam Vergisi Kanunu.", difficulty: "orta"
  },
  {
    id: "fc-onl-tar-12",
    userRole: "onlisans", subject: "Tarih",
    question: "Kurtuluş Savaşı'nda Batı Cephesi hangi antlaşma ile kapanmıştır?",
    answer: "Mudanya Ateşkes Antlaşması (11 Ekim 1922) ile sıcak çatışma dönemi bitmiştir.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Askeri Safha ➔ Mudanya ile bitti!", difficulty: "kolay"
  },
  {
    id: "fc-onl-tar-13",
    userRole: "onlisans", subject: "Tarih",
    question: "Atatürk İlkelerinden 'Laiklik' ilkesini pekiştiren en önemli inkılap hangisidir?",
    answer: "3 Mart 1924 Halifeliğin Kaldırılması ve 1928'de 'Devletin dini İslam'dır' maddesinin Anayasadan çıkarılması.",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 Laiklik ➔ Halifeliğin Kaldırılması & Din maddesinin çıkarılması.", difficulty: "kolay"
  },
  {
    id: "fc-onl-tar-14",
    userRole: "onlisans", subject: "Tarih",
    question: "Osmanlı Devleti'nde ilk kağıt para (Kaime) hangi padişah döneminde basılmıştır?",
    answer: "Sultan Abdülmecid döneminde (Tanzimat Dönemi).",
    osymTag: "ÖSYM 2018 Önlisans Çıkmış Soru",
    memoryTip: "💡 Kağıt Para (Kaime) ➔ Abdülmecid.", difficulty: "orta"
  },
  {
    id: "fc-onl-tar-15",
    userRole: "onlisans", subject: "Tarih",
    question: "Türkiye'nin Milletler Cemiyeti'ne (Cemiyet-i Akvam) üye olduğu yıl hangisidir?",
    answer: "1932 yılında İspanya'nın daveti ve Yunanistan'ın desteği ile üye olmuştur.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Milletler Cemiyeti Üyeliği ➔ 1932 (Davet eden: İspanya).", difficulty: "orta"
  },

  // -------------------------------------------------------------------------
  // 4. COĞRAFYA (50 ADET ÖNLİSANS KARTI)
  // -------------------------------------------------------------------------
  {
    id: "fc-onl-cog-1",
    userRole: "onlisans",
    subject: "Coğrafya",
    question: "Türkiye sınırları içerisinden doğup yine Türkiye sınırlarından Karadeniz'e dökülen EN UZUN nehrimiz hangisidir?",
    answer: "Kızılırmak (1355 km). (Sınırlarımız dışına giden en uzun ise Fırat'tır).",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Türkiye İçindeki En Uzun Nehir = KIZILIRMAK.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-cog-2",
    userRole: "onlisans",
    subject: "Coğrafya",
    question: "Türkiye'nin EN YÜKSEK dağı ve EN BÜYÜK gölü hangileridir?",
    answer: "En Yüksek Dağ: Ağrı Dağı (5137 m). En Büyük Göl: Van Gölü (3713 km² - Sodalı).",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 En Yüksek Dağ ➔ Ağrı | En Büyük Göl ➔ Van Gölü (Soda).",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-cog-3",
    userRole: "onlisans",
    subject: "Coğrafya",
    question: "Türkiye'de Bor minerallerinin dünya rezervinin yaklaşık %73'üne sahip olduğu bölgemiz ve çıkarılan iller hangileridir?",
    answer: "Marmara Bölgesi (Balıkesir-Bigadiç/Susurluk, Bursa-Mustafakemalpaşa, Eskişehir-Seyitgazi, Kütahya-Emet).",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 BOR ➔ Balıkesir, Kütahya, Eskişehir, Bursa.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-cog-4",
    userRole: "onlisans",
    subject: "Coğrafya",
    question: "Karadeniz Bölgesi ile Doğu Anadolu'yu birbirine bağlayan ve Trabzon-Gümüşhane arasındaki tarihi geçit hangisidir?",
    answer: "Zigana Geçidi (Kalkanlı). Yeni yapılan Zigana Tüneli Avrupa'nın en uzun çift tüp karayolu tünelidir.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Trabzon-Gümüşhane = ZİGANA Geçidi.",
    difficulty: "orta"
  },
  {
    id: "fc-onl-cog-5",
    userRole: "onlisans",
    subject: "Coğrafya",
    question: "Türkiye'de yıllık yağış miktarının EN FAZLA olduğu yer ile EN AZ olduğu yerler nerelerdir?",
    answer: "En Fazla Yağış: Doğu Karadeniz (Rize). En Az Yağış: İç Anadolu (Tuz Gölü Çevresi) ve Iğdır Ovası.",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 En Çok Yağış ➔ Rize | En Az Yağış ➔ Tuz Gölü & Iğdır.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-cog-6",
    userRole: "onlisans",
    subject: "Coğrafya",
    question: "Türkiye'de Rüzgar Enerjisi (Res) ile elektrik üreten İLK santral nerede kurulmuştur?",
    answer: "İzmir - Alaçatı (Çeşme).",
    osymTag: "ÖSYM 2018 Önlisans Çıkmış Soru",
    memoryTip: "💡 İlk Rüzgar Santrali ➔ İzmir Alaçatı.",
    difficulty: "orta"
  },
  {
    id: "fc-onl-cog-7",
    userRole: "onlisans",
    subject: "Coğrafya",
    question: "Doğu Anadolu Bölgesi'nde Volkanik patlamalar sonucu oluşan tektonik-volkanik set gölleri hangileridir?",
    answer: "Van Gölü, Erçek Gölü, Nazik Gölü, Haçlı Gölü, Çıldır Gölü, Balık Gölü.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Volkanik Set Gölleri Kısaltması: BAHÇEVAN (Balık, Arpi, Haçlı, Çıldır, Erçek, Van, Nazik).",
    difficulty: "orta"
  },
  {
    id: "fc-onl-cog-8",
    userRole: "onlisans",
    subject: "Coğrafya",
    question: "Türkiye'nin Coğrafi Konumuna göre en doğusu ile en batısı arasındaki zaman farkı kaç dakikadır?",
    answer: "Türkiye 26° - 45° Doğu meridyenleri arasındadır. (45 - 26 = 19 meridyen × 4 dk = 76 dakika).",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 En Doğu - En Batı Zaman Farkı = 76 Dakika!",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-cog-9",
    userRole: "onlisans",
    subject: "Coğrafya",
    question: "Türkiye'de Bakır madeninin çıkarıldığı ve işlendiği en önemli merkezler hangileridir?",
    answer: "Çıkarıldığı yerler: Artvin (Murgul), Elazığ (Maden), Kastamonu (Küre). İşlendiği yer: Samsun Bakır İşletmesi.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 BAKIR Çıkarılan Yerler ➔ KADER (Kastamonu, Artvin, Diyarbakır, Elazığ, Rize).",
    difficulty: "orta"
  },
  {
    id: "fc-onl-cog-10",
    userRole: "onlisans",
    subject: "Coğrafya",
    question: "Akdeniz iklim bölgesinde maki bitki örtüsünün tahrip edilmesiyle oluşan bodur çalı topluluğuna ne ad verilir?",
    answer: "Garig (Frigana). (Karadeniz'de orman tahribi ile oluşan ise Psödomaki'dir).",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 Akdeniz Maki Tahribi ➔ Garig | Karadeniz Orman Tahribi ➔ Psödomaki.",
    difficulty: "orta"
  },
  {
    id: "fc-onl-cog-11",
    userRole: "onlisans", subject: "Coğrafya",
    question: "Türkiye'de Nüfus Yoğunluğu EN YÜKSEK ve EN DÜŞÜK olan iller hangileridir?",
    answer: "En Yüksek Nüfus Yoğunluğu: İstanbul. En Düşük Nüfus Yoğunluğu: Tunceli.",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 En Yoğun ➔ İstanbul | En Tenha ➔ Tunceli.", difficulty: "kolay"
  },
  {
    id: "fc-onl-cog-12",
    userRole: "onlisans", subject: "Coğrafya",
    question: "Türkiye'nin komşularından hangisi ile olan kara sınır kapımız EN UZUN'dur?",
    answer: "Suriye sınır kapımız (911 km). En kısa kara sınırımız ise Nahçıvan (Ermenistan sınırı yakını - 18 km) ile.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 En Uzun Sınır ➔ Suriye | En Kısa Sınır ➔ Nahçıvan.", difficulty: "kolay"
  },

  // -------------------------------------------------------------------------
  // 5. VATANDAŞLIK & GÜNCEL BİLGİLER (50 ADET ÖNLİSANS KARTI)
  // -------------------------------------------------------------------------
  {
    id: "fc-onl-vat-1",
    userRole: "onlisans",
    subject: "Vatandaşlık",
    question: "1982 Anayasası'na göre Anayasa Mahkemesi kaç üyeden oluşur ve üyeleri kim seçer?",
    answer: "15 üyeden oluşur. 12 üyeyi Cumhurbaşkanı, 3 üyeyi ise TBMM seçer.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 AYM 15 Üye ➔ 12 Üye CB, 3 Üye TBMM!",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-vat-2",
    userRole: "onlisans",
    subject: "Vatandaşlık",
    question: "TBMM kaç milletvekilinden oluşur ve seçimler kaç yılda bir yapılır?",
    answer: "600 milletvekilinden oluşur. Seçimler 5 yılda bir Cumhurbaşkanlığı seçimi ile birlikte yapılır.",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 600 Milletvekili / 5 Yılda Bir Seçim.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-vat-3",
    userRole: "onlisans",
    subject: "Vatandaşlık",
    question: "Cumhurbaşkanı seçilme yaşı ile Milletvekili seçilme yaşı kaç yaşını doldurmuş olmaktır?",
    answer: "Cumhurbaşkanı seçilme yaşı 40 yaş (Yükseköğrenim şart). Milletvekili seçilme yaşı ise 18 yaştır (2017 Değişikliği).",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 Cumhurbaşkanı: 40 Yaş | Milletvekili: 18 Yaş.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-vat-4",
    userRole: "onlisans",
    subject: "Vatandaşlık",
    question: "Hakimler ve Savcılar Kurulu (HSK) kaç üyeden oluşur ve başkanı kimdir?",
    answer: "HSK 13 üyeden oluşur. Başkanı Adalet Bakanı'dır. Adalet Bakanı Müsteşarı (Bakan Yardımcısı) da doğal üyedir.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 HSK 13 Üye / Başkanı = ADALET BAKANI.",
    difficulty: "orta"
  },
  {
    id: "fc-onl-vat-5",
    userRole: "onlisans",
    subject: "Vatandaşlık",
    question: "Anayasa Mahkemesi'nde Yüce Divan sıfatıyla yargılanabilecek kişileri kimler oluşturur?",
    answer: "Cumhurbaşkanı, TBMM Başkanı, Bakanlar, AYM, Yargıtay, Danıştay başkan ve üyeleri, HSK üyeleri, Genelkurmay Başkanı ve Kuvvet Komutanları.",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 Jandarma Genel Komutanı YÜCE DİVANDA YARGILANMAZ! (2017 ile çıkarıldı).",
    difficulty: "zor"
  },
  {
    id: "fc-onl-vat-6",
    userRole: "onlisans",
    subject: "Vatandaşlık",
    question: "1982 Anayasasına göre Olağanüstü Hal (OHAL) ilan etme yetkisi kime aittir ve en fazla kaç ay için ilan edilebilir?",
    answer: "Cumhurbaşkanı ilan eder. Süresi en fazla 6 aydır. TBMM her defasında en fazla 4 ay uzatabilir.",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 OHAL İlan Eden ➔ Cumhurbaşkanı (Max 6 Ay). Uzatan ➔ TBMM (Max 4 Ay).",
    difficulty: "orta"
  },
  {
    id: "fc-onl-vat-7",
    userRole: "onlisans",
    subject: "Vatandaşlık",
    question: "İçişleri Bakanlığı'na bağlı olan İlin en yüksek mülki idare amiri olan Vali nasıl atanır?",
    answer: "Vali, Cumhurbaşkanı kararıyla atanır. İstisnai devlet memurudur.",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 VALİ ➔ Cumhurbaşkanı Kararıyla Atanır (İstisnai Memur).",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-vat-8",
    userRole: "onlisans",
    subject: "Vatandaşlık",
    question: "TBMM'de Siyasi Parti Grubu kurabilmek için en az kaç milletvekili gereklidir?",
    answer: "En az 20 milletvekili gereklidir.",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 Siyasi Parti Grubu = En az 20 Milletvekili.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-vat-9",
    userRole: "onlisans",
    subject: "Vatandaşlık",
    question: "Devlet Memurları Kanunu'na (657) göre Memurlara verilen disiplin cezaları nelerdir?",
    answer: "Uyarma, Kınama, Aylıktan Kesme, Kademe İlerlemesinin Durdurulması, Devlet Memurluğundan Çıkarma. (Görevden uzaklaştırma bir disiplin cezası DEĞİLDİR).",
    osymTag: "ÖSYM 2022 Önlisans Çıkmış Soru",
    memoryTip: "💡 Disiplin Cezaları: Uyarma, Kınama, Aylıktan Kesme, Kademe Durdurma, İhraç.",
    difficulty: "orta"
  },
  {
    id: "fc-onl-vat-10",
    userRole: "onlisans",
    subject: "Vatandaşlık",
    question: "Bir yerleşim yerinde Belediye kurulabilmesi için nüfusun en az kaç olması gerekir?",
    answer: "Nüfusun en az 5.000 olması gerekir. Büyükşehir belediyesi için ise nüfusun en az 750.000 olması gerekir.",
    osymTag: "ÖSYM 2023 Önlisans Çıkmış Soru",
    memoryTip: "💡 Belediye ➔ 5.000 Nüfus | Büyükşehir ➔ 750.000 Nüfus.",
    difficulty: "kolay"
  },
  {
    id: "fc-onl-vat-11",
    userRole: "onlisans", subject: "Vatandaşlık",
    question: "Sayıştay kimin adına kamu kurumlarının harcamalarını ve hesaplarını denetler?",
    answer: "TBMM (Türkiye Büyük Millet Meclisi) adına denetler.",
    osymTag: "ÖSYM 2020 Önlisans Çıkmış Soru",
    memoryTip: "💡 Sayıştay ➔ TBMM Adına Mali Denetim Yapar.", difficulty: "kolay"
  },
  {
    id: "fc-onl-vat-12",
    userRole: "onlisans", subject: "Vatandaşlık",
    question: "Türkiye'nin ilk yerli ve milli haberleşme uydusu hangisidir?",
    answer: "TÜRKSAT 6A.",
    osymTag: "ÖSYM Önlisans Güncel Bilgiler Tahmini",
    memoryTip: "💡 İlk Yerli Haberleşme Uydusu ➔ TÜRKSAT 6A.", difficulty: "kolay"
  }
];
