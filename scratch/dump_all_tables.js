const fs = require('fs');

const url = "https://www.kitapsec.com/blog/2026-kpss-onlisans-konulari-ve-soru-dagilimi-154.html";
const https = require('https');

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    let cleanText = data
      .replace(/&Ouml;/g, 'Ö').replace(/&ouml;/g, 'ö')
      .replace(/&Uuml;/g, 'Ü').replace(/&uuml;/g, 'ü')
      .replace(/&Ccedil;/g, 'Ç').replace(/&ccedil;/g, 'ç')
      .replace(/&Iacute;/g, 'İ').replace(/&i-acute;/g, 'i')
      .replace(/&gbreve;/g, 'ğ').replace(/&Gbreve;/g, 'Ğ')
      .replace(/&scedil;/g, 'ş').replace(/&Scedil;/g, 'Ş')
      .replace(/&nbsp;/g, ' ');

    const tableRegex = /<table[\s\S]*?<\/table>/gi;
    const tables = cleanText.match(tableRegex) || [];

    console.log(`TOTAL TABLES FOUND: ${tables.length}`);

    tables.forEach((tbl, idx) => {
      const rowRegex = /<tr[\s\S]*?<\/tr>/gi;
      const rows = tbl.match(rowRegex) || [];
      console.log(`\n--- TABLE ${idx + 1} (${rows.length} rows) ---`);
      if (rows.length > 0) {
        const firstRow = rows[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        console.log(`First row: ${firstRow.substring(0, 120)}`);
      }
      if (rows.length > 1) {
        const secondRow = rows[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        console.log(`Second row sample: ${secondRow.substring(0, 120)}`);
      }
    });
  });
});
