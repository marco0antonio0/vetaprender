export type Difficulty = 'easy' | 'normal' | 'hard';

export interface Question {
  id: string;
  word: string;
  hint: string;
  maskedWord: string; // Ex: "F _ M _ R"
  image?: string; // URL da imagem
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  score: number;
  loading: boolean;
  answers: boolean[];
}

export type Screen = 'HOME' | 'GAME' | 'RESULT' | 'ABOUT';

export interface FeedbackData {
  message: string;
  tips: string[];
}