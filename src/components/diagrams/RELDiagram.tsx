import { getThemeClasses } from '../../hooks/useTheme';

interface RELDiagramProps {
  viewMode: 'intuitive' | 'precision';
  className?: string;
}

export default function RELDiagram({ viewMode, className = '' }: RELDiagramProps) {
  const theme = getThemeClasses(viewMode);
  const isIntuitive = viewMode === 'intuitive';
  
  const colors = {
    membrane: isIntuitive ? '#10B981' : '#34D399',
    lumen: isIntuitive ? '#D1FAE5' : '#064E3B',
    enzyme: isIntuitive ? '#F59E0B' : '#FBBF24',
    calcium: isIntuitive ? '#3B82F6' : '#60A5FA',
    lipid: isIntuitive ? '#8B5CF6' : '#A78BFA',
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
      
      {/* Network of smooth tubules */}
      <g transform="translate(50, 40)">
        {/* Main tubules - smooth (no ribosomes) */}
        <path 
          d="M 0 50 Q 50 30 100 50 Q 150 70 200 50 Q 250 30 300 50" 
          fill="none" 
          stroke={colors.membrane} 
          strokeWidth="4"
          opacity="0.8"
        />
        
        <path 
          d="M 20 100 Q 70 80 120 100 Q 170 120 220 100 Q 270 80 320 100" 
          fill="none" 
          stroke={colors.membrane} 
          strokeWidth="4"
          opacity="0.8"
        />
        
        <path 
          d="M 40 150 Q 90 130 140 150 Q 190 170 240 150 Q 290 130 340 150" 
          fill="none" 
          stroke={colors.membrane} 
          strokeWidth="4"
          opacity="0.8"
        />
        
        {/* Connecting tubules */}
        <path 
          d="M 100 50 Q 110 75 120 100" 
          fill="none" 
          stroke={colors.membrane} 
          strokeWidth="3"
          opacity="0.6"
        />
        
        <path 
          d="M 200 50 Q 210 75 220 100" 
          fill="none" 
          stroke={colors.membrane} 
          strokeWidth="3"
          opacity="0.6"
        />
        
        <path 
          d="M 120 100 Q 130 125 140 150" 
          fill="none" 
          stroke={colors.membrane} 
          strokeWidth="3"
          opacity="0.6"
        />
        
        {/* Enzymes (Citocromo P450) */}
        <circle cx="75" cy="40" r="5" fill={colors.enzyme} opacity="0.8"/>
        <circle cx="175" cy="60" r="5" fill={colors.enzyme} opacity="0.8"/>
        <circle cx="275" cy="40" r="5" fill={colors.enzyme} opacity="0.8"/>
        
        {/* Calcium ions (Ca²⁺) stored in lumen */}
        <circle cx="50" cy="50" r="3" fill={colors.calcium}/>
        <circle cx="150" cy="50" r="3" fill={colors.calcium}/>
        <circle cx="250" cy="50" r="3" fill={colors.calcium}/>
        <circle cx="90" cy="100" r="3" fill={colors.calcium}/>
        <circle cx="190" cy="100" r="3" fill={colors.calcium}/>
        
        {/* Lipids being synthesized */}
        <ellipse cx="120" cy="150" rx="8" ry="4" fill={colors.lipid} opacity="0.7"/>
        <ellipse cx="220" cy="150" rx="8" ry="4" fill={colors.lipid} opacity="0.7"/>
      </g>
      
      {/* Labels */}
      <text x="200" y="25" textAnchor="middle" fontSize="12" fill={colors.membrane} fontWeight="600">
        Retículo Endoplasmático Liso (REL)
      </text>
      
      <g transform="translate(20, 220)">
        <path d="M 0 0 L 20 0" stroke={colors.membrane} strokeWidth="4"/>
        <text x="30" y="4" fontSize="10" fill={colors.membrane}>Túbulos lisos</text>
        
        <circle cx="120" cy="0" r="5" fill={colors.enzyme} opacity="0.8"/>
        <text x="135" y="4" fontSize="10" fill={colors.enzyme}>Enzimas (C P450)</text>
        
        <circle cx="240" cy="0" r="3" fill={colors.calcium}/>
        <text x="250" y="4" fontSize="10" fill={colors.calcium}>Ca²⁺</text>
      </g>
    </svg>
  );
}
