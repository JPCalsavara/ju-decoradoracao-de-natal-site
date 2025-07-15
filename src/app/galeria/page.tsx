// src/app/galeria/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProdutos } from "@/hooks/useProdutos";
import ProdutoCard from "@/components/CardProduto";
import { OrcamentoForm } from "@/components/OrcamentoForm";
import { Arvore as Produto } from "@/services/arvoresData";
import FilterControls from "@/components/FilterControls";

// --- Componente Auxiliar para os Botões de Seta do Carrossel ---
const CarouselArrowButton = ({
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

// --- NOVO Componente para os Controles de Paginação ---
const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-red-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Anterior
      </motion.button>
      <span className="text-slate-700 font-medium">
        Página {currentPage} de {totalPages}
      </span>
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-red-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Próxima
      </motion.button>
    </div>
  );
};

export default function GaleriaCompletaPage() {
  const { produtos, loading, error } = useProdutos();

  // --- Lógica do Filtro (sem alterações) ---
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

  // --- LÓGICA DA PAGINAÇÃO ---
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20; // Define quantos itens por página

  const paginatedProdutos = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProdutos.slice(startIndex, endIndex);
  }, [filteredProdutos, currentPage]);

  const totalPages = Math.ceil(filteredProdutos.length / ITEMS_PER_PAGE);

  // Reseta para a primeira página sempre que os filtros mudam
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters]);

  const handleFilterChange = (
    category: keyof typeof selectedFilters,
    value: string
  ) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value,
    }));
  };

  // --- Lógica dos modais e carrossel ---
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelectProduto = (produto: Produto) => {
    setDirection(0);
    setSelectedId(produto.id);
  };
  const handleCloseProduto = () => setSelectedId(null);
  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleNextProduto = () => {
    if (selectedId === null) return;
    const currentIndex = filteredProdutos.findIndex((p) => p.id === selectedId);
    setDirection(1);
    const nextIndex = (currentIndex + 1) % filteredProdutos.length;
    setSelectedId(filteredProdutos[nextIndex].id);
  };

  const handlePrevProduto = () => {
    if (selectedId === null) return;
    const currentIndex = filteredProdutos.findIndex((p) => p.id === selectedId);
    setDirection(-1);
    const prevIndex =
      (currentIndex - 1 + filteredProdutos.length) % filteredProdutos.length;
    setSelectedId(filteredProdutos[prevIndex].id);
  };

  const selectedProduto = useMemo(() => {
    if (selectedId === null) return null;
    return filteredProdutos.find((p) => p.id === selectedId) || null;
  }, [selectedId, filteredProdutos]);

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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[300px]"
      >
        <AnimatePresence>
          {paginatedProdutos.length > 0 ? (
            paginatedProdutos.map((produto) => (
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

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

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
            <CarouselArrowButton onClick={handlePrevProduto} direction="left" />
            <CarouselArrowButton
              onClick={handleNextProduto}
              direction="right"
            />
            <ProdutoCard
              isExpanded
              key={selectedProduto.id}
              produto={selectedProduto}
              direction={direction}
              onExpand={handleCloseProduto}
              onOpenForm={handleOpenForm}
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
