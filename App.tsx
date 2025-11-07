import React, { useState, useEffect, useCallback } from 'react';
import { StudentView } from './components/StudentView';
import { TeacherView } from './components/TeacherView';
import { useTranslation } from './contexts/TranslationContext';
import { lmsService } from './services/lmsService';
import { Monitor, User, GraduationCap, KeyRound, Timer } from 'lucide-react';

const TEACHER_SECRET_CODE = '14584135';
const MAX_ATTEMPTS = 3;
const LOCKOUT_SECONDS = 30;

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'student' | 'teacher'>('home');
  const { language, setLanguage, t } = useTranslation();

  // Teacher Auth State
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState(false);
  const [teacherCode, setTeacherCode] = useState('');
  const [teacherCodeError, setTeacherCodeError] = useState('');
  
  // Lockout State
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutEndTime, setLockoutEndTime] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  // Load lockout state from localStorage on mount
  useEffect(() => {
    try {
        const savedAttempts = localStorage.getItem('tata_failedAttempts');
        const savedLockoutTime = localStorage.getItem('tata_lockoutEndTime');
        
        if (savedAttempts) {
            setFailedAttempts(parseInt(savedAttempts, 10));
        }
        if (savedLockoutTime) {
            const endTime = parseInt(savedLockoutTime, 10);
            if (endTime > Date.now()) {
                setLockoutEndTime(endTime);
            } else {
                // Clear expired lockout
                localStorage.removeItem('tata_lockoutEndTime');
                localStorage.removeItem('tata_failedAttempts');
            }
        }
    } catch (error) {
        console.error("Could not read from localStorage:", error);
    }
    lmsService.initializeData();
  }, []);

  // Timer effect for lockout countdown
  useEffect(() => {
    let intervalId: number;
    if (lockoutEndTime > Date.now()) {
      const updateRemaining = () => {
        const remaining = Math.ceil((lockoutEndTime - Date.now()) / 1000);
        setSecondsRemaining(remaining > 0 ? remaining : 0);
        if (remaining <= 0) {
          setLockoutEndTime(0);
          setFailedAttempts(0);
          localStorage.removeItem('tata_lockoutEndTime');
          localStorage.removeItem('tata_failedAttempts');
          clearInterval(intervalId);
        }
      };
      updateRemaining();
      intervalId = window.setInterval(updateRemaining, 1000);
    }
    return () => clearInterval(intervalId);
  }, [lockoutEndTime]);


  const handleLanguageChange = (lang: 'fr' | 'ar') => {
    setLanguage(lang);
  };

  const navigateHome = useCallback(() => {
    setView('home');
    setIsTeacherAuthenticated(false);
    setTeacherCode('');
    setTeacherCodeError('');
  }, []);

  const handleTeacherCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutEndTime > Date.now()) return;

    if (teacherCode === TEACHER_SECRET_CODE) {
      setIsTeacherAuthenticated(true);
      setTeacherCodeError('');
      setFailedAttempts(0);
      localStorage.removeItem('tata_failedAttempts');
    } else {
      const newAttemptCount = failedAttempts + 1;
      setFailedAttempts(newAttemptCount);
      localStorage.setItem('tata_failedAttempts', newAttemptCount.toString());
      setTeacherCodeError(t('teacherAuth.incorrectCode'));

      if (newAttemptCount >= MAX_ATTEMPTS) {
        const endTime = Date.now() + LOCKOUT_SECONDS * 1000;
        setLockoutEndTime(endTime);
        localStorage.setItem('tata_lockoutEndTime', endTime.toString());
      }
    }
  };

  const renderTeacherView = () => {
    if (isTeacherAuthenticated) {
      return <TeacherView />;
    }

    const isLocked = lockoutEndTime > Date.now();

    return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-xl text-center animate-fade-in-up">
        <KeyRound className="h-16 w-16 text-emerald-500 mb-4 mx-auto" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{t('teacherAuth.title')}</h2>
        
        {isLocked ? (
          <div className="space-y-4">
             <div className="p-4 text-center bg-red-50 border-s-4 border-red-500">
                <div className="flex justify-center items-center gap-2">
                    <Timer className="h-8 w-8 text-red-600" />
                    <p className="text-red-700 text-lg font-semibold">
                      {t('teacherAuth.lockoutMessage', { seconds: secondsRemaining })}
                    </p>
                </div>
            </div>
             <button
                type="button"
                onClick={navigateHome}
                className="w-full p-3 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-colors"
              >
                {t('common.back')}
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">{t('teacherAuth.prompt')}</p>
            <form onSubmit={handleTeacherCodeSubmit} className="space-y-4">
              <input
                type="password"
                value={teacherCode}
                onChange={(e) => setTeacherCode(e.target.value)}
                placeholder={t('teacherAuth.placeholder')}
                className="w-full p-3 border border-gray-300 rounded-lg text-center tracking-widest"
                autoFocus
              />
              {teacherCodeError && <p className="text-red-500 text-sm">{teacherCodeError}</p>}
              <button
                type="submit"
                className="w-full p-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {t('teacherAuth.enter')}
              </button>
              <button
                type="button"
                onClick={navigateHome}
                className="w-full p-3 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-colors"
              >
                {t('common.back')}
              </button>
            </form>
          </>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (view) {
      case 'student':
        return <StudentView onNavigateHome={navigateHome} />;
      case 'teacher':
        return renderTeacherView();
      case 'home':
      default:
        return (
          <div className="text-center max-w-2xl mx-auto p-8">
            <div className="flex items-center justify-center gap-4 mb-4">
                <GraduationCap className="h-12 w-12 text-blue-600" />
                <h1 className="text-5xl font-bold text-blue-600 tracking-wide" style={{ fontFamily: 'var(--font-fr)' }}>
                  {t('app.mainTitle')}
                </h1>
            </div>
            <p className="text-lg text-gray-600 mb-8">{t('app.subtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setView('student')}
                className="flex flex-col items-center justify-center p-8 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:-translate-y-2"
              >
                <User className="w-16 h-16 mb-4" />
                <span className="text-2xl font-bold">{t('app.studentPortal')}</span>
              </button>
              <button
                onClick={() => setView('teacher')}
                className="flex flex-col items-center justify-center p-8 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition-transform transform hover:-translate-y-2"
              >
                <Monitor className="w-16 h-16 mb-4" />
                <span className="text-2xl font-bold">{t('app.teacherPortal')}</span>
              </button>
            </div>
          </div>
        );
    }
  };

  const showHeader = view !== 'home' || isTeacherAuthenticated;

  return (
    <div className={`min-h-screen bg-slate-100 font-sans`}>
     {showHeader && (
       <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
             <div onClick={navigateHome} className="flex items-center gap-2 cursor-pointer">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <span className="text-xl md:text-2xl font-bold text-blue-600 tracking-wide" style={{ fontFamily: 'var(--font-fr)' }}>
                  {t('app.mainTitle')}
                </span>
              </div>
            <div className="flex items-center gap-2 md:gap-4">
               <button
                  onClick={() => handleLanguageChange(language === 'fr' ? 'ar' : 'fr')}
                  title={language === 'fr' ? t('locales.switchToAr') : t('locales.switchToFr')}
                  className="px-3 py-1.5 rounded-md text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  <span className="hidden md:inline">{language === 'fr' ? t('locales.ar') : t('locales.fr')}</span>
                   <span className="md:hidden">{language === 'fr' ? 'AR' : 'FR'}</span>
                </button>
            </div>
          </div>
        </header>
     )}
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        {t('app.footer')}
      </footer>
    </div>
  );
};

export default App;
