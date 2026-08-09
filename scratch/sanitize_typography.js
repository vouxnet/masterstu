const fs = require('fs');

let content = fs.readFileSync('./src/lib/data/senaFullDistribution.ts', 'utf8');

// Fix all garbled character representations
content = content
  .replace(/Corafya/g, 'Coğrafya')
  .replace(/Coğrafya/g, 'Coğrafya')
  .replace(/Vatandalk/g, 'Vatandaşlık')
  .replace(/Vatandaşlık/g, 'Vatandaşlık')
  .replace(/Dalm/g, 'Dağılımı')
  .replace(/Dağılımı/g, 'Dağılımı')
  .replace(/nlisans/g, 'Önlisans')
  .replace(/SYM/g, 'ÖSYM')
  .replace(/Savalar/g, 'Savaşları')
  .replace(/Balangc/g, 'Başlangıcı')
  .replace(/lkeleri/g, 'İlkeleri')
  .replace(/Anlatm/g, 'Anlatım')
  .replace(/Bozukluu/g, 'Bozukluğu')
  .replace(/Noktalama/g, 'Noktalama')
  .replace(/aretleri/g, 'İşaretleri')
  .replace(/Balca/g, 'Başlıca')
  .replace(/likileri/g, 'İlişkileri')
  .replace(/Kavramlar/g, 'Kavramları')
  .replace(/B&ouml;l&uuml;nebilme/g, 'Bölünebilme')
  .replace(/&Uuml;sl&uuml;/g, 'Üslü')
  .replace(/Eitsizlikler/g, 'Eşitsizlikler')
  .replace(/lem/g, 'İşlem')
  .replace(/Çarpanlara Ayrma/g, 'Çarpanlara Ayırma')
  .replace(/Kar-Zarar/g, 'Kâr-Zarar')
  .replace(/İi/g, 'İşçi')
  .replace(/Grafik Okuma ve Yorumlama/g, 'Grafik Okuma ve Yorumlama')
  .replace(/D&ouml;rtgenler/g, 'Dörtgenler')
  .replace(/Çokgenler/g, 'Çokgenler')
  .replace(/slamiyet/g, 'İslamiyet')
  .replace(/ncesi/g, 'Öncesi')
  .replace(/B&uuml;y&uuml;k/g, 'Büyük')
  .replace(/Devletleri/g, 'Devletleri')
  .replace(/Medeniyeti/g, 'Medeniyeti')
  .replace(/Hazrlk/g, 'Hazırlık')
  .replace(/Milli M&uuml;cadele/g, 'Milli Mücadele')
  .replace(/Antlamalar/g, 'Antlaşmaları')
  .replace(/nklaplar/g, 'İnkılaplar')
  .replace(//g, 'Ş')
  .replace(//g, ''); // strip any remaining isolated strange characters

fs.writeFileSync('./src/lib/data/senaFullDistribution.ts', content);
console.log('Sanitized all typography cleanly!');
