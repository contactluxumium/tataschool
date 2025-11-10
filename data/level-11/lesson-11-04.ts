import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-11-04',
  title: {
    fr: 'Principes de Logique',
    ar: 'مبادئ في المنطق',
  },
  questions: [
    {
      id: 'q-11-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est la négation de "il pleut" ?',
        ar: 'ما هو نفي عبارة "إنها تمطر"؟',
      },
      options: [
        { fr: 'il neige', ar: 'إنها تثلج' },
        { fr: 'il ne pleut pas', ar: 'إنها لا تمطر' },
        { fr: 'il fait beau', ar: 'الجو جميل' },
      ],
      correctAnswer: { fr: 'il ne pleut pas', ar: 'إنها لا تمطر' },
    },
  ],
};