import React, { useState, useEffect } from "react";
import { Plus, Search, ChevronRight, Trash2, Package, Send } from "lucide-react";
import DeliveryDetails, { DeliveryDetailsItem } from "./DeliveryDetails";
import SendPackageModal from "../components/SendPackageModal";
import SendPackageFlow from "../components/SendPackageFlow";
import LinkInboundFlow, { InboundPackageItem } from "../components/LinkInboundFlow";
import ActiveDeliveryCard from "../components/ActiveDeliveryCard";
import PendingDeliveries from "./PendingDeliveries";

type Tab = "All" | "Pending" | "Completed" | "Cancelled";

export default function Packages({ 
  onOpenNotifications,
  onProcedureChange,
}: { 
  onOpenNotifications?: () => void;
  onProcedureChange?: (inProcedure: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [deliveryFilter, setDeliveryFilter] = useState<"direct" | "inbound">("direct");
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryDetailsItem | null>(null);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isLinkingInbound, setIsLinkingInbound] = useState(false);
  const [isRequestingPickup, setIsRequestingPickup] = useState(false);
  const [isSendingPackage, setIsSendingPackage] = useState(false);
  const [isViewingPackageStatus, setIsViewingPackageStatus] = useState(false);
  const [showPendingView, setShowPendingView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sendPackagePhoto, setSendPackagePhoto] = useState<{
    file?: File;
    previewUrl: string;
  } | null>(null);

  const [directDeliveries, setDirectDeliveries] = useState<DeliveryDetailsItem[]>([
    {
      id: "1",
      title: "Nike Air Max shoe",
      trackingCode: "#42324-HUD-PKG34R",
      status: "Delivered",
      fromLocation: "GIG TERMINAL",
      toLocation: "Auchi, Edo State",
      date: "Today",
      time: "12:00 PM",
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
    },
    {
      id: "2",
      title: "Iphone 17 PM",
      trackingCode: "#42324-HUD-PKG17P",
      status: "Delivered",
      fromLocation: "SLOT MALL",
      toLocation: "Auchi, Edo State",
      date: "Today",
      time: "12:00 PM",
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
    },
    {
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
    }
  ]);

  const [inboundDeliveries, setInboundDeliveries] = useState<DeliveryDetailsItem[]>([
    {
      id: "inbound-speedaf-live",
      title: "SpeedAF Inbound Package",
      trackingCode: "NG021358672334",
      status: "In-Transit",
      fromLocation: "Nigeria Clearance Hub",
      toLocation: "Distribution DC-BNI CENTRAL",
      date: "Sep 13th",
      time: "8:49 AM",
      weight: "Standard",
      category: "PARCEL",
      isInbound: true,
      courier: "SpeedAF Express",
      shippedDate: "Sep 12th 2026 • 5:04 AM",
      estimatedArrival: "Sep 13th 2026 • 8:49 AM",
      fragileNote: "Live package fetched from tracking API",
    },
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
    }
  ]);

  useEffect(() => {
    const inProcedure = 
      isSendingPackage || 
      isRequestingPickup || 
      isLinkingInbound || 
      isViewingPackageStatus || 
      selectedDelivery !== null;
    onProcedureChange?.(inProcedure);
    return () => {
      onProcedureChange?.(false);
    };
  }, [isSendingPackage, isRequestingPickup, isLinkingInbound, isViewingPackageStatus, selectedDelivery, onProcedureChange]);

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (deliveryFilter === "direct") {
      setDirectDeliveries((prev) => prev.filter((item) => item.id !== id));
    } else {
      setInboundDeliveries((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // If user selected "Pending" or tapped "See All" on Active delivery
  if (showPendingView || activeTab === "Pending") {
    return (
      <PendingDeliveries
        onBack={() => {
          setShowPendingView(false);
          if (activeTab === "Pending") setActiveTab("All");
        }}
        onOpenNotifications={onOpenNotifications}
        onProcedureChange={onProcedureChange}
      />
    );
  }

  if (isViewingPackageStatus) {
    return (
      <SendPackageFlow
        mode="send"
        initialScreen="package_status"
        initialIsRiderAccepted={true}
        onBack={() => setIsViewingPackageStatus(false)}
        onComplete={() => setIsViewingPackageStatus(false)}
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
            store: pkg.store || pkg.courier,
            trackingCode: pkg.trackingId,
            status: pkg.status,
            fromLocation: pkg.fromLocation,
            toLocation: pkg.toLocation,
            date: "Today",
            time: "Just now",
            weight: "Medium",
            category: pkg.category,
            fragileNote: pkg.store ? `Ordered from ${pkg.store} via ${pkg.courier}` : `Inbound package from ${pkg.courier}`,
            isInbound: true,
            courier: pkg.courier,
            shippedDate: pkg.shippedDate,
            estimatedArrival: pkg.estimatedArrival,
            tracks: pkg.tracks,
            payUrl: pkg.payUrl,
          };
          setInboundDeliveries((prev) => [newLinkedItem, ...prev]);
          setDeliveryFilter("inbound");
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
        onComplete={() => setIsSendingPackage(false)}
        onOpenNotifications={onOpenNotifications}
      />
    );
  }

  if (isRequestingPickup) {
    return (
      <SendPackageFlow
        mode="pickup"
        onBack={() => setIsRequestingPickup(false)}
        onComplete={() => setIsRequestingPickup(false)}
        onOpenNotifications={onOpenNotifications}
      />
    );
  }

  // Filter deliveries based on active direct/inbound and activeTab
  const currentList = deliveryFilter === "direct" ? directDeliveries : inboundDeliveries;
  const filteredList = currentList.filter((item) => {
    if (activeTab === "Completed") return item.status === "Delivered";
    if (activeTab === "Cancelled") return item.status === "Cancelled";
    if (searchQuery.trim()) {
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.trackingCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="w-full flex-1 flex flex-col min-h-full bg-transparent relative pb-24 md:pb-12 transition-colors">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-100 dark:border-white/5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Deliveries
        </h1>
        
        <div className="flex items-center">
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

                {/* Dropdown Action Menu */}
                <div className="absolute right-0 top-full mt-2 w-60 sm:w-64 bg-white dark:bg-[#1a1a1e] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-white/10 z-50 overflow-hidden divide-y divide-gray-100 dark:divide-white/5 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => {
                      setIsActionMenuOpen(false);
                      setIsLinkingInbound(true);
                    }}
                    className="w-full flex items-center gap-3.5 px-4.5 py-3.5 sm:py-4 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <Package className="w-5 h-5 text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors shrink-0 stroke-[1.8]" />
                    <span className="text-[15px] font-normal sm:font-medium text-gray-800 dark:text-gray-100 tracking-tight">
                      Link Inbound package
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsActionMenuOpen(false);
                      setIsRequestingPickup(true);
                    }}
                    className="w-full flex items-center gap-3.5 px-4.5 py-3.5 sm:py-4 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5 stroke-[1.8] text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 shrink-0"
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
                    <span className="text-[15px] font-normal sm:font-medium text-gray-800 dark:text-gray-100 tracking-tight">
                      Request pickup
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsActionMenuOpen(false);
                      setIsSendModalOpen(true);
                    }}
                    className="w-full flex items-center gap-3.5 px-4.5 py-3.5 sm:py-4 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <Send className="w-5 h-5 text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors shrink-0 stroke-[1.8]" />
                    <span className="text-[15px] font-normal sm:font-medium text-gray-800 dark:text-gray-100 tracking-tight">
                      Send Package
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            onClick={() => {
              if (tab === "Pending") {
                setShowPendingView(true);
              } else {
                setActiveTab(tab);
              }
            }}
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
        {/* Active Delivery Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active delivery</h2>
          <button
            onClick={() => setShowPendingView(true)}
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 cursor-pointer"
          >
            See All
          </button>
        </div>

        <ActiveDeliveryCard
          onClick={() => setIsViewingPackageStatus(true)}
          title="Google pixel 9pro"
          eta="Delivering today: 1:30 PM"
          dropOffCode="4725"
          status="IN-TRANSIT"
          origin="GIG Terminal"
          destination="Me"
          duration="30mins"
        />

        {/* Direct Packages / Inbound Packages Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 mt-8 w-full">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">My deliveries</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Past shipments & linked packages</p>
          </div>

          <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-full flex w-full sm:w-fit border border-gray-200/60 dark:border-white/5">
            <button
              onClick={() => setDeliveryFilter("direct")}
              className={`flex-1 sm:flex-initial text-xs sm:text-sm py-2 px-4 rounded-full font-medium transition-all text-center cursor-pointer touch-manipulation ${
                deliveryFilter === "direct"
                  ? "bg-yellow-400 text-black font-bold shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Direct Packages
            </button>
            <button
              onClick={() => setDeliveryFilter("inbound")}
              className={`flex-1 sm:flex-initial text-xs sm:text-sm py-2 px-4 rounded-full font-medium transition-all text-center cursor-pointer touch-manipulation ${
                deliveryFilter === "inbound"
                  ? "bg-yellow-400 text-black font-bold shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Inbound Packages
            </button>
          </div>
        </div>

        {/* My Deliveries List */}
        <section className="space-y-3 mt-1">
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white tracking-tight">
            My deliveries
          </h2>

          <div className="space-y-3">
            {filteredList.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedDelivery(item)}
                className="bg-white dark:bg-[#1C1C20] rounded-2xl border border-gray-100 dark:border-white/5 p-4 sm:p-4.5 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group touch-manipulation"
              >
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1.5 ${
                    item.status === "Delivered"
                      ? "bg-[#D1F2D9] dark:bg-emerald-400/15 text-[#1E7E34] dark:text-emerald-400"
                      : item.status === "Cancelled"
                      ? "bg-red-50 dark:bg-red-400/10 text-red-500 dark:text-red-400"
                      : "bg-yellow-400/20 text-yellow-800 dark:text-yellow-400"
                  }`}>
                    {item.status || "DELIVERED"}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-gray-950 dark:text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-400 mt-0.5 font-medium truncate">
                    From {item.store || "AliExpress"} • {item.date} {item.time}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  
                  {/* Delete action button on item 0 (Nike Air Max shoe) matching Screenshot 2 */}
                  {index === 0 && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteItem(item.id, e)}
                      title="Delete package"
                      className="w-9 h-9 rounded-xl bg-[#E53935] hover:bg-red-600 text-white flex items-center justify-center shadow-xs active:scale-90 transition-all cursor-pointer touch-manipulation ml-1"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modals */}
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
