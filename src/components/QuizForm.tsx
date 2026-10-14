import React from 'react';
import {
  QuizFormData,
  QuestionCount,
  DifficultyLevel,
  QuizLanguage,
  ValidationErrors,
} from '../types';
import {
  Sparkles,
  BookMarked,
  Layers,
  GraduationCap,
  Target,
  Hash,
  Gauge,
  Languages,
  FileText,
  Sliders,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Lightbulb,
} from 'lucide-react';

interface QuizFormProps {
  formData: QuizFormData;
  onChange: (data: QuizFormData) => void;
  onGenerate: () => void;
  onFillExample: () => void;
  onReset: () => void;
  errors: ValidationErrors;
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

const SUBJECT_SUGGESTIONS = [
  'Pendidikan Islam',
  'Bahasa Melayu',
  'Bahasa Arab',
  'Sains',
  'Matematik',
  'Sejarah',
  'Tauhid',
  'Feqah',
  'Sirah',
  'Akhlak',
];

const GRADE_SUGGESTIONS = [
  'Tahun 1',
  'Tahun 2',
  'Tahun 3',
  'Tahun 4',
  'Tahun 5',
  'Tahun 6',
  'Tingkatan 1',
  'Tingkatan 2',
  'Tingkatan 3',
  'Tingkatan 4',
  'Tingkatan 5',
  'KAFA / SRA',
];

const QUESTION_COUNTS: QuestionCount[] = [5, 10, 15, 20];
const DIFFICULTIES: DifficultyLevel[] = ['Mudah', 'Sederhana', 'Campuran'];
const LANGUAGES: QuizLanguage[] = ['Bahasa Melayu', 'Bahasa Inggeris', 'Dwibahasa'];

export const QuizForm: React.FC<QuizFormProps> = ({
  formData,
  onChange,
  onGenerate,
  onFillExample,
  onReset,
  errors,
  setErrors,
}) => {
  const updateField = <K extends keyof QuizFormData>(
    field: K,
    value: QuizFormData[K]
  ) => {
    onChange({
      ...formData,
      [field]: value,
    });
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof ValidationErrors];
        return next;
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-7">
      {/* Form Section Header */}
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-teal-700" />
            <span>Borang Maklumat Kuiz</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Lengkapkan butiran sukatan di bawah untuk membina prompt Gemini Canvas yang tepat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onFillExample}
            className="text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Isi Contoh</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Kosongkan</span>
          </button>
        </div>
      </div>

