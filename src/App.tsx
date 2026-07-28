import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programmes from './components/Programmes';
import Digital from './components/Digital';
import NewsStories from './components/NewsStories';
import GetInvolved from './components/GetInvolved';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ExploreWork from './components/ExploreWork';
import DonateSection from './components/DonateSection';
import { ArrowUp, Trees } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [isIntroLoading, setIsIntroLoading] = useState<boolean>(true);

  // Monitor scroll height to show back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soft bootloader intro for premium feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <div id="ecostawi-root" className="min-h-screen flex flex-col justify-between bg-earth-50 text-earth-900 selection:bg-forest-100 selection:text-forest-900">
      
      {/* Intro Bootloader overlay */}
      <AnimatePresence>
        {isIntroLoading && (
          <motion.div
            id="intro-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-100 bg-forest-950 flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="bg-emerald-500 text-forest-950 p-4 rounded-3xl shadow-xl shadow-emerald-500/20 animate-bounce">
                <Trees className="w-10 h-10" />
              </div>
              <h1 className="font-display font-extrabold text-3xl tracking-tight text-white flex items-center">
                EcoStawi
                <span className="text-emerald-400 font-light ml-0.5">Foundation</span>
              </h1>
              <div className="w-16 h-0.5 bg-forest-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-mono text-emerald-300 font-medium">
                Investing in Nature. Empowering Communities.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Workspace */}
      {!isIntroLoading && (
        <>
          {/* Header Sticky Navigation bar */}
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Core Body Container */}
          <main id="app-main-content" className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {activeTab === 'home' ? (
                  <div id="home-view-group">
                    <Hero onNavigate={setActiveTab} />
                    <About />
                    <Programmes />
                    <ExploreWork onNavigate={setActiveTab} />
                    <Digital />
                    <NewsStories onNavigate={setActiveTab} />
                    <Contact />
                  </div>
                ) : activeTab === 'about' ? (
                  <div className="pt-20"><About /></div>
                ) : activeTab === 'programmes' ? (
                  <div className="pt-20"><Programmes /></div>
                ) : activeTab === 'explore' ? (
                  <div className="pt-20"><ExploreWork onNavigate={setActiveTab} /></div>
                ) : activeTab === 'digital' ? (
                  <div className="pt-20"><Digital /></div>
                ) : activeTab === 'news' ? (
                  <div className="pt-20"><NewsStories onNavigate={setActiveTab} /></div>
                ) : activeTab === 'get-involved' ? (
                  // Map 'get-involved' to the rich GetInvolved actions component!
                  <div className="pt-20">
                    <div id="involved-direct-wrapper">
                      <GetInvolved />
                    </div>
                  </div>
                ) : activeTab === 'donate' ? (
                  <div className="pt-20">
                    <DonateSection />
                  </div>
                ) : activeTab === 'contact' ? (
                  <div className="pt-20"><Contact /></div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer content */}
          <Footer activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Back to top floating button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                id="floating-scroll-top"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                onClick={handleScrollTop}
                className="fixed bottom-6 right-6 z-40 bg-forest-900 hover:bg-forest-800 text-white p-3.5 rounded-full shadow-xl border border-forest-800 hover:shadow-emerald-500/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group"
                title="Scroll back to top"
              >
                <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
