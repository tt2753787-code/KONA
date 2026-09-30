import React, { useState } from 'react';
import { ResilientImage } from '../ResilientImage';
import { MOCK_MESSAGES } from '../../data/mockData';
import { ScreenId, ChatMessage } from '../../types';

interface ChatScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onTriggerToast: (msg: string) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  onNavigate,
  onTriggerToast,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(12);

  const handleSendMessage = () => {
    if (!inputVal.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'current_user',
      text: inputVal.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isIncoming: false,
      isDelivered: true,
      isRead: false,
      isEncrypted: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
    onTriggerToast('Message encrypted via Signal Double-Ratchet (AES-GCM-256) and sent.');

    // Simulated reply after 1.8 seconds
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg_reply_${Date.now()}`,
        senderId: 'marcus_vance',
        text: 'Received and verified payload hash. Node synchronization is optimal.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isIncoming: true,
        isEncrypted: true,
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1800);
  };

  const toggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
    if (!isPlayingAudio) {
      onTriggerToast('Decrypting and streaming voice memo from decentralized vault...');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0f14] overflow-hidden select-none">
      {/* Top Header */}
      <div className="px-3.5 py-2.5 bg-[#171c21]/90 backdrop-blur-md flex items-center justify-between z-20 border-b border-white/[0.04]">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => onNavigate('home')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#dee3ea] hover:bg-[#252a30] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          <div className="relative shrink-0">
            <ResilientImage
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9ynSX7TYezR6HTEajrzMdflOvb93OYw0qL7g3qYpnm4jc9fvzO5v4Gkv0Z3wWN7koH-K86DDeSZTl0Q-s7toE8jULwgmnR4t8yyrZT9SpDGrPIVQJCT8XYr46h0WpTfW-9zO5wQ-o9TCVsaJtGHOobOBon0x6rE5Y0Dve7-gkcpL_5j5l3YibO1-lK9wbJtMGm2UUnZ-D3gw7ysDIwQiUh7AL469ZE1w6Y0ll9QjRMk5iwP8oP0gjPA"
              alt="Marcus Vance"
              fallbackText="Marcus Vance"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00f0ff] ring-1 ring-[#171c21]" />
          </div>

          <div className="min-w-0">
            <h3 className="text-xs font-semibold text-[#ebf8ff] flex items-center gap-1.5 truncate">
              Marcus Vance
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            </h3>
            <div className="flex items-center gap-1 text-[10px] text-[#46e2f3] font-mono">
              <span className="material-symbols-outlined text-[12px]">enhanced_encryption</span>
              <span>Signal E2EE • Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onTriggerToast('Establishing encrypted voice tunnel...')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#b9cacb] hover:text-[#00f0ff] hover:bg-[#252a30] transition-colors cursor-pointer"
            title="Encrypted Audio Call"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
          </button>
          <button
            onClick={() => onTriggerToast('Establishing peer video stream...')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#b9cacb] hover:text-[#00f0ff] hover:bg-[#252a30] transition-colors cursor-pointer"
            title="Encrypted Video Call"
          >
            <span className="material-symbols-outlined text-[18px]">videocam</span>
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24 no-scrollbar">
        {/* E2EE Info Pill */}
        <div className="flex justify-center my-1">
          <div className="px-3 py-1 rounded-full bg-[#252a30]/80 border border-white/5 text-[10px] font-mono text-[#b9cacb] flex items-center gap-1.5 shadow-sm text-center">
            <span className="material-symbols-outlined text-[13px] text-[#46e2f3]">
              verified_user
            </span>
            Messages are double-ratchet encrypted on device
          </div>
        </div>

        {messages.map((msg) => {
          if (msg.audioDuration) {
            return (
              <div key={msg.id} className="flex flex-col items-start max-w-[88%]">
                <div className="bg-[#252a30] text-[#ebf8ff] p-3 rounded-2xl rounded-bl-sm flex items-center gap-3 shadow-sm w-full border border-white/5">
                  <button
                    onClick={toggleAudio}
                    className="w-10 h-10 rounded-full bg-[#00f0ff] text-[#00363a] flex items-center justify-center shrink-0 cursor-pointer shadow-sm hover:scale-105 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isPlayingAudio ? 'pause' : 'play_arrow'}
                    </span>
                  </button>

                  <div className="flex-1 flex items-center gap-1 h-6">
                    {[12, 24, 8, 28, 16, 22, 10, 18, 14, 6].map((h, idx) => (
                      <span
                        key={idx}
                        className={`w-1 rounded-full transition-all duration-300 ${
                          isPlayingAudio && idx < 6
                            ? 'bg-[#00f0ff] animate-pulse'
                            : idx < 6
                            ? 'bg-[#46e2f3]'
                            : 'bg-[#30353b]'
                        }`}
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>

                  <span className="font-mono text-[11px] text-[#46e2f3]">
                    {isPlayingAudio ? '0:14' : msg.audioDuration}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#849495] mt-1 ml-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          }

          if (msg.isIncoming) {
            return (
              <div key={msg.id} className="flex flex-col items-start max-w-[82%]">
                <div className="bg-[#252a30] text-[#ebf8ff] px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-xs leading-relaxed shadow-sm border border-white/5">
                  {msg.text}
                </div>
                <span className="text-[10px] font-mono text-[#849495] mt-1 ml-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex flex-col items-end self-end max-w-[82%] ml-auto">
              <div className="bg-gradient-to-r from-[#00f0ff] to-[#00c6d7] text-[#00363a] font-medium px-3.5 py-2.5 rounded-2xl rounded-br-sm text-xs leading-relaxed shadow-[0_2px_12px_rgba(0,240,255,0.25)]">
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1 mr-1 text-[10px] font-mono text-[#849495]">
                <span>{msg.timestamp}</span>
                <span className="material-symbols-outlined text-[13px] text-[#46e2f3]">
                  done_all
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Composer */}
      <div className="p-3 bg-[#171c21]/95 backdrop-blur-xl border-t border-white/[0.04] flex items-center gap-2">
        <button
          onClick={() => onTriggerToast('Attachments are automatically encrypted with Diffie-Hellman keys.')}
          className="w-9 h-9 rounded-full bg-[#252a30] hover:bg-[#30353b] flex items-center justify-center text-[#b9cacb] hover:text-[#00f0ff] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>

        <div className="flex-1 bg-[#1b2025] border border-white/5 rounded-xl px-3 py-2 flex items-center justify-between">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Encrypted message..."
            className="bg-transparent text-xs text-[#ebf8ff] placeholder:text-[#849495] w-full focus:outline-none"
          />
          <button
            onClick={() => onTriggerToast('Emoji picker opened.')}
            className="text-[#849495] hover:text-[#00f0ff] transition-colors cursor-pointer ml-1"
          >
            <span className="material-symbols-outlined text-[18px]">mood</span>
          </button>
        </div>

        <button
          onClick={handleSendMessage}
          className="w-10 h-10 rounded-xl bg-[#00f0ff] hover:bg-[#00c6d7] text-[#00363a] flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.4)] cursor-pointer active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </div>
    </div>
  );
};
