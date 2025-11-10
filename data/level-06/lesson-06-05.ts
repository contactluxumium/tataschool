import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-06-05',
  title: {
    fr: 'Pourcentage et Capital',
    ar: 'النسبة المئوية والرأسمال',
  },
  questions: [
    {
      id: 'q-06-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Que représente 50% en fraction ?',
        ar: 'ماذا تمثل نسبة 50% على شكل كسر؟',
      },
      options: [
        { fr: '1/4', ar: '١/٤' },
        { fr: '1/2', ar: '١/٢' },
        { fr: '3/4', ar: '٣/٤' },
      ],
      correctAnswer: { fr: '1/2', ar: '١/٢' },
    },
  ],
};