// services/lmsService.ts

import { Student, EducationalContent, Lesson, Question, LessonResult, QuestionType, Difficulty } from '../types';
import { initialContent } from '../data';

// Helper to generate unique IDs
const generateUniqueId = (prefix: string = 'id') => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Type for remembered students in localStorage
type RememberedStudent = { id: string; firstName: { ar: string, fr: string }; lastName: { ar: string, fr: string } };

class LmsService {
    private students: Student[] = [];
    private content: EducationalContent = initialContent;
    private rememberedStudents: RememberedStudent[] = [];

    constructor() {
        this.loadData();
    }
    
    // --- Data Persistence ---

    private loadData() {
        try {
            const storedContent = localStorage.getItem('tata_content');
            if (storedContent) {
                this.content = JSON.parse(storedContent);
            } else {
                this.saveContent();
            }

            const storedStudents = localStorage.getItem('tata_students');
            if (storedStudents) {
                this.students = JSON.parse(storedStudents);
            }

            const storedRemembered = localStorage.getItem('tata_remembered_students');
            if (storedRemembered) {
                this.rememberedStudents = JSON.parse(storedRemembered);
            }
        } catch (error) {
            console.error("Error loading data from localStorage:", error);
            // Fallback to defaults
            this.content = initialContent;
            this.students = [];
            this.rememberedStudents = [];
        }
    }

    private saveContent() {
        localStorage.setItem('tata_content', JSON.stringify(this.content));
    }
    
    public saveStudents(studentsToSave: Student[] = this.students) {
        localStorage.setItem('tata_students', JSON.stringify(studentsToSave));
        this.students = studentsToSave;
    }

    private saveRememberedStudents() {
        localStorage.setItem('tata_remembered_students', JSON.stringify(this.rememberedStudents));
    }

    public initializeData() {
       this.loadData();
    }

    // --- Content Management ---

    public getContent(): EducationalContent {
        return this.content;
    }
    
    public getLesson(lessonId: string): Lesson | undefined {
        for (const level of this.content.levels) {
            const lesson = level.lessons.find(l => l.id === lessonId);
            if (lesson) return lesson;
        }
        return undefined;
    }
    
    // --- Student Management ---

    public getStudents(): Student[] {
        return [...this.students];
    }
    
    public getStudent(id: string): Student | undefined {
        return this.students.find(s => s.id === id);
    }

    public addStudent(studentData: Omit<Student, 'id' | 'progress' | 'progressLevelId'>): Student {
        const newStudent: Student = {
            ...studentData,
            id: `S${Date.now()}`,
            progress: {},
            progressLevelId: studentData.studyLevelId,
        };
        this.students.push(newStudent);
        this.saveStudents();
        return newStudent;
    }

    public updateStudent(updatedStudent: Student) {
        const index = this.students.findIndex(s => s.id === updatedStudent.id);
        if (index !== -1) {
            this.students[index] = updatedStudent;
            this.saveStudents();
        }
    }

    public updateStudentPassword(studentId: string, newPassword: string): boolean {
        const student = this.getStudent(studentId);
        if (student) {
            student.password = newPassword;
            this.updateStudent(student);
            return true;
        }
        return false;
    }
    
    public authenticateStudent(id: string, password: string): Student | null {
        const student = this.students.find(s => s.id.toLowerCase() === id.toLowerCase() && s.password === password);
        return student || null;
    }
    
    // --- Remembered Students ---
    
    public getRememberedStudents(): RememberedStudent[] {
        return [...this.rememberedStudents];
    }
    
    public addRememberedStudent(student: Student) {
        if (!this.rememberedStudents.some(rs => rs.id === student.id)) {
            this.rememberedStudents.push({
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
            });
            this.saveRememberedStudents();
        }
    }
    
    public removeRememberedStudent(studentId: string) {
        this.rememberedStudents = this.rememberedStudents.filter(rs => rs.id !== studentId);
        this.saveRememberedStudents();
    }

    // --- Quiz and Progress Logic ---
    
    public generateQuizQuestions(lessonId: string): Question[] {
        const lesson = this.getLesson(lessonId);
        if (!lesson || lesson.questions.length < 10) return [];

        const shuffleArray = <T>(array: T[]): T[] => {
            return [...array].sort(() => 0.5 - Math.random());
        };

        // Filter questions by difficulty
        const easyQuestions = lesson.questions.filter(q => q.difficulty === Difficulty.Easy);
        const mediumQuestions = lesson.questions.filter(q => q.difficulty === Difficulty.Medium);
        const hardQuestions = lesson.questions.filter(q => q.difficulty === Difficulty.Hard);
        const deepQuestions = lesson.questions.filter(q => q.difficulty === Difficulty.Deep);

        // Take a random sample from each difficulty category
        const selectedEasy = shuffleArray(easyQuestions).slice(0, 4);
        const selectedMedium = shuffleArray(mediumQuestions).slice(0, 3);
        const selectedHard = shuffleArray(hardQuestions).slice(0, 2);
        const selectedDeep = shuffleArray(deepQuestions).slice(0, 1);

        // Concatenate and shuffle the final quiz questions
        const finalQuizQuestions = [
            ...selectedEasy,
            ...selectedMedium,
            ...selectedHard,
            ...selectedDeep,
        ];

        return shuffleArray(finalQuizQuestions);
    }
    
