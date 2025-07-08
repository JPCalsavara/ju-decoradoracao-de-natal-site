// src/components/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- Componente Principal da Seção "Sobre" ---
export function AboutSection() {
  return (
    <section id="sobre" className="w-full bg-slate-50 py-20 scroll-m-20">
      <div className="container mx-auto px-6">
        {/* Usamos um grid para criar o layout de duas colunas em telas grandes */}
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Coluna da Imagem (ocupa 2 das 5 colunas no desktop) */}
          <motion.div
            className="lg:col-span-2 w-full h-140 lg:h-[450px] relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src="/images/hero.jpeg" // Coloque uma foto sua aqui
              alt="Foto profissional da decoradora de Natal"
              fill
              className="object-cover rounded-lg shadow-xl"
            />
          </motion.div>

          {/* Coluna do Texto (ocupa 3 das 5 colunas no desktop) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Prazer, sou <span className="text-red-700">Juliane</span>, a
              artesã por trás da sua decoração.
            </h2>

            <div className="mt-6 space-y-4 text-lg text-slate-600">
              <p>
                Desde criança, o Natal sempre foi a minha época favorita do ano.
                A casa cheia, as luzes piscando e, claro, a árvore como o
                coração de toda a celebração. Essa paixão de infância cresceu e
                se transformou na minha profissão: criar cenários natalinos que
                não apenas decoram, mas contam histórias e criam memórias.
              </p>
              <p>
                Com mais de 32 anos de experiência, meu trabalho é uma fusão de
                técnica e sensibilidade. Eu acredito que cada lar tem uma
                essência única, e minha missão é traduzir essa essência em uma
                decoração de Natal que seja um reflexo autêntico dos seus sonhos
                e tradições.
              </p>
            </div>

            <div className="mt-8">
              <Link href="#contato" passHref>
                <motion.button
                  className="bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-red-800 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Vamos Conversar
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
