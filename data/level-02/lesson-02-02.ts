import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-02-02',
  title: {
    fr: 'La Multiplication',
    ar: 'الضرب',
  },
  questions: [
    {
      id: 'q-02-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Combien font 3 × 5 ?',
        ar: 'كم يساوي 3 × 5 ؟',
      },
      mathExpression: '3 × 5',
      options: [
        { fr: '8', ar: '٨' },
        { fr: '12', ar: '١٢' },
        { fr: '15', ar: '١٥' },
      ],
      correctAnswer: { fr: '15', ar: '١٥' },
    },
  ],
};