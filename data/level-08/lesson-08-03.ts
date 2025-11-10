import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-08-03',
  title: {
    fr: 'Calcul Littéral',
    ar: 'الحساب الحرفي',
  },
  questions: [
    {
      id: 'q-08-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Développe l\'expression : 3(x + 2).',
        ar: 'انشر التعبير : 3(x + 2).',
      },
      mathExpression: '3(x + 2)',
      options: [
        { fr: '3x + 2', ar: '٣x + ٢' },
        { fr: '3x + 6', ar: '٣x + ٦' },
        { fr: 'x + 6', ar: 'x + ٦' },
      ],
      correctAnswer: { fr: '3x + 6', ar: '٣x + ٦' },
    },
  ],
};