// src/components/GaleriaArvores.tsx
"use client";

import { useState } from "react";
import CardArvore from "./CardArvore";
import { ArvoresData, Arvore } from "../services/arvoresData";
import { AnimatePresence } from "framer-motion";
import { OrcamentoForm } from "./OrcamentoForm"; // 1. Importe o novo formulário

const GaleriaArvores = () => {
  const arvores = ArvoresData;
  const [selectedTree, setSelectedTree] = useState<Arvore | null>(null);
  // 2. NOVO ESTADO para controlar a abertura do formulário
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 3. Funções para controlar os estados de forma clara
  const handleSelectTree = (arvore: Arvore) => {
    setSelectedTree(arvore);
  };
  const handleCloseTree = () => {
    setSelectedTree(null);
  };
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTree(null); // Fecha tudo de uma vez
  };

  return (
    <div
      id="arvores"
      className="w-full h-auto flex flex-col items-center scroll-m-24 bg-slate-50 px-4 py-16 md:px-10"
    >
      <h1 className="text-5xl md:text-6xl font-bold pb-10 text-slate-800 text-center">
        Inspire-se em Nossas Criações
      </h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {arvores.map((arvore) => (
          <CardArvore
            key={arvore.id}
            arvore={arvore}
            onExpand={() => handleSelectTree(arvore)}
          />
        ))}
      </div>

      {/* Camada 1: Modal de Expansão do Card */}
      <AnimatePresence>
        {selectedTree && (
          <CardArvore
            isExpanded
            key={selectedTree.id}
            arvore={selectedTree}
            onExpand={handleCloseTree}
            onOpenForm={handleOpenForm} // 4. Prop para abrir o formulário
          />
        )}
      </AnimatePresence>

      {/* Camada 2: Modal do Formulário */}
      <AnimatePresence>
        {isFormOpen && selectedTree && (
          <OrcamentoForm arvore={selectedTree} onClose={handleCloseForm} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GaleriaArvores;
