import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw } from 'lucide-react';
import { QuizQuestion, getQuestionsByDifficulty } from '../data/mockData';
import { registerQuizAttempt, getSubtemaProgress } from '../services/progressService';
import { getThemeClasses } from '../hooks/useTheme';

interface QuizProps {
  subtemaId: string;
  subtemaTitle: string;
  viewMode: 'intuitive' | 'precision';
  onClose: () => void;
}

type QuizState = 'intro' | 'question' | 'feedback' | 'results';
type Difficulty = 'basic' | 'intermediate' | 'advanced';

export default function Quiz({ subtemaId, subtemaTitle, viewMode, onClose }: QuizProps) {
  const [state, setState] = useState<QuizState>('intro');
  const [currentLevel, setCurrentLevel] = useState<Difficulty>('basic');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const progress = getSubtemaProgress(subtemaId);
    if (progress.quizLevel === 'intermediate' || progress.quizLevel === 'advanced' || progress.quizLevel === 'completed') {
      setCurrentLevel('basic');
    }
  }, [subtemaId]);

  const startQuiz = (level: Difficulty) => {
    const loadedQuestions = getQuestionsByDifficulty(subtemaId, level);
    if (loadedQuestions.length === 0) {
      alert('No hay preguntas disponibles para este tema aún. Cuando conectemos la API, se generarán automáticamente.');
      return;
    }
    setQuestions(loadedQuestions);
    setCurrentLevel(level);
    setCurrentIndex(0);
    setScore(0);
    setState('question');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const isCorrect = answerIndex === questions[currentIndex].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      registerQuizAttempt(subtemaId, currentLevel, score, questions.length);
      setState('results');
    }
  };

  const handleRetry = () => {
    setState('intro');
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const currentQuestion = questions[currentIndex];
  const progress = getSubtemaProgress(subtemaId);

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
        className={`w-full sm:max-w-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto sm:rounded-2xl shadow-2xl ${
          viewMode === 'intuitive' ? 'bg-white' : 'bg-[#1E293B]'
        }`}
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 px-6 py-4 border-b ${
          viewMode === 'intuitive' ? 'bg-white border-gray-200' : 'bg-[#1E293B] border-[#334155]'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${
                viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
              }`}>
                📝 Quiz: {subtemaTitle}
              </h2>
              <p className={`text-sm ${
                viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Nivel: {currentLevel === 'basic' ? 'Básico' : currentLevel === 'intermediate' ? 'Intermedio' : 'Avanzado'}
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

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* INTRO */}
            {state === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-4">🎯</div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                }`}>
                  ¡Pon a prueba lo aprendido!
                </h3>
                <p className={`mb-6 ${
                  viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Responde 3 preguntas para avanzar de nivel. Necesitas 80% para desbloquear el siguiente nivel.
                </p>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => startQuiz('basic')}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      viewMode === 'intuitive'
                        ? 'bg-white border-gray-200 hover:border-[#10B981]'
                        : 'bg-[#0F172A] border-[#334155] hover:border-[#3B82F6]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-semibold ${
                          viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                        }`}>
                          🌱 Nivel Básico
                        </p>
                        <p className={`text-sm ${
                          viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          Fases: Descubrir + Explorar
                        </p>
                      </div>
                      <ArrowRight className={`w-5 h-5 ${
                        viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
                      }`} />
                    </div>
                  </button>

                  <button
                    onClick={() => startQuiz('intermediate')}
                    disabled={progress.quizLevel === 'none'}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      progress.quizLevel === 'none'
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    } ${
                      viewMode === 'intuitive'
                        ? 'bg-white border-gray-200 hover:border-[#10B981]'
                        : 'bg-[#0F172A] border-[#334155] hover:border-[#3B82F6]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-semibold ${
                          viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                        }`}>
                          🔍 Nivel Intermedio
                        </p>
                        <p className={`text-sm ${
                          viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          Fase: Comprender
                        </p>
                      </div>
                      {progress.quizLevel === 'none' && <span className="text-xs">🔒</span>}
                    </div>
                  </button>

                  <button
                    onClick={() => startQuiz('advanced')}
                    disabled={progress.quizLevel !== 'advanced' && progress.quizLevel !== 'completed'}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      progress.quizLevel !== 'advanced' && progress.quizLevel !== 'completed'
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    } ${
                      viewMode === 'intuitive'
                        ? 'bg-white border-gray-200 hover:border-[#10B981]'
                        : 'bg-[#0F172A] border-[#334155] hover:border-[#3B82F6]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-semibold ${
                          viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                        }`}>
                          🧠 Nivel Avanzado
                        </p>
                        <p className={`text-sm ${
                          viewMode === 'intuitive' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          Fase: Dominar
                        </p>
                      </div>
                      {progress.quizLevel !== 'advanced' && progress.quizLevel !== 'completed' && <span className="text-xs">🔒</span>}
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* QUESTION */}
            {state === 'question' && currentQuestion && (
              <motion.div
                key={`question-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${
                      viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      Pregunta {currentIndex + 1} de {questions.length}
                    </span>
                    <span className={`text-sm font-medium ${
                      viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
                    }`}>
                      Score: {score}/{questions.length}
                    </span>
                  </div>
                  <div className={`h-2 rounded-full ${
                    viewMode === 'intuitive' ? 'bg-gray-200' : 'bg-[#334155]'
                  }`}>
                    <motion.div
                      className={`h-full rounded-full ${
                        viewMode === 'intuitive' ? 'bg-[#10B981]' : 'bg-[#3B82F6]'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className={`text-lg font-semibold mb-6 ${
                  viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                }`}>
                  {currentQuestion.question}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const showResult = showFeedback;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showFeedback}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${
                          showResult
                            ? isCorrect
                              ? viewMode === 'intuitive'
                                ? 'bg-[#10B981]/10 border-[#10B981]'
                                : 'bg-[#3B82F6]/10 border-[#3B82F6]'
                              : isSelected
                                ? 'bg-red-100 border-red-500'
                                : viewMode === 'intuitive'
                                  ? 'bg-gray-50 border-gray-200'
                                  : 'bg-[#0F172A] border-[#334155]'
                            : isSelected
                              ? viewMode === 'intuitive'
                                ? 'bg-[#10B981]/10 border-[#10B981]'
                                : 'bg-[#3B82F6]/10 border-[#3B82F6]'
                              : viewMode === 'intuitive'
                                ? 'bg-white border-gray-200 hover:border-[#10B981]'
                                : 'bg-[#0F172A] border-[#334155] hover:border-[#3B82F6]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            showResult && isCorrect
                              ? viewMode === 'intuitive' ? 'border-[#10B981] bg-[#10B981]' : 'border-[#3B82F6] bg-[#3B82F6]'
                              : showResult && isSelected && !isCorrect
                                ? 'border-red-500 bg-red-500'
                                : isSelected
                                  ? viewMode === 'intuitive' ? 'border-[#10B981]' : 'border-[#3B82F6]'
                                  : viewMode === 'intuitive' ? 'border-gray-300' : 'border-[#475569]'
                          }`}>
                            {showResult && isCorrect && <CheckCircle className="w-4 h-4 text-white" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                          </div>
                          <span className={`${
                            viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                          }`}>
                            {option}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl mb-4 ${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? viewMode === 'intuitive'
                          ? 'bg-[#10B981]/10 border border-[#10B981]/20'
                          : 'bg-[#3B82F6]/10 border border-[#3B82F6]/20'
                        : 'bg-red-100 border border-red-300'
                    }`}
                  >
                    <p className={`font-semibold mb-2 ${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
                        : 'text-red-600'
                    }`}>
                      {selectedAnswer === currentQuestion.correctAnswer ? '✅ ¡Correcto!' : '❌ Incorrecto'}
                    </p>
                    <p className={`text-sm ${
                      viewMode === 'intuitive' ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      {currentQuestion.explanation}
                    </p>
                  </motion.div>
                )}

                {/* Next button */}
                {showFeedback && (
                  <button
                    onClick={handleNext}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      viewMode === 'intuitive'
                        ? 'bg-[#10B981] text-white hover:bg-[#059669]'
                        : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                    }`}
                  >
                    {currentIndex < questions.length - 1 ? 'Siguiente pregunta →' : 'Ver resultados'}
                  </button>
                )}
              </motion.div>
            )}

            {/* RESULTS */}
            {state === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <Trophy className={`w-16 h-16 mx-auto mb-4 ${
                  score >= Math.ceil(questions.length * 0.8)
                    ? viewMode === 'intuitive' ? 'text-[#10B981]' : 'text-[#3B82F6]'
                    : 'text-yellow-500'
                }`} />
                <h3 className={`text-3xl font-bold mb-2 ${
                  viewMode === 'intuitive' ? 'text-gray-900' : 'text-gray-100'
                }`}>
                  {score >= Math.ceil(questions.length * 0.8) ? '¡Excelente!' : '¡Buen intento!'}
                </h3>
                <p className={`text-xl mb-6 ${
                  viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Score: {score}/{questions.length}
                </p>

                {score >= Math.ceil(questions.length * 0.8) ? (
                  <p className={`mb-6 ${
                    viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {currentLevel === 'basic' && '🎉 Desbloqueaste el Nivel Intermedio'}
                    {currentLevel === 'intermediate' && '🎉 Desbloqueaste el Nivel Avanzado'}
                    {currentLevel === 'advanced' && '🏆 ¡Subtema DOMINADO!'}
                  </p>
                ) : (
                  <p className={`mb-6 ${
                    viewMode === 'intuitive' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    Necesitas {Math.ceil(questions.length * 0.8)}/{questions.length} para avanzar. ¡Inténtalo de nuevo!
                  </p>
                )}

                <div className="space-y-3">
                  <button
                    onClick={handleRetry}
                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      viewMode === 'intuitive'
                        ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        : 'bg-[#334155] text-gray-100 hover:bg-[#475569]'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Intentar de nuevo
                  </button>
                  <button
                    onClick={onClose}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      viewMode === 'intuitive'
                        ? 'bg-[#10B981] text-white hover:bg-[#059669]'
                        : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                    }`}
                  >
                    Volver al tema
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
