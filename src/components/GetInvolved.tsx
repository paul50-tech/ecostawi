import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, UserPlus, Briefcase, Handshake, CheckCircle2, ChevronRight, 
  Globe, Award, Sparkles, HelpCircle, AlertTriangle, X, 
  MapPin, Check, Lock, ShieldCheck, ArrowRight
} from 'lucide-react';

interface GetInvolvedProps {
  initialTab?: 'donate' | 'volunteer' | 'partner' | 'careers';
}

export default function GetInvolved({ initialTab = 'donate' }: GetInvolvedProps = {}) {
  const [activeSubTab, setActiveSubTab] = useState<'donate' | 'volunteer' | 'partner' | 'careers'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveSubTab(initialTab);
    }
  }, [initialTab]);
  
  // Custom Toast State for gorgeous alerts
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'error' | 'success' } | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  
  // Fund Global Solutions / Donate States
  const [funderName, setFunderName] = useState<string>('');
  const [funderContact, setFunderContact] = useState<string>('');
  const [funderEmail, setFunderEmail] = useState<string>('');
  const [funderPhone, setFunderPhone] = useState<string>('');
  const [funderInterest, setFunderInterest] = useState<string>('');
  const [funderProposal, setFunderProposal] = useState<string>('');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);

  // Volunteer Form States
  const [volunteerName, setVolunteerName] = useState<string>('');
  const [volunteerEmail, setVolunteerEmail] = useState<string>('');
  const [volunteerPhone, setVolunteerPhone] = useState<string>('');
  const [volunteerSkills, setVolunteerSkills] = useState<string>('');
  const [volunteerMotivation, setVolunteerMotivation] = useState<string>('');
  const [volunteerSuccess, setVolunteerSuccess] = useState<boolean>(false);

  // Partnership States
  const [orgName, setOrgName] = useState<string>('');
  const [orgContact, setOrgContact] = useState<string>('');
  const [orgEmail, setOrgEmail] = useState<string>('');
  const [proposalNotes, setProposalNotes] = useState<string>('');
  const [partnerSuccess, setPartnerSuccess] = useState<boolean>(false);

  // Handle donations submission
  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!funderName || !funderContact || !funderEmail || !funderInterest || !funderProposal) {
      setToast({
        message: "Please fill in all required details and your contribution proposal.",
        type: 'error'
      });
      return;
    }
    setDonationSuccess(true);
  };

  // Volunteer submission
  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName || !volunteerEmail || !volunteerSkills || !volunteerMotivation) {
      setToast({
        message: "Please fill in all mandatory fields to submit your volunteer application.",
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
        message: "Please fill in your contact details and alignment proposal notes.",
        type: 'error'
      });
      return;
    }
    setPartnerSuccess(true);
  };

  const resetAllForms = () => {
    setDonationSuccess(false);
    setVolunteerSuccess(false);
    setPartnerSuccess(false);
    setFunderName('');
    setFunderContact('');
    setFunderEmail('');
    setFunderPhone('');
    setFunderInterest('');
    setFunderProposal('');
    setVolunteerName('');
    setVolunteerEmail('');
    setVolunteerPhone('');
    setVolunteerSkills('');
    setVolunteerMotivation('');
    setOrgName('');
    setOrgContact('');
    setOrgEmail('');
    setProposalNotes('');
  };

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
            Choose your path to protect our planet. Fund and support our environmental solutions, partner with us, volunteer with our movement, or check our careers page for future opportunities.
          </p>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Core sub tabs navigation */}
        <div id="get-involved-tabs" className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-16 p-2 bg-earth-100 rounded-2xl">
          {[
            { id: 'donate', label: 'Donate & Support', icon: Heart },
            { id: 'volunteer', label: 'Volunteer', icon: UserPlus },
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
                  <form onSubmit={handleDonateSubmit} className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-2xl text-forest-900 mb-2">Fund Global Solutions</h4>
                      <p className="text-earth-500 text-xs sm:text-sm">
                        Support our environmental conservation and restoration initiatives without pre-set limitations. Provide your details below, specify your sectors of interest, and let us know how you would like to contribute or structure your proposal.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Personal / Organization / Institutional Name: *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Jane Doe / GreenTech Foundation / Ministry of Environment"
                          value={funderName}
                          onChange={(e) => setFunderName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Contact Person Name: *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Smith"
                          value={funderContact}
                          onChange={(e) => setFunderContact(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Official Email Address: *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. contact@example.org"
                          value={funderEmail}
                          onChange={(e) => setFunderEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Phone / Mobile Number (Optional):</label>
                        <input
                          type="tel"
                          placeholder="e.g. +254 712 345 678"
                          value={funderPhone}
                          onChange={(e) => setFunderPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-earth-500 mb-2">Sector or Areas of Interest: *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Blue Carbon Restoration, Agroforestry Nurseries, Youth Livelihoods, Climate Finance..."
                        value={funderInterest}
                        onChange={(e) => setFunderInterest(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-earth-500 mb-2">How You Want to Take Part / Contribution Proposal: *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Dictate how you want to take part, what you want to give, financial sponsorship pledge, equipment supply, or custom funding proposal..."
                        value={funderProposal}
                        onChange={(e) => setFunderProposal(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                      />
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-3 text-xs text-earth-600">
                      <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-forest-900 font-bold mb-0.5">Direct Financial & Mobile Contributions:</strong>
                        <span>If you wish to send a direct mobile money transfer, our official verified M-Pesa Receiving Number is <strong className="text-emerald-900 font-mono font-bold">+254 715 913 658</strong>. For institutional SWIFT/Bank wire details, our finance desk will respond directly to your proposal above.</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-forest-900 hover:bg-forest-950 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Heart className="w-4 h-4 fill-white/20" />
                      <span>Submit Contribution Proposal</span>
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
                      <h4 className="font-display font-extrabold text-3xl text-forest-900">Proposal Submitted!</h4>
                      <p className="text-earth-500 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you <strong className="text-forest-750 font-bold">{funderContact}</strong> from <strong className="text-forest-750 font-bold">{funderName}</strong>. Our finance and partnership desk will evaluate your contribution proposal and reply to {funderEmail} shortly.
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
                  <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-2xl text-forest-900 mb-2">Volunteer with Us</h4>
                      <p className="text-earth-500 text-xs sm:text-sm">
                        Join our community of eco-stewards. Fill in your personal details below, specify the skills or expertise you can offer, and let us know how you would like to be part of EcoStawi's conservation movement.
                      </p>
                    </div>

                    {/* Personal Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Full Name: *</label>
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
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Phone Number (Optional):</label>
                        <input
                          type="tel"
                          placeholder="e.g. +254 707 033 867"
                          value={volunteerPhone}
                          onChange={(e) => setVolunteerPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Skills You Would Like to Offer */}
                    <div>
                      <label className="block text-xs font-semibold text-earth-500 mb-2">Skills & Expertise You Would Like to Offer: *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tree Planting, Nursery Care, GIS Mapping, Youth Mentorship, Community Outreach, Logistics..."
                        value={volunteerSkills}
                        onChange={(e) => setVolunteerSkills(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                      />
                    </div>

                    {/* How You'd Like to Be Part */}
                    <div>
                      <label className="block text-xs font-semibold text-earth-500 mb-2">How You Would Like to Be Part: *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe how you want to be part of EcoStawi, your availability, or specific activities and initiatives you want to participate in..."
                        value={volunteerMotivation}
                        onChange={(e) => setVolunteerMotivation(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-forest-900 hover:bg-forest-950 text-white font-bold py-4 rounded-xl shadow-md transition-colors cursor-pointer text-xs uppercase tracking-wider"
                    >
                      Submit Volunteer Application
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
                      <h4 className="font-display font-extrabold text-3xl text-forest-900">Application Submitted!</h4>
                      <p className="text-earth-500 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you <strong className="text-forest-750 font-bold">{volunteerName}</strong>! We have received your volunteer application.
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-earth-200 p-5 max-w-md mx-auto text-left space-y-2 font-mono text-xs">
                      <div className="flex justify-between text-earth-600">
                        <span>Applicant Name:</span>
                        <span className="font-bold text-forest-900">{volunteerName}</span>
                      </div>
                      <div className="flex justify-between text-earth-600">
                        <span>Contact Email:</span>
                        <span className="font-bold text-forest-900">{volunteerEmail}</span>
                      </div>
                      <div className="flex justify-between text-earth-600">
                        <span>Skills Offered:</span>
                        <span className="font-bold text-emerald-700">{volunteerSkills}</span>
                      </div>
                    </div>

                    <p className="text-xs text-earth-400 max-w-sm mx-auto leading-relaxed border-t border-earth-200 pt-4">
                      Our team will review your application details and contact you at {volunteerEmail} with next steps.
                    </p>

                    <button
                      type="button"
                      onClick={resetAllForms}
                      className="text-xs font-bold font-mono uppercase tracking-wider text-forest-600 hover:text-forest-800 transition-colors cursor-pointer"
                    >
                      Submit Another Application
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
                      <h4 className="font-display font-bold text-2xl text-forest-900 mb-2">Partner With Us</h4>
                      <p className="text-earth-500 text-xs sm:text-sm">
                        Partner with EcoStawi to support our conservation initiatives, power climate and ESG commitments, or collaborate on community restoration and agroforestry projects.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Organization / Enterprise / Individual Name: *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. GreenTech Capital / Jane Doe"
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
                          placeholder="e.g. Sarah Jenkins"
                          value={orgContact}
                          onChange={(e) => setOrgContact(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-earth-500 mb-2">Official Email: *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. contact@example.org"
                          value={orgEmail}
                          onChange={(e) => setOrgEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-earth-500 mb-2">Alignment Proposal & Strategic Goals: *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail your proposed collaboration, funding scale, or co-development objectives."
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
                        Thank you <strong className="text-forest-750 font-bold">{orgContact}</strong> from <strong className="text-forest-750 font-bold">{orgName}</strong>. Our partnership desk will respond to {orgEmail} within 24 business hours.
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
                className="bg-earth-50 rounded-3xl border border-earth-200 p-8 sm:p-14 text-center space-y-6"
              >
                <div className="bg-earth-100 text-earth-500 p-5 rounded-full w-20 h-20 mx-auto flex items-center justify-center border border-earth-200">
                  <Briefcase className="w-9 h-9 text-forest-700" />
                </div>
                <div className="max-w-md mx-auto space-y-3">
                  <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 tracking-tight">Not Currently Recruiting</h4>
                  <p className="text-earth-600 text-sm sm:text-base leading-relaxed font-light">
                    We do not have any open positions at this time. Please check back later for future opportunities across our environmental conservation and regional restoration teams.
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>


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
