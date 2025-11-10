import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-05-05',
  title: {
    fr: 'La Vitesse Moyenne',
    ar: 'السرعة المتوسطة',
  },
  questions: [
    {
      id: 'q-05-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Une voiture parcourt 200 km en 2 heures. Quelle est sa vitesse moyenne ?',
        ar: 'سيارة تقطع 200 كم في ساعتين. ما هي سرعتها المتوسطة؟',
      },
      options: [
        { fr: '100 km/h', ar: '١٠٠ كلم/س' },
        { fr: '200 km/h', ar: '٢٠٠ كلم/س' },
        { fr: '50 km/h', ar: '٥٠ كلم/س' },
      ],
      correctAnswer: { fr: '100 km/h', ar: '١٠٠ كلم/س' },
    },
  ],
};