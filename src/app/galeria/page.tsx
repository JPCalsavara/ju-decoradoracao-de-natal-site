// ==================================================================
// ARQUIVO: src/app/galeria-completa/page.tsx
// Este é o componente da página que orquestra tudo.
// ==================================================================
"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Importando os componentes e dados necessários
import CardArvore from "@/components/CardArvore";
import FilterControls from "@/components/FilterControls";
import { OrcamentoForm } from "@/components/OrcamentoForm";
import { ArvoresData, Arvore } from "@/services/arvoresData";

export default function GaleriaCompletaPage() {
  // --- Lógica do Filtro ---
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const availableColors = useMemo(() => {
    const allColors = ArvoresData.flatMap((arvore) => arvore.cores);
    return [...new Set(allColors)].sort();
  }, []);
  const filteredArvores = useMemo(() => {
    if (selectedColors.length === 0) return ArvoresData;
    return ArvoresData.filter((arvore) =>
      arvore.cores.some((cor) => selectedColors.includes(cor))
    );
  }, [selectedColors]);
  const handleFilterChange = (color: string) => {
    setSelectedColors((currentColors) =>
      currentColors.includes(color)
        ? currentColors.filter((c) => c !== color)
        : [...currentColors, color]
    );
  };

  // --- Lógica dos modais ---
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
    <div className="container mx-auto px-4 py-16 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          Nossa Galeria de Inspirações
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
          Use os filtros para encontrar a combinação de cores perfeita para o
          seu Natal.
        </p>
      </div>

      <FilterControls
        availableColors={availableColors}
        selectedColors={selectedColors}
        onFilterChange={handleFilterChange}
      />

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {filteredArvores.length > 0 ? (
            filteredArvores.map((arvore) => (
              <motion.div
                key={arvore.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardArvore
                  arvore={arvore}
                  onExpand={() => handleSelectTree(arvore)}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600 text-lg">
                Nenhuma árvore encontrada com os filtros selecionados.
              </p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

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
    </div>
  );
}
