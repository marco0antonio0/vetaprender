export type Difficulty = 'easy' | 'normal' | 'hard';

export interface Question {
  id: string;
  word: string;
  hint: string;
  maskedWord: string; // Ex: "F _ M _ R"
  image?: string; // URL da imagem
}

export interface QuestionResult {
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  score: number;
  loading: boolean;
  answers: boolean[];
}

export type Screen = 'HOME' | 'GAME' | 'RESULT' | 'ABOUT' | 'DIFFICULTY' | 'QUIZ_DIFFICULTY' | 'QUIZ_GAME' | 'QUIZ_RESULT';

export interface FeedbackData {
  message: string;
  tips: string[];
}

// Tipos para o jogo de perguntas múltiplas
export interface QuizQuestion {
  id: string;
  pergunta: string;
  op_a: string;
  op_b: string;
  op_c: string;
  op_d: string;
  op_e: string;
  op_correta: string;
}

export interface QuizQuestionResult {
  question: QuizQuestion;
  userAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
}