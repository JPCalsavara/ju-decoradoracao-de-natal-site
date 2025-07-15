// ==================================================================
// ARQUIVO: src/app/galeria-completa/page.tsx
// Página atualizada para gerir a navegação entre produtos no modal.
// ==================================================================
"use client";

import { useState, useMemo } from "react"; // 1. useEffect removido, pois não era utilizado.
import { AnimatePresence, motion } from "framer-motion";
import { useProdutos } from "@/hooks/useProdutos";
import ProdutoCard from "@/components/CardProduto";
import { OrcamentoForm } from "@/components/OrcamentoForm";
import { Arvore as Produto } from "@/services/arvoresData";
import FilterControls from "@/components/FilterControls";

// --- Componente Auxiliar para os Botões de Seta ---
const ArrowButton = ({
  onClick,
  direction,
}: {
  onClick: (e: React.MouseEvent) => void;
  direction: "left" | "right";
}) => (
  <motion.button
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    className="absolute top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/60 transition-colors z-[10002]"
    style={direction === "left" ? { left: "1rem" } : { right: "1rem" }}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.1 }}
  >
    {direction === "left" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    )}
  </motion.button>
);

export default function GaleriaCompletaPage() {
  const { produtos, loading, error } = useProdutos();

  // --- Lógica do Filtro em Cascata (sem alterações) ---
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

  // --- Lógica dos modais e navegação ---
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelectProduto = (produto: Produto) => {
    const index = filteredProdutos.findIndex((p) => p.id === produto.id);
    setCurrentIndex(index);
  };
  const handleCloseProduto = () => setCurrentIndex(null);
  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleNextProduto = () => {
    if (currentIndex === null) return;
    const nextIndex = (currentIndex + 1) % filteredProdutos.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevProduto = () => {
    if (currentIndex === null) return;
    const prevIndex =
      (currentIndex - 1 + filteredProdutos.length) % filteredProdutos.length;
    setCurrentIndex(prevIndex);
  };

  const selectedProduto =
    currentIndex !== null ? filteredProdutos[currentIndex] : null;

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
          {filteredProdutos.map((produto) => (
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
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProduto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseProduto}
              className="fixed inset-0 bg-black/70 z-[10000]"
            />
            {/* 2. O onClick agora passa uma função que corresponde à assinatura esperada */}
            <ArrowButton onClick={() => handlePrevProduto()} direction="left" />
            <ArrowButton
              onClick={() => handleNextProduto()}
              direction="right"
            />
            <ProdutoCard
              isExpanded
              key={currentIndex}
              produto={selectedProduto}
              onExpand={handleCloseProduto}
              onOpenForm={handleOpenForm}
              currentIndex={currentIndex!}
              totalItems={filteredProdutos.length}
            />
          </>
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
