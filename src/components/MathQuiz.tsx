import React, { useState, useEffect, useCallback } from 'react';
import { MathQuestion, generateQuestion } from '../game/mathGenerator';

interface MathQuizProps {
  onCorrect: () => void;
  onWrong: () => void;
  onClose: () => void;
}

export const MathQuiz: React.FC<MathQuizProps> = ({ onCorrect, onWrong, onClose }) => {
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const generateNewQuestion = useCallback(() => {
    const newQuestion = generateQuestion(difficulty);
    setQuestion(newQuestion);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [difficulty]);

  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  const handleAnswer = (answer: number) => {
    if (isAnswered || !question) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);
    const correct = answer === question.answer;
    setIsCorrect(correct);

    if (correct) {
      onCorrect();
    } else {
      onWrong();
    }
  };

  const handleContinue = () => {
    generateNewQuestion();
  };

  if (!question) return null;

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">🧮 数学挑战</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          {(['easy', 'medium', 'hard'] as const).map((d) => (
            <button
              key={d}
              onClick={() => {
                setDifficulty(d);
                setTimeout(() => generateNewQuestion(), 0);
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                difficulty === d
                  ? getDifficultyColor()
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {d === 'easy' ? '简单' : d === 'medium' ? '中等' : '困难'}
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-4">
          <div className="text-4xl font-bold text-center text-gray-800">
            {question.question}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`py-4 px-6 rounded-xl text-2xl font-bold transition-all ${
                isAnswered
                  ? option === question.answer
                    ? 'bg-green-500 text-white'
                    : selectedAnswer === option
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                  : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95'
              }`}
            >
              {option}
              {isAnswered && option === question.answer && ' ✓'}
              {isAnswered && selectedAnswer === option && option !== question.answer && ' ✗'}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="mt-4">
            <div className={`text-center py-3 rounded-xl mb-4 ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <p className="text-xl font-bold">
                {isCorrect ? '🎉 答对了！' : '😅 答错了...'}
              </p>
              <p className="text-sm">
                {isCorrect ? '继续加油，让花园更美丽！' : `正确答案是 ${question.answer}`}
              </p>
            </div>
            <button
              onClick={handleContinue}
              className="w-full py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors"
            >
              下一题 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
