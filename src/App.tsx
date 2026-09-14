import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { estructuraCompleta, Parte, Tema, Seccion, SubtemaMetadata, countSubtemas, getCategoryForSubtema } from './data/esqueletoCompleto';
import type { TopicCategory, LearningPhase } from './prompts/promptEngine';
import { BookOpen, ChevronRight, Lightbulb, Microscope, ArrowLeft, Search, GraduationCap, Sprout, Brain } from 'lucide-react';

type ViewMode = 'intuitive' | 'precision';
type NavigationState = 
  | { view: 'home' }
  | { view: 'parte'; parte: Parte }
  | { view: 'tema'; parte: Parte; tema: Tema }
  | { view: 'seccion'; parte: Parte; tema: Tema; seccion: Seccion }
  | { view: 'subtema'; parte: Parte; tema: Tema; seccion: Seccion; subtema: SubtemaMetadata };

// Contenido demo para cada fase (simula lo que generaría la IA)
function getDemoContent(subtema: SubtemaMetadata, phase: LearningPhase, mode: ViewMode): string {
  const category = getCategoryForSubtema(subtema);
  const title = subtema.title;
  
  const demoContents: Record<string, Record<LearningPhase, Record<ViewMode, string>>> = {
    default: {
      discover: {
        intuitive: `Imagina que ${title} es como una pieza clave en una máquina compleja. Sin esta pieza, todo el sistema se detendría. En las próximas fases descubrirás exactamente qué hace, cómo funciona y por qué es tan importante para la vida celular.`,
        precision: `${title}: Componente/Proceso fundamental en biología celular. Categoría: ${category}. Función principal: mantiene la homeostasis celular y permite la supervivencia del organismo. Esencial para comprender la organización de la célula eucariota.`
      },
      explore: {
        intuitive: `Piensa en ${title} como si fuera una fábrica especializada dentro de una gran ciudad industrial (la célula). Cada fábrica tiene su propio diseño, sus trabajadores y su misión específica. Esta en particular se encarga de una tarea que ninguna otra puede hacer. Su estructura está optimizada para maximizar su eficiencia, con compartimentos separados para cada proceso.`,
        precision: `Estructura de ${title}:\n• Organización interna especializada\n• Componentes moleculares específicos\n• Localización definida en la célula\n• Interconexión con otros sistemas celulares\n\nSe relaciona físicamente con otros organelos del sistema de endomembranas, formando una red integrada de producción y distribución.`
      },
      understand: {
        intuitive: `¿Para qué sirve realmente ${title}? Imagina tu cuerpo como una ciudad que nunca duerme. Cada célula es un barrio, y dentro de cada barrio hay trabajadores especializados. ${title} es el departamento que se encarga de que todo funcione sin problemas.\n\n1. Cuando comes: procesa los nutrientes que llegan\n2. Cuando te mueves: provee la energía necesaria\n3. Cuando creces: fabrica los componentes nuevos\n4. Cuando te defiendes: participa en la respuesta inmune\n5. Cuando descansas: repara y recicla materiales\n\n💡 ¿Te has fijado que cuando haces ejercicio intenso, tus músculos "arden"? Eso es en parte porque estos procesos trabajan a máxima capacidad produciendo energía.`,
        precision: `Funciones principales:\n• Síntesis de componentes celulares esenciales\n• Procesamiento y modificación de moléculas\n• Almacenamiento temporal de productos\n• Transporte dirigido a destinos específicos\n\n¿DÓNDE PARTICIPA? (5 ejemplos):\n1. Células hepáticas: detoxificación y metabolismo\n2. Neuronas: producción de neurotransmisores\n3. Células musculares: contracción y movimiento\n4. Células glandulares: secreción de hormonas\n5. Células inmunes: respuesta defense\n\n💡 Dato: Sin este proceso, las células no podrían mantener su organización interna y morirían en minutos.`
      },
      master: {
        intuitive: `Ahora que entiendes ${title} a profundidad, aquí van los secretos que te harán destacar:\n\n🔑 La clave: Todo se conecta. Este proceso no trabaja solo — está en comunicación constante con el núcleo, la membrana y otros organelos. Si uno falla, todos sufren.\n\n🧠 Para recordar: Piensa en una cadena de montaje. Cada eslabón depende del anterior. Si removes uno, la producción se detiene.\n\n⚡ Dato memorable: Las células de tu intestino se renuevan cada 3-5 días. Eso significa que ${title} está trabajando sin parar para fabricar células nuevas constantemente.`,
        precision: `⚠️ TRAMPAS DE EXAMEN:\n\nTrampa 1: "${title} solo existe en células animales"\n→ FALSO. También existe en células vegetales, aunque con diferencias estructurales.\n\nTrampa 2: "Se encuentra solo en el citoplasma"\n→ FALSO. Está asociado a otros organelos y puede encontrarse en diferentes localizaciones según el tipo celular.\n\nTrampa 3: "Su función es idéntica en todos los tejidos"\n→ FALSO. Se especializa según el tejido (ej: hepatocitos vs neuronas vs miocitos).\n\n📝 RESUMEN MENTAL (4 líneas):\n• ${category === 'organelle' ? 'Organelo del sistema de endomembranas' : 'Proceso/Estructura fundamental'}\n• Función principal: mantenimiento de la homeostasis\n• Se especializa según el tipo de tejido\n• Interconectado con toda la maquinaria celular\n\n💡 RETO MENTAL:\nSi una mutación afecta la estructura de ${title}, ¿qué consecuencias tendría para la célula completa?\n\nRespuesta: Al fallar este componente, se afectaría la cadena de producción completa: acumulación de materiales sin procesar, déficit de productos necesarios, y eventualmente muerte celular por fallo sistémico.`
      }
    }
  };
  
  return demoContents.default[phase][mode];
}

