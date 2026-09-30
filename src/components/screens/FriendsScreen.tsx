import React, { useState } from 'react';
import { ResilientImage } from '../ResilientImage';
import {
  MOCK_VERIFIED_PEERS,
  MOCK_AUTO_MATCHED,
} from '../../data/mockData';
import { ScreenId, User } from '../../types';

interface FriendsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onTriggerToast: (msg: string) => void;
}

export const FriendsScreen: React.FC<FriendsScreenProps> = ({
  onNavigate,
  onTriggerToast,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'suggested'>('all');
  const [filterChip, setFilterChip] = useState<'online' | 'recent' | 'favorites'>('online');
  const [friendsList, setFriendsList] = useState<User[]>(MOCK_VERIFIED_PEERS);
  const [suggestedList, setSuggestedList] = useState<User[]>(MOCK_AUTO_MATCHED);

  const handleDismissSuggestion = (id: string, name: string) => {
    setSuggestedList((prev) => prev.filter((item) => item.id !== id));
    onTriggerToast(`Dismissed recommendation for ${name}`);
  };

  const handleAddFriend = (id: string, name: string) => {
    setSuggestedList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFriend: true } : item))
    );
    onTriggerToast(`Friend request and key exchange sent to ${name}`);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0f14] overflow-hidden select-none">
      {/* Top Header */}
      <div className="px-4 pt-3 pb-2 bg-[#0a0f14]/90 backdrop-blur-md z-20 border-b border-white/[0.04] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="w-8 h-8 rounded-full bg-[#1b2025] hover:bg-[#252a30] text-[#dee3ea] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <div>
              <h2 className="font-headline text-base font-bold text-[#dbfcff] tracking-tight leading-tight">
                Connections
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#849495]">
                  Mesh Node Secure
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onTriggerToast('Filter mesh directory by verification tier.')}
              className="w-8 h-8 rounded-full bg-[#1b2025] hover:bg-[#252a30] text-[#dbfcff] flex items-center justify-center transition-colors cursor-pointer"
              title="Filter"
            >
              <span className="material-symbols-outlined text-[17px]">tune</span>
            </button>
            <button
              onClick={() => onNavigate('search')}
              className="w-8 h-8 rounded-full bg-[#1b2025] hover:bg-[#252a30] text-[#dbfcff] flex items-center justify-center transition-colors cursor-pointer"
              title="Search Directory"
            >
              <span className="material-symbols-outlined text-[17px]">person_search</span>
            </button>
          </div>
        </div>

        {/* Tab Toggle Capsule */}
        <div className="grid grid-cols-2 p-1 bg-[#171c21] rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-1.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#00f0ff] text-[#00363a] shadow-sm'
                : 'text-[#b9cacb] hover:text-[#dee3ea]'
            }`}
          >
            All Friends <span className="font-mono text-[11px] ml-1">(142)</span>
          </button>
          <button
            onClick={() => setActiveTab('suggested')}
            className={`py-1.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
              activeTab === 'suggested'
                ? 'bg-[#00f0ff] text-[#00363a] shadow-sm'
                : 'text-[#b9cacb] hover:text-[#dee3ea]'
            }`}
          >
            Suggested for You
          </button>
        </div>

        {/* Horizontal Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setFilterChip('online')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
              filterChip === 'online'
                ? 'bg-[#46e2f3] text-[#00363c]'
                : 'bg-[#1b2025] text-[#b9cacb] hover:text-[#dee3ea]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
            <span>Online now (38)</span>
          </button>
          <button
            onClick={() => setFilterChip('recent')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
              filterChip === 'recent'
                ? 'bg-[#46e2f3] text-[#00363c]'
                : 'bg-[#1b2025] text-[#b9cacb] hover:text-[#dee3ea]'
            }`}
          >
            Recent Interactions
          </button>
          <button
            onClick={() => setFilterChip('favorites')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 whitespace-nowrap cursor-pointer transition-colors ${
              filterChip === 'favorites'
                ? 'bg-[#46e2f3] text-[#00363c]'
                : 'bg-[#1b2025] text-[#b9cacb] hover:text-[#dee3ea]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px] text-[#46e2f3]">star</span>
            <span>Favorites</span>
          </button>
        </div>
      </div>

      {/* Main List Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-24 no-scrollbar">
        {activeTab === 'all' ? (
          <>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#849495]">
                Verified Peers
              </span>
              <span className="font-mono text-[10px] text-[#46e2f3]">
                SORTED: RECENCY
              </span>
            </div>

            {friendsList.map((peer) => (
              <div
                key={peer.id}
                className="bg-[#171c21]/80 hover:bg-[#1b2025] transition-all p-3 rounded-2xl flex items-center justify-between gap-3 border border-white/[0.04]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <ResilientImage
                      src={peer.avatar}
                      alt={peer.name}
                      fallbackText={peer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {peer.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00ff88] ring-2 ring-[#171c21] shadow-[0_0_6px_#00ff88]" />
                    )}
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#dbfcff] truncate">
                        {peer.name}
                      </span>
                      {peer.verified && (
                        <span className="material-symbols-outlined text-[#46e2f3] text-[14px]">
                          verified
                        </span>
                      )}
                      {peer.isPro && (
                        <span className="text-[9px] font-mono text-[#00f0ff] bg-[#252a30] px-1.5 py-0.5 rounded font-bold">
                          PRO
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-[#849495] truncate">
                      @{peer.username}
                    </span>
                    <span className="text-[10px] text-[#b9cacb] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[11px] text-[#46e2f3]">
                        hub
                      </span>
                      <span>{peer.mutualFriends} mutual friends</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('chat')}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-[#00f0ff] hover:bg-[#00c6d7] text-[#00363a] font-semibold text-xs flex items-center gap-1 transition-transform active:scale-95 cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Message</span>
                </button>
              </div>
            ))}
          </>
        ) : null}

        {/* Suggested For You Block */}
        {(activeTab === 'suggested' || activeTab === 'all') && (
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#46e2f3] text-[17px]">
                  auto_awesome
                </span>
                <span className="font-headline text-xs font-bold text-[#dbfcff]">
                  Suggested For You
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#46e2f3] uppercase tracking-wider">
                Auto-Matched
              </span>
            </div>

            {suggestedList.map((rec) => (
              <div
                key={rec.id}
                className="bg-gradient-to-br from-[#171c21] via-[#1b2025] to-[#171c21] p-3.5 rounded-2xl space-y-2.5 border border-white/[0.05] shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <ResilientImage
                      src={rec.avatar}
                      alt={rec.name}
                      fallbackText={rec.name}
                      className="w-11 h-11 rounded-2xl object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#dbfcff]">
                          {rec.name}
                        </span>
                        <span className="material-symbols-outlined text-[#46e2f3] text-[13px]">
                          auto_fix_high
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#849495]">
                        @{rec.username}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#252a30] text-[#00f0ff] font-mono text-[10px] font-semibold border border-[#00f0ff]/20">
                    {rec.matchScore}% MATCH
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#b9cacb]">
                  <span className="material-symbols-outlined text-[#46e2f3] text-[13px]">
                    diversity_1
                  </span>
                  <span>{rec.mutualFriends} mutual friends in Tokyo Hub</span>
                </div>

                {rec.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {rec.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-[#252a30] text-[#dbfcff] text-[10px] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleAddFriend(rec.id, rec.name)}
                    disabled={rec.isFriend}
                    className={`flex-1 py-1.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      rec.isFriend
                        ? 'bg-[#252a30] text-[#00f0ff] border border-[#00f0ff]/30'
                        : 'bg-[#dbfcff] hover:bg-[#a4f8ff] text-[#00363a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {rec.isFriend ? 'check' : 'person_add'}
                    </span>
                    <span>{rec.isFriend ? 'Request Sent' : 'Add Friend'}</span>
                  </button>

                  <button
                    onClick={() => handleDismissSuggestion(rec.id, rec.name)}
                    className="w-9 h-9 rounded-xl bg-[#252a30] hover:bg-[#30353b] text-[#849495] hover:text-[#dee3ea] flex items-center justify-center transition-colors cursor-pointer"
                    title="Dismiss"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
