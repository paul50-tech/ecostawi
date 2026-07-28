import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Shield, Sprout, Anchor, Waves, ArrowRight, CheckCircle2, Building2, Globe, Sparkles } from 'lucide-react';

interface ExploreWorkProps {
  onNavigate?: (tab: string) => void;
}

const COUNTY_OVERVIEWS = [
  {
    id: 'nairobi',
    name: 'Nairobi County',
    shortName: 'Nairobi',
    title: 'Urban Forestry & School Chapters',
    icon: Building2,
    badge: 'Urban Forestry',
    description: 'Serving as our administrative secretariat and urban environmental innovation hub. In Nairobi, we focus on establishing school seedling nurseries, urban green corridors, and youth environmental literacy clubs.',
    focusAreas: [
      'Establishing pilot school tree nurseries across urban public schools',
      'Training urban youth in ecological literacy and seed propagation',
      'Creating green corridors along urban public spaces'
    ],
    locationDetail: 'Nairobi & Urban Corridors'
  },
  {
    id: 'mombasa',
    name: 'Mombasa County',
    shortName: 'Mombasa',
    title: 'Coastal Marine & Blue Carbon Initiative',
    icon: Anchor,
    badge: 'Marine & Blue Economy',
    description: 'Our primary coastal marine initiative located around Tudor and Mtwapa Creeks. We partner with local Beach Management Units and marine cooperatives to rehabilitate degraded tidal mudflats and protect critical marine habitats.',
    focusAreas: [
      'Partnering with local marine communities for tidal mudflat cleanup and nursery seeding',
      'Supporting sustainable marine livelihoods such as mangrove crab farming',
      'Protecting coastal fish breeding nurseries and mangrove ecosystems'
    ],
    locationDetail: 'Tudor & Mtwapa Creek'
  },
  {
    id: 'kwale',
    name: 'Kwale County',
    shortName: 'Kwale',
    title: 'Dryland Agroforestry & Farming Co-ops',
    icon: Sprout,
    badge: 'Climate-Smart Agriculture',
    description: 'Addressing erratic rainfall and soil depletion along Kwale’s agricultural belt. We introduce multi-layered dryland agroforestry systems combining drought-resilient trees, nitrogen-fixing crops, and organic soil management.',
    focusAreas: [
      'Onboarding smallholder farming households into agroforestry co-ops',
      'Distributing drought-resilient seed kits and micro-irrigation guidance',
      'Establishing sustainable harvest value chains for local farming families'
    ],
    locationDetail: 'Matuga & Lunga Lunga Belt'
  },
  {
    id: 'kilifi',
    name: 'Kilifi County',
    shortName: 'Kilifi',
    title: 'Coastal Mangrove & Community Nurseries',
    icon: Waves,
    badge: 'Coastal Restoration',
    description: 'A vital focal point for coastal forest and blue carbon preservation. We empower local women’s groups and youth cooperatives along the Mnarani lagoon to run community-managed seedling nurseries.',
    focusAreas: [
      'Establishing community-managed mangrove and hardwood seedbeds',
      'Empowering women enterprise groups through apiculture and eco-crafts',
      'Protecting coastal lagoon buffers and biodiversity'
    ],
    locationDetail: 'Mnarani Lagoon'
  },
  {
    id: 'tanariver',
    name: 'Tana River County',
    shortName: 'Tana River',
    title: 'Riparian Riverine Buffer & Wetlands',
    icon: Shield,
    badge: 'Riparian Protection',
    description: 'Focusing on Kenya’s longest river basin. Our Tana River initiative is dedicated to stabilizing vulnerable riverbanks, preventing agricultural siltation, and conserving riverine wetland ecosystems.',
    focusAreas: [
      'Planting native riparian vegetation and water-friendly indigenous buffer belts',
      'Coordinating with farming communities on riverbank soil conservation',
      'Protecting seasonal flood wetlands and riverine habitats'
    ],
    locationDetail: 'Tana Delta & Riverine Basin'
  }
];

export default function ExploreWork({ onNavigate }: ExploreWorkProps) {
  const [selectedCounty, setSelectedCounty] = useState<string>('nairobi');

  const currentCounty = COUNTY_OVERVIEWS.find(c => c.id === selectedCounty) || COUNTY_OVERVIEWS[0];

  return (
    <section id="explore-work-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-mono font-bold text-forest-800 uppercase tracking-wider">
              Where We Work
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-900 tracking-tight mb-4">
            Our Regional Work Across Kenya
          </h2>
          <p className="text-earth-600 text-base sm:text-lg leading-relaxed">
            EcoStawi operates across five primary counties: 
            <strong className="text-forest-900 font-semibold"> Nairobi, Mombasa, Kwale, Kilifi, and Tana River</strong>. 
            Select a county below to explore our environmental initiatives and community-led projects.
          </p>
        </div>

        {/* County Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {COUNTY_OVERVIEWS.map((county) => {
            const Icon = county.icon;
            const isSelected = selectedCounty === county.id;
            return (
              <button
                key={county.id}
                onClick={() => setSelectedCounty(county.id)}
                className={`flex items-center space-x-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-forest-900 text-white shadow-md'
                    : 'bg-earth-50 text-earth-600 hover:bg-earth-100 hover:text-forest-800 border border-earth-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-earth-400'}`} />
                <span>{county.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected County Overview Card */}
        <div className="bg-earth-50/70 rounded-3xl border border-earth-200 p-6 sm:p-10 shadow-sm mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCounty.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-earth-200 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider flex items-center space-x-1 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{currentCounty.locationDetail}</span>
                  </span>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900">
                    {currentCounty.title}
                  </h3>
                </div>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-forest-900 text-emerald-300">
                  {currentCounty.badge}
                </span>
              </div>

              <p className="text-earth-700 text-base sm:text-lg leading-relaxed">
                {currentCounty.description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-forest-800 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Initiatives & Focus Areas:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentCounty.focusAreas.map((area, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-earth-200/80 flex items-start space-x-3 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span className="text-xs sm:text-sm text-earth-700 font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-earth-200/80">
                <button
                  onClick={() => onNavigate && onNavigate('get-involved')}
                  className="bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center space-x-2 group"
                >
                  <span>Volunteer in {currentCounty.shortName}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('donate')}
                  className="bg-white hover:bg-earth-100 text-forest-900 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-earth-300 transition-all cursor-pointer flex items-center space-x-2"
                >
                  <span>Support Our Mission</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Simplified Call to Action */}
        <div className="bg-forest-950 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Involved Today</span>
            </span>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Join or Support EcoStawi’s Conservation Work
            </h3>
            <p className="text-earth-300 text-sm leading-relaxed">
              Whether through volunteering your skills or supporting our local initiatives, your participation helps safeguard ecosystems across Kenya.
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate && onNavigate('donate')}
              className="bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold px-6 py-3.5 rounded-xl shadow transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              Donate
            </button>
            <button
              onClick={() => onNavigate && onNavigate('get-involved')}
              className="bg-forest-900 hover:bg-forest-800 text-white font-bold px-6 py-3.5 rounded-xl border border-forest-700 transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              Get Involved
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
