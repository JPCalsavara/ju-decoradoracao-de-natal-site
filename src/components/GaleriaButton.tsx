// src/components/GaleriaButton.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export const GaleriaButton = () => {
  return (
    <div className="mt-12 text-center">
      {/* A propriedade 'legacyBehavior' é adicionada ao Link.
        Isso instrui o Next.js a não renderizar sua própria tag <a> e, em vez disso,
        passar as propriedades de navegação para o componente filho (<motion.a>).
      */}
      <Link href="/galeria">
        <motion.a
          className="inline-block bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-red-800 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ver Todas as Árvores
        </motion.a>
      </Link>
    </div>
  );
};

// Não se esqueça de exportar o componente se ele estiver em seu próprio arquivo.
export default GaleriaButton;
