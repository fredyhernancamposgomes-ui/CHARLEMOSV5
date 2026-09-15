// ============================================
// ESQUELETO COMPLETO DE CHARLEMOS 2.0
// Estructura completa con TODOS los subtemas del compendio
// ============================================

import type { TopicCategory } from '../prompts/promptEngine';

export interface SubtemaMetadata {
  id: string;
  title: string;
  path: string;
  emoji: string;
  category?: TopicCategory;
  metaforaCentral?: string;
  prerequisitos: string[];
  temasRelacionados: string[];
}

export interface Seccion {
  id: string;
  title: string;
  emoji: string;
  subtemas: SubtemaMetadata[];
}

export interface Tema {
  id: string;
  title: string;
  emoji: string;
  color: string;
  secciones: Seccion[];
}

export interface Parte {
  id: string;
  title: string;
  emoji: string;
  temas: Tema[];
}

// ============================================
// PARTE I: CITOLOGÍA I
// ============================================

const parte1: Parte = {
  id: "citologia-1",
  title: "Citología I",
  emoji: "🔬",
  temas: [
    // TEMA 1: TEORÍA CELULAR
    {
      id: "teoria-celular",
      title: "Teoría Celular",
      emoji: "📜",
      color: "from-blue-500 to-indigo-600",
      secciones: [
        {
          id: "antecedentes",
          title: "Antecedentes Históricos",
          emoji: "🔭",
          subtemas: [
            { id: "hooke", title: "Robert Hooke (1665)", emoji: "🏠", path: "citologia-1/teoria-celular/antecedentes/hooke", prerequisitos: [], temasRelacionados: ["leeuwenhoek"] },
            { id: "leeuwenhoek", title: "Leeuwenhoek (1674-1683)", emoji: "🦠", path: "citologia-1/teoria-celular/antecedentes/leeuwenhoek", prerequisitos: ["hooke"], temasRelacionados: ["hooke"] },
            { id: "brown", title: "Robert Brown (1831)", emoji: "🎯", path: "citologia-1/teoria-celular/antecedentes/brown", prerequisitos: [], temasRelacionados: [] },
            { id: "dujardin", title: "Dujardin (1835)", emoji: "💧", path: "citologia-1/teoria-celular/antecedentes/dujardin", prerequisitos: [], temasRelacionados: ["purkinje"] },
            { id: "purkinje", title: "Purkinje (1839)", emoji: "🧪", path: "citologia-1/teoria-celular/antecedentes/purkinje", prerequisitos: ["dujardin"], temasRelacionados: ["dujardin"] },
            { id: "flemming", title: "Flemming (1879)", emoji: "🧬", path: "citologia-1/teoria-celular/antecedentes/flemming", prerequisitos: [], temasRelacionados: ["waldeyer"] },
            { id: "waldeyer", title: "Waldeyer (1888)", emoji: "🔬", path: "citologia-1/teoria-celular/antecedentes/waldeyer", prerequisitos: ["flemming"], temasRelacionados: ["flemming"] },
            { id: "knoll-ruska", title: "Knoll & Ruska (1931)", emoji: "⚡", path: "citologia-1/teoria-celular/antecedentes/knoll-ruska", prerequisitos: [], temasRelacionados: [] },
          ]
        },
        {
          id: "padres-teoria",
          title: "Los 3 Padres de la Teoría Celular",
          emoji: "🤝",
          subtemas: [
            { id: "schleiden", title: "Schleiden (1838)", emoji: "🌱", path: "citologia-1/teoria-celular/padres/schleiden", prerequisitos: [], temasRelacionados: ["schwann"] },
            { id: "schwann", title: "Schwann (1839)", emoji: "🐾", path: "citologia-1/teoria-celular/padres/schwann", prerequisitos: ["schleiden"], temasRelacionados: ["schleiden"] },
            { id: "virchow", title: "Virchow (1855)", emoji: "🔄", path: "citologia-1/teoria-celular/padres/virchow", prerequisitos: ["schleiden", "schwann"], temasRelacionados: [] },
          ]
        },
        {
          id: "postulados-modernos",
          title: "Postulados Modernos",
          emoji: "🧬",
          subtemas: [
            { id: "postulados-4", title: "Los 4 Postulados Modernos", emoji: "📋", path: "citologia-1/teoria-celular/postulados/4-postulados", prerequisitos: ["schleiden", "schwann", "virchow"], temasRelacionados: [] },
          ]
        }
      ]
    },
    
    // TEMA 2: CLASIFICACIÓN CELULAR
    {
      id: "clasificacion",
      title: "Clasificación Celular",
      emoji: "🗂️",
      color: "from-emerald-500 to-teal-600",
      secciones: [
        {
          id: "por-nutricion",
          title: "Por Nutrición",
          emoji: "🍽️",
          subtemas: [
            { id: "autotrofas", title: "Autótrofas", emoji: "☀️", path: "citologia-1/clasificacion/nutricion/autotrofas", prerequisitos: [], temasRelacionados: ["heterotrofas", "fotosinteticas", "quimiosinteticas"] },
            { id: "fotosinteticas", title: "Fotosintéticas (Fotótrofas)", emoji: "🌱", path: "citologia-1/clasificacion/nutricion/fotosinteticas", prerequisitos: ["autotrofas"], temasRelacionados: ["cloroplastos"] },
            { id: "quimiosinteticas", title: "Quimiosintéticas (Quimiótrofas)", emoji: "⚗️", path: "citologia-1/clasificacion/nutricion/quimiosinteticas", prerequisitos: ["autotrofas"], temasRelacionados: [] },
            { id: "heterotrofas", title: "Heterótrofas", emoji: "🍖", path: "citologia-1/clasificacion/nutricion/heterotrofas", prerequisitos: ["autotrofas"], temasRelacionados: ["autotrofas", "holozoicas", "saprofitas", "parasitas"] },
            { id: "holozoicas", title: "Holozoicas", emoji: "🦁", path: "citologia-1/clasificacion/nutricion/holozoicas", prerequisitos: ["heterotrofas"], temasRelacionados: ["fagocitosis"] },
            { id: "saprofitas", title: "Saprófitas / Saprobiontes", emoji: "🍄", path: "citologia-1/clasificacion/nutricion/saprofitas", prerequisitos: ["heterotrofas"], temasRelacionados: ["lisosomas"] },
            { id: "parasitas", title: "Parásitas", emoji: "🦟", path: "citologia-1/clasificacion/nutricion/parasitas", prerequisitos: ["heterotrofas"], temasRelacionados: [] },
            { id: "mixotrofas", title: "Mixótrofas", emoji: "🔄", path: "citologia-1/clasificacion/nutricion/mixotrofas", prerequisitos: ["autotrofas", "heterotrofas"], temasRelacionados: [] },
          ]
        },
        {
          id: "por-evolucion",
          title: "Por Evolución",
          emoji: "🧬",
          subtemas: [
            { id: "procariotas", title: "Procariotas", emoji: "🦠", path: "citologia-1/clasificacion/evolucion/procariotas", prerequisitos: [], temasRelacionados: ["eucariotas"] },
            { id: "eucariotas", title: "Eucariotas", emoji: "🏛️", path: "citologia-1/clasificacion/evolucion/eucariotas", prerequisitos: ["procariotas"], temasRelacionados: ["procariotas"] },
          ]
        }
      ]
    },
    
    // TEMA 3: CÉLULA PROCARIOTA
    {
      id: "procariota",
      title: "Célula Procariota",
      emoji: "🦠",
      color: "from-green-500 to-emerald-600",
      secciones: [
        {
          id: "caracteristicas",
          title: "Características Generales",
          emoji: "📋",
          subtemas: [
            { id: "procariota-general", title: "Características Generales", emoji: "🔬", path: "citologia-1/procariota/caracteristicas/general", prerequisitos: ["procariotas"], temasRelacionados: ["eucariotas"] },
          ]
        },
        {
          id: "estructuras-permanentes",
          title: "Estructuras Permanentes",
          emoji: "🏗️",
          subtemas: [
            { id: "pared-bacteriana", title: "Pared Celular", emoji: "🧱", path: "citologia-1/procariota/permanentes/pared", prerequisitos: [], temasRelacionados: ["membrana-procariota"] },
            { id: "membrana-procariota", title: "Membrana Citoplasmática", emoji: "🫧", path: "citologia-1/procariota/permanentes/membrana", prerequisitos: ["pared-bacteriana"], temasRelacionados: [] },
            { id: "citoplasma-procariota", title: "Citoplasma", emoji: "💧", path: "citologia-1/procariota/permanentes/citoplasma", prerequisitos: [], temasRelacionados: [] },
            { id: "nucleoide", title: "Nucleoide", emoji: "🧬", path: "citologia-1/procariota/permanentes/nucleoide", prerequisitos: [], temasRelacionados: [] },
            { id: "ribosomas-70s", title: "Ribosomas 70S", emoji: "⚙️", path: "citologia-1/procariota/permanentes/ribosomas", prerequisitos: [], temasRelacionados: ["ribosomas-80s"] },
          ]
        },
        {
          id: "tipos-pared-bacteriana",
          title: "Tipos de Pared Bacteriana",
          emoji: "🧱",
          subtemas: [
            { id: "gram-positivas", title: "Gram Positivas", emoji: "🟣", path: "citologia-1/procariota/pared/gram-positivas", prerequisitos: ["pared-bacteriana"], temasRelacionados: ["gram-negativas"] },
            { id: "gram-negativas", title: "Gram Negativas", emoji: "🔴", path: "citologia-1/procariota/pared/gram-negativas", prerequisitos: ["pared-bacteriana"], temasRelacionados: ["gram-positivas"] },
            { id: "mycoplasma", title: "Mycoplasma (Sin Pared)", emoji: "🦠", path: "citologia-1/procariota/pared/mycoplasma", prerequisitos: ["pared-bacteriana"], temasRelacionados: [] },
          ]
        },
        {
          id: "estructuras-accesorias",
          title: "Estructuras Accesorias",
          emoji: "🎒",
          subtemas: [
            { id: "capsula", title: "Cápsula", emoji: "🛡️", path: "citologia-1/procariota/accesorias/capsula", prerequisitos: [], temasRelacionados: [] },
            { id: "flagelos-bacterianos", title: "Flagelos", emoji: "🏃", path: "citologia-1/procariota/accesorias/flagelos", prerequisitos: [], temasRelacionados: ["cilios-flagelos"] },
            { id: "fimbrias", title: "Fimbrias/Pili", emoji: "🔗", path: "citologia-1/procariota/accesorias/fimbrias", prerequisitos: [], temasRelacionados: ["pili-sexual"] },
            { id: "pili-sexual", title: "Pili Sexual", emoji: "💑", path: "citologia-1/procariota/accesorias/pili-sexual", prerequisitos: ["fimbrias"], temasRelacionados: ["plasmidos"] },
            { id: "plasmidos", title: "Plásmidos", emoji: "🧬", path: "citologia-1/procariota/accesorias/plasmidos", prerequisitos: [], temasRelacionados: [] },
            { id: "endosporas", title: "Endosporas", emoji: "💎", path: "citologia-1/procariota/accesorias/endosporas", prerequisitos: [], temasRelacionados: [] },
            { id: "inclusiones", title: "Inclusiones Citoplasmáticas", emoji: "📦", path: "citologia-1/procariota/accesorias/inclusiones", prerequisitos: [], temasRelacionados: [] },
          ]
        }
      ]
    },
    
    // TEMA 4: ENVOLTURAS CELULARES
    {
      id: "envolturas",
      title: "Envolturas Celulares",
      emoji: "🏛️",
      color: "from-purple-500 to-pink-600",
      secciones: [
        {
          id: "pared-celular",
          title: "Pared Celular",
          emoji: "🧱",
          subtemas: [
            { id: "pared-vegetal", title: "Pared Vegetal", emoji: "🌿", path: "citologia-1/envolturas/pared/vegetal", prerequisitos: [], temasRelacionados: ["glucocalix"] },
            { id: "pared-hongos", title: "Pared de Hongos", emoji: "🍄", path: "citologia-1/envolturas/pared/hongos", prerequisitos: [], temasRelacionados: [] },
          ]
        },
        {
          id: "glucocalix",
          title: "Glucocálix",
          emoji: "🎭",
          subtemas: [
            { id: "glucocalix-animal", title: "Glucocálix Animal", emoji: "🐾", path: "citologia-1/envolturas/glucocalix/animal", prerequisitos: [], temasRelacionados: ["pared-vegetal"] },
          ]
        }
      ]
    },
    
    // TEMA 5: MEMBRANA CITOPLASMÁTICA
    {
      id: "membrana",
      title: "Membrana Citoplasmática",
      emoji: "🫧",
      color: "from-cyan-500 to-blue-600",
      secciones: [
        {
          id: "modelo-mosaico",
          title: "Modelo Mosaico Fluido",
          emoji: "🌊",
          subtemas: [
            { id: "mosaico-fluido", title: "Modelo Mosaico Fluido", emoji: "📐", path: "citologia-1/membrana/modelo/mosaico", prerequisitos: [], temasRelacionados: [] },
          ]
        },
        {
          id: "composicion",
          title: "Composición Química",
          emoji: "🧪",
          subtemas: [
            { id: "lipidos-membrana", title: "Lípidos", emoji: "🫒", path: "citologia-1/membrana/composicion/lipidos", prerequisitos: [], temasRelacionados: [] },
            { id: "proteinas-membrana", title: "Proteínas", emoji: "⚙️", path: "citologia-1/membrana/composicion/proteinas", prerequisitos: [], temasRelacionados: [] },
            { id: "glucidos-membrana", title: "Glúcidos", emoji: "🍬", path: "citologia-1/membrana/composicion/glucidos", prerequisitos: [], temasRelacionados: [] },
          ]
        },
        {
          id: "propiedades",
          title: "Propiedades",
          emoji: "✨",
          subtemas: [
            { id: "fluidez", title: "Fluidez", emoji: "💧", path: "citologia-1/membrana/propiedades/fluidez", prerequisitos: [], temasRelacionados: [] },
            { id: "permeabilidad", title: "Permeabilidad Selectiva", emoji: "🚪", path: "citologia-1/membrana/propiedades/permeabilidad", prerequisitos: [], temasRelacionados: ["transporte"] },
            { id: "asimetria", title: "Asimetría", emoji: "⚖️", path: "citologia-1/membrana/propiedades/asimetria", prerequisitos: [], temasRelacionados: [] },
            { id: "autosellado", title: "Autosellado", emoji: "🔒", path: "citologia-1/membrana/propiedades/autosellado", prerequisitos: [], temasRelacionados: [] },
          ]
        }
      ]
    },
    
    // TEMA 6: TRANSPORTE CELULAR
    {
      id: "transporte",
      title: "Transporte Celular",
      emoji: "🚚",
      color: "from-orange-500 to-red-600",
      secciones: [
        {
          id: "transporte-pasivo",
          title: "Transporte Pasivo",
          emoji: "🌊",
          subtemas: [
            { id: "difusion-simple", title: "Difusión Simple", emoji: "💨", path: "citologia-1/transporte/pasivo/difusion-simple", prerequisitos: ["permeabilidad"], temasRelacionados: [] },
            { id: "difusion-facilitada", title: "Difusión Facilitada", emoji: "🚀", path: "citologia-1/transporte/pasivo/difusion-facilitada", prerequisitos: ["difusion-simple"], temasRelacionados: [] },
            { id: "osmosis", title: "Ósmosis", emoji: "💧", path: "citologia-1/transporte/pasivo/osmosis", prerequisitos: ["difusion-simple"], temasRelacionados: [] },
          ]
        },
        {
          id: "transporte-activo",
          title: "Transporte Activo",
          emoji: "⚡",
          subtemas: [
            { id: "bombas", title: "Bombas (Na+/K+ ATPasa)", emoji: "🔋", path: "citologia-1/transporte/activo/bombas", prerequisitos: [], temasRelacionados: [] },
            { id: "endocitosis", title: "Endocitosis", emoji: "📥", path: "citologia-1/transporte/activo/endocitosis", prerequisitos: [], temasRelacionados: ["exocitosis", "fagocitosis", "pinocitosis", "endocitosis-receptor"] },
            { id: "exocitosis", title: "Exocitosis", emoji: "📤", path: "citologia-1/transporte/activo/exocitosis", prerequisitos: ["endocitosis"], temasRelacionados: ["endocitosis"] },
          ]
        },
        {
          id: "tipos-endocitosis",
          title: "Tipos de Endocitosis",
          emoji: "📥",
          subtemas: [
            { id: "fagocitosis", title: "Fagocitosis", emoji: "🦠", path: "citologia-1/transporte/endocitosis/fagocitosis", prerequisitos: ["endocitosis"], temasRelacionados: ["lisosomas"] },
            { id: "pinocitosis", title: "Pinocitosis", emoji: "💧", path: "citologia-1/transporte/endocitosis/pinocitosis", prerequisitos: ["endocitosis"], temasRelacionados: [] },
            { id: "endocitosis-receptor", title: "Endocitosis Mediada por Receptor", emoji: "🎯", path: "citologia-1/transporte/endocitosis/endocitosis-receptor", prerequisitos: ["endocitosis"], temasRelacionados: ["colesterol"] },
          ]
        }
      ]
    }
  ]
};

