import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-02-01',
  title: {
    fr: 'Addition et Soustraction',
    ar: 'الجمع والطرح',
  },
  questions: [
    {
      id: 'q-02-01-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Calcule : 25 + 10.',
        ar: 'احسب : 25 + 10.',
      },
      mathExpression: '25 + 10',
      options: [
        { fr: '30', ar: '٣٠' },
        { fr: '35', ar: '٣٥' },
        { fr: '40', ar: '٤٠' },
      ],
      correctAnswer: { fr: '35', ar: '٣٥' },
    },
  ],
};