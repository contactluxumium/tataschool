import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-06-01',
  title: {
    fr: 'Les Puissances',
    ar: 'القوى',
  },
  questions: [
    {
      id: 'q-06-01-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Combien font 4 au carré (4²) ?',
        ar: 'كم يساوي 4 أس 2 (4²)؟',
      },
      mathExpression: '4²',
      options: [
        { fr: '8', ar: '٨' },
        { fr: '16', ar: '١٦' },
        { fr: '42', ar: '٤٢' },
      ],
      correctAnswer: { fr: '16', ar: '١٦' },
    },
  ],
};