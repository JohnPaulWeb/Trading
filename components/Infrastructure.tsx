'use client'

import React, { useState } from 'react'
import { Server, Globe, Cpu, Zap, Activity, HardDrive, RefreshCw, ShieldCheck } from 'lucide-react'

const financialHubs = [
  { code: 'NY4', name: 'Equinix NY4 (Secaucus, NJ)', venue: 'CME, Nasdaq, NYSE Arca, BATS', latency: '0.14ms', status: 'optimal', load: '38%' },
  { code: 'AUR', name: 'CME Aurora (Chicago, IL)', venue: 'CME Globex, Rates & Commodity Futures', latency: '0.18ms', status: 'optimal', load: '44%' },
  { code: 'LD4', name: 'Equinix LD4 (Slough, UK)', venue: 'LSE, Euronext, FX Spot ECNs, Deribit', latency: '0.22ms', status: 'optimal', load: '51%' },
  { code: 'TY3', name: 'Equinix TY3 (Tokyo, JP)', venue: 'JPX, Asia-Pacific Crypto & Futures', latency: '0.28ms', status: 'optimal', load: '32%' },
  { code: 'SG1', name: 'Equinix SG1 (Singapore)', venue: 'Southeast Asian Institutional Liquidity', latency: '0.24ms', status: 'optimal', load: '39%' },
  { code: 'SIX', name: 'Zurich SIX (Switzerland)', venue: 'European Equities & Structured Derivatives', latency: '0.31ms', status: 'optimal', load: '29%' },
]

export function Infrastructure() {
  const [pinging, setPinging] = useState(false)
  const [lastPing, setLastPing] = useState('Just now')

  const handlePing = () => {
    setPinging(true)
    setTimeout(() => {
      setPinging(false)
      setLastPing('Just now')
    }, 700)
  }

  return (
    <section id="infra" className="relative border-b border-white/10 bg-[#080808] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="section-kicker">03 / Co-Location</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                DIRECT MARKET ACCESS
              </span>
            </div>
            <h2 className="mt-5 text-4xl font-medium tracking-[-0.06em] text-white sm:text-6xl">
              Co-located inside the world's financial hubs.
            </h2>
            <p className="mt-5 max-w-2xl text-base text-white/60">
              Generic cloud VMs introduce unpredictable latency spikes that destroy alpha. Vertex maintains bare-metal,
              FPGA-accelerated servers directly cross-connected inside Tier-1 financial exchange matching engines.
            </p>
          </div>

          <button
            onClick={handlePing}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-mono text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white transition w-fit"
          >
            <RefreshCw className={`size-3.5 text-emerald-400 ${pinging ? 'animate-spin' : ''}`} />
            <span>Ping Exchange Gateways</span>
          </button>
        </div>

        {/* Global Financial Hubs Real-time Latency Grid */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0d] shadow-2xl">
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#0e0e12] px-6 py-4">
            <div className="flex items-center gap-3">
              <Server className="size-4 text-rose-300" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
                Tier-1 Exchange Cross-Connects &amp; Microwave Links
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dedicated 10Gbps Fiber · Last Ping: {lastPing}</span>
            </div>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {financialHubs.map((hub) => (
              <div key={hub.code} className="bg-[#0a0a0d] p-5 hover:bg-[#121217] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-rose-300/80 font-bold">{hub.code}</span>
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    {hub.latency}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-medium text-white">{hub.name}</h4>
                <p className="mt-1 text-xs text-white/50">{hub.venue}</p>
                <div className="mt-4 flex items-center justify-between text-xs font-mono text-white/40 border-t border-white/5 pt-3">
                  <span>Switch Load: {hub.load}</span>
                  <span className="text-white/60">Status: {hub.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Architectural Hardware Pillar Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition">
            <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-rose-300">
              <Zap className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-white">Solarflare Kernel Bypass</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/55">
              OpenOnload network drivers bypass the Linux operating system kernel entirely, delivering tick packets directly into user memory in nanoseconds.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition">
            <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-purple-300">
              <Cpu className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-white">Xilinx FPGA Parsing</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/55">
              Hardware-accelerated ITCH/OUCH market data decoders parse multi-venue L3 order books directly in silicon with zero CPU bottleneck.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition">
            <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-300">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-white">Hardware Risk Gates</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/55">
              Pre-trade checks run on dedicated in-line FPGA circuits in &lt;40 nanoseconds, blocking rogue fat-finger orders before they reach venue fibers.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition">
            <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-emerald-300">
              <Activity className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-white">Microwave Route Hedging</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/55">
              Ultra-low latency Chicago-to-New York wireless microwave connections deliver 4.1ms latency for S&amp;P 500 futures to cash equity arbitrage.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
