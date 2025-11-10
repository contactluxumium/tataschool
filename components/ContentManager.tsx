import React, { useState } from 'react';
import { lmsService } from '../services/lmsService';
import { EducationalContent, Lesson, QuestionType, Difficulty, Question, LocalizedString } from '../types';
import { Pencil, Trash2, PlusCircle, X, ChevronRight, FileJson, Download, Upload } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

type EditingItem = Partial<Omit<Lesson, 'title'> & Omit<Question, 'text' | 'options' | 'correctAnswer' | 'explanation'>> & {
    id?: string;
    title?: LocalizedString;
    text?: LocalizedString;
    options?: LocalizedString[];
    correctAnswer?: LocalizedString;
    explanation?: LocalizedString;
};

export const ContentManager: React.FC = () => {
    const { t, language } = useTranslation();
    const [content, setContent] = useState<EducationalContent>(() => lmsService.getContent());
    const [activeLevelId, setActiveLevelId] = useState<string | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    
    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
    const [editingType, setEditingType] = useState<'lesson' | 'question' | null>(null);
    const [creationInfo, setCreationInfo] = useState<{levelId: string} | null>(null);
    
    // State for bilingual textareas in modal
    const [optionsFr, setOptionsFr] = useState('');
    const [optionsAr, setOptionsAr] = useState('');

    const refreshContent = () => {
        const newContent = lmsService.getContent();
        setContent(newContent);
        if (selectedLesson) {
            const updatedLesson = newContent.levels.flatMap(l => l.lessons).find(l => l.id === selectedLesson.id);
            setSelectedLesson(updatedLesson || null);
        }
    };
    
    const handleExport = () => {
        try {
            const allData = {
                content: lmsService.getContent(),
                students: lmsService.getStudents(),
                rememberedStudents: lmsService.getRememberedStudents(),
            };
            const jsonString = JSON.stringify(allData, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `tataschool-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            alert(t('contentManager.exportError'));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!window.confirm(t('contentManager.importConfirm'))) {
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result;
                if (typeof text !== 'string') throw new Error("File read failed.");
                lmsService.importAllData(text);
                setActiveLevelId(null);
                setSelectedLesson(null);
                refreshContent();
                alert(t('contentManager.importSuccess'));
            } catch (error) {
                alert(t('contentManager.importError', {error: error instanceof Error ? error.message : 'Unknown error'}));
            } finally {
                e.target.value = '';
            }
        };
        reader.readAsText(file);
    };

    const handleLessonSelect = (lesson: Lesson) => {
        setSelectedLesson(lesson);
    };

    const handleDeleteLesson = (lessonId: string) => {
        if (window.confirm(t('contentManager.deleteLessonConfirm'))) {
            lmsService.deleteLesson(lessonId);
            if (selectedLesson?.id === lessonId) setSelectedLesson(null);
            refreshContent();
        }
    };

    const handleDeleteQuestion = (lessonId: string, questionId: string) => {
        if (window.confirm(t('contentManager.deleteQuestionConfirm'))) {
            lmsService.deleteQuestion(lessonId, questionId);
            refreshContent();
        }
    };
    
    const openModalForEdit = (item: Lesson | Question, type: 'lesson' | 'question') => {
        setEditingItem({ ...item });
        setEditingType(type);
        if (type === 'question' && 'options' in item && item.options) {
            setOptionsFr(item.options.map(opt => opt.fr).join('\n'));
            setOptionsAr(item.options.map(opt => opt.ar).join('\n'));
        }
        setIsModalOpen(true);
    };
    
    const openModalForNew = (type: 'lesson' | 'question', parentId: string) => {
        setEditingType(type);
        if (type === 'lesson') {
            setCreationInfo({ levelId: parentId });
            setEditingItem({ title: { fr: '', ar: '' } });
        } else {
            setEditingItem({
                text: { fr: '', ar: '' },
                type: QuestionType.MultipleChoice,
                difficulty: Difficulty.Easy,
                options: [],
                correctAnswer: { fr: '', ar: '' },
                explanation: { fr: '', ar: '' }
            });
            setOptionsFr('');
            setOptionsAr('');
        }
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!editingItem || !editingType) return;
        
        let finalItem = { ...editingItem };
        
        if (editingType === 'question' && finalItem.type === QuestionType.MultipleChoice) {
            const frOpts = optionsFr.split('\n').filter(o => o.trim() !== '');
            const arOpts = optionsAr.split('\n').filter(o => o.trim() !== '');
            if (frOpts.length !== arOpts.length) {
                alert('Le nombre d\'options en français et en arabe doit être le même.');
                return;
            }
            finalItem.options = frOpts.map((frOpt, index) => ({ fr: frOpt, ar: arOpts[index] }));
        }

        if (finalItem.id) { // Update
             if (editingType === 'lesson') lmsService.updateLesson(finalItem as Lesson);
             else if (editingType === 'question' && selectedLesson) lmsService.updateQuestion(selectedLesson.id, finalItem as Question);
        } else { // Create
            if (editingType === 'lesson' && creationInfo?.levelId) {
                lmsService.addLesson(creationInfo.levelId, { title: finalItem.title || { fr: 'Sans titre', ar: 'بدون عنوان' } });
            } else if (editingType === 'question' && selectedLesson) {
                const { id, ...newQuestionData } = finalItem;
                lmsService.addQuestion(selectedLesson.id, newQuestionData as Omit<Question, 'id'>);
            }
        }
        
        closeModal();
        refreshContent();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setEditingType(null);
        setCreationInfo(null);
        setOptionsFr('');
        setOptionsAr('');
    };
    
    const handleBilingualInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!editingItem) return;
        const { name, value } = e.target;
        const lang = name.slice(-2).toLowerCase() as 'fr' | 'ar';
        const field = name.slice(0, -2);
        
        setEditingItem(prev => ({
            ...prev,
            [field]: { ...((prev as any)[field] || {}), [lang]: value }
        }));
    };
    
    const handleSingleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editingItem) return;
        const { name, value } = e.target;
        setEditingItem({ ...editingItem, [name]: value });
    };

    return (
        <div>
             <div className="flex flex-col md:flex-row justify-end items-center mb-4 gap-4">
                <button
                    onClick={handleExport}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Download size={18} />
                    <span>{t('contentManager.exportContent')}</span>
                </button>
                <label className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                    <Upload size={18} />
                    <span>{t('contentManager.importContent')}</span>
                    <input type="file" accept=".json" className="hidden" onChange={handleFileChange} onClick={(e) => (e.currentTarget.value = '')} />
                </label>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 border-b pb-2">{t('contentManager.levelsAndLessons')}</h3>
                    <div className="space-y-2">
                        {content.levels.map(level => (
                            <div key={level.id}>
                                <div className="w-full flex justify-between items-center text-start p-2 font-semibold bg-gray-100 rounded-md">
                                    <button
                                        onClick={() => setActiveLevelId(activeLevelId === level.id ? null : level.id)}
                                        className="flex-grow flex items-center text-start"
                                    >
                                        <ChevronRight size={20} className={`transition-transform duration-300 ${activeLevelId === level.id ? 'rotate-90' : ''}`} />
                                        <span className="ms-1">{level.title[language]}</span>
                                    </button>
                                    <button onClick={() => openModalForNew('lesson', level.id)} className="p-1 text-gray-500 hover:text-blue-600">
                                        <PlusCircle size={18} />
                                    </button>
                                </div>
                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeLevelId === level.id ? 'max-h-[500px] opacity-100 pt-2' : 'max-h-0 opacity-0'}`}>
                                    <div className="ps-4 space-y-1">
                                        {level.lessons.map(lesson => {
                                            const qCount = lesson.questions.length;
                                            const isComplete = qCount >= 10;
                                            return (
                                                <div key={lesson.id} className="flex items-center justify-between">
                                                    <button 
                                                        onClick={() => handleLessonSelect(lesson)}
                                                        className={`w-full text-start p-2 rounded-md transition-colors flex justify-between items-center ${selectedLesson?.id === lesson.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                                                    >
                                                        <span>{lesson.title[language]}</span>
                                                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${isComplete ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                                            {qCount}/20
                                                        </span>
                                                    </button>
                                                    <div className="flex items-center">
                                                        <button onClick={() => openModalForEdit(lesson, 'lesson')} className="p-1 text-gray-500 hover:text-blue-600"><Pencil size={16} /></button>
                                                        <button onClick={() => handleDeleteLesson(lesson.id)} className="p-1 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md">
                    {selectedLesson ? (
                        <div>
                            <div className="flex justify-between items-center mb-4 border-b pb-2">
                                <h3 className="text-xl font-bold text-blue-700">{selectedLesson.title[language]}</h3>
                                <button
                                    onClick={() => openModalForNew('question', selectedLesson.id)}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <PlusCircle size={16} />
                                    <span>{t('contentManager.addQuestion')}</span>
                                </button>
                            </div>
                            <div className="space-y-4 max-h-[70vh] overflow-y-auto pe-2">
                                {selectedLesson.questions.map((q, index) => (
                                    <div key={q.id} className="p-4 border rounded-lg bg-gray-50">
                                        <div className="flex justify-between items-start">
                                            <p className="font-semibold text-gray-800 flex-grow">{index + 1}. {q.text[language]}</p>
                                            <div className="flex items-center flex-shrink-0 ms-2">
                                                <button onClick={() => openModalForEdit(q, 'question')} className="p-1 text-gray-600 hover:text-blue-600"><Pencil size={18} /></button>
                                                <button onClick={() => handleDeleteQuestion(selectedLesson.id, q.id)} className="p-1 text-gray-600 hover:text-red-600"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                        {q.mathExpression && <p className="text-lg font-mono text-center my-2 text-slate-600" dir="ltr">{q.mathExpression}</p>}
                                        <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-x-4">
                                            <p><span className="font-semibold">{t('contentManager.type')}:</span> {t(`dataKeys.${q.type}`)}</p>
                                            <p><span className="font-semibold">{t('contentManager.difficulty')}:</span> {t(`dataKeys.${q.difficulty}`)}</p>
                                        </div>
                                        {q.options && <div className="mt-2 text-sm"><p className="font-semibold">{t('contentManager.options')}:</p><ul className="list-disc ps-5"> {q.options.map((opt, i) => <li key={i}>{opt[language]}</li>)} </ul></div>}
                                        <p className="mt-2 text-sm"><span className="font-semibold text-green-700">{t('contentManager.correctAnswer')}:</span> {q.correctAnswer[language]}</p>
                                        {q.explanation && <p className="mt-2 text-xs italic bg-yellow-50 p-2 rounded-md"><span className="font-semibold">{t('contentManager.explanation')}:</span> {q.explanation[language]}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <FileJson size={48} className="mb-4" />
                            <p className="text-lg font-semibold">{t('contentManager.selectLessonPrompt')}</p>
                            <p>{t('contentManager.selectLessonDescription')}</p>
                        </div>
                    )}
                </div>

                {isModalOpen && editingItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in-up">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h4 className="text-xl font-bold">
                                    {editingItem?.id 
                                        ? (editingType === 'lesson' ? t('contentManager.editLesson') : t('contentManager.editQuestion'))
                                        : (editingType === 'lesson' ? t('contentManager.addLesson') : t('contentManager.addQuestion'))
                                    }
                                </h4>
                                <button onClick={closeModal}><X size={24} /></button>
                            </div>
                            <div className="p-6 space-y-4 overflow-y-auto">
                                {editingType === 'lesson' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">{t('contentManager.lessonTitle')} (FR)</label>
                                            <input type="text" name="titleFr" value={editingItem.title?.fr || ''} onChange={handleBilingualInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">{t('contentManager.lessonTitle')} (AR)</label>
                                            <input type="text" name="titleAr" value={editingItem.title?.ar || ''} onChange={handleBilingualInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" dir="rtl" />
                                        </div>
                                    </div>
                                )}
                                {editingType === 'question' && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                           <div>
                                                <label className="block text-sm font-medium text-gray-700">{t('contentManager.questionText')} (FR)</label>
                                                <textarea name="textFr" value={editingItem.text?.fr || ''} onChange={handleBilingualInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows={3}></textarea>
                                           </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">{t('contentManager.questionText')} (AR)</label>
                                                <textarea name="textAr" value={editingItem.text?.ar || ''} onChange={handleBilingualInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows={3} dir="rtl"></textarea>
                                           </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">{t('contentManager.mathExpression')}</label>
                                            <input type="text" name="mathExpression" value={editingItem.mathExpression || ''} onChange={handleSingleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" dir="ltr" placeholder="e.g., 2x + 5 = 10" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">{t('contentManager.difficulty')}</label>
                                                <select name="difficulty" value={editingItem.difficulty || Difficulty.Easy} onChange={handleSingleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                                    {Object.values(Difficulty).map(d => <option key={d} value={d}>{t(`dataKeys.${d}`)}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">{t('contentManager.type')}</label>
                                                <select name="type" value={editingItem.type || QuestionType.MultipleChoice} onChange={handleSingleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                                    {Object.values(QuestionType).map(t => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        {(editingItem.type === QuestionType.MultipleChoice) && (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('contentManager.options')} (FR)</label>
                                                    <textarea value={optionsFr} onChange={e => setOptionsFr(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows={4}></textarea>
                                                </div>
                                                 <div>
                                                    <label className="block text-sm font-medium text-gray-700">{t('contentManager.options')} (AR)</label>
                                                    <textarea value={optionsAr} onChange={e => setOptionsAr(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows={4} dir="rtl"></textarea>
                                                </div>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">{t('contentManager.correctAnswer')} (FR)</label>
                                                <input type="text" name="correctAnswerFr" value={editingItem.correctAnswer?.fr || ''} onChange={handleBilingualInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                            </div>
                                             <div>
                                                <label className="block text-sm font-medium text-gray-700">{t('contentManager.correctAnswer')} (AR)</label>
                                                <input type="text" name="correctAnswerAr" value={editingItem.correctAnswer?.ar || ''} onChange={handleBilingualInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" dir="rtl"/>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">{t('contentManager.explanation')} (FR)</label>
                                                <textarea name="explanationFr" value={editingItem.explanation?.fr || ''} onChange={handleBilingualInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows={4}></textarea>
                                            </div>
                                             <div>
                                                <label className="block text-sm font-medium text-gray-700">{t('contentManager.explanation')} (AR)</label>
                                                <textarea name="explanationAr" value={editingItem.explanation?.ar || ''} onChange={handleBilingualInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows={4} dir="rtl"></textarea>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">
                                <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-md me-2">{t('common.cancel')}</button>
                                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md">{t('common.save')}</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
