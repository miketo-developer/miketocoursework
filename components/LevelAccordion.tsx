"use client";

import { useState } from "react";
import { Materia } from "@/types";

interface LevelAccordionProps {
  materias: Materia[];
  selectedNivel: number | null;
  onSelectNivel: (nivel: number | null) => void;
}

export default function LevelAccordion({ materias, selectedNivel, onSelectNivel }: LevelAccordionProps) {
  const [openLevels, setOpenLevels] = useState<number[]>([1, 2, 3]);

  const toggleLevel = (nivel: number) => {
    setOpenLevels(prev => prev.includes(nivel) ? prev.filter(n => n !== nivel) : [...prev, nivel]);
  };

  // 🚀 Carga hasta el nivel 10
  const niveles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const countByNivel = (nivel: number) => materias.filter(m => m.nivel === nivel).length;

  // 🚀 Función traductora
  const getNivelName = (n: number) => {
    if (n === 9) return "Optativas Sello";
    if (n === 10) return "Especialización";
    return `Nivel ${n}`;
  };

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-4">Filtrar por Nivel</h3>
      <div className="flex flex-col gap-2">
        {niveles.map((nivel) => {
          const count = countByNivel(nivel);
          const isOpen = openLevels.includes(nivel);
          const isSelected = selectedNivel === nivel;
          
          // Oculta el nivel si no tienes materias asignadas ahí
          if (count === 0) return null;

          return (
            <div key={nivel} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151E32]">
              <button
                onClick={() => toggleLevel(nivel)}
                className={`w-full flex items-center justify-between p-3.5 transition-colors ${isSelected ? 'bg-slate-50 dark:bg-slate-800/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${isSelected ? 'text-[#00BFFF]' : 'text-slate-700 dark:text-slate-300'}`}>
                    {getNivelName(nivel).toUpperCase()}
                  </span>
                </div>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-3 pb-3 bg-slate-50/50 dark:bg-slate-800/20">
                  <button
                    onClick={() => onSelectNivel(isSelected ? null : nivel)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all border ${isSelected ? 'bg-[#00BFFF]/10 border-[#00BFFF]/30 text-[#00BFFF]' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
                  >
                    {isSelected ? '> Ver todos' : `> Filtrar ${getNivelName(nivel)} [${count}]`}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}












/*
"use client";

import { useState } from "react";
import { Materia } from "@/types";

interface LevelAccordionProps {
  materias: Materia[];
  selectedNivel: number | null;
  onSelectNivel: (nivel: number | null) => void;
}

export default function LevelAccordion({ materias, selectedNivel, onSelectNivel }: LevelAccordionProps) {
  const [openLevels, setOpenLevels] = useState<number[]>([1,2,3]);

  const toggleLevel = (nivel: number) => {
    setOpenLevels(prev => prev.includes(nivel)? prev.filter(n => n!== nivel) : [...prev, nivel]);
  };
  
  const niveles = Array.from({ length: 8 }, (_, i) => i + 1);
  const countByNivel = (nivel: number) => materias.filter(m => m.nivel === nivel).length; 

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-4">Filtrar por Nivel</h3>
      <div className="flex flex-col gap-2">
        {niveles.map((nivel) => {
          const count = countByNivel(nivel);
          const isOpen = openLevels.includes(nivel);
          const isSelected = selectedNivel === nivel;
          if (count === 0) return null;

          return (
            <div key={nivel} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151E32]">
              <button
                onClick={() => toggleLevel(nivel)}
                className={`w-full flex items-center justify-between p-3.5 transition-colors ${isSelected ? 'bg-slate-50 dark:bg-slate-800/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${isSelected ? 'text-[#00BFFF]' : 'text-slate-700 dark:text-slate-300'}`}>
                    NIVEL {nivel}
                  </span>
                </div>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-3 pb-3 bg-slate-50/50 dark:bg-slate-800/20">
                  <button
                    onClick={() => onSelectNivel(isSelected? null : nivel)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all border ${isSelected? 'bg-[#00BFFF]/10 border-[#00BFFF]/30 text-[#00BFFF]' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
                  >
                    {isSelected? '> Ver todos los niveles' : `> Filtrar Nivel ${nivel} [${count} materias]`}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

*/