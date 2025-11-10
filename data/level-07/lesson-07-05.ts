import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-07-05',
  title: {
    fr: 'La Proportionnalité',
    ar: 'التناسبية',
  },
  questions: [
    {
      id: 'q-07-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Si 3 stylos coûtent 6 DH, combien coûtent 5 stylos ?',
        ar: 'إذا كان ثمن 3 أقلام هو 6 دراهم، فكم ثمن 5 أقلام؟',
      },
      options: [
        { fr: '8 DH', ar: '٨ د.م.' },
        { fr: '10 DH', ar: '١٠ د.م.' },
        { fr: '12 DH', ar: '١٢ د.م.' },
      ],
      correctAnswer: { fr: '10 DH', ar: '١٠ د.م.' },
    },
  ],
};