import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-09-06',
  title: {
    fr: 'Statistiques',
    ar: 'الإحصاء',
  },
  questions: [
    {
      id: 'q-09-06-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est la moyenne de 10 et 20 ?',
        ar: 'ما هو معدل 10 و 20؟',
      },
      options: [
        { fr: '10', ar: '١٠' },
        { fr: '15', ar: '١٥' },
        { fr: '20', ar: '٢٠' },
      ],
      correctAnswer: { fr: '15', ar: '١٥' },
    },
  ],
};