// ==================================================================
// ARQUIVO: src/components/FilterControls.tsx
// Componente refatorado para usar seletores (dropdowns) em vez de checkboxes.
// ==================================================================
"use client";

import React from "react";

// --- Componente Genérico para um Seletor (Dropdown) ---
const SelectFilter = ({
  label,
  options,
  selectedValue,
  onFilterChange,
  placeholder = "Todos",
}: {
  label: string;
  options: string[];
  selectedValue: string;
  onFilterChange: (value: string) => void;
  placeholder?: string;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <select
        value={selectedValue}
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

// --- Componente Principal dos Filtros ---
const FilterControls = ({
  availableFilters,
  selectedFilters,
  onFilterChange,
}: {
  availableFilters: {
    tipos: string[];
    alturas: string[];
    estilos: string[];
    cores: string[];
  };
  selectedFilters: {
    tipo: string;
    altura: string;
    estilo: string;
    cor: string;
  };
  onFilterChange: (
    category: keyof typeof selectedFilters,
    value: string
  ) => void;
}) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SelectFilter
          label="Tipo de Produto"
          options={availableFilters.tipos}
          selectedValue={selectedFilters.tipo}
          onFilterChange={(value) => onFilterChange("tipo", value)}
          placeholder="Todos os Tipos"
        />
        <SelectFilter
          label="Altura"
          options={availableFilters.alturas}
          selectedValue={selectedFilters.altura}
          onFilterChange={(value) => onFilterChange("altura", value)}
          placeholder="Todas as Alturas"
        />
        <SelectFilter
          label="Estilo"
          options={availableFilters.estilos}
          selectedValue={selectedFilters.estilo}
          onFilterChange={(value) => onFilterChange("estilo", value)}
          placeholder="Todos os Estilos"
        />
        <SelectFilter
          label="Cor Principal"
          options={availableFilters.cores}
          selectedValue={selectedFilters.cor}
          onFilterChange={(value) => onFilterChange("cor", value)}
          placeholder="Todas as Cores"
        />
      </div>
    </div>
  );
};

export default FilterControls;
