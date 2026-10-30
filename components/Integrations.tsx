'use client'

import React, { useState } from 'react'
import { Search, TrendingUp, Layers, ArrowUpRight, Zap, Globe, Cpu } from 'lucide-react'

interface Venue {
  name: string
  category: 'crypto' | 'equities' | 'fx' | 'data'
  desc: string
  protocol: 'FIX 4.4 / 5.0' | 'Binary WebSocket' | 'OUCH / ITCH' | 'Direct REST DMA'
  latency: string
}

const venues: Venue[] = [
  { name: 'Binance Institutional', category: 'crypto', desc: 'Direct VIP 9 WebSocket and REST DMA with negative maker rebates.', protocol: 'Binary WebSocket', latency: '<8μs' },
  { name: 'Coinbase Prime', category: 'crypto', desc: 'Institutional custody cold-storage cross-connected with direct order routing.', protocol: 'FIX 4.4 / 5.0', latency: '<12μs' },
  { name: 'CME Group Globex', category: 'equities', desc: 'Direct iLink3 binary protocol connection in Aurora for BTC, ES, NQ futures.', protocol: 'FIX 4.4 / 5.0', latency: '<14μs' },
  { name: 'Nasdaq & INET', category: 'equities', desc: 'Ultra-fast direct OUCH order entry and ITCH 5.0 total view market data feed.', protocol: 'OUCH / ITCH', latency: '<9μs' },
  { name: 'OKX Institutional', category: 'crypto', desc: 'Co-located trading gateway for inverse and linear perpetual contracts.', protocol: 'Binary WebSocket', latency: '<7μs' },
  { name: 'Deribit Options Core', category: 'crypto', desc: 'Co-located WebSocket engine for institutional crypto options and volatility smiles.', protocol: 'Binary WebSocket', latency: '<6μs' },
  { name: 'Hyperliquid L1', category: 'crypto', desc: 'HyperBFT consensus high-throughput decentralized order book with native settlement.', protocol: 'Direct REST DMA', latency: '<4μs' },
  { name: 'Bybit Institutional', category: 'crypto', desc: 'High-frequency order entry with sub-second portfolio margin risk offsets.', protocol: 'Binary WebSocket', latency: '<8μs' },
  { name: 'NYSE Arca & Pillar', category: 'equities', desc: 'Direct binary protocol routing for institutional equity ETF and stock execution.', protocol: 'OUCH / ITCH', latency: '<11μs' },
  { name: 'Cboe EDGX / BATS', category: 'equities', desc: 'PITCH tick protocol with inverted rebate liquidity capture schedules.', protocol: 'OUCH / ITCH', latency: '<10μs' },
  { name: 'Bloomberg B-PIPE', category: 'data', desc: 'Enterprise tick feed consolidated across 350+ global exchanges and OTC desks.', protocol: 'FIX 4.4 / 5.0', latency: '<15μs' },
  { name: 'Interactive Brokers CTCI', category: 'fx', desc: 'Global multi-asset institutional FIX gateway covering 150+ worldwide markets.', protocol: 'FIX 4.4 / 5.0', latency: '<18μs' },
]

export function Integrations() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'crypto' | 'equities' | 'fx' | 'data'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = venues.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <section id="venues" className="border-b border-white/10 bg-[#060606] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="section-kicker">04 / Venues</span>
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-mono text-rose-300">
                LIQUIDITY MESH
              </span>
            </div>
            <h2 className="mt-5 text-4xl font-medium tracking-[-0.06em] text-white sm:text-6xl">
              Connect to 140+ global venues.
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/60">
              One normalized API and FIX session connects your algorithms to every major crypto exchange, futures clearinghouse, and dark pool.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search exchange or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-white/40 focus:border-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-400"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All 140+ Venues' },
            { id: 'crypto', label: 'Crypto Spot & Perps' },
            { id: 'equities', label: 'Equities & Futures' },
            { id: 'fx', label: 'FX & OTC Desks' },
            { id: 'data', label: 'Market Data Feeds' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`rounded-xl px-4 py-2 text-xs font-medium transition ${
                selectedCategory === cat.id
                  ? 'border border-rose-300/40 bg-white/15 text-white shadow'
                  : 'border border-white/10 bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Venues Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <div
              key={item.name}
              className="group rounded-xl border border-white/10 bg-[#0a0a0d] p-5 transition-all duration-200 hover:border-white/25 hover:bg-[#111116]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-rose-300">
                  {item.protocol}
                </span>
                <span className="font-mono text-[11px] text-emerald-400">{item.latency}</span>
              </div>

              <h4 className="mt-4 text-base font-medium text-white group-hover:text-rose-200 transition-colors">
                {item.name}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Custom Venue Callout */}
        <div className="mt-12 flex flex-col justify-between gap-4 rounded-2xl border border-white/15 bg-gradient-to-r from-white/[0.04] to-rose-950/20 p-6 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-sm font-medium text-white">Need a private dark pool cross-connect or bespoke OTC desk integration?</h4>
            <p className="mt-1 text-xs text-white/55">
              Vertex engineers deploy dedicated 10Gbps optical fiber patches to any proprietary liquidity provider in under 48 hours.
            </p>
          </div>
          <a
            href="#pricing"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/20 transition whitespace-nowrap"
          >
            <span>Request Cross-Connect</span>
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
