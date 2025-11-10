import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-10-05',
  title: {
    fr: 'Ensembles et Arithmétique',
    ar: 'المجموعات والحسابيات',
  },
  questions: [
    {
      id: 'q-10-05-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Lequel de ces nombres est un nombre premier ?',
        ar: 'أي من هذه الأعداد هو عدد أولي؟',
      },
      options: [
        { fr: '4', ar: '٤' },
        { fr: '7', ar: '٧' },
        { fr: '9', ar: '٩' },
      ],
      correctAnswer: { fr: '7', ar: '٧' },
    },
  ],
};