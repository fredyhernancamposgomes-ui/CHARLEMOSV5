import { getThemeClasses } from '../../hooks/useTheme';

interface MembraneDiagramProps {
  viewMode: 'intuitive' | 'precision';
  className?: string;
}

export default function MembraneDiagram({ viewMode, className = '' }: MembraneDiagramProps) {
  const theme = getThemeClasses(viewMode);
  const isIntuitive = viewMode === 'intuitive';
  
  const colors = {
    phospholipid: isIntuitive ? '#3B82F6' : '#60A5FA',
    hydrophilic: isIntuitive ? '#1D4ED8' : '#3B82F6',
    hydrophobic: isIntuitive ? '#F59E0B' : '#FBBF24',
    protein: isIntuitive ? '#8B5CF6' : '#A78BFA',
    cholesterol: isIntuitive ? '#10B981' : '#34D399',
    glycoprotein: isIntuitive ? '#EC4899' : '#F472B6',
    background: isIntuitive ? '#F9FAFB' : '#1E293B',
  };

  return (
    <svg 
      viewBox="0 0 400 250" 
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="250" fill={colors.background} rx="12"/>
      
      {/* Title */}
      <text x="200" y="20" textAnchor="middle" fontSize="12" fill={colors.phospholipid} fontWeight="600">
        Membrana Plasmática - Modelo Mosaico Fluido
      </text>
      
      {/* Upper leaflet - phospholipid heads */}
      <g>
        {[40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360].map((x, i) => (
          <circle key={`head-top-${i}`} cx={x} cy="70" r="8" fill={colors.hydrophilic} opacity="0.8"/>
        ))}
      </g>
      
      {/* Upper leaflet - phospholipid tails */}
      <g>
        {[40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360].map((x, i) => (
          <g key={`tail-top-${i}`}>
            <line x1={x-2} y1="78" x2={x-2} y2="110" stroke={colors.hydrophobic} strokeWidth="2"/>
            <line x1={x+2} y1="78" x2={x+2} y2="110" stroke={colors.hydrophobic} strokeWidth="2"/>
          </g>
        ))}
      </g>
      
      {/* Lower leaflet - phospholipid tails */}
      <g>
        {[40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360].map((x, i) => (
          <g key={`tail-bottom-${i}`}>
            <line x1={x-2} y1="140" x2={x-2} y2="172" stroke={colors.hydrophobic} strokeWidth="2"/>
            <line x1={x+2} y1="140" x2={x+2} y2="172" stroke={colors.hydrophobic} strokeWidth="2"/>
          </g>
        ))}
      </g>
      
      {/* Lower leaflet - phospholipid heads */}
      <g>
        {[40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360].map((x, i) => (
          <circle key={`head-bottom-${i}`} cx={x} cy="180" r="8" fill={colors.hydrophilic} opacity="0.8"/>
        ))}
      </g>
      
      {/* Integral proteins (transmembrane) */}
      <g>
        <rect x="90" y="60" width="20" height="130" rx="10" fill={colors.protein} opacity="0.7"/>
        <rect x="90" y="60" width="20" height="130" rx="10" fill="none" stroke={colors.protein} strokeWidth="2"/>
        
        <rect x="250" y="60" width="25" height="130" rx="12" fill={colors.protein} opacity="0.7"/>
        <rect x="250" y="60" width="25" height="130" rx="12" fill="none" stroke={colors.protein} strokeWidth="2"/>
      </g>
      
      {/* Peripheral proteins */}
      <g>
        <ellipse cx="170" cy="55" rx="15" ry="10" fill={colors.protein} opacity="0.6"/>
        <ellipse cx="170" cy="55" rx="15" ry="10" fill="none" stroke={colors.protein} strokeWidth="2"/>
        
        <ellipse cx="320" cy="195" rx="18" ry="12" fill={colors.protein} opacity="0.6"/>
        <ellipse cx="320" cy="195" rx="18" ry="12" fill="none" stroke={colors.protein} strokeWidth="2"/>
      </g>
      
      {/* Cholesterol molecules */}
      <g>
        <rect x="130" y="85" width="8" height="20" rx="4" fill={colors.cholesterol} opacity="0.7"/>
        <rect x="210" y="85" width="8" height="20" rx="4" fill={colors.cholesterol} opacity="0.7"/>
        <rect x="290" y="145" width="8" height="20" rx="4" fill={colors.cholesterol} opacity="0.7"/>
        <rect x="150" y="145" width="8" height="20" rx="4" fill={colors.cholesterol} opacity="0.7"/>
      </g>
      
      {/* Glycoproteins (carbohydrate chains) */}
      <g>
        <line x1="100" y1="60" x2="100" y2="45" stroke={colors.glycoprotein} strokeWidth="2"/>
        <circle cx="100" cy="42" r="3" fill={colors.glycoprotein}/>
        <line x1="95" y1="45" x2="90" y2="40" stroke={colors.glycoprotein} strokeWidth="1.5"/>
        <circle cx="88" cy="38" r="2" fill={colors.glycoprotein}/>
        <line x1="105" y1="45" x2="110" y2="40" stroke={colors.glycoprotein} strokeWidth="1.5"/>
        <circle cx="112" cy="38" r="2" fill={colors.glycoprotein}/>
        
        <line x1="262" y1="60" x2="262" y2="45" stroke={colors.glycoprotein} strokeWidth="2"/>
        <circle cx="262" cy="42" r="3" fill={colors.glycoprotein}/>
        <line x1="257" y1="45" x2="252" y2="40" stroke={colors.glycoprotein} strokeWidth="1.5"/>
        <circle cx="250" cy="38" r="2" fill={colors.glycoprotein}/>
        <line x1="267" y1="45" x2="272" y2="40" stroke={colors.glycoprotein} strokeWidth="1.5"/>
        <circle cx="274" cy="38" r="2" fill={colors.glycoprotein}/>
      </g>
      
      {/* Labels */}
      <text x="20" y="50" fontSize="9" fill={colors.phospholipid} fontWeight="500">
        Exterior
      </text>
      <text x="20" y="210" fontSize="9" fill={colors.phospholipid} fontWeight="500">
        Interior
      </text>
      
      <g transform="translate(20, 230)">
        <circle cx="0" cy="0" r="5" fill={colors.hydrophilic} opacity="0.8"/>
        <text x="10" y="4" fontSize="9" fill={colors.hydrophilic}>Cabeza hidrofílica</text>
        
        <line x1="120" y1="-5" x2="120" y2="5" stroke={colors.hydrophobic} strokeWidth="2"/>
        <text x="130" y="4" fontSize="9" fill={colors.hydrophobic}>Colas hidrofóbicas</text>
        
        <rect x="240" y="-8" width="10" height="16" rx="5" fill={colors.protein} opacity="0.7"/>
        <text x="255" y="4" fontSize="9" fill={colors.protein}>Proteínas</text>
      </g>
    </svg>
  );
}
