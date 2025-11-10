import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-10-01',
  title: {
    fr: 'Les Polynômes',
    ar: 'الحدوديات',
  },
  questions: [
    {
      id: 'q-10-01-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le degré du polynôme P(x) = 5x³ - 2x + 7 ?',
        ar: 'ما هي درجة الحدودية P(x) = 5x³ - 2x + 7؟',
      },
      options: [
        { fr: '5', ar: '٥' },
        { fr: '3', ar: '٣' },
        { fr: '7', ar: '٧' },
      ],
      correctAnswer: { fr: '3', ar: '٣' },
    },
  ],
};