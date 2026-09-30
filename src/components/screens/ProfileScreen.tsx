import React from 'react';
import { ResilientImage } from '../ResilientImage';
import { CURRENT_USER, VAULT_MEDIA_GALLERY } from '../../data/mockData';
import { ScreenId } from '../../types';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenViewer?: (url: string, title: string) => void;
  onTriggerToast: (msg: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  onOpenViewer,
  onTriggerToast,
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-[#0a0f14] overflow-y-auto pb-24 select-none no-scrollbar">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-[#0a0f14]/90 backdrop-blur-md z-20 border-b border-white/[0.04]">
        <button
          onClick={() => onNavigate('home')}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1b2025] hover:bg-[#252a30] text-[#dee3ea] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <span className="font-mono text-xs font-bold tracking-wider text-[#00f0ff]">
          VAULT PROFILE
        </span>
        <button
          onClick={() => onTriggerToast('Cryptographic vault settings & biometric passkey preferences.')}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1b2025] hover:bg-[#252a30] text-[#dee3ea] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </button>
      </div>

      {/* Profile Details Card */}
      <div className="flex flex-col items-center px-6 pt-3 pb-4 text-center">
        <div className="relative mb-3">
          <ResilientImage
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.name}
            fallbackText={CURRENT_USER.name}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#00f0ff] ring-2 ring-[#0a0f14]" />
        </div>

        <h3 className="font-headline text-lg font-bold text-[#dbfcff]">
          {CURRENT_USER.name}
        </h3>
        <span className="text-xs text-[#46e2f3] font-mono mt-0.5">
          @{CURRENT_USER.username} • {CURRENT_USER.walletKey}
        </span>
        <p className="text-xs text-[#b9cacb] mt-2 max-w-[260px] leading-relaxed">
          {CURRENT_USER.bio}
        </p>

        {/* Stats Ticker */}
        <div className="flex items-center gap-6 mt-4 py-2 px-6 bg-[#171c21] rounded-2xl border border-white/5 shadow-md">
          <div className="text-center">
            <span className="font-headline text-base font-bold text-[#dbfcff] block">
              {CURRENT_USER.peersCount}
            </span>
            <span className="text-[10px] font-mono uppercase text-[#849495]">
              Peers
            </span>
          </div>
          <div className="w-[1px] h-6 bg-[#30353b]" />
          <div className="text-center">
            <span className="font-headline text-base font-bold text-[#dbfcff] block">
              1.2K
            </span>
            <span className="text-[10px] font-mono uppercase text-[#849495]">
              Media
            </span>
          </div>
          <div className="w-[1px] h-6 bg-[#30353b]" />
          <div className="text-center">
            <span className="font-headline text-base font-bold text-[#00f0ff] block">
              {CURRENT_USER.trustScore}
            </span>
            <span className="text-[10px] font-mono uppercase text-[#849495]">
              Trust
            </span>
          </div>
        </div>

        {/* Key Action Buttons */}
        <div className="flex gap-2 w-full mt-4">
          <button
            onClick={() => onTriggerToast('Ephemeral Diffie-Hellman session key regenerated: 0x7F...9A1E')}
            className="flex-1 py-2 rounded-xl bg-[#252a30] hover:bg-[#30353b] text-[#00f0ff] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#00f0ff]/20"
          >
            <span className="material-symbols-outlined text-[16px]">sync</span>
            <span>Rotate Key #042</span>
          </button>
          <button
            onClick={() => onTriggerToast('Public identity certificate exported (Ed25519).')}
            className="px-3 py-2 rounded-xl bg-[#171c21] hover:bg-[#1b2025] text-[#dee3ea] text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer border border-white/5"
            title="Export Key"
          >
            <span className="material-symbols-outlined text-[16px]">key</span>
          </button>
        </div>
      </div>

      {/* Encrypted Media Vault Mosaic */}
      <div className="px-4 pt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#849495]">
            Encrypted Media Vault (6)
          </span>
          <div className="flex items-center gap-1 text-[#46e2f3] text-[10px] font-mono">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>AES-GCM-256</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {VAULT_MEDIA_GALLERY.map((media) => (
            <div
              key={media.id}
              onClick={() =>
                onOpenViewer
                  ? onOpenViewer(media.url, media.title)
                  : onTriggerToast(`Opened: ${media.title}`)
              }
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group bg-[#1b2025] border border-white/5"
            >
              <ResilientImage
                src={media.url}
                alt={media.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#00f0ff]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px] text-[#dbfcff] drop-shadow-md">
                  visibility
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
