import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ChatScreen } from './screens/ChatScreen';
import { FriendsScreen } from './screens/FriendsScreen';
import { SearchScreen } from './screens/SearchScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { DiagnosticsScreen } from './screens/DiagnosticsScreen';

interface PhoneSimulatorProps {
  activeScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  onOpenViewer?: (url: string, title: string) => void;
  onTriggerToast: (msg: string) => void;
  hapticTrigger?: number;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  activeScreen,
  onScreenChange,
  onOpenViewer,
  onTriggerToast,
  hapticTrigger = 0,
}) => {
  const [timeStr, setTimeStr] = useState('09:41');
  const [showHapticWave, setShowHapticWave] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hapticTrigger > 0) {
      setShowHapticWave(true);
      const t = setTimeout(() => setShowHapticWave(false), 800);
      return () => clearTimeout(t);
    }
  }, [hapticTrigger]);

  const showBottomNav = activeScreen !== 'splash';

  return (
    <div className="relative w-[380px] sm:w-[412px] h-[870px] bg-[#05080b] rounded-[48px] p-[10px] shadow-[0_24px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(0,240,255,0.12)] ring-1 ring-[#30353b]/40 flex flex-col select-none shrink-0 transition-transform">
      {/* Physical Hardware Speaker Slit */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-[#252a30]/80 z-50 pointer-events-none" />

      {/* Screen Inner Display */}
      <div className="relative w-full h-full bg-[#0a0f14] rounded-[40px] overflow-hidden flex flex-col text-[#dee3ea]">
        {/* Haptic tactile wave simulation overlay */}
        {showHapticWave && (
          <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-[#00f0ff] animate-ping opacity-75" />
            <div className="absolute w-48 h-48 rounded-full border border-[#46e2f3] animate-ping opacity-40 delay-100" />
          </div>
        )}

        {/* Android 14 Status Bar with Punch-Hole Camera */}
        <div className="relative w-full h-11 px-6 pt-2 flex items-center justify-between z-40 bg-[#0a0f14]/80 backdrop-blur-md shrink-0">
          <span className="font-headline text-[13px] text-[#ebf8ff] font-bold tracking-tight">
            {timeStr}
          </span>

          {/* Punch Hole Camera Dot */}
          <div className="w-3.5 h-3.5 rounded-full bg-black ring-1 ring-[#30353b]/50 shadow-inner flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#171c21]" />
          </div>

          {/* Signals & Battery */}
          <div className="flex items-center gap-1.5 text-[#b9cacb]">
            <span className="font-mono text-[10px] text-[#46e2f3] font-bold">5G</span>
            <span className="material-symbols-outlined text-[15px]">wifi</span>
            <span className="material-symbols-outlined text-[15px] text-[#46e2f3]">
              battery_charging_full
            </span>
            <span className="font-mono text-[10px] text-[#ebf8ff] ml-0.5 font-semibold">
              98%
            </span>
          </div>
        </div>

        {/* Dynamic Screen Viewport */}
        <div className="relative flex-1 w-full overflow-hidden">
          {activeScreen === 'splash' && (
            <SplashScreen
              onNavigate={onScreenChange}
              onTriggerToast={onTriggerToast}
            />
          )}
          {activeScreen === 'home' && (
            <HomeScreen
              onNavigate={onScreenChange}
              onOpenViewer={onOpenViewer}
              onTriggerToast={onTriggerToast}
            />
          )}
          {activeScreen === 'chat' && (
            <ChatScreen
              onNavigate={onScreenChange}
              onTriggerToast={onTriggerToast}
            />
          )}
          {activeScreen === 'friends' && (
            <FriendsScreen
              onNavigate={onScreenChange}
              onTriggerToast={onTriggerToast}
            />
          )}
          {activeScreen === 'search' && (
            <SearchScreen
              onNavigate={onScreenChange}
              onTriggerToast={onTriggerToast}
            />
          )}
          {activeScreen === 'profile' && (
            <ProfileScreen
              onNavigate={onScreenChange}
              onOpenViewer={onOpenViewer}
              onTriggerToast={onTriggerToast}
            />
          )}
          {activeScreen === 'diagnostics' && (
            <DiagnosticsScreen
              onNavigate={onScreenChange}
              onTriggerToast={onTriggerToast}
            />
          )}
        </div>

        {/* Floating Bottom Nav Dock (Android Obsidian Spec) */}
        {showBottomNav && (
          <nav className="absolute bottom-4 left-4 right-4 h-16 bg-[#0a0f14]/85 backdrop-blur-2xl rounded-full px-4 flex items-center justify-around z-30 shadow-[0_10px_30px_rgba(0,0,0,0.7)] border border-white/[0.06]">
            {/* HOME */}
            <button
              onClick={() => onScreenChange('home')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeScreen === 'home'
                  ? 'text-[#00f0ff]'
                  : 'text-[#849495] hover:text-[#dee3ea]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={
                  activeScreen === 'home'
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                dynamic_feed
              </span>
              <span className="font-mono text-[9px] font-bold tracking-tight">
                HOME
              </span>
            </button>

            {/* FRIENDS */}
            <button
              onClick={() => onScreenChange('friends')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeScreen === 'friends'
                  ? 'text-[#00f0ff]'
                  : 'text-[#849495] hover:text-[#dee3ea]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={
                  activeScreen === 'friends'
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                group
              </span>
              <span className="font-mono text-[9px] font-bold tracking-tight">
                FRIENDS
              </span>
            </button>

            {/* CHAT */}
            <button
              onClick={() => onScreenChange('chat')}
              className={`relative flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeScreen === 'chat'
                  ? 'text-[#00f0ff]'
                  : 'text-[#849495] hover:text-[#dee3ea]'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">forum</span>
              <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              <span className="font-mono text-[9px] font-bold tracking-tight">
                CHAT
              </span>
            </button>

            {/* PROFILE */}
            <button
              onClick={() => onScreenChange('profile')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeScreen === 'profile'
                  ? 'text-[#00f0ff]'
                  : 'text-[#849495] hover:text-[#dee3ea]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={
                  activeScreen === 'profile'
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                account_circle
              </span>
              <span className="font-mono text-[9px] font-bold tracking-tight">
                PROFILE
              </span>
            </button>
          </nav>
        )}

        {/* Android Gesture Navigation Bar Pill */}
        <div className="w-full h-5 flex items-center justify-center bg-[#0a0f14] pb-1 shrink-0 z-40">
          <div className="w-32 h-1 rounded-full bg-[#30353b]/80" />
        </div>
      </div>
    </div>
  );
};
