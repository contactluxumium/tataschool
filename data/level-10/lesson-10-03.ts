import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-10-03',
  title: {
    fr: 'Équations du Second Degré',
    ar: 'معادلات من الدرجة الثانية',
  },
  questions: [
    {
      id: 'q-10-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Pour résoudre une équation du second degré, on calcule d\'abord le...',
        ar: 'لحل معادلة من الدرجة الثانية، نحسب أولاً...',
      },
      options: [
        { fr: 'discriminant', ar: 'المميز' },
        { fr: 'rayon', ar: 'الشعاع' },
        { fr: 'périmètre', ar: 'المحيط' },
      ],
      correctAnswer: { fr: 'discriminant', ar: 'المميز' },
    },
  ],
};