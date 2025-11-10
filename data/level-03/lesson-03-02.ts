import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-03-02',
  title: {
    fr: 'Les Fractions',
    ar: 'الكسور',
  },
  questions: [
    {
      id: 'q-03-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle fraction représente la moitié ?',
        ar: 'أي كسر يمثل النصف؟',
      },
      options: [
        { fr: '1/2', ar: '١/٢' },
        { fr: '1/3', ar: '١/٣' },
        { fr: '1/4', ar: '١/٤' },
      ],
      correctAnswer: { fr: '1/2', ar: '١/٢' },
    },
  ],
};