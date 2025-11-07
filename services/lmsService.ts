import { EducationalContent, Student, LessonResult, Level, Lesson, Difficulty, Question, QuestionType, StudentProgress } from '../types';
import { initialContent } from '../data';

const CONTENT_KEY = 'lms-content';
const STUDENTS_KEY = 'lms-students';
const REMEMBERED_STUDENTS_KEY = 'lms-remembered-students';
const PASSING_SCORE = 7;

// This service acts as the single source of truth for data access and manipulation.
// It abstracts away the localStorage implementation details.

type RememberedStudentData = { id: string; firstName: { ar: string, fr: string }; lastName: { ar: string, fr: string } };


class LmsService {
  // --- Initialization ---

  initializeData(): void {
    if (!localStorage.getItem(CONTENT_KEY)) {
      this.saveContent(initialContent);
    }
    if (!localStorage.getItem(STUDENTS_KEY)) {
      // --- Student 1: Admin/Unlocked account ---
      const fullProgress: StudentProgress = {};
      const now = new Date().toISOString();
      initialContent.levels.forEach(level => {
        level.lessons.forEach(lesson => {
          if (lesson.questions.length > 0) { // Only mark lessons with questions as passed
            fullProgress[lesson.id] = {
              score: 10,
              totalQuestions: 10,
              passed: true,
              firstAttemptDate: now,
              lastAttemptDate: now,
              answers: {},
              attempts: 1,
              durationInSeconds: Math.floor(Math.random() * (119 - 39 + 1)) + 39, // Random duration between 39 second and 2 minutes
            };
          }
        });
      });

      const adminStudent: Student = {
        id: 'P202502031993',
        password: '14584135',
        firstName: { ar: 'أسامة', fr: 'Oussama' },
        lastName: { ar: 'وعراب', fr: 'Ouarrab' },
        gender: 'male',
        birthYear: 1993,
        schoolName: { ar: 'إفنت أرتس', fr: 'Event Arts' },
        schoolType: 'pioneer',
        studyLevelId: 'level-12',
        progressLevelId: 'level-12', // Progress is at max since all lessons are unlocked
        progress: fullProgress,
      };

      // --- Student 2: Default/Locked account ---
      const defaultStudent: Student = {
        id: 'E202512345678',
        password: '12345678',
        firstName: { ar: 'حساب', fr: 'Compte' },
        lastName: { ar: 'افتراضي', fr: 'Par Défaut' },
        gender: 'male',
        birthYear: 2015,
        schoolName: { ar: 'مؤسسة افتراضية', fr: 'École Virtuelle' },
        schoolType: 'regular',
        studyLevelId: 'level-01',
        progressLevelId: 'level-01', // Starts from the beginning
        progress: {}, // No progress means all lessons are locked initially
      };

      localStorage.setItem(STUDENTS_KEY, JSON.stringify([adminStudent, defaultStudent]));
    }
  }
  
  // --- Content Management ---

  getContent(): EducationalContent {
    const content = localStorage.getItem(CONTENT_KEY);
    // If localStorage is empty, it will fall back to the initial seed data.
    return content ? JSON.parse(content) : initialContent;
  }

  saveContent(content: EducationalContent): void {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  }

  getLesson(lessonId: string): Lesson | undefined {
    const content = this.getContent();
    for (const level of content.levels) {
        const lesson = level.lessons.find(l => l.id === lessonId);
        if(lesson) return lesson;
    }
    return undefined;
  }

  // --- Lesson CRUD ---
  addLesson(levelId: string, lessonData: Omit<Lesson, 'id' | 'questions'>): void {
    const content = JSON.parse(JSON.stringify(this.getContent()));
    const level = content.levels.find(l => l.id === levelId);
    if (level) {
      const newLesson: Lesson = {
        ...lessonData,
        id: `lesson-${level.id.split('-')[1]}-${Date.now()}`,
        questions: []
      };
      level.lessons.push(newLesson);
      this.saveContent(content);
    }
  }
  
  updateLesson(updatedLesson: Lesson): void {
    const content = JSON.parse(JSON.stringify(this.getContent()));
    let found = false;
    for (const level of content.levels) {
      const lessonIndex = level.lessons.findIndex(l => l.id === updatedLesson.id);
      if (lessonIndex !== -1) {
        level.lessons[lessonIndex] = updatedLesson;
        found = true;
        break;
      }
    }
    if (found) {
      this.saveContent(content);
    }
  }

  deleteLesson(lessonId: string): void {
    const content = JSON.parse(JSON.stringify(this.getContent()));
    let lessonFoundAndRemoved = false;
    for (const level of content.levels) {
        const lessonIndex = level.lessons.findIndex(l => l.id === lessonId);
        if (lessonIndex !== -1) {
            level.lessons.splice(lessonIndex, 1);
            lessonFoundAndRemoved = true;
            break;
        }
    }
    if (lessonFoundAndRemoved) {
        this.saveContent(content);
    }
  }

