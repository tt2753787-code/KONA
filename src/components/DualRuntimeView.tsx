import React from 'react';
import { FriendsScreen } from './screens/FriendsScreen';
import { SearchScreen } from './screens/SearchScreen';
import { ScreenId } from '../types';

interface DualRuntimeViewProps {
  onNavigateScreen: (screen: ScreenId) => void;
  onTriggerToast: (msg: string) => void;
}

export const DualRuntimeView: React.FC<DualRuntimeViewProps> = ({
  onNavigateScreen,
  onTriggerToast,
}) => {
  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Header Console Overview */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#171c21]/60 p-5 rounded-3xl border border-white/[0.04]">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-[#46e2f3] font-mono text-[11px] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span>Dual Runtime Protocol</span>
            <span className="text-[#849495]">/</span>
            <span className="text-[#849495] font-mono">NODE_CONNECT_V4</span>
          </div>
          <h2 className="font-headline text-2xl font-bold text-[#dbfcff] tracking-tight">
            Social Network & Identity Discovery
          </h2>
          <p className="text-xs text-[#b9cacb] leading-relaxed">
            Simultaneous preview of the peer mesh directory: explore mutual connections, live presence telemetry, encrypted social hops, and algorithmic creator discovery.
          </p>
        </div>

        {/* Quick Metrics Telemetry Bar */}
        <div className="flex items-center gap-2.5 bg-[#1b2025] p-2 rounded-2xl border border-white/5 shrink-0">
          <div className="px-3 py-1.5 bg-[#252a30] rounded-xl flex flex-col">
            <span className="font-mono text-[9px] text-[#849495] uppercase">
              Active Peers
            </span>
            <span className="font-mono text-sm font-bold text-[#00f0ff]">
              1,482
            </span>
          </div>
          <div className="px-3 py-1.5 bg-[#252a30] rounded-xl flex flex-col">
            <span className="font-mono text-[9px] text-[#849495] uppercase">
              Sync Pulse
            </span>
            <span className="font-mono text-sm font-bold text-[#46e2f3]">
              18ms
            </span>
          </div>
          <div className="px-3 py-1.5 bg-[#252a30] rounded-xl flex flex-col">
            <span className="font-mono text-[9px] text-[#849495] uppercase">
              Encryption
            </span>
            <span className="font-mono text-sm font-bold text-[#ebf8ff]">
              AES-GCM
            </span>
          </div>
        </div>
      </section>

      {/* Side-by-Side Dual Android Mockup Rig */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto w-full">
        {/* ========================================================
             SIM-01: FRIENDS GRAPH
             ======================================================== */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[420px] mb-2 flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#46e2f3]">
              <span className="material-symbols-outlined text-[17px]">group</span>
              <span>SIM-01: FRIENDS GRAPH</span>
            </div>
            <span className="font-mono text-[10px] text-[#849495]">PORT 8081</span>
          </div>

          <div className="w-full max-w-[420px] h-[830px] bg-[#05080b] rounded-[44px] p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.8)] border border-[#30353b]/40 relative">
            <div className="w-full h-full bg-[#0a0f14] rounded-[36px] overflow-hidden flex flex-col relative">
              {/* Top System Status Bar */}
              <div className="h-9 px-5 pt-2 flex items-center justify-between text-[#b9cacb] font-mono text-[11px] z-30 select-none bg-[#0a0f14]/80">
                <span className="font-bold text-[#ebf8ff]">09:41</span>
                <div className="w-16 h-3 bg-black rounded-full mx-auto -mt-1 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#252a30]" />
                </div>
                <div className="flex items-center gap-1 text-[#849495]">
                  <span className="material-symbols-outlined text-[13px]">signal_cellular_4_bar</span>
                  <span className="material-symbols-outlined text-[13px]">wifi</span>
                  <span className="material-symbols-outlined text-[13px]">battery_charging_full</span>
                </div>
              </div>

              {/* Viewport Content */}
              <div className="flex-1 overflow-hidden">
                <FriendsScreen
                  onNavigate={onNavigateScreen}
                  onTriggerToast={onTriggerToast}
                />
              </div>

              {/* Bottom Gesture Bar */}
              <div className="h-4 flex items-center justify-center bg-[#0a0f14]">
                <div className="w-28 h-1 rounded-full bg-[#30353b]" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
             SIM-02: DIRECTORY SEARCH
             ======================================================== */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[420px] mb-2 flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#46e2f3]">
              <span className="material-symbols-outlined text-[17px]">person_search</span>
              <span>SIM-02: DIRECTORY SEARCH</span>
            </div>
            <span className="font-mono text-[10px] text-[#849495]">PORT 8082</span>
          </div>

          <div className="w-full max-w-[420px] h-[830px] bg-[#05080b] rounded-[44px] p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.8)] border border-[#30353b]/40 relative">
            <div className="w-full h-full bg-[#0a0f14] rounded-[36px] overflow-hidden flex flex-col relative">
              {/* Top System Status Bar */}
              <div className="h-9 px-5 pt-2 flex items-center justify-between text-[#b9cacb] font-mono text-[11px] z-30 select-none bg-[#0a0f14]/80">
                <span className="font-bold text-[#ebf8ff]">09:41</span>
                <div className="w-16 h-3 bg-black rounded-full mx-auto -mt-1 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#252a30]" />
                </div>
                <div className="flex items-center gap-1 text-[#849495]">
                  <span className="material-symbols-outlined text-[13px]">signal_cellular_4_bar</span>
                  <span className="material-symbols-outlined text-[13px]">wifi</span>
                  <span className="material-symbols-outlined text-[13px]">battery_charging_full</span>
                </div>
              </div>

              {/* Viewport Content */}
              <div className="flex-1 overflow-hidden">
                <SearchScreen
                  onNavigate={onNavigateScreen}
                  onTriggerToast={onTriggerToast}
                />
              </div>

              {/* Bottom Gesture Bar */}
              <div className="h-4 flex items-center justify-center bg-[#0a0f14]">
                <div className="w-28 h-1 rounded-full bg-[#30353b]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Peer Telemetry & Verification Protocol Banner */}
      <div className="p-4 rounded-2xl bg-[#171c21] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1b2025] flex items-center justify-center text-[#00f0ff] border border-white/5">
            <span className="material-symbols-outlined text-[20px]">fingerprint</span>
          </div>
          <div>
            <h4 className="font-headline text-xs font-bold text-[#dbfcff]">
              Peer Telemetry & Verification Protocol
            </h4>
            <p className="text-[11px] text-[#849495]">
              Zero-knowledge proof verification active on contact imports and mutual directory traversal.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#1b2025] text-[#46e2f3] font-mono text-[10px] font-semibold border border-white/5">
            LATENCY: 12ms
          </span>
          <span className="px-3 py-1 rounded-full bg-[#00f0ff]/15 text-[#00f0ff] font-mono text-[10px] font-semibold border border-[#00f0ff]/20">
            E2E ENCRYPTED
          </span>
        </div>
      </div>
    </div>
  );
};
