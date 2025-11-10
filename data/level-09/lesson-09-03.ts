import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-09-03',
  title: {
    fr: 'Équations et Inéquations',
    ar: 'المعادلات والمتراجحات',
  },
  questions: [
    {
      id: 'q-09-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'La solution de 2x > 6 est...',
        ar: 'حل المتراجحة 2x > 6 هو...',
      },
      mathExpression: '2x > 6',
      options: [
        { fr: 'x > 3', ar: 'x > 3' },
        { fr: 'x < 3', ar: 'x < 3' },
        { fr: 'x > 4', ar: 'x > 4' },
      ],
      correctAnswer: { fr: 'x > 3', ar: 'x > 3' },
    },
  ],
};