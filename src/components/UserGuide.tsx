import React from 'react';
import {
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Share2,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';

interface UserGuideProps {
  onBackToForm: () => void;
  onFillExample: () => void;
}

export const UserGuide: React.FC<UserGuideProps> = ({
  onBackToForm,
  onFillExample,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Isi Maklumat Kuiz',
      desc: 'Masukkan subjek, tajuk kuiz, tahap murid (wajib), serta objektif dan bahan rujukan sukatan jika ada.',
    },
    {
      num: '02',
      title: 'Tekan “Jana Prompt Kuiz”',
      desc: 'Sistem cikguMinKuiz akan menyusun arahan lengkap, berstruktur dan mesra Canvas mengikut tetapan anda.',
    },
    {
      num: '03',
      title: 'Salin & Tampal ke Gemini Canvas',
      desc: 'Klik “Salin Prompt”, buka laman Google Gemini, pastikan mod Canvas aktif, dan tampal prompt tersebut.',
    },
    {
      num: '04',
      title: 'Semak Ketepatan Soalan & Jawapan',
      desc: 'Periksa kesahihan soalan, pilihan A/B/C/D, serta jawapan betul terutamanya topik berunsur hukum syarak atau dalil.',
    },
    {
      num: '05',
      title: 'Uji Kuiz dari Mula Hingga Selesai',
      desc: 'Mainkan kuiz seperti seorang pelajar untuk memastikan navigasi bergerak lancar dan pengiraan markah tepat.',
    },
    {
      num: '06',
      title: 'Kongsikan Pautan Kuiz kepada Pelajar',
      desc: 'Gunakan fungsi perkongsian yang sedia ada di Gemini Canvas (Share/Publish) dan uji pautan sebelum diagihkan.',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 sm:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
            <HelpCircle className="w-5 h-5 text-teal-700" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Panduan Penggunaan cikguMinKuiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Enam langkah mudah untuk menghasilkan kuiz interaktif web menggunakan Gemini Canvas bagi pendidik JAIPk.
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Warning Banner */}
      <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-bold text-amber-900">
            Peringatan Penting Integriti Ilmu
          </h3>
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-medium">
            “Semak semua soalan dan jawapan sebelum digunakan, khususnya kandungan agama. Markah hanya dipaparkan pada kuiz dan tidak disimpan.”
          </p>
          <p className="text-[11px] text-amber-700 mt-1">
            Gemini Canvas membina aplikasi web kendiri di sisi klien. Pelajar tidak memerlukan akaun atau log masuk, dan data markah tidak dimuat naik ke mana-mana pelayan luar.
          </p>
        </div>
      </div>

      {/* 6 Steps Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-teal-700" />
          <span>Langkah Demi Langkah:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex gap-3.5"
            >
              <div className="font-mono text-base font-extrabold text-teal-700 shrink-0 bg-white border border-teal-200 w-9 h-9 rounded-lg flex items-center justify-center shadow-2xs">
                {st.num}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips section for JAIPk Educators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl border border-slate-200 bg-teal-50/40 space-y-2">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-teal-700" />
            <span>Aktifkan Mod Canvas</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dalam Google Gemini, pastikan mod <strong>Canvas</strong> dipilih atau butang kod/canvas dihidupkan supaya Gemini menjana aplikasi interaktif visual, bukan sekadar teks jawapan biasa.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-teal-50/40 space-y-2">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-xs sm:text-sm">
            <Smartphone className="w-4 h-4 text-teal-700" />
            <span>Mesra Telefon & Tablet</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Arahan prompt yang dibina telah mengarahkan Gemini menggunakan reka bentuk responsif dengan butang mudah ditekan oleh murid dari pelbagai saiz skrin gajet.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-teal-50/40 space-y-2">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>Selamat & Privasi Terpelihara</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kuiz tidak memerlukan sebarang pendaftaran akaun, e-mel pelajar mahupun sambungan pangkalan data. Murid boleh terus menjawab tanpa sebarang risiko kebocoran data.
          </p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onBackToForm}
          className="w-full sm:w-auto px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
        >
          Kembali ke Borang Maklumat Kuiz
        </button>

        <button
          type="button"
          onClick={onFillExample}
          className="w-full sm:w-auto px-4 py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-teal-900 font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
        >
          Cuba Isi Contoh Segera
        </button>
      </div>
    </div>
  );
};
