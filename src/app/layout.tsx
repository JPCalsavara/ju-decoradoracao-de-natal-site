// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Importando os componentes de layout
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer"; // Usando um componente de Rodapé genérico
import { ContactSection } from "@/components/ContactSection";

// Configuração da fonte Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// --- METADADOS OTIMIZADOS PARA SEO ---
export const metadata: Metadata = {
  // Título mais descritivo com palavras-chave
  title: "Ju Decoração de Natal",
  // Descrição mais convidativa e rica em palavras-chave
  description:
    "Especialista em decoração de Natal com 32 anos de experiência. Transformamos o seu lar ou empresa com projetos únicos e artesanais em nas regiões de Sorocaba, Campinas e São Paulo.",
  // Palavras-chave relevantes para o seu negócio
  keywords: [
    "ju decoracao de natal",
    "ju decoração de natal",
    "decoração de natal",
    "decoradora de natal",
    "árvore de natal",
    "guirlanda",
    "sorocaba",
    "campinas",
    "são paulo",
    "decoração personalizada",
    "decoração artesanal",
    "porto feliz",
    "itu",
    "tatui",
    "boituva",
    "desmontagem de natal",
  ],

  // Configuração para compartilhamento em redes sociais (WhatsApp, Instagram, etc.)
  openGraph: {
    title:
      "Ju Decoração de Natal | Montagem e desmontagem de árvores e guirlandas de Natal",
    description:
      "Leve a magia do Natal para o seu espaço com decorações personalizadas e cheias de afeto.",
    type: "website",
    locale: "pt_BR",
    url: "https://www.ju-decoracao-de-natal.com.br",
    siteName: "Ju Decoração de Natal",
    images: [
      // Adicione uma imagem de pré-visualização para compartilhamento
      {
        url: "https://i.pinimg.com/736x/e6/42/cc/e642ccd918ed67e8f7ab7745083daa4e.jpg", // URL da sua imagem
        width: 1200,
        height: 630,
        alt: "Logo ",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Idioma definido para Português do Brasil
    <html lang="pt-BR">
      <body
        className={`${inter.variable} font-sans bg-slate-50 text-slate-800 antialiased`}
      >
        {/* Estrutura semântica com <header>, <main> e <footer> */}
        <NavBar />
        <main>{children}</main>
        <ContactSection />
        <Footer />
      </body>
    </html>
  );
}
