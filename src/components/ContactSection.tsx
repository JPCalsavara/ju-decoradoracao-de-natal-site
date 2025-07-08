// src/components/ContactSection.tsx
"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrcamentoForm } from "@/hooks/useOrcamentoForm";

// --- Ícones para os detalhes de contacto ---
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.171 0-3.53.012-4.76.069-2.69.123-3.91 1.349-4.032 4.032-.057 1.23-.069 1.583-.069 4.76s.012 3.53.069 4.76c.123 2.683 1.349 3.91 4.032 4.032 1.23.057 1.583.069 4.76.069s3.53-.012 4.76-.069c2.683-.123 3.91-1.349 4.032-4.032.057-1.23.069-1.583.069-4.76s-.012-3.53-.069-4.76c-.123-2.683-1.349-3.91-4.032-4.032-1.23-.057-1.583-.069-4.76-.069zM12 6.837c-2.841 0-5.163 2.322-5.163 5.163s2.322 5.163 5.163 5.163 5.163-2.322 5.163-5.163S14.841 6.837 12 6.837zm0 8.892c-2.059 0-3.729-1.67-3.729-3.729s1.67-3.729 3.729-3.729 3.729 1.67 3.729 3.729-1.67 3.729-3.729 3.729zm5.232-6.76c-.688 0-1.245.556-1.245 1.245s.557 1.245 1.245 1.245 1.245-.556 1.245-1.245-.556-1.245-1.245-1.245z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z" />
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
      d="m20.52 18.39.002-.002c-.455-1.125-2.636-5.27-2.83-5.523-.193-.253-.453-.403-.76-.403h-.01c-.26 0-.495.093-.676.273-.18.18-.325.42-.403.678-.078.258-.14.515-.218.77l-.14.46c-.078.258-.21.495-.404.676-.193.18-.43.29-.688.29-.26 0-.516-.094-.71-.274-1.22-1.13-2.22-2.52-2.846-4.004l-.087-.217c-.078-.193-.14-.388-.14-.6l.002-.002c.02-.273.123-.52.29-.71.18-.18.42-.325.678-.403.258-.078.516-.14.77-.218l.46-.14c.258-.078.495-.21.676-.404.18-.193.29-.43.29-.688.002-.26-.092-.516-.273-.71-.18-.18-.42-.325-.678-.403-1.125-.455-5.27-2.636-5.523-2.83s-.403-.453-.403-.76v-.01c0-.26.093-.495.273-.676.18-.18.42-.325.678-.403l.217-.087c1.486-.573 3.13-.768 4.69-.573.273.02.52.123.71.29.18.18.325.42.403.678.455 1.125 2.636 5.27 2.83 5.523.193.253.453.403.76.403h.01c.26 0 .495-.093.676-.273.18-.18.325-.42.403-.678-.078-.258-.14-.515-.218.77l-.14.46c-.078-.258-.21.495-.404.676-.193.18-.43.29-.688.29-.26 0-.516-.094-.71-.274l.217-.217c.18-.18.42-.273.678-.273.258 0 .516.093.71.273.18.193.273.43.273.688v.01c-.002.26-.092-.516-.273-.71-.18-.18-.42-.325-.678-.403-1.125.455-5.27 2.636-5.523-2.83s-.403-.453-.403.76v.01c0 .26.093-.495.273-.676.18-.18.42-.325.678-.403l.217-.087c1.486-.573 3.13-.768 4.69-.573.273.02.52.123.71.29.18.18.325.42.403.678l.087.217c.573 1.486.768 3.13.573 4.69-.02.273-.123.52-.29.71-.18-.18-.42-.325-.678-.403l-.217.087c-1.486-.573-3.13-.768-4.69.573Z"
    />
  </svg>
);

// --- Componentes Auxiliares do Formulário ---
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
  const handleCheckboxChange = (color: string) =>
    onColorChange(
      selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...selectedColors, color]
    );
  return (
    <div>
      <label className="font-medium text-slate-700">{title}</label>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
        {PREDEFINED_COLORS.map((color) => (
          <label
            key={color}
            className={`flex items-center cursor-pointer p-1 rounded-md transition-colors duration-200 hover:bg-${colorMap[color]}-100`}
          >
            <input
              type="checkbox"
              value={color}
              checked={selectedColors.includes(color)}
              onChange={() => handleCheckboxChange(color)}
              className={`mr-2 h-4 w-4 accent-${colorMap[color]}-600 rounded`}
            />
            <span>{color}</span>
          </label>
        ))}
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
              className="mr-2 h-4 w-4 text-red-600"
            />
            <span>{size}</span>
          </label>
        ))}
      </div>
    </motion.div>
  );
};

