import { useState, useEffect } from "react";
import { Plus, Search, ChevronRight, Package, Send } from "lucide-react";
import DeliveryDetails, { DeliveryDetailsItem } from "./DeliveryDetails";
import SendPackageModal from "../components/SendPackageModal";
import SendPackageFlow from "../components/SendPackageFlow";
import LinkInboundFlow, { InboundPackageItem } from "../components/LinkInboundFlow";
import PackageStateIcon from "../components/PackageStateIcon";

type Tab = "All" | "Pending" | "Completed" | "Cancelled";

export default function Packages({ 
  onOpenNotifications,
  onProcedureChange,
}: { 
  onOpenNotifications?: () => void;
  onProcedureChange?: (inProcedure: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [deliveryFilter, setDeliveryFilter] = useState<"my" | "linked">("my");
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryDetailsItem | null>(null);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isLinkingInbound, setIsLinkingInbound] = useState(false);
  const [isRequestingPickup, setIsRequestingPickup] = useState(false);
  const [isSendingPackage, setIsSendingPackage] = useState(false);
  const [isViewingPackageStatus, setIsViewingPackageStatus] = useState(false);
  const [sendPackagePhoto, setSendPackagePhoto] = useState<{
    file?: File;
    previewUrl: string;
  } | null>(null);

  const [linkedDeliveries, setLinkedDeliveries] = useState<DeliveryDetailsItem[]>([
    {
      id: "inbound-1",
      title: "Black Hoodie XXL",
      trackingCode: "NGS213-2324-23243",
      status: "In-Transit",
      fromLocation: "China, Beijing",
      toLocation: "Akpakpava, Benin",
      date: "Jun 28th",
      time: "2026",
      weight: "Medium",
      category: "CLOTHES",
      isInbound: true,
      courier: "AliExpress",
      shippedDate: "Jun 28th 2026",
      estimatedArrival: "Jul 30th 2026",
      fragileNote: "Inbound package from AliExpress",
    },
    {
      id: "inbound-arrived",
      title: "Black Hoodie XXL",
      trackingCode: "NGS213-2324-23243",
      status: "Ready for pickup",
      fromLocation: "China, Beijing",
      toLocation: "GIG Terminal, Auchi, Edo state",
      date: "Jul 30th",
      time: "12:47 PM",
      weight: "Medium",
      category: "CLOTHES",
      isInbound: true,
      isArrived: true,
      arrivedDate: "Jul 30th 2026 • 12:47 PM",
      pickupTerminal: "GIG Terminal, Auchi, Edo state",
      courier: "AliExpress",
      fragileNote: "Ready for pickup at terminal",
    },
    {
      id: "5",
      title: "MacBook Air M3 Sleeve",
      trackingCode: "#42324-HUD-PKG63M",
      status: "Delivered",
      fromLocation: "TECHWORLD",
      toLocation: "Auchi, Edo State",
      date: "Sep 4th",
      time: "2:30 PM",
      weight: "Light",
      category: "Accessories",
      fragileNote: "Note: this Item was labelled as sensitive and fragile",
      rider: {
        name: "Divine Augustina",
        idCode: "#42324-FHJS44R-34R",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        rating: 4.8,
        reviewCount: 32,
        price: "₦5,000"
      }
    },
    {
      id: "6",
      title: "AirPods Pro (2nd Gen)",
      trackingCode: "#42324-HUD-PKG77A",
      status: "Delivered",
      fromLocation: "APPLE STORE",
      toLocation: "Auchi, Edo State",
      date: "Sep 1st",
      time: "10:00 AM",
      weight: "Light (200g)",
      category: "Audio",
      fragileNote: "Note: this Item was labelled as sensitive and fragile",
      rider: {
        name: "Divine Augustina",
        idCode: "#42324-FHJS44R-34R",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        rating: 4.8,
        reviewCount: 32,
        price: "₦5,000"
      }
    }
  ]);

  useEffect(() => {
    const inProcedure = isSendingPackage || isRequestingPickup || isLinkingInbound || isViewingPackageStatus || selectedDelivery !== null;
    onProcedureChange?.(inProcedure);
    return () => {
      onProcedureChange?.(false);
    };
  }, [isSendingPackage, isRequestingPickup, isLinkingInbound, isViewingPackageStatus, selectedDelivery, onProcedureChange]);

  if (isViewingPackageStatus) {
    return (
      <SendPackageFlow
        mode="send"
        initialScreen="package_status"
        initialIsRiderAccepted={true}
        onBack={() => setIsViewingPackageStatus(false)}
        onComplete={() => {
          setIsViewingPackageStatus(false);
        }}
        onOpenNotifications={onOpenNotifications}
      />
    );
  }

  if (selectedDelivery) {
    return (
      <DeliveryDetails
        delivery={selectedDelivery}
        onBack={() => setSelectedDelivery(null)}
        onOpenNotifications={onOpenNotifications}
        onBookRiderAgain={() => {
          setSelectedDelivery(null);
          setIsRequestingPickup(true);
        }}
      />
    );
  }

  if (isLinkingInbound) {
    return (
      <LinkInboundFlow
        onBack={() => setIsLinkingInbound(false)}
        onComplete={(pkg: InboundPackageItem) => {
          const newLinkedItem: DeliveryDetailsItem = {
            id: pkg.id || "inbound-" + Date.now(),
            title: pkg.title,
            trackingCode: pkg.trackingId,
            status: pkg.status,
            fromLocation: pkg.fromLocation,
            toLocation: pkg.toLocation,
            date: "Today",
            time: "Just now",
            weight: "Medium",
            category: pkg.category,
            fragileNote: `Inbound package from ${pkg.courier}`,
            isInbound: true,
            courier: pkg.courier,
            shippedDate: pkg.shippedDate,
            estimatedArrival: pkg.estimatedArrival,
            rider: {
              name: pkg.courier,
              idCode: pkg.trackingId,
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
              rating: 5.0,
              reviewCount: 14,
              price: "Free Link"
            }
          };
          setLinkedDeliveries((prev) => [newLinkedItem, ...prev]);
          setDeliveryFilter("linked");
          setIsLinkingInbound(false);
        }}
      />
    );
  }

  if (isSendingPackage) {
    return (
      <SendPackageFlow
        mode="send"
        initialImage={sendPackagePhoto}
        onBack={() => setIsSendingPackage(false)}
        onComplete={() => {
          setIsSendingPackage(false);
        }}
        onOpenNotifications={onOpenNotifications}
      />
    );
  }

  if (isRequestingPickup) {
    return (
      <SendPackageFlow
        mode="pickup"
        onBack={() => setIsRequestingPickup(false)}
        onComplete={() => {
          setIsRequestingPickup(false);
        }}
        onOpenNotifications={onOpenNotifications}
      />
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col min-h-full bg-transparent relative pb-24 md:pb-12 transition-colors">
        
        {/* Header */}
        <div className="px-4 sm:px-6 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-100 dark:border-white/5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Deliveries</h1>
          
          <div className="relative">
            <button 
              onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black shadow-xs transition-colors cursor-pointer touch-manipulation"
              title="Add or Send Package"
              aria-expanded={isActionMenuOpen}
            >
              <Plus className={`w-5 h-5 stroke-[2.2] transition-transform duration-200 ${isActionMenuOpen ? "rotate-45" : ""}`} />
            </button>

            {/* Backdrop for closing when clicking outside */}
            {isActionMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent" 
                  onClick={() => setIsActionMenuOpen(false)} 
                />

                {/* Dropdown Action Menu matching user screenshot */}
                <div className="absolute right-0 top-full mt-2 w-60 sm:w-64 bg-white dark:bg-[#1a1a1e] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-white/10 z-50 overflow-hidden divide-y divide-gray-100 dark:divide-white/5 animate-in fade-in zoom-in-95 duration-150">
                  {/* Option 1: Link Inbound package */}
                  <button
                    onClick={() => {
                      setIsActionMenuOpen(false);
                      setIsLinkingInbound(true);
                    }}
                    className="w-full flex items-center gap-3.5 px-4.5 py-3.5 sm:py-4 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <div className="text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors shrink-0">
                      <Package className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-[15px] font-normal sm:font-medium text-gray-800 dark:text-gray-100 tracking-tight">
                      Link Inbound package
                    </span>
                  </button>

                  {/* Option 2: Request pickup */}
                  <button
                    onClick={() => {
                      setIsActionMenuOpen(false);
                      setIsRequestingPickup(true);
                    }}
                    className="w-full flex items-center gap-3.5 px-4.5 py-3.5 sm:py-4 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <div className="text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors shrink-0">
                      <svg
                        className="w-5 h-5 stroke-[1.8]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 4v9" />
                        <path d="m8.5 9.5 3.5 3.5 3.5-3.5" />
                        <path d="M4 12v4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4" />
                      </svg>
                    </div>
                    <span className="text-[15px] font-normal sm:font-medium text-gray-800 dark:text-gray-100 tracking-tight">
                      Request pickup
                    </span>
                  </button>

                  {/* Option 3: Send Package */}
                  <button
                    onClick={() => {
                      setIsActionMenuOpen(false);
                      setIsSendModalOpen(true);
                    }}
                    className="w-full flex items-center gap-3.5 px-4.5 py-3.5 sm:py-4 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <div className="text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors shrink-0">
                      <Send className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-[15px] font-normal sm:font-medium text-gray-800 dark:text-gray-100 tracking-tight">
                      Send Package
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="px-3.5 sm:px-6 my-3 sm:my-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-100 dark:border-white/10 rounded-xl leading-5 bg-gray-50 dark:bg-[#202024] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              placeholder="Search package"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-3.5 sm:px-6 mb-4 sm:mb-5 flex gap-2 overflow-x-auto hide-scrollbar w-full">
          {(["All", "Pending", "Completed", "Cancelled"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer touch-manipulation ${
                activeTab === tab
                  ? "bg-yellow-400 text-black font-bold shadow-xs"
                  : "bg-gray-100/80 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200/50 dark:border-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 px-3.5 sm:px-6 pb-6 w-full">
          
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending delivery</h2>
          
          {/* Active Delivery Card */}
          <div 
            onClick={() => {
              setIsViewingPackageStatus(true);
            }}
            className="bg-yellow-400 rounded-2xl p-5 mb-8 shadow-sm cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden w-full"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <PackageStateIcon status="In-Transit" className="w-6 h-6 object-contain" />
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">IN-TRANSIT</span>
              </div>
              <ChevronRight className="w-5 h-5 opacity-50 shrink-0" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Google pixel 9pro</h3>
            <p className="text-sm opacity-80 mb-4 text-gray-800">Delivering today: 1:30 PM</p>
            
            {/* Progress Bar */}
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="w-full bg-yellow-500/30 rounded-full h-1.5 dark:bg-yellow-700/30">
                  <div className="bg-black h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="flex justify-between text-xs font-medium opacity-70 text-gray-900">
                <span>GIG Terminal</span>
                <span>Me</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 w-full">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">My deliveries</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Past shipments & linked packages</p>
            </div>

            {/* Mobile-Optimized Tab Buttons (identical to Home page) */}
            <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-full flex w-full sm:w-fit border border-gray-200/60 dark:border-white/5">
              <button 
                onClick={() => setDeliveryFilter("my")}
                className={`flex-1 sm:flex-initial text-xs sm:text-sm py-2 px-4 rounded-full font-medium transition-all text-center cursor-pointer touch-manipulation ${
                  deliveryFilter === "my"
                    ? "bg-yellow-400 text-black font-bold shadow-xs"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                My Packages
              </button>
              <button 
                onClick={() => setDeliveryFilter("linked")}
                className={`flex-1 sm:flex-initial text-xs sm:text-sm py-2 px-4 rounded-full font-medium transition-all text-center cursor-pointer touch-manipulation ${
                  deliveryFilter === "linked"
                    ? "bg-yellow-400 text-black font-bold shadow-xs"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Linked Packages
              </button>
            </div>
          </div>

          {/* Past Deliveries List */}
          <div className="space-y-4 w-full">
            {deliveryFilter === "my" ? (
              <>
                {/* Item 1 - Nike Air Max shoe */}
                <div 
                  onClick={() => {
                    setSelectedDelivery({
                      id: "1",
                      title: "Nike Air Max shoe",
                      trackingCode: "#42324-HUD-PKG34R",
                      status: "Delivered",
                      fromLocation: "GIG TERMINAL",
                      toLocation: "Auchi, Edo State",
                      date: "Yesterday",
                      time: "12:47 PM",
                      weight: "Medium",
                      category: "Clothes",
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
                  className="flex items-center justify-between p-3.5 sm:p-4 bg-white dark:bg-[#1c1c20] hover:bg-yellow-50/80 dark:hover:bg-yellow-400/10 border border-gray-100 dark:border-white/5 hover:border-yellow-300/80 dark:hover:border-yellow-400/30 rounded-2xl cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 gap-3 sm:gap-3.5 w-full group touch-manipulation"
                >
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shrink-0 flex items-center justify-center p-1.5">
                    <PackageStateIcon status="Delivered" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-400/10 px-2 py-0.5 rounded uppercase tracking-wider mb-1.5 inline-block">DELIVERED</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">Nike Air Max shoe</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">From AliExpress • Today 12:00 PM</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-800 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* Item 2 */}
                <div 
                  onClick={() => {
                    setSelectedDelivery({
                      id: "2",
                      title: "Iphone 17 PM",
                      trackingCode: "#42324-HUD-PKG17P",
                      status: "Delivered",
                      fromLocation: "SLOT MALL",
                      toLocation: "Auchi, Edo State",
                      date: "Yesterday",
                      time: "4:15 PM",
                      weight: "Light (500g)",
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
                  className="flex items-center justify-between p-3.5 sm:p-4 bg-white dark:bg-[#1c1c20] hover:bg-yellow-50/80 dark:hover:bg-yellow-400/10 border border-gray-100 dark:border-white/5 hover:border-yellow-300/80 dark:hover:border-yellow-400/30 rounded-2xl cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 gap-3 sm:gap-3.5 w-full group touch-manipulation"
                >
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shrink-0 flex items-center justify-center p-1.5">
                    <PackageStateIcon status="Delivered" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-400/10 px-2 py-0.5 rounded uppercase tracking-wider mb-1.5 inline-block">DELIVERED</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">Iphone 17 PM</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">From Slot Mall • Yesterday 4:15 PM</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-800 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                
                {/* Item 3 */}
                <div 
                  onClick={() => {
                    setSelectedDelivery({
                      id: "3",
                      title: "Make up kits",
                      trackingCode: "#42324-HUD-PKG51K",
                      status: "Cancelled",
                      fromLocation: "ALIEXPRESS HUB",
                      toLocation: "Auchi, Edo State",
                      date: "Aug 18th",
                      time: "11:15 AM",
                      weight: "Light",
                      category: "Cosmetics",
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
                  className="flex items-center justify-between p-3.5 sm:p-4 bg-white dark:bg-[#1c1c20] hover:bg-yellow-50/80 dark:hover:bg-yellow-400/10 border border-gray-100 dark:border-white/5 hover:border-yellow-300/80 dark:hover:border-yellow-400/30 rounded-2xl cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 gap-3 sm:gap-3.5 w-full group touch-manipulation"
                >
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shrink-0 flex items-center justify-center p-1.5">
                    <PackageStateIcon status="Cancelled" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-400/10 px-2 py-0.5 rounded uppercase tracking-wider mb-1.5 inline-block">CANCELLED</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">Make up kits</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">From AliExpress • Aug 18th 11:15 AM</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-800 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </>
            ) : (
              <>
                {linkedDeliveries.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedDelivery(item)}
                    className="flex items-center justify-between p-3.5 sm:p-4 bg-white dark:bg-[#1c1c20] hover:bg-yellow-50/80 dark:hover:bg-yellow-400/10 border border-gray-100 dark:border-white/5 hover:border-yellow-300/80 dark:hover:border-yellow-400/30 rounded-2xl cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 gap-3 sm:gap-3.5 w-full group touch-manipulation"
                  >
                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shrink-0 flex items-center justify-center p-1.5">
                      <PackageStateIcon status={item.status} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1.5 inline-block ${
                        item.status === "Delivered" 
                          ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-400/10" 
                          : item.status === "In-Transit" || item.status === "Ready for pickup"
                          ? "text-yellow-700 dark:text-yellow-400 bg-yellow-400/20" 
                          : "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-400/10"
                      }`}>
                        {item.status || "DELIVERED"}
                      </span>
                      <h4 className="font-semibold text-gray-900 dark:text-white truncate">{item.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                        {item.trackingCode} • {item.date} {item.time}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-800 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

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
