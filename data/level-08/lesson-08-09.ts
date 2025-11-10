import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-08-09',
  title: {
    fr: 'Géométrie dans l\'Espace',
    ar: 'الهندسة الفضائية',
  },
  questions: [
    {
      id: 'q-08-09-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Combien de faces possède un pavé droit (parallélépipède rectangle) ?',
        ar: 'كم عدد وجوه متوازي المستطيلات القائم؟',
      },
      options: [
        { fr: '4', ar: '٤' },
        { fr: '6', ar: '٦' },
        { fr: '8', ar: '٨' },
      ],
      correctAnswer: { fr: '6', ar: '٦' },
    },
  ],
};