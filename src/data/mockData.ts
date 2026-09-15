// ============================================
// DATOS MOCKEADOS PARA TESTING
// Estructura idéntica a lo que generará la IA
// ============================================

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  relatedPhase: 'discover' | 'explore' | 'understand' | 'master';
}

export interface ChatResponse {
  message: string;
  relatedContent?: string;
}

// ============================================
// CONTENIDO DE EJEMPLO EN MARKDOWN
// ============================================

export const mockContent: Record<string, Record<string, Record<string, string>>> = {
  'rel-general': {
    discover: {
      intuitive: `# 💡 LA IDEA CENTRAL

Si el RER es el **taller de costura** que confecciona proteínas, el REL es la **planta química** de la célula: maneja grasas, fabrica hormonas, limpia toxinas y guarda calcio.

---

## 🧠 IMAGEN MENTAL

Imagina un **laberinto de tuberías lisas** interconectadas. A diferencia de su hermano el RER (que tiene puntitos pegados), el REL no tiene ribosomas. Y como no tiene esas máquinas de coser, no pierde tiempo con proteínas: su especialidad son las **grasas, las hormonas y los filtros químicos**.

> **Dato clave:** Sin REL, no hay hormonas sexuales, no hay detoxificación, y tu corazón no latiría.`,
      precision: `# 📊 DEFINICIÓN TÉCNICA

Red de **túbulos lisos** (sin ribosomas), continuo físico del RER.

---

## ⚡ FUNCIONES PRINCIPALES

1. **Lipogénesis**
   - Fosfolípidos, colesterol, hormonas esteroideas

2. **Detoxificación**
   - Complejo enzimático **Citocromo P450**

3. **Glucogenólisis**
   - Enzima: \`glucosa-6-fosfatasa\`

4. **Almacén de Ca²⁺**
   - En músculo: **Retículo Sarcoplásmico**

---

> **Nota:** En hepatocitos es sumamente desarrollado por su función detoxificante.`
    },
    explore: {
      intuitive: `# 🏗️ ¿CÓMO ES POR DENTRO?

Imagina una **fábrica química** con diferentes departamentos:

## 📍 Estructura

- **Túbulos lisos**: Como tuberías de agua interconectadas
- **Sin ribosomas**: A diferencia del RER que tiene "puntitos"
- **Continuo del RER**: Físicamente conectado, pero funcionalmente diferente

## 🧩 Las Piezas Clave

1. **Membrana lisa**
   - Sin ribosomas adheridos
   - Contiene enzimas especializadas

2. **Enzimas del Citocromo P450**
   - El "equipo de limpieza"
   - Transforma toxinas en sustancias eliminables

3. **Bombas de calcio**
   - Guardan Ca²⁺ en su interior
   - Lo liberan cuando hay señal

---

> **Analogía:** Si el RER es el taller de costura, el REL es la planta química al lado. Están conectadas pero cada una tiene su especialidad.`,
      precision: `# 📐 ULTRAESTRUCTURA

## Componentes

| Estructura | Descripción |
|------------|-------------|
| **Túbulos** | Red de conductos curvos, diámetro ~30-60nm |
| **Membrana** | Bicapa lipídica con enzimas integradas |
| **Lumen** | Espacio interior donde se almacena Ca²⁺ |

---

## Piezas Clave

1. **Túbulos lisos**
   - Sin ribosomas 80S
   - Continuidad física con RER

2. **Citocromo P450**
   - Familia de enzimas oxidativas
   - Ancladas a la membrana

3. **Glucosa-6-fosfatasa**
   - Enzima clave en glucogenólisis
   - Exclusiva de hepatocitos

4. **Bombas de Ca²⁺ (SERCA)**
   - ATPasas que acumulan calcio
   - Especializadas en músculo`
    },
    understand: {
      intuitive: `# 🎯 ¿QUÉ HACE Y POR QUÉ IMPORTA?

## ⚡ Sus Funciones Explicadas con la Vida Real

### 1. **Fábrica de Grasas y Hormonas**

¿De dónde salen las hormonas que te hacen hombre o mujer? ¿De dónde sale el colesterol que repara tu membrana?

El REL es la **fábrica de grasas** de tu cuerpo:
- Usa colesterol como materia prima
- Fabrica hormonas esteroideas
- **Ejemplo:** La pubertad (voz grave, músculos, menstruación)

### 2. **Planta de Detoxificación**

Cuando tomas un medicamento o algo con conservantes:
- El REL del hígado las transforma químicamente
- Las vuelve solubles en agua
- Tus riñones las eliminan por orina

> **Analogía:** Es como una planta de tratamiento de aguas residuales

### 3. **Cajero de Emergencia para el Azúcar**

Cuando pasas horas sin comer:
- El REL usa la enzima \`glucosa-6-fosfatasa\`
- Libera glucosa a la sangre
- Evita que te desmayes

### 4. **Represa de Calcio**

Para que un músculo se contraiga:
- El REL libera una ráfaga de calcio
- El músculo se contrae al instante
- **Ejemplo:** Cada latido de tu corazón

---

## 🏭 Sus Nombres Según el Tejido

- **En el Hígado:** "El purificador del cuerpo"
  - Neutraliza toxinas y regula azúcar

- **En el Músculo:** Retículo Sarcoplásmico
  - Su única misión: guardar y soltar calcio

- **En las Gónadas:** "La fábrica de hormonas"
  - Produce testosterona, estrógenos, progesterona

---

💡 **¿Sabías que...?** Cuando tomas un medicamento por semanas, el REL crece para detoxificar más rápido. Por eso a veces necesitas dosis mayores.`,
      precision: `# ⚙️ FUNCIONES DETALLADAS

## 1. Lipogénesis

**Síntesis de:**
- Fosfolípidos (membranas celulares)
- Colesterol (precursor hormonal)
- Hormonas esteroideas:
  - Testosterona (testículos)
  - Estrógenos/Progesterona (ovarios)
  - Cortisol (corteza suprarrenal)

**Localización:** Gónadas, corteza suprarrenal, hepatocitos

---

## 2. Detoxificación

**Mecanismo:**
- Enzimas del **Citocromo P450**
- Oxidación de compuestos lipofílicos
- Los convierte en hidrosolubles

**Sustratos:**
- Fármacos
- Alcohol
- Pesticidas
- Toxinas metabólicas

**Localización:** Principalmente hepatocitos

---

## 3. Glucogenólisis

**Enzima clave:** \`glucosa-6-fosfatasa\`

**Proceso:**
1. Glucógeno → Glucosa-6-fosfato
2. Glucosa-6-fosfato → **Glucosa libre** (por la enzima)
3. Glucosa libre → Sangre

**Función:** Mantener glucemia basal

---

## 4. Almacén de Ca²⁺

**En músculo estriado:**
- Se especializa como **Retículo Sarcoplásmico**
- Bombas SERCA acumulan Ca²⁺
- Liberación rápida ante señal eléctrica
- Trigger de contracción muscular

---

## 📊 ¿DÓNDE PARTICIPA? (5 ejemplos)

1. **Hígado:** Detoxificación + regulación glucemia
2. **Músculo:** Contracción (Ca²⁺)
3. **Testículos/Ovarios:** Hormonas sexuales
4. **Corteza suprarrenal:** Cortisol
5. **Hepatocitos:** Síntesis de lipoproteínas`
    },
    master: {
      intuitive: `# 🧠 DOMINANDO EL REL

## 🔑 La Clave de Todo

El REL no trabaja solo. Está en **comunicación constante** con:
- El RER (de donde viene físicamente)
- El Golgi (a donde envía lípidos)
- El núcleo (que le dice qué enzimas fabricar)

> **Regla de oro:** Si el REL falla, toda la cadena de producción se afecta.

---

## ⚠️ Trampas Comunes de Examen

### ❌ Trampa 1: "¿El REL tiene ribosomas?"
**NO.** Eso es el RER. El REL es **liso**.

### ❌ Trampa 2: "¿Dónde se almacena calcio?"
En músculo: **Retículo Sarcoplásmico** (REL especializado)

### ❌ Trampa 3: "¿Qué enzima usa para detoxificar?"
**Citocromo P450**, no cualquier enzima.

---

## 📝 Resumen Mental (4 líneas)

- **Estructura:** Túbulos lisos sin ribosomas
- **Función 1:** Fabrica lípidos y hormonas
- **Función 2:** Detoxifica y regula azúcar
- **Especialización:** En músculo guarda calcio

---

## 💡 Reto Mental

**Pregunta:** Si una persona toma un medicamento durante semanas, ¿por qué el REL de sus células hepáticas se hace más grande?

**Respuesta:** Porque la célula responde al exceso de fármaco construyendo más túbulos y produciendo más Citocromo P450 para detoxificar más rápido. Es como ampliar una planta de tratamiento cuando llega más agua contaminada.`,
      precision: `# 🎯 DETALLES PARA DOMINAR

## ⚠️ TRAMPAS DE EXAMEN

### Trampa 1: REL vs RER
| Característica | REL | RER |
|----------------|-----|-----|
| Ribosomas | ❌ No | ✅ Sí |
| Estructura | Túbulos | Sacos aplanados |
| Función principal | Lípidos | Proteínas |

### Trampa 2: Nombres especiales
- **Músculo:** Retículo Sarcoplásmico
- **NO existe:** "Retículo liso muscular" (nombre incorrecto)

### Trampa 3: Enzimas clave
- Detoxificación: **Citocromo P450**
- Glucogenólisis: **Glucosa-6-fosfatasa**
- Acumulación Ca²⁺: **SERCA** (Ca²⁺-ATPasa)

---

## 📋 PREGUNTAS TÍPICAS

**P1:** ¿Qué enzima contiene el REL para liberar glucosa a la sangre?
**R:** Glucosa-6-fosfatasa

**P2:** ¿Cómo se llama el REL en el músculo?
**R:** Retículo Sarcoplásmico

**P3:** ¿Qué complejo enzimático detoxifica fármacos?
**R:** Citocromo P450

---

## 🧠 RESUMEN MENTAL

- **Estructura:** Túbulos lisos, continuo del RER
- **Lípidos:** Fosfolípidos, colesterol, hormonas esteroideas
- **Detox:** Citocromo P450 en hepatocitos
- **Ca²⁺:** Retículo Sarcoplásmico en músculo

---

## 💡 RETO MENTAL

**Pregunta:** Si un antibiótico bloquea ribosomas 70S, ¿afecta al REL?

**Respuesta:** NO. El REL tiene ribosomas 80S (eucariotas), no 70S (procariotas). Por eso algunos antibióticos matan bacterias sin dañar tus células.`
    }
  }
};

