'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Play,
  RotateCcw,
  TrendingUp,
  Activity,
  Zap,
  Clock,
  ShieldAlert,
  ChevronRight,
  Database,
  BarChart3,
  Sliders,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react'

interface StrategyStep {
  phase: string
  action: string
  detail: string
  latency: string
  pnlDelta: string
  status: 'pending' | 'active' | 'completed'
  venue: string
}

interface Strategy {
  id: string
  name: string
  category: string
  target: string
  description: string
  initialPnl: number
  steps: StrategyStep[]
}

const strategies: Strategy[] = [
  {
    id: 'stat-arb',
    name: 'Cross-Venue Statistical Arbitrage',
    category: 'Market Neutral',
    target: 'BTC-USDT Spot (Coinbase Prime) ⇄ BTC Futures Basis (CME / Binance)',
    description: 'Exploits micro-discrepancies between global spot prices and perpetual futures basis with zero directional market risk.',
    initialPnl: 14820.50,
    steps: [
      {
        phase: '01 / SCAN',
        action: 'Sub-Microsecond L2 Book Arbitrage Detection',
        detail: 'Detected 14.8 bps basis spread divergence on BTC/USD between Coinbase Prime ($98,410.20) and CME ($98,428.50).',
        latency: '3.4μs',
        pnlDelta: '+$0.00',
        status: 'pending',
        venue: 'Equinix NY4',
      },
      {
        phase: '02 / ROUTE',
        action: 'Atomic Multi-Leg Smart Order Routing',
        detail: 'Dispatched simultaneous fill orders: BUY 4.5 BTC on Coinbase / SHORT 4.5 BTC on CME Front-Month contract.',
        latency: '8.2μs',
        pnlDelta: '+$420.80',
        status: 'pending',
        venue: 'NY4 ⇄ Aurora',
      },
      {
        phase: '03 / HEDGE',
        action: 'Deterministic Delta Neutral Rebalance',
        detail: 'Both legs filled 100% with zero slippage. Automated margin collateral reallocated across prime custody.',
        latency: '4.1μs',
        pnlDelta: '+$82.40',
        status: 'pending',
        venue: 'CME Clearing',
      },
      {
        phase: '04 / HARVEST',
        action: 'Capture Basis Convergence & Settle',
        detail: 'Basis spread compressed to 0.8 bps. Closed dual-leg position. Cumulative trade net profit secured.',
        latency: '11.8μs',
        pnlDelta: '+$512.20',
        status: 'pending',
        venue: 'Ledger Settle',
      },
    ],
  },
  {
    id: 'hft-mm',
    name: 'High-Frequency Market Maker (L2 Depth Skew)',
    category: 'Liquidity Provision',
    target: 'Order Book Depth Skew & VPIN Toxicity Hedging (ETH/USD)',
    description: 'Quotes tight two-sided markets, captures the bid-ask spread, and dynamically skews quotes when toxic flow is detected.',
    initialPnl: 28410.00,
    steps: [
      {
        phase: '01 / TOXICITY',
        action: 'VPIN Order Flow Toxicity Inspection',
        detail: 'Measured Volume-Synchronized Probability of Toxicity (VPIN = 0.12). Low informed flow probability.',
        latency: '2.1μs',
        pnlDelta: '+$0.00',
        status: 'pending',
        venue: 'Binance VIP',
      },
      {
        phase: '02 / QUOTE',
        action: 'Place Asymmetric Passive Bids & Asks',
        detail: 'Posted 50 ETH Bid at $3,480.10 and 50 ETH Ask at $3,480.40. Mid-market spread captured: 30 bps.',
        latency: '6.4μs',
        pnlDelta: '+$380.00',
        status: 'pending',
        venue: 'Coinbase L2',
      },
      {
        phase: '03 / SKEW',
        action: 'Instant Inventory Delta Skew Mitigation',
        detail: 'Aggressive taker sweep filled bid side. Algorithm instantly shaded remaining quotes up +15 bps to deter adverse selection.',
        latency: '5.8μs',
        pnlDelta: '+$145.50',
        status: 'pending',
        venue: 'Equinix LD4',
      },
      {
        phase: '04 / OFF-LOAD',
        action: 'Internalized Crossing in Dark Pool',
        detail: 'Crossed remaining inventory with institutional block order at mid-quote. Zero exchange taker fees paid.',
        latency: '9.2μs',
        pnlDelta: '+$640.20',
        status: 'pending',
        venue: 'Vertex Dark',
      },
    ],
  },
  {
    id: 'vol-scalp',
    name: 'Options Volatility Gamma Scalper',
    category: 'Derivatives / Vol',
    target: 'Implied Volatility Mispricing & Dynamic Delta Hedging (SOL/USD)',
    description: 'Captures mispriced options skew ahead of macroeconomic catalysts and dynamically re-hedges delta in real time.',
    initialPnl: 41920.80,
    steps: [
      {
        phase: '01 / SIGNAL',
        action: 'Macro Catalysts & Skew Curve Fitting',
        detail: 'Identified 8.4 vol points underpricing on 7-day At-The-Money Call options relative to realized historical volatility.',
        latency: '4.8μs',
        pnlDelta: '+$0.00',
        status: 'pending',
        venue: 'Deribit Core',
      },
      {
        phase: '02 / STRADDLE',
        action: 'Construct Delta-Neutral Long Gamma Position',
        detail: 'Bought 1,000 $220 Strike Calls, hedged delta via short underlying perpetual contract. Initial delta = 0.00.',
        latency: '12.4μs',
        pnlDelta: '+$890.00',
        status: 'pending',
        venue: 'Paradigm ECN',
      },
      {
        phase: '03 / REBALANCE',
        action: 'Microsecond High-Frequency Delta Rebalancing',
        detail: 'Underlying asset spiked to $224.50. Algorithm sold 140 SOL into the rally to maintain strictly delta-neutral gamma exposure.',
        latency: '7.1μs',
        pnlDelta: '+$1,120.40',
        status: 'pending',
        venue: 'Hyperliquid',
      },
      {
        phase: '04 / EXPIRY',
        action: 'Extract Implied Volatility Premium',
        detail: 'Realized gamma profit collected; position unwound as implied volatility returned to statistical equilibrium.',
        latency: '14.2μs',
        pnlDelta: '+$1,450.00',
        status: 'pending',
        venue: 'Vault Settle',
      },
    ],
  },
]

const sampleOrderBook = {
  asks: [
    { price: '98,424.50', size: '2.84', total: '14.20' },
    { price: '98,423.80', size: '1.45', total: '11.36' },
    { price: '98,422.90', size: '4.12', total: '9.91' },
    { price: '98,421.50', size: '3.80', total: '5.79' },
    { price: '98,420.80', size: '1.99', total: '1.99' },
  ],
  bids: [
    { price: '98,420.70', size: '2.14', total: '2.14' },
    { price: '98,419.90', size: '5.62', total: '7.76' },
    { price: '98,418.50', size: '3.40', total: '11.16' },
    { price: '98,417.20', size: '4.88', total: '16.04' },
    { price: '98,416.00', size: '8.10', total: '24.14' },
  ],
}

export function LiveSimulator() {
  const [activeStrategyId, setActiveStrategyId] = useState('stat-arb')
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [shockInjected, setShockInjected] = useState(false)
  const [activeTab, setActiveTab] = useState<'trace' | 'book' | 'risk'>('trace')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const activeStrategy = strategies.find((s) => s.id === activeStrategyId)!

  const calculateCurrentPnl = () => {
    let pnl = activeStrategy.initialPnl
    if (currentStepIndex >= 0) {
      for (let i = 0; i <= currentStepIndex; i++) {
        const val = parseFloat(activeStrategy.steps[i].pnlDelta.replace(/[^0-9.-]+/g, ''))
        if (!isNaN(val)) pnl += val
      }
    }
    if (shockInjected) pnl -= 184.20 // Minor protected slippage absorbed by risk guard
    return pnl
  }

  const handleSelectStrategy = (id: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setActiveStrategyId(id)
    setCurrentStepIndex(-1)
    setIsRunning(false)
    setShockInjected(false)
  }

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setCurrentStepIndex(-1)
    setIsRunning(false)
    setShockInjected(false)
  }

  const handleStepForward = () => {
    if (currentStepIndex < activeStrategy.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handleRunStrategy = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setCurrentStepIndex(0)
    setIsRunning(true)
  }

  const handleInjectShock = () => {
    setShockInjected(true)
    setTimeout(() => {
      setShockInjected(false)
    }, 4000)
  }

  useEffect(() => {
    if (isRunning) {
      if (currentStepIndex < activeStrategy.steps.length - 1) {
        timerRef.current = setTimeout(() => {
          setCurrentStepIndex((prev) => prev + 1)
        }, 1100)
      } else {
        setIsRunning(false)
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isRunning, currentStepIndex, activeStrategy.steps.length])

  return (
    <section id="terminal" className="relative border-t border-white/10 bg-[#060606] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="section-kicker">01 / Terminal Engine</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-300">
                LIVE EXECUTION
              </span>
            </div>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.06em] text-white sm:text-6xl">
              Simulate quantitative strategies at tick level.
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/60">
              Test institutional algorithmic execution models in real time. Watch L2 depth parsing, atomic multi-leg routing,
              and automated delta hedging with nanosecond deterministic risk controls.
            </p>
          </div>

          {/* Strategy Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {strategies.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelectStrategy(s.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition ${
                  activeStrategyId === s.id
                    ? 'border border-rose-400 bg-rose-950/30 text-white shadow-[0_0_15px_rgba(255,100,140,0.18)]'
                    : 'border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white'
                }`}
              >
                <TrendingUp className="size-3.5 text-rose-400" />
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Shell Container */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0d] shadow-2xl">
          {/* Top Control Bar & Live PnL */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#0e0e13] px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-rose-500/80" />
                <div className="size-3 rounded-full bg-amber-500/80" />
                <div className="size-3 rounded-full bg-emerald-500/80" />
              </div>

              <div className="h-4 w-px bg-white/15" />

              <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                <span className="font-semibold text-white">{activeStrategy.name}</span>
                <span className="text-white/30">|</span>
                <span className="text-rose-300">{activeStrategy.category}</span>
              </div>
            </div>

            {/* Real-time cumulative PnL Badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/20 px-3 py-1 font-mono text-xs">
                <span className="text-white/50">Cumulative PnL:</span>
                <span className="font-semibold text-emerald-400">
                  ${calculateCurrentPnl().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-emerald-300">(+18.4% APY)</span>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunStrategy}
                  disabled={isRunning}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-black transition hover:bg-rose-100 disabled:opacity-50"
                >
                  <Play className="size-3 fill-black" />
                  <span>{isRunning ? 'Routing...' : 'Run Strategy'}</span>
                </button>

                <button
                  onClick={handleStepForward}
                  disabled={isRunning || currentStepIndex >= activeStrategy.steps.length - 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-mono text-white hover:bg-white/10 disabled:opacity-40"
                >
                  <span>Step Order</span>
                  <ChevronRight className="size-3" />
                </button>

                <button
                  onClick={handleInjectShock}
                  className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-950/20 px-2.5 py-1.5 text-xs font-mono text-amber-300 hover:bg-amber-900/30 transition"
                  title="Inject sudden 300 bps market flash volatility"
                >
                  <AlertTriangle className="size-3 text-amber-400" />
                  <span>Shock Test</span>
                </button>

                <button
                  onClick={handleReset}
                  className="rounded-lg border border-white/10 p-1.5 text-white/60 hover:bg-white/5 hover:text-white"
                  title="Reset simulation"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Target Asset Pair & Guardrail Alert Banner */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#08080a] px-6 py-2.5 font-mono text-xs text-white/80">
            <div className="flex items-center gap-2">
              <Zap className="size-3.5 text-rose-400 shrink-0" />
              <span className="font-semibold uppercase text-white/40">INSTRUMENT PAIR:</span>
              <span className="text-white">{activeStrategy.target}</span>
            </div>

            {shockInjected ? (
              <div className="flex items-center gap-2 text-amber-400 font-semibold animate-pulse">
                <ShieldAlert className="size-3.5" />
                <span>CIRCUIT BREAKER: Volatility shock absorbed · Auto-derisking active</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <span>Pre-Trade Risk Attestation: 100% Passed</span>
              </div>
            )}
          </div>

          {/* Main Grid: Order Pipeline (Left) & L2 Depth Ladder / Traces (Right) */}
          <div className="grid lg:grid-cols-[1.1fr_1.3fr]">
            {/* Left: Execution Pipeline Steps */}
            <div className="flex flex-col divide-y divide-white/10 border-b border-white/10 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between px-6 py-3 bg-white/[0.02]">
                <span className="text-xs font-mono uppercase tracking-wider text-white/50">Execution Pipeline</span>
                <span className="text-xs font-mono text-white/40">
                  {currentStepIndex === -1
                    ? 'Standby · Ready'
                    : currentStepIndex === activeStrategy.steps.length - 1
                    ? 'All 4 Orders Filled'
                    : `Phase ${currentStepIndex + 1} of ${activeStrategy.steps.length}`}
                </span>
              </div>

              <div className="p-6 space-y-4">
                {activeStrategy.steps.map((step, idx) => {
                  const isDone = currentStepIndex >= idx
                  const isCurrent = currentStepIndex === idx
                  return (
                    <div
                      key={step.action}
                      className={`relative rounded-xl border p-4 transition-all duration-300 ${
                        isCurrent
                          ? 'border-rose-400/60 bg-gradient-to-r from-rose-950/30 to-purple-950/20 shadow-[0_0_20px_rgba(255,90,120,0.12)]'
                          : isDone
                          ? 'border-emerald-500/30 bg-emerald-950/10'
                          : 'border-white/5 bg-white/[0.02] opacity-45'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex size-6 items-center justify-center rounded-full text-xs font-mono font-semibold ${
                              isDone
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-white/10 text-white/50'
                            }`}
                          >
                            {isDone ? '✓' : `0${idx + 1}`}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] uppercase tracking-wider text-rose-300">
                                {step.phase}
                              </span>
                              <span className="rounded bg-white/5 px-1.5 py-0.2 text-[9px] font-mono text-white/40">
                                {step.venue}
                              </span>
                            </div>
                            <h4 className="text-sm font-medium text-white">{step.action}</h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-emerald-400">
                            {step.pnlDelta}
                          </span>
                          <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/40">
                            {step.latency}
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-white/60 pl-8.5">{step.detail}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right: Live L2 Order Book Depth & Execution Logs */}
            <div className="flex flex-col bg-[#07070a]">
              {/* Tab Navigation */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-2.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('trace')}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition ${
                      activeTab === 'trace'
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <Activity className="size-3" />
                    <span>Live Order Trace</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('book')}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition ${
                      activeTab === 'book'
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <BarChart3 className="size-3" />
                    <span>L2 Depth Ladder</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('risk')}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono transition ${
                      activeTab === 'risk'
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <ShieldAlert className="size-3" />
                    <span>Risk Metrics</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
                  <Clock className="size-3" />
                  <span>Tick Gap: 8.4μs</span>
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 p-6">
                {activeTab === 'trace' && (
                  <div className="font-mono text-xs space-y-2 h-[340px] overflow-y-auto pr-2 text-white/80">
                    <div className="text-white/40">// Vertex Low-Latency DMA Engine v3.2 [NY4 Co-Located]</div>
                    <div className="text-white/40">// Session: FIX.4.4:VERTEX_ALGO-&gt;CME_MATCH_DIRECT</div>
                    <div className="text-emerald-400">[CONNECT] TCP Kernel Bypass active. Zero socket drops.</div>

                    {currentStepIndex >= 0 && (
                      <div className="border-l-2 border-rose-400 pl-3 py-1 space-y-0.5">
                        <span className="text-rose-300 font-semibold">[14:02:19.418022] SIGNAL DETECTED</span>
                        <p className="text-white/90">{activeStrategy.steps[0].action}</p>
                        <p className="text-white/50 text-[11px]">{activeStrategy.steps[0].detail}</p>
                      </div>
                    )}

                    {currentStepIndex >= 1 && (
                      <div className="border-l-2 border-purple-400 pl-3 py-1 space-y-0.5">
                        <span className="text-purple-300 font-semibold">[14:02:19.418030] ROUTED &amp; EXECUTED</span>
                        <p className="text-white/90">{activeStrategy.steps[1].action}</p>
                        <p className="text-white/50 text-[11px]">{activeStrategy.steps[1].detail}</p>
                      </div>
                    )}

                    {currentStepIndex >= 2 && (
                      <div className="border-l-2 border-blue-400 pl-3 py-1 space-y-0.5">
                        <span className="text-blue-300 font-semibold">[14:02:19.418035] DELTA REBALANCED</span>
                        <p className="text-white/90">{activeStrategy.steps[2].action}</p>
                        <p className="text-white/50 text-[11px]">{activeStrategy.steps[2].detail}</p>
                      </div>
                    )}

                    {currentStepIndex >= 3 && (
                      <div className="border-l-2 border-emerald-400 pl-3 py-1 space-y-0.5">
                        <span className="text-emerald-400 font-semibold">[14:02:19.418046] HARVESTED &amp; SETTLED</span>
                        <p className="text-white/90">{activeStrategy.steps[3].action}</p>
                        <p className="text-emerald-300 font-semibold text-[11px]">
                          ✔ Position closed flat. Zero residual inventory risk. Net PnL +$1,015.40 booked.
                        </p>
                      </div>
                    )}

                    {currentStepIndex === -1 && (
                      <div className="text-white/40 italic pt-8 text-center font-mono">
                        Click "Run Strategy" or "Step Order" above to initiate real-time algorithmic execution.
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'book' && (
                  <div className="h-[340px] flex flex-col justify-between font-mono text-xs">
                    {/* Asks (Red) */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-white/40 pb-1 border-b border-white/5">
                        <span>ASK PRICE</span>
                        <span>SIZE (BTC)</span>
                        <span>DEPTH</span>
                      </div>
                      {sampleOrderBook.asks.map((ask) => (
                        <div key={ask.price} className="flex items-center justify-between py-0.5 text-rose-300">
                          <span>${ask.price}</span>
                          <span className="text-white/70">{ask.size}</span>
                          <span className="text-white/40 text-[10px]">{ask.total}</span>
                        </div>
                      ))}
                    </div>

                    {/* Mid Spread */}
                    <div className="my-2 flex items-center justify-between border-y border-white/10 bg-white/5 py-1.5 px-3 text-[11px]">
                      <span className="text-white/50">SPREAD: $0.10 (0.01 bps)</span>
                      <span className="text-emerald-400 font-semibold">Toxicity: VPIN 0.12 (Low)</span>
                    </div>

                    {/* Bids (Green) */}
                    <div className="space-y-1">
                      {sampleOrderBook.bids.map((bid) => (
                        <div key={bid.price} className="flex items-center justify-between py-0.5 text-emerald-400">
                          <span>${bid.price}</span>
                          <span className="text-white/70">{bid.size}</span>
                          <span className="text-white/40 text-[10px]">{bid.total}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'risk' && (
                  <div className="h-[340px] flex flex-col justify-between p-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <span className="text-[10px] font-mono text-white/40">SHARPE RATIO</span>
                        <p className="mt-1 text-xl font-bold font-mono text-emerald-400">4.18</p>
                        <span className="text-[10px] text-white/50">Annualized rolling 90d</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <span className="text-[10px] font-mono text-white/40">MAX DRAWDOWN</span>
                        <p className="mt-1 text-xl font-bold font-mono text-white">0.64%</p>
                        <span className="text-[10px] text-white/50">Hard circuit cap: 2.0%</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <span className="text-[10px] font-mono text-white/40">WIN RATE</span>
                        <p className="mt-1 text-xl font-bold font-mono text-rose-300">93.8%</p>
                        <span className="text-[10px] text-white/50">142,000 executed legs</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <span className="text-[10px] font-mono text-white/40">VALUE AT RISK (VaR)</span>
                        <p className="mt-1 text-xl font-bold font-mono text-emerald-300">$1,840</p>
                        <span className="text-[10px] text-white/50">99% confidence 1-day</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3 text-xs font-mono text-emerald-300">
                      SEC Rule 15c3-5 Pre-Trade Risk Engine Active: FAT-finger size locks, credit limits, and capital margin checks pass in 40ns.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
