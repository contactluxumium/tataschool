import React, { useState } from 'react';
import { lmsService } from '../services/lmsService';
import { EducationalContent, Lesson, QuestionType, Difficulty, Question } from '../types';
import { Pencil, Trash2, PlusCircle, X, ChevronRight, FileJson, Download, Upload } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

export const ContentManager: React.FC = () => {
    const { t } = useTranslation();
    const [content, setContent] = useState<EducationalContent>(() => lmsService.getContent());
    const [activeLevelId, setActiveLevelId] = useState<string | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    
    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<Lesson & Question> & { id?: string } | null>(null);
    const [editingType, setEditingType] = useState<'lesson' | 'question' | null>(null);
    const [creationInfo, setCreationInfo] = useState<{levelId: string} | null>(null);

    const refreshContent = () => {
        const newContent = lmsService.getContent();
        setContent(newContent);

        // If a lesson was selected, update its data
        if (selectedLesson) {
            const updatedLesson = newContent.levels
                .flatMap(l => l.lessons)
                .find(l => l.id === selectedLesson.id);
            setSelectedLesson(updatedLesson || null);
        }
    };
    
    const handleExport = () => {
        try {
            const currentContent = lmsService.getContent();
            const jsonString = JSON.stringify(currentContent, null, 2); // Pretty print JSON
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'lms-content.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            alert(t('contentManager.exportError'));
            console.error("Export failed:", error);
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
                const importedContent = JSON.parse(text);

                if (!importedContent || !Array.isArray(importedContent.levels)) {
                    throw new Error("Invalid file format. Must contain a 'levels' array.");
                }

                lmsService.saveContent(importedContent);
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
        reader.onerror = () => {
            alert('Error reading file.');
            e.target.value = '';
        };
        reader.readAsText(file);
    };

    const handleLessonSelect = (lesson: Lesson) => {
        setSelectedLesson(lesson);
    };

    const handleDeleteLesson = (lessonId: string) => {
        if (window.confirm(t('contentManager.deleteLessonConfirm'))) {
            lmsService.deleteLesson(lessonId);
            if (selectedLesson?.id === lessonId) {
                setSelectedLesson(null);
            }
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
        setEditingItem({ ...item }); // Create a copy for editing
        setEditingType(type);
        setIsModalOpen(true);
    };
    
    const openModalForNew = (type: 'lesson' | 'question', parentId: string) => {
        setEditingType(type);
        if (type === 'lesson') {
            setCreationInfo({ levelId: parentId });
            setEditingItem({ title: '' });
        } else {
            setEditingItem({
                text: '',
                type: QuestionType.MultipleChoice,
                difficulty: Difficulty.Easy,
                options: [],
                correctAnswer: '',
                explanation: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!editingItem || !editingType) return;
        
        if (editingItem.id) { // This is an update
             if (editingType === 'lesson') {
                lmsService.updateLesson(editingItem as Lesson);
            } else if (editingType === 'question' && selectedLesson) {
                lmsService.updateQuestion(selectedLesson.id, editingItem as Question);
            }
        } else { // This is a creation
            if (editingType === 'lesson' && creationInfo?.levelId) {
                lmsService.addLesson(creationInfo.levelId, { title: editingItem.title || 'untitled' });
            } else if (editingType === 'question' && selectedLesson) {
                lmsService.addQuestion(selectedLesson.id, editingItem as Omit<Question, 'id'>);
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
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!editingItem) return;
        const { name, value } = e.target;
        
        if (name === 'options') {
            setEditingItem({ ...editingItem, [name]: value.split('\n') });
        } else {
            setEditingItem({ ...editingItem, [name]: value });
        }
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
                    <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={handleFileChange}
                        onClick={(e) => (e.currentTarget.value = '')} 
                    />
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
                                        <span className="ms-1">{t(level.title)}</span>
                                    </button>
                                    <button onClick={() => openModalForNew('lesson', level.id)} className="p-1 text-gray-500 hover:text-blue-600">
                                        <PlusCircle size={18} />
                                    </button>
                                </div>
                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeLevelId === level.id ? 'max-h-[500px] opacity-100 pt-2' : 'max-h-0 opacity-0'}`}>
                                    <div className="ps-4 space-y-1">
                                        {level.lessons.map(lesson => {
                                            const qCount = lesson.questions.length;
                                            const isComplete = qCount === 20;
                                            return (
                                                <div key={lesson.id} className="flex items-center justify-between">
                                                    <button 
                                                        onClick={() => handleLessonSelect(lesson)}
                                                        className={`w-full text-start p-2 rounded-md transition-colors flex justify-between items-center ${selectedLesson?.id === lesson.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                                                    >
                                                        <span>{t(lesson.title)}</span>
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
                                <h3 className="text-xl font-bold text-blue-700">{t(selectedLesson.title)}</h3>
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
                                            <p className="font-semibold text-gray-800 flex-grow">{index + 1}. {t(q.text)}</p>
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
                                        {q.options && <div className="mt-2 text-sm"><p className="font-semibold">{t('contentManager.options')}:</p><ul className="list-disc ps-5"> {q.options.map(opt => <li key={opt}>{t(opt)}</li>)} </ul></div>}
                                        <p className="mt-2 text-sm"><span className="font-semibold text-green-700">{t('contentManager.correctAnswer')}:</span> {t(q.correctAnswer)}</p>
                                        {q.explanation && <p className="mt-2 text-xs italic bg-yellow-50 p-2 rounded-md"><span className="font-semibold">{t('contentManager.explanation')}:</span> {t(q.explanation)}</p>}
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
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up">
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                             {editingItem?.id ? t('contentManager.lessonTitle') : t('contentManager.newLessonTitle')}
                                        </label>
                                        <input type="text" name="title" value={editingItem.title || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., lessons.lesson_01_06_title" />
                                    </div>
                                )}
                                {editingType === 'question' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">{t('contentManager.questionText')}</label>
                                            <textarea name="text" value={editingItem.text || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows={3}></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">{t('contentManager.mathExpression')}</label>
                                            <input type="text" name="mathExpression" value={editingItem.mathExpression || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" dir="ltr" placeholder="e.g., 2x + 5 = 10" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">{t('contentManager.difficulty')}</label>
                                                <select name="difficulty" value={editingItem.difficulty || Difficulty.Easy} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                                    {Object.values(Difficulty).map(d => <option key={d} value={d}>{t(`dataKeys.${d}`)}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">{t('contentManager.type')}</label>
                                                <select name="type" value={editingItem.type || QuestionType.MultipleChoice} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                                    {Object.values(QuestionType).map(t => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        {(editingItem.type === QuestionType.MultipleChoice) && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">{t('contentManager.options')}</label>
                                                <textarea name="options" value={editingItem.options?.join('\n') || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows={4}></textarea>
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">{t('contentManager.correctAnswer')}</label>
                                            <input type="text" name="correctAnswer" value={editingItem.correctAnswer || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">{t('contentManager.explanation')}</label>
                                            <textarea name="explanation" value={editingItem.explanation || ''} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows={4}></textarea>
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