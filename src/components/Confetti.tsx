import React from "react";

export default function Confetti({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes confettiFloatA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(3deg); }
        }
        @keyframes confettiFloatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-3deg); }
        }
        .confetti-group-a { animation: confettiFloatA 4s ease-in-out infinite; }
        .confetti-group-b { animation: confettiFloatB 5s ease-in-out infinite; }
      `}</style>

      {/* LEFT SIDE CONFETTI */}
      <g className="confetti-group-a">
        {/* Curled Ribbons */}
        <path
          d="M 28 8 Q 44 38 24 68 Q 12 98 32 128"
          stroke="#EC4899"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 58 22 Q 78 48 64 78 Q 48 108 68 138"
          stroke="#06B6D4"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 86 78 Q 72 98 86 122"
          stroke="#10B981"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Floating Confetti Shapes */}
        <rect x="18" y="32" width="8" height="5" rx="1.2" fill="#3B82F6" transform="rotate(25 18 32)" />
        <rect x="52" y="12" width="7" height="4" rx="1" fill="#10B981" transform="rotate(-15 52 12)" />
        <rect x="76" y="42" width="6" height="4" rx="1" fill="#F59E0B" transform="rotate(40 76 42)" />
        <rect x="22" y="78" width="7" height="5" rx="1.2" fill="#8B5CF6" transform="rotate(-30 22 78)" />
        <rect x="44" y="108" width="8" height="4" rx="1" fill="#EF4444" transform="rotate(20 44 108)" />
        <rect x="82" y="128" width="6" height="5" rx="1" fill="#06B6D4" transform="rotate(-45 82 128)" />
        <rect x="14" y="142" width="7" height="4" rx="1" fill="#FBBF24" transform="rotate(15 14 142)" />
        <rect x="66" y="168" width="8" height="5" rx="1.2" fill="#EC4899" transform="rotate(-20 66 168)" />
        <rect x="34" y="192" width="6" height="4" rx="1" fill="#10B981" transform="rotate(35 34 192)" />
        <rect x="92" y="182" width="7" height="4" rx="1" fill="#3B82F6" transform="rotate(-10 92 182)" />

        {/* Small Spark Dots */}
        <circle cx="36" cy="52" r="2.2" fill="#F59E0B" />
        <circle cx="68" cy="28" r="1.8" fill="#EC4899" />
        <circle cx="16" cy="112" r="2" fill="#10B981" />
        <circle cx="86" cy="92" r="1.6" fill="#3B82F6" />
        <circle cx="52" cy="148" r="2" fill="#8B5CF6" />
        <circle cx="76" cy="208" r="1.8" fill="#F59E0B" />
      </g>

      {/* RIGHT SIDE CONFETTI */}
      <g className="confetti-group-b">
        {/* Curled Ribbons */}
        <path
          d="M 388 16 Q 372 46 392 82 Q 402 118 382 148"
          stroke="#EF4444"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 354 38 Q 370 68 354 98 Q 338 128 358 158"
          stroke="#F59E0B"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 396 108 Q 410 134 400 162"
          stroke="#14B8A6"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Floating Confetti Shapes */}
        <rect x="400" y="24" width="8" height="5" rx="1.2" fill="#10B981" transform="rotate(-35 400 24)" />
        <rect x="364" y="14" width="7" height="4" rx="1" fill="#EC4899" transform="rotate(20 364 14)" />
        <rect x="338" y="52" width="6" height="4" rx="1" fill="#06B6D4" transform="rotate(-15 338 52)" />
        <rect x="404" y="74" width="7" height="5" rx="1.2" fill="#F59E0B" transform="rotate(45 404 74)" />
        <rect x="372" y="102" width="8" height="4" rx="1" fill="#3B82F6" transform="rotate(-25 372 102)" />
        <rect x="332" y="132" width="6" height="5" rx="1" fill="#EF4444" transform="rotate(30 332 132)" />
        <rect x="388" y="142" width="7" height="4" rx="1" fill="#8B5CF6" transform="rotate(-40 388 142)" />
        <rect x="356" y="178" width="8" height="5" rx="1.2" fill="#10B981" transform="rotate(15 356 178)" />
        <rect x="398" y="198" width="6" height="4" rx="1" fill="#F59E0B" transform="rotate(-30 398 198)" />
        <rect x="322" y="168" width="7" height="4" rx="1" fill="#EC4899" transform="rotate(25 322 168)" />

        {/* Small Spark Dots */}
        <circle cx="384" cy="58" r="2.2" fill="#06B6D4" />
        <circle cx="348" cy="32" r="1.8" fill="#EF4444" />
        <circle cx="408" cy="118" r="2" fill="#F59E0B" />
        <circle cx="328" cy="92" r="1.6" fill="#10B981" />
        <circle cx="378" cy="162" r="2" fill="#EC4899" />
        <circle cx="342" cy="208" r="1.8" fill="#3B82F6" />
      </g>
    </svg>
  );
}