  // --- Question CRUD ---
  addQuestion(lessonId: string, questionData: Omit<Question, 'id'>): void {
    const content = JSON.parse(JSON.stringify(this.getContent()));
    let found = false;
    for (const level of content.levels) {
        const lesson = level.lessons.find(l => l.id === lessonId);
        if (lesson) {
            const newQuestion: Question = {
                ...questionData,
                id: `q-${lesson.id.split('-')[1]}-${lesson.id.split('-')[2]}-${Date.now()}`
            };
            lesson.questions.push(newQuestion);
            found = true;
            break;
        }
    }
    if (found) {
        this.saveContent(content);
    }
  }

  updateQuestion(lessonId: string, updatedQuestion: Question): void {
    const content = JSON.parse(JSON.stringify(this.getContent()));
    let found = false;
    for (const level of content.levels) {
        const lesson = level.lessons.find(l => l.id === lessonId);
        if (lesson) {
            const questionIndex = lesson.questions.findIndex(q => q.id === updatedQuestion.id);
            if (questionIndex !== -1) {
                lesson.questions[questionIndex] = updatedQuestion;
                found = true;
                break;
            }
        }
    }
    if (found) {
        this.saveContent(content);
    }
  }

  deleteQuestion(lessonId: string, questionId: string): void {
    const content = JSON.parse(JSON.stringify(this.getContent()));
    let questionFoundAndRemoved = false;
    for (const level of content.levels) {
        const lesson = level.lessons.find(l => l.id === lessonId);
        if (lesson) {
            const questionIndex = lesson.questions.findIndex(q => q.id === questionId);
            if (questionIndex !== -1) {
                lesson.questions.splice(questionIndex, 1);
                questionFoundAndRemoved = true;
                break;
            }
        }
    }
    if (questionFoundAndRemoved) {
        this.saveContent(content);
    }
  }


  // --- Student Management ---

  getStudents(): Student[] {
    const students = localStorage.getItem(STUDENTS_KEY);
    return students ? JSON.parse(students) : [];
  }

  saveStudents(students: Student[]): void {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }

  getStudent(studentId: string): Student | undefined {
    return this.getStudents().find(s => s.id.toLowerCase() === studentId.toLowerCase());
  }

  addStudent(studentData: Omit<Student, 'id' | 'progress' | 'progressLevelId'>): Student {
    const students = this.getStudents();
    const currentYear = new Date().getFullYear();
    
    let newId = '';
    let isUnique = false;
    while (!isUnique) {
      // Generate an 8-digit random number
      const randomPart = Math.floor(10000000 + Math.random() * 90000000).toString();
      newId = `E${currentYear}${randomPart}`;
      if (!students.some(s => s.id === newId)) {
        isUnique = true;
      }
    }

    const newStudent: Student = {
      ...studentData,
      id: newId,
      progressLevelId: 'level-01', // All students start their progress from the first level
      progress: {},
    };
    students.push(newStudent);
    this.saveStudents(students);
    return newStudent;
  }
  