// Función para obtener contenido mockeado
export function getMockContent(
  subtemaId: string,
  phase: 'discover' | 'explore' | 'understand' | 'master',
  mode: 'intuitive' | 'precision'
): string {
  const subtemaContent = mockContent[subtemaId];
  if (!subtemaContent) {
    return `# Contenido en desarrollo\n\nEste contenido será generado por la IA cuando conectemos la API.\n\n**Fase:** ${phase}\n**Modo:** ${mode}`;
  }
  
  const phaseContent = subtemaContent[phase];
  if (!phaseContent) {
    return `# Contenido en desarrollo\n\nEste contenido será generado por la IA cuando conectemos la API.`;
  }
  
  return phaseContent[mode] || `# Contenido en desarrollo\n\nEste contenido será generado por la IA cuando conectemos la API.`;
}

// Preguntas mockeadas para el REL
export const mockQuizQuestions: Record<string, QuizQuestion[]> = {
  'rel-general': [
    {
      id: 'rel-basic-1',
      question: '¿Cuál es la metáfora central del REL?',
      options: [
        'El taller de costura de la célula',
        'La planta química de la célula',
        'El centro de control de la célula',
        'La central energética de la célula'
      ],
      correctAnswer: 1,
      explanation: 'El REL es la planta química de la célula: maneja grasas, fabrica hormonas, limpia toxinas y guarda calcio.',
      difficulty: 'basic',
      relatedPhase: 'discover'
    },
    {
      id: 'rel-basic-2',
      question: '¿Qué diferencia visualmente al REL del RER?',
      options: [
        'El REL tiene más membranas',
        'El REL no tiene ribosomas (es liso)',
        'El REL es más grande',
        'El REL está en el núcleo'
      ],
      correctAnswer: 1,
      explanation: 'El REL es una red de túbulos lisos sin ribosomas, mientras que el RER tiene sacos aplanados con ribosomas adheridos.',
      difficulty: 'basic',
      relatedPhase: 'explore'
    },
    {
      id: 'rel-basic-3',
      question: '¿Cuál de estas NO es una función del REL?',
      options: [
        'Fabricar hormonas esteroideas',
        'Detoxificar sustancias tóxicas',
        'Sintetizar proteínas',
        'Almacenar calcio'
      ],
      correctAnswer: 2,
      explanation: 'La síntesis de proteínas es función del RER (Retículo Endoplasmático Rugoso), no del REL.',
      difficulty: 'basic',
      relatedPhase: 'understand'
    },
    {
      id: 'rel-intermediate-1',
      question: '¿Por qué el REL del hígado es especialmente desarrollado?',
      options: [
        'Porque el hígado necesita fabricar muchas proteínas',
        'Porque el hígado trabaja horas extras detoxificando toxinas',
        'Porque el hígado almacena mucho calcio',
        'Porque el hígado produce muchas hormonas'
      ],
      correctAnswer: 1,
      explanation: 'El hígado es el filtro del cuerpo. El REL trabaja horas extras neutralizando toxinas (medicamentos, alcohol, pesticidas) y regulando el azúcar en la sangre.',
      difficulty: 'intermediate',
      relatedPhase: 'understand'
    },
    {
      id: 'rel-intermediate-2',
      question: '¿Qué nombre especial recibe el REL en las células musculares?',
      options: [
        'Retículo sarcoplasmático',
        'Retículo nuclear',
        'Retículo perinuclear',
        'Retículo golgiano'
      ],
      correctAnswer: 0,
      explanation: 'En las células musculares, el REL se especializa como Retículo Sarcoplasmático y su función principal es almacenar y liberar calcio para la contracción muscular.',
      difficulty: 'intermediate',
      relatedPhase: 'understand'
    },
    {
      id: 'rel-intermediate-3',
      question: '¿Qué enzima clave contiene el REL para regular el azúcar en la sangre?',
      options: [
        'ATP sintasa',
        'Glucosa-6-fosfatasa',
        'Citocromo P450',
        'Peptidil transferasa'
      ],
      correctAnswer: 1,
      explanation: 'La glucosa-6-fosfatasa "quita el seguro" al azúcar almacenada en el hígado, liberando glucosa libre a la sangre cuando tu nivel baja.',
      difficulty: 'intermediate',
      relatedPhase: 'understand'
    },
    {
      id: 'rel-advanced-1',
      question: 'Si una persona toma un medicamento durante semanas, ¿qué le pasa al REL de sus células hepáticas?',
      options: [
        'Se atrofia por el exceso de trabajo',
        'Se hipertrofia (crece) para detoxificar más rápido',
        'No cambia, mantiene su tamaño original',
        'Desaparece porque ya no es necesario'
      ],
      correctAnswer: 1,
      explanation: 'El REL del hígado crece y se multiplica para eliminar el fármaco cada vez más rápido. Es como ampliar una planta de tratamiento cuando llega más agua contaminada.',
      difficulty: 'advanced',
      relatedPhase: 'master'
    },
    {
      id: 'rel-advanced-2',
      question: '¿Cuál es la trampa común de examen sobre el REL?',
      options: [
        'Confundirlo con el aparato de Golgi',
        'Decir que tiene ribosomas (eso es el RER)',
        'Confundirlo con las mitocondrias',
        'Decir que solo existe en células animales'
      ],
      correctAnswer: 1,
      explanation: 'Trampa común: "¿El REL tiene ribosomas?" → NO, eso es el RER. El REL es liso, sin ribosomas. El RER es rugoso, con ribosomas.',
      difficulty: 'advanced',
      relatedPhase: 'master'
    },
    {
      id: 'rel-advanced-3',
      question: '¿Qué complejo enzimático del REL se encarga de la detoxificación?',
      options: [
        'ATP sintasa',
        'Complejo de Citocromo P450',
        'Rubisco',
        'DNA polimerasa'
      ],
      correctAnswer: 1,
      explanation: 'El complejo enzimático microsomal del Citocromo P450 transforma sustancias tóxicas lipófilas en sustancias solubles para que se eliminen por orina o bilis.',
      difficulty: 'advanced',
      relatedPhase: 'master'
    }
  ]
};

