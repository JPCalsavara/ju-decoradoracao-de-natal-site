// src/app/galeria-completa/page.tsx
"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Importando os componentes e dados necessários
import CardArvore from "@/components/CardArvore";
import { OrcamentoForm } from "@/components/OrcamentoForm";
import { ArvoresData, Arvore } from "@/services/arvoresData";

// --- NOVO Componente para os Controles de Filtro ---
const FilterControls = ({
  availableColors,
  selectedColors,
  onFilterChange,
}: {
  availableColors: string[];
  selectedColors: string[];
  onFilterChange: (color: string) => void;
}) => {
  const colorMap: { [key: string]: string } = {
    Vermelho: "red",
    Azul: "blue",
    Dourado: "amber",
    Branco: "slate",
    Rosa: "pink",
    Verde: "green",
    Amarelo: "yellow",
    Marrom: "stone",
    Bege: "orange",
    "Verde Musgo": "lime",
    Cobre: "orange",
    Bordô: "rose",
    "Verde Claro": "green",
    "Madeira Natural": "amber",
    "Cinza Claro": "slate",
    Preto: "black",
    Laranja: "orange",
    Turquesa: "cyan",
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-12">
      <h3 className="font-bold text-lg text-slate-800 mb-4">Filtrar por Cor</h3>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {availableColors.map((color) => {
          const tailwindColor = colorMap[color] || "gray";
          return (
            <label
              key={color}
              className={`flex items-center cursor-pointer p-1 rounded-md transition-colors duration-200 hover:bg-${tailwindColor}-100`}
            >
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => onFilterChange(color)}
                className={`mr-2 h-4 w-4 accent-${tailwindColor}-600 border-gray-300 rounded focus:ring-${tailwindColor}-500`}
              />
              <span className="text-slate-700">{color}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// --- Componente Principal da Página (Atualizado com Filtros) ---
export default function GaleriaCompletaPage() {
  // --- LÓGICA DO FILTRO ---
  // 1. Estado para guardar as cores selecionadas
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // 2. Extrai todas as cores únicas dos dados para criar os checkboxes
  const availableColors = useMemo(() => {
    const allColors = ArvoresData.flatMap((arvore) => arvore.cores);
    return [...new Set(allColors)].sort(); // Retorna cores únicas e em ordem alfabética
  }, []);

  // 3. Filtra as árvores com base nas cores selecionadas
  const filteredArvores = useMemo(() => {
    if (selectedColors.length === 0) {
      return ArvoresData; // Se nenhum filtro, mostra todas
    }
    return ArvoresData.filter((arvore) =>
      arvore.cores.some((cor) => selectedColors.includes(cor))
    );
  }, [selectedColors]);

  // 4. Função para atualizar o estado do filtro
  const handleFilterChange = (color: string) => {
    setSelectedColors(
      (currentColors) =>
        currentColors.includes(color)
          ? currentColors.filter((c) => c !== color) // Desmarca
          : [...currentColors, color] // Marca
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

      {/* Renderiza o painel de filtros */}
      <FilterControls
        availableColors={availableColors}
        selectedColors={selectedColors}
        onFilterChange={handleFilterChange}
      />

      {/* Grid responsivo que agora exibe as árvores FILTRADAS */}
      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredArvores.length > 0 ? (
            filteredArvores.map((arvore) => (
              <CardArvore
                key={arvore.id}
                arvore={arvore}
                onExpand={() => handleSelectTree(arvore)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600 text-lg">
                Nenhuma árvore encontrada com os filtros selecionados.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Lógica dos modais (sem alterações) */}
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
