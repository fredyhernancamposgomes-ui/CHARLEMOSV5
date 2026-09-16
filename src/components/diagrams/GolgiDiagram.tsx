import { getThemeClasses } from '../../hooks/useTheme';

interface GolgiDiagramProps {
  viewMode: 'intuitive' | 'precision';
  className?: string;
}

export default function GolgiDiagram({ viewMode, className = '' }: GolgiDiagramProps) {
  const theme = getThemeClasses(viewMode);
  const isIntuitive = viewMode === 'intuitive';
  
  const colors = {
    cisterna: isIntuitive ? '#F59E0B' : '#FBBF24',
    vesicle: isIntuitive ? '#D97706' : '#F59E0B',
    protein: isIntuitive ? '#8B5CF6' : '#A78BFA',
    cis: isIntuitive ? '#10B981' : '#34D399',
    trans: isIntuitive ? '#EF4444' : '#F87171',
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
      
      {/* Golgi Stack - Multiple cisternae */}
      <g transform="translate(200, 125)">
        {/* Cis face (receiving side) */}
        <ellipse cx="0" cy="-60" rx="80" ry="12" fill="none" stroke={colors.cis} strokeWidth="3"/>
        <ellipse cx="0" cy="-60" rx="80" ry="12" fill={colors.cis} opacity="0.1"/>
        
        {/* Middle cisternae */}
        <ellipse cx="0" cy="-30" rx="90" ry="14" fill="none" stroke={colors.cisterna} strokeWidth="3"/>
        <ellipse cx="0" cy="-30" rx="90" ry="14" fill={colors.cisterna} opacity="0.15"/>
        
        <ellipse cx="0" cy="0" rx="95" ry="15" fill="none" stroke={colors.cisterna} strokeWidth="3"/>
        <ellipse cx="0" cy="0" rx="95" ry="15" fill={colors.cisterna} opacity="0.2"/>
        
        <ellipse cx="0" cy="30" rx="90" ry="14" fill="none" stroke={colors.cisterna} strokeWidth="3"/>
        <ellipse cx="0" cy="30" rx="90" ry="14" fill={colors.cisterna} opacity="0.15"/>
        
        {/* Trans face (shipping side) */}
        <ellipse cx="0" cy="60" rx="80" ry="12" fill="none" stroke={colors.trans} strokeWidth="3"/>
        <ellipse cx="0" cy="60" rx="80" ry="12" fill={colors.trans} opacity="0.1"/>
        
        {/* Proteins being processed */}
        <circle cx="-40" cy="-30" r="5" fill={colors.protein} opacity="0.7"/>
        <circle cx="0" cy="0" r="5" fill={colors.protein} opacity="0.7"/>
        <circle cx="40" cy="30" r="5" fill={colors.protein} opacity="0.7"/>
        
        {/* Vesicles budding from trans face */}
        <circle cx="-60" cy="80" r="10" fill={colors.vesicle} opacity="0.6"/>
        <circle cx="-60" cy="80" r="10" fill="none" stroke={colors.vesicle} strokeWidth="2"/>
        
        <circle cx="0" cy="85" r="10" fill={colors.vesicle} opacity="0.6"/>
        <circle cx="0" cy="85" r="10" fill="none" stroke={colors.vesicle} strokeWidth="2"/>
        
        <circle cx="60" cy="80" r="10" fill={colors.vesicle} opacity="0.6"/>
        <circle cx="60" cy="80" r="10" fill="none" stroke={colors.vesicle} strokeWidth="2"/>
        
        {/* Vesicles arriving at cis face */}
        <circle cx="-50" cy="-85" r="8" fill={colors.cis} opacity="0.5"/>
        <circle cx="-50" cy="-85" r="8" fill="none" stroke={colors.cis} strokeWidth="2"/>
        
        <circle cx="0" cy="-90" r="8" fill={colors.cis} opacity="0.5"/>
        <circle cx="0" cy="-90" r="8" fill="none" stroke={colors.cis} strokeWidth="2"/>
        
        <circle cx="50" cy="-85" r="8" fill={colors.cis} opacity="0.5"/>
        <circle cx="50" cy="-85" r="8" fill="none" stroke={colors.cis} strokeWidth="2"/>
      </g>
      
      {/* Labels */}
      <text x="200" y="25" textAnchor="middle" fontSize="12" fill={colors.cisterna} fontWeight="600">
        Aparato de Golgi
      </text>
      
      <text x="100" y="70" textAnchor="middle" fontSize="9" fill={colors.cis} fontWeight="500">
        Cara CIS
      </text>
      <text x="100" y="80" textAnchor="middle" fontSize="8" fill={colors.cis}>
        (recepción)
      </text>
      
      <text x="100" y="180" textAnchor="middle" fontSize="9" fill={colors.trans} fontWeight="500">
        Cara TRANS
      </text>
      <text x="100" y="190" textAnchor="middle" fontSize="8" fill={colors.trans}>
        (envío)
      </text>
      
      <g transform="translate(280, 220)">
        <circle cx="0" cy="0" r="5" fill={colors.protein} opacity="0.7"/>
        <text x="10" y="4" fontSize="10" fill={colors.protein}>Proteínas</text>
        
        <circle cx="80" cy="0" r="8" fill={colors.vesicle} opacity="0.6"/>
        <text x="95" y="4" fontSize="10" fill={colors.vesicle}>Vesículas</text>
      </g>
    </svg>
  );
}
