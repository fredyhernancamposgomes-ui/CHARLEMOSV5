import { getThemeClasses } from '../../hooks/useTheme';

interface CiliaFlagellaDiagramProps {
  viewMode: 'intuitive' | 'precision';
  className?: string;
}

export default function CiliaFlagellaDiagram({ viewMode, className = '' }: CiliaFlagellaDiagramProps) {
  const theme = getThemeClasses(viewMode);
  const isIntuitive = viewMode === 'intuitive';
  
  const colors = {
    microtubule: isIntuitive ? '#3B82F6' : '#60A5FA',
    dynein: isIntuitive ? '#8B5CF6' : '#A78BFA',
    centralPair: isIntuitive ? '#EF4444' : '#F87171',
    radialSpoke: isIntuitive ? '#F59E0B' : '#FBBF24',
    nexin: isIntuitive ? '#10B981' : '#34D399',
    basalBody: isIntuitive ? '#6B7280' : '#9CA3AF',
    membrane: isIntuitive ? '#EC4899' : '#F472B6',
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
      <text x="200" y="20" textAnchor="middle" fontSize="12" fill={colors.microtubule} fontWeight="600">
        Estructura de Cilios y Flagelos (9+2)
      </text>
      
      {/* Cross section view (left) */}
      <g transform="translate(100, 140)">
        {/* Membrane */}
        <circle cx="0" cy="0" r="70" fill="none" stroke={colors.membrane} strokeWidth="3"/>
        
        {/* 9 outer doublet microtubules */}
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 50;
          const y = Math.sin(rad) * 50;
          return (
            <g key={`doublet-${i}`} transform={`translate(${x}, ${y})`}>
              <circle cx="0" cy="0" r="8" fill={colors.microtubule} opacity="0.6"/>
              <circle cx="0" cy="0" r="8" fill="none" stroke={colors.microtubule} strokeWidth="2"/>
              <circle cx="4" cy="0" r="6" fill={colors.microtubule} opacity="0.4"/>
              <circle cx="4" cy="0" r="6" fill="none" stroke={colors.microtubule} strokeWidth="1.5"/>
              {/* Dynein arms */}
              <line x1="-6" y1="-6" x2="-10" y2="-10" stroke={colors.dynein} strokeWidth="1.5"/>
              <line x1="6" y1="-6" x2="10" y2="-10" stroke={colors.dynein} strokeWidth="1.5"/>
            </g>
          );
        })}
        
        {/* Central pair (2 microtubules) */}
        <circle cx="-8" cy="0" r="6" fill={colors.centralPair} opacity="0.6"/>
        <circle cx="-8" cy="0" r="6" fill="none" stroke={colors.centralPair} strokeWidth="2"/>
        <circle cx="8" cy="0" r="6" fill={colors.centralPair} opacity="0.6"/>
        <circle cx="8" cy="0" r="6" fill="none" stroke={colors.centralPair} strokeWidth="2"/>
        
        {/* Radial spokes */}
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 15;
          const y1 = Math.sin(rad) * 15;
          const x2 = Math.cos(rad) * 42;
          const y2 = Math.sin(rad) * 42;
          return (
            <line key={`spoke-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} 
                  stroke={colors.radialSpoke} strokeWidth="1.5" opacity="0.7"/>
          );
        })}
        
        {/* Nexin links */}
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => {
          const rad1 = (angle * Math.PI) / 180;
          const rad2 = ((angle + 40) * Math.PI) / 180;
          const x1 = Math.cos(rad1) * 55;
          const y1 = Math.sin(rad1) * 55;
          const x2 = Math.cos(rad2) * 55;
          const y2 = Math.sin(rad2) * 55;
          return (
            <line key={`nexin-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} 
                  stroke={colors.nexin} strokeWidth="1" opacity="0.5"/>
          );
        })}
        
        <text x="0" y="90" textAnchor="middle" fontSize="10" fill={colors.microtubule} fontWeight="500">
          Corte Transversal
        </text>
      </g>
      
      {/* Longitudinal view (right) */}
      <g transform="translate(280, 140)">
        {/* Membrane outline */}
        <rect x="-20" y="-80" width="40" height="160" rx="20" fill="none" stroke={colors.membrane} strokeWidth="2"/>
        
        {/* Microtubules running longitudinally */}
        {[-12, -8, -4, 0, 4, 8, 12].map((x, i) => (
          <line key={`mt-${i}`} x1={x} y1="-75" x2={x} y2="75" 
                stroke={colors.microtubule} strokeWidth="2" opacity="0.6"/>
        ))}
        
        {/* Central pair */}
        <line x1="-2" y1="-75" x2="-2" y2="75" stroke={colors.centralPair} strokeWidth="2.5"/>
        <line x1="2" y1="-75" x2="2" y2="75" stroke={colors.centralPair} strokeWidth="2.5"/>
        
        {/* Dynein arms (small bumps) */}
        {[-60, -40, -20, 0, 20, 40, 60].map((y, i) => (
          <g key={`dynein-${i}`}>
            <circle cx="-14" cy={y} r="2" fill={colors.dynein}/>
            <circle cx="14" cy={y} r="2" fill={colors.dynein}/>
          </g>
        ))}
        
        {/* Basal body at bottom */}
        <rect x="-25" y="75" width="50" height="20" rx="5" fill={colors.basalBody} opacity="0.5"/>
        <rect x="-25" y="75" width="50" height="20" rx="5" fill="none" stroke={colors.basalBody} strokeWidth="2"/>
        <text x="0" y="110" textAnchor="middle" fontSize="9" fill={colors.basalBody}>
          Cuerpo Basal
        </text>
        
        <text x="0" y="-90" textAnchor="middle" fontSize="10" fill={colors.microtubule} fontWeight="500">
          Vista Longitudinal
        </text>
      </g>
      
      {/* Labels */}
      <g transform="translate(20, 250)">
        <circle cx="0" cy="0" r="5" fill={colors.microtubule} opacity="0.6"/>
        <text x="10" y="4" fontSize="9" fill={colors.microtubule}>Microtúbulos (9 dobletes)</text>
        
        <circle cx="150" cy="0" r="5" fill={colors.centralPair} opacity="0.6"/>
        <text x="160" y="4" fontSize="9" fill={colors.centralPair}>Par central (2)</text>
        
        <circle cx="250" cy="0" r="4" fill={colors.dynein}/>
        <text x="260" y="4" fontSize="9" fill={colors.dynein}>Dineína</text>
      </g>
    </svg>
  );
}
