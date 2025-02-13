import React from 'react';
import { Question } from '../types';
import { motion } from 'framer-motion';

interface QuizCardProps {
  question: Question;
  onAnswer: (index: number) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export function QuizCard({ question, onAnswer, currentQuestion, totalQuestions }: QuizCardProps) {
  return (
    <div className="w-full  mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm font-medium dark:text-gray-300">
          Question {currentQuestion + 1} sur {totalQuestions}
        </span>
        <div className="w-64 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
          <div 
            className="h-2 bg-purple-600 rounded-full dark:bg-purple-500"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full">
        <h2 className="w-full text-2xl font-bold mb-8 text-gray-800 dark:text-white">
          {question.question}
        </h2>
        
        <div className="grid gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(index)}
              className="w-full text-left p-4 rounded-xl border-2 border-purple-200 
                       dark:border-purple-900 hover:border-purple-500 dark:hover:border-purple-500
                       hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200
                       text-gray-700 dark:text-gray-200"
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}