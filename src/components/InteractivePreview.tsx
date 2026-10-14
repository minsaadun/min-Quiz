import React, { useState } from 'react';
import { QuizFormData } from '../types';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  RotateCcw,
  Award,
  AlertCircle,
  HelpCircle,
  Info,
} from 'lucide-react';

interface InteractivePreviewProps {
  formData: QuizFormData;
  onBackToForm: () => void;
}

interface SampleQuestion {
  id: number;
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  {
    id: 1,
    question: 'Bagaimanakah nada suara yang sewajarnya digunakan ketika bertutur dengan ibu bapa?',
    options: [
      { key: 'A', text: 'Tinggi dan lantang supaya jelas' },
      { key: 'B', text: 'Sopan, lemah lembut dan bernada rendah' },
      { key: 'C', text: 'Kasar apabila tidak berpuas hati' },
      { key: 'D', text: 'Bersahaja seperti bercakap dengan rakan sebaya' },
    ],
    correctAnswer: 'B',
    explanation:
      'Islam menuntut anak-anak bercakap dengan penuh hormat, merendahkan suara dan mengelakkan ucapan kasar.',
  },
  {
    id: 2,
    question: 'Apakah tindakan terbaik apabila ibu bapa sedang memberikan nasihat kepada kita?',
    options: [
      { key: 'A', text: 'Mendengar dengan tekun serta berterima kasih' },
      { key: 'B', text: 'Memotong percakapan mereka untuk memberi alasan' },
      { key: 'C', text: 'Meninggalkan ruang perbualan dengan segera' },
      { key: 'D', text: 'Menunjukkan rasa jemu dan tidak berminat' },
    ],
    correctAnswer: 'A',
    explanation:
      'Mendengar nasihat dengan khusyuk dan menghargai pandangan ibu bapa adalah amalan anak soleh.',
  },
  {
    id: 3,
    question: 'Antara berikut, yang manakah merupakan amalan beradab terhadap ibu bapa di rumah?',
    options: [
      { key: 'A', text: 'Mengharapkan ibu bapa mengemas bilik tidur kita' },
      { key: 'B', text: 'Membantu meringankan kerja rumah seperti membasuh pinggan' },
      { key: 'C', text: 'Bermain telefon sepanjang hari tanpa mempedulikan mereka' },
      { key: 'D', text: 'Menyuruh adik-beradik lain sahaja yang membantu' },
    ],
    correctAnswer: 'B',
    explanation:
      'Membantu tugas harian di rumah dapat meringankan beban ibu bapa dan menggembirakan hati mereka.',
  },
  {
    id: 4,
    question: 'Bilakah masa yang paling digalakkan untuk mendoakan kebaikan ibu bapa?',
    options: [
      { key: 'A', text: 'Hanya semasa sambutan hari lahir mereka' },
      { key: 'B', text: 'Hanya apabila mereka sedang menghadapi kesusahan' },
      { key: 'C', text: 'Setiap masa, terutamanya selepas selesai menunaikan solat' },
      { key: 'D', text: 'Apabila kita mahukan sesuatu ganjaran daripada mereka' },
    ],
    correctAnswer: 'C',
    explanation:
      'Mendoakan keampunan dan rahmat bagi kedua ibu bapa adalah kewajipan berterusan setiap hari.',
  },
  {
    id: 5,
    question: 'Sekiranya ibu bapa meminta pertolongan ketika kita sedang berehat, apakah sikap yang patut diamalkan?',
    options: [
      { key: 'A', text: 'Bersegera menyahut panggilan dengan rela hati' },
      { key: 'B', text: 'Berpura-pura tidur agar tidak disuruh' },
      { key: 'C', text: 'Mendengus tanda marah sebelum membuat kerja' },
      { key: 'D', text: 'Menolak secara keras kerana waktu rehat' },
    ],
    correctAnswer: 'A',
    explanation:
      'Ikhlas dan segera mematuhi suruhan yang baik mendatangkan keberkatan dan keredhaan Allah.',
  },
];

