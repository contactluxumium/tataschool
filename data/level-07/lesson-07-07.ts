import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-07-07',
  title: {
    fr: 'Angles et Droites Parallèles',
    ar: 'الزوايا والمستقيمات المتوازية',
  },
  questions: [
    {
      id: 'q-07-07-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Si deux droites sont parallèles, les angles alternes-internes sont...',
        ar: 'إذا كان مستقيمان متوازيان، فإن الزوايا المتبادلة داخلياً تكون...',
      },
      options: [
        { fr: 'égaux', ar: 'متقايسة' },
        { fr: 'différents', ar: 'مختلفة' },
        { fr: 'supplémentaires', ar: 'متكاملة' },
      ],
      correctAnswer: { fr: 'égaux', ar: 'متقايسة' },
    },
  ],
};