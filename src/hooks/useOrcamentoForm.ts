// src/hooks/useOrcamentoForm.ts
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Arvore } from "@/services/arvoresData";

// --- INTERFACE ATUALIZADA ---
// O campo 'estilo' foi trocado por 'estilos', um array de strings.
export interface OrcamentoFormData {
  nome: string;
  dataNascimento?: string;
  cidade: string;
  estado: string;
  temArvore: "nao" | "sim";
  tamanhoArvore: string;
  coresBolas: string[];
  coresLacos: string[];
  arvore?: Arvore;
  estilos?: string[]; // NOVO: Array para múltiplos estilos
}

// Criação do cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// O custom hook que encapsula toda a lógica de envio
export const useOrcamentoForm = (onClose: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (formData: OrcamentoFormData) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const {
        nome,
        dataNascimento,
        cidade,
        estado,
        temArvore,
        tamanhoArvore,
        coresBolas,
        coresLacos,
        arvore,
        estilos,
      } = formData;

      const finalCorBolas =
        coresBolas.length > 0 ? coresBolas.join(", ") : "A definir";
      const finalCorLacos =
        coresLacos.length > 0 ? coresLacos.join(", ") : "A definir";
      const temArvoreTexto =
        temArvore === "sim" ? `Sim, tamanho de ${tamanhoArvore}` : "Não";

      // --- LÓGICA ATUALIZADA ---
      // Junta os estilos selecionados em uma única string
      const estilosSelecionados =
        estilos && estilos.length > 0 ? estilos.join(", ") : "Não especificado";

      const estiloInspiracao = arvore
        ? `${arvore.nome} (${arvore.estilo})`
        : estilosSelecionados;

      // 1. Salva os dados no Supabase
      const { error } = await supabase.from("Orcamentos").insert([
        {
          nome_cliente: nome,
          data_nascimento: dataNascimento || null,
          cidade: cidade,
          estado: estado,
          possui_arvore: temArvoreTexto,
          cores_bolas: finalCorBolas,
          cores_lacos: finalCorLacos,
          estilo_inspiracao: estiloInspiracao,
        },
      ]);

      if (error) {
        throw new Error(`Erro no Supabase: ${error.message}`);
      }

      // 2. Prepara a mensagem e chama o WhatsApp
      const message =
        `Olá! Gostaria de solicitar um orçamento.\n\n` +
        `*Nome:* ${nome}\n` +
        `*Localização:* ${cidade}, ${estado}\n\n` +
        (arvore
          ? `*Inspiração:* ${arvore.nome}\n`
          : `*Estilos Desejados:* ${estiloInspiracao}\n`) +
        `*Já possui árvore?* ${temArvoreTexto}\n` +
        `*Cores para Bolas:* ${finalCorBolas}\n` +
        `*Cores para Laços:* ${finalCorLacos}\n\n` +
        `Aguardo o contato!`;
      // Deixar mais natural

      const whatsappNumber = "5515996690551";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank");
      setIsSuccess(true);

      setTimeout(onClose, 3000);
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      alert(
        "Ocorreu um erro ao registrar seu pedido. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isSuccess, handleSubmit };
};
