const https = require('https');
const fs = require('fs');

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

    console.log(`BÜLENT LİSANS TABLES FOUND: ${tables.length}`);

    const datasets = {
      "Türkçe": [],
      "Matematik": [],
      "Tarih": [],
      "Coğrafya": [],
      "Vatandaşlık": [],
      "Hukuk": [],
      "İktisat": [],
      "Maliye": [],
      "Uluslararası İlişkiler": []
    };

    tables.forEach((tbl, idx) => {
      const rowRegex = /<tr[\s\S]*?<\/tr>/gi;
      const rows = tbl.match(rowRegex) || [];
      if (rows.length < 2) return;

      const headerText = rows[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
      let courseName = "";

      if (headerText.includes("türkçe") || headerText.includes("turkce")) courseName = "Türkçe";
      else if (headerText.includes("matematik") || headerText.includes("geometri")) courseName = "Matematik";
      else if (headerText.includes("tarih")) courseName = "Tarih";
      else if (headerText.includes("coğrafya") || headerText.includes("cografya")) courseName = "Coğrafya";
      else if (headerText.includes("vatandaşlık") || headerText.includes("vatandaslik") || headerText.includes("anayasa")) courseName = "Vatandaşlık";
      else if (headerText.includes("hukuk")) courseName = "Hukuk";
      else if (headerText.includes("iktisat")) courseName = "İktisat";
      else if (headerText.includes("maliye")) courseName = "Maliye";
      else if (headerText.includes("uluslararası")) courseName = "Uluslararası İlişkiler";

      if (!courseName) {
        // Fallback by table index
        if (idx === 12) courseName = "Türkçe";
        else if (idx === 13) courseName = "Matematik";
        else if (idx === 14) courseName = "Tarih";
        else if (idx === 15) courseName = "Coğrafya";
        else if (idx === 16) courseName = "Vatandaşlık";
      }

      if (!courseName) return;

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
            const nums = cellTexts.slice(1).map(n => parseInt(n) || 0);
            const y2016 = nums[2] || nums[0] || 0;
            const y2018 = nums[3] || nums[1] || 0;
            const y2020 = nums[4] || nums[2] || 0;
            const y2022 = nums[5] || nums[3] || 0;
            const y2024 = nums[nums.length - 1] || nums[4] || 0;
            const avg = parseFloat(((y2016 + y2018 + y2020 + y2022 + y2024) / 5).toFixed(1));
            const importance = avg >= 3 ? "Yüksek" : avg >= 1.5 ? "Orta" : "Standart";

            if (!datasets[courseName].some(item => item.topic === topic)) {
              datasets[courseName].push({
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
    });

    console.log("BÜLENT LİSANS EXTRACTION RESULTS:");
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

export const bulentExactKitapSecData: Record<string, QuestionDistRow[]> = ${JSON.stringify(datasets, null, 2)};
`;

    fs.writeFileSync('./src/lib/data/bulentFullDistribution.ts', tsContent);
    console.log("SUCCESS! Created src/lib/data/bulentFullDistribution.ts cleanly!");
  });
});
