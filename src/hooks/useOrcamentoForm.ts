// src/hooks/useOrcamentoForm.ts
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Arvore } from "@/services/arvoresData";

// --- 1. Interface atualizada com o novo campo 'enfeites' ---
export interface OrcamentoFormData {
  nome: string;
  dataNascimento?: string;
  cidade: string;
  estado: string;
  tipoDeServico: string;
  titulo: string;
  temArvore: "nao" | "sim";
  tamanhoArvore: string;
  coresBolas: string[];
  coresLacos: string[];
  enfeites: string[]; // NOVO
  arvore?: Arvore;
  estilos?: string[];
}

// Criação do cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// O nosso custom hook que encapsula toda a lógica de envio
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
        tipoDeServico,
        titulo,
        temArvore,
        tamanhoArvore,
        coresBolas,
        coresLacos,
        enfeites,
        arvore,
        estilos,
      } = formData;

      const finalCorBolas =
        coresBolas.length > 0 ? coresBolas.join(", ") : "A definir";
      const finalCorLacos =
        coresLacos.length > 0 ? coresLacos.join(", ") : "A definir";
      const finalEnfeites =
        enfeites.length > 0 ? enfeites.join(", ") : "A definir"; // NOVO
      const temArvoreTexto =
        temArvore === "sim" ? `Sim, tamanho de ${tamanhoArvore}` : "Não";
      const estilosSelecionados =
        estilos && estilos.length > 0 ? estilos.join(", ") : "Não especificado";
      const estiloInspiracao = arvore
        ? `${arvore.nome} (${arvore.estilo})`
        : estilosSelecionados;

      // --- 2. Salva os novos dados no Supabase ---
      const { error } = await supabase.from("Orcamentos").insert([
        {
          nome_cliente: nome,
          data_nascimento: dataNascimento || null,
          cidade: cidade,
          estado: estado,
          tipo_de_servico: tipoDeServico,
          titulo: titulo,
          possui_arvore: temArvoreTexto,
          cores_bolas: finalCorBolas,
          cores_lacos: finalCorLacos,
          enfeites: finalEnfeites, // NOVO
          estilo_inspiracao: estiloInspiracao,
        },
      ]);

      if (error) {
        throw new Error(`Erro no Supabase: ${error.message}`);
      }

      // --- 3. Prepara a mensagem do WhatsApp com os novos dados ---
      let messageStart = `Olá! Gostaria de solicitar um orçamento.\n\n`;

      if (tipoDeServico === "Decoração Inspirada") {
        messageStart =
          `Olá! Gostaria de um orçamento para o serviço: *${tipoDeServico}*.\n\n` +
          `*Título do Projeto:* ${titulo}\n`;
      }

      const message =
        messageStart +
        `*Nome:* ${nome}\n` +
        `*Localização:* ${cidade}, ${estado}\n\n` +
        (arvore
          ? `*Inspiração:* ${arvore.nome}\n`
          : `*Estilos Desejados:* ${estiloInspiracao}\n`) +
        `*Já possui árvore?* ${temArvoreTexto}\n` +
        `*Cores para Bolas:* ${finalCorBolas}\n` +
        `*Cores para Laços:* ${finalCorLacos}\n` +
        `*Enfeites:* ${finalEnfeites}\n\n` + // NOVO
        `Aguardo o contato!`;

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
        "Ocorreu um erro ao registar o seu pedido. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isSuccess, handleSubmit };
};
