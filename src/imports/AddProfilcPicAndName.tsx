import { ArrowLeft, User, Camera } from "lucide-react";

export default function AddProfilcPicAndName({
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

      {/* Header for Profile Picture */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          Add a profile picture
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-normal">
          Help riders and other users recognize you
        </p>
      </div>

      {/* Profile Picture Upload */}
      <div className="flex justify-center mb-8">
        <div className="relative cursor-pointer group">
          <div className="w-28 h-28 bg-gray-200 dark:bg-[#202024] rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-white/15">
            <User className="w-14 h-14 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="absolute bottom-0 right-0 w-9 h-9 bg-yellow-400 border-2 border-white dark:border-[#121212] rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors shadow-sm">
            <Camera className="w-4 h-4 text-gray-950" />
          </div>
        </div>
      </div>

      {/* Header for Name */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          What should we call you?
        </h2>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-4 mb-8">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            First Name
          </label>
          <div className="flex items-center gap-3 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all shadow-xs">
            <User className="w-5 h-5 text-gray-400 shrink-0" />
            <div className="w-px h-5 bg-gray-200 dark:bg-white/10 shrink-0" />
            <input
              type="text"
              placeholder="e.g John"
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Last Name
          </label>
          <div className="flex items-center gap-3 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all shadow-xs">
            <User className="w-5 h-5 text-gray-400 shrink-0" />
            <div className="w-px h-5 bg-gray-200 dark:bg-white/10 shrink-0" />
            <input
              type="text"
              placeholder="e.g Doe"
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Gender
          </label>
          <div className="flex items-center gap-3 bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all shadow-xs">
            <User className="w-5 h-5 text-gray-400 shrink-0" />
            <div className="w-px h-5 bg-gray-200 dark:bg-white/10 shrink-0" />
            <select className="w-full bg-transparent outline-none text-gray-900 dark:text-white appearance-none cursor-pointer text-base">
              <option value="" disabled selected hidden className="bg-white dark:bg-[#18181b] text-gray-400">
                Select Gender
              </option>
              <option value="male" className="bg-white dark:bg-[#18181b] text-gray-900 dark:text-white">
                Male
              </option>
              <option value="female" className="bg-white dark:bg-[#18181b] text-gray-900 dark:text-white">
                Female
              </option>
              <option value="other" className="bg-white dark:bg-[#18181b] text-gray-900 dark:text-white">
                Other
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-4">
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