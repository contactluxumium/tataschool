import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-08-01',
  title: {
    fr: 'Opérations sur les Nombres Rationnels',
    ar: 'العمليات على الأعداد الجذرية',
  },
  questions: [
    {
      id: 'q-08-01-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Calcule : 2/5 + 1/5.',
        ar: 'احسب : 2/5 + 1/5.',
      },
      mathExpression: '2/5 + 1/5',
      options: [
        { fr: '3/10', ar: '٣/١٠' },
        { fr: '3/5', ar: '٣/٥' },
        { fr: '2/25', ar: '٢/٢٥' },
      ],
      correctAnswer: { fr: '3/5', ar: '٣/٥' },
    },
  ],
};