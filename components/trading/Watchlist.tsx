'use client'

import React, { useState } from 'react'
import { INSTRUMENTS, Instrument } from '@/lib/tradingData'
import { Search, Plus, MoreHorizontal, SlidersHorizontal, TrendingUp, TrendingDown } from 'lucide-react'

interface WatchlistProps {
  activeSymbol: string
  onSelectSymbol: (symbol: string) => void
  theme: 'dark' | 'light'
}

interface WatchlistItem {
  symbol: string
  name: string
  last: number
  chg: number
  chgPct: number
  digits: number
  category: 'INDICES' | 'STOCKS' | 'FOREX' | 'CRYPTO' | 'COMMODITIES'
}

const defaultWatchlist: WatchlistItem[] = [
  // INDICES
  { symbol: 'SPX', name: 'S&P 500', last: 5948.25, chg: 28.40, chgPct: 0.48, digits: 2, category: 'INDICES' },
  { symbol: 'NDQ', name: 'Nasdaq 100', last: 21120.40, chg: 142.80, chgPct: 0.68, digits: 2, category: 'INDICES' },
  { symbol: 'DJI', name: 'Dow Jones 30', last: 43840.10, chg: -84.20, chgPct: -0.19, digits: 2, category: 'INDICES' },
  { symbol: 'VIX', name: 'Volatility Index', last: 14.85, chg: -0.42, chgPct: -2.75, digits: 2, category: 'INDICES' },
  { symbol: 'DXY', name: 'US Dollar Index', last: 103.85, chg: 0.12, chgPct: 0.12, digits: 2, category: 'INDICES' },

  // STOCKS
  { symbol: 'AAPL', name: 'Apple Inc.', last: 234.80, chg: 1.45, chgPct: 0.62, digits: 2, category: 'STOCKS' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', last: 148.90, chg: 2.70, chgPct: 1.85, digits: 2, category: 'STOCKS' },
  { symbol: 'TSLA', name: 'Tesla Inc.', last: 262.40, chg: -2.10, chgPct: -0.79, digits: 2, category: 'STOCKS' },
  { symbol: 'NFLX', name: 'Netflix Inc.', last: 784.50, chg: 8.20, chgPct: 1.06, digits: 2, category: 'STOCKS' },

  // FOREX
  { symbol: 'EURUSD', name: 'Euro / US Dollar', last: 1.12017, chg: 0.00256, chgPct: 0.23, digits: 5, category: 'FOREX' },
  { symbol: 'GBPUSD', name: 'British Pound / USD', last: 1.29840, chg: -0.00140, chgPct: -0.11, digits: 5, category: 'FOREX' },
  { symbol: 'USDJPY', name: 'US Dollar / Yen', last: 152.420, chg: 0.640, chgPct: 0.42, digits: 3, category: 'FOREX' },

  // CRYPTO
  { symbol: 'BTCUSD', name: 'Bitcoin / USD', last: 98420.50, chg: 3240.20, chgPct: 3.41, digits: 2, category: 'CRYPTO' },
  { symbol: 'ETHUSD', name: 'Ethereum / USD', last: 3480.20, chg: 74.50, chgPct: 2.19, digits: 2, category: 'CRYPTO' },

  // COMMODITIES
  { symbol: 'XAUUSD', name: 'Gold Spot / USD', last: 2748.50, chg: 14.20, chgPct: 0.52, digits: 2, category: 'COMMODITIES' },
]

export function Watchlist({ activeSymbol, onSelectSymbol, theme }: WatchlistProps) {
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState<string>('ALL')

  const categories = ['ALL', 'FOREX', 'CRYPTO', 'STOCKS', 'INDICES']

  const filtered = defaultWatchlist.filter((item) => {
    const matchesSearch =
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCat = selectedCat === 'ALL' || item.category === selectedCat
    return matchesSearch && matchesCat
  })

  // Group by category if ALL is selected
  const groupedCategories = ['FOREX', 'CRYPTO', 'STOCKS', 'INDICES', 'COMMODITIES'] as const

  return (
    <div className="flex flex-col h-full bg-[#131722] text-white border-b border-white/10 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white tracking-wide">Watchlist</span>
          <span className="rounded bg-white/10 px-1.5 py-0.2 text-[10px] font-mono text-white/60">
            {defaultWatchlist.length}
          </span>
        </div>

        <div className="flex items-center gap-1 text-white/50">
          <button className="p-1 hover:text-white rounded hover:bg-white/5 transition" title="Add Symbol">
            <Plus className="size-3.5" />
          </button>
          <button className="p-1 hover:text-white rounded hover:bg-white/5 transition" title="Options">
            <MoreHorizontal className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Search & Category Pills */}
      <div className="p-2 border-b border-white/10 space-y-1.5">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-white/40" />
          <input
            type="text"
            placeholder="Search symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1e222d] border border-white/10 rounded-md py-1 pl-7 pr-2 text-xs font-mono text-white placeholder-white/35 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-2 py-0.5 text-[10px] font-mono rounded transition whitespace-nowrap ${
                selectedCat === c
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white/5 text-white/50 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Columns Header (Symbol, Last, Chg, Chg%) */}
      <div className="grid grid-cols-[1.1fr_1fr_0.9fr] px-3 py-1.5 text-[10px] font-mono text-white/40 border-b border-white/5">
        <span>Symbol</span>
        <span className="text-right">Last</span>
        <span className="text-right">Chg%</span>
      </div>

      {/* Watchlist Body List */}
      <div className="flex-1 overflow-y-auto">
        {selectedCat === 'ALL' && !search ? (
          // Grouped View
          groupedCategories.map((cat) => {
            const items = defaultWatchlist.filter((w) => w.category === cat)
            if (items.length === 0) return null
            return (
              <div key={cat} className="mb-2">
                <div className="px-3 py-1 text-[9px] font-mono font-bold tracking-wider text-white/40 bg-white/[0.02]">
                  {cat}
                </div>
                {items.map((item) => {
                  const isActive = item.symbol === activeSymbol
                  const isUp = item.chg >= 0
                  return (
                    <div
                      key={item.symbol}
                      onClick={() => onSelectSymbol(item.symbol)}
                      className={`grid grid-cols-[1.1fr_1fr_0.9fr] items-center px-3 py-1.5 cursor-pointer text-xs font-mono transition border-l-2 ${
                        isActive
                          ? 'bg-[#2a2e39] border-blue-500 text-white'
                          : 'border-transparent hover:bg-white/5 text-white/80'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className={`size-1.5 rounded-full ${isUp ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        <span className="font-semibold text-white truncate">{item.symbol}</span>
                      </div>

                      <div className="text-right font-medium">
                        {item.last.toLocaleString('en-US', {
                          minimumFractionDigits: item.digits === 5 ? 5 : 2,
                          maximumFractionDigits: item.digits === 5 ? 5 : 2,
                        })}
                      </div>

                      <div className={`text-right font-medium ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isUp ? '+' : ''}{item.chgPct.toFixed(2)}%
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })
        ) : (
          // Filtered list
          filtered.map((item) => {
            const isActive = item.symbol === activeSymbol
            const isUp = item.chg >= 0
            return (
              <div
                key={item.symbol}
                onClick={() => onSelectSymbol(item.symbol)}
                className={`grid grid-cols-[1.1fr_1fr_0.9fr] items-center px-3 py-1.5 cursor-pointer text-xs font-mono transition border-l-2 ${
                  isActive
                    ? 'bg-[#2a2e39] border-blue-500 text-white'
                    : 'border-transparent hover:bg-white/5 text-white/80'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className={`size-1.5 rounded-full ${isUp ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                  <span className="font-semibold text-white truncate">{item.symbol}</span>
                </div>

                <div className="text-right font-medium">
                  {item.last.toLocaleString('en-US', {
                    minimumFractionDigits: item.digits === 5 ? 5 : 2,
                    maximumFractionDigits: item.digits === 5 ? 5 : 2,
                  })}
                </div>

                <div className={`text-right font-medium ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isUp ? '+' : ''}{item.chgPct.toFixed(2)}%
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

