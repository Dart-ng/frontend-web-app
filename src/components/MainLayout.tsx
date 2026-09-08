import { useState } from "react";
import { Home, Package, Wallet, MessageSquare, User, Sun, Moon, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import HomeScreen from "../imports/Home";
import PackagesScreen from "../imports/Packages";
import WalletScreen from "../imports/Wallet";
import MessagesScreen from "../imports/Messages";
import AccountScreen from "../imports/Account";
import NotificationsScreen from "../imports/Notifications";
import DartLogo from "./DartLogo";

type Tab = "home" | "packages" | "wallet" | "messages" | "account";

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [showNotifications, setShowNotifications] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div className="flex h-[100dvh] max-h-[100dvh] bg-[#fcfcfc] dark:bg-[#0c0c0e] flex-col md:flex-row w-full overflow-hidden relative transition-colors">
      
      {/* Notifications Overlay (for Mobile / small screens) */}
      {showNotifications && (
         <NotificationsScreen onClose={() => setShowNotifications(false)} />
      )}
      
      {/* Left Navigation (Sidebar on Desktop, Bottom Bar on Mobile) */}
      <nav className="bg-white/95 dark:bg-[#161618]/95 backdrop-blur-md border-gray-200/70 dark:border-white/5 order-last md:order-first 
                      border-t md:border-t-0 md:border-r 
                      px-2 sm:px-6 py-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom,0px))] md:px-4 md:py-8
                      flex md:flex-col justify-around md:justify-start gap-0.5 md:gap-2
                      w-full md:w-64 z-40 shrink-0 transition-colors shadow-[0_-4px_20px_rgba(0,0,0,0.04)] dark:shadow-none">
        
        {/* Dart Brand Logo for Desktop */}
        <div className="hidden md:block mb-8 px-2">
          <DartLogo variant="auto" className="h-9 w-auto" />
        </div>

        <div className="flex md:flex-col justify-around md:justify-start w-full gap-0.5 md:gap-2">
          {[
            { id: "home", icon: Home, label: "Home" },
            { id: "packages", icon: Package, label: "Packages" },
            { id: "wallet", icon: Wallet, label: "Wallet" },
            { id: "messages", icon: MessageSquare, label: "Messages" },
            { id: "account", icon: User, label: "Account" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`flex flex-col md:flex-row items-center md:justify-start justify-center gap-1 md:gap-3 py-1.5 md:px-4 md:py-3 rounded-xl relative transition-all duration-200 flex-1 md:flex-initial min-h-[44px] touch-manipulation cursor-pointer ${
                activeTab === item.id 
                  ? "text-gray-900 dark:text-white md:bg-yellow-400/10 font-semibold" 
                  : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 font-medium"
              }`}
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5" fill={activeTab === item.id ? (item.id === 'account' ? 'none' : 'currentColor') : "none"} strokeWidth={activeTab === item.id ? 2 : 1.5} />
              <span className="text-[10px] sm:text-xs md:text-sm tracking-tight">{item.label}</span>
              {/* Mobile active indicator */}
              {activeTab === item.id && (
                <div className="h-1 w-8 bg-yellow-400 dark:bg-yellow-400 rounded-full absolute -bottom-0.5 left-1/2 -translate-x-1/2 md:hidden" />
              )}
            </button>
          ))}
        </div>

        {/* Desktop Profile Component & Controls at bottom of sidebar */}
        <div className="hidden md:flex mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex-col gap-2">
          {/* Quick Theme Switcher */}
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Toggle theme"
          >
            <span className="flex items-center gap-2">
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600" />
              )}
              <span>{resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-gray-200/60 dark:bg-white/10 text-gray-600 dark:text-gray-300">
              {resolvedTheme === "dark" ? "Dark" : "Light"}
            </span>
          </button>

          {/* Profile Component */}
          <div 
            onClick={() => setActiveTab("account")}
            className={`flex items-center gap-3 p-2 rounded-2xl transition-all cursor-pointer group touch-manipulation border ${
              activeTab === "account"
                ? "bg-yellow-50 dark:bg-yellow-400/10 border-yellow-400/30 dark:border-yellow-400/20"
                : "border-transparent hover:bg-gray-100/80 dark:hover:bg-white/5 hover:border-gray-200/50 dark:hover:border-white/5"
            }`}
          >
            {/* Avatar with Status Indicator */}
            <div className="relative shrink-0">
              <img 
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                alt="Hudeen Danesi" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-yellow-400/20 group-hover:ring-yellow-400 transition-all"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#161618] absolute bottom-0 right-0"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-gray-900 dark:text-white truncate block group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                Hudeen Danesi
              </span>
              <p className="text-xs text-gray-400 dark:text-gray-400 truncate">
                hudeen.danesi@example.com
              </p>
            </div>

            {/* Navigation Chevron */}
            <ChevronRight className={`w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ${activeTab === 'account' ? 'text-yellow-500' : ''}`} />
          </div>
        </div>
      </nav>

      {/* Main Content Area: Middle parent component with padding & active scrolling (no top padding) */}
      <main className="flex-1 min-h-0 h-full w-full relative bg-transparent transition-colors flex flex-col overflow-y-auto pt-0 md:pt-0 xl:pt-0 md:px-4 md:pb-4 xl:px-6 xl:pb-6">
        {activeTab === "home" && (
          <HomeScreen 
            onOpenNotifications={() => setShowNotifications(true)} 
            onNavigateToPackages={() => setActiveTab("packages")} 
          />
        )}
        {activeTab === "packages" && <PackagesScreen />}
        {activeTab === "wallet" && <WalletScreen />}
        {activeTab === "messages" && <MessagesScreen />}
        {activeTab === "account" && <AccountScreen onOpenNotifications={() => setShowNotifications(true)} />}
      </main>

      {/* Right Sidebar: Notifications Panel on Desktop (Replaces old Dashboard) */}
      <aside className="hidden xl:flex w-[340px] 2xl:w-[380px] bg-white dark:bg-[#161618] border-l border-gray-200/70 dark:border-white/5 shrink-0 flex-col h-full transition-colors z-20 overflow-hidden">
        <NotificationsScreen embedded={true} />
      </aside>

    </div>
  );
}
