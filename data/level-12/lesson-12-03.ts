import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-12-03',
  title: {
    fr: 'Fonctions Exponentielles et Logarithmiques',
    ar: 'الدوال الأسية واللوغاريتمية',
  },
  questions: [
    {
      id: 'q-12-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est la valeur de ln(1) ?',
        ar: 'ما هي قيمة ln(1)؟',
      },
      options: [
        { fr: 'e', ar: 'e' },
        { fr: '1', ar: '١' },
        { fr: '0', ar: '٠' },
      ],
      correctAnswer: { fr: '0', ar: '٠' },
    },
  ],
};