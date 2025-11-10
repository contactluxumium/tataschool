import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-09-10',
  title: {
    fr: 'Thalès et Trigonométrie',
    ar: 'مبرهنة طاليس والحساب المثلثي',
  },
  questions: [
    {
      id: 'q-09-10-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Dans un triangle rectangle, que représente sin(x) ?',
        ar: 'في مثلث قائم الزاوية، ماذا يمثل sin(x)؟',
      },
      options: [
        { fr: 'côté adjacent / hypoténuse', ar: 'الضلع المحادي / الوتر' },
        { fr: 'côté opposé / hypoténuse', ar: 'الضلع المقابل / الوتر' },
        { fr: 'côté opposé / côté adjacent', ar: 'الضلع المقابل / الضلع المحادي' },
      ],
      correctAnswer: { fr: 'côté opposé / hypoténuse', ar: 'الضلع المقابل / الوتر' },
    },
  ],
};