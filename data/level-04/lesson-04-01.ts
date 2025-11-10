import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-04-01',
  title: {
    fr: 'Les Nombres Décimaux',
    ar: 'الأعداد العشرية',
  },
  questions: [
    {
      id: 'q-04-01-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Comment écrit-on "cinq et quatre dixièmes" en nombre décimal ?',
        ar: 'كيف نكتب "خمسة وأربعة أعشار" على شكل عدد عشري؟',
      },
      options: [
        { fr: '5,04', ar: '٥,٠٤' },
        { fr: '5,4', ar: '٥,٤' },
        { fr: '4,5', ar: '٤,٥' },
      ],
      correctAnswer: { fr: '5,4', ar: '٥,٤' },
    },
  ],
};