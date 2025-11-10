import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-08-06',
  title: {
    fr: 'Théorème de Thalès',
    ar: 'مبرهنة طاليس',
  },
  questions: [
    {
      id: 'q-08-06-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Le théorème de Thalès nécessite deux droites...',
        ar: 'تتطلب مبرهنة طاليس مستقيمين...',
      },
      options: [
        { fr: 'parallèles', ar: 'متوازيين' },
        { fr: 'perpendiculaires', ar: 'متعامدين' },
        { fr: 'sécantes', ar: 'متقاطعين' },
      ],
      correctAnswer: { fr: 'parallèles', ar: 'متوازيين' },
    },
  ],
};