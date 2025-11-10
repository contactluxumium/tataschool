import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-04-04',
  title: {
    fr: 'Nombres Entiers : Les Quatre Opérations',
    ar: 'الأعداد الصحيحة: العمليات الأربع',
  },
  questions: [
    {
      id: 'q-04-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Calcule : 2000 + 3500.',
        ar: 'احسب : 2000 + 3500.',
      },
      mathExpression: '2000 + 3500',
      options: [
        { fr: '5000', ar: '٥٠٠٠' },
        { fr: '5500', ar: '٥٥٠٠' },
        { fr: '6000', ar: '٦٠٠٠' },
      ],
      correctAnswer: { fr: '5500', ar: '٥٥٠٠' },
    },
  ],
};