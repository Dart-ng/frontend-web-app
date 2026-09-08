import { useState } from "react";
import { Bell, ScanLine, Send, Download, ArrowRight, ChevronRight, Package, Clock } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ReceivePackageModal from "../components/ReceivePackageModal";
import SendPackageModal from "../components/SendPackageModal";
import SendPackageFlow from "../components/SendPackageFlow";
import DeliveryDetails, { DeliveryDetailsItem } from "./DeliveryDetails";

interface DeliveryItem {
  id: string;
  title: string;
  store: string;
  date: string;
  status: "Delivered" | "Cancelled";
  trackingId: string;
  type: "my" | "linked";
}

const DELIVERIES_DATA: DeliveryItem[] = [
  {
    id: "1",
    title: "Nike Air Max shoe",
    store: "AliExpress",
    date: "Today 12:00 PM",
    status: "Delivered",
    trackingId: "DART-92841",
    type: "my",
  },
  {
    id: "2",
    title: "iPhone 17 Pro Max",
    store: "Slot Mall",
    date: "Yesterday 4:15 PM",
    status: "Delivered",
    trackingId: "DART-84729",
    type: "my",
  },
  {
    id: "3",
    title: "Make up kits",
    store: "AliExpress",
    date: "Today 12:00 PM",
    status: "Cancelled",
    trackingId: "DART-51203",
    type: "my",
  },
  {
    id: "4",
    title: "Sony WH-1000XM5 Headphones",
    store: "Sony Center",
    date: "Aug 28th 3:15 PM",
    status: "Delivered",
    trackingId: "DART-33918",
    type: "my",
  },
  {
    id: "5",
    title: "MacBook Air M3 Sleeve",
    store: "TechWorld",
    date: "Sep 4th 2:30 PM",
    status: "Delivered",
    trackingId: "DART-63910",
    type: "linked",
  },
  {
    id: "6",
    title: "AirPods Pro (2nd Gen)",
    store: "Apple Store",
    date: "Sep 1st 10:00 AM",
    status: "Delivered",
    trackingId: "DART-77412",
    type: "linked",
  },
  {
    id: "7",
    title: "Logitech MX Master 3S Mouse",
    store: "Slot Mall",
    date: "Aug 22nd 11:45 AM",
    status: "Delivered",
    trackingId: "DART-48291",
    type: "linked",
  },
  {
    id: "8",
    title: "Dell UltraSharp 27\" 4K Monitor",
    store: "TechWorld",
    date: "Aug 14th 4:30 PM",
    status: "Delivered",
    trackingId: "DART-19042",
    type: "linked",
  },
];

