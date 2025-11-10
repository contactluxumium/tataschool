import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-01-05',
  title: {
    fr: 'Comparaison des Nombres',
    ar: 'مقارنة الأعداد',
  },
  questions: [
    {
      id: 'q-01-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le plus grand nombre : 8 ou 5 ?',
        ar: 'أي عدد هو الأكبر: ٨ أم ٥؟',
      },
      options: [
        { fr: '8', ar: '٨' },
        { fr: '5', ar: '٥' },
        { fr: 'Les deux sont égaux', ar: 'متساويان' },
      ],
      correctAnswer: { fr: '8', ar: '٨' },
    },
  ],
};