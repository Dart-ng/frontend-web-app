import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ActiveDeliveryCardProps {
  onClick?: () => void;
  title?: string;
  eta?: string;
  dropOffCode?: string;
  status?: string;
  origin?: string;
  destination?: string;
  duration?: string;
}

export default function ActiveDeliveryCard({
  onClick,
  title = "Google pixel 9pro",
  eta = "Delivering today: 1:30 PM",
  dropOffCode = "4725",
  status = "IN-TRANSIT",
  origin = "GIG Terminal",
  destination = "Me",
  duration = "30mins",
}: ActiveDeliveryCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(dropOffCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClick}
      className="bg-[#FFCC00] dark:bg-[#FFC700] rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden select-none touch-manipulation group w-full"
    >
      {/* Top Row: IN-TRANSIT badge & Drop-off Code */}
      <div className="flex items-start justify-between">
        <span className="bg-[#E53935] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
          {status}
        </span>

        <div className="flex flex-col items-end">
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy Drop-off Code"}
            className="bg-[#1C1C1E] hover:bg-black text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer touch-manipulation"
          >
            <span>{dropOffCode}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-gray-300 stroke-[2]" />
            )}
          </button>
          <span className="text-[10px] text-gray-900/80 font-medium tracking-tight mt-0.5">
            {copied ? "Copied to clipboard!" : "Drop-off Code"}
          </span>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="mt-1">
        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-gray-800/85 mt-0.5">
          {eta}
        </p>
      </div>

      {/* Progress Track */}
      <div className="mt-6 sm:mt-7">
        <div className="relative flex items-center w-full">
          {/* Progress Line */}
          <div className="w-full flex items-center relative">
            {/* Left portion: Solid black line */}
            <div className="w-[50%] h-[3.5px] bg-gray-950 rounded-l-full"></div>

            {/* Time Bubble Marker: Yellow pill with dark border */}
            <div className="relative -mx-1 z-10 shrink-0">
              <span className="bg-[#FFCC00] border-[1.5px] border-gray-950 text-gray-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs whitespace-nowrap">
                {duration}
              </span>
            </div>

            {/* Right portion: Dotted black line */}
            <div className="flex-1 h-[2px] border-b-[2.5px] border-dotted border-gray-950/80"></div>
          </div>
        </div>

        {/* Origin & Destination Labels */}
        <div className="flex items-center justify-between mt-2.5 text-xs font-bold text-gray-950">
          <span>{origin}</span>
          <span>{destination}</span>
        </div>
      </div>
    </div>
  );
}
