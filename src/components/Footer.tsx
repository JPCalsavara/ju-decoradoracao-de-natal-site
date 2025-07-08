// src/components/Footer.tsx
"use client";

// import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-6 ">
        {/* <div className="flex flex-col md:flex-row md:justify-around gap-8 text-center md:text-left">
          
          <div>
            <h3 className="font-bold text-lg text-white mb-4">
              Ju Decoração de Natal
            </h3>
            <p className="text-slate-400">
              Criando memórias e transformando ambientes com a magia do Natal.
            </p>
          </div>

          
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Navegue</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#inicio"
                  className="hover:text-red-500 transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/galeria-completa"
                  className="hover:text-red-500 transition-colors"
                >
                  Galeria
                </Link>
              </li>
              <li>
                <Link
                  href="#sobre"
                  className="hover:text-red-500 transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="#contato"
                  className="hover:text-red-500 transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="mt-12 border-t border-slate-700 py-8 text-center text-slate-300 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Ju Decoração de Natal. Todos os
            direitos reservados.
          </p>
          {/* --- LINHA DE CRÉDITOS ADICIONADA --- */}
          <p className="mt-2">
            Desenvolvido com ❤️ por{" "}
            <a
              href="https://www.linkedin.com/in/seu-linkedin/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-200 hover:text-red-500 underline underline-offset-2 transition-colors"
            >
              João Calsavara
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
