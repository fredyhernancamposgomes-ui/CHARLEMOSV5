import { createContext, useContext, ReactNode } from 'react';

type ViewMode = 'intuitive' | 'precision';

interface ThemeContextType {
  mode: ViewMode;
  colors: {
    bg: string;
    surface: string;
    border: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentLight: string;
    accentBorder: string;
    hover: string;
    active: string;
  };
}

const intuitiveColors = {
  bg: 'bg-[#FAFBFC]',
  surface: 'bg-white',
  border: 'border-gray-200',
  text: 'text-gray-900',
  textSecondary: 'text-gray-600',
  textMuted: 'text-gray-400',
  accent: 'text-emerald-500',
  accentLight: 'bg-emerald-50',
  accentBorder: 'border-emerald-200',
  hover: 'hover:bg-gray-50',
  active: 'active:bg-gray-100',
};

const precisionColors = {
  bg: 'bg-[#0F172A]',
  surface: 'bg-[#1E293B]',
  border: 'border-slate-700',
  text: 'text-gray-50',
  textSecondary: 'text-gray-400',
  textMuted: 'text-gray-500',
  accent: 'text-emerald-400',
  accentLight: 'bg-emerald-500/10',
  accentBorder: 'border-emerald-500/20',
  hover: 'hover:bg-slate-800',
  active: 'active:bg-slate-700',
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ mode, children }: { mode: ViewMode; children: ReactNode }) {
  const colors = mode === 'intuitive' ? intuitiveColors : precisionColors;
  
  return (
    <ThemeContext.Provider value={{ mode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// ============================================
// PREMIUM THEME CLASSES - "Duolingo meets Stripe"
// ============================================

export function getThemeClasses(mode: ViewMode) {
  const isIntuitive = mode === 'intuitive';
  
  return {
    // Backgrounds - Clean & Airy
    bg: isIntuitive ? 'bg-[#FAFBFC]' : 'bg-[#0F172A]',
    surface: isIntuitive ? 'bg-white' : 'bg-[#1E293B]',
    surfaceHover: isIntuitive ? 'hover:bg-gray-50' : 'hover:bg-slate-800',
    
    // Borders - Subtle & Premium
    border: isIntuitive ? 'border-gray-200' : 'border-slate-700',
    borderHover: isIntuitive ? 'hover:border-emerald-300' : 'hover:border-emerald-600',
    
    // Text - Clear hierarchy
    text: isIntuitive ? 'text-gray-900' : 'text-gray-50',
    textSecondary: isIntuitive ? 'text-gray-600' : 'text-gray-400',
    textMuted: isIntuitive ? 'text-gray-400' : 'text-gray-500',
    
    // Accent - Vibrant but soft
    accent: isIntuitive ? 'text-emerald-500' : 'text-emerald-400',
    accentBg: isIntuitive ? 'bg-emerald-500' : 'bg-emerald-500',
    accentLight: isIntuitive ? 'bg-emerald-50' : 'bg-emerald-500/10',
    accentBorder: isIntuitive ? 'border-emerald-200' : 'border-emerald-500/20',
    accentHover: isIntuitive ? 'hover:bg-emerald-600' : 'hover:bg-emerald-600',
    
    // Secondary accent
    secondary: isIntuitive ? 'text-blue-500' : 'text-blue-400',
    secondaryBg: isIntuitive ? 'bg-blue-500' : 'bg-blue-500',
    secondaryLight: isIntuitive ? 'bg-blue-50' : 'bg-blue-500/10',
    
    // Warm accent
    warm: isIntuitive ? 'text-amber-500' : 'text-amber-400',
    warmLight: isIntuitive ? 'bg-amber-50' : 'bg-amber-500/10',
    
    // Cool accent
    cool: isIntuitive ? 'text-violet-500' : 'text-violet-400',
    coolLight: isIntuitive ? 'bg-violet-50' : 'bg-violet-500/10',
    
    // Interactive - Premium feel
    button: isIntuitive 
      ? 'bg-white border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300' 
      : 'bg-[#1E293B] border-slate-700 hover:border-emerald-600 hover:shadow-lg transition-all duration-300',
    buttonActive: isIntuitive 
      ? 'bg-emerald-50 border-emerald-200' 
      : 'bg-emerald-500/10 border-emerald-500/20',
    
    // Card - Elevated & Clean
    card: isIntuitive 
      ? 'bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300' 
      : 'bg-[#1E293B] border border-slate-700 hover:border-emerald-600 hover:shadow-xl transition-all duration-300',
    
    // Header - Glass morphism
    header: isIntuitive 
      ? 'bg-white/80 border-gray-200/50 shadow-sm backdrop-blur-xl' 
      : 'bg-[#0F172A]/80 border-slate-700/50 shadow-lg backdrop-blur-xl',
    
    // Footer
    footer: isIntuitive 
      ? 'border-gray-200 bg-white/50' 
      : 'border-slate-700 bg-[#0F172A]/50',
    
    // Gradient backgrounds
    gradient: isIntuitive 
      ? 'bg-gradient-to-br from-emerald-50/50 to-blue-50/50 border-emerald-200/50' 
      : 'bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border-emerald-500/10',
    
    // Badge
    badge: isIntuitive 
      ? 'bg-emerald-50 text-emerald-600' 
      : 'bg-emerald-500/10 text-emerald-400',
    badgeSecondary: isIntuitive 
      ? 'bg-blue-50 text-blue-600' 
      : 'bg-blue-500/10 text-blue-400',
    badgeWarm: isIntuitive 
      ? 'bg-amber-50 text-amber-600' 
      : 'bg-amber-500/10 text-amber-400',
    badgeCool: isIntuitive 
      ? 'bg-violet-50 text-violet-600' 
      : 'bg-violet-500/10 text-violet-400',
    
    // Input
    input: isIntuitive 
      ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300' 
      : 'bg-[#1E293B] border-slate-700 text-gray-50 placeholder-gray-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300',
    
    // Modal
    modal: isIntuitive ? 'bg-white' : 'bg-[#1E293B]',
    modalBorder: isIntuitive ? 'border-gray-200' : 'border-slate-700',
    
    // Progress bar
    progressBg: isIntuitive ? 'bg-gray-100' : 'bg-slate-700',
    progressFill: isIntuitive ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    
    // Dot indicators
    dotActive: isIntuitive ? 'bg-emerald-500' : 'bg-emerald-400',
    dotInactive: isIntuitive ? 'bg-gray-200' : 'bg-slate-700',
    dotVisited: isIntuitive ? 'bg-emerald-200' : 'bg-emerald-500/30',
    
    // Phase colors - Each phase has its own color
    phaseDiscover: isIntuitive ? 'text-emerald-500' : 'text-emerald-400',
    phaseDiscoverBg: isIntuitive ? 'bg-emerald-50' : 'bg-emerald-500/10',
    phaseExplore: isIntuitive ? 'text-blue-500' : 'text-blue-400',
    phaseExploreBg: isIntuitive ? 'bg-blue-50' : 'bg-blue-500/10',
    phaseUnderstand: isIntuitive ? 'text-amber-500' : 'text-amber-400',
    phaseUnderstandBg: isIntuitive ? 'bg-amber-50' : 'bg-amber-500/10',
    phaseMaster: isIntuitive ? 'text-violet-500' : 'text-violet-400',
    phaseMasterBg: isIntuitive ? 'bg-violet-50' : 'bg-violet-500/10',
  };
}
