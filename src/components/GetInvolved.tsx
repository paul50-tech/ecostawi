import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { careersData } from '../data';
import { CareerPost } from '../types';
import { 
  Heart, UserPlus, Briefcase, Handshake, CheckCircle2, ChevronRight, 
  Upload, Globe, Award, Sparkles, HelpCircle, AlertTriangle, X, 
  Smartphone, CreditCard, Building2, RefreshCw, Clock, MapPin, Check, 
  Lock, ShieldCheck, ArrowRight
} from 'lucide-react';

type CurrencyCode = 'KES' | 'USD' | 'EUR' | 'GBP';

interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  presets: number[];
  defaultAmount: number;
}

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  KES: {
    code: 'KES',
    symbol: 'KSh',
    name: 'Kenyan Shilling (KES)',
    presets: [500, 1500, 3500, 10000],
    defaultAmount: 1500
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar (USD)',
    presets: [10, 25, 50, 100],
    defaultAmount: 25
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro (EUR)',
    presets: [10, 25, 50, 100],
    defaultAmount: 25
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound (GBP)',
    presets: [10, 20, 40, 80],
    defaultAmount: 20
  }
};

const OPERATIONAL_HUBS = [
  {
    id: 'mombasa',
    name: 'Mombasa Coastal Mangrove Station',
    location: 'Tudor & Mtwapa Creeks, Mombasa',
    focus: 'Blue Carbon & Marine Mudflats',
    capacity: 'Active - Weekend & Weekday Units'
  },
  {
    id: 'kilifi',
    name: 'Kilifi Kaya Conservation Base',
    location: 'Arabuko-Sokoke Border, Kilifi',
    focus: 'Sacred Forest Restoration & Honey Co-ops',
    capacity: 'Active - High Priority'
  },
  {
    id: 'nakuru',
    name: 'Nakuru Lakes & Crater Forestry Post',
    location: 'Menengai & Rift Valley Slopes, Nakuru',
    focus: 'Upland Catchment & Bamboo Belts',
    capacity: 'Active - Daily Seedbeds'
  },
  {
    id: 'nairobi',
    name: 'Nairobi Urban & Ngong Canopy Base',
    location: 'Karura Edge & Ngong Hills, Nairobi',
    focus: 'School Seedling Nurseries & Micro-Forests',
    capacity: 'Active - Youth Chapter HQ'
  },
  {
    id: 'kisumu',
    name: 'Kisumu Lake Victoria Wetlands Delta',
    location: 'Nyando River Delta, Kisumu',
    focus: 'Siltation Control & Papyrus Buffers',
    capacity: 'Active - Seasonal Floods Unit'
  },
  {
    id: 'kakamega',
    name: 'Kakamega Rainforest Indigenous Seedbank',
    location: 'Isecheno Station, Kakamega',
    focus: 'Rare Hardwood Canopy Propagation',
    capacity: 'Active - Specialist Nursery'
  },
  {
    id: 'nyeri',
    name: 'Nyeri Mt. Kenya Catchment Tower',
    location: 'Aberdares Slopes & Nyeri Town',
    focus: 'Water Tower Riparian Reforestation',
    capacity: 'Active - High Elevation'
  },
  {
    id: 'tsavo',
    name: 'Tsavo Wildlife Corridor & Dryland Base',
    location: 'Voi & Mwatate Sector, Taita Taveta',
    focus: 'Elephant-Proof Melia Volkensii Belts',
    capacity: 'Active - Arid Land Pilots'
  }
];

const VOLUNTEER_SCHEDULES = [
  'Weekend Field Planting Drives (Saturdays 8:00 AM - 1:00 PM)',
  'Full-Time Seasonal Resident (1 - 3 Month Rotations)',
  'Remote GIS & Satellite Data Monitoring (Flexible Hours)',
  'Emergency Rapid Reforestation & Fire Alert Crew'
];

const VOLUNTEER_SKILL_OPTIONS = [
  'Seedling Propagation & Nursery Care',
  'Drone Mapping & Aerial Inspections',
  'Youth Mentorship & School Clubs',
  'First Aid & Field Safety Logistics',
  'Seedball Fabrication & Soil Testing',
  'Community Outreach & Swahili Translation'
];

