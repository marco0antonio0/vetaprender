import React from 'react';
import { ArrowLeft, Star, Flame, HelpCircle } from 'lucide-react';
import Button from '../components/Button';

interface QuizDifficultyScreenProps {
  onSelectDifficulty: (difficulty: 'beginner' | 'challenging') => void;
  onBack: () => void;
}

const QuizDifficultyScreen: React.FC<QuizDifficultyScreenProps> = ({ onSelectDifficulty, onBack }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 animate-fade-in pb-8">
      
      {/* Header Visual */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 mb-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-black/10 rounded-full blur-xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-inner border border-white/30">
            <HelpCircle size={32} className="text-purple-50" />
          </div>
          <h2 className="text-3xl font-black tracking-tight mb-2">Escolha o Nível</h2>
          <p className="text-purple-50 text-sm">Vet-Perguntas: Teste seus conhecimentos</p>
          <div className="h-1 w-12 bg-purple-400 rounded-full mt-3"></div>
        </div>
      </div>

      {/* Difficulty Options */}
      <div className="space-y-4 mb-6">
        
        {/* Iniciante */}
        <button
          onClick={() => onSelectDifficulty('beginner')}
          className="w-full bg-white rounded-2xl p-6 shadow-sm border-2 border-slate-200 hover:border-purple-500 hover:shadow-md transition-all group text-left"
        >
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-colors shrink-0">
              <Star size={28} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-black text-xl text-slate-900">Iniciante</h3>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                  FÁCIL
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Perguntas de múltipla escolha para iniciantes em medicina veterinária. Teste seus conhecimentos básicos!
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                </div>
                <span className="font-medium">10 Perguntas • 5 Alternativas</span>
              </div>
            </div>
          </div>
        </button>

        {/* Desafiante */}
        <button
          onClick={() => onSelectDifficulty('challenging')}
          className="w-full bg-white rounded-2xl p-6 shadow-sm border-2 border-slate-200 hover:border-orange-500 hover:shadow-md transition-all group text-left"
        >
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-xl group-hover:bg-orange-200 transition-colors shrink-0">
              <Flame size={28} className="text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-black text-xl text-slate-900">Desafiante</h3>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                  DIFÍCIL
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Questões avançadas para estudantes experientes. Teste o seu domínio em medicina veterinária!
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </div>
                <span className="font-medium">10 Perguntas • 5 Alternativas</span>
              </div>
            </div>
          </div>
        </button>

      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-blue-800 text-sm text-center">
          <span className="font-bold">💡 Dica:</span> Você pode pular questões e revisá-las no final
        </p>
      </div>

      {/* Back Button */}
      <Button onClick={onBack} variant="outline" fullWidth className="py-4 text-slate-600 border-slate-300">
        <ArrowLeft size={20} />
        Voltar ao Início
      </Button>
    </div>
  );
};

export default QuizDifficultyScreen;
