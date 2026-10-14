import React from 'react';
import { BookOpen, Sparkles, HelpCircle, Eye, RotateCcw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'form' | 'guide' | 'preview';
  setActiveTab: (tab: 'form' | 'guide' | 'preview') => void;
  onFillExample: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onFillExample,
  onReset,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-teal-700 flex items-center justify-center text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-teal-900 whitespace-nowrap">
                cikguMinKuiz
              </span>
              <span className="text-[11px] font-medium text-teal-700 leading-none hidden sm:inline">
                JAIPk Edition
              </span>
            </div>
          </div>

          {/* Zone 2: Nav links / tabs (single-line, clean typography) */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'form'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Borang Kuiz</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-teal-600" />
              <span>Cara Guna</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Eye className="w-4 h-4 text-teal-600" />
              <span>Pratonton Kuiz</span>
            </button>
          </nav>

          {/* Zone 3: Quick Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onFillExample}
              className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-teal-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors whitespace-nowrap items-center gap-1.5 shadow-2xs"
              title="Isi contoh borang Pendidikan Islam Tahun 5"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
              <span>Isi Contoh</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-1"
              title="Kosongkan Borang"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Kosongkan</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
