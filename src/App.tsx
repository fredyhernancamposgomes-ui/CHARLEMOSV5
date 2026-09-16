import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { estructuraCompleta, Parte, Tema, Seccion, SubtemaMetadata, countSubtemas, getCategoryForSubtema } from './data/esqueletoCompleto';
import type { TopicCategory, LearningPhase } from './prompts/promptEngine';
import { ChevronRight, Lightbulb, Microscope, ArrowLeft, Search, GraduationCap, MessageCircle, Trophy } from 'lucide-react';
import Quiz from './components/Quiz';
import Chat from './components/Chat';
import MarkdownRenderer from './components/MarkdownRenderer';
import Breadcrumbs from './components/Breadcrumbs';
import BottomNav from './components/BottomNav';
import { CellDiagram, RERDiagram, RELDiagram, MitochondriaDiagram, GolgiDiagram } from './components/diagrams';
import { getMockContent } from './data/mockData';
import { getThemeClasses } from './hooks/useTheme';
import { useSwipe, useDebounce, useScrollToTop, useHapticFeedback, useMediaQuery } from './hooks/useMobile';

type ViewMode = 'intuitive' | 'precision';
type NavigationState = 
  | { view: 'home' }
  | { view: 'parte'; parte: Parte }
  | { view: 'tema'; parte: Parte; tema: Tema }
  | { view: 'seccion'; parte: Parte; tema: Tema; seccion: Seccion }
  | { view: 'subtema'; parte: Parte; tema: Tema; seccion: Seccion; subtema: SubtemaMetadata };

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
  const [showQuiz, setShowQuiz] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  const debouncedSearch = useDebounce(searchQuery, 300);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const haptic = useHapticFeedback();
  const theme = getThemeClasses(viewMode);
  const totalSubtemas = countSubtemas();

  useScrollToTop(nav.view === 'subtema' ? `${nav.view}-${currentPhase}` : nav.view);

  const handleSwipeLeft = () => {
    if (nav.view === 'subtema') {
      const nextIndex = PHASES.findIndex(p => p.id === currentPhase) + 1;
      if (nextIndex < PHASES.length) {
        haptic('light');
        setCurrentPhase(PHASES[nextIndex].id);
      }
    }
  };

  const handleSwipeRight = () => {
    if (nav.view === 'subtema') {
      const prevIndex = PHASES.findIndex(p => p.id === currentPhase) - 1;
      if (prevIndex >= 0) {
        haptic('light');
        setCurrentPhase(PHASES[prevIndex].id);
      }
    }
  };

  useSwipe(handleSwipeLeft, handleSwipeRight);

  const goBack = () => {
    haptic('light');
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

  const getBreadcrumbs = () => {
    const items: { label: string; emoji?: string; onClick?: () => void }[] = [];
    if (nav.view === 'home') return items;
    items.push({ label: 'Inicio', emoji: '🏠', onClick: () => setNav({ view: 'home' }) });
    if (nav.view === 'parte' || nav.view === 'tema' || nav.view === 'seccion' || nav.view === 'subtema') {
      items.push({ label: nav.parte.title, emoji: nav.parte.emoji, onClick: () => setNav({ view: 'parte', parte: nav.parte }) });
    }
    if (nav.view === 'tema' || nav.view === 'seccion' || nav.view === 'subtema') {
      items.push({ label: nav.tema.title, emoji: nav.tema.emoji, onClick: () => setNav({ view: 'tema', parte: nav.parte, tema: nav.tema }) });
    }
    if (nav.view === 'seccion' || nav.view === 'subtema') {
      items.push({ label: nav.seccion.title, emoji: nav.seccion.emoji, onClick: () => setNav({ view: 'seccion', parte: nav.parte, tema: nav.tema, seccion: nav.seccion }) });
    }
    if (nav.view === 'subtema') {
      items.push({ label: nav.subtema.title, emoji: nav.subtema.emoji });
    }
    return items;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.bg}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 glass border-b transition-all duration-300 ${theme.header}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 sm:py-4">
            <div className="flex items-center gap-3">
              {nav.view !== 'home' && (
                <motion.button 
                  onClick={goBack}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all touchable ${theme.surfaceHover} ${theme.textSecondary}`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              )}
              
              {/* Logo - Premium & Minimal */}
              <div className="flex items-center gap-2.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center gradient-primary shadow-lg`}>
                  <span className="text-white text-xl">🧬</span>
                </div>
                <div>
                  <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${theme.text}`}>
                    CHARLEMOS
                  </h1>
                  <p className={`text-[10px] sm:text-xs font-medium tracking-wide uppercase ${theme.textMuted}`}>
                    Biología Celular
                  </p>
                </div>
              </div>
            </div>

            {nav.view === 'home' && (
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${theme.badge}`}>
                <span>{totalSubtemas} temas</span>
              </div>
            )}
          </div>

          {/* Mode Toggle - Premium */}
          <div className="pb-3 sm:pb-4">
            <div className={`flex items-center gap-2 p-1.5 rounded-2xl ${
              viewMode === 'intuitive' ? 'bg-gray-100/80' : 'bg-slate-800/80'
            }`}>
              <button
                onClick={() => { setViewMode('intuitive'); haptic('light'); }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all touchable ${
                  viewMode === 'intuitive'
                    ? 'bg-white text-emerald-600 shadow-md'
                    : `${theme.textMuted} hover:text-gray-700`
                }`}
              >
                <Lightbulb className="w-5 h-5" />
                <span>Intuitivo</span>
              </button>
              <button
                onClick={() => { setViewMode('precision'); haptic('light'); }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all touchable ${
                  viewMode === 'precision'
                    ? 'bg-[#0F172A] text-blue-400 shadow-md'
                    : `${theme.textMuted} hover:text-gray-700`
                }`}
              >
                <Microscope className="w-5 h-5" />
                <span>Precisión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 ${nav.view === 'subtema' && isMobile ? 'pb-24' : ''}`}>
        {nav.view !== 'home' && (
          <Breadcrumbs items={getBreadcrumbs()} viewMode={viewMode} />
        )}
        
        <AnimatePresence mode="wait">
          {nav.view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <HomeView viewMode={viewMode} onNavigate={(state) => { haptic('light'); setNav(state); }} searchQuery={searchQuery} setSearchQuery={setSearchQuery} debouncedSearch={debouncedSearch} />
            </motion.div>
          )}
          {nav.view === 'parte' && (
            <motion.div key="parte" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <ParteView viewMode={viewMode} parte={nav.parte} onNavigate={(state) => { haptic('light'); setNav(state); }} />
            </motion.div>
          )}
          {nav.view === 'tema' && (
            <motion.div key="tema" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <TemaView viewMode={viewMode} parte={nav.parte} tema={nav.tema} onNavigate={(state) => { haptic('light'); setNav(state); }} />
            </motion.div>
          )}
          {nav.view === 'seccion' && (
            <motion.div key="seccion" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <SeccionView viewMode={viewMode} parte={nav.parte} tema={nav.tema} seccion={nav.seccion} onNavigate={(state) => { haptic('light'); setNav(state); }} />
            </motion.div>
          )}
          {nav.view === 'subtema' && (
            <motion.div key="subtema" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <SubtemaView 
                viewMode={viewMode} 
                subtema={nav.subtema} 
                currentPhase={currentPhase} 
                setCurrentPhase={(phase) => { haptic('light'); setCurrentPhase(phase); }}
                onOpenQuiz={() => { haptic('medium'); setShowQuiz(true); }}
                onOpenChat={() => { haptic('medium'); setShowChat(true); }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      {nav.view === 'subtema' && isMobile && (
        <BottomNav 
          currentPhase={currentPhase} 
          onPhaseChange={(phase) => { haptic('light'); setCurrentPhase(phase); }} 
          viewMode={viewMode} 
        />
      )}

      {/* Modals */}
      <AnimatePresence>
        {showQuiz && nav.view === 'subtema' && (
          <Quiz subtemaId={nav.subtema.id} subtemaTitle={nav.subtema.title} viewMode={viewMode} onClose={() => setShowQuiz(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showChat && nav.view === 'subtema' && (
          <Chat subtemaId={nav.subtema.id} subtemaTitle={nav.subtema.title} viewMode={viewMode} onClose={() => setShowChat(false)} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className={`border-t py-8 transition-colors duration-300 ${theme.footer}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className={`text-sm ${theme.textMuted}`}>CHARLEMOS v4.0 — Biología Celular Interactiva</p>
          <p className={`text-xs mt-1 ${theme.textMuted}`}>4 Fases × 2 Modos = Comprensión completa</p>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// HOME VIEW - Premium & Balanced