// ============================================
// PARTE II: CITOLOGÍA II
// ============================================

const parte2: Parte = {
  id: "citologia-2",
  title: "Citología II",
  emoji: "🧬",
  temas: [
    // TEMA 1: CITOPLASMA
    {
      id: "citoplasma",
      title: "Citoplasma",
      emoji: "💧",
      color: "from-blue-400 to-cyan-500",
      secciones: [
        {
          id: "citosol",
          title: "Citosol",
          emoji: "🌊",
          subtemas: [
            { id: "citosol-general", title: "Matriz Citoplasmática", emoji: "💧", path: "citologia-2/citoplasma/citosol/general", prerequisitos: [], temasRelacionados: ["citoesqueleto", "tixotropia", "efecto-tyndall", "movimiento-browniano", "ciclosis"] },
          ]
        },
        {
          id: "propiedades-citosol",
          title: "Propiedades del Citosol",
          emoji: "🌊",
          subtemas: [
            { id: "tixotropia", title: "Tixotropía (Sol ↔ Gel)", emoji: "🔄", path: "citologia-2/citoplasma/citosol/tixotropia", prerequisitos: ["citosol-general"], temasRelacionados: ["citoesqueleto"] },
            { id: "efecto-tyndall", title: "Efecto Tyndall", emoji: "💡", path: "citologia-2/citoplasma/citosol/efecto-tyndall", prerequisitos: ["citosol-general"], temasRelacionados: [] },
            { id: "movimiento-browniano", title: "Movimiento Browniano", emoji: "🎲", path: "citologia-2/citoplasma/citosol/movimiento-browniano", prerequisitos: ["citosol-general"], temasRelacionados: [] },
            { id: "ciclosis", title: "Ciclosis", emoji: "🌪️", path: "citologia-2/citoplasma/citosol/ciclosis", prerequisitos: ["citosol-general"], temasRelacionados: ["pared-vegetal"] },
          ]
        },
        {
          id: "citoesqueleto",
          title: "Citoesqueleto",
          emoji: "🏗️",
          subtemas: [
            { id: "microtubulos", title: "Microtúbulos", emoji: "🚂", path: "citologia-2/citoplasma/citoesqueleto/microtubulos", prerequisitos: [], temasRelacionados: ["microfilamentos", "filamentos-intermedios"] },
            { id: "microfilamentos", title: "Microfilamentos", emoji: "🧵", path: "citologia-2/citoplasma/citoesqueleto/microfilamentos", prerequisitos: [], temasRelacionados: ["microtubulos", "filamentos-intermedios"] },
            { id: "filamentos-intermedios", title: "Filamentos Intermedios", emoji: "🛡️", path: "citologia-2/citoplasma/citoesqueleto/filamentos-intermedios", prerequisitos: [], temasRelacionados: ["microtubulos", "microfilamentos"] },
          ]
        }
      ]
    },
    
    // TEMA 2: SISTEMA DE ENDOMEMBRANAS
    {
      id: "endomembranas",
      title: "Sistema de Endomembranas",
      emoji: "🏭",
      color: "from-indigo-500 to-purple-600",
      secciones: [
        {
          id: "rer",
          title: "Retículo Endoplasmático Rugoso",
          emoji: "⚙️",
          subtemas: [
            { id: "rer-general", title: "RER", emoji: "🔧", path: "citologia-2/endomembranas/rer/general", prerequisitos: [], temasRelacionados: ["rel", "golgi"] },
          ]
        },
        {
          id: "rel",
          title: "Retículo Endoplasmático Liso",
          emoji: "🧪",
          subtemas: [
            { id: "rel-general", title: "REL", emoji: "🧫", path: "citologia-2/endomembranas/rel/general", prerequisitos: ["rer"], temasRelacionados: ["rer", "golgi"] },
          ]
        },
        {
          id: "golgi",
          title: "Aparato de Golgi",
          emoji: "📦",
          subtemas: [
            { id: "golgi-general", title: "Complejo de Golgi", emoji: "🏢", path: "citologia-2/endomembranas/golgi/general", prerequisitos: ["rer", "rel"], temasRelacionados: ["lisosomas"] },
          ]
        }
      ]
    },
    
    // TEMA 3: ORGANELOS AMEMBRANOSOS
    {
      id: "amembranosos",
      title: "Organelos Amembranosos",
      emoji: "⚙️",
      color: "from-gray-500 to-slate-600",
      secciones: [
        {
          id: "ribosomas",
          title: "Ribosomas",
          emoji: "🔩",
          subtemas: [
            { id: "ribosomas-80s", title: "Ribosomas 80S", emoji: "⚙️", path: "citologia-2/amembranosos/ribosomas/general", prerequisitos: [], temasRelacionados: ["ribosomas-70s"] },
          ]
        },
        {
          id: "centrosoma",
          title: "Centrosoma",
          emoji: "🎯",
          subtemas: [
            { id: "centrosoma-general", title: "Centrosoma", emoji: "🎪", path: "citologia-2/amembranosos/centrosoma/general", prerequisitos: [], temasRelacionados: ["cilios-flagelos"] },
          ]
        },
        {
          id: "cilios-flagelos",
          title: "Cilios y Flagelos",
          emoji: "🏃",
          subtemas: [
            { id: "cilios-flagelos-general", title: "Cilios y Flagelos", emoji: "🌊", path: "citologia-2/amembranosos/cilios-flagelos/general", prerequisitos: ["microtubulos"], temasRelacionados: ["centrosoma"] },
          ]
        }
      ]
    },
    
    // TEMA 4: ORGANELOS MONOMEMBRANOSOS
    {
      id: "monomembranosos",
      title: "Organelos Monomembranosos",
      emoji: "🫧",
      color: "from-pink-500 to-rose-600",
      secciones: [
        {
          id: "vacuolas",
          title: "Vacuolas",
          emoji: "💧",
          subtemas: [
            { id: "vacuolas-general", title: "Vacuolas", emoji: "🎈", path: "citologia-2/monomembranosos/vacuolas/general", prerequisitos: [], temasRelacionados: [] },
          ]
        },
        {
          id: "lisosomas",
          title: "Lisosomas",
          emoji: "🗑️",
          subtemas: [
            { id: "lisosomas-general", title: "Lisosomas", emoji: "🧪", path: "citologia-2/monomembranosos/lisosomas/general", prerequisitos: ["golgi"], temasRelacionados: [] },
          ]
        },
        {
          id: "peroxisomas",
          title: "Peroxisomas",
          emoji: "⚗️",
          subtemas: [
            { id: "peroxisomas-general", title: "Peroxisomas", emoji: "🧫", path: "citologia-2/monomembranosos/peroxisomas/general", prerequisitos: [], temasRelacionados: ["glioxisomas"] },
          ]
        },
        {
          id: "glioxisomas",
          title: "Glioxisomas",
          emoji: "🌱",
          subtemas: [
            { id: "glioxisomas-general", title: "Glioxisomas", emoji: "🌿", path: "citologia-2/monomembranosos/glioxisomas/general", prerequisitos: ["peroxisomas"], temasRelacionados: ["peroxisomas"] },
          ]
        }
      ]
    },
    
    // TEMA 5: ORGANELOS BIMEMBRANOSOS
    {
      id: "bimembranosos",
      title: "Organelos Bimembranosos",
      emoji: "⚡",
      color: "from-yellow-500 to-amber-600",
      secciones: [
        {
          id: "plastidios",
          title: "Plastidios",
          emoji: "🌿",
          subtemas: [
            { id: "leucoplastos", title: "Leucoplastos", emoji: "🥔", path: "citologia-2/bimembranosos/plastidios/leucoplastos", prerequisitos: [], temasRelacionados: ["cromoplastos", "cloroplastos"] },
            { id: "cromoplastos", title: "Cromoplastos", emoji: "🌺", path: "citologia-2/bimembranosos/plastidios/cromoplastos", prerequisitos: [], temasRelacionados: ["leucoplastos", "cloroplastos"] },
            { id: "cloroplastos", title: "Cloroplastos", emoji: "☀️", path: "citologia-2/bimembranosos/plastidios/cloroplastos", prerequisitos: [], temasRelacionados: ["leucoplastos", "cromoplastos"] },
          ]
        },
        {
          id: "mitocondrias",
          title: "Mitocondrias",
          emoji: "🔋",
          subtemas: [
            { id: "mitocondrias-general", title: "Mitocondrias", emoji: "⚡", path: "citologia-2/bimembranosos/mitocondrias/general", prerequisitos: [], temasRelacionados: ["teoria-endosimbiotica"] },
          ]
        },
        {
          id: "teoria-endosimbiotica",
          title: "Teoría Endosimbiótica",
          emoji: "🤝",
          subtemas: [
            { id: "endosimbiosis", title: "Teoría de Margulis", emoji: "🧬", path: "citologia-2/bimembranosos/endosimbiotica/general", prerequisitos: ["mitocondrias", "cloroplastos"], temasRelacionados: [] },
          ]
        }
      ]
    },
    
    // TEMA 6: NÚCLEO INTERFÁSICO
    {
      id: "nucleo",
      title: "Núcleo Interfásico",
      emoji: "🎯",
      color: "from-violet-500 to-purple-600",
      secciones: [
        {
          id: "carioteca",
          title: "Carioteca",
          emoji: "🛡️",
          subtemas: [
            { id: "carioteca-general", title: "Envoltura Nuclear", emoji: "🏛️", path: "citologia-2/nucleo/carioteca/general", prerequisitos: [], temasRelacionados: ["carioplasma", "cromatina"] },
          ]
        },
        {
          id: "carioplasma",
          title: "Carioplasma",
          emoji: "💧",
          subtemas: [
            { id: "carioplasma-general", title: "Nucleoplasma", emoji: "🌊", path: "citologia-2/nucleo/carioplasma/general", prerequisitos: ["carioteca"], temasRelacionados: [] },
          ]
        },
        {
          id: "cromatina",
          title: "Cromatina",
          emoji: "🧬",
          subtemas: [
            { id: "cromatina-general", title: "Cromatina y Cromosomas", emoji: "📦", path: "citologia-2/nucleo/cromatina/general", prerequisitos: ["carioteca"], temasRelacionados: ["nucleolo", "niveles-compactacion", "eucromatina-heterocromatina", "corpúsculo-barr"] },
          ]
        },
        {
          id: "organizacion-cromatina",
          title: "Organización de la Cromatina",
          emoji: "🧬",
          subtemas: [
            { id: "niveles-compactacion", title: "Niveles de Compactación", emoji: "📊", path: "citologia-2/nucleo/cromatina/niveles-compactacion", prerequisitos: ["cromatina-general"], temasRelacionados: ["histonas"] },
            { id: "eucromatina-heterocromatina", title: "Eucromatina vs Heterocromatina", emoji: "⚖️", path: "citologia-2/nucleo/cromatina/eucromatina-heterocromatina", prerequisitos: ["cromatina-general"], temasRelacionados: [] },
            { id: "corpúsculo-barr", title: "Corpúsculo de Barr (Cromatina Sexual)", emoji: "♀️", path: "citologia-2/nucleo/cromatina/corpúsculo-barr", prerequisitos: ["eucromatina-heterocromatina"], temasRelacionados: [] },
          ]
        },
        {
          id: "nucleolo",
          title: "Nucléolo",
          emoji: "⚫",
          subtemas: [
            { id: "nucleolo-general", title: "Nucléolo", emoji: "🔴", path: "citologia-2/nucleo/nucleolo/general", prerequisitos: ["cromatina"], temasRelacionados: [] },
          ]
        }
      ]
    }
  ]
};

