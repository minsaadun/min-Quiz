import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 mt-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-6 h-6 rounded-md bg-teal-700 flex items-center justify-center text-white">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-900 text-sm">cikguMinKuiz</span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-500">JAIPk</span>
            </div>
            <p className="text-xs text-slate-500">
              “Bina prompt, hasilkan kuiz, bantu pelajar belajar.”
            </p>
          </div>

          <div className="flex flex-col sm:items-end text-xs text-slate-500 space-y-1">
            <p className="font-medium text-slate-700">
              Dibangunkan oleh minsaadun
            </p>
            <p className="text-[11px] text-slate-400">
              Khusus untuk para pendidik menghasilkan kuiz interaktif berkualiti dengan Gemini Canvas.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