// ============================================
function HomeView({ viewMode, onNavigate, searchQuery, setSearchQuery, debouncedSearch }: { 
  viewMode: ViewMode; 
  onNavigate: (state: NavigationState) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  debouncedSearch: string;
}) {
  const theme = getThemeClasses(viewMode);
  
  const filteredResults = useMemo(() => {
    if (!debouncedSearch.trim()) return [];
    const results: { parte: Parte; tema: Tema; seccion: Seccion; subtema: SubtemaMetadata }[] = [];
    const q = debouncedSearch.toLowerCase().trim();
    estructuraCompleta.forEach(parte => {
      parte.temas.forEach(tema => {
        tema.secciones.forEach(seccion => {
          seccion.subtemas.forEach(subtema => {
            const searchable = `${subtema.title} ${subtema.id} ${subtema.path} ${tema.title} ${seccion.title}`.toLowerCase();
            if (searchable.includes(q)) results.push({ parte, tema, seccion, subtema });
          });
        });
      });
    });
    return results;
  }, [debouncedSearch]);

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-8 sm:mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center gradient-primary shadow-lg`}>
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${theme.text}`}>Biología Celular</h2>
          </div>
          <p className={`text-base sm:text-lg mb-2 ${theme.textSecondary}`}>Aprende con explicaciones claras y visuales.</p>
          <p className={`text-sm ${theme.textMuted}`}>🌱 Descubrir → 🔍 Explorar → 💡 Comprender → 🧠 Dominar</p>
        </motion.div>

        {/* Search - Premium */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative mt-6">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
          <input
            type="text"
            placeholder="Buscar subtemas... (ej: mitocondrias, ribosomas)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-4 rounded-2xl border text-sm transition-all outline-none ${theme.input}`}
          />
        </motion.div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
          <h3 className={`text-sm font-medium mb-4 ${theme.textSecondary}`}>
            {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''}
          </h3>
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredResults.slice(0, 12).map((result) => (
                <motion.button
                  key={result.subtema.id}
                  onClick={() => onNavigate({ view: 'subtema', parte: result.parte, tema: result.tema, seccion: result.seccion, subtema: result.subtema })}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left p-4 rounded-2xl border transition-all touchable ${theme.card}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{result.subtema.emoji}</span>
                    <div className="min-w-0">
                      <h4 className={`font-semibold text-sm truncate ${theme.text}`}>{result.subtema.title}</h4>
                      <p className={`text-xs truncate ${theme.textMuted}`}>{CATEGORY_LABELS[getCategoryForSubtema(result.subtema)]} • {result.tema.title}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${theme.textMuted}`}>No se encontraron resultados para "{searchQuery}"</p>
          )}
        </motion.div>
      )}

      {/* Parts Grid - Premium Cards */}
      {!searchQuery.trim() && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {estructuraCompleta.map((parte, index) => (
            <motion.button
              key={parte.id}
              onClick={() => onNavigate({ view: 'parte', parte })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`text-left p-6 sm:p-8 rounded-3xl border transition-all touchable ${theme.card}`}
            >
              <div className="text-4xl sm:text-5xl mb-4">{parte.emoji}</div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-2 tracking-tight ${theme.text}`}>{parte.title}</h3>
              <p className={`text-sm mb-4 ${theme.textSecondary}`}>
                {parte.temas.length} temas • {parte.temas.reduce((acc, t) => acc + t.secciones.reduce((a, s) => a + s.subtemas.length, 0), 0)} subtemas
              </p>
              <div className={`flex items-center gap-1 text-sm font-semibold ${theme.accent}`}>
                <span>Explorar</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Stats - Vibrant but Balanced */}
      {!searchQuery.trim() && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`mt-8 p-6 rounded-3xl border ${theme.gradient}`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { value: '4', label: 'Fases', color: theme.phaseDiscover },
              { value: '2', label: 'Modos', color: theme.secondary },
              { value: countSubtemas().toString(), label: 'Subtemas', color: theme.accent },
              { value: '6', label: 'Categorías', color: theme.cool }
            ].map((stat) => (
              <div key={stat.label}>
                <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className={`text-xs ${theme.textSecondary}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Referencia Visual - Diagrama de Célula */}
      {!searchQuery.trim() && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }}
          className={`mt-8 p-6 rounded-3xl border ${theme.surface} ${theme.border}`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>
            🔬 Referencia Visual: Célula Eucariota
          </h3>
          <CellDiagram viewMode={viewMode} className="max-w-2xl mx-auto" />
          <p className={`text-sm mt-4 text-center ${theme.textMuted}`}>
            Diagrama simplificado de los principales organelos celulares
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ============================================
// PARTE VIEW
// ============================================
function ParteView({ viewMode, parte, onNavigate }: { viewMode: ViewMode; parte: Parte; onNavigate: (state: NavigationState) => void }) {
  const theme = getThemeClasses(viewMode);
  
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="text-4xl sm:text-5xl mb-3">{parte.emoji}</div>
        <h2 className={`text-3xl sm:text-4xl font-bold mb-2 tracking-tight ${theme.text}`}>{parte.title}</h2>
        <p className={`text-base ${theme.textSecondary}`}>{parte.temas.length} temas disponibles</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {parte.temas.map((tema, index) => (
          <motion.button
            key={tema.id}
            onClick={() => onNavigate({ view: 'tema', parte, tema })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`text-left p-5 rounded-2xl border transition-all touchable ${theme.card}`}
          >
            <div className="text-3xl mb-3">{tema.emoji}</div>
            <h3 className={`text-base font-semibold mb-1 ${theme.text}`}>{tema.title}</h3>
            <p className={`text-xs ${theme.textSecondary}`}>
              {tema.secciones.length} secciones • {tema.secciones.reduce((acc, s) => acc + s.subtemas.length, 0)} subtemas
            </p>
            <div className={`flex items-center gap-1 mt-3 text-sm font-semibold ${theme.accent}`}>
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
  const theme = getThemeClasses(viewMode);
  
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="text-4xl sm:text-5xl mb-3">{tema.emoji}</div>
        <h2 className={`text-3xl sm:text-4xl font-bold mb-2 tracking-tight ${theme.text}`}>{tema.title}</h2>
        <p className={`text-sm ${theme.textMuted}`}>{parte.title}</p>
      </motion.div>
      <div className="space-y-3">
        {tema.secciones.map((seccion, index) => (
          <motion.button
            key={seccion.id}
            onClick={() => onNavigate({ view: 'seccion', parte, tema, seccion })}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full text-left p-5 rounded-2xl border transition-all touchable ${theme.card}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl sm:text-3xl">{seccion.emoji}</div>
                <div>
                  <h3 className={`text-lg font-semibold ${theme.text}`}>{seccion.title}</h3>
                  <p className={`text-sm ${theme.textSecondary}`}>{seccion.subtemas.length} subtemas</p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 flex-shrink-0 ${theme.accent}`} />
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
  const theme = getThemeClasses(viewMode);
  
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="text-4xl sm:text-5xl mb-3">{seccion.emoji}</div>
        <h2 className={`text-3xl sm:text-4xl font-bold mb-2 tracking-tight ${theme.text}`}>{seccion.title}</h2>
        <p className={`text-sm ${theme.textMuted}`}>{parte.title} → {tema.title}</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {seccion.subtemas.map((subtema, index) => (
          <motion.button
            key={subtema.id}
            onClick={() => onNavigate({ view: 'subtema', parte, tema, seccion, subtema })}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`text-left p-4 rounded-2xl border transition-all touchable ${theme.card}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="text-xl flex-shrink-0">{subtema.emoji}</div>
                <div className="min-w-0">
                  <h3 className={`font-semibold text-sm truncate ${theme.text}`}>{subtema.title}</h3>
                  <p className={`text-xs ${theme.textMuted}`}>{CATEGORY_LABELS[getCategoryForSubtema(subtema)]}</p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 flex-shrink-0 ${theme.accent}`} />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SUBTEMA VIEW - Premium Content Display
// ============================================
function SubtemaView({ viewMode, subtema, currentPhase, setCurrentPhase, onOpenQuiz, onOpenChat }: { 
  viewMode: ViewMode; 
  subtema: SubtemaMetadata;
  currentPhase: LearningPhase;
  setCurrentPhase: (phase: LearningPhase) => void;
  onOpenQuiz: () => void;
  onOpenChat: () => void;
}) {
  const theme = getThemeClasses(viewMode);
  const category = getCategoryForSubtema(subtema);
  const content = getMockContent(subtema.id, currentPhase, viewMode);
  const currentPhaseIndex = PHASES.findIndex(p => p.id === currentPhase);

  const phaseColors = [
    { bg: theme.phaseDiscoverBg, text: theme.phaseDiscover },
    { bg: theme.phaseExploreBg, text: theme.phaseExplore },
    { bg: theme.phaseUnderstandBg, text: theme.phaseUnderstand },
    { bg: theme.phaseMasterBg, text: theme.phaseMaster },
  ];

  // Determinar qué diagrama mostrar basado en el subtema
  const getRelevantDiagram = () => {
    const id = subtema.id.toLowerCase();
    const path = subtema.path.toLowerCase();
    
    if (id.includes('rel') || path.includes('rel')) {
      return <RELDiagram viewMode={viewMode} className="max-w-md mx-auto" />;
    }
    if (id.includes('rer') || path.includes('rer')) {
      return <RERDiagram viewMode={viewMode} className="max-w-md mx-auto" />;
    }
    if (id.includes('mitocondria') || path.includes('mitocondria')) {
      return <MitochondriaDiagram viewMode={viewMode} className="max-w-md mx-auto" />;
    }
    if (id.includes('golgi') || path.includes('golgi')) {
      return <GolgiDiagram viewMode={viewMode} className="max-w-md mx-auto" />;
    }
    return null;
  };

  const diagram = getRelevantDiagram();

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="text-5xl sm:text-6xl mb-3">{subtema.emoji}</div>
        <h2 className={`text-2xl sm:text-4xl font-bold mb-2 tracking-tight ${theme.text}`}>{subtema.title}</h2>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${theme.accentLight} ${theme.accent} border ${theme.accentBorder}`}>
            {CATEGORY_LABELS[category]}
          </span>
          <span className={`text-xs ${theme.textMuted}`}>{subtema.path}</span>
        </div>
      </motion.div>

      {/* Diagrama relevante (si existe) */}
      {diagram && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.1 }}
          className={`mb-6 p-4 rounded-3xl border ${theme.surface} ${theme.border}`}
        >
          {diagram}
        </motion.div>
      )}

      {/* Phase Navigation - Desktop */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`hidden sm:block mb-6 p-5 rounded-3xl border ${theme.surface} ${theme.border}`}>
        <p className={`text-xs font-semibold mb-3 uppercase tracking-wide ${theme.textMuted}`}>Progresión de Aprendizaje</p>
        <div className="flex items-center gap-2">
          {PHASES.map((phase, idx) => (
            <button
              key={phase.id}
              onClick={() => setCurrentPhase(phase.id)}
              className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-2xl transition-all touchable ${
                currentPhase === phase.id 
                  ? `${phaseColors[idx].bg} border-2 ${phaseColors[idx].text.replace('text-', 'border-')}`
                  : `${theme.surfaceHover} border-2 border-transparent`
              }`}
            >
              <span className="text-2xl">{phase.emoji}</span>
              <span className={`text-sm font-semibold ${currentPhase === phase.id ? phaseColors[idx].text : theme.textSecondary}`}>{phase.name}</span>
              <span className={`text-xs ${theme.textMuted}`}>{phase.duration}</span>
            </button>
          ))}
        </div>
        <div className={`mt-4 h-2 rounded-full ${theme.progressBg}`}>
          <motion.div className={`h-full rounded-full ${theme.progressFill}`} initial={{ width: 0 }} animate={{ width: `${((currentPhaseIndex + 1) / PHASES.length) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </motion.div>

      {/* Content Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPhase}-${viewMode}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`rounded-3xl border overflow-hidden ${theme.surface} ${theme.border} shadow-sm`}
        >
          <div className={`px-5 py-3 border-b ${theme.border} ${viewMode === 'intuitive' ? 'bg-gray-50/50' : 'bg-slate-800/50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{PHASES[currentPhaseIndex].emoji}</span>
                <h3 className={`font-semibold ${theme.text}`}>Fase: {PHASES[currentPhaseIndex].name}</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${theme.badge}`}>
                {viewMode === 'intuitive' ? '💡 Intuitivo' : '🔬 Precisión'}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <MarkdownRenderer content={content} viewMode={viewMode} />
          </div>

          {/* Desktop navigation */}
          <div className={`hidden sm:flex items-center justify-between px-5 py-4 border-t ${theme.border} ${viewMode === 'intuitive' ? 'bg-gray-50/50' : 'bg-slate-800/50'}`}>
            <button
              onClick={() => { const i = currentPhaseIndex - 1; if (i >= 0) setCurrentPhase(PHASES[i].id); }}
              disabled={currentPhaseIndex === 0}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${currentPhaseIndex === 0 ? 'opacity-30 cursor-not-allowed' : `${theme.surfaceHover} ${theme.textSecondary}`}`}
            >
              <ArrowLeft className="w-4 h-4" /><span>Anterior</span>
            </button>
            <div className="flex gap-1">
              {PHASES.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === currentPhaseIndex ? theme.dotActive : i < currentPhaseIndex ? theme.dotVisited : theme.dotInactive}`} />
              ))}
            </div>
            <button
              onClick={() => { const i = currentPhaseIndex + 1; if (i < PHASES.length) setCurrentPhase(PHASES[i].id); }}
              disabled={currentPhaseIndex === PHASES.length - 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${currentPhaseIndex === PHASES.length - 1 ? 'opacity-30 cursor-not-allowed' : `${theme.surfaceHover} ${theme.accent}`}`}
            >
              <span>Siguiente</span><ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Quiz & Chat - Premium Cards */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button onClick={onOpenQuiz} className={`group p-5 rounded-3xl border-2 text-left transition-all touchable ${theme.card}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.secondaryLight}`}>
              <Trophy className={`w-6 h-6 ${theme.secondary}`} />
            </div>
            <div>
              <h4 className={`font-bold ${theme.text}`}>Quiz</h4>
              <p className={`text-xs ${theme.textMuted}`}>Pon a prueba tu conocimiento</p>
            </div>
          </div>
          <p className={`text-sm ${theme.textSecondary}`}>3 niveles de dificultad</p>
        </button>
        <button onClick={onOpenChat} className={`group p-5 rounded-3xl border-2 text-left transition-all touchable ${theme.card}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.coolLight}`}>
              <MessageCircle className={`w-6 h-6 ${theme.cool}`} />
            </div>
            <div>
              <h4 className={`font-bold ${theme.text}`}>Chat IA</h4>
              <p className={`text-xs ${theme.textMuted}`}>Resuelve tus dudas</p>
            </div>
          </div>
          <p className={`text-sm ${theme.textSecondary}`}>Respuestas personalizadas</p>
        </button>
      </motion.div>

      {/* Related topics */}
      {subtema.temasRelacionados.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className={`mt-6 p-5 rounded-3xl border ${theme.surface} ${theme.border}`}>
          <h4 className={`text-sm font-semibold mb-3 ${theme.textSecondary}`}>🔗 Temas Relacionados</h4>
          <div className="flex flex-wrap gap-2">
            {subtema.temasRelacionados.map((t, i) => (
              <span key={i} className={`px-3 py-1.5 rounded-full text-xs font-medium ${viewMode === 'intuitive' ? 'bg-gray-100 text-gray-600' : 'bg-slate-700 text-gray-300'}`}>{t}</span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Demo notice */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`mt-6 p-5 rounded-3xl border ${theme.gradient}`}>
        <h4 className={`text-sm font-semibold mb-2 ${theme.accent}`}>⚙️ Contenido Demo — v4.0</h4>
        <p className={`text-xs leading-relaxed ${theme.textSecondary}`}>
          El tema <strong>REL</strong> tiene contenido completo. Cuando se conecte la IA, se generará contenido real para los 100+ subtemas.
        </p>
      </motion.div>
    </div>
  );
}
