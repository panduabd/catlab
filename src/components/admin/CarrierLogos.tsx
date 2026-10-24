import React from 'react';

export type CarrierBrandType =
  | '7eleven'
  | 'familymart'
  | 'blackcat'
  | 'post'
  | 'hilife'
  | 'okmart'
  | 'pelican'
  | 'hct'
  | 'kerry'
  | 'sfexpress'
  | 'custom';

interface CarrierLogoProps {
  carrierType?: CarrierBrandType | string;
  customLogoUrl?: string;
  carrierName?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Authentic SVG brand logos for all major logistics & convenience store carriers in Taiwan.
 * Razor-sharp rendering, official brand color palettes, and responsive sizing.
 */
export const CarrierLogo: React.FC<CarrierLogoProps> = ({
  carrierType,
  customLogoUrl,
  carrierName,
  className = '',
  size = 'md'
}) => {
  // If custom carrier with uploaded logo URL:
  if (carrierType === 'custom' && customLogoUrl) {
    return (
      <img
        src={customLogoUrl}
        alt={carrierName || 'Custom Carrier'}
        className={`object-contain rounded-md border border-gray-200 bg-white p-0.5 ${
          size === 'sm' ? 'h-6 w-12' : size === 'lg' ? 'h-10 w-24' : 'h-8 w-16'
        } ${className}`}
      />
    );
  }

  const heightClasses =
    size === 'sm' ? 'h-6 w-14' : size === 'lg' ? 'h-10 w-28' : 'h-8 w-20';

  switch (carrierType) {
    // ------------------------------------------------------------------------
    // 1. 7-ELEVEN CVS (統一超商)
    // ------------------------------------------------------------------------
    case '7eleven':
      return (
        <div
          className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-1 shadow-2xs shrink-0 select-none ${heightClasses} ${className}`}
          title="7-Eleven Taiwan (統一超商門市取貨)"
        >
          <svg viewBox="0 0 120 40" className="h-full w-full" fill="none">
            {/* 7-Eleven Emblem */}
            <rect width="36" height="38" x="1" y="1" rx="4" fill="#008163" />
            {/* Top orange bar */}
            <path d="M5 5 H33 V11 H5 Z" fill="#F58220" />
            {/* Red diagonal numeral 7 */}
            <path d="M19 11 L10 35 H17 L25 15 H31 V11 Z" fill="#EE1C25" />
            {/* Green horizontal bar with ELEVEn text */}
            <rect x="7" y="18" width="24" height="8" rx="1.5" fill="#008163" />
            <text
              x="19"
              y="24.5"
              fill="#FFFFFF"
              fontSize="6"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              letterSpacing="0.5"
            >
              ELEVEn
            </text>
            {/* Text Label: 7-ELEVEN */}
            <text
              x="44"
              y="24"
              fill="#008163"
              fontSize="12.5"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="-0.5"
            >
              7-ELEVEN
            </text>
            <text
              x="44"
              y="33"
              fill="#F58220"
              fontSize="6"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.8"
            >
              CVS PICKUP
            </text>
          </svg>
        </div>
      );

    // ------------------------------------------------------------------------
    // 2. FAMILYMART CVS (全家便利商店)
    // ------------------------------------------------------------------------
    case 'familymart':
      return (
        <div
          className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-1 shadow-2xs shrink-0 select-none ${heightClasses} ${className}`}
          title="FamilyMart Taiwan (全家便利商店門市取貨)"
        >
          <svg viewBox="0 0 120 40" className="h-full w-full" fill="none">
            {/* Blue top bar, Green bottom bar */}
            <rect x="2" y="4" width="116" height="15" rx="3" fill="#009FE8" />
            <rect x="2" y="21" width="116" height="15" rx="3" fill="#009A44" />
            {/* FamilyMart Wordmark in white */}
            <text
              x="60"
              y="16"
              fill="#FFFFFF"
              fontSize="10"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              letterSpacing="0.2"
            >
              FamilyMart
            </text>
            <text
              x="60"
              y="32"
              fill="#FFFFFF"
              fontSize="7.5"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              letterSpacing="1"
            >
              全家便利商店
            </text>
          </svg>
        </div>
      );

    // ------------------------------------------------------------------------
    // 3. BLACK CAT TAKKYUBIN (黑貓宅急便 - YAMATO)
    // ------------------------------------------------------------------------
    case 'blackcat':
      return (
        <div
          className={`inline-flex items-center justify-center rounded-lg border border-amber-300 bg-[#FFD100] p-1 shadow-2xs shrink-0 select-none ${heightClasses} ${className}`}
          title="Black Cat Takkyubin (黑貓宅急便 / 統一速達)"
        >
          <svg viewBox="0 0 120 40" className="h-full w-full" fill="none">
            {/* Iconic Mother Cat carrying kitten silhouette */}
            <g fill="#111111">
              {/* Mother cat body & head */}
              <ellipse cx="22" cy="22" rx="12" ry="9" />
              <circle cx="31" cy="15" r="6" />
              {/* Ears */}
              <polygon points="28,11 31,6 34,11" />
              <polygon points="32,12 36,8 37,13" />
              {/* Tail */}
              <path d="M10 22 Q 6 14 12 10 Q 14 14 11 22 Z" />
              {/* Legs */}
              <rect x="15" y="27" width="3" height="8" rx="1.5" />
              <rect x="23" y="27" width="3" height="8" rx="1.5" />
              {/* Kitten in mouth */}
              <circle cx="38" cy="22" r="3.5" />
              <ellipse cx="36" cy="27" rx="3.5" ry="2.5" />
              <polygon points="37,19 39,17 40,20" />
            </g>
            {/* Bold Text: 黑貓宅急便 */}
            <text
              x="50"
              y="22"
              fill="#111111"
              fontSize="11"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.2"
            >
              黑貓宅急便
            </text>
            <text
              x="50"
              y="32"
              fill="#222222"
              fontSize="6"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.5"
            >
              YAMATO TAKKYUBIN
            </text>
          </svg>
        </div>
      );

    // ------------------------------------------------------------------------
    // 4. CHUNGHWA POST (中華郵政 / EMS)
    // ------------------------------------------------------------------------
    case 'post':
      return (
        <div
          className={`inline-flex items-center justify-center rounded-lg border border-emerald-300 bg-white p-1 shadow-2xs shrink-0 select-none ${heightClasses} ${className}`}
          title="Chunghwa Post (中華郵政快捷 / 包裹 / EMS)"
        >
          <svg viewBox="0 0 120 40" className="h-full w-full" fill="none">
            {/* Circular Green Post Emblem */}
            <circle cx="20" cy="20" r="16" fill="#008751" />
            <circle cx="20" cy="20" r="13" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
            {/* Postal Horn / Emblem inside */}
            <path
              d="M13 18 C 13 13, 27 13, 27 18 C 27 22, 22 24, 18 24 L 18 26 L 16 26 L 16 22 C 20 22, 24 21, 24 18 C 24 15, 16 15, 16 18 Z"
              fill="#FFFFFF"
            />
            {/* Brand Text */}
            <text
              x="42"
              y="20"
              fill="#008751"
              fontSize="11.5"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.5"
            >
              中華郵政
            </text>
            <text
              x="42"
              y="30"
              fill="#4B5563"
              fontSize="6.5"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.4"
            >
              CHUNGHWA POST / EMS
            </text>
          </svg>
        </div>
      );

    // ------------------------------------------------------------------------
    // 5. HI-LIFE CVS (萊爾富超商)
    // ------------------------------------------------------------------------
    case 'hilife':
      return (
        <div
          className={`inline-flex items-center justify-center rounded-lg border border-red-200 bg-white p-1 shadow-2xs shrink-0 select-none ${heightClasses} ${className}`}
          title="Hi-Life CVS Taiwan (萊爾富超商門市取貨)"
        >
          <svg viewBox="0 0 120 40" className="h-full w-full" fill="none">
            {/* Hi-Life Iconic Red Heart */}
            <path
              d="M20 12 C 15 5, 5 11, 8 20 C 11 26, 20 32, 20 32 C 20 32, 29 26, 32 20 C 35 11, 25 5, 20 12 Z"
              fill="#E60012"
            />
            {/* Wordmark */}
            <text
              x="42"
              y="22"
              fill="#E60012"
              fontSize="12"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="-0.2"
            >
              Hi-Life
            </text>
            <text
              x="42"
              y="31"
              fill="#4B5563"
              fontSize="7"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.5"
            >
              萊爾富便利商店
            </text>
          </svg>
        </div>
      );

    // ------------------------------------------------------------------------
    // 6. OK MART CVS (OK超商)
    // ------------------------------------------------------------------------
    case 'okmart':
      return (
        <div
          className={`inline-flex items-center justify-center rounded-lg border border-red-200 bg-white p-1 shadow-2xs shrink-0 select-none ${heightClasses} ${className}`}
          title="OK Mart Taiwan (OK超商門市取貨)"
        >
          <svg viewBox="0 0 120 40" className="h-full w-full" fill="none">
            {/* Red Background Box */}
            <rect x="2" y="4" width="34" height="32" rx="6" fill="#E60012" />
            <text
              x="19"
              y="24"
              fill="#FFFFFF"
              fontSize="15"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              letterSpacing="-0.5"
            >
              OK
            </text>
            <text
              x="19"
              y="32"
              fill="#FFD100"
              fontSize="6"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              letterSpacing="1"
            >
              MART
            </text>
            {/* Label */}
            <text
              x="43"
              y="22"
              fill="#E60012"
              fontSize="12.5"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              OK·MART
            </text>
            <text
              x="43"
              y="31"
              fill="#555555"
              fontSize="7"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              OK超商取貨
            </text>
          </svg>
        </div>
      );

    // ------------------------------------------------------------------------
    // 7. TAIWAN PELICAN EXPRESS (台灣宅配通)
    // ------------------------------------------------------------------------
    case 'pelican':
      return (
        <div
          className={`inline-flex items-center justify-center rounded-lg border border-amber-200 bg-white p-1 shadow-2xs shrink-0 select-none ${heightClasses} ${className}`}
          title="Taiwan Pelican Express (台灣宅配通 / 宅配便)"
        >
          <svg viewBox="0 0 120 40" className="h-full w-full" fill="none">
            {/* Pelican Head Emblem */}
            <circle cx="20" cy="20" r="16" fill="#FFF200" stroke="#E60012" strokeWidth="1.5" />
            <path
              d="M13 18 Q 18 10 26 15 Q 32 20 24 24 Q 16 26 13 18 Z"
              fill="#E60012"
            />
            <path d="M18 20 Q 30 20 28 27 Q 20 28 18 20 Z" fill="#FF7900" />
            <circle cx="17" cy="15" r="2" fill="#FFFFFF" />
            <circle cx="17" cy="15" r="1" fill="#000000" />
            {/* Label */}
            <text
              x="42"
              y="21"
              fill="#E60012"
              fontSize="11.5"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              台灣宅配通
            </text>
            <text
              x="42"
              y="30"
              fill="#777777"
              fontSize="6.5"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              PELICAN EXPRESS
            </text>
          </svg>
        </div>
      );

    // ------------------------------------------------------------------------
    // 8. HCT LOGISTICS (新竹物流)
    // ------------------------------------------------------------------------
    case 'hct':
      return (
        <div
          className={`inline-flex items-center justify-center rounded-lg border border-blue-200 bg-white p-1 shadow-2xs shrink-0 select-none ${heightClasses} ${className}`}
          title="HCT Logistics (新竹物流)"
        >
          <svg viewBox="0 0 120 40" className="h-full w-full" fill="none">
            {/* HCT Dynamic Wings Emblem */}
            <rect x="2" y="5" width="34" height="30" rx="4" fill="#003B94" />
            <path d="M6 10 L28 10 L24 20 L8 20 Z" fill="#E60012" />
            <path d="M10 23 L32 23 L28 32 L12 32 Z" fill="#FFFFFF" />
            {/* Wordmark */}
            <text
              x="43"
              y="21"
              fill="#003B94"
              fontSize="13"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.5"
            >
              HCT
            </text>
            <text
              x="43"
              y="31"
              fill="#E60012"
              fontSize="7"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.5"
            >
              新竹物流
            </text>
          </svg>
        </div>
      );

    // ------------------------------------------------------------------------
    // 9. KERRY TJ LOGISTICS (嘉里大榮物流)
    // ------------------------------------------------------------------------
    case 'kerry':
      return (
        <div
          className={`inline-flex items-center justify-center rounded-lg border border-orange-200 bg-white p-1 shadow-2xs shrink-0 select-none ${heightClasses} ${className}`}
          title="Kerry TJ Logistics (嘉里大榮物流)"
        >
          <svg viewBox="0 0 120 40" className="h-full w-full" fill="none">
            {/* Kerry Orange Diamond / Emblem */}
            <rect x="3" y="5" width="32" height="30" rx="5" fill="#EE7100" />
            <path d="M12 10 L26 10 L22 19 L8 19 Z" fill="#FFFFFF" />
            <path d="M14 21 L28 21 L24 30 L10 30 Z" fill="#FFFFFF" opacity="0.85" />
            {/* Wordmark */}
            <text
              x="42"
              y="20"
              fill="#EE7100"
              fontSize="11"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.2"
            >
              KERRY TJ
            </text>
            <text
              x="42"
              y="30"
              fill="#333333"
              fontSize="7"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.5"
            >
              嘉里大榮物流
            </text>
          </svg>
        </div>
      );

    // ------------------------------------------------------------------------
    // 10. SF EXPRESS TAIWAN (順豐速運 台灣)
    // ------------------------------------------------------------------------
    case 'sfexpress':
      return (
        <div
          className={`inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-1 shadow-2xs shrink-0 select-none ${heightClasses} ${className}`}
          title="SF Express Taiwan (順豐速運 台灣)"
        >
          <svg viewBox="0 0 120 40" className="h-full w-full" fill="none">
            {/* SF Circular Black & Red Seal */}
            <circle cx="19" cy="20" r="16" fill="#1A1A1A" />
            <path d="M7 20 C 7 13.5 12.5 8 19 8 L 19 14 C 15.5 14 13 16.5 13 20 Z" fill="#E60012" />
            <text
              x="19"
              y="25"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              letterSpacing="-0.5"
            >
              SF
            </text>
            {/* Wordmark */}
            <text
              x="42"
              y="21"
              fill="#1A1A1A"
              fontSize="12"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.2"
            >
              順豐速運
            </text>
            <text
              x="42"
              y="30"
              fill="#E60012"
              fontSize="6.5"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.5"
            >
              SF EXPRESS
            </text>
          </svg>
        </div>
      );

    // ------------------------------------------------------------------------
    // DEFAULT / FALLBACK CUSTOM
    // ------------------------------------------------------------------------
    default:
      return (
        <div
          className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-100 p-1 shadow-2xs shrink-0 select-none ${heightClasses} ${className}`}
        >
          <span className="text-[10px] font-extrabold uppercase text-charcoal truncate px-1">
            {carrierName ? carrierName.slice(0, 10) : 'CARRIER'}
          </span>
        </div>
      );
  }
};
