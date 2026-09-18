import React from 'react';

export interface BrandLogoProps {
  variant?: 'horizontal' | 'badge' | 'stacked' | 'iconOnly';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showTagline?: boolean;
  showRating?: boolean;
  compact?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 'md',
  showSubtitle = true,
  showTagline = true,
  showRating = false,
  compact = false
}) => {
  const isDark = theme === 'dark';

  // Responsive size constraints for official emblem image
  const emblemSizes = {
    xs: 'w-6 h-6 sm:w-7 sm:h-7',
    sm: compact ? 'w-6.5 h-6.5 sm:w-7.5 sm:h-7.5' : 'w-7 h-7 sm:w-8 sm:h-8',
    md: compact ? 'w-7.5 h-7.5 sm:w-9 sm:h-9' : 'w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10',
    lg: 'w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14',
    xl: 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20'
  }[size];

  // Headings scaled specifically for balanced density
  const headingClass = {
    xs: 'text-[11px] font-black tracking-tight',
    sm: compact ? 'text-[12px] sm:text-sm font-black tracking-tight' : 'text-xs sm:text-sm font-black tracking-tight',
    md: compact ? 'text-xs sm:text-sm font-black tracking-tight' : 'text-xs xs:text-sm sm:text-[15px] font-black tracking-tight',
    lg: 'text-sm sm:text-base md:text-lg font-black tracking-tight',
    xl: 'text-base sm:text-lg md:text-xl font-black tracking-tight'
  }[size];

  const subtitleClass = {
    xs: 'text-[6.5px] font-semibold tracking-wider uppercase',
    sm: compact ? 'text-[7px] sm:text-[7.5px] font-semibold tracking-wider uppercase' : 'text-[7.5px] sm:text-[8px] font-semibold tracking-wider uppercase',
    md: compact ? 'text-[7px] sm:text-[7.5px] font-semibold tracking-wider uppercase' : 'text-[7.5px] xs:text-[8px] sm:text-[8.5px] font-semibold tracking-wider uppercase',
    lg: 'text-[8.5px] sm:text-[9.5px] font-semibold tracking-wider uppercase',
    xl: 'text-[9.5px] sm:text-[10.5px] font-semibold tracking-wider uppercase'
  }[size];

  if (variant === 'iconOnly' || variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <div className={`relative flex items-center justify-center rounded-xl transition-transform ${isDark ? 'bg-white/5 p-1 border border-white/10 shadow-inner' : ''}`}>
          <img
            src="/logo-official.png"
            alt="Dave's Body Works Official Emblem"
            className={`${emblemSizes} object-contain select-none`}
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center gap-1.5 sm:gap-2 ${className}`}>
        <div className={`relative flex items-center justify-center rounded-2xl ${isDark ? 'bg-white/5 p-1.5 border border-white/10' : ''}`}>
          <img
            src="/logo-official.png"
            alt="Dave's Body Works Official Logo"
            className={`${emblemSizes} object-contain select-none`}
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className={`text-base sm:text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            DAVE'S <span className={isDark ? 'text-red-500' : 'text-red-600'}>BODY WORKS</span>
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Est. 1980 · Las Vegas, NV
          </span>
        </div>
      </div>
    );
  }

  // Horizontal Full Lockup (Default)
  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-2.5 select-none ${compact ? 'min-w-0' : 'shrink-0'} ${className}`}>
      {/* Official Transparent Logo Image */}
      <div className="relative shrink-0 flex items-center justify-center">
        <div className={`flex items-center justify-center rounded-xl transition-transform hover:scale-105 duration-200 ${
          isDark ? 'bg-white/8 p-1 sm:p-1.5 border border-white/10 shadow-sm' : 'p-0.5'
        }`}>
          <img
            src="/logo-official.png"
            alt="Dave's Body Works Official Logo"
            className={`${emblemSizes} object-contain`}
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none min-w-0">
        {/* Optional Tagline / Rating - gracefully hidden on extra small screens if desired */}
        {(showTagline || showRating) && (
          <div className="flex items-center gap-1 sm:gap-1.5 mb-1 flex-wrap">
            {showTagline && (
              <span className={`text-[8px] sm:text-[9px] md:text-[10px] font-extrabold tracking-wider uppercase ${
                isDark ? 'text-red-400' : 'text-red-600'
              }`}>
                Est. 1980 · Las Vegas
              </span>
            )}
            {showTagline && showRating && (
              <span className={`inline-block w-1 h-1 rounded-full ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`} />
            )}
            {showRating && (
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
                <span>4.7 ★</span>
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>(54 Reviews)</span>
              </span>
            )}
          </div>
        )}

        {/* Main Brand Heading */}
        <div className="flex items-baseline gap-1 sm:gap-1.5 whitespace-nowrap">
          <span className={`${headingClass} ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            DAVE'S
          </span>
          <span className={`${headingClass} ${
            isDark ? 'text-red-500' : 'text-red-600'
          }`}>
            BODY WORKS
          </span>
        </div>

        {/* Subtitle */}
        {showSubtitle && (
          <div className="mt-0.5 sm:mt-1">
            <span className={`${subtitleClass} truncate block ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Collision &amp; Auto Body Repair
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

