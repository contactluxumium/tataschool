// FIX: Export all type definitions so they can be imported by other modules.
export type LocalizedString = {
  ar: string;
  fr: string;
};

export enum QuestionType {
  MultipleChoice = 'MCQ',
  NumericInput = 'NUMERIC',
  TrueFalse = 'TF',
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  text: string;
  mathExpression?: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  questions: Question[];
}

export interface Level {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface EducationalContent {
  levels: Level[];
}

export interface LessonResult {
  score: number;
  totalQuestions: number;
  passed: boolean;
  firstAttemptDate: string;
  lastAttemptDate: string;
  answers: Record<string, string>;
  attempts: number;
  durationInSeconds?: number;
}

export type StudentProgress = Record<string, LessonResult>;

export interface Student {
  id: string;
  password: string;
  firstName: LocalizedString;
  lastName: LocalizedString;
  gender: 'male' | 'female';
  birthYear: number;
  schoolName: LocalizedString;
  schoolType: 'pioneer' | 'regular';
  studyLevelId: string;
  progressLevelId: string;
  progress: StudentProgress;
}
