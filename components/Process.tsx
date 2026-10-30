'use client'

import React, { useState } from 'react'
import { Sparkles, GitBranch, Shield, Gauge, Check, ArrowRight, TrendingUp } from 'lucide-react'

const steps = [
  {
    step: 'STEP 01',
    title: 'Research & Backtest',
    subtitle: 'Tick-level historical replay across 15 years of full L3 depth data.',
    desc: 'Simulate quantitative alpha models against nanosecond-timestamped order books. Accurate queue position simulation, exchange maker/taker fee tiers, and real-world market impact modeling.',
    icon: Sparkles,
    metrics: '15B+ historical ticks replayed',
    features: ['L3 book reconstruction', 'Queue priority modeling', 'Slippage simulation'],
    example: 'backtest.run({ dataset: "cme_btc_l3", feeTier: "maker_vip", queueModel: "fifo" })',
  },
  {
    step: 'STEP 02',
    title: 'Staging Sandbox',
    subtitle: 'Paper trade live order flow with simulated matching engines.',
    desc: 'Connect your strategy to live venue WebSockets and FIX feeds with zero real capital exposure. Validate execution latency, fill probabilities, and model calibration under actual market conditions.',
    icon: GitBranch,
    metrics: '0ms latency discrepancy',
    features: ['Synthetic matching engine', 'Real-time order book feed', 'Zero capital risk'],
    example: 'Strategy.deploy({ mode: "paper_sandbox", venue: "binance_vip", maxQty: 10.0 })',
  },
  {
    step: 'STEP 03',
    title: 'Risk Attestation',
    subtitle: 'Compile deterministic hardware pre-trade circuit breakers.',
    desc: 'Before any order reaches an external venue, the Vertex compiler embeds hard pre-trade risk checks: fat-finger bounds, maximum drawdown caps, rate limits, and regulatory Rule 15c3-5 attestation.',
    icon: Shield,
    metrics: '40ns hardware risk check',
    features: ['SEC Rule 15c3-5 compliant', 'FAT-finger quantity bounds', 'Max drawdown circuit cap'],
    example: 'RiskEngine.attest({ maxDrawdown: "1.5%", maxNotionalPerSec: "$2.5M" })',
  },
  {
    step: 'STEP 04',
    title: 'Live DMA Execution',
    subtitle: 'Co-located sub-microsecond fills with post-trade TCA.',
    desc: 'Deploy binary execution loops to bare-metal servers in Equinix NY4 and LD4. Real-time Transaction Cost Analysis (TCA) monitors adverse selection, queue priority, and implementation shortfall.',
    icon: Gauge,
    metrics: '<12μs tick-to-trade',
    features: ['Kernel bypass DMA', 'Real-time TCA analysis', 'Automated delta rebalancing'],
    example: 'Vertex.execute({ dmaVenue: "equinix_ny4", smartOrderRouter: true })',
  },
]

export function Process() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="execution" className="relative overflow-hidden border-b border-white/10 bg-[#060606] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="section-kicker">02 / Lifecycle</span>
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-mono text-rose-300">
                EXECUTION PIPELINE
              </span>
            </div>
            <h2 className="mt-5 text-4xl font-medium tracking-[-0.06em] text-white sm:text-6xl">
              From alpha research to sub-microsecond fills.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/50">
            A deterministic, battle-tested path to take quantitative trading models from historical data to institutional production execution.
          </p>
        </div>

        {/* 4 Interactive Process Steps */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => {
            const Icon = item.icon
            const isSelected = activeStep === index
            return (
              <div
                key={item.title}
                onClick={() => setActiveStep(index)}
                className={`group relative cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                  isSelected
                    ? 'border-rose-400/60 bg-gradient-to-b from-white/[0.07] to-rose-950/20 shadow-[0_0_25px_rgba(255,100,140,0.12)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-rose-300/80">{item.step}</span>
                  <div
                    className={`flex size-8 items-center justify-center rounded-lg border transition ${
                      isSelected
                        ? 'border-rose-300/50 bg-rose-500/20 text-rose-200'
                        : 'border-white/10 bg-white/5 text-white/50 group-hover:text-white'
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>
                </div>

                <h3 className="mt-8 text-xl font-medium tracking-[-0.03em] text-white">{item.title}</h3>
                <p className="mt-2 text-xs font-mono text-emerald-400">{item.metrics}</p>
                <p className="mt-3 text-xs leading-relaxed text-white/55">{item.desc}</p>

                {/* Features list */}
                <div className="mt-5 space-y-1.5 border-t border-white/10 pt-4">
                  {item.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-[11px] text-white/70">
                      <Check className="size-3 text-rose-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Code preview snippet */}
                <div className="mt-5 rounded-lg border border-white/5 bg-black/60 p-2.5 font-mono text-[10px] text-rose-200/80 truncate">
                  {item.example}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
