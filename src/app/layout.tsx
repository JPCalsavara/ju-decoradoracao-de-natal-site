// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Trocado para Inter, uma fonte mais versátil e legível
import "./globals.css";

// Importando os componentes de layout
import NavBar from "@/components/NavBar";
import { ContactSection } from "@/components/ContactSection";

// Configuração da fonte Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // Define a variável CSS para a fonte
});

// Metadados aprimorados para melhor SEO e compartilhamento social
export const metadata: Metadata = {
  title:
    "Ju Decoração de Natal | Decoração Personalizada em Sorocaba, Campinas e SP",
  description:
    "Especialista em decoração de Natal com 32 anos de experiência. Transformamos seu lar ou empresa com projetos únicos em Sorocaba, Campinas e São Paulo.",
  keywords: [
    "decoração de natal",
    "decoradora",
    "árvore de natal",
    "sorocaba",
    "campinas",
    "são paulo",
    "decoração personalizada",
  ],
  openGraph: {
    title: "Ju Decoração de Natal | Projetos Exclusivos",
    description:
      "Leve a magia do Natal para seu espaço com decorações personalizadas e cheias de afeto.",
    type: "website",
    locale: "pt_BR",
    // url: "https://www.seudominio.com.br", // Descomente e adicione seu domínio quando tiver um
    // siteName: "Ju Decoração de Natal",
    // images: [ // Adicione uma imagem para compartilhamento
    //   {
    //     url: "https://www.seudominio.com.br/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Árvore de Natal decorada por Ju Decoração de Natal",
    //   }
    // ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Idioma alterado para Português do Brasil
    <html lang="pt-BR">
      <body
        className={`${inter.variable} font-sans bg-slate-50 text-slate-800 antialiased z-[10000] w-screen`}
      >
        {/* Componente NavBar renderizado em todas as páginas */}
        <NavBar />

        {/* O 'main' envolve o conteúdo principal de cada página */}
        <main>{children}</main>

        {/* Componente Footer renderizado em todas as páginas */}
        <ContactSection />
      </body>
    </html>
  );
}
