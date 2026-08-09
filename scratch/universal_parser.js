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

    const datasets = {
      "Türkçe": [],
      "Matematik": [],
      "Tarih": [],
      "Coğrafya": [],
      "Vatandaşlık": []
    };

    // Find all table tags and examine 500 chars before table
    const tableRegex = /<table[\s\S]*?<\/table>/gi;
    let match;

    while ((match = tableRegex.exec(cleanText)) !== null) {
      const tableStartPos = match.index;
      const precedingText = cleanText.substring(Math.max(0, tableStartPos - 600), tableStartPos).toLowerCase();

      let currentCourse = "";
      if (precedingText.includes("türkçe") || precedingText.includes("turkce")) currentCourse = "Türkçe";
      else if (precedingText.includes("matematik") || precedingText.includes("geometri")) currentCourse = "Matematik";
      else if (precedingText.includes("tarih")) currentCourse = "Tarih";
      else if (precedingText.includes("coğrafya") || precedingText.includes("cografya")) currentCourse = "Coğrafya";
      else if (precedingText.includes("vatandaşlık") || precedingText.includes("vatandaslik") || precedingText.includes("anayasa")) currentCourse = "Vatandaşlık";

      if (!currentCourse) continue;

      const tableContent = match[0];
      const rowRegex = /<tr[\s\S]*?<\/tr>/gi;
      const rows = tableContent.match(rowRegex) || [];

      rows.forEach((rowHtml) => {
        const cells = rowHtml.match(/<(td|th)[\s\S]*?<\/(td|th)>/gi) || [];
        const cellTexts = cells.map(c => c.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim());
        
        if (cellTexts.length >= 2) {
          const topic = cellTexts[0];
          if (
            topic &&
            !topic.toLowerCase().includes("konu") &&
            !topic.toLowerCase().includes("toplam") &&
            !topic.toLowerCase().includes("soru") &&
            !topic.toLowerCase().includes("yıl")
          ) {
            const y2016 = parseInt(cellTexts[1]) || 0;
            const y2018 = parseInt(cellTexts[2]) || 0;
            const y2020 = parseInt(cellTexts[3]) || 0;
            const y2022 = parseInt(cellTexts[4]) || 0;
            const y2024 = parseInt(cellTexts[5]) || 0;
            const avg = parseFloat(((y2016 + y2018 + y2020 + y2022 + y2024) / 5).toFixed(1));
            const importance = avg >= 3 ? "Yüksek" : avg >= 1.5 ? "Orta" : "Standart";

            if (!datasets[currentCourse].some(item => item.topic === topic)) {
              datasets[currentCourse].push({
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
    }

    console.log("UNIVERSAL PARSER RESULTS:");
    Object.keys(datasets).forEach(k => {
      console.log(`${k}: ${datasets[k].length} topics`);
    });

    const tsContent = `export interface QuestionDistRow {
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
    console.log("Updated senaFullDistribution.ts cleanly!");
  });
});
