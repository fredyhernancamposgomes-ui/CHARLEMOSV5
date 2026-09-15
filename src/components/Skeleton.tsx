import { getThemeClasses } from '../hooks/useTheme';

interface SkeletonProps {
  className?: string;
  viewMode: 'intuitive' | 'precision';
}

export default function Skeleton({ className = '', viewMode }: SkeletonProps) {
  return (
    <div className={`skeleton ${className}`} />
  );
}

export function CardSkeleton({ viewMode }: { viewMode: 'intuitive' | 'precision' }) {
  const theme = getThemeClasses(viewMode);
  
  return (
    <div className={`p-5 rounded-xl border ${theme.card}`}>
      <Skeleton viewMode={viewMode} className="w-12 h-12 rounded-full mb-3" />
      <Skeleton viewMode={viewMode} className="w-3/4 h-5 mb-2" />
      <Skeleton viewMode={viewMode} className="w-1/2 h-4" />
    </div>
  );
}

export function ContentSkeleton({ viewMode }: { viewMode: 'intuitive' | 'precision' }) {
  const theme = getThemeClasses(viewMode);
  
  return (
    <div className={`p-6 rounded-xl border ${theme.card}`}>
      <Skeleton viewMode={viewMode} className="w-1/3 h-6 mb-4" />
      <Skeleton viewMode={viewMode} className="w-full h-4 mb-2" />
      <Skeleton viewMode={viewMode} className="w-full h-4 mb-2" />
      <Skeleton viewMode={viewMode} className="w-5/6 h-4 mb-4" />
      <Skeleton viewMode={viewMode} className="w-2/3 h-4 mb-2" />
      <Skeleton viewMode={viewMode} className="w-full h-4 mb-2" />
      <Skeleton viewMode={viewMode} className="w-4/5 h-4" />
    </div>
  );
}

export function ListSkeleton({ count = 3, viewMode }: { count?: number; viewMode: 'intuitive' | 'precision' }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} viewMode={viewMode} />
      ))}
    </div>
  );
}
