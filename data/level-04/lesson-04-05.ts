import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-04-05',
  title: {
    fr: 'Les Solides Géométriques',
    ar: 'المجسمات الهندسية',
  },
  questions: [
    {
      id: 'q-04-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel solide a toutes ses faces carrées ?',
        ar: 'أي مجسم جميع وجوهه مربعة؟',
      },
      options: [
        { fr: 'La pyramide', ar: 'الهرم' },
        { fr: 'Le cube', ar: 'المكعب' },
        { fr: 'Le cylindre', ar: 'الأسطوانة' },
      ],
      correctAnswer: { fr: 'Le cube', ar: 'المكعب' },
    },
  ],
};