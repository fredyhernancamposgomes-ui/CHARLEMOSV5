import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  viewMode: 'intuitive' | 'precision';
}

export default function MarkdownRenderer({ content, viewMode }: MarkdownRendererProps) {
  const isIntuitive = viewMode === 'intuitive';
  
  // Premium color palette - vibrant but soft
  const colors = {
    primary: isIntuitive ? '#10B981' : '#10B981',
    secondary: isIntuitive ? '#3B82F6' : '#3B82F6',
    warm: isIntuitive ? '#F59E0B' : '#F59E0B',
    cool: isIntuitive ? '#8B5CF6' : '#8B5CF6',
    
    text: isIntuitive ? '#111827' : '#F9FAFB',
    textSecondary: isIntuitive ? '#6B7280' : '#9CA3AF',
    textMuted: isIntuitive ? '#9CA3AF' : '#6B7280',
    
    border: isIntuitive ? '#E5E7EB' : '#334155',
    surface: isIntuitive ? '#FFFFFF' : '#1E293B',
    bg: isIntuitive ? '#FAFBFC' : '#0F172A',
  };

  return (
    <div className="prose prose-sm max-w-none" style={{ color: colors.text }}>
      <ReactMarkdown
        components={{
          // H1 - Main title, prominent but elegant
          h1: ({node, ...props}) => (
            <h1 
              className="text-2xl sm:text-3xl font-bold mb-4 mt-8 first:mt-0 tracking-tight"
              style={{ 
                color: colors.text,
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
              {...props}
            />
          ),
          
          // H2 - Section headers, clear hierarchy
          h2: ({node, ...props}) => (
            <h2 
              className="text-xl sm:text-2xl font-semibold mb-3 mt-7 tracking-tight"
              style={{ 
                color: colors.text,
                letterSpacing: '-0.01em',
                lineHeight: 1.3
              }}
              {...props}
            />
          ),
          
          // H3 - Subsections
          h3: ({node, ...props}) => (
            <h3 
              className="text-lg sm:text-xl font-semibold mb-2 mt-6"
              style={{ 
                color: colors.textSecondary,
                lineHeight: 1.4
              }}
              {...props}
            />
          ),
          
          // H4 - Minor headers
          h4: ({node, ...props}) => (
            <h4 
              className="text-base sm:text-lg font-semibold mb-2 mt-5"
              style={{ 
                color: colors.textSecondary,
                lineHeight: 1.4
              }}
              {...props}
            />
          ),
          
          // Paragraphs - Comfortable reading
          p: ({node, ...props}) => (
            <p 
              className="mb-4 leading-relaxed"
              style={{ 
                color: colors.text,
                lineHeight: 1.7,
                fontSize: '0.95rem'
              }}
              {...props}
            />
          ),
          
          // Strong - Vibrant accent
          strong: ({node, ...props}) => (
            <strong 
              className="font-semibold"
              style={{ 
                color: colors.primary,
                fontWeight: 600
              }}
              {...props}
            />
          ),
          
          // Emphasis - Subtle
          em: ({node, ...props}) => (
            <em 
              className="italic"
              style={{ color: colors.textSecondary }}
              {...props}
            />
          ),
          
          // Unordered lists - Clean bullets
          ul: ({node, ...props}) => (
            <ul 
              className="mb-4 pl-5 space-y-2"
              style={{ color: colors.text }}
              {...props} 
            />
          ),
          
          li: ({node, ...props}) => (
            <li 
              className="leading-relaxed"
              style={{ lineHeight: 1.7 }}
              {...props} 
            />
          ),
          
          // Ordered lists - Clear numbers
          ol: ({node, ...props}) => (
            <ol 
              className="mb-4 pl-5 space-y-2 list-decimal"
              style={{ color: colors.text }}
              {...props} 
            />
          ),
          
          // Inline code - Premium look
          code: ({node, inline, ...props}: any) => {
            if (inline) {
              return (
                <code 
                  className="px-1.5 py-0.5 rounded font-mono text-sm"
                  style={{ 
                    backgroundColor: isIntuitive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.15)',
                    color: colors.primary,
                    fontSize: '0.875em'
                  }}
                  {...props}
                />
              );
            }
            return (
              <code 
                className="block p-4 rounded-lg font-mono text-sm overflow-x-auto"
                style={{ 
                  backgroundColor: isIntuitive ? '#F9FAFB' : '#0F172A',
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  lineHeight: 1.6
                }}
                {...props}
              />
            );
          },
          
          // Code blocks
          pre: ({node, ...props}) => (
            <pre 
              className="mb-4 overflow-x-auto"
              style={{ 
                backgroundColor: isIntuitive ? '#F9FAFB' : '#0F172A',
                borderRadius: '0.75rem'
              }}
              {...props} 
            />
          ),
          
          // Blockquotes - Elegant callouts
          blockquote: ({node, ...props}) => (
            <blockquote 
              className="border-l-4 pl-4 py-3 my-5 rounded-r-lg"
              style={{ 
                borderLeftColor: colors.primary,
                backgroundColor: isIntuitive ? 'rgba(16, 185, 129, 0.05)' : 'rgba(16, 185, 129, 0.08)',
                color: colors.textSecondary,
                fontStyle: 'italic'
              }}
              {...props}
            />
          ),
          
          // Horizontal rules - Subtle dividers
          hr: ({node, ...props}) => (
            <hr 
              className="my-8"
              style={{ 
                borderColor: colors.border,
                borderWidth: '1px 0 0 0'
              }}
              {...props}
            />
          ),
          
          // Links - Vibrant but not aggressive
          a: ({node, ...props}) => (
            <a 
              className="font-medium transition-colors hover:opacity-80"
              style={{ 
                color: colors.secondary,
                textDecoration: 'underline',
                textDecorationColor: 'rgba(59, 130, 246, 0.3)',
                textUnderlineOffset: '2px'
              }}
              {...props}
            />
          ),
          
          // Tables - Premium and readable
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-6 rounded-lg" style={{ border: `1px solid ${colors.border}` }}>
              <table 
                className="min-w-full border-collapse"
                {...props}
              />
            </div>
          ),
          thead: ({node, ...props}) => (
            <thead 
              style={{ 
                backgroundColor: isIntuitive ? '#F9FAFB' : '#0F172A'
              }}
              {...props}
            />
          ),
          th: ({node, ...props}) => (
            <th 
              className="px-4 py-3 text-left font-semibold text-sm"
              style={{ 
                color: colors.text,
                borderBottom: `2px solid ${colors.border}`
              }}
              {...props}
            />
          ),
          td: ({node, ...props}) => (
            <td 
              className="px-4 py-3 text-sm"
              style={{ 
                color: colors.textSecondary,
                borderBottom: `1px solid ${colors.border}`
              }}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
