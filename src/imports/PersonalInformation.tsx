import React, { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Check,
  X,
} from "lucide-react";

export interface UserProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender?: string;
  dob?: string;
  avatarUrl: string;
  isVerified?: boolean;
  memberId?: string;
  location?: string;
}

interface PersonalInformationProps {
  onBack: () => void;
  onSave?: (info: UserProfileInfo) => void;
  onOpenNotifications?: () => void;
  initialProfile?: UserProfileInfo;
  onVerifyIdentity?: () => void;
}

export default function PersonalInformation({
  onBack,
  onSave,
  initialProfile,
}: PersonalInformationProps) {
  const [formData, setFormData] = useState<UserProfileInfo>({
    firstName: initialProfile?.firstName || "Hudeen",
    lastName: initialProfile?.lastName || "Danesi",
    email: initialProfile?.email && initialProfile.email !== "----" ? initialProfile.email : "Hudeen09@gmail.com",
    phone: initialProfile?.phone && initialProfile.phone !== "----" ? initialProfile.phone : "+2347031013632",
    dob: initialProfile?.dob || "Aug 18th, 2000",
    gender: initialProfile?.gender || "Male",
    avatarUrl:
      initialProfile?.avatarUrl ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    isVerified: initialProfile?.isVerified ?? true,
    location: initialProfile?.location || "Lagos, Nigeria",
    memberId: initialProfile?.memberId || "MVU-234-23J",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<"email" | "phone" | "dob" | "gender" | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2200);
  };

  const handleOpenEdit = (field: "email" | "phone" | "dob" | "gender") => {
    setEditingField(field);
    if (field === "email") setTempValue(formData.email);
    if (field === "phone") setTempValue(formData.phone);
    if (field === "dob") setTempValue(formData.dob || "Aug 18th, 2000");
    if (field === "gender") setTempValue(formData.gender || "Male");
  };

  const handleSaveField = () => {
    if (!editingField) return;
    const updated = { ...formData };
    if (editingField === "email") updated.email = tempValue.trim() || formData.email;
    if (editingField === "phone") updated.phone = tempValue.trim() || formData.phone;
    if (editingField === "dob") updated.dob = tempValue.trim() || formData.dob;
    if (editingField === "gender") updated.gender = tempValue.trim() || formData.gender;

    setFormData(updated);
    setEditingField(null);
    showToast(`${editingField === "gender" ? "Gender" : editingField.charAt(0).toUpperCase() + editingField.slice(1)} updated`);
  };

  const handleSaveChanges = () => {
    onSave?.(formData);
    showToast("Changes saved successfully");
    setTimeout(() => {
      onBack();
    }, 600);
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-full bg-[#fcfcfc] dark:bg-[#0c0c0e] relative transition-colors">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200 flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-yellow-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="px-4 sm:px-8 pt-[max(0.75rem,env(safe-area-inset-top,0px))] pb-3.5 sm:pb-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 sticky top-0 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-sm z-10">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors cursor-pointer"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
          Personal information
        </h1>

        <div className="w-10" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 sm:px-8 py-6 max-w-xl md:max-w-2xl mx-auto w-full flex flex-col justify-between">
        <div className="space-y-6">
          {/* Main Card */}
          <div className="bg-white dark:bg-[#18181b] rounded-3xl border border-gray-100 dark:border-white/5 shadow-2xs overflow-hidden transition-colors">
            
            {/* Header: Avatar, Name, Verified Badge */}
            <div className="p-5 sm:p-6 flex items-center gap-4">
              {/* Circular Avatar */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-100 dark:border-white/10">
                <img
                  src={formData.avatarUrl}
                  alt={`${formData.firstName} ${formData.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and Verification Badge */}
              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                  {formData.firstName} {formData.lastName}
                </h2>

                {/* Green VERIFIED Pill Badge */}
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E7F8ED] dark:bg-emerald-950/50 text-[#16A34A] dark:text-emerald-400 text-[11px] font-bold tracking-wider uppercase">
                    <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                    <span>VERIFIED</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Horizontal Divider */}
            <div className="w-full border-b border-gray-100 dark:border-white/5" />

            {/* Field Rows */}
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              
              {/* Row 1: Email */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-800 dark:text-gray-200 shrink-0">
                    <Mail className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[1.8]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white block leading-snug">
                      Email:
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 block truncate mt-0.5">
                      {formData.email}
                    </span>
                  </div>
                </div>

                {/* Light Yellow Update Button */}
                <button
                  type="button"
                  onClick={() => handleOpenEdit("email")}
                  className="px-4 py-1.5 rounded-full bg-[#FEF6D8] dark:bg-yellow-400/15 text-gray-900 dark:text-yellow-300 hover:bg-[#faeebe] dark:hover:bg-yellow-400/25 text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0"
                >
                  Update
                </button>
              </div>

              {/* Row 2: Phone Number */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-800 dark:text-gray-200 shrink-0">
                    <Phone className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[1.8]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white block leading-snug">
                      Phone Number
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 block truncate mt-0.5">
                      {formData.phone}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenEdit("phone")}
                  className="px-4 py-1.5 rounded-full bg-[#FEF6D8] dark:bg-yellow-400/15 text-gray-900 dark:text-yellow-300 hover:bg-[#faeebe] dark:hover:bg-yellow-400/25 text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0"
                >
                  Update
                </button>
              </div>

              {/* Row 3: Date of birth */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-800 dark:text-gray-200 shrink-0">
                    <Calendar className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[1.8]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white block leading-snug">
                      Date of birth
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 block truncate mt-0.5">
                      {formData.dob}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenEdit("dob")}
                  className="px-4 py-1.5 rounded-full bg-[#FEF6D8] dark:bg-yellow-400/15 text-gray-900 dark:text-yellow-300 hover:bg-[#faeebe] dark:hover:bg-yellow-400/25 text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0"
                >
                  Update
                </button>
              </div>

              {/* Row 4: Gender */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-800 dark:text-gray-200 shrink-0">
                    {/* Gender Symbol Icon (Matches screenshot) */}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="9" r="5" />
                      <path d="M12 14v7" />
                      <path d="M9 18h6" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white block leading-snug">
                      Gender
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 block truncate mt-0.5">
                      {formData.gender}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenEdit("gender")}
                  className="px-4 py-1.5 rounded-full bg-[#FEF6D8] dark:bg-yellow-400/15 text-gray-900 dark:text-yellow-300 hover:bg-[#faeebe] dark:hover:bg-yellow-400/25 text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0"
                >
                  Change
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Save Changes CTA Button */}
        <div className="pt-8 pb-4">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="w-full py-4 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 font-bold text-base shadow-xs transition-all cursor-pointer flex items-center justify-center"
          >
            Save changes
          </button>
        </div>
      </div>

      {/* Edit Field Modal */}
      {editingField && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setEditingField(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-white dark:bg-[#18181b] rounded-t-[32px] sm:rounded-3xl p-6 border-t sm:border border-gray-100 dark:border-white/10 shadow-2xl space-y-4 pb-[max(1.75rem,env(safe-area-inset-bottom,1.25rem))] sm:pb-6 animate-in slide-in-from-bottom duration-200"
          >
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white capitalize">
                {editingField === "gender" ? "Change Gender" : `Update ${editingField === "dob" ? "Date of birth" : editingField}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingField(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {editingField === "gender" ? (
              <div className="grid grid-cols-2 gap-3 pt-2">
                {["Male", "Female"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTempValue(option)}
                    className={`py-3 px-4 rounded-2xl text-sm font-semibold border transition-all cursor-pointer text-center ${
                      tempValue === option
                        ? "bg-[#FEF6D8] border-yellow-400 text-gray-950 font-bold ring-2 ring-yellow-400/40"
                        : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : editingField === "dob" ? (
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder="e.g. Aug 18th, 2000"
                autoFocus
                className="w-full p-3.5 rounded-2xl border border-gray-200 dark:border-white/10 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-400 transition-colors"
              />
            ) : editingField === "email" ? (
              <input
                type="email"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder="e.g. name@gmail.com"
                autoFocus
                className="w-full p-3.5 rounded-2xl border border-gray-200 dark:border-white/10 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-400 transition-colors"
              />
            ) : (
              <input
                type="tel"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder="e.g. +2347031013632"
                autoFocus
                className="w-full p-3.5 rounded-2xl border border-gray-200 dark:border-white/10 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-400 transition-colors"
              />
            )}

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setEditingField(null)}
                className="flex-1 py-3 rounded-2xl border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveField}
                className="flex-1 py-3 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] text-xs font-bold text-gray-950 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
