import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-07-09',
  title: {
    fr: 'Théorème de Pythagore',
    ar: 'مبرهنة فيتاغورس',
  },
  questions: [
    {
      id: 'q-07-09-test1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Dans un triangle rectangle, le carré de l\'hypoténuse est égal à...',
        ar: 'في مثلث قائم الزاوية، مربع الوتر يساوي...',
      },
      options: [
        { fr: 'la somme des carrés des deux autres côtés', ar: 'مجموع مربعي الضلعين الآخرين' },
        { fr: 'la différence des carrés des deux autres côtés', ar: 'فرق مربعي الضلعين الآخرين' },
        { fr: 'le produit des deux autres côtés', ar: 'جداء الضلعين الآخرين' },
      ],
      correctAnswer: { fr: 'la somme des carrés des deux autres côtés', ar: 'مجموع مربعي الضلعين الآخرين' },
    },
  ],
};