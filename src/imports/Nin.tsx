import { ArrowLeft, Copy, UploadCloud, Camera } from "lucide-react";

export default function Nin({
  onNext,
  onBack,
}: {
  onNext?: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="flex flex-col w-full bg-transparent relative">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors mb-6 -ml-2 text-gray-800 dark:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          Verify your identity (NIN)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-normal">
          Verification helps keep Dart safe and trusted for everyone.
        </p>
      </div>

      {/* NIN Input */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          NIN Number
        </label>
        <div className="flex items-center gap-3 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all shadow-xs">
          <input
            type="text"
            placeholder="e.g 1234 5678 901"
            className="w-full bg-transparent outline-none text-gray-900 dark:text-white font-medium text-base placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <div className="h-5 w-px bg-gray-200 dark:bg-white/10 shrink-0 mx-1" />
          <button className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors shrink-0">
            <Copy className="w-4 h-4" />
            <span className="font-semibold text-xs uppercase tracking-wider">Paste</span>
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div className="mb-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          Upload Document
        </label>
        <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-xs">
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-xs">
            Upload a clear image or scan of your valid NIN slip or National ID.
          </p>

          <div className="border-2 border-dashed border-gray-300 dark:border-white/15 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors mb-3.5">
            <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-2.5">
              <UploadCloud className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-gray-900 dark:text-white font-semibold text-sm mb-0.5">
              Choose from files
            </span>
            <span className="text-gray-400 text-xs">JPG, PNG or PDF • Max 10MB</span>
          </div>

          <button className="w-full py-3 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors bg-white dark:bg-transparent">
            <Camera className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
              Take photo
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto pt-2">
        <button
          onClick={onNext}
          className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold rounded-2xl transition-all flex items-center justify-center shadow-sm hover:shadow-md active:scale-[0.99] text-base"
        >
          Submit & Continue
        </button>
      </div>
    </div>
  );
}