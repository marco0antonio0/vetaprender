import React from 'react';
import { Play, Info, BookOpen, Stethoscope, HelpCircle, ExternalLink } from 'lucide-react';
import Button from '../components/Button';

interface HomeScreenProps {
  onStart: () => void;
  onStartQuiz: () => void;
  onLearnMore: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, onStartQuiz, onLearnMore }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl mx-auto px-4 text-center mt-6 relative overflow-hidden">
      
      {/* Floating Vet Icons Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-10 left-10 animate-drift" style={{ animationDelay: '0s' }}>
          <Stethoscope size={60} className="text-emerald-600" />
        </div>
        <div className="absolute top-32 right-20 animate-spin-slow" style={{ animationDelay: '1s' }}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-teal-600">
            <path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute bottom-40 left-32 animate-bounce-subtle" style={{ animationDelay: '2s' }}>
          <svg width="55" height="55" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-500">
            <path d="M12 2a5 5 0 0 0-5 5v2H5v2h1v6a5 5 0 0 0 5 5h2a5 5 0 0 0 5-5V11h1V9h-2V7a5 5 0 0 0-5-5z"/>
          </svg>
        </div>
        <div className="absolute top-64 right-40 animate-drift" style={{ animationDelay: '1.5s' }}>
          <HelpCircle size={50} className="text-purple-500" />
        </div>
        <div className="absolute bottom-20 right-16 animate-fade-pulse" style={{ animationDelay: '0.5s' }}>
          <svg width="65" height="65" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-teal-500">
            <circle cx="12" cy="12" r="3" strokeWidth="2"/>
            <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute top-96 left-64 animate-bounce-subtle" style={{ animationDelay: '2.5s' }}>
          <BookOpen size={45} className="text-slate-400" />
        </div>
        <div className="absolute bottom-64 left-20 animate-drift" style={{ animationDelay: '1.2s' }}>
          <svg width="58" height="58" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-400">
            <path d="M9 2L7 6H3l3.5 3L5 13l4-3 4 3-1.5-4L15 6h-4l-2-4z"/>
          </svg>
        </div>
      </div>

      {/* Hero Section Limpo */}
      <div className="relative mb-12 w-full z-10">
        {/* Animated Icon */}
        <div className="relative mb-6 inline-flex items-center justify-center">
          {/* Paw prints decoration */}
          <div className="absolute -top-8 -left-12 opacity-20 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-600">
              <ellipse cx="8.5" cy="12" rx="2.5" ry="3"/>
              <ellipse cx="15.5" cy="12" rx="2.5" ry="3"/>
              <ellipse cx="12" cy="5.5" rx="3" ry="2.5"/>
              <ellipse cx="12" cy="17" rx="4" ry="3"/>
            </svg>
          </div>
          <div className="absolute -bottom-6 -right-10 opacity-20 animate-drift" style={{ animationDelay: '1.5s' }}>
            <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor" className="text-teal-600">
              <ellipse cx="8.5" cy="12" rx="2.5" ry="3"/>
              <ellipse cx="15.5" cy="12" rx="2.5" ry="3"/>
              <ellipse cx="12" cy="5.5" rx="3" ry="2.5"/>
              <ellipse cx="12" cy="17" rx="4" ry="3"/>
            </svg>
          </div>
          
          <div className="rounded-2xl shadow-lg w-[200px] h-[200px] bg-emerald-50 flex items-center justify-center animate-float">
              <img src="/midia/image-3.png" alt="OsteoPlayVet" className="w-full h-full object-contain p-4" />
          </div>
        </div>

        {/* Title with Gradient */}
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-tight">
          <span className="text-slate-900">OsteoPlay</span>
          <span className="text-emerald-600">Vet</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-2 max-w-3xl mx-auto font-medium">
          🎮 Aprenda anatomia veterinária jogando! 
        </p>
        <p className="text-lg text-slate-500 mb-8">Desafios, pontuações e diversão garantida</p>
        
        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center gap-2 animate-bounce-down mt-4">
          <span className="text-sm text-slate-400 font-medium">Role para baixo</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
            <polyline points="7 13 12 18 17 13"></polyline>
            <polyline points="7 6 12 11 17 6"></polyline>
          </svg>
        </div>
      </div>

      {/* Game Cards com Imagens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
        
        {/* Vet-Ossos Card */}
        <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border-2 border-emerald-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <img src="/midia/image-1.png" alt="" className="w-full h-full object-cover sepia brightness-90 hue-rotate-[70deg] saturate-150" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                🦴 POPULAR
              </div>
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={32} className="text-emerald-600" />
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-emerald-800 mb-2">Vet-Ossos</h3>
            <p className="text-slate-600 mb-4 text-sm">
              Complete as lacunas e identifique os ossos! Teste sua memória e conhecimento anatômico.
            </p>
            
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
              <span className="bg-white px-3 py-1 rounded-full">⚡ 10 Questões</span>
              <span className="bg-white px-3 py-1 rounded-full">🎯 2 Níveis</span>
            </div>

            <Button 
              onClick={onStart} 
              className="w-full text-lg bg-emerald-600 hover:bg-emerald-700 shadow-emerald-300"
            >
              <Play size={20} />
              Jogar Agora
            </Button>
          </div>
        </div>

        {/* Vet-Perguntas Card */}
        <div className="group relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-6 border-2 border-purple-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <img src="/midia/image-1.png" alt="" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                🧠 QUIZ
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <HelpCircle size={32} className="text-purple-600" />
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-purple-800 mb-2">Vet-Perguntas</h3>
            <p className="text-slate-600 mb-4 text-sm">
              Responda perguntas de múltipla escolha e prove seu conhecimento veterinário!
            </p>
            
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
              <span className="bg-white px-3 py-1 rounded-full">⚡ 10 Questões</span>
              <span className="bg-white px-3 py-1 rounded-full">🎯 5 Alternativas</span>
            </div>

            <Button 
              onClick={onStartQuiz} 
              className="w-full text-lg bg-purple-600 hover:bg-purple-700 shadow-purple-300"
            >
              <HelpCircle size={20} />
              Começar Quiz
            </Button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full max-w-4xl mt-4">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-slate-200 p-3 rounded-xl">
                <BookOpen size={24} className="text-slate-700" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-800 text-lg">Sobre o OsteoPlayVet</h3>
                <p className="text-sm text-slate-600">Conheça mais sobre o projeto e seus objetivos</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onLearnMore} 
              className="border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
            >
              Saiba Mais
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Partner Section */}
      <div className="w-full max-w-4xl mt-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-200 p-3 rounded-xl">
                <ExternalLink size={24} className="text-blue-700" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-blue-600 mb-0.5">🔬 Recurso Parceiro</p>
                <h3 className="font-bold text-slate-800 text-lg">Veterinary Anatomy Viewer</h3>
                <p className="text-sm text-slate-600">Explore anatomia 3D interativa</p>
              </div>
            </div>
            <a 
              href="https://virtualanimalproject.vetmed.vt.edu/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                className="border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all"
              >
                Visitar Site
                <ExternalLink size={16} className="ml-1" />
              </Button>
            </a>
          </div>
          
          {/* Preview do Site */}
          <div className="rounded-xl overflow-hidden border-2 border-blue-200 shadow-md">
            <iframe 
              src="https://virtualanimalproject.vetmed.vt.edu/"
              className="w-full h-96"
              title="Veterinary Anatomy Viewer Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
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