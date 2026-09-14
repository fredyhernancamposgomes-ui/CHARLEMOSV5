// ============================================
// PROMPT ENGINE v4.0: CHARLEMOS 2.0
// SISTEMA UNIFICADO DE GENERACIÓN DE CONTENIDO
// 4 Fases × 2 Modos = 8 bloques por subtema
// ============================================

// ============================================
// CATEGORÍAS DE TEMAS
// ============================================
export type TopicCategory = 
  | 'organelle'        // REL, RER, Mitocondria, Golgi...
  | 'process'          // Fagocitosis, Ósmosis, Mitosis...
  | 'structure'        // Membrana, Pared celular, Citoesqueleto...
  | 'classification'   // Autótrofas, Procariotas, Gram+...
  | 'historical'       // Hooke, Schwann, Virchow...
  | 'property';        // Fluidez, Permeabilidad, Asimetría...

// ============================================
// FASES DE APRENDIZAJE
// ============================================
export type LearningPhase = 'discover' | 'explore' | 'understand' | 'master';

// ============================================
// MODOS DE COMPRESIÓN
// ============================================
export type ViewMode = 'intuitive' | 'precision';

// ============================================
// INTERFAZ DE CONTENIDO GENERADO
// ============================================
export interface GeneratedContent {
  phase: LearningPhase;
  mode: ViewMode;
  content: string;
  wordCount: number;
  qualityScore: number; // 1-5
}

export interface SubtemaFullContent {
  subtemaId: string;
  category: TopicCategory;
  phases: {
    discover: { intuitive: GeneratedContent; precision: GeneratedContent };
    explore: { intuitive: GeneratedContent; precision: GeneratedContent };
    understand: { intuitive: GeneratedContent; precision: GeneratedContent };
    master: { intuitive: GeneratedContent; precision: GeneratedContent };
  };
  metadata: {
    totalTokens: number;
    estimatedCost: number;
    generationTime: number;
    overallScore: number;
  };
}
