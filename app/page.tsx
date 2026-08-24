"use client";

import { useState, useMemo } from "react";
import materiasData from "@/data/materias.json";
import { Materia } from "@/types";
import SearchBar from "@/components/SearchBar";
import LevelAccordion from "@/components/LevelAccordion";
import MateriaCard from "@/components/MateriaCard";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  const materias = materiasData as Materia[];
  const [search, setSearch] = useState("");
  const [selectedNivel, setSelectedNivel] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return materias.filter((m) => {
      const matchSearch = m.nombre.toLowerCase().includes(search.toLowerCase());
      const matchNivel = selectedNivel ? m.nivel === selectedNivel : true;
      return matchSearch && matchNivel;
    });
  }, [materias, search, selectedNivel]);

  return (
    <main className="min-h-screen">
      {/* Header Estilo Propuesta 2 */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0B1121]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            <span className="text-[#00BFFF]">&lt;/&gt;</span> MIKETO <span className="text-[#00BFFF] font-light">/ COURSEWORK</span>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <a href="#" className="hover:text-[#00BFFF] transition-colors">Inicio</a>
              <a href="#" className="hover:text-[#00BFFF] transition-colors">Catálogo</a>
              <a href="#" className="hover:text-[#00BFFF] transition-colors">Blog</a>
              <a href="#" className="px-4 py-2 rounded-lg border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/10 transition-colors">
                Asesoría
              </a>
            </nav>
            {/* Botón de Modo Oscuro/Claro */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Search Bar Centralizado */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar value={search} onChange={setSearch} placeholder="BUSCAR MATERIA:" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar - Acordeón */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <LevelAccordion materias={materias} selectedNivel={selectedNivel} onSelectNivel={setSelectedNivel} />
          </aside>

          {/* Grid de Materias */}
          <section>
            {filtered.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/30">
                <p className="font-mono text-sm text-slate-500">{`No se encontraron materias para "${search}"`}</p>   
                <button onClick={() => {setSearch(""); setSelectedNivel(null)}} className="mt-3 text-xs font-mono text-[#00BFFF] hover:underline">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((materia) => (
                  <MateriaCard key={materia.id} materia={materia} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <PWAInstallBanner />
    </main>
  );
}

