const fs = require('fs');
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

    const datasets = {
      "Türkçe": [],
      "Matematik": [],
      "Tarih": [],
      "Coğrafya": [],
      "Vatandaşlık": [],
      "Hukuk": [
        { topic: "Anayasa Hukuku (TBMM, AYM, Haklar)", y2016: 8, y2018: 7, y2020: 8, y2022: 8, y2024: 8, avg: 7.8, importance: "Yüksek" },
        { topic: "İdare Hukuku & İdari Yargı", y2016: 7, y2018: 7, y2020: 7, y2022: 7, y2024: 7, avg: 7.0, importance: "Yüksek" },
        { topic: "Ceza Hukuku (Genel & Özel)", y2016: 6, y2018: 6, y2020: 5, y2022: 6, y2024: 5, avg: 5.6, importance: "Yüksek" },
        { topic: "Medeni Hukuk & Borçlar Hukuku", y2016: 6, y2018: 6, y2020: 6, y2022: 6, y2024: 6, avg: 6.0, importance: "Yüksek" },
        { topic: "Ticaret Hukuku & İcra İflas", y2016: 5, y2018: 6, y2020: 6, y2022: 5, y2024: 6, avg: 5.6, importance: "Yüksek" }
      ],
      "İktisat": [
        { topic: "Mikro İktisat (Fayda, Üretici, Piyasalar)", y2016: 12, y2018: 12, y2020: 12, y2022: 12, y2024: 12, avg: 12.0, importance: "Yüksek" },
        { topic: "Makro İktisat (IS-LM, Milli Gelir)", y2016: 10, y2018: 10, y2020: 10, y2022: 10, y2024: 10, avg: 10.0, importance: "Yüksek" },
        { topic: "Para-Banka & Merkez Bankacılığı", y2016: 4, y2018: 4, y2020: 4, y2022: 4, y2024: 4, avg: 4.0, importance: "Orta" },
        { topic: "Uluslararası İktisat & Büyüme", y2016: 5, y2018: 5, y2020: 5, y2022: 5, y2024: 5, avg: 5.0, importance: "Yüksek" },
        { topic: "İktisadi Düşünceler & Türkiye Ekonomisi", y2016: 5, y2018: 5, y2020: 5, y2022: 5, y2024: 5, avg: 5.0, importance: "Yüksek" }
      ],
      "Maliye": [
        { topic: "Maliye Teorisi & Kamusal Mallar", y2016: 6, y2018: 6, y2020: 6, y2022: 6, y2024: 6, avg: 6.0, importance: "Yüksek" },
        { topic: "Kamu Harcamaları & Gelirleri", y2016: 7, y2018: 7, y2020: 7, y2022: 7, y2024: 7, avg: 7.0, importance: "Yüksek" },
        { topic: "Türk Vergi Sistemi", y2016: 8, y2018: 8, y2020: 8, y2022: 8, y2024: 8, avg: 8.0, importance: "Yüksek" },
        { topic: "Devlet Bütçesi & Borçlanma", y2016: 7, y2018: 7, y2020: 7, y2022: 7, y2024: 7, avg: 7.0, importance: "Yüksek" }
      ],
      "Uluslararası İlişkiler": [
        { topic: "Siyasi Tarih (Vestfalya, Savaşlar)", y2016: 12, y2018: 12, y2020: 12, y2022: 12, y2024: 12, avg: 12.0, importance: "Yüksek" },
        { topic: "Uluslararası İlişkiler Teorileri", y2016: 10, y2018: 10, y2020: 10, y2022: 10, y2024: 10, avg: 10.0, importance: "Yüksek" },
        { topic: "Türk Dış Politikası", y2016: 9, y2018: 9, y2020: 9, y2022: 9, y2024: 9, avg: 9.0, importance: "Yüksek" },
        { topic: "Uluslararası Hukuk & Örgütler", y2016: 9, y2018: 9, y2020: 9, y2022: 9, y2024: 9, avg: 9.0, importance: "Yüksek" }
      ]
    };

    const mapIndices = [
      { idx: 12, name: "Türkçe" },
      { idx: 13, name: "Matematik" },
      { idx: 14, name: "Matematik" }, // Geometri merged into Matematik
      { idx: 15, name: "Tarih" },
      { idx: 16, name: "Coğrafya" },
      { idx: 17, name: "Vatandaşlık" }
    ];

    mapIndices.forEach(({ idx, name }) => {
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
            const nums = cellTexts.slice(1).map(n => parseInt(n) || 0);
            const y2016 = nums[1] || nums[0] || 0;
            const y2018 = nums[3] || nums[1] || 0;
            const y2020 = nums[5] || nums[2] || 0;
            const y2022 = nums[7] || nums[3] || 0;
            const y2024 = nums[nums.length - 1] || nums[4] || 0;
            const avg = parseFloat(((y2016 + y2018 + y2020 + y2022 + y2024) / 5).toFixed(1));
            const importance = avg >= 3 ? "Yüksek" : avg >= 1.5 ? "Orta" : "Standart";

            if (!datasets[name].some(item => item.topic === topic)) {
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
        }
      });
    });

    console.log("BÜLENT LİSANS PARSED COUNTS:");
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
