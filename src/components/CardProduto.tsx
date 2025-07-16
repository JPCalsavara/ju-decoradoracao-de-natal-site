// src/components/ProdutoCard.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Arvore as Produto } from "@/services/arvoresData";

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
    // Classes de cor e tamanho atualizadas
    className="absolute top-1/2 -translate-y-1/2 bg-red-700 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-red-800 transition-colors z-10"
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

// --- Variantes para a Animação de Deslize do Carrossel ---
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const ProdutoCard = ({
  produto,
  onExpand,
  isExpanded = false,
  onOpenForm,
  onNext,
  onPrev,
  direction,
}: {
  produto: Produto;
  onExpand: () => void;
  isExpanded?: boolean;
  onOpenForm?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  direction?: number;
}) => {
  const {
    id,
    nome,
    estilo,
    imagemUrl,
    descricao,
    altura,
    cores,
    enfeites,
    tipo,
  } = produto;

  // Versão do card na galeria
  if (!isExpanded) {
    return (
      <motion.div
        layoutId={`card-produto-${id}`}
        onClick={onExpand}
        className="w-full h-full bg-white rounded-lg overflow-hidden shadow-md cursor-pointer group flex flex-col"
      >
        <div className="relative w-full h-80">
          <Image
            src={imagemUrl}
            alt={`Foto de ${tipo.toLowerCase()} ${nome}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {tipo}
          </span>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-slate-800">{nome}</h3>
          <p className="text-sm text-emerald-700">{estilo}</p>
        </div>
      </motion.div>
    );
  }

  // Versão do card expandido (modal)
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onExpand}
        className="fixed inset-0 bg-black/70 z-[10000]"
      />

      <div className="fixed inset-0 z-[10001] p-0 flex items-center justify-center pointer-events-none">
        <motion.div
          layoutId={`card-produto-${id}`}
          className="relative lg:w-full lg:h-full w-[90%] h-[85%] max-w-6xl max-h-[90vh] bg-white  rounded-xl overflow-hidden flex flex-col lg:flex-row shadow-2xl pointer-events-auto"
        >
          <motion.button
            onClick={onExpand}
            aria-label="Fechar"
            className="absolute top-3 right-3 z-20 w-8 md:w-10 h-8 md:h-10 bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-7 h-7"
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

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000 && onNext) {
                  onNext();
                } else if (swipe > 10000 && onPrev) {
                  onPrev();
                }
              }}
              className="w-full h-full flex flex-col lg:flex-row"
            >
              {/* --- CORREÇÃO APLICADA AQUI --- */}
              <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full flex-shrink-0">
                <Image
                  src={imagemUrl}
                  alt={`Foto de ${tipo.toLowerCase()} ${nome}`}
                  fill
                  className="object-cover"
                />
                {/* As setas agora estão dentro de um 'div' com classes responsivas */}
                <div className="hidden md:block">
                  {onPrev && (
                    <ArrowButton onClick={() => onPrev()} direction="left" />
                  )}
                  {onNext && (
                    <ArrowButton onClick={() => onNext()} direction="right" />
                  )}
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                    {tipo}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 pr-8">
                    {nome}
                  </h2>
                  <p className="text-md md:text-xl text-emerald-700 mt-1 mb-4">
                    {estilo}
                  </p>
                  <p className="text-slate-600 mb-6 md:text-lg">{descricao}</p>
                  <div className="space-y-4">
                    {tipo === "Árvore" && (
                      <div>
                        <h4 className="text-sm md:text-lg font-bold text-slate-500 uppercase mb-2">
                          Detalhes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm md:text-md bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
                            📏 {altura}
                          </span>
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm md:text-lg font-bold text-slate-500 uppercase mb-2">
                        Cores Principais
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cores.map((cor) => (
                          <span
                            key={cor}
                            className="text-sm md:text-md bg-slate-200 text-slate-700 px-3 py-1 rounded-full"
                          >
                            {cor}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm md:text-lg font-bold text-slate-500 uppercase mb-2">
                        Enfeites em Destaque
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {enfeites.map((enfeite) => (
                          <span
                            key={enfeite}
                            className="text-sm md:text-md bg-amber-100 text-amber-800 font-medium px-3 py-1 rounded-full"
                          >
                            {enfeite}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <motion.button
                    onClick={onOpenForm}
                    className="w-full mt-8 bg-red-700 text-white font-bold py-3 md:py-5 rounded-lg text-lg md:text-2xl shadow-lg hover:bg-red-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Solicitar Orçamento
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default ProdutoCard;
