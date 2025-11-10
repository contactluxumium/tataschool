import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-03-01',
  title: {
    fr: 'Multiplication et Division',
    ar: 'الضرب والقسمة',
  },
  questions: [
    {
      id: 'q-03-01-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Calcule : 21 ÷ 3.',
        ar: 'احسب : 21 ÷ 3.',
      },
      mathExpression: '21 ÷ 3',
      options: [
        { fr: '6', ar: '٦' },
        { fr: '7', ar: '٧' },
        { fr: '8', ar: '٨' },
      ],
      correctAnswer: { fr: '7', ar: '٧' },
    },
  ],
};