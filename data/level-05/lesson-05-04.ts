import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-05-04',
  title: {
    fr: 'Aire des Polygones Usuels',
    ar: 'مساحة المضلعات الاعتيادية',
  },
  questions: [
    {
      id: 'q-05-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est l\'aire d\'un rectangle de 10 cm de long et 5 cm de large ?',
        ar: 'ما هي مساحة مستطيل طوله 10 سم وعرضه 5 سم؟',
      },
      mathExpression: '10 × 5',
      options: [
        { fr: '15 cm²', ar: '١٥ سم²' },
        { fr: '30 cm²', ar: '٣٠ سم²' },
        { fr: '50 cm²', ar: '٥٠ سم²' },
      ],
      correctAnswer: { fr: '50 cm²', ar: '٥٠ سم²' },
    },
  ],
};