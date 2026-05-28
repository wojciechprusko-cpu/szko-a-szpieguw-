export interface Book {
  id: number;
  title: string;
  origTitle: string;
  year: string;
  summary: string;
  analysis: string;
  location: string;
  villain: string;
  difficulty: "Niski" | "Średni" | "Wysoki" | "Krytyczny";
  coverColor: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  intelligence: number;
  martialArts: number;
  stealth: number;
  specialSkill: string;
  description: string;
  alliance: "CIA" | "SPYDER" | "Niezależna";
  avatarText: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface SpyQuote {
  id: string;
  text: string;
  author: string;
  context: string;
  bookTitle: string;
}

export interface SpyManeuver {
  id: string;
  name: string;
  englishName: string;
  description: string;
  origin: string;
  bookTitle: string;
  difficulty: "Podstawowy" | "Średni" | "Zaawansowany" | "Legendarny";
  effectiveness: number;
  instructions: string;
}


