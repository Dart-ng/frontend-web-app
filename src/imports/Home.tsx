import React, { useState, useEffect } from "react";
import { 
  ScanLine, 
  Search, 
  Send, 
  Download, 
  ChevronRight 
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ReceivePackageModal from "../components/ReceivePackageModal";
import SendPackageModal from "./../components/SendPackageModal";
import SendPackageFlow from "../components/SendPackageFlow";
import DeliveryDetails, { DeliveryDetailsItem } from "./DeliveryDetails";
import LinkInboundFlow, { InboundPackageItem } from "../components/LinkInboundFlow";
import ActiveDeliveryCard from "../components/ActiveDeliveryCard";
import PendingDeliveries from "./PendingDeliveries";
import NotificationButton from "../components/NotificationButton";

interface DeliveryItem {
  id: string;
  title: string;
  store: string;
  date: string;
  status: "Delivered" | "Cancelled" | "In-Transit" | "Ready for pickup";
  trackingId: string;
  type: "direct" | "inbound";
  isInbound?: boolean;
  courier?: string;
  shippedDate?: string;
  estimatedArrival?: string;
  category?: string;
  fromLocation?: string;
  toLocation?: string;
  isArrived?: boolean;
  arrivedDate?: string;
  pickupTerminal?: string;
  tracks?: any[];
  payUrl?: string;
}

const DELIVERIES_DATA: DeliveryItem[] = [
  {
    id: "1",
    title: "Nike Air Max shoe",
    store: "AliExpress",
    date: "Today 12:00 PM",
    status: "Delivered",
    trackingId: "DART-92841",
    type: "direct",
  },
  {
    id: "2",
    title: "iPhone 17 Pro Max",
    store: "Slot Mall",
    date: "Today 12:00 PM",
    status: "Delivered",
    trackingId: "DART-84729",
    type: "direct",
  },
  {
    id: "3",
    title: "Make up kits",
    store: "AliExpress",
    date: "Aug 18th 11:15 AM",
    status: "Cancelled",
    trackingId: "DART-51203",
    type: "direct",
  },
  {
    id: "inbound-home-speedaf",
    title: "SpeedAF Inbound Package",
    store: "SpeedAF Express",
    date: "Sep 13th 8:49 AM",
    status: "In-Transit",
    trackingId: "NG021358672334",
    type: "inbound",
    isInbound: true,
    courier: "SpeedAF Express",
    shippedDate: "Sep 12th 2026 • 5:04 AM",
    estimatedArrival: "Sep 13th 2026 • 8:49 AM",
    category: "PARCEL",
    fromLocation: "Nigeria Clearance Hub",
    toLocation: "Distribution DC-BNI CENTRAL",
  },
  {
    id: "inbound-home-1",
    title: "Black Hoodie XXL",
    store: "AliExpress",
    date: "Jun 28th 2026",
    status: "In-Transit",
    trackingId: "NGS213-2324-23243",
    type: "inbound",
    isInbound: true,
    courier: "AliExpress",
    shippedDate: "Jun 28th 2026",
    estimatedArrival: "Jul 30th 2026",
    category: "CLOTHES",
    fromLocation: "China, Beijing",
    toLocation: "Akpakpava, Benin",
  }
];

export default function Home({ 
  onOpenNotifications,
  onNavigateToPackages,
  onProcedureChange,
}: { 
  onOpenNotifications?: () => void;
  onNavigateToPackages?: () => void;
  onProcedureChange?: (inProcedure: boolean) => void;
  onNavigateToAccount?: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [isLinkingInbound, setIsLinkingInbound] = useState(false);
  const [linkingTrackingId, setLinkingTrackingId] = useState<string | undefined>();
  const [searchTrackingId, setSearchTrackingId] = useState("");
  const [deliveryTab, setDeliveryTab] = useState<"direct" | "inbound">("direct");
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>(DELIVERIES_DATA);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryDetailsItem | null>(null);
  const [isSendingPackage, setIsSendingPackage] = useState(false);
  const [isRequestingPickup, setIsRequestingPickup] = useState(false);
  const [isViewingPackageStatus, setIsViewingPackageStatus] = useState(false);
  const [isViewingPendingDeliveries, setIsViewingPendingDeliveries] = useState(false);
  const [sendPackagePhoto, setSendPackagePhoto] = useState<{
    file?: File;
    previewUrl: string;
  } | null>(null);

  useEffect(() => {
    const inProcedure = 
      isSendingPackage || 
      isRequestingPickup || 
      isLinkingInbound || 
      isViewingPackageStatus || 
      isViewingPendingDeliveries ||
      selectedDelivery !== null;
    onProcedureChange?.(inProcedure);
    return () => {
      onProcedureChange?.(false);
    };
  }, [
    isSendingPackage, 
    isRequestingPickup, 
    isLinkingInbound, 
    isViewingPackageStatus, 
    isViewingPendingDeliveries,
    selectedDelivery, 
    onProcedureChange
  ]);

  if (isViewingPendingDeliveries) {
    return (
      <PendingDeliveries
        onBack={() => setIsViewingPendingDeliveries(false)}
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
        initialTrackingId={linkingTrackingId}
        onBack={() => {
          setIsLinkingInbound(false);
          setLinkingTrackingId(undefined);
        }}
        onComplete={(pkg: InboundPackageItem) => {
          const newInbound: DeliveryItem = {
            id: pkg.id || "inbound-" + Date.now(),
            title: pkg.title,
            store: pkg.store || pkg.courier,
            date: "Today",
            status: pkg.status === "Pending" ? "In-Transit" : (pkg.status as DeliveryItem["status"]),
            trackingId: pkg.trackingId,
            type: "inbound",
            isInbound: true,
            courier: pkg.courier,
            shippedDate: pkg.shippedDate,
            estimatedArrival: pkg.estimatedArrival,
            category: pkg.category,
            fromLocation: pkg.fromLocation,
            toLocation: pkg.toLocation,
            tracks: pkg.tracks,
            payUrl: pkg.payUrl,
          };
          setDeliveries((prev) => [newInbound, ...prev]);
          setDeliveryTab("inbound");
          setIsLinkingInbound(false);
          setLinkingTrackingId(undefined);
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

  const filteredDeliveries = deliveries.filter((d) => d.type === deliveryTab);

  return (
    <div className="w-full flex-1 flex flex-col min-h-full bg-transparent relative pb-28 md:pb-16 transition-colors">
      
      {/* Header Area: Matches Wallet header color & gradient with original Sunburst pattern */}
      <div 
        className="text-white dark:text-black px-4 sm:px-10 pt-[max(1.75rem,calc(env(safe-area-inset-top,0px)+0.75rem))] pb-6 sm:pb-8 rounded-b-[30px] sm:rounded-b-[40px] relative overflow-hidden shrink-0 transition-all shadow-sm"
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
          <div className="flex items-start justify-between mb-6 sm:mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl font-medium mb-1 text-white dark:text-black">
                Good morning Hudeen 👋🏾
              </h1>
              <p className="text-sm text-gray-400 dark:text-black/75">
                Auchi, Edo state
              </p>
            </div>
            <NotificationButton 
              variant="dark-header" 
              onClick={onOpenNotifications} 
            />
          </div>

          <h2 className="text-2xl sm:text-4xl font-semibold leading-tight mb-6 sm:mb-8 text-white dark:text-black">
            What would you like to do Today?
          </h2>

          {/* Track Package Input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchTrackingId.trim()) {
                setLinkingTrackingId(searchTrackingId.trim());
              }
              setIsLinkingInbound(true);
            }}
            className="relative flex items-center"
          >
            <input 
              type="text" 
              value={searchTrackingId}
              onChange={(e) => setSearchTrackingId(e.target.value)}
              placeholder="Track Package" 
              className="w-full h-14 bg-white/10 dark:bg-[#141416] text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 rounded-full pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-black border border-white/5 dark:border-black/20 dark:shadow-sm transition-all font-medium text-sm sm:text-base"
            />
            <button 
              type="submit"
              title={searchTrackingId.trim() ? "Search tracking ID" : "Scan package barcode"}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-950 shadow-sm hover:bg-gray-100 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              {searchTrackingId.trim().length > 0 ? (
                <Search className="w-5 h-5 text-gray-950 stroke-[2.2] animate-in zoom-in-75 duration-150" />
              ) : (
                <ScanLine className="w-5 h-5 text-gray-950 stroke-[2] animate-in zoom-in-75 duration-150" />
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 px-3.5 sm:px-8 md:px-10 py-5 sm:py-9 flex flex-col gap-6 sm:gap-9">
        
        {/* Action Buttons: Preserving brand yellow on dark mode */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          <button 
            onClick={() => setIsSendModalOpen(true)}
            className="bg-white dark:bg-[#1c1c20] hover:bg-yellow-50/90 dark:hover:bg-yellow-400/10 border border-gray-100 dark:border-white/5 hover:border-yellow-400/60 dark:hover:border-yellow-400/40 rounded-2xl p-3 sm:p-5 flex items-center justify-start gap-2.5 sm:gap-3.5 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1 active:translate-y-0 active:scale-[0.96] active:bg-yellow-100/80 dark:active:bg-yellow-400/20 transition-all duration-200 ease-out active:duration-75 group shadow-xs cursor-pointer touch-manipulation text-left select-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1a1a1a] dark:bg-[#FFCC00] rounded-xl flex items-center justify-center border border-black/10 dark:border-yellow-400/80 group-hover:scale-105 group-hover:rotate-[-3deg] group-active:scale-95 group-active:rotate-0 transition-all duration-200 shrink-0 shadow-2xs">
              <Send className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#FFCC00] dark:text-[#141416] group-hover:translate-x-0.5 group-active:translate-x-0 transition-all" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white group-hover:text-yellow-950 dark:group-hover:text-white text-xs sm:text-base text-left leading-tight transition-colors">
              Send<br />Package
            </span>
          </button>
          
          <button 
            onClick={() => setIsReceiveModalOpen(true)}
            className="bg-white dark:bg-[#1c1c20] hover:bg-yellow-50/90 dark:hover:bg-yellow-400/10 border border-gray-100 dark:border-white/5 hover:border-yellow-400/60 dark:hover:border-yellow-400/40 rounded-2xl p-3 sm:p-5 flex items-center justify-start gap-2.5 sm:gap-3.5 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1 active:translate-y-0 active:scale-[0.96] active:bg-yellow-100/80 dark:active:bg-yellow-400/20 transition-all duration-200 ease-out active:duration-75 group shadow-xs cursor-pointer touch-manipulation text-left select-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1a1a1a] dark:bg-[#FFCC00] rounded-xl flex items-center justify-center border border-black/10 dark:border-yellow-400/80 group-hover:scale-105 group-hover:rotate-[3deg] group-active:scale-95 group-active:rotate-0 transition-all duration-200 shrink-0 shadow-2xs">
              <Download className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#FFCC00] dark:text-[#141416] group-hover:translate-y-0.5 group-active:translate-y-0 transition-all" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white group-hover:text-yellow-950 dark:group-hover:text-white text-xs sm:text-base text-left leading-tight transition-colors">
              Receive<br />Package
            </span>
          </button>
        </div>

        {/* Active Delivery Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Active delivery
            </h3>
            <button 
              onClick={() => setIsViewingPendingDeliveries(true)}
              className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 cursor-pointer touch-manipulation"
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
        </section>

        {/* Recent Deliveries Section */}
        <section className="space-y-3.5 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Recent deliveries
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Past shipments & linked packages
              </p>
            </div>
            <button 
              onClick={onNavigateToPackages}
              className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 cursor-pointer touch-manipulation"
            >
              See All
            </button>
          </div>

          {/* Direct Packages / Inbound Packages Toggle */}
          <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-full flex w-full sm:w-fit border border-gray-200/60 dark:border-white/5">
            <button 
              onClick={() => setDeliveryTab("direct")}
              className={`flex-1 sm:flex-initial text-xs sm:text-sm py-2 px-5 rounded-full font-semibold transition-all text-center cursor-pointer touch-manipulation ${
                deliveryTab === "direct"
                  ? "bg-yellow-400 text-black font-bold shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Direct Packages
            </button>
            <button 
              onClick={() => setDeliveryTab("inbound")}
              className={`flex-1 sm:flex-initial text-xs sm:text-sm py-2 px-5 rounded-full font-semibold transition-all text-center cursor-pointer touch-manipulation ${
                deliveryTab === "inbound"
                  ? "bg-yellow-400 text-black font-bold shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Inbound Packages
            </button>
          </div>

          {/* Deliveries List */}
          <div className="space-y-2.5 sm:space-y-3">
            {filteredDeliveries.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  setSelectedDelivery({
                    id: item.id,
                    title: item.title,
                    store: item.store,
                    trackingCode: item.trackingId.startsWith("DART-") ? `#42324-HUD-${item.trackingId.replace('DART-', '')}` : item.trackingId,
                    status: item.status,
                    fromLocation: item.fromLocation || (item.store === "AliExpress" ? "China, Beijing" : item.store.toUpperCase()),
                    toLocation: item.toLocation || (item.isArrived ? "GIG Terminal, Auchi, Edo state" : "Akpakpava, Benin"),
                    date: item.date.includes("Today") ? "Today" : item.date.includes("Yesterday") ? "Yesterday" : item.date.split(" ")[0],
                    time: item.date.includes("PM") || item.date.includes("AM") ? item.date.split(" ").slice(-2).join(" ") : "12:00 PM",
                    weight: "Medium",
                    category: item.category || (item.title.toLowerCase().includes("shoe") ? "Clothes" : "Electronics"),
                    fragileNote: "Note: this Item was labelled as sensitive and fragile",
                    isInbound: item.isInbound ?? (item.type === "inbound"),
                    courier: item.courier || item.store,
                    shippedDate: item.shippedDate || "Jun 28th 2026",
                    estimatedArrival: item.estimatedArrival || "Jul 30th 2026",
                    isArrived: item.isArrived,
                    arrivedDate: item.arrivedDate || "Jul 30th 2026 • 12:47 PM",
                    pickupTerminal: item.pickupTerminal || "GIG Terminal, Auchi, Edo state",
                    tracks: item.tracks,
                    payUrl: item.payUrl,
                    rider: {
                      name: item.courier || "Divine Augustina",
                      idCode: "#42324-FHJS44R-34R",
                      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                      rating: 4.8,
                      reviewCount: 32,
                      price: "₦5,000"
                    }
                  });
                }}
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
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium truncate">
                    From {item.store} • {item.date}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Modals */}
      <ReceivePackageModal 
        isOpen={isReceiveModalOpen} 
        onClose={() => setIsReceiveModalOpen(false)} 
        onSelectOption={(option) => {
          if (option === "pickup") {
            setIsReceiveModalOpen(false);
            setIsRequestingPickup(true);
          } else if (option === "inbound") {
            setIsReceiveModalOpen(false);
            setIsLinkingInbound(true);
          }
        }}
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
