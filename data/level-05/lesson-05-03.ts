import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-05-03',
  title: {
    fr: 'Nombres Décimaux : Les Quatre Opérations',
    ar: 'الأعداد العشرية: العمليات الأربع',
  },
  questions: [
    {
      id: 'q-05-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Calcule : 2,5 + 4,5.',
        ar: 'احسب : 2,5 + 4,5.',
      },
      mathExpression: '2.5 + 4.5',
      options: [
        { fr: '6,0', ar: '٦,٠' },
        { fr: '6,5', ar: '٦,٥' },
        { fr: '7,0', ar: '٧,٠' },
      ],
      correctAnswer: { fr: '7,0', ar: '٧,٠' },
    },
  ],
};