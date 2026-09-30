import React, { useState, useMemo } from 'react';
import { ResilientImage } from '../ResilientImage';
import {
  MOCK_SEARCHABLE_DIRECTORY,
  MOCK_TRENDING_CREATORS,
} from '../../data/mockData';
import { ScreenId, User } from '../../types';

interface SearchScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onTriggerToast: (msg: string) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onNavigate,
  onTriggerToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('Elena Rostova');
  const [trending, setTrending] = useState<User[]>(MOCK_TRENDING_CREATORS);
  const [connections, setConnections] = useState<Record<string, boolean>>({
    search_elena_1: true,
  });

  const filteredPeople = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_SEARCHABLE_DIRECTORY;
    const q = searchQuery.toLowerCase();
    return MOCK_SEARCHABLE_DIRECTORY.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        (u.email && u.email.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const toggleFollow = (id: string, name: string) => {
    setTrending((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const isFollowing = !c.isFollowing;
          onTriggerToast(
            isFollowing
              ? `Subscribed to ${name}'s encrypted moments feed.`
              : `Unsubscribed from ${name}.`
          );
          return { ...c, isFollowing };
        }
        return c;
      })
    );
  };

  const toggleAdd = (id: string, name: string) => {
    setConnections((prev) => {
      const isConnected = !prev[id];
      onTriggerToast(
        isConnected
          ? `Connection established with ${name}`
          : `Removed connection with ${name}`
      );
      return { ...prev, [id]: isConnected };
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0f14] overflow-hidden select-none">
      {/* Top Header & Search Capsule */}
      <div className="px-4 pt-3 pb-2.5 bg-[#0a0f14]/90 backdrop-blur-md z-20 border-b border-white/[0.04] space-y-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="w-8 h-8 rounded-full bg-[#1b2025] hover:bg-[#252a30] text-[#dee3ea] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div className="flex-1">
            <h2 className="font-headline text-base font-bold text-[#dbfcff] tracking-tight leading-tight">
              People Directory
            </h2>
            <span className="text-[10px] text-[#849495] font-mono">
              Global identity index
            </span>
          </div>
          <button
            onClick={() => onTriggerToast('Camera scanner ready for QR identity keys.')}
            className="w-8 h-8 rounded-full bg-[#1b2025] hover:bg-[#252a30] text-[#46e2f3] flex items-center justify-center transition-colors cursor-pointer"
            title="Scan QR Identity"
          >
            <span className="material-symbols-outlined text-[17px]">qr_code_scanner</span>
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center bg-[#171c21] rounded-2xl px-3 py-1.5 border border-white/5 focus-within:border-[#00f0ff]/50 shadow-inner">
          <span className="material-symbols-outlined text-[#46e2f3] text-[18px] mr-2">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, handle, or Gmail..."
            className="w-full bg-transparent text-xs text-[#ebf8ff] placeholder:text-[#849495] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="w-6 h-6 rounded-full bg-[#252a30] hover:bg-[#30353b] text-[#849495] hover:text-[#dee3ea] flex items-center justify-center cursor-pointer mr-1"
            >
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          )}
          <button
            onClick={() => {
              setSearchQuery('Elena Rostova');
              onTriggerToast('Voice query parsed: "Elena Rostova"');
            }}
            className="w-6 h-6 rounded-full bg-[#00f0ff] text-[#00363a] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            title="Voice Search"
          >
            <span className="material-symbols-outlined text-[14px]">mic</span>
          </button>
        </div>

        {/* Recents Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          <span className="text-[10px] font-mono text-[#849495] uppercase mr-0.5">
            Recents:
          </span>
          <button
            onClick={() => setSearchQuery('sora.eth')}
            className="px-2 py-0.5 rounded-full bg-[#1b2025] hover:bg-[#252a30] text-[10px] font-mono text-[#b9cacb] hover:text-[#00f0ff] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>@sora.eth</span>
          </button>
          <button
            onClick={() => setSearchQuery('elena.design@gmail.com')}
            className="px-2 py-0.5 rounded-full bg-[#1b2025] hover:bg-[#252a30] text-[10px] font-mono text-[#b9cacb] hover:text-[#00f0ff] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>elena.design@gmail.com</span>
          </button>
          <button
            onClick={() => setSearchQuery('Tokyo')}
            className="px-2 py-0.5 rounded-full bg-[#1b2025] hover:bg-[#252a30] text-[10px] font-mono text-[#b9cacb] hover:text-[#00f0ff] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Crypto Tokyo</span>
          </button>
        </div>
      </div>

      {/* Results Viewport */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-24 no-scrollbar">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#849495]">
            Matching Identities ({filteredPeople.length})
          </span>
          <span className="font-mono text-[9px] text-[#00f0ff] font-semibold">
            EXACT MATCH: GMAIL & HANDLE
          </span>
        </div>

        {filteredPeople.map((person) => {
          const isConnected = !!connections[person.id];
          return (
            <div
              key={person.id}
              className="bg-[#171c21]/80 hover:bg-[#1b2025] p-3 rounded-2xl flex items-center justify-between gap-3 border border-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  {person.avatar ? (
                    <ResilientImage
                      src={person.avatar}
                      alt={person.name}
                      fallbackText={person.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#00c6d7]/20 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] font-bold text-sm font-mono">
                      {person.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                  {person.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00ff88] ring-2 ring-[#171c21]" />
                  )}
                </div>

                <div className="min-w-0 flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#dbfcff] truncate">
                      {person.name}
                    </span>
                    {person.verified && (
                      <span className="material-symbols-outlined text-[#46e2f3] text-[14px]">
                        verified
                      </span>
                    )}
                    {person.role && (
                      <span className="text-[9px] font-mono text-[#849495] bg-[#252a30] px-1 py-0.5 rounded">
                        {person.role}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-[#849495] truncate">
                    @{person.username}
                  </span>
                  {person.email && (
                    <span className="text-[10px] font-mono text-[#46e2f3] truncate">
                      {person.email}
                    </span>
                  )}
                  {person.mutualFriends && (
                    <span className="text-[10px] text-[#849495] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[11px] text-[#46e2f3]">
                        hub
                      </span>
                      <span>{person.mutualFriends} mutual friends</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                {isConnected ? (
                  <>
                    <span className="px-2 py-0.5 rounded-full bg-[#00f0ff]/15 text-[#00f0ff] font-mono text-[9px] uppercase font-bold">
                      Connected
                    </span>
                    <button
                      onClick={() => onNavigate('chat')}
                      className="px-3 py-1 rounded-xl bg-[#00f0ff] hover:bg-[#00c6d7] text-[#00363a] font-semibold text-xs flex items-center gap-1 cursor-pointer transition-transform active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[15px]">chat</span>
                      <span>Message</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => toggleAdd(person.id, person.name)}
                    className="px-3 py-1.5 rounded-xl bg-[#dbfcff] hover:bg-[#a4f8ff] text-[#00363a] font-semibold text-xs flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <span className="material-symbols-outlined text-[15px]">person_add</span>
                    <span>Add Friend</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Trending Creators Grid */}
        <div className="pt-2 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#46e2f3] text-[17px]">
                trending_up
              </span>
              <span className="font-headline text-xs font-bold text-[#dbfcff]">
                Trending Creators
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#46e2f3] uppercase tracking-wider">
              Algorithmic Surge
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {trending.map((creator) => (
              <div
                key={creator.id}
                className="bg-[#171c21] p-3 rounded-2xl flex flex-col items-center text-center space-y-1.5 border border-white/[0.04]"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ResilientImage
                    src={creator.avatar}
                    alt={creator.name}
                    fallbackText={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-bold text-[#dbfcff] truncate w-full">
                  {creator.name}
                </span>
                <span className="text-[10px] font-mono text-[#849495] truncate w-full">
                  @{creator.username}
                </span>
                <span className="text-[10px] font-mono text-[#46e2f3]">
                  {creator.subscribers}
                </span>
                <button
                  onClick={() => toggleFollow(creator.id, creator.name)}
                  className={`w-full py-1 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    creator.isFollowing
                      ? 'bg-[#252a30] text-[#00f0ff] border border-[#00f0ff]/30'
                      : 'bg-[#00f0ff] hover:bg-[#00c6d7] text-[#00363a]'
                  }`}
                >
                  {creator.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
