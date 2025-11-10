import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-09-01',
  title: {
    fr: 'Identités Remarquables',
    ar: 'المتطابقات الهامة',
  },
  questions: [
    {
      id: 'q-09-01-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Développe (a + b)². (a+b)².',
        ar: 'انشر (a + b)². (a+b)²',
      },
      mathExpression: '(a+b)²',
      options: [
        { fr: 'a² + b²', ar: 'a² + b²' },
        { fr: 'a² + 2ab + b²', ar: 'a² + 2ab + b²' },
        { fr: 'a² - 2ab + b²', ar: 'a² - 2ab + b²' },
      ],
      correctAnswer: { fr: 'a² + 2ab + b²', ar: 'a² + 2ab + b²' },
    },
  ],
};