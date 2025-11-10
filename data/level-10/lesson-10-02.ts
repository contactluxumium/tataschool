import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-10-02',
  title: {
    fr: 'Calcul Trigonométrique',
    ar: 'الحساب المثلثي',
  },
  questions: [
    {
      id: 'q-10-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est la valeur de cos(0) ?',
        ar: 'ما هي قيمة cos(0)؟',
      },
      options: [
        { fr: '0', ar: '٠' },
        { fr: '1', ar: '١' },
        { fr: '-1', ar: '-١' },
      ],
      correctAnswer: { fr: '1', ar: '١' },
    },
  ],
};