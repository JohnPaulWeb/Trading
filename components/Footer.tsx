'use client'

import React, { useState } from 'react'
import { TrendingUp, Terminal, ArrowUpRight, Send, Check } from 'lucide-react'
import { useToast } from './Toast'

export function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    toast('Subscribed to Vertex Quantitative Dispatch!')
    setEmail('')
  }

  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
      {/* Top Newsletter CTA Section */}
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 border-b border-white/10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-rose-300">
                QUANTITATIVE RESEARCH DISPATCH
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl">
              Stay ahead of the algorithmic market frontier.
            </h3>
            <p className="mt-2 text-xs text-white/55">
              Technical research on FPGA kernel bypass, market microstructure, order flow toxicity (VPIN), and statistical arbitrage.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md lg:ml-auto w-full">
            <input
              type="email"
              required
              placeholder="Enter fund email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-rose-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-rose-100 transition shadow flex items-center gap-1.5 shrink-0"
            >
              {subscribed ? <Check className="size-3.5 text-emerald-600" /> : <Send className="size-3.5" />}
              <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2 text-xl font-semibold tracking-[-0.06em] text-white sm:text-2xl">
              <div className="flex size-6 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-purple-600 text-white font-mono font-bold text-xs">
                V
              </div>
              <span>VERTEX</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300">MARKETS</span>
              <sup className="text-[8px] font-mono text-white/40">TM</sup>
            </a>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/50">
              Autonomous quantitative trading swarms and sub-microsecond execution infrastructure.
              Non-custodial, co-located in Equinix NY4, LD4, and CME Aurora with deterministic pre-trade risk controls.
            </p>

            {/* Live Status indicator */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/20 px-3 py-1 text-[11px] font-mono text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 140+ Venues Active · Tick Latency 11.4μs</span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/70">Trading Engine</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-white/50">
              <li><a href="#terminal" className="hover:text-white transition">Live Terminal</a></li>
              <li><a href="#strategies" className="hover:text-white transition">Statistical Arbitrage</a></li>
              <li><a href="#capabilities" className="hover:text-white transition">Market Making</a></li>
              <li><a href="#infra" className="hover:text-white transition">Equinix Co-Location</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Fee Schedule</a></li>
            </ul>
          </div>

          {/* Column 2: Developers */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/70">Quant &amp; APIs</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-white/50">
              <li><a href="#strategies" className="hover:text-white transition">Python Quant SDK</a></li>
              <li><a href="#strategies" className="hover:text-white transition">Rust HFT Engine</a></li>
              <li><a href="#strategies" className="hover:text-white transition">FIX 4.4 / 5.0 Protocol</a></li>
              <li><a href="#venues" className="hover:text-white transition">L2/L3 Tick Feeds</a></li>
              <li><a href="#infra" className="hover:text-white transition">Microwave Routes</a></li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/70">Compliance &amp; Custody</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-white/50">
              <li><a href="#security" className="hover:text-white transition">Non-Custodial Architecture</a></li>
              <li><a href="#security" className="hover:text-white transition">SEC Rule 15c3-5 Controls</a></li>
              <li><a href="#security" className="hover:text-white transition">Institutional DDQ</a></li>
              <li><a href="#security" className="hover:text-white transition">SOC 2 Type II Report</a></li>
              <li><a href="#security" className="hover:text-white transition">Regulatory Disclosures</a></li>
            </ul>
          </div>
        </div>

        {/* Regulatory Risk Disclaimer Banner */}
        <div className="mt-14 rounded-xl border border-white/5 bg-white/[0.015] p-4 text-[11px] leading-relaxed text-white/40">
          <strong className="text-white/60">Risk Warning:</strong> Trading in financial instruments, digital assets,
          futures, and leveraged derivatives carries a substantial degree of risk and is not suitable for all investors.
          Past backtested or simulated execution performance is no guarantee of future returns. Vertex provides non-custodial
          execution software and direct market access tools and does not act as an investment adviser or broker-dealer.
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© 2026 Vertex Markets Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#top" className="hover:text-white transition">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
