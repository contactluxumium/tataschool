import React, { useState, useEffect } from 'react';
import { Student, LessonResult } from '../types';
import { lmsService } from '../services/lmsService';
import { StudentDashboard } from './StudentDashboard';
import { QuizView } from './QuizView';
import { UserPlus, LogIn, ArrowRight, ClipboardCopy, Check, Sparkles, FlaskConical, Eye, EyeOff, UserCheck, XCircle } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { STUDY_LEVEL_IDS } from '../constants';

type RememberedStudent = { 
  id: string; 
  firstName: { ar: string, fr: string }; 
  lastName: { ar: string, fr: string } 
};

interface StudentViewProps {
  onNavigateHome: () => void;
}

export const StudentView: React.FC<StudentViewProps> = ({ onNavigateHome }) => {
  const { t, language } = useTranslation();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [view, setView] = useState<'initial' | 'login' | 'register'>('initial');

  // Registration state
  const [regData, setRegData] = useState({ 
    firstNameAr: '',
    firstNameFr: '',
    lastNameAr: '',
    lastNameFr: '',
    gender: 'male' as 'male' | 'female',
    birthYear: '',
    schoolNameAr: '', 
    schoolNameFr: '', 
    schoolType: 'pioneer' as 'pioneer' | 'regular',
    studyLevelId: 'level-01', 
    password: '', 
    confirmPassword: '' 
  });
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [newlyRegisteredStudent, setNewlyRegisteredStudent] = useState<Student | null>(null);
  const [copied, setCopied] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login state
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberedStudents, setRememberedStudents] = useState<RememberedStudent[]>([]);

  useEffect(() => {
    // Load remembered students on initial mount
    if (view === 'login') {
      setRememberedStudents(lmsService.getRememberedStudents());
    }
  }, [view]);

  const refreshStudentData = () => {
    if (selectedStudent && selectedStudent.id !== 'DEMO_STUDENT') {
      const updatedStudent = lmsService.getStudent(selectedStudent.id);
      if (updatedStudent) setSelectedStudent(updatedStudent);
    }
  };
  
  const validateRegistration = (): boolean => {
      const errors: Record<string, string> = {};
      if (!regData.firstNameFr.trim() || regData.firstNameFr.length > 40) errors.firstNameFr = t('studentAuth.fieldRequired', { field: t('studentAuth.firstNameFr') });
      if (!regData.firstNameAr.trim() || regData.firstNameAr.length > 40) errors.firstNameAr = t('studentAuth.fieldRequired', { field: t('studentAuth.firstNameAr') });
      if (!regData.lastNameFr.trim() || regData.lastNameFr.length > 40) errors.lastNameFr = t('studentAuth.fieldRequired', { field: t('studentAuth.lastNameFr') });
      if (!regData.lastNameAr.trim() || regData.lastNameAr.length > 40) errors.lastNameAr = t('studentAuth.fieldRequired', { field: t('studentAuth.lastNameAr') });
      
      if (!regData.birthYear.trim() || !/^\d{4}$/.test(regData.birthYear)) {
          errors.birthYear = t('studentAuth.birthYearError');
      } else {
          const year = parseInt(regData.birthYear, 10);
          const currentYear = new Date().getFullYear();
          if (year < 1950 || year > currentYear - 5) {
              errors.birthYear = t('studentAuth.birthYearInvalid');
          }
      }
      
      if (!regData.schoolNameFr.trim() || regData.schoolNameFr.length > 80) errors.schoolNameFr = t('studentAuth.fieldRequired', { field: t('studentAuth.schoolNameFr') });
      if (!regData.schoolNameAr.trim() || regData.schoolNameAr.length > 80) errors.schoolNameAr = t('studentAuth.fieldRequired', { field: t('studentAuth.schoolNameAr') });

      if (!/^\d{8}$/.test(regData.password)) errors.password = t('studentAuth.passwordError');
      if (regData.password !== regData.confirmPassword) errors.confirmPassword = t('studentAuth.confirmPasswordError');
      setRegErrors(errors);
      return Object.keys(errors).length === 0;
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateRegistration()) {
      const { 
        firstNameAr, firstNameFr, lastNameAr, lastNameFr, 
        schoolNameAr, schoolNameFr, confirmPassword, ...studentInfo 
      } = regData;
      
      const studentDataForService = {
        ...studentInfo,
        firstName: { ar: firstNameAr, fr: firstNameFr },
        lastName: { ar: lastNameAr, fr: lastNameFr },
        schoolName: { ar: schoolNameAr, fr: schoolNameFr },
        birthYear: parseInt(studentInfo.birthYear, 10)
      };
      const newStudent = lmsService.addStudent(studentDataForService);
      lmsService.addRememberedStudent(newStudent); // Automatically remember new user
      setNewlyRegisteredStudent(newStudent);
    }
  };
  
  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError('');
      const student = lmsService.authenticateStudent(loginId, loginPassword);
      if (student) {
          lmsService.addRememberedStudent(student); // Automatically remember logged in user
          setSelectedStudent(student);
      } else {
          setLoginError(t('studentAuth.loginError'));
      }
  };

  const handleDemoLogin = () => {
    const demoStudent: Student = {
      id: 'DEMO_STUDENT', // A unique ID to identify the demo user
      firstName: { ar: 'تلميذ', fr: 'Élève' },
      lastName: { ar: 'تجريبي', fr: 'Démo' },
      gender: 'male',
      birthYear: 2015,
      schoolName: { ar: 'مدرسة تجريبية', fr: 'École de Démo' },
      schoolType: 'regular',
      password: '', // Not needed
      studyLevelId: 'level-01',
      progressLevelId: 'level-01', // Restricts access to level 1
      progress: {},
    };
    setSelectedStudent(demoStudent);
  };

  const resetForms = () => {
      setRegData({ 
        firstNameAr: '',
        firstNameFr: '',
        lastNameAr: '',
        lastNameFr: '',
        gender: 'male',
        birthYear: '',
        schoolNameAr: '',
        schoolNameFr: '',
        schoolType: 'pioneer',
        studyLevelId: 'level-01', 
        password: '', 
        confirmPassword: '' 
      });
      setRegErrors({});
      setLoginId('');
      setLoginPassword('');
      setLoginError('');
  };

  const handleSwitchView = (newView: 'initial' | 'login' | 'register') => {
      resetForms();
      setView(newView);
  };
  
  const copyToClipboard = () => {
      if (newlyRegisteredStudent) {
          navigator.clipboard.writeText(newlyRegisteredStudent.id).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
          });
      }
  };

  const handleForgetStudent = (e: React.MouseEvent, studentId: string) => {
    e.stopPropagation(); // Prevent login when clicking the 'X'
    lmsService.removeRememberedStudent(studentId);
    setRememberedStudents(lmsService.getRememberedStudents());
  };
  
  const handleRememberedLogin = (studentId: string) => {
    const student = lmsService.getStudent(studentId);
    if (student) {
      setSelectedStudent(student);
    } else {
      setLoginError(t('studentAuth.accountNotFound'));
      lmsService.removeRememberedStudent(studentId); // Clean up
      setRememberedStudents(lmsService.getRememberedStudents());
    }
  };

  const handleLogout = () => {
    onNavigateHome();
  };

  if (activeLessonId && selectedStudent) {
    return (
      <QuizView
        lessonId={activeLessonId}
        student={selectedStudent}
        onQuizComplete={(newResult, lessonId) => {
          setActiveLessonId(null);
          if (selectedStudent?.id === 'DEMO_STUDENT' && newResult && lessonId) {
            setSelectedStudent(prevStudent => {
              if (!prevStudent) return null;
              const newProgress = { ...prevStudent.progress, [lessonId]: newResult };
              return { ...prevStudent, progress: newProgress };
            });
          } else {
            refreshStudentData();
          }
        }}
      />
    );
  }

  if (selectedStudent) {
    return (
      <StudentDashboard
        student={selectedStudent}
        onStartLesson={(lessonId) => setActiveLessonId(lessonId)}
        onSwitchStudent={handleLogout}
        onSwitchAccount={handleLogout}
        onStudentUpdate={(updatedStudent) => setSelectedStudent(updatedStudent)}
      />
    );
  }

  if (newlyRegisteredStudent) {
      return (
          <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center animate-fade-in-up">
              <h2 className="text-2xl font-bold text-green-600 mb-4">{t('studentAuth.registrationSuccessTitle')}</h2>
              <p className="text-gray-700 mb-2">{t('studentAuth.registrationSuccessWelcome', { name: newlyRegisteredStudent.firstName[language] })}</p>
              <p className="text-gray-700 mb-4">{t('studentAuth.registrationSuccessPrompt')}</p>
              <div className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 mb-6">
                  <span className="text-lg font-bold text-gray-800 tracking-wider">{newlyRegisteredStudent.id}</span>
                  <button onClick={copyToClipboard} title={copied ? t('studentAuth.copied') : t('studentAuth.copy')} className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                      {copied ? <Check className="w-5 h-5 text-green-600" /> : <ClipboardCopy className="w-5 h-5" />}
                  </button>
              </div>
              <button
                  onClick={() => setSelectedStudent(newlyRegisteredStudent)}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                  <span>{t('studentAuth.continueToDashboard')}</span>
                  <ArrowRight className="w-5 h-5" />
              </button>
          </div>
      );
  }
  
  if (view === 'login') {
      return (
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg animate-fade-in-up">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t('studentAuth.loginTitle')}</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                  <input
                      type="text"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      placeholder={t('studentAuth.loginIdPlaceholder')}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                  />
                  <div className="relative">
                    <input
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder={t('studentAuth.loginPasswordPlaceholder')}
                        className="w-full p-3 border border-gray-300 rounded-lg ps-10"
                        required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500 hover:text-gray-700"
                      aria-label={showLoginPassword ? t('app.hidePassword') : t('app.showPassword')}
                    >
                      {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                  <button type="submit" className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">{t('common.login')}</button>
                  <button type="button" onClick={() => handleSwitchView('initial')} className="w-full p-3 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-colors">{t('common.back')}</button>
              </form>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">{t('common.or')}</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <button 
                  type="button" 
                  onClick={handleDemoLogin} 
                  className="w-full flex items-center justify-center gap-3 p-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
              >
                  <FlaskConical className="w-5 h-5" />
                  <span>{t('studentAuth.demoLogin')}</span>
              </button>

              {rememberedStudents.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-gray-600 mb-2 text-center">{t('studentAuth.registeredAccounts')}</h3>
                  <div className="space-y-2">
                    {rememberedStudents.map(acc => (
                      <div key={acc.id} className="group relative flex items-center justify-between bg-gray-50 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-sm cursor-pointer hover:scale-105 transform" onClick={() => handleRememberedLogin(acc.id)}>
                        <div className="flex items-center gap-3 w-full p-2">
                          <UserCheck className="w-6 h-6 text-gray-500" />
                          <div>
                            <p className="font-semibold text-gray-800">{acc.firstName[language]} {acc.lastName[language]}</p>
                            <p className="text-xs text-gray-500 font-mono">{acc.id}</p>
                          </div>
                        </div>
                        <button 
                           onClick={(e) => handleForgetStudent(e, acc.id)}
                           className="absolute start-1 top-1/2 -translate-y-1/2 p-2 me-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                           aria-label={t('studentAuth.removeAccount', {name: acc.firstName[language]})}
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
      );
  }

  if (view === 'register') {
      return (
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg animate-fade-in-up">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t('studentAuth.registerTitle')}</h2>
              <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <input type="text" placeholder={t('studentAuth.firstNameFr')} value={regData.firstNameFr} onChange={e => setRegData({...regData, firstNameFr: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" maxLength={40} />
                          {regErrors.firstNameFr && <p className="text-red-500 text-xs mt-1">{regErrors.firstNameFr}</p>}
                      </div>
                      <div>
                          <input type="text" placeholder={t('studentAuth.firstNameAr')} value={regData.firstNameAr} onChange={e => setRegData({...regData, firstNameAr: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" maxLength={40} dir="rtl" />
                          {regErrors.firstNameAr && <p className="text-red-500 text-xs mt-1">{regErrors.firstNameAr}</p>}
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <input type="text" placeholder={t('studentAuth.lastNameFr')} value={regData.lastNameFr} onChange={e => setRegData({...regData, lastNameFr: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" maxLength={40} />
                          {regErrors.lastNameFr && <p className="text-red-500 text-xs mt-1">{regErrors.lastNameFr}</p>}
                      </div>
                      <div>
                          <input type="text" placeholder={t('studentAuth.lastNameAr')} value={regData.lastNameAr} onChange={e => setRegData({...regData, lastNameAr: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" maxLength={40} dir="rtl"/>
                          {regErrors.lastNameAr && <p className="text-red-500 text-xs mt-1">{regErrors.lastNameAr}</p>}
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{t('studentAuth.gender')}</label>
                          <div className="flex items-center gap-x-6 pt-2">
                              <div className="flex items-center">
                                  <input id="gender-male" name="gender" type="radio" value="male" checked={regData.gender === 'male'} onChange={e => setRegData({...regData, gender: e.target.value as 'male' | 'female'})} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"/>
                                  <label htmlFor="gender-male" className="ms-2 block text-sm text-gray-900">{t('studentAuth.male')}</label>
                              </div>
                              <div className="flex items-center">
                                  <input id="gender-female" name="gender" type="radio" value="female" checked={regData.gender === 'female'} onChange={e => setRegData({...regData, gender: e.target.value as 'male' | 'female'})} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"/>
                                  <label htmlFor="gender-female" className="ms-2 block text-sm text-gray-900">{t('studentAuth.female')}</label>
                              </div>
                          </div>
                      </div>
                      <div>
                          <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 mb-1">{t('studentAuth.birthYear')}</label>
                          <input type="number" id="birthYear" placeholder={t('studentAuth.birthYearPlaceholder')} value={regData.birthYear} onChange={e => setRegData({...regData, birthYear: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" />
                          {regErrors.birthYear && <p className="text-red-500 text-xs mt-1">{regErrors.birthYear}</p>}
                      </div>
                  </div>

                  <div>
                    <input type="text" placeholder={t('studentAuth.schoolNameFr')} value={regData.schoolNameFr} onChange={e => setRegData({...regData, schoolNameFr: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg mb-4" maxLength={80} />
                    {regErrors.schoolNameFr && <p className="text-red-500 text-xs mt-[-1rem] mb-2">{regErrors.schoolNameFr}</p>}

                    <input type="text" placeholder={t('studentAuth.schoolNameAr')} value={regData.schoolNameAr} onChange={e => setRegData({...regData, schoolNameAr: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg" maxLength={80} dir="rtl" />
                    {regErrors.schoolNameAr && <p className="text-red-500 text-xs mt-1">{regErrors.schoolNameAr}</p>}
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('studentAuth.schoolType')}</label>
                      <div className="flex items-center gap-x-6 pt-2">
                          <div className="flex items-center">
                              <input id="school-pioneer" name="schoolType" type="radio" value="pioneer" checked={regData.schoolType === 'pioneer'} onChange={e => setRegData({...regData, schoolType: e.target.value as 'pioneer' | 'regular'})} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"/>
                              <label htmlFor="school-pioneer" className="ms-2 block text-sm text-gray-900">{t('studentAuth.pioneer')}</label>
                          </div>
                          <div className="flex items-center">
                              <input id="school-regular" name="schoolType" type="radio" value="regular" checked={regData.schoolType === 'regular'} onChange={e => setRegData({...regData, schoolType: e.target.value as 'pioneer' | 'regular'})} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"/>
                              <label htmlFor="school-regular" className="ms-2 block text-sm text-gray-900">{t('studentAuth.regular')}</label>
                          </div>
                      </div>
                  </div>

                  <select value={regData.studyLevelId} onChange={e => setRegData({...regData, studyLevelId: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                      {STUDY_LEVEL_IDS.map(levelId => <option key={levelId} value={levelId}>{t(`levels.${levelId}`)}</option>)}
                  </select>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <div className="relative">
                            <input type={showRegPassword ? 'text' : 'password'} placeholder={t('studentAuth.password')} value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg ps-10" maxLength={8} />
                            <button
                              type="button"
                              onClick={() => setShowRegPassword(!showRegPassword)}
                              className="absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500 hover:text-gray-700"
                              aria-label={showRegPassword ? t('app.hidePassword') : t('app.showPassword')}
                            >
                              {showRegPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          {regErrors.password && <p className="text-red-500 text-xs mt-1">{regErrors.password}</p>}
                      </div>
                      <div>
                          <div className="relative">
                            <input type={showConfirmPassword ? 'text' : 'password'} placeholder={t('studentAuth.confirmPassword')} value={regData.confirmPassword} onChange={e => setRegData({...regData, confirmPassword: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg ps-10" maxLength={8} />
                             <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500 hover:text-gray-700"
                              aria-label={showConfirmPassword ? t('app.hidePassword') : t('app.showPassword')}
                            >
                              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          {regErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{regErrors.confirmPassword}</p>}
                      </div>
                  </div>
                  <button type="submit" className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">{t('studentAuth.createAccount')}</button>
                  <button type="button" onClick={() => handleSwitchView('initial')} className="w-full p-3 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-colors">{t('common.back')}</button>
              </form>
          </div>
      );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg text-center animate-fade-in-up">
      <Sparkles className="h-16 w-16 text-yellow-500 mb-4 mx-auto" />
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{t('studentAuth.welcome')}</h2>
      <div className="space-y-4">
          <button onClick={() => handleSwitchView('login')} className="w-full flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transition-transform hover:-translate-y-1 text-lg font-bold">
              <LogIn />
              <span>{t('studentAuth.login')}</span>
          </button>
          <button onClick={() => handleSwitchView('register')} className="w-full flex items-center justify-center gap-3 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors transition-transform hover:-translate-y-1 text-lg font-bold">
              <UserPlus />
              <span>{t('studentAuth.register')}</span>
          </button>
      </div>
    </div>
  );
};