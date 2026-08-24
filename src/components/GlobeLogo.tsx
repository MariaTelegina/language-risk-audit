import React from 'react';

interface GlobeLogoProps {
  className?: string;
  size?: number;
}

export const GlobeLogo: React.FC<GlobeLogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div
      id="wit-globe-logo"
      style={{ width: size, height: size }}
      className={`relative shrink-0 flex items-center justify-center rounded-xs bg-[#FCFAF7] border border-[#E5DCD2] p-1 shadow-2xs ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#DE5736]"
      >
        {/* Outer Sphere */}
        <circle
          cx="24"
          cy="24"
          r="19"
          stroke="currentColor"
          strokeWidth="2.2"
          className="text-[#DE5736]"
        />

        {/* Central horizontal equator */}
        <ellipse
          cx="24"
          cy="24"
          rx="19"
          ry="6"
          stroke="currentColor"
          strokeWidth="1.8"
          className="text-[#E48C35]"
          strokeOpacity="0.85"
        />

        {/* Diagonal / upper latitude line */}
        <ellipse
          cx="24"
          cy="16"
          rx="15"
          ry="4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          className="text-[#F3A261]"
          strokeOpacity="0.75"
        />

        {/* Lower latitude line */}
        <ellipse
          cx="24"
          cy="32"
          rx="15"
          ry="4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          className="text-[#F3A261]"
          strokeOpacity="0.75"
        />

        {/* Vertical prime meridian */}
        <ellipse
          cx="24"
          cy="24"
          rx="8"
          ry="19"
          stroke="currentColor"
          strokeWidth="1.8"
          className="text-[#E48C35]"
          strokeOpacity="0.85"
        />

        {/* Center vertical axis */}
        <line
          x1="24"
          y1="5"
          x2="24"
          y2="43"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[#DE5736]"
          strokeOpacity="0.6"
        />
      </svg>
    </div>
  );
};