export const InteractivePreview: React.FC<InteractivePreviewProps> = ({
  formData,
  onBackToForm,
}) => {
  const [quizState, setQuizState] = useState<'intro' | 'question' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [validationAlert, setValidationAlert] = useState<string | null>(null);

  const quizTitle = formData.title || 'Adab terhadap ibu bapa';
  const quizSubject = formData.subject || 'Pendidikan Islam';
  const quizGrade = formData.gradeLevel || 'Tahun 5';

  const questions = SAMPLE_QUESTIONS;
  const currentQ = questions[currentQuestionIndex];

  const handleStart = () => {
    setQuizState('question');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setValidationAlert(null);
  };

  const handleSelectOption = (key: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: key,
    }));
    setValidationAlert(null);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setValidationAlert(null);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setValidationAlert(null);
    }
  };

  const handleSubmit = () => {
    // Check if any unanswered
    const unansweredIndexes: number[] = [];
    questions.forEach((_, idx) => {
      if (!userAnswers[idx]) {
        unansweredIndexes.push(idx + 1);
      }
    });

    if (unansweredIndexes.length > 0) {
      setValidationAlert(
        `Anda belum menjawab soalan: ${unansweredIndexes.join(', ')}. Sila lengkapkan semua soalan sebelum menghantar.`
      );
      // Navigate to the first unanswered question
      setCurrentQuestionIndex(unansweredIndexes[0] - 1);
      return;
    }

    setQuizState('result');
    setValidationAlert(null);
  };

  const handleRetry = () => {
    handleStart();
  };

  // Score calculation
  const correctCount = questions.reduce((acc, q, idx) => {
    return acc + (userAnswers[idx] === q.correctAnswer ? 1 : 0);
  }, 0);
  const totalQuestions = questions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Simulation Banner Notice */}
      <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-teal-900">
          <p className="font-bold">
            Simulasi Aplikasi Gemini Canvas
          </p>
          <p className="text-teal-800 leading-relaxed">
            Ini ialah simulasi rupa dan fungsi aplikasi kuiz web sebenar yang akan dibina oleh Gemini Canvas apabila anda menampal prompt. Uji interaksi di bawah!
          </p>
        </div>
      </div>

      {/* Main Simulation Container (Styled like the student app) */}
      <div className="bg-white border-2 border-teal-700/20 rounded-2xl shadow-md overflow-hidden">
        {/* App Topbar */}
        <div className="bg-teal-700 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-wide">{quizSubject}</span>
            <span className="text-teal-200 text-xs">·</span>
            <span className="text-xs text-teal-100">{quizGrade}</span>
          </div>
          <span className="text-[11px] font-mono bg-teal-800/80 text-teal-100 px-2.5 py-1 rounded-md">
            Gemini Canvas Interactive
          </span>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
          {/* STATE 1: INTRO */}
          {quizState === 'intro' && (
            <div className="text-center py-6 space-y-6 flex-1 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto shadow-xs">
                <Award className="w-8 h-8 text-teal-600" />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {quizTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Kuiz objektif interaktif mengandungi 5 soalan. Baca setiap soalan dengan teliti dan pilih satu jawapan yang paling tepat.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1 max-w-sm">
                <p><strong>Jumlah Soalan:</strong> 5 soalan objektif (A, B, C, D)</p>
                <p><strong>Masa:</strong> Santai / Tiada had masa</p>
                <p><strong>Format:</strong> Satu soalan pada satu masa</p>
              </div>

              <button
                type="button"
                onClick={handleStart}
                className="px-8 py-3 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Mula Kuiz</span>
              </button>
            </div>
          )}

          {/* STATE 2: QUESTION */}
          {quizState === 'question' && currentQ && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              {/* Progress & Validation Alert */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 pb-2 border-b border-slate-100">
                  <span>
                    Soalan {currentQuestionIndex + 1} daripada {questions.length}
                  </span>
                  <span className="font-mono text-teal-700">
                    {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-600 h-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Validation alert if user skipped */}
                {validationAlert && (
                  <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{validationAlert}</span>
                  </div>
                )}
              </div>

              {/* Question Text */}
              <div className="space-y-4 my-2">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentQuestionIndex + 1}. {currentQ.question}
                </h4>

                {/* Options List */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt) => {
                    const isSelected = userAnswers[currentQuestionIndex] === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSelectOption(opt.key)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-teal-50 border-teal-600 text-teal-950 font-medium ring-1 ring-teal-500 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-teal-700 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Hantar Jawapan</span>
                    <CheckCircle className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Seterusnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STATE 3: RESULTS */}
          {quizState === 'result' && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              {/* Scorecard */}
              <div className="text-center py-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2">
                <div className="inline-flex p-3 rounded-full bg-teal-100 text-teal-800 mb-1">
                  <Award className="w-8 h-8 text-teal-700" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Keputusan Kuiz Anda
                </h3>
                <div className="flex items-center justify-center gap-4 text-slate-700 pt-1">
                  <div className="text-center">
                    <span className="block text-2xl font-black text-teal-800 tabular-nums">
                      {correctCount} / {totalQuestions}
                    </span>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                      Jawapan Betul
                    </span>
                  </div>
                  <div className="w-px h-8 bg-teal-200" />
                  <div className="text-center">
                    <span className="block text-2xl font-black text-teal-800 tabular-nums">
                      {percentage}%
                    </span>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                      Peratus
                    </span>
                  </div>
                </div>
                <p className="text-xs text-teal-800 font-medium pt-1">
                  {percentage >= 80
                    ? 'Tahniah! Penguasaan topik yang amat cemerlang.'
                    : percentage >= 50
                    ? 'Syabas! Anda telah memahami konsep asas topik ini.'
                    : 'Teruskan usaha dan ulangkaji topik ini semula.'}
                </p>
              </div>

              {/* Review section if showCorrectAnswers is active */}
              {formData.showCorrectAnswers && (
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-teal-700" />
                    <span>Semakan Jawapan:</span>
                  </h4>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {questions.map((q, idx) => {
                      const userChoice = userAnswers[idx];
                      const isCorrect = userChoice === q.correctAnswer;
                      return (
                        <div
                          key={q.id}
                          className={`p-3 rounded-lg border text-xs space-y-1 ${
                            isCorrect
                              ? 'bg-emerald-50/60 border-emerald-200'
                              : 'bg-rose-50/60 border-rose-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-slate-900">
                              {idx + 1}. {q.question}
                            </span>
                            {isCorrect ? (
                              <span className="text-emerald-700 font-bold shrink-0 flex items-center gap-0.5">
                                <CheckCircle className="w-3.5 h-3.5" /> Betul
                              </span>
                            ) : (
                              <span className="text-rose-700 font-bold shrink-0 flex items-center gap-0.5">
                                <XCircle className="w-3.5 h-3.5" /> Salah
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-600">
                            Jawapan anda:{' '}
                            <strong className={isCorrect ? 'text-emerald-800' : 'text-rose-800'}>
                              {userChoice}
                            </strong>{' '}
                            | Jawapan tepat:{' '}
                            <strong className="text-emerald-800">{q.correctAnswer}</strong>
                          </div>
                          {formData.showExplanation && (
                            <p className="text-[11px] text-slate-500 italic pt-0.5">
                              Penerangan: {q.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Retry Button if allowed */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
                {formData.allowRetry && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Cuba Lagi</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onBackToForm}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                >
                  Kembali ke Borang
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
