import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Bell,
  Copy,
  Check,
  ChevronsRight,
  AlertCircle,
  Bookmark,
  Star,
  MessageSquareText,
  Phone,
  Camera,
  Send,
  Maximize2,
  X,
} from "lucide-react";
import shoeImage from "../assets/nike_air_max_shoe.jpg";

export interface DeliveryDetailsItem {
  id?: string;
  title?: string;
  trackingCode?: string;
  status?: "Delivered" | "In-Transit" | "Cancelled" | "Pending";
  image?: string;
  fromLocation?: string;
  toLocation?: string;
  date?: string;
  time?: string;
  weight?: string;
  category?: string;
  fragileNote?: string;
  rider?: {
    name: string;
    idCode: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    price: string;
    isSaved?: boolean;
  };
}

interface DeliveryDetailsProps {
  delivery?: DeliveryDetailsItem | null;
  onBack: () => void;
  onOpenNotifications?: () => void;
  onBookRiderAgain?: () => void;
}

export default function DeliveryDetails({
  delivery,
  onBack,
  onOpenNotifications,
  onBookRiderAgain,
}: DeliveryDetailsProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(delivery?.rider?.isSaved || false);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [showRiderChat, setShowRiderChat] = useState<boolean>(false);
  const [showExpandedImage, setShowExpandedImage] = useState<boolean>(false);
  const [chatInputText, setChatInputText] = useState<string>("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      sender: "rider",
      text: `Hello! I'm ${delivery?.rider?.name || "Divine Augustina"}, your delivery rider for this order.`,
      time: "10:12 AM",
    },
    {
      id: "2",
      sender: "user",
      text: "Hi! Just checking in on the delivery status.",
      time: "10:13 AM",
    },
    {
      id: "3",
      sender: "rider",
      text:
        delivery?.status === "Delivered"
          ? "The package has been delivered safely! Thank you for choosing Dart."
          : "I'm currently on my way with your package. I will notify you immediately as soon as I arrive!",
      time: "10:14 AM",
    },
  ]);

  // Defaults matching the exact reference design
  const item: DeliveryDetailsItem = {
    id: delivery?.id || "1",
    title: delivery?.title || "Nike Air Max shoe",
    trackingCode: delivery?.trackingCode || "#42324-HUD-PKG34R",
    status: delivery?.status || "Delivered",
    image: delivery?.image || shoeImage,
    fromLocation: delivery?.fromLocation || "GIG TERMINAL",
    toLocation: delivery?.toLocation || "Auchi, Edo State",
    date: delivery?.date || "Yesterday",
    time: delivery?.time || "12:47 PM",
    weight: delivery?.weight || "Medium",
    category: delivery?.category || "Clothes",
    fragileNote: delivery?.fragileNote || "Note: this Item was labelled as sensitive and fragile",
    rider: {
      name: delivery?.rider?.name || "Divine Augustina",
      idCode: delivery?.rider?.idCode || "#42324-FHJS44R-34R",
      avatar:
        delivery?.rider?.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: delivery?.rider?.rating || 4.8,
      reviewCount: delivery?.rider?.reviewCount || 32,
      price: delivery?.rider?.price || "₦5,000",
      isSaved: delivery?.rider?.isSaved ?? false,
    },
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || chatInputText;
    if (!textToSend.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    if (!customText) setChatInputText("");

    // Automated rider reply after brief delay
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "rider",
          text:
            textToSend.toLowerCase().includes("call")
              ? "Understood, I will call you right away!"
              : textToSend.toLowerCase().includes("eta") || textToSend.toLowerCase().includes("where")
              ? "I'm approximately 5 minutes away, keeping safe pace with your package."
              : "Noted! Thank you for the update, will make sure everything is handled securely.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1200);
  };

  // Close expanded image on Escape key
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

  if (showRiderChat) {
    return (
      <div className="w-full flex-1 min-h-full h-full flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] animate-in fade-in duration-200 pb-28 md:pb-16">
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
                src={item.rider?.avatar}
                alt={item.rider?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-[#161618]" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                {item.rider?.name}
              </h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5 truncate">
                <span className="text-yellow-500 font-semibold">★ {item.rider?.rating}</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified Rider</span>
                <span>•</span>
                <span>{item.status === "Delivered" ? "Delivered" : "In-Transit"}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => handleCopy(item.rider?.name || "Divine Augustina", "call")}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              title="Call rider"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowRiderChat(false)}
              className="px-3 py-1.5 rounded-xl bg-[#FFCC00] hover:bg-[#f5c400] text-gray-950 text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1"
              title="Back to delivery status"
            >
              <span>Back to Status</span>
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
                {item.title}
              </h4>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-mono truncate">
                Tracking ID: {item.trackingCode} • {item.status?.toUpperCase()}
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
              Today • {item.time || "10:11 AM"}
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
                    src={item.rider?.avatar}
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
        <div className="p-3 sm:p-4 bg-white dark:bg-[#161618] border-t border-gray-100 dark:border-white/5 shrink-0">
          {/* Horizontal Quick Pills */}
          <div className="flex gap-2 mb-2.5 overflow-x-auto pb-1 hide-scrollbar">
            {[
              "Call me",
              "I'm outside waiting",
              "What's your current ETA?",
              "Thank you for the delivery!",
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
              onClick={() => handleCopy("Photo feature", "photo")}
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
                placeholder={`Message ${item.rider?.name || "rider"}...`}
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
    <div className="w-full flex-1 flex flex-col min-h-full bg-transparent relative pb-28 md:pb-16 transition-colors">
      {/* Top Header */}
      <div className="px-5 sm:px-6 pt-[max(1rem,env(safe-area-inset-top,0px))] pb-3 sm:pb-4 flex items-center justify-between bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 dark:border-white/5">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors -ml-1 cursor-pointer touch-manipulation"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>

        <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
          Delivery information
        </h1>

        <button
          onClick={onOpenNotifications}
          className="w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-black shrink-0 shadow-xs cursor-pointer touch-manipulation transition-transform active:scale-95"
          aria-label="Notifications"
        >
          <Bell className="w-4.5 h-4.5 fill-black" />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col gap-6">
        
        {/* Package Header Card */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => setShowExpandedImage(true)}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white dark:bg-[#1a1a1d] border border-gray-100 dark:border-white/10 shrink-0 shadow-xs cursor-pointer group relative select-none"
            title="Click to expand full image"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="w-5 h-5 text-white drop-shadow-md" />
            </div>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <span
              className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider w-fit mb-1 ${
                item.status === "Delivered"
                  ? "text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-400/15"
                  : item.status === "Cancelled"
                  ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-400/15"
                  : "text-amber-700 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-400/15"
              }`}
            >
              {item.status}
            </span>

            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
              {item.title}
            </h2>

            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              <span className="truncate">{item.trackingCode}</span>
              <button
                onClick={() => handleCopy(item.trackingCode || "", "tracking")}
                className="p-1 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Copy tracking code"
              >
                {copiedKey === "tracking" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Package Information Card */}
        <div className="space-y-4 pt-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
            Package Information
          </h3>

          {/* Route Section - perfectly aligned with 2-column metadata grid below */}
          <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 items-center">
            {/* From Column */}
            <div className="flex items-center justify-between pr-1 min-w-0">
              <div className="min-w-0">
                <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white block">
                  From
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-400 uppercase tracking-wide block mt-0.5 truncate">
                  {item.fromLocation}
                </span>
              </div>
              <ChevronsRight className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0 ml-auto mr-1" />
            </div>

            {/* To Column */}
            <div className="min-w-0">
              <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white block">
                To
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-400 block mt-0.5 truncate">
                {item.toLocation}
              </span>
            </div>
          </div>

          {/* Dashed Separator */}
          <div className="border-b border-dashed border-gray-200 dark:border-white/10 my-2"></div>

          {/* Grid Metadata - identical 2-column width and alignment as From / To */}
          <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4">
            <div>
              <span className="text-sm font-bold text-gray-900 dark:text-white block">
                Date
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5 truncate">
                {item.date}
              </span>
            </div>

            <div>
              <span className="text-sm font-bold text-gray-900 dark:text-white block">
                Time
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5 truncate">
                {item.time}
              </span>
            </div>

            <div>
              <span className="text-sm font-bold text-gray-900 dark:text-white block">
                Estimated weight
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5 truncate">
                {item.weight}
              </span>
            </div>

            <div>
              <span className="text-sm font-bold text-gray-900 dark:text-white block">
                Category
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5 truncate">
                {item.category}
              </span>
            </div>
          </div>

          {/* Fragile Alert Box */}
          {item.fragileNote && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-[#161619] border border-gray-100 dark:border-white/5 text-xs text-gray-600 dark:text-gray-400 mt-2">
              <AlertCircle className="w-4 h-4 text-gray-400 shrink-0" />
              <p className="leading-snug">{item.fragileNote}</p>
            </div>
          )}
        </div>

        {/* Rider’s information Card */}
        <div className="bg-white dark:bg-[#1c1c20] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
            Rider’s information
          </h3>

          {/* Rider Profile Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={item.rider?.avatar}
                alt={item.rider?.name}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {item.rider?.name}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                  <span className="truncate">{item.rider?.idCode}</span>
                  <button
                    onClick={() => handleCopy(item.rider?.idCode || "", "riderId")}
                    className="hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer"
                    title="Copy rider code"
                  >
                    {copiedKey === "riderId" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Message Rider Button */}
              <button
                onClick={() => setShowRiderChat(true)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-yellow-50 dark:hover:bg-yellow-400/10 hover:border-yellow-400 transition-all cursor-pointer touch-manipulation shadow-2xs"
                title="Message rider"
              >
                <MessageSquareText className="w-4 h-4 stroke-[1.8]" />
              </button>

              {/* Bookmark Button */}
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors cursor-pointer touch-manipulation shrink-0 ${
                  isBookmarked
                    ? "bg-yellow-400/20 text-yellow-600 dark:text-yellow-400"
                    : "text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
                title={isBookmarked ? "Saved rider" : "Save rider"}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Dashed Separator */}
          <div className="border-b border-dashed border-gray-100 dark:border-white/10"></div>

          {/* Rating Row */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Rating :</span>
            <div className="flex items-center gap-1 font-bold text-gray-900 dark:text-white">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{item.rider?.rating}</span>
              <span className="text-gray-400 text-xs font-normal">
                ({item.rider?.reviewCount})
              </span>
            </div>
          </div>

          {/* Price Row */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Price :</span>
            <div className="flex items-center gap-1.5 font-bold text-base text-gray-900 dark:text-white">
              <span>{item.rider?.price}</span>
              <button
                onClick={() => handleCopy(item.rider?.price || "", "price")}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Copy price"
              >
                {copiedKey === "price" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Book Rider Again Action Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                setIsBooked(true);
                onBookRiderAgain?.();
                setTimeout(() => setIsBooked(false), 2500);
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-yellow-400 hover:bg-yellow-500 active:scale-[0.99] text-gray-900 font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
            >
              {isBooked ? (
                <>
                  <Check className="w-5 h-5 text-black stroke-[2.5]" />
                  <span>Rider Booking Requested!</span>
                </>
              ) : (
                <span>Book Rider Again</span>
              )}
            </button>
          </div>
        </div>

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
                title="Back to delivery information"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <div className="min-w-0">
                <h3 className="text-white font-bold text-sm sm:text-base leading-tight truncate">
                  {item.title}
                </h3>
                <p className="text-[11px] text-yellow-400 font-mono mt-0.5 truncate">
                  Tracking: {item.trackingCode} • Full Image View
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowExpandedImage(false)}
                className="px-3 py-1.5 rounded-xl bg-[#FFCC00] hover:bg-[#f5c400] text-gray-950 text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1 active:scale-95"
                title="Close"
              >
                <span>Close</span>
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Center: Full Uncropped Image */}
          <div
            className="flex-1 flex items-center justify-center p-2 sm:p-4 min-h-0 w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-full max-w-full flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-[75vh] sm:max-h-[82vh] max-w-[94vw] w-auto h-auto object-contain rounded-2xl shadow-2xl ring-1 ring-white/15 animate-in zoom-in-95 duration-200 select-none"
              />
            </div>
          </div>

          {/* Bottom Bar */}
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
              Back to Details →
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
