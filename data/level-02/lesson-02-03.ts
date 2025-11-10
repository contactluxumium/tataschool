import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-02-03',
  title: {
    fr: 'Les Nombres jusqu\'à 999',
    ar: 'الأعداد حتى 999',
  },
  questions: [
    {
      id: 'q-02-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel nombre vient après 299 ?',
        ar: 'ما هو العدد الذي يأتي بعد 299؟',
      },
      options: [
        { fr: '298', ar: '٢٩٨' },
        { fr: '300', ar: '٣٠٠' },
        { fr: '301', ar: '٣٠١' },
      ],
      correctAnswer: { fr: '300', ar: '٣٠٠' },
    },
  ],
};