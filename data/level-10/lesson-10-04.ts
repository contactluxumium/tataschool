import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-10-04',
  title: {
    fr: 'La Projection dans le Plan',
    ar: 'الإسقاط في المستوى',
  },
  questions: [
    {
      id: 'q-10-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Le projeté d\'un point sur une droite est...',
        ar: 'مسقط نقطة على مستقيم هو...',
      },
      options: [
        { fr: 'une droite', ar: 'مستقيم' },
        { fr: 'un point', ar: 'نقطة' },
        { fr: 'un segment', ar: 'قطعة' },
      ],
      correctAnswer: { fr: 'un point', ar: 'نقطة' },
    },
  ],
};