// Respuestas mockeadas del chat
export const mockChatResponses: Record<string, ChatResponse[]> = {
  'rel-general': [
    {
      message: 'El REL del hígado es más grande porque trabaja horas extras. Imagina una planta de tratamiento de aguas: si recibe 10 veces más contaminantes, necesitas más tuberías y más trabajadores. El REL del hígado neutraliza toxinas (medicamentos, alcohol, pesticidas) y regula el azúcar, por eso necesita más "tuberías" (túbulos) para procesar todo.',
      relatedContent: 'detoxificación'
    },
    {
      message: 'En el músculo, el REL se llama Retículo Sarcoplasmático y su única misión es guardar calcio y liberarlo cuando llega la señal del cerebro. Piensa en una represa: cuando se abren las compuertas, el agua (calcio) inunda el campo (fibra muscular) y el músculo se contrae. Sin REL, no hay latido del corazón.',
      relatedContent: 'almacenamiento de calcio'
    },
    {
      message: 'La diferencia clave es que el RER tiene ribosomas adheridos (por eso se ve "rugoso") y se dedica a fabricar proteínas. El REL no tiene ribosomas (es "liso") y se dedica a las grasas, hormonas y detoxificación. Son como dos departamentos de la misma fábrica: el RER es el taller de costura, el REL es la planta química.',
      relatedContent: 'comparación RER vs REL'
    }
  ]
};

// Función para obtener preguntas por nivel
export function getQuestionsByDifficulty(
  subtemaId: string,
  difficulty: 'basic' | 'intermediate' | 'advanced'
): QuizQuestion[] {
  const allQuestions = mockQuizQuestions[subtemaId] || [];
  return allQuestions.filter(q => q.difficulty === difficulty);
}

// Función para obtener respuesta del chat
export function getMockChatResponse(subtemaId: string, _question: string): string {
  const responses = mockChatResponses[subtemaId] || [];
  if (responses.length === 0) {
    return 'Esta es una pregunta interesante. Cuando conectemos la API de IA, podré darte una respuesta personalizada basada en el contenido completo del tema. Por ahora, te recomiendo revisar la fase "Comprender" para profundizar en este concepto.';
  }
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  return randomResponse.message;
}
