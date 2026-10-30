'use client'

import React, { useState } from 'react'
import { Check, Sparkles, ArrowUpRight } from 'lucide-react'

interface PricingProps {
  onOpenDeploy: () => void
}

export function Pricing({ onOpenDeploy }: PricingProps) {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="relative border-b border-white/10 bg-[#060606] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/70">
            <Sparkles className="size-3 text-rose-300" />
            <span>TRANSPARENT FEE SCHEDULE</span>
          </div>
          <h2 className="mt-5 text-4xl font-medium tracking-[-0.06em] text-white sm:text-5xl">
            Institutional fee economics that scale with volume.
          </h2>
          <p className="mt-4 text-base text-white/60">
            Zero spread markups, zero hidden execution fees. Capture negative maker rebates when providing passive liquidity.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                !annual ? 'bg-white text-black shadow' : 'text-white/60 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition ${
                annual ? 'bg-white text-black shadow' : 'text-white/60 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-rose-500/20 px-2 py-0.2 text-[10px] font-mono font-semibold text-rose-400">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Trader Tier */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0a0d] p-8 transition hover:border-white/20">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-white/50">Quantitative Trader</span>
              <h3 className="mt-2 text-2xl font-medium text-white">Free Access</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/50">
                Ideal for independent researchers and algorithmic traders developing alpha strategies and paper testing.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-medium tracking-tight text-white">$0</span>
                <span className="text-xs text-white/40">/ month</span>
              </div>
              <p className="mt-1 text-xs font-mono text-emerald-400">+ 0.02% Taker Fee / 0.00% Maker</p>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {[
                  '5 concurrent live strategies',
                  'Unlimited tick-level backtesting',
                  'WebSocket & REST DMA market streams',
                  'Pre-trade fat-finger risk locks',
                  'Discord quant community support',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-xs text-white/70">
                    <Check className="size-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenDeploy}
              className="mt-8 w-full rounded-xl border border-white/20 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition"
            >
              Start Paper Trading
            </button>
          </div>

          {/* Prop Desk Tier (Highlighted) */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-rose-400/60 bg-gradient-to-b from-[#140e14] to-[#0a0a0d] p-8 shadow-[0_0_35px_rgba(255,100,140,0.12)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-rose-400/40 bg-rose-500 px-3 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-black">
              Most Popular
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-rose-300">Prop Desk / Fund</span>
              <h3 className="mt-2 text-2xl font-medium text-white">Co-Located DMA</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/50">
                For quantitative hedge funds, proprietary desks, and market makers requiring sub-microsecond fills.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-medium tracking-tight text-white">
                  ${annual ? '399' : '499'}
                </span>
                <span className="text-xs text-white/40">/ month</span>
              </div>
              <p className="mt-1 text-xs font-mono text-emerald-400">+ 0.008% Taker / -0.001% Maker Rebate</p>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {[
                  'Dedicated bare-metal server in Equinix NY4',
                  '100 concurrent algorithmic swarms',
                  'Direct FIX 4.4 / 5.0 gateway session',
                  'Solarflare kernel bypass (<12μs latency)',
                  'Hardware pre-trade risk engine (Rule 15c3-5)',
                  'Sub-account multi-trader RBAC',
                  '24/7 dedicated execution desk hotline',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-xs text-white/80">
                    <Check className="size-3.5 text-rose-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenDeploy}
              className="mt-8 w-full rounded-xl bg-white py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-rose-100 transition shadow-lg"
            >
              Launch Co-Located Desk
            </button>
          </div>

          {/* Institutional Tier */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0a0d] p-8 transition hover:border-white/20">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-white/50">Prime Brokerage</span>
              <h3 className="mt-2 text-2xl font-medium text-white">Institutional Prime</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/50">
                Bespoke dark pool routing, negative maker rebates, and dedicated optical fiber cross-connects.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-medium tracking-tight text-white">Custom</span>
              </div>
              <p className="mt-1 text-xs font-mono text-emerald-400">-0.002% Maker Rebate (We pay you to quote)</p>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {[
                  'Unlimited algorithmic execution swarms',
                  'Dedicated 10Gbps cross-connect in NY4, LD4, TY3',
                  'Bespoke Fireblocks / Anchorage MPC custody',
                  'Custom FPGA firmware & tick parsing logic',
                  'Zero custodial risk (Read & Trade API keys)',
                  'Dedicated quantitative solution architect',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-xs text-white/70">
                    <Check className="size-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenDeploy}
              className="mt-8 w-full rounded-xl border border-white/20 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition"
            >
              Contact Prime Desk
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
