import React from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Award, Users } from 'lucide-react';
import Button from '../components/Button';

interface AboutScreenProps {
  onBack: () => void;
}

// Dados dos integrantes (Substitua pelas informações reais)
const TEAM_MEMBERS = [
  {
    name: 'Ana Luísa Bagot',
    role: 'Graduando em Med. Veterinária',
    image: '🎓'
  },
    {
    name: 'Érika Kamyla Nogueira Raniéri',
    role: 'Graduando em Med. Veterinária',
    image: '🎓'
  },
  {
    name: 'Raissa Sawada Cutrim Gutierrez',
    role: 'Graduando em Med. Veterinária',
    image: '🎓'
  }
];

const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 animate-fade-in pb-8">
      
      {/* Header Visual */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 mb-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-black/10 rounded-full blur-xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-inner border border-white/30">
            <BookOpen size={32} className="text-emerald-50" />
          </div>
          <h2 className="text-3xl font-black tracking-tight mb-2">Sobre o Projeto</h2>
          <div className="h-1 w-12 bg-emerald-400 rounded-full"></div>
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-8 text-slate-700 leading-relaxed">
        
        {/* Seção de Texto */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-50 p-2 rounded-lg mt-1 shrink-0">
               <GraduationCap className="text-indigo-600" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Objetivo Acadêmico</h3>
              <p>
                Este projeto de TCC tem como objetivo desenvolver uma ferramenta inovadora para estudantes de 
                <strong className="text-emerald-700"> Medicina Veterinária</strong>, utilizando conceitos de gamificação para tornar o aprendizado mais interativo e envolvente.
              </p>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          <div className="flex items-start gap-4">
            <div className="bg-orange-50 p-2 rounded-lg mt-1 shrink-0">
               <Award className="text-orange-600" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Metodologia</h3>
              <p className="mb-4">
                A proposta é facilitar a compreensão de conteúdos complexos do ensino superior, transformando tópicos desafiadores em experiências de estudo mais dinâmicas e acessíveis.
              </p>
              <p>
                Através de recursos lúdicos, atividades práticas e desafios educativos, o projeto busca aumentar a motivação dos alunos, promovendo a retenção de conhecimento de forma eficiente e prazerosa.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm italic text-slate-600">
            "Essa abordagem alia tecnologia e pedagogia, oferecendo uma nova maneira de aprender conteúdos essenciais da Medicina Veterinária sem perder profundidade acadêmica."
          </div>
        </div>

        {/* Seção de Integrantes */}
        <div className="pt-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Users size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-black text-slate-900 text-xl">Integrantes</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-emerald-500 mb-3 shadow-sm bg-white text-4xl">
                  {member.image}
                </div>
                <h4 className="font-bold text-slate-800 text-base">{member.name}</h4>
                <span className="text-emerald-600 text-xs font-semibold uppercase tracking-wide mt-1">{member.role}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Action */}
      <div className="mt-8">
        <Button onClick={onBack} variant="outline" fullWidth className="py-4 text-slate-600 border-slate-300">
          <ArrowLeft size={20} />
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
};

export default AboutScreen;