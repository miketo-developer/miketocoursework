import Link from "next/link";

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0B1121]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Aviso Legal</h1>
        <div className="prose dark:prose-invert prose-sm max-w-none bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            MiketoCourseWork ofrece material de estudio de referencia, guías paso a paso y asesorías. 
            No realizamos entregas textuales para suplantación académica. Todo el contenido es con fines educativos.
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            El uso del material es responsabilidad del estudiante. Los precios están en MXN y la entrega se realiza por WhatsApp.
          </p>
          <Link href="/" className="inline-block mt-4 text-sm font-bold text-[#00BFFF]">← Volver al catálogo</Link>
        </div>
      </div>
    </main>
  );
}
