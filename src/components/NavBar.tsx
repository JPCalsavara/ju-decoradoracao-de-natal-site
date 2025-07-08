// src/components/NavBar.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NavBar = () => {
  const navTopics: [string, string][] = [
    ["Início", "/"],
    ["Árvores", "/galeria-completa"],
    ["Contato", "#contato"],
  ];
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const iconName = open ? "close" : "menu";
  const iconPath = `/images/icons/${iconName}-svgrepo-com.svg`;

  const menuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.07 },
    },
  };
  const listItemVariants = {
    closed: { opacity: 0, y: -15 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <div className="shadow-lg w-full sticky top-0 left-0 z-40 bg-white">
      <div className="relative lg:flex items-center justify-between py-4 lg:px-10 px-7">
        {/* --- CORREÇÃO 1: Logo --- */}
        {/* O texto agora está dentro do Link e o tamanho da imagem foi corrigido. */}
        <Link
          href="/"
          className="font-bold text-2xl cursor-pointer flex items-center text-slate-800"
        >
          <Image
            className="w-12 h-12 mr-2"
            src="icon.svg"
            alt="logo"
            width={48}
            height={48}
          />
        </Link>

        {/* --- Ícone do Menu Mobile --- */}
        <motion.div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer lg:hidden"
          whileTap={{ scale: 0.8, rotate: -90 }}
        >
          <Image
            className="w-8 h-8"
            src={iconPath}
            alt="menu icon"
            width={32}
            height={32}
          />
        </motion.div>

        {/* --- Menu Desktop --- */}
        <ul className="hidden lg:flex lg:items-center">
          {navTopics.map(([label, href]) => (
            <motion.li
              key={href}
              className="lg:ml-8 text-xl"
              whileHover={{ scale: 1.1 }}
            >
              {/* --- CORREÇÃO 2: Link Consistente --- */}
              {/* Usando legacyBehavior e <a> para consistência com o menu mobile. */}
              <Link href={href} legacyBehavior>
                <a className="text-slate-700 hover:text-red-700 font-medium duration-300">
                  {label}
                </a>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* --- Menu Mobile --- */}
        {hasMounted && (
          <AnimatePresence>
            {open && (
              <motion.ul
                className="lg:hidden absolute bg-white left-0 w-full pl-9 pb-12 pt-4 top-[84px] shadow-lg"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {navTopics.map(([label, href]) => (
                  <motion.li
                    key={href}
                    className="my-7"
                    variants={listItemVariants}
                  >
                    <Link href={href}>
                      <a
                        className="text-slate-700 hover:text-red-700 duration-300 text-xl"
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </a>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default NavBar;
