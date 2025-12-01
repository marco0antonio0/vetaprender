import React, { useEffect, useState } from 'react';
import { Share2, RefreshCw, Home, Star, Trophy, Lightbulb, GraduationCap } from 'lucide-react';
import Button from '../components/Button';
import { generateFeedback } from '../services/QuestionsService';
import { FeedbackData } from '../types';

interface ResultScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
  onHome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, onRestart, onHome }) => {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [showStars, setShowStars] = useState(0);

  useEffect(() => {
    const fetchFeedback = async () => {
      const data = await generateFeedback(score, total);
      setFeedback(data);
    };
    fetchFeedback();

    // Staggered animation for stars
    const timer1 = setTimeout(() => setShowStars(1), 300);
    const timer2 = setTimeout(() => setShowStars(2), 800);
    const timer3 = setTimeout(() => setShowStars(3), 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [score, total]);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?result=${score}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'VetAprender Resultado',
        text: `Consegui ${score} de ${total} estrelas no VetAprender! 🦴✨`,
        url: shareUrl,
      }).catch(console.error);
    } else {
      // Copia o link para a área de transferência
      navigator.clipboard.writeText(shareUrl).then(() => {
        // alert('Link copiado para a área de transferência!');
      }).catch(() => {
        // alert('Não foi possível copiar o link.');
      });
    }
  };

  // Determine star fill based on score (assuming 3 questions total = 3 stars)
  // If total changes, this logic adapts proportionally roughly.
  const getStarState = (starIndex: number) => {
    // 1st star: score >= 1
    // 2nd star: score >= 2
    // 3rd star: score >= 3
    return score >= starIndex;
  };

  const isWinner = score === total;

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-8rem)] sm:min-h-0 bg-slate-50 relative overflow-hidden animate-fade-in">
      
      {/* Top Banner - Game Style Background */}
      <div className={`relative w-full pb-12 pt-8 px-6 text-center rounded-b-[2.5rem] shadow-xl z-10 
        ${isWinner 
          ? 'bg-gradient-to-b from-yellow-400 to-orange-500' 
          : 'bg-gradient-to-b from-indigo-500 to-purple-600'
        }`}
      >
        {/* Animated Background Elements (Subtle circles) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-white rounded-full mix-blend-overlay"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-20 h-20 bg-white rounded-full mix-blend-overlay"></div>
        </div>

        <h2 className="text-white font-black text-2xl md:text-3xl mb-4 drop-shadow-md uppercase tracking-wide">
          {isWinner ? 'Impecável!' : 'Bom Jogo!'}
        </h2>

        {/* Trophy / Icon */}
        <div className="flex justify-center mb-6">
           <div className={`p-4 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 shadow-inner ${isWinner ? 'animate-bounce' : ''}`}>
             {isWinner ? (
               <Trophy size={48} className="text-yellow-100 drop-shadow-lg" fill="currentColor" />
             ) : (
               <GraduationCap size={48} className="text-indigo-100 drop-shadow-lg" />
             )}
           </div>
        </div>

        {/* Stars Container */}
        <div className="flex justify-center items-center gap-3 mb-2">
          {[1, 2, 3].map((index) => {
            const isActive = getStarState(index);
            const isVisible = showStars >= index;
            
            return (
              <div 
                key={index}
                className={`transform transition-all duration-500 ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-4'}`}
              >
                <Star 
                  size={index === 2 ? 64 : 48} // Middle star bigger
                  className={`drop-shadow-lg transition-colors duration-300 ${isActive ? 'text-yellow-300' : 'text-black/20'}`}
                  fill={isActive ? "currentColor" : "currentColor"}
                />
              </div>
            );
          })}
        </div>
        
        <p className="text-white/90 font-bold text-sm mt-2">
          Pontuação: {score} / {total}
        </p>
      </div>

      {/* Content Card */}
      <div className="flex-1 px-4 -mt-6 z-20 pb-8">
        <div className="bg-white rounded-3xl shadow-lg border-b-4 border-slate-200 p-6 flex flex-col items-center">
          
          {/* AI Feedback Section */}
          <div className="w-full mb-6">
            {!feedback ? (
               <div className="animate-pulse flex flex-col items-center space-y-3 py-4">
                 <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                 <div className="h-4 bg-slate-200 rounded w-1/2"></div>
               </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <p className="text-lg font-bold text-slate-800 leading-tight">
                    "{feedback.message}"
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={18} className="text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Power-ups de Conhecimento
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {feedback.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-emerald-100/50">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-slate-700 text-sm font-medium leading-snug">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <Button onClick={onRestart} variant="primary" fullWidth className="py-4 text-lg shadow-emerald-300">
              <RefreshCw size={20} className="mr-2" />
              Jogar Novamente
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={handleShare} variant="secondary" className="py-3 text-sm">
                <Share2 size={18} /> Compartilhar
              </Button>
              <Button onClick={onHome} variant="outline" className="py-3 text-sm">
                <Home size={18} /> Menu
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultScreen;