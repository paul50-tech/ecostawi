import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import Logo from './Logo';
import heroImage from '../assets/images/hero_forest_kenya_1784624447889.jpg';

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Lush green African forest canopy at sunrise representing EcoStawi"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-transparent to-forest-950/30" />
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-forest-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Tagline Badge - Elegant Custom Logo */}
        <motion.div
          id="tagline-badge"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/5 border border-white/10 backdrop-blur-md px-7 py-5 rounded-3xl mb-10 flex flex-col items-center justify-center shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <Logo mode="full" variant="dark" iconSize="md" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-none max-w-5xl mb-6"
        >
          Investing in Nature. <br className="hidden sm:inline" />
          <span className="text-emerald-400 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Empowering Communities.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          id="hero-subheading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-forest-100 max-w-3xl leading-relaxed font-light mb-10"
        >
          Building resilient ecosystems and thriving communities through conservation, climate action, innovation, and sustainable livelihoods.
        </motion.p>

        {/* CTAs */}
        <motion.div
          id="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-20"
        >
          <button
            id="hero-cta-primary"
            onClick={() => onNavigate('programmes')}
            className="group bg-emerald-500 hover:bg-emerald-600 text-forest-950 font-bold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Explore Our Programmes</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          <button
            id="hero-cta-secondary"
            onClick={() => onNavigate('get-involved')}
            className="group bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center justify-center space-x-2"
          >
            <Heart className="w-5 h-5 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
            <span>Support Our Work</span>
          </button>
        </motion.div>

        {/* Foundation Motto Quote */}
        <motion.div
          id="hero-motto-quote"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-center max-w-2xl px-4 border-t border-white/10 pt-8"
        >
          <p className="text-sm italic text-forest-200/90 leading-relaxed font-light">
            "Nature cannot thrive without people, and people cannot thrive without nature. Every tree restored, every livelihood strengthened, is an investment in our collective future."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
