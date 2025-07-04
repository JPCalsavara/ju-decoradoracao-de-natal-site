// src/components/NavBar.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const navTopics: [string, string][] = [
    ["Início", "/"],
    ["Árvores", "/galeria"],
    ["Contato", "#contato"],
  ];
  const [open, setOpen] = useState(false);
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
    // --- CORREÇÃO APLICADA AQUI ---
    // O z-index foi reduzido de z-[9999] para z-40.
    // Isso mantém a NavBar acima do conteúdo da página, mas permite que
    // modais com z-index padrão (como z-50) apareçam na frente.
    <div className="shadow-lg w-full sticky top-0 left-0 z-40 bg-white">
      <div className="lg:flex items-center justify-between py-4 lg:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center text-slate-800">
          <Image
            className="w-10 h-10 mr-2"
            src="/images/icons/screen-svgrepo-com.svg"
            alt="logo"
            width={40}
            height={40}
          />
          Decoradora de Natal
        </div>

        <motion.div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-3 top-3 cursor-pointer lg:hidden"
          whileTap={{ scale: 0.8, rotate: -90 }}
        >
          <Image
            className="w-10 h-10"
            src={iconPath}
            alt="menu icon"
            width={40}
            height={40}
          />
        </motion.div>

        <ul className="hidden lg:flex lg:items-center">
          {navTopics.map(([label, href]) => (
            <motion.li
              key={href}
              className="lg:ml-8 text-xl"
              whileHover={{ scale: 1.1 }}
            >
              <a
                href={href}
                className="text-slate-700 hover:text-red-700 font-medium duration-300"
              >
                {label}
              </a>
            </motion.li>
          ))}
        </ul>

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
                  <a
                    href={href}
                    className="text-slate-700 hover:text-red-700 duration-300 text-xl"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavBar;
