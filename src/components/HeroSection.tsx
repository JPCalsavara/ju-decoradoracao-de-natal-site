// src/components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Variants para a animação do conteúdo de texto
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Variant para a imagem, para que ela surja do lado oposto
const imageVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const HeroSection = () => {
  return (
    <section
      id="inicio"
      // Fundo branco e garantindo altura mínima para preencher a tela
      className="w-full h-[80%] md:h-[85vh] flex items-center bg-white"
    >
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center px-6 py-0 lg:py-0">
        {/* Lado Esquerdo: Conteúdo de Texto e CTA */}
        <motion.div
          className="relative w-full h-60 md:h-[500px] lg:h-[600px]"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="icon.svg" // Idealmente uma imagem com fundo transparente (.png)
            alt="Árvore de Natal decorada com detalhes em vermelho e dourado"
            fill
            className="object-contain" // 'object-contain' funciona bem para imagens sem fundo
            priority
          />
        </motion.div>

        {/* Lado Direito: Imagem de Destaque */}
        <motion.div
          className="flex flex-col justify-center text-center md:text-left"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight"
            variants={textItemVariants}
          >
            A arte de transformar
            <br />
            seu lar para o <span className="text-red-700">Natal.</span>
          </motion.h1>

          <motion.div className="mt-8" variants={textItemVariants}>
            <Link href="#arvores" passHref className="">
              <motion.button
                className="bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-red-800 transition-colors duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Conheça Nossos Estilos
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
