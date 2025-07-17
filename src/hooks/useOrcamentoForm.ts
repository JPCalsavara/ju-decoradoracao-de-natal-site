// src/hooks/useOrcamentoForm.ts
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Arvore } from "@/services/arvoresData";

// A interface de dados não precisa de alterações
export interface OrcamentoFormData {
  nome: string;
  dataNascimento?: string;
  cidade: string;
  estado: string;
  tipo: string;
  tipoDeServico: string;
  titulo: string;
  temArvore: "nao" | "sim";
  tamanhoArvore: string;
  coresBolas: string[];
  coresLacos: string[];
  enfeites: string[];
  arvore?: Arvore;
  estilo?: string[];
}

// Criação do cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- O nosso custom hook refatorado ---
export const useOrcamentoForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // A função de envio agora retorna o link do WhatsApp em caso de sucesso
  const handleSubmit = async (
    formData: OrcamentoFormData
  ): Promise<string | null> => {
    if (isLoading) return null;
    setIsLoading(true);

    try {
      const {
        nome,
        dataNascimento,
        cidade,
        estado,
        tipo,
        tipoDeServico,
        titulo,
        temArvore,
        tamanhoArvore,
        coresBolas,
        coresLacos,
        enfeites,
        arvore,
        estilo,
      } = formData;

      // Formatação dos dados para colunas de texto
      const finalCorBolas =
        coresBolas.length > 0 ? coresBolas.join(", ") : "A definir";
      const finalCorLacos =
        coresLacos.length > 0 ? coresLacos.join(", ") : "A definir";
      const temArvoreTexto =
        temArvore === "sim" ? `Sim, tamanho de ${tamanhoArvore}` : "Não";
      const estiloSelecionado =
        estilo && estilo.length > 0 ? estilo.join(", ") : "Não especificado";
      const estiloInspiracao = arvore
        ? `${titulo} (${estilo})`
        : estiloSelecionado;

      // 1. Salva os dados no Supabase
      const { error } = await supabase.from("Orcamentos").insert([
        {
          nome_cliente: nome,
          data_nascimento: dataNascimento || null,
          cidade,
          estado,
          tipo,
          tipo_de_servico: tipoDeServico,
          titulo,
          possui_produto: temArvoreTexto,
          estilo_inspiracao: estiloInspiracao,
          cores_bolas: finalCorBolas,
          cores_lacos: finalCorLacos,
          enfeites: enfeites,
          tamanhoArvore,
        },
      ]);

      if (error) throw new Error(`Erro no Supabase: ${error.message}`);

      // 2. Prepara a mensagem do WhatsApp
      const finalEnfeitesString =
        enfeites.length > 0 ? enfeites.join(", ") : "A definir";
      let messageStart = `Olá! Gostaria de solicitar um orçamento.\n\n`;
      if (
        tipoDeServico === "Decoração Inspirada" ||
        tipoDeServico === "Contato Geral"
      ) {
        messageStart =
          `Olá! Gostaria de um orçamento para o serviço: *${tipoDeServico}*.\n\n` +
          (titulo ? `*Título do Projeto:* ${titulo}\n` : "");
      }
      const message =
        messageStart +
        `*Nome:* ${nome}\n` +
        `*Localização:* ${cidade}, ${estado}\n\n` +
        `*Qual produto?:* ${tipo}\n` +
        (arvore
          ? `*Inspiração:* ${titulo}\n`
          : `*estilo Desejados:* ${estiloInspiracao}\n`) +
        `*Já possui produto?* ${temArvoreTexto}\n` +
        `*Cores para Bolas:* ${finalCorBolas}\n` +
        `*Cores para Laços:* ${finalCorLacos}\n` +
        `*Enfeites:* ${finalEnfeitesString}\n\n` +
        `Aguardo o contato!`;

      const whatsappNumber = "5515991240551";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      // 3. Retorna a URL do WhatsApp em caso de sucesso
      return whatsappUrl;
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      alert(
        "Ocorreu um erro ao registar o seu pedido. Por favor, tente novamente."
      );
      return null; // Retorna null em caso de erro
    } finally {
      setIsLoading(false);
    }
  };

  // O hook agora só precisa de retornar o estado de loading e a função de envio
  return { isLoading, handleSubmit };
};
