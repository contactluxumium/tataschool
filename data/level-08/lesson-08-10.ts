import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-08-10',
  title: {
    fr: 'Statistiques',
    ar: 'الإحصاء',
  },
  questions: [
    {
      id: 'q-08-10-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Comment appelle-t-on la valeur la plus fréquente dans une série statistique ?',
        ar: 'ماذا تسمى القيمة الأكثر تكراراً في سلسلة إحصائية؟',
      },
      options: [
        { fr: 'La moyenne', ar: 'المعدل' },
        { fr: 'La médiane', ar: 'الوسيط' },
        { fr: 'Le mode', ar: 'المنوال' },
      ],
      correctAnswer: { fr: 'Le mode', ar: 'المنوال' },
    },
  ],
};