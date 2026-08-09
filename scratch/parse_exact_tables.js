const fs = require('fs');
const https = require('https');

const url = "https://www.kitapsec.com/blog/2026-kpss-onlisans-konulari-ve-soru-dagilimi-154.html";

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

    const datasets = {
      "Türkçe": [],
      "Matematik": [],
      "Tarih": [],
      "Coğrafya": [],
      "Vatandaşlık": []
    };

    const targetIndices = [
      { idx: 12, name: "Türkçe" },
      { idx: 13, name: "Matematik" },
      { idx: 14, name: "Tarih" },
      { idx: 15, name: "Coğrafya" },
      { idx: 16, name: "Vatandaşlık" }
    ];

    targetIndices.forEach(({ idx, name }) => {
      const tbl = tables[idx];
      if (!tbl) return;

      const rowRegex = /<tr[\s\S]*?<\/tr>/gi;
      const rows = tbl.match(rowRegex) || [];

      rows.forEach((rowHtml) => {
        const cells = rowHtml.match(/<(td|th)[\s\S]*?<\/(td|th)>/gi) || [];
        const cellTexts = cells.map(c => c.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim());

        if (cellTexts.length >= 2) {
          const topic = cellTexts[0];
          if (
            topic &&
            !topic.toLowerCase().includes("toplam") &&
            !topic.toLowerCase().includes("konu") &&
            !topic.toLowerCase().includes("soru") &&
            !topic.toLowerCase().includes("dağılımı")
          ) {
            // Find numbers
            const nums = cellTexts.slice(1).map(n => parseInt(n) || 0);
            const y2016 = nums[2] || nums[0] || 0;
            const y2018 = nums[3] || nums[1] || 0;
            const y2020 = nums[4] || nums[2] || 0;
            const y2022 = nums[5] || nums[3] || 0;
            const y2024 = nums[nums.length - 1] || nums[4] || 0;
            const avg = parseFloat(((y2016 + y2018 + y2020 + y2022 + y2024) / 5).toFixed(1));
            const importance = avg >= 3 ? "Yüksek" : avg >= 1.5 ? "Orta" : "Standart";

            datasets[name].push({
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
      });
    });

    console.log("EXACT KITAPSEC TABLES EXTRACTION:");
    Object.keys(datasets).forEach(k => {
      console.log(`${k}: ${datasets[k].length} topics extracted!`);
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
    console.log("SUCCESS! Updated src/lib/data/senaFullDistribution.ts cleanly!");
  });
});
