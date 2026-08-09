export interface QuestionDistRowYDS {
  topic: string;
  y2020: number;
  y2021: number;
  y2022: number;
  y2023: number;
  y2024: number;
  avg: number;
  importance: "Yüksek" | "Orta" | "Standart";
}

export const ydsDistribution: Record<string, QuestionDistRowYDS[]> = {
  "İngilizce": [
    { topic: "Vocabulary", y2020: 6, y2021: 6, y2022: 6, y2023: 6, y2024: 6, avg: 6.0, importance: "Yüksek" },
    { topic: "Grammar", y2020: 10, y2021: 10, y2022: 10, y2023: 10, y2024: 10, avg: 10.0, importance: "Yüksek" },
    { topic: "Cloze Test", y2020: 10, y2021: 10, y2022: 10, y2023: 10, y2024: 10, avg: 10.0, importance: "Yüksek" },
    { topic: "Sentence Completion", y2020: 10, y2021: 10, y2022: 10, y2023: 10, y2024: 10, avg: 10.0, importance: "Yüksek" },
    { topic: "Translation (EN→TR + TR→EN)", y2020: 6, y2021: 6, y2022: 6, y2023: 6, y2024: 6, avg: 6.0, importance: "Orta" },
    { topic: "Reading Comprehension", y2020: 20, y2021: 20, y2022: 20, y2023: 20, y2024: 20, avg: 20.0, importance: "Yüksek" },
    { topic: "Dialogue Completion", y2020: 5, y2021: 5, y2022: 5, y2023: 5, y2024: 5, avg: 5.0, importance: "Orta" },
    { topic: "Restatement", y2020: 4, y2021: 4, y2022: 4, y2023: 4, y2024: 4, avg: 4.0, importance: "Orta" },
    { topic: "Paragraph Completion", y2020: 4, y2021: 4, y2022: 4, y2023: 4, y2024: 4, avg: 4.0, importance: "Orta" },
    { topic: "Irrelevant Sentence", y2020: 5, y2021: 5, y2022: 5, y2023: 5, y2024: 5, avg: 5.0, importance: "Orta" }
  ]
};
