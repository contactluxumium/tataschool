import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-05-01',
  title: {
    fr: 'La Proportionnalité',
    ar: 'التناسبية',
  },
  questions: [
    {
      id: 'q-05-01-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Si 1 kg de bananes coûte 7 DH, combien coûtent 2 kg ?',
        ar: 'إذا كان ثمن 1 كلغ من الموز هو 7 دراهم، فما ثمن 2 كلغ؟',
      },
      options: [
        { fr: '10 DH', ar: '١٠ د.م.' },
        { fr: '14 DH', ar: '١٤ د.م.' },
        { fr: '7 DH', ar: '٧ د.م.' },
      ],
      correctAnswer: { fr: '14 DH', ar: '١٤ د.م.' },
    },
  ],
};