export default function GetInvolved() {
  const [activeSubTab, setActiveSubTab] = useState<'donate' | 'volunteer' | 'partner' | 'careers'>('donate');
  
  // Custom Toast State for gorgeous alerts
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'error' | 'success' } | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  
  // Donate States
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donationFrequency, setDonationFrequency] = useState<'once' | 'monthly'>('once');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'bank'>('card');
  const [mpesaPhone, setMpesaPhone] = useState<string>('0707033867');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);

  // Interactive M-Pesa STK Push Modal State
  const [stkModalOpen, setStkModalOpen] = useState<boolean>(false);
  const [stkStep, setStkStep] = useState<'prompting' | 'pin' | 'verifying' | 'completed'>('prompting');
  const [stkCountdown, setStkCountdown] = useState<number>(30);
  const [mpesaPin, setMpesaPin] = useState<string>('');
  const [stkTransactionId, setStkTransactionId] = useState<string>('');

  // STK Push Countdown Effect
  useEffect(() => {
    let timer: any;
    if (stkModalOpen && stkStep === 'prompting' && stkCountdown > 0) {
      timer = setInterval(() => {
        setStkCountdown((prev) => prev - 1);
      }, 1000);
    } else if (stkCountdown === 0 && stkStep === 'prompting') {
      setStkStep('prompting');
      setStkCountdown(30);
      setToast({
        message: "M-Pesa STK push timed out. Click resend to prompt your mobile phone again.",
        type: 'error'
      });
    }
    return () => clearInterval(timer);
  }, [stkModalOpen, stkStep, stkCountdown]);

  // Volunteer Form States
  const [volunteerName, setVolunteerName] = useState<string>('');
  const [volunteerEmail, setVolunteerEmail] = useState<string>('');
  const [volunteerPhone, setVolunteerPhone] = useState<string>('');
  const [selectedHubId, setSelectedHubId] = useState<string>('nakuru');
  const [volunteerSchedule, setVolunteerSchedule] = useState<string>(VOLUNTEER_SCHEDULES[0]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([VOLUNTEER_SKILL_OPTIONS[0]]);
  const [volunteerMotivation, setVolunteerMotivation] = useState<string>('');
  const [volunteerSuccess, setVolunteerSuccess] = useState<boolean>(false);

  // Partnership States
  const [orgName, setOrgName] = useState<string>('');
  const [orgContact, setOrgContact] = useState<string>('');
  const [orgEmail, setOrgEmail] = useState<string>('');
  const [orgType, setOrgType] = useState<string>('Corporate NGO / CSR Partner');
  const [allianceScope, setAllianceScope] = useState<string>('Ecosystem Funding');
  const [proposalNotes, setProposalNotes] = useState<string>('');
  const [partnerSuccess, setPartnerSuccess] = useState<boolean>(false);

  // Careers States
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [appliedJobId, setAppliedJobId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [jobApplicantName, setJobApplicantName] = useState<string>('');
  const [jobApplicantEmail, setJobApplicantEmail] = useState<string>('');
  const [careerSuccess, setCareerSuccess] = useState<boolean>(false);

  // Currency switch handler
  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    const config = CURRENCIES[newCurrency];
    setSelectedAmount(config.defaultAmount);
    setCustomAmount('');
    if (newCurrency === 'KES' && paymentMethod !== 'mpesa') {
      setPaymentMethod('mpesa');
    }
  };

  const getActiveDonationValue = () => {
    if (customAmount) return Number(customAmount);
    return selectedAmount;
  };

  // Handle donations submission
  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorEmail) {
      setToast({
        message: "Please specify a valid email address to receive your tax-deductible donation certificate.",
        type: 'error'
      });
      return;
    }

    if (paymentMethod === 'mpesa') {
      if (!mpesaPhone || mpesaPhone.length < 9) {
        setToast({
          message: "Please enter a valid Safaricom M-Pesa phone number (e.g., 0707033867).",
          type: 'error'
        });
        return;
      }
      // Trigger STK Push interactive modal
      setStkModalOpen(true);
      setStkStep('prompting');
      setStkCountdown(30);
      setMpesaPin('');
      return;
    }

    setDonationSuccess(true);
  };

  // Trigger STK PIN submission simulation
  const handleSimulateStkPinSubmit = () => {
    setStkStep('verifying');
    setTimeout(() => {
      const generatedTx = `QK${Math.floor(100000 + Math.random() * 900000)}`;
      setStkTransactionId(generatedTx);
      setStkStep('completed');
    }, 1500);
  };

  const handleFinishStkSuccess = () => {
    setStkModalOpen(false);
    setDonationSuccess(true);
  };

  // Toggle skill selection
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter(s => s !== skill));
      }
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Volunteer submission
  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName || !volunteerEmail || !volunteerMotivation) {
      setToast({
        message: "Please fill in all mandatory fields so our Operational Hub liaison can process your registration.",
        type: 'error'
      });
      return;
    }
    setVolunteerSuccess(true);
  };

  // Partnership submission
  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !orgContact || !orgEmail || !proposalNotes) {
      setToast({
        message: "Please fill in the core corporate contacts and alignment proposal notes.",
        type: 'error'
      });
      return;
    }
    setPartnerSuccess(true);
  };

  // Careers file upload handling
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        setUploadedFile(file);
        simulateUpload();
      } else {
        setToast({
          message: "We only accept document file types (.pdf, .doc, .docx) for CV submissions.",
          type: 'error'
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobApplicantName || !jobApplicantEmail || !uploadedFile) {
      setToast({
        message: "Please fill in your name, email, and upload your professional resume/CV.",
        type: 'error'
      });
      return;
    }
    setCareerSuccess(true);
  };

  const resetAllForms = () => {
    setDonationSuccess(false);
    setVolunteerSuccess(false);
    setPartnerSuccess(false);
    setCareerSuccess(false);
    setUploadedFile(null);
    setUploadProgress(0);
    setExpandedJobId(null);
    setAppliedJobId(null);
    setCustomAmount('');
    setDonorName('');
    setDonorEmail('');
    setVolunteerName('');
    setVolunteerEmail('');
    setVolunteerMotivation('');
    setOrgName('');
    setOrgContact('');
    setOrgEmail('');
    setProposalNotes('');
    setJobApplicantName('');
    setJobApplicantEmail('');
    setStkModalOpen(false);
    setStkStep('prompting');
  };

  const currentCurrency = CURRENCIES[currency];
  const selectedHubObj = OPERATIONAL_HUBS.find(h => h.id === selectedHubId) || OPERATIONAL_HUBS[0];

  return (
    <section id="get-involved-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs font-semibold tracking-widest text-forest-600 uppercase mb-2">
            Action Center
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-forest-900 tracking-tight">
            Get Involved
          </h3>
          <p className="text-earth-500 mt-4 leading-relaxed">
            Choose your path to protect our planet. Partner with us, volunteer at specific operational hubs, sponsor active restoration campaigns via card or M-Pesa STK push, or build a career in climate innovation.
          </p>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Core sub tabs navigation */}
        <div id="get-involved-tabs" className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-16 p-2 bg-earth-100 rounded-2xl">
          {[
            { id: 'donate', label: 'Donate & Support', icon: Heart },
            { id: 'volunteer', label: 'Volunteer Chapter', icon: UserPlus },
            { id: 'partner', label: 'Partner with Us', icon: Handshake },
            { id: 'careers', label: 'Careers', icon: Briefcase }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`sub-tab-${tab.id}`}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  resetAllForms();
                }}
                className={`flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'text-earth-500 hover:text-forest-850 hover:bg-white/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-earth-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Inner Tab Contents */}
        <div className="max-w-4xl mx-auto min-h-[480px]">
          <AnimatePresence mode="wait">
            
            {/* 1. DONATE SUB TAB */}
            {activeSubTab === 'donate' && (
              <motion.div
                key="donate-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-earth-50 rounded-3xl border border-earth-200 p-6 sm:p-10"
              >
                {!donationSuccess ? (
                  <form onSubmit={handleDonateSubmit} className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-earth-200">
                      <div>
                        <h4 className="font-display font-bold text-2xl text-forest-900 mb-1">Fund Global Solutions</h4>
                        <p className="text-earth-500 text-xs sm:text-sm">
                          Every single contribution is leveraged locally: supplying mangrove saplings, fabricating beehives, or securing drip irrigation.
                        </p>
                      </div>

                      {/* Currency Switcher Dropdown / Pills */}
                      <div className="shrink-0 bg-white p-1.5 rounded-xl border border-earth-200 shadow-sm">
                        <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-earth-400 px-2 mb-1">
                          Currency Switcher:
                        </label>
                        <div className="flex space-x-1">
                          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                            <button
                              key={code}
                              type="button"
                              onClick={() => handleCurrencyChange(code)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                                currency === code
                                  ? 'bg-forest-900 text-emerald-400 shadow-sm'
                                  : 'text-earth-600 hover:bg-earth-100'
                              }`}
                            >
                              {code} ({CURRENCIES[code].symbol})
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Frequency selector */}
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold font-mono uppercase tracking-wider text-earth-500">Frequency:</span>
                      <button
                        type="button"
                        onClick={() => setDonationFrequency('once')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase tracking-wider cursor-pointer transition-colors ${
                          donationFrequency === 'once'
                            ? 'bg-forest-800 text-white'
                            : 'bg-white text-earth-500 border border-earth-200 hover:bg-earth-100'
                        }`}
                      >
                        Single Gift
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationFrequency('monthly')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase tracking-wider cursor-pointer transition-colors ${
                          donationFrequency === 'monthly'
                            ? 'bg-forest-800 text-white'
                            : 'bg-white text-earth-500 border border-earth-200 hover:bg-earth-100'
                        }`}
                      >
                        Sustain Monthly (10% Match)
                      </button>
                    </div>

                    {/* Tier selector grids with Currency Context */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-bold font-mono uppercase tracking-wider text-earth-600">
                          Select Sponsorship Amount ({currentCurrency.code}):
                        </label>
                        <span className="text-[10px] text-emerald-700 font-mono font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                          Active Currency: {currentCurrency.name}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {currentCurrency.presets.map((amt, idx) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(amt);
                              setCustomAmount('');
                            }}
                            className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                              selectedAmount === amt && !customAmount
                                ? 'border-forest-600 bg-forest-50 text-forest-900 font-bold shadow-sm'
                                : 'border-earth-200 bg-white text-earth-500 hover:bg-earth-100'
                            }`}
                          >
                            <span className="block text-xl font-display font-black leading-none mb-1">
                              {currentCurrency.symbol} {amt.toLocaleString()}
                            </span>
                            <span className="text-[9px] font-mono uppercase tracking-wider block text-earth-400">
                              {idx === 0 ? 'Grows 12 Trees' :
                               idx === 1 ? 'Grows 20 Trees' :
                               idx === 2 ? 'Hives & Honey Co-op' : 'Restores 0.3 Ha Mud'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Input */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-earth-500 mb-2 font-mono">
                        Or Enter Custom Amount ({currentCurrency.symbol} {currentCurrency.code}):
                      </label>
                      <div className="relative rounded-xl shadow-sm max-w-[240px]">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <span className="text-earth-500 text-xs font-extrabold font-mono">{currentCurrency.symbol}</span>
                        </div>
                        <input
                          type="number"
                          placeholder="Custom Amount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className={`w-full ${
                            currentCurrency.symbol.length > 2 
                              ? 'pl-14' 
                              : currentCurrency.symbol.length > 1 
                                ? 'pl-11' 
                                : 'pl-9'
                          } pr-3 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm font-semibold text-forest-900`}
                        />
                      </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="pt-4 border-t border-earth-200 space-y-4">
                      <label className="block text-xs font-bold font-mono uppercase tracking-wider text-earth-600">
                        Select Payment Method:
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentMethod('mpesa');
                            if (currency !== 'KES') handleCurrencyChange('KES');
                          }}
                          className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                            paymentMethod === 'mpesa'
                              ? 'border-emerald-600 bg-emerald-50/80 text-forest-900 ring-2 ring-emerald-500/20'
                              : 'border-earth-200 bg-white text-earth-600 hover:bg-earth-100'
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 font-display font-black text-xs">
                            M
                          </div>
                          <div>
                            <span className="block text-xs font-bold font-display text-forest-900">M-Pesa STK Push</span>
                            <span className="block text-[10px] text-earth-500">Safaricom Mobile Money</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                            paymentMethod === 'card'
                              ? 'border-forest-600 bg-forest-50 text-forest-900 ring-2 ring-forest-500/20'
                              : 'border-earth-200 bg-white text-earth-600 hover:bg-earth-100'
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-forest-900 text-emerald-400 flex items-center justify-center shrink-0">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold font-display text-forest-900">Credit / Debit Card</span>
                            <span className="block text-[10px] text-earth-500">Visa, Mastercard, AMEX</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bank')}
                          className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                            paymentMethod === 'bank'
                              ? 'border-forest-600 bg-forest-50 text-forest-900 ring-2 ring-forest-500/20'
                              : 'border-earth-200 bg-white text-earth-600 hover:bg-earth-100'
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-earth-800 text-earth-200 flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold font-display text-forest-900">Bank Wire / SWIFT</span>
                            <span className="block text-[10px] text-earth-500">Direct Institutional Transfer</span>
                          </div>
                        </button>
                      </div>

                      {/* Payment Method Specific Fields */}
                      {paymentMethod === 'mpesa' && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2 text-emerald-900">
                            <div className="flex items-center space-x-2">
                              <Smartphone className="w-4 h-4 text-emerald-600" />
                              <h5 className="font-display font-bold text-xs uppercase tracking-wider">M-Pesa STK Push Prompt Details</h5>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
                              Receiving No: +254 715 913 658
                            </span>
                          </div>
                          <p className="text-xs text-earth-600 leading-relaxed">
                            Enter your Safaricom mobile number below. When you initiate payment, an interactive M-Pesa SIM toolkit prompt will be sent to your phone to transfer funds directly to EcoStawi Foundation at <strong className="text-emerald-900 font-bold">+254 715 913 658</strong>.
                          </p>
                          <div>
                            <label className="block text-[11px] font-semibold text-earth-600 mb-1">
                              Your M-Pesa Registered Mobile Number: *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. 0712345678"
                              value={mpesaPhone}
                              onChange={(e) => setMpesaPhone(e.target.value)}
                              className="w-full max-w-xs px-4 py-2.5 rounded-xl border border-emerald-300 bg-white text-sm font-mono font-bold text-forest-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Personal Info inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-earth-200">
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Donor Name (Optional):</label>
                        <input
                          type="text"
                          placeholder="e.g. Paul Jubilee"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Email Address (For Certificate): *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. paul@example.com"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Call to action submit button */}
                    <button
                      type="submit"
                      className="w-full bg-forest-600 hover:bg-forest-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Heart className="w-5 h-5" />
                      <span>
                        {paymentMethod === 'mpesa' 
                          ? `Initiate M-Pesa STK Push (${currentCurrency.symbol} ${getActiveDonationValue().toLocaleString()})`
                          : `Sponsor ${currentCurrency.symbol} ${getActiveDonationValue().toLocaleString()} ${currentCurrency.code} Restoration`
                        }
                      </span>
                    </button>
                  </form>
                ) : (
                  // Donation Success View
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-3xl text-forest-900">Thank you, {donorName || 'Generous Steward'}!</h4>
                      <p className="text-earth-500 text-sm max-w-md mx-auto leading-relaxed">
                        We have successfully confirmed your support of <strong className="text-forest-750 font-bold">{currentCurrency.symbol} {getActiveDonationValue().toLocaleString()} {currentCurrency.code}</strong> as a {donationFrequency === 'once' ? 'one-time' : 'monthly'} gift!
                      </p>
                    </div>

                    {/* Receipt visual mock card */}
                    <div className="bg-white rounded-2xl border border-earth-150 p-6 max-w-sm mx-auto text-left relative overflow-hidden shadow-sm">
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white font-mono text-[8px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-bl-xl shadow-sm">
                        CERTIFIED
                      </div>
                      
                      <span className="text-[9px] uppercase tracking-wider font-mono text-earth-400 block mb-1">EcoStawi Impact Registry</span>
                      <h5 className="font-display font-bold text-sm text-forest-900 border-b pb-3 mb-3">Donation Receipt & Pledge</h5>
                      
                      <div className="space-y-2.5 font-mono text-[11px] text-earth-500">
                        <div className="flex justify-between">
                          <span>Payment Method:</span> 
                          <span className="font-bold text-emerald-700">{paymentMethod === 'mpesa' ? 'M-Pesa Mobile Money' : 'Card / Direct Wire'}</span>
                        </div>
                        {stkTransactionId && (
                          <>
                            <div className="flex justify-between">
                              <span>M-Pesa Tx ID:</span> 
                              <span className="font-bold text-forest-800">{stkTransactionId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Recipient No:</span> 
                              <span className="font-bold text-emerald-700">+254 715 913 658</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between"><span>Registry ID:</span> <span className="font-bold text-forest-800">EST-{Math.floor(Math.random()*90000+10000)}</span></div>
                        <div className="flex justify-between"><span>Steward Name:</span> <span className="font-bold text-forest-800">{donorName || 'EcoStawi Supporter'}</span></div>
                        <div className="flex justify-between"><span>Certificate Email:</span> <span className="font-bold text-forest-800 truncate max-w-[150px]">{donorEmail}</span></div>
                        <div className="flex justify-between"><span>Sponsorship Amount:</span> <span className="font-bold text-forest-800">{currentCurrency.symbol} {getActiveDonationValue().toLocaleString()} {currentCurrency.code}</span></div>
                        <div className="flex justify-between"><span>Carbon Equivalent:</span> <span className="font-bold text-emerald-600">~{((getActiveDonationValue() * 18)/1000).toFixed(1)} Tons CO2 Sequestration</span></div>
                      </div>

                      <p className="text-[10px] text-earth-400 mt-4 pt-3 border-t border-dashed leading-tight">
                        *An official tax-deductible PDF certificate signed by the Board Director has been dispatched to your email address.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={resetAllForms}
                      className="text-xs font-bold font-mono uppercase tracking-wider text-forest-600 hover:text-forest-800 transition-colors cursor-pointer py-2"
                    >
                      Make Another Donation
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* 2. VOLUNTEER SUB TAB */}
            {activeSubTab === 'volunteer' && (
              <motion.div
                key="volunteer-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-earth-50 rounded-3xl border border-earth-200 p-6 sm:p-10"
              >
                {!volunteerSuccess ? (
                  <form onSubmit={handleVolunteerSubmit} className="space-y-8">
                    <div>
                      <h4 className="font-display font-bold text-2xl text-forest-900 mb-2">Join Local Operational Hubs</h4>
                      <p className="text-earth-500 text-xs sm:text-sm">
                        EcoStawi operates direct conservation field bases across coastal, upland, and arid ecosystems. Select your specific operational hub to participate in targeted seedling propagation, drone monitoring runs, or school woodlots.
                      </p>
                    </div>

                    {/* Operational Hub Selector */}
                    <div>
                      <label className="block text-xs font-bold font-mono uppercase tracking-wider text-earth-600 mb-3">
                        Select Primary Operational Field Hub: *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
                        {OPERATIONAL_HUBS.map((hub) => {
                          const isSelected = selectedHubId === hub.id;
                          return (
                            <button
                              key={hub.id}
                              type="button"
                              onClick={() => setSelectedHubId(hub.id)}
                              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                                isSelected
                                  ? 'border-forest-600 bg-white ring-2 ring-forest-500/20 shadow-sm'
                                  : 'border-earth-200 bg-white/70 hover:bg-white text-earth-600'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="space-y-1 pr-4">
                                  <span className="block font-display font-bold text-xs text-forest-900">
                                    {hub.name}
                                  </span>
                                  <span className="flex items-center space-x-1 text-[10px] text-earth-500 font-mono">
                                    <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                                    <span className="truncate">{hub.location}</span>
                                  </span>
                                  <span className="block text-[10px] text-emerald-700 font-semibold">
                                    Focus: {hub.focus}
                                  </span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected ? 'border-forest-600 bg-forest-600 text-white' : 'border-earth-300'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3" />}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Deployment Schedule & Availability */}
                    <div>
                      <label className="block text-xs font-bold font-mono uppercase tracking-wider text-earth-600 mb-2">
                        Preferred Deployment Schedule: *
                      </label>
                      <select
                        value={volunteerSchedule}
                        onChange={(e) => setVolunteerSchedule(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium cursor-pointer"
                      >
                        {VOLUNTEER_SCHEDULES.map((sched) => (
                          <option key={sched} value={sched}>{sched}</option>
                        ))}
                      </select>
                    </div>

                    {/* Skill Sets Checkboxes */}
                    <div>
                      <label className="block text-xs font-bold font-mono uppercase tracking-wider text-earth-600 mb-2">
                        Field Skills & Expertise Capabilities:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {VOLUNTEER_SKILL_OPTIONS.map((skill) => {
                          const isChecked = selectedSkills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`p-3 rounded-xl border text-xs text-left font-medium flex items-center justify-between transition-colors cursor-pointer ${
                                isChecked
                                  ? 'border-emerald-600 bg-emerald-50 text-forest-900 font-semibold'
                                  : 'border-earth-200 bg-white text-earth-500 hover:bg-earth-100'
                              }`}
                            >
                              <span>{skill}</span>
                              <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-earth-300'
                              }`}>
                                {isChecked && <Check className="w-3 h-3" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-earth-200">
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Your Name: *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Paul Jubilee"
                          value={volunteerName}
                          onChange={(e) => setVolunteerName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Email Address: *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. paul@example.com"
                          value={volunteerEmail}
                          onChange={(e) => setVolunteerEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Phone Number:</label>
                        <input
                          type="tel"
                          placeholder="e.g. +254 707 033 867"
                          value={volunteerPhone}
                          onChange={(e) => setVolunteerPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-earth-500 mb-2">Tell us about your background or motivation: *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Explain briefly why you would like to volunteer at this specific EcoStawi field station."
                        value={volunteerMotivation}
                        onChange={(e) => setVolunteerMotivation(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-forest-900 hover:bg-forest-950 text-white font-bold py-4 rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      Submit Registration Request for {selectedHubObj.name}
                    </button>
                  </form>
                ) : (
                  // Volunteer success
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-3xl text-forest-900">Application Registered!</h4>
                      <p className="text-earth-500 text-sm max-w-md mx-auto leading-relaxed">
                        We have successfully logged your volunteer profile for the <strong className="text-forest-750 font-bold">{selectedHubObj.name}</strong>!
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-earth-200 p-5 max-w-md mx-auto text-left space-y-2 font-mono text-xs">
                      <div className="flex justify-between text-earth-600">
                        <span>Assigned Field Hub:</span>
                        <span className="font-bold text-forest-900">{selectedHubObj.name}</span>
                      </div>
                      <div className="flex justify-between text-earth-600">
                        <span>Hub Location:</span>
                        <span className="font-bold text-forest-900">{selectedHubObj.location}</span>
                      </div>
                      <div className="flex justify-between text-earth-600">
                        <span>Schedule:</span>
                        <span className="font-bold text-forest-900">{volunteerSchedule}</span>
                      </div>
                      <div className="flex justify-between text-earth-600">
                        <span>Registered Skills:</span>
                        <span className="font-bold text-emerald-700">{selectedSkills.join(', ')}</span>
                      </div>
                    </div>

                    <p className="text-xs text-earth-400 max-w-sm mx-auto leading-relaxed border-t border-earth-200 pt-4">
                      Our Station Lead at {selectedHubObj.name} will inspect your application and email field orientation details to {volunteerEmail}.
                    </p>

                    <button
                      type="button"
                      onClick={resetAllForms}
                      className="text-xs font-bold font-mono uppercase tracking-wider text-forest-600 hover:text-forest-800 transition-colors cursor-pointer"
                    >
                      Submit Another Registration
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* 3. PARTNER SUB TAB */}
            {activeSubTab === 'partner' && (
              <motion.div
                key="partner-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-earth-50 rounded-3xl border border-earth-200 p-6 sm:p-10"
              >
                {!partnerSuccess ? (
                  <form onSubmit={handlePartnerSubmit} className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-2xl text-forest-900 mb-2">Corporate & Institutional Alliances</h4>
                      <p className="text-earth-500 text-xs sm:text-sm">
                        Partner with EcoStawi to power your Scope 3 ESG commitments, fund verified blue carbon restoration, or co-design community agroforestry value chains.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Organization / Enterprise Name: *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. GreenTech Capital"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Contact Person Full Name: *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins (ESG Lead)"
                          value={orgContact}
                          onChange={(e) => setOrgContact(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Official Email: *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. esg@greentech.org"
                          value={orgEmail}
                          onChange={(e) => setOrgEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Organization Category: *</label>
                        <select
                          value={orgType}
                          onChange={(e) => setOrgType(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium cursor-pointer"
                        >
                          <option value="Corporate NGO / CSR Partner">Corporate / CSR Partner</option>
                          <option value="Philanthropic Foundation">Philanthropic Foundation</option>
                          <option value="Multilateral Development Agency">Multilateral Development Agency</option>
                          <option value="Academic & Research Institute">Academic & Research Institute</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Primary Scope: *</label>
                        <select
                          value={allianceScope}
                          onChange={(e) => setAllianceScope(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium cursor-pointer"
                        >
                          <option value="Ecosystem Funding">Ecosystem Funding</option>
                          <option value="Blue Carbon Offsets">Blue Carbon Offsets</option>
                          <option value="GIS & Satellite Data Exchange">GIS & Satellite Data Exchange</option>
                          <option value="Farmer Offtaker Supply Chains">Farmer Offtaker Supply Chains</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-earth-500 mb-2">Alignment Proposal & Strategic Goals: *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail your proposed scope, funding scale, or co-development objectives."
                        value={proposalNotes}
                        onChange={(e) => setProposalNotes(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-forest-900 hover:bg-forest-950 text-white font-bold py-4 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Handshake className="w-5 h-5 text-emerald-400" />
                      <span>Submit Partnership Inquiry</span>
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-3xl text-forest-900">Inquiry Received!</h4>
                      <p className="text-earth-500 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you <strong className="text-forest-750 font-bold">{orgContact}</strong> from <strong className="text-forest-750 font-bold">{orgName}</strong>. Our Director of Global Partnerships will respond to {orgEmail} within 24 business hours.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={resetAllForms}
                      className="text-xs font-bold font-mono uppercase tracking-wider text-forest-600 hover:text-forest-800 transition-colors cursor-pointer"
                    >
                      Submit Another Proposal
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* 4. CAREERS SUB TAB */}
            {activeSubTab === 'careers' && (
              <motion.div
                key="careers-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-earth-50 rounded-3xl border border-earth-200 p-6 sm:p-10 space-y-8"
              >
                <div>
                  <h4 className="font-display font-bold text-2xl text-forest-900 mb-2">Build Your Career in Climate Innovation</h4>
                  <p className="text-earth-500 text-xs sm:text-sm">
                    We are actively seeking foresters, drone telemetry specialists, soil scientists, and agroforestry officers to join our field deployments across East Africa.
                  </p>
                </div>

                {!careerSuccess ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {careersData.map((job) => {
                        const isExpanded = expandedJobId === job.id;
                        const isApplied = appliedJobId === job.id;
                        return (
                          <div
                            key={job.id}
                            className="bg-white rounded-2xl border border-earth-200 overflow-hidden shadow-sm transition-all"
                          >
                            <div
                              onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-earth-50/50"
                            >
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                                  {job.department}
                                </span>
                                <h5 className="font-display font-bold text-lg text-forest-900">{job.title}</h5>
                                <div className="flex items-center space-x-3 text-xs text-earth-500 font-mono">
                                  <span>{job.location}</span>
                                  <span>•</span>
                                  <span>{job.type}</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                className="bg-forest-900 text-white text-xs font-bold px-4 py-2 rounded-xl shrink-0 self-start sm:self-center hover:bg-forest-950 transition-colors"
                              >
                                {isExpanded ? 'Hide Details' : 'View & Apply'}
                              </button>
                            </div>

                            {isExpanded && (
                              <div className="p-6 border-t border-earth-200 bg-earth-50/40 space-y-6">
                                <p className="text-xs text-earth-600 leading-relaxed">{job.description}</p>
                                
                                <div>
                                  <h6 className="font-mono text-[11px] font-bold text-forest-900 uppercase mb-2">Key Requirements:</h6>
                                  <ul className="list-disc pl-5 text-xs text-earth-600 space-y-1">
                                    {job.requirements.map((req, idx) => (
                                      <li key={idx}>{req}</li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Application Form */}
                                {!isApplied ? (
                                  <form onSubmit={handleCareerSubmit} className="pt-4 border-t border-earth-200 space-y-4">
                                    <h6 className="font-display font-bold text-sm text-forest-900">Direct Application Portal</h6>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-[11px] font-semibold text-earth-500 mb-1.5">Applicant Full Name: *</label>
                                        <input
                                          type="text"
                                          required
                                          placeholder="e.g. Paul Jubilee"
                                          value={jobApplicantName}
                                          onChange={(e) => setJobApplicantName(e.target.value)}
                                          className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 bg-white text-xs font-medium"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[11px] font-semibold text-earth-500 mb-1.5">Applicant Email Address: *</label>
                                        <input
                                          type="email"
                                          required
                                          placeholder="e.g. paul@example.com"
                                          value={jobApplicantEmail}
                                          onChange={(e) => setJobApplicantEmail(e.target.value)}
                                          className="w-full px-3.5 py-2.5 rounded-xl border border-earth-200 bg-white text-xs font-medium"
                                        />
                                      </div>
                                    </div>

                                    {/* Drag & Drop File Upload area */}
                                    <div>
                                      <label className="block text-[11px] font-semibold text-earth-500 mb-1.5">Attach Professional Resume / Curriculum Vitae: *</label>
                                      <div
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                                          dragActive ? 'border-emerald-500 bg-emerald-50/50' : 'border-earth-200 bg-white'
                                        }`}
                                      >
                                        <Upload className="w-8 h-8 text-earth-400 mx-auto mb-2" />
                                        {uploadedFile ? (
                                          <div className="space-y-2">
                                            <p className="text-xs font-bold text-forest-900">{uploadedFile.name}</p>
                                            <div className="w-full bg-earth-200 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto">
                                              <div className="bg-emerald-500 h-full transition-all" style={{ width: `${uploadProgress}%` }} />
                                            </div>
                                          </div>
                                        ) : (
                                          <div>
                                            <p className="text-xs text-earth-500 font-medium">Drag & drop your document here, or</p>
                                            <label className="text-xs font-bold text-forest-700 hover:underline cursor-pointer">
                                              browse files
                                              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileSelect} className="hidden" />
                                            </label>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <button
                                      type="submit"
                                      className="w-full bg-forest-900 hover:bg-forest-950 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors text-xs cursor-pointer"
                                    >
                                      Submit Job Application
                                    </button>
                                  </form>
                                ) : (
                                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                                    <p className="text-xs text-emerald-800 font-bold">Application already recorded for this role!</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // Careers Application Success
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-3xl text-forest-900">Application Submitted!</h4>
                      <p className="text-earth-500 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you <strong className="text-forest-750 font-bold">{jobApplicantName}</strong>. Our human resources team will evaluate your CV and email {jobApplicantEmail}.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={resetAllForms}
                      className="text-xs font-bold font-mono uppercase tracking-wider text-forest-600 hover:text-forest-800 transition-colors cursor-pointer"
                    >
                      Apply For Another Position
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Interactive M-Pesa STK Push Simulator Modal */}
      <AnimatePresence>
        {stkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-forest-950 text-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-forest-800 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setStkModalOpen(false)}
                className="absolute top-4 right-4 text-forest-400 hover:text-white p-2 rounded-full hover:bg-forest-900/60 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Top M-Pesa Brand Bar */}
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-forest-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black font-display text-sm">
                  M
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Safaricom M-PESA STK Push</h4>
                  <p className="text-[10px] font-mono text-emerald-400">Interactive SIM Toolkit Gateway</p>
                </div>
              </div>

              {/* Step 1: Prompting Phone */}
              {stkStep === 'prompting' && (
                <div className="space-y-6">
                  {/* Simulated Mobile Phone Screen Box */}
                  <div className="bg-forest-900 border-2 border-emerald-500/40 rounded-2xl p-5 relative space-y-4 shadow-inner">
                    <div className="flex justify-between items-center text-[10px] font-mono text-emerald-400 border-b border-forest-800 pb-2">
                      <span className="flex items-center space-x-1">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>SIM TOOLKIT ALERT</span>
                      </span>
                      <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        {stkCountdown}s
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono text-forest-100">
                      <p><strong className="text-white">Receiving Number:</strong> +254 715 913 658</p>
                      <p><strong className="text-white">Account Name:</strong> EcoStawi Foundation</p>
                      <p><strong className="text-white">Amount:</strong> KSh {getActiveDonationValue().toLocaleString()}</p>
                      <p className="text-emerald-400 text-[11px] pt-1">STK prompt sent to donor: +254 {mpesaPhone}</p>
                    </div>

                    <div className="pt-2">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-earth-300 mb-1.5">
                        Enter M-Pesa PIN (4 Digits):
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="••••"
                        value={mpesaPin}
                        onChange={(e) => setMpesaPin(e.target.value)}
                        className="w-full text-center tracking-widest text-lg font-mono font-bold bg-forest-950 border border-emerald-500/50 rounded-xl py-2.5 text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleSimulateStkPinSubmit}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-extrabold py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer text-sm flex items-center justify-center space-x-2"
                    >
                      <Check className="w-5 h-5" />
                      <span>Approve & Authorize Payment</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStkCountdown(30)}
                      className="w-full text-xs font-mono text-forest-400 hover:text-white transition-colors cursor-pointer py-1"
                    >
                      Resend STK Push Prompt
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Verifying */}
              {stkStep === 'verifying' && (
                <div className="text-center py-10 space-y-4">
                  <RefreshCw className="w-12 h-12 text-emerald-400 animate-spin mx-auto" />
                  <h5 className="font-display font-bold text-lg text-white">Communicating with Safaricom Daraja API...</h5>
                  <p className="text-xs font-mono text-forest-300">
                    Verifying encrypted PIN & account balance for +254 {mpesaPhone}
                  </p>
                </div>
              )}

              {/* Step 3: Completed */}
              {stkStep === 'completed' && (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h5 className="font-display font-extrabold text-2xl text-white">Payment Confirmed!</h5>
                    <p className="text-xs text-forest-300 mt-1">Transaction ID: <span className="font-mono font-bold text-emerald-400">{stkTransactionId}</span></p>
                  </div>

                  <div className="bg-forest-900 border border-forest-800 rounded-2xl p-4 text-left font-mono text-[11px] text-forest-200 leading-relaxed">
                    <span className="block text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Simulated Safaricom SMS:</span>
                    "{stkTransactionId} Confirmed. KSh {getActiveDonationValue().toLocaleString()} sent to EcoStawi Foundation (+254715913658) for Ecosystem Restoration on {new Date().toLocaleDateString()}."
                  </div>

                  <button
                    type="button"
                    onClick={handleFinishStkSuccess}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-extrabold py-3.5 rounded-xl transition-colors cursor-pointer text-sm"
                  >
                    View Official Donation Certificate
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern custom Toast notification portal replacement for window.alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            id="get-involved-toast"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`fixed bottom-6 right-6 z-50 max-w-sm border rounded-2xl p-4 shadow-2xl flex items-start space-x-3 backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-red-950 border-red-900 text-white'
                : 'bg-forest-900 border-forest-800 text-white'
            }`}
          >
            <div className={`p-1.5 rounded-lg shrink-0 ${
              toast.type === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              {toast.type === 'error' ? <AlertTriangle className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
            </div>
            <div className="flex-grow space-y-1 pr-4">
              <p className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                toast.type === 'error' ? 'text-red-400' : 'text-emerald-400'
              }`}>{toast.type === 'error' ? 'System Warning' : 'System Notification'}</p>
              <p className="text-xs leading-relaxed text-forest-100">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-forest-400 hover:text-white p-1 rounded-lg hover:bg-forest-800/50 transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
