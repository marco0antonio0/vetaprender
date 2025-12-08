import { QuizQuestion } from "../types";

// URLs da API para cada dificuldade
const API_URLS = {
  beginner: 'https://api-osteoplay-vet.netlify.app/api/endpoint/gEb65grRFjRYw8gB4Bgv',
  challenging: 'https://api-osteoplay-vet.netlify.app/api/endpoint/OoCYH3oFPQaiSzuSYlH0'
};

// Tipos da resposta da API
interface QuizQuestionItem {
  id: string;
  endpointId: string;
  data: {
    pergunta: string;
    op_a: string;
    op_b: string;
    op_c: string;
    op_d: string;
    op_e: string;
    op_correta: string;
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
  items: QuizQuestionItem[];
}

// Cache para as questões
let cachedQuestions: {
  beginner: QuizQuestionItem[] | null;
  challenging: QuizQuestionItem[] | null;
} = {
  beginner: null,
  challenging: null
};

/**
 * Busca as questões da API
 */
const fetchQuestionsFromAPI = async (difficulty: 'beginner' | 'challenging'): Promise<QuizQuestionItem[]> => {
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
 * Gera as perguntas para o quiz a partir da API.
 */
export const generateQuizQuestions = async (
  difficulty: 'beginner' | 'challenging',
  maxQuestions: number = 10
): Promise<QuizQuestion[]> => {
  
  // Busca questões da API
  const apiQuestions = await fetchQuestionsFromAPI(difficulty);
  
  if (apiQuestions.length === 0) {
    console.warn('Nenhuma questão disponível na API');
    return [];
  }

  // Embaralha as questões
  const shuffled = [...apiQuestions].sort(() => Math.random() - 0.5);
  
  // Seleciona apenas 10 questões (ou menos se não houver 10)
  const selected = shuffled.slice(0, Math.min(maxQuestions, shuffled.length));

  // Converte para o formato QuizQuestion
  return selected.map((item) => ({
    id: item.id,
    pergunta: item.data.pergunta,
    op_a: item.data.op_a,
    op_b: item.data.op_b,
    op_c: item.data.op_c,
    op_d: item.data.op_d,
    op_e: item.data.op_e,
    op_correta: item.data.op_correta.toLowerCase()
  }));
};
