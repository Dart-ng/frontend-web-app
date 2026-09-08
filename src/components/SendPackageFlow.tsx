import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Camera,
  Shirt,
  FileText,
  Package,
  MapPin,
  History,
  Plus,
  Star,
  CheckCircle2,
  Check,
  Search,
  Navigation,
  ShieldCheck,
  ChevronsRight,
  AlertTriangle,
  Copy,
  Info,
  Shield,
  Wallet,
  CreditCard,
  Banknote,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Bookmark,
  Flag,
  MessageSquare,
  MessageSquareText,
  Timer,
  Phone,
  Send,
  MoreVertical,
  Maximize2,
} from "lucide-react";
import defaultPixelPhoto from "../assets/google_pixel_photo.jpg";
import divineAvatar from "../assets/divine_augustina_rider.jpg";
import moovCourierBanner from "../assets/moov_courier_rider_banner.jpg";
import dropOffBoxGoodMarkIcon from "../assets/drop_off_box_good_mark.png";
import courierRatingAvatar from "../assets/courier_rating_avatar.jpg";
import celebrationConfetti from "../assets/celebration_confetti.png";
import greenSuccessBadge from "../assets/green_success_badge.png";
import SendPackageModal from "./SendPackageModal";

export interface Rider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  etaMinutes: number;
  isVerified: boolean;
  isAvailable: boolean;
}

export const defaultRidersList: Rider[] = [
  {
    id: "r2",
    name: "Ralph Edwards",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80",
    rating: 4.7,
    reviews: 251,
    etaMinutes: 3,
    isVerified: true,
    isAvailable: true,
  },
  {
    id: "r3",
    name: "Courtney Henry",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    rating: 4.6,
    reviews: 251,
    etaMinutes: 8,
    isVerified: true,
    isAvailable: true,
  },
  {
    id: "r4",
    name: "Cameron Williamson",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
    rating: 4.4,
    reviews: 251,
    etaMinutes: 12,
    isVerified: true,
    isAvailable: true,
  },
  {
    id: "r5",
    name: "Floyd Miles",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=256&q=80",
    rating: 4.1,
    reviews: 251,
    etaMinutes: 20,
    isVerified: true,
    isAvailable: true,
  },
  {
    id: "r1",
    name: "Divine Augustina",
    avatar: divineAvatar,
    rating: 4.8,
    reviews: 251,
    etaMinutes: 3,
    isVerified: true,
    isAvailable: true,
  },
  {
    id: "r6",
    name: "Arlene McCoy",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    rating: 4.9,
    reviews: 312,
    etaMinutes: 15,
    isVerified: true,
    isAvailable: true,
  },
  {
    id: "r7",
    name: "Jerome Bell",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    rating: 4.8,
    reviews: 189,
    etaMinutes: 18,
    isVerified: true,
    isAvailable: true,
  },
  {
    id: "r8",
    name: "Darrell Steward",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80",
    rating: 4.7,
    reviews: 144,
    etaMinutes: 22,
    isVerified: true,
    isAvailable: true,
  },
];

export type FlowScreen =
  | "details"
  | "destination"
  | "add_location"
  | "choose_rider"
  | "all_riders"
  | "confirm_delivery"
  | "payment_method"
  | "package_status"
  | "success";

interface SendPackageFlowProps {
  initialImage?: {
    file?: File;
    previewUrl: string;
  } | null;
  onBack: () => void;
  onComplete?: (details: {
    packageName: string;
    category: string;
    weight: string;
    imageFile?: File;
    fromLocation?: string;
    toLocation?: string;
    estimatedFee?: string;
    riderName?: string;
    riderEta?: string;
    paymentMethod: string;
  }) => void;
  onOpenNotifications?: () => void;
}

