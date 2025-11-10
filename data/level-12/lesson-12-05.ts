import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-12-05',
  title: {
    fr: 'Les Probabilités',
    ar: 'الاحتمالات',
  },
  questions: [
    {
      id: 'q-12-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est la probabilité d\'obtenir "face" en lançant une pièce de monnaie ?',
        ar: 'ما هو احتمال الحصول على "وجه" عند رمي قطعة نقدية؟',
      },
      options: [
        { fr: '1/2', ar: '١/٢' },
        { fr: '1', ar: '١' },
        { fr: '0', ar: '٠' },
      ],
      correctAnswer: { fr: '1/2', ar: '١/٢' },
    },
  ],
}