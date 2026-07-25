import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data';
import { Project } from '../types';
import { Laptop, Navigation, Cpu, Sparkles, MapPin, Radio, Calculator, ShieldAlert, CheckCircle, Smartphone, Info, X } from 'lucide-react';

export default function Digital() {
  const [selectedProject, setSelectedProject] = useState<Project>(projectsData[0]);
  const [isDroneFlying, setIsDroneFlying] = useState<boolean>(false);
  const [dronePosIndex, setDronePosIndex] = useState<number>(0);
  const [droneTelemetry, setDroneTelemetry] = useState<string>('Standby. Waypoint loading...');
  
  // Custom Toast State for gorgeous alerts
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'error' | 'success' } | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  
  // Calculator States
  const [supportTrees, setSupportTrees] = useState<number>(150);
  const [supportHectares, setSupportHectares] = useState<number>(5);
  const [offsetType, setOffsetType] = useState<'individual' | 'corporate'>('individual');

  // Simulated drone pathing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDroneFlying && selectedProject.dronePath && selectedProject.dronePath.length > 0) {
      timer = setTimeout(() => {
        const nextIndex = (dronePosIndex + 1) % selectedProject.dronePath!.length;
        setDronePosIndex(nextIndex);
        
        // Randomize telemetry logs
        const logs = [
          `Analyzing multispectral canopy density at lat:${selectedProject.dronePath![nextIndex].lat.toFixed(4)}, lng:${selectedProject.dronePath![nextIndex].lng.toFixed(4)}`,
          `AI Model detected +14% native sapling growth compared to Q1 imagery`,
          `Soil moisture content verified at 62% in restoration sector B-12`,
          `Aerial thermal feed: No thermal anomalies or illegal charcoal hazards detected`,
          `Updating GIS carbon biomass data model... verified additionality.`
        ];
        setDroneTelemetry(logs[Math.floor(Math.random() * logs.length)]);
      }, 3000);
    } else {
      setIsDroneFlying(false);
      setDronePosIndex(0);
      setDroneTelemetry('Telemetry Standby. Click "Launch AI Drone Telemetry" above.');
    }
    return () => clearTimeout(timer);
  }, [isDroneFlying, dronePosIndex, selectedProject]);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setIsDroneFlying(false);
    setDronePosIndex(0);
    setDroneTelemetry('Telemetry loaded. Standby for launch.');
  };

  // Calculations
  const calculatedCO2 = (supportTrees * 22) + (supportHectares * 850); // 22kg per tree, 850kg per hectare
  const calculatedCarsRemoved = (calculatedCO2 / 4600).toFixed(1); // average car emits 4.6 tons/year
  const communityIncome = (supportTrees * 2.5) + (supportHectares * 120); // USD flowing directly to locals

  return (
    <section id="ecostawi-digital-section" className="py-20 bg-earth-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs font-semibold tracking-widest text-forest-600 uppercase mb-2">
            EcoStawi Digital Hub
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-forest-900 tracking-tight">
            Smart Conservation. Real Impact.
          </h3>
          <p className="text-earth-500 mt-4 leading-relaxed">
            Experience the EcoStawi Foundation digital ecology platform. We integrate artificial intelligence, GIS, autonomous telemetry, and multispectral drone imagery to deliver smarter, fully verifiable climate restoration.
          </p>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Left Column: Interactive Telemetry & GIS map screen (7 columns) */}
          <div className="lg:col-span-7 bg-forest-950 text-white rounded-3xl p-6 sm:p-8 border border-forest-900 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Background grids */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#14532d_1px,transparent_1px),linear-gradient(to_bottom,#14532d_1px,transparent_1px)] bg-[size:32px_32px] opacity-10" />
            
            <div className="relative z-10">
              {/* Telemetry Header */}
              <div className="flex items-center justify-between border-b border-forest-800 pb-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">GIS Canopy Telemetry Panel</h4>
                    <p className="text-[10px] text-forest-300 font-mono uppercase tracking-wider">Project: {selectedProject.name}</p>
                  </div>
                </div>
                <span className="flex items-center space-x-1 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20 px-2.5 py-1 rounded-full bg-emerald-500/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />
                  ONLINE
                </span>
              </div>

              {/* Graphical Canvas Simulation */}
              <div className="bg-forest-900/40 border border-forest-800/80 rounded-2xl h-80 relative flex items-center justify-center overflow-hidden mb-6">
                
                {/* SVG Kenya County grid mapping outline (conceptual) */}
                <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 400 400">
                  <path d="M 120,40 L 220,30 L 320,80 L 380,180 L 330,320 L 220,360 L 140,320 L 50,220 Z" fill="none" stroke="#052e16" strokeWidth="2" strokeDasharray="5,5" />
                  <circle cx="200" cy="200" r="120" fill="none" stroke="#15803d" strokeWidth="1" opacity="0.3" />
                  <circle cx="200" cy="200" r="60" fill="none" stroke="#15803d" strokeWidth="1" opacity="0.2" />
                  <line x1="200" y1="50" x2="200" y2="350" stroke="#15803d" strokeWidth="0.5" opacity="0.15" />
                  <line x1="50" y1="200" x2="350" y2="200" stroke="#15803d" strokeWidth="0.5" opacity="0.15" />
                </svg>

                {/* Plot points of ALL projects */}
                <svg className="absolute inset-0 w-full h-full z-20" viewBox="0 0 400 400">
                  {projectsData.map((proj) => {
                    const isCurrent = proj.id === selectedProject.id;
                    // Map coordinates slightly relative to canvas center (lat/lng bounds in Kenya roughly around equator)
                    const cx = 200 + (proj.coordinates.lng - 37.5) * 45;
                    const cy = 200 - (proj.coordinates.lat + 1.5) * 45;
                    
                    return (
                      <g
                        key={proj.id}
                        className="cursor-pointer"
                        transform={`translate(${cx}, ${cy})`}
                        onClick={() => handleProjectSelect(proj)}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={isCurrent ? 12 : 6}
                          className={`transition-all duration-300 ${isCurrent ? 'fill-emerald-400/20 stroke-emerald-400' : 'fill-forest-600/60 stroke-forest-500'}`}
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r={isCurrent ? 5 : 3.5}
                          className={isCurrent ? 'fill-emerald-400' : 'fill-forest-400'}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Drone Symbol moving along waypoints */}
                {isDroneFlying && selectedProject.dronePath && selectedProject.dronePath.length > 0 && (
                  <motion.div
                    className="absolute z-30"
                    animate={{
                      x: 200 + (selectedProject.dronePath[dronePosIndex].lng - 37.5) * 45,
                      y: 200 - (selectedProject.dronePath[dronePosIndex].lat + 1.5) * 45
                    }}
                    transition={{ duration: 2.8, ease: 'easeInOut' }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-2 bg-red-500/30 rounded-full blur-sm animate-ping" />
                      <Navigation className="w-5 h-5 text-red-500 fill-red-500 transform rotate-45" />
                      <span className="absolute -top-6 -left-8 bg-red-600 text-[8px] px-1 rounded text-white font-mono uppercase font-bold tracking-widest whitespace-nowrap">
                        Drone DR-9
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Compass & Altitude graphic overlays */}
                <div className="absolute top-4 left-4 font-mono text-[9px] text-forest-300 space-y-1 bg-forest-950/80 p-2.5 rounded-lg border border-forest-800">
                  <p>ALTITUDE: {isDroneFlying ? '122m AGL' : '0m'}</p>
                  <p>BATTERY: {isDroneFlying ? '87%' : '100%'}</p>
                  <p>GPS SATS: 14 LOCKED</p>
                  <p>WIND: 6.4 KT NE</p>
                </div>

                <div className="absolute bottom-4 right-4 bg-forest-950/95 border border-forest-800 p-2.5 rounded-lg max-w-[200px]">
                  <p className="font-mono text-[9px] text-emerald-400 leading-none mb-1 font-bold">ACTIVE SCAN AREA</p>
                  <p className="text-[10px] font-semibold text-white leading-tight truncate">{selectedProject.location}</p>
                </div>
              </div>

              {/* Drone Action triggers & Telemetry output logs */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    id="telemetry-launch-btn"
                    onClick={() => {
                      if (!selectedProject.dronePath || selectedProject.dronePath.length === 0) {
                        setToast({
                          message: "The Nyeri project is in 'Planning' status. Woodlot planting must commence before drone thermal routes are certified.",
                          type: 'info'
                        });
                        return;
                      }
                      setIsDroneFlying(!isDroneFlying);
                    }}
                    className={`px-5 py-3 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center space-x-2 ${
                      isDroneFlying
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-forest-950'
                    }`}
                  >
                    <Cpu className={`w-4 h-4 ${isDroneFlying ? 'animate-spin' : ''}`} />
                    <span>{isDroneFlying ? 'Abort Drone Flight' : 'Launch AI Drone Telemetry'}</span>
                  </button>

                  <div className="text-[11px] text-forest-300 font-mono text-center sm:text-right">
                    Coordinates: {selectedProject.coordinates.lat.toFixed(4)}°S, {selectedProject.coordinates.lng.toFixed(4)}°E
                  </div>
                </div>

                <div className="bg-forest-900/60 border border-forest-800 p-4 rounded-xl min-h-[64px] flex items-center">
                  <p className="font-mono text-[11px] text-emerald-300 leading-relaxed w-full">
                    <span className="text-emerald-500 font-bold mr-1.5">&gt;</span>
                    {droneTelemetry}
                  </p>
                </div>
              </div>

            </div>

            {/* Simulated Live Metadata stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-forest-800/60">
              <div>
                <span className="block text-[10px] text-forest-400 uppercase tracking-wider font-mono">Restoration Size</span>
                <span className="text-sm font-extrabold text-white font-display">{selectedProject.sizeHectares.toLocaleString()} Ha</span>
              </div>
              <div>
                <span className="block text-[10px] text-forest-400 uppercase tracking-wider font-mono">Trees Supported</span>
                <span className="text-sm font-extrabold text-white font-display">{selectedProject.treesPlanted ? selectedProject.treesPlanted.toLocaleString() : 'N/A'}</span>
              </div>
              <div>
                <span className="block text-[10px] text-forest-400 uppercase tracking-wider font-mono">CO2 Offset (Tons)</span>
                <span className="text-sm font-extrabold text-white font-display">{selectedProject.carbonOffsetTons.toLocaleString()} yr</span>
              </div>
              <div>
                <span className="block text-[10px] text-forest-400 uppercase tracking-wider font-mono">Local Partners</span>
                <span className="text-sm font-extrabold text-white font-display">{selectedProject.communityPartners.toLocaleString()} households</span>
              </div>
            </div>

          </div>

          {/* Right Column: Project selection menu & Dynamic Carbon Calculator (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Project List Selector */}
            <div className="bg-white rounded-3xl p-6 border border-earth-200 shadow-sm">
              <h4 className="font-display font-bold text-lg text-forest-900 mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-forest-600" />
                <span>Select Restoration Base</span>
              </h4>
              
              <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                {projectsData.map((proj) => (
                  <button
                    key={proj.id}
                    id={`project-select-${proj.id}`}
                    onClick={() => handleProjectSelect(proj)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      selectedProject.id === proj.id
                        ? 'border-forest-600 bg-forest-50/50 text-forest-900 font-semibold'
                        : 'border-earth-200 text-earth-500 hover:bg-earth-100 hover:text-forest-800'
                    }`}
                  >
                    <div>
                      <p className="font-display font-bold text-sm leading-none mb-1 text-forest-950">{proj.name}</p>
                      <p className="text-[10px] text-earth-500 font-light truncate">{proj.location}</p>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold font-mono ${
                      proj.status === 'Planning' ? 'bg-orange-100 text-orange-700' :
                      proj.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {proj.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Carbon/Impact Calculator */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-earth-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-forest-50 rounded-bl-full" />
              
              <h4 className="font-display font-bold text-lg text-forest-900 mb-2 flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-forest-600" />
                <span>Eco Impact Calculator</span>
              </h4>
              <p className="text-xs text-earth-500 mb-6">
                Calculate the real, localized environmental & economic impact of your conservation funding.
              </p>

              <div className="space-y-5">
                {/* Sliders */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-earth-500">Support Indigenous Trees:</span>
                    <span className="text-forest-700 font-bold font-mono">{supportTrees} Trees</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={supportTrees}
                    onChange={(e) => setSupportTrees(Number(e.target.value))}
                    className="w-full h-2 bg-earth-200 rounded-lg appearance-none cursor-pointer accent-forest-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-earth-500">Restore Coastal Mangroves:</span>
                    <span className="text-forest-700 font-bold font-mono">{supportHectares} Hectares</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={supportHectares}
                    onChange={(e) => setSupportHectares(Number(e.target.value))}
                    className="w-full h-2 bg-earth-200 rounded-lg appearance-none cursor-pointer accent-forest-600"
                  />
                </div>

                {/* Outputs Panel */}
                <div className="bg-forest-50 rounded-2xl p-5 border border-forest-100 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-forest-100">
                    <div>
                      <span className="text-[10px] text-forest-700 uppercase tracking-wider font-mono font-bold block">Carbon Sequestration</span>
                      <span className="text-xl font-display font-black text-forest-900">{calculatedCO2.toLocaleString()} kg / year</span>
                    </div>
                    <span className="text-xs font-bold text-forest-600 font-mono">({(calculatedCO2/1000).toFixed(1)} Tons CO2)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] text-earth-500 uppercase tracking-wider font-mono block">Household Income</span>
                      <span className="text-sm font-extrabold text-forest-800 font-display">${communityIncome.toLocaleString()} USD</span>
                      <p className="text-[9px] text-earth-400 mt-0.5">Flows directly to local seed growers</p>
                    </div>
                    
                    <div>
                      <span className="text-[9px] text-earth-500 uppercase tracking-wider font-mono block">Equivalent Cars Off Road</span>
                      <span className="text-sm font-extrabold text-forest-800 font-display">{calculatedCarsRemoved} vehicles / yr</span>
                      <p className="text-[9px] text-earth-400 mt-0.5">In emission terms</p>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-center text-earth-400 italic">
                  *Calculated based on VCS-verified terrestrial biomass models and local cooperative wage distributions.
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Web Telemetry Portal & Field Tools Showcase Banner */}
        <div id="digital-download-banner" className="bg-white rounded-3xl p-8 sm:p-12 border border-earth-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:max-w-xl space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
              Field Telemetry & Web Portal
            </span>
            <h4 className="font-display font-bold text-2xl sm:text-3xl text-forest-900">
              Web-Based Conservation & Field Tools
            </h4>
            <p className="text-earth-500 text-sm leading-relaxed">
              Our web telemetry portal and cloud dashboard enable smallholder farmers, carbon auditors, and field teams to log thermal imagery, inspect forest canopy data, and track real-time project progress directly in any browser—no standalone mobile app installation required.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="flex items-center space-x-2 text-xs text-forest-800 font-medium font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Track Projects</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-forest-800 font-medium font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Monitor Canopy</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-forest-800 font-medium font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Engage Community</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-forest-800 font-medium font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Measure Impact</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              id="web-portal-access-btn"
              onClick={() => setToast({
                message: "You are currently accessing the EcoStawi Web Telemetry Portal. Live GIS layers and drone data streams are active above.",
                type: 'info'
              })}
              className="bg-forest-900 hover:bg-forest-950 text-white font-medium px-6 py-3.5 rounded-xl border border-forest-800 shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer w-full sm:w-auto"
            >
              <Laptop className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <span className="block text-[8px] uppercase tracking-wider leading-none text-forest-300">Web Telemetry</span>
                <span className="text-xs font-bold font-display">Access Live Portal</span>
              </div>
            </button>

            <button
              id="field-pilot-request-btn"
              onClick={() => setToast({
                message: "For field teams requesting offline data collectors or custom API integrations, please submit a partner inquiry via Get Involved.",
                type: 'info'
              })}
              className="bg-white hover:bg-earth-100 text-forest-900 font-medium px-6 py-3.5 rounded-xl border border-earth-200 shadow-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer w-full sm:w-auto"
            >
              <Radio className="w-5 h-5 text-emerald-600" />
              <div className="text-left">
                <span className="block text-[8px] uppercase tracking-wider leading-none text-earth-500">Field Partners</span>
                <span className="text-xs font-bold font-display">Request Pilot Credentials</span>
              </div>
            </button>
          </div>
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
