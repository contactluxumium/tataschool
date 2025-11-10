import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-12-02',
  title: {
    fr: 'Les Nombres Complexes',
    ar: 'الأعداد العقدية',
  },
  questions: [
    {
      id: 'q-12-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Que vaut i² ?',
        ar: 'كم يساوي i²؟',
      },
      options: [
        { fr: '1', ar: '١' },
        { fr: '-1', ar: '-١' },
        { fr: 'i', ar: 'i' },
      ],
      correctAnswer: { fr: '-1', ar: '-١' },
    },
  ],
};