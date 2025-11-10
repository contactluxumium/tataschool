import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-09-08',
  title: {
    fr: 'Vecteurs et Translations',
    ar: 'المتجهات والإزاحة',
  },
  questions: [
    {
      id: 'q-09-08-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Si ABCD est un parallélogramme, alors le vecteur AB est égal au vecteur...',
        ar: 'إذا كان ABCD متوازي أضلاع، فإن المتجهة AB تساوي المتجهة...',
      },
      options: [
        { fr: 'CD', ar: 'CD' },
        { fr: 'DC', ar: 'DC' },
        { fr: 'AD', ar: 'AD' },
      ],
      correctAnswer: { fr: 'DC', ar: 'DC' },
    },
  ],
};