"use client";

type View = "inicio" | "catalogo" | "favoritos";

interface NavItem {
  id: View;
  label: string;
  icon: string;
}

interface Props {
  activeView: View;
  setActiveView: (v: View) => void;
  favCount: number;
  mounted?: boolean;
}

export default function BottomNav({ activeView, setActiveView, favCount, mounted = true }: Props) {
  const items: NavItem[] = [
    { id: "inicio", label: "Inicio", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "catalogo", label: "Catálogo", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { id: "favoritos", label: "Favoritos", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29M21 12.5l-5.5 4 2.1 6.5L12 19l-5.6 4 2.1-6.5L3 12.5l6.5-.5L12 6l2.5 6z" },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0B1121]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-3 h-[64px]">
          {items.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex flex-col items-center justify-center gap-1 relative transition-colors ${isActive ? "text-[#00BFFF]" : "text-slate-500 dark:text-slate-400"}`}
              >
                {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#00BFFF] rounded-full"></div>}
                <div className="relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2.5 : 2} d={item.icon} />
                  </svg>
                  {/* FIX HIDRATACIÓN: solo muestra contador cuando mounted es true */}
                  {mounted && item.id === "favoritos" && favCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#00BFFF] text-white text-[10px] font-bold flex items-center justify-center">
                      {favCount}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-bold tracking-wide ${isActive ? "text-[#00BFFF]" : ""}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Web Tabs */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 mt-4 gap-2">
        {items.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-bold flex items-center gap-2 transition-all ${isActive ? "bg-[#00BFFF] text-white border-[#00BFFF] shadow-md shadow-[#00BFFF]/20" : "bg-white dark:bg-[#151E32] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#00BFFF]/50"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
              {item.label} {mounted && item.id==="favoritos" && favCount>0 && `(${favCount})`}
            </button>
          );
        })}
      </div>
    </>
  );
}
