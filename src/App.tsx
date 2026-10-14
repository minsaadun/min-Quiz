/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  QuizFormData,
  ValidationErrors,
  INITIAL_FORM_DATA,
  EXAMPLE_FORM_DATA,
} from './types';
import { generateQuizPrompt } from './utils/promptGenerator';
import { Header } from './components/Header';
import { QuizForm } from './components/QuizForm';
import { PromptOutput } from './components/PromptOutput';
import { UserGuide } from './components/UserGuide';
import { InteractivePreview } from './components/InteractivePreview';
import { Footer } from './components/Footer';
import { Sparkles, CheckCircle2, Shield, HelpCircle, ArrowRight } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState<QuizFormData>(INITIAL_FORM_DATA);
  const [promptText, setPromptText] = useState<string>('');
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [activeTab, setActiveTab] = useState<'form' | 'guide' | 'preview'>('form');

  const promptOutputRef = useRef<HTMLDivElement>(null);

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    if (!formData.subject.trim()) {
      newErrors.subject = 'Sila masukkan Subjek (cth: Pendidikan Islam).';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Sila masukkan Tajuk kuiz (cth: Adab terhadap ibu bapa).';
    }
    if (!formData.gradeLevel.trim()) {
      newErrors.gradeLevel = 'Sila masukkan Tahun, Tingkatan atau Tahap Pelajar (cth: Tahun 5).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = () => {
    if (!validate()) {
      // Scroll to form top if on mobile
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    const generated = generateQuizPrompt(formData);
    setPromptText(generated);
    setHasGenerated(true);
    setCopied(false);

    // Scroll to prompt output smoothly on mobile/tablet
    setTimeout(() => {
      promptOutputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleFillExample = () => {
    setFormData(EXAMPLE_FORM_DATA);
    setErrors({});
    const generated = generateQuizPrompt(EXAMPLE_FORM_DATA);
    setPromptText(generated);
    setHasGenerated(true);
    setCopied(false);
    setActiveTab('form');
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setPromptText('');
    setHasGenerated(false);
    setCopied(false);
    setErrors({});
  };

  const handleCopySuccess = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onFillExample={handleFillExample}
        onReset={handleReset}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Hero Banner / Introductory Section */}
        <section className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 rounded-2xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
            <svg
              className="w-full h-full"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M45.7,-68.2C59.3,-60.8,70.5,-48.5,76.6,-34.1C82.7,-19.7,83.7,-3.2,80.1,12.2C76.5,27.6,68.3,42,56.7,52.4C45.1,62.8,30.1,69.2,14.6,72.6C-0.9,76,-16.9,76.4,-31.2,71.1C-45.5,65.8,-58,54.8,-66.9,41.2C-75.8,27.6,-81.1,11.4,-80.7,-4.6C-80.3,-20.6,-74.2,-36.4,-63.7,-47.9C-53.2,-59.4,-38.3,-66.6,-23.7,-71.4C-9.1,-76.2,5.2,-78.6,20.4,-77.1C35.6,-75.6,45.7,-68.2,45.7,-68.2Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-900/60 border border-teal-600/60 text-[11px] font-medium text-teal-100">
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span>Dikhaskan untuk Pendidik di bawah JAIPk</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              cikguMinKuiz
            </h1>

            <p className="text-base sm:text-lg font-medium text-teal-100">
              “Bina prompt, hasilkan kuiz, bantu pelajar belajar.”
            </p>

            <p className="text-xs sm:text-sm text-teal-200/90 leading-relaxed max-w-2xl">
              Aplikasi ini membantu pendidik beginner membina prompt lengkap dan tersusun untuk menghasilkan aplikasi kuiz interaktif satu demi satu soalan menggunakan Google Gemini Canvas — tanpa perlu sebarang pengaturcaraan, API key atau pangkalan data.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-teal-100/90">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>100% Percuma & Berjalan dalam Pelayar</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Tiada Pendaftaran Akaun Pelajar</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Format Standard Objektif A, B, C & D</span>
              </span>
            </div>
          </div>
        </section>

        {/* Tab View Switcher */}
        {activeTab === 'form' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-6 xl:col-span-7">
              <QuizForm
                formData={formData}
                onChange={setFormData}
                onGenerate={handleGenerate}
                onFillExample={handleFillExample}
                onReset={handleReset}
                errors={errors}
                setErrors={setErrors}
              />
            </div>

            {/* Right Column: Prompt Output */}
            <div ref={promptOutputRef} className="lg:col-span-6 xl:col-span-5 sticky top-20">
              <PromptOutput
                promptText={promptText}
                onPromptChange={setPromptText}
                onCopySuccess={handleCopySuccess}
                copied={copied}
                hasGenerated={hasGenerated}
                onGenerateClick={handleGenerate}
              />
            </div>
          </div>
        )}

        {/* Guide Tab */}
        {activeTab === 'guide' && (
          <UserGuide
            onBackToForm={() => setActiveTab('form')}
            onFillExample={handleFillExample}
          />
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <InteractivePreview
            formData={formData}
            onBackToForm={() => setActiveTab('form')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
