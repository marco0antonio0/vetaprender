import { Question, FeedbackData, Difficulty } from "../types";

// URLs da API para cada dificuldade
const API_URLS = {
  beginner: 'https://api-osteoplay-vet.netlify.app/api/endpoint/43vvFzYhtSnOShNaGYBN',
  challenging: 'https://api-osteoplay-vet.netlify.app/api/endpoint/Y8lJQqSyjHKj9NpQpFdC'
};

// Tipos da resposta da API
interface QuestionItem {
  id: string;
  endpointId: string;
  data: {
    nome: string;
    dica: string;
    imagem: string; // Base64
  };
  createdAt: string;
  updatedAt: string;
}

interface APIResponse {
  id: string;
  title: string;
  campos: Array<any>;
  createdAt: string;
  updatedAt: string;
  items: QuestionItem[];
}

// Cache para as questões
let cachedQuestions: {
  beginner: QuestionItem[] | null;
  challenging: QuestionItem[] | null;
} = {
  beginner: null,
  challenging: null
};

/**
 * Busca as questões da API
 */
const fetchQuestionsFromAPI = async (difficulty: 'beginner' | 'challenging'): Promise<QuestionItem[]> => {
  // Retorna do cache se já existe
  if (cachedQuestions[difficulty]) {
    return cachedQuestions[difficulty]!;
  }

  try {
    const response = await fetch(API_URLS[difficulty]);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: APIResponse = await response.json();
    
    if (data.items && data.items.length > 0) {
      cachedQuestions[difficulty] = data.items;
      return data.items;
    }

    return [];
  } catch (error) {
    console.error(`Erro ao buscar questões (${difficulty}):`, error);
    return [];
  }
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
  if (difficulty === 'easy') countToHide = 3; // Iniciante: 3 letras
  else if (difficulty === 'normal') countToHide = 3;
  else if (difficulty === 'hard') countToHide = length; // Desafiante: todas as letras

  // Ajuste de segurança: nunca ocultar mais do que o tamanho da palavra - 1 (exceto no hard)
  if (difficulty !== 'hard' && countToHide >= length) {
    countToHide = Math.max(1, length - 1);
  }

  // Se for Hard, esconde todas as letras (mas não espaços)
  if (difficulty === 'hard') {
    return letters.map(char => char === ' ' ? ' ' : '_').join('');
  }

  // Seleciona apenas índices que NÃO são espaços
  const availableIndices = letters
    .map((char, i) => char !== ' ' ? i : -1)
    .filter(i => i !== -1);
  
  // Embaralha índices disponíveis
  for (let i = availableIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
  }
  
  // Seleciona apenas a quantidade necessária de índices para ocultar
  indicesToHide = availableIndices.slice(0, Math.min(countToHide, availableIndices.length));

  // Monta a string mascarada (espaços sempre visíveis)
  return letters.map((char, index) => {
    if (char === ' ') return ' '; // Espaços sempre visíveis
    return indicesToHide.includes(index) ? '_' : char;
  }).join(''); // Não adiciona espaços entre as letras
};

/**
 * Gera as perguntas para o jogo a partir da API.
 */
export const generateQuizQuestions = async (
  difficulty: 'beginner' | 'challenging',
  maxQuestions: number = 10
): Promise<Question[]> => {
  
  // Busca questões da API
  const apiQuestions = await fetchQuestionsFromAPI(difficulty);
  
  if (apiQuestions.length === 0) {
    console.warn('Nenhuma questão disponível na API');
    return [];
  }

  // Embaralha as questões
  const shuffled = [...apiQuestions].sort(() => Math.random() - 0.5);
  
  // Seleciona apenas 10 questões
  const selected = shuffled.slice(0, Math.min(maxQuestions, shuffled.length));

  // Converte para o formato Question
  const difficultyLevel: Difficulty = difficulty === 'beginner' ? 'easy' : 'hard';
  
  return selected.map((item, index) => {
    const word = item.data.nome.toUpperCase();
    // Converte a imagem base64 para data URL se não estiver vazia
    const imageUrl = item.data.imagem 
      ? (item.data.imagem.startsWith('data:') ? item.data.imagem : `data:image/png;base64,${item.data.imagem}`)
      : undefined;
    
    return {
      id: item.id,
      word: word,
      hint: item.data.dica || 'Sem dica disponível',
      image: imageUrl,
      maskedWord: createMaskedWord(word, difficultyLevel)
    };
  });
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
