import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark'; // light: for white backgrounds (dark text), dark: for dark backgrounds (white text)
  mode?: 'full' | 'icon' | 'text';
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
}

export default function Logo({
  variant = 'light',
  mode = 'full',
  className = '',
  iconSize = 'md'
}: LogoProps) {
  // Determine text color classes
  const textEcoColor = variant === 'light' ? 'text-forest-950' : 'text-white';
  const textStawiColor = variant === 'light' ? 'text-emerald-600' : 'text-emerald-400';
  const textFoundationColor = variant === 'light' ? 'text-forest-900' : 'text-emerald-300';
  const textSloganColor = variant === 'light' ? 'text-forest-850 font-medium' : 'text-forest-100/90 font-light';
  const lineColor = variant === 'light' ? 'border-forest-900/30' : 'border-emerald-500/30';

  // Sizing mapping for the icon
  const iconSizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    custom: 'w-full h-full'
  }[iconSize];

  // High-fidelity EcoStawi Badge SVG Icon
  const LogoIcon = () => (
    <svg
      id="ecostawi-badge"
      className={`${iconSizeClasses} shrink-0`}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Vibrant dual-green gradient for the crescent ring */}
        <linearGradient id="crescentGrad" x1="15" y1="130" x2="115" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#044321" />
          <stop offset="50%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        {/* Subtle shadow filter for leaves to pop */}
        <filter id="leafShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#043210" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Main crescent-shaped ring */}
      <path
        d="M 115,45
           C 106,31 92,21 76,18
           C 43,12 14,38 14,71
           C 14,104 41,131 75,131
           C 95,131 115,116 125,95
           C 120,109 102,122 80,122
           C 52,122 26,99 26,71
           C 26,43 51,23 80,23
           C 95,23 108,31 115,45 Z"
        fill="url(#crescentGrad)"
      />

      {/* 1. Organic Brown Earth/Soil mound at the bottom */}
      <path
        d="M 28,95 
           C 40,111 65,116 88,114 
           C 100,113 111,105 116,94 
           C 113,101 103,110 88,112 
           C 66,115 44,111 28,95 Z"
        fill="#5a3d28"
      />

      {/* 2. Lush Green grassy wave base */}
      <path
        d="M 28,95 
           Q 60,80 94,95 
           C 101,98 107,98 113,94 
           C 109,87 99,79 84,81 
           C 69,83 54,79 28,95 Z"
        fill="#14532d"
      />
      <path
        d="M 28,95 
           Q 60,80 94,95 
           C 101,98 107,98 113,94 
           C 108,83 94,72 79,76 
           C 64,80 49,76 28,95 Z"
        fill="#22c55e"
      />

      {/* 3. Three Sprouting Leaves (aligned exactly to logo layout) */}
      <g filter="url(#leafShadow)">
        {/* Left Leaf (Dark Forest Green, tilted left) */}
        <path
          d="M 72,82 
             C 65,71 52,56 46,49 
             C 38,40 31,33 34,25 
             C 37,17 52,30 60,37 
             C 68,44 73,56 75,76 
             Z"
          fill="#14532d"
        />
        {/* Left Leaf Vein */}
        <path
          d="M 72,82 C 60,66 48,50 34,25"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* Center/Right Leaf (Vibrant Green, largest, tilted right) */}
        <path
          d="M 72,82 
             C 74,67 78,49 88,40 
             C 98,30 109,21 112,28 
             C 115,35 104,50 96,60 
             C 88,70 79,77 72,82 
             Z"
          fill="#22c55e"
        />
        {/* Center Leaf Vein */}
        <path
          d="M 72,82 C 81,66 97,42 112,28"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* Far Right Leaf (Medium Green, smaller, horizontal/right) */}
        <path
          d="M 72,82 
             C 83,80 97,76 108,72 
             C 117,69 125,66 125,72 
             C 125,78 114,86 105,89 
             C 96,92 82,89 72,82 
             Z"
          fill="#15803d"
        />
        {/* Far Right Leaf Vein */}
        <path
          d="M 72,82 C 88,80 110,75 125,72"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
    </svg>
  );

  // If icon mode only
  if (mode === 'icon') {
    return <LogoIcon />;
  }

  // If text mode only
  if (mode === 'text') {
    return (
      <div className={`flex flex-col select-none ${className}`}>
        <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight leading-none flex items-baseline">
          <span className={textEcoColor}>Eco</span>
          <span className={`${textStawiColor} relative ml-0.5 inline-flex items-baseline`}>
            <span>Staw</span>
            <span className="relative">
              ı
              {/* Custom leaf replacing dot on the 'i' */}
              <svg
                className="absolute -top-[5px] -right-[2px] w-[15px] h-[15px] text-emerald-500 fill-current drop-shadow-sm rotate-3"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 3 C13.5 4, 6 11.5, 6 11.5 C6 11.5, 5.5 12, 11 17 C11 17, 18.5 9.5, 21 3 Z" />
                <path d="M12 11.5 C9.5 13.5, 6 15.5, 6 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </span>
        </h1>
        
        {/* FOUNDATION text wrapped with lines */}
        <div className="flex items-center space-x-2 mt-1 w-full max-w-[210px]">
          <div className={`flex-grow border-t-2 ${lineColor}`} />
          <span className={`text-[10px] font-extrabold uppercase tracking-[0.22em] ${textFoundationColor} leading-none font-sans`}>
            FOUNDATION
          </span>
          <div className={`flex-grow border-t-2 ${lineColor}`} />
        </div>

        {/* Brand Slogan */}
        <p className={`text-[9.5px] tracking-wide mt-1 italic ${textSloganColor} leading-tight font-sans`}>
          Investing in Nature. Empowering Communities.
        </p>
      </div>
    );
  }

  // Full Horizontal Branding Logo
  return (
    <div className={`flex items-center space-x-3.5 select-none ${className}`} id="ecostawi-full-logo">
      <LogoIcon />
      
      <div className="flex flex-col">
        <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight leading-none flex items-baseline">
          <span className={textEcoColor}>Eco</span>
          <span className={`${textStawiColor} relative ml-0.5 inline-flex items-baseline`}>
            <span>Staw</span>
            <span className="relative">
              ı
              {/* Custom leaf replacing dot on the 'i' */}
              <svg
                className="absolute -top-[6px] -right-[2px] w-[15px] h-[15px] text-emerald-500 fill-current drop-shadow-sm rotate-3"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 3 C13.5 4, 6 11.5, 6 11.5 C6 11.5, 5.5 12, 11 17 C11 17, 18.5 9.5, 21 3 Z" />
                <path d="M12 11.5 C9.5 13.5, 6 15.5, 6 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </span>
        </h1>
        
        {/* FOUNDATION text wrapped with lines */}
        <div className="flex items-center space-x-2 mt-1.5 w-full max-w-[210px]">
          <div className={`flex-grow border-t-2 ${lineColor}`} />
          <span className={`text-[10px] font-extrabold uppercase tracking-[0.22em] ${textFoundationColor} leading-none font-sans`}>
            FOUNDATION
          </span>
          <div className={`flex-grow border-t-2 ${lineColor}`} />
        </div>

        {/* Brand Slogan */}
        <p className={`text-[9.5px] tracking-wide mt-1.5 italic ${textSloganColor} leading-tight font-sans`}>
          Investing in Nature. Empowering Communities.
        </p>
      </div>
    </div>
  );
}
