import React from 'react';
import { Play, Info, BookOpen, Stethoscope } from 'lucide-react';
import Button from '../components/Button';

interface HomeScreenProps {
  onStart: () => void;
  onLearnMore: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, onLearnMore }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto px-4 text-center mt-6">
      <div className="mb-8 p-4 bg-emerald-100 rounded-full animate-bounce">
        <Stethoscope size={64} className="text-emerald-600" />
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Gamificando o <span className="text-emerald-600">Aprendizado Vet</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl">
        Domine a anatomia veterinária de forma interativa. 
        Teste seus conhecimentos sobre ossos e órgãos agora mesmo!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button onClick={onStart} className="text-lg">
          <Play size={20} />
          Jogar Agora
        </Button>
        <Button variant="outline" onClick={onLearnMore}>
          <BookOpen size={20} />
          Sobre o Projeto
        </Button>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto text-blue-600">
            <Info />
          </div>
          <h3 className="font-bold text-lg mb-2">Interativo</h3>
          <p className="text-slate-500 text-sm">Aprenda completando desafios dinâmicos.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto text-purple-600">
            <Stethoscope />
          </div>
          <h3 className="font-bold text-lg mb-2">Focado em Vet</h3>
          <p className="text-slate-500 text-sm">Conteúdo especializado para estudantes.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto text-orange-600">
            <BookOpen />
          </div>
          <h3 className="font-bold text-lg mb-2">Feedback Inteligente</h3>
          <p className="text-slate-500 text-sm">Receba dicas personalizadas.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;