"use client";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-20 bg-white dark:bg-[#0B1121] border-b border-slate-200 dark:border-slate-800/80">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl md:text-2xl font-black tracking-tight">
          <span className="text-[#00BFFF]">{"</>"}</span>
          <span className="text-slate-900 dark:text-white">MIKETO</span>
          <span className="text-[#00BFFF] font-light">/ COURSEWORK</span>
        </Link>
        <div className="flex items-center gap-3">
          <a href="#catalogo" className="hidden md:inline-flex px-4 py-2 rounded-lg border border-[#00BFFF] text-[#00BFFF] text-sm font-bold hover:bg-[#00BFFF]/10 transition-colors">
            Asesoría
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* Hero que ahora hace scroll, no sticky */}
      <div className="max-w-7xl mx-auto px-4 pb-6 pt-1">
        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-[#151E32] dark:to-[#0B1121] border border-slate-200 dark:border-slate-800 p-6 md:p-7 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00BFFF]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h1 className="relative text-[22px] md:text-[26px] font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            Asesorías, ayuda, orientación y <span className="text-[#00BFFF]">apoyo general</span> para <span className="text-[#00BFFF]">Sistemas Computacionales</span>.
          </h1>
          <p className="relative mt-2.5 text-[13px] md:text-[14px] text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Guías paso a paso y código limpio. Material de referencia ISC - 41 materias. <span className="text-slate-900 dark:text-white font-semibold">No es para entrega textual.</span>
          </p>
        </div>
      </div>
    </header>
  );
}
