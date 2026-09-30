import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface DiagnosticsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onTriggerToast: (msg: string) => void;
}

export const DiagnosticsScreen: React.FC<DiagnosticsScreenProps> = ({
  onNavigate,
  onTriggerToast,
}) => {
  const [latency, setLatency] = useState(18);
  const [logs, setLogs] = useState<string[]>([
    '09:41:02 [SYS] Obsidian runtime engine initialized (ARM64 E2EE).',
    '09:41:05 [CRYPTO] Signal double-ratchet initialized with root key 0x7F...9A1E.',
    '09:41:10 [NET] Peer mesh discovery: 14 nodes resolved via mDNS.',
    '09:41:14 [AUTH] Google OAuth 2.0 handshake verified (Token TTL: 3540s).',
  ]);

  const handlePing = () => {
    const nextLatency = Math.floor(12 + Math.random() * 10);
    setLatency(nextLatency);
    const newLog = `${new Date().toLocaleTimeString()} [PING] Roundtrip latency to Tokyo Node: ${nextLatency}ms (loss 0%).`;
    setLogs((prev) => [newLog, ...prev.slice(0, 7)]);
    onTriggerToast(`Ping dispatched: ${nextLatency}ms.`);
  };

  const handleFlushCache = () => {
    onTriggerToast('IndexedDB local cache sanitized. 142.8 MB purged.');
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0f14] p-4 overflow-y-auto pb-24 select-none no-scrollbar font-mono text-xs">
      <div className="flex items-center justify-between mb-4 border-b border-white/[0.05] pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="w-7 h-7 rounded-full bg-[#1b2025] hover:bg-[#252a30] text-[#dee3ea] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          </button>
          <span className="font-mono text-xs uppercase tracking-wider text-[#46e2f3] font-bold">
            System Telemetry
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-[#00f0ff] text-[#00363a] font-bold">
          SANDBOX 2.4
        </span>
      </div>

      <div className="space-y-3">
        {/* Node 1 */}
        <div className="p-3.5 rounded-2xl bg-[#171c21] border border-white/5 text-[#ebf8ff] space-y-1">
          <div className="text-[#00f0ff] font-bold flex items-center justify-between">
            <span>P2P MESH DISCOVERY</span>
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
          </div>
          <div className="text-[11px] text-[#b9cacb]">
            Status: <span className="text-[#00f0ff]">ONLINE</span> (14 Peers Connected)
          </div>
          <div className="text-[11px] text-[#849495]">
            Cipher: AES-GCM-256 / Signal Double-Ratchet
          </div>
          <div className="text-[11px] text-[#46e2f3] flex items-center justify-between pt-1">
            <span>Active Latency: {latency}ms</span>
            <button
              onClick={handlePing}
              className="px-2 py-0.5 bg-[#252a30] hover:bg-[#30353b] text-[#00f0ff] rounded text-[10px] cursor-pointer"
            >
              Test Ping
            </button>
          </div>
        </div>

        {/* Node 2 */}
        <div className="p-3.5 rounded-2xl bg-[#171c21] border border-white/5 text-[#ebf8ff] space-y-1">
          <div className="text-[#00f0ff] font-bold">GOOGLE IDENTITY HANDSHAKE</div>
          <div className="text-[11px] text-[#b9cacb]">
            Provider: Google Firebase Auth v10
          </div>
          <div className="text-[11px] text-[#849495]">
            OAuth2 Scopes: email, profile, openid
          </div>
          <div className="text-[11px] text-[#00ff88]">
            Token State: ACTIVE (Valid for 3540s)
          </div>
        </div>

        {/* Node 3 */}
        <div className="p-3.5 rounded-2xl bg-[#171c21] border border-white/5 text-[#ebf8ff] space-y-1">
          <div className="text-[#00f0ff] font-bold flex items-center justify-between">
            <span>OBSIDIAN STORAGE VAULT</span>
            <button
              onClick={handleFlushCache}
              className="text-[10px] text-[#849495] hover:text-[#ff5252] cursor-pointer"
            >
              Flush Cache
            </button>
          </div>
          <div className="text-[11px] text-[#b9cacb]">
            Local Cache: 142.8 MB (IndexedDB)
          </div>
          <div className="text-[11px] text-[#849495]">
            Cloud Replica: Synced with Decentralized Node
          </div>
          <div className="text-[11px] text-[#46e2f3]">
            Zero-Knowledge Proof: VERIFIED
          </div>
        </div>

        {/* Live Terminal Log Stream */}
        <div className="p-3 rounded-2xl bg-[#080d11] border border-[#00f0ff]/15 space-y-1">
          <div className="text-[10px] uppercase font-bold text-[#849495] mb-1">
            Realtime Audit Log
          </div>
          <div className="space-y-1 text-[10px] text-[#849495] max-h-40 overflow-y-auto no-scrollbar font-mono">
            {logs.map((log, index) => (
              <div key={index} className="leading-tight text-[#b9cacb]">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
