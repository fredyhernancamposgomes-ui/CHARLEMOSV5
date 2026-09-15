// ============================================
// SERVICIO DE PROGRESO
// Guarda el progreso del estudiante en localStorage
// ============================================

export interface QuizAttempt {
  level: 'basic' | 'intermediate' | 'advanced';
  score: number;
  totalQuestions: number;
  date: string;
  passed: boolean;
}

export interface SubtemaProgress {
  subtemaId: string;
  completedPhases: string[];
  quizLevel: 'none' | 'basic' | 'intermediate' | 'advanced' | 'completed';
  quizAttempts: QuizAttempt[];
  dominated: boolean;
  lastAccess: string;
}

export interface UserProgress {
  subtemas: Record<string, SubtemaProgress>;
  totalStudyTime: number;
  lastSession: string;
}

const STORAGE_KEY = 'charlemos_progress';

// Obtener progreso completo del usuario
export function getUserProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading progress from localStorage:', error);
  }
  
  return {
    subtemas: {},
    totalStudyTime: 0,
    lastSession: new Date().toISOString()
  };
}

// Guardar progreso completo
export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
}

// Obtener progreso de un subtema específico
export function getSubtemaProgress(subtemaId: string): SubtemaProgress {
  const progress = getUserProgress();
  return progress.subtemas[subtemaId] || {
    subtemaId,
    completedPhases: [],
    quizLevel: 'none',
    quizAttempts: [],
    dominated: false,
    lastAccess: new Date().toISOString()
  };
}

// Marcar fase como completada
export function markPhaseCompleted(subtemaId: string, phase: string): void {
  const progress = getUserProgress();
  
  if (!progress.subtemas[subtemaId]) {
    progress.subtemas[subtemaId] = {
      subtemaId,
      completedPhases: [],
      quizLevel: 'none',
      quizAttempts: [],
      dominated: false,
      lastAccess: new Date().toISOString()
    };
  }
  
  const subtemaProgress = progress.subtemas[subtemaId];
  if (!subtemaProgress.completedPhases.includes(phase)) {
    subtemaProgress.completedPhases.push(phase);
  }
  subtemaProgress.lastAccess = new Date().toISOString();
  
  saveUserProgress(progress);
}

// Registrar intento de quiz
export function registerQuizAttempt(
  subtemaId: string,
  level: 'basic' | 'intermediate' | 'advanced',
  score: number,
  totalQuestions: number
): void {
  const progress = getUserProgress();
  
  if (!progress.subtemas[subtemaId]) {
    progress.subtemas[subtemaId] = {
      subtemaId,
      completedPhases: [],
      quizLevel: 'none',
      quizAttempts: [],
      dominated: false,
      lastAccess: new Date().toISOString()
    };
  }
  
  const subtemaProgress = progress.subtemas[subtemaId];
  const passed = score >= Math.ceil(totalQuestions * 0.8); // 80% para aprobar
  
  subtemaProgress.quizAttempts.push({
    level,
    score,
    totalQuestions,
    date: new Date().toISOString(),
    passed
  });
  
  // Actualizar nivel según resultado
  if (passed) {
    if (level === 'basic') {
      subtemaProgress.quizLevel = 'intermediate';
    } else if (level === 'intermediate') {
      subtemaProgress.quizLevel = 'advanced';
    } else if (level === 'advanced') {
      subtemaProgress.quizLevel = 'completed';
      subtemaProgress.dominated = true;
    }
  }
  
  subtemaProgress.lastAccess = new Date().toISOString();
  saveUserProgress(progress);
}

// Obtener estadísticas generales
export function getProgressStats(): {
  totalSubtemas: number;
  completedSubtemas: number;
  dominatedSubtemas: number;
  totalQuizAttempts: number;
} {
  const progress = getUserProgress();
  const subtemas = Object.values(progress.subtemas);
  
  return {
    totalSubtemas: subtemas.length,
    completedSubtemas: subtemas.filter(s => s.completedPhases.length > 0).length,
    dominatedSubtemas: subtemas.filter(s => s.dominated).length,
    totalQuizAttempts: subtemas.reduce((acc, s) => acc + s.quizAttempts.length, 0)
  };
}

// Resetear progreso (para testing)
export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
