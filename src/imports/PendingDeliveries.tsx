import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  ChevronsRight, 
  ArrowLeft, 
  ArrowRight,
  Package, 
  Send
} from "lucide-react";
import ActiveDeliveryCard from "../components/ActiveDeliveryCard";
import DeliveryDetails, { DeliveryDetailsItem } from "./DeliveryDetails";
import SendPackageFlow from "../components/SendPackageFlow";
import SendPackageModal from "../components/SendPackageModal";
import LinkInboundFlow, { InboundPackageItem } from "../components/LinkInboundFlow";

interface PendingDeliveriesProps {
  onBack?: () => void;
  onOpenNotifications?: () => void;
  onProcedureChange?: (inProcedure: boolean) => void;
}

export default function PendingDeliveries({
  onBack,
  onOpenNotifications,
  onProcedureChange,
}: PendingDeliveriesProps) {
  const [packageType, setPackageType] = useState<"direct" | "inbound">("direct");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryDetailsItem | null>(null);
  const [isViewingPackageStatus, setIsViewingPackageStatus] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isRequestingPickup, setIsRequestingPickup] = useState(false);
  const [isLinkingInbound, setIsLinkingInbound] = useState(false);
  const [isSendingPackage, setIsSendingPackage] = useState(false);
  const [sendPackagePhoto, setSendPackagePhoto] = useState<{
    file?: File;
    previewUrl: string;
  } | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);

  // Notify parent layout if inside subflow
  React.useEffect(() => {
    const inProcedure = 
      isViewingPackageStatus || 
      selectedDelivery !== null || 
      isSendingPackage || 
      isRequestingPickup || 
      isLinkingInbound;
    onProcedureChange?.(inProcedure);
    return () => {
      onProcedureChange?.(false);
    };
  }, [
    isViewingPackageStatus, 
    selectedDelivery, 
    isSendingPackage, 
    isRequestingPickup, 
    isLinkingInbound, 
    onProcedureChange
  ]);

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
        onComplete={(_pkg: InboundPackageItem) => {
          setIsLinkingInbound(false);
          setPackageType("inbound");
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

  const handleResend = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResendingId(id);
    setTimeout(() => {
      setResendingId(null);
      alert("Delivery request resent to nearby riders!");
    }, 1000);
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-full bg-transparent relative pb-24 md:pb-12 transition-colors">
      {/* Header matching Screenshot 1 */}
      <div className="px-4 sm:px-6 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pending Deliveries
          </h1>
        </div>

        {/* Plus Button with Soft Yellow BG */}
        <div className="relative">
          <button
            onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black shadow-xs transition-colors cursor-pointer touch-manipulation font-bold text-xl"
            title="Add Package"
            aria-expanded={isActionMenuOpen}
          >
            <Plus className={`w-5 h-5 stroke-[2.2] transition-transform duration-200 ${isActionMenuOpen ? "rotate-45" : ""}`} />
          </button>

          {/* Action Menu Dropdown */}
          {isActionMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setIsActionMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-60 sm:w-64 bg-white dark:bg-[#1a1a1e] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-white/10 z-50 overflow-hidden divide-y divide-gray-100 dark:divide-white/5 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    setIsActionMenuOpen(false);
                    setIsLinkingInbound(true);
                  }}
                  className="w-full flex items-center gap-3.5 px-4.5 py-3.5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <Package className="w-5 h-5 text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 shrink-0 stroke-[1.8]" />
                  <span className="text-[15px] font-medium text-gray-800 dark:text-gray-100">
                    Link Inbound package
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsActionMenuOpen(false);
                    setIsRequestingPickup(true);
                  }}
                  className="w-full flex items-center gap-3.5 px-4.5 py-3.5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
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
                  <span className="text-[15px] font-medium text-gray-800 dark:text-gray-100">
                    Request pickup
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsActionMenuOpen(false);
                    setIsSendModalOpen(true);
                  }}
                  className="w-full flex items-center gap-3.5 px-4.5 py-3.5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <Send className="w-5 h-5 text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 shrink-0 stroke-[1.8]" />
                  <span className="text-[15px] font-medium text-gray-800 dark:text-gray-100">
                    Send Package
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 px-3.5 sm:px-6 pb-6 w-full flex flex-col gap-5 sm:gap-6">
        {/* Search Package Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 stroke-[2]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#18181b] text-gray-950 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-2xs transition-all font-medium"
            placeholder="Search package"
          />
        </div>

        {/* Direct Packages / Inbound Packages Toggle */}
        <div className="bg-gray-100/70 dark:bg-white/5 p-1 rounded-full flex w-full border border-gray-200/50 dark:border-white/5 select-none">
          <button
            onClick={() => setPackageType("direct")}
            className={`flex-1 py-2.5 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all text-center cursor-pointer touch-manipulation ${
              packageType === "direct"
                ? "bg-yellow-400 text-gray-950 font-bold shadow-xs"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Direct Packages
          </button>
          <button
            onClick={() => setPackageType("inbound")}
            className={`flex-1 py-2.5 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all text-center cursor-pointer touch-manipulation ${
              packageType === "inbound"
                ? "bg-yellow-400 text-gray-950 font-bold shadow-xs"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Inbound Packages
          </button>
        </div>

        {/* Active Delivery Section */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white tracking-tight">
            Active Delivery
          </h2>

          <ActiveDeliveryCard
            onClick={() => setIsViewingPackageStatus(true)}
            title="Google pixel 9pro"
            eta="Delivering: Today • ETA 1:30 PM"
            dropOffCode="4725"
            status="IN-TRANSIT"
            origin="GIG Terminal"
            destination="Me"
            duration="30mins"
          />
        </section>

        {/* Pending Requests Section */}
        <section className="space-y-3.5">
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white tracking-tight">
            Pending Requests
          </h2>

          <div className="space-y-3">
            {/* Card 1: Red Hound Hoodie */}
            <div
              onClick={() => {
                setSelectedDelivery({
                  id: "pending-1",
                  title: "Red Hound Hoodie",
                  trackingCode: "#42324-HUD-PKG99R",
                  status: "Pending",
                  fromLocation: "Water Board",
                  toLocation: "Iyakpi LAT,123,53232",
                  date: "Today",
                  time: "1:30 PM",
                  weight: "Medium",
                  category: "Clothes",
                  fragileNote: "Pickup requested, waiting for rider acceptance",
                });
              }}
              className="bg-white dark:bg-[#1C1C20] rounded-2xl border border-gray-100 dark:border-white/5 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all cursor-pointer touch-manipulation group"
            >
              {/* Badge row */}
              <div className="flex items-center justify-between">
                <span className="bg-[#FF6B00] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  PENDING REQUEST
                </span>

                <span className="bg-[#FF3B30] text-white text-xs font-bold px-2.5 py-0.5 rounded-md shadow-2xs">
                  40 sec
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-2.5">
                <h3 className="text-base sm:text-lg font-bold text-gray-950 dark:text-white">
                  Red Hound Hoodie
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-400 mt-0.5 font-medium">
                  Delivering: Today • ETA 1:30 PM
                </p>
              </div>

              {/* Route Container */}
              <div className="bg-gray-50/80 dark:bg-white/5 rounded-xl p-3 sm:p-3.5 mt-3 flex items-center justify-between border border-gray-100/70 dark:border-white/5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                    From
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mt-0.5 block">
                    Water Board
                  </span>
                </div>

                <ChevronsRight className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0 mx-2" />

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                    To
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mt-0.5 block">
                    Iyakpi LAT,123,53232
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Hair dryers */}
            <div
              onClick={() => {
                setSelectedDelivery({
                  id: "pending-2",
                  title: "Hair dryers",
                  trackingCode: "#42324-HUD-PKG88H",
                  status: "Pending",
                  fromLocation: "GIG Terminal",
                  toLocation: "Iyakpi LAT,123,53232",
                  date: "Today",
                  time: "1:30 PM",
                  weight: "Light (800g)",
                  category: "Electronics",
                  fragileNote: "No nearby rider accepted yet. You can resend request.",
                });
              }}
              className="bg-white dark:bg-[#1C1C20] rounded-2xl border border-gray-100 dark:border-white/5 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all cursor-pointer touch-manipulation group"
            >
              {/* Badge row */}
              <div className="flex items-center justify-between">
                <span className="bg-[#0088FF] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  NO RESPONSE
                </span>

                <button
                  type="button"
                  onClick={(e) => handleResend("pending-2", e)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs active:scale-95 transition-all cursor-pointer touch-manipulation"
                >
                  <span>{resendingId === "pending-2" ? "Sending..." : "Resend"}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-2.5">
                <h3 className="text-base sm:text-lg font-bold text-gray-950 dark:text-white">
                  Hair dryers
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-400 mt-0.5 font-medium">
                  Delivering: today • ETA 1:30 PM
                </p>
              </div>

              {/* Route Container */}
              <div className="bg-gray-50/80 dark:bg-white/5 rounded-xl p-3 sm:p-3.5 mt-3 flex items-center justify-between border border-gray-100/70 dark:border-white/5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                    From
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mt-0.5 block">
                    GIG Terminal
                  </span>
                </div>

                <ChevronsRight className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0 mx-2" />

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                    To
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mt-0.5 block">
                    Iyakpi LAT,123,53232
                  </span>
                </div>
              </div>
            </div>
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
