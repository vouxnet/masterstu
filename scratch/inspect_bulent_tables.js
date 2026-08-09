const https = require('https');
const url = "https://www.kitapsec.com/blog/2023-kpss-lisans-konulari-ve-soru-dagilimi-147.html";

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

    tables.forEach((tbl, idx) => {
      const rowRegex = /<tr[\s\S]*?<\/tr>/gi;
      const rows = tbl.match(rowRegex) || [];
      if (rows.length > 0) {
        const firstRow = rows[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        console.log(`Table ${idx + 1}: ${firstRow.substring(0, 100)}`);
      }
    });
  });
});
