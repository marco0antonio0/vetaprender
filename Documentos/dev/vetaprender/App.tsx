import React, { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';
import AboutScreen from './screens/AboutScreen';
import { Screen, Question } from './types';
import { generateQuizQuestions } from './services/QuestionsService'; // Agora é o serviço local
import { GraduationCap, Home } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // Configuração do Jogo
  const GAME_CONFIG = {
    maxQuestions: 10,
    randomize: true,
    difficulty: 'normal' as const // 'easy', 'normal', 'hard'
  };

  // Verifica se há parâmetro result na URL ao carregar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultParam = urlParams.get('result');
    
    if (resultParam !== null) {
      const resultScore = parseInt(resultParam, 10);
      if (!isNaN(resultScore) && resultScore >= 0) {
        setScore(resultScore);
        // Simula perguntas vazias para o total (assumindo que é de 10)
        setQuestions(Array(GAME_CONFIG.maxQuestions).fill({} as Question));
        setCurrentScreen('RESULT');
        // Remove o parâmetro da URL sem recarregar a página
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  const startGame = async () => {
    setIsLoadingQuestions(true);
    setScore(0);
    setQuestions([]); // Limpa perguntas antigas primeiro
    setCurrentScreen('GAME');
    window.scrollTo(0, 0);
    
    // Gera perguntas usando o serviço local com as regras definidas
    const qs = await generateQuizQuestions(
      GAME_CONFIG.maxQuestions, 
      GAME_CONFIG.difficulty, 
      GAME_CONFIG.randomize
    );
    
    setQuestions(qs);
    setIsLoadingQuestions(false);
  };

  const finishGame = (finalScore: number) => {
    setScore(finalScore);
    setCurrentScreen('RESULT');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    // Confirmação simples se estiver no meio do jogo
    setCurrentScreen('HOME');
    setScore(0);
    setQuestions([]); // Limpa as perguntas anteriores
    window.scrollTo(0, 0); // Garante que a tela role para o topo
  };

  const handleLearnMore = () => {
    setCurrentScreen('ABOUT');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-center relative">
          
          {/* Left Icon Area - Z-Index 20 garante que fique acima do título */}
          <div className="absolute left-4 flex items-center z-20">
             {currentScreen !== 'HOME' ? (
                <button 
                  onClick={goHome}
                  type="button"
                  className="p-2 -ml-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors active:scale-95 cursor-pointer"
                  title="Voltar ao Início"
                >
                  <Home size={24} />
                </button>
             ) : (
                <div className="hidden sm:flex w-10 h-10 bg-emerald-100 rounded-xl items-center justify-center text-emerald-600 shadow-sm">
                   <GraduationCap size={24} />
                </div>
             )}
          </div>

          <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-800 select-none cursor-pointer z-10" onClick={() => currentScreen === 'HOME' && window.location.reload()}>
            Vet<span className="text-emerald-600">Aprender</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-4 sm:pt-8 pb-12 w-full">
        {currentScreen === 'HOME' && (
          <HomeScreen 
            onStart={startGame} 
            onLearnMore={handleLearnMore} 
          />
        )}
        
        {currentScreen === 'ABOUT' && (
          <AboutScreen onBack={goHome} />
        )}
        
        {currentScreen === 'GAME' && (
          <GameScreen 
            questions={questions} 
            isLoading={isLoadingQuestions}
            onFinish={finishGame} 
          />
        )}

        {currentScreen === 'RESULT' && (
          <ResultScreen 
            score={score} 
            total={questions.length} 
            onRestart={startGame}
            onHome={goHome}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-400 text-xs sm:text-sm mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-2 font-medium">© 2025 VetAprender. Todos os direitos reservados.</p>
          <p>Gamificando o ensino de medicina veterinária.</p>
        </div>
      </footer>
    </div>
  );
}