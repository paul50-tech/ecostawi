import React from 'react';
import { motion } from 'motion/react';
import { Shield, Compass, Sparkles, HeartHandshake, Eye, Target } from 'lucide-react';

export default function About() {
  const approaches = [
    {
      title: 'Community First',
      description: 'Communities own the solutions. We work alongside Community Forest Associations, Beach Management Units, youth groups, and women’s cooperatives to co-design lasting environmental change.',
      icon: HeartHandshake,
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
    },
    {
      title: 'Nature-Based Solutions',
      description: 'Working with nature instead of against it. We restore natural wetlands, indigenous canopies, and reef zones to enhance regional climate resilience and natural water towers.',
      icon: Compass,
      color: 'bg-green-500/10 text-green-700 border-green-500/20'
    },
    {
      title: 'Innovation',
      description: 'Technology improving conservation. Using advanced AI, GIS satellite tracking, drone thermal feeds, and smart data modeling to verify carbon offset metrics and prevent degradation.',
      icon: Sparkles,
      color: 'bg-teal-500/10 text-teal-700 border-teal-500/20'
    },
    {
      title: 'Partnerships',
      description: 'Collaborating for greater impact. Uniting local schools, national agencies, international scientific boards, and climate financiers to scale on-the-ground outcomes.',
      icon: Target,
      color: 'bg-blue-500/10 text-blue-700 border-blue-500/20'
    },
    {
      title: 'Transparency',
      description: 'Open governance and accountability. We ensure project metrics, funding distribution, and community benefit payouts are fully trackable and audit-ready.',
      icon: Shield,
      color: 'bg-stone-500/10 text-stone-700 border-stone-500/20'
    }
  ];

  return (
    <section id="about-us-section" className="py-20 bg-earth-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div id="about-header" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs font-semibold tracking-widest text-forest-600 uppercase mb-2">
            Who We Are
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-forest-900 tracking-tight">
            The EcoStawi Philosophy
          </h3>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Ecology + Flourish Story Block */}
        <div id="about-story-row" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <h4 className="font-display font-bold text-2xl sm:text-3xl text-forest-900">
              Where Ecology Meets Prosperity
            </h4>
            
            <p className="text-earth-500 leading-relaxed text-base sm:text-lg">
              EcoStawi is born from two powerful ideas: <strong className="text-forest-700 font-semibold font-display">Eco</strong>, representing ecology and healthy ecosystems, and <strong className="text-forest-700 font-semibold font-display">Stawi</strong>, derived from the Swahili word <em className="text-forest-600 italic">ustawi</em>, meaning to flourish, prosper, and thrive.
            </p>
            
            <p className="text-earth-500 leading-relaxed">
              We believe that environmental conservation cannot succeed without human progress. Healthy forests, rivers, oceans, and landscapes depend on thriving communities just as thriving communities depend on healthy ecosystems.
            </p>
            
            <p className="text-earth-500 leading-relaxed">
              That is why our approach goes beyond protecting nature. We invest in restoring ecosystems while creating sustainable livelihoods, building climate resilience, and empowering communities to shape a future where both people and the planet flourish together.
            </p>

            <div className="bg-forest-50 border-l-4 border-forest-600 p-5 rounded-r-2xl">
              <p className="text-forest-900 font-medium italic text-sm">
                "By investing in people, we strengthen nature. By restoring nature, we strengthen communities."
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* Swahili Etymology Graphic Card */}
            <div className="bg-gradient-to-br from-forest-800 to-forest-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden border border-forest-700">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
              
              <h5 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-6">
                Name Etymology
              </h5>
              
              <div className="space-y-6">
                <div>
                  <span className="font-display font-black text-4xl block tracking-tight text-white">Eco</span>
                  <span className="text-xs text-forest-300 font-mono">Ecology & Biological Networks</span>
                  <p className="text-sm text-forest-100/90 mt-1">
                    Represents biodiversity, carbon reserves, healthy water tables, and marine food webs.
                  </p>
                </div>
                
                <div className="border-t border-forest-800 pt-6">
                  <span className="font-display font-black text-4xl block tracking-tight text-emerald-400">Stawi</span>
                  <span className="text-xs text-forest-300 font-mono">Swahili: Ustawi (To Flourish / Prosper)</span>
                  <p className="text-sm text-forest-100/90 mt-1">
                    Represents social equity, robust sustainable household income, community climate resilience, and food security.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-forest-800/60 text-center">
                <span className="text-[11px] text-emerald-300 uppercase tracking-wider font-mono font-bold block">
                  Eco + Stawi = Nature & People Flourishing Together
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div id="vision-mission-row" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-earth-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-forest-50/50 rounded-bl-full group-hover:scale-110 transition-transform duration-300" />
            <div className="bg-forest-100 text-forest-600 p-3 rounded-2xl w-12 h-12 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-2xl text-forest-900 mb-4">
              Our Vision
            </h4>
            <p className="text-earth-500 leading-relaxed text-lg font-light">
              A thriving world where nature flourishes and communities prosper sustainably.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-earth-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-forest-50/50 rounded-bl-full group-hover:scale-110 transition-transform duration-300" />
            <div className="bg-forest-100 text-forest-600 p-3 rounded-2xl w-12 h-12 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-2xl text-forest-900 mb-4">
              Our Mission
            </h4>
            <p className="text-earth-500 leading-relaxed">
              To promote environmental conservation, sustainable livelihoods, innovation, climate action, and community empowerment through partnerships, education, advocacy, research, and practical solutions that enhance both ecological and human well-being.
            </p>
          </div>
        </div>

        {/* Our Approach (Bento Grid Style) */}
        <div id="our-approach-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h4 className="font-display font-bold text-2xl sm:text-3xl text-forest-900">
              Our Core Approach
            </h4>
            <p className="text-earth-500 text-sm mt-2">
              Uncompromising principles guiding our on-the-ground project deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approaches.map((approach, index) => {
              const Icon = approach.icon;
              return (
                <div
                  key={index}
                  id={`approach-card-${index}`}
                  className="bg-white rounded-2xl p-6 border border-earth-200 shadow-sm flex flex-col justify-between hover:border-forest-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div>
                    <div className={`inline-flex p-3 rounded-xl border mb-5 ${approach.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h5 className="font-display font-bold text-lg text-forest-900 mb-3">
                      {approach.title}
                    </h5>
                    <p className="text-earth-500 text-sm leading-relaxed">
                      {approach.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
