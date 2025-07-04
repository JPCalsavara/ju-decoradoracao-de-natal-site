// src/components/OrcamentoForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Arvore } from "@/services/arvoresData";

// --- Componente Auxiliar para o Seletor de Cores ---
const ColorCheckboxSelector = ({
  title,
  selectedColors,
  onColorChange,
}: {
  title: string;
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
}) => {
  const PREDEFINED_COLORS = ["Vermelho", "Azul", "Dourado", "Branco", "Rosa"];
  const colorMap: { [key: string]: string } = {
    Vermelho: "red",
    Azul: "blue",
    Dourado: "amber",
    Branco: "slate",
    Rosa: "pink",
  };

  const handleCheckboxChange = (color: string) => {
    const newSelectedColors = [...selectedColors];
    if (newSelectedColors.includes(color)) {
      onColorChange(newSelectedColors.filter((c) => c !== color));
    } else {
      onColorChange([...newSelectedColors, color]);
    }
  };

  return (
    <div>
      <label className="font-medium text-slate-700 md:text-lg">{title}</label>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
        {PREDEFINED_COLORS.map((color) => {
          const tailwindColor = colorMap[color] || "gray";
          return (
            <label
              key={color}
              className={`flex items-center cursor-pointer p-1 rounded-md transition-colors duration-200 hover:bg-${tailwindColor}-100`}
            >
              <input
                type="checkbox"
                value={color}
                checked={selectedColors.includes(color)}
                onChange={() => handleCheckboxChange(color)}
                className={`mr-2 h-4 w-4 accent-${tailwindColor}-600 border-gray-300 rounded focus:ring-${tailwindColor}-500`}
              />
              <span className={`text-slate-700 md:text-lg`}>{color}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// --- Componente Auxiliar para o Seletor de Altura ---
const SizeSelector = ({
  selectedSize,
  onSizeChange,
}: {
  selectedSize: string;
  onSizeChange: (size: string) => void;
}) => {
  const SIZES = [
    "60cm",
    "90cm",
    "120cm",
    "150cm",
    "180cm",
    "220cm",
    "240cm",
    "270cm",
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <label className="font-medium text-slate-700 md:text-lg">
        Qual a altura dela?
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-6 gap-y-2 mt-2">
        {SIZES.map((size) => (
          <label key={size} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="tamanhoArvore"
              value={size}
              checked={selectedSize === size}
              onChange={() => onSizeChange(size)}
              className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
            />
            <span className="md:text-lg">{size}</span>
          </label>
        ))}
      </div>
    </motion.div>
  );
};

// --- Componente Principal do Formulário ---
export function OrcamentoForm({
  arvore,
  onClose,
}: {
  arvore: Arvore;
  onClose: () => void;
}) {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [temArvore, setTemArvore] = useState<"nao" | "sim">("nao");
  const [tamanhoArvore, setTamanhoArvore] = useState(arvore.altura || "180cm");
  const [coresBolas, setCoresBolas] = useState<string[]>(arvore.cores || []);
  const [coresLacos, setCoresLacos] = useState<string[]>(arvore.cores || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- LÓGICA DE ENVIO ATUALIZADA ---
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    // 1. Formata os dados para a mensagem
    const finalCorBolas =
      coresBolas.length > 0 ? coresBolas.join(", ") : "A definir";
    const finalCorLacos =
      coresLacos.length > 0 ? coresLacos.join(", ") : "A definir";
    const temArvoreTexto =
      temArvore === "sim" ? `Sim, altura de ${tamanhoArvore}` : "Não";

    // 2. Constrói a mensagem para o WhatsApp
    const message =
      `Olá! Gostaria de solicitar um orçamento de decoração de Natal.\n\n` +
      `*Nome:* ${nome}\n` +
      `*Localização:* ${cidade}, ${estado}\n\n` +
      `*Inspiração:* ${arvore.nome} (Estilo: ${arvore.estilo})\n` +
      `*Já possui árvore?* ${temArvoreTexto}\n` +
      `*Cores para Bolas:* ${finalCorBolas}\n` +
      `*Cores para Laços:* ${finalCorLacos}\n\n` +
      `Aguardo o contato!`;

    // 3. Cria o link do WhatsApp
    // IMPORTANTE: Substitua o número abaixo pelo seu número de WhatsApp com código do país
    const whatsappNumber = "5515991240551";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    // 4. Abre o WhatsApp e atualiza a UI
    window.open(whatsappUrl, "_blank");
    setIsSuccess(true);

    // Fecha o modal após 3 segundos
    setTimeout(() => {
      onClose();
      setIsLoading(false); // Reseta o estado de loading
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/80 z-[10002] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-lg text-center shadow-2xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-700">
            Obrigado!
          </h2>
          <p className="text-slate-600 mt-2 md:text-lg">
            Seu pedido foi enviado e já estamos te redirecionando para o
            WhatsApp.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[10002] flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col"
      >
        {/* Cabeçalho */}
        <div className="p-6 flex-shrink-0">
          <motion.button
            onClick={onClose}
            aria-label="Fechar Formulário"
            className="absolute top-3 right-3 z-10 w-8 h-8 md:w-10 md:h-10 bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
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
          <div className="pr-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              Pedido de Orçamento
            </h2>
            <p className="text-slate-600 mt-2 md:text-lg">
              Estilo de referência:{" "}
              <strong className="text-emerald-700">{arvore.nome}</strong>.
            </p>
          </div>
        </div>

        {/* Corpo do Formulário com Rolagem */}
        <div className="px-6 flex-grow overflow-y-auto">
          <form
            id="orcamento-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input
              type="text"
              placeholder="Seu nome completo"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition md:text-lg"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Sua Cidade"
                required
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition md:text-lg"
              />
              <input
                type="text"
                placeholder="Seu Estado"
                required
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition md:text-lg"
              />
            </div>
            <div>
              <label className="font-medium text-slate-700 md:text-lg">
                Você já tem a árvore?
              </label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="temArvore"
                    value="nao"
                    checked={temArvore === "nao"}
                    onChange={() => setTemArvore("nao")}
                    className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <span className="md:text-lg">Não</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="temArvore"
                    value="sim"
                    checked={temArvore === "sim"}
                    onChange={() => setTemArvore("sim")}
                    className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <span className="md:text-lg">Sim</span>
                </label>
              </div>
            </div>
            <AnimatePresence>
              {temArvore === "sim" && (
                <SizeSelector
                  selectedSize={tamanhoArvore}
                  onSizeChange={setTamanhoArvore}
                />
              )}
            </AnimatePresence>
            <ColorCheckboxSelector
              title="Cores desejadas para as bolas"
              selectedColors={coresBolas}
              onColorChange={setCoresBolas}
            />
            <ColorCheckboxSelector
              title="Cores desejadas para os laços"
              selectedColors={coresLacos}
              onColorChange={setCoresLacos}
            />
          </form>
        </div>

        {/* Rodapé com Botão Fixo */}
        <div className="p-6 mt-auto flex-shrink-0 border-t border-slate-200">
          <button
            type="submit"
            form="orcamento-form"
            disabled={isLoading}
            className="w-full bg-red-700 text-white font-bold py-3 rounded-lg text-lg md:text-xl hover:bg-red-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Enviando..." : "Enviar e Chamar no WhatsApp"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
