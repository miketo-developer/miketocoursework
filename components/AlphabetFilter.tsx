"use client";
import { useMemo } from "react";
import { Materia } from "@/types";

// Normaliza: quita acentos y pasa a mayúsculas
const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

interface Props {
  materias: Materia[];
  selectedLetter: string | null;
  setSelectedLetter: (l: string | null) => void;
}

export default function AlphabetFilter({ materias, selectedLetter, setSelectedLetter }: Props) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    materias.forEach(m => {
      const firstRaw = m.nombre.trim().charAt(0);
      const first = normalize(firstRaw); // Á -> A
      if (/[A-Z]/.test(first)) letters.add(first);
    });
    return letters;
  }, [materias]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400">FILTRAR POR LETRA</h3>
        {selectedLetter && (
          <button onClick={()=>setSelectedLetter(null)} className="text-xs font-bold text-[#00BFFF] hover:underline">Limpiar {selectedLetter}</button>
        )}
      </div>
      
      <div className="grid grid-cols-7 md:grid-cols-9 lg:grid-cols-13 gap-1.5">
        {alphabet.map(letter => {
          const isAvailable = availableLetters.has(letter);
          const isSelected = selectedLetter === letter;
          return (
            <button
              key={letter}
              disabled={!isAvailable}
              onClick={()=> setSelectedLetter(isSelected ? null : letter)}
              className={`h-9 rounded-xl text-xs font-black border transition-all ${
                !isAvailable 
                ? "bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                : isSelected
                ? "bg-[#00BFFF] text-white border-[#00BFFF] shadow-lg shadow-[#00BFFF]/20 scale-105"
                : "bg-white dark:bg-[#151E32] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#00BFFF]/50 hover:text-[#00BFFF]"
              }`}
            >
              {letter}
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-[11px] font-mono text-slate-400">Incluye tildes: A = Á, E = É, etc.</p>
    </div>
  );
}

