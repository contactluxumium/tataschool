import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-04-02',
  title: {
    fr: 'Périmètre et Aire',
    ar: 'المحيط والمساحة',
  },
  questions: [
    {
      id: 'q-04-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le périmètre d\'un carré de 5 cm de côté ?',
        ar: 'ما هو محيط مربع طول ضلعه 5 سم؟',
      },
      mathExpression: '5 × 4',
      options: [
        { fr: '20 cm', ar: '٢٠ سم' },
        { fr: '25 cm', ar: '٢٥ سم' },
        { fr: '10 cm', ar: '١٠ سم' },
      ],
      correctAnswer: { fr: '20 cm', ar: '٢٠ سم' },
    },
  ],
};