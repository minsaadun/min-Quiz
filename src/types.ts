export type QuestionCount = 5 | 10 | 15 | 20;

export type DifficultyLevel = 'Mudah' | 'Sederhana' | 'Campuran';

export type QuizLanguage = 'Bahasa Melayu' | 'Bahasa Inggeris' | 'Dwibahasa';

export interface QuizFormData {
  subject: string;
  title: string;
  gradeLevel: string;
  objective: string;
  questionCount: QuestionCount;
  difficulty: DifficultyLevel;
  language: QuizLanguage;
  notes: string;
  // Post-quiz options
  showScoreAndPercentage: boolean; // Always true
  showCorrectAnswers: boolean;    // Default true
  showExplanation: boolean;       // Default true
  allowRetry: boolean;            // Default true
}

export interface ValidationErrors {
  subject?: string;
  title?: string;
  gradeLevel?: string;
}

export const INITIAL_FORM_DATA: QuizFormData = {
  subject: '',
  title: '',
  gradeLevel: '',
  objective: '',
  questionCount: 10,
  difficulty: 'Sederhana',
  language: 'Bahasa Melayu',
  notes: '',
  showScoreAndPercentage: true,
  showCorrectAnswers: true,
  showExplanation: true,
  allowRetry: true,
};

export const EXAMPLE_FORM_DATA: QuizFormData = {
  subject: 'Pendidikan Islam',
  title: 'Adab terhadap ibu bapa',
  gradeLevel: 'Tahun 5',
  objective: 'Mengenal pasti amalan beradab terhadap ibu bapa dalam kehidupan harian.',
  questionCount: 5,
  difficulty: 'Mudah',
  language: 'Bahasa Melayu',
  notes:
    'Amalan beradab terhadap ibu bapa merangkumi:\n1. Bercakap dengan sopan, lemah lembut dan menggunakan nada rendah.\n2. Mendengar nasihat dan tunjuk ajar mereka dengan tekun dan ikhlas.\n3. Mematuhi suruhan selagi mana tidak bertentangan dengan syarak.\n4. Mendoakan kebaikan, keampunan dan kesejahteraan untuk mereka setiap masa.\n5. Membantu meringankan tugasan harian di rumah serta menjaga kebajikan mereka sewaktu sakit.',
  showScoreAndPercentage: true,
  showCorrectAnswers: true,
  showExplanation: true,
  allowRetry: true,
};
