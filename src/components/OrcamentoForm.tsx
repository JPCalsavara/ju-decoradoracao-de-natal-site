// src/components/OrcamentoForm.tsx
"use client";

import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Arvore } from "@/services/arvoresData";
import { useOrcamentoForm } from "@/hooks/useOrcamentoForm";
import { useLocalizacao } from "@/hooks/useLocalizacao";

// --- 1. Componente Auxiliar para o Seletor de Cores ---
const ColorCheckboxSelector = ({
  title,
  selectedColors,
  onColorChange,
}: {
  title: string;
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
}) => {
  const PREDEFINED_COLORS = [
    "Vermelho",
    "Azul",
    "Dourado",
    "Branco",
    "Rosa",
    "Prata",
    "Bege",
  ];
  const colorMap: { [key: string]: string } = {
    Vermelho: "red",
    Azul: "blue",
    Dourado: "amber",
    Branco: "slate",
    Rosa: "pink",
    Prata: "slate",
    Bege: "orange",
  };

  const handleCheckboxChange = (color: string) => {
    onColorChange(
      selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...selectedColors, color]
    );
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
              <span className="md:text-lg">{color}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// --- 2. Componente Auxiliar para o Seletor de Altura ---
const SizeSelector = ({
  selectedSize,
  onSizeChange,
}: {
  selectedSize: string;
  onSizeChange: (size: string) => void;
}) => {
  const SIZES = [
    "0.60m",
    "0.90m",
    "1.20m",
    "1.50m",
    "1.80m",
    "2.20m",
    "2.40m",
    "2.70m",
  ];
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-6 gap-y-2 mt-2">
      {SIZES.map((size) => (
        <label key={size} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="tamanhoArvore"
            value={size}
            checked={selectedSize === size}
            onChange={() => onSizeChange(size)}
            className="mr-2 h-4 w-4 text-red-600"
          />
          <span className="md:text-lg">{size}</span>
        </label>
      ))}
    </div>
  );
};

