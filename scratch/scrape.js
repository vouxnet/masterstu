const https = require('https');
const fs = require('fs');

const url = "https://www.kitapsec.com/blog/2026-kpss-onlisans-konulari-ve-soru-dagilimi-154.html";

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Extract table tags
    const tableRegex = /<table[\s\S]*?<\/table>/gi;
    const tables = data.match(tableRegex) || [];
    console.log(`Found ${tables.length} tables!`);
    
    // Write tables to scratch/tables.html
    if (!fs.existsSync('./scratch')) {
      fs.mkdirSync('./scratch');
    }
    fs.writeFileSync('./scratch/tables.html', tables.join('\n\n<hr>\n\n'));
    console.log('Tables written to ./scratch/tables.html');
  });
}).on('error', (err) => {
  console.error(err);
});
