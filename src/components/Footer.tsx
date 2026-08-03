import React, { useState } from 'react';
import { Sprout, Mail, Youtube, Facebook, Linkedin, Instagram, Twitter, MessageCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Footer({ activeTab, setActiveTab }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
  };

  const handleLinkClick = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/ecostawi-foundation/' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/ecostawifoundation/' },
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/share/1BmJGZBPSw/' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@ecostawifoundation?si=1lhyw36_Z8JIaLt3' },
    { name: 'X', icon: Twitter, url: 'https://x.com/EcostawiF' }
  ];

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programmes', label: 'Our Programmes' },
    { id: 'explore', label: 'Explore Our Work' },
    { id: 'digital', label: 'EcoStawi Digital' },
    { id: 'news', label: 'News & Stories' },
    { id: 'get-involved', label: 'Get Involved' },
    { id: 'donate', label: 'Donate to Our Mission' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <footer id="main-footer" className="bg-forest-950 text-white pt-20 pb-8 border-t border-forest-900/60 relative overflow-hidden">
      {/* Subtle details background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#15803d_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Logo & Vision/Mission statement (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cursor-pointer group flex items-center" onClick={() => handleLinkClick('home')}>
              <Logo mode="full" variant="dark" iconSize="sm" className="scale-90 origin-left sm:scale-100" />
            </div>

            <p className="text-sm text-forest-200/90 leading-relaxed font-light max-w-md">
              <strong>Our Vision:</strong> A thriving world where nature flourishes and communities prosper sustainably.
            </p>

            <p className="text-sm text-forest-200/90 leading-relaxed font-light max-w-md">
              <strong>Our Mission:</strong> To promote environmental conservation, sustainable livelihoods, innovation, climate action, and community empowerment through co-designed solutions.
            </p>

            {/* Social media badge strip */}
            <div className="space-y-2.5">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-forest-400 font-bold">Connect With Us</span>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className="bg-forest-900/80 hover:bg-emerald-500 hover:text-forest-950 text-forest-300 p-2.5 rounded-xl border border-forest-800/60 transition-all duration-300 flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links (3 columns) */}
          <div className="lg:col-span-3 space-y-5">
            <h5 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold border-b border-forest-900 pb-2">Quick Navigation</h5>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    id={`footer-nav-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className="text-sm text-forest-300 hover:text-emerald-400 font-medium transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup (4 columns) */}
          <div className="lg:col-span-4 space-y-5">
            <h5 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold border-b border-forest-900 pb-2 font-semibold">Climate Newsletter</h5>
            <p className="text-sm text-forest-300 leading-relaxed font-light">
              Receive verified scientific digests, carbon credit payouts updates, and local chapter field journals directly in your inbox.
            </p>

            {!newsletterSuccess ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative rounded-xl shadow-sm flex overflow-hidden border border-forest-850">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-forest-400" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-forest-900/60 pl-9 pr-3 py-3 text-xs font-medium text-white placeholder-forest-400 focus:outline-none focus:ring-0 border-0"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-forest-950 font-bold px-4 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                  >
                    Join List
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-forest-900/55 p-4 rounded-xl border border-forest-800 flex items-center space-x-3 text-emerald-400">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                <p className="text-xs font-mono font-medium leading-tight">
                  Successfully subscribed! Welcome to the EcoStawi Stewardship List.
                </p>
              </div>
            )}

            <div className="text-[10px] text-forest-400 leading-tight">
              *We value your privacy. Unsubscribe any time. Direct messages route through double SSL encryption.
            </div>
          </div>

        </div>

        {/* Lower footer signature */}
        <div className="border-t border-forest-900/80 pt-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
          <div className="space-y-1">
            <p className="text-xs text-forest-400">
              © {new Date().getFullYear()} EcoStawi Foundation. All rights reserved.
            </p>
            <p className="text-[10px] text-forest-500 font-mono">
              Investing in Nature. Empowering Communities.
            </p>
          </div>

          <div className="text-center max-w-md md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-forest-900">
            <p className="text-xs italic text-forest-300 font-light">
              "Nature cannot thrive without people, and people cannot thrive without nature."
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
