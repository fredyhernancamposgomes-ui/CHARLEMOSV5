import { getThemeClasses } from '../../hooks/useTheme';

interface PlantCellDiagramProps {
  viewMode: 'intuitive' | 'precision';
  className?: string;
}

export default function PlantCellDiagram({ viewMode, className = '' }: PlantCellDiagramProps) {
  const theme = getThemeClasses(viewMode);
  const isIntuitive = viewMode === 'intuitive';
  
  const colors = {
    cellWall: isIntuitive ? '#10B981' : '#34D399',
    membrane: isIntuitive ? '#3B82F6' : '#60A5FA',
    chloroplast: isIntuitive ? '#22C55E' : '#4ADE80',
    vacuole: isIntuitive ? '#06B6D4' : '#22D3EE',
    nucleus: isIntuitive ? '#8B5CF6' : '#A78BFA',
    mitochondria: isIntuitive ? '#EF4444' : '#F87171',
    background: isIntuitive ? '#F9FAFB' : '#1E293B',
  };

  return (
    <svg 
      viewBox="0 0 400 300" 
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="300" fill={colors.background} rx="12"/>
      
      {/* Cell Wall (rectangular shape) */}
      <rect 
        x="30" 
        y="30" 
        width="340" 
        height="240" 
        fill="none" 
        stroke={colors.cellWall} 
        strokeWidth="6"
        rx="8"
      />
      
      {/* Cell Membrane */}
      <rect 
        x="40" 
        y="40" 
        width="320" 
        height="220" 
        fill="none" 
        stroke={colors.membrane} 
        strokeWidth="3"
        rx="6"
      />
      
      {/* Large Central Vacuole */}
      <ellipse 
        cx="200" 
        cy="150" 
        rx="120" 
        ry="80" 
        fill={colors.vacuole} 
        opacity="0.2"
      />
      <ellipse 
        cx="200" 
        cy="150" 
        rx="120" 
        ry="80" 
        fill="none" 
        stroke={colors.vacuole} 
        strokeWidth="2"
      />
      <text x="200" y="155" textAnchor="middle" fontSize="11" fill={colors.vacuole} fontWeight="500">
        Vacuola Central
      </text>
      
      {/* Chloroplasts */}
      <ellipse cx="80" cy="80" rx="25" ry="15" fill={colors.chloroplast} opacity="0.4"/>
      <ellipse cx="80" cy="80" rx="25" ry="15" fill="none" stroke={colors.chloroplast} strokeWidth="2"/>
      <line x1="65" y1="80" x2="95" y2="80" stroke={colors.chloroplast} strokeWidth="1.5"/>
      <line x1="70" y1="75" x2="90" y2="75" stroke={colors.chloroplast} strokeWidth="1"/>
      <line x1="70" y1="85" x2="90" y2="85" stroke={colors.chloroplast} strokeWidth="1"/>
      
      <ellipse cx="320" cy="90" rx="25" ry="15" fill={colors.chloroplast} opacity="0.4"/>
      <ellipse cx="320" cy="90" rx="25" ry="15" fill="none" stroke={colors.chloroplast} strokeWidth="2"/>
      <line x1="305" y1="90" x2="335" y2="90" stroke={colors.chloroplast} strokeWidth="1.5"/>
      <line x1="310" y1="85" x2="330" y2="85" stroke={colors.chloroplast} strokeWidth="1"/>
      <line x1="310" y1="95" x2="330" y2="95" stroke={colors.chloroplast} strokeWidth="1"/>
      
      {/* Nucleus */}
      <ellipse cx="100" cy="200" rx="35" ry="30" fill={colors.nucleus} opacity="0.3"/>
      <ellipse cx="100" cy="200" rx="35" ry="30" fill="none" stroke={colors.nucleus} strokeWidth="2"/>
      <circle cx="100" cy="200" r="8" fill={colors.nucleus} opacity="0.5"/>
      <text x="100" y="205" textAnchor="middle" fontSize="9" fill={colors.nucleus} fontWeight="500">
        Núcleo
      </text>
      
      {/* Mitochondria */}
      <ellipse cx="300" cy="210" rx="20" ry="12" fill={colors.mitochondria} opacity="0.3"/>
      <ellipse cx="300" cy="210" rx="20" ry="12" fill="none" stroke={colors.mitochondria} strokeWidth="2"/>
      <path d="M 285 210 Q 290 205 295 210 Q 300 215 305 210 Q 310 205 315 210" 
            fill="none" stroke={colors.mitochondria} strokeWidth="1.5"/>
      
      <ellipse cx="280" cy="240" rx="20" ry="12" fill={colors.mitochondria} opacity="0.3"/>
      <ellipse cx="280" cy="240" rx="20" ry="12" fill="none" stroke={colors.mitochondria} strokeWidth="2"/>
      <path d="M 265 240 Q 270 235 275 240 Q 280 245 285 240 Q 290 235 295 240" 
            fill="none" stroke={colors.mitochondria} strokeWidth="1.5"/>
      
      {/* Labels */}
      <text x="200" y="20" textAnchor="middle" fontSize="12" fill={colors.cellWall} fontWeight="600">
        Célula Vegetal
      </text>
      
      <g transform="translate(20, 280)">
        <rect x="0" y="-5" width="15" height="10" fill="none" stroke={colors.cellWall} strokeWidth="2"/>
        <text x="20" y="4" fontSize="9" fill={colors.cellWall}>Pared Celular</text>
        
        <ellipse cx="100" cy="0" rx="8" ry="5" fill={colors.chloroplast} opacity="0.4"/>
        <text x="115" y="4" fontSize="9" fill={colors.chloroplast}>Cloroplastos</text>
        
        <ellipse cx="200" cy="0" rx="10" ry="6" fill={colors.vacuole} opacity="0.3"/>
        <text x="215" y="4" fontSize="9" fill={colors.vacuole}>Vacuola Central</text>
        
        <ellipse cx="300" cy="0" rx="8" ry="5" fill={colors.mitochondria} opacity="0.3"/>
        <text x="315" y="4" fontSize="9" fill={colors.mitochondria}>Mitocondrias</text>
      </g>
    </svg>
  );
}
