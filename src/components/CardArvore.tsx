// src/components/CardArvore.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Arvore } from "../services/arvoresData";

// --- Interface de Propriedades ---
// Define tudo que o componente precisa receber para funcionar.
interface CardArvoreProps {
  arvore: Arvore;
  onExpand: () => void; // Função chamada para ABRIR ou FECHAR o modal do card.
  isExpanded?: boolean; // Controla se o card está no modo galeria ou expandido.
  onOpenForm?: () => void; // Função chamada para ABRIR o formulário de orçamento.
}

const CardArvore = ({
  arvore,
  onExpand,
  isExpanded = false,
  onOpenForm,
}: CardArvoreProps) => {
  // Desestruturando as propriedades da árvore para facilitar o uso.
  const { id, nome, estilo, imagemUrl, altura, cores, enfeites, descricao } =
    arvore;

  // ==================================================================
  // --- 1. VISÃO DO CARD PEQUENO (NA GALERIA) ---
  // ==================================================================
  if (!isExpanded) {
    return (
      <motion.div
        layoutId={`card-arvore-${id}`} // ID que conecta este card à sua versão expandida.
        onClick={onExpand}
        className="h-full bg-white rounded-lg overflow-hidden shadow-md cursor-pointer group flex flex-col"
      >
        <div className="relative w-full h-80">
          <Image
            src={imagemUrl}
            alt={`Foto da árvore ${nome}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-slate-800">{nome}</h3>
          <p className="text-sm text-emerald-700">{estilo}</p>
        </div>
      </motion.div>
    );
  }

  // ==================================================================
  // --- 2. VISÃO DO CARD EXPANDIDO (MODAL) ---
  // ==================================================================
  return (
    <>
      {/* Overlay escuro que cobre o fundo da página */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onExpand} // Clicar no fundo também fecha o modal.
        className="fixed inset-0 bg-black/70 z-z-[10001]"
      />

      {/* Contêiner que centraliza o card expandido */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        {/* O card em si, que anima a partir da sua posição original */}
        <motion.div
          layoutId={`card-arvore-${id}`}
          className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
        >
          {/* --- NOVO: Botão de Fechar (X) --- */}
          <motion.button
            onClick={onExpand}
            aria-label="Fechar"
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </motion.button>

          {/* Seção da Imagem */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto">
            <Image
              src={imagemUrl}
              alt={`Foto da árvore ${nome}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Seção do Conteúdo Detalhado */}
          <div className="w-full md:w-1/2 p-6 overflow-y-auto">
            <h2 className="text-3xl font-bold text-slate-800 pr-8">{nome}</h2>
            <p className="text-md text-emerald-700 mt-1 mb-4">{estilo}</p>

            <p className="text-slate-600 mb-6">{descricao}</p>

            {/* Detalhes com Tags */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">
                  Detalhes
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
                    📏 {altura}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">
                  Cores Principais
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cores.map((cor) => (
                    <span
                      key={cor}
                      className="text-sm bg-slate-200 text-slate-700 px-3 py-1 rounded-full"
                    >
                      {cor}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">
                  Enfeites em Destaque
                </h4>
                <div className="flex flex-wrap gap-2">
                  {enfeites.map((enfeite) => (
                    <span
                      key={enfeite}
                      className="text-sm bg-amber-100 text-amber-800 font-medium px-3 py-1 rounded-full"
                    >
                      {enfeite}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Botão para abrir o formulário */}
            <motion.button
              onClick={onOpenForm}
              className="w-full mt-8 bg-red-700 text-white font-bold py-3 rounded-lg text-lg shadow-lg hover:bg-red-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Solicitar Orçamento
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CardArvore;
