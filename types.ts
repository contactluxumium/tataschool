// types.ts

export type LocalizedString = {
  ar: string;
  fr: string;
};

export enum QuestionType {
  MultipleChoice = 'MCQ',
  TrueFalse = 'TF',
  NumericInput = 'NUMERIC',
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  Deep = 'Deep', // Integral Situation Or Problem Situation
}

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  text: LocalizedString;
  mathExpression?: string;
  options?: LocalizedString[];
  correctAnswer: LocalizedString;
  explanation?: LocalizedString;
}

export interface Lesson {
  id: string;
  title: LocalizedString;
  questions: Question[];
}

export interface Level {
  id: string;
  title: LocalizedString;
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
  answers: Record<string, string>; // Storing the answer string in the current language
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
