// src/components/FilterControls.tsx
"use client";
import React from "react";

const FilterControls = ({
  availableColors,
  selectedColors,
  onFilterChange,
}: {
  availableColors: string[];
  selectedColors: string[];
  onFilterChange: (color: string) => void;
}) => {
  const colorMap: { [key: string]: string } = {
    Vermelho: "red",
    Azul: "blue",
    Dourado: "amber",
    Branco: "slate",
    Rosa: "pink",
    Verde: "green",
    Amarelo: "yellow",
    Marrom: "stone",
    Bege: "orange",
    "Verde Musgo": "lime",
    Cobre: "orange",
    Bordô: "rose",
    "Verde Claro": "green",
    "Madeira Natural": "amber",
    "Cinza Claro": "slate",
    Preto: "black",
    Laranja: "orange",
    Turquesa: "cyan",
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-12">
      <h3 className="font-bold text-lg text-slate-800 mb-4">Filtrar por Cor</h3>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {availableColors.map((color) => {
          const tailwindColor = colorMap[color] || "gray";
          return (
            <label
              key={color}
              className={`flex items-center cursor-pointer p-1 rounded-md transition-colors duration-200 hover:bg-${tailwindColor}-100`}
            >
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => onFilterChange(color)}
                className={`mr-2 h-4 w-4 accent-${tailwindColor}-600 border-gray-300 rounded focus:ring-${tailwindColor}-500`}
              />
              <span className="text-slate-700">{color}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FilterControls;
