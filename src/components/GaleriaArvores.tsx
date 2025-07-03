// src/components/GaleriaArvores.tsx
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Importando os componentes e dados necessários
import CardArvore from "./CardArvore";
import { OrcamentoForm } from "./OrcamentoForm";
import { ArvoresData, Arvore } from "../services/arvoresData";

export function GaleriaArvores() {
  // Mostra apenas as 4 primeiras árvores como uma prévia
  const arvoresPreview = ArvoresData.slice(0, 4);

  const [selectedTree, setSelectedTree] = useState<Arvore | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Funções para controlar os modais (sem alterações na lógica)
  const handleSelectTree = (arvore: Arvore) => setSelectedTree(arvore);
  const handleCloseTree = () => setSelectedTree(null);
  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTree(null);
  };

  return (
    <section
      id="arvores"
      className="w-full h-auto flex flex-col items-center scroll-m-24 bg-slate-50 px-4 py-16 md:px-10"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
          Inspire-se em Nossas Criações
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
          Explore alguns dos nossos estilos favoritos. Cada decoração é pensada
          para criar uma atmosfera única e mágica.
        </p>
      </div>

      {/* Grid com a prévia dos Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {arvoresPreview.map((arvore) => (
          <CardArvore
            key={arvore.id}
            arvore={arvore}
            onExpand={() => handleSelectTree(arvore)}
          />
        ))}
      </div>

      {/* Lógica dos Modais (sem alterações) */}
      <AnimatePresence>
        {selectedTree && (
          <CardArvore
            isExpanded
            key={selectedTree.id}
            arvore={selectedTree}
            onExpand={handleCloseTree}
            onOpenForm={handleOpenForm}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFormOpen && selectedTree && (
          <OrcamentoForm arvore={selectedTree} onClose={handleCloseForm} />
        )}
      </AnimatePresence>
    </section>
  );
}
