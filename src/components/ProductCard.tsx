// src/components/ProductCard.tsx
"use client"; // Diretiva necessária para componentes com interatividade

import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/lib/products"; // Importando nosso tipo

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void; // Função para quando o card for selecionado
  isSelected: boolean; // Para saber se o card já está selecionado
}

export function ProductCard({
  product,
  onSelect,
  isSelected,
}: ProductCardProps) {
  return (
    <motion.div
      onClick={() => onSelect(product)}
      className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected ? "border-green-500 scale-105" : "border-gray-200"
      }`}
      whileTap={{ scale: 0.95 }} // Animação de toque
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        className="object-cover w-full h-48" // Imagem responsiva
      />

      {/* Overlay de seleção */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}

      <div className="p-3 bg-white">
        <p className="text-sm font-semibold text-gray-800 truncate">
          {product.name}
        </p>
        <p className="text-xs text-gray-500">{product.type}</p>
      </div>
    </motion.div>
  );
}
