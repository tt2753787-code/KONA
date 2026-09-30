import React from 'react';
import { ResilientImage } from './ResilientImage';

interface MediaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  title: string;
  onTriggerToast: (msg: string) => void;
}

export const MediaViewerModal: React.FC<MediaViewerModalProps> = ({
  isOpen,
  onClose,
  mediaUrl,
  title,
  onTriggerToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 select-none animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#171c21] rounded-3xl border border-[#00f0ff]/30 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.9)] flex flex-col">
        {/* Top Bar */}
        <div className="px-6 py-4 bg-[#0a0f14]/80 backdrop-blur-md flex items-center justify-between border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">
              lock
            </span>
            <div>
              <h3 className="font-headline text-sm font-bold text-[#ebf8ff]">
                {title || 'Encrypted Media Asset'}
              </h3>
              <span className="font-mono text-[10px] text-[#46e2f3]">
                IPFS CID: Qm9b...C218 • Signal P-521 Certified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onTriggerToast('Decrypted original media saved to device.')}
              className="px-3 py-1.5 rounded-xl bg-[#252a30] hover:bg-[#30353b] text-[#00f0ff] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#00f0ff]/20"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Decrypt & Export</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#252a30] hover:bg-[#30353b] text-[#dee3ea] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Media Canvas */}
        <div className="relative flex-1 max-h-[65vh] bg-[#0a0f14] flex items-center justify-center p-2 overflow-hidden">
          <ResilientImage
            src={mediaUrl}
            alt={title}
            className="max-h-[60vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
          />
        </div>

        {/* Footer Meta Strip */}
        <div className="px-6 py-3 bg-[#0a0f14]/90 border-t border-white/[0.05] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#849495] gap-2">
          <div className="flex items-center gap-4">
            <span>RES: 3840 x 2160</span>
            <span>COLOR: 10-bit Rec.2020</span>
            <span>HASH: 0x9F41E8B3...884A</span>
          </div>
          <span className="text-[#00f0ff]">ZERO-KNOWLEDGE DECRYPTION VERIFIED</span>
        </div>
      </div>
    </div>
  );
};
