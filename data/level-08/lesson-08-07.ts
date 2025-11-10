import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-08-07',
  title: {
    fr: 'Triangles et Parallélogrammes',
    ar: 'المثلثات ومتوازي الأضلاع',
  },
  questions: [
    {
      id: 'q-08-07-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Dans un parallélogramme, les côtés opposés sont...',
        ar: 'في متوازي الأضلاع، الأضلاع المتقابلة تكون...',
      },
      options: [
        { fr: 'parallèles et de même longueur', ar: 'متوازية ومتقايسة' },
        { fr: 'perpendiculaires', ar: 'متعامدة' },
        { fr: 'de longueurs différentes', ar: 'مختلفة الطول' },
      ],
      correctAnswer: { fr: 'parallèles et de même longueur', ar: 'متوازية ومتقايسة' },
    },
  ],
};