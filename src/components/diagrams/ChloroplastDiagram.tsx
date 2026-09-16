import { getThemeClasses } from '../../hooks/useTheme';

interface ChloroplastDiagramProps {
  viewMode: 'intuitive' | 'precision';
  className?: string;
}

export default function ChloroplastDiagram({ viewMode, className = '' }: ChloroplastDiagramProps) {
  const theme = getThemeClasses(viewMode);
  const isIntuitive = viewMode === 'intuitive';
  
  const colors = {
    outerMembrane: isIntuitive ? '#22C55E' : '#4ADE80',
    innerMembrane: isIntuitive ? '#16A34A' : '#22C55E',
    stroma: isIntuitive ? '#DCFCE7' : '#14532D',
    thylakoid: isIntuitive ? '#15803D' : '#16A34A',
    granum: isIntuitive ? '#166534' : '#15803D',
    dna: isIntuitive ? '#EF4444' : '#F87171',
    ribosome: isIntuitive ? '#F59E0B' : '#FBBF24',
    background: isIntuitive ? '#F9FAFB' : '#1E293B',
  };

  return (
    <svg 
      viewBox="0 0 400 280" 
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="280" fill={colors.background} rx="12"/>
      
      {/* Title */}
      <text x="200" y="20" textAnchor="middle" fontSize="12" fill={colors.outerMembrane} fontWeight="600">
        Cloroplasto
      </text>
      
      {/* Outer membrane */}
      <ellipse 
        cx="200" 
        cy="140" 
        rx="170" 
        ry="100" 
        fill="none" 
        stroke={colors.outerMembrane} 
        strokeWidth="4"
      />
      
      {/* Inner membrane */}
      <ellipse 
        cx="200" 
        cy="140" 
        rx="160" 
        ry="90" 
        fill="none" 
        stroke={colors.innerMembrane} 
        strokeWidth="3"
      />
      
      {/* Stroma */}
      <ellipse 
        cx="200" 
        cy="140" 
        rx="155" 
        ry="85" 
        fill={colors.stroma} 
        opacity="0.3"
      />
      
      {/* Grana (stacks of thylakoids) */}
      {/* Granum 1 */}
      <g transform="translate(120, 100)">
        <rect x="-25" y="0" width="50" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-25" y="0" width="50" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
        
        <rect x="-25" y="12" width="50" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-25" y="12" width="50" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
        
        <rect x="-25" y="24" width="50" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-25" y="24" width="50" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
        
        <rect x="-25" y="36" width="50" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-25" y="36" width="50" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
        
        <text x="0" y="60" textAnchor="middle" fontSize="9" fill={colors.granum} fontWeight="500">
          Grano
        </text>
      </g>
      
      {/* Granum 2 */}
      <g transform="translate(250, 120)">
        <rect x="-30" y="0" width="60" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-30" y="0" width="60" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
        
        <rect x="-30" y="12" width="60" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-30" y="12" width="60" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
        
        <rect x="-30" y="24" width="60" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-30" y="24" width="60" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
        
        <rect x="-30" y="36" width="60" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-30" y="36" width="60" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
        
        <rect x="-30" y="48" width="60" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-30" y="48" width="60" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
      </g>
      
      {/* Granum 3 */}
      <g transform="translate(180, 160)">
        <rect x="-20" y="0" width="40" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-20" y="0" width="40" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
        
        <rect x="-20" y="12" width="40" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-20" y="12" width="40" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
        
        <rect x="-20" y="24" width="40" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <rect x="-20" y="24" width="40" height="8" rx="4" fill="none" stroke={colors.granum} strokeWidth="1.5"/>
      </g>
      
      {/* Lamellae (connecting thylakoids) */}
      <path d="M 145 120 Q 180 115 220 120" fill="none" stroke={colors.thylakoid} strokeWidth="2" opacity="0.6"/>
      <path d="M 145 132 Q 180 127 220 132" fill="none" stroke={colors.thylakoid} strokeWidth="2" opacity="0.6"/>
      <path d="M 280 140 Q 250 155 200 160" fill="none" stroke={colors.thylakoid} strokeWidth="2" opacity="0.6"/>
      
      {/* DNA circular */}
      <circle cx="300" cy="180" r="15" fill="none" stroke={colors.dna} strokeWidth="2"/>
      <path d="M 290 175 Q 295 170 300 175 Q 305 180 310 175" fill="none" stroke={colors.dna} strokeWidth="1.5"/>
      <text x="300" y="205" textAnchor="middle" fontSize="8" fill={colors.dna}>
        ADN
      </text>
      
      {/* Ribosomes */}
      <circle cx="100" cy="170" r="3" fill={colors.ribosome}/>
      <circle cx="110" cy="175" r="3" fill={colors.ribosome}/>
      <circle cx="105" cy="180" r="3" fill={colors.ribosome}/>
      <text x="105" y="195" textAnchor="middle" fontSize="8" fill={colors.ribosome}>
        Ribosomas
      </text>
      
      {/* Labels */}
      <g transform="translate(20, 250)">
        <ellipse cx="0" cy="0" rx="12" ry="6" fill={colors.outerMembrane} opacity="0.5"/>
        <text x="20" y="4" fontSize="9" fill={colors.outerMembrane}>Membrana externa</text>
        
        <rect x="130" y="-4" width="20" height="8" rx="4" fill={colors.granum} opacity="0.7"/>
        <text x="160" y="4" fontSize="9" fill={colors.granum}>Grana (tilacoides)</text>
        
        <ellipse cx="280" cy="0" rx="8" ry="5" fill={colors.stroma} opacity="0.5"/>
        <text x="295" y="4" fontSize="9" fill={colors.stroma}>Estroma</text>
      </g>
    </svg>
  );
}
