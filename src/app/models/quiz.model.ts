export interface Category {
  id: number;
  name: string;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizConfig {
  category: number;
  difficulty: 'easy' | 'medium' | 'hard';
  amount: number;
}

export interface QuizResult {
  playerName: string;
  score: number;
  totalQuestions: number;
  category: string;
  difficulty: string;
  date: string;
}