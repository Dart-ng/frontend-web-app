import { useState } from "react";

export default function PhoneAuth({
  onNext,
  onBack,
}: {
  onNext?: () => void;
  onBack?: () => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState("703 101 3632");

  return (
    <div className="flex flex-col w-full bg-transparent relative">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          What's your phone number?
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base font-normal leading-relaxed">
          We'll send a 6-digit verification code to confirm your number and log you in.
        </p>
      </div>

      {/* Input Field */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          Phone Number
        </label>
        <div className="flex items-center bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-sm focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all">
          <div className="flex items-center gap-2 pr-4 border-r border-gray-200 dark:border-white/10 shrink-0">
            <img
              src="https://flagcdn.com/w20/ng.png"
              alt="Nigeria"
              className="w-5 h-3.5 object-cover rounded-sm"
            />
            <span className="font-semibold text-gray-800 dark:text-white text-base">
              +234
            </span>
          </div>
          <input
            type="tel"
            placeholder="703 101 3632"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 pl-4 text-lg font-semibold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 tracking-wide"
          />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-4">
        <button
          onClick={onNext}
          className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold rounded-2xl transition-all flex items-center justify-center shadow-sm hover:shadow-md active:scale-[0.99] text-base cursor-pointer"
        >
          Send OTP Verification
        </button>

        {/* Divider */}
        <div className="flex items-center my-2">
          <div className="flex-1 border-t border-gray-200 dark:border-white/10"></div>
          <span className="px-3 text-xs text-gray-400 uppercase tracking-wider font-medium">
            or continue with
          </span>
          <div className="flex-1 border-t border-gray-200 dark:border-white/10"></div>
        </div>

        {/* Google / Social Alternative */}
        <button
          onClick={onNext}
          type="button"
          className="w-full h-13 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] hover:bg-gray-50 dark:hover:bg-white/5 text-gray-800 dark:text-white font-medium rounded-2xl transition-colors flex items-center justify-center gap-3 text-sm cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}