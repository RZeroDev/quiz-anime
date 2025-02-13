export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface GameState {
  currentQuestion: number;
  score: number;
  showResults: boolean;
  answers: number[];
  selectedAnime: string | null;
}

export type AnimeQuizzes = {
  [key: string]: Question[];
};