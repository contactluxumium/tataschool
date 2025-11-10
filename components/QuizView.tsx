import React, { useState, useEffect, useRef } from 'react';
import { Lesson, Question, Student, LessonResult, QuestionType, LocalizedString } from '../types';
import { lmsService } from '../services/lmsService';
import { Clock, Lightbulb, LoaderCircle, PartyPopper } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useTranslation } from '../contexts/TranslationContext';

interface QuizViewProps {
  lessonId: string;
  student: Student;
  onQuizComplete: (newResult?: LessonResult, lessonId?: string) => void;
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

const CheckIcon = createIcon(`<polyline points="20 6 9 17 4 12"/>`);
const XIcon = createIcon(`<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`);

const formatTime = (totalSeconds: number) => {
    if (totalSeconds < 0) totalSeconds = 0;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const QUIZ_DURATION_SECONDS = 20 * 60; // 20 minutes

export const QuizView: React.FC<QuizViewProps> = ({ lessonId, student, onQuizComplete }) => {
  const { t, language } = useTranslation();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<Map<string, LocalizedString[]>>(new Map());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [numericAnswer, setNumericAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation?: LocalizedString; } | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalResult, setFinalResult] = useState<LessonResult | null>(null);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [timedOut, setTimedOut] = useState(false);
  const [leveledUp, setLeveledUp] = useState(false);
  
  const [isAiHelpLoading, setIsAiHelpLoading] = useState(false);
  const [aiHelpResponse, setAiHelpResponse] = useState('');
  const [nextHelpAvailableIndex, setNextHelpAvailableIndex] = useState(0);

  const submittedRef = useRef(false);

  useEffect(() => {
    const foundLesson = lmsService.getLesson(lessonId);
    if (foundLesson) {
      setLesson(foundLesson);
      const generatedQuestions = lmsService.generateQuizQuestions(lessonId);
      setQuizQuestions(generatedQuestions);
      
      const newShuffledOptions = new Map<string, LocalizedString[]>();
      generatedQuestions.forEach(q => {
        if (q.type === QuestionType.MultipleChoice && q.options) {
          const shuffled = [...q.options].sort(() => Math.random() - 0.5);
          newShuffledOptions.set(q.id, shuffled);
        }
      });
      setShuffledOptions(newShuffledOptions);
    }
    
    return () => {
      if (!submittedRef.current && student.id !== 'DEMO_STUDENT' && lessonId) {
        lmsService.submitQuiz(student.id, lessonId, {}, 10, 0);
      }
    };
  }, [lessonId, student.id]);

  const handleAiHelpRequest = async () => {
    if (!quizQuestions[currentQuestionIndex]) return;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    setNextHelpAvailableIndex(currentQuestionIndex + 2);
    setIsAiHelpLoading(true);
    setAiHelpResponse('');

    try {
        if (!process.env.API_KEY) {
            setAiHelpResponse(t('quiz.apiKeyMissing'));
            setIsAiHelpLoading(false);
            return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const systemInstruction = language === 'ar' 
          ? `أنت أستاذ رياضيات كايعاون التلاميذ في المغرب. خدمتك هي تعطي تلميح بسيط أو تشرح مرحلة بمرحلة للتمرين لي جاي بلا ما تعطي الجواب الأخير نيشان. خلي شرحك ساهل وواضح بالدارجة المغربية. شجع التلميذ وقوليه راه قادر يجاوب عليه.`
          : `Vous êtes un professeur de mathématiques gentil et encourageant pour les élèves au Maroc. Votre tâche est de donner un indice simple ou une explication étape par étape pour le problème suivant sans donner directement la réponse finale. Rendez votre explication simple et claire en français. Encouragez l'élève et dites-lui qu'il peut le résoudre.`;

        const translatedText = currentQuestion.text[language];
        const translatedOptions = currentQuestion.options ? currentQuestion.options.map(o => o[language]).join(', ') : '';

        const problemDescription = language === 'ar'
          ? `المسألة هي:\n- النص: ${translatedText}\n${currentQuestion.mathExpression ? `- العملية: ${currentQuestion.mathExpression}` : ''}\n${translatedOptions ? `- الخيارات: ${translatedOptions}` : ''}\nقدم تلميحاً لمساعدته على التفكير في الحل الصحيح.`
          : `Le problème est :\n- Texte : ${translatedText}\n${currentQuestion.mathExpression ? `- Expression : ${currentQuestion.mathExpression}` : ''}\n${translatedOptions ? `- Options : ${translatedOptions}` : ''}\nDonnez un indice pour l'aider à trouver la bonne solution.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: problemDescription,
            config: {
              systemInstruction: systemInstruction,
            }
        });

        setAiHelpResponse(response.text);

    } catch (error) {
        console.error("Gemini API error:", error);
        setAiHelpResponse(t('quiz.aiError'));
    } finally {
        setIsAiHelpLoading(false);
    }
  };

  const handleSubmitQuiz = () => {
    if (submittedRef.current || !lesson) return;
    submittedRef.current = true;
  
    const durationInSeconds = QUIZ_DURATION_SECONDS - timeLeft;
  
    let score = 0;
    quizQuestions.forEach(question => {
        const studentAnswer = answers[question.id];
        if (studentAnswer && studentAnswer.toLowerCase() === question.correctAnswer[language].toLowerCase()) {
            score++;
        }
    });
  
    if (student.id === 'DEMO_STUDENT') {
      const PASSING_SCORE = 7;
      
      const existingResult = student.progress[lesson!.id];
      const hasAlreadyPassed = existingResult?.passed === true;
      const newPassedStatus = score >= PASSING_SCORE || hasAlreadyPassed;

      const previousAttempts = existingResult?.attempts || 0;
      const now = new Date().toISOString();
  
      const result: LessonResult = {
        score,
        totalQuestions: quizQuestions.length,
        passed: newPassedStatus,
        firstAttemptDate: existingResult?.firstAttemptDate || now,
        lastAttemptDate: now,
        answers,
        attempts: previousAttempts + 1,
        durationInSeconds: (score >= PASSING_SCORE) ? durationInSeconds : existingResult?.durationInSeconds,
      };
      setFinalResult(result);
      setQuizFinished(true);
    } else {
      const { result, leveledUp } = lmsService.submitQuiz(
        student.id,
        lesson!.id,
        answers,
        quizQuestions.length,
        durationInSeconds
      );
      setFinalResult(result);
      setLeveledUp(leveledUp);
      setQuizFinished(true);
    }
  };

  useEffect(() => {
    if (quizFinished) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [quizFinished]);

  useEffect(() => {
    if (timeLeft <= 0 && !submittedRef.current) {
        setTimedOut(true);
        handleSubmitQuiz();
    }
  }, [timeLeft]);

  if (!lesson || quizQuestions.length === 0) {
    return <div>{t('quiz.loading')}</div>;
  }
  
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleSelectAnswer = (answer: string) => {
    if (feedback) return;
    setSelectedAnswer(answer);
  };

  const handleConfirmAnswer = () => {
    if (feedback || !selectedAnswer) return;

    const isCorrect = selectedAnswer.toLowerCase() === currentQuestion.correctAnswer[language].toLowerCase();

    setFeedback({ correct: isCorrect, explanation: currentQuestion.explanation });
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswer }));
  };
  
  const handleRetry = () => {
    setSelectedAnswer(null);
  }

  const handleNumericSubmit = (answer: string) => {
     if (feedback) return;

    const isCorrect = answer.toLowerCase() === currentQuestion.correctAnswer[language].toLowerCase();

    setFeedback({ correct: isCorrect, explanation: currentQuestion.explanation });
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  }

  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedAnswer(null);
    setNumericAnswer('');
    setAiHelpResponse('');
    if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
    } else {
        handleSubmitQuiz();
    }
  };

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case QuestionType.MultipleChoice: {
        const optionsToRender = shuffledOptions.get(currentQuestion.id) || currentQuestion.options || [];
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {optionsToRender.map((option, index) => (
                <button
                  key={index}
                  disabled={!!feedback}
                  onClick={() => handleSelectAnswer(option[language])}
                  className={`p-4 text-lg font-semibold border-2 rounded-lg transition-colors disabled:opacity-50 ${
                    selectedAnswer === option[language] 
                      ? 'bg-blue-200 border-blue-500' 
                      : 'border-gray-300 hover:bg-blue-100'
                  }`}
                >
                  {option[language]}
                </button>
              ))}
            </div>
          </>
        );
      }
      case QuestionType.TrueFalse:
        return (
          <>
            <div className="flex justify-center gap-6 mt-6">
              {[
                { label: t('quiz.true'), value: 'true' },
                { label: t('quiz.false'), value: 'false' }
              ].map(option => (
                <button 
                  key={option.value}
                  onClick={() => handleSelectAnswer(option.value)} 
                  disabled={!!feedback} 
                  className={`px-10 py-4 text-lg font-semibold rounded-lg transition-colors disabled:opacity-50 border-2 ${
                    selectedAnswer === option.value
                      ? 'bg-blue-200 border-blue-500 text-gray-800'
                      : 'bg-gray-100 border-gray-300 hover:bg-blue-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        );
      case QuestionType.NumericInput:
        return (
          <form onSubmit={(e) => { e.preventDefault(); handleNumericSubmit(numericAnswer); }} className="mt-6 flex flex-col items-center">
            <input
              name="answer"
              type="text"
              required
              disabled={!!feedback}
              value={numericAnswer}
              onChange={(e) => setNumericAnswer(e.target.value)}
              className="w-full max-w-xs text-center p-3 text-2xl border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button type="submit" disabled={!!feedback} className="mt-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300">
              {t('quiz.confirmAnswer')}
            </button>
          </form>
        );
    }
  };

  if(quizFinished && finalResult){
    const showLevelUpMessage = leveledUp && finalResult.passed;
    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-2xl text-center animate-fade-in-up">
            {showLevelUpMessage && (
                <div className="mb-4">
                    <PartyPopper className="w-16 h-16 mx-auto text-yellow-500" />
                </div>
            )}
            <h2 className="text-3xl font-bold mb-4">
                {showLevelUpMessage ? t('quiz.levelUpTitle') : t('quiz.quizFinishedTitle')}
            </h2>
            {showLevelUpMessage && (
                <p className="text-lg text-gray-700 mb-6">{t('quiz.levelUpMessage')}</p>
            )}

            <div className={`p-6 rounded-lg mb-6 ${finalResult.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {timedOut && !finalResult.passed && <p className="text-2xl font-semibold">{t('quiz.timeUp')}</p>}
                <p className="text-2xl font-semibold">{finalResult.passed ? t('quiz.successMessage') : t('quiz.failureMessage')}</p>
                <p className="text-4xl font-bold my-4">{finalResult.score} <span className="text-2xl">/ {finalResult.totalQuestions}</span></p>
                <p>{finalResult.passed ? t('quiz.nextLessonPrompt') : t('quiz.tryAgainPrompt')}</p>
            </div>
            <button 
              onClick={() => onQuizComplete(student.id === 'DEMO_STUDENT' ? finalResult : undefined, lesson?.id)} 
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
                {t('quiz.returnToDashboard')}
            </button>
        </div>
    );
  }

  const getCorrectAnswerText = (question: Question): string => {
      if (question.type === QuestionType.TrueFalse) {
          return t(`quiz.${question.correctAnswer.fr}`); // fr value is 'true' or 'false'
      }
      return question.correctAnswer[language];
  };

  const canShowAiHelp = currentQuestionIndex >= nextHelpAvailableIndex;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-4 p-4 bg-gray-50 rounded-lg border">
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-blue-700">{lesson.title[language]}</h2>
                <span className="text-sm text-gray-500">
                    {t('quiz.question')} {currentQuestionIndex + 1} {t('quiz.outOf')} {quizQuestions.length}
                </span>
            </div>
            <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-lg ${timeLeft < 60 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    <Clock className="w-5 h-5" />
                    <span>{formatTime(timeLeft)}</span>
                </div>
                <button
                    onClick={handleSubmitQuiz}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                    {t('quiz.endQuiz')}
                </button>
            </div>
        </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}></div>
      </div>
      
      <div key={currentQuestion.id} className="animate-fade-in">
        <div className="relative text-center p-6 bg-gray-50 rounded-lg min-h-[200px] flex flex-col justify-center">
          {canShowAiHelp && (
            <button 
              onClick={handleAiHelpRequest} 
              disabled={isAiHelpLoading || !!feedback} 
              className="absolute top-3 start-3 flex items-center gap-2 px-3 py-1.5 text-sm bg-yellow-400 text-yellow-900 rounded-full hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              title={t('quiz.getHelp')}
            >
                {isAiHelpLoading ? <LoaderCircle className="animate-spin w-4 h-4" /> : <Lightbulb className="w-4 h-4" />}
                <span>{isAiHelpLoading ? t('quiz.gettingHelp') : t('quiz.getHelp')}</span>
            </button>
          )}
          <p className="text-2xl text-gray-800">{currentQuestion.text[language]}</p>
          {currentQuestion.mathExpression && (
            <p className="text-4xl font-mono text-center mt-4 text-slate-700" dir="ltr">{currentQuestion.mathExpression}</p>
          )}
        </div>
      
        {aiHelpResponse && (
            <div className="mt-6 p-4 bg-yellow-50 border-s-4 border-yellow-400 rounded-lg animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-yellow-800 flex items-center gap-2"><Lightbulb size={18}/> {t('quiz.aiHelpTitle')}</h4>
                    <button onClick={() => setAiHelpResponse('')} className="text-gray-500 hover:text-gray-800">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {aiHelpResponse}
                </div>
            </div>
        )}

        <div className="mt-4">
          {renderQuestionInput()}
        </div>

        {selectedAnswer && !feedback && [QuestionType.MultipleChoice, QuestionType.TrueFalse].includes(currentQuestion.type) && (
            <div className="mt-6 flex justify-center gap-4 animate-fade-in">
                <button onClick={handleConfirmAnswer} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                    {t('quiz.confirmAnswer')}
                </button>
                <button onClick={handleRetry} className="px-8 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors">
                    {t('quiz.retry')}
                </button>
            </div>
        )}
      </div>

      {feedback && (
        <div className="mt-6 animate-fade-in">
            <div className={`p-4 rounded-lg border-s-4 ${feedback.correct ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <div className="flex items-center text-lg font-semibold">
                    {feedback.correct 
                        ? <CheckIcon className="w-6 h-6 me-2 text-green-600" /> 
                        : <XIcon className="w-6 h-6 me-2 text-red-600" />
                    }
                    <span className={feedback.correct ? 'text-green-800' : 'text-red-800'}>
                        {feedback.correct ? t('quiz.correctAnswer') : t('quiz.wrongAnswer')}
                    </span>
                </div>

                {!feedback.correct && (
                    <div className="mt-3">
                        <p className="font-semibold text-gray-700">{t('quiz.theCorrectAnswerWas')}: <span className="font-bold text-black font-mono" dir="ltr">{getCorrectAnswerText(currentQuestion)}</span></p>
                    </div>
                )}

                {feedback.explanation && (
                    <div className="mt-4 border-t border-gray-200 pt-3">
                        <h4 className="font-bold text-gray-800 mb-2">{t('quiz.explanation')}:</h4>
                        <div className="text-gray-700 leading-relaxed">
                            {feedback.explanation[language].split('\n').map((line, index) => {
                                const isLtr = /^[a-zA-Z0-9\s.,+\-*/=<>_()[\]^%√π²³⁴⁵⁶⁷⁸⁹⁰:'"]+$/.test(line.trim());
                                if (line.trim() === '') return <br key={index} />;
                                return (
                                    <p key={index} dir={isLtr ? 'ltr' : undefined} className={`mb-1 ${isLtr ? 'font-mono text-center' : ''}`}>
                                        {line}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className="text-center">
                <button
                    onClick={handleNextQuestion}
                    className="mt-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {currentQuestionIndex < quizQuestions.length - 1 ? t('quiz.nextQuestion') : t('quiz.finishLesson')}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};