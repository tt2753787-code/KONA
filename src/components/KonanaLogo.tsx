import React from 'react';

interface KonanaLogoProps {
  className?: string;
  size?: number;
  withGlow?: boolean;
}

export const KonanaLogo: React.FC<KonanaLogoProps> = ({
  className = '',
  size = 32,
  withGlow = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {withGlow && (
        <div
          className="absolute inset-0 rounded-2xl bg-[#00f0ff]/20 blur-md pointer-events-none"
          style={{ transform: 'scale(1.15)' }}
        />
      )}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          <linearGradient id="konana-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c181f" />
            <stop offset="100%" stopColor="#04080b" />
          </linearGradient>

          <linearGradient id="stem-top" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#00c6d7" />
          </linearGradient>

          <linearGradient id="stem-bot" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#00dbe9" />
          </linearGradient>

          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Obsidian Rounded Frame */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="24"
          fill="url(#konana-bg)"
          stroke="rgba(0, 240, 255, 0.4)"
          strokeWidth="2.5"
        />

        {/* Ambient Inner Dark Shadow */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx="21"
          fill="#080e13"
          fillOpacity="0.85"
        />

        {/* Subtle Dark Triangle Core Inset */}
        <polygon
          points="32,50 66,30 66,70"
          fill="#030608"
          opacity="0.7"
        />

        {/* Top Connecting Stem */}
        <line
          x1="32"
          y1="50"
          x2="68"
          y2="28"
          stroke="url(#stem-top)"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#neon-glow)"
        />

        {/* Bottom Connecting Stem */}
        <line
          x1="32"
          y1="50"
          x2="68"
          y2="72"
          stroke="url(#stem-bot)"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#neon-glow)"
        />

        {/* Top Endpoint Node (Cyan) */}
        <circle cx="68" cy="28" r="7" fill="#00f0ff" />
        <circle cx="68" cy="28" r="4" fill="#a4f8ff" />

        {/* Bottom Endpoint Node (Cyan) */}
        <circle cx="68" cy="72" r="7" fill="#00f0ff" />
        <circle cx="68" cy="72" r="4" fill="#a4f8ff" />

        {/* Central Vertex Node (White Apex) */}
        <circle cx="32" cy="50" r="7.5" fill="#ffffff" filter="url(#neon-glow)" />
        <circle cx="32" cy="50" r="4" fill="#e6fcff" />
      </svg>
    </div>
  );
};
