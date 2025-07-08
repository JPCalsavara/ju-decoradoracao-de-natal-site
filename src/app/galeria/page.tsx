// src/app/galeria-completa/page.tsx
"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

// 1. Importando o hook e todos os componentes necessários
import { useProdutos } from "@/hooks/useProdutos";
import CardArvore from "@/components/CardArvore";
import FilterControls from "@/components/FilterControls";
import { OrcamentoForm } from "@/components/OrcamentoForm";
import { Arvore } from "@/services/arvoresData";

export default function GaleriaCompletaPage() {
  // 2. Chamando o hook para buscar os dados do Supabase
  const { produtos, loading, error } = useProdutos();

  // --- Lógica do Filtro ---
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Extrai todas as cores únicas dos produtos carregados para criar os checkboxes
  const availableColors = useMemo(() => {
    if (!produtos) return [];
    const allColors = produtos.flatMap((arvore) => arvore.cores);
    return [...new Set(allColors)].sort();
  }, [produtos]);

  // Filtra as árvores com base nas cores selecionadas
  const filteredArvores = useMemo(() => {
    if (selectedColors.length === 0) {
      return produtos; // Se nenhum filtro, mostra todos os produtos
    }
    return produtos.filter((arvore) =>
      arvore.cores.some((cor) => selectedColors.includes(cor))
    );
  }, [selectedColors, produtos]);

  // Função para atualizar o estado do filtro
  const handleFilterChange = (color: string) => {
    setSelectedColors((currentColors) =>
      currentColors.includes(color)
        ? currentColors.filter((c) => c !== color)
        : [...currentColors, color]
    );
  };

  // --- Lógica dos modais (sem alterações) ---
  const [selectedTree, setSelectedTree] = useState<Arvore | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleSelectTree = (arvore: Arvore) => setSelectedTree(arvore);
  const handleCloseTree = () => setSelectedTree(null);
  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTree(null);
  };

  // 3. Renderização condicional para os estados de carregamento e erro
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-slate-600">A carregar inspirações...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  // 4. Renderização principal da página com os dados carregados
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
    </div>
  );
}
