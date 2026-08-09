const fs = require('fs');

const html = fs.readFileSync('./scratch/tables.html', 'utf8');

// Strip HTML tags into clean structured text
function cleanHtml(raw) {
  return raw
    .replace(/<tr[^>]*>/gi, '\nTR: ')
    .replace(/<td[^>]*>/gi, ' | ')
    .replace(/<th[^>]*>/gi, ' | TH: ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log(cleanHtml(html));
