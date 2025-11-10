import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-12-01',
  title: {
    fr: 'Limites et Continuité',
    ar: 'النهايات والاتصال',
  },
  questions: [
    {
      id: 'q-12-01-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est la limite de 1/x quand x tend vers +∞ ?',
        ar: 'ما هي نهاية 1/x عندما يؤول x إلى +∞؟',
      },
      options: [
        { fr: '+∞', ar: '+∞' },
        { fr: '1', ar: '١' },
        { fr: '0', ar: '٠' },
      ],
      correctAnswer: { fr: '0', ar: '٠' },
    },
  ],
};