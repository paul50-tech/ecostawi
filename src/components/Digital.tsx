import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Download, Info, X } from 'lucide-react';

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
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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
            
            <p className="text-[11px] font-mono text-earth-500 pt-6">
              *Note: Application download paths and store links will be published here upon our official v1.0 release.
            </p>
          </motion.div>
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
