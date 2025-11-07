import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-01-02',
  title: 'lessons.lesson_01_02_title',
  questions: [
    // Easy
    {
      id: 'q-01-02-e1',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_02_e1_text',
      mathExpression: '5 - 2',
      correctAnswer: '3',
      explanation: 'lessons.q_01_02_e1_explanation'
    },
    {
      id: 'q-01-02-e2',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_02_e2_text',
      mathExpression: '8 - 0',
      correctAnswer: '8',
      explanation: 'lessons.q_01_02_e2_explanation'
    },
    {
      id: 'q-01-02-e3',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_02_e3_text',
      mathExpression: '10 - 4',
      options: ['lessons.q_01_02_e3_opt1', 'lessons.q_01_02_e3_opt2', 'lessons.q_01_02_e3_opt3'],
      correctAnswer: 'lessons.q_01_02_e3_opt2',
      explanation: 'lessons.q_01_02_e3_explanation'
    },
    {
      id: 'q-01-02-e4',
      type: QuestionType.TrueFalse,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_02_e4_text',
      mathExpression: '7 - 3 = 4',
      correctAnswer: 'true',
      explanation: 'lessons.q_01_02_e4_explanation'
    },
    {
      id: 'q-01-02-e5',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_02_e5_text',
      correctAnswer: '5',
      explanation: 'lessons.q_01_02_e5_explanation'
    },
    {
      id: 'q-01-02-e6',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_02_e6_text',
      mathExpression: '9 - 9',
      options: ['lessons.q_01_02_e6_opt1', 'lessons.q_01_02_e6_opt2', 'lessons.q_01_02_e6_opt3'],
      correctAnswer: 'lessons.q_01_02_e6_opt2',
      explanation: 'lessons.q_01_02_e6_explanation'
    },
    {
      id: 'q-01-02-e7',
      type: QuestionType.TrueFalse,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_02_e7_text',
      mathExpression: '6 - 1 = 4',
      correctAnswer: 'false',
      explanation: 'lessons.q_01_02_e7_explanation'
    },
    {
      id: 'q-01-02-e8',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_02_e8_text',
      mathExpression: '10, 8, 6, ...',
      correctAnswer: '4',
      explanation: 'lessons.q_01_02_e8_explanation'
    },
    // Medium
    {
      id: 'q-01-02-m1',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_02_m1_text',
      mathExpression: '15 - 7',
      correctAnswer: '8',
      explanation: 'lessons.q_01_02_m1_explanation'
    },
    {
      id: 'q-01-02-m2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_02_m2_text',
      mathExpression: '12 - 5',
      options: ['lessons.q_01_02_m2_opt1', 'lessons.q_01_02_m2_opt2', 'lessons.q_01_02_m2_opt3'],
      correctAnswer: 'lessons.q_01_02_m2_opt3',
      explanation: 'lessons.q_01_02_m2_explanation'
    },
    {
      id: 'q-01-02-m3',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_02_m3_text',
      correctAnswer: '9',
      explanation: 'lessons.q_01_02_m3_explanation'
    },
    {
      id: 'q-01-02-m4',
      type: QuestionType.TrueFalse,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_02_m4_text',
      mathExpression: '18 - 9 = 9',
      correctAnswer: 'true',
      explanation: 'lessons.q_01_02_m4_explanation'
    },
    {
      id: 'q-01-02-m5',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_02_m5_text',
      mathExpression: '14 - ? = 6',
      correctAnswer: '8',
      explanation: 'lessons.q_01_02_m5_explanation'
    },
    {
      id: 'q-01-02-m6',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_02_m6_text',
      options: ['lessons.q_01_02_m6_opt1', 'lessons.q_01_02_m6_opt2', 'lessons.q_01_02_m6_opt3'],
      correctAnswer: 'lessons.q_01_02_m6_opt2',
      explanation: 'lessons.q_01_02_m6_explanation'
    },
    // Hard
    {
      id: 'q-01-02-h1',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_02_h1_text',
      mathExpression: '19 - 12',
      correctAnswer: '7',
      explanation: 'lessons.q_01_02_h1_explanation'
    },
    {
      id: 'q-01-02-h2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_02_h2_text',
      options: ['lessons.q_01_02_h2_opt1', 'lessons.q_01_02_h2_opt2', 'lessons.q_01_02_h2_opt3'],
      correctAnswer: 'lessons.q_01_02_h2_opt1',
      explanation: 'lessons.q_01_02_h2_explanation'
    },
    {
      id: 'q-01-02-h3',
      type: QuestionType.TrueFalse,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_02_h3_text',
      mathExpression: '20 - 6 = 13',
      correctAnswer: 'false',
      explanation: 'lessons.q_01_02_h3_explanation'
    },
    {
      id: 'q-01-02-h4',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_02_h4_text',
      correctAnswer: '11',
      explanation: 'lessons.q_01_02_h4_explanation'
    },
    {
      id: 'q-01-02-h5',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_02_h5_text',
      mathExpression: '? - 8 = 9',
      options: ['lessons.q_01_02_h5_opt1', 'lessons.q_01_02_h5_opt2', 'lessons.q_01_02_h5_opt3'],
      correctAnswer: 'lessons.q_01_02_h5_opt2',
      explanation: 'lessons.q_01_02_h5_explanation'
    },
    {
      id: 'q-01-02-h6',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_02_h6_text',
      correctAnswer: '7',
      explanation: 'lessons.q_01_02_h6_explanation'
    },
  ]
};
