import { Question, FeedbackData, Difficulty } from "../types";

// Estrutura solicitada pelo usuário
const STATIC_DB = {
  data: [
    {
      palavra: "Atlas",
      imagem: "/questoes/IMG_4525.PNG",
      dica: "Primeira vértebra cervical que sustenta o crânio."
    },
    {
      palavra: "Fêmur",
      imagem: "/questoes/IMG_4526.PNG",
      dica: "Maior osso do corpo, localizado na coxa."
    },
    {
      palavra: "Vértebra cervical",
      imagem: "/questoes/IMG_4527.PNG",
      dica: "Ossos curvos que formam a caixa torácica e protegem pulmões."
    },
    {
      palavra: "Úmero",
      imagem: "/questoes/IMG_4528.PNG",
      dica: "Osso longo do braço superior, conecta o ombro ao cotovelo."
    },
    {
      palavra: "Osso Nasal",
      imagem: "/questoes/IMG_4529.PNG",
      dica: "Pequenos ossos que formam a ponte do nariz."
    },
    {
      palavra: "Osso Coxal",
      imagem: "/questoes/IMG_4530.PNG",
      dica: "Osso grande e plano que forma a base da coluna vertebral."
    },
    {
      palavra: "Sacro",
      imagem: "/questoes/IMG_4531.PNG", 
      dica: "Osso plano triangular localizado na parte posterior do ombro."
    },
    {
      palavra: "Occipital",
      imagem: "/questoes/IMG_4532.PNG",
      dica: "Osso que forma a parte posterior e base do crânio."
    },
    {
      palavra: "Tíbia",
      imagem: "/questoes/IMG_4533.PNG",
      dica: "Osso longo da perna, conhecido como canela."
    },
    {
      palavra: "Rádio-ulna",
      imagem: "/questoes/IMG_4534.PNG",
      dica: "Osso longo do antebraço, composto por dois ossos fundidos."
    },
  ]
};

/**
 * Função para criar a máscara da palavra baseada na dificuldade.
 */
const createMaskedWord = (word: string, difficulty: Difficulty): string => {
  const letters = word.split('');
  const length = letters.length;
  let indicesToHide: number[] = [];

  // Define quantos ocultar
  let countToHide = 0;
  if (difficulty === 'easy') countToHide = 2;
  else if (difficulty === 'normal') countToHide = 3;
  else if (difficulty === 'hard') countToHide = length; // Oculta tudo

  // Ajuste de segurança: nunca ocultar mais do que o tamanho da palavra - 1 (exceto no hard)
  if (difficulty !== 'hard' && countToHide >= length) {
    countToHide = Math.max(1, length - 1);
  }

  // Se for Hard, esconde tudo direto
  if (difficulty === 'hard') {
    return Array(length).fill('_').join(' ');
  }

  // Seleciona índices aleatórios para ocultar
  const availableIndices = Array.from({ length }, (_, i) => i);
  // Embaralha índices
  for (let i = availableIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
  }
  
  indicesToHide = availableIndices.slice(0, countToHide);

  // Monta a string mascarada
  return letters.map((char, index) => {
    return indicesToHide.includes(index) ? '_' : char;
  }).join(' ');
};

/**
 * Gera as perguntas para o jogo a partir do JSON estático.
 */
export const generateQuizQuestions = async (
  maxQuestions: number = 10,
  difficulty: Difficulty = 'normal',
  randomize: boolean = true
): Promise<Question[]> => {
  
  // Simula um loading rápido
  await new Promise(resolve => setTimeout(resolve, 400));

  // Converte o formato do JSON (palavra, imagem, dica) para o formato interno (Question)
  let rawQuestions = STATIC_DB.data.map((item, index) => ({
    id: String(index),
    word: item.palavra.toUpperCase(),
    hint: item.dica,
    image: item.imagem,
    maskedWord: "" // Será preenchido abaixo
  }));

  // 1. Embaralhar se necessário
  if (randomize) {
    rawQuestions.sort(() => Math.random() - 0.5);
  }

  // 2. Cortar para o máximo permitido
  const selectedRawQuestions = rawQuestions.slice(0, maxQuestions);

  // 3. Aplicar máscara de dificuldade
  return selectedRawQuestions.map(q => ({
    ...q,
    maskedWord: createMaskedWord(q.word, difficulty)
  }));
};

/**
 * Gera feedback localmente baseado na pontuação.
 */
export const generateFeedback = async (score: number, total: number): Promise<FeedbackData> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const percentage = total === 0 ? 0 : (score / total) * 100;

  if (percentage === 100) {
    return {
      message: "Lendário! Anatomia dominada.",
      tips: ["Você está pronto para exames práticos!", "Considere ser monitor da disciplina."]
    };
  } else if (percentage >= 70) {
    return {
      message: "Mandou muito bem!",
      tips: ["Revise apenas os detalhes que errou.", "Tente o modo difícil na próxima."]
    };
  } else if (percentage >= 40) {
    return {
      message: "Bom começo, continue estudando.",
      tips: ["Foque nos nomes dos ossos principais.", "Use flashcards para memorização."]
    };
  } else {
    return {
      message: "Não desanime, a prática leva à perfeição.",
      tips: ["Revisite o atlas de anatomia.", "Comece pelos ossos dos membros."]
    };
  }
};
