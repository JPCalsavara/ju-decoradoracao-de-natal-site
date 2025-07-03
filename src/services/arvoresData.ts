// src/services/arvoresData.ts

export interface Arvore {
  id: number;
  nome: string;
  estilo: string;
  descricao: string;
  imagemUrl: string;
  // --- NOVOS CAMPOS ---
  altura: string; // Ex: "2.10m"
  cores: string[]; // Um array para as cores principais
  enfeites: string[]; // Um array para os enfeites de destaque
}

export const ArvoresData: Arvore[] = [
  {
    id: 1,
    nome: "Clássica Vermelha",
    estilo: "Tradicional e Aconchegante",
    descricao:
      "Uma decoração atemporal com tons de vermelho, dourado e verde, trazendo o calor clássico do Natal para o seu lar.",
    imagemUrl: "/images/arvores/vermelho-dourado.jpeg",
    // --- NOVAS INFORMAÇÕES ---
    altura: "2.10m",
    cores: ["Vermelho", "Dourado", "Verde"],
    enfeites: ["Laços Xadrez", "Bolas Foscas", "Pinhas Naturais"],
  },
  {
    id: 2,
    nome: "Elegância Nevada",
    estilo: "Moderna e Sofisticada",
    descricao:
      "Tons de branco, prata e azul criam uma atmosfera de inverno sofisticado, perfeita para ambientes modernos.",
    imagemUrl: "/images/arvores/vermelho-dourado.jpeg",
    // --- NOVAS INFORMAÇÕES ---
    altura: "2.40m",
    cores: ["Branco", "Prata", "Azul Gelo"],
    enfeites: ["Flores Brancas", "Renas de Cristal", "Flocos de Neve"],
  },
  {
    id: 3,
    nome: "Magia Disney",
    estilo: "Divertida e Encantadora",
    descricao:
      "Traz a magia dos seus personagens favoritos para o Natal, com enfeites temáticos da Disney que encantam crianças e adultos.",
    imagemUrl: "/images/arvores/vermelho-dourado.jpeg", // Exemplo de nova imagem
    // --- NOVAS INFORMAÇÕES ---
    altura: "1.80m",
    cores: ["Vermelho Disney", "Amarelo", "Azul"],
    enfeites: ["Mickey & Minnie", "Cabeças de Personagens", "Castelos"],
  },
  {
    id: 4,
    nome: "Charme Rústico",
    estilo: "Natural e Orgânico",
    descricao:
      "Utiliza elementos naturais como pinhas, juta e madeira, ideal para quem busca uma decoração mais orgânica e charmosa.",
    imagemUrl: "/images/arvores/vermelho-dourado.jpeg",
    // --- NOVAS INFORMAÇÕES ---
    altura: "2.10m",
    cores: ["Marrom", "Bege", "Verde Musgo"],
    enfeites: ["Ursos de Pelúcia", "Laços de Juta", "Miniaturas de Madeira"],
  },
];
