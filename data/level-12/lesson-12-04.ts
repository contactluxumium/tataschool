import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-12-04',
  title: {
    fr: 'Calcul Intégral',
    ar: 'حساب التكامل',
  },
  questions: [
    {
      id: 'q-12-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est une primitive de f(x) = 2x ?',
        ar: 'ما هي دالة أصلية للدالة f(x) = 2x؟',
      },
      options: [
        { fr: '2', ar: '٢' },
        { fr: 'x²', ar: 'x²' },
        { fr: 'x²/2', ar: 'x²/2' },
      ],
      correctAnswer: { fr: 'x²', ar: 'x²' },
    },
  ],
};