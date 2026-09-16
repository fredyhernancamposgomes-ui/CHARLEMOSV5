import { getThemeClasses } from '../../hooks/useTheme';

interface MitochondriaDiagramProps {
  viewMode: 'intuitive' | 'precision';
  className?: string;
}

export default function MitochondriaDiagram({ viewMode, className = '' }: MitochondriaDiagramProps) {
  const theme = getThemeClasses(viewMode);
  const isIntuitive = viewMode === 'intuitive';
  
  const colors = {
    outerMembrane: isIntuitive ? '#EF4444' : '#F87171',
    innerMembrane: isIntuitive ? '#DC2626' : '#EF4444',
    cristae: isIntuitive ? '#B91C1C' : '#DC2626',
    matrix: isIntuitive ? '#FEE2E2' : '#7F1D1D',
    atp: isIntuitive ? '#F59E0B' : '#FBBF24',
    background: isIntuitive ? '#F9FAFB' : '#1E293B',
  };

  return (
    <svg 
      viewBox="0 0 400 250" 
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="400" height="250" fill={colors.background} rx="12"/>
      
      {/* Outer membrane */}
      <ellipse 
        cx="200" 
        cy="125" 
        rx="160" 
        ry="80" 
        fill="none" 
        stroke={colors.outerMembrane} 
        strokeWidth="4"
      />
      
      {/* Inner membrane */}
      <ellipse 
        cx="200" 
        cy="125" 
        rx="140" 
        ry="65" 
        fill={colors.matrix} 
        opacity="0.3"
      />
      <ellipse 
        cx="200" 
        cy="125" 
        rx="140" 
        ry="65" 
        fill="none" 
        stroke={colors.innerMembrane} 
        strokeWidth="3"
      />
      
      {/* Cristae (folds of inner membrane) */}
      <g transform="translate(200, 125)">
        <path 
          d="M -100 -20 Q -80 -40 -60 -20 Q -40 0 -20 -20 Q 0 -40 20 -20 Q 40 0 60 -20 Q 80 -40 100 -20" 
          fill="none" 
          stroke={colors.cristae} 
          strokeWidth="3"
        />
        <path 
          d="M -80 20 Q -60 0 -40 20 Q -20 40 0 20 Q 20 0 40 20 Q 60 40 80 20" 
          fill="none" 
          stroke={colors.cristae} 
          strokeWidth="3"
        />
        <path 
          d="M -60 -50 Q -40 -30 -20 -50 Q 0 -70 20 -50 Q 40 -30 60 -50" 
          fill="none" 
          stroke={colors.cristae} 
          strokeWidth="2.5"
          opacity="0.7"
        />
      </g>
      
      {/* ATP molecules */}
      <g transform="translate(200, 125)">
        <circle cx="-80" cy="0" r="8" fill={colors.atp} opacity="0.8"/>
        <text x="-80" y="4" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">ATP</text>
        
        <circle cx="0" cy="-30" r="8" fill={colors.atp} opacity="0.8"/>
        <text x="0" y="-26" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">ATP</text>
        
        <circle cx="80" cy="10" r="8" fill={colors.atp} opacity="0.8"/>
        <text x="80" y="14" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">ATP</text>
      </g>
      
      {/* Labels */}
      <text x="200" y="25" textAnchor="middle" fontSize="12" fill={colors.outerMembrane} fontWeight="600">
        Mitocondria
      </text>
      
      <g transform="translate(20, 220)">
        <path d="M 0 0 L 20 0" stroke={colors.outerMembrane} strokeWidth="4"/>
        <text x="30" y="4" fontSize="10" fill={colors.outerMembrane}>Membrana externa</text>
        
        <path d="M 140 0 L 160 0" stroke={colors.innerMembrane} strokeWidth="3"/>
        <text x="170" y="4" fontSize="10" fill={colors.innerMembrane}>Membrana interna</text>
        
        <path d="M 280 0 Q 290 -10 300 0" stroke={colors.cristae} strokeWidth="3"/>
        <text x="310" y="4" fontSize="10" fill={colors.cristae}>Crestas</text>
      </g>
    </svg>
  );
}
