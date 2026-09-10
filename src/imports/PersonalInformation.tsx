import React, { useState } from "react";
import { ArrowLeft, Mail, Phone, Calendar, ShieldCheck, Check, Edit3, X } from "lucide-react";

interface PersonalInformationProps {
  onBack: () => void;
  onSave?: (info: UserProfileInfo) => void;
}

export interface UserProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  avatarUrl: string;
  isVerified?: boolean;
}

export default function PersonalInformation({ onBack, onSave }: PersonalInformationProps) {
  const [profile, setProfile] = useState<UserProfileInfo>({
    firstName: "Hudeen",
    lastName: "Danesi",
    email: "Hudeen09@gmail.com",
    phone: "+2347031013632",
    gender: "Male",
    dob: "Aug 18th, 2000",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
  });

  const [editingField, setEditingField] = useState<"email" | "phone" | "dob" | "gender" | null>(null);
  const [tempValue, setTempValue] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const startEdit = (field: "email" | "phone" | "dob" | "gender") => {
    setEditingField(field);
    if (field === "email") setTempValue(profile.email);
    if (field === "phone") setTempValue(profile.phone);
    if (field === "dob") setTempValue(profile.dob);
    if (field === "gender") setTempValue(profile.gender);
  };

  const saveEdit = () => {
    if (!tempValue.trim()) return;
    if (editingField === "email") setProfile({ ...profile, email: tempValue });
    if (editingField === "phone") setProfile({ ...profile, phone: tempValue });
    if (editingField === "dob") setProfile({ ...profile, dob: tempValue });
    if (editingField === "gender") setProfile({ ...profile, gender: tempValue });
    setEditingField(null);
  };

  const handleSaveChanges = () => {
    onSave?.(profile);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onBack();
    }, 1000);
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-full bg-transparent relative pb-28 md:pb-12 transition-colors">
      {/* Top Header */}
      <div className="px-3 sm:px-6 pt-[max(0.75rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 sticky top-0 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-sm z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-800 dark:text-white transition-colors cursor-pointer shrink-0"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate px-1 text-center">
          Personal information
        </h1>
        <div className="w-9 sm:w-10 shrink-0" />
      </div>

      <div className="flex-1 px-3 sm:px-6 md:px-8 py-4 sm:py-6 max-w-xl mx-auto w-full flex flex-col justify-between">
        <div className="flex flex-col gap-4 sm:gap-6">
          
          {/* Success Toast Banner */}
          {isSaved && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-2.5 sm:gap-3 text-emerald-800 dark:text-emerald-300 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm font-medium">Changes saved successfully!</span>
            </div>
          )}

          {/* Main Card */}
          <div className="bg-white dark:bg-[#1c1c20] border border-gray-100 dark:border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs transition-colors">
            
            {/* Top User Profile Header Row */}
            <div className="p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4 border-b border-gray-100 dark:border-white/5">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 shrink-0 bg-gray-100">
                <img
                  src={profile.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">
                  {profile.firstName} {profile.lastName}
                </h2>
                <div className="mt-0.5">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-bold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200/60 dark:border-green-500/20 uppercase tracking-tight whitespace-nowrap">
                    <ShieldCheck className="w-2.5 h-2.5 text-green-600 dark:text-green-400 shrink-0" />
                    Identity Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Field Rows */}
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              
              {/* Row 1: Email */}
              <div className="p-3 sm:p-4.5 flex items-center justify-between gap-2 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 pr-1">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-400">Email:</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => startEdit("email")}
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs transition-colors shrink-0 cursor-pointer touch-manipulation shadow-2xs"
                >
                  Update
                </button>
              </div>

              {/* Row 2: Phone Number */}
              <div className="p-3 sm:p-4.5 flex items-center justify-between gap-2 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 pr-1">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-400">Phone Number</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {profile.phone}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => startEdit("phone")}
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs transition-colors shrink-0 cursor-pointer touch-manipulation shadow-2xs"
                >
                  Update
                </button>
              </div>

              {/* Row 3: Date of birth */}
              <div className="p-3 sm:p-4.5 flex items-center justify-between gap-2 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 pr-1">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-400">Date of birth</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {profile.dob}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => startEdit("dob")}
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs transition-colors shrink-0 cursor-pointer touch-manipulation shadow-2xs"
                >
                  Update
                </button>
              </div>

              {/* Row 4: Gender */}
              <div className="p-3 sm:p-4.5 flex items-center justify-between gap-2 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 pr-1">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="5" />
                      <path d="M12 13v8" />
                      <path d="M9 18h6" />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-400">Gender</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {profile.gender}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => startEdit("gender")}
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs transition-colors shrink-0 cursor-pointer touch-manipulation shadow-2xs"
                >
                  Change
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSaveChanges}
          className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#FFCC00] hover:bg-[#f5a623] text-gray-950 font-bold text-sm sm:text-base transition-all duration-200 mt-6 sm:mt-8 shadow-sm active:scale-[0.99] cursor-pointer touch-manipulation"
        >
          Save changes
        </button>
      </div>

      {/* Inline Modal for Updating Fields */}
      {editingField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white dark:bg-[#18181b] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-gray-100 dark:border-white/10 animate-in zoom-in-95 duration-200 max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white capitalize">
                Update {editingField === "dob" ? "Date of Birth" : editingField}
              </h3>
              <button
                onClick={() => setEditingField(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {editingField === "gender" ? (
              <div className="flex flex-col gap-2 my-3 sm:my-4">
                {["Male", "Female", "Prefer not to say"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setTempValue(g)}
                    className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border text-xs sm:text-sm font-medium text-left transition-colors cursor-pointer ${
                      tempValue === g
                        ? "border-[#FFCC00] bg-amber-50/50 dark:bg-amber-400/10 text-gray-900 dark:text-white font-semibold"
                        : "border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type={editingField === "email" ? "email" : editingField === "phone" ? "tel" : "text"}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                autoFocus
                className="w-full p-3 my-2 sm:my-3 bg-gray-50 dark:bg-[#202024] border border-gray-200 dark:border-white/10 rounded-xl text-base sm:text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#FFCC00]"
              />
            )}

            <div className="flex gap-2.5 sm:gap-3 mt-3 sm:mt-4">
              <button
                onClick={() => setEditingField(null)}
                className="flex-1 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-semibold text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer touch-manipulation"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 py-2.5 sm:py-3 rounded-xl bg-[#FFCC00] hover:bg-[#f5a623] text-gray-950 font-bold text-xs sm:text-sm cursor-pointer touch-manipulation shadow-xs"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
