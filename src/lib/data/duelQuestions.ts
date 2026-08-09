export interface DuelQuestion {
  id: string;
  subject: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  difficulty: "easy" | "medium" | "hard";
  examType: "kpss_lisans" | "kpss_onlisans" | "both";
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
  }
];

export function getRandomQuestions(count: number = 5, examType?: string): DuelQuestion[] {
  const filtered = examType && examType !== "both"
    ? duelQuestionsPool.filter(q => q.examType === examType || q.examType === "both")
    : duelQuestionsPool;
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
