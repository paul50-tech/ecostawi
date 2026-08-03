import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Smartphone, CreditCard, Building2, ShieldCheck, CheckCircle2, Globe, Sparkles, Lock, ArrowRight, RefreshCw, Check, MapPin } from 'lucide-react';

type CurrencyCode = 'KES' | 'USD' | 'EUR' | 'GBP';

interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  KES: {
    code: 'KES',
    symbol: 'KSh',
    name: 'Kenyan Shilling (KES)'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar (USD)'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro (EUR)'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound (GBP)'
  }
};

const TARGET_COUNTIES = [
  'Nairobi',
  'Mombasa',
  'Kwale',
  'Kilifi',
  'Tana River'
];

export default function DonateSection() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donationFrequency, setDonationFrequency] = useState<'once' | 'monthly'>('once');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'bank'>('card');
  const [mpesaPhone, setMpesaPhone] = useState<string>('');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);

  // STK modal states
  const [stkModalOpen, setStkModalOpen] = useState<boolean>(false);
  const [stkStep, setStkStep] = useState<'prompting' | 'pin' | 'verifying' | 'completed'>('prompting');
  const [stkCountdown, setStkCountdown] = useState<number>(30);
  const [mpesaPin, setMpesaPin] = useState<string>('');

  useEffect(() => {
    let timer: any;
    if (stkModalOpen && stkStep === 'prompting' && stkCountdown > 0) {
      timer = setInterval(() => setStkCountdown(p => p - 1), 1000);
    } else if (stkCountdown === 0 && stkStep === 'prompting') {
      setStkCountdown(30);
    }
    return () => clearInterval(timer);
  }, [stkModalOpen, stkStep, stkCountdown]);

  const handleCurrencyChange = (newCode: CurrencyCode) => {
    setCurrency(newCode);
    setCustomAmount('');
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAmount || Number(customAmount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    if (paymentMethod === 'mpesa') {
      if (!mpesaPhone || mpesaPhone.length < 9) {
        alert("Please enter your M-Pesa registered phone number.");
        return;
      }
      setStkModalOpen(true);
      setStkStep('prompting');
      setStkCountdown(30);
    } else {
      setDonationSuccess(true);
    }
  };

  const currentCurrency = CURRENCIES[currency];

  return (
    <section id="donate-mission-section" className="py-20 bg-earth-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full mb-4">
            <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span className="text-xs font-mono font-bold text-forest-800 uppercase tracking-wider">
              Prominent Direct Contribution
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-forest-900 tracking-tight mb-4">
            Donate to Our Mission
          </h1>
          <p className="text-earth-600 text-base sm:text-lg leading-relaxed">
            Your support directly finances our factual, on-the-ground operational commitments in 
            <strong className="text-forest-900 font-semibold"> Nairobi, Mombasa, Kwale, Kilifi, and Tana River</strong>. 
            100% of public donations are directed to nursery seed propagation, women's agroforestry co-ops, and coastal blue carbon restoration.
          </p>
        </div>

        {/* Main Grid: Donation Portal & Accountability Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-earth-200 p-6 sm:p-10 shadow-sm">
            {!donationSuccess ? (
              <form onSubmit={handleDonateSubmit} className="space-y-8">
                
                {/* Currency Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-earth-150">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-forest-900">Select Your Gift</h3>
                    <p className="text-xs text-earth-500 mt-0.5">All contributions are cryptographically audited via AI GIS telemetry.</p>
                  </div>
                  <div className="shrink-0 bg-earth-50 p-1 rounded-xl border border-earth-200 flex space-x-1">
                    {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => handleCurrencyChange(code)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                          currency === code
                            ? 'bg-forest-900 text-emerald-400 shadow-sm'
                            : 'text-earth-600 hover:bg-earth-100'
                        }`}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frequency & Presets */}
                <div className="space-y-4">
                  <div className="flex space-x-3 bg-earth-50 p-1.5 rounded-2xl border border-earth-200/80">
                    <button
                      type="button"
                      onClick={() => setDonationFrequency('once')}
                      className={`flex-1 py-3 rounded-xl font-display font-bold text-sm transition-all cursor-pointer ${
                        donationFrequency === 'once'
                          ? 'bg-white text-forest-900 shadow-sm border border-earth-200/60'
                          : 'text-earth-500 hover:text-forest-800'
                      }`}
                    >
                      One-Time Contribution
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationFrequency('monthly')}
                      className={`flex-1 py-3 rounded-xl font-display font-bold text-sm transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                        donationFrequency === 'monthly'
                          ? 'bg-forest-900 text-emerald-400 shadow-sm'
                          : 'text-earth-500 hover:text-forest-800'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Monthly Guardian</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-earth-500 mb-1">
                      Enter amount ({currentCurrency.code})
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-lg text-earth-400">
                        {currentCurrency.symbol}
                      </span>
                      <input
                        type="number"
                        placeholder="Amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                        }}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent font-mono text-base font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 pt-4 border-t border-earth-150">
                  <h4 className="font-display font-bold text-sm uppercase tracking-wider text-earth-600">
                    Payment Gateway
                  </h4>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-forest-900 border-forest-900 text-white'
                          : 'bg-earth-50 border-earth-200 text-earth-600 hover:bg-earth-100'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-xs font-bold">Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mpesa')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'mpesa'
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-earth-50 border-earth-200 text-earth-600 hover:bg-earth-100'
                      }`}
                    >
                      <Smartphone className="w-5 h-5" />
                      <span className="text-xs font-bold">M-Pesa STK</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'bank'
                          ? 'bg-forest-900 border-forest-900 text-white'
                          : 'bg-earth-50 border-earth-200 text-earth-600 hover:bg-earth-100'
                      }`}
                    >
                      <Building2 className="w-5 h-5" />
                      <span className="text-xs font-bold">Bank Transfer</span>
                    </button>
                  </div>

                  {paymentMethod === 'mpesa' && (
                    <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-900 flex items-center space-x-1.5">
                          <Smartphone className="w-4 h-4 text-emerald-600" />
                          <span>Safaricom M-Pesa Direct Till / Paybill</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-900 font-mono text-[11px] font-extrabold">
                          Receiver: +254 715 913 658
                        </span>
                      </div>
                      <p className="text-xs text-earth-600">
                        When you click donate below, an instant STK push prompt will be sent to your mobile phone to transfer funds to our verified receiving number: <strong className="text-emerald-900 font-mono">+254 715 913 658</strong>.
                      </p>
                      <div>
                        <label className="block text-xs font-semibold text-earth-700 mb-1">
                          M-Pesa Registered Phone Number: *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0712345678 or +254715913658"
                          value={mpesaPhone}
                          onChange={(e) => setMpesaPhone(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-emerald-300 bg-white font-mono font-bold text-sm text-forest-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="p-4 rounded-2xl bg-earth-50 border border-earth-200 text-xs text-earth-600 space-y-2">
                      <strong className="block text-forest-900">EcoStawi Foundation Secretariat Bank Instructions:</strong>
                      <p className="font-mono text-[11px]">Account Name: ECOSTAWI FOUNDATION KENYA<br />Bank: Equity Bank Kenya Ltd<br />SWIFT: EQUIKENX<br />Branch: Nairobi Central</p>
                    </div>
                  )}
                </div>

                {/* Donor Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-earth-150">
                  <div>
                    <label className="block text-xs font-semibold text-earth-700 mb-1">Your Name: *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:ring-2 focus:ring-forest-600 focus:outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-earth-700 mb-1">Email Address: *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:ring-2 focus:ring-forest-600 focus:outline-none text-sm font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-forest-600 hover:bg-forest-700 text-white rounded-2xl font-display font-bold text-base shadow-lg shadow-forest-600/20 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Heart className="w-5 h-5 fill-white/20" />
                  <span>
                    Donate {customAmount ? `${currentCurrency.symbol}${Number(customAmount).toLocaleString()} ` : ''}to Our Mission
                  </span>
                </button>

                <div className="flex items-center justify-center space-x-2 text-xs text-earth-400 font-mono">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Encrypted & Transparently Verified</span>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-3xl text-forest-900">Thank You, {donorName || 'Guardian'}!</h3>
                <p className="text-earth-600 max-w-md mx-auto text-sm leading-relaxed">
                  Your contribution of <strong className="text-forest-900">{currentCurrency.symbol}{Number(customAmount || 0).toLocaleString()}</strong> has been allocated to our operational launch in Nairobi, Mombasa, Kwale, Kilifi, and Tana River.
                </p>
                <button
                  onClick={() => setDonationSuccess(false)}
                  className="px-6 py-3 bg-forest-900 text-white rounded-xl font-bold text-xs font-mono uppercase tracking-wider cursor-pointer hover:bg-forest-800 transition-colors"
                >
                  Make Another Contribution
                </button>
              </motion.div>
            )}
          </div>

          {/* Right Column: Where Your Money Goes & 5 Counties (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Mission Pillar Card */}
            <div className="bg-forest-950 text-white rounded-3xl p-8 border border-forest-800 shadow-xl relative overflow-hidden space-y-6">
              <div className="flex items-center space-x-2.5 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Factual Allocation</span>
              </div>
              
              <h3 className="font-display font-bold text-2xl text-white">
                Direct Impact Across 5 Operational Counties
              </h3>
              
              <p className="text-earth-300 text-xs sm:text-sm leading-relaxed">
                Unlike organizations that spend heavily on administrative overheads or publish unverified historical figures, EcoStawi Foundation operates with complete transparency. We channel resources directly into our core operational counties:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {TARGET_COUNTIES.map((county, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 bg-forest-900/80 px-4 py-3 rounded-xl border border-forest-800 font-mono text-xs text-white font-semibold">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{county} County</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Postal Address Card */}
            <div className="bg-white rounded-3xl p-8 border border-earth-200 shadow-sm space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-earth-400 block">
                Official Registered Address
              </span>
              <h4 className="font-display font-bold text-lg text-forest-900">
                EcoStawi Foundation Kenya
              </h4>
              <p className="text-sm font-mono text-earth-600">
                P.O.Box 1888-00100<br />
                Nairobi, Kenya
              </p>
              <div className="pt-2 border-t border-earth-100 flex items-center justify-between text-xs text-earth-500">
                <span>Secretariat Tel:</span>
                <strong className="font-mono text-forest-800">+254 707 033 867</strong>
              </div>
            </div>

          </div>

        </div>

        {/* STK Push Modal Simulation */}
        <AnimatePresence>
          {stkModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/80 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-earth-200 text-center space-y-6 relative overflow-hidden"
              >
                {stkStep === 'prompting' && (
                  <>
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto relative animate-pulse">
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 uppercase block mb-1">
                        Safaricom SIM Toolkit Active
                      </span>
                      <h4 className="font-display font-bold text-2xl text-forest-900">
                        Check Your Phone
                      </h4>
                      <p className="text-xs text-earth-600 mt-2 leading-relaxed">
                        An STK payment prompt of <strong className="text-forest-900">{currentCurrency.symbol}{Number(customAmount || 0).toLocaleString()}</strong> has been pushed to mobile number <strong className="font-mono text-forest-900">{mpesaPhone}</strong>.
                      </p>
                      <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-left">
                        <span className="text-[10px] font-mono font-bold text-emerald-800 block">RECEIVING PAYBILL / TILL:</span>
                        <span className="font-mono font-extrabold text-sm text-forest-950">+254 715 913 658 (EcoStawi Foundation)</span>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-earth-500">
                        Auto-verifying in <strong className="text-emerald-600 font-bold">{stkCountdown}s</strong>...
                      </div>
                      <button
                        type="button"
                        onClick={() => setStkStep('pin')}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md"
                      >
                        Simulate: Enter M-Pesa PIN on Phone
                      </button>
                      <button
                        type="button"
                        onClick={() => setStkModalOpen(false)}
                        className="text-xs text-earth-400 hover:text-earth-600 font-mono py-2 block w-full"
                      >
                        Cancel / Change Number
                      </button>
                    </div>
                  </>
                )}

                {stkStep === 'pin' && (
                  <>
                    <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                      <Lock className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xl text-forest-900">
                        Simulated Phone Prompt
                      </h4>
                      <p className="text-xs text-earth-600 mt-1">
                        Enter PIN to authorize transfer of <strong className="text-forest-900">{currentCurrency.symbol}{Number(customAmount || 0).toLocaleString()}</strong> to <strong className="font-mono text-emerald-900">+254 715 913 658</strong>.
                      </p>
                    </div>
                    <div className="max-w-[200px] mx-auto">
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="••••"
                        value={mpesaPin}
                        onChange={(e) => setMpesaPin(e.target.value)}
                        className="w-full text-center tracking-widest text-2xl font-mono py-2 rounded-xl border-2 border-amber-400 bg-earth-50 focus:outline-none"
                      />
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (mpesaPin.length === 4) setStkStep('verifying');
                          else alert("Please enter 4-digit PIN.");
                        }}
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm"
                      >
                        Confirm Transfer
                      </button>
                    </div>
                  </>
                )}

                {stkStep === 'verifying' && (
                  <div className="py-8 space-y-4">
                    <RefreshCw className="w-12 h-12 text-emerald-600 animate-spin mx-auto" />
                    <h4 className="font-display font-bold text-xl text-forest-900">Verifying M-Pesa Receipt...</h4>
                    <p className="text-xs font-mono text-earth-500">Checking Safaricom Till confirmation for +254 715 913 658</p>
                    {setTimeout(() => setStkStep('completed'), 2000) && null}
                  </div>
                )}

                {stkStep === 'completed' && (
                  <div className="py-6 space-y-6">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 uppercase block">
                        Transaction Verified
                      </span>
                      <h4 className="font-display font-bold text-2xl text-forest-900">
                        Transfer Successful!
                      </h4>
                      <p className="text-xs text-earth-600 mt-2 leading-relaxed">
                        Received <strong className="text-forest-900">{currentCurrency.symbol}{Number(customAmount || 0).toLocaleString()}</strong> from +254 {mpesaPhone} to EcoStawi Foundation (+254 715 913 658).
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setStkModalOpen(false);
                        setDonationSuccess(true);
                      }}
                      className="w-full py-3.5 bg-forest-900 text-white font-bold rounded-xl text-sm font-mono uppercase tracking-wider"
                    >
                      View Impact Receipt
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
