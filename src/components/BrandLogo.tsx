import React from 'react';

export interface BrandLogoProps {
  variant?: 'horizontal' | 'badge' | 'stacked' | 'iconOnly';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const isDark = theme === 'dark';

  // Size constraints for official emblem image
  const emblemSizes = {
    xs: 'w-7 h-7 sm:w-8 sm:h-8',
    sm: 'w-9 h-9 sm:w-10 sm:h-10',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28'
  }[size];

  if (variant === 'iconOnly' || variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <img
          src="/logo-official.png"
          alt="Dave's Body Works Official Emblem"
          className={`${emblemSizes} object-contain drop-shadow-md select-none`}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center gap-2 ${className}`}>
        <img
          src="/logo-official.png"
          alt="Dave's Body Works Official Logo"
          className={`${emblemSizes} object-contain drop-shadow-md select-none`}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
        />
        <div className="flex flex-col leading-tight">
          <span className={`text-base font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            DAVE'S <span className="text-red-600">BODY WORKS</span>
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Est. 1980 · Las Vegas, NV
          </span>
        </div>
      </div>
    );
  }

  // Horizontal Full Lockup (Default)
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* Official Transparent Logo Image */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src="/logo-official.png"
          alt="Dave's Body Works Official Logo"
          className={`${emblemSizes} object-contain drop-shadow-sm transition-transform hover:scale-105 duration-200`}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase text-red-600">
            Est. 1980 · Las Vegas
          </span>
          <span className="inline-block w-1 h-1 rounded-full bg-amber-500" />
          <span className="text-[9px] sm:text-[10px] font-bold text-amber-500">
            4.7 ★ (54 Reviews)
          </span>
        </div>

        <div className="flex items-baseline gap-1 sm:gap-1.5">
          <span className={`text-base sm:text-lg md:text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
            DAVE'S
          </span>
          <span className="text-base sm:text-lg md:text-xl font-black tracking-tight text-red-600">
            BODY WORKS
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Collision &amp; Auto Body Repair
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
