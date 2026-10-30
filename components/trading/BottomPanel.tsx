'use client'

import React, { useState } from 'react'
import {
  ChevronUp,
  ChevronDown,
  X,
  TrendingUp,
  TrendingDown,
  Clock,
  Terminal,
  Activity,
  Code2,
  CheckCircle2,
  Trash2
} from 'lucide-react'

export interface Position {
  id: string
  symbol: string
  side: 'BUY' | 'SELL'
  size: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  time: string
}

interface BottomPanelProps {
  positions: Position[]
  onClosePosition: (id: string) => void
  activeTimeRange: string
  onChangeTimeRange: (range: string) => void
  theme: 'dark' | 'light'
}

export function BottomPanel({
  positions,
  onClosePosition,
  activeTimeRange,
  onChangeTimeRange,
  theme,
}: BottomPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'positions' | 'orders' | 'history' | 'pine'>('positions')

  const timeRanges = ['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'ALL']

  return (
    <div className="bg-[#131722] border-t border-white/10 text-white select-none">
      {/* Time Range Bar & Collapse Toggle */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 text-xs font-mono">
        {/* Time ranges */}
        <div className="flex items-center gap-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => onChangeTimeRange(range)}
              className={`px-2 py-0.5 text-[11px] rounded transition ${
                activeTimeRange === range
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Center / Right tools: UTC Clock, Auto Scale, Bottom Panel Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-white/40 text-[10px]">
            <Clock className="size-3" />
            <span>10:18:30 UTC</span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-white/60 hover:text-white px-2 py-0.5 rounded hover:bg-white/5 transition"
          >
            <span className="text-[11px]">Trading Panel ({positions.length})</span>
            {isExpanded ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Tabs Body */}
      {isExpanded && (
        <div className="h-56 flex flex-col bg-[#0b0e14]">
          {/* Panel Tabs */}
          <div className="flex items-center gap-2 px-4 py-1.5 border-b border-white/10 text-xs font-mono bg-[#131722]">
            <button
              onClick={() => setActiveTab('positions')}
              className={`px-3 py-1 rounded transition ${
                activeTab === 'positions'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Open Positions ({positions.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1 rounded transition ${
                activeTab === 'orders'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Active Orders (0)
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1 rounded transition ${
                activeTab === 'history'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Trade History (14)
            </button>
            <button
              onClick={() => setActiveTab('pine')}
              className={`px-3 py-1 rounded transition ${
                activeTab === 'pine'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Pine Script / Algo Console
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
            {activeTab === 'positions' && (
              <div>
                {positions.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center text-white/40">
                    <Activity className="size-6 mb-2 opacity-50" />
                    <p>No open positions. Click BUY or SELL above to execute a simulated order.</p>
                  </div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-white/40 border-b border-white/10 text-[10px] uppercase">
                        <th className="pb-2">Symbol</th>
                        <th className="pb-2">Side</th>
                        <th className="pb-2">Size</th>
                        <th className="pb-2">Entry Price</th>
                        <th className="pb-2">Current</th>
                        <th className="pb-2">Unrealized PnL</th>
                        <th className="pb-2">Time</th>
                        <th className="pb-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {positions.map((pos) => {
                        const isProfit = pos.pnl >= 0
                        return (
                          <tr key={pos.id} className="hover:bg-white/[0.02]">
                            <td className="py-2.5 font-bold text-white">{pos.symbol}</td>
                            <td className="py-2.5">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  pos.side === 'BUY'
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-rose-500/20 text-rose-300'
                                }`}
                              >
                                {pos.side}
                              </span>
                            </td>
                            <td className="py-2.5 text-white/80">{pos.size}</td>
                            <td className="py-2.5 text-white/70">{pos.entryPrice}</td>
                            <td className="py-2.5 text-white font-medium">{pos.currentPrice}</td>
                            <td className={`py-2.5 font-bold ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {isProfit ? '+' : ''}${pos.pnl.toFixed(2)} ({isProfit ? '+' : ''}{pos.pnlPercent.toFixed(2)}%)
                            </td>
                            <td className="py-2.5 text-white/40 text-[10px]">{pos.time}</td>
                            <td className="py-2.5 text-right">
                              <button
                                onClick={() => onClosePosition(pos.id)}
                                className="px-2 py-1 rounded bg-white/10 hover:bg-rose-600 text-white text-[10px] transition"
                              >
                                Close
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="h-32 flex flex-col items-center justify-center text-white/40">
                <p>No active limit or stop orders pending in matching engine.</p>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="text-white/70 space-y-2">
                <div className="flex items-center justify-between py-1 border-b border-white/5 text-[11px]">
                  <span>EURUSD · BUY 0.20 @ 1.11840 → Closed @ 1.12010</span>
                  <span className="text-emerald-400 font-bold">+$34.00 (+0.15%)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5 text-[11px]">
                  <span>BTCUSD · SELL 0.50 @ 98,840 → Closed @ 98,210</span>
                  <span className="text-emerald-400 font-bold">+$315.00 (+0.64%)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5 text-[11px]">
                  <span>NVDA · BUY 25.0 @ 144.20 → Closed @ 147.80</span>
                  <span className="text-emerald-400 font-bold">+$90.00 (+2.50%)</span>
                </div>
              </div>
            )}

            {activeTab === 'pine' && (
              <div className="space-y-2 font-mono text-[11px] text-emerald-300 bg-black/60 p-3 rounded-lg border border-white/10">
                <div>//@version=5</div>
                <div>indicator("Vertex Pro Quantitative Mean Reversion", overlay=true)</div>
                <div className="text-white/60">length = input(20, "EMA Period")</div>
                <div className="text-white/60">src = close</div>
                <div>ema_val = ta.ema(src, length)</div>
                <div>plot(ema_val, color=color.blue, title="EMA Line")</div>
                <div className="text-white/40">// Auto-compilation status: Active on Equinix NY4 DMA</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

