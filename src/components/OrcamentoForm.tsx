// src/components/OrcamentoForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Supondo que a interface Arvore esteja em um arquivo separado
// import { Arvore } from '../services/arvoresData';
export interface Arvore {
  id: number;
  nome: string;
  estilo: string;
  descricao: string;
  imagemUrl: string;
  altura: string;
  cores: string[];
  enfeites: string[];
}

// --- 1. Componente Auxiliar para o Seletor de Cores (COM HOVER) ---
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

  // Mapeamento de nomes de cores para classes do Tailwind
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
      <label className="font-medium text-slate-700">{title}</label>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
        {PREDEFINED_COLORS.map((color) => {
          const tailwindColor = colorMap[color];
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
                // Aplica a cor de destaque ao checkbox
                className={`mr-2 h-4 w-4 accent-${tailwindColor}-600 border-gray-300 rounded focus:ring-${tailwindColor}-500`}
              />
              <span className={`text-slate-700`}>{color}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// --- 2. Componente Auxiliar para o Seletor de Altura (sem alterações) ---
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
      <label className="font-medium text-slate-700">Qual a altura dela?</label>
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
            {size}
          </label>
        ))}
      </div>
    </motion.div>
  );
};

// --- 3. Componente Principal do Formulário (Atualizado) ---
export function OrcamentoForm({
  arvore,
  onClose,
}: {
  arvore: Arvore;
  onClose: () => void;
}) {
  // --- Estados do formulário (sem alterações na lógica) ---
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [temArvore, setTemArvore] = useState<"nao" | "sim">("nao");
  const [tamanhoArvore, setTamanhoArvore] = useState(arvore.altura || "180cm");
  const [coresBolas, setCoresBolas] = useState<string[]>(arvore.cores || []);
  const [coresLacos, setCoresLacos] = useState<string[]>(arvore.cores || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Função de envio (sem alterações na lógica)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const finalCorBolas =
      coresBolas.length > 0 ? coresBolas.join(", ") : "A definir";
    const finalCorLacos =
      coresLacos.length > 0 ? coresLacos.join(", ") : "A definir";

    const requestBody = {
      client_name: nome,
      client_email: "nao_informado@email.com",
      items: [
        { product_type: "Estilo de Referência", product_details: arvore.nome },
        {
          product_type: "Localização",
          product_details: `${cidade}, ${estado}`,
        },
        {
          product_type: "Cliente Possui Árvore?",
          product_details:
            temArvore === "sim" ? `Sim, tamanho: ${tamanhoArvore}` : "Não",
        },
        { product_type: "Cores para Bolas", product_details: finalCorBolas },
        { product_type: "Cores para Laços", product_details: finalCorLacos },
      ],
    };

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error("Falha ao enviar a solicitação.");
      const data = await response.json();
      window.open(data.whatsappUrl, "_blank");
      setIsSuccess(true);
      setTimeout(() => onClose(), 3000);
    } catch (error) {
      console.error(error);
      alert(
        "Ocorreu um erro ao enviar seu pedido. Por favor, tente novamente."
      );
      setIsLoading(false);
    }
  };

  // Tela de Sucesso (sem alterações)
  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/70 z-z-[10002] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-lg text-center shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-emerald-700">Obrigado!</h2>
          <p className="text-slate-600 mt-2">
            Seu pedido foi enviado e já estamos te redirecionando para o
            WhatsApp.
          </p>
        </motion.div>
      </div>
    );
  }

  // --- Renderização do formulário ATUALIZADA ---
  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* --- NOVO: Botão de Fechar --- */}
        <motion.button
          onClick={onClose}
          aria-label="Fechar Formulário"
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

        <div className="pr-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Pedido de Orçamento
          </h2>
          <p className="text-slate-600 mt-2">
            Estilo de referência:{" "}
            <strong className="text-emerald-700">{arvore.nome}</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <input
            type="text"
            placeholder="Seu nome completo"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Sua Cidade"
              required
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
            <input
              type="text"
              placeholder="Seu Estado"
              required
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="font-medium text-slate-700">
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
                />{" "}
                Não
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="temArvore"
                  value="sim"
                  checked={temArvore === "sim"}
                  onChange={() => setTemArvore("sim")}
                  className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                />{" "}
                Sim
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
            title="Cores desejadas para as bolas (pode marcar várias)"
            selectedColors={coresBolas}
            onColorChange={setCoresBolas}
          />

          <ColorCheckboxSelector
            title="Cores desejadas para os laços (pode marcar várias)"
            selectedColors={coresLacos}
            onColorChange={setCoresLacos}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-700 text-white font-bold py-3 rounded-lg text-lg hover:bg-red-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Enviando..." : "Enviar e Chamar no WhatsApp"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
