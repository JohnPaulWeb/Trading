'use client'

import React, { useState } from 'react'
import { ArrowUpRight, Copy, Check, TrendingUp, Terminal, Activity, Zap, Play } from 'lucide-react'
import { useToast } from './Toast'

interface HeroProps {
  onOpenDeploy: () => void
}

const stats = [
  { value: '<12μs', label: 'tick-to-trade latency', sub: 'FPGA kernel bypass in NY4 & LD4' },
  { value: '$4.8B+', label: '24h executed volume', sub: 'across 140+ global liquidity pools' },
  { value: '99.999%', label: 'gateway uptime', sub: 'multi-datacenter BGP redundant failover' },
  { value: '0.00%', label: 'adverse selection slippage', sub: 'atomic multi-leg smart order routing' },
]

export function Hero({ onOpenDeploy }: HeroProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const installCmd = 'pip install vertex-trade-sdk'

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd)
    setCopied(true)
    toast('Command copied to clipboard!')
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section className="hero-shell relative isolate min-h-screen pt-32 pb-16">
      {/* Background art layers */}
      <div
        aria-hidden="true"
        className="hero-art"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-45zI4TBcUQmlpcbWj2Wa13zPWRh4ZF.png')",
        }}
      />
      <div aria-hidden="true" className="hero-grid" />
      <div aria-hidden="true" className="hero-glow hero-glow-one" />
      <div aria-hidden="true" className="hero-glow hero-glow-two" />

      <div
        id="top"
        className="relative z-10 mx-auto flex min-h-[calc(100vh-140px)] w-full max-w-[1440px] flex-col justify-between px-6 pt-10 lg:px-12 lg:pt-14"
      >
        <div className="max-w-4xl">
          {/* Release / Announcement badge */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-rose-950/40 px-3.5 py-1 text-xs font-mono text-rose-200 backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
              <span className="font-semibold uppercase tracking-wider">VERTEX V3.2 CORE</span>
              <span className="text-white/40">·</span>
              <span className="text-white/80">Sub-Microsecond Direct Market Access</span>
            </div>

            {/* Quick copy command */}
            <button
              onClick={handleCopy}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 font-mono text-xs text-white/75 backdrop-blur-md transition hover:border-white/40 hover:bg-white/10 hover:text-white"
              title="Click to copy Python SDK install"
            >
              <Terminal className="size-3 text-rose-300" />
              <span>{installCmd}</span>
              {copied ? (
                <Check className="size-3 text-emerald-400" />
              ) : (
                <Copy className="size-3 text-white/40 transition group-hover:text-white" />
              )}
            </button>
          </div>

          {/* Micro tag line */}
          <div className="mb-6 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="h-px w-8 bg-rose-400" />
            Autonomous Quantitative Intelligence & High-Frequency Execution
          </div>

          {/* Main Hero Headline */}
          <h1 className="max-w-4xl text-[clamp(3.2rem,7.5vw,7.8rem)] font-medium leading-[0.92] tracking-[-0.075em] text-balance">
            Execution that moves at the{' '}
            <span className="bg-gradient-to-r from-white via-rose-100 to-rose-300 bg-clip-text text-transparent">
              speed of the market.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            Deploy autonomous quantitative trading swarms, smart order routing algorithms, and deterministic pre-trade risk
            guardrails across global crypto exchanges, dark pools, and futures venues. Sub-microsecond tick-to-trade with zero slippage.
          </p>

          {/* CTA Button Group */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenDeploy}
              className="group relative inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-rose-100 hover:shadow-[0_0_28px_rgba(255,200,215,0.4)]"
            >
              <span>Deploy Strategy</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="#terminal"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/10"
            >
              <Play className="size-3.5 fill-rose-300 text-rose-300" />
              <span>Open Live Terminal</span>
            </a>

            <a
              href="#venues"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition"
            >
              <span>Explore 140+ Venues</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Live Trading Execution Heartbeat */}
          <div className="mt-8 flex items-center gap-3 text-xs font-mono text-white/50">
            <Activity className="size-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">
              Equinix NY4: <span className="text-emerald-300">Fill 12.4 BTC @ $98,421.10</span> · CME Aurora: ES Spread Arb{' '}
              <span className="text-white font-medium">+$1,420.50</span> · Zero Dropped Ticks
            </span>
          </div>
        </div>

        {/* Global Telemetry Metrics Grid */}
        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4 sm:gap-8">
          {stats.map((item) => (
            <div key={item.label} className="group">
              <p className="text-3xl font-medium tracking-[-0.06em] text-white sm:text-4xl lg:text-5xl group-hover:text-rose-200 transition-colors">
                {item.value}
              </p>
              <p className="mt-1.5 text-xs font-medium text-white/70 uppercase tracking-wider font-mono">{item.label}</p>
              <p className="text-[11px] text-white/40">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
