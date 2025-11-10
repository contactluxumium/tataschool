import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-11-02',
  title: {
    fr: 'Les Suites Numériques',
    ar: 'المتتاليات',
  },
  questions: [
    {
      id: 'q-11-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le terme suivant dans la suite arithmétique : 2, 5, 8, ... ?',
        ar: 'ما هو الحد التالي في المتتالية الحسابية : 2, 5, 8, ... ؟',
      },
      options: [
        { fr: '10', ar: '١٠' },
        { fr: '11', ar: '١١' },
        { fr: '12', ar: '١٢' },
      ],
      correctAnswer: { fr: '11', ar: '١١' },
    },
  ],
};