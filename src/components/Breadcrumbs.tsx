import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { getThemeClasses } from '../hooks/useTheme';

interface BreadcrumbItem {
  label: string;
  emoji?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  viewMode: 'intuitive' | 'precision';
}

export default function Breadcrumbs({ items, viewMode }: BreadcrumbsProps) {
  const theme = getThemeClasses(viewMode);
  
  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 overflow-x-auto scrollbar-hide"
    >
      <div className="flex items-center gap-1 text-xs whitespace-nowrap">
        {/* Home */}
        {items.length > 1 && (
          <button
            onClick={items[0]?.onClick}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${theme.surfaceHover} ${theme.textMuted}`}
          >
            <Home className="w-3 h-3" />
          </button>
        )}
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className={`w-3 h-3 flex-shrink-0 ${theme.textMuted}`} />
            )}
            <button
              onClick={item.onClick}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                index === items.length - 1
                  ? `${theme.accentLight} ${theme.accent} font-medium`
                  : `${theme.surfaceHover} ${theme.textSecondary}`
              }`}
            >
              {item.emoji && <span className="text-sm">{item.emoji}</span>}
              <span className="max-w-[100px] sm:max-w-[150px] truncate">{item.label}</span>
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
