import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-04-03',
  title: {
    fr: 'Fractions : Comparaison et Ordre',
    ar: 'الأعداد الكسرية: مقارنة وترتيب',
  },
  questions: [
    {
      id: 'q-04-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle fraction est la plus grande ?',
        ar: 'أي كسر هو الأكبر؟',
      },
      options: [
        { fr: '1/4', ar: '١/٤' },
        { fr: '3/4', ar: '٣/٤' },
        { fr: '2/4', ar: '٢/٤' },
      ],
      correctAnswer: { fr: '3/4', ar: '٣/٤' },
    },
  ],
};