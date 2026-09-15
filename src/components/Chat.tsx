import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';
import { getMockChatResponse } from '../data/mockData';

interface ChatProps {
  subtemaId: string;
  subtemaTitle: string;
  viewMode: 'intuitive' | 'precision';
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chat({ subtemaId, subtemaTitle, viewMode, onClose }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `¡Hola! 👋 Estoy aquí para resolver tus dudas sobre "${subtemaTitle}". ¿Qué no te quedó claro?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const response = getMockChatResponse(subtemaId, userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4"
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`w-full sm:max-w-2xl h-full sm:h-[80vh] flex flex-col sm:rounded-2xl shadow-2xl overflow-hidden ${
          viewMode === 'intuitive' ? 'bg-white' : 'bg-[#1E293B]'
        }`}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b ${
          viewMode === 'intuitive' ? 'bg-white border-gray-200' : 'bg-[#1E293B] border-[#334155]'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${
                viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
              }`}>
                💬 Chat de Dudas
              </h2>
              <p className={`text-sm ${
                viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Tema: {subtemaTitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'intuitive' ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-[#334155] text-gray-400'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'assistant'
                    ? viewMode === 'intuitive' ? 'bg-[#10B981]/10' : 'bg-[#3B82F6]/10'
                    : viewMode === 'intuitive' ? 'bg-gray-200' : 'bg-[#334155]'
                }`}>
                  {message.role === 'assistant' ? (
                    <Bot className={`w-5 h-5 ${
                      viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
                    }`} />
                  ) : (
                    <User className={`w-5 h-5 ${
                      viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'
                    }`} />
                  )}
                </div>
                <div className={`flex-1 max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? viewMode === 'intuitive'
                      ? 'bg-[#10B981] text-white'
                      : 'bg-[#3B82F6] text-white'
                    : viewMode === 'intuitive'
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-[#0F172A] text-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.role === 'user'
                      ? 'text-white/70'
                      : viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                viewMode === 'intuitive' ? 'bg-[#10B981]/10' : 'bg-[#3B82F6]/10'
              }`}>
                <Bot className={`w-5 h-5 ${
                  viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
                }`} />
              </div>
              <div className={`p-4 rounded-2xl ${
                viewMode === 'intuitive' ? 'bg-gray-100' : 'bg-[#0F172A]'
              }`}>
                <div className="flex gap-1">
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    viewMode === 'intuitive' ? 'bg-[#10B981]' : 'bg-[#3B82F6]'
                  }`} style={{ animationDelay: '0ms' }} />
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    viewMode === 'intuitive' ? 'bg-[#10B981]' : 'bg-[#3B82F6]'
                  }`} style={{ animationDelay: '150ms' }} />
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    viewMode === 'intuitive' ? 'bg-[#10B981]' : 'bg-[#3B82F6]'
                  }`} style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`px-6 py-4 border-t ${
          viewMode === 'intuitive' ? 'bg-white border-gray-200' : 'bg-[#1E293B] border-[#334155]'
        }`}>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta..."
              disabled={isLoading}
              className={`flex-1 px-4 py-3 rounded-xl border outline-none transition-all ${
                viewMode === 'intuitive'
                  ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#10B981]'
                  : 'bg-[#0F172A] border-[#334155] text-gray-100 placeholder-gray-500 focus:border-[#3B82F6]'
              }`}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                viewMode === 'intuitive'
                  ? 'bg-[#10B981] text-white hover:bg-[#059669]'
                  : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className={`text-xs mt-2 ${
            viewMode === 'intuitive' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            💡 Cuando conectemos la API de IA, las respuestas serán personalizadas según el contenido del tema.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
