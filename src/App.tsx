/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { KonanaLogo } from './components/KonanaLogo';
import { PhoneSimulator } from './components/PhoneSimulator';
import { InspectorPanel } from './components/InspectorPanel';
import { DualRuntimeView } from './components/DualRuntimeView';
import { CloudArchitectureView } from './components/CloudArchitectureView';
import { MediaViewerModal } from './components/MediaViewerModal';
import { ScreenId, MainViewMode } from './types';
import { VAULT_MEDIA_GALLERY } from './data/mockData';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [mainView, setMainView] = useState<MainViewMode>('workspace');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hapticCounter, setHapticCounter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lightbox Viewer state
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
  }>({
    isOpen: false,
    url: '',
    title: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3800);
  };

  const triggerHaptic = () => {
    setHapticCounter((c) => c + 1);
    showToast('Haptic feedback: 20ms tactile ripple dispatched to display canvas.');
  };

  const openViewer = (url: string, title: string) => {
    setViewerState({
      isOpen: true,
      url,
      title,
    });
  };

  const closeViewer = () => {
    setViewerState((prev) => ({ ...prev, isOpen: false }));
  };

  // Quick navigation helper
  const handleNavSelect = (view: MainViewMode, screen?: ScreenId) => {
    setMainView(view);
    if (screen) setActiveScreen(screen);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f14] text-[#dee3ea] flex font-sans selection:bg-[#00f0ff] selection:text-[#00363a]">
      {/* ========================================================
          LEFT NAVIGATION DRAWER (Obsidian Simulator Flows)
          ======================================================== */}
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-[#080d11] z-50 flex flex-col pt-4 pb-6 border-r border-white/[0.05] shadow-[0_1px_8px_rgba(0,0,0,0.5)] transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo and Simulator Version */}
        <div className="px-5 mb-6 flex items-center justify-between">
          <div
            onClick={() => handleNavSelect('workspace', 'home')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <KonanaLogo size={32} withGlow={true} />
            <span className="font-headline text-lg font-bold text-[#dbfcff] tracking-tight">
              KONANA
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#1b2025] text-[#46e2f3] font-mono text-[10px] tracking-widest uppercase border border-white/5">
            SIM v2.4
          </span>
        </div>

        {/* Section Header */}
        <div className="px-5 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#849495]">
            Simulator Flows
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
          <button
            onClick={() => handleNavSelect('workspace')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              mainView === 'workspace'
                ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-[#b9cacb] hover:bg-[#171c21] hover:text-[#dee3ea]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">smartphone</span>
            <span>App Simulator Workspace</span>
          </button>

          <button
            onClick={() => handleNavSelect('workspace', 'home')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
              mainView === 'workspace' && activeScreen === 'home'
                ? 'bg-[#1b2025] text-[#00f0ff] font-semibold border border-[#00f0ff]/30'
                : 'text-[#b9cacb] hover:bg-[#171c21] hover:text-[#dee3ea]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">dynamic_feed</span>
            <span>Home & Social Feed</span>
          </button>

          <button
            onClick={() => handleNavSelect('dual_runtime', 'friends')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
              mainView === 'dual_runtime'
                ? 'bg-[#00f0ff] text-[#00363a] font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-[#b9cacb] hover:bg-[#171c21] hover:text-[#dee3ea]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            <span>Friends & Discovery</span>
          </button>

          <button
            onClick={() => handleNavSelect('workspace', 'search')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
              mainView === 'workspace' && activeScreen === 'search'
                ? 'bg-[#1b2025] text-[#00f0ff] font-semibold border border-[#00f0ff]/30'
                : 'text-[#b9cacb] hover:bg-[#171c21] hover:text-[#dee3ea]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">person_search</span>
            <span>Search People</span>
          </button>

          <button
            onClick={() => handleNavSelect('workspace', 'chat')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
              mainView === 'workspace' && activeScreen === 'chat'
                ? 'bg-[#1b2025] text-[#00f0ff] font-semibold border border-[#00f0ff]/30'
                : 'text-[#b9cacb] hover:bg-[#171c21] hover:text-[#dee3ea]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">lock</span>
            <span>Private Encrypted Chat</span>
          </button>

          <button
            onClick={() => handleNavSelect('workspace', 'profile')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
              mainView === 'workspace' && activeScreen === 'profile'
                ? 'bg-[#1b2025] text-[#00f0ff] font-semibold border border-[#00f0ff]/30'
                : 'text-[#b9cacb] hover:bg-[#171c21] hover:text-[#dee3ea]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">account_box</span>
            <span>Profile & Media Gallery</span>
          </button>

          <button
            onClick={() =>
              openViewer(
                VAULT_MEDIA_GALLERY[0].url,
                VAULT_MEDIA_GALLERY[0].title
              )
            }
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-[#b9cacb] hover:bg-[#171c21] hover:text-[#dee3ea] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">perm_media</span>
            <span>Media Viewer</span>
          </button>

          <button
            onClick={() => handleNavSelect('cloud_architecture')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
              mainView === 'cloud_architecture'
                ? 'bg-[#00f0ff] text-[#00363a] font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-[#b9cacb] hover:bg-[#171c21] hover:text-[#dee3ea]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">database</span>
            <span>Cloud Architecture & SQL</span>
          </button>

          <button
            onClick={() => handleNavSelect('workspace', 'diagnostics')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
              mainView === 'workspace' && activeScreen === 'diagnostics'
                ? 'bg-[#1b2025] text-[#00f0ff] font-semibold border border-[#00f0ff]/30'
                : 'text-[#b9cacb] hover:bg-[#171c21] hover:text-[#dee3ea]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <span>System Diagnostics</span>
          </button>
        </nav>

        {/* Bottom Specs Footer */}
        <div className="px-4 pt-2 mt-auto">
          <div className="bg-[#171c21] p-3 rounded-2xl flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
              <span className="text-[11px] text-[#b9cacb] font-medium">
                Android 14 Scrim
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#849495]">
              412x915 dp
            </span>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MAIN APP CONTAINER (Offset for lg:pl-72)
          ======================================================== */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Floating App Bar */}
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#080d11]/85 backdrop-blur-xl border-b border-white/[0.05] z-40 flex items-center justify-between px-6 shadow-sm">
          {/* Left: Mobile hamburger & Obsidian Runtime Engine Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden w-9 h-9 rounded-xl bg-[#171c21] flex items-center justify-center text-[#dee3ea] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>

            <div
              onClick={() => handleNavSelect('workspace', 'home')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <KonanaLogo size={28} withGlow={true} />
              <span className="font-headline text-base font-bold text-[#dbfcff] tracking-tight hidden sm:inline">
                KONANA
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-[#171c21] px-3 py-1 rounded-full border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#b9cacb]">
                OBSIDIAN RUNTIME ENGINE
              </span>
            </div>
          </div>

          {/* Center: Quick Mode Navigator */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#171c21] p-1 rounded-full border border-white/5">
            <button
              onClick={() => setMainView('workspace')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                mainView === 'workspace'
                  ? 'bg-[#00f0ff] text-[#00363a]'
                  : 'text-[#b9cacb] hover:text-[#dee3ea]'
              }`}
            >
              Workspace
            </button>
            <button
              onClick={() => {
                setMainView('workspace');
                setActiveScreen('home');
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                mainView === 'workspace' && activeScreen === 'home'
                  ? 'bg-[#00f0ff] text-[#00363a]'
                  : 'text-[#b9cacb] hover:text-[#dee3ea]'
              }`}
            >
              Feed Flow
            </button>
            <button
              onClick={() => setMainView('dual_runtime')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                mainView === 'dual_runtime'
                  ? 'bg-[#00f0ff] text-[#00363a]'
                  : 'text-[#b9cacb] hover:text-[#dee3ea]'
              }`}
            >
              Dual Discovery
            </button>
            <button
              onClick={() => setMainView('cloud_architecture')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                mainView === 'cloud_architecture'
                  ? 'bg-[#00f0ff] text-[#00363a]'
                  : 'text-[#b9cacb] hover:text-[#dee3ea]'
              }`}
            >
              Cloud DB
            </button>
          </nav>

          {/* Right: Live Sync & User Avatar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('P2P Mesh cluster synchronized across 14 nodes.')}
              className="flex items-center gap-1.5 bg-[#171c21] hover:bg-[#252a30] px-3 py-1 rounded-full text-[#46e2f3] font-mono text-xs border border-white/5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] animate-pulse">
                wifi_tethering
              </span>
              <span className="font-bold tracking-wider">LIVE SYNC</span>
            </button>

            <button
              onClick={() => {
                setMainView('workspace');
                setActiveScreen('profile');
              }}
              className="w-8 h-8 rounded-full bg-[#00f0ff] text-[#00363a] flex items-center justify-center font-bold text-xs hover:scale-105 transition-transform cursor-pointer shadow-sm"
              title="Devin Cross (Self)"
            >
              DC
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="relative pt-20 px-4 sm:px-8 pb-16 flex-1 max-w-[1600px] w-full mx-auto">
          {/* VIEW MODE 1: APP SIMULATOR WORKSPACE */}
          {mainView === 'workspace' && (
            <div className="flex flex-col w-full">
              {/* Master Inspector Top Control Surface */}
              <div className="w-full flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-[#46e2f3] mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                    <span className="font-mono text-[10px] uppercase tracking-wider">
                      Android 14 Pixel 8 Pro Runtime
                    </span>
                    <span className="text-[#849495]">•</span>
                    <span className="font-mono text-[10px] text-[#00f0ff]">
                      ARM64 E2EE SANDBOX
                    </span>
                  </div>
                  <h1 className="font-headline text-2xl font-bold text-[#ebf8ff] tracking-tight">
                    KONANA Simulator Master
                  </h1>
                </div>

                {/* Quick Screen Pill Switcher */}
                <div className="flex flex-wrap items-center gap-1.5 bg-[#171c21] p-1.5 rounded-full border border-white/5 shadow-sm">
                  <button
                    onClick={() => setActiveScreen('splash')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeScreen === 'splash'
                        ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'text-[#b9cacb] hover:text-[#00f0ff]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                    <span>Splash & Auth</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('home')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeScreen === 'home'
                        ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'text-[#b9cacb] hover:text-[#00f0ff]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">dynamic_feed</span>
                    <span>Home Feed</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('chat')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeScreen === 'chat'
                        ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'text-[#b9cacb] hover:text-[#00f0ff]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">mark_chat_unread</span>
                    <span>Encrypted Chat</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('friends')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeScreen === 'friends'
                        ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'text-[#b9cacb] hover:text-[#00f0ff]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">group</span>
                    <span>Discovery</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('profile')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeScreen === 'profile'
                        ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'text-[#b9cacb] hover:text-[#00f0ff]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    <span>Vault & Profile</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen('diagnostics')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeScreen === 'diagnostics'
                        ? 'bg-[#00f0ff] text-[#00363a] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'text-[#b9cacb] hover:text-[#00f0ff]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">memory</span>
                    <span>Telemetry</span>
                  </button>
                </div>
              </div>

              {/* Master Stage Grid: Phone Canvas (Left) + Engineering Inspector (Right) */}
              <div className="grid grid-cols-1 2xl:grid-cols-12 gap-8 items-start">
                {/* Phone Handset Column */}
                <div className="2xl:col-span-6 flex flex-col items-center justify-center">
                  <PhoneSimulator
                    activeScreen={activeScreen}
                    onScreenChange={setActiveScreen}
                    onOpenViewer={openViewer}
                    onTriggerToast={showToast}
                    hapticTrigger={hapticCounter}
                  />
                </div>

                {/* Engineering Inspector Column */}
                <div className="2xl:col-span-6 flex flex-col space-y-4">
                  <InspectorPanel
                    activeScreen={activeScreen}
                    onScreenChange={setActiveScreen}
                    onTriggerHaptic={triggerHaptic}
                    onTriggerToast={showToast}
                    toastMessage={toastMessage}
                  />
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: DUAL RUNTIME DISCOVERY */}
          {mainView === 'dual_runtime' && (
            <DualRuntimeView
              onNavigateScreen={(screen) => {
                setMainView('workspace');
                setActiveScreen(screen);
              }}
              onTriggerToast={showToast}
            />
          )}

          {/* VIEW MODE 3: CLOUD DATABASE & SOCIAL GRAPH ARCHITECTURE */}
          {mainView === 'cloud_architecture' && (
            <CloudArchitectureView onTriggerToast={showToast} />
          )}

          {/* VIEW MODE 4: DEVICE ONLY CLEAN EXPERIENCE */}
          {mainView === 'device_only' && (
            <div className="flex flex-col items-center justify-center py-4">
              <PhoneSimulator
                activeScreen={activeScreen}
                onScreenChange={setActiveScreen}
                onOpenViewer={openViewer}
                onTriggerToast={showToast}
                hapticTrigger={hapticCounter}
              />
            </div>
          )}
        </main>
      </div>

      {/* Global Media Lightbox Viewer Modal */}
      <MediaViewerModal
        isOpen={viewerState.isOpen}
        onClose={closeViewer}
        mediaUrl={viewerState.url}
        title={viewerState.title}
        onTriggerToast={showToast}
      />

      {/* Global Fixed Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00f0ff] text-[#00363a] px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,240,255,0.4)] flex items-center gap-2.5 text-xs font-semibold animate-bounce-subtle">
          <span className="material-symbols-outlined text-[18px]">
            verified
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
