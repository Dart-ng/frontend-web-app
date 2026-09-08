import React, { useState } from "react";
import { ArrowLeft, Mail, Phone, CreditCard, MapPin, ShieldCheck, AlertCircle, Check, ChevronRight, UploadCloud, Camera, X, Image as ImageIcon } from "lucide-react";

interface AccountVerificationProps {
  onBack: () => void;
  onVerifyNin?: () => void;
}

export default function AccountVerification({ onBack, onVerifyNin }: AccountVerificationProps) {
  const [showNinModal, setShowNinModal] = useState<boolean>(false);
  const [ninStep, setNinStep] = useState<"digits" | "photo">("digits");
  const [ninInput, setNinInput] = useState<string>("");
  const [idCardImage, setIdCardImage] = useState<string | null>(null);
  const [isNinVerified, setIsNinVerified] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const handlePasteNin = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const cleaned = text.replace(/\D/g, "").slice(0, 11);
      if (cleaned) setNinInput(cleaned);
    } catch {
      // fallback if clipboard api fails
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setIdCardImage(url);
    }
  };

  const handleSampleImage = () => {
    // Convenient mockup demo image if user doesn't have a real file on hand
    setIdCardImage("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80");
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNinVerified(true);
    setShowNinModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const progressPercentage = isNinVerified ? 80 : 60;

  return (
    <div className="w-full flex-1 flex flex-col min-h-full bg-transparent relative pb-12 transition-colors">
      {/* Top Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 sticky top-0 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-sm z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-800 dark:text-white transition-colors cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Account verification</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-6 sm:px-10 py-6 max-w-xl mx-auto w-full flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          
          {/* Success Toast */}
          {showSuccessToast && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-3 text-emerald-800 dark:text-emerald-300 animate-in fade-in slide-in-from-top-2 duration-200 shadow-sm">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-sm font-medium">NIN and ID Card front view submitted successfully!</span>
            </div>
          )}

          {/* Top Hero Card: Verification Progress */}
          <div className="bg-[#181a20] text-white rounded-3xl p-6 sm:p-7 relative overflow-hidden flex items-center justify-between shadow-md border border-white/5">
            <div className="flex flex-col z-10">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Verification progress
              </h2>
              <p className="text-xs text-gray-400 mt-1 mb-4">
                Your account is {progressPercentage}% Complete
              </p>

              {/* Progress Bar & Percentage */}
              <div className="flex items-center gap-3">
                <div className="w-36 sm:w-44 h-2 bg-gray-700/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFCC00] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-[#FFCC00]">
                  {progressPercentage}%
                </span>
              </div>
            </div>

            {/* Glowing Golden Shield Graphic */}
            <div className="relative z-10 shrink-0">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/10 flex items-center justify-center p-2.5 backdrop-blur-sm border border-amber-400/30 shadow-[0_0_24px_rgba(255,204,0,0.25)]">
                <svg className="w-12 h-12 text-[#FFCC00] drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4 5V11.5C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11.5V5L12 2Z" />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="#181a20"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute right-0 top-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Verification Items List Card */}
          <div className="bg-white dark:bg-[#1c1c20] border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-xs divide-y divide-gray-100 dark:divide-white/5 transition-colors">
            
            {/* 1. Email */}
            <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3.5 min-w-0 pr-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Email</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    Hudeen09@gmail.com
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200/60 dark:border-green-500/20 uppercase tracking-wide shrink-0">
                <ShieldCheck className="w-3 h-3 text-green-600 dark:text-green-400" />
                VERIFIED
              </span>
            </div>

            {/* 2. Phone Number */}
            <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3.5 min-w-0 pr-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Phone Number</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    +2347031013632
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200/60 dark:border-green-500/20 uppercase tracking-wide shrink-0">
                <ShieldCheck className="w-3 h-3 text-green-600 dark:text-green-400" />
                VERIFIED
              </span>
            </div>

            {/* 3. National ID */}
            <div
              onClick={() => {
                if (!isNinVerified) {
                  setNinStep("digits");
                  setShowNinModal(true);
                }
              }}
              className={`p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors ${
                !isNinVerified ? "cursor-pointer group" : ""
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0 pr-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">National ID</span>
                  <span className="text-xs text-gray-400 font-mono">
                    {isNinVerified ? `•••• •••• ${ninInput.slice(-4) || "9185"}` : "----"}
                  </span>
                </div>
              </div>
              {isNinVerified ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200/60 dark:border-green-500/20 uppercase tracking-wide shrink-0">
                  <ShieldCheck className="w-3 h-3 text-green-600 dark:text-green-400" />
                  VERIFIED
                </span>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 border border-red-200/60 dark:border-red-500/20 uppercase tracking-wide shrink-0">
                    <AlertCircle className="w-3 h-3" />
                    UNVERIFIED
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors" />
                </div>
              )}
            </div>

            {/* 4. Address */}
            <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3.5 min-w-0 pr-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Address</span>
                  <span className="text-xs text-gray-400 font-mono">----</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 border border-red-200/60 dark:border-red-500/20 uppercase tracking-wide shrink-0">
                <AlertCircle className="w-3 h-3" />
                UNVERIFIED
              </span>
            </div>

          </div>
        </div>

        {/* Bottom Helper Note */}
        <div className="text-center pt-12 pb-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 italic max-w-xs mx-auto leading-relaxed">
            Verify your account and enjoy more security and trust.
          </p>
        </div>
      </div>

      {/* Two-Step NIN Verification Modal (Digits -> ID Card Front View) */}
      {showNinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-[#18181b] rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-100 dark:border-white/10 animate-in zoom-in-95 duration-200 relative max-h-[90dvh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setShowNinModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Step Progress Indicators */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`h-1.5 flex-1 rounded-full ${ninStep === "digits" ? "bg-[#FFCC00]" : "bg-emerald-500"}`} />
              <div className={`h-1.5 flex-1 rounded-full ${ninStep === "photo" ? "bg-[#FFCC00]" : "bg-gray-200 dark:bg-gray-700"}`} />
            </div>

            {/* STEP 1: Enter 11-digit NIN */}
            {ninStep === "digits" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Enter National ID (NIN)
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                  Enter your 11-digit National Identity Number as issued by NIMC.
                </p>

                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                    11-Digit NIN Number
                  </label>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#202024] border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all">
                    <input
                      type="text"
                      maxLength={11}
                      value={ninInput}
                      onChange={(e) => setNinInput(e.target.value.replace(/\D/g, ""))}
                      placeholder="e.g 12345678901"
                      className="w-full bg-transparent outline-none text-base font-mono font-semibold tracking-wider text-gray-900 dark:text-white placeholder:text-gray-400"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handlePasteNin}
                      className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider hover:underline shrink-0 cursor-pointer"
                    >
                      Paste
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-gray-400 mt-1.5 px-1">
                    <span>Numbers only</span>
                    <span className={ninInput.length === 11 ? "text-emerald-500 font-bold" : ""}>
                      {ninInput.length}/11 digits
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNinModal(false)}
                    className="flex-1 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={ninInput.length !== 11}
                    onClick={() => setNinStep("photo")}
                    className="flex-1 py-3.5 rounded-xl bg-[#FFCC00] hover:bg-[#f5a623] disabled:opacity-40 disabled:cursor-not-allowed text-gray-950 font-bold text-sm cursor-pointer transition-all shadow-xs"
                  >
                    Next: ID Card Photo →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Upload NIN ID Card Front View */}
            {ninStep === "photo" && (
              <form onSubmit={handleFinalSubmit}>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  NIN ID Card (Front View)
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                  Please upload a clear image of your NIN card or digital slip (front view).
                </p>

                {/* ID Card Front Image Upload Container */}
                <div className="mb-4">
                  {idCardImage ? (
                    <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-black/5 dark:bg-white/5 p-2 flex flex-col items-center">
                      <img
                        src={idCardImage}
                        alt="NIN ID Card Front View"
                        className="w-full h-44 object-cover rounded-xl shadow-xs"
                      />
                      <div className="w-full flex items-center justify-between mt-2 px-1">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Front View Attached
                        </span>
                        <button
                          type="button"
                          onClick={() => setIdCardImage(null)}
                          className="text-xs text-red-500 hover:text-red-600 font-semibold cursor-pointer"
                        >
                          Change photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 dark:border-white/15 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative hover:bg-gray-50/70 dark:hover:bg-white/[0.02] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                        title="Upload NIN ID Card Front View"
                      />
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 border border-amber-200/50 dark:border-amber-400/20">
                        <UploadCloud className="w-7 h-7" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">
                        Upload ID Card (Front View)
                      </span>
                      <span className="text-xs text-gray-400 mb-3">
                        PNG, JPG or PDF • Clear & readable
                      </span>
                      
                      <div className="flex gap-2">
                        <label className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-xs font-semibold text-gray-700 dark:text-gray-200 cursor-pointer flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5" /> Take photo
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={handleSampleImage}
                          className="px-3 py-1.5 rounded-lg bg-amber-100/70 dark:bg-amber-400/15 hover:bg-amber-100 text-xs font-semibold text-amber-800 dark:text-amber-300 cursor-pointer flex items-center gap-1.5"
                        >
                          <ImageIcon className="w-3.5 h-3.5" /> Use sample ID
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  Tip: Ensure your name, photo, and 11-digit NIN are completely visible without camera glare.
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setNinStep("digits")}
                    className="flex-1 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={!idCardImage}
                    className="flex-1 py-3.5 rounded-xl bg-[#FFCC00] hover:bg-[#f5a623] disabled:opacity-40 disabled:cursor-not-allowed text-gray-950 font-bold text-sm cursor-pointer transition-all shadow-xs"
                  >
                    Submit for Verification
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