const StyleCheckboxSelector = ({
  selectedStyles,
  onStyleChange,
}: {
  selectedStyles: string[];
  onStyleChange: (styles: string[]) => void;
}) => {
  const PREDEFINED_STYLES = [
    "Clássico",
    "Moderno",
    "Rústico",
    "Disney",
    "Minimalista",
  ];
  const handleCheckboxChange = (style: string) =>
    onStyleChange(
      selectedStyles.includes(style)
        ? selectedStyles.filter((s) => s !== style)
        : [...selectedStyles, style]
    );
  return (
    <div>
      <label className="font-medium text-slate-700">
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
              className="mr-2 h-4 w-4 text-red-600 rounded"
            />
            <span>{style}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// --- Componente Principal da Seção "Contato" ---
export function ContactSection() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [temArvore, setTemArvore] = useState<"nao" | "sim">("nao");
  const [tamanhoArvore, setTamanhoArvore] = useState("180cm");
  const [coresBolas, setCoresBolas] = useState<string[]>([]);
  const [coresLacos, setCoresLacos] = useState<string[]>([]);
  const [estilos, setEstilos] = useState<string[]>([]);

  const resetForm = () => {
    setNome("");
    setDataNascimento("");
    setCidade("");
    setEstado("");
    setTemArvore("nao");
    setCoresBolas([]);
    setCoresLacos([]);
    setEstilos([]);
  };

  const { isLoading, isSuccess, handleSubmit } = useOrcamentoForm(resetForm);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit({
      nome,
      dataNascimento,
      cidade,
      estado,
      temArvore,
      tamanhoArvore,
      coresBolas,
      coresLacos,
      estilos,
    });
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
            formulário abaixo ou entre em contacto pelas nossas redes.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-700">
              Contacto Direto
            </h3>
            <a
              href="https://wa.me/5515996690551"
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
                  (15) 99669-0551
                </p>
              </div>
            </a>
            <a
              href="https://instagram.com/seu-perfil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <span className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-700 transition-colors duration-300 group-hover:bg-pink-600 group-hover:text-white">
                <InstagramIcon />
              </span>
              <div>
                <p className="font-bold text-slate-800 text-lg">Instagram</p>
                <p className="text-slate-600 group-hover:text-pink-700 transition-colors duration-300">
                  @seu-perfil
                </p>
              </div>
            </a>
            <a
              href="https://facebook.com/sua-pagina"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <span className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <FacebookIcon />
              </span>
              <div>
                <p className="font-bold text-slate-800 text-lg">Facebook</p>
                <p className="text-slate-600 group-hover:text-blue-700 transition-colors duration-300">
                  /sua-pagina
                </p>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold text-slate-700">
              Formulário Árvore dos Sonhos
            </h3>
            <div className="bg-slate-50 p-8 rounded-lg shadow-md">
              {isSuccess ? (
                <div className="text-center py-10">
                  <h3 className="text-2xl font-bold text-emerald-700">
                    Obrigado!
                  </h3>
                  <p className="text-slate-600 mt-2">
                    A sua mensagem foi enviada. Estamos a redirecioná-lo para o
                    WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <input
                    type="text"
                    placeholder="O seu nome completo"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <div>
                    <label
                      htmlFor="dataNascimento"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      id="dataNascimento"
                      required
                      value={dataNascimento}
                      onChange={(e) => setDataNascimento(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="A sua Cidade"
                      required
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="O seu Estado"
                      required
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-700">
                      Já tem a árvore?
                    </label>
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="temArvoreContato"
                          value="nao"
                          checked={temArvore === "nao"}
                          onChange={() => setTemArvore("nao")}
                          className="mr-2 h-4 w-4 text-red-600"
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
                          className="mr-2 h-4 w-4 text-red-600"
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
                  <div className="flex flex-col items-start">
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-red-800 disabled:bg-slate-400"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isLoading ? "A enviar..." : "Enviar Pedido"}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