// --- 3. Componente Auxiliar para o Seletor de Estilos ---
const StyleCheckboxSelector = ({
  selectedStyles,
  onStyleChange,
}: {
  selectedStyles: string[];
  onStyleChange: (styles: string[]) => void;
}) => {
  const PREDEFINED_STYLES = [
    "Clássico",
    "Contemporâneo",
    "Rústico",
    "Disney",
    "Minimalista",
  ];
  const handleCheckboxChange = (style: string) => {
    onStyleChange(
      selectedStyles.includes(style)
        ? selectedStyles.filter((s) => s !== style)
        : [...selectedStyles, style]
    );
  };
  return (
    <div>
      <label className="font-medium text-slate-700 md:text-lg">
        Quais estilos de decoração mais gosta?
      </label>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
        {PREDEFINED_STYLES.map((style) => (
          <label
            key={style}
            className="flex items-center cursor-pointer p-1 rounded-md transition-colors duration-200 hover:bg-slate-100"
          >
            <input
              type="checkbox"
              value={style}
              checked={selectedStyles.includes(style)}
              onChange={() => handleCheckboxChange(style)}
              className="mr-2 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <span className="md:text-lg">{style}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// --- 4. Componente Auxiliar para o Seletor de Enfeites ---
const EnfeiteCheckboxSelector = ({
  selectedEnfeites,
  onEnfeiteChange,
}: {
  selectedEnfeites: string[];
  onEnfeiteChange: (enfeites: string[]) => void;
}) => {
  const PREDEFINED_ENFEITES = [
    "Papai Noel",
    "Esquilo",
    "Flor",
    "Pinha",
    "Urso",
    "Disney",
    "Floco de Neve",
    "Brilho",
    "Veludo",
    "Borboleta",
    "Bolas Gigante",
  ];
  const handleCheckboxChange = (enfeite: string) => {
    onEnfeiteChange(
      selectedEnfeites.includes(enfeite)
        ? selectedEnfeites.filter((e) => e !== enfeite)
        : [...selectedEnfeites, enfeite]
    );
  };
  return (
    <div>
      <label className="font-medium text-slate-700 md:text-lg">
        Quais enfeites de destaque gostaria?
      </label>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
        {PREDEFINED_ENFEITES.map((enfeite) => (
          <label
            key={enfeite}
            className="flex items-center cursor-pointer p-1 rounded-md transition-colors duration-200 hover:bg-slate-100"
          >
            <input
              type="checkbox"
              value={enfeite}
              checked={selectedEnfeites.includes(enfeite)}
              onChange={() => handleCheckboxChange(enfeite)}
              className="mr-2 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <span className="md:text-lg">{enfeite}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// --- 5. Componente Principal do Formulário ---
export function OrcamentoForm({
  arvore,
  onClose,
}: {
  arvore: Arvore;
  onClose: () => void;
}) {
  const { isLoading, handleSubmit } = useOrcamentoForm();
  const { estados, cidades, loadingEstados, loadingCidades, fetchCidades } =
    useLocalizacao();

  // Estados dos campos do formulário
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [temArvore, setTemArvore] = useState<"nao" | "sim">("nao");
  const [tamanhoArvore, setTamanhoArvore] = useState(arvore.altura || "1.80m");
  const [coresBolas, setCoresBolas] = useState<string[]>(arvore.cores || []);
  const [coresLacos, setCoresLacos] = useState<string[]>(arvore.cores || []);
  const [estilos, setEstilos] = useState<string[]>([arvore.estilo]);
  const [enfeites, setEnfeites] = useState<string[]>(arvore.enfeites || []);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);

  useEffect(() => {
    if (estadoSelecionado) {
      fetchCidades(estadoSelecionado);
    }
  }, [estadoSelecionado, fetchCidades]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nomeEstado =
      estados.find((e) => e.sigla === estadoSelecionado)?.nome || "";

    const url = await handleSubmit({
      nome,
      dataNascimento,
      cidade: cidadeSelecionada,
      estado: nomeEstado,
      tipoDeServico: "Inspirada",
      titulo: arvore.nome, // O título é definido diretamente pelo nome da árvore
      temArvore,
      tamanhoArvore,
      coresBolas,
      coresLacos,
      enfeites,
      estilos,
      arvore,
    });

    if (url) {
      setSuccessUrl(url);
    }
  };

  // Tela de Sucesso
  if (successUrl) {
    return (
      <div className="fixed inset-0 bg-black/80 z-[10002] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-lg text-center shadow-2xl max-w-md"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-700">
            Obrigado!
          </h2>
          <p className="text-slate-600 mt-2 md:text-lg">
            O seu pedido foi registado. Clique abaixo para nos enviar os
            detalhes por WhatsApp e finalizar a sua solicitação.
          </p>
          <a
            href={successUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-emerald-600 transition-colors"
          >
            Abrir Conversa no WhatsApp
          </a>
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
        <div className="p-6 flex-shrink-0">
          <motion.button
            onClick={onClose}
            aria-label="Fechar Formulário"
            className="absolute top-3 right-3 z-10 w-8 md:w-10 h-8 md:h-10 bg-red-700 rounded-full flex items-center justify-center text-white"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-5 md:w-6 h-5 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
              Inspiração:{" "}
              <strong className="text-emerald-700">{arvore.nome}</strong>.
            </p>
          </div>
        </div>
        <div className="px-6 flex-grow overflow-y-auto">
          <form
            id="orcamento-form"
            onSubmit={handleFormSubmit}
            className="space-y-6"
          >
            <input
              type="text"
              placeholder="O seu nome completo"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 border rounded-lg md:text-lg"
            />
            <div>
              <label
                htmlFor="dataNascimento"
                className="block text-sm font-medium text-slate-700 mb-1 md:text-base"
              >
                Data de Nascimento
              </label>
              <input
                type="date"
                id="dataNascimento"
                required
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                min="1930-01-01"
                max="2007-12-31"
                className="w-full p-3 border rounded-lg md:text-lg"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="estado"
                  className="block text-sm font-medium text-slate-700 mb-1 md:text-base"
                >
                  Estado
                </label>
                <select
                  id="estado"
                  value={estadoSelecionado}
                  onChange={(e) => setEstadoSelecionado(e.target.value)}
                  required
                  disabled={loadingEstados}
                  className="w-full p-3 border rounded-lg md:text-lg bg-white"
                >
                  <option value="">
                    {loadingEstados ? "A carregar..." : "Selecione"}
                  </option>
                  {estados.map((estado) => (
                    <option key={estado.id} value={estado.sigla}>
                      {estado.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="cidade"
                  className="block text-sm font-medium text-slate-700 mb-1 md:text-base"
                >
                  Cidade
                </label>
                <select
                  id="cidade"
                  value={cidadeSelecionada}
                  onChange={(e) => setCidadeSelecionada(e.target.value)}
                  required
                  disabled={!estadoSelecionado || loadingCidades}
                  className="w-full p-3 border rounded-lg md:text-lg bg-white"
                >
                  <option value="">
                    {loadingCidades ? "A carregar..." : "Selecione um estado"}
                  </option>
                  {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.nome}>
                      {cidade.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="font-medium text-slate-700 md:text-lg">
                Já tem a árvore?
              </label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="temArvore"
                    value="nao"
                    checked={temArvore === "nao"}
                    onChange={() => setTemArvore("nao")}
                    className="mr-2 h-4 w-4 text-red-600"
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
                    className="mr-2 h-4 w-4 text-red-600"
                  />
                  <span className="md:text-lg">Sim</span>
                </label>
              </div>
            </div>
            <div>
              <label className="font-medium text-slate-700 md:text-lg">
                {temArvore === "sim"
                  ? "Qual a altura dela?"
                  : "Qual altura de árvore você deseja?"}
              </label>
              <SizeSelector
                selectedSize={tamanhoArvore}
                onSizeChange={setTamanhoArvore}
              />
            </div>
            <StyleCheckboxSelector
              selectedStyles={estilos}
              onStyleChange={setEstilos}
            />
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
            <EnfeiteCheckboxSelector
              selectedEnfeites={enfeites}
              onEnfeiteChange={setEnfeites}
            />
          </form>
        </div>
        <div className="p-6 mt-auto flex-shrink-0 border-t border-slate-200">
          <button
            type="submit"
            form="orcamento-form"
            disabled={isLoading}
            className="w-full bg-red-700 text-white font-bold py-3 rounded-lg text-lg md:text-xl hover:bg-red-800 disabled:bg-slate-400"
          >
            {isLoading ? "A enviar..." : "Enviar e Chamar no WhatsApp"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
