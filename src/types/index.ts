export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  avatar: string;
  verified?: boolean;
  isPro?: boolean;
  status: 'online' | 'active_recently' | 'idle' | 'offline';
  statusText?: string;
  mutualFriends?: number;
  matchScore?: number;
  tags?: string[];
  bio?: string;
  peersCount?: number;
  mediaCount?: number;
  trustScore?: string;
  walletKey?: string;
  role?: string;
  subscribers?: string;
  isFriend?: boolean;
  isFollowing?: boolean;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  hasUnread: boolean;
  image?: string;
  timestamp?: string;
}

export interface Post {
  id: string;
  author: User;
  location: string;
  timestamp: string;
  content: string;
  mediaUrl: string;
  isEncrypted: boolean;
  ipfsPinned: boolean;
  ipfsCid: string;
  likes: number;
  isLiked?: boolean;
  comments: number;
  shares: number;
  isBookmarked?: boolean;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text?: string;
  audioDuration?: string;
  timestamp: string;
  isIncoming: boolean;
  isDelivered?: boolean;
  isRead?: boolean;
  isEncrypted?: boolean;
}

export type ScreenId =
  | 'splash'
  | 'home'
  | 'chat'
  | 'friends'
  | 'search'
  | 'profile'
  | 'diagnostics'
  | 'viewer';

export type MainViewMode =
  | 'workspace'
  | 'dual_runtime'
  | 'cloud_architecture'
  | 'device_only';
