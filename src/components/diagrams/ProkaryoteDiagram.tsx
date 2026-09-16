import { getThemeClasses } from '../../hooks/useTheme';

interface ProkaryoteDiagramProps {
  viewMode: 'intuitive' | 'precision';
  className?: string;
}

export default function ProkaryoteDiagram({ viewMode, className = '' }: ProkaryoteDiagramProps) {
  const theme = getThemeClasses(viewMode);
  const isIntuitive = viewMode === 'intuitive';
  
  const colors = {
    cellWall: isIntuitive ? '#10B981' : '#34D399',
    capsule: isIntuitive ? '#8B5CF6' : '#A78BFA',
    membrane: isIntuitive ? '#3B82F6' : '#60A5FA',
    nucleoid: isIntuitive ? '#EF4444' : '#F87171',
    ribosome: isIntuitive ? '#F59E0B' : '#FBBF24',
    flagellum: isIntuitive ? '#6B7280' : '#9CA3AF',
    pilus: isIntuitive ? '#EC4899' : '#F472B6',
    plasmid: isIntuitive ? '#14B8A6' : '#2DD4BF',
    background: isIntuitive ? '#F9FAFB' : '#1E293B',
  };

  return (
    <svg 
      viewBox="0 0 400 280" 
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="280" fill={colors.background} rx="12"/>
      
      {/* Capsule (outer layer) */}
      <ellipse 
        cx="200" 
        cy="140" 
        rx="170" 
        ry="110" 
        fill="none" 
        stroke={colors.capsule} 
        strokeWidth="3"
        strokeDasharray="5,5"
        opacity="0.6"
      />
      
      {/* Cell Wall */}
      <ellipse 
        cx="200" 
        cy="140" 
        rx="150" 
        ry="95" 
        fill="none" 
        stroke={colors.cellWall} 
        strokeWidth="4"
      />
      
      {/* Cell Membrane */}
      <ellipse 
        cx="200" 
        cy="140" 
        rx="135" 
        ry="82" 
        fill="none" 
        stroke={colors.membrane} 
        strokeWidth="3"
      />
      
      {/* Cytoplasm */}
      <ellipse 
        cx="200" 
        cy="140" 
        rx="130" 
        ry="78" 
        fill={colors.membrane} 
        opacity="0.1"
      />
      
      {/* Nucleoid (DNA) */}
      <path 
        d="M 180 120 Q 190 110 200 120 Q 210 130 220 120 Q 230 110 240 120" 
        fill="none" 
        stroke={colors.nucleoid} 
        strokeWidth="3"
      />
      <path 
        d="M 175 135 Q 185 145 195 135 Q 205 125 215 135 Q 225 145 235 135" 
        fill="none" 
        stroke={colors.nucleoid} 
        strokeWidth="3"
      />
      <text x="200" y="160" textAnchor="middle" fontSize="9" fill={colors.nucleoid} fontWeight="500">
        Nucleoide
      </text>
      
      {/* Ribosomes */}
      <circle cx="160" cy="110" r="3" fill={colors.ribosome}/>
      <circle cx="180" cy="150" r="3" fill={colors.ribosome}/>
      <circle cx="220" cy="105" r="3" fill={colors.ribosome}/>
      <circle cx="240" cy="145" r="3" fill={colors.ribosome}/>
      <circle cx="200" cy="175" r="3" fill={colors.ribosome}/>
      
      {/* Plasmid */}
      <circle cx="150" cy="160" r="12" fill="none" stroke={colors.plasmid} strokeWidth="2"/>
      <text x="150" y="180" textAnchor="middle" fontSize="8" fill={colors.plasmid}>
        Plásmido
      </text>
      
      {/* Flagellum */}
      <path 
        d="M 350 140 Q 360 130 370 140 Q 380 150 390 140" 
        fill="none" 
        stroke={colors.flagellum} 
        strokeWidth="3"
      />
      <circle cx="350" cy="140" r="4" fill={colors.flagellum}/>
      <text x="370" y="125" textAnchor="middle" fontSize="8" fill={colors.flagellum}>
        Flagelo
      </text>
      
      {/* Pili/Fimbriae */}
      <line x1="50" y1="120" x2="30" y2="110" stroke={colors.pilus} strokeWidth="2"/>
      <line x1="50" y1="140" x2="25" y2="140" stroke={colors.pilus} strokeWidth="2"/>
      <line x1="50" y1="160" x2="30" y2="170" stroke={colors.pilus} strokeWidth="2"/>
      <text x="20" y="100" textAnchor="middle" fontSize="8" fill={colors.pilus}>
        Pili
      </text>
      
      {/* Labels */}
      <text x="200" y="25" textAnchor="middle" fontSize="12" fill={colors.cellWall} fontWeight="600">
        Célula Procariota
      </text>
      
      <g transform="translate(20, 250)">
        <ellipse cx="0" cy="0" rx="8" ry="5" fill="none" stroke={colors.capsule} strokeWidth="2" strokeDasharray="2,2"/>
        <text x="15" y="4" fontSize="9" fill={colors.capsule}>Cápsula</text>
        
        <line x1="80" y1="-5" x2="80" y2="5" stroke={colors.cellWall} strokeWidth="3"/>
        <text x="90" y="4" fontSize="9" fill={colors.cellWall}>Pared</text>
        
        <line x1="140" y1="-5" x2="140" y2="5" stroke={colors.membrane} strokeWidth="2"/>
        <text x="150" y="4" fontSize="9" fill={colors.membrane}>Membrana</text>
        
        <circle cx="220" cy="0" r="3" fill={colors.ribosome}/>
        <text x="230" y="4" fontSize="9" fill={colors.ribosome}>Ribosomas 70S</text>
      </g>
    </svg>
  );
}
