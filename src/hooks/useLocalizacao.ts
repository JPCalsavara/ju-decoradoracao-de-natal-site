// src/hooks/useLocalizacao.ts
"use client";

import { useState, useEffect, useCallback } from "react";

// --- Interfaces para definir a "forma" dos dados da API ---
export interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

export interface Cidade {
  id: number;
  nome: string;
}

// --- O nosso custom hook para buscar os dados de localização ---
export const useLocalizacao = () => {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [loadingEstados, setLoadingEstados] = useState(true);
  const [loadingCidades, setLoadingCidades] = useState(false);

  // Busca a lista de estados uma vez, quando o hook é montado
  useEffect(() => {
    const fetchEstados = async () => {
      setLoadingEstados(true);
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        );
        if (!response.ok) throw new Error("Falha ao carregar os estados.");
        const data: Estado[] = await response.json();
        setEstados(data);
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
      } finally {
        setLoadingEstados(false);
      }
    };
    fetchEstados();
  }, []); // O array vazio garante que isto só executa uma vez

  // --- CORREÇÃO APLICADA ---
  // A função para buscar cidades agora está envolvida em 'useCallback'.
  // Isso garante que a função não seja recriada a cada renderização,
  // evitando loops infinitos e "travamentos" no componente que a utiliza.
  const fetchCidades = useCallback(async (uf: string) => {
    if (!uf) {
      setCidades([]);
      return;
    }
    setLoadingCidades(true);
    setCidades([]); // Limpa as cidades anteriores para um feedback visual melhor
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );
      if (!response.ok) throw new Error("Falha ao carregar as cidades.");
      const data: Cidade[] = await response.json();
      // Ordena as cidades por nome para uma melhor experiência
      const sortedData = data.sort((a, b) => a.nome.localeCompare(b.nome));
      setCidades(sortedData);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
      setCidades([]); // Garante que a lista de cidades fique vazia em caso de erro
    } finally {
      setLoadingCidades(false);
    }
  }, []); // O array de dependências vazio significa que a função só é criada uma vez

  // O hook retorna os dados e as funções para o componente usar
  return { estados, cidades, loadingEstados, loadingCidades, fetchCidades };
};
