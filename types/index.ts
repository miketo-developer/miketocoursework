// types/index.ts - Fuente de verdad para MiketoCourseWork MVP Fase 1

export type TipoMateria = 'sencilla' | 'compleja';
export type NivelMateria = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface PreciosMateria {
  copiaRetoSencillo?: number | null;
  copiaRetoComplejo?: number | null;
  copiaMateriaSencilla?: number | null;
  copiaMateriaCompleja?: number | null;
  personalizadoRetoSencillo?: number | null;
  personalizadoRetoComplejo?: number | null;
  personalizadoMateriaSencilla?: number | null;
  personalizadoMateriaCompleja?: number | null;
}

export interface MpLinksMateria {
  copiaRetoSencillo?: string | null;
  copiaRetoComplejo?: string | null;
  copiaMateriaSencilla?: string | null;
  copiaMateriaCompleja?: string | null;
  personalizadoRetoSencillo?: string | null;
  personalizadoRetoComplejo?: string | null;
  personalizadoMateriaSencilla?: string | null;
  personalizadoMateriaCompleja?: string | null;
}

export interface Materia {
  id: string; // ej: "fundamentos-programacion"
  slug: string; // ej: "fundamentos-de-programacion" - para /materia/[slug]
  nombre: string;
  descripcion: string;
  nivel: NivelMateria;
  tipo: TipoMateria;
  retos: string[]; // Lista de retos incluidos
  precios: PreciosMateria;
  capturas: string[]; // Rutas en /public/capturas/
  videoDemo: string; // URL embed YouTube
  mpLinks: MpLinksMateria;
  whatsappText: string; // Mensaje pre-llenado
  tags: string[]; // Arreglo de textos para las etiquetas
}
