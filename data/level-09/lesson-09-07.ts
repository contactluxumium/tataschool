import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-09-07',
  title: {
    fr: 'Géométrie Analytique',
    ar: 'الهندسة التحليلية',
  },
  questions: [
    {
      id: 'q-09-07-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le coefficient directeur (la pente) de la droite d\'équation y = 3x - 5 ?',
        ar: 'ما هو المعامل الموجه (الميل) للمستقيم الذي معادلته y = 3x - 5؟',
      },
      options: [
        { fr: '3', ar: '٣' },
        { fr: '-5', ar: '-٥' },
        { fr: '5', ar: '٥' },
      ],
      correctAnswer: { fr: '3', ar: '٣' },
    },
  ],
};