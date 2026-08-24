import Link from "next/link";
import { Materia } from "@/types";

interface Props {
  materia: Materia;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function MateriaCard({ materia, isFavorite, onToggleFavorite }: Props) {
  const renderTechIcons = () => {
    const conectores = ["de","del","y","a","e","o","u","para","por","con","en","la","las","el","los","un","una","unos","unas","i","ii","iii","iv"];
    const todas = materia.nombre.trim().split(/\s+/);
    const sustanciales = todas.filter(p=>{
      const limpia = p.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z]/g,"");
      return !conectores.includes(limpia);
    });
    const finales = sustanciales.length>0 ? sustanciales : todas;
    const colores = [
      { bg:"bg-red-500/10", border:"border-red-500/20", text:"text-red-500" },
      { bg:"bg-[#00BFFF]/10", border:"border-[#00BFFF]/20", text:"text-[#00BFFF]" },
      { bg:"bg-amber-500/10", border:"border-amber-500/20", text:"text-amber-500" },
      { bg:"bg-emerald-500/10", border:"border-emerald-500/20", text:"text-emerald-400" },
    ];
    return (
      <div className="flex -space-x-2">
        {finales.slice(0,4).map((palabra,index)=>{
          const inicial = palabra.charAt(0).toUpperCase();
          const color = colores[index % colores.length];
          return (
            <div key={index} className={`w-7 h-7 rounded-full ${color.bg} ${color.border} border flex items-center justify-center`}>
              <span className={`${color.text} font-bold text-[10px]`}>{inicial}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="group h-full bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 hover:border-[#00BFFF]/50 hover:shadow-lg hover:shadow-[#00BFFF]/5 transition-all duration-300 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00BFFF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Header card con nivel y estrella */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase">
            {materia.nivel===9?'OP. SELLO':materia.nivel===10?'ESPECIALIDAD':`NIVEL ${materia.nivel}`} • {materia.tipo.toUpperCase()}
          </span>
          {renderTechIcons()}
        </div>
        <button
          onClick={(e)=>{e.preventDefault(); e.stopPropagation(); onToggleFavorite(materia.id);}}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isFavorite?'bg-[#00BFFF] border-[#00BFFF] text-white shadow-md shadow-[#00BFFF]/20':'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-[#00BFFF] hover:border-[#00BFFF]/50'}`}
          aria-label="Favorito"
        >
          <svg className="w-4 h-4" fill={isFavorite?"currentColor":"none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29M21 12.5l-5.5 4 2.1 6.5L12 19l-5.6 4 2.1-6.5L3 12.5l6.5-.5L12 6l2.5 6z" />
          </svg>
        </button>
      </div>

      <Link href={`/materia/${materia.slug}`} className="flex-1">
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#00BFFF] transition-colors line-clamp-2">
          {materia.nombre}
        </h3>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {materia.descripcion || `${materia.retos.length} retos incluidos`}
        </p>
        
        <div className="mt-4 flex items-center gap-2">
          {materia.tags?.slice(0,2).map((tag,i)=>(
            <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">{tag}</span>
          ))}
        </div>
      </Link>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-400">{materia.retos.length} retos</span>
        <Link href={`/materia/${materia.slug}`} className="text-xs font-bold text-[#00BFFF] hover:underline">Ver →</Link>
      </div>
    </div>
  );
}

