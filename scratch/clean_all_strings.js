const fs = require('fs');

const fileContent = fs.readFileSync('./src/lib/data/senaFullDistribution.ts', 'utf8');

// Advanced regex replacements for Turkish text
const clean = fileContent
  .replace(/KPSS\s*Önlisans\s*Türkçe\s*Konu\s*Dağ?ı?l?ı?m?ı?/gi, 'Türkçe')
  .replace(/KPSS\s*Önlisans\s*Matematik\s*Konu\s*Dağ?ı?l?ı?m?ı?/gi, 'Matematik')
  .replace(/KPSS\s*Önlisans\s*Tarih\s*Konu\s*Dağ?ı?l?ı?m?ı?/gi, 'Tarih')
  .replace(/KPSS\s*Önlisans\s*Coğ?r?a?f?y?a?\s*Konu\s*Dağ?ı?l?ı?m?ı?/gi, 'Coğrafya')
  .replace(/KPSS\s*Önlisans\s*Vatand?a?ş?l?ı?k?\s*Konu\s*Dağ?ı?l?ı?m?ı?/gi, 'Vatandaşlık')
  // Strip control characters
  .replace(/[\uFFFD\u0000-\u001F\u007F-\u009F]/g, '')
  .replace(//g, '')
  .replace(/&nbsp;/g, ' ');

fs.writeFileSync('./src/lib/data/senaFullDistribution.ts', clean);
console.log('Cleaned typography completely!');
