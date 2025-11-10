import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-01-02',
  title: {
    fr: 'La Soustraction',
    ar: 'الطرح',
  },
  questions: [
    {
      id: 'q-01-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Si vous avez 5 pommes et que vous en mangez 2, combien en reste-t-il ?',
        ar: 'إذا كان لديك ٥ تفاحات وأكلت منها تفاحتين، كم يتبقى لديك؟',
      },
      mathExpression: '5 - 2',
      options: [
        { fr: '2', ar: '٢' },
        { fr: '3', ar: '٣' },
        { fr: '4', ar: '٤' },
      ],
      correctAnswer: { fr: '3', ar: '٣' },
      explanation: {
        fr: '5 moins 2 égale 3.',
        ar: '٥ ناقص ٢ يساوي ٣.',
      },
    },
  ],
};