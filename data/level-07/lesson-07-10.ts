import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-07-10',
  title: {
    fr: 'Symétrie Axiale',
    ar: 'التماثل المحوري',
  },
  questions: [
    {
      id: 'q-07-10-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Combien d\'axes de symétrie possède un cercle ?',
        ar: 'كم عدد محاور التماثل للدائرة؟',
      },
      options: [
        { fr: '1', ar: '١' },
        { fr: '4', ar: '٤' },
        { fr: 'Infini', ar: 'ما لا نهاية' },
      ],
      correctAnswer: { fr: 'Infini', ar: 'ما لا نهاية' },
    },
  ],
};