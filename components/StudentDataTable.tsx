import React, { useState, useMemo } from 'react';
import { Student, LessonResult } from '../types';
import { lmsService } from '../services/lmsService';
import { Users, Download, Search, KeyRound, X, FileJson, Upload, CheckCircle, XCircle, Clock, Repeat, BookOpen, Building, User as UserIcon, Calendar, GraduationCap, TrendingUp, ChevronDown, Pencil, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { STUDY_LEVEL_IDS } from '../constants';

type EnhancedStudent = ReturnType<typeof useMemo<any>>[0];

const formatDuration = (totalSeconds?: number) => {
    if (totalSeconds === undefined || isNaN(totalSeconds) || totalSeconds < 0) return '-';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return '-';
        }
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return new Intl.DateTimeFormat('fr-FR', options).format(date);
    } catch {
        return '-';
    }
};

export const StudentDataTable: React.FC = () => {
    const { t, language } = useTranslation();
    const [students, setStudents] = useState(() => lmsService.getStudents());
    const [selectedStudent, setSelectedStudent] = useState<EnhancedStudent | null>(null);
    const [activeLevelId, setActiveLevelId] = useState<string | null>(null);
    const content = lmsService.getContent();
    const [searchTerm, setSearchTerm] = useState('');

    const [isProfilePasswordVisible, setIsProfilePasswordVisible] = useState(false);
    const [editingStudentForPassword, setEditingStudentForPassword] = useState<Student | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);

    const refreshData = () => {
        const updatedStudents = lmsService.getStudents();
        setStudents(updatedStudents);

        if (selectedStudent) {
            const updatedSelected = updatedStudents.find(s => s.id === selectedStudent.id);
            if(updatedSelected) {
                const enhancedVersion = enhanceStudent(updatedSelected);
                setSelectedStudent(enhancedVersion);
            } else {
                 setSelectedStudent(null);
            }
        }
    };

     const enhanceStudent = (student: Student): EnhancedStudent => {
        const progressValues = Object.values(student.progress) as LessonResult[];
        const totalPoints = progressValues.reduce((sum, p) => sum + p.score, 0);
        const completedLessons = progressValues.filter(p => p.passed).length;
        const totalAttempts = progressValues.reduce((sum, p) => sum + p.attempts, 0);
        const totalAttemptedPoints = progressValues.reduce((sum, p) => sum + p.totalQuestions, 0);
        const scorePercentage = totalAttemptedPoints > 0 ? Math.round((totalPoints / totalAttemptedPoints) * 100) : 0;
        
        const studyLevelName = t(`levels.${student.studyLevelId}`) || t('studentDashboard.unspecified');
        const progressLevel = content.levels.find(l => l.id === student.progressLevelId);
        const progressLevelName = progressLevel ? progressLevel.title[language] : t('studentDashboard.unspecified');

        return {
            ...student,
            totalPoints,
            completedLessons,
            totalAttempts,
            scorePercentage,
            studyLevelName,
            progressLevelName,
        };
    };

    const enhancedStudents = useMemo(() => students.map(enhanceStudent), [students, content, t, language]);

    const handleOpenPasswordModal = (student: Student) => {
        setEditingStudentForPassword(student);
        setNewPassword('');
        setPasswordError('');
    };

    const handleClosePasswordModal = () => setEditingStudentForPassword(null);

    const handleSavePassword = () => {
        if (!editingStudentForPassword) return;
        if (!/^\d{8}$/.test(newPassword)) {
            setPasswordError(t('studentDataTable.passwordError'));
            return;
        }
        lmsService.updateStudentPassword(editingStudentForPassword.id, newPassword);
        refreshData();
        handleClosePasswordModal();
    };

    const handleOpenEditModal = (student: Student) => {
        setStudentToEdit({ ...student });
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setStudentToEdit(null);
    };

    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!studentToEdit) return;
        const { name, value } = e.target;
        
        if (name === 'firstNameAr' || name === 'firstNameFr' || name === 'lastNameAr' || name === 'lastNameFr' || name === 'schoolNameAr' || name === 'schoolNameFr') {
          const [field, lang] = name.split(/(Ar|Fr)/);
          const langKey = lang.toLowerCase() as 'ar' | 'fr';
          
          setStudentToEdit(prev => prev ? {
              ...prev,
              [field]: {
                  ...(prev[field as keyof Omit<Student, 'id'|'password'|'gender'|'birthYear'|'schoolType'|'studyLevelId'|'progressLevelId'|'progress'>] as object),
                  [langKey]: value
              }
          } : null);
        } else {
          setStudentToEdit(prev => prev ? { ...prev, [name]: name === 'birthYear' ? (value ? parseInt(value, 10) : '') : value } : null);
        }
    };
    
    const handleSaveStudentChanges = () => {
        if (!studentToEdit) return;
        lmsService.updateStudent(studentToEdit);
        refreshData();
        handleCloseEditModal();
    };

    const filteredStudents = useMemo(() => {
        return enhancedStudents.filter(s => {
            const searchTermLower = searchTerm.toLowerCase();
            const fullNameFr = `${s.firstName.fr} ${s.lastName.fr}`.toLowerCase();
            const fullNameAr = `${s.firstName.ar} ${s.lastName.ar}`.toLowerCase();
            return fullNameFr.includes(searchTermLower) || 
                   fullNameAr.includes(searchTermLower) || 
                   s.id.toLowerCase().includes(searchTermLower);
        });
    }, [enhancedStudents, searchTerm]);
    
    const exportToCSV = () => {
        const headers = [
            t('studentDataTable.id'),
            `${t('studentDataTable.firstName')} (${t('locales.fr')})`,
            `${t('studentDataTable.firstName')} (${t('locales.ar')})`,
            `${t('studentDataTable.lastName')} (${t('locales.fr')})`,
            `${t('studentDataTable.lastName')} (${t('locales.ar')})`,
            t('studentDataTable.password'), 
            t('studentDataTable.gender'), 
            t('studentDataTable.birthYear'), 
            `${t('studentDataTable.school')} (${t('locales.fr')})`,
            `${t('studentDataTable.school')} (${t('locales.ar')})`,
            t('studentDataTable.schoolType'), 
            t('studentDataTable.declaredLevel'), 
            t('studentDataTable.progressLevel'), 
            t('studentDataTable.lessonsCompleted'), 
            t('studentDataTable.totalAttempts'), 
            `${t('studentDataTable.overallScore')} (%)`
        ];

        const escapeCSV = (field: string | number) => `"${String(field).replace(/"/g, '""')}"`;
        
        const rows = enhancedStudents.map(s => 
            [
                s.id,
                escapeCSV(s.firstName.fr),
                escapeCSV(s.firstName.ar),
                escapeCSV(s.lastName.fr),
                escapeCSV(s.lastName.ar),
                s.password,
                t(`dataKeys.${s.gender}`),
                s.birthYear,
                escapeCSV(s.schoolName.fr),
                escapeCSV(s.schoolName.ar),
                t(`dataKeys.${s.schoolType}`),
                s.studyLevelName,
                s.progressLevelName,
                s.completedLessons, 
                s.totalAttempts, 
                s.scorePercentage
            ].join(',')
        );
        
        const csvString = [headers.join(','), ...rows].join('\n');
        const bom = '\uFEFF';
        const blob = new Blob([bom + csvString], { type: 'text/csv;charset=utf-8;' });
        
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "student_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExportJSON = () => {
        try {
            const allStudents = lmsService.getStudents();
            const jsonString = JSON.stringify(allStudents, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'students-backup.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            alert(t('studentDataTable.exportStudentsError'));
        }
    };

    const handleFileChangeJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!window.confirm(t('studentDataTable.importStudentsConfirm'))) {
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result;
                if (typeof text !== 'string') throw new Error("File read failed.");
                const importedStudents = JSON.parse(text);

                if (!Array.isArray(importedStudents)) {
                    throw new Error("Invalid file format. Must be an array of students.");
                }

                lmsService.saveStudents(importedStudents);
                setSelectedStudent(null);
                refreshData();
                alert(t('studentDataTable.importStudentsSuccess'));
            } catch (error) {
                alert(t('studentDataTable.importStudentsError', { error: error instanceof Error ? error.message : 'Unknown error' }));
            } finally {
                e.target.value = '';
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">{t('studentDataTable.studentList')}</h3>
                <div className="flex flex-col gap-2 mb-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder={t('studentDataTable.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full ps-10 pe-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={exportToCSV} className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700"> <Download size={16} /> {t('studentDataTable.exportCSV')} </button>
                        <button onClick={handleExportJSON} className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"> <FileJson size={16} /> {t('studentDataTable.exportJSON')} </button>
                        <label className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 cursor-pointer"> <Upload size={16} /> {t('studentDataTable.importJSON')}
                            <input type="file" accept=".json" className="hidden" onChange={handleFileChangeJSON} />
                        </label>
                    </div>
                </div>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pe-2">
                    {filteredStudents.map(student => (
                         <button 
                            key={student.id}
                            onClick={() => {
                                const enhancedVersion = enhanceStudent(student);
                                setSelectedStudent(enhancedVersion);
                            }}
                            className={`w-full text-start p-3 rounded-lg transition-colors border-2 ${selectedStudent?.id === student.id ? 'bg-blue-100 border-blue-400' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}
                        >
                            <p className="font-bold text-gray-800">{student.firstName[language]} {student.lastName[language]}</p>
                            <p className="text-sm text-gray-500 font-mono">{student.id}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md">
                {selectedStudent ? (
                    <div className="space-y-4 max-h-[80vh] overflow-y-auto pe-2">
                        <div className="p-4 rounded-lg bg-slate-50 border">
                             <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xl font-bold text-slate-700">{t('studentDataTable.studentProfile')}</h3>
                                <button onClick={() => handleOpenEditModal(selectedStudent)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                                    <Pencil size={14} />
                                    <span>{t('common.edit')}</span>
                                </button>
                             </div>
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 text-sm">
                                <div className="flex items-center gap-2 col-span-2 md:col-span-3"><UserIcon size={16} className="text-slate-500" /> <div><span className="font-semibold">{t('studentDataTable.fullName')}:</span> {selectedStudent.firstName[language]} {selectedStudent.lastName[language]}</div></div>
                                <div className="flex items-center gap-2"><UserIcon size={16} className="text-slate-500" /> <div><span className="font-semibold">{t('studentDataTable.id')}:</span> <span className="font-mono">{selectedStudent.id}</span></div></div>
                                <div className="flex items-center gap-2"><UserIcon size={16} className="text-slate-500" /> <div><span className="font-semibold">{t('studentDataTable.gender')}:</span> {t(`dataKeys.${selectedStudent.gender}`)}</div></div>
                                <div className="flex items-center gap-2"><Calendar size={16} className="text-slate-500" /> <div><span className="font-semibold">{t('studentDataTable.birthYear')}:</span> {selectedStudent.birthYear}</div></div>
                                <div className="flex items-center gap-2 col-span-2 md:col-span-3"><Building size={16} className="text-slate-500" /> <div><span className="font-semibold">{t('studentDataTable.school')}:</span> {selectedStudent.schoolName[language]}</div></div>
                                <div className="flex items-center gap-2"><Building size={16} className="text-slate-500" /> <div><span className="font-semibold">{t('studentDataTable.schoolType')}:</span> {t(`dataKeys.${selectedStudent.schoolType}`)}</div></div>
                                <div className="flex items-center gap-2"><GraduationCap size={16} className="text-slate-500" /> <div><span className="font-semibold">{t('studentDataTable.declaredLevel')}:</span> {selectedStudent.studyLevelName}</div></div>
                                <div className="flex items-center gap-2"><TrendingUp size={16} className="text-slate-500" /> <div><span className="font-semibold">{t('studentDataTable.progressLevel')}:</span> {selectedStudent.progressLevelName}</div></div>
                                <div className="flex items-center gap-2 col-span-2 md:col-span-3">
                                    <KeyRound size={16} className="text-slate-500" />
                                    <span className="font-semibold">{t('studentDataTable.password')}:</span>
                                    <span className="font-mono tracking-wider">{isProfilePasswordVisible ? selectedStudent.password : '********'}</span>
                                    <button onClick={() => setIsProfilePasswordVisible(!isProfilePasswordVisible)} className="me-1 text-gray-500 hover:text-gray-800">
                                        {isProfilePasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <button onClick={() => handleOpenPasswordModal(selectedStudent)} className="me-1 text-gray-500 hover:text-blue-600">
                                        <Pencil size={14} />
                                    </button>
                                </div>
                             </div>
                        </div>
                         <div className="p-4 rounded-lg bg-blue-50 border">
                             <h3 className="text-xl font-bold mb-3 text-blue-800">{t('studentDataTable.performanceSummary')}</h3>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                 <div><p className="font-bold text-2xl text-blue-600">{selectedStudent.completedLessons}</p><p className="text-xs text-gray-600">{t('studentDataTable.lessonsCompleted')}</p></div>
                                 <div><p className="font-bold text-2xl text-blue-600">{selectedStudent.totalAttempts}</p><p className="text-xs text-gray-600">{t('studentDataTable.totalAttempts')}</p></div>
                                 <div><p className="font-bold text-2xl text-blue-600">{selectedStudent.scorePercentage}%</p><p className="text-xs text-gray-600">{t('studentDataTable.overallScore')}</p></div>
                                 <div><p className="font-bold text-2xl text-blue-600">{selectedStudent.totalPoints}</p><p className="text-xs text-gray-600">{t('studentDataTable.totalPoints')}</p></div>
                             </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-700">{t('studentDataTable.progressDetails')}</h3>
                            {content.levels.map(level => (
                                <div key={level.id}>
                                    <button
                                        onClick={() => setActiveLevelId(activeLevelId === level.id ? null : level.id)}
                                        className="w-full flex justify-between items-center text-start p-3 font-semibold bg-gray-100 rounded-md hover:bg-gray-200"
                                    >
                                        <span>{level.title[language]}</span>
                                        <ChevronDown size={20} className={`transition-transform ${activeLevelId === level.id ? 'rotate-180' : ''}`} />
                                    </button>
                                    {activeLevelId === level.id && (
                                        <div className="p-2 ps-4 space-y-3">
                                            {level.lessons.filter(l => l.questions.length > 0).map(lesson => {
                                                const result = selectedStudent.progress[lesson.id];
                                                const isUnlocked = lmsService.isLessonUnlocked(selectedStudent, lesson.id);
                                                return (
                                                    <div key={lesson.id} className="border-s-4 ps-3 pe-1 pb-2 border-slate-200">
                                                        <p className="font-bold">{lesson.title[language]}</p>
                                                        {!isUnlocked ? (
                                                            <p className="text-xs text-gray-500">{t('studentDataTable.locked')}</p>
                                                        ) : result ? (
                                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-1">
                                                                <div className={`flex items-center gap-1.5 font-semibold ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                                                                    {result.passed ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                                                    <span>{t('studentDataTable.result')}: {result.score}/{result.totalQuestions}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5"><Repeat size={14} /> <span>{t('studentDataTable.totalAttempts')}: {result.attempts}</span></div>
                                                                <div className="flex items-center gap-1.5"><Clock size={14} /> <span>{t('studentDataTable.duration')}: {formatDuration(result.durationInSeconds)}</span></div>
                                                                <div className="flex items-center gap-1.5 col-span-2"><Calendar size={14} /> <span>{t('studentDataTable.firstAttempt')}: {formatDate(result.firstAttemptDate || result.lastAttemptDate)}</span></div>
                                                                <div className="flex items-center gap-1.5 col-span-2"><Calendar size={14} /> <span>{t('studentDataTable.lastAttempt')}: {formatDate(result.lastAttemptDate)}</span></div>
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs text-blue-600">{t('studentDataTable.notStarted')}</p>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                        <Users size={48} className="mb-4" />
                        <p className="text-lg font-semibold">{t('studentDataTable.selectStudentPrompt')}</p>
                        <p>{t('studentDataTable.selectStudentDescription')}</p>
                    </div>
                )}
            </div>

             {editingStudentForPassword && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-bold">{t('studentDataTable.changePasswordTitle')}</h3>
                            <button onClick={handleClosePasswordModal}><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <p>{t('studentDataTable.changePasswordFor')} <span className="font-bold">{editingStudentForPassword.firstName[language]} {editingStudentForPassword.lastName[language]}</span></p>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium mb-1">{t('studentDataTable.newPasswordLabel')}</label>
                                <input id="newPassword" type="text" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full p-2 border rounded-lg text-center" maxLength={8} autoFocus />
                                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end p-4 border-t bg-gray-50">
                            <button onClick={handleClosePasswordModal} className="px-4 py-2 bg-gray-200 rounded-md me-2">{t('common.cancel')}</button>
                            <button onClick={handleSavePassword} className="px-4 py-2 bg-blue-600 text-white rounded-md">{t('common.save')}</button>
                        </div>
                    </div>
                </div>
            )}
            
            {isEditModalOpen && studentToEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                         <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-bold">{t('studentDataTable.editStudentTitle')}</h3>
                            <button onClick={handleCloseEditModal}><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('studentAuth.firstNameFr')}</label>
                                    <input type="text" name="firstNameFr" value={studentToEdit.firstName.fr} onChange={handleEditFormChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('studentAuth.firstNameAr')}</label>
                                    <input type="text" name="firstNameAr" value={studentToEdit.firstName.ar} onChange={handleEditFormChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" dir="rtl"/>
                                </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('studentAuth.lastNameFr')}</label>
                                    <input type="text" name="lastNameFr" value={studentToEdit.lastName.fr} onChange={handleEditFormChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('studentAuth.lastNameAr')}</label>
                                    <input type="text" name="lastNameAr" value={studentToEdit.lastName.ar} onChange={handleEditFormChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" dir="rtl"/>
                                </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('studentDataTable.gender')}</label>
                                     <select name="gender" value={studentToEdit.gender} onChange={handleEditFormChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                        <option value="male">{t('dataKeys.male')}</option>
                                        <option value="female">{t('dataKeys.female')}</option>
                                    </select>
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('studentDataTable.birthYear')}</label>
                                    <input type="number" name="birthYear" value={studentToEdit.birthYear} onChange={handleEditFormChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                           </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">{t('studentAuth.schoolNameFr')}</label>
                                <input type="text" name="schoolNameFr" value={studentToEdit.schoolName.fr} onChange={handleEditFormChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">{t('studentAuth.schoolNameAr')}</label>
                                <input type="text" name="schoolNameAr" value={studentToEdit.schoolName.ar} onChange={handleEditFormChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" dir="rtl" />
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('studentDataTable.schoolType')}</label>
                                     <select name="schoolType" value={studentToEdit.schoolType} onChange={handleEditFormChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                        <option value="pioneer">{t('dataKeys.pioneer')}</option>
                                        <option value="regular">{t('dataKeys.regular')}</option>
                                    </select>
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('studentDataTable.declaredLevel')}</label>
                                     <select name="studyLevelId" value={studentToEdit.studyLevelId} onChange={handleEditFormChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                        {STUDY_LEVEL_IDS.map(levelId => <option key={levelId} value={levelId}>{t(`levels.${levelId}`)}</option>)}
                                    </select>
                                </div>
                           </div>
                        </div>
                        <div className="flex justify-end p-4 border-t bg-gray-50">
                            <button onClick={handleCloseEditModal} className="px-4 py-2 bg-gray-200 rounded-md me-2">{t('common.cancel')}</button>
                            <button onClick={handleSaveStudentChanges} className="px-4 py-2 bg-blue-600 text-white rounded-md">{t('common.save')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};