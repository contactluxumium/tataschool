import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-03-04',
  title: {
    fr: 'Résolution de Problèmes',
    ar: 'حل المسائل',
  },
  questions: [
    {
      id: 'q-03-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Ali a 10 bonbons et en donne 4. Combien lui en reste-t-il ?',
        ar: 'لدى علي 10 قطع حلوى، أعطى 4 منها. كم قطعة بقيت لديه؟',
      },
      options: [
        { fr: '5', ar: '٥' },
        { fr: '6', ar: '٦' },
        { fr: '14', ar: '١٤' },
      ],
      correctAnswer: { fr: '6', ar: '٦' },
    },
  ],
};