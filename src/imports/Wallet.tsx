import { useState } from "react";
import { ArrowLeft, Bell, ArrowDown, ArrowUp, Plus, ChevronRight, Filter, CheckCircle2, CreditCard, Landmark, Info } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

type View = "home" | "all_transactions" | "add_funds" | "review" | "success" | "transaction_details";

const TRANSACTIONS = [
  { id: 1, title: 'Wallet Top-up', subtitle: 'Just Now', amount: '+₦20,500', isCredit: true, dateGroup: 'Today' },
  { id: 2, title: 'Ride payment (Auchi → Iyapki)', subtitle: 'Order (Google pixel 9pro) • Today • 11:15 AM', amount: '-₦5,000', isCredit: false, dateGroup: 'Today' },
  { id: 3, title: 'Ride payment (Aviele → Iyapki)', subtitle: 'Order (Make up kits) • Aug, 18th • 11:15 AM', amount: '+₦1,500', isCredit: false, dateGroup: 'Today' },
  { id: 4, title: 'Wallet Top-up', subtitle: 'Today • 1:20 PM', amount: '+₦20,500', isCredit: true, dateGroup: 'This week' },
  { id: 5, title: 'Ride payment (Auchi → Iyapki)', subtitle: 'Order (Google pixel 9pro) • Aug 13th • 11:15 AM', amount: '-₦2,000', isCredit: false, dateGroup: 'This week' },
];

