import { ArrowLeft, Navigation, MapPin, X } from "lucide-react";

export default function Location({
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
          Where are you based?
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-normal">
          This helps us match you with top-rated riders near you.
        </p>
      </div>

      {/* Use Current Location Button */}
      <button className="flex items-center gap-3.5 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-xs w-full text-left group">
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center shrink-0">
          <Navigation className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-white text-base group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
            Use my current location
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Enable GPS for instant nearest rider matching
          </span>
        </div>
      </button>

      {/* Or Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
        <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">
          Or search manually
        </span>
        <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          City or State
        </label>
        <div className="flex items-center gap-3 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all shadow-xs">
          <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            defaultValue="Auchi, Edo State"
            className="w-full bg-transparent outline-none text-gray-900 dark:text-white font-medium text-base"
          />
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Suggestions
        </h2>
        <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs divide-y divide-gray-100 dark:divide-white/5">
          {["Auchi, Igbe Road", "Auchi Delta Terminal", "Auchi, Apkepke"].map(
            (suggestion, i) => (
              <button
                key={i}
                className="flex items-center gap-3.5 w-full p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-yellow-500 transition-colors" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white text-sm">
                  {suggestion}
                </span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto pt-2">
        <button
          onClick={onNext}
          className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold rounded-2xl transition-all flex items-center justify-center shadow-sm hover:shadow-md active:scale-[0.99] text-base"
        >
          Continue
        </button>
      </div>
    </div>
  );
}