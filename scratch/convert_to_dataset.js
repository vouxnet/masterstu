const fs = require('fs');

const html = fs.readFileSync('./scratch/tables.html', 'utf8');

// Match table blocks
const tableMatches = html.split('<hr>');

const datasets = [];

tableMatches.forEach((tableHtml, idx) => {
  const rows = tableHtml.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  const parsedRows = [];

  rows.forEach((rowHtml) => {
    const cells = rowHtml.match(/<(td|th)[\s\S]*?<\/(td|th)>/gi) || [];
    const cellTexts = cells.map(c => c.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim());
    if (cellTexts.length > 0) {
      parsedRows.push(cellTexts);
    }
  });

  if (parsedRows.length > 0) {
    datasets.push(parsedRows);
  }
});

console.log(JSON.stringify(datasets, null, 2));