  updateStudent(updatedStudent: Student): void {
    const students = this.getStudents();
    const index = students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      students[index] = updatedStudent;
      this.saveStudents(students);
    }
  }

  updateStudentPassword(studentId: string, newPassword: string): void {
    const students = this.getStudents();
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        students[studentIndex].password = newPassword;
        this.saveStudents(students);
    }
  }

  authenticateStudent(studentId: string, password: string): Student | null {
    const student = this.getStudent(studentId);
    if (student && student.password === password) {
        return student;
    }
    return null;
  }

  // --- Remembered Students ---
  getRememberedStudents(): RememberedStudentData[] {
    const data = localStorage.getItem(REMEMBERED_STUDENTS_KEY);
    return data ? JSON.parse(data) : [];
  }

  addRememberedStudent(student: Student): void {
    const students = this.getRememberedStudents();
    if (students.some(s => s.id === student.id)) return; // Avoid duplicates
    const newStudents = [...students, { id: student.id, firstName: student.firstName, lastName: student.lastName }];
    localStorage.setItem(REMEMBERED_STUDENTS_KEY, JSON.stringify(newStudents));
  }

  removeRememberedStudent(studentId: string): void {
    let students = this.getRememberedStudents();
    students = students.filter(s => s.id !== studentId);
    localStorage.setItem(REMEMBERED_STUDENTS_KEY, JSON.stringify(students));
  }


  // --- Progress & Logic ---

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  generateQuizQuestions(lessonId: string): Question[] {
      const lesson = this.getLesson(lessonId);
      if (!lesson || lesson.questions.length === 0) {
          return [];
      }

      const easyQuestions = lesson.questions.filter(q => q.difficulty === Difficulty.Easy);
      const mediumQuestions = lesson.questions.filter(q => q.difficulty === Difficulty.Medium);
      const hardQuestions = lesson.questions.filter(q => q.difficulty === Difficulty.Hard);

      const selectedEasy = this.shuffleArray(easyQuestions).slice(0, 4);
      const selectedMedium = this.shuffleArray(mediumQuestions).slice(0, 3);
      const selectedHard = this.shuffleArray(hardQuestions).slice(0, 3);

      const quizQuestions = [...selectedEasy, ...selectedMedium, ...selectedHard];

      return this.shuffleArray(quizQuestions);
  }

  submitQuiz(studentId: string, lessonId: string, answers: Record<string, string>, totalQuizQuestions: number, durationInSeconds: number): { result: LessonResult, leveledUp: boolean } {
    const student = this.getStudent(studentId);
    const lesson = this.getLesson(lessonId);
    
    if (!student || !lesson) {
      throw new Error("Student or Lesson not found.");
    }
    
    let score = 0;
    // Iterate over the answered questions to calculate score
    for (const questionId in answers) {
        const question = lesson.questions.find(q => q.id === questionId);
        if (question && answers[questionId]?.toString().toLowerCase() === question.correctAnswer.toLowerCase()) {
            score++;
        }
    }

    const existingResult = student.progress[lessonId];
    const attemptCount = existingResult ? existingResult.attempts + 1 : 1;

    // If the lesson was already passed, it stays passed, regardless of the new score.
    const hasAlreadyPassed = existingResult?.passed === true;
    const newPassedStatus = score >= PASSING_SCORE || hasAlreadyPassed;
    
    const now = new Date().toISOString();

    const result: LessonResult = {
      score,
      totalQuestions: totalQuizQuestions,
      passed: newPassedStatus,
      firstAttemptDate: existingResult?.firstAttemptDate || now,
      lastAttemptDate: now,
      answers,
      attempts: attemptCount,
      // Only update duration if it's a new passing attempt. Keep old duration if they fail a retake.
      durationInSeconds: (score >= PASSING_SCORE) ? durationInSeconds : existingResult?.durationInSeconds,
    };
    
    student.progress[lessonId] = result;
    
    let leveledUp = false;
    if(result.passed) {
      leveledUp = this.checkAndAdvanceStudent(student);
    }

    this.updateStudent(student);
    return { result, leveledUp };
  }

  checkAndAdvanceStudent(student: Student): boolean {
    const content = this.getContent();
    const currentLevel = content.levels.find(l => l.id === student.progressLevelId);
    if (!currentLevel) return false;

    // Check if all lessons in the current level are passed
    const allLessonsPassed = currentLevel.lessons
        .filter(l => l.questions.length === 20) // Only consider lessons with content
        .every(l => student.progress[l.id]?.passed);

    if (allLessonsPassed) {
      const currentLevelIndex = content.levels.findIndex(l => l.id === student.progressLevelId);
      const nextLevel = content.levels[currentLevelIndex + 1];
      if (nextLevel) {
        student.progressLevelId = nextLevel.id;
        return true;
      }
    }
    return false;
  }

  isLessonUnlocked(student: Student, lessonId: string): boolean {
    const lesson = this.getLesson(lessonId);
    if (!lesson || lesson.questions.length < 20) {
        return false; // Lessons that are not complete with 20 questions are never unlocked.
    }

    // Rule 1: If a lesson has been successfully passed once, it remains unlocked forever.
    if (student.progress[lessonId]?.passed === true) {
      return true;
    }

    const content = this.getContent();
    let lessonLevelIndex = -1;
    let lessonIndexInLevel = -1;

    for (let i = 0; i < content.levels.length; i++) {
        const level = content.levels[i];
        const foundIndex = level.lessons.findIndex(l => l.id === lessonId);
        if (foundIndex !== -1) {
            lessonLevelIndex = i;
            lessonIndexInLevel = foundIndex;
            break;
        }
    }
    
    if (lessonLevelIndex === -1) return false; // Lesson doesn't exist

    const studentLevelIndex = content.levels.findIndex(l => l.id === student.progressLevelId);
    
    // A student can access any lesson within their current unlocked level or any previous level.
    return lessonLevelIndex <= studentLevelIndex;
  }
  
  // --- Global Import/Export ---
  importAllData(jsonString: string): void {
    const data = JSON.parse(jsonString);

    if (!data.content || !Array.isArray(data.content.levels)) {
        throw new Error("ملف النسخ الاحتياطي غير صالح: قسم 'content' مفقود أو بتنسيق خاطئ.");
    }
    if (!data.students || !Array.isArray(data.students)) {
        throw new Error("ملف النسخ الاحتياطي غير صالح: قسم 'students' مفقود أو بتنسيق خاطئ.");
    }

    this.saveContent(data.content);
    this.saveStudents(data.students);

    // Import remembered students if they exist in the backup
    if (data.rememberedStudents && Array.isArray(data.rememberedStudents)) {
        localStorage.setItem(REMEMBERED_STUDENTS_KEY, JSON.stringify(data.rememberedStudents));
    } else {
        localStorage.removeItem(REMEMBERED_STUDENTS_KEY);
    }
  }

}

// Export a singleton instance of the service
export const lmsService = new LmsService();