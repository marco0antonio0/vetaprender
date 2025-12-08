import React, { useState, useEffect } from 'react';
import { ArrowRight, SkipForward, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { QuizQuestion, QuizQuestionResult } from '../types';

interface QuizGameScreenProps {
  questions: QuizQuestion[];
  onFinish: (score: number, results: QuizQuestionResult[]) => void;
  isLoading: boolean;
}

const QuizGameScreen: React.FC<QuizGameScreenProps> = ({ questions, onFinish, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [results, setResults] = useState<QuizQuestionResult[]>([]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-purple-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-xl font-semibold">Preparando as perguntas...</p>
      </div>
    );
  }

  // Error handling
  if (!questions || questions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-slate-600 mb-4">Erro ao carregar perguntas.</p>
        <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleNext = () => {
    // Armazena o resultado da questão
    const newResult: QuizQuestionResult = {
      question: currentQuestion,
      userAnswer: selectedAnswer,
      correctAnswer: currentQuestion.op_correta,
      isCorrect: selectedAnswer === currentQuestion.op_correta
    };
    
    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    if (isLastQuestion) {
      // Calcula o score
      const score = updatedResults.filter(r => r.isCorrect).length;
      onFinish(score, updatedResults);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const options = [
    { key: 'a', text: currentQuestion.op_a },
    { key: 'b', text: currentQuestion.op_b },
    { key: 'c', text: currentQuestion.op_c },
    { key: 'd', text: currentQuestion.op_d },
    { key: 'e', text: currentQuestion.op_e }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 flex flex-col h-full">
      {/* Header Progresso */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner">
          <div 
            className="bg-purple-500 h-full transition-all duration-500 ease-out" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <span className="ml-3 text-slate-500 text-xs font-bold whitespace-nowrap bg-slate-100 px-2 py-1 rounded-md">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col">
        
        <div className="p-6 sm:p-8">
          
          {/* Pergunta */}
          <div className="mb-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-purple-100 px-3 py-1 rounded-lg">
                <span className="text-purple-700 font-bold text-sm">Questão {currentIndex + 1}</span>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {currentQuestion.pergunta}
            </h2>
          </div>

          {/* Opções */}
          <div className="space-y-3 mb-8">
            {options.map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedAnswer(option.key)}
                className={`
                  w-full text-left p-4 rounded-xl border-2 transition-all
                  ${selectedAnswer === option.key
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0
                    ${selectedAnswer === option.key
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-100 text-slate-600'
                    }
                  `}>
                    {option.key.toUpperCase()}
                  </div>
                  <p className="text-slate-700 flex-1 pt-1">
                    {option.text}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleSkip} 
              variant="outline" 
              className="flex-1 order-2 sm:order-1 py-4 text-slate-500 hover:text-slate-700"
            >
              <SkipForward size={18} />
              Pular
            </Button>
            <Button 
              onClick={handleNext} 
              className={`flex-[2] order-1 sm:order-2 py-4 shadow-lg text-lg tracking-wide ${!selectedAnswer ? 'opacity-50 grayscale' : 'shadow-purple-300'}`}
              disabled={!selectedAnswer}
            >
              {isLastQuestion ? 'Finalizar' : 'Próxima'}
              <ArrowRight size={20} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizGameScreen;