export default function SendPackageFlow({
  initialImage,
  onBack,
  onComplete,
}: SendPackageFlowProps) {
  const [screen, setScreen] = useState<FlowScreen>("details");
  const [capturedImage, setCapturedImage] = useState<{
    file?: File;
    previewUrl: string;
  } | null>(initialImage || null);

  // Camera modal state (only camera and prompt modals appear as popups)
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [cameraModalInitialMode, setCameraModalInitialMode] = useState<"prompt" | "camera">("camera");

  // Form state for Package Details
  const [packageName, setPackageName] = useState("Google pixel 9pro");
  const [selectedCategory, setSelectedCategory] = useState<
    "Electronics" | "Documents" | "Clothes" | "Others"
  >("Electronics");
  const [selectedWeight, setSelectedWeight] = useState<
    "light" | "medium" | "heavy" | ""
  >("light");

  // Destination screen state
  const [fromLocation, setFromLocation] = useState("Auchi, Edo State");
  const [toLocation, setToLocation] = useState("Benin");
  const [estimatedFee, setEstimatedFee] = useState("5,000");

  // Add new location state
  const [newLocationSearch, setNewLocationSearch] = useState("Ibge Road, Auchi");
  const [selectedNewLocation, setSelectedNewLocation] = useState("Auchi, Igbe Road");

  // Rider selection state
  const [selectedRiderId, setSelectedRiderId] = useState("r1");
  const [showSelectedRiderModal, setShowSelectedRiderModal] = useState(false);

  // Payment method selection state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "wallet" | "card" | "cash"
  >("wallet");

  // All Riders screen state
  const [riderSearchQuery, setRiderSearchQuery] = useState("");
  const [riderFilterTab, setRiderFilterTab] = useState<
    "recommended" | "nearest" | "highest" | "available"
  >("recommended");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [inviteToast, setInviteToast] = useState<string | null>(null);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  // Fullscreen expanded package image lightbox state
  const [showExpandedImage, setShowExpandedImage] = useState(false);

  // Rider Chat screen state (opened briefly via message button)
  const [showRiderChat, setShowRiderChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; sender: "rider" | "user"; text: string; time: string }>
  >([
    {
      id: "m1",
      sender: "rider",
      text: "Good afternoon! I have your package details and I'm on the way to the pickup location.",
      time: "10:11 AM",
    },
    {
      id: "m2",
      sender: "user",
      text: "Alright, please let me know when you arrive outside.",
      time: "10:13 AM",
    },
    {
      id: "m3",
      sender: "rider",
      text: "Sure thing! Arriving in about 3-4 minutes.",
      time: "10:14 AM",
    },
  ]);
  const [chatInputText, setChatInputText] = useState("");

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || chatInputText).trim();
    if (!text) return;
    const newMsg = {
      id: "m_" + Date.now(),
      sender: "user" as const,
      text,
      time: "Just now",
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInputText("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: "m_reply_" + Date.now(),
          sender: "rider" as const,
          text: "Got it! Thanks for updating.",
          time: "Just now",
        },
      ]);
    }, 1200);
  };

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopyToast(`${label} copied!`);
    setTimeout(() => setCopyToast(null), 2200);
  };

  // Filtered and sorted riders for All Riders screen
  const filteredRiders = defaultRidersList
    .filter((rider) => {
      if (!riderSearchQuery.trim()) return true;
      return rider.name.toLowerCase().includes(riderSearchQuery.toLowerCase());
    })
    .filter((rider) => {
      if (riderFilterTab === "available") return rider.isAvailable;
      return true;
    })
    .sort((a, b) => {
      if (riderFilterTab === "nearest") return a.etaMinutes - b.etaMinutes;
      if (riderFilterTab === "highest") return b.rating - a.rating;
      return 0; // recommended order
    });

  // Package Status screen state
  const [countdown, setCountdown] = useState(90); // 90 seconds = 1m:30s
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isRiderAccepted, setIsRiderAccepted] = useState(false);
  const [isPackageArrived, setIsPackageArrived] = useState(false);
  const [transitCountdown, setTransitCountdown] = useState(1563); // 26:03
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDropOffCodeModal, setShowDropOffCodeModal] = useState(false);
  const [dropOffCode, setDropOffCode] = useState("3018");
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [isCancelled, setIsCancelled] = useState(false);
  const [showCancelledToast, setShowCancelledToast] = useState(false);
  const [showAcceptedToast, setShowAcceptedToast] = useState(false);

  // Timer effect for package status countdown
  useEffect(() => {
    if (screen !== "package_status" || showCancelModal || isRiderAccepted || isCancelled) return;
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [screen, countdown, showCancelModal, isRiderAccepted, isCancelled]);

  // Timer effect for transit countdown (26:03 -> 00:00)
  useEffect(() => {
    if (screen !== "package_status" || !isRiderAccepted || isPackageArrived) return;
    if (transitCountdown <= 0) {
      setIsPackageArrived(true);
      return;
    }
    const timer = setInterval(() => {
      setTransitCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPackageArrived(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [screen, isRiderAccepted, isPackageArrived, transitCountdown]);

  // Close expanded image with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowExpandedImage(false);
      }
    };
    if (showExpandedImage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showExpandedImage]);

  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m:${secs.toString().padStart(2, "0")}s`;
  };

  const formatTransitTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Final booking confirmation with chosen rider -> shows package_status screen next!
  const handleConfirmPayment = () => {
    setCountdown(60); // 1 minute wait timer
    setTransitCountdown(1563);
    setIsPackageArrived(false);
    setShowCancelModal(false);
    setShowDropOffCodeModal(false);
    setIsRiderAccepted(false);
    setIsCancelled(false);
    setShowCancelledToast(false);
    setShowAcceptedToast(false);
    setShowReportModal(false);
    setScreen("package_status");
  };

  const handleCancelDelivery = () => {
    setShowCancelModal(false);
    setIsCancelled(true);
    setShowCancelledToast(true);
    setTimeout(() => {
      setShowCancelledToast(false);
      onBack();
    }, 3200);
  };

  const handleRiderAccept = () => {
    setIsRiderAccepted(true);
    setShowAcceptedToast(true);
    setTimeout(() => {
      setShowAcceptedToast(false);
    }, 3500);
  };

  const handlePackageReceived = () => {
    setScreen("success");
  };

  const handleFinishSuccess = () => {
    const chosenRider =
      defaultRidersList.find((r) => r.id === selectedRiderId) || defaultRidersList[0];
    onComplete?.({
      packageName: packageName.trim() || "Google pixel 9pro",
      category: selectedCategory,
      weight: selectedWeight || "light",
      imageFile: capturedImage?.file,
      fromLocation,
      toLocation,
      estimatedFee,
      riderName: chosenRider.name,
      riderEta: "Delivered",
      paymentMethod: selectedPaymentMethod,
    });
    onBack();
  };

  return (
    <div className={`w-full flex-1 flex flex-col min-h-full h-full bg-transparent relative transition-colors ${
      screen === "success" || screen === "package_status" ? "pb-0" : "pb-28 md:pb-16"
    }`}>
      {/* Request Accepted Toast (Matches user screenshot exactly) */}
      {showAcceptedToast && (
        <div 
          onClick={() => setShowAcceptedToast(false)}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[150] w-[92%] max-w-sm sm:max-w-md bg-white dark:bg-[#1c1d22] border border-gray-100 dark:border-white/10 rounded-2xl sm:rounded-full px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.14)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center gap-3.5 animate-in fade-in slide-in-from-top-4 duration-300 cursor-pointer"
        >
          {/* Dark Circular Badge with Yellow Box + Green Checkmark Badge */}
          <div className="w-11 h-11 rounded-full bg-[#181a20] dark:bg-[#252830] flex items-center justify-center shrink-0 relative">
            <div className="relative">
              {/* Cardboard Box with Red Tape */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7.5L12 3L20 7.5V17.5C20 18.6046 19.1046 19.5 18 19.5H6C4.89543 19.5 4 18.6046 4 17.5V7.5Z"
                  fill="#F5A623"
                />
                <path
                  d="M4 7.5L12 12L20 7.5"
                  fill="#D98207"
                  fillOpacity="0.4"
                />
                <path
                  d="M10.75 3.8L10.75 12L13.25 12L13.25 3.8"
                  fill="#E53935"
                />
                <path
                  d="M8 9.75H16"
                  stroke="#D98207"
                  strokeWidth="0.75"
                  strokeDasharray="1.5 1.5"
                />
              </svg>
              {/* Green Circle with white Checkmark badge */}
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#22C55E] flex items-center justify-center border border-[#181a20] dark:border-[#252830] shadow-xs">
                <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
              </div>
            </div>
          </div>

          {/* Text block */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm sm:text-base font-semibold text-gray-950 dark:text-white leading-tight">
              Request accepted
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Rider has accept your request
            </p>
          </div>
        </div>
      )}
      {/* Toast Notice */}
      {showCancelledToast && (
        <div 
          onClick={() => setShowCancelledToast(false)}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[150] w-[92%] max-w-sm sm:max-w-md bg-white dark:bg-[#1c1d22] border border-gray-100 dark:border-white/10 rounded-2xl sm:rounded-full px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.14)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center gap-3.5 animate-in fade-in slide-in-from-top-4 duration-300 cursor-pointer"
        >
          {/* Dark Circular Badge with Yellow Box + Red X Badge */}
          <div className="w-11 h-11 rounded-full bg-[#181a20] dark:bg-[#252830] flex items-center justify-center shrink-0 relative">
            <div className="relative">
              {/* Cardboard Box with Red Tape */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7.5L12 3L20 7.5V17.5C20 18.6046 19.1046 19.5 18 19.5H6C4.89543 19.5 4 18.6046 4 17.5V7.5Z"
                  fill="#F5A623"
                />
                <path
                  d="M4 7.5L12 12L20 7.5"
                  fill="#D98207"
                  fillOpacity="0.4"
                />
                <path
                  d="M10.75 3.8L10.75 12L13.25 12L13.25 3.8"
                  fill="#E53935"
                />
                <path
                  d="M8 9.75H16"
                  stroke="#D98207"
                  strokeWidth="0.75"
                  strokeDasharray="1.5 1.5"
                />
              </svg>
              {/* Red Circle with white X badge */}
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E53935] flex items-center justify-center border border-[#181a20] dark:border-[#252830] shadow-xs">
                <X className="w-2 h-2 text-white stroke-[3.5]" />
              </div>
            </div>
          </div>

          {/* Text block */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm sm:text-base font-semibold text-gray-950 dark:text-white leading-tight">
              This delivery was cancelled
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              You cancelled this delivery
            </p>
          </div>
        </div>
      )}

      {copyToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>{copyToast}</span>
        </div>
      )}
      {inviteToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#FFCC00] text-gray-950 text-xs font-bold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>{inviteToast}</span>
        </div>
      )}

      {/* Camera / Prompt Modal: Kept as modal popup as explicitly requested */}
      <SendPackageModal
        isOpen={isCameraModalOpen}
        initialMode={cameraModalInitialMode}
        onClose={() => setIsCameraModalOpen(false)}
        onPhotoConfirmed={(photo) => {
          setCapturedImage(photo);
          setIsCameraModalOpen(false);
        }}
      />

      {/* Selected Rider Modal (Matching User's Screenshot Exactly) */}
      {showSelectedRiderModal && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setShowSelectedRiderModal(false)}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs transition-opacity"
          />

          {/* Modal / Bottom Sheet Card matching user's design */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-[480px] bg-white dark:bg-[#18181b] rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-7 shadow-2xl relative z-10 animate-in slide-in-from-bottom duration-200 border-t sm:border border-gray-100 dark:border-white/10 pb-[max(2rem,env(safe-area-inset-bottom,1.5rem))] sm:pb-7 space-y-6"
          >
            {/* Mobile pull indicator */}
            <div
              onClick={() => setShowSelectedRiderModal(false)}
              className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto -mt-1 mb-2 sm:hidden cursor-pointer"
            />

            {/* Row 1: Rider Avatar, "Selected Rider", and Name + Green Check */}
            {(() => {
              const chosenRider =
                defaultRidersList.find((r) => r.id === selectedRiderId) || defaultRidersList[0];
              return (
                <>
                  <div className="flex items-center gap-3.5">
                    <img
                      src={chosenRider.avatar}
                      alt={chosenRider.name}
                      className="w-14 h-14 rounded-full object-cover shrink-0 ring-1 ring-gray-100 dark:ring-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block leading-tight">
                        Selected Rider
                      </span>
                      <h3 className="text-xl font-bold text-gray-950 dark:text-white flex items-center gap-1.5 mt-0.5 tracking-tight truncate">
                        <span>{chosenRider.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      </h3>
                    </div>
                  </div>

                  {/* Row 2: Estimated Fee and Amount */}
                  <div className="flex items-center justify-between pt-1 pb-1">
                    <span className="text-base sm:text-lg font-normal text-gray-500 dark:text-gray-400">
                      Estimated Fee
                    </span>
                    <span className="text-2xl sm:text-[26px] font-bold text-gray-950 dark:text-white tracking-tight">
                      ₦{estimatedFee}
                    </span>
                  </div>

                  {/* Row 3: Continue -> Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowSelectedRiderModal(false);
                      setScreen("confirm_delivery");
                    }}
                    className="w-full py-4 px-5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 font-bold text-base transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
                  >
                    <span>Continue</span>
                    <span className="text-lg leading-none">→</span>
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* SCREEN 1: PACKAGE DETAILS (Rendered on Middle Parent Component)            */}
      {/* ========================================================================= */}
      {screen === "details" && (
        <div className="w-full flex-1 flex flex-col animate-in fade-in duration-200">
          {/* Header Bar */}
          <div className="px-5 sm:px-8 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 dark:border-white/5">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors cursor-pointer touch-manipulation"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              Package details
            </h1>

            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-500/10 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-500/20 dark:hover:bg-white/15 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 px-5 sm:px-8 py-6 space-y-6">
            {/* Package Image Card with Retake/Change Camera Action */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[24px] overflow-hidden bg-neutral-900 border border-gray-200/60 dark:border-white/10 shadow-sm group">
              <img
                src={capturedImage?.previewUrl || defaultPixelPhoto}
                alt="Package"
                className="w-full h-full object-cover"
              />

              {/* Retake Camera Button Overlay */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setCameraModalInitialMode("camera");
                    setIsCameraModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-white/90 text-gray-900 font-semibold text-xs flex items-center gap-2 shadow-lg backdrop-blur-md cursor-pointer hover:bg-white transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>Retake Photo</span>
                </button>
              </div>

              {/* Top-Right Change Picture Badge */}
              <button
                type="button"
                onClick={() => {
                  setCameraModalInitialMode("prompt");
                  setIsCameraModalOpen(true);
                }}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md flex items-center gap-1.5 text-white/90 text-xs font-medium transition-colors cursor-pointer"
                title="Change picture"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Change</span>
              </button>
            </div>

            {/* Package name Section */}
            <div>
              <label className="block text-[17px] font-bold text-gray-950 dark:text-white mb-2 tracking-tight">
                Package name
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="Enter package name"
                  className="w-full px-4 py-3.5 pr-10 rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#161618] text-gray-900 dark:text-white font-medium text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]/30 transition-all shadow-2xs"
                />
                {packageName && (
                  <button
                    type="button"
                    onClick={() => setPackageName("")}
                    className="absolute right-3.5 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                    title="Clear input"
                  >
                    <X className="w-4 h-4 stroke-[2]" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Selection Section */}
            <div>
              <label className="block text-[17px] font-bold text-gray-950 dark:text-white mb-2.5 tracking-tight">
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Electronics */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("Electronics")}
                  className={`py-3 px-3 rounded-2xl flex items-center justify-center gap-2 border font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                    selectedCategory === "Electronics"
                      ? "bg-amber-400/15 dark:bg-[#FFCC00]/15 border-[#FFCC00] text-amber-900 dark:text-[#FFCC00] font-bold shadow-xs"
                      : "bg-white dark:bg-[#161618] border-gray-200/90 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Electronics</span>
                </button>

                {/* Documents */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("Documents")}
                  className={`py-3 px-3 rounded-2xl flex items-center justify-center gap-2 border font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                    selectedCategory === "Documents"
                      ? "bg-amber-400/15 dark:bg-[#FFCC00]/15 border-[#FFCC00] text-amber-900 dark:text-[#FFCC00] font-bold shadow-xs"
                      : "bg-white dark:bg-[#161618] border-gray-200/90 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Documents</span>
                </button>

                {/* Clothes */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("Clothes")}
                  className={`py-3 px-3 rounded-2xl flex items-center justify-center gap-2 border font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                    selectedCategory === "Clothes"
                      ? "bg-amber-400/15 dark:bg-[#FFCC00]/15 border-[#FFCC00] text-amber-900 dark:text-[#FFCC00] font-bold shadow-xs"
                      : "bg-white dark:bg-[#161618] border-gray-200/90 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20"
                  }`}
                >
                  <Shirt className="w-4 h-4" />
                  <span>Clothes</span>
                </button>

                {/* Others */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("Others")}
                  className={`py-3 px-3 rounded-2xl flex items-center justify-center gap-2 border font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                    selectedCategory === "Others"
                      ? "bg-amber-400/15 dark:bg-[#FFCC00]/15 border-[#FFCC00] text-amber-900 dark:text-[#FFCC00] font-bold shadow-xs"
                      : "bg-white dark:bg-[#161618] border-gray-200/90 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Others</span>
                </button>
              </div>
            </div>

            {/* Weight Section */}
            <div>
              <label className="block text-[17px] font-bold text-gray-950 dark:text-white mb-2.5 tracking-tight">
                Weight
              </label>
              <div className="rounded-2xl border border-gray-200/90 dark:border-white/10 overflow-hidden divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#161618] shadow-2xs">
                {/* Weight Option 1: Light */}
                <button
                  type="button"
                  onClick={() => setSelectedWeight("light")}
                  className="w-full p-4 flex items-start gap-3.5 text-left cursor-pointer hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                      selectedWeight === "light"
                        ? "border-[#FFCC00]"
                        : "border-gray-300 dark:border-neutral-600"
                    }`}
                  >
                    {selectedWeight === "light" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFCC00]" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight">
                      Light Weight (&lt; 5kg)
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      E.g food, document, shoe, shirt or phones.
                    </p>
                  </div>
                </button>

                {/* Weight Option 2: Medium */}
                <button
                  type="button"
                  onClick={() => setSelectedWeight("medium")}
                  className="w-full p-4 flex items-start gap-3.5 text-left cursor-pointer hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                      selectedWeight === "medium"
                        ? "border-[#FFCC00]"
                        : "border-gray-300 dark:border-neutral-600"
                    }`}
                  >
                    {selectedWeight === "medium" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFCC00]" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight">
                      Medium Weight (5kg - 25kg)
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      E.g large bags, heavy carton, mini fridge.
                    </p>
                  </div>
                </button>

                {/* Weight Option 3: Heavy */}
                <button
                  type="button"
                  onClick={() => setSelectedWeight("heavy")}
                  className="w-full p-4 flex items-start gap-3.5 text-left cursor-pointer hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                      selectedWeight === "heavy"
                        ? "border-[#FFCC00]"
                        : "border-gray-300 dark:border-neutral-600"
                    }`}
                  >
                    {selectedWeight === "heavy" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFCC00]" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight">
                      Heavy Weight (&gt; 25kg)
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      E.g generator, TV, or large vehicle spare parts.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom Continue Action Button */}
            <div className="pt-2 pb-6">
              <button
                type="button"
                onClick={() => setScreen("destination")}
                className="w-full py-4 px-5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 font-bold text-base transition-all shadow-xs flex items-center justify-center cursor-pointer touch-manipulation"
              >
                <span>Continue</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 2: DESTINATION SELECTION (Where is it going?)                      */}
      {/* ========================================================================= */}
      {screen === "destination" && (
        <div className="w-full flex-1 flex flex-col animate-in fade-in duration-200">
          {/* Top Navigation Header */}
          <div className="px-5 sm:px-8 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 dark:border-white/5">
            <button
              type="button"
              onClick={() => setScreen("details")}
              className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors cursor-pointer"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              Where is it going?
            </h1>

            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-500/10 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-500/20 dark:hover:bg-white/15 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 px-5 sm:px-8 py-6 space-y-6">
            {/* Route Timeline Card */}
            <div className="rounded-3xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#161618] p-5 sm:p-6 shadow-2xs">
              <div className="flex gap-4">
                {/* Timeline Dots & Connecting Dotted Line */}
                <div className="flex flex-col items-center pt-1 shrink-0">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FFCC00] ring-4 ring-[#FFCC00]/20 shrink-0" />
                  <div className="w-[1.5px] flex-1 my-1.5 border-l-2 border-dashed border-gray-300 dark:border-neutral-700 min-h-[44px]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-400 dark:bg-neutral-600 shrink-0" />
                </div>

                {/* Locations Text Stack */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  {/* FROM Row */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block">
                        FROM
                      </span>
                      <h4 className="text-[15px] font-bold text-gray-900 dark:text-white leading-snug">
                        {fromLocation || "Select origin"}
                      </h4>
                      <span className="text-xs font-semibold text-amber-500 dark:text-yellow-400 block mt-0.5">
                        Current Location
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFromLocation("")}
                      className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer mt-1"
                      title="Clear origin"
                    >
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* TO Row */}
                  <div className="flex items-start justify-between pt-4">
                    <div 
                      onClick={() => setScreen("add_location")}
                      className="cursor-pointer group flex-1 pr-2"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block">
                        TO
                      </span>
                      <h4 className="text-[15px] font-bold text-gray-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-yellow-400 transition-colors">
                        {toLocation || "Benin"}
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setScreen("add_location");
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-yellow-400 hover:text-amber-700 dark:hover:text-yellow-300 mt-1 cursor-pointer transition-all"
                      >
                        <span className="underline underline-offset-2">Tap below or add new location</span>
                        <span className="text-[10px] font-bold bg-amber-400/20 dark:bg-yellow-400/20 text-amber-900 dark:text-yellow-300 px-1.5 py-0.5 rounded-full">
                          + Add
                        </span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setToLocation("")}
                      className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer mt-1 shrink-0"
                      title="Clear destination"
                    >
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimated Fee Separator & Row */}
              <div className="border-t border-gray-100 dark:border-white/5 pt-4 mt-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Estimated Fee
                </span>
                <span className="text-lg font-bold text-gray-950 dark:text-white">
                  ₦{estimatedFee}
                </span>
              </div>
            </div>

            {/* Recent & Add Address Section */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Select destination or add new
                </span>
              </div>

              <div className="rounded-3xl border border-gray-200/90 dark:border-white/10 overflow-hidden divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#161618] shadow-2xs">
                {/* Recent address 1: Iyapki, south Ibie */}
                <button
                  type="button"
                  onClick={() => {
                    setToLocation("Iyapki, south Ibie");
                    setEstimatedFee("2,500");
                  }}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-yellow-400 transition-colors">
                      Iyapki, south Ibie
                    </span>
                  </div>
                  <History className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                </button>

                {/* Add new address */}
                <button
                  type="button"
                  onClick={() => setScreen("add_location")}
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FFCC00] flex items-center justify-center text-gray-950 shadow-xs">
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Add new address
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom Book Rider CTA Button */}
            <div className="pt-4 pb-6">
              <button
                type="button"
                onClick={() => setScreen("choose_rider")}
                className="w-full py-4 px-5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 font-bold text-base transition-all shadow-xs flex items-center justify-center cursor-pointer touch-manipulation"
              >
                <span>Book Rider</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 3: ADD NEW LOCATION (Inline on Middle Parent Component)             */}
      {/* ========================================================================= */}
      {screen === "add_location" && (
        <div className="w-full flex-1 flex flex-col animate-in fade-in duration-200">
          {/* Top Navigation Header */}
          <div className="px-5 sm:px-8 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 dark:border-white/5">
            <button
              type="button"
              onClick={() => setScreen("destination")}
              className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors cursor-pointer"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              Add New Location
            </h1>

            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-500/10 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-500/20 dark:hover:bg-white/15 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 px-5 sm:px-8 py-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-950 dark:text-white tracking-tight leading-tight">
                Add New location
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-normal font-normal">
                Please add the specific location of your package for safety reasons
              </p>
            </div>

            {/* Location Search Input Box */}
            <div className="relative flex items-center">
              <input
                type="text"
                value={newLocationSearch}
                onChange={(e) => setNewLocationSearch(e.target.value)}
                placeholder="Search location (e.g. Igbe Road, Auchi)"
                className="w-full px-4 py-3.5 pr-10 rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#161618] text-gray-900 dark:text-white font-medium text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]/30 transition-all shadow-2xs"
              />
              {newLocationSearch && (
                <button
                  type="button"
                  onClick={() => setNewLocationSearch("")}
                  className="absolute right-3.5 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-4 h-4 stroke-[2]" />
                </button>
              )}
            </div>

            {/* Matched / Suggested Locations List */}
            <div className="rounded-3xl border border-gray-200/90 dark:border-white/10 overflow-hidden divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#161618] shadow-2xs">
              {/* Suggestion 1: Auchi, Igbe Road */}
              <button
                type="button"
                onClick={() => {
                  setSelectedNewLocation("Auchi, Igbe Road");
                  setToLocation("Auchi, Igbe Road");
                  setNewLocationSearch("Auchi, Igbe Road");
                  setEstimatedFee("3,500");
                }}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      selectedNewLocation === "Auchi, Igbe Road"
                        ? "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200"
                        : "bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-sm transition-colors ${
                      selectedNewLocation === "Auchi, Igbe Road"
                        ? "text-gray-900 dark:text-white font-semibold"
                        : "text-gray-400 dark:text-gray-500 font-normal"
                    }`}
                  >
                    Auchi, Igbe Road
                  </span>
                </div>

                {selectedNewLocation === "Auchi, Igbe Road" && (
                  <div className="w-5 h-5 rounded-md bg-[#0080FF] flex items-center justify-center text-white shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>

              {/* Suggestion 2: Auchi delta Terminal */}
              <button
                type="button"
                onClick={() => {
                  setSelectedNewLocation("Auchi delta Terminal");
                  setToLocation("Auchi delta Terminal");
                  setNewLocationSearch("Auchi delta Terminal");
                  setEstimatedFee("4,000");
                }}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      selectedNewLocation === "Auchi delta Terminal"
                        ? "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200"
                        : "bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-sm transition-colors ${
                      selectedNewLocation === "Auchi delta Terminal"
                        ? "text-gray-900 dark:text-white font-semibold"
                        : "text-gray-400 dark:text-gray-500 font-normal"
                    }`}
                  >
                    Auchi delta Terminal
                  </span>
                </div>

                {selectedNewLocation === "Auchi delta Terminal" && (
                  <div className="w-5 h-5 rounded-md bg-[#0080FF] flex items-center justify-center text-white shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>

              {/* Suggestion 3: Iyapki, south Ibie */}
              <button
                type="button"
                onClick={() => {
                  setSelectedNewLocation("Iyapki, south Ibie");
                  setToLocation("Iyapki, south Ibie");
                  setNewLocationSearch("Iyapki, south Ibie");
                  setEstimatedFee("2,500");
                }}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      selectedNewLocation === "Iyapki, south Ibie"
                        ? "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200"
                        : "bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-sm transition-colors ${
                      selectedNewLocation === "Iyapki, south Ibie"
                        ? "text-gray-900 dark:text-white font-semibold"
                        : "text-gray-400 dark:text-gray-500 font-normal"
                    }`}
                  >
                    Iyapki, south Ibie
                  </span>
                </div>

                {selectedNewLocation === "Iyapki, south Ibie" && (
                  <div className="w-5 h-5 rounded-md bg-[#0080FF] flex items-center justify-center text-white shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            </div>

            {/* Recents Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-1">
                Recents
              </h3>
              <div className="rounded-3xl border border-gray-200/90 dark:border-white/10 overflow-hidden divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#161618] shadow-2xs">
                {/* Recent 1: Auchi, Edo State */}
                <button
                  type="button"
                  onClick={() => {
                    setToLocation("Auchi, Edo State");
                    setNewLocationSearch("Auchi, Edo State");
                    setEstimatedFee("3,000");
                  }}
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Auchi, Edo State
                  </span>
                </button>

                {/* Recent 2: Benin */}
                <button
                  type="button"
                  onClick={() => {
                    setToLocation("Benin");
                    setNewLocationSearch("Benin");
                    setEstimatedFee("5,000");
                  }}
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Benin
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Location Button */}
            <div className="pt-4 pb-6">
              <button
                type="button"
                onClick={() => setScreen("destination")}
                className="w-full py-4 px-5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 font-bold text-base transition-all shadow-xs flex items-center justify-center cursor-pointer touch-manipulation"
              >
                <span>Confirm Location</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 4: CHOOSE RIDER (Inline on Middle Parent Component)                 */}
      {/* ========================================================================= */}
      {screen === "choose_rider" && (
        <div className="w-full flex-1 flex flex-col animate-in fade-in duration-200">
          {/* Top Navigation Header */}
          <div className="px-5 sm:px-8 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 dark:border-white/5">
            <button
              type="button"
              onClick={() => setScreen("destination")}
              className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors cursor-pointer"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <div className="text-center">
              <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight leading-snug">
                Choose Rider
              </h1>
              <p className="text-xs text-gray-400 dark:text-gray-400 font-medium">
                24 Riders near you
              </p>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-500/10 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-500/20 dark:hover:bg-white/15 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 px-5 sm:px-8 py-6 space-y-6">
            {/* BEST MATCH: Divine Augustina (Hero Card) */}
            <div>
              <div className="flex items-center justify-between mb-2.5 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                  Best Match
                </span>
                <span className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available Now
                </span>
              </div>

              <div
                onClick={() => {
                  setSelectedRiderId("r1");
                  setShowSelectedRiderModal(true);
                }}
                className={`relative rounded-3xl p-5 sm:p-6 transition-all cursor-pointer bg-white dark:bg-[#161618] shadow-sm ${
                  selectedRiderId === "r1"
                    ? "ring-2 ring-[#FFCC00] bg-amber-50/20 dark:bg-yellow-400/5"
                    : "hover:bg-gray-50/80 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rider Avatar with Status Dot */}
                  <div className="relative shrink-0">
                    <img
                      src={divineAvatar}
                      alt="Divine Augustina"
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                  </div>

                  {/* Rider Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-base sm:text-[17px] font-bold text-gray-900 dark:text-white truncate">
                        Divine Augustina
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-[#FFCC00] shrink-0" />
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>4.8</span>
                        <span className="text-gray-400 font-normal">(251)</span>
                      </div>
                      <span>•</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        3 mins away
                      </span>
                    </div>

                    <div className="mt-2 text-sm font-bold text-gray-950 dark:text-white">
                      ₦5,000
                    </div>
                  </div>

                  {/* Selection Radio */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                      selectedRiderId === "r1"
                        ? "border-[#FFCC00] bg-[#FFCC00]"
                        : "border-gray-300 dark:border-neutral-600"
                    }`}
                  >
                    {selectedRiderId === "r1" && (
                      <Check className="w-3.5 h-3.5 text-gray-950 stroke-[3]" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* OTHER RIDERS SECTION */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Other available riders
                </span>
                <button
                  type="button"
                  onClick={() => setScreen("all_riders")}
                  className="text-xs font-bold text-gray-900 dark:text-gray-100 hover:text-black dark:hover:text-white hover:underline cursor-pointer"
                >
                  View all riders (24) →
                </button>
              </div>

              <div className="rounded-3xl overflow-hidden divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#161618] shadow-sm">
                {defaultRidersList
                  .filter((r) => r.id !== "r1")
                  .slice(0, 3)
                  .map((rider) => (
                    <button
                      key={rider.id}
                      type="button"
                      onClick={() => {
                        setSelectedRiderId(rider.id);
                        setShowSelectedRiderModal(true);
                      }}
                      className={`w-full p-4 flex items-center justify-between text-left transition-colors cursor-pointer ${
                        selectedRiderId === rider.id
                          ? "bg-amber-400/10 dark:bg-yellow-400/10"
                          : "hover:bg-gray-50/80 dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={rider.avatar}
                          alt={rider.name}
                          className="w-11 h-11 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                            {rider.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {rider.rating}
                            </span>
                            <span>•</span>
                            <span>{rider.etaMinutes} mins</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                          selectedRiderId === rider.id
                            ? "border-[#FFCC00] bg-[#FFCC00]"
                            : "border-gray-300 dark:border-neutral-600"
                        }`}
                      >
                        {selectedRiderId === rider.id && (
                          <Check className="w-3 h-3 text-gray-950 stroke-[3]" />
                        )}
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 pb-6 w-full">
              <button
                type="button"
                onClick={() => setShowSelectedRiderModal(true)}
                className="w-full sm:flex-1 py-4 px-5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 font-bold text-base transition-all shadow-xs flex items-center justify-center cursor-pointer touch-manipulation"
              >
                <span>Confirm Rider</span>
              </button>

              <button
                type="button"
                onClick={() => setScreen("all_riders")}
                className="w-full sm:flex-1 py-4 px-4 rounded-2xl border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 font-semibold text-sm sm:text-base hover:bg-gray-50 dark:hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
              >
                <span>View all riders (Directory)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 5: ALL RIDERS DIRECTORY (Matching User's Screenshot Exactly)       */}
      {/* ========================================================================= */}
      {screen === "all_riders" && (
        <div className="w-full flex-1 flex flex-col animate-in fade-in duration-200">
          {/* Top Bar: Back button and + Invite Rider button */}
          <div className="px-5 sm:px-8 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-2 flex items-center justify-between sticky top-0 z-20 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setScreen("choose_rider")}
              className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors cursor-pointer touch-manipulation"
              title="Go back"
            >
              <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
            </button>

            <button
              type="button"
              onClick={() => {
                copyToClipboard("https://moov.app/rider-invite/HUD-99P", "Rider invitation link");
                setInviteToast("Rider invitation link copied!");
                setTimeout(() => setInviteToast(null), 2500);
              }}
              className="flex items-center gap-1.5 bg-[#FFCC00] hover:bg-[#f5c400] text-gray-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-full transition-all cursor-pointer shadow-xs active:scale-95 touch-manipulation"
            >
              <Plus className="w-4 h-4 stroke-[2.8]" />
              <span>Invite Rider</span>
            </button>
          </div>

          {/* Title & Subtitle Row with Bookmark Icon */}
          <div className="flex items-start justify-between px-5 sm:px-8 mt-3 mb-4">
            <div>
              <h1 className="text-2xl sm:text-[28px] font-bold text-gray-950 dark:text-white tracking-tight leading-tight">
                Available Riders
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  24 Riders near you
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 -mr-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
              title="Bookmark riders"
            >
              <Bookmark
                className={`w-6 h-6 stroke-[1.8] ${
                  isBookmarked ? "fill-[#FFCC00] text-[#FFCC00]" : ""
                }`}
              />
            </button>
          </div>

          {/* Form / List Content Area */}
          <div className="flex-1 px-5 sm:px-8 pb-8 space-y-4">
            {/* Search Input Bar */}
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={riderSearchQuery}
                onChange={(e) => setRiderSearchQuery(e.target.value)}
                placeholder="Search Rider"
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#161618] text-gray-900 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] transition-all shadow-2xs"
              />
              {riderSearchQuery && (
                <button
                  type="button"
                  onClick={() => setRiderSearchQuery("")}
                  className="absolute right-3.5 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4 stroke-[2]" />
                </button>
              )}
            </div>

            {/* Banner: "Earn by delivering packages" */}
            <div className="w-full rounded-2xl overflow-hidden bg-[#1c1f26] p-4 sm:p-5 flex items-center gap-4 text-white shadow-sm relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                <img
                  src={moovCourierBanner}
                  alt="Delivery Courier"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-[17px] font-bold leading-tight text-white">
                  Earn by delivering packages
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-300 mt-1 leading-relaxed font-normal">
                  Become a verified Moov rider and earn on your own schedule.
                </p>
              </div>
            </div>

            {/* Filter Tabs (Pills matching screenshot) */}
            <div className="flex items-center gap-2.5 overflow-x-auto pt-1 pb-1 no-scrollbar">
              {/* Recommended */}
              <button
                type="button"
                onClick={() => setRiderFilterTab("recommended")}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  riderFilterTab === "recommended"
                    ? "bg-[#FFF9E6] dark:bg-[#FFCC00]/15 border border-[#FFCC00] text-gray-950 dark:text-[#FFCC00] font-bold shadow-2xs"
                    : "bg-white dark:bg-[#161618] border border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                <Sparkles
                  className={`w-3.5 h-3.5 ${
                    riderFilterTab === "recommended"
                      ? "fill-[#FFCC00] text-amber-500"
                      : "text-gray-400"
                  }`}
                />
                <span>Recommended</span>
              </button>

              {/* Nearest */}
              <button
                type="button"
                onClick={() => setRiderFilterTab("nearest")}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  riderFilterTab === "nearest"
                    ? "bg-[#FFF9E6] dark:bg-[#FFCC00]/15 border border-[#FFCC00] text-gray-950 dark:text-[#FFCC00] font-bold shadow-2xs"
                    : "bg-white dark:bg-[#161618] border border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                <Navigation
                  className={`w-3.5 h-3.5 rotate-45 ${
                    riderFilterTab === "nearest"
                      ? "fill-[#FFCC00] text-amber-500"
                      : "text-gray-400"
                  }`}
                />
                <span>Nearest</span>
              </button>

              {/* Highest Rated */}
              <button
                type="button"
                onClick={() => setRiderFilterTab("highest")}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  riderFilterTab === "highest"
                    ? "bg-[#FFF9E6] dark:bg-[#FFCC00]/15 border border-[#FFCC00] text-gray-950 dark:text-[#FFCC00] font-bold shadow-2xs"
                    : "bg-white dark:bg-[#161618] border border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    riderFilterTab === "highest"
                      ? "fill-[#FFCC00] text-amber-500"
                      : "text-gray-400"
                  }`}
                />
                <span>Highest Rated</span>
              </button>
            </div>

            {/* Riders Directory List (Matching Reference Cards Exactly) */}
            <div className="space-y-3 pt-1 pb-8">
              {filteredRiders.map((rider) => {
                const isSelected = selectedRiderId === rider.id;
                return (
                  <div
                    key={rider.id}
                    className="p-4 sm:p-5 rounded-2xl transition-all bg-white dark:bg-[#161618] border border-gray-100/90 dark:border-white/5 flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Round Avatar matching screenshot */}
                      <img
                        src={rider.avatar}
                        alt={rider.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shrink-0"
                      />

                      <div className="min-w-0">
                        {/* Name + Verified Badge */}
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                            {rider.name}
                          </h4>
                          {rider.isVerified && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                        </div>

                        {/* Rating • (reviews) | ETA */}
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                          <span className="font-bold text-gray-900 dark:text-white">
                            {rider.rating}
                          </span>
                          <span>• ({rider.reviews || 251})</span>
                          <span className="text-gray-300 dark:text-gray-600 mx-0.5">|</span>
                          <span>{rider.etaMinutes} mins away</span>
                        </div>

                        {/* Available status with green dot */}
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                          <span>Available</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Select Button matching screenshot */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRiderId(rider.id);
                        setShowSelectedRiderModal(true);
                      }}
                      className={`px-5 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all cursor-pointer shrink-0 ${
                        isSelected
                          ? "bg-[#FFCC00] text-gray-950 font-bold shadow-xs"
                          : "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-[#FFCC00] hover:text-gray-950"
                      }`}
                    >
                      Select
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 6: CONFIRM DELIVERY INFO (Inline on Middle Parent Component)       */}
      {/* ========================================================================= */}
      {screen === "confirm_delivery" && (
        <div className="w-full flex-1 flex flex-col animate-in fade-in duration-200">
          {/* Top Navigation Header */}
          <div className="px-5 sm:px-8 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 dark:border-white/5">
            <button
              type="button"
              onClick={() => setScreen("choose_rider")}
              className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors cursor-pointer"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              Confirm Delivery Info
            </h1>

            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-500/10 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-500/20 dark:hover:bg-white/15 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 px-5 sm:px-8 py-6 space-y-6">
            {/* "You're in safe hands" Security Banner */}
            <div className="bg-white dark:bg-[#18181b] border border-gray-100 dark:border-white/5 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FFCC00] flex items-center justify-center text-gray-950 shrink-0 shadow-xs">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-gray-950 dark:text-white leading-tight">
                    You&apos;re in safe hands
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-[11px] sm:text-xs mt-0.5 leading-normal">
                    All packages are tracked in real-time with insurance coverage up to ₦100,000.
                  </p>
                </div>
              </div>
              <Info className="w-4 h-4 text-gray-400 shrink-0" />
            </div>

            {/* Package Summary Card */}
            <div className="rounded-3xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#161618] p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={capturedImage?.previewUrl || defaultPixelPhoto}
                  alt={packageName}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-1 ring-gray-200 dark:ring-white/10 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 dark:text-yellow-400 bg-amber-50 dark:bg-yellow-400/10 px-2 py-0.5 rounded-full inline-block mb-1">
                    {selectedCategory}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                    {packageName}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Weight: {selectedWeight ? `${selectedWeight} weight` : "Light (< 5kg)"}
                  </p>
                </div>
              </div>

              {/* Fragile Note */}
              <div className="p-3 bg-amber-50 dark:bg-white/5 rounded-xl border border-amber-200/60 dark:border-white/10 flex items-start gap-2.5 text-xs text-amber-900 dark:text-yellow-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-yellow-400" />
                <span>Note: this Item was labelled as sensitive and fragile</span>
              </div>
            </div>

            {/* Route Summary */}
            <div className="rounded-3xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#161618] p-5 sm:p-6 shadow-2xs">
              <div className="flex gap-3.5">
                <div className="flex flex-col items-center pt-1 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FFCC00]" />
                  <div className="w-[1.5px] flex-1 my-1 border-l-2 border-dashed border-gray-300 dark:border-neutral-700 min-h-[36px]" />
                  <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-neutral-600" />
                </div>
                <div className="flex-1 flex flex-col justify-between text-xs sm:text-sm">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400">PICKUP</span>
                    <p className="font-bold text-gray-900 dark:text-white">{fromLocation}</p>
                  </div>
                  <div className="pt-3">
                    <span className="text-[10px] font-bold uppercase text-gray-400">DELIVERY</span>
                    <p className="font-bold text-gray-900 dark:text-white">{toLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Rider Card */}
            {(() => {
              const rider =
                defaultRidersList.find((r) => r.id === selectedRiderId) || defaultRidersList[0];
              return (
                <div className="rounded-3xl bg-white dark:bg-[#161618] p-5 sm:p-6 shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={rider.avatar}
                      alt={rider.name}
                      className="w-12 h-12 rounded-2xl object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        ASSIGNED RIDER
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                        {rider.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {rider.rating}
                        </span>
                        <span>•</span>
                        <span>{rider.etaMinutes} mins away</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setScreen("choose_rider")}
                    className="text-xs font-bold text-amber-600 dark:text-yellow-400 hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              );
            })()}

            {/* Bottom Continue to Payment CTA */}
            <div className="pt-2 pb-6">
              <button
                type="button"
                onClick={() => setScreen("payment_method")}
                className="w-full py-4 px-5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 font-bold text-base transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
              >
                <span>Continue to Payment</span>
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 7: SELECT PAYMENT METHOD (Inline on Middle Parent Component)       */}
      {/* ========================================================================= */}
      {screen === "payment_method" && (
        <div className="w-full flex-1 flex flex-col animate-in fade-in duration-200">
          {/* Top Navigation Header */}
          <div className="px-5 sm:px-8 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 dark:border-white/5">
            <button
              type="button"
              onClick={() => setScreen("confirm_delivery")}
              className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors cursor-pointer"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
              Select Payment Method
            </h1>

            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-500/10 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-500/20 dark:hover:bg-white/15 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 px-5 sm:px-8 py-6 space-y-6">
            {/* Secure Payment Header Banner */}
            <div className="bg-white dark:bg-[#18181b] border border-gray-100 dark:border-white/5 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FFCC00] flex items-center justify-center text-gray-950 shrink-0 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-gray-950 dark:text-white leading-tight">
                    Your payment is secure
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-[11px] sm:text-xs mt-0.5 leading-normal">
                    Encrypted transactions powered by bank-grade security protocols.
                  </p>
                </div>
              </div>
              <Info className="w-4 h-4 text-gray-400 shrink-0" />
            </div>

            {/* Payment Options Stack */}
            <div className="rounded-3xl border border-gray-200/90 dark:border-white/10 overflow-hidden divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#161618] shadow-2xs">
              {/* Option 1: Moov Wallet */}
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod("wallet")}
                className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                  selectedPaymentMethod === "wallet"
                    ? "bg-amber-400/10 dark:bg-yellow-400/10"
                    : "hover:bg-gray-50/80 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFCC00]/20 text-amber-900 dark:text-yellow-300 flex items-center justify-center">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                      Moov Wallet
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Available balance: <span className="font-bold text-gray-900 dark:text-white">₦10,000</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                    selectedPaymentMethod === "wallet"
                      ? "border-[#FFCC00] bg-[#FFCC00]"
                      : "border-gray-300 dark:border-neutral-600"
                  }`}
                >
                  {selectedPaymentMethod === "wallet" && (
                    <Check className="w-3 h-3 text-gray-950 stroke-[3]" />
                  )}
                </div>
              </button>

              {/* Option 2: Debit/Credit Card */}
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod("card")}
                className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                  selectedPaymentMethod === "card"
                    ? "bg-amber-400/10 dark:bg-yellow-400/10"
                    : "hover:bg-gray-50/80 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                      Debit / Credit Card
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Mastercard ending in <span className="font-bold">4567</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                    selectedPaymentMethod === "card"
                      ? "border-[#FFCC00] bg-[#FFCC00]"
                      : "border-gray-300 dark:border-neutral-600"
                  }`}
                >
                  {selectedPaymentMethod === "card" && (
                    <Check className="w-3 h-3 text-gray-950 stroke-[3]" />
                  )}
                </div>
              </button>

              {/* Option 3: Cash on Delivery (Disabled / Coming Soon) */}
              <div className="w-full p-4 sm:p-5 flex items-center justify-between opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-400 flex items-center justify-center">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                      Cash on Delivery
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      COMING SOON
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notice Box */}
            <div className="p-3.5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
              <Info className="w-4 h-4 shrink-0 text-gray-400" />
              <span>You will only be charged after your package has been confirmed by the rider.</span>
            </div>

            {/* Total Fee Row */}
            <div className="rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#161618] p-4 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                Total Amount
              </span>
              <span className="text-xl font-bold text-gray-950 dark:text-white">
                ₦{estimatedFee}
              </span>
            </div>

            {/* Bottom Confirm Payment Method CTA */}
            <div className="pt-2 pb-6">
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="w-full py-4 px-5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 font-bold text-base transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>Confirm Payment Method (₦{estimatedFee})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 8: PACKAGE STATUS (Matches User's Screenshot Exactly)              */}
      {/* ========================================================================= */}
      {screen === "package_status" && (() => {
        const chosenRider =
          defaultRidersList.find((r) => r.id === selectedRiderId) || defaultRidersList[0];

        if (showRiderChat) {
          return (
            <div className="w-full flex-1 min-h-full h-full flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] animate-in fade-in duration-200">
              {/* Chat Header */}
              <div className="px-4 sm:px-6 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3.5 flex items-center justify-between border-b border-gray-100 dark:border-white/5 sticky top-0 bg-white/95 dark:bg-[#161618]/95 backdrop-blur-md z-20 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => setShowRiderChat(false)}
                    className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors cursor-pointer touch-manipulation shrink-0"
                    title="Back to delivery status"
                  >
                    <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
                  </button>
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-gray-200/80 dark:border-white/10">
                    <img
                      src={chosenRider.avatar || divineAvatar}
                      alt={chosenRider.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-[#161618]" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                      {chosenRider.name}
                    </h2>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5 truncate">
                      <span className="text-yellow-500 font-semibold">★ {chosenRider.rating}</span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified Rider</span>
                      <span>•</span>
                      <span>{isRiderAccepted ? "On the way" : "Pending request"}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(chosenRider.name, `Calling ${chosenRider.name}`)}
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                    title="Call rider"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRiderChat(false)}
                    className="flex px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#FFCC00] hover:bg-[#f5c400] text-gray-950 text-xs font-bold transition-all shadow-xs cursor-pointer items-center gap-1"
                    title="Back to delivery status"
                  >
                    <span className="hidden xs:inline sm:inline">Back to </span>Status
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Order Tracking Quick Banner */}
              <div className="px-4 sm:px-6 py-2.5 bg-yellow-50/80 dark:bg-yellow-400/10 border-b border-yellow-200/50 dark:border-yellow-400/20 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg">📦</span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                      {packageName || "Google pixel 9pro"}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-mono">
                      Tracking ID: MV324-H247P • {isRiderAccepted ? "IN-TRANSIT" : "PENDING"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRiderChat(false)}
                  className="text-xs font-bold text-[#b45309] dark:text-yellow-400 hover:underline cursor-pointer flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>View Status</span>
                  <span>→</span>
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/70 dark:bg-[#111113] flex flex-col gap-3.5">
                <div className="flex justify-center my-1">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium px-3 py-1 rounded-full bg-gray-200/60 dark:bg-white/5">
                    Today • 10:11 AM
                  </span>
                </div>

                {chatMessages.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 max-w-[85%] sm:max-w-[75%] ${
                        isUser ? "self-end flex-row-reverse" : "self-start"
                      } animate-in fade-in slide-in-from-bottom-1 duration-150`}
                    >
                      {!isUser && (
                        <img
                          src={chosenRider.avatar || divineAvatar}
                          alt="Rider"
                          className="w-7 h-7 rounded-full object-cover shrink-0 mt-auto border border-gray-200 dark:border-white/10"
                        />
                      )}
                      <div
                        className={`p-3.5 rounded-2xl shadow-2xs ${
                          isUser
                            ? "bg-[#FFCC00] text-gray-950 rounded-br-xs font-medium"
                            : "bg-white dark:bg-[#1c1c20] text-gray-900 dark:text-white rounded-bl-xs border border-gray-100 dark:border-white/5"
                        }`}
                      >
                        <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                        <p
                          className={`text-[9.5px] mt-1 text-right ${
                            isUser ? "text-gray-800/80" : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Suggestion Pills & Input Area */}
              <div className="p-3 sm:p-4 pb-[max(1rem,env(safe-area-inset-bottom,0.75rem))] bg-white dark:bg-[#161618] border-t border-gray-100 dark:border-white/5 shrink-0">
                {/* Horizontal Quick Pills */}
                <div className="flex gap-2 mb-2.5 overflow-x-auto pb-1 hide-scrollbar">
                  {[
                    "Call me",
                    "I'm outside waiting",
                    "What's your current ETA?",
                    "Please handle with care",
                  ].map((phrase, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(phrase)}
                      className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs whitespace-nowrap text-gray-700 dark:text-gray-300 hover:border-yellow-400 hover:bg-yellow-50/50 dark:hover:bg-yellow-400/10 transition-colors cursor-pointer shrink-0"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => copyToClipboard("Photo upload", "Photo feature")}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full shrink-0 text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
                    title="Attach photo"
                  >
                    <Camera className="w-5 h-5" />
                  </button>

                  <div className="flex-1 bg-gray-100 dark:bg-[#202024] rounded-2xl flex items-center px-4 py-2.5 border border-transparent focus-within:border-yellow-400 transition-colors">
                    <input
                      type="text"
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                      placeholder={`Message ${chosenRider.name}...`}
                      className="bg-transparent w-full focus:outline-none text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!chatInputText.trim()}
                    className="w-10 h-10 flex items-center justify-center bg-[#FFCC00] hover:bg-[#f5c400] disabled:opacity-40 disabled:hover:bg-[#FFCC00] text-gray-950 rounded-full shrink-0 transition-all cursor-pointer shadow-xs active:scale-95"
                    title="Send message"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
              </div>
            </div>
          );
        }

        return (
          <div className="w-full flex-1 flex flex-col animate-in fade-in duration-200 min-h-full h-full overflow-y-auto bg-[#fcfcfc] dark:bg-[#0c0c0e] rounded-none pb-24">
            {/* Top Hero Image with Dark Gradient & Controls (Click to expand full image) */}
            <div
              onClick={() => setShowExpandedImage(true)}
              className="relative w-full h-[320px] sm:h-[350px] bg-neutral-900 overflow-hidden shrink-0 cursor-pointer group select-none"
              title="Click to view complete full image"
            >
              <img
                src={capturedImage?.previewUrl || defaultPixelPhoto}
                alt={packageName || "Google pixel 9pro"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* Top & Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/85 pointer-events-none" />

              {/* Floating "Tap to expand" badge */}
              <div className="absolute top-16 right-4 sm:right-6 z-20 pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowExpandedImage(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white text-xs font-medium border border-white/20 shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title="Click to view complete full image"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-[11px] font-semibold">Expand photo</span>
                </button>
              </div>

              {/* Floating Top Navigation Header */}
              <div className="absolute top-0 left-0 right-0 px-4 sm:px-5 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 flex items-center justify-between z-20 pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setScreen("payment_method");
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors cursor-pointer touch-manipulation"
                  title="Go back"
                >
                  <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
                </button>

                <h1 className="text-lg font-semibold text-white tracking-tight">
                  Package Status
                </h1>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBack();
                  }}
                  className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5 stroke-[2.2]" />
                </button>
              </div>

              {/* Hero Bottom Information (Package Title, Tracking Code, Status Badge) */}
              <div className="absolute bottom-6 left-0 right-0 px-6 flex items-end justify-between z-10 pointer-events-auto">
                <div className="min-w-0 pr-3">
                  <h2 className="text-2xl font-bold text-white tracking-tight leading-tight truncate">
                    {packageName || "Google pixel 9pro"}
                  </h2>
                  <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm mt-1">
                    <span className="font-medium">MV324-H247P</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard("MV324-H247P", "Tracking Code");
                      }}
                      className="hover:text-white transition-colors cursor-pointer p-0.5"
                      title="Copy Tracking ID"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase shrink-0 ${
                    isCancelled
                      ? "bg-red-500 text-white"
                      : isRiderAccepted
                      ? "bg-[#FF6B00] text-white"
                      : "bg-[#FFCC00] text-gray-950 shadow-xs"
                  }`}
                >
                  {isCancelled ? "CANCELLED" : isRiderAccepted ? "IN-TRANSIT" : "PENDING"}
                </span>
              </div>
            </div>

            {/* White / Dark Card Body */}
            <div className="flex-1 bg-white dark:bg-[#161618] rounded-none mt-0 pt-6 pb-12 px-6 sm:px-8 relative z-10 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                {/* Condition: Rider Accepted / IN-TRANSIT (Matches Image 1 and Image 2) */}
                {isRiderAccepted ? (
                  <>
                    {/* Header with Countdown Badge (Image 1: 26:03, Image 2: 00:00) */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                          Package status
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                          Your package is on the way
                        </p>
                      </div>

                      {/* Yellow Timer Pill */}
                      <div className="px-3.5 py-1.5 rounded-xl bg-[#FFCC00] text-gray-950 font-bold text-sm sm:text-base border border-black/80 flex items-center gap-1.5 shadow-xs shrink-0">
                        <Timer className="w-4 h-4 text-gray-950 stroke-[2.5]" />
                        <span>{isPackageArrived ? "00:00" : formatTransitTime(transitCountdown)}</span>
                      </div>
                    </div>

                    {/* Timeline Stepper */}
                    <div className="space-y-0 mb-6 pl-1">
                      {/* Step 1: Rider on the way */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0 shadow-xs">
                            <Check className="w-3 h-3 text-white stroke-[3.5]" />
                          </div>
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Rider on the way
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          2:30PM
                        </span>
                      </div>

                      {/* Solid vertical connecting line */}
                      <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-700 ml-2.5 my-0.5" />

                      {/* Step 2: Package Collected */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0 shadow-xs">
                            <Check className="w-3 h-3 text-white stroke-[3.5]" />
                          </div>
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Package Collected
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          2:35PM
                        </span>
                      </div>

                      {/* Dashed vertical connecting line */}
                      <div className="w-0.5 h-6 border-l-2 border-dashed border-gray-400 dark:border-gray-600 ml-2.5 my-0.5" />

                      {/* Step 3: Package has arrived */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-900 dark:border-gray-300 flex items-center justify-center shrink-0" />
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Package has arrived
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          --
                        </span>
                      </div>
                    </div>

                    {/* Rider's Information Card */}
                    <div className="bg-gray-50/90 dark:bg-[#1f1f23] p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-white/5 space-y-3.5 mb-6">
                      <h4 className="font-bold text-base text-gray-900 dark:text-white">
                        Rider’s information
                      </h4>

                      {/* Rider Profile Row with Chat Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={chosenRider.avatar || divineAvatar}
                            alt={chosenRider.name}
                            className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-200/80 dark:border-white/10"
                          />
                          <div>
                            <h5 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                              {chosenRider.name}
                            </h5>
                            <div className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300 mt-0.5">
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold">{chosenRider.rating}</span>
                              <span className="text-gray-500">({chosenRider.reviews || 32})</span>
                            </div>
                          </div>
                        </div>

                        {/* Chat Button with Rider */}
                        <button
                          type="button"
                          onClick={() => setShowRiderChat(true)}
                          className="w-11 h-11 rounded-2xl bg-white dark:bg-[#242428] border border-gray-200/80 dark:border-white/10 flex items-center justify-center text-gray-800 dark:text-gray-200 shadow-2xs hover:bg-gray-50 dark:hover:bg-white/10 hover:border-yellow-400 transition-all cursor-pointer"
                          title="Message rider"
                        >
                          <MessageSquareText className="w-5 h-5 stroke-[1.8]" />
                        </button>
                      </div>

                      {/* Distance Slider Progress Bar */}
                      <div className="relative w-full py-2">
                        <div className="relative flex items-center w-full h-1.5 bg-transparent">
                          {/* Solid Black Track */}
                          <div
                            className="h-1.5 bg-gray-950 dark:bg-white rounded-l-full transition-all duration-500"
                            style={{ width: isPackageArrived ? "100%" : "50%" }}
                          />
                          {/* Yellow Slider Badge (1.30km) */}
                          <div
                            className="absolute top-1/2 bg-[#FFCC00] text-gray-950 font-bold text-[10.5px] px-2.5 py-0.5 rounded-full border border-black/80 shadow-xs z-10 whitespace-nowrap transition-all duration-500 flex items-center justify-center"
                            style={
                              isPackageArrived
                                ? { right: 0, transform: "translate(0, -50%)" }
                                : { left: "50%", transform: "translate(-50%, -50%)" }
                            }
                          >
                            1.30km
                          </div>
                          {/* Dashed Line Remaining Track */}
                          {!isPackageArrived && (
                            <div className="flex-1 h-0 border-b-2 border-dashed border-gray-400 dark:border-gray-500" />
                          )}
                        </div>
                      </div>

                      {/* Price Row */}
                      <div className="flex items-center justify-between text-sm pt-0.5">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Price :</span>
                        <div className="flex items-center gap-1.5 font-bold text-base text-gray-900 dark:text-white">
                          <span>₦{estimatedFee}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(`₦${estimatedFee}`, "Price")}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5"
                            title="Copy Price"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons: Package Received & Flag */}
                    <div className="flex items-center gap-3 pt-2">
                      {/* Package Received Button (Opens Drop-off Confirmation Code Modal) */}
                      <button
                        type="button"
                        onClick={() => setShowDropOffCodeModal(true)}
                        className={`flex-1 py-4 px-5 rounded-2xl font-bold text-base transition-all flex items-center justify-center cursor-pointer active:scale-[0.99] ${
                          isPackageArrived
                            ? "bg-[#FFCC00] hover:bg-[#f5c400] text-gray-950 shadow-xs"
                            : "bg-[#FFF4C7] hover:bg-[#ffefa8] text-gray-900 dark:bg-[#2c2612] dark:text-amber-100 shadow-2xs"
                        }`}
                      >
                        <span>Package Received</span>
                      </button>

                      {/* Flag / Report Issue Button */}
                      <button
                        type="button"
                        onClick={() => setShowReportModal(true)}
                        className="w-14 h-14 rounded-2xl border border-red-300/90 dark:border-red-500/40 bg-white dark:bg-transparent flex items-center justify-center text-[#ea3829] hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer transition-colors shrink-0 shadow-2xs"
                        title="Report Issue"
                      >
                        <Flag className="w-6 h-6 stroke-[2]" />
                      </button>
                    </div>

                    {/* Test helper links for demo */}
                    <div className="flex items-center justify-between text-[11px] text-gray-400 px-1 pt-3 gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setIsPackageArrived((prev) => !prev)}
                        className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline underline-offset-2 cursor-pointer"
                      >
                        Test: Toggle Arrived ({isPackageArrived ? "00:00 [Image 2]" : "26:03 [Image 1]"})
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDropOffCodeModal(true)}
                        className="text-amber-600 dark:text-amber-400 font-semibold hover:underline underline-offset-2 cursor-pointer"
                      >
                        Test: Drop-off Code (3018)
                      </button>
                      <button
                        type="button"
                        onClick={() => setScreen("success")}
                        className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline underline-offset-2 cursor-pointer"
                      >
                        Test: Success Screen
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsRiderAccepted(false)}
                        className="hover:text-gray-700 dark:hover:text-gray-300 underline underline-offset-2 cursor-pointer"
                      >
                        Test: Back to Pending State
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Condition: Pending / Waiting for rider to accept */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Package status
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {isCancelled
                          ? "This delivery has been cancelled"
                          : "Waiting for ride to accept"}
                      </p>
                    </div>

                    {/* Pickup & Drop-Off Locations */}
                    <div className="flex items-center justify-between gap-3">
                      {/* Pickup */}
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium block">
                          Pickup-Location
                        </span>
                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 truncate">
                          {fromLocation || "Ibge Road, Auchi"}
                        </p>
                      </div>

                      {/* Arrow Indicator */}
                      <div className="shrink-0 flex items-center justify-center text-gray-300 dark:text-gray-600 px-2">
                        <ChevronsRight className="w-5 h-5" />
                      </div>

                      {/* Drop-Off */}
                      <div className="flex-1 min-w-0 text-left sm:text-right">
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium block">
                          Drop-Off Location
                        </span>
                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 truncate">
                          {toLocation || "Auchi, Edo State"}
                        </p>
                      </div>
                    </div>

                    {/* Dashed Separator */}
                    <div className="border-b border-dashed border-gray-200 dark:border-white/10 my-6" />

                    {/* Rider's Information Card */}
                    <div className="bg-gray-50/90 dark:bg-[#1f1f23] p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-white/5 space-y-3.5 mb-8">
                      <h4 className="font-bold text-base text-gray-900 dark:text-white">
                        Rider’s information
                      </h4>

                      {/* Rider Profile Row with Message Button */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={chosenRider.avatar || divineAvatar}
                            alt={chosenRider.name}
                            className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-200/80 dark:border-white/10"
                          />
                          <div className="min-w-0">
                            <h5 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                              {chosenRider.name}
                            </h5>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                              <span className="truncate">#42324-FHJS44R-34R</span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard("#42324-FHJS44R-34R", "Rider ID")}
                                className="hover:text-gray-700 dark:hover:text-gray-300 p-0.5 cursor-pointer"
                                title="Copy Rider ID"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Message Icon Button */}
                        <button
                          type="button"
                          onClick={() => setShowRiderChat(true)}
                          className="w-11 h-11 rounded-2xl bg-white dark:bg-[#242428] border border-gray-200/90 dark:border-white/10 flex items-center justify-center text-gray-800 dark:text-gray-200 shadow-2xs hover:bg-gray-50 dark:hover:bg-white/10 hover:border-yellow-400 transition-all cursor-pointer shrink-0 touch-manipulation"
                          title="Message rider"
                        >
                          <MessageSquareText className="w-5 h-5 stroke-[1.8]" />
                        </button>
                      </div>

                      {/* Inner Dashed Line */}
                      <div className="border-b border-dashed border-gray-200 dark:border-white/10 pt-1" />

                      {/* Rating */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Rating :</span>
                        <div className="flex items-center gap-1 font-bold text-gray-900 dark:text-white">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{chosenRider.rating} ({chosenRider.reviews || 32})</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Price :</span>
                        <div className="flex items-center gap-1.5 font-bold text-base text-gray-900 dark:text-white">
                          <span>₦{estimatedFee}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(`₦${estimatedFee}`, "Price")}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5"
                            title="Copy Price"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions for Pending State */}
                    <div className="space-y-3 pt-2 w-full">
                      {/* 2 Buttons: Choose a new rider & Wait (stacked on mobile, side-by-side on desktop) */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                        {/* Button 1: Choose a new rider (disabled while wait counter is running, enabled when counter is 0) */}
                        <button
                          type="button"
                          disabled={countdown > 0}
                          onClick={() => setScreen("choose_rider")}
                          className={`w-full sm:flex-1 py-4 px-6 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 touch-manipulation ${
                            countdown > 0
                              ? "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200/50 dark:border-white/5 opacity-80"
                              : "bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 shadow-xs cursor-pointer"
                          }`}
                        >
                          <span>Choose a new rider</span>
                        </button>

                        {/* Button 2: Wait (clicking extends wait counter to 1m and disables choose new rider) */}
                        <button
                          type="button"
                          onClick={() => {
                            setCountdown(60); // extend wait counter to 1m
                          }}
                          className={`w-full sm:flex-1 py-4 px-6 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 touch-manipulation border ${
                            countdown > 0
                              ? "border-yellow-400/80 bg-yellow-50/70 dark:bg-yellow-400/10 text-yellow-900 dark:text-yellow-300 hover:bg-yellow-100/80 cursor-pointer shadow-2xs"
                              : "border-gray-300 dark:border-white/20 hover:border-yellow-400 hover:bg-yellow-50/50 dark:hover:bg-yellow-400/10 text-gray-800 dark:text-gray-200 cursor-pointer"
                          }`}
                          title={countdown > 0 ? "Click to reset wait counter to 1m" : "Extend wait by 1 minute"}
                        >
                          <span>
                            {countdown > 0
                              ? `Wait (${formatCountdown(countdown)})`
                              : "Wait for rider (+1m)"}
                          </span>
                        </button>
                      </div>

                      {/* Subtle Cancel Request text link */}
                      <div className="text-center pt-0.5">
                        <button
                          type="button"
                          onClick={() => setShowCancelModal(true)}
                          className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 underline underline-offset-2 cursor-pointer font-medium"
                        >
                          Cancel delivery request
                        </button>
                      </div>

                      {/* Test helper links for demo */}
                      <div className="flex items-center justify-between text-[11px] text-gray-400 px-1 pt-1 gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setCountdown(0)}
                          className="hover:text-gray-700 dark:hover:text-gray-300 underline underline-offset-2 cursor-pointer"
                        >
                          Test: Expire counter (0s)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCountdown(60)}
                          className="hover:text-gray-700 dark:hover:text-gray-300 underline underline-offset-2 cursor-pointer"
                        >
                          Test: Reset counter (1m)
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCancelModal(true)}
                          className="text-red-500 font-semibold hover:underline underline-offset-2 cursor-pointer"
                        >
                          Test: Cancel Modal
                        </button>
                        <button
                          type="button"
                          onClick={handleRiderAccept}
                          className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline underline-offset-2 cursor-pointer"
                        >
                          Test: Rider Accepts
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Cancel Confirmation Modal (Matches User's Screenshot Exactly) */}
            {showCancelModal && (
              <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full sm:max-w-md bg-white dark:bg-[#18181b] rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-8 border-t sm:border border-gray-100 dark:border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-200 text-center pb-[max(2rem,env(safe-area-inset-bottom,1.5rem))] sm:pb-8"
                >
                  {/* Pull Indicator Bar */}
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6 sm:hidden" />

                  {/* Red Circle with White X */}
                  <div className="w-20 h-20 rounded-full bg-[#ea3829] flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <X className="w-10 h-10 text-white stroke-[2.8]" />
                  </div>

                  {/* Question Heading matching user's screenshot */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-7 tracking-tight leading-snug">
                    Are u sure you want to<br />cancel this Request?
                  </h3>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3.5 w-full">
                    {/* Top Yellow Button: No Go Back */}
                    <button
                      type="button"
                      onClick={() => setShowCancelModal(false)}
                      className="w-full sm:flex-1 py-4 px-5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 font-bold text-base transition-all shadow-xs flex items-center justify-center cursor-pointer touch-manipulation"
                    >
                      <span>No Go Back</span>
                    </button>

                    {/* Bottom Red Outlined Button: Yes Continue */}
                    <button
                      type="button"
                      onClick={handleCancelDelivery}
                      className="w-full sm:flex-1 py-4 px-5 rounded-2xl border border-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-[#ea3829] font-bold text-base transition-all flex items-center justify-center cursor-pointer touch-manipulation"
                    >
                      <span>Yes Continue</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Report Issue Modal */}
            {showReportModal && (
              <div className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full sm:max-w-md bg-white dark:bg-[#18181b] rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-7 border-t sm:border border-gray-100 dark:border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-200 pb-[max(2rem,env(safe-area-inset-bottom,1.5rem))] sm:pb-7"
                >
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 sm:hidden" />
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Report an Issue</h3>
                    <button
                      type="button"
                      onClick={() => setShowReportModal(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Please select the issue you are experiencing with this delivery:
                  </p>
                  <div className="space-y-2 mb-2">
                    {[
                      "Rider is delayed / not moving",
                      "Package damaged / mishandled",
                      "Cannot reach rider via phone",
                      "Wrong delivery address",
                      "Other issue",
                    ].map((issue, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setShowReportModal(false);
                          copyToClipboard(issue, "Report submitted");
                        }}
                        className="w-full p-3 text-left rounded-xl border border-gray-200 dark:border-white/10 hover:border-yellow-400 dark:hover:border-yellow-400 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-yellow-50/50 dark:hover:bg-yellow-400/10 transition-colors cursor-pointer"
                      >
                        {issue}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Drop-off Confirmation Code Modal (Matches User's Screenshot Exactly) */}
            {showDropOffCodeModal && (
              <div className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full sm:max-w-md bg-white dark:bg-[#18181b] rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-7 border-t sm:border border-gray-100 dark:border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-200 pb-[max(2rem,env(safe-area-inset-bottom,1.5rem))] sm:pb-7 space-y-5"
                >
                  {/* Top Pull Handle */}
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto -mt-1 mb-3 sm:hidden" />

                  {/* Header Row: Box Icon with Blue Checkmark + Title & Subtitle */}
                  <div className="flex items-center gap-4">
                    {/* Yellow Box with Red Tape & Cyan Checkmark Badge (User's Exact Asset) */}
                    <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                      <img
                        src={dropOffBoxGoodMarkIcon}
                        alt="Drop-off confirmed"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight leading-tight">
                        Drop-off code
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                        give this code to the rider to allow payment release.
                      </p>
                    </div>
                  </div>

                  {/* Dark Card Container */}
                  <div className="bg-[#1c1d21] dark:bg-[#121316] rounded-[24px] p-5 sm:p-6 text-center shadow-lg">
                    <p className="text-xs sm:text-sm text-gray-300 font-medium mb-4">
                      Drop-off Confirmation code for the rider
                    </p>

                    {/* 4 Digit Boxes + Yellow Copy Button */}
                    <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                      {dropOffCode.split("").map((digit, idx) => (
                        <div
                          key={idx}
                          className="w-12 h-14 sm:w-14 sm:h-16 rounded-2xl bg-[#2e3036] flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-inner select-all"
                        >
                          {digit}
                        </div>
                      ))}

                      {/* Yellow Circular Copy / Good Mark (Check) Button */}
                      <button
                        type="button"
                        onClick={() => {
                          copyToClipboard(dropOffCode, "Confirmation code");
                          setIsCodeCopied(true);
                          setTimeout(() => setIsCodeCopied(false), 2400);
                        }}
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full active:scale-95 flex items-center justify-center text-gray-950 shadow-md cursor-pointer transition-all shrink-0 ml-1 ${
                          isCodeCopied
                            ? "bg-[#FFCC00] ring-2 ring-yellow-400/80"
                            : "bg-[#FFCC00] hover:bg-[#f5c400]"
                        }`}
                        title={isCodeCopied ? "Code Copied!" : "Copy Code"}
                      >
                        {isCodeCopied ? (
                          <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] text-gray-950 animate-in zoom-in-50 duration-150" />
                        ) : (
                          <Copy className="w-5 h-5 stroke-[2.2]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Please Note Notice Box */}
                  <div className="bg-[#F8F9FA] dark:bg-[#202125] p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex items-start gap-3">
                    <div className="w-5 h-5 text-gray-900 dark:text-white shrink-0 mt-0.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <circle cx="12" cy="10" r="1.5" />
                        <path d="M12 11.5v3.5" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                        Please Note
                      </h5>
                      <p className="text-[11.5px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                        Only give this to the rider after your package has been delivered to your preferred destination
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons: Confirm Release or Close */}
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowDropOffCodeModal(false);
                        handlePackageReceived();
                      }}
                      className="w-full py-4 px-5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 font-bold text-base transition-all shadow-xs flex items-center justify-center cursor-pointer touch-manipulation"
                    >
                      <span>Confirm & Release Payment</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDropOffCodeModal(false)}
                      className="w-full py-2.5 text-center text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* ========================================================================= */}
      {/* SCREEN 9: DELIVERY SUCCESSFUL (Matches User's Screenshot Exactly)         */}
      {/* ========================================================================= */}
      {screen === "success" && (() => {
        return (
          <div className="w-full flex-1 h-full min-h-full overflow-y-auto bg-white dark:bg-[#0c0c0e] rounded-none m-0 shadow-none relative select-none">
            {/* User's Exact Confetti Asset (Raised up to frame the badge) */}
            <div className="absolute inset-x-0 -top-6 sm:-top-8 h-72 sm:h-80 pointer-events-none overflow-hidden z-0 flex items-start justify-center">
              <img
                src={celebrationConfetti}
                alt="Celebration Confetti"
                className="w-full max-w-2xl h-full object-cover sm:object-contain object-top opacity-95 scale-105"
              />
            </div>

            <div className="w-full min-h-full flex flex-col justify-between px-6 sm:px-10 pt-6 sm:pt-8 pb-24 sm:pb-28 relative z-10 animate-in fade-in duration-300">
              {/* Top Center: Scalloped Green Badge, Pill, Title & Subtitle */}
              <div className="flex flex-col items-center text-center pt-4 sm:pt-8 shrink-0">
                {/* Large Green Scalloped Badge with Checkmark (User's Exact Asset) */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 drop-shadow-[0_12px_24px_rgba(34,197,94,0.3)] animate-in zoom-in-75 duration-300 flex items-center justify-center">
                  <img
                    src={greenSuccessBadge}
                    alt="Delivery Successful"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Payment Released Successful Pill */}
                <div className="mt-6 px-4 py-1.5 rounded-full bg-[#DCFCE7] dark:bg-[#143320] border border-[#86efac]/40 shadow-2xs">
                  <span className="text-[#15803D] dark:text-[#4ade80] text-[11px] sm:text-xs font-bold tracking-wider uppercase">
                    PAYMENT RELEASED SUCCESSFUL
                  </span>
                </div>

                {/* Congratulation */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white mt-4 tracking-tight">
                  Congratulation
                </h2>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 max-w-xs leading-relaxed">
                  Your package was delivered<br />successfully
                </p>
              </div>

              {/* Middle: Total Amount Row */}
              <div className="w-full max-w-xl mx-auto flex items-center justify-between py-6 my-6 border-t border-b border-gray-100 dark:border-white/5 shrink-0">
                <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  Total Amount
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white tracking-tight">
                  ₦{estimatedFee || "5,000"}
                </span>
              </div>

              {/* Bottom Actions: Rating Card & Go Back Home Button */}
              <div className="w-full max-w-xl mx-auto space-y-4 shrink-0">
                {/* Courier Experience Card */}
                <div className="w-full bg-[#18191d] dark:bg-[#1c1d22] text-white p-4 sm:p-4.5 rounded-2xl flex items-center gap-3.5 sm:gap-4 shadow-md">
                  {/* Courier with yellow helmet & vest */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-[#252830] border border-white/10 flex items-center justify-center">
                    <img
                      src={courierRatingAvatar}
                      alt="Dart Courier"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm sm:text-base text-white leading-snug">
                      Are you loving your experience with us so far?
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowRatingModal(true)}
                      className="text-[#FFCC00] hover:text-[#ffd633] text-xs sm:text-sm font-semibold underline underline-offset-2 cursor-pointer mt-1 inline-block text-left"
                    >
                      Give us a Rating
                    </button>
                  </div>
                </div>

                {/* Go back home CTA */}
                <button
                  type="button"
                  onClick={handleFinishSuccess}
                  className="w-full py-4 px-6 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] active:scale-[0.99] text-gray-950 font-bold text-base transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
                >
                  <span>Go back home</span>
                  <span className="text-lg leading-none font-bold">→</span>
                </button>
              </div>
            </div>

            {/* Quick Interactive Rating Modal */}
            {showRatingModal && (
              <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full sm:max-w-md bg-white dark:bg-[#18181b] rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-7 border-t sm:border border-gray-100 dark:border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-200 text-center pb-[max(2rem,env(safe-area-inset-bottom,1.5rem))] sm:pb-7 space-y-5"
                >
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto -mt-1 mb-2 sm:hidden" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Rate your experience</h3>
                    <button
                      type="button"
                      onClick={() => setShowRatingModal(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    How was your delivery service with Divine Augustina?
                  </p>
                  
                  {/* Star Rating Select */}
                  <div className="flex items-center justify-center gap-2 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-9 h-9 ${
                            star <= userRating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowRatingModal(false);
                      copyToClipboard("Thank you for your rating!", "Rating submitted");
                    }}
                    className="w-full py-3.5 rounded-2xl bg-[#FFCC00] hover:bg-[#f5c400] text-gray-950 font-bold text-sm sm:text-base transition-all shadow-xs cursor-pointer"
                  >
                    Submit Rating
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Fullscreen Expanded Package Image Modal / Lightbox */}
      {showExpandedImage && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setShowExpandedImage(false)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setShowExpandedImage(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95 shrink-0"
                title="Back to delivery status"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <div className="min-w-0">
                <h3 className="text-white font-bold text-sm sm:text-base leading-tight truncate">
                  {packageName || "Google pixel 9pro"}
                </h3>
                <p className="text-[11px] text-yellow-400 font-mono mt-0.5 truncate">
                  MV324-H247P • Complete Full Package Photo
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowExpandedImage(false)}
                className="px-3 py-1.5 rounded-xl bg-[#FFCC00] hover:bg-[#f5c400] text-gray-950 text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1 active:scale-95"
                title="Close full view"
              >
                <span>Close</span>
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Center: Full Uncropped Image Showcase */}
          <div
            className="flex-1 flex items-center justify-center p-2 sm:p-4 min-h-0 w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-full max-w-full flex items-center justify-center">
              <img
                src={capturedImage?.previewUrl || defaultPixelPhoto}
                alt={packageName || "Google pixel 9pro"}
                className="max-h-[75vh] sm:max-h-[82vh] max-w-[94vw] w-auto h-auto object-contain rounded-2xl shadow-2xl ring-1 ring-white/15 animate-in zoom-in-95 duration-200 select-none"
              />
            </div>
          </div>

          {/* Bottom Bar: Instructions / Back to Status */}
          <div
            className="flex items-center justify-between gap-3 pt-2 max-w-xl mx-auto w-full z-10 text-xs text-white/70"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="truncate">Tap outside or click Close to return</span>
            <button
              type="button"
              onClick={() => setShowExpandedImage(false)}
              className="text-yellow-400 hover:underline font-bold cursor-pointer shrink-0"
            >
              Back to Status →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
