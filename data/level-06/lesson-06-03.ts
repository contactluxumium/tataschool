import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-06-03',
  title: {
    fr: 'Les Nombres Sexagésimaux',
    ar: 'الأعداد الستينية',
  },
  questions: [
    {
      id: 'q-06-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Deux heures équivalent à combien de minutes ?',
        ar: 'ساعتان تعادل كم دقيقة؟',
      },
      mathExpression: '2 × 60',
      options: [
        { fr: '60', ar: '٦٠' },
        { fr: '90', ar: '٩٠' },
        { fr: '120', ar: '١٢٠' },
      ],
      correctAnswer: { fr: '120', ar: '١٢٠' },
    },
  ],
};