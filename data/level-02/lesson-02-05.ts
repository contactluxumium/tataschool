import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-02-05',
  title: {
    fr: 'Temps et Monnaie',
    ar: 'الوقت والنقود',
  },
  questions: [
    {
      id: 'q-02-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Combien de minutes y a-t-il dans une heure ?',
        ar: 'كم دقيقة في الساعة الواحدة؟',
      },
      options: [
        { fr: '30', ar: '٣٠' },
        { fr: '60', ar: '٦٠' },
        { fr: '90', ar: '٩٠' },
      ],
      correctAnswer: { fr: '60', ar: '٦٠' },
    },
  ],
};