      {/* Required Validation Notice if any error exists */}
      {Object.keys(errors).length > 0 && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-rose-800 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Sila lengkapkan maklumat wajib:</p>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-rose-700">
              {errors.subject && <li>{errors.subject}</li>}
              {errors.title && <li>{errors.title}</li>}
              {errors.gradeLevel && <li>{errors.gradeLevel}</li>}
            </ul>
          </div>
        </div>
      )}

      {/* Main Grid: Inputs */}
      <div className="space-y-6">
        {/* Row 1: Subjek & Tajuk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Subjek */}
          <div className="space-y-1.5">
            <label
              htmlFor="subject"
              className="block text-xs sm:text-sm font-semibold text-slate-800"
            >
              1. Subjek <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                placeholder="cth: Pendidikan Islam, Sains, Bahasa Melayu"
                className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
                  errors.subject
                    ? 'border-rose-400 focus:ring-rose-200 text-rose-900'
                    : 'border-slate-300 focus:border-teal-600 focus:ring-teal-100 text-slate-900'
                }`}
              />
            </div>
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400 self-center mr-1">Cadangan:</span>
              {SUBJECT_SUGGESTIONS.slice(0, 5).map((subj) => (
                <button
                  key={subj}
                  type="button"
                  onClick={() => updateField('subject', subj)}
                  className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                    formData.subject === subj
                      ? 'bg-teal-700 text-white border-teal-700 font-medium'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
            {errors.subject && (
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.subject}</span>
              </p>
            )}
          </div>

          {/* 2. Tajuk Kuiz */}
          <div className="space-y-1.5">
            <label
              htmlFor="title"
              className="block text-xs sm:text-sm font-semibold text-slate-800"
            >
              2. Tajuk Kuiz <span className="text-rose-500 font-bold">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="cth: Adab terhadap ibu bapa, Rukun Iman"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
                errors.title
                  ? 'border-rose-400 focus:ring-rose-200 text-rose-900'
                  : 'border-slate-300 focus:border-teal-600 focus:ring-teal-100 text-slate-900'
              }`}
            />
            <p className="text-[11px] text-slate-500">
              Tajuk khusus yang akan dipaparkan di muka hadapan kuiz interaktif.
            </p>
            {errors.title && (
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Tahap Pelajar & Objektif */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 3. Tahap Pelajar */}
          <div className="space-y-1.5">
            <label
              htmlFor="gradeLevel"
              className="block text-xs sm:text-sm font-semibold text-slate-800"
            >
              3. Tahun, Tingkatan atau Tahap Pelajar{' '}
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <input
              id="gradeLevel"
              type="text"
              value={formData.gradeLevel}
              onChange={(e) => updateField('gradeLevel', e.target.value)}
              placeholder="cth: Tahun 5, Tingkatan 2, Kelas KAFA"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
                errors.gradeLevel
                  ? 'border-rose-400 focus:ring-rose-200 text-rose-900'
                  : 'border-slate-300 focus:border-teal-600 focus:ring-teal-100 text-slate-900'
              }`}
            />
            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {GRADE_SUGGESTIONS.slice(0, 6).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => updateField('gradeLevel', lvl)}
                  className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                    formData.gradeLevel === lvl
                      ? 'bg-teal-700 text-white border-teal-700 font-medium'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            {errors.gradeLevel && (
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.gradeLevel}</span>
              </p>
            )}
          </div>

          {/* 4. Objektif Pembelajaran */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="objective"
                className="block text-xs sm:text-sm font-semibold text-slate-800"
              >
                4. Objektif Pembelajaran
              </label>
              <span className="text-[11px] text-slate-400 font-normal">Pilihan</span>
            </div>
            <textarea
              id="objective"
              rows={2}
              value={formData.objective}
              onChange={(e) => updateField('objective', e.target.value)}
              placeholder="cth: Mengenal pasti amalan beradab terhadap ibu bapa dalam kehidupan harian."
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-slate-900 transition-colors resize-y min-h-[42px]"
            />
            <p className="text-[11px] text-slate-500">
              Membantu Gemini memfokuskan soalan pada hasil pembelajaran yang dihasratkan.
            </p>
          </div>
        </div>

        {/* Row 3: Parameter Kuiz (Bilangan, Kesukaran, Bahasa) */}
        <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs sm:text-sm">
            <Sliders className="w-4 h-4 text-teal-700" />
            <span>Tetapan Parameter Kuiz</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 5. Bilangan Soalan */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                5. Bilangan Soalan
              </label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-white border border-slate-200 rounded-lg">
                {QUESTION_COUNTS.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => updateField('questionCount', count)}
                    className={`py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      formData.questionCount === count
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">Lalai: 10 soalan</p>
            </div>

            {/* 6. Tahap Kesukaran */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                6. Tahap Kesukaran
              </label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-white border border-slate-200 rounded-lg">
                {DIFFICULTIES.map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => updateField('difficulty', diff)}
                    className={`py-1.5 text-xs font-semibold rounded-md transition-colors truncate px-1 ${
                      formData.difficulty === diff
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">Pilihan aras kognitif soalan</p>
            </div>

            {/* 7. Bahasa Kuiz */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                7. Bahasa Kuiz
              </label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-white border border-slate-200 rounded-lg">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => updateField('language', lang)}
                    className={`py-1.5 text-xs font-semibold rounded-md transition-colors truncate px-0.5 ${
                      formData.language === lang
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title={lang}
                  >
                    {lang === 'Bahasa Melayu' ? 'Melayu' : lang === 'Bahasa Inggeris' ? 'Inggeris' : 'Dwibahasa'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">
                {formData.language === 'Dwibahasa'
                  ? 'Soalan & pilihan dalam BM & BI'
                  : `Kuiz dalam ${formData.language}`}
              </p>
            </div>
          </div>
        </div>

        {/* 8. Nota atau Bahan Rujukan */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="notes"
              className="block text-xs sm:text-sm font-semibold text-slate-800"
            >
              8. Nota atau Bahan Rujukan
            </label>
            <span className="text-[11px] text-slate-400">
              {formData.notes.length > 0 ? `${formData.notes.length} aksara` : 'Disyorkan'}
            </span>
          </div>
          <textarea
            id="notes"
            rows={5}
            value={formData.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            placeholder="Tampal isi kandungan buku teks, nota ringkas, atau senarai fakta di sini. Gemini akan diarahkan menjadikan nota ini sebagai rujukan utama soalan..."
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-slate-900 transition-colors resize-y leading-relaxed"
          />
          <div className="flex items-start gap-1.5 text-[11px] text-slate-500 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
            <span>
              Peringatan integriti ilmu: Jangan reka petikan al-Quran, hadis atau hukum agama. Jika ada nota khusus, tampal di atas.
            </span>
          </div>
        </div>

        {/* 9. Pilihan Selepas Kuiz Dihantar */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800">
            9. Pilihan Selepas Kuiz Dihantar
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 9a. Markah dan Peratus (Always Active) */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-teal-200 bg-teal-50/50">
              <div className="pr-2">
                <span className="text-xs sm:text-sm font-medium text-slate-900 block">
                  Paparkan markah & peratus
                </span>
                <span className="text-[11px] text-teal-700">
                  Keputusan dikira secara automatik (1 markah setiap soalan).
                </span>
              </div>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-teal-700 text-white rounded shrink-0">
                Sentiasa Aktif
              </span>
            </div>

            {/* 9b. Paparkan Jawapan Betul */}
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50/80 cursor-pointer transition-colors">
              <div className="pr-2">
                <span className="text-xs sm:text-sm font-medium text-slate-900 block">
                  Paparkan jawapan betul
                </span>
                <span className="text-[11px] text-slate-500">
                  Pelajar dapat menyemak jawapan yang tepat selepas hantar.
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.showCorrectAnswers}
                onChange={(e) => updateField('showCorrectAnswers', e.target.checked)}
                className="w-4 h-4 text-teal-700 border-slate-300 rounded focus:ring-teal-500 cursor-pointer"
              />
            </label>

            {/* 9c. Paparkan Penerangan Ringkas */}
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50/80 cursor-pointer transition-colors">
              <div className="pr-2">
                <span className="text-xs sm:text-sm font-medium text-slate-900 block">
                  Paparkan penerangan ringkas
                </span>
                <span className="text-[11px] text-slate-500">
                  Penjelasan ringkas bagi mengukuhkan kefahaman topik.
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.showExplanation}
                onChange={(e) => updateField('showExplanation', e.target.checked)}
                className="w-4 h-4 text-teal-700 border-slate-300 rounded focus:ring-teal-500 cursor-pointer"
              />
            </label>

            {/* 9d. Benarkan Cuba Lagi */}
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50/80 cursor-pointer transition-colors">
              <div className="pr-2">
                <span className="text-xs sm:text-sm font-medium text-slate-900 block">
                  Benarkan butang “Cuba Lagi”
                </span>
                <span className="text-[11px] text-slate-500">
                  Mengosongkan jawapan & markah untuk percubaan baharu.
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.allowRetry}
                onChange={(e) => updateField('allowRetry', e.target.checked)}
                className="w-4 h-4 text-teal-700 border-slate-300 rounded focus:ring-teal-500 cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Action Footer Button */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={onGenerate}
          className="w-full sm:flex-1 py-3 px-6 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Jana Prompt Kuiz</span>
        </button>

        <button
          type="button"
          onClick={onFillExample}
          className="w-full sm:w-auto py-3 px-5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-teal-900 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span>Isi Contoh</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto py-3 px-4 text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Kosongkan Borang</span>
        </button>
      </div>
    </div>
  );
};
