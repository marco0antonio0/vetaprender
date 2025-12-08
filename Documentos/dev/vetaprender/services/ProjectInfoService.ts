interface ProjectInfoData {
  objetivo_academico: string;
  metologia: string;
  detalhamento: string;
}

interface ProjectInfoItem {
  id: string;
  endpointId: string;
  data: ProjectInfoData;
  createdAt: string;
  updatedAt: string;
}

interface ProjectInfoResponse {
  id: string;
  title: string;
  campos: Array<{
    mult: boolean;
    tipo: string;
    title: string;
  }>;
  createdAt: string;
  updatedAt: string;
  items: ProjectInfoItem[];
}

const API_URL = 'https://api-osteoplay-vet.netlify.app/api/endpoint/SQdkqBQjK3wzO8rlJbVa';

class ProjectInfoService {
  private cache: ProjectInfoData | null = null;
  private loading: boolean = false;

  async fetchProjectInfo(): Promise<ProjectInfoData | null> {
    // Retorna o cache se já existe
    if (this.cache) {
      return this.cache;
    }

    // Evita múltiplas requisições simultâneas
    if (this.loading) {
      // Espera um pouco e tenta novamente
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.fetchProjectInfo();
    }

    try {
      this.loading = true;
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProjectInfoResponse = await response.json();
      
      // Extrai os dados do primeiro item
      if (data.items && data.items.length > 0) {
        this.cache = data.items[0].data;
        return this.cache;
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar informações do projeto:', error);
      return null;
    } finally {
      this.loading = false;
    }
  }

  // Limpa o cache (útil se precisar recarregar)
  clearCache(): void {
    this.cache = null;
  }
}

export const projectInfoService = new ProjectInfoService();
export type { ProjectInfoData };
