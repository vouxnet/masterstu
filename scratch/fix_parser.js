const fs = require('fs');

const url = "https://www.kitapsec.com/blog/2026-kpss-onlisans-konulari-ve-soru-dagilimi-154.html";
const https = require('https');

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Replace HTML entities for Turkish characters
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

    const sectionRegex = /(<h[234][^>]*>[\s\S]*?<\/h[234]>)\s*([\s\S]*?)(?=<h[234]|$)/gi;
    let match;
    let currentCourse = "Türkçe";

    while ((match = sectionRegex.exec(cleanText)) !== null) {
      const heading = match[1].replace(/<[^>]+>/g, '').trim();
      const content = match[2];

      const hLower = heading.toLowerCase();
      if (hLower.includes("türkçe") || hLower.includes("turkce")) currentCourse = "Türkçe";
      else if (hLower.includes("matematik") || hLower.includes("geometri")) currentCourse = "Matematik";
      else if (hLower.includes("tarih")) currentCourse = "Tarih";
      else if (hLower.includes("coğrafya") || hLower.includes("cografya")) currentCourse = "Coğrafya";
      else if (hLower.includes("vatandaşlık") || hLower.includes("vatandaslik") || hLower.includes("anayasa")) currentCourse = "Vatandaşlık";

      const tableRegex = /<tr[\s\S]*?<\/tr>/gi;
      const rows = content.match(tableRegex) || [];

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

    console.log("SUCCESS! Parsed counts per course:");
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
