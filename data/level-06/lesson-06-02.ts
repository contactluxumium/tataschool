import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-06-02',
  title: {
    fr: 'Le Volume',
    ar: 'الحجم',
  },
  questions: [
    {
      id: 'q-06-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le volume d\'un cube de 3 cm de côté ?',
        ar: 'ما هو حجم مكعب طول حرفه 3 سم؟',
      },
      mathExpression: '3 × 3 × 3',
      options: [
        { fr: '9 cm³', ar: '٩ سم³' },
        { fr: '27 cm³', ar: '٢٧ سم³' },
        { fr: '12 cm³', ar: '١٢ سم³' },
      ],
      correctAnswer: { fr: '27 cm³', ar: '٢٧ سم³' },
    },
  ],
};