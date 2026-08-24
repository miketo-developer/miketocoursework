import Link from "next/link";
import { Materia } from "@/types";

interface MateriaCardProps {
  materia: Materia;
}

export default function MateriaCard({ materia }: MateriaCardProps) {
  // 🛠️ LÓGICA PERFECCIONADA: Extrae acrónimos sustanciales omitiendo conectores
  const renderTechIcons = () => {
    const conectoresAIgnorar = [
      "de", "del", "y", "a", "e", "o", "u", "para", "por", "con", "en", "la", "las", "el", "los", "un", "una", "unos", "unas", "i", "ii", "iii", "iv"
    ];

    const todasLasPalabras = materia.nombre.trim().split(/\s+/);

    const palabrasSustanciales = todasLasPalabras.filter(palabra => {
      const palabraLimpia = palabra.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
      return !conectoresAIgnorar.includes(palabraLimpia);
    });

    const palabrasFinales = palabrasSustanciales.length > 0 ? palabrasSustanciales : todasLasPalabras;

    const colores = [
      { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-500" },
      { bg: "bg-[#00BFFF]/10", border: "border-[#00BFFF]/20", text: "text-[#00BFFF]" },
      { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-500" },
      { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
    ];

    return (
      <div className="flex -space-x-2 mt-2">
        {palabrasFinales.map((palabra, index) => {
          const inicial = palabra.charAt(0).toUpperCase();
          const colorActual = colores[index % colores.length];

          return (
            <div 
              key={index} 
              className={`w-7 h-7 rounded-full ${colorActual.bg} ${colorActual.border} border flex items-center justify-center`}
            >
              <span className={`${colorActual.text} font-bold text-[10px]`}>
                {inicial}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="group h-full bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 hover:border-[#00BFFF]/50 hover:shadow-lg hover:shadow-[#00BFFF]/5 transition-all duration-300 flex flex-col relative overflow-hidden">
      {/* Indicador superior sutil */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00BFFF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* 🚀 CABECERA UNIFICADA: Nivel + Círculos (Izquierda) | Badge (Derecha) */}
      <div className="flex items-start justify-between mb-4">
        
        {/* Columna Izquierda */}
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-400 font-mono tracking-widest uppercase">
            {materia.nivel === 9 ? 'OP. SELLO' : materia.nivel === 10 ? 'ESPECIALIDAD' : `NIVEL ${materia.nivel}`}
          </span>
          {renderTechIcons()}
        </div>

        {/* Columna Derecha */}
        {materia.tipo === 'compleja' && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 mt-1">
            NUEVO
          </span>
        )}
      </div>

      {/* Título */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight uppercase line-clamp-2 mb-2">
        {materia.nombre}
      </h3>

      {/* Descripción dinámica */}
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
        {materia.descripcion}
      </p>

      {/* Tags dinámicos */}
      <div className="flex flex-wrap gap-2 mb-5">
        {materia.tags.map((tag, index) => (
          <span 
            key={index} 
            className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold font-mono tracking-wide uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <Link href={`/materia/${materia.slug}`} className="w-full">
        <button className="w-full py-2.5 rounded-xl bg-[#00BFFF] hover:bg-[#0099cc] text-white text-sm font-bold transition-colors">
          Solicitar Material
        </button>
      </Link>
    </div>
  );
}