export interface DuelQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty?: "easy" | "medium" | "hard";
  examType?: "kpss_lisans" | "kpss_onlisans" | "both";
  explanation?: string;
}

export const duelQuestionsPool: DuelQuestion[] = [
  // Anayasa Hukuku
  {
    id: "ah_1",
    subject: "Anayasa Hukuku",
    question: "1982 Anayasası'na göre Anayasa Mahkemesi kaç üyeden oluşur?",
    options: ["11", "15", "17", "21"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Anayasa Md. 146: Anayasa Mahkemesi 15 üyeden oluşur. 12'sini CB, 3'ünü TBMM seçer."
  },
  {
    id: "ah_2",
    subject: "Anayasa Hukuku",
    question: "1982 Anayasası'na göre TBMM kaç milletvekilinden oluşur?",
    options: ["450", "550", "600", "650"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "Anayasa Md. 75: TBMM genel oyla seçilen 600 milletvekilinden oluşur."
  },
  {
    id: "ah_3",
    subject: "Anayasa Hukuku",
    question: "Cumhurbaşkanı seçilebilmek için kaç yaşını doldurmuş olmak gerekir?",
    options: ["30", "35", "40", "45"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "Anayasa Md. 101: Cumhurbaşkanı seçilebilmek için 40 yaşını doldurmuş olmak gerekir."
  },
  {
    id: "ah_4",
    subject: "Anayasa Hukuku",
    question: "Milletvekili seçilebilmek için gerekli olan yaş şartı 2017 anayasa değişikliği ile kaça indirilmiştir?",
    options: ["18", "21", "25", "30"],
    correctIndex: 0,
    difficulty: "easy",
    examType: "both",
    explanation: "2017 anayasa değişikliği ile milletvekili seçilme yaşı 25'ten 18'e indirilmiştir."
  },
  {
    id: "ah_5",
    subject: "Anayasa Hukuku",
    question: "Cumhurbaşkanı tarafından ilan edilen olağanüstü hal (OHAL) süresi en fazla kaç ay olabilir?",
    options: ["3", "6", "9", "12"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Anayasa Md. 119: Cumhurbaşkanı olağanüstü hal (OHAL) süresini en fazla 6 ay olarak belirleyebilir."
  },
  {
    id: "ah_6",
    subject: "Anayasa Hukuku",
    question: "Anayasa değişikliği teklif edilebilmesi için TBMM üye tamsayısının en az ne kadarı gerekir?",
    options: ["1/3 (200 milletvekili)", "1/4 (150 milletvekili)", "2/3 (400 milletvekili)", "3/5 (360 milletvekili)"],
    correctIndex: 0,
    difficulty: "hard",
    examType: "both",
    explanation: "Anayasa Md. 175: Anayasa değişikliği teklifi için TBMM üye tamsayısının en az üçte biri (200 mv) gerekir."
  },
  {
    id: "ah_7",
    subject: "Anayasa Hukuku",
    question: "TBMM'de siyasi parti grubu kurabilmek için en az kaç milletvekili gereklidir?",
    options: ["10", "15", "20", "25"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "Anayasa Md. 95: TBMM'de siyasi parti grubu kurabilmek için en az 20 milletvekili gereklidir."
  },
  {
    id: "ah_8",
    subject: "Anayasa Hukuku",
    question: "Sayıştay kime karşı sorumludur?",
    options: ["Cumhurbaşkanı", "Maliye Bakanlığı", "TBMM", "Yargıtay"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "Anayasa Md. 160: Sayıştay, merkezî yönetim bütçesi kapsamındaki idareleri TBMM adına denetler."
  },
  {
    id: "ah_9",
    subject: "Anayasa Hukuku",
    question: "Temel hak ve hürriyetler, özlerine dokunulmaksızın yalnızca Anayasanın ilgili maddelerinde belirtilen sebeplere bağlı olarak ve ancak ne ile sınırlanabilir?",
    options: ["Cumhurbaşkanlığı Kararnamesi", "Kanun", "Yönetmelik", "Tüzük"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Anayasa Md. 13: Temel hak ve hürriyetler, özlerine dokunulmaksızın ancak kanunla sınırlanabilir."
  },
  {
    id: "ah_10",
    subject: "Anayasa Hukuku",
    question: "Yüce Divan sıfatıyla yargılama yetkisi hangi mahkemeye aittir?",
    options: ["Yargıtay", "Danıştay", "Uyuşmazlık Mahkemesi", "Anayasa Mahkemesi"],
    correctIndex: 3,
    difficulty: "medium",
    examType: "both",
    explanation: "Anayasa Md. 148: Yüce Divan sıfatıyla yargılama yetkisi Anayasa Mahkemesine aittir."
  },
  {
    id: "ah_11",
    subject: "Anayasa Hukuku",
    question: "Hakimler ve Savcılar Kurulu (HSK) kaç üyeden oluşur?",
    options: ["11", "13", "15", "22"],
    correctIndex: 1,
    difficulty: "hard",
    examType: "both",
    explanation: "Anayasa Md. 159: Hakimler ve Savcılar Kurulu (HSK) 13 üyeden oluşur."
  },
  {
    id: "ah_12",
    subject: "Anayasa Hukuku",
    question: "TBMM başkanlık divanı üyeleri içinde hangisi yer almaz?",
    options: ["TBMM Başkanı", "Katipler", "İdare Amirleri", "Siyasi Parti Grup Başkanvekilleri"],
    correctIndex: 3,
    difficulty: "hard",
    examType: "both",
    explanation: "Anayasa Md. 94: Siyasi parti grup başkanvekilleri TBMM başkanlık divanında yer almaz."
  },
  {
    id: "ah_13",
    subject: "Anayasa Hukuku",
    question: "1982 Anayasasına göre, suçluluğu hükmen sabit oluncaya kadar, kimse suçlu sayılamaz. Bu ilkeye ne ad verilir?",
    options: ["Masumiyet Karinesi", "Kanunilik İlkesi", "Şahsilik İlkesi", "Eşitlik İlkesi"],
    correctIndex: 0,
    difficulty: "medium",
    examType: "both",
    explanation: "Anayasa Md. 38: Suçluluğu hükmen sabit oluncaya kadar kimsenin suçlu sayılamamasına masumiyet karinesi denir."
  },
  {
    id: "ah_14",
    subject: "Anayasa Hukuku",
    question: "Yasama dokunulmazlığının kaldırılmasına karşı TBMM kararına itiraz nereye yapılır?",
    options: ["Yargıtay", "Danıştay", "Anayasa Mahkemesi", "İdare Mahkemesi"],
    correctIndex: 2,
    difficulty: "hard",
    examType: "both",
    explanation: "Anayasa Md. 85: Yasama dokunulmazlığının kaldırılmasına karşı 7 gün içinde Anayasa Mahkemesine itiraz edilebilir."
  },
  {
    id: "ah_15",
    subject: "Anayasa Hukuku",
    question: "Milletvekilinin istifa etmesi durumunda milletvekilliğinin düşmesine kim karar verir?",
    options: ["TBMM Genel Kurulu", "TBMM Başkanı", "Anayasa Mahkemesi", "Cumhurbaşkanı"],
    correctIndex: 0,
    difficulty: "medium",
    examType: "both",
    explanation: "Anayasa Md. 84: İstifa eden milletvekilinin üyeliğinin düşmesine TBMM Genel Kurulu karar verir."
  },

  // İdare Hukuku
  {
    id: "ih_1",
    subject: "İdare Hukuku",
    question: "İdarenin işlem ve eylemlerine karşı açılan davalara bakan genel görevli yargı yeri neresidir?",
    options: ["Yargıtay", "Asliye Hukuk Mahkemesi", "İdare Mahkemesi", "Anayasa Mahkemesi"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "İdare mahkemeleri, idari yargıda genel görevli ve ilk derece yargı yeridir."
  },
  {
    id: "ih_2",
    subject: "İdare Hukuku",
    question: "İdarenin, hiçbir kusuru olmasa dahi meydana gelen zarardan sorumlu tutulabilmesine ne ad verilir?",
    options: ["Hizmet kusuru", "Kusursuz sorumluluk", "Kusur sorumluluğu", "Şahsi sorumluluk"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "İdarenin kusuru olmasa da faaliyetlerinin risk taşıması sebebiyle zararı tazmin etmesine kusursuz sorumluluk denir."
  },
  {
    id: "ih_3",
    subject: "İdare Hukuku",
    question: "Danıştay Kanunu'nun kabul edildiği tarih ve numarası hangisidir?",
    options: ["2577", "2575", "2576", "2949"],
    correctIndex: 1,
    difficulty: "hard",
    examType: "both",
    explanation: "Danıştay'ın kuruluş, görev ve işleyişi 2575 sayılı Danıştay Kanunu ile düzenlenmiştir."
  },
  {
    id: "ih_4",
    subject: "İdare Hukuku",
    question: "İl Özel İdaresinin başı kimdir?",
    options: ["Belediye Başkanı", "Kaymakam", "Vali", "İçişleri Bakanı"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "İl Özel İdaresi Kanunu'na göre, il özel idaresinin başı ve yürütme organı validir."
  },
  {
    id: "ih_5",
    subject: "İdare Hukuku",
    question: "Aynı tüzel kişilik içindeki üst makamın ast makam üzerinde sahip olduğu denetim yetkisine ne ad verilir?",
    options: ["İdari Vesayet", "Hiyerarşi", "Yargısal Denetim", "Yasama Denetimi"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Hiyerarşi, aynı tüzel kişilik içindeki üst makamın ast makam üzerindeki emir ve denetim yetkisidir."
  },
  {
    id: "ih_6",
    subject: "İdare Hukuku",
    question: "Büyükşehir Belediye Başkanını kim seçer?",
    options: ["Cumhurbaşkanı", "İçişleri Bakanı", "Halk", "Vali"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "Büyükşehir Belediye Başkanı, doğrudan o büyükşehir sınırları içindeki halk tarafından seçilir."
  },
  {
    id: "ih_7",
    subject: "İdare Hukuku",
    question: "Memurların haftalık çalışma süresi genel olarak kaç saattir?",
    options: ["35", "40", "45", "50"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "657 sayılı Kanuna göre devlet memurlarının haftalık çalışma süresi genel olarak 40 saattir."
  },
  {
    id: "ih_8",
    subject: "İdare Hukuku",
    question: "Devlet memurlarına verilen uyarma ve kınama cezalarına karşı yargı yolu nasıldır?",
    options: ["Kapalıdır", "Sadece Danıştaya gidilebilir", "Açıktır (2010 sonrası)", "Anayasa Mahkemesine gidilir"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "2010 yılında yapılan anayasa değişikliği ile uyarma ve kınama cezalarına karşı yargı yolu açılmıştır."
  },
  {
    id: "ih_9",
    subject: "İdare Hukuku",
    question: "Kaymakam istisnai memuriyet midir?",
    options: ["Evet", "Hayır, güvenceli memuriyettir", "Sözleşmeli personeldir", "İşçidir"],
    correctIndex: 1,
    difficulty: "hard",
    examType: "both",
    explanation: "Kaymakamlık, güvenceli bir memuriyet olup istisnai memuriyet kadroları arasında yer almaz."
  },
  {
    id: "ih_10",
    subject: "İdare Hukuku",
    question: "Merkezi idarenin yerel yönetimler üzerindeki denetim yetkisine ne ad verilir?",
    options: ["Hiyerarşi", "İdari Vesayet", "Yerinden Yönetim", "Yetki Genişliği"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "İdari vesayet, merkezi yönetimin yerinden yönetim kuruluşları (yerel yönetimler vb.) üzerindeki denetim yetkisidir."
  },

  // Tarih
  {
    id: "tar_1",
    subject: "Tarih",
    question: "Sakarya Meydan Muharebesi hangi yıl gerçekleşmiştir?",
    options: ["1920", "1921", "1922", "1923"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "Sakarya Meydan Muharebesi, Türk ordusunun zaferiyle 1921 yılında gerçekleşmiştir."
  },
  {
    id: "tar_2",
    subject: "Tarih",
    question: "Lozan Barış Antlaşması hangi tarihte imzalanmıştır?",
    options: ["24 Temmuz 1923", "29 Ekim 1923", "23 Nisan 1920", "30 Ağustos 1922"],
    correctIndex: 0,
    difficulty: "easy",
    examType: "both",
    explanation: "Lozan Barış Antlaşması, 24 Temmuz 1923'te imzalanarak modern Türkiye'nin sınırlarını belirlemiştir."
  },
  {
    id: "tar_3",
    subject: "Tarih",
    question: "Cumhuriyetin ilanı hangi tarihte gerçekleşmiştir?",
    options: ["23 Nisan 1920", "29 Ekim 1923", "3 Mart 1924", "1 Kasım 1922"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "Cumhuriyet, TBMM tarafından 29 Ekim 1923'te resmen ilan edilmiştir."
  },
  {
    id: "tar_4",
    subject: "Tarih",
    question: "Soyadı Kanunu hangi yıl kabul edilmiştir?",
    options: ["1928", "1930", "1934", "1937"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "Soyadı Kanunu, 1934 yılında kabul edilerek her Türk vatandaşına bir soyadı taşıma zorunluluğu getirdi."
  },
  {
    id: "tar_5",
    subject: "Tarih",
    question: "Mustafa Kemal'e 'Gazi' unvanı ve 'Mareşal' rütbesi hangi savaştan sonra verilmiştir?",
    options: ["Birinci İnönü", "İkinci İnönü", "Sakarya Meydan Muharebesi", "Büyük Taarruz"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "Mustafa Kemal'e Mareşal rütbesi ve Gazi unvanı, 1921 Sakarya Meydan Muharebesi sonrasında verilmiştir."
  },
  {
    id: "tar_6",
    subject: "Tarih",
    question: "1877-1878 Osmanlı-Rus Savaşı'nın tarihteki yaygın adı nedir?",
    options: ["93 Harbi", "Kırım Savaşı", "Plevne Savunması", "Balkan Savaşı"],
    correctIndex: 0,
    difficulty: "medium",
    examType: "both",
    explanation: "1877-1878 Osmanlı-Rus Savaşı, Rumi takvimde 1293 yılına denk geldiği için 93 Harbi olarak anılır."
  },
  {
    id: "tar_7",
    subject: "Tarih",
    question: "TBMM'nin açılış tarihi hangisidir?",
    options: ["19 Mayıs 1919", "23 Nisan 1920", "29 Ekim 1923", "1 Kasım 1922"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "Türkiye Büyük Millet Meclisi (TBMM), 23 Nisan 1920'de Ankara'da açılmıştır."
  },
  {
    id: "tar_8",
    subject: "Tarih",
    question: "Halifelik hangi yıl kaldırılmıştır?",
    options: ["1922", "1923", "1924", "1926"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "Halifelik, 3 Mart 1924'te çıkarılan kanunla TBMM tarafından kaldırılmıştır."
  },
  {
    id: "tar_9",
    subject: "Tarih",
    question: "Türkiye'de çok partili hayata kesintisiz geçiş hangi yıl olmuştur?",
    options: ["1924", "1930", "1946", "1950"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "Türkiye'de çok partili hayata kesintisiz geçiş, 1946 yılında Demokrat Parti'nin kurulmasıyla olmuştur."
  },
  {
    id: "tar_10",
    subject: "Tarih",
    question: "Malazgirt Meydan Muharebesi hangi yıl yapılmıştır?",
    options: ["1040", "1048", "1071", "1096"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "Malazgirt Meydan Muharebesi, 1071 yılında yapılarak Anadolu'nun kapılarını Türklere açmıştır."
  },
  {
    id: "tar_11",
    subject: "Tarih",
    question: "İstanbul hangi yıl fethedilmiştir?",
    options: ["1402", "1453", "1514", "1526"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "İstanbul, Fatih Sultan Mehmet komutasındaki Osmanlı ordusu tarafından 1453 yılında fethedilmiştir."
  },
  {
    id: "tar_12",
    subject: "Tarih",
    question: "Tanzimat Fermanı hangi yıl ilan edilmiştir?",
    options: ["1808", "1839", "1856", "1876"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Tanzimat Fermanı (Gülhane Hatt-ı Hümayunu), Sultan Abdülmecid döneminde 1839'da ilan edilmiştir."
  },
  {
    id: "tar_13",
    subject: "Tarih",
    question: "Amasya Genelgesi'nin yayımlandığı tarih hangisidir?",
    options: ["19 Mayıs 1919", "22 Haziran 1919", "23 Temmuz 1919", "4 Eylül 1919"],
    correctIndex: 1,
    difficulty: "hard",
    examType: "both",
    explanation: "Milli Mücadelenin amacı, gerekçesi ve yönteminin belirtildiği Amasya Genelgesi 22 Haziran 1919'da yayımlandı."
  },
  {
    id: "tar_14",
    subject: "Tarih",
    question: "Erzurum Kongresi'nin toplanma tarihi nedir?",
    options: ["22 Haziran 1919", "23 Temmuz 1919", "4 Eylül 1919", "20 Ekim 1921"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Erzurum Kongresi, 23 Temmuz - 7 Ağustos 1919 tarihleri arasında toplanmıştır."
  },
  {
    id: "tar_15",
    subject: "Tarih",
    question: "Sevr Antlaşmasını TBMM onaylamış mıdır?",
    options: ["Evet, şartlı onayladı", "Hayır, TBMM reddetmiştir", "Sadece boğazlar maddesini onayladı", "Referanduma sundu"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "Sevr Antlaşması (1920), TBMM tarafından hiçbir zaman onaylanmamış ve geçersiz sayılmıştır."
  },
  {
    id: "tar_16",
    subject: "Tarih",
    question: "İlk Osmanlı anayasası olan Kanun-i Esasi ne zaman ilan edildi?",
    options: ["1839", "1856", "1876", "1908"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "Osmanlı Devleti'nin ilk anayasası olan Kanun-i Esasi, 1876 yılında II. Abdülhamit döneminde ilan edilmiştir."
  },

  // Coğrafya
  {
    id: "cog_1",
    subject: "Coğrafya",
    question: "Tamamı Türkiye sınırları içinde kalan en uzun nehir hangisidir?",
    options: ["Fırat", "Kızılırmak", "Yeşilırmak", "Seyhan"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Kızılırmak, doğuşu ve döküldüğü yer Türkiye'de olan, tamamı ülke içindeki en uzun nehirdir (1355 km)."
  },
  {
    id: "cog_2",
    subject: "Coğrafya",
    question: "Türkiye'nin en yüksek dağı hangisidir?",
    options: ["Erciyes Dağı", "Süphan Dağı", "Ağrı Dağı", "Kaçkar Dağları"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "Ağrı Dağı (5.137 m), Türkiye'nin en yüksek dağıdır."
  },
  {
    id: "cog_3",
    subject: "Coğrafya",
    question: "Türkiye'nin yüzölçümü bakımından en büyük gölü hangisidir?",
    options: ["Tuz Gölü", "Eğirdir Gölü", "Beyşehir Gölü", "Van Gölü"],
    correctIndex: 3,
    difficulty: "easy",
    examType: "both",
    explanation: "Van Gölü (3.713 km²), yüzölçümü bakımından Türkiye'nin en büyük gölüdür."
  },
  {
    id: "cog_4",
    subject: "Coğrafya",
    question: "Türkiye Dünya üzerinde hangi yarımkürelerde yer alır?",
    options: ["Güney-Batı", "Güney-Doğu", "Kuzey-Doğu", "Kuzey-Batı"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "Türkiye, Ekvator'un kuzeyinde (Kuzey YK) ve Başlangıç Meridyeni'nin doğusunda (Doğu YK) yer alır."
  },
  {
    id: "cog_5",
    subject: "Coğrafya",
    question: "Yıl boyu en fazla yağış alan bölgemiz hangisidir?",
    options: ["Akdeniz Bölgesi", "Karadeniz Bölgesi", "Marmara Bölgesi", "Ege Bölgesi"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "Karadeniz Bölgesi, Türkiye'de yıl boyu en fazla yağış alan ve yağış rejimi en düzenli bölgedir."
  },
  {
    id: "cog_6",
    subject: "Coğrafya",
    question: "Marmara Bölgesi'nin iklim özelliği genel olarak nasıldır?",
    options: ["Karasal iklim", "Ekvatoral iklim", "Geçiş iklimi", "Çöl iklimi"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "Marmara Bölgesi, üç farklı iklim tipinin (Karasal, Karadeniz, Akdeniz) etkisinde kaldığından geçiş iklimi özelliğine sahiptir."
  },
  {
    id: "cog_7",
    subject: "Coğrafya",
    question: "Türkiye'de en çok yetiştirilen tahıl ürünü hangisidir?",
    options: ["Mısır", "Arpa", "Buğday", "Yulaf"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "Türkiye'de iklim koşullarına (karasallığa) en çok uyum sağlayan ve en çok yetiştirilen tahıl buğdaydır."
  },
  {
    id: "cog_8",
    subject: "Coğrafya",
    question: "Pamuk üretiminde ilk sırada yer alan bölgemiz hangisidir?",
    options: ["Akdeniz", "Güneydoğu Anadolu", "Ege", "Marmara"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Güneydoğu Anadolu Projesi (GAP) ile birlikte pamuk üretiminde Güneydoğu Anadolu ilk sıraya yerleşmiştir."
  },
  {
    id: "cog_9",
    subject: "Coğrafya",
    question: "Karadeniz Bölgesi'nde kıyıya paralel uzanan dağ sırasının adı nedir?",
    options: ["Toros Dağları", "Kuzey Anadolu Dağları", "Amanos Dağları", "Yıldız Dağları"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Karadeniz kıyısına paralel uzanan sıra dağlara Kuzey Anadolu Dağları denir."
  },
  {
    id: "cog_10",
    subject: "Coğrafya",
    question: "GAP projesi ağırlıklı olarak hangi nehri ve çevresini kapsar?",
    options: ["Kızılırmak - Yeşilırmak", "Fırat - Dicle", "Seyhan - Ceyhan", "Gediz - Büyük Menderes"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "GAP projesi, ağırlıklı olarak Fırat ve Dicle nehirlerinin su potansiyelini değerlendirmeyi kapsar."
  },

  // İktisat
  {
    id: "ikt_1",
    subject: "İktisat",
    question: "Fiyatlar genel düzeyindeki sürekli artışa ne ad verilir?",
    options: ["Deflasyon", "Devalüasyon", "Enflasyon", "Resesyon"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "Enflasyon, bir ekonomide mal ve hizmet fiyatlarının genel düzeyinde yaşanan sürekli artıştır."
  },
  {
    id: "ikt_2",
    subject: "İktisat",
    question: "Fiyat düştükçe talep edilen miktarın artmasını ifade eden kurala ne denir?",
    options: ["Arz Kanunu", "Talep Kanunu", "Azalan Verimler Kanunu", "Gresham Kanunu"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "Talep Kanunu, bir malın fiyatı düştükçe tüketicilerin o maldan talep ettikleri miktarın artacağını belirtir."
  },
  {
    id: "ikt_3",
    subject: "İktisat",
    question: "Belirli bir coğrafi sınır içinde üretilen nihai mal ve hizmetlerin değerine ne ad verilir?",
    options: ["Milli Gelir", "GSYH (Gayrisafi Yurt İçi Hasıla)", "GSMH (Gayrisafi Milli Hasıla)", "Kişisel Gelir"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "GSYH (Gayrisafi Yurt İçi Hasıla), belirli bir coğrafi sınırda üretilen mal ve hizmetlerin değeridir."
  },
  {
    id: "ikt_4",
    subject: "İktisat",
    question: "Merkez Bankasının temel amacı aşağıdakilerden hangisidir?",
    options: ["İşsizliği sıfıra indirmek", "Büyümeyi maksimize etmek", "Fiyat istikrarını sağlamak", "İhracatı artırmak"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "TCMB Kanunu Md. 4'e göre Merkez Bankasının temel amacı fiyat istikrarını sağlamaktır."
  },
  {
    id: "ikt_5",
    subject: "İktisat",
    question: "Piyasada tek bir satıcının bulunduğu piyasa türü hangisidir?",
    options: ["Oligopol", "Monopol", "Tam Rekabet", "Monopson"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "Monopol, piyasada ikamesi olmayan bir mal veya hizmetin tek bir satıcısının bulunmasıdır."
  },
  {
    id: "ikt_6",
    subject: "İktisat",
    question: "John Maynard Keynes, kriz dönemlerinde devlete hangi rolü biçmiştir?",
    options: ["Hiç müdahale etmemelidir", "Kamu harcamalarını artırmalıdır", "Sadece para arzını artırmalıdır", "Vergileri artırmalıdır"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Keynesyen görüş, kriz dönemlerinde devletin kamu harcamalarını artırarak ekonomiye müdahale etmesini savunur."
  },
  {
    id: "ikt_7",
    subject: "İktisat",
    question: "Fiyatların artmasıyla birlikte durgunluğun (işsizliğin) aynı anda yaşandığı duruma ne ad verilir?",
    options: ["Slumpflasyon", "Hiperenflasyon", "Stagflasyon", "Resesyon"],
    correctIndex: 2,
    difficulty: "hard",
    examType: "both",
    explanation: "Stagflasyon, ekonomide enflasyon (fiyat artışı) ile durgunluğun (resesyon/işsizlik) aynı anda yaşanmasıdır."
  },
  {
    id: "ikt_8",
    subject: "İktisat",
    question: "Devletin bütçe açığını kapatmak için başvurduğu yollardan biri nedir?",
    options: ["Borçlanma", "Dış ticareti yasaklama", "Asgari ücreti düşürme", "Kredi faizlerini artırma"],
    correctIndex: 0,
    difficulty: "medium",
    examType: "both",
    explanation: "Devletler, bütçe açıklarını kapatmak için iç veya dış piyasalardan borçlanma (tahvil/bono ihracı) yoluna gider."
  },
  {
    id: "ikt_9",
    subject: "İktisat",
    question: "Sabit kur rejiminde ulusal paranın değerinin idari bir kararla düşürülmesine ne denir?",
    options: ["Enflasyon", "Deflasyon", "Devalüasyon", "Revalüasyon"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "Devalüasyon, sabit kur sisteminde yerli paranın yabancı paralar karşısındaki değerinin resmi kararla düşürülmesidir."
  },
  {
    id: "ikt_10",
    subject: "İktisat",
    question: "Ekonomide friksiyonel (geçici) ve yapısal işsizliğin toplamına ne denir?",
    options: ["Gizli işsizlik", "Devrevi işsizlik", "Mevsimsel işsizlik", "Doğal işsizlik"],
    correctIndex: 3,
    difficulty: "hard",
    examType: "both",
    explanation: "Doğal işsizlik, ekonominin tam istihdam seviyesindeyken var olan friksiyonel (geçici) ve yapısal işsizliğin toplamıdır."
  },

  // Türkçe
  {
    id: "turk_1",
    subject: "Türkçe",
    question: "Aşağıdaki kelimelerden hangisinin yazımı yanlıştır?",
    options: ["Herkes", "Hiçbir", "Her şey", "Herşey"],
    correctIndex: 3,
    difficulty: "easy",
    examType: "both",
    explanation: "'Her şey' her zaman ayrı yazılır. Bu nedenle 'Herşey' yazımı yanlıştır."
  },
  {
    id: "turk_2",
    subject: "Türkçe",
    question: "Cümleleri veya kelimeleri birbirine bağlayan sözcüklere ne ad verilir?",
    options: ["Zamir", "Bağlaç", "Edat", "Sıfat"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "Bağlaçlar, cümle içindeki kelimeleri, kelime gruplarını veya cümleleri birbirine bağlayan sözcüklerdir."
  },
  {
    id: "turk_3",
    subject: "Türkçe",
    question: "Bir metnin veya paragrafın yazılış amacını ifade eden temel düşünceye ne ad verilir?",
    options: ["Yardımcı Düşünce", "Konu", "Ana Düşünce", "Tema"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "Ana düşünce, bir parçada asıl anlatılmak istenen, okura verilmek istenen temel mesajdır."
  },
  {
    id: "turk_4",
    subject: "Türkçe",
    question: "İki ismin birbirini tamamlamasıyla oluşan tamlamaya ne ad verilir?",
    options: ["Sıfat Tamlaması", "İsim Tamlaması", "Fiilimsili Grup", "Zarf Fiil Grubu"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "İki veya daha fazla ismin birbirini anlamca tamamlayarak oluşturduğu söz gruplarına isim tamlaması denir."
  },
  {
    id: "turk_5",
    subject: "Türkçe",
    question: "'Küplere binmek' deyiminin anlamı nedir?",
    options: ["Çok sevinmek", "Çok öfkelenmek", "Şaşırmak", "Üzülmek"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "'Küplere binmek', çok sinirlenmek, aşırı derecede öfkelenmek anlamına gelen bir deyimdir."
  },

  // Matematik
  {
    id: "mat_1",
    subject: "Matematik",
    question: "2'nin 10. kuvveti (2^10) kaçtır?",
    options: ["512", "1024", "2048", "4096"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "2'nin 10. kuvveti: 2^10 = 1024'tür."
  },
  {
    id: "mat_2",
    subject: "Matematik",
    question: "100 TL'lik bir ürüne %25 indirim yapılırsa yeni fiyatı kaç TL olur?",
    options: ["70", "75", "80", "85"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "100 TL'nin %25'i 25 TL'dir. İndirim sonrası fiyat: 100 - 25 = 75 TL'dir."
  },
  {
    id: "mat_3",
    subject: "Matematik",
    question: "3/4 + 2/3 işleminin sonucu kaçtır?",
    options: ["5/7", "5/12", "17/12", "9/12"],
    correctIndex: 2,
    difficulty: "medium",
    examType: "both",
    explanation: "Paydalar eşitlenirse: (3/4 = 9/12), (2/3 = 8/12). Toplamı: 9/12 + 8/12 = 17/12."
  },
  {
    id: "mat_4",
    subject: "Matematik",
    question: "Bir kenarı 5 cm olan karenin çevresi kaç cm'dir?",
    options: ["10", "15", "20", "25"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "Karenin çevresi 4 kenarın toplamıdır. Bir kenarı 5 cm ise çevresi: 4 x 5 = 20 cm."
  },
  {
    id: "mat_5",
    subject: "Matematik",
    question: "200 sayısının %30'u kaçtır?",
    options: ["30", "50", "60", "90"],
    correctIndex: 2,
    difficulty: "easy",
    examType: "both",
    explanation: "200'ün %30'u: (200 x 30) / 100 = 60."
  },

  // Vatandaşlık
  {
    id: "vat_1",
    subject: "Vatandaşlık",
    question: "Türkiye Büyük Millet Meclisi üyeleri kaç yıl için seçilir?",
    options: ["4", "5", "6", "7"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "Anayasa Md. 77: Türkiye Büyük Millet Meclisi ve Cumhurbaşkanlığı seçimleri beş yılda bir aynı günde yapılır."
  },
  {
    id: "vat_2",
    subject: "Vatandaşlık",
    question: "Cumhurbaşkanı kural olarak bir kişi en fazla kaç defa seçilebilir?",
    options: ["1", "2", "3", "Sınırsız"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "Anayasa Md. 101: Bir kimse kural olarak en fazla iki defa Cumhurbaşkanı seçilebilir."
  },
  {
    id: "vat_3",
    subject: "Vatandaşlık",
    question: "Yasama, Yürütme ve Yargı erklerinin farklı organlarda bulunmasına ne denir?",
    options: ["Kuvvetler Birliği", "Güçler Ayrılığı (Kuvvetler Ayrılığı)", "Meclis Hükümeti Sistemi", "Federasyon"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Kuvvetler ayrılığı (güçler ayrılığı); yasama, yürütme ve yargı yetkilerinin bağımsız organlarca kullanılmasıdır."
  },
  {
    id: "vat_4",
    subject: "Vatandaşlık",
    question: "Kamu Denetçiliği Kurumu (Ombudsman) kime bağlıdır?",
    options: ["Cumhurbaşkanlığına", "Adalet Bakanlığına", "TBMM Başkanlığına", "Anayasa Mahkemesine"],
    correctIndex: 2,
    difficulty: "hard",
    examType: "both",
    explanation: "Anayasa Md. 74: Kamu Denetçiliği Kurumu (Ombudsman), TBMM Başkanlığına bağlı olarak görev yapar."
  },

  // Maliye
  {
    id: "mal_1",
    subject: "Maliye",
    question: "Gelir üzerinden alınan vergiler hangi tür vergilere örnektir?",
    options: ["Dolaylı vergiler", "Dolaysız vergiler", "Harcama vergileri", "Servet vergileri"],
    correctIndex: 1,
    difficulty: "medium",
    examType: "both",
    explanation: "Gelir, kurumlar ve servet üzerinden doğrudan alınan vergilere dolaysız (vasıtasız) vergiler denir."
  },
  {
    id: "mal_2",
    subject: "Maliye",
    question: "Katma Değer Vergisi (KDV) nasıl bir vergidir?",
    options: ["Dolaysız vergi", "Dolaylı vergi", "Kurumlar vergisi", "Gelir vergisi"],
    correctIndex: 1,
    difficulty: "easy",
    examType: "both",
    explanation: "Katma Değer Vergisi (KDV), tüketim harcamaları üzerinden alınan dolaylı bir vergidir."
  },
  {
    id: "mal_3",
    subject: "Maliye",
    question: "Bütçenin tüm gelir ve giderlerinin tek bir bütçe içinde gösterilmesi ilkesine ne ad verilir?",
    options: ["Genellik (Birlik) İlkesi", "Tahsis İlkesi", "Ödenek İlkesi", "Denklik İlkesi"],
    correctIndex: 0,
    difficulty: "hard",
    examType: "both",
    explanation: "Bütçenin tüm kamu gelir ve giderlerini tek bir belgede kapsamlı olarak göstermesine genellik (birlik) ilkesi denir."
  },
  // TÜRKÇE (ÖNLİSANS - 15 questions)
  { id: "onl_tr_1", subject: "Türkçe", question: "Aşağıdakilerden hangisi bir yazım yanlışı içermektedir?", options: ["Bugün de gelmedi.", "Hiç kimse onu anlamadı.", "Herşey çok güzel olacak.", "Biraz daha sabretmelisin."], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "'Her şey' ayrı yazılmalıdır." },
  { id: "onl_tr_2", subject: "Türkçe", question: "Aşağıdaki cümlelerin hangisinde anlatım bozukluğu vardır?", options: ["Sınıftaki öğrencilerin çoğu başarılı oldu.", "Ben ve Ali yarın sinemaya gidecek.", "Bu konu hakkında hiçbir fikrim yok.", "Kitabı okuyup özetini çıkardı."], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "'Ben ve Ali' öznesi birinci çoğul şahıs (biz) kabul edildiği için yüklem 'gideceğiz' olmalıdır." },
  { id: "onl_tr_3", subject: "Türkçe", question: "'Gözden düşmek' deyiminin anlamı nedir?", options: ["Çok beğenilmek", "Değerini ve saygınlığını yitirmek", "Çok sevinmek", "Gözü bozulmak"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Gözden düşmek, bir kişinin eski değerini, saygınlığını veya güvenini yitirmesi anlamındadır." },
  { id: "onl_tr_4", subject: "Türkçe", question: "Hangi seçenekte ünsüz yumuşaması kuralına uyulmamıştır?", options: ["Ağacın", "Kitabı", "Hukuku", "Çocuğun"], correctIndex: 2, difficulty: "hard", examType: "kpss_onlisans", explanation: "'Hukuk' kelimesi Arapça kökenli olduğu için ünlüyle başlayan ek aldığında yumuşamaya uğramaz (hukuku)." },
  { id: "onl_tr_5", subject: "Türkçe", question: "Aşağıdaki altı çizili sözcüklerden hangisi yapısına göre türemiştir?", options: ["Evden", "Kitaplık", "Yolcuya", "Gözüm"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "'Kitaplık' kelimesi, 'kitap' köküne '-lık' yapım eki getirilerek türetilmiştir." },
  { id: "onl_tr_6", subject: "Türkçe", question: "'İnce' kelimesi aşağıdakilerin hangisinde mecaz anlamda kullanılmıştır?", options: ["İnce bir kazak giymişti.", "Çok ince bir davranıştı.", "İncecik bir dal parçasıydı.", "Defterin yaprakları çok inceydi."], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "'İnce davranış' ifadesindeki 'ince', kalın karşıtı değil, 'nazik, düşünceli' anlamında mecazdır." },
  { id: "onl_tr_7", subject: "Türkçe", question: "Aşağıdaki cümlelerin hangisinde 'ki'nin yazımı yanlıştır?", options: ["Duvardaki tablo çok güzel.", "Anladım ki bu iş olmayacak.", "Evde ki hesap çarşıya uymadı.", "Sen ki benim en yakın arkadaşımsın."], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "'Evdeki hesap' şeklinde bitişik yazılmalıdır, çünkü burada sıfat yapan -ki ekidir." },
  { id: "onl_tr_8", subject: "Türkçe", question: "Hangisi sesteş (eş sesli) bir kelime değildir?", options: ["Yüz", "Gül", "Yol", "Masa"], correctIndex: 3, difficulty: "easy", examType: "kpss_onlisans", explanation: "Yüz, gül ve yol kelimelerinin birden fazla anlamı varken masa kelimesinin yoktur." },
  { id: "onl_tr_9", subject: "Türkçe", question: "Aşağıdaki cümlelerin hangisinde bir edat (ilgeç) kullanılmıştır?", options: ["Ali ve Ayşe geldi.", "Benim kadar çalışkan değil.", "Oysa ki çok sevmiştim.", "Ama sen de haklısın."], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "'Kadar' kelimesi cümlede edat olarak kullanılmıştır." },
  { id: "onl_tr_10", subject: "Türkçe", question: "'Tatlı dil yılanı deliğinden çıkarır.' atasözünün ana fikri nedir?", options: ["Yılanlar tatlıyı sever.", "Tatlı konuşan insanlar tehlikelidir.", "Güler yüzlü ve tatlı sözlü olmak en inatçı kişileri bile yumuşatır.", "İnsanlarla konuşurken dikkatli olunmalıdır."], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "Güzel ve tatlı konuşmanın insanların olumsuz tutumlarını bile olumluya çevirebileceği anlatılır." },
  // MATEMATİK (ÖNLİSANS - 15 questions)
  { id: "onl_mat_1", subject: "Matematik", question: "2x + 5 = 17 denkleminde x kaçtır?", options: ["4", "5", "6", "7"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "2x = 17 - 5 => 2x = 12 => x = 6." },
  { id: "onl_mat_2", subject: "Matematik", question: "Bir karenin alanı 64 cm² ise çevresi kaç cm'dir?", options: ["24", "32", "40", "64"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Alanı 64 ise bir kenarı 8 cm'dir. Çevresi 4 * 8 = 32 cm'dir." },
  { id: "onl_mat_3", subject: "Matematik", question: "%40 karla 140 TL'ye satılan bir malın maliyet fiyatı nedir?", options: ["80", "90", "100", "110"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "1.4 * Maliyet = 140 => Maliyet = 100 TL." },
  { id: "onl_mat_4", subject: "Matematik", question: "1/2, 1/3, 1/4 kesirlerinin toplamı kaçtır?", options: ["11/12", "9/12", "13/12", "15/12"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Paydaları 12'de eşitleriz: 6/12 + 4/12 + 3/12 = 13/12." },
  { id: "onl_mat_5", subject: "Matematik", question: "Hızı 80 km/sa olan bir araç 5 saatte kaç km yol alır?", options: ["350", "400", "450", "500"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Yol = Hız x Zaman => 80 x 5 = 400 km." },
  { id: "onl_mat_6", subject: "Matematik", question: "3 sayısının 4 katının 5 eksiği kaçtır?", options: ["5", "7", "9", "12"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "3 x 4 = 12, 12 - 5 = 7." },
  { id: "onl_mat_7", subject: "Matematik", question: "İki sayının toplamı 20, farkı 6'dır. Büyük sayı kaçtır?", options: ["10", "12", "13", "14"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "x+y=20, x-y=6. Taraf tarafa toplarsak 2x=26 => x=13." },
  { id: "onl_mat_8", subject: "Matematik", question: "1'den 100'e kadar (1 ve 100 dahil) kaç tane 9 rakamı kullanılır?", options: ["10", "19", "20", "21"], correctIndex: 2, difficulty: "hard", examType: "kpss_onlisans", explanation: "Birler basamağında 10 tane (9, 19...99), onlar basamağında 10 tane (90..99) toplam 20 tane." },
  { id: "onl_mat_9", subject: "Matematik", question: "Bir zar atıldığında üst yüze gelen sayının asal olma olasılığı nedir?", options: ["1/6", "1/3", "1/2", "2/3"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Asal sayılar 2, 3, 5'tir. Toplam 3 tane. 3/6 = 1/2." },
  { id: "onl_mat_10", subject: "Matematik", question: "2^3 x 2^4 işleminin sonucu nedir?", options: ["2^7", "4^7", "2^12", "4^12"], correctIndex: 0, difficulty: "easy", examType: "kpss_onlisans", explanation: "Üslü sayılarda çarpma işleminde tabanlar aynıysa üsler toplanır. 3+4=7 => 2^7." },
  // TARİH (ÖNLİSANS - 15 questions)
  { id: "onl_tar_1", subject: "Tarih", question: "Mustafa Kemal Paşa'nın 'Ordular, ilk hedefiniz Akdeniz'dir. İleri!' emrini verdiği savaş hangisidir?", options: ["Birinci İnönü", "Sakarya", "Büyük Taarruz", "Çanakkale"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "Bu emir 1922 yılındaki Büyük Taarruz sırasında verilmiştir." },
  { id: "onl_tar_2", subject: "Tarih", question: "Mudanya Ateşkes Antlaşması hangi yıl imzalanmıştır?", options: ["1920", "1921", "1922", "1923"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Kurtuluş Savaşı'nın silahlı mücadelesini bitiren Mudanya Ateşkesi 11 Ekim 1922'de imzalanmıştır." },
  { id: "onl_tar_3", subject: "Tarih", question: "Aşağıdakilerden hangisi Atatürk'ün 'Milliyetçilik' ilkesi ile doğrudan ilgilidir?", options: ["Aşar vergisinin kaldırılması", "Türk Tarih Kurumunun kurulması", "Halifeliğin kaldırılması", "Soyadı Kanununun kabulü"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Türk Tarih ve Türk Dil Kurumlarının kurulması doğrudan milliyetçilik ilkesi ile ilgilidir." },
  { id: "onl_tar_4", subject: "Tarih", question: "TBMM'nin ilk başkanı kimdir?", options: ["İsmet İnönü", "Rauf Orbay", "Mustafa Kemal Atatürk", "Ali Fethi Okyar"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "23 Nisan 1920'de açılan TBMM'nin ilk başkanı Mustafa Kemal Paşa'dır." },
  { id: "onl_tar_5", subject: "Tarih", question: "Osmanlı Devleti'nde padişahın yetkilerini ilk kez kısıtlayan belge hangisidir?", options: ["Tanzimat Fermanı", "Islahat Fermanı", "Kanun-i Esasi", "Sened-i İttifak"], correctIndex: 3, difficulty: "hard", examType: "kpss_onlisans", explanation: "1808 yılında II. Mahmut ile ayanlar arasında imzalanan Sened-i İttifak, padişahın yetkilerini kısıtlayan ilk belgedir." },
  { id: "onl_tar_6", subject: "Tarih", question: "Aşağıdakilerden hangisi Birinci Dünya Savaşı'nda Osmanlı Devleti'nin taarruz cephelerinden biridir?", options: ["Çanakkale", "Suriye-Filistin", "Kafkas", "Hicaz-Yemen"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Osmanlı Devleti'nin I. Dünya Savaşı'ndaki taarruz cepheleri Kafkas ve Kanal cepheleridir." },
  { id: "onl_tar_7", subject: "Tarih", question: "Misak-ı Milli kararları nerede kabul edilmiştir?", options: ["Amasya", "Erzurum", "Sivas", "Son Osmanlı Mebusan Meclisi"], correctIndex: 3, difficulty: "medium", examType: "kpss_onlisans", explanation: "Misak-ı Milli kararları 28 Ocak 1920'de İstanbul'da toplanan Son Osmanlı Mebusan Meclisi'nde kabul edilmiştir." },
  { id: "onl_tar_8", subject: "Tarih", question: "Saltanatın kaldırılması hangi tarihte gerçekleşmiştir?", options: ["1 Kasım 1922", "29 Ekim 1923", "3 Mart 1924", "23 Nisan 1920"], correctIndex: 0, difficulty: "medium", examType: "kpss_onlisans", explanation: "Saltanat 1 Kasım 1922'de TBMM tarafından kaldırılmıştır." },
  { id: "onl_tar_9", subject: "Tarih", question: "Tekalif-i Milliye emirleri hangi savaştan önce yayımlanmıştır?", options: ["Birinci İnönü", "İkinci İnönü", "Sakarya Meydan Muharebesi", "Büyük Taarruz"], correctIndex: 2, difficulty: "hard", examType: "kpss_onlisans", explanation: "Eskişehir-Kütahya Savaşlarından sonra, Sakarya Meydan Muharebesi'nden önce yayımlanmıştır." },
  { id: "onl_tar_10", subject: "Tarih", question: "Harf İnkılabı hangi yıl yapılmıştır?", options: ["1926", "1927", "1928", "1931"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "Yeni Türk Harfleri 1 Kasım 1928'de kabul edilmiştir." },
  // COĞRAFYA (ÖNLİSANS - 10 questions)
  { id: "onl_cog_1", subject: "Coğrafya", question: "Türkiye'nin en kalabalık ili hangisidir?", options: ["Ankara", "İzmir", "Bursa", "İstanbul"], correctIndex: 3, difficulty: "easy", examType: "kpss_onlisans", explanation: "İstanbul, Türkiye'nin nüfus bakımından en büyük ilidir." },
  { id: "onl_cog_2", subject: "Coğrafya", question: "Türkiye'nin en uzun kara sınırı hangi ülke iledir?", options: ["Yunanistan", "Bulgaristan", "Suriye", "İran"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Türkiye'nin en uzun kara sınırı (911 km) Suriye iledir." },
  { id: "onl_cog_3", subject: "Coğrafya", question: "Karadeniz Bölgesi'nde en çok yetiştirilen tarım ürünü aşağıdakilerden hangisidir?", options: ["Pamuk", "Çay", "Buğday", "Zeytin"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Çay, Türkiye'de sadece Karadeniz Bölgesi'nde (Doğu Karadeniz) yetiştirilir." },
  { id: "onl_cog_4", subject: "Coğrafya", question: "Aşağıdakilerden hangisi Ege Bölgesi'ndeki kırıklı dağlardan biri değildir?", options: ["Madra", "Yunt", "Bozdağlar", "Kaçkar"], correctIndex: 3, difficulty: "medium", examType: "kpss_onlisans", explanation: "Kaçkar Dağları, Karadeniz Bölgesi'nde yer alan kıvrım dağlarıdır." },
  { id: "onl_cog_5", subject: "Coğrafya", question: "Türkiye'nin 'tahıl ambarı' olarak bilinen bölgesi hangisidir?", options: ["Marmara", "İç Anadolu", "Güneydoğu Anadolu", "Akdeniz"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "İç Anadolu Bölgesi, geniş düzlükleri ve karasal iklimiyle buğday üretiminde ilk sıradadır." },
  { id: "onl_cog_6", subject: "Coğrafya", question: "Ergene Havzası hangi coğrafi bölgemizde yer alır?", options: ["Ege", "Marmara", "Akdeniz", "Karadeniz"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Ergene Havzası, Marmara Bölgesi'nin Trakya kesiminde yer alır." },
  { id: "onl_cog_7", subject: "Coğrafya", question: "Türkiye'de çeltik (pirinç) üretiminde ilk sırada yer alan il hangisidir?", options: ["Edirne", "Samsun", "Balıkesir", "Çorum"], correctIndex: 0, difficulty: "hard", examType: "kpss_onlisans", explanation: "Türkiye çeltik üretiminin yarısına yakını Edirne (Ergene Havzası) tarafından karşılanır." },
  { id: "onl_cog_8", subject: "Coğrafya", question: "Seyhan ve Ceyhan nehirlerinin oluşturduğu Türkiye'nin en büyük delta ovası hangisidir?", options: ["Çarşamba", "Bafra", "Çukurova", "Silifke"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "Çukurova, Seyhan ve Ceyhan nehirlerinin taşıdığı alüvyonlarla oluşmuş en büyük delta ovamızdır." },
  // VATANDAŞLIK (ÖNLİSANS - 10 questions)
  { id: "onl_vat_1", subject: "Vatandaşlık", question: "Aşağıdakilerden hangisi temel hak ve hürriyetlerin özelliklerinden biri değildir?", options: ["Devredilemezler", "Vazgeçilemezler", "Sınırsızdırlar", "Dokunulmazdırlar"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Temel hak ve hürriyetler sınırsız değildir; anayasada belirtilen nedenlerle kanunla sınırlandırılabilirler." },
  { id: "onl_vat_2", subject: "Vatandaşlık", question: "Kanunları yayımlamak kimin görevidir?", options: ["TBMM Başkanı", "Cumhurbaşkanı", "Adalet Bakanı", "Anayasa Mahkemesi Başkanı"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "TBMM tarafından kabul edilen kanunları 15 gün içinde yayımlamak veya geri göndermek Cumhurbaşkanının görevidir." },
  { id: "onl_vat_3", subject: "Vatandaşlık", question: "T.C. Anayasasına göre devletin şekli nedir?", options: ["Monarşi", "Teokrasi", "Oligarşi", "Cumhuriyet"], correctIndex: 3, difficulty: "easy", examType: "kpss_onlisans", explanation: "Anayasa Md. 1: Türkiye Devleti bir Cumhuriyettir." },
  { id: "onl_vat_4", subject: "Vatandaşlık", question: "Milletvekili seçilme yaşı kaçtır?", options: ["18", "21", "25", "30"], correctIndex: 0, difficulty: "easy", examType: "kpss_onlisans", explanation: "2017 anayasa değişikliği ile milletvekili seçilme yaşı 18'e indirilmiştir." },
  { id: "onl_vat_5", subject: "Vatandaşlık", question: "Yerel seçimler kaç yılda bir yapılır?", options: ["3", "4", "5", "7"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Anayasaya göre mahalli idareler seçimleri (yerel seçimler) 5 yılda bir yapılır." },
  { id: "onl_vat_6", subject: "Vatandaşlık", question: "Bir kimsenin suçluluğu mahkeme kararıyla saptanana kadar masum sayılması ilkesine ne ad verilir?", options: ["Kanunilik", "Eşitlik", "Masumiyet Karinesi", "Şahsilik"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Suçluluğu hükmen sabit oluncaya kadar kimse suçlu sayılamaz (Masumiyet Karinesi)." },
  // GÜNCEL BİLGİLER (ÖNLİSANS - 5 questions)
  { id: "onl_gun_1", subject: "Güncel Bilgiler", question: "2024 Yaz Olimpiyat Oyunları hangi şehirde düzenlenmiştir?", options: ["Tokyo", "Londra", "Paris", "Los Angeles"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "2024 Yaz Olimpiyatları Paris'te (Fransa) düzenlenmiştir." },
  { id: "onl_gun_2", subject: "Güncel Bilgiler", question: "NATO'ya 2024 yılında katılan son ülke hangisidir?", options: ["Finlandiya", "İsveç", "Ukrayna", "Bosna Hersek"], correctIndex: 1, difficulty: "hard", examType: "kpss_onlisans", explanation: "İsveç, 2024 yılında NATO'nun 32. üyesi olmuştur." },
  { id: "onl_gun_3", subject: "Güncel Bilgiler", question: "Türkiye'nin ilk astronotu Alper Gezeravcı hangi uzay misyonu ile uzaya gitmiştir?", options: ["Axiom-3 (Ax-3)", "Apollo 11", "Artemis", "SpaceX Crew-5"], correctIndex: 0, difficulty: "medium", examType: "kpss_onlisans", explanation: "Alper Gezeravcı, Axiom Space'in Ax-3 misyonu kapsamında uzaya gitmiştir." },
  // HUKUK (LİSANS - 10 questions)
  { id: "lis_huk_1", subject: "Hukuk", question: "Bir hakkın kazanılmasında geçerli olan temel ilke hangisidir?", options: ["Dürüstlük Kuralı (Objektif İyiniyet)", "İyiniyet (Subjektif İyiniyet)", "Sözleşme Özgürlüğü", "Kusursuz Sorumluluk"], correctIndex: 1, difficulty: "hard", examType: "kpss_lisans", explanation: "Hakların KAZANILMASINDA iyiniyet (subjektif iyiniyet), KULLANILMASINDA ise dürüstlük kuralı (objektif iyiniyet) geçerlidir." },
  { id: "lis_huk_2", subject: "Hukuk", question: "Aşağıdakilerden hangisi medeni hukukun alt dallarından biri değildir?", options: ["Kişiler Hukuku", "Aile Hukuku", "Eşya Hukuku", "Ticaret Hukuku"], correctIndex: 3, difficulty: "medium", examType: "kpss_lisans", explanation: "Ticaret Hukuku ayrı bir özel hukuk dalıdır. Medeni hukukun alt dalları: Kişiler, Aile, Miras, Eşya." },
  { id: "lis_huk_3", subject: "Hukuk", question: "Suçun kanuni tanımındaki unsurların bilerek ve istenerek gerçekleştirilmesine ne ad verilir?", options: ["Kast", "Taksir", "Olası Kast", "Bilinçli Taksir"], correctIndex: 0, difficulty: "easy", examType: "kpss_lisans", explanation: "Kast, suçun kanuni tanımındaki unsurların bilerek ve istenerek gerçekleştirilmesidir." },
  // İKTİSAT (LİSANS - 10 questions)
  { id: "lis_ikt_1", subject: "İktisat", question: "Aşağıdakilerden hangisi makro iktisadın inceleme alanlarından biridir?", options: ["Firma teorisi", "Tüketici dengesi", "Enflasyon oranı", "Piyasa dengesi"], correctIndex: 2, difficulty: "easy", examType: "kpss_lisans", explanation: "Enflasyon, işsizlik, büyüme, milli gelir gibi konular makro iktisadın inceleme alanıdır." },
  { id: "lis_ikt_2", subject: "İktisat", question: "Tam rekabet piyasasında firmanın kısa dönemde kârını maksimize ettiği nokta hangisidir?", options: ["MR = MC", "P = AR", "TR = TC", "AR = AC"], correctIndex: 0, difficulty: "hard", examType: "kpss_lisans", explanation: "Tüm piyasalarda kâr maksimizasyon şartı Marjinal Gelir (MR) = Marjinal Maliyet (MC) eşitliğidir." },
  // MALİYE (LİSANS - 10 questions)
  { id: "lis_mal_1", subject: "Maliye", question: "Aşağıdakilerden hangisi kamu harcamalarının görünürde artış nedenlerinden biridir?", options: ["Nüfus artışı", "Enflasyon", "Devletin görevlerinin artması", "Savaşlar"], correctIndex: 1, difficulty: "hard", examType: "kpss_lisans", explanation: "Paranın satın alma gücünün düşmesi (enflasyon), kamu harcamalarının sadece görünürde (nominal) artmasına neden olur." },
  // TÜRKÇE (20 MORE)
  { id: "onl_tr_11", subject: "Türkçe", question: "Aşağıdaki cümlelerin hangisinde nesne eksikliğinden kaynaklanan anlatım bozukluğu vardır?", options: ["Kitabı çok beğendim ve hemen okudum.", "Ona her zaman güvenir ve severim.", "Bugün hava çok güzel, dışarı çıkalım.", "Derslerine çok çalıştı, başarılı oldu."], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "'Severim' yüklemi için 'onu' nesnesi gereklidir." },
  { id: "onl_tr_12", subject: "Türkçe", question: "'Göz atmak' deyiminin anlamı nedir?", options: ["Kısa bir süre için incelemek", "Çok dikkatli bakmak", "Görmezden gelmek", "Uykuya dalmak"], correctIndex: 0, difficulty: "easy", examType: "kpss_onlisans", explanation: "Göz atmak, bir şeye şöyle bir, derinlemesine inmeden bakmak demektir." },
  { id: "onl_tr_13", subject: "Türkçe", question: "Hangi kelimenin yazımı doğrudur?", options: ["Eşortman", "Meyva", "Kirpik", "Kiprik"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "Doğru yazım 'kirpik'tir. Diğerleri: eşofman, meyve." },
  { id: "onl_tr_14", subject: "Türkçe", question: "Aşağıdaki kelimelerden hangisi yapım eki almamıştır?", options: ["Gözlük", "Evler", "Yolcu", "Silgi"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "'Evler' kelimesindeki '-ler' çoğul eki olup çekim ekidir." },
  { id: "onl_tr_15", subject: "Türkçe", question: "'Süt dökmüş kedi gibi' deyimi hangi durumu ifade eder?", options: ["Çok mutlu olmayı", "Korkup sessizce suçluluk duymayı", "Çok sinirlenmeyi", "Karnı tok olmayı"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Suçluluk veya utanç nedeniyle sessiz ve çekingen kalmayı ifade eder." },
  { id: "onl_tr_16", subject: "Türkçe", question: "Aşağıdaki altı çizili sözcüklerden hangisi isim fiildir?", options: ["Gelmek", "Gelen", "Gelip", "Gelerek"], correctIndex: 0, difficulty: "medium", examType: "kpss_onlisans", explanation: "'-mek' eki isim-fiil (mastar) ekidir." },
  { id: "onl_tr_17", subject: "Türkçe", question: "Aşağıdakilerden hangisi birleşik kelime değildir?", options: ["Hanımeli", "Aslanağzı", "Bilgisayar", "Kitaplık"], correctIndex: 3, difficulty: "easy", examType: "kpss_onlisans", explanation: "Kitaplık, yapım eki almış türemiş bir kelimedir." },
  { id: "onl_tr_18", subject: "Türkçe", question: "Hangi cümlede 'de/da' nın yazımı yanlıştır?", options: ["Sen de bizimle gel.", "Evde kimse yoktu.", "Kitabımı okul da unuttum.", "O da çok sevindi."], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Bulunma hal eki olan '-da' bitişik yazılmalıdır (okulda)." },
  { id: "onl_tr_19", subject: "Türkçe", question: "'Ağaç yaşken eğilir' atasözü neyi vurgular?", options: ["Ormanları korumayı", "İnsanların yaşlandıkça büküldüğünü", "Eğitimin küçük yaşta verilmesi gerektiğini", "Ağaçların sulanması gerektiğini"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "İnsanın küçük yaşlarda eğitilmesinin kolay olduğunu vurgular." },
  { id: "onl_tr_20", subject: "Türkçe", question: "Aşağıdaki kelimelerden hangisi ünlü düşmesine uğramıştır?", options: ["Burnum", "Gözüm", "Saçım", "Kolum"], correctIndex: 0, difficulty: "easy", examType: "kpss_onlisans", explanation: "Burun-um => Burnum (u ünlüsü düşmüştür)." },
  { id: "onl_tr_21", subject: "Türkçe", question: "Aşağıdaki cümlelerin hangisinde sebep-sonuç ilişkisi vardır?", options: ["Yağmur yağdığı için maç iptal oldu.", "Yarın okula gideceğim.", "Kitap okumak çok faydalıdır.", "Çok çalışırsan başarırsın."], correctIndex: 0, difficulty: "easy", examType: "kpss_onlisans", explanation: "Maçın iptal olması (sonuç), yağmurun yağmasına (sebep) bağlanmıştır." },
  { id: "onl_tr_22", subject: "Türkçe", question: "Hangi kelime büyük ünlü uyumuna uymaz?", options: ["Kalem", "Masa", "Kitap", "Odun"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "'Kitap' kelimesinde ince ünlü (i) ile kalın ünlü (a) bir aradadır." },
  { id: "onl_tr_23", subject: "Türkçe", question: "'Kulak asmamak' deyiminin anlamı nedir?", options: ["Söylenenleri dinlememek, önemsememek", "İşitme kaybı yaşamak", "Çok dikkatli dinlemek", "Kulakları ağrımak"], correctIndex: 0, difficulty: "easy", examType: "kpss_onlisans", explanation: "Kulak asmamak, söylenen bir şeye değer vermemek, dinlememek demektir." },
  { id: "onl_tr_24", subject: "Türkçe", question: "Aşağıdaki kelimelerden hangisinin eş anlamlısı (anlamdaşı) yoktur?", options: ["Siyah", "Cevap", "Öğrenci", "Bardak"], correctIndex: 3, difficulty: "easy", examType: "kpss_onlisans", explanation: "Siyah (Kara), Cevap (Yanıt), Öğrenci (Talebe) eş anlamlılara sahipken bardağın yoktur." },
  { id: "onl_tr_25", subject: "Türkçe", question: "Hangisi öznel bir yargı bildirir?", options: ["Türkiye'nin başkenti Ankara'dır.", "En güzel renk mavidir.", "Su 100 derecede kaynar.", "Hafta 7 gündür."], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Renklerin güzelliği kişiden kişiye değişen öznel bir yargıdır." },
  { id: "onl_tr_26", subject: "Türkçe", question: "Aşağıdaki kelimelerin hangisinde ulama vardır?", options: ["Dün akşam", "Kara kedi", "Mavi gök", "Güzel gün"], correctIndex: 0, difficulty: "medium", examType: "kpss_onlisans", explanation: "Ünsüzle biten kelimeden sonra ünlüyle başlayan kelime gelmesi durumuna ulama denir (Dü-nakşam)." },
  { id: "onl_tr_27", subject: "Türkçe", question: "'Keskin sirke küpüne zarar' atasözü neyi öğütler?", options: ["Sirkelerin dikkatli saklanmasını", "Öfkenin en çok kişinin kendisine zarar vereceğini", "Keskin aletlerin tehlikeli olduğunu", "Sabırlı olmanın gereksizliğini"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Aşırı öfke ve hırçınlığın kişinin kendisine zarar vereceğini ifade eder." },
  { id: "onl_tr_28", subject: "Türkçe", question: "Aşağıdaki cümlelerin hangisinde zarf (belirteç) yoktur?", options: ["Bugün çok yoruldum.", "Hızlıca koştu.", "Güzel bir ev aldılar.", "Akşam bize gelecekler."], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "'Güzel bir ev' ifadesindeki 'güzel' sıfattır, zarf yoktur." },
  { id: "onl_tr_29", subject: "Türkçe", question: "Hangi kelime yapısı bakımından basittir?", options: ["Gözlük", "Sevgi", "Kitap", "Bilgin"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "Kitap kelimesi kök halindedir, yapım eki almamıştır." },
  { id: "onl_tr_30", subject: "Türkçe", question: "'Boş' kelimesi aşağıdaki cümlelerin hangisinde mecaz anlamda kullanılmıştır?", options: ["Kutu tamamen boştu.", "Boş bardakları masadan topladı.", "Bana boş gözlerle bakıyordu.", "Odanın içi çok boştu."], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "'Boş gözler' ifadesi anlamsız, donuk anlamında mecazdır." },
  // MATEMATİK (20 MORE)
  { id: "onl_mat_11", subject: "Matematik", question: "5 sayısının faktöriyeli (5!) kaçtır?", options: ["24", "60", "120", "240"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "5! = 5 x 4 x 3 x 2 x 1 = 120." },
  { id: "onl_mat_12", subject: "Matematik", question: "Kök 81 dışarıya hangi sayı olarak çıkar?", options: ["7", "8", "9", "10"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "9 x 9 = 81 olduğundan karekök 81, 9'dur." },
  { id: "onl_mat_13", subject: "Matematik", question: "A ve B şehirleri arası 300 km'dir. Hızı saatte 60 km olan bir araç bu yolu kaç saatte gider?", options: ["4", "5", "6", "7"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Zaman = Yol / Hız => 300 / 60 = 5 saat." },
  { id: "onl_mat_14", subject: "Matematik", question: "Bir üçgenin iç açıları toplamı kaç derecedir?", options: ["90", "180", "360", "270"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Tüm düzlemsel üçgenlerin iç açıları toplamı 180 derecedir." },
  { id: "onl_mat_15", subject: "Matematik", question: "%20'si 40 olan sayının tamamı kaçtır?", options: ["100", "150", "200", "250"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "x * 20 / 100 = 40 => x = 200." },
  { id: "onl_mat_16", subject: "Matematik", question: "Ardışık iki çift sayının toplamı 26'dır. Büyük sayı kaçtır?", options: ["12", "14", "16", "18"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "x + (x+2) = 26 => 2x = 24 => x = 12. Büyük sayı: 14." },
  { id: "onl_mat_17", subject: "Matematik", question: "Bir mal 120 TL'ye alınıp 150 TL'ye satılmıştır. Yüzde kaç kar edilmiştir?", options: ["15", "20", "25", "30"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Kar miktarı = 30 TL. 30/120 = 1/4 = %25 kar." },
  { id: "onl_mat_18", subject: "Matematik", question: "x/3 = y/4 ve x+y = 35 ise x kaçtır?", options: ["10", "15", "20", "25"], correctIndex: 1, difficulty: "hard", examType: "kpss_onlisans", explanation: "x=3k, y=4k. 3k+4k = 7k = 35 => k=5. x = 3*5 = 15." },
  { id: "onl_mat_19", subject: "Matematik", question: "Torbadaki 5 kırmızı, 3 beyaz bilyeden rastgele çekilen bir bilyenin beyaz olma olasılığı nedir?", options: ["3/5", "3/8", "5/8", "1/3"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "İstenen/Tüm durum = 3 / (5+3) = 3/8." },
  { id: "onl_mat_20", subject: "Matematik", question: "Yarıçapı 3 cm olan çemberin çevresi kaç cm'dir? (pi=3 alınız)", options: ["9", "12", "18", "27"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Çevre = 2 * pi * r = 2 * 3 * 3 = 18." },
  { id: "onl_mat_21", subject: "Matematik", question: "Dikdörtgenin eni 4 cm, boyu 7 cm'dir. Alanı kaç cm²'dir?", options: ["11", "22", "28", "30"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "Alan = en * boy = 4 * 7 = 28." },
  { id: "onl_mat_22", subject: "Matematik", question: "4^3 sayısı aşağıdakilerden hangisine eşittir?", options: ["12", "16", "64", "256"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "4 * 4 * 4 = 64." },
  { id: "onl_mat_23", subject: "Matematik", question: "20 işçinin 15 günde bitirdiği işi, 30 işçi kaç günde bitirir?", options: ["10", "12", "20", "22"], correctIndex: 0, difficulty: "hard", examType: "kpss_onlisans", explanation: "Ters orantı vardır: 20 * 15 = 30 * x => 300 = 30x => x = 10." },
  { id: "onl_mat_24", subject: "Matematik", question: "3, 5, 9, 15, x dizisinde x yerine hangi sayı gelmelidir?", options: ["19", "21", "23", "25"], correctIndex: 2, difficulty: "hard", examType: "kpss_onlisans", explanation: "Farklar: 2, 4, 6... Sonraki fark 8 olmalı. 15+8 = 23." },
  { id: "onl_mat_25", subject: "Matematik", question: "12 ve 18 sayılarının EKOK'u (En Küçük Ortak Kat) kaçtır?", options: ["6", "24", "36", "72"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "12 ve 18'in en küçük ortak katı 36'dır." },
  { id: "onl_mat_26", subject: "Matematik", question: "2x - 3 = x + 5 denkleminde x kaçtır?", options: ["2", "4", "6", "8"], correctIndex: 3, difficulty: "medium", examType: "kpss_onlisans", explanation: "2x - x = 5 + 3 => x = 8." },
  { id: "onl_mat_27", subject: "Matematik", question: "0.5 x 0.2 işleminin sonucu kaçtır?", options: ["0.01", "0.1", "1", "10"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "5/10 * 2/10 = 10/100 = 1/10 = 0.1." },
  { id: "onl_mat_28", subject: "Matematik", question: "Küpün kaç ayrıtı vardır?", options: ["6", "8", "12", "16"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Küpün 6 yüzü, 8 köşesi ve 12 ayrıtı vardır." },
  { id: "onl_mat_29", subject: "Matematik", question: "|x-2| = 5 denkleminde x'in alabileceği değerler toplamı kaçtır?", options: ["2", "4", "5", "7"], correctIndex: 1, difficulty: "hard", examType: "kpss_onlisans", explanation: "x-2=5 => x=7. x-2=-5 => x=-3. Toplam = 7 + (-3) = 4." },
  { id: "onl_mat_30", subject: "Matematik", question: "Bir sayının yarısı ile çeyreğinin toplamı 15'tir. Bu sayı kaçtır?", options: ["10", "15", "20", "24"], correctIndex: 3, difficulty: "hard", examType: "kpss_onlisans", explanation: "(x/2) + (x/4) = 3x/4 = 15 => x = 20." },
  // TARİH (20 MORE)
  { id: "onl_tar_11", subject: "Tarih", question: "Lale Devri hangi padişah döneminde yaşanmıştır?", options: ["III. Selim", "III. Ahmet", "II. Mahmut", "Abdülmecit"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Lale Devri (1718-1730), III. Ahmet döneminde yaşanmıştır." },
  { id: "onl_tar_12", subject: "Tarih", question: "Sivas Kongresi hangi tarihte toplanmıştır?", options: ["23 Temmuz 1919", "4 Eylül 1919", "22 Haziran 1919", "23 Nisan 1920"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Sivas Kongresi 4-11 Eylül 1919 tarihleri arasında toplanmıştır." },
  { id: "onl_tar_13", subject: "Tarih", question: "Atatürk'ün 'Hayatta en hakiki mürşit ilimdir' sözü hangi ilkeyle doğrudan ilişkilidir?", options: ["Laiklik", "Halkçılık", "Devletçilik", "Cumhuriyetçilik"], correctIndex: 0, difficulty: "medium", examType: "kpss_onlisans", explanation: "Aklı ve bilimi rehber edindiği için doğrudan Laiklik ilkesi ile ilgilidir." },
  { id: "onl_tar_14", subject: "Tarih", question: "Osmanlı Devleti'fiilen sona erdiği antlaşma hangisidir?", options: ["Sevr", "Mondros", "Mudanya", "Lozan"], correctIndex: 1, difficulty: "hard", examType: "kpss_onlisans", explanation: "1918 Mondros Ateşkes Antlaşması ile Osmanlı Devleti fiilen sona ermiştir." },
  { id: "onl_tar_15", subject: "Tarih", question: "Osmanlı'da ilk matbaayı kim kurmuştur?", options: ["Müteferrika", "Sinan Paşa", "Kâtip Çelebi", "Naima"], correctIndex: 0, difficulty: "medium", examType: "kpss_onlisans", explanation: "İbrahim Müteferrika, Lale Devri'nde Osmanlı'daki ilk Türk matbaasını kurmuştur." },
  { id: "onl_tar_16", subject: "Tarih", question: "Balkan Savaşları sonucunda Osmanlı Devleti'nin kaybettiği topraklardan biri değildir?", options: ["Makedonya", "Batı Trakya", "Arnavutluk", "Suriye"], correctIndex: 3, difficulty: "easy", examType: "kpss_onlisans", explanation: "Suriye, I. Dünya Savaşı sonucunda kaybedilmiştir." },
  { id: "onl_tar_17", subject: "Tarih", question: "Gümrü Antlaşması hangi devletle imzalanmıştır?", options: ["Yunanistan", "Fransa", "İngiltere", "Ermenistan"], correctIndex: 3, difficulty: "medium", examType: "kpss_onlisans", explanation: "Doğu Cephesindeki savaşları bitiren Gümrü Antlaşması (1920) Ermenistan ile imzalanmıştır." },
  { id: "onl_tar_18", subject: "Tarih", question: "Kuvayımilliye kavramı ilk kez nerede kullanılmıştır?", options: ["Havza Genelgesi", "Milli Kongre Cemiyeti Raporu", "Amasya Genelgesi", "Sivas Kongresi"], correctIndex: 1, difficulty: "hard", examType: "kpss_onlisans", explanation: "Kuvayımilliye kavramını ilk kullanan Milli Kongre Cemiyetidir." },
  { id: "onl_tar_19", subject: "Tarih", question: "İlk Diyanet İşleri Başkanı kimdir?", options: ["Rıfat Börekçi", "Mehmet Akif Ersoy", "Fevzi Çakmak", "Ali Fuat Cebesoy"], correctIndex: 0, difficulty: "hard", examType: "kpss_onlisans", explanation: "1924'te kurulan Diyanet İşleri Başkanlığının ilk başkanı Rıfat Börekçi'dir." },
  { id: "onl_tar_20", subject: "Tarih", question: "Teşkilat-ı Esasiye Kanunu hangi yıl kabul edilmiştir?", options: ["1920", "1921", "1923", "1924"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Yeni Türk Devleti'nin ilk anayasası olan Teşkilat-ı Esasiye, 1921 yılında kabul edilmiştir." },
  { id: "onl_tar_21", subject: "Tarih", question: "Yeniçeri Ocağı hangi padişah döneminde kaldırılmıştır?", options: ["III. Selim", "II. Mahmut", "Abdülmecit", "II. Abdülhamit"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "1826 yılındaki Vaka-i Hayriye (Hayırlı Olay) ile Yeniçeri Ocağı II. Mahmut tarafından kaldırılmıştır." },
  { id: "onl_tar_22", subject: "Tarih", question: "İstiklal Marşı hangi savaştan sonra kabul edilmiştir?", options: ["Birinci İnönü", "İkinci İnönü", "Sakarya", "Büyük Taarruz"], correctIndex: 0, difficulty: "medium", examType: "kpss_onlisans", explanation: "İstiklal Marşı, 12 Mart 1921'de, I. İnönü Savaşı'ndan sonra kabul edilmiştir." },
  { id: "onl_tar_23", subject: "Tarih", question: "Atatürk'ün Nutuk adlı eseri hangi yılları kapsar?", options: ["1919-1923", "1919-1927", "1920-1923", "1923-1938"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Nutuk, 1919 (Samsun'a çıkış) ile 1927 (Nutuk'un okunduğu yıl) arasını kapsar." },
  { id: "onl_tar_24", subject: "Tarih", question: "Türkiye'nin Milletler Cemiyeti'ne üye olduğu yıl hangisidir?", options: ["1928", "1930", "1932", "1934"], correctIndex: 2, difficulty: "hard", examType: "kpss_onlisans", explanation: "Türkiye, İspanya'nın daveti üzerine 1932 yılında Milletler Cemiyetine üye olmuştur." },
  { id: "onl_tar_25", subject: "Tarih", question: "Serbest Cumhuriyet Fırkası'nın kurucusu kimdir?", options: ["Kazım Karabekir", "Ali Fethi Okyar", "Celal Bayar", "Adnan Menderes"], correctIndex: 1, difficulty: "hard", examType: "kpss_onlisans", explanation: "1930 yılında Atatürk'ün isteğiyle kurulan Serbest Cumhuriyet Fırkası'nın kurucusu Ali Fethi Okyar'dır." },
  { id: "onl_tar_26", subject: "Tarih", question: "Montrö Boğazlar Sözleşmesi hangi yıl imzalanmıştır?", options: ["1933", "1936", "1939", "1945"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Boğazlarda tam egemenlik sağlayan Montrö Boğazlar Sözleşmesi 1936'da imzalanmıştır." },
  { id: "onl_tar_27", subject: "Tarih", question: "Hatay'ın anavatana katıldığı yıl hangisidir?", options: ["1937", "1938", "1939", "1940"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Bağımsız Hatay Devleti Meclisi, 1939'da Türkiye'ye katılma kararı almıştır." },
  { id: "onl_tar_28", subject: "Tarih", question: "Kanuni Sultan Süleyman'ın son seferi hangisidir?", options: ["Mohaç", "Zigetvar", "Viyana Kuşatması", "Preveze"], correctIndex: 1, difficulty: "hard", examType: "kpss_onlisans", explanation: "Kanuni'nin 1566 yılındaki son seferi Zigetvar Seferidir." },
  { id: "onl_tar_29", subject: "Tarih", question: "Preveze Deniz Savaşı'nın komutanı kimdir?", options: ["Piri Reis", "Seydi Ali Reis", "Barbaros Hayrettin Paşa", "Oruç Reis"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "1538 Preveze Deniz Zaferi, Barbaros Hayrettin Paşa komutasında kazanılmıştır." },
  { id: "onl_tar_30", subject: "Tarih", question: "Ankara'nın başkent olduğu yıl hangisidir?", options: ["1920", "1922", "1923", "1924"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Ankara, 13 Ekim 1923'te çıkarılan kanunla başkent olmuştur." },
  // COĞRAFYA (12 MORE)
  { id: "onl_cog_9", subject: "Coğrafya", question: "Türkiye'nin en az yağış alan bölgesi hangisidir?", options: ["Marmara", "İç Anadolu", "Güneydoğu Anadolu", "Doğu Anadolu"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "İç Anadolu Bölgesi (özellikle Tuz Gölü çevresi) Türkiye'nin en az yağış alan yeridir." },
  { id: "onl_cog_10", subject: "Coğrafya", question: "Muz tarımı Türkiye'de en çok hangi bölgede yapılır?", options: ["Ege", "Akdeniz", "Karadeniz", "Marmara"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Muz, tropikal bir meyve olduğundan don olayının görülmediği Akdeniz kıyılarında (Mersin, Antalya) yetiştirilir." },
  { id: "onl_cog_11", subject: "Coğrafya", question: "İzmir limanının hinterlandının geniş olmasının temel sebebi nedir?", options: ["Dağların kıyıya paralel uzanması", "Dağların kıyıya dik uzanması", "Nüfusun yoğun olması", "Sanayinin gelişmiş olması"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Ege'de dağlar kıyıya dik uzandığı için iç kesimlerle ulaşım kolaydır, bu da limanın hinterlandını genişletir." },
  { id: "onl_cog_12", subject: "Coğrafya", question: "Aşağıdakilerden hangisi bir heyelan set gölüdür?", options: ["Tuz Gölü", "Abant Gölü", "Van Gölü", "Uzungöl"], correctIndex: 3, difficulty: "hard", examType: "kpss_onlisans", explanation: "Trabzon'daki Uzungöl, Tortum, Sera, Abant, Yedigöller heyelan set göllerindendir. (Abant da set gölüdür ancak Uzungöl en tipik örneğidir)." },
  { id: "onl_cog_13", subject: "Coğrafya", question: "Türkiye'nin en fazla sınır kapısı olan komşusu hangisidir?", options: ["İran", "Suriye", "Yunanistan", "Bulgaristan"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "En uzun sınırımız olan Suriye ile aynı zamanda en fazla sınır kapımız vardır." },
  { id: "onl_cog_14", subject: "Coğrafya", question: "Fiziki haritalarda yeşil renk neyi ifade eder?", options: ["Ormanları", "Ovaları", "Deniz seviyesine yakın alçak yerleri", "Meraları"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "Fiziki haritalarda renkler yükselti basamaklarını gösterir. Yeşil renk 0-500 metre arası alçak yerleri ifade eder." },
  { id: "onl_cog_15", subject: "Coğrafya", question: "Aşağıdakilerden hangisi volkanik bir dağ değildir?", options: ["Erciyes", "Hasan Dağı", "Nemrut", "Ilgaz"], correctIndex: 3, difficulty: "medium", examType: "kpss_onlisans", explanation: "Ilgaz Dağları, Karadeniz Bölgesinde yer alan kıvrım dağlarıdır; volkanik değildir." },
  { id: "onl_cog_16", subject: "Coğrafya", question: "Türkiye'nin en sıcak bölgesi yaz aylarında neresidir?", options: ["Akdeniz", "Güneydoğu Anadolu", "Ege", "Marmara"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Yazın şiddetli buharlaşma ve karasallık nedeniyle en yüksek sıcaklıklar Güneydoğu Anadolu'da ölçülür." },
  { id: "onl_cog_17", subject: "Coğrafya", question: "Bor mineralleri rezervi bakımından Türkiye dünyada kaçıncı sıradadır?", options: ["Birinci", "İkinci", "Üçüncü", "Dördüncü"], correctIndex: 0, difficulty: "easy", examType: "kpss_onlisans", explanation: "Türkiye, dünya bor rezervlerinin yaklaşık %73'üne sahip olarak birinci sıradadır." },
  { id: "onl_cog_18", subject: "Coğrafya", question: "Aşağıdaki nehirlerden hangisi sularını yurt dışına döker?", options: ["Sakarya", "Fırat", "Kızılırmak", "Gediz"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Fırat nehri Türkiye'den doğup Suriye ve Irak üzerinden Basra Körfezine dökülür." },
  { id: "onl_cog_19", subject: "Coğrafya", question: "Rüzgar enerjisi potansiyeli en yüksek bölgemiz hangisidir?", options: ["İç Anadolu", "Marmara", "Ege", "Karadeniz"], correctIndex: 2, difficulty: "hard", examType: "kpss_onlisans", explanation: "Özellikle Ege ve Marmara kıyıları potansiyel olarak yüksektir ancak Ege bölgesi (Alaçatı vb.) rüzgar enerjisi üretiminde ilk sıradadır." },
  { id: "onl_cog_20", subject: "Coğrafya", question: "Taş kömürü yatakları en çok hangi coğrafi bölümümüzde bulunur?", options: ["Batı Karadeniz", "Doğu Karadeniz", "Marmara", "İç Anadolu"], correctIndex: 0, difficulty: "easy", examType: "kpss_onlisans", explanation: "Taş kömürü Zonguldak ve çevresinde (Batı Karadeniz) çıkartılmaktadır." },
  // VATANDAŞLIK (14 MORE)
  { id: "onl_vat_7", subject: "Vatandaşlık", question: "1982 Anayasasına göre, seçimler ve halkoylamaları hangi ilkeye göre yapılmaz?", options: ["Gizli oy", "Açık sayım ve döküm", "Genel oy", "İki dereceli seçim"], correctIndex: 3, difficulty: "medium", examType: "kpss_onlisans", explanation: "Türkiye'de 1946'dan beri tek dereceli seçim sistemi uygulanmaktadır." },
  { id: "onl_vat_8", subject: "Vatandaşlık", question: "Anayasa Mahkemesi üyelerinin görev süresi kaç yıldır?", options: ["5", "7", "10", "12"], correctIndex: 3, difficulty: "hard", examType: "kpss_onlisans", explanation: "Anayasa Mahkemesi üyeleri 12 yıl için seçilirler ve bir kişi iki defa üye seçilemez." },
  { id: "onl_vat_9", subject: "Vatandaşlık", question: "Türkiye'de yürütme yetkisi ve görevi kime aittir?", options: ["TBMM", "Cumhurbaşkanı", "Bakanlar Kurulu", "Anayasa Mahkemesi"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "2017 anayasa değişikliği ile yürütme yetkisi ve görevi sadece Cumhurbaşkanına verilmiştir." },
  { id: "onl_vat_10", subject: "Vatandaşlık", question: "Kanun teklif etmeye kim yetkilidir?", options: ["Cumhurbaşkanı", "Bakanlar", "Milletvekilleri", "Valiler"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Anayasamıza göre kanun teklif etmeye sadece milletvekilleri yetkilidir (Bütçe kanunu hariç)." },
  { id: "onl_vat_11", subject: "Vatandaşlık", question: "Normlar hiyerarşisinde en üstte hangisi yer alır?", options: ["Kanun", "Anayasa", "Cumhurbaşkanlığı Kararnamesi", "Yönetmelik"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Normlar hiyerarşisinin (hukuk kuralları sıralaması) en üstünde Anayasa yer alır." },
  { id: "onl_vat_12", subject: "Vatandaşlık", question: "Siyasi partiler kime önceden izin almadan kurulurlar?", options: ["İçişleri Bakanlığına bildirimle", "Adalet Bakanlığına izinle", "Anayasa Mahkemesine başvuruyla", "Yargıtay onayıyla"], correctIndex: 0, difficulty: "medium", examType: "kpss_onlisans", explanation: "Siyasi partiler önceden izin almadan kurulurlar, sadece İçişleri Bakanlığına bildirimde bulunurlar." },
  { id: "onl_vat_13", subject: "Vatandaşlık", question: "Siyasi partilerin mali denetimini kim yapar?", options: ["Sayıştay", "Anayasa Mahkemesi", "Yargıtay Cumhuriyet Başsavcısı", "Maliye Bakanlığı"], correctIndex: 1, difficulty: "hard", examType: "kpss_onlisans", explanation: "Siyasi partilerin mali denetimini Anayasa Mahkemesi (Sayıştay'ın yardımıyla) yapar." },
  { id: "onl_vat_14", subject: "Vatandaşlık", question: "Aşağıdakilerden hangisi siyasi haklardan biridir?", options: ["Yaşama hakkı", "Mülkiyet hakkı", "Seçme ve seçilme hakkı", "Eğitim hakkı"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "Seçme, seçilme, siyasi faaliyette bulunma ve kamu hizmetine girme hakları siyasi haklardır." },
  { id: "onl_vat_15", subject: "Vatandaşlık", question: "Yüksek Seçim Kurulu (YSK) kaç üyeden oluşur?", options: ["7", "9", "11", "15"], correctIndex: 2, difficulty: "hard", examType: "kpss_onlisans", explanation: "YSK 7 asıl, 4 yedek olmak üzere toplam 11 üyeden oluşur." },
  { id: "onl_vat_16", subject: "Vatandaşlık", question: "Hangi durumda TBMM seçimleri 1 yıl geriye bırakılabilir?", options: ["OHAL", "Seferberlik", "Savaş", "Doğal Afet"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Anayasa Md. 78: Savaş sebebiyle yeni seçimlerin yapılmasına imkân görülmezse, TBMM seçimlerin bir yıl geriye bırakılmasına karar verebilir." },
  { id: "onl_vat_17", subject: "Vatandaşlık", question: "Bakanları atama ve görevden alma yetkisi kime aittir?", options: ["TBMM", "Cumhurbaşkanı", "Başbakan", "Anayasa Mahkemesi"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Cumhurbaşkanlığı Hükümet Sisteminde bakanları atama ve görevden alma yetkisi Cumhurbaşkanına aittir." },
  { id: "onl_vat_18", subject: "Vatandaşlık", question: "Aşağıdakilerden hangisi yüksek mahkeme değildir?", options: ["Anayasa Mahkemesi", "Yargıtay", "Sayıştay", "Danıştay"], correctIndex: 2, difficulty: "hard", examType: "kpss_onlisans", explanation: "Sayıştay bir yüksek mahkeme değildir; TBMM adına hesap denetimi yapan bir hesap yargısı organıdır." },
  { id: "onl_vat_19", subject: "Vatandaşlık", question: "Olağanüstü Hal (OHAL) ilan etme yetkisi kime aittir?", options: ["TBMM", "Cumhurbaşkanı", "Milli Güvenlik Kurulu", "İçişleri Bakanı"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "2017 anayasa değişikliği ile OHAL ilan etme yetkisi Cumhurbaşkanına verilmiştir." },
  { id: "onl_vat_20", subject: "Vatandaşlık", question: "T.C. Anayasasının değiştirilemez maddeleri kaçıncı maddelerde yer alır?", options: ["İlk 1 madde", "İlk 2 madde", "İlk 3 madde", "İlk 4 madde"], correctIndex: 2, difficulty: "medium", examType: "kpss_onlisans", explanation: "Anayasanın 4. maddesi, ilk 3 maddenin değiştirilemeyeceğini ve değiştirilmesinin teklif dahi edilemeyeceğini belirtir." },
  // GÜNCEL BİLGİLER (14 MORE)
  { id: "onl_gun_4", subject: "Güncel Bilgiler", question: "2024 yılı Avrupa Futbol Şampiyonası (EURO 2024) hangi ülkede düzenlenmiştir?", options: ["Almanya", "İngiltere", "Fransa", "İspanya"], correctIndex: 0, difficulty: "medium", examType: "kpss_onlisans", explanation: "EURO 2024, Almanya'nın ev sahipliğinde gerçekleşmiştir." },
  { id: "onl_gun_5", subject: "Güncel Bilgiler", question: "Türkiye'nin yerli otomobili TOGG'un üretildiği fabrika hangi ilimizdedir?", options: ["Kocaeli", "Sakarya", "Bursa", "İzmir"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "TOGG fabrikası Bursa'nın Gemlik ilçesinde bulunmaktadır." },
  { id: "onl_gun_6", subject: "Güncel Bilgiler", question: "Dünyanın en derin çukuru olarak bilinen yer hangisidir?", options: ["Büyük Kanyon", "Mariana Çukuru", "Bermuda Şeytan Üçgeni", "Lut Gölü"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Pasifik Okyanusunda bulunan Mariana Çukuru (yaklaşık 11 km) dünyanın en derin noktasıdır." },
  { id: "onl_gun_7", subject: "Güncel Bilgiler", question: "G7 Zirvesi 2024 yılında hangi ülkede yapılmıştır?", options: ["Japonya", "İtalya", "Kanada", "ABD"], correctIndex: 1, difficulty: "hard", examType: "kpss_onlisans", explanation: "2024 G7 Zirvesi İtalya'da (Puglia bölgesinde) gerçekleştirilmiştir." },
  { id: "onl_gun_8", subject: "Güncel Bilgiler", question: "Nobel Ödülleri hangi ülkenin başkentinde verilmektedir? (Barış ödülü hariç)", options: ["Oslo", "Stockholm", "Kopenhag", "Helsinki"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Barış ödülü Norveç (Oslo) verilirken, diğerleri İsveç'in başkenti Stockholm'de verilmektedir." },
  { id: "onl_gun_9", subject: "Güncel Bilgiler", question: "2023 yılında UNESCO Dünya Mirası Listesi'ne Türkiye'den eklenen ahşap direkli camilerden biri hangisidir?", options: ["Süleymaniye", "Selimiye", "Eşrefoğlu", "Sultan Ahmet"], correctIndex: 2, difficulty: "hard", examType: "kpss_onlisans", explanation: "Konya Beyşehir'deki Eşrefoğlu Camii, 2023 yılında UNESCO listesine alınan ahşap camilerden biridir." },
  { id: "onl_gun_10", subject: "Güncel Bilgiler", question: "T.C. Merkez Bankası'nın merkezi hangi ildedir?", options: ["İstanbul", "Ankara", "İzmir", "Bursa"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Türkiye Cumhuriyet Merkez Bankası'nın (TCMB) idare merkezi Ankara'dadır." },
  { id: "onl_gun_11", subject: "Güncel Bilgiler", question: "'Güneşin Doğduğu Yer' anlamına gelen Asya ülkesi hangisidir?", options: ["Çin", "Güney Kore", "Japonya", "Vietnam"], correctIndex: 2, difficulty: "easy", examType: "kpss_onlisans", explanation: "Japonca'da Nihon veya Nippon 'Güneşin Doğduğu Ülke' anlamına gelir." },
  { id: "onl_gun_12", subject: "Güncel Bilgiler", question: "Birleşmiş Milletler (BM) Genel Merkezi nerededir?", options: ["Cenevre", "New York", "Paris", "Londra"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "BM'nin genel merkezi Amerika Birleşik Devletleri'nin New York şehrindedir." },
  { id: "onl_gun_13", subject: "Güncel Bilgiler", question: "Gordion Antik Kenti hangi ilimizdedir ve 2023'te UNESCO listesine girmiştir?", options: ["Çorum", "Ankara", "Antalya", "Şanlıurfa"], correctIndex: 1, difficulty: "hard", examType: "kpss_onlisans", explanation: "Gordion, Ankara'nın Polatlı ilçesinde yer alır ve 2023'te UNESCO listesine dahil edilmiştir." },
  { id: "onl_gun_14", subject: "Güncel Bilgiler", question: "Mona Lisa tablosu hangi müzede sergilenmektedir?", options: ["British Museum", "Louvre Müzesi", "Prado Müzesi", "Hermitage Müzesi"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Leonardo da Vinci'nin Mona Lisa eseri Fransa'nın başkenti Paris'teki Louvre Müzesi'ndedir." },
  { id: "onl_gun_15", subject: "Güncel Bilgiler", question: "Dünyanın en uzun nehri hangisidir?", options: ["Amazon", "Nil", "Yangtze", "Mississippi"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Afrika kıtasında yer alan Nil nehri (yaklaşık 6650 km) dünyanın en uzun nehridir." },
  { id: "onl_gun_16", subject: "Güncel Bilgiler", question: "Türkiye'nin ilk yerli ve milli haberleşme uydusu hangisidir?", options: ["Göktürk-1", "Türksat 6A", "Bilsat", "Rasat"], correctIndex: 1, difficulty: "medium", examType: "kpss_onlisans", explanation: "Türksat 6A, Türkiye'nin yerli imkanlarla geliştirdiği ilk haberleşme uydusudur (2024'te uzaya gönderildi)." },
  { id: "onl_gun_17", subject: "Güncel Bilgiler", question: "Kapadokya bölgesinin sembolü olan peri bacaları oluşumunda hangi doğal afet etkili olmuştur?", options: ["Heyelan", "Volkanizma", "Deprem", "Tsunami"], correctIndex: 1, difficulty: "easy", examType: "kpss_onlisans", explanation: "Peri bacaları, Erciyes ve Hasan dağlarının püskürttüğü volkanik tüflerin aşınmasıyla oluşmuştur." }
];

export function getRandomQuestions(count: number = 5, examType?: string): DuelQuestion[] {
  const filtered = examType && examType !== "both"
    ? duelQuestionsPool.filter(q => q.examType === examType || q.examType === "both")
    : duelQuestionsPool;
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
