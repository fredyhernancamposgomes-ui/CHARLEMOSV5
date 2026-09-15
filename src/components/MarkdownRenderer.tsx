import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  viewMode: 'intuitive' | 'precision';
}

export default function MarkdownRenderer({ content, viewMode }: MarkdownRendererProps) {
  const isIntuitive = viewMode === 'intuitive';
  
  const accentColor = isIntuitive ? '#10B981' : '#3B82F6';
  const textColor = isIntuitive ? 'text-gray-700' : 'text-gray-300';

  return (
    <div className={`prose prose-sm max-w-none ${textColor}`}>
      <ReactMarkdown
        components={{
          // Títulos
          h1: ({node, ...props}) => (
            <h1 
              className="text-2xl font-bold mb-4 mt-6 first:mt-0"
              style={{ color: accentColor }}
              {...props}
            />
          ),
          h2: ({node, ...props}) => (
            <h2 
              className="text-xl font-bold mb-3 mt-5"
              style={{ color: accentColor }}
              {...props}
            />
          ),
          h3: ({node, ...props}) => (
            <h3 
              className="text-lg font-semibold mb-2 mt-4"
              style={{ color: accentColor }}
              {...props}
            />
          ),
          h4: ({node, ...props}) => (
            <h4 
              className="text-base font-semibold mb-2 mt-3"
              style={{ color: accentColor }}
              {...props}
            />
          ),
          
          // Párrafos
          p: ({node, ...props}) => (
            <p className="mb-3 leading-relaxed" {...props} />
          ),
          
          // Negritas
          strong: ({node, ...props}) => (
            <strong 
              className="font-semibold"
              style={{ color: accentColor }}
              {...props}
            />
          ),
          
          // Cursivas
          em: ({node, ...props}) => (
            <em className="italic" {...props} />
          ),
          
          // Listas no ordenadas
          ul: ({node, ...props}) => (
            <ul className="mb-3 pl-5 space-y-1" {...props} />
          ),
          li: ({node, ...props}) => (
            <li className="leading-relaxed" {...props} />
          ),
          
          // Listas ordenadas
          ol: ({node, ...props}) => (
            <ol className="mb-3 pl-5 space-y-1 list-decimal" {...props} />
          ),
          
          // Código inline
          code: ({node, inline, ...props}: any) => {
            if (inline) {
              return (
                <code 
                  className={`px-1.5 py-0.5 rounded text-sm font-mono ${
                    isIntuitive ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#3B82F6]/10 text-[#3B82F6]'
                  }`}
                  {...props}
                />
              );
            }
            return (
              <code 
                className={`block p-3 rounded-lg text-sm font-mono overflow-x-auto ${
                  isIntuitive ? 'bg-gray-50 text-gray-800' : 'bg-[#0F172A] text-gray-200'
                }`}
                {...props}
              />
            );
          },
          
          // Bloques de código
          pre: ({node, ...props}) => (
            <pre className="mb-3 overflow-x-auto" {...props} />
          ),
          
          // Citas/Callouts
          blockquote: ({node, ...props}) => (
            <blockquote 
              className={`border-l-4 pl-4 py-2 my-4 italic ${
                isIntuitive 
                  ? 'border-[#10B981] bg-[#10B981]/5 text-gray-700' 
                  : 'border-[#3B82F6] bg-[#3B82F6]/5 text-gray-300'
              }`}
              {...props}
            />
          ),
          
          // Separadores
          hr: ({node, ...props}) => (
            <hr 
              className={`my-6 ${isIntuitive ? 'border-gray-200' : 'border-[#334155]'}`}
              {...props}
            />
          ),
          
          // Enlaces
          a: ({node, ...props}) => (
            <a 
              className="underline font-medium transition-colors hover:opacity-80"
              style={{ color: accentColor }}
              {...props}
            />
          ),
          
          // Tablas
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-4">
              <table 
                className={`min-w-full border-collapse ${
                  isIntuitive ? 'border border-gray-200' : 'border border-[#334155]'
                }`}
                {...props}
              />
            </div>
          ),
          thead: ({node, ...props}) => (
            <thead 
              className={isIntuitive ? 'bg-gray-50' : 'bg-[#0F172A]'}
              {...props}
            />
          ),
          th: ({node, ...props}) => (
            <th 
              className={`px-4 py-2 text-left font-semibold border ${
                isIntuitive ? 'border-gray-200 text-gray-900' : 'border-[#334155] text-gray-100'
              }`}
              {...props}
            />
          ),
          td: ({node, ...props}) => (
            <td 
              className={`px-4 py-2 border ${
                isIntuitive ? 'border-gray-200' : 'border-[#334155]'
              }`}
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
