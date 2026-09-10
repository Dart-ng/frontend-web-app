import React, { useState } from "react";
import { ArrowLeft, Mail, Phone, CreditCard, MapPin, ShieldCheck, AlertCircle, Check, ChevronRight, UploadCloud, Camera, X, Image as ImageIcon, Lock, Copy, Sparkles, FileText, CheckCircle2 } from "lucide-react";

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
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-gray-100 dark:border-white/5 sticky top-0 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-sm z-10">
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

      <div className="flex-1 px-3.5 sm:px-8 py-5 sm:py-6 max-w-xl mx-auto w-full flex flex-col justify-between">
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

      {/* Redesigned Premium Two-Step NIN Verification Modal (Digits -> ID Card Front View) */}
      {showNinModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          {/* Backdrop dismiss */}
          <div
            className="fixed inset-0"
            onClick={() => setShowNinModal(false)}
          />

          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg bg-white dark:bg-[#18181b] rounded-t-[32px] sm:rounded-[32px] p-5 sm:p-7 shadow-2xl border border-gray-100 dark:border-white/10 animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200 relative max-h-[92dvh] overflow-y-auto pb-[max(1.75rem,env(safe-area-inset-bottom,0px))] sm:pb-7 transition-colors z-10"
          >
            {/* Mobile Sheet Handle */}
            <div
              className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 sm:hidden cursor-pointer hover:bg-gray-400"
              onClick={() => setShowNinModal(false)}
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowNinModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer z-10"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Official Badge Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-amber-500/15 to-emerald-500/25 dark:from-emerald-400/15 dark:to-amber-400/15 border border-emerald-500/30 dark:border-emerald-400/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 shadow-2xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white tracking-tight truncate">
                    National ID (NIN)
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-300/40 uppercase shrink-0">
                    <Sparkles className="w-2.5 h-2.5" /> NIMC Official
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Official identity verification for high-tier trust
                </p>
              </div>
            </div>

            {/* Two-Step Progress Tabs */}
            <div className="flex items-center gap-2 mb-6 bg-gray-50 dark:bg-[#202024] p-1.5 rounded-2xl border border-gray-200/60 dark:border-white/5">
              <button
                type="button"
                onClick={() => setNinStep("digits")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  ninStep === "digits"
                    ? "bg-white dark:bg-[#2a2a30] text-gray-950 dark:text-white shadow-xs font-bold"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  ninInput.length === 11 && ninStep !== "digits"
                    ? "bg-emerald-500 text-white"
                    : ninStep === "digits"
                    ? "bg-[#FFCC00] text-black"
                    : "bg-gray-300 dark:bg-gray-600 text-black"
                }`}>
                  {ninInput.length === 11 && ninStep !== "digits" ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : "1"}
                </div>
                <span className="truncate">1. Enter 11-Digits</span>
              </button>

              <div className="w-3 h-0.5 bg-gray-300 dark:bg-white/10 shrink-0" />

              <button
                type="button"
                disabled={ninInput.length !== 11}
                onClick={() => setNinStep("photo")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  ninStep === "photo"
                    ? "bg-white dark:bg-[#2a2a30] text-gray-950 dark:text-white shadow-xs font-bold cursor-pointer"
                    : "text-gray-400 dark:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  idCardImage
                    ? "bg-emerald-500 text-white"
                    : ninStep === "photo"
                    ? "bg-[#FFCC00] text-black"
                    : "bg-gray-300 dark:bg-gray-600 text-black"
                }`}>
                  {idCardImage ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : "2"}
                </div>
                <span className="truncate">2. ID Card Photo</span>
              </button>
            </div>

            {/* STEP 1: Enter 11-digit NIN */}
            {ninStep === "digits" && (
              <div>
                {/* Realistic Nigerian National ID Card Reference Mockup */}
                <div className="relative rounded-2xl p-4 mb-5 border border-emerald-500/30 dark:border-emerald-400/25 bg-gradient-to-br from-emerald-950/5 via-amber-500/5 to-emerald-900/10 dark:from-[#0d1d16] dark:via-[#161a18] dark:to-[#122319] shadow-xs overflow-hidden">
                  {/* National ID Header */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-500/20 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        <div className="w-1.5 h-3.5 bg-emerald-600 rounded-xs" />
                        <div className="w-1.5 h-3.5 bg-white border border-gray-300 dark:border-transparent rounded-xs" />
                        <div className="w-1.5 h-3.5 bg-emerald-600 rounded-xs" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-400">
                        Federal Republic of Nigeria
                      </span>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-400/15 text-emerald-800 dark:text-emerald-300">
                      NIMC SLIP / CARD
                    </span>
                  </div>

                  {/* Body with Photo Silhouette & Highlighted NIN Display */}
                  <div className="flex items-center gap-3.5">
                    {/* User Profile Avatar / Chip Graphic */}
                    <div className="w-12 h-14 rounded-xl bg-gray-200/80 dark:bg-white/10 flex flex-col items-center justify-center shrink-0 border border-gray-300/60 dark:border-white/10 shadow-2xs relative">
                      <div className="w-4 h-4 rounded-full bg-gray-400 dark:bg-white/30 mb-1" />
                      <div className="w-7 h-4 rounded-t-lg bg-gray-400 dark:bg-white/30" />
                      <div className="w-2.5 h-2 bg-amber-400/80 rounded-xs absolute bottom-1 right-1" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="h-2 w-28 bg-gray-300/80 dark:bg-white/15 rounded-full" />
                        <div className="h-2 w-10 bg-gray-200 dark:bg-white/10 rounded-full" />
                      </div>
                      <div className="h-2 w-36 bg-gray-200 dark:bg-white/10 rounded-full" />

                      {/* Highlighted NIN Section */}
                      <div className="p-2 rounded-xl bg-amber-50 dark:bg-[#FFCC00]/10 border-2 border-dashed border-amber-400/80 dark:border-amber-400/40 flex items-center justify-between gap-2 shadow-2xs">
                        <div className="min-w-0">
                          <div className="text-[8px] font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300 leading-none mb-1">
                            National Identification No. (NIN)
                          </div>
                          <div className="text-xs sm:text-sm font-mono font-black tracking-widest text-gray-950 dark:text-white">
                            {ninInput ? (
                              <span>
                                {ninInput.padEnd(11, "•").replace(/(\d{4}|\D{4})(\d{3}|\D{3})(\d{4}|\D{4})/, "$1 $2 $3")}
                              </span>
                            ) : (
                              <span className="text-gray-400 dark:text-gray-500">1234 567 8901</span>
                            )}
                          </div>
                        </div>
                        <span className="text-[9px] font-bold bg-[#FFCC00] text-gray-950 px-2 py-0.5 rounded-md shrink-0 shadow-2xs">
                          11 Digits
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formatted Digit Input Field */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                      Enter 11-Digit NIN Number
                    </label>
                    <button
                      type="button"
                      onClick={() => setNinInput("84739201948")}
                      className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" /> Fill sample
                    </button>
                  </div>

                  <div className={`relative flex items-center bg-gray-50 dark:bg-[#202024] rounded-2xl border-2 transition-all px-4 py-3 sm:py-3.5 ${
                    ninInput.length === 11
                      ? "border-emerald-500 dark:border-emerald-400 ring-2 ring-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-500/5"
                      : "border-gray-200 dark:border-white/10 focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20"
                  }`}>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={11}
                      value={ninInput}
                      onChange={(e) => setNinInput(e.target.value.replace(/\D/g, ""))}
                      placeholder="e.g. 12345678901"
                      className="w-full bg-transparent outline-none text-base sm:text-xl font-mono font-bold tracking-[0.14em] text-gray-900 dark:text-white placeholder:text-gray-400 placeholder:tracking-normal placeholder:font-sans placeholder:font-normal placeholder:text-sm"
                      autoFocus
                    />

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {ninInput && (
                        <button
                          type="button"
                          onClick={() => setNinInput("")}
                          className="w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer"
                          title="Clear input"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handlePasteNin}
                        className="px-2.5 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        title="Paste from clipboard"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Paste</span>
                      </button>
                    </div>
                  </div>

                  {/* Live Digit Counter */}
                  <div className="flex items-center justify-between text-xs px-1">
                    <span className="text-gray-400 dark:text-gray-500 text-[11px]">
                      Numbers only • No letters or dashes
                    </span>
                    <span className={`font-bold text-xs transition-colors ${
                      ninInput.length === 11
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}>
                      {ninInput.length}/11 digits {ninInput.length === 11 && "✓"}
                    </span>
                  </div>
                </div>

                {/* Security Trust Notice */}
                <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 flex items-center gap-2.5 mb-6">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-[11px] text-emerald-900 dark:text-emerald-300 leading-snug">
                    Your NIN is verified securely against the NIMC database with 256-bit encryption. It is never exposed or shared with third parties.
                  </span>
                </div>

                {/* Step 1 Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNinModal(false)}
                    className="flex-1 py-3.5 rounded-2xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={ninInput.length !== 11}
                    onClick={() => setNinStep("photo")}
                    className="flex-1 py-3.5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5a623] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed text-gray-950 font-bold text-sm cursor-pointer transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Next: Upload ID Card</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Upload NIN ID Card Front View */}
            {ninStep === "photo" && (
              <form onSubmit={handleFinalSubmit}>
                {/* NIN Confirmation Pill */}
                <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#202024] border border-gray-200/70 dark:border-white/10 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-400/15 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-xs">
                      NIN
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        Selected NIN Number
                      </div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-gray-900 dark:text-white">
                        {ninInput.replace(/(\d{4})(\d{3})(\d{4})/, "$1 •••• $3")}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNinStep("digits")}
                    className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    Edit Digits
                  </button>
                </div>

                {/* Upload Guidelines Checklist */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#202024] border border-gray-100 dark:border-white/5 text-center">
                    <span className="text-base block mb-0.5">📸</span>
                    <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 leading-tight block">
                      Clear & Sharp
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#202024] border border-gray-100 dark:border-white/5 text-center">
                    <span className="text-base block mb-0.5">💡</span>
                    <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 leading-tight block">
                      No Glare
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#202024] border border-gray-100 dark:border-white/5 text-center">
                    <span className="text-base block mb-0.5">🔲</span>
                    <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 leading-tight block">
                      All 4 Corners
                    </span>
                  </div>
                </div>

                {/* ID Card Front Image Upload Container */}
                <div className="mb-4">
                  {idCardImage ? (
                    <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 bg-emerald-50/10 dark:bg-emerald-500/5 p-3 flex flex-col items-center">
                      <img
                        src={idCardImage}
                        alt="NIN ID Card Front View"
                        className="w-full h-44 object-cover rounded-xl shadow-xs"
                      />
                      <div className="w-full flex items-center justify-between mt-2.5 px-1">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <Check className="w-4 h-4 stroke-[3]" /> Front View Attached
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
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 border border-amber-200/50 dark:border-amber-400/20 shadow-2xs">
                        <UploadCloud className="w-7 h-7" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">
                        Upload ID Card (Front View)
                      </span>
                      <span className="text-xs text-gray-400 mb-3.5">
                        PNG, JPG or PDF • Valid NIN slip or plastic card
                      </span>
                      
                      <div className="flex flex-wrap justify-center gap-2 relative z-30">
                        <label className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-xs font-semibold text-gray-700 dark:text-gray-200 cursor-pointer flex items-center gap-1.5">
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
                          className="px-3 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-2xs"
                        >
                          <ImageIcon className="w-3.5 h-3.5" /> Use sample ID
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  Tip: Ensure your full name, photo, and 11-digit NIN match your official government records.
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setNinStep("digits")}
                    className="flex-1 py-3.5 rounded-2xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={!idCardImage}
                    className="flex-1 py-3.5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5a623] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed text-gray-950 font-bold text-sm cursor-pointer transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Submit Verification</span>
                    <Check className="w-4 h-4 stroke-[3]" />
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
