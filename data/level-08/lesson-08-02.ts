import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-08-02',
  title: {
    fr: 'Puissances des Nombres Rationnels',
    ar: 'قوى الأعداد الجذرية',
  },
  questions: [
    {
      id: 'q-08-02-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Que vaut (2/3)² ?',
        ar: 'كم يساوي (2/3)² ؟',
      },
      mathExpression: '(2/3)²',
      options: [
        { fr: '4/9', ar: '٤/٩' },
        { fr: '4/6', ar: '٤/٦' },
        { fr: '2/6', ar: '٢/٦' },
      ],
      correctAnswer: { fr: '4/9', ar: '٤/٩' },
    },
  ],
};