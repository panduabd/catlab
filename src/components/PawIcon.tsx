import React from 'react';

interface PawIconProps {
  className?: string;
  fill?: string;
}

export const PawIcon: React.FC<PawIconProps> = ({
  className = 'h-5 w-5',
  fill = '#FED700',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill={fill}
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="20" rx="5" ry="7" />
      <ellipse cx="26" cy="14" rx="5" ry="7" />
      <ellipse cx="40" cy="14" rx="5" ry="7" />
      <ellipse cx="54" cy="20" rx="5" ry="7" />
      <path d="M32 26c-10 0-18 8-18 16 0 8 6 12 18 12s18-4 18-12c0-8-8-16-18-16z" />
    </svg>
  );
};
