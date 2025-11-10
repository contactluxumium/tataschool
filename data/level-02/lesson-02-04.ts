import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-02-04',
  title: {
    fr: 'Les Unités de Mesure',
    ar: 'وحدات القياس',
  },
  questions: [
    {
      id: 'q-02-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Combien de centimètres y a-t-il dans 1 mètre ?',
        ar: 'كم سنتيمتراً في المتر الواحد؟',
      },
      options: [
        { fr: '10', ar: '١٠' },
        { fr: '100', ar: '١٠٠' },
        { fr: '1000', ar: '١٠٠٠' },
      ],
      correctAnswer: { fr: '100', ar: '١٠٠' },
    },
  ],
};