    public submitQuiz(studentId: string, lessonId: string, answers: Record<string, string>, totalQuestions: number, durationInSeconds: number) {
        const student = this.getStudent(studentId);
        const lesson = this.getLesson(lessonId);
        if (!student || !lesson) {
            return { result: null, leveledUp: false };
        }

        let score = 0;
        lesson.questions.forEach(q => {
            const correctAnswer = (q.correctAnswer.fr || q.correctAnswer.ar).toLowerCase();
            const studentAnswer = (answers[q.id] || "").toLowerCase();
            if (studentAnswer && studentAnswer === correctAnswer) {
                score++;
            }
        });

        const PASSING_SCORE = 7;
        const now = new Date().toISOString();
        const existingResult = student.progress[lessonId];
        
        const newResult: LessonResult = {
            score,
            totalQuestions,
            passed: score >= PASSING_SCORE,
            firstAttemptDate: existingResult?.firstAttemptDate || now,
            lastAttemptDate: now,
            answers,
            attempts: (existingResult?.attempts || 0) + 1,
            durationInSeconds: (score >= PASSING_SCORE) ? durationInSeconds : existingResult?.durationInSeconds,
        };
        
        student.progress[lessonId] = newResult;

        // Check for level up
        let leveledUp = false;
        const currentLevel = this.content.levels.find(level => level.lessons.some(l => l.id === lessonId));
        if (currentLevel && student.progressLevelId === currentLevel.id && newResult.passed) {
             const levelLessons = currentLevel.lessons.filter(l => l.questions.length >= 10);
             const allPassed = levelLessons.every(l => student.progress[l.id]?.passed);
             if (allPassed) {
                 const currentLevelIndex = this.content.levels.findIndex(l => l.id === currentLevel.id);
                 if (currentLevelIndex < this.content.levels.length - 1) {
                     student.progressLevelId = this.content.levels[currentLevelIndex + 1].id;
                     leveledUp = true;
                 }
             }
        }

        this.updateStudent(student);
        
        return { result: newResult, leveledUp };
    }

    public isLessonUnlocked(student: Student, lessonId: string): boolean {
        if (student.id === 'DEMO_STUDENT') {
            const lessonLevelId = this.content.levels.find(l => l.lessons.some(ls => ls.id === lessonId))?.id;
            return lessonLevelId === 'level-01';
        }

        const lessonLevelIndex = this.content.levels.findIndex(level => level.lessons.some(l => l.id === lessonId));
        const studentLevelIndex = this.content.levels.findIndex(level => level.id === student.progressLevelId);
        
        return lessonLevelIndex <= studentLevelIndex;
    }
    
    // --- Content CRUD for Teacher View ---
    
    public addLesson(levelId: string, lessonData: Pick<Lesson, 'title'>) {
        const level = this.content.levels.find(l => l.id === levelId);
        if (level) {
            const newLesson: Lesson = {
                id: `lesson_${Date.now()}`,
                title: lessonData.title,
                questions: []
            };
            level.lessons.push(newLesson);
            this.saveContent();
        }
    }
    
    public updateLesson(updatedLesson: Lesson) {
        for (const level of this.content.levels) {
            const index = level.lessons.findIndex(l => l.id === updatedLesson.id);
            if (index !== -1) {
                level.lessons[index] = updatedLesson;
                this.saveContent();
                return;
            }
        }
    }

    public deleteLesson(lessonId: string) {
        this.content.levels.forEach(level => {
            level.lessons = level.lessons.filter(l => l.id !== lessonId);
        });
        this.saveContent();
    }
    
    public addQuestion(lessonId: string, questionData: Omit<Question, 'id'>) {
        const lesson = this.getLesson(lessonId);
        if (lesson) {
            const newQuestion: Question = {
                ...questionData,
                id: `q_${Date.now()}`
            };
            lesson.questions.push(newQuestion);
            this.saveContent();
        }
    }
    
    public updateQuestion(lessonId: string, updatedQuestion: Question) {
        const lesson = this.getLesson(lessonId);
        if (lesson) {
            const index = lesson.questions.findIndex(q => q.id === updatedQuestion.id);
            if (index !== -1) {
                lesson.questions[index] = updatedQuestion;
                this.saveContent();
            }
        }
    }

    public deleteQuestion(lessonId: string, questionId: string) {
        const lesson = this.getLesson(lessonId);
        if (lesson) {
            lesson.questions = lesson.questions.filter(q => q.id !== questionId);
            this.saveContent();
        }
    }

    // --- Import / Export ---
    public importAllData(jsonString: string) {
        const data = JSON.parse(jsonString);
        if (data.content && data.students) {
            this.content = data.content;
            this.students = data.students;
            this.rememberedStudents = data.rememberedStudents || [];
            this.saveContent();
            this.saveStudents();
            this.saveRememberedStudents();
        } else {
            throw new Error("Invalid import file structure.");
        }
    }
}

export const lmsService = new LmsService();