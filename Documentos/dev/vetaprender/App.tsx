import React, { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';
import AboutScreen from './screens/AboutScreen';
import DifficultyScreen from './screens/DifficultyScreen';
import QuizDifficultyScreen from './screens/QuizDifficultyScreen';
import QuizGameScreen from './screens/QuizGameScreen';
import QuizResultScreen from './screens/QuizResultScreen';
import { Screen, Question, QuestionResult, QuizQuestion, QuizQuestionResult } from './types';
import { generateQuizQuestions } from './services/QuestionsService';
import { generateQuizQuestions as generateQuizQuestionsAPI } from './services/QuizQuestionsService';
import { GraduationCap, Home } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [quizResults, setQuizResults] = useState<QuizQuestionResult[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'challenging'>('beginner');

  // Configuração do Jogo
  const GAME_CONFIG = {
    maxQuestions: 10
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

  const showDifficultySelection = () => {
    setCurrentScreen('DIFFICULTY');
    window.scrollTo(0, 0);
  };

  const showQuizDifficultySelection = () => {
    setCurrentScreen('QUIZ_DIFFICULTY');
    window.scrollTo(0, 0);
  };

  const startGame = async (difficulty: 'beginner' | 'challenging') => {
    setIsLoadingQuestions(true);
    setScore(0);
    setQuestions([]);
    setResults([]);
    setSelectedDifficulty(difficulty);
    setCurrentScreen('GAME');
    window.scrollTo(0, 0);
    
    // Gera perguntas usando o serviço da API
    const qs = await generateQuizQuestions(difficulty, GAME_CONFIG.maxQuestions);
    
    setQuestions(qs);
    setIsLoadingQuestions(false);
  };

  const startQuizGame = async (difficulty: 'beginner' | 'challenging') => {
    setIsLoadingQuestions(true);
    setScore(0);
    setQuizQuestions([]);
    setQuizResults([]);
    setSelectedDifficulty(difficulty);
    setCurrentScreen('QUIZ_GAME');
    window.scrollTo(0, 0);
    
    // Gera perguntas do quiz usando o serviço da API
    const qs = await generateQuizQuestionsAPI(difficulty, GAME_CONFIG.maxQuestions);
    
    setQuizQuestions(qs);
    setIsLoadingQuestions(false);
  };

  const finishGame = (finalScore: number, gameResults: QuestionResult[]) => {
    setScore(finalScore);
    setResults(gameResults);
    setCurrentScreen('RESULT');
    window.scrollTo(0, 0);
  };

  const finishQuizGame = (finalScore: number, gameResults: QuizQuestionResult[]) => {
    setScore(finalScore);
    setQuizResults(gameResults);
    setCurrentScreen('QUIZ_RESULT');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    // Confirmação simples se estiver no meio do jogo
    setCurrentScreen('HOME');
    setScore(0);
    setQuestions([]); // Limpa as perguntas anteriores
    setQuizQuestions([]);
    setResults([]);
    setQuizResults([]);
    window.scrollTo(0, 0); // Garante que a tela role para o topo
  };

  const handleRestartGame = () => {
    // Reinicia com a mesma dificuldade
    startGame(selectedDifficulty);
  };

  const handleRestartQuizGame = () => {
    // Reinicia com a mesma dificuldade
    startQuizGame(selectedDifficulty);
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
            OsteoPlay<span className="text-emerald-600">Vet</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-4 sm:pt-8 pb-12 w-full">
        {currentScreen === 'HOME' && (
          <HomeScreen 
            onStart={showDifficultySelection} 
            onLearnMore={handleLearnMore} 
          />
        )}
        
        {currentScreen === 'DIFFICULTY' && (
          <DifficultyScreen 
            onSelectDifficulty={startGame}
            onBack={goHome}
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
            results={results}
            onRestart={handleRestartGame}
            onHome={goHome}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-400 text-xs sm:text-sm mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-2 font-medium">© 2025 OsteoPlay Vet. Todos os direitos reservados.</p>
          <p>Gamificando o ensino de medicina veterinária.</p>
        </div>
      </footer>
    </div>
  );
}