export default function Wallet({ onBack }: { onBack?: () => void } = {}) {
  const { resolvedTheme } = useTheme();
  const [view, setView] = useState<View>("home");
  const [fundsTab, setFundsTab] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("15000");
  const [paymentMethod, setPaymentMethod] = useState("bank"); // 'bank' or 'card'
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const goBack = () => {
    if (view === "all_transactions" || view === "add_funds" || view === "transaction_details") setView("home");
    else if (view === "review") setView("add_funds");
    else if (view === "success") setView("home");
    else onBack?.();
  };

  const renderHome = () => (
    <div className="flex flex-col min-h-full pb-20 md:pb-10 bg-transparent transition-colors">
      {/* Header: Dark in light mode, top to bottom gradient in dark mode */}
      <div 
        className="text-white dark:text-black px-4 sm:px-6 pt-[max(1.75rem,calc(env(safe-area-inset-top,0px)+0.75rem))] pb-6 sm:pb-8 rounded-b-[30px] sm:rounded-b-[40px] relative overflow-hidden shrink-0 transition-all shadow-sm"
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
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <button 
              type="button"
              onClick={onBack || goBack}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-colors cursor-pointer"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-white dark:text-black" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 dark:bg-black/10 hover:bg-yellow-500 dark:hover:bg-black/20 transition-colors shrink-0">
              <Bell className="w-5 h-5 text-black" />
            </button>
          </div>

          <div className="text-center mb-7 sm:mb-10">
            <p className="text-xs sm:text-sm md:text-base text-gray-400 dark:text-black/80 font-medium mb-1 sm:mb-1.5">Wallet balance</p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white dark:text-black leading-none">
              <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl mr-1 font-bold text-white dark:text-black">₦</span>20,500<span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-gray-400 dark:text-black/70 font-semibold">.00</span>
            </h2>
          </div>

          {/* Action Buttons: Dark pills with yellow icon badges */}
          <div className="flex gap-3.5 sm:gap-6 justify-center">
            <button 
              onClick={() => { setFundsTab("deposit"); setView("add_funds"); }}
              className="bg-[#242426] dark:bg-[#18181a] hover:bg-[#2e2e30] dark:hover:bg-[#232326] border border-white/10 dark:border-transparent rounded-full px-4 sm:px-7 py-2.5 sm:py-3.5 flex items-center gap-2 sm:gap-3 transition-all shadow-sm group cursor-pointer touch-manipulation"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black stroke-[2.5]" />
              </div>
              <span className="font-semibold text-xs sm:text-base text-white">Add funds</span>
            </button>
            
            <button 
              onClick={() => { setFundsTab("withdraw"); setView("add_funds"); }}
              className="bg-[#242426] dark:bg-[#18181a] hover:bg-[#2e2e30] dark:hover:bg-[#232326] border border-white/10 dark:border-transparent rounded-full px-4 sm:px-7 py-2.5 sm:py-3.5 flex items-center gap-2 sm:gap-3 transition-all shadow-sm group cursor-pointer touch-manipulation"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black stroke-[2.5]" />
              </div>
              <span className="font-semibold text-xs sm:text-base text-white">Withdraw</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-3 sm:px-5 pt-3.5 pb-5 sm:py-6">
        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
          <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Recent Transactions</h3>
          <button 
            onClick={() => setView("all_transactions")} 
            className="text-xs sm:text-sm font-medium text-gray-500 dark:text-white underline decoration-gray-300 dark:decoration-white underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer"
          >
            See all
          </button>
        </div>
        
        <p className="text-[11px] sm:text-xs font-semibold text-gray-400 dark:text-gray-400 mb-2 sm:mb-2.5 uppercase tracking-wider">Today</p>
        
        {/* Grouped Card for Transactions matching dark screenshot */}
        <div className="bg-white dark:bg-[#1e1e20] border border-gray-100 dark:border-white/5 rounded-2xl p-3 sm:p-4 divide-y divide-gray-50 dark:divide-white/5 shadow-xs">
          {TRANSACTIONS.filter(t => t.dateGroup === 'Today').map((tx) => (
            <div 
              key={tx.id} 
              onClick={() => { setSelectedTx(tx); setView("transaction_details"); }} 
              className="flex items-center justify-between cursor-pointer group py-3 first:pt-0.5 last:pb-0.5"
            >
              <div className="flex gap-3 items-center">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
                  tx.isCredit 
                    ? 'bg-green-50 dark:bg-emerald-950/40 text-green-600 dark:text-emerald-400 border border-green-100 dark:border-emerald-500/20' 
                    : 'bg-red-50 dark:bg-rose-950/40 text-red-500 dark:text-rose-400 border border-red-100 dark:border-rose-500/20'
                }`}>
                  {tx.isCredit ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    {tx.title}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {tx.subtitle}
                  </span>
                </div>
              </div>
              <span className={`font-bold text-sm ${
                tx.isCredit 
                  ? 'text-green-600 dark:text-emerald-400' 
                  : 'text-red-500 dark:text-rose-400'
              }`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">No more earnings to show</p>
        </div>
      </div>
    </div>
  );

  const renderAllTransactions = () => (
    <div className="flex flex-col min-h-full bg-transparent transition-colors">
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-gray-100 dark:border-white/5 sticky top-0 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md z-10">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>
        <h1 className="text-base font-semibold text-gray-900 dark:text-white">All Earnings</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="px-3 sm:px-5 py-4 sm:py-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-base">All Transactions</h2>
        
        {['Today', 'This week'].map(group => (
          <div key={group} className="mb-6 sm:mb-8 last:mb-0">
            <p className="text-[11px] sm:text-xs font-semibold text-gray-400 dark:text-gray-400 mb-2 sm:mb-2.5 uppercase tracking-wider">{group}</p>
            <div className="bg-white dark:bg-[#1e1e20] border border-gray-100 dark:border-white/5 rounded-2xl p-3 sm:p-4 divide-y divide-gray-50 dark:divide-white/5 shadow-xs">
              {TRANSACTIONS.filter(t => t.dateGroup === group).map((tx) => (
                <div 
                  key={tx.id} 
                  onClick={() => { setSelectedTx(tx); setView("transaction_details"); }} 
                  className="flex items-center justify-between cursor-pointer group py-3 first:pt-0.5 last:pb-0.5"
                >
                  <div className="flex gap-3 items-center">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
                      tx.isCredit 
                        ? 'bg-green-50 dark:bg-emerald-950/40 text-green-600 dark:text-emerald-400 border border-green-100 dark:border-emerald-500/20' 
                        : 'bg-red-50 dark:bg-rose-950/40 text-red-500 dark:text-rose-400 border border-red-100 dark:border-rose-500/20'
                    }`}>
                      {tx.isCredit ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                        {tx.title}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{tx.subtitle}</span>
                    </div>
                  </div>
                  <span className={`font-bold text-sm ${
                    tx.isCredit 
                      ? 'text-green-600 dark:text-emerald-400' 
                      : 'text-red-500 dark:text-rose-400'
                  }`}>
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">No more earnings to show</p>
        </div>
      </div>
    </div>
  );

  const isWithdraw = fundsTab === "withdraw";
  const numAmount = Number(amount || 0);
  const exceedsBalance = isWithdraw && numAmount > 20500;
  const isAmountValid = numAmount > 0 && (!isWithdraw || numAmount <= 20500);

  const renderAddFunds = () => (
    <div className="flex flex-col min-h-full bg-transparent transition-colors">
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md z-10 border-b border-gray-100 dark:border-white/5">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>
        <h1 className="text-base font-semibold text-gray-900 dark:text-white absolute left-1/2 -translate-x-1/2">
          {fundsTab === "deposit" ? "Add funds" : "Withdraw funds"}
        </h1>
      </div>

      <div className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col flex-1">
        
        {/* Toggle */}
        <div className="bg-gray-100 dark:bg-[#1f1f23] p-1 rounded-full flex mb-6 sm:mb-8 w-full max-w-xs mx-auto border border-gray-100 dark:border-white/5">
          <button 
            onClick={() => setFundsTab("deposit")}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer touch-manipulation ${
              fundsTab === "deposit"
                ? "bg-yellow-400 text-black shadow-sm font-bold"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Deposit
          </button>
          <button 
            onClick={() => setFundsTab("withdraw")}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all cursor-pointer touch-manipulation ${
              fundsTab === "withdraw"
                ? "bg-yellow-400 text-black shadow-sm font-bold"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Withdraw
          </button>
        </div>

        {/* Available balance badge when in withdraw mode */}
        {fundsTab === "withdraw" && (
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
              Available balance: <strong className="text-gray-900 dark:text-white font-bold">₦20,500.00</strong>
            </span>
            <button 
              onClick={() => setAmount("20500")}
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black transition-colors cursor-pointer shadow-2xs"
            >
              Use Max
            </button>
          </div>
        )}

        <div className="text-center mb-6 sm:mb-8 w-full px-2">
          <div className="inline-flex items-center justify-center font-extrabold text-gray-900 dark:text-white tracking-tight">
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mr-1 sm:mr-2 select-none shrink-0">
              ₦
            </span>
            <input 
              type="text" 
              inputMode="numeric"
              pattern="[0-9]*"
              value={amount ? Number(amount).toLocaleString() : ""} 
              placeholder="0"
              onChange={e => {
                const raw = e.target.value.replace(/[^0-9]/g, '');
                setAmount(raw);
              }}
              style={{
                width: `${Math.max(2, (amount ? Number(amount).toLocaleString().length : 1) + 0.5)}ch`,
                maxWidth: '75vw'
              }}
              className="bg-transparent outline-none text-left font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 dark:text-white caret-yellow-400 placeholder:text-gray-300 dark:placeholder:text-gray-600 transition-all shrink-0"
            />
          </div>
          {exceedsBalance && (
            <p className="text-xs text-rose-500 font-medium mt-2">Amount exceeds your available balance of ₦20,500.00</p>
          )}
        </div>

        {/* Quick Chips */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
          {(fundsTab === "deposit" 
            ? ["2,500", "5,000", "9,000", "15,000"] 
            : ["2,500", "5,000", "10,000", "20,500"]
          ).map((val) => {
            const numVal = val.replace(/,/g, '');
            return (
              <button 
                key={val} 
                onClick={() => setAmount(numVal)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors border cursor-pointer touch-manipulation ${
                  amount === numVal 
                    ? 'bg-yellow-400 border-yellow-400 text-black shadow-xs font-bold' 
                    : 'bg-white dark:bg-[#202024] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-yellow-400'
                }`}
              >
                ₦{val}
              </button>
            );
          })}
        </div>

        {/* Payment / Payout Methods */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider px-1">
            {fundsTab === "deposit" ? "Payment method" : "Withdrawal destination"}
          </p>
          <button 
            onClick={() => setPaymentMethod("bank")}
            className={`p-4 rounded-2xl flex items-center justify-between border transition-all cursor-pointer ${
              paymentMethod === "bank" 
                ? "bg-yellow-50 dark:bg-yellow-400/10 border-yellow-400" 
                : "bg-white dark:bg-[#1f1f23] border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#28282d] flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10">
                <Landmark className="w-5 h-5 text-gray-800 dark:text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-sm text-gray-900 dark:text-white">
                  {fundsTab === "deposit" ? "Bank Transfer" : "Access Bank (Default)"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {fundsTab === "deposit" ? "Transfer from your bank" : "•••• 9185 • Hudeen Danesi"}
                </span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "bank" ? "border-yellow-400" : "border-gray-300 dark:border-gray-600"}`}>
              {paymentMethod === "bank" && <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>}
            </div>
          </button>

          <button 
            onClick={() => setPaymentMethod("card")}
            className={`p-4 rounded-2xl flex items-center justify-between border transition-all cursor-pointer ${
              paymentMethod === "card" 
                ? "bg-yellow-50 dark:bg-yellow-400/10 border-yellow-400" 
                : "bg-white dark:bg-[#1f1f23] border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#28282d] flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10">
                <CreditCard className="w-5 h-5 text-gray-800 dark:text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-sm text-gray-900 dark:text-white">
                  {fundsTab === "deposit" ? "Debit/Credit card" : "Dart P2P Payout"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {fundsTab === "deposit" ? "**** **** **** 4567" : "Instant settlement via verified agent"}
                </span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-yellow-400" : "border-gray-300 dark:border-gray-600"}`}>
              {paymentMethod === "card" && <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>}
            </div>
          </button>
        </div>

        <div className="mt-auto pt-6 pb-4">
          <button 
            disabled={!isAmountValid}
            onClick={() => setView("review")}
            className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isAmountValid
                ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-sm"
                : "bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }`}
          >
            {fundsTab === "deposit" ? "Continue to Deposit" : "Continue to Withdraw"} <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderReviewDetails = () => (
    <div className="flex flex-col min-h-full bg-transparent transition-colors">
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md z-10 border-b border-gray-50 dark:border-white/5">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>
        <h1 className="text-base font-semibold text-gray-900 dark:text-white absolute left-1/2 -translate-x-1/2">
          {fundsTab === "deposit" ? "Review deposit" : "Review withdrawal"}
        </h1>
      </div>

      <div className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col flex-1">
        
        <div className="bg-gray-50 dark:bg-[#1f1f23] rounded-2xl p-4 border border-gray-100 dark:border-white/5 mb-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {fundsTab === "deposit" ? "Payment Method" : "Destination Account"}
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {fundsTab === "deposit" 
                ? (paymentMethod === "bank" ? "Bank Transfer" : "Debit/Credit card")
                : (paymentMethod === "bank" ? "Access Bank •••• 9185" : "Dart P2P Payout")
              }
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Amount</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">₦{Number(amount || 0).toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {fundsTab === "deposit" ? "Transfer fee" : "Withdrawal fee"}
            </span>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">Free</span>
          </div>
          <div className="h-px w-full bg-gray-200 dark:bg-white/10"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-900 dark:text-white font-medium">Total</span>
            <span className="text-base font-bold text-gray-900 dark:text-white">₦{Number(amount || 0).toLocaleString()}.00</span>
          </div>
        </div>

        <div className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-xs bg-gray-50 dark:bg-[#1f1f23] p-3 rounded-lg mb-6 border border-gray-100 dark:border-white/5">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-yellow-500 dark:text-yellow-400" />
          <p>
            {fundsTab === "deposit" 
              ? "Make the transfer to the account details below using the exact amount above."
              : "Funds will be credited directly to your registered bank account within a few minutes."}
          </p>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          {fundsTab === "deposit" ? "Deposit Account Details" : "Payout Account Details"}
        </h3>
        
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Bank Name</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Access Bank</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Account Name</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {fundsTab === "deposit" ? "Dart Technologies LLC" : "Hudeen Danesi"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Account Number</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {fundsTab === "deposit" ? "7031013632" : "0123459185"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 pb-4 flex flex-col sm:flex-row items-center gap-3 w-full">
          <button 
            onClick={() => setView("success")}
            className="w-full sm:flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {fundsTab === "deposit" ? "I have made the transfer" : "Confirm withdrawal"}
          </button>
          <button onClick={() => setView("home")} className="w-full sm:flex-1 text-gray-500 dark:text-gray-400 font-semibold py-4 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer text-center">
            Cancel Transaction
          </button>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex flex-col min-h-full bg-transparent transition-colors">
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md z-10 border-b border-gray-100 dark:border-white/5">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>
        <h1 className="text-base font-semibold text-gray-900 dark:text-white absolute left-1/2 -translate-x-1/2">
          {fundsTab === "deposit" ? "Deposit status" : "Withdrawal status"}
        </h1>
      </div>

      <div className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col flex-1 items-center justify-center">
        
        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_#10b981_3px,_transparent_3px)] bg-[length:16px_16px] opacity-20 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="bg-green-500 rounded-3xl p-6 relative z-10 rotate-3 shadow-lg shadow-green-500/20">
            <CheckCircle2 className="w-12 h-12 text-white -rotate-3" />
          </div>
        </div>

        <span className="bg-green-100 dark:bg-green-400/10 text-green-700 dark:text-green-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
          {fundsTab === "deposit" ? "DEPOSIT SUCCESSFUL" : "WITHDRAWAL SUCCESSFUL"}
        </span>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          {fundsTab === "deposit" ? "Funds Added Successfully!" : "Withdrawal Processed!"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-10 max-w-xs">
          {fundsTab === "deposit"
            ? `₦${Number(amount || 0).toLocaleString()} has been added to your dart wallet.`
            : `₦${Number(amount || 0).toLocaleString()} has been transferred to your Access Bank account.`}
        </p>

        <div className="w-full flex flex-col gap-4 bg-gray-50 dark:bg-[#1f1f23] p-5 rounded-2xl border border-gray-100 dark:border-white/5 mb-10">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {fundsTab === "deposit" ? "Amount Added" : "Amount Withdrawn"}
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">₦{Number(amount || 0).toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Reference ID</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">TXN-23457A</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Date & Time</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">16-08-2026 | 09:41 AM</span>
          </div>
          <div className="h-px w-full bg-gray-200 dark:bg-white/10"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-900 dark:text-white font-medium">New Balance</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              ₦{(fundsTab === "deposit" ? 20500 + Number(amount || 0) : Math.max(0, 20500 - Number(amount || 0))).toLocaleString()}.00
            </span>
          </div>
        </div>

        <div className="mt-auto w-full pt-6 pb-4 flex flex-col sm:flex-row items-center gap-3">
          <button 
            onClick={() => setView("home")}
            className="w-full sm:flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            Back to Wallet
          </button>
          <button onClick={() => setView("all_transactions")} className="w-full sm:flex-1 text-gray-500 dark:text-gray-400 font-semibold py-4 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer text-center">
            View Transaction History
          </button>
        </div>
      </div>
    </div>
  );

  const renderTransactionDetails = () => (
    <div className="flex flex-col min-h-full bg-transparent transition-colors">
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 bg-[#fcfcfc]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md z-10 border-b border-gray-50 dark:border-white/5">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>
        <h1 className="text-base font-semibold text-gray-900 dark:text-white absolute left-1/2 -translate-x-1/2">Transaction details</h1>
      </div>

      <div className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col flex-1 items-center">
        
        <div className="bg-green-500 rounded-3xl p-5 mb-4 shadow-lg shadow-green-500/20">
           <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        <span className="bg-green-100 dark:bg-green-400/10 text-green-700 dark:text-green-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
          TRANSACTION SUCCESSFUL
        </span>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">From Hudeen Danesi</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-10 max-w-[200px] leading-relaxed">
          {selectedTx?.amount} Deposit from Access Bank (Bank Transfer)
        </p>

        <div className="w-full flex flex-col gap-5 border-t border-gray-100 dark:border-white/10 pt-6 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Amount Added</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{selectedTx?.amount}.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Bank Name</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Access Bank</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Reference ID</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">TXN-23457A</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Transfer fee</span>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">Free</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Date & Time</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">16-08-2026 | 09:41 AM</span>
          </div>
        </div>

        <div className="mt-auto w-full pt-6 pb-4">
          <button 
            onClick={() => setView("home")}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl transition-colors"
          >
            Back to Wallet
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex-1 flex flex-col min-h-full bg-transparent relative transition-colors">
      {/* Container for Desktop Centering: Expanded width */}
      <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col min-h-full bg-transparent border-0 md:border-x border-gray-200/70 dark:border-white/5 relative pb-12 transition-colors">
        {view === "home" && renderHome()}
        {view === "all_transactions" && renderAllTransactions()}
        {view === "add_funds" && renderAddFunds()}
        {view === "review" && renderReviewDetails()}
        {view === "success" && renderSuccess()}
        {view === "transaction_details" && renderTransactionDetails()}
      </div>
    </div>
  );
}
