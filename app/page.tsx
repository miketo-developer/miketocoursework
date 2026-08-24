"use client";

import { useState, useMemo } from "react";
import materiasData from "@/data/materias.json";
import { Materia } from "@/types";
import Header from "@/components/Header";
import MateriaCard from "@/components/MateriaCard";
import BottomNav from "@/components/BottomNav";
import AlphabetFilter from "@/components/AlphabetFilter";
import { useFavorites } from "@/lib/useFavorites";

const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function HomePage() {
  const materias = materiasData as Materia[];
  const [activeView, setActiveView] = useState<"inicio" | "catalogo" | "favoritos">("inicio");
  const [search, setSearch] = useState("");
  const [selectedNivel, setSelectedNivel] = useState<number | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { favorites, toggleFavorite, isFavorite, mounted } = useFavorites();

  const filtered = useMemo(() => {
    let list = [...materias];
    if (activeView === "favoritos") list = list.filter(m => favorites.includes(m.id));
    if (search) {
      const s = normalize(search);
      list = list.filter(m => normalize(m.nombre).includes(s) || m.tags?.some(t => normalize(t).includes(s)));
    }
    if (selectedNivel) list = list.filter(m => m.nivel === selectedNivel);
    if (activeView === "catalogo" && selectedLetter) {
      list = list.filter(m => normalize(m.nombre.trim().charAt(0)) === normalize(selectedLetter));
    }
    return list;
  }, [materias, search, selectedNivel, selectedLetter, activeView, favorites]);

  const niveles = [1,2,3,4,5,6,7,8,9,10];
  const countByNivel = (n:number) => materias.filter(m=>m.nivel===n).length;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0B1121] pb-[80px] md:pb-0">
      <Header />
      <BottomNav activeView={activeView} setActiveView={setActiveView} favCount={favorites.length} mounted={mounted} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="w-full max-w-2xl mx-auto relative">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400 group-focus-within:text-[#00BFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="BUSCAR MATERIA... ej: algebra" className="w-full pl-12 pr-28 py-4 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]/30 focus:border-[#00BFFF]/50 shadow-sm text-sm font-medium" />
            <button type="button" onClick={() => setShowFilters(!showFilters)} className={`absolute right-2 top-2 bottom-2 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${selectedNivel ? "bg-[#00BFFF] text-white border-[#00BFFF]" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"}`}>
              {selectedNivel ? `N${selectedNivel}` : "Filtros"}
            </button>
          </div>
          {showFilters && (
            <div className="absolute z-30 mt-3 w-full bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {niveles.map(n=>{ const c=countByNivel(n); if(!c) return null; const sel=selectedNivel===n; return <button key={n} onClick={()=>{setSelectedNivel(sel?null:n); setShowFilters(false);}} className={`py-2.5 rounded-xl border text-xs font-bold ${sel?"bg-[#00BFFF] text-white border-[#00BFFF]":"bg-slate-50 dark:bg-slate-800/50"}`}>{n===9?'OPT SELLO':n===10?'ESPEC':`NIVEL ${n}`} [{c}]</button>})}
              </div>
            </div>
          )}
        </div>

        {activeView === "catalogo" && (
          <div className="max-w-3xl mx-auto mt-6 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
            <AlphabetFilter materias={materias} selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />
          </div>
        )}

        <div className="max-w-7xl mx-auto mt-6 flex items-center justify-between">
          <p className="text-xs font-mono text-slate-500">{activeView.toUpperCase()} <span className="ml-2 text-slate-900 dark:text-white font-bold">[{filtered.length}]</span></p>
          {(selectedNivel || selectedLetter || search) && <button onClick={()=>{setSearch(""); setSelectedNivel(null); setSelectedLetter(null);}} className="text-xs font-bold text-[#00BFFF]">Limpiar todo</button>}
        </div>

        <div className="mt-4">
          {filtered.length===0 ? (
            <div className="py-20 text-center border border-dashed rounded-2xl bg-white dark:bg-[#151E32]/50"><p className="font-mono text-sm text-slate-500">{activeView==="favoritos" ? "Aún no tienes favoritos. Marca con ★" : `No hay resultados`}</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(m=><MateriaCard key={m.id} materia={m} isFavorite={isFavorite(m.id)} onToggleFavorite={toggleFavorite} />)}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
