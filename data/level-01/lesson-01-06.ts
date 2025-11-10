import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-01-06',
  title: {
    fr: 'Nouvelle leçon du professeur',
    ar: 'درس جديد من الاستاذ',
  },
  questions: [
    {
      id: 'q-01-06-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Combien font 2 + 2 ?',
        ar: 'كم يساوي 2 + 2 ؟',
      },
      mathExpression: '2 + 2',
      options: [
        { fr: '3', ar: '٣' },
        { fr: '4', ar: '٤' },
        { fr: '5', ar: '٥' },
      ],
      correctAnswer: { fr: '4', ar: '٤' },
    },
  ],
};