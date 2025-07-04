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
}

// O array com todos os dados das árvores
export const ArvoresData: Arvore[] = [
  {
    id: 1,
    nome: "Clássica Vermelha",
    estilo: "Tradicional e Aconchegante",
    descricao:
      "Uma decoração atemporal com tons de vermelho, dourado e verde, trazendo o calor clássico do Natal para o seu lar.",
    imagemUrl: "/images/arvores/dourada-branca.jpeg",
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
    imagemUrl: "/images/arvores/dourada-branca.jpeg",
    altura: "2.40m",
    cores: ["Branco", "Prata", "Azul"],
    enfeites: ["Flores Brancas", "Renas de Cristal", "Flocos de Neve"],
  },
  {
    id: 3,
    nome: "Magia Disney",
    estilo: "Divertida e Encantadora",
    descricao:
      "Traz a magia dos seus personagens favoritos para o Natal, com enfeites temáticos da Disney que encantam crianças e adultos.",
    imagemUrl: "/images/arvores/dourada-branca.jpeg",
    altura: "1.80m",
    cores: ["Vermelho", "Amarelo", "Azul"],
    enfeites: ["Mickey & Minnie", "Cabeças de Personagens", "Castelos"],
  },
  {
    id: 4,
    nome: "Charme Rústico",
    estilo: "Natural e Orgânico",
    descricao:
      "Utiliza elementos naturais como pinhas, juta e madeira, ideal para quem busca uma decoração mais orgânica e charmosa.",
    imagemUrl: "/images/arvores/dourada-branca.jpeg",
    altura: "2.10m",
    cores: ["Marrom", "Bege", "Verde Musgo"],
    enfeites: ["Ursos de Pelúcia", "Laços de Juta", "Miniaturas de Madeira"],
  },
  // --- NOVAS ÁRVORES ADICIONADAS ---
  {
    id: 5,
    nome: "Glamour Rosé",
    estilo: "Chique e Contemporâneo",
    descricao:
      "Uma paleta de rosé gold, champanhe e branco perolado para uma decoração luxuosa e feminina.",
    imagemUrl: "/images/arvores/dourada-branca.jpeg",
    altura: "2.20m",
    cores: ["Rosa", "Dourado", "Branco"],
    enfeites: ["Pássaros com Glitter", "Bolas de Vidro", "Flores de Seda"],
  },
  {
    id: 6,
    nome: "Bosque Encantado",
    estilo: "Místico e Natural",
    descricao:
      "Inspirada em contos de fadas, com cogumelos, raposas, e uma iluminação que simula o luar na floresta.",
    imagemUrl: "/images/arvores/dourada-branca.jpeg",
    altura: "1.80m",
    cores: ["Verde Musgo", "Cobre", "Bordô"],
    enfeites: ["Cogumelos", "Animais da Floresta", "Folhagens"],
  },
  {
    id: 7,
    nome: "Doce Natal",
    estilo: "Lúdico e Divertido (Candy Cane)",
    descricao:
      "Uma explosão de cores com bengalas de açúcar, pirulitos e doces, perfeita para lares com crianças.",
    imagemUrl: "/images/arvores/dourada-branca.jpeg",
    altura: "1.50m",
    cores: ["Vermelho", "Branco", "Verde Claro"],
    enfeites: ["Bengalas de Açúcar", "Donuts", "Cupcakes"],
  },
  {
    id: 8,
    nome: "Minimalista Escandinavo",
    estilo: "Simples e Aconchegante",
    descricao:
      "Focada na simplicidade, com enfeites de madeira clara, poucas cores e uma iluminação quente e suave.",
    imagemUrl: "/images/arvores/dourada-branca.jpeg",
    altura: "2.10m",
    cores: ["Branco", "Madeira Natural", "Cinza Claro"],
    enfeites: ["Estrelas de Madeira", "Bolas de Lã", "Mini Casas"],
  },
  {
    id: 9,
    nome: "Noite Estrelada",
    estilo: "Elegante e Misterioso",
    descricao:
      "Tons de azul noite, prata e preto criam um visual sofisticado que remete a um céu estrelado de inverno.",
    imagemUrl: "/images/arvores/dourada-branca.jpeg",
    altura: "2.70m",
    cores: ["Azul", "Prata", "Preto"],
    enfeites: ["Estrelas Metálicas", "Luas Crescentes", "Bolas Pretas Foscas"],
  },
  {
    id: 10,
    nome: "Vibrante Tropical",
    estilo: "Ousado e Inovador",
    descricao:
      "Uma abordagem única para o Natal no hemisfério sul, com cores vibrantes, flores e elementos tropicais.",
    imagemUrl: "/images/arvores/dourada-branca.jpeg",
    altura: "2.20m",
    cores: ["Rosa", "Laranja", "Turquesa"],
    enfeites: ["Flores de Hibisco", "Tucanos", "Folhas de Palmeira"],
  },
];
