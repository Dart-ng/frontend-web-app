import { ArrowLeft, Mail } from "lucide-react";

export default function Email({
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          What's your email?
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
          We'll use this to send important updates about your orders and receipts.
        </p>
      </div>

      {/* Inputs */}
      <div className="mb-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          Email Address
        </label>
        <div className="flex items-center gap-3 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all shadow-xs">
          <Mail className="w-5 h-5 text-gray-400 shrink-0" />
          <div className="w-px h-5 bg-gray-200 dark:bg-white/10 shrink-0" />
          <input
            type="email"
            placeholder="e.g example@gmail.com"
            className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base"
          />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-4">
        <button
          onClick={onNext}
          className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold rounded-2xl transition-all flex items-center justify-center shadow-sm hover:shadow-md active:scale-[0.99] text-base"
        >
          Verify email
        </button>
      </div>
    </div>
  );
}