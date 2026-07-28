import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { programmesData } from '../data';
import { Programme } from '../types';
import { ChevronDown, ChevronUp, Trees, BarChart2, BookOpen, ShieldCheck, Heart } from 'lucide-react';

export default function Programmes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', 'Ecosystem Restoration', 'Climate Action', 'Community Empowerment', 'Blue Economy', 'Carbon Markets'];

  const filteredProgrammes = selectedCategory === 'All'
    ? programmesData
    : programmesData.filter(p => p.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="programmes-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs font-semibold tracking-widest text-forest-600 uppercase mb-2">
            What We Do
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-forest-900 tracking-tight">
            Our Active Programmes
          </h3>
          <p className="text-earth-500 mt-4 leading-relaxed">
            Delivering synchronized environmental and community-led solutions that grow ecosystems, climate resilience, and sustainable livelihoods.
          </p>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filters */}
        <div id="programme-filters" className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              id={`filter-btn-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                setSelectedCategory(category);
                setExpandedId(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-forest-600 text-white shadow-md shadow-forest-600/10'
                  : 'bg-earth-100 text-earth-500 hover:bg-earth-200 hover:text-forest-750'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Programmes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProgrammes.map((prog) => {
              const isExpanded = expandedId === prog.id;
              return (
                <motion.div
                  key={prog.id}
                  id={`programme-card-${prog.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-earth-50 rounded-3xl border border-earth-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Image */}
                    <div className="relative h-56 w-full">
                      <img
                        src={prog.image}
                        alt={`${prog.title} representing EcoStawi`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-earth-50 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-forest-700 font-mono text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border border-earth-100 shadow-sm">
                        {prog.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                      <h4 className="font-display font-bold text-2xl text-forest-900 mb-3">
                        {prog.title}
                      </h4>
                      <p className="text-earth-500 text-sm leading-relaxed mb-6">
                        {prog.description}
                      </p>

                      {/* Dropdown details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            id={`details-${prog.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mb-4"
                          >
                            <h5 className="font-mono text-xs font-semibold uppercase tracking-wider text-forest-700 mb-3 flex items-center space-x-1.5">
                              <ShieldCheck className="w-4 h-4" />
                              <span>Key Initiatives & Strategy:</span>
                            </h5>
                            <ul className="space-y-2.5">
                              {prog.details.map((detail, dIdx) => {
                                const [title, ...rest] = detail.split(': ');
                                const text = rest.join(': ');
                                return (
                                  <li key={dIdx} className="flex items-start text-xs text-earth-600 leading-relaxed">
                                    <span className="text-emerald-500 mr-2.5 text-base font-black leading-none mt-0.5">•</span>
                                    <span>
                                      {text ? (
                                        <>
                                          <strong className="text-forest-900 font-bold">{title}: </strong>
                                          {text}
                                        </>
                                      ) : (
                                        detail
                                      )}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Expansion CTA Footer */}
                  <div className="px-6 pb-6 pt-2 border-t border-earth-100/50 bg-white/30 flex justify-between items-center">
                    <button
                      id={`expand-btn-${prog.id}`}
                      onClick={() => toggleExpand(prog.id)}
                      className="text-xs font-bold font-mono tracking-wider uppercase text-forest-600 hover:text-forest-800 transition-colors duration-200 flex items-center space-x-1.5 cursor-pointer py-2"
                    >
                      <span>{isExpanded ? 'Hide Strategy' : 'View Core Strategy'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    
                    <span className="text-[10px] text-earth-400 font-mono">
                      EcoStawi Impact Hub
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Dynamic Approach Summary Banner */}
        <div id="progs-summary-banner" className="mt-20 bg-gradient-to-br from-forest-850 to-forest-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-forest-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <span className="bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-semibold inline-block mb-6">
              Our Long-term Commitment
            </span>
            <h4 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight text-white mb-4">
              We grow ecosystems. We grow opportunities. We grow together.
            </h4>
            <p className="text-forest-200 text-sm leading-relaxed mb-6 font-light">
              At EcoStawi Foundation, we believe that nature and people flourish together. Every tree planted, every wetland protected, every livelihood strengthened, and every partnership formed is an investment in a future where communities and ecosystems thrive side by side.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono font-bold text-emerald-300">
              <span className="flex items-center space-x-1.5"><Trees className="w-4 h-4" /> <span>Ecosystem-focused</span></span>
              <span className="flex items-center space-x-1.5"><BarChart2 className="w-4 h-4" /> <span>Measurable Outputs</span></span>
              <span className="flex items-center space-x-1.5"><BookOpen className="w-4 h-4" /> <span>Knowledge-led</span></span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
