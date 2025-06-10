// src/lib/products.ts

// Definindo os tipos para nossos produtos para termos autocomplete
export interface Product {
  id: number;
  type: string;
  name: string;
  imageUrl: string;
}

export const productList: Product[] = [
  {
    id: 1,
    type: "Árvore",
    name: "Árvore Nevada 2.10m",
    imageUrl: "/images/arvore-nevada.jpg", // Usaremos imagens da pasta /public
  },
  {
    id: 2,
    type: "Árvore",
    name: "Árvore Slim 1.80m",
    imageUrl: "/images/arvore-slim.jpg",
  },
  {
    id: 3,
    type: "Enfeite",
    name: "Kit Bolas Douradas",
    imageUrl: "/images/bolas-douradas.jpg",
  },
  {
    id: 4,
    type: "Enfeite",
    name: "Kit Bolas Vermelhas",
    imageUrl: "/images/bolas-vermelhas.jpg",
  },
  {
    id: 5,
    type: "Laço",
    name: "Laço P/ Topo Xadrez",
    imageUrl: "/images/laco-xadrez.jpg",
  },
  {
    id: 6,
    type: "Laço",
    name: "Laço P/ Topo Juta",
    imageUrl: "/images/laco-juta.jpg",
  },
];
