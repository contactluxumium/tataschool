import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-07-04',
  title: {
    fr: 'Équations et Problèmes',
    ar: 'المعادلات والمسائل',
  },
  questions: [
    {
      id: 'q-07-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Trouve la valeur de x si x + 5 = 12.',
        ar: 'أوجد قيمة x إذا كان x + 5 = 12.',
      },
      mathExpression: 'x + 5 = 12',
      options: [
        { fr: '5', ar: '٥' },
        { fr: '7', ar: '٧' },
        { fr: '17', ar: '١٧' },
      ],
      correctAnswer: { fr: '7', ar: '٧' },
    },
  ],
};