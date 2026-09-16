import { motion } from 'framer-motion';
import { getThemeClasses } from '../hooks/useTheme';
import type { LearningPhase } from '../prompts/promptEngine';

interface BottomNavProps {
  currentPhase: LearningPhase;
  onPhaseChange: (phase: LearningPhase) => void;
  viewMode: 'intuitive' | 'precision';
}

const PHASES: { id: LearningPhase; name: string; emoji: string }[] = [
  { id: 'discover', name: 'Descubrir', emoji: '🌱' },
  { id: 'explore', name: 'Explorar', emoji: '🔍' },
  { id: 'understand', name: 'Comprender', emoji: '💡' },
  { id: 'master', name: 'Dominar', emoji: '🧠' }
];

export default function BottomNav({ currentPhase, onPhaseChange, viewMode }: BottomNavProps) {
  const theme = getThemeClasses(viewMode);
  const currentIndex = PHASES.findIndex(p => p.id === currentPhase);

  const phaseColors = [
    theme.phaseDiscover,
    theme.phaseExplore,
    theme.phaseUnderstand,
    theme.phaseMaster,
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden safe-area-bottom glass ${
        viewMode === 'intuitive' 
          ? 'bg-white/95 border-t border-gray-200' 
          : 'bg-[#1E293B]/95 border-t border-slate-700'
      }`}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {PHASES.map((phase, index) => {
          const isActive = phase.id === currentPhase;
          const isVisited = index < currentIndex;
          
          return (
            <button
              key={phase.id}
              onClick={() => onPhaseChange(phase.id)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all touchable ${
                isActive
                  ? viewMode === 'intuitive' ? 'bg-gray-50' : 'bg-slate-800'
                  : 'active:scale-95'
              }`}
            >
              <motion.span
                className="text-xl"
                animate={{ scale: isActive ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                {phase.emoji}
              </motion.span>
              
              <span className={`text-[10px] font-semibold ${
                isActive ? phaseColors[index] : theme.textMuted
              }`}>
                {phase.name}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className={`absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full ${phaseColors[index].replace('text-', 'bg-')}`}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              
              {isVisited && !isActive && (
                <div className={`absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${theme.dotVisited}`} />
              )}
            </button>
          );
        })}
      </div>
      
      <div className={`h-1 ${theme.progressBg}`}>
        <motion.div
          className={`h-full ${theme.progressFill}`}
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / PHASES.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
