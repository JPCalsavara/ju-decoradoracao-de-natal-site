import { motion } from "framer-motion";
import Image from "next/image";
import { Arvore } from "@/services/arvoresData"; // Supondo que a interface Arvore venha daqui

const CardArvore = ({
  arvore,
  onExpand,
  isExpanded = false,
  onOpenForm,
}: {
  arvore: Arvore;
  onExpand: () => void;
  isExpanded?: boolean;
  onOpenForm?: () => void;
}) => {
  const { id, nome, estilo, imagemUrl, descricao, altura, cores, enfeites } =
    arvore;

  // Versão do card na galeria
  if (!isExpanded) {
    return (
      <motion.div
        layoutId={`card-arvore-${id}`}
        onClick={onExpand}
        className="w-full h-full bg-white  rounded-lg overflow-hidden shadow-md cursor-pointer group flex flex-col"
      >
        <div className="relative w-full h-80">
          <Image
            src={imagemUrl}
            alt={`Foto da árvore ${nome}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/50"
          />
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
      <div className="fixed inset-0 flex items-center justify-center z-[10001] p-2 md:p-4">
        <motion.div
          layoutId={`card-arvore-${id}`}
          className="relative w-[90%] max-w-md md:max-w-5xl max-h-[90vh] md:min-h-[85vh] bg-white rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
        >
          <motion.button
            onClick={onExpand}
            aria-label="Fechar"
            className="absolute top-3 right-3 z-10 w-8 md:w-10 h-8 md:h-10 bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg"
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
          <div className="relative w-full md:w-1/2 h-90 md:h-auto">
            <Image
              src={imagemUrl}
              alt={`Foto da árvore ${nome}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 pr-8">
                {nome}
              </h2>
              <p className="text-md md:text-xl text-emerald-700 mt-1 mb-4">
                {estilo}
              </p>
              <p className="text-slate-600 mb-6 md:text-lg">{descricao}</p>
              <div className="space-y-4">
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
      </div>
    </>
  );
};

export default CardArvore;
