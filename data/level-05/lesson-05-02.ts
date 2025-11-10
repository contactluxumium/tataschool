import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-05-02',
  title: {
    fr: 'Les Angles',
    ar: 'الزوايا',
  },
  questions: [
    {
      id: 'q-05-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le nom d\'un angle plus petit que 90° ?',
        ar: 'ما اسم الزاوية الأصغر من 90 درجة؟',
      },
      options: [
        { fr: 'Angle aigu', ar: 'زاوية حادة' },
        { fr: 'Angle droit', ar: 'زاوية قائمة' },
        { fr: 'Angle obtus', ar: 'زاوية منفرجة' },
      ],
      correctAnswer: { fr: 'Angle aigu', ar: 'زاوية حادة' },
    },
  ],
};