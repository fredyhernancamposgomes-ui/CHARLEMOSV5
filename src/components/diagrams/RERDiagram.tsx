import { getThemeClasses } from '../../hooks/useTheme';

interface RERDiagramProps {
  viewMode: 'intuitive' | 'precision';
  className?: string;
}

export default function RERDiagram({ viewMode, className = '' }: RERDiagramProps) {
  const theme = getThemeClasses(viewMode);
  const isIntuitive = viewMode === 'intuitive';
  
  const colors = {
    membrane: isIntuitive ? '#8B5CF6' : '#A78BFA',
    ribosome: isIntuitive ? '#6D28D9' : '#7C3AED',
    lumen: isIntuitive ? '#DDD6FE' : '#4C1D95',
    protein: isIntuitive ? '#F59E0B' : '#FBBF24',
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
      
      {/* RER Membranes - Stacked cisternae */}
      <g transform="translate(50, 50)">
        {/* First cisterna */}
        <path 
          d="M 0 30 Q 50 20 150 25 Q 250 30 300 25" 
          fill="none" 
          stroke={colors.membrane} 
          strokeWidth="3"
        />
        <path 
          d="M 0 50 Q 50 60 150 55 Q 250 50 300 55" 
          fill="none" 
          stroke={colors.membrane} 
          strokeWidth="3"
        />
        
        {/* Ribosomes on top membrane */}
        {[20, 60, 100, 140, 180, 220, 260].map((x, i) => (
          <circle key={i} cx={x} cy={22} r="4" fill={colors.ribosome}/>
        ))}
        
        {/* Ribosomes on bottom membrane */}
        {[40, 80, 120, 160, 200, 240, 280].map((x, i) => (
          <circle key={i} cx={x} cy={58} r="4" fill={colors.ribosome}/>
        ))}
        
        {/* Lumen */}
        <rect x="10" y="32" width="280" height="18" fill={colors.lumen} opacity="0.3" rx="2"/>
        
        {/* Proteins being synthesized */}
        <circle cx="100" cy="40" r="6" fill={colors.protein} opacity="0.7"/>
        <circle cx="180" cy="42" r="6" fill={colors.protein} opacity="0.7"/>
        <circle cx="240" cy="38" r="6" fill={colors.protein} opacity="0.7"/>
      </g>
      
      {/* Second stack */}
      <g transform="translate(50, 130)">
        <path 
          d="M 0 30 Q 50 20 150 25 Q 250 30 300 25" 
          fill="none" 
          stroke={colors.membrane} 
          strokeWidth="3"
        />
        <path 
          d="M 0 50 Q 50 60 150 55 Q 250 50 300 55" 
          fill="none" 
          stroke={colors.membrane} 
          strokeWidth="3"
        />
        
        {[30, 70, 110, 150, 190, 230, 270].map((x, i) => (
          <circle key={i} cx={x} cy={22} r="4" fill={colors.ribosome}/>
        ))}
        
        {[20, 60, 100, 140, 180, 220, 260].map((x, i) => (
          <circle key={i} cx={x} cy={58} r="4" fill={colors.ribosome}/>
        ))}
        
        <rect x="10" y="32" width="280" height="18" fill={colors.lumen} opacity="0.3" rx="2"/>
      </g>
      
      {/* Labels */}
      <text x="200" y="30" textAnchor="middle" fontSize="12" fill={colors.membrane} fontWeight="600">
        Retículo Endoplasmático Rugoso (RER)
      </text>
      
      <g transform="translate(20, 210)">
        <circle cx="0" cy="0" r="4" fill={colors.ribosome}/>
        <text x="10" y="4" fontSize="10" fill={colors.ribosome}>Ribosomas</text>
        
        <rect x="100" y="-5" width="20" height="10" fill={colors.lumen} opacity="0.3" stroke={colors.membrane} strokeWidth="1"/>
        <text x="130" y="4" fontSize="10" fill={colors.membrane}>Lumen</text>
        
        <circle cx="200" cy="0" r="6" fill={colors.protein} opacity="0.7"/>
        <text x="215" y="4" fontSize="10" fill={colors.protein}>Proteínas</text>
      </g>
    </svg>
  );
}
