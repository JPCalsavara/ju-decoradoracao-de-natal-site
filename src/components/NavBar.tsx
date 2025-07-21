// src/components/NavBar.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NavBar = () => {
  const navTopics: [string, string][] = [
    ["Início", "/"],
    ["Galeria", "/galeria"],
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
    <header className="shadow-lg w-full sticky top-0 left-0 z-40 bg-white">
      {/* --- CORREÇÃO APLICADA AQUI --- */}
      {/* O conteúdo agora está dentro de um 'div' com 'container mx-auto',
          garantindo que o alinhamento e o padding sejam consistentes com o Footer. */}
      <div className="container mx-auto px-6">
        <div className="relative flex items-center justify-between py-4">
          <Link
            href="/"
            className="font-bold text-2xl cursor-pointer flex items-center text-slate-800"
          >
            <Image
              className="w-12 h-12 mr-2"
              src="/icon.svg"
              alt="logo"
              width={48}
              height={48}
            />
            Decoradora de Natal
          </Link>

          {/* --- Ícone do Menu Mobile --- */}
          <motion.div
            onClick={() => setOpen(!open)}
            className="text-3xl cursor-pointer lg:hidden"
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
          <nav className="hidden lg:flex lg:items-center">
            <ul className="flex items-center">
              {navTopics.map(([label, href]) => (
                <motion.li
                  key={href}
                  className="lg:ml-8 text-xl"
                  whileHover={{ scale: 1.1 }}
                >
                  <Link
                    href={href}
                    className="text-slate-700 hover:text-red-700 font-medium duration-300"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* --- Menu Mobile --- */}
      {hasMounted && (
        <AnimatePresence>
          {open && (
            <motion.div
              className="lg:hidden absolute bg-white left-0 w-full shadow-lg"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <nav>
                <ul className="px-6 pb-6 pt-2">
                  {navTopics.map(([label, href]) => (
                    <motion.li
                      key={href}
                      className="my-6"
                      variants={listItemVariants}
                    >
                      <Link
                        href={href}
                        className="text-slate-700 hover:text-red-700 duration-300 text-xl"
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </header>
  );
};

export default NavBar;
