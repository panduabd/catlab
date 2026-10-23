import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, Info } from 'lucide-react';

interface AdminTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delayMs?: number;
}

export const AdminTooltip: React.FC<AdminTooltipProps> = ({
  content,
  children,
  className = '',
  delayMs = 1000 // 1 second delay per requirement
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number; placeAbove: boolean }>({
    top: 0,
    left: 0,
    placeAbove: true
  });

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = Math.min(320, window.innerWidth - 32);

    // Collision detection: Clamp left position so it never overflows off-screen
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    if (left < 16) left = 16;
    if (left + tooltipWidth > window.innerWidth - 16) {
      left = window.innerWidth - tooltipWidth - 16;
    }

    // Collision detection: Place above if enough space, otherwise place below
    const placeAbove = rect.top > 120;
    const top = placeAbove ? rect.top - 8 : rect.bottom + 8;

    setCoords({ top, left, placeAbove });
  };

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    // Only show if cursor stays in component area for 3 seconds
    hoverTimerRef.current = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, delayMs);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      const handleScrollOrResize = () => updatePosition();
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);
      return () => {
        window.removeEventListener('scroll', handleScrollOrResize, true);
        window.removeEventListener('resize', handleScrollOrResize);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {isVisible &&
        createPortal(
          <div
            role="tooltip"
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              transform: coords.placeAbove ? 'translateY(-100%)' : 'translateY(0)',
              maxWidth: '320px'
            }}
            className="fixed z-[999999] pointer-events-none rounded-xl bg-gray-900/95 backdrop-blur-xs px-3.5 py-2.5 text-xs font-normal leading-relaxed text-white shadow-2xl ring-1 ring-white/15 animate-in fade-in zoom-in-95 duration-150"
          >
            {content}
          </div>,
          document.body
        )}
    </div>
  );
};

interface AdminHelpIconProps {
  text: string;
  size?: number;
  className?: string;
  icon?: 'help' | 'info';
}

export const AdminHelpIcon: React.FC<AdminHelpIconProps> = ({
  text,
  size = 14,
  className = 'text-gray-400 hover:text-gray-600',
  icon = 'help'
}) => {
  return (
    <AdminTooltip content={text} delayMs={1000}>
      <span className={`inline-flex items-center cursor-help transition-colors ${className}`}>
        {icon === 'help' ? <HelpCircle size={size} /> : <Info size={size} />}
      </span>
    </AdminTooltip>
  );
};
