import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-11-03',
  title: {
    fr: 'Le Produit Scalaire',
    ar: 'الجداء السلمي',
  },
  questions: [
    {
      id: 'q-11-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Si deux vecteurs sont orthogonaux, leur produit scalaire est...',
        ar: 'إذا كانت متجهتان متعامدتين، فإن جداءهما السلمي يساوي...',
      },
      options: [
        { fr: '1', ar: '١' },
        { fr: '-1', ar: '-١' },
        { fr: '0', ar: '٠' },
      ],
      correctAnswer: { fr: '0', ar: '٠' },
    },
  ],
};