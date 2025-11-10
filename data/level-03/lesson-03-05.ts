import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-03-05',
  title: {
    fr: 'Organisation des Données',
    ar: 'تنظيم البيانات',
  },
  questions: [
    {
      id: 'q-03-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Dans un graphique à barres, quelle barre représente la plus grande valeur ?',
        ar: 'في الرسم البياني بالأعمدة، أي عمود يمثل القيمة الأكبر؟',
      },
      options: [
        { fr: 'La plus courte', ar: 'الأقصر' },
        { fr: 'La plus longue', ar: 'الأطول' },
        { fr: 'Celle du milieu', ar: 'التي في الوسط' },
      ],
      correctAnswer: { fr: 'La plus longue', ar: 'الأطول' },
    },
  ],
};