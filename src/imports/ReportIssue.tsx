import React, { useState } from "react";
import { ArrowLeft, Check, CheckCircle2 } from "lucide-react";

interface ReportIssueProps {
  onBack: () => void;
  onSubmitSuccess?: () => void;
}

const CATEGORIES = [
  "Booking a delivery",
  "Payment Issues",
  "Rider behaviour",
  "Package not delivered",
  "Account issue",
  "Other issue",
];

export default function ReportIssue({ onBack, onSubmitSuccess }: ReportIssueProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Booking a delivery");
  const [description, setDescription] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please describe your issue before submitting.");
      return;
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full flex-1 flex flex-col min-h-full bg-transparent relative pb-12 transition-colors">
        <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-gray-100 dark:border-white/5 sticky top-0 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-sm z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-800 dark:text-white transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Report submitted</h1>
          <div className="w-10" />
        </div>

        <div className="flex-1 px-3.5 sm:px-8 py-8 sm:py-12 max-w-xl mx-auto w-full flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Issue Reported</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-8">
            Thank you for bringing this to our attention. Our support team has received your ticket and will respond via email within 24 hours.
          </p>
          <button
            onClick={onSubmitSuccess || onBack}
            className="w-full max-w-sm py-4 rounded-xl bg-[#FFCC00] hover:bg-[#f5a623] text-gray-950 font-bold text-base transition-all duration-200 cursor-pointer shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col min-h-full bg-transparent relative pb-12 transition-colors">
      {/* Top Header */}
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-gray-100 dark:border-white/5 sticky top-0 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-sm z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-800 dark:text-white transition-colors cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Report and issue</h1>
        <div className="w-10" />
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-3.5 sm:px-8 py-5 sm:py-6 max-w-xl mx-auto w-full flex flex-col gap-6">
        {/* Section: Category Selection */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
            What's the issue about?
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
            Please select a category
          </p>

          <div className="bg-white dark:bg-[#1c1c20] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden divide-y divide-gray-50 dark:divide-white/5 transition-colors">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <label
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Radio circle */}
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-[#FFCC00] bg-[#FFCC00]"
                          : "border-gray-300 dark:border-gray-600 bg-transparent"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {cat}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section: Tell us more */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Tell us more</h3>
          <div className="relative">
            <textarea
              rows={4}
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue in detail ..."
              className="w-full p-4 bg-white dark:bg-[#1c1c20] border border-gray-100 dark:border-white/10 rounded-2xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] transition-all resize-none"
            />
            <div className="absolute bottom-3 right-4 text-[11px] text-gray-400">
              {description.length}/500
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl sm:rounded-2xl bg-[#FFCC00] hover:bg-[#f5a623] text-gray-950 font-bold text-base transition-all duration-200 mt-2 shadow-sm active:scale-[0.99] cursor-pointer"
        >
          Submit report
        </button>
      </form>
    </div>
  );
}
