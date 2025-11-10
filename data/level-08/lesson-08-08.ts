import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-08-08',
  title: {
    fr: 'Vecteurs et Translation',
    ar: 'المتجهات والإزاحة',
  },
  questions: [
    {
      id: 'q-08-08-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'La somme des vecteurs AB + BC est égale à...',
        ar: 'مجموع المتجهتين AB + BC يساوي...',
      },
      mathExpression: 'AB + BC',
      options: [
        { fr: 'AC', ar: 'AC' },
        { fr: 'BA', ar: 'BA' },
        { fr: 'CB', ar: 'CB' },
      ],
      correctAnswer: { fr: 'AC', ar: 'AC' },
    },
  ],
};