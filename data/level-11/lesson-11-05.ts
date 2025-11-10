import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-11-05',
  title: {
    fr: 'Étude de Fonctions',
    ar: 'دراسة الدوال',
  },
  questions: [
    {
      id: 'q-11-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Si la dérivée f\'(x) est positive, alors la fonction f est...',
        ar: 'إذا كانت المشتقة f\'(x) موجبة، فإن الدالة f تكون...',
      },
      options: [
        { fr: 'croissante', ar: 'تزايدية' },
        { fr: 'décroissante', ar: 'تناقصية' },
        { fr: 'constante', ar: 'ثابتة' },
      ],
      correctAnswer: { fr: 'croissante', ar: 'تزايدية' },
    },
  ],
};