export default function Home({ 
  onOpenNotifications,
  onNavigateToPackages
}: { 
  onOpenNotifications?: () => void;
  onNavigateToPackages?: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [deliveryTab, setDeliveryTab] = useState<"my" | "linked">("my");
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryDetailsItem | null>(null);
  const [isSendingPackage, setIsSendingPackage] = useState(false);
  const [sendPackagePhoto, setSendPackagePhoto] = useState<{
    file?: File;
    previewUrl: string;
  } | null>(null);

  if (selectedDelivery) {
    return (
      <DeliveryDetails
        delivery={selectedDelivery}
        onBack={() => setSelectedDelivery(null)}
        onOpenNotifications={onOpenNotifications}
      />
    );
  }

  if (isSendingPackage) {
    return (
      <SendPackageFlow
        initialImage={sendPackagePhoto}
        onBack={() => setIsSendingPackage(false)}
        onComplete={() => {
          setIsSendingPackage(false);
        }}
        onOpenNotifications={onOpenNotifications}
      />
    );
  }

  const filteredDeliveries = DELIVERIES_DATA.filter((d) => d.type === deliveryTab);
  return (
    <div className="w-full flex-1 flex flex-col min-h-full bg-transparent relative pb-24 md:pb-16 transition-colors">
        
        {/* Header Area: Matches Wallet header color & gradient exactly */}
        <div 
          className="text-white dark:text-black px-5 sm:px-10 pt-[max(2rem,calc(env(safe-area-inset-top,0px)+1rem))] pb-7 sm:pb-8 rounded-b-[36px] sm:rounded-b-[40px] relative overflow-hidden shrink-0 transition-all shadow-sm"
          style={{
            background: resolvedTheme === 'dark'
              ? 'linear-gradient(to bottom, #FFA600 0%, #FFCC00 100%)'
              : '#1a1a1a'
          }}
        >
          {/* Sunburst Ray Pattern & Glow: Soft wide fanned-out pattern visible, tiny converging base faded out */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.08) 18%, rgba(0, 0, 0, 0.5) 45%, rgba(0, 0, 0, 0.85) 75%, rgba(0, 0, 0, 0.85) 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.08) 18%, rgba(0, 0, 0, 0.5) 45%, rgba(0, 0, 0, 0.85) 75%, rgba(0, 0, 0, 0.85) 100%)',
              background: resolvedTheme === 'dark'
                ? `
                  radial-gradient(ellipse at 50% 100%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.035) 45%, transparent 75%),
                  repeating-conic-gradient(
                    from -5deg at 50% 105%,
                    rgba(0, 0, 0, 0.035) 0deg,
                    rgba(0, 0, 0, 0.035) 10deg,
                    transparent 10deg,
                    transparent 20deg
                  )
                `
                : `
                  radial-gradient(ellipse at 50% 100%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 40%, transparent 75%),
                  repeating-conic-gradient(
                    from -5deg at 50% 105%,
                    rgba(255, 255, 255, 0.028) 0deg,
                    rgba(255, 255, 255, 0.028) 10deg,
                    transparent 10deg,
                    transparent 20deg
                  )
                `
            }}
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-xl sm:text-2xl font-medium mb-1 text-white dark:text-black">Good morning Hudeen 👋🏾</h1>
                <p className="text-sm text-gray-400 dark:text-black/75">Auchi, Edo state</p>
              </div>
              <button 
                onClick={onOpenNotifications} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 dark:bg-black/10 hover:bg-yellow-500 dark:hover:bg-black/20 transition-colors shrink-0"
              >
                <Bell className="w-5 h-5 text-black" />
              </button>
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-8 text-white dark:text-black">
              What would you like to do Today?
            </h2>

            {/* Track Package Input */}
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Track Package" 
                className="w-full h-14 bg-white/10 dark:bg-[#141416] text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 rounded-full pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-black border border-white/5 dark:border-black/20 dark:shadow-sm transition-all font-medium"
              />
              <button className="absolute right-3 w-10 h-10 flex items-center justify-center text-yellow-400 dark:text-yellow-400 hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors cursor-pointer">
                <ScanLine className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 px-6 sm:px-10 py-8 sm:py-9 flex flex-col gap-8 sm:gap-9">
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <button 
              onClick={() => setIsSendModalOpen(true)}
              className="bg-white dark:bg-[#1c1c20] hover:bg-yellow-50/80 dark:hover:bg-yellow-400/10 border border-gray-100 dark:border-white/5 hover:border-yellow-300/80 dark:hover:border-yellow-400/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group shadow-xs cursor-pointer touch-manipulation"
            >
              <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center border border-gray-100 dark:border-white/10 group-hover:bg-[#FFCC00] dark:group-hover:bg-[#FFCC00] group-hover:border-yellow-400/80 group-hover:scale-105 transition-all duration-200 shrink-0 shadow-2xs">
                <Send className="w-5 h-5 text-gray-800 dark:text-gray-200 group-hover:text-gray-950 transition-colors" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base text-center sm:text-left leading-tight">Send<br/>Package</span>
            </button>
            
            <button 
              onClick={() => setIsReceiveModalOpen(true)}
              className="bg-white dark:bg-[#1c1c20] hover:bg-yellow-50/80 dark:hover:bg-yellow-400/10 border border-gray-100 dark:border-white/5 hover:border-yellow-300/80 dark:hover:border-yellow-400/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group shadow-xs cursor-pointer touch-manipulation"
            >
              <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center border border-gray-100 dark:border-white/10 group-hover:bg-[#FFCC00] dark:group-hover:bg-[#FFCC00] group-hover:border-yellow-400/80 group-hover:scale-105 transition-all duration-200 shrink-0 shadow-2xs">
                <Download className="w-5 h-5 text-gray-800 dark:text-gray-200 group-hover:text-gray-950 transition-colors" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base text-center sm:text-left leading-tight">Receive<br/>Package</span>
            </button>
          </div>

          {/* Current Delivery */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current delivery</h3>
              <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600">See All</button>
            </div>

            <div 
              onClick={() => {
                setSelectedDelivery({
                  id: "active-1",
                  title: "Google pixel 9pro",
                  trackingCode: "#42324-HUD-PKG99P",
                  status: "In-Transit",
                  fromLocation: "GIG TERMINAL",
                  toLocation: "Auchi, Edo State",
                  date: "Today",
                  time: "1:30 PM",
                  weight: "Light (450g)",
                  category: "Electronics",
                  fragileNote: "Note: this Item was labelled as sensitive and fragile",
                  rider: {
                    name: "Divine Augustina",
                    idCode: "#42324-FHJS44R-34R",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                    rating: 4.8,
                    reviewCount: 32,
                    price: "₦5,000"
                  }
                });
              }}
              className="bg-yellow-400 rounded-3xl p-6 sm:p-7 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <span className="inline-block bg-[#e53935] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                    In-Transit
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Google pixel 9pro</h4>
                  <p className="text-sm font-medium text-gray-800/80">Delivering today: 1:30 PM</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                  <ArrowRight className="w-5 h-5 text-gray-900" />
                </div>
              </div>

              {/* Progress Bar Area */}
              <div className="mt-8 relative">
                {/* Track Line */}
                <div className="h-1.5 w-full bg-black/10 rounded-full flex overflow-visible items-center relative">
                  {/* Filled Track */}
                  <div className="h-full bg-gray-900 rounded-full w-[60%] relative">
                    {/* Time Bubble indicator */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-yellow-100 border-2 border-gray-900 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap z-10">
                      30 min
                    </div>
                  </div>
                </div>

                {/* Locations */}
                <div className="flex items-center justify-between mt-3 text-xs font-semibold text-gray-800">
                  <span>GIG Terminal</span>
                  <span>Me</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Deliveries (Directly below Current delivery) */}
          <section className="space-y-3.5 sm:space-y-4">
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Recent deliveries</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Past shipments & linked packages</p>
              </div>

              {/* Mobile-Optimized Tab Buttons */}
              <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-full flex w-full sm:w-fit border border-gray-200/60 dark:border-white/5">
                <button 
                  onClick={() => setDeliveryTab("my")}
                  className={`flex-1 sm:flex-initial text-xs sm:text-sm py-2 px-4 rounded-full font-medium transition-all text-center cursor-pointer touch-manipulation ${
                    deliveryTab === "my"
                      ? "bg-yellow-400 text-black font-bold shadow-xs"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  My Packages
                </button>
                <button 
                  onClick={() => setDeliveryTab("linked")}
                  className={`flex-1 sm:flex-initial text-xs sm:text-sm py-2 px-4 rounded-full font-medium transition-all text-center cursor-pointer touch-manipulation ${
                    deliveryTab === "linked"
                      ? "bg-yellow-400 text-black font-bold shadow-xs"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Linked Packages
                </button>
              </div>
            </div>

            {/* Deliveries List - Max 4 */}
            <div className="space-y-2.5 sm:space-y-3">
              {filteredDeliveries.slice(0, 4).map((item) => (
                <div 
                  key={item.id}
                  onClick={() => {
                    setSelectedDelivery({
                      id: item.id,
                      title: item.title,
                      trackingCode: item.id === "1" ? "#42324-HUD-PKG34R" : `#42324-HUD-${item.trackingId.replace('DART-', '')}`,
                      status: item.status,
                      fromLocation: item.store === "AliExpress" ? "GIG TERMINAL" : item.store.toUpperCase(),
                      toLocation: "Auchi, Edo State",
                      date: item.date.includes("Today") ? "Today" : item.date.includes("Yesterday") ? "Yesterday" : item.date.split(" ")[0],
                      time: item.date.includes("PM") || item.date.includes("AM") ? item.date.split(" ").slice(-2).join(" ") : "12:47 PM",
                      weight: "Medium",
                      category: item.title.toLowerCase().includes("shoe") ? "Clothes" : item.title.toLowerCase().includes("phone") || item.title.toLowerCase().includes("airpods") || item.title.toLowerCase().includes("macbook") ? "Electronics" : "Accessories",
                      fragileNote: "Note: this Item was labelled as sensitive and fragile",
                      rider: {
                        name: "Divine Augustina",
                        idCode: "#42324-FHJS44R-34R",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                        rating: 4.8,
                        reviewCount: 32,
                        price: "₦5,000"
                      }
                    });
                  }}
                  className="flex items-center justify-between p-3.5 sm:p-4.5 bg-white dark:bg-[#1c1c20] hover:bg-yellow-50/80 dark:hover:bg-yellow-400/10 border border-gray-100 dark:border-white/5 hover:border-yellow-300/80 dark:hover:border-yellow-400/30 rounded-2xl cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group touch-manipulation"
                >
                  <div className="min-w-0 pr-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1.5 inline-block ${
                      item.status === "Delivered"
                        ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-400/10"
                        : "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-400/10"
                    }`}>
                      {item.status}
                    </span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                      From {item.store} • {item.date}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-800 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>

            {/* View All Navlink at Bottom */}
            <div className="pt-1 text-center">
              <button 
                onClick={onNavigateToPackages}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl sm:rounded-full bg-white dark:bg-[#1c1c20] hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200/80 dark:border-white/10 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 shadow-2xs transition-all group cursor-pointer touch-manipulation"
              >
                <span>View all {deliveryTab === "my" ? "my" : "linked"} packages</span>
                <ArrowRight className="w-4 h-4 text-yellow-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

        </div>

      {/* Modals */}
      <ReceivePackageModal 
        isOpen={isReceiveModalOpen} 
        onClose={() => setIsReceiveModalOpen(false)} 
      />
      <SendPackageModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onPhotoConfirmed={(photo) => {
          setSendPackagePhoto(photo);
          setIsSendModalOpen(false);
          setIsSendingPackage(true);
        }}
      />
    </div>
  );
}
