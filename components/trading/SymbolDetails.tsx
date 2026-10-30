'use client'

import React from 'react'
import { Instrument, SAMPLE_NEWS, NewsItem } from '@/lib/tradingData'
import { ExternalLink, TrendingUp, TrendingDown, Clock, ShieldCheck, Newspaper } from 'lucide-react'

interface SymbolDetailsProps {
  instrument: Instrument
  timeframe: string
}

export function SymbolDetails({ instrument, timeframe }: SymbolDetailsProps) {
  const isUp = instrument.change >= 0
  const newsList: NewsItem[] = SAMPLE_NEWS[instrument.symbol] || SAMPLE_NEWS['EURUSD']

  // Day range percentage
  const dayRangeSpread = instrument.high24h - instrument.low24h || 0.0001
  const dayPositionPct = Math.min(100, Math.max(0, ((instrument.price - instrument.low24h) / dayRangeSpread) * 100))

  // 52w range percentage
  const yrRangeSpread = instrument.high52w - instrument.low52w || 0.0001
  const yrPositionPct = Math.min(100, Math.max(0, ((instrument.price - instrument.low52w) / yrRangeSpread) * 100))

  return (
    <div className="flex flex-col h-full bg-[#131722] text-white p-3 space-y-4 overflow-y-auto text-xs font-mono">
      {/* 1. Header Info */}
      <div className="border-b border-white/10 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white">{instrument.symbol}</span>
            <span className="rounded bg-white/10 px-1.5 py-0.2 text-[9px] text-white/70">
              {instrument.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Market open</span>
          </div>
        </div>

        <p className="text-[11px] text-white/50 mt-0.5">{instrument.name} · {timeframe} · {instrument.exchange}</p>

        {/* Large Current Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">
            {instrument.price.toFixed(instrument.digits)}
          </span>
          <span className="text-[11px] text-white/50">USD</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isUp ? '+' : ''}{instrument.change.toFixed(instrument.digits)} ({isUp ? '+' : ''}{instrument.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* 2. Key Stats Grid */}
      <div className="grid grid-cols-2 gap-2 text-[11px] border-b border-white/10 pb-3">
        <div>
          <span className="text-white/40 block text-[10px]">Volume</span>
          <span className="text-white font-medium">{instrument.volume}</span>
        </div>
        <div>
          <span className="text-white/40 block text-[10px]">Avg Vol (30D)</span>
          <span className="text-white font-medium">{instrument.avgVolume}</span>
        </div>
        <div>
          <span className="text-white/40 block text-[10px]">Open</span>
          <span className="text-white font-medium">{instrument.open.toFixed(instrument.digits)}</span>
        </div>
        <div>
          <span className="text-white/40 block text-[10px]">Prev Close</span>
          <span className="text-white font-medium">{instrument.prevClose.toFixed(instrument.digits)}</span>
        </div>
      </div>

      {/* 3. Day's Range & 52-Week Range Sliders */}
      <div className="space-y-3 border-b border-white/10 pb-3">
        {/* Day Range */}
        <div>
          <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
            <span>Day's Range</span>
            <span>{instrument.low24h.toFixed(instrument.digits)} — {instrument.high24h.toFixed(instrument.digits)}</span>
          </div>
          <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 left-0 bg-blue-500 rounded-full"
              style={{ width: `${dayPositionPct}%` }}
            />
          </div>
        </div>

        {/* 52-Week Range */}
        <div>
          <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
            <span>52-Week Range</span>
            <span>{instrument.low52w.toFixed(instrument.digits)} — {instrument.high52w.toFixed(instrument.digits)}</span>
          </div>
          <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 left-0 bg-purple-500 rounded-full"
              style={{ width: `${yrPositionPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. Technical Analysis Rating Gauge */}
      <div className="border-b border-white/10 pb-3">
        <div className="flex items-center justify-between text-[10px] text-white/40 mb-1.5">
          <span>Technical Rating</span>
          <span className="font-bold text-emerald-400 uppercase tracking-wider">{instrument.technicalRating}</span>
        </div>

        {/* Segmented bar */}
        <div className="flex gap-1 h-2 w-full rounded overflow-hidden">
          <div
            className="bg-rose-500 rounded-l"
            style={{ width: `${(instrument.sellCount / 26) * 100}%` }}
            title={`Sell: ${instrument.sellCount}`}
          />
          <div
            className="bg-amber-500"
            style={{ width: `${(instrument.neutralCount / 26) * 100}%` }}
            title={`Neutral: ${instrument.neutralCount}`}
          />
          <div
            className="bg-emerald-500 rounded-r"
            style={{ width: `${(instrument.buyCount / 26) * 100}%` }}
            title={`Buy: ${instrument.buyCount}`}
          />
        </div>

        <div className="flex justify-between text-[10px] text-white/50 mt-1.5">
          <span className="text-rose-400">Sell ({instrument.sellCount})</span>
          <span className="text-amber-300">Neutral ({instrument.neutralCount})</span>
          <span className="text-emerald-400">Buy ({instrument.buyCount})</span>
        </div>
      </div>

      {/* 5. Key News Feed */}
      <div>
        <div className="flex items-center justify-between text-[10px] text-white/40 mb-2">
          <div className="flex items-center gap-1.5 text-white/70">
            <Newspaper className="size-3 text-rose-300" />
            <span className="font-semibold uppercase tracking-wider">Market News</span>
          </div>
          <span className="text-[9px]">Real-time</span>
        </div>

        <div className="space-y-2">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="p-2 rounded-lg bg-[#1e222d] hover:bg-[#252a38] transition cursor-pointer border border-white/5"
            >
              <h5 className="text-[11px] font-sans font-medium text-white/90 leading-tight">
                {news.title}
              </h5>
              <div className="mt-1 flex items-center justify-between text-[9px] text-white/40">
                <span>{news.source}</span>
                <span>{news.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

