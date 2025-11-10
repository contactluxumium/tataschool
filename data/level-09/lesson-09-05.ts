import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-09-05',
  title: {
    fr: 'Fonctions Linéaires et Affines',
    ar: 'الدوال الخطية والتآلفية',
  },
  questions: [
    {
      id: 'q-09-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle fonction est une fonction linéaire ?',
        ar: 'أي دالة هي دالة خطية؟',
      },
      options: [
        { fr: 'f(x) = 3x + 2', ar: 'f(x) = 3x + 2' },
        { fr: 'f(x) = 5x', ar: 'f(x) = 5x' },
        { fr: 'f(x) = x² + 1', ar: 'f(x) = x² + 1' },
      ],
      correctAnswer: { fr: 'f(x) = 5x', ar: 'f(x) = 5x' },
    },
  ],
};