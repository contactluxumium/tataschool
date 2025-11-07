import React, { useState } from 'react';
import { StudentDataTable } from './StudentDataTable';
import { ContentManager } from './ContentManager';
import { PerformanceAnalytics } from './PerformanceAnalytics';
import { Users, FilePenLine, BarChart3 } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

type Tab = 'accounts' | 'content' | 'performance';

export const TeacherView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('accounts');
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex gap-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`flex flex-col items-center gap-1 py-3 px-4 border-b-4 font-semibold text-base transition-colors duration-200 ${
              activeTab === 'accounts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-gray-300'
            }`}
          >
            <Users className="h-7 w-7" />
            <span>{t('teacherTabs.manageAccounts')}</span>
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex flex-col items-center gap-1 py-3 px-4 border-b-4 font-semibold text-base transition-colors duration-200 ${
              activeTab === 'content'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-emerald-600 hover:border-gray-300'
            }`}
          >
            <FilePenLine className="h-7 w-7" />
            <span>{t('teacherTabs.manageContent')}</span>
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex flex-col items-center gap-1 py-3 px-4 border-b-4 font-semibold text-base transition-colors duration-200 ${
              activeTab === 'performance'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="h-7 w-7" />
            <span>{t('teacherTabs.performanceAnalytics')}</span>
          </button>
        </nav>
      </div>

      <div className="animate-fade-in">
        {activeTab === 'accounts' && <StudentDataTable />}
        {activeTab === 'content' && <ContentManager />}
        {activeTab === 'performance' && <PerformanceAnalytics />}
      </div>
    </div>
  );
};