import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Download, Radio, Calculator, MapPin, Layers, CheckCircle, Info, X, ShieldCheck, Cpu, Sparkles, ArrowRight } from 'lucide-react';

export default function Digital() {
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleDownloadClick = (platform: string) => {
    setToast({
      message: `The download link for ${platform} will be updated shortly. Thank you for your interest in joining our digital conservation network!`,
      type: 'info'
    });
  };

  const mobileFeatures = [
    {
      icon: Radio,
      title: 'GIS & Satellite Telemetry',
      description: 'Track high-resolution canopy growth, multispectral drone thermal feeds, and real-time vegetative index data directly from the field.'
    },
    {
      icon: Calculator,
      title: 'Dynamic Eco-Impact Calculator',
      description: 'Calculate localized carbon sequestration, tree survivability metrics, and household income distributions with VCS-aligned precision.'
    },
    {
      icon: MapPin,
      title: 'Offline Field Data Collector',
      description: 'Empower smallholder farmers and carbon auditors to log ground surveys, tag GPS plot boundaries, and upload evidence without cellular coverage.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Carbon & Livelihoods',
      description: 'Monitor transparent micro-finance disbursements, community seedbed inventories, and blockchain-grounded benefit sharing in real time.'
    }
  ];

  return (
    <section id="ecostawi-digital-section" className="py-24 bg-earth-100 relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-200/40 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest-900 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>EcoStawi Mobile App</span>
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-forest-950 tracking-tight mb-6">
              Conservation Powered by Our Mobile App
            </h2>
            <p className="text-earth-600 text-base sm:text-lg leading-relaxed font-light">
              We have transitioned all our advanced digital tools from the web into a dedicated, offline-first mobile application. Whether you are a field auditor, community seed grower, or conservation partner, you can now access live GIS telemetry and impact tracking natively on your device.
            </p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
          </motion.div>
        </div>

        {/* Mobile Showcase & Download Banner */}
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-forest-900 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#14532d_1px,transparent_1px),linear-gradient(to_bottom,#14532d_1px,transparent_1px)] bg-[size:32px_32px] opacity-10" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: App Info & Download Buttons (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 font-mono text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Available Soon on iOS & Android</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                Take the Digital Hub Everywhere You Go
              </h3>

              <p className="text-forest-200 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Designed for field resilience across Kenya's remote coastal mangroves and highland forests. Seamlessly collect ground truth surveys, inspect aerial drone telemetry, and quantify carbon additionality from your smartphone.
              </p>

              {/* Download Buttons Section */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownloadClick("Android (APK)");
                  }}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-display font-extrabold px-7 py-4 rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 flex items-center justify-center space-x-3 cursor-pointer group"
                >
                  <Download className="w-5 h-5 text-forest-950 group-hover:-translate-y-0.5 transition-transform" />
                  <div className="text-left leading-none">
                    <span className="block text-[9px] uppercase tracking-widest font-mono font-bold opacity-80 mb-1">Direct Binary / APK</span>
                    <span className="text-sm">Download for Android</span>
                  </div>
                </a>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownloadClick("iOS (App Store)");
                  }}
                  className="w-full sm:w-auto bg-forest-900 hover:bg-forest-800 text-white font-display font-bold px-7 py-4 rounded-2xl border border-forest-700 shadow-md transition-all duration-200 flex items-center justify-center space-x-3 cursor-pointer group"
                >
                  <Smartphone className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div className="text-left leading-none">
                    <span className="block text-[9px] uppercase tracking-widest font-mono text-forest-300 mb-1">Coming Soon</span>
                    <span className="text-sm">Download for iOS</span>
                  </div>
                </a>
              </div>

              <p className="text-[11px] font-mono text-forest-400 pt-2">
                *Note: Application download paths and store links will be published here upon our official v1.0 release.
              </p>
            </div>

            {/* Right Column: Visual App Card Preview (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-forest-900/80 border border-forest-800 rounded-3xl p-6 sm:p-8 shadow-inner relative">
                <div className="flex items-center justify-between border-b border-forest-800 pb-4 mb-6">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-forest-300 ml-2">EcoStawi Mobile Field Suite</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    v1.0 Ready
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs text-forest-200">
                  <div className="bg-forest-950/90 p-3.5 rounded-xl border border-forest-800/80 flex items-center justify-between">
                    <span className="flex items-center text-emerald-400 font-semibold">
                      <CheckCircle className="w-4 h-4 mr-2" /> GIS Telemetry Engine
                    </span>
                    <span className="text-[10px] text-forest-400">Integrated</span>
                  </div>
                  <div className="bg-forest-950/90 p-3.5 rounded-xl border border-forest-800/80 flex items-center justify-between">
                    <span className="flex items-center text-emerald-400 font-semibold">
                      <CheckCircle className="w-4 h-4 mr-2" /> Offline Data Collector
                    </span>
                    <span className="text-[10px] text-forest-400">Integrated</span>
                  </div>
                  <div className="bg-forest-950/90 p-3.5 rounded-xl border border-forest-800/80 flex items-center justify-between">
                    <span className="flex items-center text-emerald-400 font-semibold">
                      <CheckCircle className="w-4 h-4 mr-2" /> Carbon Impact Valuator
                    </span>
                    <span className="text-[10px] text-forest-400">Integrated</span>
                  </div>
                  <div className="bg-forest-950/90 p-3.5 rounded-xl border border-forest-800/80 flex items-center justify-between">
                    <span className="flex items-center text-emerald-400 font-semibold">
                      <CheckCircle className="w-4 h-4 mr-2" /> Drone Thermal Imagery
                    </span>
                    <span className="text-[10px] text-forest-400">Integrated</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-forest-800/60 flex items-center justify-between text-[11px] text-forest-400">
                  <span>Supported OS: Android 10+ / iOS 15+</span>
                  <span className="text-emerald-400 font-bold">Offline Capable</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Feature Grid: What's inside the Mobile App */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mobileFeatures.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-earth-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800 mb-5">
                    <IconComponent className="w-6 h-6 text-forest-700" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-forest-950 mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-earth-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-earth-100 flex items-center text-[11px] font-mono font-bold text-emerald-600">
                  <span>In Mobile Suite</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modern custom Toast notification portal replacement for window.alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            id="digital-toast"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-forest-900 border border-forest-800 text-white rounded-2xl p-4 shadow-2xl flex items-start space-x-3 backdrop-blur-md"
          >
            <div className="bg-emerald-500/10 p-1.5 rounded-lg text-emerald-400 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="flex-grow space-y-1 pr-4">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">System Notification</p>
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
