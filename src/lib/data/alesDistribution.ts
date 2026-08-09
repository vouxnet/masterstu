export interface QuestionDistRowALES {
  topic: string;
  y2020: number;
  y2021: number;
  y2022: number;
  y2023: number;
  y2024: number;
  avg: number;
  importance: "Yüksek" | "Orta" | "Standart";
}

export const alesDistribution: Record<string, QuestionDistRowALES[]> = {
  "Sayısal": [
    { topic: "Temel Matematik ve Cebir", y2020: 20, y2021: 21, y2022: 19, y2023: 20, y2024: 20, avg: 20.0, importance: "Yüksek" },
    { topic: "Problemler", y2020: 13, y2021: 12, y2022: 14, y2023: 13, y2024: 13, avg: 13.0, importance: "Yüksek" },
    { topic: "Geometri", y2020: 9, y2021: 9, y2022: 9, y2023: 8, y2024: 10, avg: 9.0, importance: "Orta" },
    { topic: "Sayısal Mantık", y2020: 8, y2021: 8, y2022: 8, y2023: 9, y2024: 7, avg: 8.0, importance: "Orta" }
  ],
  "Sözel": [
    { topic: "Paragraf ve Okuma Anlama", y2020: 35, y2021: 34, y2022: 36, y2023: 35, y2024: 35, avg: 35.0, importance: "Yüksek" },
    { topic: "Sözel Mantık", y2020: 9, y2021: 10, y2022: 8, y2023: 9, y2024: 9, avg: 9.0, importance: "Orta" },
    { topic: "Sözcükte ve Cümlede Anlam", y2020: 6, y2021: 6, y2022: 6, y2023: 6, y2024: 6, avg: 6.0, importance: "Standart" }
  ]
};
