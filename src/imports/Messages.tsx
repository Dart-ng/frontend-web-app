import { useState } from "react";
import { Edit, Search, Phone, MoreVertical, ArrowLeft, Camera, Mic } from "lucide-react";

type Tab = "All" | "Conversation" | "Updates" | "Supports";

export default function Messages() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [activeChat, setActiveChat] = useState<string | null>(null);

  if (activeChat) {
    return (
      <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 overflow-hidden transition-colors">
          
          {/* Chat Header */}
          <div className="px-4 pt-[max(0.75rem,env(safe-area-inset-top,0px))] pb-3 flex items-center justify-between border-b border-gray-100 dark:border-white/5 sticky top-0 bg-white dark:bg-[#161618] z-10">
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveChat(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-800 dark:text-white transition-colors cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                 <img src="https://i.pravatar.cc/100?img=11" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-semibold text-sm text-gray-900 dark:text-white">Divine Augustina</h2>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 4.8 • Verified Rider
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full transition-colors cursor-pointer">
                <Phone className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full transition-colors cursor-pointer">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-[#121214] flex flex-col gap-4">
            {/* Tracking banner */}
            <div className="bg-white dark:bg-[#1c1c20] rounded-xl p-3 flex items-center justify-between border border-gray-100 dark:border-white/5">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-lg flex items-center justify-center font-bold text-xs text-gray-500">📦</div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Google pixel 9pro</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Tracking ID: MV324-H247P</p>
                  </div>
               </div>
               <button className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer">View Details</button>
            </div>

            <div className="flex justify-center">
               <span className="text-[10px] text-gray-400">10:11 AM</span>
            </div>

            {/* Received Message */}
            <div className="flex gap-2 max-w-[80%]">
               <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 mt-auto overflow-hidden">
                 <img src="https://i.pravatar.cc/100?img=11" alt="avatar" className="w-full h-full object-cover" />
               </div>
               <div className="bg-white dark:bg-[#1c1c20] border border-gray-100 dark:border-white/5 p-3 rounded-2xl rounded-bl-sm text-gray-900 dark:text-white">
                 <p className="text-sm">Good afternoon I'm on my way. Arriving in about 4 minutes.</p>
                 <p className="text-[9px] text-gray-400 mt-1 text-right">12 mins ago</p>
               </div>
            </div>

            {/* Sent Message */}
            <div className="flex gap-2 max-w-[80%] self-end">
               <div className="bg-yellow-400 text-gray-900 p-3 rounded-2xl rounded-br-sm font-medium">
                 <p className="text-sm">Alright I'll be outside.</p>
                 <p className="text-[9px] text-gray-800 mt-1 text-right">6 mins ago</p>
               </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] bg-white dark:bg-[#161618] border-t border-gray-100 dark:border-white/5">
            <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar">
               <button className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs whitespace-nowrap text-gray-600 dark:text-gray-300">Call me</button>
               <button className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs whitespace-nowrap text-gray-600 dark:text-gray-300">I'm outside</button>
               <button className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs whitespace-nowrap text-gray-600 dark:text-gray-300">What's your ETA?</button>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-full flex-shrink-0 text-gray-500 dark:text-gray-400">
                <Camera className="w-5 h-5" />
              </button>
              <div className="flex-1 bg-gray-50 dark:bg-[#202024] rounded-full flex items-center px-4 py-2">
                <input type="text" placeholder="Type a message..." className="bg-transparent w-full focus:outline-none text-sm sm:text-sm text-gray-900 dark:text-white placeholder-gray-400" />
              </div>
              <button className="w-10 h-10 flex items-center justify-center bg-yellow-400 text-black rounded-full flex-shrink-0 cursor-pointer">
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] h-full overflow-y-auto transition-colors">
      <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative pb-24 md:pb-12 transition-colors">
        
        {/* Header */}
        <div className="px-5 sm:px-6 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between bg-white dark:bg-[#161618] sticky top-0 z-10 border-b border-gray-100 dark:border-white/5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-600 dark:text-yellow-400 transition-colors">
            <Edit className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 my-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-100 dark:border-white/10 rounded-xl leading-5 bg-gray-50 dark:bg-[#202024] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-500 sm:text-sm"
              placeholder="Search conversations"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 mb-6 flex gap-2 overflow-x-auto hide-scrollbar">
          {(["All", "Conversation", "Updates", "Supports"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-yellow-400 text-black font-semibold"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pb-6">
          
          <h2 className="text-sm font-semibold mb-4 text-gray-500 dark:text-gray-400">Updates</h2>
          
          {/* Updates List */}
          <div className="bg-white dark:bg-[#1c1c20] border border-gray-100 dark:border-white/5 rounded-2xl p-4 mb-6 flex items-center justify-between cursor-pointer hover:border-gray-200 dark:hover:border-white/10 transition-colors">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">GIG</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] font-bold bg-yellow-400/20 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded uppercase">IN-TRANSIT</span>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">Google pixel 9pro</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CTA 12mins • 1.2km away</p>
                </div>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>

          <h2 className="text-sm font-semibold mb-4 text-gray-500 dark:text-gray-400">Conversations</h2>

          {/* Conversations List */}
          <div className="space-y-2">
            <div onClick={() => setActiveChat("1")} className="flex items-center justify-between p-3 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 -mx-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-shrink-0 relative">
                   <img src="https://i.pravatar.cc/100?img=11" alt="avatar" className="w-full h-full object-cover" />
                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#161618] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Divine Augustina</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-48">Arriving in 4 minutes</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-xs text-gray-400">Just Now</span>
                 <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              </div>
            </div>

            <div onClick={() => setActiveChat("2")} className="flex items-center justify-between p-3 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 -mx-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                   <img src="https://i.pravatar.cc/100?img=12" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Hamzy Rider</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-48">Madam am at your gate</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-xs text-gray-400">4 mins ago</span>
              </div>
            </div>
            
            <div onClick={() => setActiveChat("3")} className="flex items-center justify-between p-3 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 -mx-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                   <img src="https://i.pravatar.cc/100?img=13" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Muhammad abdul Kareem</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-48">Item delivered successfully ✅</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-xs text-gray-400">12:30 PM</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
