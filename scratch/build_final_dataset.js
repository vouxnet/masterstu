const fs = require('fs');

const html = fs.readFileSync('./scratch/tables.html', 'utf8');

// Match table blocks
const tableMatches = html.split('<hr>');

const datasets = {};

tableMatches.forEach((tableHtml) => {
  const rows = tableHtml.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  const parsedRows = [];

  rows.forEach((rowHtml) => {
    const cells = rowHtml.match(/<(td|th)[\s\S]*?<\/(td|th)>/gi) || [];
    const cellTexts = cells.map(c => c.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim());
    if (cellTexts.length > 0) {
      parsedRows.push(cellTexts);
    }
  });

  if (parsedRows.length > 1) {
    // Detect course name from table header
    const headerStr = parsedRows[0].join(' ');
    let course = 'Genel';
    if (headerStr.includes('Türkçe')) course = 'Türkçe';
    else if (headerStr.includes('Matematik') || headerStr.includes('Geometri')) course = 'Matematik';
    else if (headerStr.includes('Tarih')) course = 'Tarih';
    else if (headerStr.includes('Coğrafya')) course = 'Coğrafya';
    else if (headerStr.includes('Vatandaşlık') || headerStr.includes('Anayasa')) course = 'Vatandaşlık';

    if (!datasets[course]) {
      datasets[course] = [];
    }

    // Skip header row
    for (let i = 1; i < parsedRows.length; i++) {
      const r = parsedRows[i];
      if (r.length >= 2) {
        const topic = r[0];
        // filter out summary rows
        if (topic.includes('Toplam') || topic.includes('Konular')) continue;

        const y2016 = parseInt(r[1]) || 0;
        const y2018 = parseInt(r[2]) || 0;
        const y2020 = parseInt(r[3]) || 0;
        const y2022 = parseInt(r[4]) || 0;
        const y2024 = parseInt(r[5]) || 0;
        const avg = parseFloat(((y2016 + y2018 + y2020 + y2022 + y2024) / 5).toFixed(1));
        const importance = avg >= 3 ? "Yüksek" : avg >= 1.5 ? "Orta" : "Standart";

        datasets[course].push({
          topic,
          y2016,
          y2018,
          y2020,
          y2022,
          y2024,
          avg,
          importance
        });
      }
    }
  }
});

let tsContent = `export interface QuestionDistRow {
  topic: string;
  y2016: number;
  y2018: number;
  y2020: number;
  y2022: number;
  y2024: number;
  avg: number;
  importance: "Yüksek" | "Orta" | "Standart";
}

export const senaExactKitapSecData: Record<string, QuestionDistRow[]> = ${JSON.stringify(datasets, null, 2)};
`;

fs.writeFileSync('./src/lib/data/senaFullDistribution.ts', tsContent);
console.log('Successfully created src/lib/data/senaFullDistribution.ts with ALL KitapSec tables!');
