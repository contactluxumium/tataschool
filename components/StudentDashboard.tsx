import React, { useState, useEffect } from 'react';
import { Student, LessonResult } from '../types';
import { lmsService } from '../services/lmsService';
import { LogOut, Users } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { STUDY_LEVEL_IDS } from '../constants';

interface StudentDashboardProps {
  student: Student;
  onStartLesson: (lessonId: string) => void;
  onSwitchStudent: () => void;
  onSwitchAccount: () => void;
  onStudentUpdate: (student: Student) => void;
}

const createIcon = (svg: string) => {
    return ({ className }: { className?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};

const BookIcon = createIcon(`<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`);
const CheckCircleIcon = createIcon(`<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`);
const LockIcon = createIcon(`<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`);
const PlayCircleIcon = createIcon(`<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>`);
const StarIcon = createIcon(`<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`);
const PencilIcon = createIcon(`<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>`);
const XIcon = createIcon(`<path d="M18 6 6 18"/><path d="M6 6l12 12"/>`);
const RepeatIcon = createIcon(`<path d="M17 2.1a9 9 0 0 1 1.4 12.6"/><path d="M21.5 10.5h-4.3v-4.3"/><path d="M7 21.9a9 9 0 0 1-1.4-12.6"/><path d="M2.5 13.5h4.3v4.3"/>`);
const ClockIcon = createIcon(`<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`);
const AlertTriangleIcon = createIcon(`<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>`);
const CrosshairIcon = createIcon(`<circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/>`);


const formatDuration = (totalSeconds: number) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};


export const StudentDashboard: React.FC<StudentDashboardProps> = ({ student, onStartLesson, onSwitchStudent, onSwitchAccount, onStudentUpdate }) => {
  const { t, language } = useTranslation();
  const content = lmsService.getContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ 
    schoolNameAr: student.schoolName.ar, 
    schoolNameFr: student.schoolName.fr, 
    studyLevelId: student.studyLevelId 
  });

  useEffect(() => {
    if (isEditModalOpen) {
      setEditData({ 
        schoolNameAr: student.schoolName.ar, 
        schoolNameFr: student.schoolName.fr, 
        studyLevelId: student.studyLevelId 
      });
    }
  }, [isEditModalOpen, student]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStudent: Student = {
        ...student,
        schoolName: {
          ar: editData.schoolNameAr.trim(),
          fr: editData.schoolNameFr.trim(),
        },
        studyLevelId: editData.studyLevelId,
    };
    lmsService.updateStudent(updatedStudent);
    onStudentUpdate(updatedStudent);
    setIsEditModalOpen(false);
  };

  const progressValues = (Object.values(student.progress) as LessonResult[]);
  const totalCompleted = progressValues.filter(p => p.passed).length;
  const studyLevelName = t(`levels.${student.studyLevelId}`) || t('studentDashboard.unspecified');

  const totalLessonsWithQuestions = content.levels.flatMap(l => l.lessons).filter(l => l.questions.length === 20).length;
  const lessonsPercentage = totalLessonsWithQuestions > 0 ? Math.round((totalCompleted / totalLessonsWithQuestions) * 100) : 0;

  const totalPointsEarned = progressValues.reduce((sum, p) => sum + p.score, 0);
  const totalAttemptedPoints = progressValues.reduce((sum, p) => sum + p.totalQuestions, 0);
  const scorePercentage = totalAttemptedPoints > 0 ? Math.round((totalPointsEarned / totalAttemptedPoints) * 100) : 0;

  const totalAttempts = progressValues.reduce((sum, p) => sum + p.attempts, 0);
  const focusPercentage = totalAttempts > 0 ? Math.round((totalCompleted / totalAttempts) * 100) : 0;

  const studentLevelIndex = content.levels.findIndex(l => l.id === student.progressLevelId);
  
  const level1 = content.levels.find(l => l.id === 'level-01');
  const level1LessonsWithQuestions = level1 ? level1.lessons.filter(l => l.questions.length === 20) : [];
  const isLevel1CompleteForDemo = student.id === 'DEMO_STUDENT' && level1LessonsWithQuestions.length > 0 && level1LessonsWithQuestions.every(l => student.progress[l.id]?.passed);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {student.id === 'DEMO_STUDENT' && (
        <div className="p-4 text-sm text-yellow-800 rounded-lg bg-yellow-100 flex items-center gap-3" role="alert">
            <AlertTriangleIcon className="w-5 h-5" />
            <div>
                <span className="font-bold">{t('studentDashboard.demoAlert')} </span>
                <button onClick={onSwitchStudent} className="font-bold underline hover:text-yellow-900">{t('studentDashboard.createNewAccount')}</button>.
            </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md border-t-4 border-blue-500">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">{t('studentDashboard.welcome', { name: `${student.firstName[language]} ${student.lastName[language]}` })}</h2>
          <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 mt-2 text-gray-500 text-sm">
            <span><b>{t('studentDashboard.school')}:</b> {student.schoolName[language]}</span>
            <span><b>{t('studentDashboard.studyLevel')}:</b> {studyLevelName}</span>
            {student.id !== 'DEMO_STUDENT' && (
              <button onClick={() => setIsEditModalOpen(true)} className="p-1 rounded-full hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors" aria-label={t('studentDashboard.updateProfile')}>
                  <PencilIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-gray-600 mt-2">{t('studentDashboard.description')}</p>
        </div>
        <div className="flex items-center gap-4 mt-2">
            <button onClick={onSwitchAccount} className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors">
                <Users className="w-5 h-5" />
                <span>{t('studentDashboard.changeAccount')}</span>
            </button>
            <button onClick={onSwitchStudent} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                <LogOut className="w-5 h-5" />
                <span>{t('common.logout')}</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <CheckCircleIcon className="h-8 w-8 text-green-500 me-3"/>
                    <h3 className="text-lg font-bold text-gray-700">{t('studentDashboard.lessonsCompleted')}</h3>
                </div>
                <span className="text-2xl font-bold text-green-600">{lessonsPercentage}%</span>
            </div>
            <p className="text-gray-600 text-center mb-2">
                {t('studentDashboard.completedOutOf', { completed: totalCompleted, total: totalLessonsWithQuestions })}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: `${lessonsPercentage}%` }}></div>
            </div>
        </div>
        
        <div className="flex flex-col p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <CrosshairIcon className="h-8 w-8 text-blue-500 me-3"/>
                    <h3 className="text-lg font-bold text-gray-700">{t('studentDashboard.focusAccuracy')}</h3>
                </div>
                <span className="text-2xl font-bold text-blue-600">{focusPercentage}%</span>
            </div>
            <p className="text-gray-600 text-center mb-2">
                {t('studentDashboard.completedInAttempts', { completed: totalCompleted, total: totalAttempts })}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${focusPercentage}%` }}></div>
            </div>
        </div>

        <div className="flex flex-col p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <StarIcon className="h-8 w-8 text-yellow-500 me-3"/>
                    <h3 className="text-lg font-bold text-gray-700">{t('studentDashboard.totalPoints')}</h3>
                </div>
                <span className="text-2xl font-bold text-yellow-600">{scorePercentage}%</span>
            </div>
            <p className="text-gray-600 text-center mb-2">
                {t('studentDashboard.pointsOutOf', { earned: totalPointsEarned, possible: totalAttemptedPoints })}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-yellow-500 h-4 rounded-full" style={{ width: `${scorePercentage}%` }}></div>
            </div>
        </div>
      </div>


      {content.levels.map((level, index) => {
        const isLevelLocked = index > studentLevelIndex;
        return (
          <React.Fragment key={level.id}>
            {level.id === 'level-02' && isLevel1CompleteForDemo && (
              <div className="p-4 mb-8 text-center text-emerald-800 rounded-lg bg-emerald-100 border-t-4 border-emerald-500 shadow-lg" role="alert">
                <h3 className="text-xl font-bold">{t('studentDashboard.level1CompleteTitle')}</h3>
                <p className="mt-2 text-md">{t('studentDashboard.level1CompletePrompt')}</p>
                <button 
                  onClick={onSwitchStudent} 
                  className="mt-4 px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-transform transform hover:scale-105"
                >
                  {t('studentDashboard.createAccountNow')}
                </button>
              </div>
            )}
            <div className={`p-6 rounded-lg shadow-md ${isLevelLocked ? 'bg-gray-200' : 'bg-white'}`}>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                {isLevelLocked ? <LockIcon className="w-6 h-6 me-2" /> : <BookIcon className="w-6 h-6 me-2 text-blue-600" />}
                {t(level.title)}
              </h3>
              {isLevelLocked ? (
                <p className="text-gray-500">{t('studentDashboard.levelLocked')}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {level.lessons.filter(l => l.questions.length === 20).map(lesson => {
                    const result = student.progress[lesson.id];
                    const isUnlocked = lmsService.isLessonUnlocked(student, lesson.id);
                    const status = result?.passed ? 'passed' : result ? 'failed' : 'pending';

                    return (
                      <div key={lesson.id} className={`p-4 rounded-lg border-2 transform transition-transform duration-300 hover:-translate-y-1 ${
                          !isUnlocked ? 'bg-gray-100 border-gray-300' 
                          : status === 'passed' ? 'bg-green-50 border-green-400'
                          : status === 'failed' ? 'bg-red-50 border-red-400'
                          : 'bg-white border-gray-300'
                      }`}>
                        <h4 className="font-bold text-lg text-gray-800">{t(lesson.title)}</h4>
                        
                        <div className="mt-3 text-sm flex justify-between items-center gap-2">
                            <div className="flex items-center gap-1.5 text-yellow-700">
                                <RepeatIcon className="w-4 h-4" />
                                <span className="font-bold">{t('studentDashboard.totalAttempts')}: {result?.attempts || 0}</span>
                            </div>

                            {result?.passed && typeof result.durationInSeconds === 'number' && (
                                <div className="flex items-center gap-1.5 text-teal-600">
                                    <ClockIcon className="w-4 h-4" />
                                    <span className="font-bold">{t('studentDashboard.duration')}: {formatDuration(result.durationInSeconds)}</span>
                                </div>
                            )}

                            {result && (
                                <div className="flex items-center gap-1.5 text-blue-600">
                                    <StarIcon className="w-4 h-4" />
                                    <span className="font-bold">{t('studentDashboard.result')}: {result.score}/{result.totalQuestions}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-4">
                          <button
                            onClick={() => onStartLesson(lesson.id)}
                            disabled={!isUnlocked}
                            className="w-full flex items-center justify-center px-4 py-2 rounded-md text-white font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                          >
                            {!isUnlocked ? <LockIcon className="w-5 h-5 me-2" /> : <PlayCircleIcon className="w-5 h-5 me-2" />}
                            <span>{result ? t('studentDashboard.retakeLesson') : t('studentDashboard.startLesson')}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold">{t('studentDashboard.updateProfileTitle')}</h3>
                    <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleUpdateProfile}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="schoolNameFr" className="block text-sm font-medium text-gray-700 mb-1">{t('studentAuth.schoolNameFr')}</label>
                            <input
                                id="schoolNameFr"
                                type="text"
                                value={editData.schoolNameFr}
                                onChange={e => setEditData({ ...editData, schoolNameFr: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                maxLength={80}
                                required
                            />
                        </div>
                         <div>
                            <label htmlFor="schoolNameAr" className="block text-sm font-medium text-gray-700 mb-1">{t('studentAuth.schoolNameAr')}</label>
                            <input
                                id="schoolNameAr"
                                type="text"
                                value={editData.schoolNameAr}
                                onChange={e => setEditData({ ...editData, schoolNameAr: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                maxLength={80}
                                dir="rtl"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="studyLevelId" className="block text-sm font-medium text-gray-700 mb-1">{t('studentAuth.studyLevel')}</label>
                            <select
                                id="studyLevelId"
                                value={editData.studyLevelId}
                                onChange={e => setEditData({ ...editData, studyLevelId: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                            >
                                {STUDY_LEVEL_IDS.map(levelId => <option key={levelId} value={levelId}>{t(`levels.${levelId}`)}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end p-4 border-t bg-gray-50">
                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md me-2 hover:bg-gray-300">
                            {t('common.cancel')}
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            {t('studentDashboard.saveChanges')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};