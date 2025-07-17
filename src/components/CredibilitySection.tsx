// src/components/CredibilitySection.tsx
"use client";

import { motion, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Link from "next/link";

// --- 1. Definindo as Variantes de Animação ---
// Estas são "receitas" de animação que podemos reutilizar.

// Animação para o contêiner que orquestra a entrada dos seus filhos
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Atraso de 0.2s entre cada item filho
    },
  },
};

// Animação para cada item individual, fazendo-o surgir de baixo para cima
const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// --- 2. Componente para um único item de estatística ---
const StatItem = ({
  icon,
  finalValue,
  label,
}: {
  icon: React.ReactNode;
  finalValue: number;
  label: string;
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, finalValue, {
        duration: 2, // A animação do número continua mais lenta para dar destaque
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [inView, finalValue]);

  return (
    // Cada item agora usa a variante 'fadeInUp'
    <motion.div
      ref={ref}
      variants={fadeInUp}
      className="flex flex-col items-center text-center"
    >
      <div className="text-red-700 mb-2">{icon}</div>
      <p className="text-4xl md:text-5xl font-bold text-slate-800">+{count}</p>
      <p className="text-md md:text-lg text-slate-600 mt-1">{label}</p>
    </motion.div>
  );
};

// --- 3. Componente para um item do processo ---
const ProcessItem = ({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <motion.div variants={fadeInUp}>
      {/* O card inteiro reage ao hover com a classe 'group' */}
      <div className="group block p-6 h-full rounded-lg transition-all duration-300 hover:bg-slate-50 hover:shadow-xl hover:-translate-y-2">
        <div className="flex flex-col items-center text-center">
          {/* Ícone */}
          <motion.div
            className="mb-4 flex items-center justify-center h-20 w-20 rounded-full bg-red-100 text-red-700 transition-all duration-300 group-hover:bg-red-700 group-hover:text-white"
            whileHover={{ scale: 1.1 }}
          >
            {icon}
          </motion.div>

          {/* Título e Descrição */}
          <h4 className="text-xl font-bold text-slate-800 mb-2">{title}</h4>
          <p className="text-slate-600 text-justify">{description}</p>

          {/* --- CORREÇÃO APLICADA ---
            O Link agora é um botão estilizado que muda de aparência entre mobile e desktop.
          */}
          <Link href={href} legacyBehavior>
            <a className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-full font-bold text-white bg-red-700 transition-all duration-300 md:bg-transparent md:text-red-700 md:group-hover:bg-red-700 md:group-hover:text-white md:border-2 md:border-red-700">
              <span className="mr-2">Clique Para Saber Mais</span>
              <div className="animate-shake md:animate-none md:group-hover:translate-x-1 transition-transform duration-300">
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// --- 4. Ícones ---
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const TreeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  </svg>
);
const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);
const ImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const RevitalizeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10" // Mantém o mesmo tamanho para consistência
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 11-9-9c2.5 0 4.7.9 6.4 2.3l-1.4 1.4A7 7 0 1019 12h2z"
    />
  </svg>
);

// --- 5. Componente Principal da Seção ---
export function CredibilitySection() {
  return (
    <section className="w-full bg-white py-20  overflow-hidden">
      <div className="container mx-auto px-6">
        <div
          id="numeros"
          className="md:h-[100vh] flex flex-col items-center justify-center"
        >
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800">
              Experiência que Transforma
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600">
              A nossa paixão pelo Natal reflete-se em cada detalhe e em números
              que demonstram a nossa dedicação.
            </p>
          </motion.div>

          {/* O contêiner agora orquestra a animação dos StatItems */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <StatItem
              icon={<CalendarIcon />}
              finalValue={32}
              label="Anos de Experiência"
            />
            <StatItem
              icon={<LocationIcon />}
              finalValue={23}
              label="Cidades Atendidas"
            />
            <StatItem
              icon={<TreeIcon />}
              finalValue={1100}
              label="Árvores Montadas"
            />
          </motion.div>
          <div className="flex justify-center mt-12">
            <Link href="#servicos" passHref>
              <motion.button
                className="bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-red-800 transition-colors duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
              >
                Conheça Nossos Serviços
              </motion.button>
            </Link>
          </div>
        </div>
        <div
          id="servicos"
          className="md:h-[100vh] flex flex-col items-center justify-center mt-24 md:mt-0 "
        >
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-slate-800">
              Como Realizamos o Seu Sonho?
            </h3>
          </motion.div>

          {/* O contêiner agora orquestra a animação dos ProcessItems */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <ProcessItem
              icon={<SparklesIcon />}
              title="Sonho do Zero"
              description="Ideal para quem deseja uma decoração completamente nova. Partimos de uma folha em branco para criar um conceito exclusivo que reflete a sua personalidade."
              href="#contato"
            />
            <ProcessItem
              icon={<ImageIcon />}
              title="Inspirado"
              description="Gostou de algo na nossa galeria? Usamos um dos nossos projetos como ponto de partida e adaptamo-lo para o seu espaço, com o seu toque especial."
              href="#arvores"
            />
            <ProcessItem
              icon={<RevitalizeIcon />}
              title="Revitalizar"
              description="Tem enfeites de valor sentimental? Nós integramos as suas peças existentes com novos elementos para criar uma decoração renovada, cheia de significado."
              href="#contato"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
