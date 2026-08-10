import { DuelQuestion } from "./duelQuestions";

export interface ExamPack {
  id: string;
  title: string;
  description: string;
  examType: "kpss_onlisans" | "kpss_lisans" | "both";
  totalQuestions: number;
  durationMinutes: number;
  badge?: string;
  questions: DuelQuestion[];
}

export const KPSS_ONLISAN_DENEME_1_QUESTIONS: DuelQuestion[] = [
  // --- TÜRKÇE (1 - 30) ---
  {
    id: "deneme1-t-1",
    subject: "Türkçe",
    question: "Günümüz edebiyatında bazı yazarlar, dildeki yerleşik kalıpları yıkmak adına sözcükleri kendi bağlamından koparıp rastgele bir araya getiriyorlar. Bu tutum okurun zihninde 'sisli bir camın arkasından dünyaya bakma' hissi uyandırıyor. Altı çizili sözle anlatılmak istenen nedir?",
    options: [
      "Sanatçının özgün bir üslup yakalama çabasında yetersiz kalması",
      "Anlatılmak istenenin açıkça seçilememesi, belirsizlik taşıması",
      "Metnin okuyucuda yoğun bir duygusal karmaşaya yol açması",
      "Yazarın gerçek dünyayı olduğu gibi yansıtmaktan kaçınması",
      "Okurun kendi hayal gücünü kullanmasına fırsat tanınmaması"
    ],
    correctIndex: 1,
    explanation: "Sisli bir camın arkasından dünyaya bakmak, görüntünün açık ve net olmaması, belirsizlik taşıması anlamına gelir."
  },
  {
    id: "deneme1-t-2",
    subject: "Türkçe",
    question: "Yazar kelimeleri bir sarraf hassasiyetiyle seçmiş olsa da suyun yüzeyinde kulaç atmaktan öteye geçememiştir. Altı çizili sözle anlatılmak istenen nedir?",
    options: [
      "Eserinde karmaşık imgelere yer vermesi",
      "Olayları yüzeysel ele alıp konunun özüne ve derinliğine inememesi",
      "Okuyucunun beklentilerini karşılayacak düzeyde olmaması",
      "Belirli bir edebi akımın dışına çıkamaması",
      "Kendi duygusal dünyasını yansıtmaktan kaçınması"
    ],
    correctIndex: 1,
    explanation: "Suyun yüzeyinde kulaç atmak, derine inememek, yüzeysel kalmak anlamında kullanılır."
  },
  {
    id: "deneme1-t-3",
    subject: "Türkçe",
    question: "Aşağıdaki cümlelerin hangisinde hem 'içerik' hem de 'üslup' ile ilgili bir yargıya yer verilmiştir?",
    options: [
      "Romanlarında toplumun kanayan yaralarına parmak basarken tarafsız kalmıştır.",
      "Son yapıtında toplumsal eleştiriyi öyle ustalıkla giydirmiş ki metin bir propaganda broşürüne dönüşmekten kurtulmuş.",
      "Yazarın kullandığı canlı ve imgeli dil okurun hayal dünyasını zenginleştirir.",
      "Eserin üslubundaki akıcılık okurun kitabı tek solukta bitirmesini sağlar.",
      "Kitabın son bölümünde köy hayatının zorlukları dile getirilmiştir."
    ],
    correctIndex: 1,
    explanation: "'Toplumsal eleştiri' içeriği (konuyu), 'ustalıkla giydirmiş/anlatım biçimi' ise üslubu ifade eder."
  },
  {
    id: "deneme1-t-4",
    subject: "Türkçe",
    question: "(I) Fotoğraf gerçeği dondurma iddiasıyla yola çıksa da sanatçının dünyayı yeniden yorumlamasıdır. (II) Vizörden bakan göz duygusal süzgecini yansıtır. (III) Aynı manzara karşısındaki iki fotoğrafçının karesi asla aynı olmaz. (IV) Sanatı yaratan ruh insanın iç dünyasındadır. (V) Nitekim günümüzde dijital filtrelerin aşırı kullanımı fotoğraf sanatının geniş kitlelere ulaşmasını sağlamıştır. Hangi yargı yanlıştır?",
    options: [
      "I. cümlede fotoğraf sanatının bilinen tanımının aksine bir nitelik taşıdığı vurgulanmıştır.",
      "II. cümlede fotoğrafın kişisel deneyimlerden bağımsız gerçekleşmediği ifade edilmiştir.",
      "III. cümlede II. cümlenin somut bir sonucu dile getirilmiştir.",
      "IV. cümlede sanatsal niteliğin insan faktörüne bağlı olduğu belirtilmiştir.",
      "V. cümlede teknolojinin gelişimiyle fotoğrafın geniş kitlelere ulaştığı savunulmuştur."
    ],
    correctIndex: 4,
    explanation: "V. cümlede filtrelerin aşırı kullanımının olumsuz etkisinden söz edilir; kitlelere ulaşması övülmemiştir."
  },
  {
    id: "deneme1-t-5",
    subject: "Türkçe",
    question: "(I) Bozkırdaki ahşap direkli camiler özgün örneklerdir. (II) Selçuklu döneminden itibaren inşa edilen bu yapılar Selçuklu mimarisinin örneğidir. (III) Ahşap sütunlar birer sanat harikasıdır. (IV) Eşrefoğlu Camii en görkemli örneğidir. (V) Yanlış restorasyon tarihi dokuyu tehdit eder. Hangisinde öznel değerlendirmeye yer verilmemiştir?",
    options: [
      "I",
      "II",
      "III",
      "IV",
      "V"
    ],
    correctIndex: 1,
    explanation: "II. cümle tarihi ve mimari nesnel bir olgudur. Diğer şıklarda öznel sıfatlar vardır."
  },
  {
    id: "deneme1-t-6",
    subject: "Türkçe",
    question: "(I) İklim değişikliği gezegenimizi tehdit ediyor. (II) Su kaynaklarının tükenmesi gıda krizine yol açıyor. (III) Araştırmalar son 50 yılda tatlı su rezervlerinin %30 azaldığını gösteriyor. (IV) Bu durum ekonomik istikrarsızlığı tetikliyor. (V) Sürdürülebilir su politikası kaçınılmazdır. Hangi cümle akışı bozmaktadır?",
    options: [
      "I",
      "II",
      "III",
      "IV",
      "V"
    ],
    correctIndex: 2,
    explanation: "III. cümle soyut bir sayısal veri olup paragraftaki genel sebep-sonuç akışını kesmektedir."
  },
  {
    id: "deneme1-t-7",
    subject: "Türkçe",
    question: "Paragraf ikiye ayrılmak istense ikinci paragraf hangi cümleyle başlar? (IV. Cümle: 'Eğitim sistemleri de bu hızlı dönüşüm karşısında müfredatlarını güncellemektedir.')",
    options: [
      "II",
      "III",
      "IV",
      "V",
      "I"
    ],
    correctIndex: 2,
    explanation: "IV. cümlede konu genel yapay zeka tanımından 'Eğitim sistemleri ve müfredata' kaymıştır."
  },
  {
    id: "deneme1-t-8",
    subject: "Türkçe",
    question: "Aşağıdakilerden hangisi gerçek bir edebiyat eleştirmeninin tutumuyla bağdaşmaz?",
    options: [
      "Eseri çözümlerken nesnel kriterlerden yararlanmak",
      "Okurun metinle kurduğu bağı derinleştirmeye yardımcı olmak",
      "Yazarın üslubunu ve eksiklerini eğitici bir tavırla düzeltmeye çalışmak",
      "Metindeki gizli anlam katmanlarını açığa çıkarmak",
      "Duygusal takdirlerin ötesinde tarafsız inceleme sunmak"
    ],
    correctIndex: 2,
    explanation: "Eleştirmenin amacı yazara ders vermek veya onu eğitmek değildir."
  },
  {
    id: "deneme1-t-9",
    subject: "Türkçe",
    question: "Masallarla ilgili olarak aşağıdakilerden hangisi çıkarılamaz?",
    options: [
      "Toplumsal bellek ve değerlerin aktarımında önemli rol oynadığı",
      "İçeriğinde simgesel ve eğitsel unsurlar barındırdığı",
      "Sadece çocuk eğitimiyle sınırlı kalmayıp kültürel bir işlev taşıdığı",
      "Bireylerde ahlaki ve adalet duygusunun gelişmesine katkı sağladığı",
      "Günümüz dünyasında yazılı edebiyatın gelişmesiyle önemini yitirdiği"
    ],
    correctIndex: 4,
    explanation: "Parçada masalların önemini yitirdiğine dair hiçbir ifade geçmemektedir."
  },
  {
    id: "deneme1-t-10",
    subject: "Türkçe",
    question: "Şiirle ilgili olarak parçada aşağıdakilerden hangisine değinilmemiştir?",
    options: [
      "Şairin sıradan dili özgün ritim ve anlamla dönüştürdüğüne",
      "Okuyucuda kişisel ve duygusal bir karşılık bulduğuna",
      "Başka bir dile çevrildiğinde estetik etkisini kaybetme riski taşıdığına",
      "Yalnızca teknik bir kelime diziliminden ibaret olmadığına",
      "Günümüzde toplumsal sorunları dile getirmede en etkili tür olduğuna"
    ],
    correctIndex: 4,
    explanation: "Parçada şiirin toplumsal sorunları dile getirmede en etkili tür olduğuna dair bilgi yoktur."
  },
  {
    id: "deneme1-t-11",
    subject: "Türkçe",
    question: "Doğada geçirilen kısa süreli yürüyüşler zihinsel odaklanmayı artırıyor. Parçanın sonuna akışa göre hangisi getirilmelidir?",
    options: [
      "Bu nedenle kentlerdeki yeşil alan miktarı artırılmalıdır.",
      "Dolayısıyla insan, kaybettiği dengeyi ve huzuru ancak doğayla yeniden bağ kurarak bulabilir.",
      "Ancak dijital çağın getirdiği kolaylıklar daha ağır basmaktadır.",
      "Sonuç olarak doğa sevgisi küçük yaşta ailede verilmeli.",
      "Çevre bilinci okullarda ders olarak okutulmalıdır."
    ],
    correctIndex: 1,
    explanation: "Parçadaki ana fikir insan ile doğa dengesinin yeniden kurulması üzerinedir."
  },
  {
    id: "deneme1-t-12",
    subject: "Türkçe",
    question: "Aşağıdaki cümlelerin hangisinde bir yazım hatası yapılmıştır?",
    options: [
      "TDK'nin son güncellemeleri kılavuzda açıklanmıştır.",
      "Olayın ardından içişleri bakanlığı yazılı bir basın açıklaması yayımladı.",
      "Yarın öğleden sonra Maraş dondurması yemek için sahile gideceğiz.",
      "Batı medeniyeti, bilimsel gelişmelerin odak noktası olmuştur.",
      "Doğu Anadolu'nun yüksek dağlarında kar yağışı etkili oluyor."
    ],
    correctIndex: 1,
    explanation: "Kurum adı olan 'İçişleri Bakanlığı' baş harfleri büyük yazılmalıdır."
  },
  {
    id: "deneme1-t-13",
    subject: "Türkçe",
    question: "Aşağıdaki cümlelerin hangisinde noktalama işareti yanlış kullanılmıştır?",
    options: [
      "Yaşar Kemal (1915-2015), Çukurova'nın doğasını destansı dille anlatmıştır.",
      "Yarın akşamki toplantıya sen de katılacak mısın? dedi.",
      "Evden çıkarken yanına şunları aldı: cüzdan, anahtar ve kulaklık...",
      "Dikkat et! Yoldaki gizli buzlanma kaza yapmana neden olabilir.",
      "Ankara'dan İstanbul'a giden yüksek hızlı tren seferleri başladı."
    ],
    correctIndex: 2,
    explanation: "3 öge (cüzdan, anahtar, kulaklık) sayılarak sınırlandığı için sonuna üç nokta (...) değil nokta (.) konmalıdır."
  },
  {
    id: "deneme1-t-14",
    subject: "Türkçe",
    question: "Küçürek öykü (1) çok kısa yapısına rağmen (2) yoğun anlatımıyla (3) öne çıkan türlerindendir (4) Bu öykülerde kelime tasarrufu üst düzeydedir (5) her kelime bir dünya taşır. Numaralanmış yerlere hangileri gelmelidir?",
    options: [
      "(,) (,) (,) (.) (;)",
      "(;) (,) (.) (.) (,)",
      "(,) (,) (.) (.) (;)",
      "(,) (,) (;) (.) (,)",
      "(,) (;) (.) (.) (;)"
    ],
    correctIndex: 0,
    explanation: "Ögeler arası virgül, cümle sonlarına nokta ve sıralı cümle ayrımına noktalı virgül (;) gelir."
  },
  {
    id: "deneme1-t-15",
    subject: "Türkçe",
    question: "Aşağıdaki cümlelerin hangisinde 'türetilirken ünlü düşmesine' uğramış bir kelime vardır?",
    options: [
      "Sınav stresi yüzünden çocukcağızın benzi sararmıştı.",
      "Şehrin ortasından geçen kıvrımlı yollar trafiği kilitliyordu.",
      "Sabah saatlerinde sokaktaki sessizlik huzur veriyordu.",
      "Olayın sıcaklığıyla ne diyeceğini bilemedi.",
      "Akşam saatlerinde fırtına etkisini artırdı."
    ],
    correctIndex: 1,
    explanation: "Kıvrımlı kelimesinin kökü 'kıvır-' dır. Kıvır-ım -> kıvrım (türetilirken 'ı' ünlüsü düşmüştür)."
  },
  {
    id: "deneme1-t-16",
    subject: "Türkçe",
    question: "'Seninle birlikte yürüdüğümüz o uzun yollar, bugün zihnimde tatlı bir tebessüm olarak yaşıyor.' cümlenin öğe dizilişi nedir?",
    options: [
      "Özne - Dolaylı Tümleç - Zarf Tümleci - Yüklem",
      "Özne - Zarf Tümleci - Niteleyici Özne - Yüklem",
      "Özne - Zarf Tümleci - Nesne - Yüklem",
      "Özne - Zarf Tümleci - Dolaylı Tümleç / Zarf Tümleci - Yüklem",
      "Zarf Tümleci - Özne - Dolaylı Tümleç - Yüklem"
    ],
    correctIndex: 3,
    explanation: "Yaşıyor (Yüklem), Yaşayan ne? (Özne), Ne zaman? (Zarf T.), Nasıl/Nerede? (Zarf T. / Dolaylı T.)."
  },
  {
    id: "deneme1-t-17",
    subject: "Türkçe",
    question: "Aşağıdaki cümlelerin hangisinde 'fiilimsi (eylemsi)' kullanılmamıştır?",
    options: [
      "Koşar adımlarla durağa doğru ilerleyen adam otobüsü yakaladı.",
      "Gün batımında deniz kenarında yürümek bana huzur verir.",
      "Gece boyunca yağan kar, sabah saatlerinde kenti beyaz örtüyle kapladı.",
      "Yıllar sonra karşılaştığı çocukluk arkadaşını görünce gözleri doldu.",
      "Saatlerce süren toplantının ardından kararlar duyuruldu."
    ],
    correctIndex: 2,
    explanation: "'Gece boyunca yağan kar' ifadesinde yağan (sıfat-fiil) vardır. Seçeneklerde fiilimsi kullanımı kontrol edilmiştir."
  },
  {
    id: "deneme1-t-18",
    subject: "Türkçe",
    question: "Aşağıdaki cümlelerin hangisinde nesne-yüklem ilişkisi bakımından 'geçişli' bir fiil vardır?",
    options: [
      "Güneşin doğuşuyla birlikte kuşlar cıvıl cıvıl ötüşmeye başladı.",
      "Kütüphanenin sessiz ortamında saatlerce konuşmadan oturdu.",
      "Yarışmayı kazandığını öğrenince sevinçten havalara uçtu.",
      "Kütüphaneden aldığı eski el yazması kitabı özenle inceledi.",
      "Akşam saatlerinde sahilde uzun yürüyüşler yaptı."
    ],
    correctIndex: 3,
    explanation: "'İnceledi' fiili nesne alabilir (Onu inceledi / el yazması kitabı inceledi) -> Geçişli fiildir."
  },
  {
    id: "deneme1-t-19",
    subject: "Türkçe",
    question: "Hangisinde 'karşılaştırma' yapılmıştır? (V. Cümle: Günümüzde önemli olan teknolojiyle yarışmak değil; teknolojiyi kullanabilmektir.)",
    options: [
      "I",
      "II",
      "III",
      "IV",
      "V"
    ],
    correctIndex: 4,
    explanation: "V. cümlede 'teknolojiyle yarışmak' ile 'teknolojiyi yetkin kullanmak' kıyaslanmıştır."
  },
  {
    id: "deneme1-t-20",
    subject: "Türkçe",
    question: "Aşağıdaki cümlelerin hangisinde bir anlatım bozukluğu vardır?",
    options: [
      "Yarın yapılacak olan toplantının ertelenme olasılığı yüksek görünüyor.",
      "Konuşmacı yöneltilen sorulara eksiksiz cevap verdi.",
      "Başvuracak adayların formu doldurmaları gerekmektedir.",
      "Şirketimiz ihracat hacmini geçen yıla kıyasla büyüttü.",
      "Öğrenciler sınav öncesinde son tekrarlarını yaptı."
    ],
    correctIndex: 0,
    explanation: "'Olasılığı... görünüyor' ifadesinde aynı anlamı taşıyan sözcük kullanımı gereksiz sözcük kullanımıdır."
  },
  {
    id: "deneme1-t-21",
    subject: "Türkçe",
    question: "Hangisinde betimleyici anlatıma veya duyular arası aktarmaya yer verilmemiştir?",
    options: [
      "İstanbul'un balıkçı barınakları denizin yaşayan şahitleridir.",
      "Sabahın ilk ışıklarıyla denize açılan balıkçılar ağlarını serer.",
      "Taze balık kokusunun ahşap teknelerle buluştuğu mekanlar...",
      "Tarihi surların gölgesinde sıcak çaylar demlenir.",
      "Balıkçılık sektörü artan yakıt maliyetleri nedeniyle zor günler geçirmektedir."
    ],
    correctIndex: 4,
    explanation: "V. cümle nesnel ekonomik bir tespittir, betimleme veya duyu aktarımı içermez."
  },
  {
    id: "deneme1-t-22",
    subject: "Türkçe",
    question: "Cümlelerin anlamlı bütün oluşturacak sıralanışı hangisidir? (I. Bilgiye erişim kolaylaşsa da bilgi kirliliği arttı, II. İçeriği teyit etmek kritik önem taşır, III. Eleştirel okuryazarlık zorunluluktur.)",
    options: [
      "I - II - III",
      "II - I - III",
      "III - I - II",
      "I - III - II",
      "III - II - I"
    ],
    correctIndex: 0,
    explanation: "Önce sorun (I), sonra teyit ihtiyacı (II), sonra çözüm ve sonuç (III) gelir."
  },
  {
    id: "deneme1-t-23",
    subject: "Türkçe",
    question: "Parçaya göre tiyatro sanatıyla ilgili olarak aşağıdakilerden hangisi söylenemez?",
    options: [
      "İnsan ilişkilerini canlı bir performansla sahneye taşıdığı",
      "Seyircide öz farkındalık duygusu uyandırmayı hedeflediği",
      "İzleyicinin duygusal dünyasında değişim yaratmasının beklendiği",
      "Yalnızca eğlendirme ve hoş vakit geçirtme işlevi gördüğü",
      "Bireye kendi yaşamından izler bulabileceği ayna görevi gördüğü"
    ],
    correctIndex: 3,
    explanation: "Parçada tiyatronun 'yalnızca eğlendirme işlevi görmediği' vurgulanmıştır."
  },
  {
    id: "deneme1-t-24",
    subject: "Türkçe",
    question: "Numaralanmış cümlelerin hangisinde 'tiyatronun insan üzerindeki dönüştürücü etkisinden' bahsedilmiştir?",
    options: [
      "I",
      "II",
      "III",
      "IV",
      "V"
    ],
    correctIndex: 4,
    explanation: "V. cümledeki 'salondan çıkan insanın içeri giren insanla aynı kişi olmaması' dönüştürücü gücünü ifade eder."
  },
  {
    id: "deneme1-t-25",
    subject: "Türkçe",
    question: "Parçanın ana düşüncesi hangisidir? (Yapay zeka tıpta başarılı olsa da hekimliğin empati yönünün yerini tutamaz.)",
    options: [
      "Yapay zeka hekimlerin yerini alacaktır.",
      "Tıbbi teşhiste teknoloji insan hatasını sıfırlar.",
      "Yapay zeka ne kadar başarılı olursa olsun hekimliğin insani yönünün yerini tutamaz.",
      "Geleceğin hastaneleri yapay zekayla yönetilecek.",
      "İnsan hekimler teknolojiye uyum sağlayamıyor."
    ],
    correctIndex: 2,
    explanation: "Metnin ana düşüncesi yapay zekanın tıptaki insani şefkat ve empatinin yerini alamayacağıdır."
  },
  {
    id: "deneme1-t-26",
    subject: "Türkçe",
    question: "Parçada kaçıncı cümleden itibaren yapay zekanın sınırlarına ve insani faktöre geçilmiştir?",
    options: [
      "II",
      "III",
      "IV",
      "V",
      "I"
    ],
    correctIndex: 1,
    explanation: "III. cümledeki 'Ancak bu durum hekimliğin sona ereceği anlamına gelmez' ifadesiyle geçilmiştir."
  },
  {
    id: "deneme1-t-27",
    subject: "Türkçe",
    question: "Sözel Mantık: Ahmet(Salı), Faruk(Cuma değil), Deniz ve Elif arası 2 gün (Deniz Elif'ten önce), Burak'tan hemen sonra Ceyda [Burak, Ceyda]. Buna göre aşağıdakilerden hangisi kesinlikle doğrudur?",
    options: [
      "Ceyda'nın görüşmesi Perşembe günüdür.",
      "Deniz'in görüşmesi Pazartesi günüdür.",
      "Faruk'un görüşmesi Cumartesi günüdür.",
      "Burak'ın görüşmesi Çarşamba günüdür.",
      "Elif'in görüşmesi Cuma günüdür."
    ],
    correctIndex: 1,
    explanation: "Şartları sağlayan tek geçerli dizilim: Pzt: Deniz, Salı: Ahmet, Çar: Faruk, Per: Elif, Cum: Burak, Cmt: Ceyda."
  },
  {
    id: "deneme1-t-28",
    subject: "Türkçe",
    question: "Sözel Mantık: Ceyda'nın görüşmesi Cumartesi günü ise Faruk'un görüşmesi hangi gündür?",
    options: [
      "Pazartesi",
      "Çarşamba",
      "Cuma",
      "Cumartesi",
      "Salı"
    ],
    correctIndex: 1,
    explanation: "Geçerli tabloda Faruk Çarşamba günündedir."
  },
  {
    id: "deneme1-t-29",
    subject: "Türkçe",
    question: "Sözel Mantık: Aşağıdakilerden hangisi Faruk'un görüşme yaptığı gün olamaz?",
    options: [
      "Pazartesi",
      "Çarşamba",
      "Cuma",
      "Cumartesi",
      "Salı"
    ],
    correctIndex: 2,
    explanation: "Öncülde Faruk'un görüşmesinin Cuma günü olmadığı kesin olarak verilmiştir."
  },
  {
    id: "deneme1-t-30",
    subject: "Türkçe",
    question: "Sözel Mantık: Deniz Pazartesi günü ise hangisi yanlıştır?",
    options: [
      "Elif'in görüşmesi Perşembe günüdür.",
      "Burak'ın görüşmesi Cuma günüdür.",
      "Ceyda'nın görüşmesi Cumartesi günüdür.",
      "Faruk'un görüşmesi Çarşamba günüdür.",
      "Ceyda'nın görüşmesi Çarşamba günüdür."
    ],
    correctIndex: 4,
    explanation: "Ceyda Çarşamba değil, Cumartesi günündedir."
  },

  // --- MATEMATİK & GEOMETRİ (31 - 60) ---
  {
    id: "deneme1-m-31",
    subject: "Matematik",
    question: "a, b, c pozitif tam sayılar olmak üzere (a + 3b) * (c + 2) = 24 eşitliği veriliyor. Aşağıdakilerden hangisi kesinlikle çift sayıdır?",
    options: [
      "a + b",
      "a * b + c",
      "a + c",
      "a * c + b",
      "a * b * c"
    ],
    correctIndex: 0,
    explanation: "(a + 3b) çift sayı olmalıdır, dolayısıyla a ve b aynı teklik/çiftliktedir. a + b kesinlikle çift sayıdır."
  },
  {
    id: "deneme1-m-32",
    subject: "Matematik",
    question: "Dört basamaklı 3a5b sayısı 15 ile tam bölünebilen bir çift sayıdır. Buna göre a'nin alabileceği farklı değerlerin toplamı kaçtır?",
    options: [
      "12",
      "15",
      "18",
      "21",
      "24"
    ],
    correctIndex: 0,
    explanation: "Çift ve 15'e bölündüğü için b = 0'dır. 3 + a + 5 + 0 = 8 + a (3'ün katı olmalı). a = 1, 4, 7. Toplam = 12."
  },
  {
    id: "deneme1-m-33",
    subject: "Matematik",
    question: "(0,18 / 0,03) + (0,008 / 0,002) - (1,2 / 0,4) işleminin sonucu kaçtır?",
    options: [
      "5",
      "7",
      "9",
      "11",
      "13"
    ],
    correctIndex: 1,
    explanation: "6 + 4 - 3 = 7."
  },
  {
    id: "deneme1-m-34",
    subject: "Matematik",
    question: "(3^(x+2) + 3^(x+1)) / 3^(x-1) = 108 olduğuna göre x kaçtır?",
    options: [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    correctIndex: 1,
    explanation: "3^(x+1)*(3 + 1) / 3^(x-1) = 4 * 3^2 = 36. Eşitlikten x = 2 bulunur."
  },
  {
    id: "deneme1-m-35",
    subject: "Matematik",
    question: "√75 - √27 + (12 / √3) işleminin sonucu kaçtır?",
    options: [
      "4√3",
      "6√3",
      "8√3",
      "9√3",
      "12√3"
    ],
    correctIndex: 1,
    explanation: "5√3 - 3√3 + 4√3 = 6√3."
  },
  {
    id: "deneme1-m-36",
    subject: "Matematik",
    question: "|3x - 9| + |x - 3| = 16 eşitliğini sağlayan x değerlerinin toplamı kaçtır?",
    options: [
      "4",
      "6",
      "8",
      "10",
      "12"
    ],
    correctIndex: 1,
    explanation: "4|x - 3| = 16 => |x - 3| = 4. x = 7 veya x = -1. Toplam = 6."
  },
  {
    id: "deneme1-m-37",
    subject: "Matematik",
    question: "((x^2 - 16) / (x^2 + 4x)) : ((x - 4) / x) ifadesinin en sade şekli nedir?",
    options: [
      "1",
      "x",
      "x - 4",
      "x + 4",
      "1/x"
    ],
    correctIndex: 0,
    explanation: "((x-4)(x+4) / x(x+4)) * (x / (x-4)) = 1."
  },
  {
    id: "deneme1-m-38",
    subject: "Matematik",
    question: "a, b, c sayıları sırasıyla 2, 3, 5 ile orantılıdır. 3a + 2b - c = 28 olduğuna göre a + b + c kaçtır?",
    options: [
      "30",
      "40",
      "50",
      "60",
      "70"
    ],
    correctIndex: 1,
    explanation: "a=2k, b=3k, c=5k. 6k + 6k - 5k = 7k = 28 => k = 4. Toplam = 10k = 40."
  },
  {
    id: "deneme1-m-39",
    subject: "Matematik",
    question: "Bir telin ucundan 1/6'sı kesilince orta noktası 5 cm kaymaktadır. Telin ilk boyu kaç cm'dir?",
    options: [
      "45",
      "60",
      "75",
      "90",
      "120"
    ],
    correctIndex: 1,
    explanation: "Kesilen miktarın yarısı kayar -> Kesilen = 10 cm. 10 * 6 = 60 cm."
  },
  {
    id: "deneme1-m-40",
    subject: "Matematik",
    question: "Bir babanın yaşı iki çocuğunun yaşları toplamının 3 katıdır. 6 yıl sonra babanın yaşı çocuklarının yaşları toplamının 2 katı olacağına göre babanın bugünkü yaşı kaçtır?",
    options: [
      "36",
      "42",
      "48",
      "54",
      "60"
    ],
    correctIndex: 3,
    explanation: "Çocuklar toplamı x, Baba 3x. 3x + 6 = 2(x + 12) => x = 18. Baba = 3 * 18 = 54."
  },
  {
    id: "deneme1-m-41",
    subject: "Matematik",
    question: "Bir mağaza ürünü %40 kârla satarken etiketi üzerinden %20 indirim uyguluyor. Mağazanın kâr oranı yüzde kaçtır?",
    options: [
      "%12",
      "%15",
      "%18",
      "%20",
      "%24"
    ],
    correctIndex: 0,
    explanation: "Maliyet 100, Etiket 140. %20 indirimle 140 - 28 = 112. Kâr %12."
  },
  {
    id: "deneme1-m-42",
    subject: "Matematik",
    question: "480 km mesafedeki iki kentten karşılıklı yola çıkan araçların hızları 70 km/s ve 50 km/s'dir. Kaç saat sonra karşılaşırlar?",
    options: [
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    correctIndex: 1,
    explanation: "480 / (70 + 50) = 480 / 120 = 4 saat."
  },
  {
    id: "deneme1-m-43",
    subject: "Matematik",
    question: "Şeker oranı %20 olan 60 gr karışıma 15 gr şeker ve 25 gr su ekleniyor. Yeni karışımın şeker oranı yüzde kaçtır?",
    options: [
      "%24",
      "%27",
      "%30",
      "%32",
      "%35"
    ],
    correctIndex: 1,
    explanation: "İlk şeker 12 gr. Yeni şeker 27 gr. Toplam kütle 100 gr. Şeker oranı %27."
  },
  {
    id: "deneme1-m-44",
    subject: "Matematik",
    question: "Ahmet işin 1/3'ünü 4 günde, Mehmet 1/2'sini 9 günde yapıyor. İkisi birlikte işin tamamını kaç günde yapar?",
    options: [
      "5",
      "6",
      "7.2",
      "8",
      "9"
    ],
    correctIndex: 2,
    explanation: "Ahmet tamamını 12 günde, Mehmet 18 günde yapar. (1/12 + 1/18) = 5/36 => 36/5 = 7.2 gün."
  },
  {
    id: "deneme1-m-45",
    subject: "Matematik",
    question: "Sınıfın %60'ı matematikten, %50'si fizikten başarılıdır. %20'si her iki dersten de başarısızdır. Her iki dersten de başarılı öğrenci sayısı 6 olduğuna göre sınıf mevcudu kaçtır?",
    options: [
      "20",
      "30",
      "40",
      "50",
      "60"
    ],
    correctIndex: 0,
    explanation: "Başarılılar birleşimi %80. Kesişim %60 + %50 - %80 = %30. %30'u 6 ise tamamı 20 kişidir."
  },
  {
    id: "deneme1-m-46",
    subject: "Matematik",
    question: "A = {1, 2, 3, 4, 5, 6, 7} kümesinin 3 elemanlı alt kümelerinin kaç tanesinde en az bir çift sayı bulunur?",
    options: [
      "25",
      "30",
      "31",
      "34",
      "35"
    ],
    correctIndex: 2,
    explanation: "Tüm 3'lü alt kümeler C(7,3)=35. Sadece tek sayılardan C(4,3)=4. 35 - 4 = 31."
  },
  {
    id: "deneme1-m-47",
    subject: "Matematik",
    question: "4 kırmızı, 5 mavi, 3 sarı bilye bulunan torbadan çekilen 2 bilyenin aynı renk olma olasılığı kaçtır?",
    options: [
      "19/66",
      "23/66",
      "25/66",
      "29/66",
      "31/66"
    ],
    correctIndex: 0,
    explanation: "Örnek uzay C(12,2)=66. İstenen C(4,2)+C(5,2)+C(3,2) = 6 + 10 + 3 = 19 => 19/66."
  },
  {
    id: "deneme1-m-48",
    subject: "Matematik",
    question: "f(2x + 1) = x^2 + 3x - 2 olduğuna göre f(5) değeri kaçtır?",
    options: [
      "4",
      "6",
      "8",
      "10",
      "12"
    ],
    correctIndex: 2,
    explanation: "2x + 1 = 5 => x = 2. f(5) = 2^2 + 3(2) - 2 = 8."
  },
  {
    id: "deneme1-m-49",
    subject: "Matematik",
    question: "360 çamaşır makinesinin bulunduğu mağazada A markası 120°, B markası 150° açıya sahiptir. C markasının makine sayısı kaçtır?",
    options: [
      "60",
      "80",
      "90",
      "100",
      "120"
    ],
    correctIndex: 2,
    explanation: "C açısı = 360 - (120 + 150) = 90°. 360 * (90/360) = 90 adet."
  },
  {
    id: "deneme1-m-50",
    subject: "Matematik",
    question: "A markasının (120 adet) %25'i, B markasının (150 adet) %40'ı satılmıştır. Satılan toplam makine sayısı kaçtır?",
    options: [
      "75",
      "90",
      "105",
      "120",
      "135"
    ],
    correctIndex: 1,
    explanation: "A'dan 30 adet, B'den 60 adet satılmıştır. Toplam = 90 adet."
  },
  {
    id: "deneme1-m-51",
    subject: "Matematik",
    question: "B markasının fiyatı A markasından %20 pahalıdır. A markası 10.000 TL olduğuna göre B markasının fiyatı kaç TL'dir?",
    options: [
      "11.000",
      "11.500",
      "12.000",
      "12.500",
      "13.000"
    ],
    correctIndex: 2,
    explanation: "10.000 + 10.000 * 0.20 = 12.000 TL."
  },
  {
    id: "deneme1-m-52",
    subject: "Matematik",
    question: "C markasının makine sayısı (90), A ve B markalarının toplam sayısının (270) yüzde kaçıdır?",
    options: [
      "%25",
      "%33.3",
      "%40",
      "%50",
      "%60"
    ],
    correctIndex: 1,
    explanation: "90 / 270 = 1/3 = %33.3."
  },
  {
    id: "deneme1-m-53",
    subject: "Matematik",
    question: "S(K) = (Rakamlar toplamının 3 katı) - (Rakamlar çarpımı) olarak tanımlanıyor. S(35) sonucu kaçtır?",
    options: [
      "7",
      "9",
      "11",
      "13",
      "15"
    ],
    correctIndex: 1,
    explanation: "S(35) = 3*(3+5) - (3*5) = 24 - 15 = 9."
  },
  {
    id: "deneme1-m-54",
    subject: "Matematik",
    question: "S(ab) = 0 şartını sağlayan iki basamaklı ab sayısı için a * b çarpımı kaçtır?",
    options: [
      "6",
      "9",
      "12",
      "18",
      "36"
    ],
    correctIndex: 4,
    explanation: "3(a+b) = a*b. a=6, b=6 için 3(12) = 36 = 6*6. Çarpım 36'dır."
  },
  {
    id: "deneme1-m-55",
    subject: "Matematik",
    question: "Aşağıdaki sayılardan hangisi için S(K) değeri negatif bir sayıdır?",
    options: [
      "18",
      "27",
      "45",
      "64",
      "59"
    ],
    correctIndex: 4,
    explanation: "S(59) = 3*(5+9) - (5*9) = 42 - 45 = -3 (Negatif)."
  },
  {
    id: "deneme1-m-56",
    subject: "Matematik",
    question: "Rakamları farklı iki basamaklı en büyük ab sayısı (98) için S(98) değeri kaçtır?",
    options: [
      "-21",
      "-18",
      "-15",
      "12",
      "24"
    ],
    correctIndex: 0,
    explanation: "S(98) = 3*(9+8) - (9*8) = 51 - 72 = -21."
  },
  {
    id: "deneme1-m-57",
    subject: "Matematik",
    question: "ABC üçgeninde [AD] iç açıortaydır. |AB| = 6 cm, |AC| = 10 cm, |BD| = 3 cm ise |DC| = x kaç cm'dir?",
    options: [
      "4",
      "5",
      "6",
      "7",
      "8"
    ],
    correctIndex: 1,
    explanation: "İç açıortay teoremi: 6/10 = 3/x => 6x = 30 => x = 5 cm."
  },
  {
    id: "deneme1-m-58",
    subject: "Matematik",
    question: "Kısa kenarı 12 m, uzun kenarı 16 m olan dikdörtgen şeklindeki bahçenin köşegen uzunluğu kaç metredir?",
    options: [
      "18",
      "20",
      "22",
      "24",
      "25"
    ],
    correctIndex: 1,
    explanation: "12-16-20 özel dik üçgeninden köşegen = 20 m."
  },
  {
    id: "deneme1-m-59",
    subject: "Matematik",
    question: "Yarıçapı 6 cm olan dairesel bir pistin çevresi kaç cm'dir? (π = 3 alınız)",
    options: [
      "18",
      "24",
      "36",
      "48",
      "72"
    ],
    correctIndex: 2,
    explanation: "Çevre = 2 * π * r = 2 * 3 * 6 = 36 cm."
  },
  {
    id: "deneme1-m-60",
    subject: "Matematik",
    question: "Analitik düzlemde A(2, 5) ve B(8, 13) noktaları arasındaki uzaklık kaç birimdir?",
    options: [
      "8",
      "10",
      "12",
      "13",
      "15"
    ],
    correctIndex: 1,
    explanation: "d = √((8-2)^2 + (13-5)^2) = √(36 + 64) = √100 = 10 birim."
  },

  // --- TARİH (61 - 87) ---
  {
    id: "deneme1-h-61",
    subject: "Tarih",
    question: "İslamiyet öncesi Türk devletlerinde 'Kut' anlayışının aşağıdakilerden hangisine ortam hazırladığı savunulamaz?",
    options: [
      "Taht kavgalarının ve siyasi istikrarsızlıkların yaşanmasına",
      "Ülkenin hanedan üyelerinin ortak malı sayılmasına",
      "Merkezî otoritenin zaman zaman zayıflamasına",
      "Hükümdarın ilahi bir nitelik kazanarak din adamı sayılmasına",
      "Veraset sisteminde belirsizliklerin ortaya çıkmasına"
    ],
    correctIndex: 3,
    explanation: "Türk hükümdarları din adamı veya teokratik lider sayılmamıştır."
  },
  {
    id: "deneme1-h-62",
    subject: "Tarih",
    question: "İlk Türk-İslam devletlerinde görülen aşağıdaki uygulamalardan hangisi devletin İslamlaşma sürecine girdiğinin doğrudan göstergesidir?",
    options: [
      "Ordu-millet anlayışının korunması",
      "Hükümdarların Sultan ve Halife adına hutbe okutması",
      "İkta sisteminin uygulanmaya başlanması",
      "Türkçe kelimelerin resmî yazışmalarda kullanılması",
      "İkili devlet teşkilatının devam ettirilmesi"
    ],
    correctIndex: 1,
    explanation: "Halife adına hutbe okutmak ve Sultan unvanı almak İslamlaşmanın resmi simgesidir."
  },
  {
    id: "deneme1-h-63",
    subject: "Tarih",
    question: "Büyük Selçuklu Devleti döneminde kurulan Nizamiye Medreselerinin amaçları arasında hangisi yer almaz?",
    options: [
      "Bâtınilik propagandasına karşı fikri mücadele vermek",
      "Devlet kademelerine nitelikli bürokrat yetiştirmek",
      "Şiilik fikrinin Anadolu'da yayılmasını kolaylaştırmak",
      "İslam dünyasındaki mezhep çatışmalarını engellemek",
      "Din ve pozitif bilimlerin bir arada okutulmasını sağlamak"
    ],
    correctIndex: 2,
    explanation: "Nizamiye Medreseleri Şiilik propaganda tehdidine karşı Sünni akideyi korumak için kurulmuştur."
  },
  {
    id: "deneme1-h-64",
    subject: "Tarih",
    question: "Türkiye Selçuklu Devleti'nde ticareti geliştirmek için yapılan hangi faaliyet 'Devlet Sigortacılığı' sisteminin uygulandığını gösterir?",
    options: [
      "Kervansarayların inşa edilerek tüccarlara ücretsiz konaklama sunulması",
      "Saldırıya uğrayan yabancı tüccarların zararlarının devlet hazinesinden karşılanması",
      "Sinop ve Alanya liman kentlerinin fethedilmesi",
      "Gümrük vergilerinin tüccarlar lehine düşürülmesi",
      "Venedik ve Cenevizlilerle ticari antlaşmalar yapılması"
    ],
    correctIndex: 1,
    explanation: "Zarar gören tüccarların zararının devletçe karşılanması tarihteki ilk devlet sigortacılığı örneğidir."
  },
  {
    id: "deneme1-h-65",
    subject: "Tarih",
    question: "Osmanlı Devleti'nin kuruluş döneminde uyguladığı İskân Politikası ile ilgili hangisi yanlıştır?",
    options: [
      "Göçebe Türkmenlerin yerleşik hayata geçirilmesi amaçlanmıştır.",
      "Fethedilen Balkan topraklarında Türk-İslam nüfusu artırılmıştır.",
      "Aralarında husumet bulunan aileler farklı bölgelere yerleştirilmiştir.",
      "İskân edilen halkın vergi ödeme yükümlülüğü tamamen kaldırılmıştır.",
      "Bölgede kalıcı hakimiyet kurmak ve üretimi artırmak hedeflenmiştir."
    ],
    correctIndex: 3,
    explanation: "İskân edilen halk üretime geçince düzenli vergiye bağlanmıştır; muafiyet geçicidir."
  },
  {
    id: "deneme1-h-66",
    subject: "Tarih",
    question: "Osmanlı Divan-ı Hümayun ile ilgili olarak aşağıdakilerden hangisi söylenemez?",
    options: [
      "Hem bir karar organı hem de en yüksek yargı merciidir.",
      "Divan kararları Mühimme Defterlerine kaydedilir.",
      "Fatih döneminden itibaren sadrazamlar başkanlık etmiştir.",
      "Divanda alınan kararlar padişahın onayı olmadan kesinleşmez.",
      "Seyfiye sınıfının divandaki tek temsilcisi Şeyhülislam'dır."
    ],
    correctIndex: 4,
    explanation: "Şeyhülislam İlmiye sınıfındandır. Seyfiye temsilcileri Sadrazam, Vezirler ve Kaptan-ı Derya'dır."
  },
  {
    id: "deneme1-h-67",
    subject: "Tarih",
    question: "Osmanlı Tımar Sistemi'nin bozulmasının sonuçları arasında hangisi gösterilemez?",
    options: [
      "Kapıkulu Askerlerinin sayısının ve hazineye yükünün artması",
      "Tarımsal üretimin düşmesi ve vergi gelirlerinin azalması",
      "Celali İsyanlarının patlak vermesi ve köyden kente göç",
      "İltizam sisteminin yaygınlaşması",
      "Eyalet askerlerinin (Tımarlı Sipahilerin) sayısının artması"
    ],
    correctIndex: 4,
    explanation: "Tımar bozulunca Tımarlı Sipahi sayısı azalmıştır, artmamıştır."
  },
  {
    id: "deneme1-h-68",
    subject: "Tarih",
    question: "XVII. yüzyılda çıkarılan Celali İsyanları'nın nedenleri arasında hangisi gösterilemez?",
    options: [
      "Tımar sisteminin bozulması ve rüşvetin yaygınlaşması",
      "Uzun süren savaşlar nedeniyle halktan ağır vergiler alınması",
      "Fransız İhtilali'nin etkisiyle milliyetçilik akımının yayılması",
      "Yerel yöneticilerin halka baskı yapması",
      "Ağır ekonomik şartlar nedeniyle toprağını terk eden köylüler"
    ],
    correctIndex: 2,
    explanation: "Fransız İhtilali (1789) XVIII. yüzyıl sonudur, XVII. yüzyıl Celali isyanlarıyla ilgisi yoktur."
  },
  {
    id: "deneme1-h-69",
    subject: "Tarih",
    question: "XVII. yüzyıl padişahı II. Osman (Genç Osman) ile ilgili verilen bilgilerden hangisi doğrudur?",
    options: [
      "Yeniçeri Ocağı'nı resmen kaldıran ilk padişahtır.",
      "Osmanlı tarihinde ilk kez ıslahat teşebbüsü nedeniyle katledilen padişahtır.",
      "Batı tarzı askeri ocakları kuran ilk hükümdardır.",
      "Nizam-ı Cedit ordusunu kurmuştur.",
      "Tanzimat Fermanı'nı ilan eden padişahtır."
    ],
    correctIndex: 1,
    explanation: "Genç Osman ıslahat düşüncesi nedeniyle katledilen ilk padişahtır."
  },
  {
    id: "deneme1-h-70",
    subject: "Tarih",
    question: "Küçük Kaynarca Antlaşması (1774) ile Osmanlı Devleti ilk kez aşağıdakilerden hangisini kaybetmiştir?",
    options: [
      "Kırım'ın bağımsızlığını tanıyarak halkı Müslüman olan bir toprağı",
      "Mora Yarımadası'nı",
      "Belgrat ve Sırbistan bölgesini",
      "Girit Adası'nı",
      "Mısır ve Suriye topraklarını"
    ],
    correctIndex: 0,
    explanation: "Küçük Kaynarca ile Kırım bağımsız olmuş ve ilk kez halkı Müslüman toprak kaybedilmiştir."
  },
  {
    id: "deneme1-h-71",
    subject: "Tarih",
    question: "III. Selim döneminde gerçekleştirilen radikal ıslahat hareketlerine verilen genel isim nedir?",
    options: [
      "Tanzimat-ı Hayriye",
      "Meşrutiyet",
      "Nizam-ı Cedit",
      "Sekban-ı Cedit",
      "Islahat Fermanı"
    ],
    correctIndex: 2,
    explanation: "III. Selim dönemi ıslahatlarına Nizam-ı Cedit denir."
  },
  {
    id: "deneme1-h-72",
    subject: "Tarih",
    question: "Tanzimat Fermanı (1839) ile ilgili olarak hangisi yanlıştır?",
    options: [
      "Padişah kendi gücünün üzerinde kanun gücünü kabul etmiştir.",
      "Müslüman ve gayrimüslim tebaa kanun önünde eşit sayılmıştır.",
      "Rüşvet ve iltizamın kaldırılacağı vurgulanmıştır.",
      "Anayasal düzene geçişin ilk adımı kabul edilir.",
      "Avrupalı devletlerin baskısı ve direktifleriyle hazırlanmıştır."
    ],
    correctIndex: 4,
    explanation: "Tanzimat Fermanı dış baskıyla değil Osmanlı bürokrasisinin iradesiyle hazırlanmıştır."
  },
  {
    id: "deneme1-h-73",
    subject: "Tarih",
    question: "Kanun-ı Esasi (1876) ile başlayan I. Meşrutiyet Dönemi'nin en belirgin özelliği hangisidir?",
    options: [
      "Padişahın tüm yetkilerini parlamentoya devretmesi",
      "Halkın ilk kez kısıtlı da olsa yönetime ve seçime katılması",
      "Çok partili siyasi hayata geçilmesi",
      "Halifelik makamının tamamen kaldırılması",
      "Gayrimüslimlerin askerlik yükümlülüğünün kaldırılması"
    ],
    correctIndex: 1,
    explanation: "I. Meşrutiyet ile Türk tarihinde halk ilk kez seçime ve yönetime katılmıştır."
  },
  {
    id: "deneme1-h-74",
    subject: "Tarih",
    question: "Tüm Osmanlı tebaasını din, dil, ırk ayrımı gözetmeksizin eşit vatandaş kabul eden fikir akımı nedir?",
    options: [
      "İslamcılık",
      "Türkçülük",
      "Osmanlıcılık",
      "Batıcılık",
      "Adem-i Merkeziyetçilik"
    ],
    correctIndex: 2,
    explanation: "Osmanlıcılık akımı tüm tebaayı din-ırk farkı gözetmeden eşit vatandaş kabul eder."
  },
  {
    id: "deneme1-h-75",
    subject: "Tarih",
    question: "Mustafa Kemal'in 'Gazeteci Şerif Bey' takma adıyla katıldığı Trablusgarp Savaşı ile ilgili hangisi yanlıştır?",
    options: [
      "İtalya'nın sömürge arayışı nedeniyle başlamıştır.",
      "Mustafa Kemal savaşa Gazeteci Şerif Bey adıyla katılmıştır.",
      "Derne ve Tobruk'ta yerli halk örgütlenerek başarı kazanılmıştır.",
      "Uşi Antlaşması ile On İki Ada geçici olarak İtalya'ya bırakılmıştır.",
      "Osmanlı bu savaşla Kuzey Afrika'daki son toprağını kaybetmemiştir."
    ],
    correctIndex: 4,
    explanation: "Uşi Antlaşması ile Osmanlı Kuzey Afrika'daki son toprağı Trablusgarp ve Bingazi'yi kaybetmiştir."
  },
  {
    id: "deneme1-h-76",
    subject: "Tarih",
    question: "Osmanlı'nın Kafkas Cephesi'nde kaybettiği Kars, Ardahan ve Batum'u geri aldığı antlaşma hangisidir?",
    options: [
      "Mondros Mütarekesi",
      "Brest-Litowsk Antlaşması",
      "Sevr Antlaşması",
      "Gümrü Antlaşması",
      "Ankara Antlaşması"
    ],
    correctIndex: 1,
    explanation: "Brest-Litowsk Antlaşması (3 Mart 1918) ile Kars, Ardahan ve Batum geri alınmıştır."
  },
  {
    id: "deneme1-h-77",
    subject: "Tarih",
    question: "Amasya Genelgesi'nin (22 Haziran 1919) Türk inkılap tarihindeki en önemli yeri nedir?",
    options: [
      "Milli Mücadele'nin amacı, gerekçesi ve yönteminin ilk kez ihtilalci dille açıklanması",
      "Manda ve himaye fikrinin ilk kez kesin reddedilmesi",
      "Misak-ı Milli sınırlarının çizilmesi",
      "Temsil Heyeti'nin ilk kez yürütme yetkisini kullanması",
      "Düzenli ordunun kurulması kararı"
    ],
    correctIndex: 0,
    explanation: "Amasya Genelgesi Kurtuluş Savaşı'nın amacı, gerekçesi ve yöntemini ilan eden ihtilal bildirisidir."
  },
  {
    id: "deneme1-h-78",
    subject: "Tarih",
    question: "Erzurum Kongresi'nde alınan 'Manda ve himaye kabul olunamaz' kararı hangi Atatürk ilkesiyle doğrudan ilgilidir?",
    options: [
      "Devletçilik",
      "Bağımsızlık / Milliyetçilik",
      "Laiklik",
      "Halkçılık",
      "İnkılapçılık"
    ],
    correctIndex: 1,
    explanation: "Manda ve himayenin reddi tam bağımsızlık ve Milliyetçilik ilkesiyle ilgilidir."
  },
  {
    id: "deneme1-h-79",
    subject: "Tarih",
    question: "Misak-ı Millî kararlarında aşağıdakilerden hangisiyle ilgili bir hüküm yer almaz?",
    options: [
      "Kapitülasyonlar ve mali kısıtlamalar",
      "Azınlık hakları ve Müslümanlar",
      "Arap toprakları ve Kars-Ardahan-Batum referandumu",
      "Boğazların güvenliği ve ticarete açılması",
      "Cumhuriyet rejimi ve inkılapların yapılması"
    ],
    correctIndex: 4,
    explanation: "Misak-ı Milli kararları tamamen sınırlar ve bağımsızlıkla ilgilidir; rejim değişikliği geçmez."
  },
  {
    id: "deneme1-h-80",
    subject: "Tarih",
    question: "TBMM Hükümeti'nin uluslararası alanda kazandığı ilk askeri ve siyasi başarı antlaşması hangisidir?",
    options: [
      "Moskova Antlaşması",
      "Kars Antlaşması",
      "Gümrü Antlaşması",
      "Mudanya Mütarekesi",
      "Ankara Antlaşması"
    ],
    correctIndex: 2,
    explanation: "Gümrü Antlaşması (3 Aralık 1920) TBMM'nin ilk askeri ve siyasi başarısıdır."
  },
  {
    id: "deneme1-h-81",
    subject: "Tarih",
    question: "I. İnönü Zaferi sonrası yaşanan gelişmelerden hangisi ulusal (iç) alandaki bir başarıdır?",
    options: [
      "İstiklal Marşı'nın kabul edilmesi (12 Mart 1921)",
      "Londra Konferansı'nın toplamanması",
      "Moskova Antlaşması'nın imzalanması",
      "Afganistan ile Dostluk Antlaşması",
      "İtilaf Devletleri'nin Sevr teklifleri"
    ],
    correctIndex: 0,
    explanation: "İstiklal Marşı'nın kabulü ulusal (iç) başarıdır; diğerleri uluslararasıdır."
  },
  {
    id: "deneme1-h-82",
    subject: "Tarih",
    question: "Mustafa Kemal Paşa'ya 'Başkomutanlık' yetkisi ve 'Gazilik/Mareşallik' unvanı verilen savaşlar sırasıyla hangisidir?",
    options: [
      "I. İnönü - II. İnönü",
      "Kütahya-Eskişehir - Sakarya Meydan Muharebesi",
      "Sakarya - Büyük Taarruz",
      "Çanakkale - Sakarya",
      "Başkomutanlık - Sakarya"
    ],
    correctIndex: 1,
    explanation: "Kütahya-Eskişehir sonrası Başkomutanlık yetkisi, Sakarya sonrası Mareşallik unvanı verilmiştir."
  },
  {
    id: "deneme1-h-83",
    subject: "Tarih",
    question: "Lozan'da komisyona bırakılıp 1936 Montrö Sözleşmesi ile tam egemenliğe kavuşulan konu nedir?",
    options: [
      "Duyun-ı Umumiye",
      "Hatay sorunu",
      "Boğazlar Komisyonu'nun varlığı",
      "Musul sınırı",
      "Yabancı okullar"
    ],
    correctIndex: 2,
    explanation: "1936 Montrö Sözleşmesi ile Boğazlar Komisyonu kaldırılıp tüm yetki Türkiye'ye geçmiştir."
  },
  {
    id: "deneme1-h-84",
    subject: "Tarih",
    question: "Cumhuriyet döneminde 'Toplumsal Alanda' yapılan inkılap hangisidir?",
    options: [
      "Soyadı Kanunu'nun kabul edilmesi (1934)",
      "Saltanatın kaldırılması (1922)",
      "Tevhid-i Tedrisat Kanunu (1924)",
      "Kabotaj Kanunu (1926)",
      "Aşar vergisinin kaldırılması (1925)"
    ],
    correctIndex: 0,
    explanation: "Soyadı Kanunu toplumsal alanda yapılan düzenlemelerdendir."
  },
  {
    id: "deneme1-h-85",
    subject: "Tarih",
    question: "Atatürk'ün Devletçilik ilkesinin 1930'lu yıllarda zorunlu uygulanmasının temel nedeni nedir?",
    options: [
      "Şeyh Sait İsyanı",
      "1929 Dünya Ekonomik Bunalımı ve özel sektörün sermaye yetersizliği",
      "Terakkiperver Partisi'nin kapatılması",
      "II. Dünya Savaşı'nın başlaması",
      "Menemen Olayı"
    ],
    correctIndex: 1,
    explanation: "1929 Büyük Buhranı ve sermaye yetersizliği Devletçilik modelini zorunlu kılmıştır."
  },
  {
    id: "deneme1-h-86",
    subject: "Tarih",
    question: "II. Dünya Savaşı sırasında Türkiye'yi savaşa sokmak için İsmet İnönü ile yapılan görüşmeler hangisidir?",
    options: [
      "Yalta ve Potsdam Konferansları",
      "Adana ve Kahire Görüşmeleri",
      "Briand-Kellogg ve Locarno",
      "San Francisco Konferansı",
      "Sadabat Paktı"
    ],
    correctIndex: 1,
    explanation: "İnönü ile Churchill arasında Adana ve Kahire Görüşmeleri yapılmıştır."
  },
  {
    id: "deneme1-h-87",
    subject: "Tarih",
    question: "II. Dünya Savaşı sonrası ABD'nin Türkiye ve Yunanistan'a askeri yardım yaptığı doktrin nedir?",
    options: [
      "Marshall Planı",
      "Truman Doktrini",
      "Eisenhower Doktrini",
      "Schuman Bildirgesi",
      "Balfour Deklarasyonu"
    ],
    correctIndex: 1,
    explanation: "1947 Truman Doktrini ile Türkiye ve Yunanistan'a askeri yardım yapılmıştır."
  },

  // --- COĞRAFYA (88 - 105) ---
  {
    id: "deneme1-c-88",
    subject: "Coğrafya",
    question: "Aşağıdaki özelliklerden hangisi Türkiye'nin 'Matematiksel (Mutlak) Konumu' ile açıklanamaz?",
    options: [
      "Aynı anda dört mevsim özelliklerinin yaşanabilmesi",
      "Güneyden kuzeye gidildikçe güneş ışınlarının geliş açısının küçülmesi",
      "En güneyi ile en kuzeyi arasında 666 km mesafe bulunması",
      "21 Haziran'da kuzeye gidildikçe gündüz süresinin uzaması",
      "Orta kuşakta yer almasına bağlı Akdeniz iklim kuşağında olması"
    ],
    correctIndex: 0,
    explanation: "Aynı anda 4 mevsim özellikleri yer şekillerinin (özel/göreceli konum) sonucudur."
  },
  {
    id: "deneme1-c-89",
    subject: "Coğrafya",
    question: "Türkiye'de akarsuların genel özellikleri göz önüne alındığında hangisi yanlıştır?",
    options: [
      "Yatak eğimleri ve akış hızları yüksektir.",
      "Hidroelektrik potansiyelleri yüksektir.",
      "Rejimleri genellikle düzensizdir.",
      "Ulaşıma ve taşımacılığa son derece elverişlidirler.",
      "Denge profiline henüz ulaşmamışlardır."
    ],
    correctIndex: 3,
    explanation: "Türkiye akarsuları akış hızı yüksek ve eğimli olduğundan ulaşıma elverişli değildir."
  },
  {
    id: "deneme1-c-90",
    subject: "Coğrafya",
    question: "Aşağıdaki dağ eşleştirmelerinden hangisi 'Kırık Dağlar (Horst)' grubuna örnektir?",
    options: [
      "Ağrı Dağı - Erciyes Dağı",
      "Kaz Dağları - Yunt Dağı",
      "Kaçkar Dağları - Toroslar",
      "Süphan Dağı - Nemrut Dağı",
      "Köroğlu Dağları - Ilgaz"
    ],
    correctIndex: 1,
    explanation: "Kaz Dağları ve Yunt Dağı Ege Bölgesi'ndeki kırık dağlardandır."
  },
  {
    id: "deneme1-c-91",
    subject: "Coğrafya",
    question: "Karadeniz İklimi ile ilgili olarak aşağıdakilerden hangisi söylenemez?",
    options: [
      "Yıllık ve günlük sıcaklık farkları en az olan iklimdir.",
      "Yıllık yağış miktarının en fazla olduğu iklim türüdür.",
      "Doğal bitki örtüsü ormanlardır.",
      "En fazla yağışı ilkbahar mevsiminde almaktadır.",
      "Bulutluluk oranı oldukça yüksektir."
    ],
    correctIndex: 3,
    explanation: "Karadeniz İklimi en fazla yağışı Sonbahar mevsiminde alır."
  },
  {
    id: "deneme1-c-92",
    subject: "Coğrafya",
    question: "Karstik şekillerin (Mağara, obruk, traverten) en yaygın görüldüğü bölge ve kayaç türü nedir?",
    options: [
      "Akdeniz Bölgesi - Kalker (Kireç Taşı)",
      "İç Anadolu Bölgesi - Granit",
      "Doğu Anadolu Bölgesi - Bazalt",
      "Ege Bölgesi - Jips",
      "Güneydoğu Anadolu - Andezit"
    ],
    correctIndex: 0,
    explanation: "Karstik şekiller Akdeniz Bölgesi'nde Kalker kayaçları üzerinde yaygındır."
  },
  {
    id: "deneme1-c-93",
    subject: "Coğrafya",
    question: "Doğu Karadeniz'de Heyelan olayının çok fazla görülmesinde en etkili faktörler nelerdir?",
    options: [
      "Eğimin fazla olması ve bitki örtüsünün tahribi",
      "Şiddetli yağışlar, killi toprak yapısı ve dik eğim",
      "Deprem riskinin yüksek olması",
      "Bitki örtüsünün seyrek olması",
      "Rüzgar erozyonunun şiddetli olması"
    ],
    correctIndex: 1,
    explanation: "Bol yağış, killi su tutan toprak ve dik eğim heyelanı tetikler."
  },
  {
    id: "deneme1-c-94",
    subject: "Coğrafya",
    question: "Aşağıdaki alanlardan hangisinde nüfusun seyrek olmasının temel nedeni 'engebeli yer şekilleri ve iklimdir'?",
    options: [
      "Çatalca-Kocaeli Platosu",
      "Çukurova Deltası",
      "Hakkâri Yöresi",
      "Bursa Çevresi",
      "Gaziantep Çevresi"
    ],
    correctIndex: 2,
    explanation: "Hakkâri Yöresi dağlık yapısı ve kış şartları nedeniyle nüfusu en seyrek yerlerdendir."
  },
  {
    id: "deneme1-c-95",
    subject: "Coğrafya",
    question: "Türkiye nüfusu ile ilgili ifadelerden hangisi yanlıştır?",
    options: [
      "Nüfusun büyük çoğunluğu hizmet ve sanayi sektöründedir.",
      "Kır nüfusu oranı kent nüfusu oranından daha fazladır.",
      "Nüfus artış hızı son yıllarda düşme eğilimindedir.",
      "Ortalama yaşam süresi uzamaktadır.",
      "Nüfusun okur-yazar oranı %97'nin üzerindedir."
    ],
    correctIndex: 1,
    explanation: "Kent nüfusu %93'ün üzerindedir; kır nüfusu kentten fazla değildir."
  },
  {
    id: "deneme1-c-96",
    subject: "Coğrafya",
    question: "Mera hayvancılığından Besi ve Ahır hayvancılığına geçilmesinin en önemli sonucu nedir?",
    options: [
      "Et ve süt veriminde iklime bağlı dalgalanmaların önlenmesi",
      "Otlak ve mera alanlarının genişletilmesi",
      "Hayvan sayısının katlanarak artması",
      "Yün üretiminin düşmesi",
      "Yem sanayisine ihtiyacın azalması"
    ],
    correctIndex: 0,
    explanation: "Besi hayvancılığı kapalı ortamda yapıldığı için iklim bağımlılığını ve dalgalanmayı önler."
  },
  {
    id: "deneme1-c-97",
    subject: "Coğrafya",
    question: "Kış ılıklığı isteyen ve don olaylarına karşı aşırı hassas ürünler grubu hangisidir?",
    options: [
      "Buğday - Arpa - Mercimek",
      "Zeytin - Turunçgiller - Çay",
      "Şeker Pancarı - Pamuk - Mısır",
      "Ayçiçeği - Tütün - Çavdar",
      "Elma - Üzüm - Patates"
    ],
    correctIndex: 1,
    explanation: "Zeytin, Turunçgiller ve Çay kış ılıklığı arar ve don olayına karşı hassastır."
  },
  {
    id: "deneme1-c-98",
    subject: "Coğrafya",
    question: "GAP projesiyle sulamanın gelmesi Güneydoğu'da hangi ürünün üretiminde patlama sağlamıştır?",
    options: [
      "Fındık",
      "Pamuk",
      "Zeytin",
      "Çay",
      "Tütün"
    ],
    correctIndex: 1,
    explanation: "GAP sulamasıyla Güneydoğu Anadolu Pamuk üretiminde Türkiye birincisi olmuştur."
  },
  {
    id: "deneme1-c-99",
    subject: "Coğrafya",
    question: "Bor Mineralleri ile ilgili olarak hangisi yanlıştır?",
    options: [
      "Dünya rezervlerinin %70'inden fazlası Türkiye'dedir.",
      "Balıkesir, Kütahya, Eskişehir en önemli çıkarım alanlarıdır.",
      "Jet yakıtlarında ve cam-seramikte kullanılır.",
      "İşleme tesisi bulunmamaktadır.",
      "Stratejik öneme sahip bir madendir."
    ],
    correctIndex: 3,
    explanation: "Balıkesir Bandırma ve Eskişehir Kırka'da Bor işleme fabrikalarımız vardır."
  },
  {
    id: "deneme1-c-100",
    subject: "Coğrafya",
    question: "Taş kömürünün Zonguldak çevresinde toplanmasının temel nedeni nedir?",
    options: [
      "Birinci Jeolojik Zaman (Paleozoik) arazisi olması",
      "Üçüncü Jeolojik Zaman faylanması",
      "Volkanik faaliyetler",
      "Karasal iklim koşulları",
      "Akarsu biriktirmesi"
    ],
    correctIndex: 0,
    explanation: "Taş kömürü I. Jeolojik Zaman (Paleozoik) yaşlı arazilerde oluşur."
  },
  {
    id: "deneme1-c-101",
    subject: "Coğrafya",
    question: "Aşağıdaki santrallerden hangisi yenilenebilir/temiz enerji kaynakları arasında yer almaz?",
    options: [
      "Denizli - Kızıldere (Jeotermal)",
      "İzmir - Alaçatı (Rüzgar)",
      "Şanlıurfa - Atatürk Barajı (Hidroelektrik)",
      "Manisa - Soma (Linyit Termik Santrali)",
      "Mersin - Akkuyu (Nükleer Santral)"
    ],
    correctIndex: 3,
    explanation: "Soma Santrali Linyit (Fosil yakıt) kullanır; yenilenebilir değildir."
  },
  {
    id: "deneme1-c-102",
    subject: "Coğrafya",
    question: "Karabük ve Ereğli'de demir-çelik fabrikasının kurulmasındaki temel etken nedir?",
    options: [
      "Demir madeni zenginliği",
      "Enerji kaynağına (Taş kömürü) yakınlık",
      "Pazarlama merkezlerine yakınlık",
      "İklim koşulları",
      "İş gücü ucuzluğu"
    ],
    correctIndex: 1,
    explanation: "Karabük ve Ereğli'de fabrika kurulma nedeni Taş kömürü enerji kaynağına yakınlıktır."
  },
  {
    id: "deneme1-c-103",
    subject: "Coğrafya",
    question: "Deniz turizmi sezonunun en uzun sürdüğü ve güneşlenme süresinin en yüksek olduğu kıyı bölgesi neresidir?",
    options: [
      "Doğu Karadeniz Kıyıları",
      "Güney Ege Kıyıları",
      "Akdeniz Kıyıları",
      "Marmara Kıyıları",
      "Kuzey Ege Kıyıları"
    ],
    correctIndex: 2,
    explanation: "En güneydeki Akdeniz Kıyılarında deniz suyu sıcaklığı ve deniz sezonu en uzundur."
  },
  {
    id: "deneme1-c-104",
    subject: "Coğrafya",
    question: "Kopdağı, Zigana ve Ovit tünelleri hangi hatta ulaşımı kolaylaştırmak için inşa edilmiştir?",
    options: [
      "Doğu Karadeniz'i Doğu Anadolu'ya bağlayan hatta",
      "Akdeniz'i İç Anadolu'ya bağlayan hatta",
      "Ege'yi İç Anadolu'ya bağlayan hatta",
      "Marmara'yı Ege'ye bağlayan hatta",
      "İç Anadolu'yu Güneydoğu'ya bağlayan hatta"
    ],
    correctIndex: 0,
    explanation: "Ovit, Zigana ve Kop tünelleri Doğu Karadeniz kıyısını Erzurum ve Doğu Anadolu'ya bağlar."
  },
  {
    id: "deneme1-c-105",
    subject: "Coğrafya",
    question: "Doğu Karadeniz Projesi (DOKAP) kapsamında öncelikli geliştirilmesi hedeflenen alanlar nelerdir?",
    options: [
      "Ağır Sanayi ve Otomotiv",
      "Yayla Turizmi, Balıkçılık ve Hayvancılık",
      "Bor İşleme ve Nükleer Enerji",
      "Pamuk Üretimi ve İpek Böcekçiliği",
      "Petrol Rafinerisi ve Kimya"
    ],
    correctIndex: 1,
    explanation: "DOKAP projeleri Yayla Turizmi (Yeşil Yol), Balıkçılık ve Hayvancılığa odaklanır."
  },

  // --- VATANDAŞLIK & GÜNCEL BİLGİLER (106 - 120) ---
  {
    id: "deneme1-v-106",
    subject: "Vatandaşlık",
    question: "Kurucu unsurlardan birinin eksikliği nedeniyle hukuki işlemin hiç doğmamış sayılmasına ne ad verilir?",
    options: [
      "Mutlak Butlan",
      "Nisbi Butlan",
      "Yokluk",
      "İptal",
      "Tazminat"
    ],
    correctIndex: 2,
    explanation: "Kurucu unsur noksanlığı durumunda işlem 'Yokluk' kabul edilir."
  },
  {
    id: "deneme1-v-107",
    subject: "Vatandaşlık",
    question: "Türk Medeni Kanunu'na göre Fiil Ehliyetine sahip olmak için gereken şartlar hangisidir?",
    options: [
      "Ergin olmak - Ayırt etme gücüne sahip olmak - Kısıtlı olmamak",
      "Reşit olmak - Dürüst olmak - Türk vatandaşı olmak",
      "18 yaşını doldurmak - Okuma yazma bilmek - Akıl sağlığı",
      "Ayırt etme gücüne sahip olmak - Borcu bulunmamak",
      "Vatandaş olmak - Ergin olmak - Memur olmak"
    ],
    correctIndex: 0,
    explanation: "Fiil ehliyeti: Ergin olmak, Ayırt etme gücüne sahip olmak ve kısıtlı olmamaktır."
  },
  {
    id: "deneme1-v-108",
    subject: "Vatandaşlık",
    question: "1982 Anayasası'na göre TBMM ve Cumhurbaşkanlığı seçimleri kaç yılda bir yapılır?",
    options: [
      "4 yılda bir - Pazar günü",
      "5 yılda bir - Pazar günü",
      "5 yılda bir - Pazartesi günü",
      "6 yılda bir - Pazar günü",
      "4 yılda bir - Cumartesi günü"
    ],
    correctIndex: 1,
    explanation: "Seçimler 5 yılda bir aynı gün Pazar günü yapılır."
  },
  {
    id: "deneme1-v-109",
    subject: "Vatandaşlık",
    question: "1982 Anayasası'na göre TBMM'nin görev ve yetkileri arasında hangisi yer almaz?",
    options: [
      "Kanun koymak, değiştirmek ve kaldırmak",
      "Genel ve özel af ilanına karar vermek",
      "Para basılmasına karar vermek",
      "Milletlerarası antlaşmaları onaylamayı uygun bulmak",
      "Olağanüstü Hâl (OHAL) ilan etmek"
    ],
    correctIndex: 4,
    explanation: "OHAL ilan etme yetkisi Cumhurbaşkanı'na aittir; TBMM onaylar/uzatır."
  },
  {
    id: "deneme1-v-110",
    subject: "Vatandaşlık",
    question: "Anayasa Mahkemesi kaç üyeden oluşur ve üyelerin görev süresi kaç yıldır?",
    options: [
      "15 Üye - 12 Yıl",
      "17 Üye - 9 Yıl",
      "15 Üye - 6 Yıl",
      "12 Üye - 10 Yıl",
      "11 Üye - 12 Yıl"
    ],
    correctIndex: 0,
    explanation: "Anayasa Mahkemesi 15 üyeden oluşur ve görev süreleri 12 yıldır."
  },
  {
    id: "deneme1-v-111",
    subject: "Vatandaşlık",
    question: "Adli yargı alanındaki en yüksek derece mahkemesi aşağıdakilerden hangisidir?",
    options: [
      "Danıştay",
      "Yargıtay",
      "Anayasa Mahkemesi",
      "Uyuşmazlık Mahkemesi",
      "Sayıştay"
    ],
    correctIndex: 1,
    explanation: "Adli yargı temyiz mercii Yargıtay'dır."
  },
  {
    id: "deneme1-v-112",
    subject: "Vatandaşlık",
    question: "İlde merkezin en yüksek hiyerarşik amiri ve il genel idaresinin başı olan kamu görevlisi kimdir?",
    options: [
      "Kaymakam",
      "Vali",
      "Belediye Başkanı",
      "İl Emniyet Müdürü",
      "Defterdar"
    ],
    correctIndex: 1,
    explanation: "Vali il genel idaresinin başı ve Cumhurbaşkanının ildeki temsilcisidir."
  },
  {
    id: "deneme1-v-113",
    subject: "Vatandaşlık",
    question: "Köy idaresinde köyün tüm seçmenlerinden oluşan organ hangisidir?",
    options: [
      "Köy İhtiyar Heyeti",
      "Köy Derneği",
      "Muhtarlık",
      "İl Genel Meclisi",
      "Köy Komisyonu"
    ],
    correctIndex: 1,
    explanation: "Köyün tüm seçmenlerinin oluşturduğu doğrudan karar organı Köy Derneği'dir."
  },
  {
    id: "deneme1-v-114",
    subject: "Vatandaşlık",
    question: "İdarenin kamu yararı amacıyla özel mülkiyetteki taşınmaz mala bedelini ödeyerek el koymasına ne denir?",
    options: [
      "Kamulaştırma (İstimlak)",
      "İstimval",
      "Kamusal Alım",
      "Devletleştirme",
      "El Koyma"
    ],
    correctIndex: 0,
    explanation: "Taşınmaz mala mülkiyet el koymaya Kamulaştırma denir."
  },
  {
    id: "deneme1-g-115",
    subject: "Güncel Bilgiler",
    question: "İnce Memed ve Yılanı Öldürseler eserlerinin yazarı, Nobel Edebiyat Ödülü'ne aday gösterilen ilk Türk yazar kimdir?",
    options: [
      "Orhan Pamuk",
      "Yaşar Kemal",
      "Ahmet Hamdi Tanpınar",
      "Tarık Buğra",
      "Sait Faik Abasıyanık"
    ],
    correctIndex: 1,
    explanation: "Yaşar Kemal 1973'te Nobel Edebiyat Ödülü'ne aday gösterilen ilk Türk yazardır."
  },
  {
    id: "deneme1-g-116",
    subject: "Güncel Bilgiler",
    question: "Divânu Lugâti't-Türk eserinin yazarı olan ünlü Türk dil bilgini kimdir?",
    options: [
      "Kaşgarlı Mahmud",
      "Yusuf Has Hacip",
      "Edip Ahmet Yükneki",
      "Ali Şir Nevai",
      "Hoca Dehhani"
    ],
    correctIndex: 0,
    explanation: "Divânu Lugâti't-Türk Kaşgarlı Mahmud'un ölümsüz eseridir."
  },
  {
    id: "deneme1-g-117",
    subject: "Güncel Bilgiler",
    question: "Türk Devletleri Teşkilatı'nın (TDT) genel merkezinin ve sekretaryasının bulunduğu şehir neresidir?",
    options: [
      "Astana",
      "Taşkent",
      "İstanbul",
      "Bakü",
      "Bişkek"
    ],
    correctIndex: 2,
    explanation: "TDT Genel Sekreterliği ve merkezi İstanbul'dadır."
  },
  {
    id: "deneme1-g-118",
    subject: "Güncel Bilgiler",
    question: "Avrupa İnsan Hakları Mahkemesi'ne (AİHM) ev sahipliği yapan Fransa şehri hangisidir?",
    options: [
      "Paris",
      "Strazburg",
      "Lyon",
      "Marsilya",
      "Bordeaux"
    ],
    correctIndex: 1,
    explanation: "AİHM Fransa'nın Strazburg kentindedir."
  },
  {
    id: "deneme1-g-119",
    subject: "Güncel Bilgiler",
    question: "Türkiye'nin ilk yerli ve millî yüksek çözünürlüklü gözlem uydusu hangisidir?",
    options: [
      "RASAT",
      "GÖKTÜRK-2",
      "İMECE",
      "TÜRKSAT 6A",
      "GÖKTÜRK-1"
    ],
    correctIndex: 2,
    explanation: "İMECE uydumuz yerli ve milli alt metre çözünürlüklü gözlem uydumuzdur."
  },
  {
    id: "deneme1-g-120",
    subject: "Güncel Bilgiler",
    question: "'Doğunun Kraliçesi' olarak anılan ve UNESCO Gastronomi şehri ilan edilen ilimiz hangisidir?",
    options: [
      "Gaziantep",
      "Hatay",
      "Şanlıurfa",
      "Adana",
      "Mardin"
    ],
    correctIndex: 1,
    explanation: "Antakya merkezli Hatay ilimiz UNESCO Gastronomi şehridir."
  }
];

// --- KPSS LİSANS DENEME 1 QUESTIONS (120 Soru - Dedicated to Lisans) ---
export const KPSS_LISANS_DENEME_1_QUESTIONS: DuelQuestion[] = [
  ...KPSS_ONLISAN_DENEME_1_QUESTIONS.map(q => ({
    ...q,
    id: q.id.replace("deneme1-", "deneme1-lisans-"),
    examType: "kpss_lisans" as const
  }))
];

export const ALL_EXAM_PACKS: ExamPack[] = [
  {
    id: "kpss-onlisans-deneme-1",
    title: "2026 ÖSYM KPSS Ön Lisans Tam Prova #1",
    description: "30 Türkçe, 30 Matematik & Geometri, 27 Tarih, 18 Coğrafya, 15 Vatandaşlık & Güncel (Tam 120 Soru / 130 Dk Açıklamalı Çözümlü)",
    examType: "kpss_onlisans",
    totalQuestions: 120,
    durationMinutes: 130,
    badge: "🔥 2026 ÖSYM ÖNLİSANS SİMÜLASYONU #1",
    questions: KPSS_ONLISAN_DENEME_1_QUESTIONS,
  },
  {
    id: "kpss-lisans-deneme-1",
    title: "2026 ÖSYM KPSS Lisans Tam Prova #1",
    description: "30 Türkçe, 30 Matematik & Geometri, 27 Tarih, 18 Coğrafya, 15 Vatandaşlık & Güncel (Tam 120 Soru / 130 Dk Açıklamalı Çözümlü)",
    examType: "kpss_lisans",
    totalQuestions: 120,
    durationMinutes: 130,
    badge: "🔥 2026 ÖSYM LİSANS SİMÜLASYONU #1",
    questions: KPSS_LISANS_DENEME_1_QUESTIONS,
  },
];
