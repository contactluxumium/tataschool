import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-07-03',
  title: {
    fr: 'Les Puissances',
    ar: 'القوى',
  },
  questions: [
    {
      id: 'q-07-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Que vaut 10³ ?',
        ar: 'كم يساوي 10³ ؟',
      },
      mathExpression: '10³',
      options: [
        { fr: '30', ar: '٣٠' },
        { fr: '100', ar: '١٠٠' },
        { fr: '1000', ar: '١٠٠٠' },
      ],
      correctAnswer: { fr: '1000', ar: '١٠٠٠' },
    },
  ],
};