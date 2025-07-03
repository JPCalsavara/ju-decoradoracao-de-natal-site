// src/components/ProductGallery.tsx
"use client";

import { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

interface ProductGalleryProps {
  allProducts: Product[];
  selectedProducts: Product[];
  onProductSelect: (product: Product) => void;
}

export function ProductGallery({
  allProducts,
  selectedProducts,
  onProductSelect,
}: ProductGalleryProps) {
  return (
    // Grid responsiva: 2 colunas no mobile, 3 em telas médias, 4 em telas grandes
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {allProducts.map((product) => {
        // Para cada card, verificamos se seu ID está na lista de selecionados
        const isSelected = selectedProducts.some((p) => p.id === product.id);

        return (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onProductSelect}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
}