// Fase info
const PHASES: { id: LearningPhase; name: string; emoji: string; duration: string }[] = [
  { id: 'discover', name: 'Descubrir', emoji: '🌱', duration: '30 seg' },
  { id: 'explore', name: 'Explorar', emoji: '🔍', duration: '1-2 min' },
  { id: 'understand', name: 'Comprender', emoji: '💡', duration: '2-3 min' },
  { id: 'master', name: 'Dominar', emoji: '🧠', duration: '3-5 min' }
];

const CATEGORY_LABELS: Record<TopicCategory, string> = {
  organelle: '📦 Organelo',
  process: '⚙️ Proceso',
  structure: '🏗️ Estructura',
  classification: '🗂️ Clasificación',
  historical: '📜 Histórico',
  property: '✨ Propiedad'
};

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('intuitive');
  const [nav, setNav] = useState<NavigationState>({ view: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPhase, setCurrentPhase] = useState<LearningPhase>('discover');

  const totalSubtemas = countSubtemas();

  const goBack = () => {
    if (nav.view === 'subtema') {
      setNav({ view: 'seccion', parte: nav.parte, tema: nav.tema, seccion: nav.seccion });
      setCurrentPhase('discover');
    } else if (nav.view === 'seccion') {
      setNav({ view: 'tema', parte: nav.parte, tema: nav.tema });
    } else if (nav.view === 'tema') {
      setNav({ view: 'parte', parte: nav.parte });
    } else {
      setNav({ view: 'home' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      viewMode === 'intuitive' ? 'bg-[#FAFAFA]' : 'bg-[#0F172A]'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        viewMode === 'intuitive' 
          ? 'bg-white/80 border-gray-200' 
          : 'bg-[#0F172A]/80 border-[#1E293B]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {nav.view !== 'home' && (
                <motion.button 
                  onClick={goBack}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                    viewMode === 'intuitive' 
                      ? 'hover:bg-gray-100 text-gray-600' 
                      : 'hover:bg-[#1E293B] text-gray-400'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              )}
              <BookOpen className={`w-6 h-6 flex-shrink-0 ${
                viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
              }`} />
              <div className="min-w-0">
                <h1 className={`text-lg sm:text-xl font-semibold truncate ${
                  viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                }`}>
                  Charlemos 2.0
                </h1>
                <p className={`text-xs ${
                  viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {totalSubtemas} subtemas • v4.0
                </p>
              </div>
            </div>

            {/* Toggle de modos */}
            <div className={`flex items-center gap-1 p-1 rounded-lg flex-shrink-0 ${
              viewMode === 'intuitive' ? 'bg-gray-100' : 'bg-[#1E293B]'
            }`}>
              <button
                onClick={() => setViewMode('intuitive')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  viewMode === 'intuitive'
                    ? 'bg-white text-[#10B981] shadow-sm'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Intuitivo</span>
              </button>
              <button
                onClick={() => setViewMode('precision')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  viewMode === 'precision'
                    ? 'bg-[#0F172A] text-[#3B82F6] shadow-sm'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Microscope className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Precisión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {nav.view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <HomeView viewMode={viewMode} onNavigate={setNav} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </motion.div>
          )}
          {nav.view === 'parte' && (
            <motion.div key="parte" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <ParteView viewMode={viewMode} parte={nav.parte} onNavigate={setNav} />
            </motion.div>
          )}
          {nav.view === 'tema' && (
            <motion.div key="tema" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <TemaView viewMode={viewMode} parte={nav.parte} tema={nav.tema} onNavigate={setNav} />
            </motion.div>
          )}
          {nav.view === 'seccion' && (
            <motion.div key="seccion" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <SeccionView viewMode={viewMode} parte={nav.parte} tema={nav.tema} seccion={nav.seccion} onNavigate={setNav} />
            </motion.div>
          )}
          {nav.view === 'subtema' && (
            <motion.div key="subtema" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <SubtemaView viewMode={viewMode} subtema={nav.subtema} currentPhase={currentPhase} setCurrentPhase={setCurrentPhase} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 transition-colors duration-300 ${
        viewMode === 'intuitive' ? 'border-gray-200 bg-white/50' : 'border-[#1E293B] bg-[#0F172A]/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className={`text-sm ${viewMode === 'intuitive' ? 'text-gray-400' : 'text-gray-500'}`}>
            CHARLEMOS v4.0 — Biología Celular Interactiva
          </p>
          <p className={`text-xs mt-1 ${viewMode === 'intuitive' ? 'text-gray-300' : 'text-gray-600'}`}>
            4 Fases × 2 Modos = Comprensión completa
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// HOME VIEW
// ============================================
function HomeView({ viewMode, onNavigate, searchQuery, setSearchQuery }: { 
  viewMode: ViewMode; 
  onNavigate: (state: NavigationState) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  const filteredResults = searchQuery.trim() ? getSearchResults(searchQuery) : [];

  return (
    <div>
      <div className="mb-10 sm:mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className={`w-8 h-8 sm:w-10 sm:h-10 ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`} />
            <h2 className={`text-3xl sm:text-4xl font-bold ${viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'}`}>
              Biología Celular
            </h2>
          </div>
          <p className={`text-base sm:text-lg mb-2 ${viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'}`}>
            Aprende con explicaciones claras y visuales.
          </p>
          <p className={`text-sm ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-500'}`}>
            🌱 Descubrir → 🔍 Explorar → 💡 Comprender → 🧠 Dominar
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative mt-6">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${viewMode === 'intuitive' ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Buscar subtemas... (ej: mitocondrias, ribosomas, membrana)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border text-sm transition-all outline-none ${
              viewMode === 'intuitive'
                ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20'
                : 'bg-[#1E293B] border-[#334155] text-gray-100 placeholder-gray-500 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20'
            }`}
          />
        </motion.div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
          <h3 className={`text-sm font-medium mb-4 ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'}`}>
            {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''}
          </h3>
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredResults.slice(0, 12).map((result) => (
                <motion.button
                  key={result.subtema.id}
                  onClick={() => onNavigate({ view: 'subtema', parte: result.parte, tema: result.tema, seccion: result.seccion, subtema: result.subtema })}
                  whileHover={{ y: -2 }}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    viewMode === 'intuitive'
                      ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm'
                      : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{result.subtema.emoji}</span>
                    <div className="min-w-0">
                      <h4 className={`font-semibold text-sm truncate ${viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'}`}>
                        {result.subtema.title}
                      </h4>
                      <p className={`text-xs truncate ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {CATEGORY_LABELS[getCategoryForSubtema(result.subtema)]} • {result.tema.title}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'}`}>
              No se encontraron resultados para "{searchQuery}"
            </p>
          )}
        </motion.div>
      )}

      {/* Parts Grid */}
      {!searchQuery.trim() && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {estructuraCompleta.map((parte, index) => (
            <motion.button
              key={parte.id}
              onClick={() => onNavigate({ view: 'parte', parte })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`text-left p-6 sm:p-8 rounded-xl border transition-all ${
                viewMode === 'intuitive'
                  ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm'
                  : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]'
              }`}
            >
              <div className="text-4xl sm:text-5xl mb-4">{parte.emoji}</div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'}`}>
                {parte.title}
              </h3>
              <p className={`text-sm mb-4 ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'}`}>
                {parte.temas.length} temas • {parte.temas.reduce((acc, t) => acc + t.secciones.reduce((a, s) => a + s.subtemas.length, 0), 0)} subtemas
              </p>
              <div className={`flex items-center gap-1 text-sm font-medium ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>
                <span>Explorar</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Stats */}
      {!searchQuery.trim() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-10 p-6 rounded-xl border ${
            viewMode === 'intuitive' 
              ? 'bg-gradient-to-br from-[#10B981]/5 to-[#10B981]/10 border-[#10B981]/20' 
              : 'bg-gradient-to-br from-[#3B82F6]/5 to-[#3B82F6]/10 border-[#3B82F6]/20'
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className={`text-2xl font-bold ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>4</p>
              <p className={`text-xs ${viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'}`}>Fases</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>2</p>
              <p className={`text-xs ${viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'}`}>Modos</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>{countSubtemas()}</p>
              <p className={`text-xs ${viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'}`}>Subtemas</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>6</p>
              <p className={`text-xs ${viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'}`}>Categorías</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ============================================
// PARTE VIEW
// ============================================
function ParteView({ viewMode, parte, onNavigate }: { viewMode: ViewMode; parte: Parte; onNavigate: (state: NavigationState) => void }) {
  return (
    <div>
      <div className="mb-10 sm:mb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-4xl sm:text-5xl mb-4">{parte.emoji}</div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'}`}>{parte.title}</h2>
          <p className={`text-base sm:text-lg ${viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'}`}>{parte.temas.length} temas disponibles</p>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {parte.temas.map((tema, index) => (
          <motion.button
            key={tema.id}
            onClick={() => onNavigate({ view: 'tema', parte, tema })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className={`text-left p-5 sm:p-6 rounded-xl border transition-all ${
              viewMode === 'intuitive'
                ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm'
                : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]'
            }`}
          >
            <div className="text-3xl sm:text-4xl mb-3">{tema.emoji}</div>
            <h3 className={`text-base sm:text-lg font-semibold mb-2 ${viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'}`}>{tema.title}</h3>
            <p className={`text-xs sm:text-sm ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'}`}>
              {tema.secciones.length} secciones • {tema.secciones.reduce((acc, s) => acc + s.subtemas.length, 0)} subtemas
            </p>
            <div className={`flex items-center gap-1 mt-4 text-sm font-medium ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>
              <span>Ver temas</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// TEMA VIEW
// ============================================
function TemaView({ viewMode, parte, tema, onNavigate }: { viewMode: ViewMode; parte: Parte; tema: Tema; onNavigate: (state: NavigationState) => void }) {
  return (
    <div>
      <div className="mb-10 sm:mb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-4xl sm:text-5xl mb-4">{tema.emoji}</div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'}`}>{tema.title}</h2>
          <p className={`text-sm ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'}`}>{parte.title}</p>
        </motion.div>
      </div>
      <div className="space-y-4">
        {tema.secciones.map((seccion, index) => (
          <motion.button
            key={seccion.id}
            onClick={() => onNavigate({ view: 'seccion', parte, tema, seccion })}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 4 }}
            className={`w-full text-left p-5 sm:p-6 rounded-xl border transition-all ${
              viewMode === 'intuitive'
                ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm'
                : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl sm:text-3xl">{seccion.emoji}</div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-semibold ${viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'}`}>{seccion.title}</h3>
                  <p className={`text-sm ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'}`}>{seccion.subtemas.length} subtemas</p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 flex-shrink-0 ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`} />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SECCION VIEW
// ============================================
function SeccionView({ viewMode, parte, tema, seccion, onNavigate }: { viewMode: ViewMode; parte: Parte; tema: Tema; seccion: Seccion; onNavigate: (state: NavigationState) => void }) {
  return (
    <div>
      <div className="mb-10 sm:mb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-4xl sm:text-5xl mb-4">{seccion.emoji}</div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'}`}>{seccion.title}</h2>
          <p className={`text-sm ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'}`}>{parte.title} → {tema.title}</p>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {seccion.subtemas.map((subtema, index) => (
          <motion.button
            key={subtema.id}
            onClick={() => onNavigate({ view: 'subtema', parte, tema, seccion, subtema })}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -2 }}
            className={`text-left p-4 sm:p-5 rounded-xl border transition-all ${
              viewMode === 'intuitive'
                ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm'
                : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="text-xl sm:text-2xl flex-shrink-0">{subtema.emoji}</div>
                <div className="min-w-0">
                  <h3 className={`font-semibold text-sm sm:text-base truncate ${viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'}`}>{subtema.title}</h3>
                  <p className={`text-xs ${viewMode === 'intuitive' ? 'text-gray-400' : 'text-gray-500'}`}>{CATEGORY_LABELS[getCategoryForSubtema(subtema)]}</p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 flex-shrink-0 ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`} />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SUBTEMA VIEW — CON NAVEGACIÓN POR FASES
// ============================================
function SubtemaView({ viewMode, subtema, currentPhase, setCurrentPhase }: { 
  viewMode: ViewMode; 
  subtema: SubtemaMetadata;
  currentPhase: LearningPhase;
  setCurrentPhase: (phase: LearningPhase) => void;
}) {
  const category = getCategoryForSubtema(subtema);
  const content = getDemoContent(subtema, currentPhase, viewMode);
  const currentPhaseIndex = PHASES.findIndex(p => p.id === currentPhase);

  return (
    <div>
      {/* Header del subtema */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="text-5xl sm:text-6xl mb-4">{subtema.emoji}</div>
        <h2 className={`text-2xl sm:text-4xl font-bold mb-2 ${viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'}`}>
          {subtema.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            viewMode === 'intuitive' 
              ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20' 
              : 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20'
          }`}>
            {CATEGORY_LABELS[category]}
          </span>
          <span className={`text-xs ${viewMode === 'intuitive' ? 'text-gray-400' : 'text-gray-500'}`}>
            {subtema.path}
          </span>
        </div>
      </motion.div>

      {/* Navegación por Fases */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`mb-8 p-4 rounded-xl border ${
          viewMode === 'intuitive' ? 'bg-white border-gray-200' : 'bg-[#1E293B] border-[#334155]'
        }`}
      >
        <p className={`text-xs font-medium mb-3 ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'}`}>
          PROGRESIÓN DE APRENDIZAJE
        </p>
        <div className="flex items-center gap-1 sm:gap-2">
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setCurrentPhase(phase.id)}
              className={`flex-1 flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg transition-all text-center ${
                currentPhase === phase.id
                  ? viewMode === 'intuitive'
                    ? 'bg-[#10B981]/10 border border-[#10B981]/30'
                    : 'bg-[#3B82F6]/10 border border-[#3B82F6]/30'
                  : viewMode === 'intuitive'
                    ? 'hover:bg-gray-50 border border-transparent'
                    : 'hover:bg-[#0F172A] border border-transparent'
              }`}
            >
              <span className="text-lg sm:text-xl">{phase.emoji}</span>
              <span className={`text-xs font-medium ${
                currentPhase === phase.id
                  ? viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
                  : viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {phase.name}
              </span>
              <span className={`text-[10px] hidden sm:block ${viewMode === 'intuitive' ? 'text-gray-400' : 'text-gray-500'}`}>
                {phase.duration}
              </span>
            </button>
          ))}
        </div>
        {/* Barra de progreso */}
        <div className={`mt-3 h-1 rounded-full ${viewMode === 'intuitive' ? 'bg-gray-100' : 'bg-[#334155]'}`}>
          <motion.div
            className={`h-full rounded-full ${viewMode === 'intuitive' ? 'bg-[#10B981]' : 'bg-[#3B82F6]'}`}
            initial={{ width: 0 }}
            animate={{ width: `${((currentPhaseIndex + 1) / PHASES.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Contenido de la fase actual */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPhase}-${viewMode}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`rounded-xl border overflow-hidden ${
            viewMode === 'intuitive' ? 'bg-white border-gray-200' : 'bg-[#1E293B] border-[#334155]'
          }`}
        >
          {/* Header del contenido */}
          <div className={`px-6 py-4 border-b ${
            viewMode === 'intuitive' ? 'border-gray-100 bg-gray-50/50' : 'border-[#334155] bg-[#0F172A]/50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{PHASES[currentPhaseIndex].emoji}</span>
                <h3 className={`font-semibold ${viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'}`}>
                  Fase: {PHASES[currentPhaseIndex].name}
                </h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                viewMode === 'intuitive' 
                  ? 'bg-[#10B981]/10 text-[#10B981]' 
                  : 'bg-[#3B82F6]/10 text-[#3B82F6]'
              }`}>
                {viewMode === 'intuitive' ? '💡 Intuitivo' : '🔬 Precisión'}
              </span>
            </div>
          </div>

          {/* Cuerpo del contenido */}
          <div className="p-6 sm:p-8">
            <div className={`whitespace-pre-line leading-relaxed text-sm sm:text-base ${
              viewMode === 'intuitive' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              {content}
            </div>
          </div>

          {/* Footer con navegación */}
          <div className={`px-6 py-4 border-t ${
            viewMode === 'intuitive' ? 'border-gray-100 bg-gray-50/50' : 'border-[#334155] bg-[#0F172A]/50'
          }`}>
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  const prevIndex = currentPhaseIndex - 1;
                  if (prevIndex >= 0) setCurrentPhase(PHASES[prevIndex].id);
                }}
                disabled={currentPhaseIndex === 0}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPhaseIndex === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : viewMode === 'intuitive'
                      ? 'hover:bg-gray-100 text-gray-600'
                      : 'hover:bg-[#334155] text-gray-400'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              <div className="flex gap-1">
                {PHASES.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentPhaseIndex
                        ? viewMode === 'intuitive' ? 'bg-[#10B981]' : 'bg-[#3B82F6]'
                        : i < currentPhaseIndex
                          ? viewMode === 'intuitive' ? 'bg-[#10B981]/40' : 'bg-[#3B82F6]/40'
                          : viewMode === 'intuitive' ? 'bg-gray-200' : 'bg-[#334155]'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  const nextIndex = currentPhaseIndex + 1;
                  if (nextIndex < PHASES.length) setCurrentPhase(PHASES[nextIndex].id);
                }}
                disabled={currentPhaseIndex === PHASES.length - 1}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPhaseIndex === PHASES.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : viewMode === 'intuitive'
                      ? 'hover:bg-gray-100 text-[#10B981]'
                      : 'hover:bg-[#334155] text-[#3B82F6]'
                }`}
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Info de temas relacionados */}
      {subtema.temasRelacionados.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`mt-6 p-5 rounded-xl border ${
            viewMode === 'intuitive' ? 'bg-white border-gray-200' : 'bg-[#1E293B] border-[#334155]'
          }`}
        >
          <h4 className={`text-sm font-medium mb-3 ${viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'}`}>
            🔗 Temas Relacionados
          </h4>
          <div className="flex flex-wrap gap-2">
            {subtema.temasRelacionados.map((tema, i) => (
              <span key={i} className={`px-3 py-1.5 rounded-full text-xs ${
                viewMode === 'intuitive' 
                  ? 'bg-gray-100 text-gray-600' 
                  : 'bg-[#334155] text-gray-300'
              }`}>
                {tema}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Estado del contenido */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`mt-6 p-5 rounded-xl border ${
          viewMode === 'intuitive' 
            ? 'bg-gradient-to-br from-[#10B981]/5 to-[#10B981]/10 border-[#10B981]/20' 
            : 'bg-gradient-to-br from-[#3B82F6]/5 to-[#3B82F6]/10 border-[#3B82F6]/20'
        }`}
      >
        <h4 className={`text-sm font-semibold mb-2 ${viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'}`}>
          ⚙️ Contenido Demo — v4.0
        </h4>
        <p className={`text-xs leading-relaxed ${viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'}`}>
          Este es contenido de demostración del sistema v4.0. Cuando se conecte la API de IA, 
          se generará contenido real siguiendo las 4 fases × 2 modos, con la plantilla específica 
          para la categoría <strong>{CATEGORY_LABELS[category]}</strong>. 
          Navega entre fases para ver la progresión pedagógica completa.
        </p>
      </motion.div>
    </div>
  );
}

// ============================================
// SEARCH HELPER
// ============================================
interface SearchResult {
  parte: Parte;
  tema: Tema;
  seccion: Seccion;
  subtema: SubtemaMetadata;
}

function getSearchResults(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const q = query.toLowerCase().trim();
  
  estructuraCompleta.forEach(parte => {
    parte.temas.forEach(tema => {
      tema.secciones.forEach(seccion => {
        seccion.subtemas.forEach(subtema => {
          const searchable = `${subtema.title} ${subtema.id} ${subtema.path} ${tema.title} ${seccion.title}`.toLowerCase();
          if (searchable.includes(q)) {
            results.push({ parte, tema, seccion, subtema });
          }
        });
      });
    });
  });
  
  return results;
}
