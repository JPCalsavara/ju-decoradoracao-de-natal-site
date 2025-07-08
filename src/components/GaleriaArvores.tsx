// src/components/GaleriaArvores.tsx
"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

// 1. Importando o novo hook e os componentes necessários
import { useProdutos } from "@/hooks/useProdutos";
import CardArvore from "./CardArvore";
import { OrcamentoForm } from "./OrcamentoForm";
import { Arvore } from "../services/arvoresData";

export function GaleriaArvores() {
  // 2. Chamando o hook para buscar os dados do Supabase
  const { produtos, loading, error } = useProdutos();

  // Cria a lista de prévia apenas com os 4 primeiros produtos carregados
  const arvoresPreview = useMemo(() => produtos.slice(0, 4), [produtos]);

  // Lógica dos modais (sem alterações)
  const [selectedTree, setSelectedTree] = useState<Arvore | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
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

      {/* 3. Renderização condicional baseada nos estados do hook */}
      {loading && (
        <div className="text-center py-10">
          <p className="text-slate-600">A carregar inspirações...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-10">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <>
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

          {/* Botão para a galeria completa */}
          <div className="mt-12 text-center">
            <Link
              href="/galeria"
              className="inline-block bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-red-800 
               delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105
               transition "
            >
              Ver Todas as Árvores
            </Link>
          </div>
        </>
      )}

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
