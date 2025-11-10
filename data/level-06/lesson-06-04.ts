import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-06-04',
  title: {
    fr: 'Symétrie Axiale et Centrale',
    ar: 'التماثل المحوري والمركزي',
  },
  questions: [
    {
      id: 'q-06-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Combien d\'axes de symétrie a un rectangle ?',
        ar: 'كم عدد محاور تماثل المستطيل؟',
      },
      options: [
        { fr: '1', ar: '١' },
        { fr: '2', ar: '٢' },
        { fr: '4', ar: '٤' },
      ],
      correctAnswer: { fr: '2', ar: '٢' },
    },
  ],
};