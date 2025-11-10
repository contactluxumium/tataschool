import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-09-09',
  title: {
    fr: 'Géométrie dans l\'Espace',
    ar: 'الهندسة الفضائية',
  },
  questions: [
    {
      id: 'q-09-09-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quelle est la formule du volume d\'un cube de côté \'a\' ?',
        ar: 'ما هي صيغة حجم مكعب طول حرفه \'a\'؟',
      },
      options: [
        { fr: 'a²', ar: 'a²' },
        { fr: '6a²', ar: '6a²' },
        { fr: 'a³', ar: 'a³' },
      ],
      correctAnswer: { fr: 'a³', ar: 'a³' },
    },
  ],
};