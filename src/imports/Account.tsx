import React, { useState } from "react";
import { Bell, ArrowLeft, ChevronRight, User, ShieldCheck, MapPin, Wallet, Moon, Sun, Globe, MessageCircleQuestion, Headphones, Sparkles, Users, Shield, Info, Smartphone } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import RateDart from "./RateDart";
import HelpCentre from "./HelpCentre";
import ContactSupport from "./ContactSupport";
import ReportIssue from "./ReportIssue";
import AboutDart from "./AboutDart";
import PersonalInformation, { UserProfileInfo } from "./PersonalInformation";
import AccountVerification from "./AccountVerification";
import PaymentMethod from "./PaymentMethod";
import NotificationPreferences from "./NotificationPreferences";
import SavedAddress from "./SavedAddress";
import LanguageModal, { LanguageOption } from "../components/LanguageModal";

type AccountView = "main" | "rate" | "help" | "contact" | "report" | "about" | "personal" | "verification" | "payment" | "notifications" | "address";

export default function Account({ onOpenNotifications }: { onOpenNotifications?: () => void }) {
  const [view, setView] = useState<AccountView>("main");
  const [userProfile, setUserProfile] = useState<UserProfileInfo>({
    firstName: "Hudeen",
    lastName: "Danesi",
    email: "hudeen.danesi@example.com",
    phone: "+234 706 856 9185",
    gender: "male",
    dob: "1998-05-14",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  });
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>({
    id: "en",
    name: "English",
    isDefault: true,
  });
  const isVerified = false;
  const { theme, setTheme, resolvedTheme } = useTheme();

  if (view === "rate") {
    return (
      <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative transition-colors">
          <RateDart onBack={() => setView("main")} onDone={() => setView("main")} />
        </div>
      </div>
    );
  }

  if (view === "help") {
    return (
      <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative transition-colors">
          <HelpCentre
            onBack={() => setView("main")}
            onContactSupport={() => setView("contact")}
            onReportIssue={() => setView("report")}
          />
        </div>
      </div>
    );
  }

  if (view === "contact") {
    return (
      <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative transition-colors">
          <ContactSupport
            onBack={() => setView("main")}
            onReportIssue={() => setView("report")}
          />
        </div>
      </div>
    );
  }

  if (view === "report") {
    return (
      <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative transition-colors">
          <ReportIssue
            onBack={() => setView("main")}
            onSubmitSuccess={() => setView("main")}
          />
        </div>
      </div>
    );
  }

  if (view === "about") {
    return (
      <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative transition-colors">
          <AboutDart onBack={() => setView("main")} />
        </div>
      </div>
    );
  }

  if (view === "personal") {
    return (
      <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative transition-colors">
          <PersonalInformation
            onBack={() => setView("main")}
            onSave={(updated) => setUserProfile(updated)}
          />
        </div>
      </div>
    );
  }

  if (view === "verification") {
    return (
      <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative transition-colors">
          <AccountVerification onBack={() => setView("main")} />
        </div>
      </div>
    );
  }

  if (view === "payment") {
    return (
      <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative transition-colors">
          <PaymentMethod onBack={() => setView("main")} />
        </div>
      </div>
    );
  }

  if (view === "notifications") {
    return (
      <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative transition-colors">
          <NotificationPreferences onBack={() => setView("main")} />
        </div>
      </div>
    );
  }

  if (view === "address") {
    return (
      <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative transition-colors">
          <SavedAddress onBack={() => setView("main")} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
      
      {/* Container for Desktop Centering */}
      <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative pb-24 md:pb-12 transition-colors">
        
        {/* Header */}
        <div className="px-5 sm:px-6 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
          </button>
          <h1 className="text-xl font-medium text-gray-900 dark:text-white">Account</h1>
          <button onClick={onOpenNotifications} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full border border-white dark:border-[#161618]"></div>
          </button>
        </div>

        <div className="flex-1 p-6 sm:p-10 flex flex-col gap-8">
          
          {/* Profile Header */}
          <div 
            onClick={() => setView("personal")}
            className="flex items-center justify-between cursor-pointer group hover:opacity-95 transition-opacity"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/10 group-hover:ring-2 group-hover:ring-yellow-400 transition-all">
                <img src={userProfile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-1 group-hover:text-amber-500 transition-colors">
                  {userProfile.firstName} {userProfile.lastName}
                </h2>
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-green-100 dark:bg-green-400/10 text-green-700 dark:text-green-400 w-max uppercase">
                    <ShieldCheck className="w-3 h-3" />
                    Identity Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-red-100 dark:bg-red-400/10 text-red-500 dark:text-red-400 w-max uppercase">
                    <ShieldCheck className="w-3 h-3" />
                    Identity Unverified
                  </span>
                )}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors" />
          </div>

          {/* Account Section */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 px-2">Account</h3>
            <div className="bg-white dark:bg-[#1c1c20] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden divide-y divide-gray-50 dark:divide-white/5 transition-colors">
              
              <button 
                onClick={() => setView("personal")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">Personal Information</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Manage your Name, phone number and email</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

              <button 
                onClick={() => setView("verification")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <ShieldCheck className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">Acccount Verification</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">70-6856-9185</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

              <button 
                onClick={() => setView("address")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">Saved Address</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Manage your home , work and other address</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

              <button 
                onClick={() => setView("payment")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <Wallet className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">Payment Methods</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Manage cards bank account and wallets</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

            </div>
          </section>

          {/* Preference Section */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 px-2">Preference</h3>
            <div className="bg-white dark:bg-[#1c1c20] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden divide-y divide-gray-50 dark:divide-white/5 transition-colors">
              
              <button 
                onClick={() => setView("notifications")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">Notification</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Manage your notification preferences</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

              {/* Appearance Interactive Row */}
              <div className="p-4 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                      {resolvedTheme === "dark" ? (
                        <Moon className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <Sun className="w-5 h-5 text-amber-500" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white">Appearance</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred app appearance</span>
                    </div>
                  </div>
                </div>
                
                {/* Segmented Control */}
                <div className="flex bg-gray-100 dark:bg-[#141416] p-1 rounded-xl gap-1">
                  {(["light", "dark", "system"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setTheme(mode)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs capitalize transition-all ${
                        theme === mode
                          ? "bg-white dark:bg-[#25252a] text-gray-900 dark:text-white font-semibold shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
                      }`}
                    >
                      {mode === "system" ? "Auto (System)" : mode}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsLanguageModalOpen(true)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">Language</span>
                      <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-200/50 dark:border-amber-400/20">
                        {selectedLanguage.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred language</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

            </div>
          </section>

          {/* Support Section */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 px-2">Support</h3>
            <div className="bg-white dark:bg-[#1c1c20] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden divide-y divide-gray-50 dark:divide-white/5 transition-colors">
              
              <button 
                onClick={() => setView("help")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <MessageCircleQuestion className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">Help Centre</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">FAQs and helpful article</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

              <button 
                onClick={() => setView("contact")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <Headphones className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">Contact Support</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Get help from our support team</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

              <button 
                onClick={() => setView("rate")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <Sparkles className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">Rate Dart</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Share your experience with Dart</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <Users className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">Invite friends</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Invite friends and earn rewards</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

            </div>
          </section>

          {/* About Section */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 px-2">About</h3>
            <div className="bg-white dark:bg-[#1c1c20] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden divide-y divide-gray-50 dark:divide-white/5 transition-colors">
              
              <button 
                onClick={() => setView("about")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <Shield className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">Terms & Privacy</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Read our terms and privacy policy</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

              <button 
                onClick={() => setView("about")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <Info className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">About Dart</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Learn more about Dart</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

              <button 
                onClick={() => setView("about")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 shrink-0">
                    <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">App Version</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">You are Using the latest version (1.0.0.0)</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors shrink-0" />
              </button>

            </div>
          </section>

        </div>
      </div>

      {/* Language Selection Modal */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLanguage={selectedLanguage.id}
        onSaveLanguage={(lang) => setSelectedLanguage(lang)}
      />
    </div>
  );
}
