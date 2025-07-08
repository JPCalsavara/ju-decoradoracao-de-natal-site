// src/hooks/useProdutos.ts
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Arvore } from "@/services/arvoresData"; // Reutilizamos a interface que já temos

// Configuração do cliente Supabase (as chaves devem estar no seu .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// O nosso custom hook para buscar os produtos
export const useProdutos = () => {
  // Estados para armazenar os produtos, o estado de carregamento e possíveis erros
  const [produtos, setProdutos] = useState<Arvore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect é executado uma vez, quando o componente que usa o hook é montado
  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      setError(null);

      try {
        // A chamada para o Supabase para selecionar todos os produtos da tabela "Produtos"
        const { data, error: supabaseError } = await supabase
          .from("Produtos")
          .select("*");

        // Se o Supabase retornar um erro, nós o lançamos para ser capturado pelo bloco catch
        if (supabaseError) {
          throw supabaseError;
        }

        // Se os dados forem recebidos com sucesso, atualizamos o nosso estado
        setProdutos(data || []);
      } catch (err: unknown) {
        console.error("Erro ao buscar produtos:", err);
        setError(
          "Não foi possível carregar as inspirações. Tente novamente mais tarde."
        );
      } finally {
        // Independentemente de sucesso ou erro, o carregamento termina
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []); // O array de dependências vazio [] garante que a busca aconteça apenas uma vez

  // O hook retorna os dados e os estados para que o componente possa usá-los
  return { produtos, loading, error };
};
