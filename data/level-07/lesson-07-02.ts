import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-07-02',
  title: {
    fr: 'Opérations sur les Nombres Rationnels',
    ar: 'العمليات على الأعداد الكسرية',
  },
  questions: [
    {
      id: 'q-07-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Calcule : 1/3 + 1/3.',
        ar: 'احسب : 1/3 + 1/3.',
      },
      mathExpression: '1/3 + 1/3',
      options: [
        { fr: '1/6', ar: '١/٦' },
        { fr: '2/3', ar: '٢/٣' },
        { fr: '2/6', ar: '٢/٦' },
      ],
      correctAnswer: { fr: '2/3', ar: '٢/٣' },
    },
  ],
};