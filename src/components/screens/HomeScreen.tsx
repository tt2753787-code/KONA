import React, { useState } from 'react';
import { KonanaLogo } from '../KonanaLogo';
import { ResilientImage } from '../ResilientImage';
import {
  MOCK_STORIES,
  MOCK_DISCOVERY_PEOPLE,
  MOCK_POSTS,
  CURRENT_USER,
} from '../../data/mockData';
import { ScreenId, Post } from '../../types';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenViewer?: (url: string, title: string) => void;
  onTriggerToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenViewer,
  onTriggerToast,
}) => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [addedPeers, setAddedPeers] = useState<Record<string, boolean>>({});
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const toggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isBookmarked = !p.isBookmarked;
          onTriggerToast(
            isBookmarked
              ? 'Post saved to Encrypted Vault.'
              : 'Post removed from Vault.'
          );
          return { ...p, isBookmarked };
        }
        return p;
      })
    );
  };

  const handleAddPeer = (id: string, name: string) => {
    setAddedPeers((prev) => {
      const isConnected = !prev[id];
      onTriggerToast(
        isConnected
          ? `Key exchange initiated with ${name}`
          : `Removed connection with ${name}`
      );
      return { ...prev, [id]: isConnected };
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0f14] overflow-hidden">
      {/* Obsidian Top App Bar */}
      <div className="px-4 py-3 flex items-center justify-between bg-[#0a0f14]/90 backdrop-blur-md z-20 border-b border-white/[0.04]">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <KonanaLogo size={28} withGlow={true} />
          <span className="font-headline text-lg font-bold text-[#dbfcff] tracking-tight">
            KONANA
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('search')}
            className="w-9 h-9 rounded-full bg-[#252a30] hover:bg-[#30353b] flex items-center justify-center text-[#b9cacb] hover:text-[#00f0ff] transition-colors cursor-pointer"
            title="Search People"
          >
            <span className="material-symbols-outlined text-[19px]">person_search</span>
          </button>

          <div className="relative">
            <button
              onClick={() => onTriggerToast('All 3 notification alerts are end-to-end verified.')}
              className="w-9 h-9 rounded-full bg-[#252a30] hover:bg-[#30353b] flex items-center justify-center text-[#b9cacb] hover:text-[#00f0ff] transition-colors cursor-pointer"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[19px]">notifications</span>
            </button>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#00f0ff] ring-2 ring-[#0a0f14]" />
          </div>

          {/* Self Avatar */}
          <div
            onClick={() => onNavigate('profile')}
            className="relative cursor-pointer hover:scale-105 transition-transform"
            title="View Vault Profile"
          >
            <ResilientImage
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              fallbackText={CURRENT_USER.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#00f0ff]/50"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00f0ff] ring-2 ring-[#0a0f14]" />
          </div>
        </div>
      </div>

      {/* Scrollable Feed Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 space-y-4 no-scrollbar">
        {/* End-to-End Encrypted Status Banner */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-full bg-[#171c21]/90 backdrop-blur-md border border-[#00f0ff]/10">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="font-mono text-[10px] text-[#b9cacb] uppercase tracking-wider truncate">
              END-TO-END ENCRYPTED VAULT
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#46e2f3] font-semibold">
            P-521 LIVE
          </span>
        </div>

        {/* Stories / Moments Horizontal Tray */}
        <div className="flex items-center gap-3 overflow-x-auto py-1 no-scrollbar">
          {/* Add story item */}
          <div
            onClick={() => onTriggerToast('Select encrypted media to upload story.')}
            className="shrink-0 flex flex-col items-center gap-1 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#252a30] group-hover:bg-[#30353b] transition-colors flex items-center justify-center text-[#dbfcff] relative border border-white/5">
              <span className="material-symbols-outlined text-[22px]">add_a_photo</span>
              <span className="absolute -bottom-1 -right-1 bg-[#00f0ff] text-[#00363a] rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs shadow-sm">
                +
              </span>
            </div>
            <span className="text-[11px] text-[#849495] group-hover:text-[#dee3ea] transition-colors">
              Post Story
            </span>
          </div>

          {/* Story Avatars */}
          {MOCK_STORIES.map((story, i) => (
            <div
              key={story.id}
              onClick={() => {
                setActiveStoryIndex(i);
                onTriggerToast(`Viewing moment from @${story.username}`);
              }}
              className="shrink-0 flex flex-col items-center gap-1 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl p-[2px] bg-gradient-to-tr from-[#00f0ff] via-[#46e2f3] to-[#dbfcff] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                <ResilientImage
                  src={story.avatar}
                  alt={story.username}
                  fallbackText={story.username}
                  className="w-full h-full rounded-[13px] object-cover"
                />
              </div>
              <span className="text-[11px] text-[#dee3ea] truncate max-w-[56px]">
                {story.username}
              </span>
            </div>
          ))}
        </div>

        {/* Suggested Discoveries Horizontal Strip */}
        <div className="bg-[#171c21]/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/[0.04]">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#849495]">
              Suggested Discoveries
            </span>
            <button
              onClick={() => onNavigate('friends')}
              className="text-[11px] text-[#46e2f3] hover:text-[#00f0ff] cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {MOCK_DISCOVERY_PEOPLE.map((peer) => {
              const isAdded = !!addedPeers[peer.id];
              return (
                <div
                  key={peer.id}
                  className="shrink-0 w-36 bg-[#1b2025] p-2.5 rounded-xl flex flex-col items-center text-center border border-white/[0.04]"
                >
                  <div className="relative mb-1.5">
                    <ResilientImage
                      src={peer.avatar}
                      alt={peer.name}
                      fallbackText={peer.name}
                      className="w-12 h-12 rounded-full object-cover ring-1 ring-[#00f0ff]/30"
                    />
                    {peer.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00ff88] ring-2 ring-[#1b2025]" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#ebf8ff] truncate w-full">
                    {peer.name}
                  </span>
                  <span className="text-[10px] text-[#849495] mb-2 font-mono">
                    {peer.mutualFriends} mutual links
                  </span>
                  <button
                    onClick={() => handleAddPeer(peer.id, peer.name)}
                    className={`w-full py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-[#252a30] text-[#00f0ff] border border-[#00f0ff]/30'
                        : 'bg-[#00f0ff] hover:bg-[#00c6d7] text-[#00363a]'
                    }`}
                  >
                    {isAdded ? 'Connected' : '+ Add'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feed Posts */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#171c21] rounded-3xl overflow-hidden border border-white/[0.05] shadow-lg"
          >
            {/* Post Author Header */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ResilientImage
                  src={post.author.avatar}
                  alt={post.author.name}
                  fallbackText={post.author.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#ebf8ff]">
                      {post.author.name}
                    </span>
                    {post.author.verified && (
                      <span className="material-symbols-outlined text-[14px] text-[#46e2f3]">
                        verified
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#849495] font-mono">
                    {post.location} • {post.timestamp}
                  </span>
                </div>
              </div>
              <button
                onClick={() =>
                  onTriggerToast(`Encrypted CID: ${post.ipfsCid}`)
                }
                className="text-[#849495] hover:text-[#dee3ea] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  more_vert
                </span>
              </button>
            </div>

            {/* Post Media */}
            <div
              className="relative w-full aspect-[16/10] bg-[#1b2025] cursor-pointer overflow-hidden group"
              onClick={() =>
                onOpenViewer
                  ? onOpenViewer(post.mediaUrl, post.author.name)
                  : onTriggerToast('Viewing media asset.')
              }
            >
              <ResilientImage
                src={post.mediaUrl}
                alt={post.content}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute bottom-2.5 left-2.5 bg-[#0a0f14]/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs text-[#00f0ff] border border-white/5">
                <span className="material-symbols-outlined text-[13px]">
                  lock
                </span>
                <span className="font-mono text-[10px]">P2P Encrypted Post</span>
              </div>
              <div className="absolute top-2.5 right-2.5 bg-[#0a0f14]/80 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] text-[#46e2f3] font-mono">
                <span className="material-symbols-outlined text-[12px]">
                  cloud_done
                </span>
                IPFS
              </div>
            </div>

            {/* Post Actions & Stats */}
            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-transform active:scale-90"
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        post.isLiked ? 'text-[#ff5252]' : 'text-[#849495]'
                      }`}
                      style={
                        post.isLiked
                          ? { fontVariationSettings: "'FILL' 1" }
                          : undefined
                      }
                    >
                      favorite
                    </span>
                    <span className={post.isLiked ? 'text-[#ff5252]' : 'text-[#dee3ea]'}>
                      {post.likes}
                    </span>
                  </button>

                  <button
                    onClick={() => onNavigate('chat')}
                    className="flex items-center gap-1.5 text-xs text-[#849495] hover:text-[#00f0ff] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      chat_bubble
                    </span>
                    <span>{post.comments}</span>
                  </button>

                  <button
                    onClick={() =>
                      onTriggerToast('Zero-knowledge payload link copied to clipboard.')
                    }
                    className="flex items-center gap-1 text-xs text-[#849495] hover:text-[#00f0ff] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      send
                    </span>
                  </button>
                </div>

                <button
                  onClick={() => toggleBookmark(post.id)}
                  className={`cursor-pointer transition-colors ${
                    post.isBookmarked ? 'text-[#00f0ff]' : 'text-[#849495]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={
                      post.isBookmarked
                        ? { fontVariationSettings: "'FILL' 1" }
                        : undefined
                    }
                  >
                    bookmark
                  </span>
                </button>
              </div>

              <p className="text-xs text-[#dee3ea] leading-relaxed">
                <span className="font-semibold text-[#00f0ff] mr-1.5">
                  {post.author.name}
                </span>
                {post.content}
              </p>

              {post.tags && (
                <div className="flex gap-2 text-[10px] font-mono text-[#46e2f3]">
                  {post.tags.map((tag, idx) => (
                    <span key={idx}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Feed Direct Chat Snippet */}
        <div
          onClick={() => onNavigate('chat')}
          className="bg-[#1b2025] hover:bg-[#252a30] p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-colors border border-white/[0.04]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <ResilientImage
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMb2uYAQkFi2hYhJo9HVirEtlxDGFTu3UOi34MuMeg-8wLAqtoK9h54N2M78TuQNBW8H5ALmA54JLMCImCfpJcTfWC14XWSPi_TjoWSGTkjRFdvRBRWbHon1PD6KeDLQqiiB0jYCDa04Bt6G0UAII6zudHnCO1Ggi7OsX44NpU-mksSikxXvVlODR2oGI8Uc2S9VQr1gxkKoe66PyPydqMwu-IrB7qEB2Ej8OqWTGw3lSvwOQKdI0tlA"
                alt="Marcus Vance"
                fallbackText="Marcus Vance"
                className="w-11 h-11 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00f0ff] ring-2 ring-[#1b2025]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#ebf8ff]">
                  Marcus Vance
                </span>
                <span className="text-[10px] font-mono text-[#849495]">09:38</span>
              </div>
              <p className="text-xs text-[#b9cacb] truncate max-w-[170px]">
                Vault key exchange accepted. Check the blueprint...
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="w-5 h-5 rounded-full bg-[#00f0ff] text-[#00363a] text-[11px] font-bold flex items-center justify-center">
              2
            </span>
            <span className="material-symbols-outlined text-[#46e2f3] text-[14px]">
              lock
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
