import React, { useState } from 'react';

interface CloudArchitectureViewProps {
  onTriggerToast: (msg: string) => void;
}

export const CloudArchitectureView: React.FC<CloudArchitectureViewProps> = ({
  onTriggerToast,
}) => {
  const [showDdlModal, setShowDdlModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleSQL = `-- KONANA SOCIAL GRAPH & ENCRYPTED MESH DDL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(32) UNIQUE NOT NULL,
  public_key TEXT NOT NULL,
  last_synced_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE relationship_state_enum AS ENUM ('pending', 'active', 'muted');

CREATE TABLE friends_relationships (
  requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
  addressee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  relationship_state relationship_state_enum DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (requester_id, addressee_id)
);

CREATE TYPE delivery_state_enum AS ENUM ('sent', 'delivered', 'read');

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  encrypted_payload BYTEA NOT NULL,
  delivery_state delivery_state_enum DEFAULT 'sent',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE media_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id),
  ipfs_cid VARCHAR(64) NOT NULL,
  dimensions VARCHAR(16) NOT NULL,
  compression_profile VARCHAR(32) DEFAULT 'avif_high',
  likes_count INT DEFAULT 0,
  ttl_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID REFERENCES users(id),
  event_type VARCHAR(32) NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;

  const handleCopySQL = () => {
    navigator.clipboard?.writeText(sampleSQL);
    setCopiedCode(true);
    onTriggerToast('PostgreSQL DDL copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Overview Header */}
      <div className="rounded-3xl bg-[#171c21] p-6 border border-white/[0.05] shadow-lg space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#00f0ff]/15 text-[#00f0ff] font-mono text-xs uppercase font-bold tracking-widest border border-[#00f0ff]/20">
              PostgreSQL & Distributed S3 Engine
            </span>
            <span className="font-mono text-xs text-[#46e2f3]">v4.1.0-PROD</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="text-xs text-[#b9cacb] font-mono">
              Cloud Cluster Online
            </span>
          </div>
        </div>

        <h2 className="font-headline text-2xl font-bold text-[#dbfcff] tracking-tight">
          Cloud Database & Social Graph Architecture
        </h2>

        <p className="text-xs text-[#b9cacb] leading-relaxed max-w-4xl">
          Production schema definition mapped directly to the KONANA mobile home simulator. Features multi-tenant row-level cryptographic isolation, zero-knowledge metadata envelopes, and optimistic replication pipelines.
        </p>

        {/* Live Telemetry KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-[#1b2025] border border-white/5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#849495]">
              QPS Target
            </span>
            <div className="font-headline text-xl font-bold text-[#ebf8ff] mt-0.5">
              48.2k
            </div>
            <span className="text-[10px] text-[#46e2f3] font-mono">
              ↑ 12% global spike
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1b2025] border border-white/5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#849495]">
              E2EE Latency
            </span>
            <div className="font-headline text-xl font-bold text-[#00f0ff] mt-0.5">
              18ms
            </div>
            <span className="text-[10px] text-[#46e2f3] font-mono">
              Signal Protocol Double-Ratchet
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1b2025] border border-white/5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#849495]">
              Active Feeds
            </span>
            <div className="font-headline text-xl font-bold text-[#ebf8ff] mt-0.5">
              1.84M
            </div>
            <span className="text-[10px] text-[#dbfcff] font-mono">
              In-memory Redis stream
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1b2025] border border-white/5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#849495]">
              Replication
            </span>
            <div className="font-headline text-xl font-bold text-[#46e2f3] mt-0.5">
              99.99%
            </div>
            <span className="text-[10px] text-[#849495] font-mono">
              Geo-replicated 4 zones
            </span>
          </div>
        </div>
      </div>

      {/* Relational Schemas Explorer */}
      <div className="rounded-3xl bg-[#171c21] p-6 border border-white/[0.05] shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[22px]">
              database
            </span>
            <h3 className="font-headline text-lg font-bold text-[#ebf8ff]">
              Relational Schemas Ready for Integration
            </h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#252a30] text-[#00f0ff] font-mono font-bold border border-[#00f0ff]/20">
            5 CORE TABLES
          </span>
        </div>

        {/* Table 1: USERS */}
        <div className="rounded-2xl bg-[#1b2025] p-4 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
              <span className="font-mono text-sm font-bold text-[#ebf8ff]">
                1. users
              </span>
              <span className="text-[10px] text-[#849495] px-2 py-0.5 rounded bg-[#252a30] font-mono">
                Identity & Auth
              </span>
            </div>
            <span className="font-mono text-xs text-[#46e2f3]">uuid-v7 PK</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-[#849495] text-[10px] uppercase tracking-wider border-b border-white/5">
                  <th className="py-1.5">Column</th>
                  <th className="py-1.5">Type</th>
                  <th className="py-1.5">Attributes</th>
                  <th className="py-1.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#b9cacb]">
                <tr>
                  <td className="py-1.5 text-[#00f0ff]">id</td>
                  <td>UUID</td>
                  <td className="text-[#46e2f3]">PRIMARY KEY</td>
                  <td className="text-[#849495] font-sans">Unique user obsidian credential</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-[#00f0ff]">username</td>
                  <td>VARCHAR(32)</td>
                  <td className="text-[#ebf8ff]">UNIQUE, INDEX</td>
                  <td className="text-[#849495] font-sans">Handle (e.g. @v.sol)</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-[#00f0ff]">public_key</td>
                  <td>TEXT</td>
                  <td>NOT NULL</td>
                  <td className="text-[#849495] font-sans">Ed25519 signing public key</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-[#00f0ff]">last_synced_at</td>
                  <td>TIMESTAMPTZ</td>
                  <td>DEFAULT NOW()</td>
                  <td className="text-[#849495] font-sans">Cloud heartbeat timestamp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: FRIENDS & RELATIONSHIPS */}
        <div className="rounded-2xl bg-[#1b2025] p-4 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#46e2f3]" />
              <span className="font-mono text-sm font-bold text-[#ebf8ff]">
                2. friends & relationships
              </span>
              <span className="text-[10px] text-[#849495] px-2 py-0.5 rounded bg-[#252a30] font-mono">
                Social Graph
              </span>
            </div>
            <span className="font-mono text-xs text-[#46e2f3]">composite PK</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-[#849495] text-[10px] uppercase tracking-wider border-b border-white/5">
                  <th className="py-1.5">Column</th>
                  <th className="py-1.5">Type</th>
                  <th className="py-1.5">Attributes</th>
                  <th className="py-1.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#b9cacb]">
                <tr>
                  <td className="py-1.5 text-[#00f0ff]">requester_id</td>
                  <td>UUID</td>
                  <td className="text-[#46e2f3]">FK -&gt; users.id</td>
                  <td className="text-[#849495] font-sans">Originating friend connection</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-[#00f0ff]">addressee_id</td>
                  <td>UUID</td>
                  <td className="text-[#46e2f3]">FK -&gt; users.id</td>
                  <td className="text-[#849495] font-sans">Target suggested user</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-[#00f0ff]">relationship_state</td>
                  <td>ENUM</td>
                  <td>'pending','active','muted'</td>
                  <td className="text-[#849495] font-sans">Suggested friends status lifecycle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 3: MESSAGES (E2EE) */}
        <div className="rounded-2xl bg-[#1b2025] p-4 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
              <span className="font-mono text-sm font-bold text-[#ebf8ff]">
                3. messages (E2EE)
              </span>
              <span className="text-[10px] text-[#849495] px-2 py-0.5 rounded bg-[#252a30] font-mono">
                Zero-Knowledge Queue
              </span>
            </div>
            <span className="font-mono text-xs text-[#46e2f3]">partitioned</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-[#849495] text-[10px] uppercase tracking-wider border-b border-white/5">
                  <th className="py-1.5">Column</th>
                  <th className="py-1.5">Type</th>
                  <th className="py-1.5">Attributes</th>
                  <th className="py-1.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#b9cacb]">
                <tr>
                  <td className="py-1.5 text-[#00f0ff]">id</td>
                  <td>UUID</td>
                  <td className="text-[#46e2f3]">PK</td>
                  <td className="text-[#849495] font-sans">Global chat identifier</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-[#00f0ff]">encrypted_payload</td>
                  <td>BYTEA</td>
                  <td>NOT NULL</td>
                  <td className="text-[#849495] font-sans">Opaque AES-GCM ciphertext payload</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-[#00f0ff]">delivery_state</td>
                  <td>ENUM</td>
                  <td>'sent','delivered','read'</td>
                  <td className="text-[#849495] font-sans">Powers double cyan checkmarks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 4 & 5 summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#1b2025] p-4 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#46e2f3]" />
                <span className="font-mono text-sm font-bold text-[#ebf8ff]">
                  4. media_posts & moments
                </span>
              </div>
              <span className="font-mono text-xs text-[#46e2f3]">indexed S3 refs</span>
            </div>
            <p className="text-xs text-[#b9cacb] leading-relaxed">
              Stores feed moments with IPFS hash <code className="text-[#00f0ff] font-mono">ipfs_cid</code>, dimensions, compression profile, like tally counters, and expiration TTL for 24h stories.
            </p>
          </div>

          <div className="rounded-2xl bg-[#1b2025] p-4 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#849495]" />
                <span className="font-mono text-sm font-bold text-[#ebf8ff]">
                  5. notifications
                </span>
              </div>
              <span className="font-mono text-xs text-[#46e2f3]">queue</span>
            </div>
            <p className="text-xs text-[#b9cacb] leading-relaxed">
              Handles low-latency alert dispatches for new moments, unread mentions, and encrypted session key challenges.
            </p>
          </div>
        </div>
      </div>

      {/* CLI Schema Synchronizer */}
      <div className="rounded-3xl bg-[#252a30] p-5 border border-white/5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1b2025] flex items-center justify-center text-[#00f0ff]">
            <span className="material-symbols-outlined text-[24px]">terminal</span>
          </div>
          <div>
            <h4 className="font-headline text-sm font-bold text-[#ebf8ff]">
              CLI Schema Synchronizer
            </h4>
            <p className="text-xs text-[#849495]">
              Generate TypeScript DTO types from database engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDdlModal(true)}
            className="px-4 py-2 rounded-xl bg-[#1b2025] hover:bg-[#171c21] text-[#dee3ea] text-xs font-semibold transition-colors cursor-pointer border border-white/5"
          >
            View SQL DDL
          </button>
          <button
            onClick={handleCopySQL}
            className="px-4 py-2 rounded-xl bg-[#00f0ff] hover:bg-[#00c6d7] text-[#00363a] text-xs font-bold transition-colors cursor-pointer shadow-md"
          >
            {copiedCode ? 'Copied!' : 'Export SQL DDL'}
          </button>
          <button
            onClick={() => onTriggerToast('Cluster migration script deployed to staging replicas.')}
            className="px-4 py-2 rounded-xl bg-[#46e2f3] hover:bg-[#8df2ff] text-[#00363c] text-xs font-bold transition-colors cursor-pointer shadow-md"
          >
            Deploy to Supabase / AWS
          </button>
        </div>
      </div>

      {/* SQL DDL Modal */}
      {showDdlModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171c21] border border-[#00f0ff]/30 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff]">code</span>
                <h4 className="font-headline text-sm font-bold text-[#ebf8ff]">
                  PostgreSQL DDL (v4.1.0-PROD)
                </h4>
              </div>
              <button
                onClick={() => setShowDdlModal(false)}
                className="w-7 h-7 rounded-full bg-[#252a30] hover:bg-[#30353b] text-[#dee3ea] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <pre className="flex-1 overflow-y-auto bg-[#0a0f14] p-4 rounded-xl font-mono text-[11px] text-[#46e2f3] leading-relaxed border border-white/5">
              {sampleSQL}
            </pre>
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={handleCopySQL}
                className="px-4 py-2 rounded-xl bg-[#00f0ff] text-[#00363a] font-bold text-xs cursor-pointer"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setShowDdlModal(false)}
                className="px-4 py-2 rounded-xl bg-[#252a30] text-[#dee3ea] text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
