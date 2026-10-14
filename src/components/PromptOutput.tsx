import React, { useState } from 'react';
import {
  Copy,
  Check,
  ExternalLink,
  Edit3,
  FileCheck,
  Info,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface PromptOutputProps {
  promptText: string;
  onPromptChange: (newText: string) => void;
  onCopySuccess: () => void;
  copied: boolean;
  hasGenerated: boolean;
  onGenerateClick: () => void;
}

export const PromptOutput: React.FC<PromptOutputProps> = ({
  promptText,
  onPromptChange,
  onCopySuccess,
  copied,
  hasGenerated,
  onGenerateClick,
}) => {
  const [showManualModal, setShowManualModal] = useState(false);

  const handleCopy = async () => {
    if (!promptText) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(promptText);
        onCopySuccess();
      } else {
        // Fallback for restricted clipboard
        fallbackCopyTextToClipboard(promptText);
      }
    } catch {
      // Browser blocked clipboard API; show manual copy modal
      fallbackCopyTextToClipboard(promptText);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        onCopySuccess();
      } else {
        setShowManualModal(true);
      }
    } catch {
      setShowManualModal(true);
    }
  };

  const wordCount = promptText.trim() ? promptText.trim().split(/\s+/).length : 0;
  const charCount = promptText.length;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-7 flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-teal-700" />
              <span>Hasil Prompt Gemini Canvas</span>
            </h2>
            {hasGenerated && (
              <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Sedia Ditampal
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Salin teks prompt ini dan tampal di dalam Google Gemini (pastikan mod Canvas aktif).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!promptText}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>Prompt berjaya disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Prompt</span>
              </>
            )}
          </button>

          <a
            href="https://gemini.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-teal-800 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            title="Buka Google Gemini di tab baharu"
          >
            <span>Buka Gemini</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Copied Success Alert Banner */}
      {copied && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-xs sm:text-sm flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              Prompt berjaya disalin ke papan keratan (clipboard)!
            </span>
          </div>
          <span className="text-[11px] text-emerald-700">Tampal dalam Gemini</span>
        </div>
      )}

      {/* Prompt Editable Box */}
      <div className="flex-1 flex flex-col relative min-h-[380px]">
        {hasGenerated ? (
          <>
            <div className="flex items-center justify-between text-xs text-slate-500 pb-1.5 px-1">
              <span className="flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                <span>Teks di bawah boleh diedit terus jika guru mahu mengubah apa-apa butiran:</span>
              </span>
              <div className="flex items-center gap-3 tabular-nums font-mono text-[11px]">
                <span>{wordCount} perkataan</span>
                <span>·</span>
                <span>{charCount} aksara</span>
              </div>
            </div>

            <textarea
              value={promptText}
              onChange={(e) => onPromptChange(e.target.value)}
              aria-label="Teks Prompt Kuiz Gemini Canvas"
              className="w-full flex-1 p-4 text-xs sm:text-sm font-mono leading-relaxed text-slate-800 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-600 transition-colors resize-y min-h-[360px]"
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
              <Sparkles className="w-6 h-6 text-teal-600" />
            </div>
            <div className="max-w-md space-y-1">
              <h3 className="text-base font-bold text-slate-800">
                Prompt Belum Dijana
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Isi borang di sebelah atau tekan butang di bawah untuk menjana prompt kuiz interaktif bagi Gemini Canvas dengan pantas.
              </p>
            </div>
            <button
              type="button"
              onClick={onGenerateClick}
              className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Jana Prompt Kuiz Sekarang</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Advice Strip */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Petua Penggunaan dalam Gemini Canvas:</p>
          <p className="text-amber-800 leading-relaxed">
            Buka laman Gemini, pastikan mod <strong>Canvas</strong> diaktifkan, kemudian tampal (Ctrl+V) prompt ini ke dalam kotak sembang. Gemini akan membina aplikasi web interaktif satu demi satu soalan dengan markah automatik.
          </p>
        </div>
      </div>

      {/* Manual Copy Modal Fallback */}
      {showManualModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">
              Salin Prompt Secara Manual
            </h3>
            <p className="text-xs text-slate-600">
              Sila pilih semua teks di bawah dan tekan kekunci <strong>Ctrl+C</strong> (atau <strong>Cmd+C</strong> pada Mac) untuk menyalin:
            </p>
            <textarea
              readOnly
              value={promptText}
              onFocus={(e) => e.target.select()}
              rows={8}
              className="w-full p-3 font-mono text-xs border border-slate-300 rounded-lg bg-slate-50 focus:bg-white select-all"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowManualModal(false)}
                className="px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-lg hover:bg-teal-800"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
