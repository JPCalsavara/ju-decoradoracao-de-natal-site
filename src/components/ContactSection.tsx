// src/components/ContactSection.tsx
"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Ícones para os detalhes de contato (sem alterações) ---
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413C24 18.661 18.664 24 .101 24Z" />
    <path
      fill="#FFF"
      d="m20.52 18.39.002-.002c-.455-1.125-2.636-5.27-2.83-5.523-.193-.253-.453-.403-.76-.403h-.01c-.26 0-.495.093-.676.273-.18.18-.325.42-.403.678-.078.258-.14.515-.218.77l-.14.46c-.078.258-.21.495-.404.676-.193.18-.43.29-.688.29-.26 0-.516-.094-.71-.274-1.22-1.13-2.22-2.52-2.846-4.004l-.087-.217c-.078-.193-.14-.388-.14-.6l.002-.002c.02-.273.123-.52.29-.71.18-.18.42-.325.678-.403.258-.078.516-.14.77-.218l.46-.14c.258-.078.495-.21.676-.404.18-.193.29-.43.29-.688.002-.26-.092-.516-.273-.71-.18-.18-.42-.325-.678-.403-1.125-.455-5.27-2.636-5.523-2.83s-.403-.453-.403-.76v-.01c0-.26.093-.495.273-.676.18-.18.42-.325.678-.403l.217-.087c1.486-.573 3.13-.768 4.69-.573.273.02.52.123.71.29.18.18.325.42.403.678.455 1.125 2.636 5.27 2.83 5.523.193.253.453.403.76.403h.01c.26 0 .495-.093.676-.273.18-.18.325-.42.403-.678-.078-.258-.14-.515-.218.77l-.14.46c-.078-.258-.21.495-.404.676-.193.18-.43.29-.688.29-.26 0-.516-.094-.71-.274l.217-.217c.18-.18.42-.273.678-.273.258 0 .516.093.71.273.18.193.273.43.273.688v.01c-.002.26-.092-.516-.273-.71-.18-.18-.42-.325-.678-.403-1.125.455-5.27 2.636-5.523-2.83s-.403-.453-.403.76v.01c0 .26.093-.495.273.676.18-.18.42-.325.678-.403l.217-.087c1.486-.573 3.13-.768 4.69-.573.273.02.52.123.71.29.18.18.325.42.403.678l.087.217c.573 1.486.768 3.13.573 4.69-.02.273-.123.52-.29.71-.18.18-.42-.325-.678-.403l-.217.087c-1.486-.573-3.13-.768-4.69.573Z"
    />
  </svg>
);

// --- Componentes Auxiliares do Formulário (Reutilizados) ---
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

// --- Componente Principal da Seção "Contato" ---
export function ContactSection() {
  // Estados para o novo formulário
  const [nome, setNome] = useState("");
  const [temArvore, setTemArvore] = useState<"nao" | "sim">("nao");
  const [tamanhoArvore, setTamanhoArvore] = useState("180cm");
  const [coresBolas, setCoresBolas] = useState<string[]>([]);
  const [coresLacos, setCoresLacos] = useState<string[]>([]);
  const [estilo, setEstilo] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Enviando...");

    const finalCorBolas =
      coresBolas.length > 0 ? coresBolas.join(", ") : "Não especificado";
    const finalCorLacos =
      coresLacos.length > 0 ? coresLacos.join(", ") : "Não especificado";

    const requestBody = {
      client_name: nome,
      client_email: "contato_geral@email.com", // Placeholder, já que não pedimos email
      items: [
        {
          product_type: "Contato Geral",
          product_details: "Formulário da seção de contato",
        },
        {
          product_type: "Cliente Possui Árvore?",
          product_details:
            temArvore === "sim" ? `Sim, tamanho: ${tamanhoArvore}` : "Não",
        },
        { product_type: "Cores para Bolas", product_details: finalCorBolas },
        { product_type: "Cores para Laços", product_details: finalCorLacos },
        {
          product_type: "Estilo Desejado",
          product_details: estilo || "Não especificado",
        },
      ],
    };

    try {
      // Simulando a chamada de API que já existe
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error("Falha no envio.");

      const data = await response.json();
      window.open(data.whatsappUrl, "_blank");

      setStatus("Obrigado! Sua mensagem foi enviada.");
      // Limpa o formulário
      setNome("");
      setTemArvore("nao");
      setCoresBolas([]);
      setCoresLacos([]);
      setEstilo("");
    } catch (error) {
      console.error(error);
      setStatus("Houve um erro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contato" className="w-full bg-white py-20 scroll-m-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Vamos dar vida ao seu Natal?
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
            Tem uma ideia em mente ou precisa de ajuda para começar? Preencha o
            formulário abaixo e vamos conversar!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Coluna da Esquerda: Informações de Contato Direto (sem alterações) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-700">
              Contato Direto
            </h3>
            <a
              href="mailto:contato@decoradoranatal.com"
              className="flex items-center gap-4 group"
            >
              <span className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-700 transition-colors duration-300 group-hover:bg-red-700 group-hover:text-white">
                <MailIcon />
              </span>
              <div>
                <p className="font-bold text-slate-800 text-lg">E-mail</p>
                <p className="text-slate-600 group-hover:text-red-700 transition-colors duration-300">
                  contato@decoradoranatal.com
                </p>
              </div>
            </a>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <span className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                <WhatsAppIcon />
              </span>
              <div>
                <p className="font-bold text-slate-800 text-lg">WhatsApp</p>
                <p className="text-slate-600 group-hover:text-emerald-700 transition-colors duration-300">
                  (11) 99999-9999
                </p>
              </div>
            </a>
          </motion.div>

          {/* Coluna da Direita: NOVO Formulário de Orçamento */}
          <motion.form
            onSubmit={handleFormSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 bg-slate-50 p-8 rounded-lg shadow-md"
          >
            <input
              type="text"
              placeholder="Seu nome completo"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />

            <div>
              <label className="font-medium text-slate-700">
                Você já tem a árvore?
              </label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="temArvoreContato"
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
                    name="temArvoreContato"
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
              title="Cores desejadas para as bolas"
              selectedColors={coresBolas}
              onColorChange={setCoresBolas}
            />
            <ColorCheckboxSelector
              title="Cores desejadas para os laços"
              selectedColors={coresLacos}
              onColorChange={setCoresLacos}
            />

            <div>
              <label
                htmlFor="estilo"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Qual estilo de decoração você imagina?
              </label>
              <textarea
                id="estilo"
                rows={4}
                value={estilo}
                onChange={(e) => setEstilo(e.target.value)}
                placeholder="Ex: Clássico, moderno, rústico, minimalista..."
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              ></textarea>
            </div>

            <div className="flex flex-col items-start">
              <motion.button
                type="submit"
                disabled={isLoading}
                className="bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-red-800 transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? "Enviando..." : "Enviar Pedido"}
              </motion.button>
              {status && (
                <p className="mt-4 text-emerald-700 font-medium">{status}</p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
