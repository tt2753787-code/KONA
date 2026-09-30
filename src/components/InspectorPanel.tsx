import React, { useState } from 'react';
import { ScreenId } from '../types';

interface InspectorPanelProps {
  activeScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  onTriggerHaptic: () => void;
  onTriggerToast: (msg: string) => void;
  toastMessage?: string | null;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  activeScreen,
  onScreenChange,
  onTriggerHaptic,
  onTriggerToast,
  toastMessage,
}) => {
  const [ratchetKey, setRatchetKey] = useState('0x7F...9A1E');
  const [keyIndex, setKeyIndex] = useState(42);

  const rotateKey = () => {
    const nextIdx = keyIndex + 1;
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const newKey = `0x${randomHex}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`;
    setKeyIndex(nextIdx);
    setRatchetKey(newKey);
    onTriggerToast(`Ephemeral Diffie-Hellman Ratchet #${nextIdx} rotated: ${newKey}`);
  };

  const handleSimulateGoogleAuth = () => {
    onScreenChange('splash');
    onTriggerToast('Google OAuth 2.0 handshake simulation triggered.');
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* Interactive Quick Flow Director Bento Card */}
      <div className="bg-[#171c21] p-5 rounded-3xl border border-white/[0.05] shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[22px]">
              layers
            </span>
            <span className="font-headline text-base font-bold text-[#ebf8ff]">
              Flow Inspector & States
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#252a30] text-[#00f0ff] text-[10px] font-mono font-semibold border border-[#00f0ff]/20">
            LIVE SYNCED
          </span>
        </div>

        <p className="text-xs text-[#b9cacb] leading-relaxed">
          Directly switch device viewports to inspect individual sub-systems, component states, and micro-interactions.
        </p>

        {/* Screen Trigger Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => onScreenChange('splash')}
            className={`p-3 rounded-2xl text-left transition-all group cursor-pointer border ${
              activeScreen === 'splash'
                ? 'bg-[#00f0ff]/15 border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-[#1b2025] hover:bg-[#252a30] border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[#46e2f3] text-[20px] mb-1 group-hover:scale-110 transition-transform">
              fingerprint
            </span>
            <div className="text-xs font-bold text-[#dee3ea]">1. Splash & Auth</div>
            <span className="text-[10px] text-[#849495] font-mono">Emblem, Google OAuth</span>
          </button>

          <button
            onClick={() => onScreenChange('home')}
            className={`p-3 rounded-2xl text-left transition-all group cursor-pointer border ${
              activeScreen === 'home'
                ? 'bg-[#00f0ff]/15 border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-[#1b2025] hover:bg-[#252a30] border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[#00f0ff] text-[20px] mb-1 group-hover:scale-110 transition-transform">
              dynamic_feed
            </span>
            <div className="text-xs font-bold text-[#dee3ea]">2. Home Social Feed</div>
            <span className="text-[10px] text-[#849495] font-mono">Stories, Suggestions, Posts</span>
          </button>

          <button
            onClick={() => onScreenChange('chat')}
            className={`p-3 rounded-2xl text-left transition-all group cursor-pointer border ${
              activeScreen === 'chat'
                ? 'bg-[#00f0ff]/15 border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-[#1b2025] hover:bg-[#252a30] border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[#46e2f3] text-[20px] mb-1 group-hover:scale-110 transition-transform">
              lock
            </span>
            <div className="text-xs font-bold text-[#dee3ea]">3. Private E2EE Chat</div>
            <span className="text-[10px] text-[#849495] font-mono">Double Ratchet Bubbles</span>
          </button>

          <button
            onClick={() => onScreenChange('friends')}
            className={`p-3 rounded-2xl text-left transition-all group cursor-pointer border ${
              activeScreen === 'friends'
                ? 'bg-[#00f0ff]/15 border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-[#1b2025] hover:bg-[#252a30] border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[#cce7f3] text-[20px] mb-1 group-hover:scale-110 transition-transform">
              group
            </span>
            <div className="text-xs font-bold text-[#dee3ea]">4. Discover People</div>
            <span className="text-[10px] text-[#849495] font-mono">Mutual Links & Add Chips</span>
          </button>

          <button
            onClick={() => onScreenChange('profile')}
            className={`p-3 rounded-2xl text-left transition-all group cursor-pointer border ${
              activeScreen === 'profile'
                ? 'bg-[#00f0ff]/15 border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-[#1b2025] hover:bg-[#252a30] border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[#8df2ff] text-[20px] mb-1 group-hover:scale-110 transition-transform">
              shield
            </span>
            <div className="text-xs font-bold text-[#dee3ea]">5. Vault Profile</div>
            <span className="text-[10px] text-[#849495] font-mono">Media Mosaic & Stats</span>
          </button>

          <button
            onClick={() => onScreenChange('diagnostics')}
            className={`p-3 rounded-2xl text-left transition-all group cursor-pointer border ${
              activeScreen === 'diagnostics'
                ? 'bg-[#00f0ff]/15 border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-[#1b2025] hover:bg-[#252a30] border-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[#00f0ff] text-[20px] mb-1 group-hover:scale-110 transition-transform">
              terminal
            </span>
            <div className="text-xs font-bold text-[#dee3ea]">6. System Telemetry</div>
            <span className="text-[10px] text-[#849495] font-mono">Real-time Node Status</span>
          </button>
        </div>
      </div>

      {/* Live Encryption & Architecture Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cryptography Spec */}
        <div className="bg-[#171c21] p-5 rounded-3xl border border-white/[0.05] shadow-md flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-[#46e2f3] mb-1.5">
              <span className="material-symbols-outlined text-[18px]">
                enhanced_encryption
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
                Encryption Architecture
              </span>
            </div>
            <h4 className="font-headline text-sm font-bold text-[#ebf8ff] mb-1">
              Zero-Knowledge Mesh
            </h4>
            <p className="text-xs text-[#b9cacb] leading-relaxed">
              Every message, media asset, and social interaction is sealed using ephemeral Diffie-Hellman keys and localized biometric authorization.
            </p>
          </div>

          <div className="pt-2 bg-[#1b2025]/80 p-3 rounded-2xl flex items-center justify-between border border-white/5">
            <span className="font-mono text-[10px] text-[#849495]">
              RATCHET KEY #{keyIndex.toString().padStart(3, '0')}
            </span>
            <span className="font-mono text-[11px] text-[#00f0ff] font-bold">
              {ratchetKey}
            </span>
          </div>
        </div>

        {/* Device Parameters */}
        <div className="bg-[#171c21] p-5 rounded-3xl border border-white/[0.05] shadow-md flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-[#00f0ff] mb-1.5">
              <span className="material-symbols-outlined text-[18px]">ad_units</span>
              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
                Device Parameters
              </span>
            </div>
            <h4 className="font-headline text-sm font-bold text-[#ebf8ff] mb-1">
              Edge-to-Edge Canvas
            </h4>
            <p className="text-xs text-[#b9cacb] leading-relaxed">
              Targeting 412x915 dp viewport specs with transparent navigation insets, high-contrast cyan glow cues, and dark obsidian glassmorphism.
            </p>
          </div>

          <div className="pt-2 bg-[#1b2025]/80 p-3 rounded-2xl flex items-center justify-between border border-white/5">
            <span className="font-mono text-[10px] text-[#849495]">REFRESH RATE</span>
            <span className="font-mono text-[11px] text-[#46e2f3] font-bold">
              120Hz LTPO OLED
            </span>
          </div>
        </div>
      </div>

      {/* Micro-Interaction Triggers */}
      <div className="bg-[#171c21] p-5 rounded-3xl border border-white/[0.05] shadow-md space-y-3">
        <h4 className="font-headline text-sm font-bold text-[#ebf8ff]">
          Micro-Interaction Triggers
        </h4>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={onTriggerHaptic}
            className="px-4 py-2.5 rounded-xl bg-[#1b2025] hover:bg-[#252a30] text-[#dee3ea] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-white/5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px] text-[#46e2f3]">
              vibration
            </span>
            <span>Simulate Android Haptic Ripple</span>
          </button>

          <button
            onClick={handleSimulateGoogleAuth}
            className="px-4 py-2.5 rounded-xl bg-[#1b2025] hover:bg-[#252a30] text-[#dee3ea] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-white/5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px] text-[#00f0ff]">
              login
            </span>
            <span>Run Google Auth Sequence</span>
          </button>

          <button
            onClick={rotateKey}
            className="px-4 py-2.5 rounded-xl bg-[#1b2025] hover:bg-[#252a30] text-[#00f0ff] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-[#00f0ff]/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px]">
              key
            </span>
            <span>Rotate Ratchet Session Key</span>
          </button>
        </div>

        {/* Live Toast indicator if active */}
        {toastMessage && (
          <div className="mt-3 p-3 rounded-2xl bg-[#00f0ff] text-[#00363a] text-xs font-semibold flex items-center gap-2 shadow-[0_4px_20px_rgba(0,240,255,0.35)] animate-fade-in">
            <span className="material-symbols-outlined text-[18px]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
