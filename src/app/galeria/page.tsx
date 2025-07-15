// ==================================================================
// ARQUIVO: src/app/galeria-completa/page.tsx
// Página atualizada para gerir e aplicar os novos filtros em cascata.
// ==================================================================
"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProdutos } from "@/hooks/useProdutos";
import ProdutoCard from "@/components/CardProduto";
import { OrcamentoForm } from "@/components/OrcamentoForm";
import { Arvore as Produto } from "@/services/arvoresData";
import FilterControls from "@/components/FilterControls";

export default function GaleriaCompletaPage() {
  const { produtos, loading, error } = useProdutos();

  // --- LÓGICA DO FILTRO EM CASCATA ---
  const [selectedFilters, setSelectedFilters] = useState({
    tipo: "",
    altura: "",
    estilo: "",
    cor: "",
  });

  const availableFilters = useMemo(() => {
    if (!produtos) return { tipos: [], alturas: [], estilos: [], cores: [] };
    const tipos = [...new Set(produtos.map((p) => p.tipo))].sort();
    const alturas = [...new Set(produtos.map((p) => p.altura))].sort(
      (a, b) => parseFloat(a) - parseFloat(b)
    );
    const estilos = [...new Set(produtos.map((p) => p.estilo))].sort();
    const cores = [...new Set(produtos.flatMap((p) => p.cores))].sort();
    return { tipos, alturas, estilos, cores };
  }, [produtos]);

  const filteredProdutos = useMemo(() => {
    return produtos.filter((produto) => {
      const { tipo, altura, estilo, cor } = selectedFilters;
      const matchTipo = !tipo || produto.tipo === tipo;
      const matchAltura = !altura || produto.altura === altura;
      const matchEstilo = !estilo || produto.estilo === estilo;
      const matchCor = !cor || produto.cores.includes(cor);
      return matchTipo && matchAltura && matchEstilo && matchCor;
    });
  }, [produtos, selectedFilters]);

  const handleFilterChange = (
    category: keyof typeof selectedFilters,
    value: string
  ) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value,
    }));
  };

  // --- Lógica dos modais (sem alterações) ---
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleSelectProduto = (produto: Produto) => setSelectedProduto(produto);
  const handleCloseProduto = () => setSelectedProduto(null);
  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  if (loading) {
    return <div className="text-center py-20">A carregar...</div>;
  }
  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          Nossa Galeria de Inspirações
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
          Use os filtros para encontrar a combinação perfeita para o seu Natal.
        </p>
      </div>

      <FilterControls
        availableFilters={availableFilters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {filteredProdutos.length > 0 ? (
            filteredProdutos.map((produto) => (
              <motion.div
                key={produto.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProdutoCard
                  produto={produto}
                  onExpand={() => handleSelectProduto(produto)}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600 text-lg">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProduto && (
          <ProdutoCard
            isExpanded
            key={selectedProduto.id}
            produto={selectedProduto}
            onExpand={handleCloseProduto}
            onOpenForm={handleOpenForm}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFormOpen && selectedProduto && (
          <OrcamentoForm arvore={selectedProduto} onClose={handleCloseForm} />
        )}
      </AnimatePresence>
    </div>
  );
}
