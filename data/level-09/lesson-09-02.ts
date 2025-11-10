import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-09-02',
  title: {
    fr: 'Puissances et Racines Carrées',
    ar: 'القوى والجذور المربعة',
  },
  questions: [
    {
      id: 'q-09-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est la racine carrée de 49 ?',
        ar: 'ما هو الجذر المربع للعدد 49؟',
      },
      mathExpression: '√49',
      options: [
        { fr: '6', ar: '٦' },
        { fr: '7', ar: '٧' },
        { fr: '8', ar: '٨' },
      ],
      correctAnswer: { fr: '7', ar: '٧' },
    },
  ],
};