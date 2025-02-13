import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function Results({ score, totalQuestions, onRestart }: ResultsProps) {
  const percentage = (score / totalQuestions) * 100;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center
                 border border-purple-100 dark:border-purple-900"
    >
      <motion.div 
        className="mb-6 relative"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        {percentage >= 80 ? (
          <Trophy className="w-20 h-20 mx-auto text-yellow-500" />
        ) : (
          <Sparkles className="w-20 h-20 mx-auto text-purple-500" />
        )}
      </motion.div>
      
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Quiz Terminé !
      </h2>
      
      <div className="mb-6">
        <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          {score}/{totalQuestions}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
          {percentage}% de bonnes réponses
        </p>
      </div>
      
      <div className="mb-8">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {percentage === 100 && "Sugoi! Tu es un véritable Otaku! 🌟"}
          {percentage >= 80 && percentage < 100 && "Excellent travail, Senpai! ✨"}
          {percentage >= 60 && percentage < 80 && "Pas mal du tout, continue comme ça! 🎌"}
          {percentage >= 40 && percentage < 60 && "Ganbare! Tu peux faire mieux! 💪"}
          {percentage < 40 && "Ne perds pas espoir, essaie encore! 🍜"}
        </p>
      </div>
      
      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl
                 transition-all duration-200 hover:opacity-90 hover:scale-105 w-full"
      >
        Rejouer
      </button>
    </motion.div>
  );
}