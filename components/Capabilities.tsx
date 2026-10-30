'use client'

import React, { useState } from 'react'
import {
  Globe,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  TrendingUp,
  BarChart3,
  Server,
  Lock,
  GitBranch
} from 'lucide-react'

const capabilities = [
  {
    number: '01',
    title: 'Sub-Microsecond Co-Location & DMA',
    copy: 'Bare-metal FPGA execution servers cross-connected directly inside Equinix NY4 (Secaucus), LD4 (London), and CME Aurora with zero hypervisor virtualization jitter.',
    badge: '11.4μs Tick-to-Trade',
    icon: Zap,
    stats: '<8μs internal wire latency',
    features: ['Direct Market Access (DMA)', 'Solarflare Onload Bypass', 'Dedicated 10G Cross-Connects'],
  },
  {
    number: '02',
    title: 'Unified Smart Order Routing (SOR)',
    copy: 'Aggregate fragmented liquidity across 140+ crypto exchanges, futures venues, and dark pools into a single virtual order book with automated slippage minimization.',
    badge: '140+ Liquidity Venues',
    icon: Layers,
    stats: 'Zero adverse selection',
    features: ['Virtual order book (VOB)', 'Atomic multi-leg routing', 'Dark pool internalization'],
  },
  {
    number: '03',
    title: 'Deterministic Pre-Trade Risk Engine',
    copy: 'Sub-40 nanosecond hardware-accelerated risk checks enforcing SEC Rule 15c3-5, maximum drawdown circuit breakers, and automated inventory delta caps.',
    badge: 'SEC Rule 15c3-5 Attested',
    icon: ShieldCheck,
    stats: '40ns verification latency',
    features: ['FAT-finger quantity locks', 'Max drawdown circuit cap', 'Real-time VaR limits'],
  },
  {
    number: '04',
    title: 'Autonomous Quantitative ML Swarms',
    copy: 'Deploy self-adaptive execution swarms utilizing reinforcement learning models (TWAP, VWAP, POV, Implementation Shortfall) to optimize fill rates.',
    badge: 'Reinforcement Learning',
    icon: Cpu,
    stats: '84% slippage reduction',
    features: ['Adaptive queue position', 'Dynamic spread capture', 'Micro-price forecasting'],
  },
]

export function Capabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="capabilities" className="border-y border-white/10 bg-[#080808] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Header grid */}
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <div className="flex items-center gap-2">
              <span className="section-kicker">01 / Capabilities</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white/70">
                ARCHITECTURE
              </span>
            </div>
            <h2 className="mt-6 max-w-lg text-4xl font-medium leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl">
              The operating system for institutional trading.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/60">
              From backtesting statistical arbitrage to deploying millions in high-frequency liquidity provision,
              Vertex gives quantitative funds and prop desks the ultra-low latency infrastructure to outperform.
            </p>

            {/* Quick architectural highlight pill */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-rose-300" />
                <span className="text-sm font-medium text-white">Non-Custodial Multi-Party Computation</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/50">
                Vertex never holds your capital or private withdrawal keys. All venue connectivity uses restricted
                Read &amp; Trade API permissions with strict IP whitelisting.
              </p>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 sm:grid-cols-2">
            {capabilities.map((item, index) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative flex flex-col justify-between bg-[#080808] p-7 transition-all duration-300 hover:bg-[#101014] sm:p-9"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-rose-300/80">{item.number}</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono text-white/60">
                        {item.badge}
                      </span>
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white group-hover:border-rose-300/40 group-hover:text-rose-300 transition-colors">
                        <Icon className="size-4" />
                      </div>
                      <span className="font-mono text-xs text-emerald-400">{item.stats}</span>
                    </div>

                    <h3 className="mt-4 text-xl font-medium tracking-[-0.03em] text-white group-hover:text-rose-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/55">{item.copy}</p>

                    {/* Features list */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.features.map((feat) => (
                        <span
                          key={feat}
                          className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-[11px] font-mono text-white/50"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs font-mono text-white/40">EXPLORE SPEC</span>
                    <span className="block text-xl text-white/35 transition group-hover:translate-x-1 group-hover:text-rose-200">
                      ↗
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
