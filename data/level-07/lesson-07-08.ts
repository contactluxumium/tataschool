import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-07-08',
  title: {
    fr: 'Triangles et Droites Remarquables',
    ar: 'المثلثات والمستقيمات الهامة',
  },
  questions: [
    {
      id: 'q-07-08-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'La somme des angles d\'un triangle est toujours égale à...',
        ar: 'مجموع زوايا المثلث يساوي دائماً...',
      },
      options: [
        { fr: '90°', ar: '٩٠°' },
        { fr: '180°', ar: '١٨٠°' },
        { fr: '360°', ar: '٣٦٠°' },
      ],
      correctAnswer: { fr: '180°', ar: '١٨٠°' },
    },
  ],
};