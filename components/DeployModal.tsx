'use client'

import React, { useState } from 'react'
import { X, TrendingUp, Terminal, Copy, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { useToast } from './Toast'

interface DeployModalProps {
  isOpen: boolean
  onClose: () => void
}

const strategyTemplates = [
  { id: 'stat-arb', name: 'Cross-Venue Statistical Arbitrage', desc: 'Exploit spot vs perpetual basis with zero directional risk' },
  { id: 'mm', name: 'HFT Market Maker (L2 Skew)', desc: 'Provide liquidity and capture spreads with toxicity inventory hedging' },
  { id: 'vol', name: 'Options Gamma Scalper', desc: 'Harvest mispriced volatility skew with automated delta rebalancing' },
  { id: 'twap', name: 'Adaptive TWAP / VWAP Execution', desc: 'Institutional volume execution minimizing market impact and slippage' },
]

export function DeployModal({ isOpen, onClose }: DeployModalProps) {
  const { toast } = useToast()
  const [selectedStrategy, setSelectedStrategy] = useState('stat-arb')
  const [venueNode, setVenueNode] = useState('ny4')
  const [allocation, setAllocation] = useState('paper')
  const [email, setEmail] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployedStrategyId, setDeployedStrategyId] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState(false)

  if (!isOpen) return null

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast('Please enter your fund or work email to proceed.', 'error')
      return
    }

    setIsDeploying(true)
    setTimeout(() => {
      setIsDeploying(false)
      const stratId = `strat_live_${Math.random().toString(36).substring(2, 9)}_${venueNode}`
      setDeployedStrategyId(stratId)
      toast('Trading strategy deployed to co-located cluster!')
    }, 1200)
  }

  const handleCopyKey = () => {
    if (!deployedStrategyId) return
    navigator.clipboard.writeText(deployedStrategyId)
    setCopiedKey(true)
    toast('Strategy ID copied to clipboard!')
    setTimeout(() => setCopiedKey(false), 2000)
  }

  const handleResetModal = () => {
    setDeployedStrategyId(null)
    setEmail('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/20 bg-[#0d0d12] p-6 shadow-2xl sm:p-8">
        {/* Close Button */}
        <button
          onClick={handleResetModal}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        {!deployedStrategyId ? (
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[11px] font-mono text-rose-300">
                DMA DEPLOYMENT
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">
              Deploy Algorithmic Trading Strategy
            </h3>
            <p className="mt-1 text-xs text-white/60">
              Provision an isolated FPGA execution container directly co-located in venue matching engines.
            </p>

            <form onSubmit={handleDeploy} className="mt-6 space-y-4">
              {/* Template selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                  1. Select Alpha Strategy Architecture
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {strategyTemplates.map((tmpl) => (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedStrategy(tmpl.id)}
                      className={`cursor-pointer rounded-xl border p-3 transition ${
                        selectedStrategy === tmpl.id
                          ? 'border-rose-400 bg-rose-950/20 text-white shadow'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20'
                      }`}
                    >
                      <h5 className="text-xs font-semibold text-white">{tmpl.name}</h5>
                      <p className="mt-1 text-[11px] text-white/50">{tmpl.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Venue Data Center */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                    2. Co-Location Node
                  </label>
                  <select
                    value={venueNode}
                    onChange={(e) => setVenueNode(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-mono text-white focus:border-rose-400 focus:outline-none"
                  >
                    <option value="ny4" className="bg-[#121217]">Equinix NY4 (11.4μs - CME, Nasdaq, Coinbase)</option>
                    <option value="aur" className="bg-[#121217]">CME Aurora (14.2μs - Globex Rates &amp; Futures)</option>
                    <option value="ld4" className="bg-[#121217]">Equinix LD4 (16.8μs - Deribit, LSE, FX ECN)</option>
                    <option value="ty3" className="bg-[#121217]">Equinix TY3 (21.4μs - JPX, Asia-Pacific)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                    3. Mode &amp; Allocation
                  </label>
                  <select
                    value={allocation}
                    onChange={(e) => setAllocation(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-mono text-white focus:border-rose-400 focus:outline-none"
                  >
                    <option value="paper" className="bg-[#121217]">Paper Trading (Simulated Fill Engine)</option>
                    <option value="50k" className="bg-[#121217]">Live $50,000 Allocation (Max 1% Drawdown)</option>
                    <option value="250k" className="bg-[#121217]">Live $250,000 Allocation (Max 1% Drawdown)</option>
                    <option value="1m" className="bg-[#121217]">Live $1,000,000+ Institutional Allocation</option>
                  </select>
                </div>
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                  4. Trader / Fund Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="quant@capital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:border-rose-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isDeploying}
                className="w-full rounded-xl bg-white py-3 text-xs font-semibold uppercase tracking-wider text-black hover:bg-rose-100 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDeploying ? (
                  <>
                    <Zap className="size-4 animate-spin text-rose-500" />
                    <span>Cross-connecting to venue gateway...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="size-4 text-rose-600" />
                    <span>Deploy Strategy to Co-Location</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Check className="size-5" />
            </div>
            <h3 className="mt-4 text-2xl font-medium text-white">Strategy Deployed!</h3>
            <p className="mt-1 text-xs text-white/60">
              Co-located node active in <span className="font-mono text-emerald-300 uppercase">{venueNode}</span>.
              Here is your strategy handle:
            </p>

            <div className="mt-5 rounded-xl border border-white/15 bg-black/60 p-3.5 font-mono text-xs flex items-center justify-between">
              <span className="text-rose-200 truncate mr-2">{deployedStrategyId}</span>
              <button
                onClick={handleCopyKey}
                className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition"
              >
                {copiedKey ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs font-mono text-white/70 space-y-2">
              <div className="text-white/40">// Monitor in terminal:</div>
              <div className="text-emerald-300">
                export VERTEX_STRAT="{deployedStrategyId}"
              </div>
              <div className="text-white/90">
                vertex-cli monitor --strategy $VERTEX_STRAT --live-pnl
              </div>
            </div>

            <button
              onClick={handleResetModal}
              className="mt-6 w-full rounded-xl bg-white py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-rose-100 transition"
            >
              Done &amp; Open Live Terminal
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
