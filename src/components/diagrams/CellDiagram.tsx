import { getThemeClasses } from '../../hooks/useTheme';

interface CellDiagramProps {
  viewMode: 'intuitive' | 'precision';
  className?: string;
}

export default function CellDiagram({ viewMode, className = '' }: CellDiagramProps) {
  const theme = getThemeClasses(viewMode);
  const isIntuitive = viewMode === 'intuitive';
  
  const colors = {
    nucleus: isIntuitive ? '#3B82F6' : '#60A5FA',
    rel: isIntuitive ? '#10B981' : '#34D399',
    rer: isIntuitive ? '#8B5CF6' : '#A78BFA',
    golgi: isIntuitive ? '#F59E0B' : '#FBBF24',
    mitochondria: isIntuitive ? '#EF4444' : '#F87171',
    membrane: isIntuitive ? '#6B7280' : '#9CA3AF',
    background: isIntuitive ? '#F9FAFB' : '#1E293B',
  };

  return (
    <svg 
      viewBox="0 0 400 300" 
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="400" height="300" fill={colors.background} rx="12"/>
      
      {/* Cell Membrane */}
      <ellipse 
        cx="200" 
        cy="150" 
        rx="180" 
        ry="130" 
        fill="none" 
        stroke={colors.membrane} 
        strokeWidth="3"
        opacity="0.6"
      />
      
      {/* Nucleus */}
      <ellipse 
        cx="200" 
        cy="140" 
        rx="50" 
        ry="45" 
        fill={colors.nucleus} 
        opacity="0.3"
      />
      <ellipse 
        cx="200" 
        cy="140" 
        rx="50" 
        ry="45" 
        fill="none" 
        stroke={colors.nucleus} 
        strokeWidth="2"
      />
      <text x="200" y="145" textAnchor="middle" fontSize="10" fill={colors.nucleus} fontWeight="600">
        Núcleo
      </text>
      
      {/* RER (Retículo Endoplasmático Rugoso) */}
      <path 
        d="M 120 100 Q 100 110 110 130 Q 120 150 100 160" 
        fill="none" 
        stroke={colors.rer} 
        strokeWidth="2.5"
      />
      <circle cx="115" cy="105" r="2" fill={colors.rer}/>
      <circle cx="108" cy="120" r="2" fill={colors.rer}/>
      <circle cx="112" cy="135" r="2" fill={colors.rer}/>
      <circle cx="105" cy="150" r="2" fill={colors.rer}/>
      <text x="85" y="135" textAnchor="middle" fontSize="9" fill={colors.rer} fontWeight="500">
        RER
      </text>
      
      {/* REL (Retículo Endoplasmático Liso) */}
      <path 
        d="M 280 100 Q 300 110 290 130 Q 280 150 300 160" 
        fill="none" 
        stroke={colors.rel} 
        strokeWidth="2.5"
      />
      <path 
        d="M 285 115 Q 295 120 288 135" 
        fill="none" 
        stroke={colors.rel} 
        strokeWidth="2"
      />
      <text x="315" y="135" textAnchor="middle" fontSize="9" fill={colors.rel} fontWeight="500">
        REL
      </text>
      
      {/* Golgi Apparatus */}
      <g transform="translate(250, 200)">
        <ellipse cx="0" cy="0" rx="30" ry="8" fill="none" stroke={colors.golgi} strokeWidth="2"/>
        <ellipse cx="0" cy="10" rx="28" ry="7" fill="none" stroke={colors.golgi} strokeWidth="2"/>
        <ellipse cx="0" cy="20" rx="26" ry="6" fill="none" stroke={colors.golgi} strokeWidth="2"/>
        <text x="0" y="40" textAnchor="middle" fontSize="9" fill={colors.golgi} fontWeight="500">
          Golgi
        </text>
      </g>
      
      {/* Mitochondria */}
      <g transform="translate(130, 200)">
        <ellipse cx="0" cy="0" rx="25" ry="15" fill={colors.mitochondria} opacity="0.3"/>
        <ellipse cx="0" cy="0" rx="25" ry="15" fill="none" stroke={colors.mitochondria} strokeWidth="2"/>
        <path d="M -15 0 Q -10 -8 0 -5 Q 10 -8 15 0" fill="none" stroke={colors.mitochondria} strokeWidth="1.5"/>
        <text x="0" y="25" textAnchor="middle" fontSize="9" fill={colors.mitochondria} fontWeight="500">
          Mitocondria
        </text>
      </g>
      
      {/* Small dots for other organelles */}
      <circle cx="160" cy="180" r="4" fill={colors.membrane} opacity="0.4"/>
      <circle cx="240" cy="170" r="4" fill={colors.membrane} opacity="0.4"/>
      <circle cx="180" cy="220" r="3" fill={colors.membrane} opacity="0.4"/>
    </svg>
  );
}
