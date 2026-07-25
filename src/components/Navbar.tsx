import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sprout, Globe, Laptop, Heart, FileText, Phone, Award } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Globe },
    { id: 'about', label: 'About Us', icon: Award },
    { id: 'programmes', label: 'Programmes', icon: Sprout },
    { id: 'digital', label: 'EcoStawi Digital', icon: Laptop },
    { id: 'news', label: 'News & Stories', icon: FileText },
    { id: 'get-involved', label: 'Get Involved', icon: Heart },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-earth-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div
            id="brand-logo-container"
            className="cursor-pointer group flex items-center"
            onClick={() => handleNavClick('home')}
          >
            <Logo mode="full" variant="light" iconSize="sm" className="scale-90 origin-left sm:scale-100" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group cursor-pointer ${
                    isActive
                      ? 'text-forest-800 bg-forest-50'
                      : 'text-earth-500 hover:text-forest-700 hover:bg-earth-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-forest-600' : 'text-earth-400 group-hover:text-forest-500'}`} />
                  <span>{item.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-forest-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
            
            <button
              id="cta-nav-button"
              onClick={() => handleNavClick('get-involved')}
              className="ml-4 bg-forest-600 hover:bg-forest-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-md shadow-forest-600/10 hover:shadow-lg hover:shadow-forest-600/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 flex items-center space-x-1.5"
            >
              <Heart className="w-4 h-4 fill-white/10" />
              <span>Donate</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-earth-500 hover:text-forest-600 p-2 rounded-lg hover:bg-earth-100 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-b border-earth-150 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-1.5 sm:px-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-forest-800 bg-forest-50 font-semibold'
                        : 'text-earth-500 hover:text-forest-700 hover:bg-earth-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-forest-600' : 'text-earth-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 border-t border-earth-100 flex flex-col space-y-2">
                <button
                  id="mobile-nav-cta"
                  onClick={() => handleNavClick('get-involved')}
                  className="w-full bg-forest-600 text-white font-medium text-center py-3 rounded-xl shadow-md shadow-forest-600/10 hover:bg-forest-700 transition-colors duration-200"
                >
                  Get Involved & Donate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
