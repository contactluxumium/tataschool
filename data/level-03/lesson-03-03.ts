import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-03-03',
  title: {
    fr: 'Géométrie: Droites et Angles',
    ar: 'الهندسة: المستقيمات والزوايا',
  },
  questions: [
    {
      id: 'q-03-03-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le nom d\'un angle de 90 degrés ?',
        ar: 'ما هو اسم الزاوية التي قياسها 90 درجة؟',
      },
      options: [
        { fr: 'Angle aigu', ar: 'زاوية حادة' },
        { fr: 'Angle droit', ar: 'زاوية قائمة' },
        { fr: 'Angle obtus', ar: 'زاوية منفرجة' },
      ],
      correctAnswer: { fr: 'Angle droit', ar: 'زاوية قائمة' },
    },
  ],
};