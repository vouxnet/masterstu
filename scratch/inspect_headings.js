const https = require('https');
const url = "https://www.kitapsec.com/blog/2026-kpss-onlisans-konulari-ve-soru-dagilimi-154.html";

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const headings = data.match(/<h[123456][^>]*>[\s\S]*?<\/h[123456]>/gi) || [];
    headings.forEach(h => console.log(h.replace(/<[^>]+>/g, '').trim()));
  });
});
