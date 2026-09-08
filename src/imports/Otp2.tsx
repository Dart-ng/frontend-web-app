import { ArrowLeft } from "lucide-react";

export default function Otp2({
  onNext,
  onBack,
  onChangeNumber,
}: {
  onNext?: () => void;
  onBack?: () => void;
  onChangeNumber?: () => void;
}) {
  return (
    <div className="flex flex-col w-full bg-transparent relative">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors mb-6 -ml-2 text-gray-800 dark:text-white"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          Enter the 6-digit code
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-normal">
          We sent a code to{" "}
          <span className="text-gray-900 dark:text-white font-semibold">
            +234 703 101 3632
          </span>
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 w-full max-w-full">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            className="w-10 sm:w-12 h-13 sm:h-16 text-center text-xl sm:text-3xl font-bold bg-gray-100 dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-xl sm:rounded-2xl focus:bg-white dark:focus:bg-[#202024] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-gray-900 dark:text-white outline-none transition-all shrink-0"
            defaultValue={idx === 1 ? "7" : idx === 2 ? "0" : ""}
          />
        ))}
      </div>

      {/* Resend Code */}
      <div className="text-center mb-8">
        <p className="text-gray-500 dark:text-gray-400 font-normal mb-1">
          Didn't receive the code?
        </p>
        <p className="text-gray-900 dark:text-white font-medium text-sm">
          Re-send code in <span className="text-yellow-500 font-semibold">0:20</span>
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-4">
        <button
          onClick={onNext}
          className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold rounded-2xl transition-all flex items-center justify-center shadow-sm hover:shadow-md active:scale-[0.99] text-base"
        >
          Verify & Continue
        </button>

        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
          <span className="text-gray-400 text-xs uppercase tracking-wider font-medium">
            or
          </span>
          <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
        </div>

        <button
          onClick={onChangeNumber ?? onBack}
          className="w-full text-center text-gray-700 dark:text-gray-300 font-medium hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors py-2 text-sm"
        >
          Change phone number
        </button>
      </div>
    </div>
  );
}