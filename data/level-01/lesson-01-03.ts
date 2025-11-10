import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-01-03',
  title: {
    fr: 'Les Nombres jusqu\'à 20',
    ar: 'الأعداد حتى 20',
  },
  questions: [
    {
      id: 'q-01-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel nombre vient juste après 15 ?',
        ar: 'ما هو العدد الذي يأتي مباشرة بعد 15؟',
      },
      options: [
        { fr: '14', ar: '١٤' },
        { fr: '15', ar: '١٥' },
        { fr: '16', ar: '١٦' },
      ],
      correctAnswer: { fr: '16', ar: '١٦' },
    },
  ],
};