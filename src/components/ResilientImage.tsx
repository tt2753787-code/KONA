import React, { useState } from 'react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackIcon?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt = '',
  className = '',
  fallbackText,
  fallbackIcon = 'image',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-[#1b2025] to-[#0f1419] border border-[#30353b]/50 flex items-center justify-center text-[#849495] select-none ${className}`}
        title={alt}
      >
        {fallbackText ? (
          <span className="font-semibold text-xs text-[#00f0ff] uppercase tracking-wider">
            {fallbackText.slice(0, 2)}
          </span>
        ) : (
          <span className="material-symbols-outlined text-[20px] text-[#46e2f3]/60">
            {fallbackIcon}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#171c21] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
