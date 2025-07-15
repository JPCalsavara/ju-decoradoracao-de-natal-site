// src/services/arvoresData.ts

// A interface define a "forma" de cada objeto de árvore
export interface Arvore {
  id: number;
  nome: string;
  estilo: string;
  descricao: string;
  imagemUrl: string;
  altura: string;
  cores: string[];
  enfeites: string[];
  tipo: string;
}

// O array com todos os dados das árvores
