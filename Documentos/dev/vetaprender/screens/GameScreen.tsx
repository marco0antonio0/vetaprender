import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, SkipForward, HelpCircle, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { Question } from '../types';

interface GameScreenProps {
  questions: Question[];
  onFinish: (score: number) => void;
  isLoading: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ questions, onFinish, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Inicializa o input quando a pergunta muda
  useEffect(() => {
    if (questions && questions[currentIndex]) {
      const q = questions[currentIndex];
      const rawMask = q.maskedWord.replace(/\s/g, ''); 
      const initialInput = rawMask.split('').map(char => char === '_' ? '' : char);
      
      setUserInput(initialInput);
      
      // Pequeno delay para garantir foco no mobile na transição
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [currentIndex, questions]);

  // Mantém o foco no input
  useEffect(() => {
    const handleFocus = () => inputRef.current?.focus();
    window.addEventListener('click', handleFocus);
    return () => window.removeEventListener('click', handleFocus);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-emerald-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-xl font-semibold">Preparando o desafio...</p>
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
  const targetWord = currentQuestion.word.toUpperCase();
  const wordLength = targetWord.length;

  const emptySlots = userInput.filter(char => char === '').length;
  const isComplete = emptySlots === 0;

  // Função para normalizar texto (remove acentos e converte para maiúsculas)
  const normalizeText = (text: string): string => {
    return text
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const handleNext = (pointsToAdd: number) => {
    const newScore = score + pointsToAdd;
    setScore(newScore);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinish(newScore);
    }
  };

  const handleConfirm = () => {
    const currentWord = normalizeText(userInput.join(''));
    const target = normalizeText(targetWord);
    
    // Verifica se acertou, mas NÃO mostra erro visual.
    // Apenas contabiliza e passa para o próximo.
    if (currentWord === target) {
      handleNext(1);
    } else {
      handleNext(0);
    }
  };

  const handleSkip = () => {
    // Pular conta como erro (0 pontos)
    handleNext(0);
  };

  // Manipulador de Entrada de Texto (Letras)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;

    // Pega apenas a última letra digitada para garantir compatibilidade
    const char = val.slice(-1).toUpperCase();
    
    // Limpa o input imediatamente para o próximo caractere
    e.target.value = '';

    if (/^[A-Z]$/.test(char)) {
      const rawMask = currentQuestion.maskedWord.replace(/\s/g, '');
      const newOne = [...userInput];
      
      // Encontra a primeira lacuna vazia que não é fixa
      for (let i = 0; i < wordLength; i++) {
        if (rawMask[i] === '_' && newOne[i] === '') {
          newOne[i] = char;
          setUserInput(newOne);
          break;
        }
      }
    }
  };

  // Manipulador de Teclas Especiais (Backspace)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const rawMask = currentQuestion.maskedWord.replace(/\s/g, '');
      const newOne = [...userInput];
      
      // Remove a última letra inserida pelo usuário (de trás para frente)
      for (let i = wordLength - 1; i >= 0; i--) {
        // Se for um slot editável (era '_') e não estiver vazio
        if (rawMask[i] === '_' && newOne[i] !== '') {
          newOne[i] = '';
          setUserInput(newOne);
          break; 
        }
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 flex flex-col h-full outline-none">
      {/* Header Progresso */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner">
             <div 
               className="bg-emerald-500 h-full transition-all duration-500 ease-out" 
               style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
             ></div>
        </div>
        <span className="ml-3 text-slate-500 text-xs font-bold whitespace-nowrap bg-slate-100 px-2 py-1 rounded-md">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col relative">
        
        {/* Imagem */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-100 group shrink-0">
            {currentQuestion.image && (
              <img 
                src={currentQuestion.image} 
                alt="Anatomia" 
                className="w-full h-full object-contain opacity-90"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent flex items-end p-5">
               <div className="text-white w-full">
                 <div className="flex items-start gap-3">
                    <div className="bg-emerald-500 p-2 rounded-lg mt-1 shadow-lg shadow-emerald-900/20">
                      <HelpCircle size={20} className="text-white" />
                    </div>
                    <div>
                        <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">Dica da Questão</p>
                        <p className="font-medium text-lg leading-snug shadow-black drop-shadow-md">
                        {currentQuestion.hint}
                        </p>
                    </div>
                 </div>
               </div>
            </div>
        </div>

        <div className="p-6 flex flex-col items-center w-full relative">
          
          {/* Área de Input Interativo */}
          <div className="relative mb-8 w-full mt-4" onClick={() => inputRef.current?.focus()}>
             
             {/* Input Invisível para Teclado Mobile e Desktop */}
             <input 
                ref={inputRef}
                type="text" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 caret-transparent text-transparent" 
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                spellCheck={false}
                value="" 
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
             />

             {/* Slots Visuais */}
             <div className="flex justify-center flex-wrap gap-2 sm:gap-3 pointer-events-none">
                {Array.from({ length: wordLength }).map((_, index) => {
                    const rawMask = currentQuestion.maskedWord.replace(/\s/g, '');
                    const isFixed = rawMask[index] !== '_';
                    const char = userInput[index] || '';
                    
                    // Lógica para destacar o "próximo campo vazio"
                    const isNextToFill = !isFixed && char === '' && userInput.slice(0, index).every((c, i) => {
                        const maskChar = currentQuestion.maskedWord.replace(/\s/g, '')[i];
                        return maskChar !== '_' || c !== '';
                    });

                    return (
                        <div 
                            key={index}
                            className={`
                                w-11 h-14 sm:w-14 sm:h-16 
                                flex items-center justify-center 
                                text-2xl sm:text-3xl font-bold rounded-xl border-b-[5px]
                                transition-all duration-200 select-none shadow-sm
                                ${isFixed 
                                    ? 'border-slate-300 bg-slate-200 text-slate-500' // Estilo travado
                                    : char 
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 transform scale-105' // Preenchido
                                        : isNextToFill
                                            ? 'border-indigo-400 bg-white ring-4 ring-indigo-100 animate-pulse' // Foco atual
                                            : 'border-slate-200 bg-slate-50' // Vazio
                                }
                            `}
                        >
                            {isFixed ? rawMask[index] : char}
                        </div>
                    );
                })}
             </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-auto pt-4 border-t border-slate-50 relative z-30">
            <Button 
              onClick={handleSkip} 
              variant="outline" 
              className="flex-1 order-2 sm:order-1 py-4 text-slate-500 hover:text-slate-700"
            >
              <SkipForward size={18} />
              Pular
            </Button>
            <Button 
              onClick={handleConfirm} 
              className={`flex-[2] order-1 sm:order-2 py-4 shadow-lg text-lg tracking-wide ${!isComplete ? 'opacity-50 grayscale' : 'shadow-emerald-300 animate-pulse-slow'}`}
              disabled={!isComplete}
            >
              Confirmar
              <ArrowRight size={20} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Teclado Helper Text */}
      <p className="text-center text-slate-400 text-xs mt-4">
         Toque nas letras para digitar
      </p>
    </div>
  );
};

export default GameScreen;