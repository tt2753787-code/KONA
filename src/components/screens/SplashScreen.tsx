import React, { useState } from 'react';
import { KonanaLogo } from '../KonanaLogo';
import { ScreenId } from '../../types';

interface SplashScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onTriggerToast: (msg: string) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onNavigate,
  onTriggerToast,
}) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGoogleAuth = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onTriggerToast('Authenticated via Google Identity (OAuth 2.0). Welcome Devin!');
      onNavigate('home');
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#0a0f14] via-[#171c21] to-[#0a0f14] select-none">
      {/* Top Security Header Tag */}
      <div className="flex justify-between items-center pt-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#849495]">
          SECURE ID v4.9
        </span>
        <div className="flex items-center gap-1.5 text-[#46e2f3]">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
        </div>
      </div>

      {/* Center Branding & Emblem Block */}
      <div className="flex flex-col items-center text-center my-auto">
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-[#00f0ff]/20 blur-2xl animate-pulse" />
          <KonanaLogo size={88} withGlow={true} />
        </div>

        <h1 className="font-headline text-3xl font-extrabold text-[#dbfcff] tracking-tight mb-2">
          KONANA
        </h1>
        <p className="text-sm text-[#b9cacb] max-w-[240px] leading-relaxed">
          Connect. Share. Discover.
        </p>

        <div className="flex items-center gap-2 mt-5 px-3 py-1.5 rounded-full bg-[#252a30]/80 border border-[#00f0ff]/20">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span className="font-mono text-[11px] text-[#46e2f3] font-medium tracking-wide">
            Quantum-Shielded Mesh
          </span>
        </div>
      </div>

      {/* Authentication Action Tray */}
      <div className="w-full flex flex-col gap-3 pb-4">
        {/* Google Sign-in */}
        <button
          onClick={handleGoogleAuth}
          disabled={isAuthenticating}
          className="w-full h-14 bg-[#252a30] hover:bg-[#30353b] active:scale-[0.98] transition-all duration-200 rounded-2xl flex items-center justify-center gap-3 px-4 shadow-[0_4px_20px_rgba(0,0,0,0.6)] border border-white/5 cursor-pointer"
        >
          {isAuthenticating ? (
            <div className="flex items-center gap-2 text-[#00f0ff]">
              <span className="w-4 h-4 rounded-full border-2 border-[#00f0ff] border-t-transparent animate-spin" />
              <span className="text-sm font-semibold">Verifying Handshake...</span>
            </div>
          ) : (
            <>
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span className="font-semibold text-sm text-[#dee3ea]">
                Continue with Google
              </span>
            </>
          )}
        </button>

        {/* Email Fallback */}
        <button
          onClick={() => onNavigate('home')}
          className="w-full h-12 bg-[#171c21] hover:bg-[#1b2025] active:scale-[0.98] transition-all rounded-2xl flex items-center justify-center gap-2 text-[#b9cacb] hover:text-[#dee3ea] border border-white/5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">mail</span>
          <span className="text-xs font-medium">Continue with Email</span>
        </button>

        {isAuthenticating && (
          <div className="flex items-center justify-center gap-2 pt-2 text-[#46e2f3] text-[11px] font-mono animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
            Securing handshake with Google Identity API...
          </div>
        )}
      </div>
    </div>
  );
};
