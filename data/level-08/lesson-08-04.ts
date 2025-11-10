import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-08-04',
  title: {
    fr: 'Équations du Premier Degré',
    ar: 'معادلات من الدرجة الأولى',
  },
  questions: [
    {
      id: 'q-08-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est la solution de l\'équation x - 4 = 10 ?',
        ar: 'ما هو حل المعادلة x - 4 = 10 ؟',
      },
      mathExpression: 'x - 4 = 10',
      options: [
        { fr: '6', ar: '٦' },
        { fr: '14', ar: '١٤' },
        { fr: ' -6', ar: '-٦' },
      ],
      correctAnswer: { fr: '14', ar: '١٤' },
    },
  ],
};