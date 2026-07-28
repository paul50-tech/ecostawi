import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Shield, Sprout, Anchor, Waves, ArrowRight, CheckCircle2, Clock, Users, Building2, Cpu, Globe } from 'lucide-react';
import { projectsData } from '../data';

interface ExploreWorkProps {
  onNavigate?: (tab: string) => void;
}

const COUNTY_OVERVIEWS = [
  {
    id: 'nairobi',
    name: 'Nairobi County',
    title: 'Secretariat HQ & Urban Forestry Chapters',
    icon: Building2,
    badge: 'Operations HQ & Urban Nurseries',
    color: 'emerald',
    description: 'Serving as our national administrative secretariat and urban environmental innovation hub. In Nairobi, we focus on establishing school seedling nurseries, urban green corridors along Karura and Ngong edges, and youth environmental clubs.',
    commitments: [
      'Establishing 8 pilot school tree nurseries across urban public schools.',
      'Training 500+ urban youth in ecological literacy and seed propagation.',
      'Developing AI-driven monitoring protocols from our Nairobi data hub.'
    ],
    targetArea: '100 Ha Target Canopy',
    status: 'Active Setup & Secretariat'
  },
  {
    id: 'mombasa',
    name: 'Mombasa County',
    title: 'Coastal Marine & Blue Carbon Initiative',
    icon: Anchor,
    badge: 'Marine Mudflats & Blue Economy',
    color: 'blue',
    description: 'Our primary coastal marine initiative located around Tudor and Mtwapa Creeks. Here, we partner with Beach Management Units (BMUs) and marine cooperatives to rehabilitate degraded tidal mudflats and protect critical fish breeding nurseries.',
    commitments: [
      'Partnering with local BMUs for mangrove lagoon cleanup and nursery seeding.',
      'Supporting alternative marine livelihoods such as mangrove crab farming co-ops.',
      'Conducting baseline coastal sediment tests for blue carbon verification.'
    ],
    targetArea: '80 Ha Tidal Mudflats',
    status: 'Active Setup & Community Alignment'
  },
  {
    id: 'kwale',
    name: 'Kwale County',
    title: 'Dryland Agroforestry & Cashew Concession',
    icon: Sprout,
    badge: 'Climate-Smart Agriculture',
    color: 'amber',
    description: 'Addressing erratic rainfall and soil depletion along Kwale’s agricultural belt. We are introducing multi-layered dryland agroforestry systems combining drought-resilient cashew trees, nitrogen-fixing legumes, and organic mulching.',
    commitments: [
      'Onboarding 120 pioneer smallholder farming households into agroforestry co-ops.',
      'Distributing drought-resilient seed kits and solar micro-irrigation units.',
      'Establishing organic harvest value chains to secure stable household income.'
    ],
    targetArea: '120 Ha Farmer Plots',
    status: 'Active Farmer Onboarding'
  },
  {
    id: 'kilifi',
    name: 'Kilifi County',
    title: 'Coastal Mangrove & Lagoon Nurseries',
    icon: Waves,
    badge: 'Coastal Restoration',
    color: 'cyan',
    description: 'A vital focal point for both terrestrial coastal forest patches and aquatic blue carbon preservation. We empower local women’s groups and youth cooperatives along the Mnarani lagoon and Arabuko border to run commercial-grade nurseries.',
    commitments: [
      'Establishing 4 community-managed mangrove and hardwood seedbeds.',
      'Empowering women enterprise groups through apiculture and eco-craft financing.',
      'Deploying satellite telemetry to monitor coastline buffer recovery.'
    ],
    targetArea: '90 Ha Coastal Lagoon',
    status: 'Active Nursery Propagation'
  },
  {
    id: 'tanariver',
    name: 'Tana River County',
    title: 'Riparian Riverine Catchment & Wetlands',
    icon: Shield,
    badge: 'Riparian Ecosystem Protection',
    color: 'teal',
    description: 'Focusing on Kenya’s longest river basin. Our Tana River initiative is dedicated to stabilizing vulnerable riverbanks, preventing agricultural siltation, and conserving rich riverine wetland biodiversity through deep-rooted vegetative buffers.',
    commitments: [
      'Planting native riparian bamboo and water-friendly indigenous buffer belts.',
      'Coordinating with upstream and downstream farming communities on soil conservation.',
      'Mapping hydrological baselines to protect seasonal flood wetlands.'
    ],
    targetArea: '150 Ha Riverine Buffer',
    status: 'Planning & Baseline Survey'
  }
];

