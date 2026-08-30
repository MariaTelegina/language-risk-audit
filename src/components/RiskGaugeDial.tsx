import React from 'react';
import { Sparkles } from 'lucide-react';
import { RiskLevel } from '../types';

interface RiskGaugeDialProps {
  riskLevel: RiskLevel;
  className?: string;
}

export const RiskGaugeDial: React.FC<RiskGaugeDialProps> = ({ riskLevel, className = '' }) => {
  // Determine angle based on risk level
  // 180 degrees arc: 0 is Left (Low), 90 is Top (Medium), 180 is Right (High)
  // In standard dial rotation relative to bottom center:
  // Low: -60 deg, Medium: 0 deg, High: 60 deg
  let needleAngle = 0;
  let riskBadgeColor = 'bg-[#FEF3D6] text-[#B56707] border-[#FAD696]';
  let dotColor = 'bg-[#E48C35]';
  let riskTitle = 'MEDIUM RISK';
  let riskDescription = 'Potential regional friction or pragmatic divergence';

  if (riskLevel === 'low') {
    needleAngle = -58;
    riskBadgeColor = 'bg-[#EEF6F1] text-[#236B40] border-[#C9E6D4]';
    dotColor = 'bg-[#236B40]';
    riskTitle = 'LOW RISK';
    riskDescription = 'Minimal cross-variety interpretation friction identified';
  } else if (riskLevel === 'high') {
    needleAngle = 58;
    riskBadgeColor = 'bg-[#FCECE8] text-[#C04223] border-[#F5C6BC]';
    dotColor = 'bg-[#DE5736]';
    riskTitle = 'HIGH RISK';
    riskDescription = 'Significant cross-border divergence or pragmatic mismatch';
  } else {
    needleAngle = 0;
    riskBadgeColor = 'bg-[#FEF3D6] text-[#B56707] border-[#FAD696]';
    dotColor = 'bg-[#E48C35]';
    riskTitle = 'MEDIUM RISK';
    riskDescription = 'Potential regional friction or pragmatic divergence';
  }

  return (
    <div
      id="dialect-risk-gauge-card"
      className={`bg-[#FAF7F2] p-4 sm:p-6 rounded-xl border border-[#E5DCD2] flex flex-col items-center justify-center text-center shadow-sm warm-elevated w-full ${className}`}
    >
      {/* Header */}
      <div className="flex items-center space-x-1.5 text-[#1C6777] font-bold font-mono-tag text-[11px] sm:text-xs tracking-wider uppercase mb-1 sm:mb-2">
        <Sparkles className="w-3.5 h-3.5 text-[#E48C35] shrink-0" />
        <span>DIALECT FRICTION RISK</span>
      </div>

      {/* Dial SVG - Proportionally scaled and centered */}
      <div className="relative w-full max-w-[200px] xs:max-w-[220px] sm:max-w-[240px] flex items-center justify-center my-1 mx-auto">
        <svg
          viewBox="0 0 240 145"
          className="w-full h-auto overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Smooth linear gradient from Cream Yellow #FFB852 to Orange #E48C35 */}
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB852" />
              <stop offset="50%" stopColor="#F59E38" />
              <stop offset="100%" stopColor="#E48C35" />
            </linearGradient>

            {/* Subtle drop shadow for dial track */}
            <filter id="gaugeShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#242A36" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Background Arc Track (semi-circle) */}
          <path
            d="M 36 115 A 84 84 0 0 1 204 115"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            filter="url(#gaugeShadow)"
          />

          {/* Tick markers */}
          {/* Low tick */}
          <line x1="36" y1="115" x2="48" y2="115" stroke="#9E6928" strokeWidth="2" strokeLinecap="round" />
          {/* Med tick */}
          <line x1="120" y1="31" x2="120" y2="43" stroke="#9E6928" strokeWidth="2" strokeLinecap="round" />
          {/* High tick */}
          <line x1="192" y1="115" x2="204" y2="115" stroke="#9E6928" strokeWidth="2" strokeLinecap="round" />

          {/* Scale Labels - Positioned carefully with ample padding so HIGH is never clipped */}
          <text
            x="36"
            y="136"
            textAnchor="middle"
            className="text-[11px] font-mono-tag font-bold fill-[#8A581F] uppercase"
          >
            LOW
          </text>
          <text
            x="120"
            y="23"
            textAnchor="middle"
            className="text-[11px] font-mono-tag font-bold fill-[#8A581F] uppercase"
          >
            MED
          </text>
          <text
            x="204"
            y="136"
            textAnchor="middle"
            className="text-[11px] font-mono-tag font-bold fill-[#8A581F] uppercase"
          >
            HIGH
          </text>

          {/* Needle Group with dynamic angle */}
          <g
            transform={`translate(120, 115) rotate(${needleAngle})`}
            className="transition-transform duration-700 ease-out"
          >
            {/* Needle Body: Dark black/charcoal with distinct sharp tip */}
            <path
              d="M -3.5 0 L -1.5 -80 L 0 -88 L 1.5 -80 L 3.5 0 Z"
              fill="#181B22"
              stroke="#0A0C0E"
              strokeWidth="0.8"
            />

            {/* Pivot Center: Dark circle with outer ring and cutout hole */}
            <circle cx="0" cy="0" r="9" fill="#181B22" stroke="#0A0C0E" strokeWidth="1" />
            <circle cx="0" cy="0" r="3.5" fill="#FAF7F2" />
          </g>
        </svg>
      </div>

      {/* Risk Pill Badge */}
      <div
        className={`inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border text-[11px] sm:text-xs font-mono-tag font-bold mt-1.5 sm:mt-2 shadow-2xs ${riskBadgeColor}`}
      >
        <span className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full ${dotColor}`} />
        <span>{riskTitle}</span>
      </div>

      {/* Description */}
      <p className="mt-2 text-[11px] sm:text-xs text-[#5C5243] max-w-[260px] leading-relaxed font-medium mx-auto">
        {riskDescription}
      </p>
    </div>
  );
};
