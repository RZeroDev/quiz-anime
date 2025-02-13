import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { animeQuizzes } from './data/questions';
import { QuizCard } from './components/QuizCard';
import { Results } from './components/Results';
import { AnimeSelector } from './components/AnimeSelector';
import { ContactInfo } from './components/ContactInfo';
import type { GameState } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    showResults: false,
    answers: [],
    selectedAnime: null,
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const handleAnimeSelect = (anime: string) => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      showResults: false,
      answers: [],
      selectedAnime: anime,
    });
  };

  const handleAnswer = (answerIndex: number) => {
    if (!gameState.selectedAnime) return;
    
    const currentQuestion = animeQuizzes[gameState.selectedAnime][gameState.currentQuestion];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      currentQuestion: prev.currentQuestion + 1,
      answers: [...prev.answers, answerIndex],
      showResults: prev.currentQuestion === animeQuizzes[gameState.selectedAnime].length - 1,
    }));
  };

  const restartGame = () => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      showResults: false,
      answers: [],
      selectedAnime: null,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-200">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-3 rounded-xl bg-white dark:bg-gray-800 
                 shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-purple-600" />
        )}
      </button>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)]">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
          >
            Anime Quiz
          </motion.h1>

          <AnimatePresence mode="wait">
            {!gameState.selectedAnime ? (
              <AnimeSelector onSelect={handleAnimeSelect} />
            ) : gameState.showResults ? (
              <Results
                score={gameState.score}
                totalQuestions={animeQuizzes[gameState.selectedAnime].length}
                onRestart={restartGame}
              />
            ) : (
              <motion.div
                key={gameState.currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuizCard
                  question={animeQuizzes[gameState.selectedAnime][gameState.currentQuestion]}
                  onAnswer={handleAnswer}
                  currentQuestion={gameState.currentQuestion}
                  totalQuestions={animeQuizzes[gameState.selectedAnime].length}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ContactInfo />
    </div>
  );
}

export default App;