export default function ExploreWork({ onNavigate }: ExploreWorkProps) {
  const [selectedCounty, setSelectedCounty] = useState<string>('nairobi');

  const currentCounty = COUNTY_OVERVIEWS.find(c => c.id === selectedCounty) || COUNTY_OVERVIEWS[0];
  const matchingProject = projectsData.find(p => p.county.toLowerCase().includes(currentCounty.name.split(' ')[0].toLowerCase())) || projectsData[0];

  return (
    <section id="explore-work-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full mb-4">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-mono font-bold text-forest-800 uppercase tracking-wider">
              Operational Footprint
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-900 tracking-tight mb-4">
            Explore Where We Work
          </h2>
          <p className="text-earth-600 text-base sm:text-lg leading-relaxed">
            Our strategic conservation operations are concentrated in five key counties: 
            <strong className="text-forest-900 font-semibold"> Nairobi, Mombasa, Kwale, Kilifi, and Tana River</strong>. 
            We focus strictly on factual, community-led commitments and transparent ground execution.
          </p>
        </div>

        {/* County Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {COUNTY_OVERVIEWS.map((county) => {
            const Icon = county.icon;
            const isSelected = selectedCounty === county.id;
            return (
              <button
                key={county.id}
                onClick={() => setSelectedCounty(county.id)}
                className={`flex items-center space-x-2.5 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-forest-900 text-white shadow-md shadow-forest-900/15 scale-105'
                    : 'bg-earth-50 text-earth-600 hover:bg-earth-100 hover:text-forest-800 border border-earth-200/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-earth-400'}`} />
                <span>{county.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed County Spotlight Card */}
        <div className="bg-earth-50/70 rounded-3xl border border-earth-200/80 p-6 sm:p-12 shadow-sm mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCounty.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Information & Commitments (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-forest-900 text-emerald-400">
                    {currentCounty.badge}
                  </span>
                  <span className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-earth-500 bg-white px-3 py-1 rounded-full border border-earth-200">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Status: {currentCounty.status}</span>
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900">
                  {currentCounty.title}
                </h3>

                <p className="text-earth-700 text-base leading-relaxed">
                  {currentCounty.description}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="font-display font-bold text-sm uppercase tracking-wider text-forest-800 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Core Strategic Commitments:</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {currentCounty.commitments.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-sm text-earth-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onNavigate && onNavigate('get-involved')}
                    className="bg-forest-600 hover:bg-forest-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center space-x-2 group"
                  >
                    <span>Volunteer in {currentCounty.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => onNavigate && onNavigate('donate')}
                    className="bg-white hover:bg-earth-100 text-forest-900 font-bold text-sm px-6 py-3.5 rounded-xl border border-earth-300 transition-all cursor-pointer flex items-center space-x-2"
                  >
                    <span>Donate to Our Mission</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Target Metrics & Pilot Project Details (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-earth-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-earth-100">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-earth-400 block">
                      Designated Hub
                    </span>
                    <h4 className="font-display font-bold text-lg text-forest-900">
                      {matchingProject.name}
                    </h4>
                  </div>
                  <div className="bg-forest-50 p-3 rounded-xl text-forest-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-earth-50 p-4 rounded-xl border border-earth-150">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-earth-400 block mb-1">
                      Target Area Scope
                    </span>
                    <span className="font-display font-extrabold text-xl text-forest-900">
                      {currentCounty.targetArea}
                    </span>
                  </div>

                  <div className="bg-earth-50 p-4 rounded-xl border border-earth-150">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-earth-400 block mb-1">
                      Community Partners
                    </span>
                    <span className="font-display font-extrabold text-xl text-forest-900">
                      {matchingProject.communityPartners} Units
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 flex items-start space-x-3">
                  <Cpu className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-forest-900 space-y-1">
                    <strong className="font-bold block">AI Telemetry Readiness:</strong>
                    <span>
                      GIS boundaries and baseline drone routes for this county are configured. Live telemetry logs will populate as planting operations commence.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Call to Action Banner */}
        <div className="bg-forest-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl z-10">
            <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest block">
              Factual & Transparent Impact
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Ready to support our launch in these 5 counties?
            </h3>
            <p className="text-earth-300 text-sm sm:text-base leading-relaxed">
              We rely on genuine partnerships and factual data. Your support directly funds seedling propagation, women’s beekeeping co-ops, and marine mudflat recovery.
            </p>
          </div>
          <div className="z-10 shrink-0 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate && onNavigate('donate')}
              className="bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              Donate to Our Mission
            </button>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="bg-forest-900 hover:bg-forest-800 text-white font-bold px-6 py-4 rounded-xl border border-forest-700 transition-all cursor-pointer"
            >
              Contact Secretariat
            </button>
          </div>
          {/* Subtle Background Decoration */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
