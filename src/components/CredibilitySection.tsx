// src/components/CredibilitySection.tsx
"use client";

import { motion, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

// --- 1. Componente para um único item de estatística ---
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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, finalValue, {
        duration: 2,
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [inView, finalValue]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="text-red-700 mb-2">{icon}</div>
      <p className="text-4xl md:text-5xl font-bold text-slate-800">+{count}</p>
      <p className="text-md md:text-lg text-slate-600 mt-1">{label}</p>
    </div>
  );
};

// --- 2. Ícones para cada estatística ---
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

// --- 3. Componente Principal da Seção ---
export function CredibilitySection() {
  return (
    <section className="w-full md:h-[85vh] bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800">
            Experiência que Transforma
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600">
            Nossa paixão pelo Natal se reflete em cada detalhe e em números que
            demonstram nossa dedicação.
          </p>
        </div>

        {/* Grid com as 3 estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto">
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
        </div>

        {/* --- SEÇÃO DE TEXTO ATUALIZADA --- */}
        <motion.div
          className="mt-20 max-w-[75%] mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:flex-1/2 gap-8 text-xl text-slate-600">
            <motion.div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                O que me motiva?
              </h3>
              <p className="text-center md:text-justify ">
                O{" "}
                <span className="text-red-600 font-bold text-2xl text-">
                  AMOR
                </span>{" "}
                é a nossa marca registrada e tornar{" "}
                <span className="text-red-600 font-bold text-2xl text-">
                  SONHOS
                </span>{" "}
                realidade, o nosso propósito. O seu projeto de Natal é único e
                totalmente personalizado.
              </p>
            </motion.div>
            <motion.div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Como Realizamos o Seu Sonho?
              </h3>
              <p className="text-center md:text-justify ">
                Seja a partir de uma inspiração que viu na nossa galeria, de uma
                ideia que sempre teve, ou aproveitando os enfeites que já
                possui, nós criamos a decoração perfeita. Quer trocar os laços,
                as bolas ou até a árvore? A sua visão é a nossa prioridade, do
                início ao fim.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
