import { getThemeClasses } from '../../hooks/useTheme';

interface NucleusDiagramProps {
  viewMode: 'intuitive' | 'precision';
  className?: string;
}

export default function NucleusDiagram({ viewMode, className = '' }: NucleusDiagramProps) {
  const theme = getThemeClasses(viewMode);
  const isIntuitive = viewMode === 'intuitive';
  
  const colors = {
    envelope: isIntuitive ? '#8B5CF6' : '#A78BFA',
    pore: isIntuitive ? '#6D28D9' : '#7C3AED',
    chromatin: isIntuitive ? '#3B82F6' : '#60A5FA',
    nucleolus: isIntuitive ? '#EF4444' : '#F87171',
    nucleoplasm: isIntuitive ? '#DDD6FE' : '#4C1D95',
    background: isIntuitive ? '#F9FAFB' : '#1E293B',
  };

  return (
    <svg 
      viewBox="0 0 400 300" 
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="300" fill={colors.background} rx="12"/>
      
      {/* Outer nuclear membrane */}
      <ellipse 
        cx="200" 
        cy="150" 
        rx="150" 
        ry="120" 
        fill="none" 
        stroke={colors.envelope} 
        strokeWidth="4"
      />
      
      {/* Inner nuclear membrane */}
      <ellipse 
        cx="200" 
        cy="150" 
        rx="140" 
        ry="110" 
        fill="none" 
        stroke={colors.envelope} 
        strokeWidth="3"
      />
      
      {/* Nucleoplasm */}
      <ellipse 
        cx="200" 
        cy="150" 
        rx="135" 
        ry="105" 
        fill={colors.nucleoplasm} 
        opacity="0.2"
      />
      
      {/* Nuclear pores */}
      <g>
        <circle cx="100" cy="80" r="6" fill={colors.pore} opacity="0.7"/>
        <circle cx="100" cy="80" r="3" fill={colors.background}/>
        
        <circle cx="300" cy="80" r="6" fill={colors.pore} opacity="0.7"/>
        <circle cx="300" cy="80" r="3" fill={colors.background}/>
        
        <circle cx="80" cy="150" r="6" fill={colors.pore} opacity="0.7"/>
        <circle cx="80" cy="150" r="3" fill={colors.background}/>
        
        <circle cx="320" cy="150" r="6" fill={colors.pore} opacity="0.7"/>
        <circle cx="320" cy="150" r="3" fill={colors.background}/>
        
        <circle cx="120" cy="230" r="6" fill={colors.pore} opacity="0.7"/>
        <circle cx="120" cy="230" r="3" fill={colors.background}/>
        
        <circle cx="280" cy="230" r="6" fill={colors.pore} opacity="0.7"/>
        <circle cx="280" cy="230" r="3" fill={colors.background}/>
      </g>
      
      {/* Chromatin (DNA + histones) */}
      <g opacity="0.7">
        <path d="M 150 100 Q 160 90 170 100 Q 180 110 190 100 Q 200 90 210 100" 
              fill="none" stroke={colors.chromatin} strokeWidth="2.5"/>
        <path d="M 140 130 Q 150 120 160 130 Q 170 140 180 130 Q 190 120 200 130" 
              fill="none" stroke={colors.chromatin} strokeWidth="2.5"/>
        <path d="M 220 120 Q 230 110 240 120 Q 250 130 260 120" 
              fill="none" stroke={colors.chromatin} strokeWidth="2.5"/>
        <path d="M 160 170 Q 170 160 180 170 Q 190 180 200 170 Q 210 160 220 170" 
              fill="none" stroke={colors.chromatin} strokeWidth="2.5"/>
        <path d="M 230 160 Q 240 150 250 160 Q 260 170 270 160" 
              fill="none" stroke={colors.chromatin} strokeWidth="2.5"/>
        <path d="M 150 200 Q 160 190 170 200 Q 180 210 190 200" 
              fill="none" stroke={colors.chromatin} strokeWidth="2.5"/>
      </g>
      
      {/* Nucleolus */}
      <circle cx="200" cy="150" r="30" fill={colors.nucleolus} opacity="0.4"/>
      <circle cx="200" cy="150" r="30" fill="none" stroke={colors.nucleolus} strokeWidth="2.5"/>
      <circle cx="195" cy="145" r="8" fill={colors.nucleolus} opacity="0.6"/>
      <circle cx="210" cy="155" r="6" fill={colors.nucleolus} opacity="0.6"/>
      
      {/* Labels */}
      <text x="200" y="25" textAnchor="middle" fontSize="12" fill={colors.envelope} fontWeight="600">
        Núcleo Interfásico
      </text>
      
      <text x="200" y="155" textAnchor="middle" fontSize="10" fill={colors.nucleolus} fontWeight="500">
        Nucléolo
      </text>
      
      <g transform="translate(20, 275)">
        <circle cx="0" cy="0" r="5" fill={colors.pore} opacity="0.7"/>
        <circle cx="0" cy="0" r="2" fill={colors.background}/>
        <text x="12" y="4" fontSize="9" fill={colors.pore}>Poros nucleares</text>
        
        <path d="M 100 -5 Q 110 -10 120 -5" fill="none" stroke={colors.chromatin} strokeWidth="2.5"/>
        <text x="130" y="4" fontSize="9" fill={colors.chromatin}>Cromatina</text>
        
        <circle cx="220" cy="0" r="8" fill={colors.nucleolus} opacity="0.4"/>
        <text x="235" y="4" fontSize="9" fill={colors.nucleolus}>Nucléolo</text>
      </g>
    </svg>
  );
}
