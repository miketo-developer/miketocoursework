"use client";

import { use, useState } from "react";
import Link from "next/link";
import materiasData from "@/data/materias.json";
import { Materia } from "@/types";
import ThemeToggle from "@/components/ThemeToggle";

type TabType = "copias" | "personalizados";

export default function MateriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const materias = materiasData as Materia[];
  const materia = materias.find((m) => m.slug === slug);

  const [activeTab, setActiveTab] = useState<TabType>("copias");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!materia) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1121] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="font-mono text-slate-500">Materia no encontrada: {slug}</p>
          <Link href="/" className="mt-4 inline-block text-sm font-bold text-[#00BFFF]">← Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  const waLink = (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`;
  const isCompleja = materia.tipo === "compleja";

  // 1. Opciones en crudo (pueden venir sin precio desde el JSON)
  const copiasOptionsRaw = [
    { id: "CR-S", label: "Copia Reto", price: materia.precios.copiaRetoSencillo, mp: materia.mpLinks.copiaRetoSencillo, desc: "1 reto individual sencillo. Entrega en minutos por WhatsApp.", badge: "Instant" },
    { id: "CR-C", label: "Copia Reto Complejo", price: materia.precios.copiaRetoComplejo, mp: materia.mpLinks.copiaRetoComplejo, desc: "1 reto individual complejo con código compilable.", badge: "Instant" },
    { id: "CM-S", label: "Copia Materia", price: materia.precios.copiaMateriaSencilla, mp: materia.mpLinks.copiaMateriaSencilla, desc: "Materia completa sencilla en ZIP.", badge: "Pack" },
    { id: "CM-C", label: "Copia Materia Compleja", price: materia.precios.copiaMateriaCompleja, mp: materia.mpLinks.copiaMateriaCompleja, desc: "Materia completa compleja.", badge: "Pack Full" },
  ];

  const persOptionsRaw = [
    { id: "PR-S", label: "Reto Personalizado", price: materia.precios.personalizadoRetoSencillo, mp: materia.mpLinks.personalizadoRetoSencillo, desc: "Reto hecho desde cero. 1-3 días.", badge: "4 cupos/sem" },
    { id: "PR-C", label: "Personalizado Reto Complejo", price: materia.precios.personalizadoRetoComplejo, mp: materia.mpLinks.personalizadoRetoComplejo, desc: "Reto complejo personalizado.", badge: "4 cupos/sem" },
    { id: "PM-S", label: "Materia Personalizada", price: materia.precios.personalizadoMateriaSencilla, mp: materia.mpLinks.personalizadoMateriaSencilla, desc: "Materia sencilla completa personalizada.", badge: "Garantía" },
    { id: "PM-C", label: "Personalizada Materia Compleja", price: materia.precios.personalizadoMateriaCompleja, mp: materia.mpLinks.personalizadoMateriaCompleja, desc: "Garantía de aprobación.", badge: "Garantía" },
  ];

  // 2. Filtramos: Solo se guardarán los que SÍ tengan un precio válido
  const copiasOptions = copiasOptionsRaw.filter(opt => opt.price != null);
  const persOptions = persOptionsRaw.filter(opt => opt.price != null);

  // 3. Lógica inteligente para las pestañas
  // Si entra a Copias pero no hay Copias, se pasa a VIP automáticamente.
  const displayTab = (activeTab === "copias" && copiasOptions.length === 0 && persOptions.length > 0) ? "personalizados" : activeTab;
  const activeOptions = displayTab === "copias" ? copiasOptions : persOptions;

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B1121]/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-slate-500 hover:text-[#00BFFF] transition-colors">← Volver al Catálogo</Link>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400 hidden md:block">MVP MANUAL • ENTREGA WA</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {materia.nivel === 9 ? 'Optativa Sello' : materia.nivel === 10 ? 'Especialización' : `Nivel ${materia.nivel}`}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${isCompleja ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'}`}>{materia.tipo}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight text-slate-900 dark:text-white uppercase">{materia.nombre}</h1>
          </div>

          <div className="bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Retos incluidos</h3>
            <ul className="space-y-3">
              {materia.retos.map((reto, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-[#00BFFF] font-bold">{String(i+1).padStart(2,'0')}</span>
                  {reto}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Capturas</h3>
            <div className="grid grid-cols-3 gap-3">
              {materia.capturas.map((cap, i) => (
                <button key={i} onClick={() => setSelectedImg(cap)} className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg hover:ring-2 hover:ring-[#00BFFF] transition-all overflow-hidden relative group">
                  <img 
                    src={cap} 
                    alt={`Captura ${i + 1} de ${materia.nombre}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel de Precios Fijo */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none">
            
            {/* Pestañas Dinámicas */}
            <div className="flex border-b border-slate-200 dark:border-slate-800">
              {copiasOptions.length > 0 && (
                <button onClick={() => setActiveTab("copias")} className={`flex-1 py-4 text-sm font-bold uppercase transition-colors ${displayTab==="copias"? 'bg-slate-50 dark:bg-[#0B1121] text-[#00BFFF] border-b-2 border-[#00BFFF]' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>Copias</button>
              )}
              {persOptions.length > 0 && (
                <button onClick={() => setActiveTab("personalizados")} className={`flex-1 py-4 text-sm font-bold uppercase transition-colors ${displayTab==="personalizados"? 'bg-slate-50 dark:bg-[#0B1121] text-[#00BFFF] border-b-2 border-[#00BFFF]' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>VIP</button>
              )}
            </div>
            
            {/* Lista de Precios */}
            <div className="p-5 space-y-4 bg-slate-50 dark:bg-[#0B1121]">
              {activeOptions.length > 0 ? (
                activeOptions.map((opt) => (
                  <div key={opt.id} className="border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 bg-white dark:bg-[#151E32]">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">{opt.label}</h4>
                      <span className="text-[10px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase font-bold">{opt.badge}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{opt.desc}</p>
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">${opt.price}</span>
                      <span className="text-xs font-bold text-slate-400">MXN</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Validamos que exista enlace de MercadoPago, si no, ocultamos el botón */}
                      {opt.mp && (
                        <a href={opt.mp} target="_blank" rel="noopener noreferrer" className="text-center py-3 rounded-xl bg-[#009EE3] hover:bg-[#0089C7] text-white text-xs font-bold transition-colors">
                          Mercado Pago
                        </a>
                      )}
                      <a href={waLink(`${materia.whatsappText} - Quiero ${opt.label} $${opt.price}`)} target="_blank" rel="noopener noreferrer" className={`text-center py-3 rounded-xl bg-[#00BFFF] hover:bg-[#0099cc] text-white text-xs font-bold transition-colors ${!opt.mp ? 'col-span-2' : ''}`}>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-sm font-bold text-slate-400">Actualmente no ofrecemos servicios para esta materia.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {selectedImg && (
        <div onClick={() => setSelectedImg(null)} className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#151E32] rounded-2xl p-2 max-w-4xl w-full">
            <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
              <img 
                src={selectedImg} 
                alt="Vista previa ampliada" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <button className="mt-3 w-full py-3 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white">Cerrar</button>
          </div>
        </div>
      )}
    </main>
  );
}

