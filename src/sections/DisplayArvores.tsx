// src/app/monte-seu-kit/page.tsx
"use client"; // Essencial: esta página agora tem estado e interatividade

import { useState } from "react";
import { Product, productList } from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";

export default function DisplayArvores() {
  // --- O CÉREBRO DA SELEÇÃO ---
  // Criamos uma variável de estado para armazenar os produtos selecionados.
  // Começa como um array vazio.
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // --- A LÓGICA DE SELEÇÃO E DESELEÇÃO ---
  const handleProductSelect = (product: Product) => {
    setSelectedProducts((currentSelection) => {
      // Verificamos se o produto já está na lista de selecionados
      const isAlreadySelected = currentSelection.some(
        (p) => p.id === product.id
      );

      if (isAlreadySelected) {
        // Se já estiver, o removemos (lógica de deseleção)
        // Retornamos um novo array com todos os itens, exceto o clicado
        return currentSelection.filter((p) => p.id !== product.id);
      } else {
        // Se não estiver, o adicionamos (lógica de seleção)
        // Retornamos um novo array com todos os itens antigos mais o novo
        return [...currentSelection, product];
      }
    });
  };

  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">
        Monte seu Kit de Natal
      </h1>

      <ProductGallery
        allProducts={productList}
        selectedProducts={selectedProducts}
        onProductSelect={handleProductSelect}
      />

      {/* Área de Debug: Para vermos o que está acontecendo */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
        <h3 className="font-bold">
          Itens Selecionados ({selectedProducts.length}):
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedProducts.map((p) => (
            <span
              key={p.id}
              className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
