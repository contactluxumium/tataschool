import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-01-01',
  title: 'lessons.lesson_01_01_title',
  questions: [
    // Easy
    {
      id: 'q-01-01-e1',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_01_e1_text',
      mathExpression: '2 + 1',
      correctAnswer: '3',
      explanation: 'lessons.q_01_01_e1_explanation'
    },
    {
      id: 'q-01-01-e2',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_01_e2_text',
      mathExpression: '4 + 2',
      correctAnswer: '6',
      explanation: 'lessons.q_01_01_e2_explanation'
    },
    {
      id: 'q-01-01-e3',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_01_e3_text',
      mathExpression: '5 + 0',
      options: ['lessons.q_01_01_e3_opt1', 'lessons.q_01_01_e3_opt2', 'lessons.q_01_01_e3_opt3'],
      correctAnswer: 'lessons.q_01_01_e3_opt2',
      explanation: 'lessons.q_01_01_e3_explanation'
    },
    {
      id: 'q-01-01-e4',
      type: QuestionType.TrueFalse,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_01_e4_text',
      mathExpression: '3 + 3 = 6',
      correctAnswer: 'true',
      explanation: 'lessons.q_01_01_e4_explanation'
    },
    {
      id: 'q-01-01-e5',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_01_e5_text',
      correctAnswer: '7',
      explanation: 'lessons.q_01_01_e5_explanation'
    },
    {
      id: 'q-01-01-e6',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_01_e6_text',
      mathExpression: '6 + 4',
      options: ['lessons.q_01_01_e6_opt1', 'lessons.q_01_01_e6_opt2', 'lessons.q_01_01_e6_opt3'],
      correctAnswer: 'lessons.q_01_01_e6_opt2',
      explanation: 'lessons.q_01_01_e6_explanation'
    },
    {
      id: 'q-01-01-e7',
      type: QuestionType.TrueFalse,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_01_e7_text',
      mathExpression: '2 + 5 = 8',
      // FIX: Corrected the answer from 'true' to 'false' as 2 + 5 = 7, not 8.
      correctAnswer: 'false',
      explanation: 'lessons.q_01_01_e7_explanation'
    },
    {
      id: 'q-01-01-e8',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Easy,
      text: 'lessons.q_01_01_e8_text',
      mathExpression: '2, 4, 6, ...',
      correctAnswer: '8',
      explanation: 'lessons.q_01_01_e8_explanation'
    },
    // Medium
    {
      id: 'q-01-01-m1',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_01_m1_text',
      mathExpression: '9 + 7',
      correctAnswer: '16',
      explanation: 'lessons.q_01_01_m1_explanation'
    },
    {
      id: 'q-01-01-m2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_01_m2_text',
      mathExpression: '8 + 8',
      options: ['lessons.q_01_01_m2_opt1', 'lessons.q_01_01_m2_opt2', 'lessons.q_01_01_m2_opt3'],
      correctAnswer: 'lessons.q_01_01_m2_opt2',
      explanation: 'lessons.q_01_01_m2_explanation'
    },
    {
      id: 'q-01-01-m3',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_01_m3_text',
      correctAnswer: '13',
      explanation: 'lessons.q_01_01_m3_explanation'
    },
    {
      id: 'q-01-01-m4',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_01_m4_text',
      mathExpression: '5 + 11',
      correctAnswer: '16',
      explanation: 'lessons.q_01_01_m4_explanation'
    },
    {
      id: 'q-01-01-m5',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_01_m5_text',
      mathExpression: '9 + ? = 15',
      options: ['lessons.q_01_01_m5_opt1', 'lessons.q_01_01_m5_opt2', 'lessons.q_01_01_m5_opt3'],
      correctAnswer: 'lessons.q_01_01_m5_opt2',
      explanation: 'lessons.q_01_01_m5_explanation'
    },
    {
      id: 'q-01-01-m6',
      type: QuestionType.TrueFalse,
      difficulty: Difficulty.Medium,
      text: 'lessons.q_01_01_m6_text',
      mathExpression: '12 + 6 = 18',
      correctAnswer: 'true',
      explanation: 'lessons.q_01_01_m6_explanation'
    },
    // Hard
    {
      id: 'q-01-01-h1',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_01_h1_text',
      mathExpression: '14 + 8',
      correctAnswer: '22',
      explanation: 'lessons.q_01_01_h1_explanation'
    },
    {
      id: 'q-01-01-h2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_01_h2_text',
      mathExpression: '7 + 5 + 8',
      options: ['lessons.q_01_01_h2_opt1', 'lessons.q_01_01_h2_opt2', 'lessons.q_01_01_h2_opt3'],
      correctAnswer: 'lessons.q_01_01_h2_opt2',
      explanation: 'lessons.q_01_01_h2_explanation'
    },
    {
      id: 'q-01-01-h3',
      type: QuestionType.TrueFalse,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_01_h3_text',
      mathExpression: '13 + 9 = 21',
      correctAnswer: 'false',
      explanation: 'lessons.q_01_01_h3_explanation'
    },
    {
      id: 'q-01-01-h4',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_01_h4_text',
      mathExpression: '11 + 13',
      correctAnswer: '24',
      explanation: 'lessons.q_01_01_h4_explanation'
    },
    {
      id: 'q-01-01-h5',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_01_h5_text',
      options: ['lessons.q_01_01_h5_opt1', 'lessons.q_01_01_h5_opt2', 'lessons.q_01_01_h5_opt3'],
      correctAnswer: 'lessons.q_01_01_h5_opt2',
      explanation: 'lessons.q_01_01_h5_explanation'
    },
    {
      id: 'q-01-01-h6',
      type: QuestionType.NumericInput,
      difficulty: Difficulty.Hard,
      text: 'lessons.q_01_01_h6_text',
      mathExpression: '7 + ? = 20',
      correctAnswer: '13',
      explanation: 'lessons.q_01_01_h6_explanation'
    },
  ]
};