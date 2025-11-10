import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-08-05',
  title: {
    fr: 'Ordre et Opérations',
    ar: 'الترتيب والعمليات',
  },
  questions: [
    {
      id: 'q-08-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Si a < b, alors a + 2 est ...',
        ar: 'إذا كان a < b، فإن a + 2 هو...',
      },
      options: [
        { fr: '< b + 2', ar: '< b + 2' },
        { fr: '> b + 2', ar: '> b + 2' },
        { fr: '= b + 2', ar: '= b + 2' },
      ],
      correctAnswer: { fr: '< b + 2', ar: '< b + 2' },
    },
  ],
};