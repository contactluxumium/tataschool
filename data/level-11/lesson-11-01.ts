import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-11-01',
  title: {
    fr: 'La Dérivation',
    ar: 'الاشتقاق',
  },
  questions: [
    {
      id: 'q-11-01-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est la dérivée de la fonction f(x) = 3x + 5 ?',
        ar: 'ما هي مشتقة الدالة f(x) = 3x + 5؟',
      },
      options: [
        { fr: '3', ar: '٣' },
        { fr: '5', ar: '٥' },
        { fr: '3x', ar: '٣x' },
      ],
      correctAnswer: { fr: '3', ar: '٣' },
    },
  ],
};