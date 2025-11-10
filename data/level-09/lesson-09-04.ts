import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-09-04',
  title: {
    fr: 'Systèmes de Deux Équations',
    ar: 'نظمة معادلتين',
  },
  questions: [
    {
      id: 'q-09-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Le couple (2,1) est-il solution du système {x+y=3; x-y=1} ?',
        ar: 'هل الزوج (2,1) حل للنظمة {x+y=3; x-y=1}؟',
      },
      options: [
        { fr: 'Oui', ar: 'نعم' },
        { fr: 'Non', ar: 'لا' },
        { fr: 'On ne peut pas savoir', ar: 'لا يمكن المعرفة' },
      ],
      correctAnswer: { fr: 'Oui', ar: 'نعم' },
    },
  ],
};