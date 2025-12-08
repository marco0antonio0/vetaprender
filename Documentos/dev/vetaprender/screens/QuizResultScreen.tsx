import React, { useState } from 'react';
import { RefreshCw, Home, Trophy, GraduationCap, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../components/Button';
import { QuizQuestionResult } from '../types';

interface QuizResultScreenProps {
  score: number;
  total: number;
  results: QuizQuestionResult[];
  onRestart: () => void;
  onHome: () => void;
}

const QuizResultScreen: React.FC<QuizResultScreenProps> = ({ score, total, results, onRestart, onHome }) => {
  const [showReview, setShowReview] = useState(false);
  
  const percentage = total === 0 ? 0 : (score / total) * 100;
  const isWinner = percentage >= 70;

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-8rem)] sm:min-h-0 bg-slate-50 relative overflow-hidden animate-fade-in">
      
      {/* Top Banner */}
      <div className={`relative w-full pb-12 pt-8 px-6 text-center rounded-b-[2.5rem] shadow-xl z-10 
        ${isWinner 
          ? 'bg-gradient-to-b from-yellow-400 to-orange-500' 
          : 'bg-gradient-to-b from-purple-500 to-indigo-600'
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-white rounded-full mix-blend-overlay"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-20 h-20 bg-white rounded-full mix-blend-overlay"></div>
        </div>

        <h2 className="text-white font-black text-2xl md:text-3xl mb-4 drop-shadow-md uppercase tracking-wide">
          {isWinner ? 'Parabéns!' : 'Quiz Finalizado!'}
        </h2>

        <div className="flex justify-center mb-6">
           <div className={`p-4 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 shadow-inner ${isWinner ? 'animate-bounce' : ''}`}>
             {isWinner ? (
               <Trophy size={48} className="text-yellow-100 drop-shadow-lg" fill="currentColor" />
             ) : (
               <GraduationCap size={48} className="text-purple-100 drop-shadow-lg" />
             )}
           </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block">
          <p className="text-white/90 text-sm font-semibold mb-2">Sua Pontuação</p>
          <p className="text-white font-black text-5xl mb-1">{score}/{total}</p>
          <p className="text-white/80 text-lg font-bold">{percentage.toFixed(0)}%</p>
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 px-4 -mt-6 z-20 pb-8">
        <div className="bg-white rounded-3xl shadow-lg border-b-4 border-slate-200 p-6 flex flex-col items-center">
          
          {/* Feedback */}
          <div className="w-full mb-6 text-center">
            <p className="text-lg font-bold text-slate-800 leading-tight mb-2">
              {percentage === 100 && "Perfeito! Você dominou o conteúdo!"}
              {percentage >= 70 && percentage < 100 && "Excelente trabalho!"}
              {percentage >= 50 && percentage < 70 && "Bom desempenho, continue estudando!"}
              {percentage < 50 && "Continue praticando, você vai melhorar!"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3 mb-6">
            <Button onClick={onRestart} variant="primary" fullWidth className="py-4 text-lg shadow-purple-300">
              <RefreshCw size={20} className="mr-2" />
              Jogar Novamente
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => setShowReview(!showReview)} variant="secondary" className="py-3 text-sm">
                {showReview ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                {showReview ? 'Ocultar' : 'Ver Revisão'}
              </Button>
              <Button onClick={onHome} variant="outline" className="py-3 text-sm">
                <Home size={18} /> Menu
              </Button>
            </div>
          </div>

          {/* Results Section */}
          {showReview && (
            <div className="w-full mb-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-slate-800">Revisão das Questões</h3>
              </div>
              
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div 
                    key={result.question.id}
                    className={`
                      rounded-xl p-4 border-2 transition-all
                      ${result.isCorrect 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-red-50 border-red-200'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        p-2 rounded-lg shrink-0
                        ${result.isCorrect ? 'bg-emerald-100' : 'bg-red-100'}
                      `}>
                        {result.isCorrect ? (
                          <CheckCircle2 size={20} className="text-emerald-600" />
                        ) : (
                          <XCircle size={20} className="text-red-600" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-slate-500">
                            Questão {index + 1}
                          </span>
                          <span className={`
                            px-2 py-0.5 rounded-full text-xs font-bold
                            ${result.isCorrect 
                              ? 'bg-emerald-200 text-emerald-700' 
                              : 'bg-red-200 text-red-700'
                            }
                          `}>
                            {result.isCorrect ? 'Acertou' : 'Errou'}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-700 mb-1">
                              {result.question.pergunta}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-slate-500 font-medium">Resposta Correta:</p>
                            <p className="text-sm font-bold text-emerald-700">
                              {result.correctAnswer.toUpperCase()}) {(result.question as any)[`op_${result.correctAnswer}`]}
                            </p>
                          </div>
                          
                          {!result.isCorrect && result.userAnswer && (
                            <div>
                              <p className="text-xs text-slate-500 font-medium">Sua Resposta:</p>
                              <p className="text-sm font-bold text-red-600">
                                {result.userAnswer.toUpperCase()}) {(result.question as any)[`op_${result.userAnswer}`]}
                              </p>
                            </div>
                          )}
                          
                          {!result.userAnswer && (
                            <div>
                              <p className="text-xs text-slate-500 font-medium italic">
                                Você pulou esta questão
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default QuizResultScreen;