// ============================================
// EXPORTAR ESTRUCTURA COMPLETA
// ============================================

export const estructuraCompleta: Parte[] = [parte1, parte2];

export function getAllSubtemas(): SubtemaMetadata[] {
  const subtemas: SubtemaMetadata[] = [];
  estructuraCompleta.forEach(parte => {
    parte.temas.forEach(tema => {
      tema.secciones.forEach(seccion => {
        subtemas.push(...seccion.subtemas);
      });
    });
  });
  return subtemas;
}

export function getSubtemaById(id: string): SubtemaMetadata | null {
  const allSubtemas = getAllSubtemas();
  return allSubtemas.find(s => s.id === id) || null;
}

export function countSubtemas(): number {
  return getAllSubtemas().length;
}

// ============================================
// CATEGORIZACIÓN AUTOMÁTICA DE SUBTEMAS
// ============================================

export function getCategoryForSubtema(subtema: SubtemaMetadata): TopicCategory {
  if (subtema.category) return subtema.category;
  
  const path = subtema.path.toLowerCase();
  const id = subtema.id.toLowerCase();
  
  // === HISTÓRICOS ===
  const historicalIds = [
    'hooke', 'leeuwenhoek', 'brown', 'dujardin', 'purkinje', 
    'flemming', 'waldeyer', 'knoll-ruska', 'schleiden', 'schwann', 
    'virchow', 'postulados-4', 'endosimbiosis'
  ];
  if (historicalIds.includes(id) || path.includes('antecedentes') || path.includes('padres')) {
    return 'historical';
  }
  
  // === CLASIFICACIÓN ===
  const classificationIds = [
    'autotrofas', 'fotosinteticas', 'quimiosinteticas', 'heterotrofas',
    'holozoicas', 'saprofitas', 'parasitas', 'mixotrofas',
    'procariotas', 'eucariotas', 'gram-positivas', 'gram-negativas',
    'mycoplasma', 'leucoplastos', 'cromoplastos',
    'eucromatina-heterocromatina'
  ];
  if (classificationIds.includes(id) || path.includes('clasificacion') || path.includes('evolucion') || path.includes('nutricion')) {
    return 'classification';
  }
  
  // === PROCESOS ===
  const processIds = [
    'difusion-simple', 'difusion-facilitada', 'osmosis',
    'endocitosis', 'exocitosis', 'fagocitosis', 'pinocitosis',
    'endocitosis-receptor', 'bombas', 'ciclosis', 'tixotropia'
  ];
  if (processIds.includes(id) || path.includes('transporte')) {
    return 'process';
  }
  
  // === PROPIEDADES ===
  const propertyIds = [
    'fluidez', 'permeabilidad', 'asimetria', 'autosellado',
    'efecto-tyndall', 'movimiento-browniano'
  ];
  if (propertyIds.includes(id)) {
    return 'property';
  }
  
  // === ESTRUCTURAS ===
  const structureIds = [
    'mosaico-fluido', 'lipidos-membrana', 'proteinas-membrana', 'glucidos-membrana',
    'pared-vegetal', 'pared-hongos', 'glucocalix-animal',
    'pared-bacteriana', 'membrana-procariota',
    'microtubulos', 'microfilamentos', 'filamentos-intermedios',
    'carioteca-general', 'cromatina-general', 'niveles-compactacion',
    'corpúsculo-barr'
  ];
  if (structureIds.includes(id) || path.includes('envolturas') || path.includes('pared') || path.includes('modelo')) {
    return 'structure';
  }
  
  // === ORGANELOS (default para la mayoría) ===
  const organelleIds = [
    'rer-general', 'rel-general', 'golgi-general',
    'ribosomas-80s', 'ribosomas-70s', 'centrosoma-general',
    'cilios-flagelos-general', 'vacuolas-general', 'lisosomas-general',
    'peroxisomas-general', 'glioxisomas-general',
    'cloroplastos', 'mitocondrias-general',
    'nucleolo-general', 'carioplasma-general',
    'procariota-general', 'citoplasma-procariota', 'nucleoide',
    'capsula', 'flagelos-bacterianos', 'fimbrias', 'pili-sexual',
    'plasmidos', 'endosporas', 'inclusiones',
    'citosol-general'
  ];
  if (organelleIds.includes(id) || path.includes('endomembranas') || path.includes('bimembranosos') || path.includes('monomembranosos') || path.includes('amembranosos')) {
    return 'organelle';
  }
  
  // Default
  if (path.startsWith('citologia-2')) return 'organelle';
  return 'structure';
}
