import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-01-04',
  title: {
    fr: 'Les Formes Géométriques de Base',
    ar: 'الأشكال الهندسية الأساسية',
  },
  questions: [
    {
      id: 'q-01-04-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Combien de côtés a un carré ?',
        ar: 'كم عدد أضلاع المربع؟',
      },
      options: [
        { fr: '3', ar: '٣' },
        { fr: '4', ar: '٤' },
        { fr: '5', ar: '٥' },
      ],
      correctAnswer: { fr: '4', ar: '٤' },
    },
  ],
};