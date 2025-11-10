import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-07-06',
  title: {
    fr: 'Statistiques',
    ar: 'الإحصاء',
  },
  questions: [
    {
      id: 'q-07-06-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est la moyenne des nombres 2, 4 et 6 ?',
        ar: 'ما هو معدل الأعداد 2, 4, 6؟',
      },
      options: [
        { fr: '3', ar: '٣' },
        { fr: '4', ar: '٤' },
        { fr: '5', ar: '٥' },
      ],
      correctAnswer: { fr: '4', ar: '٤' },
    },
  ],
};