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
  bg: 'bg-[#FAFAFA]',
  surface: 'bg-white',
  border: 'border-gray-200',
  text: 'text-gray-900',
  textSecondary: 'text-gray-600',
  textMuted: 'text-gray-400',
  accent: 'text-[#10B981]',
  accentLight: 'bg-[#10B981]/10',
  accentBorder: 'border-[#10B981]/20',
  hover: 'hover:bg-gray-100',
  active: 'active:bg-gray-200',
};

const precisionColors = {
  bg: 'bg-[#0F172A]',
  surface: 'bg-[#1E293B]',
  border: 'border-[#334155]',
  text: 'text-gray-100',
  textSecondary: 'text-gray-400',
  textMuted: 'text-gray-500',
  accent: 'text-[#3B82F6]',
  accentLight: 'bg-[#3B82F6]/10',
  accentBorder: 'border-[#3B82F6]/20',
  hover: 'hover:bg-[#334155]',
  active: 'active:bg-[#475569]',
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
// UTILITY FUNCTIONS FOR STYLING
// ============================================

export function getThemeClasses(mode: ViewMode) {
  const isIntuitive = mode === 'intuitive';
  
  return {
    // Backgrounds
    bg: isIntuitive ? 'bg-[#FAFAFA]' : 'bg-[#0F172A]',
    surface: isIntuitive ? 'bg-white' : 'bg-[#1E293B]',
    surfaceHover: isIntuitive ? 'hover:bg-gray-50' : 'hover:bg-[#0F172A]',
    
    // Borders
    border: isIntuitive ? 'border-gray-200' : 'border-[#334155]',
    borderHover: isIntuitive ? 'hover:border-[#10B981]' : 'hover:border-[#3B82F6]',
    
    // Text
    text: isIntuitive ? 'text-gray-900' : 'text-gray-100',
    textSecondary: isIntuitive ? 'text-gray-600' : 'text-gray-400',
    textMuted: isIntuitive ? 'text-gray-400' : 'text-gray-500',
    
    // Accent
    accent: isIntuitive ? 'text-[#10B981]' : 'text-[#3B82F6]',
    accentBg: isIntuitive ? 'bg-[#10B981]' : 'bg-[#3B82F6]',
    accentLight: isIntuitive ? 'bg-[#10B981]/10' : 'bg-[#3B82F6]/10',
    accentBorder: isIntuitive ? 'border-[#10B981]/30' : 'border-[#3B82F6]/30',
    accentHover: isIntuitive ? 'hover:bg-[#059669]' : 'hover:bg-[#2563EB]',
    
    // Interactive
    button: isIntuitive 
      ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm' 
      : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]',
    buttonActive: isIntuitive 
      ? 'bg-[#10B981]/10 border-[#10B981]/30' 
      : 'bg-[#3B82F6]/10 border-[#3B82F6]/30',
    
    // Card
    card: isIntuitive 
      ? 'bg-white border-gray-200 hover:border-[#10B981] hover:shadow-sm' 
      : 'bg-[#1E293B] border-[#334155] hover:border-[#3B82F6]',
    
    // Header
    header: isIntuitive 
      ? 'bg-white/90 border-gray-200/50 shadow-sm' 
      : 'bg-[#0F172A]/90 border-[#1E293B]/50 shadow-lg shadow-black/20',
    
    // Footer
    footer: isIntuitive 
      ? 'border-gray-200 bg-white/50' 
      : 'border-[#1E293B] bg-[#0F172A]/50',
    
    // Gradient
    gradient: isIntuitive 
      ? 'bg-gradient-to-br from-[#10B981]/5 to-[#10B981]/10 border-[#10B981]/20' 
      : 'bg-gradient-to-br from-[#3B82F6]/5 to-[#3B82F6]/10 border-[#3B82F6]/20',
    
    // Badge
    badge: isIntuitive 
      ? 'bg-[#10B981]/10 text-[#10B981]' 
      : 'bg-[#3B82F6]/10 text-[#3B82F6]',
    
    // Input
    input: isIntuitive 
      ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20' 
      : 'bg-[#1E293B] border-[#334155] text-gray-100 placeholder-gray-500 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20',
    
    // Modal
    modal: isIntuitive ? 'bg-white' : 'bg-[#1E293B]',
    modalBorder: isIntuitive ? 'border-gray-200' : 'border-[#334155]',
    
    // Progress bar
    progressBg: isIntuitive ? 'bg-gray-100' : 'bg-[#334155]',
    progressFill: isIntuitive ? 'bg-[#10B981]' : 'bg-[#3B82F6]',
    
    // Dot indicators
    dotActive: isIntuitive ? 'bg-[#10B981]' : 'bg-[#3B82F6]',
    dotInactive: isIntuitive ? 'bg-gray-200' : 'bg-[#334155]',
    dotVisited: isIntuitive ? 'bg-[#10B981]/40' : 'bg-[#3B82F6]/40',
  };
}
