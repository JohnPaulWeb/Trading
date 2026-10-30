'use client'

import React, { useState, useMemo } from 'react'
import {
  INSTRUMENTS,
  Instrument,
  generateCandleData,
  Candle
} from '@/lib/tradingData'
import { CandleChart } from './CandleChart'
import { Watchlist } from './Watchlist'
import { SymbolDetails } from './SymbolDetails'
import { BottomPanel, Position } from './BottomPanel'
import { useToast } from '../Toast'
import {
  Search,
  Plus,
  SlidersHorizontal,
  Bell,
  RotateCcw,
  Undo2,
  Redo2,
  Camera,
  Maximize2,
  Settings,
  Sun,
  Moon,
  ChevronDown,
  Layers,
  LineChart,
  BarChart2,
  TrendingUp,
  X,
  Crosshair,
  Minus,
  Sparkles,
  Bookmark,
  Share2,
  Trash2,
  FileCode,
  Calendar,
  MessageSquare
} from 'lucide-react'

export function TradingViewTerminal() {
  const { toast } = useToast()

  // Terminal state
  const [activeSymbol, setActiveSymbol] = useState('EURUSD')
  const [timeframe, setTimeframe] = useState('1D')
  const [chartType, setChartType] = useState<'candles' | 'line' | 'area' | 'heikinAshi'>('candles')
  const [activeTimeRange, setActiveTimeRange] = useState('1Y')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeDrawingTool, setActiveDrawingTool] = useState<string | null>('crosshair')
  const [indicatorsOpen, setIndicatorsOpen] = useState(false)
  const [symbolSearchOpen, setSymbolSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Indicators state
  const [indicators, setIndicators] = useState({
    ema20: true,
    ema50: true,
    bollinger: false,
    rsi: true,
    volume: true,
  })

  // Simulated live positions
  const [positions, setPositions] = useState<Position[]>([
    {
      id: 'pos-1',
      symbol: 'EURUSD',
      side: 'BUY',
      size: 0.2,
      entryPrice: 1.11840,
      currentPrice: 1.12017,
      pnl: 35.40,
      pnlPercent: 0.16,
      time: '14:20:12',
    },
  ])

  const instrument = INSTRUMENTS[activeSymbol] || INSTRUMENTS['EURUSD']

  // Generate candle data for active symbol and timeframe
  const candles = useMemo(() => {
    return generateCandleData(activeSymbol, timeframe, 120)
  }, [activeSymbol, timeframe])

  // Handle Quick Trade from Chart overlay or Trade button
  const handleQuickTrade = (side: 'BUY' | 'SELL', qty: number) => {
    const entryPrice = side === 'BUY' ? instrument.price + 0.00002 : instrument.price - 0.00002
    const newPos: Position = {
      id: `pos-${Date.now()}`,
      symbol: activeSymbol,
      side,
      size: qty,
      entryPrice: Number(entryPrice.toFixed(instrument.digits)),
      currentPrice: Number(instrument.price.toFixed(instrument.digits)),
      pnl: 0,
      pnlPercent: 0,
      time: new Date().toLocaleTimeString('en-US'),
    }

    setPositions((prev) => [newPos, ...prev])
    toast(
      `Order Executed: ${side} ${qty} ${activeSymbol} @ ${entryPrice.toFixed(instrument.digits)}`,
      side === 'BUY' ? 'success' : 'info'
    )
  }

  const handleClosePosition = (id: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== id))
    toast('Position closed at market price.')
  }

  const handleScreenshot = () => {
    toast('Chart screenshot captured to clipboard!')
  }

  const handleSymbolSelect = (sym: string) => {
    setActiveSymbol(sym)
    setSymbolSearchOpen(false)
    toast(`Loaded ${sym} chart data.`)
  }

  const isDark = theme === 'dark'

  return (
    <div
      className={`flex flex-col w-screen h-screen overflow-hidden ${
        isDark ? 'bg-[#0b0e14] text-white' : 'bg-white text-[#131722]'
      }`}
    >
      {/* 1. TOP HEADER TOOLBAR (TradingView style) */}
      <header
        className={`flex items-center justify-between px-3 py-1.5 border-b select-none text-xs ${
          isDark
            ? 'bg-[#131722] border-white/10 text-white/80'
            : 'bg-[#f8f9fd] border-black/10 text-black/80'
        }`}
      >
        {/* Left Section: Brand, Symbol Search, Timeframes, Chart Type, Indicators */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {/* Brand Logo / Return */}
          <div className="flex items-center gap-2 pr-2 border-r border-white/10 mr-1">
            <div className="flex size-6 items-center justify-center rounded bg-blue-600 text-white font-bold text-xs shadow">
              TV
            </div>
            <span className="font-bold tracking-tight text-white hidden md:inline">
              PRO TRADER
            </span>
          </div>

          {/* Symbol Search Button */}
          <button
            onClick={() => setSymbolSearchOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-white/10 transition font-bold text-white bg-white/5 border border-white/10"
          >
            <span>{instrument.symbol}</span>
            <span className="text-[10px] text-white/50 font-normal hidden sm:inline">
              {instrument.exchange.split('·')[0].trim()}
            </span>
            <Search className="size-3 text-white/40 ml-1" />
          </button>

          {/* Compare Button (+) */}
          <button
            onClick={() => setSymbolSearchOpen(true)}
            className="p-1 rounded hover:bg-white/10 transition text-white/60 hover:text-white"
            title="Compare or Add Symbol"
          >
            <Plus className="size-3.5" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Timeframe Selectors */}
          <div className="flex items-center">
            {['1m', '5m', '15m', '1H', '4H', '1D', '1W'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 text-[11px] font-mono rounded transition ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Chart Style Switcher */}
          <div className="flex items-center">
            <button
              onClick={() => setChartType('candles')}
              className={`p-1 rounded transition ${
                chartType === 'candles' ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'
              }`}
              title="Candlesticks"
            >
              <BarChart2 className="size-3.5" />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`p-1 rounded transition ${
                chartType === 'line' ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'
              }`}
              title="Line Chart"
            >
              <LineChart className="size-3.5" />
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`p-1 rounded transition ${
                chartType === 'area' ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'
              }`}
              title="Area Chart"
            >
              <Layers className="size-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Indicators Button */}
          <button
            onClick={() => setIndicatorsOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 transition border border-white/10 text-white"
          >
            <Sparkles className="size-3 text-blue-400" />
            <span className="text-[11px]">Indicators</span>
          </button>

          {/* Alert Button */}
          <button
            onClick={() => toast('Price Alert configured at 1.12150')}
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 transition text-white/70 hover:text-white"
          >
            <Bell className="size-3" />
            <span className="text-[11px]">Alert</span>
          </button>
        </div>

        {/* Right Section: Theme Toggle, Screenshot, Fullscreen, Trade CTA */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle (Dark vs Light) */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="size-3.5 text-amber-300" /> : <Moon className="size-3.5 text-slate-700" />}
          </button>

          {/* Screenshot Camera */}
          <button
            onClick={handleScreenshot}
            className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition"
            title="Take Screenshot"
          >
            <Camera className="size-3.5" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {})
              } else {
                document.exitFullscreen().catch(() => {})
              }
            }}
            className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition hidden sm:block"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="size-3.5" />
          </button>

          {/* Primary Quick Trade Action */}
          <button
            onClick={() => handleQuickTrade('BUY', 0.2)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs shadow transition active:scale-95"
          >
            <TrendingUp className="size-3.5" />
            <span>Trade</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE (Left Drawing Toolbar + Center Chart + Right Watchlist/Details) */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Vertical Drawing Toolbar */}
        <aside
          className={`w-11 flex flex-col items-center py-2 gap-1.5 border-r select-none z-10 ${
            isDark ? 'bg-[#131722] border-white/10' : 'bg-[#f8f9fd] border-black/10'
          }`}
        >
          {[
            { id: 'crosshair', icon: Crosshair, title: 'Crosshair Tool' },
            { id: 'trendline', icon: LineChart, title: 'Trendline Tool' },
            { id: 'horizontal', icon: Minus, title: 'Horizontal Support / Resistance Level' },
            { id: 'fibonacci', icon: Layers, title: 'Fibonacci Retracement' },
            { id: 'measure', icon: SlidersHorizontal, title: 'Price Range Ruler' },
            { id: 'trash', icon: Trash2, title: 'Clear Drawings' },
          ].map((tool) => {
            const Icon = tool.icon
            const isActive = activeDrawingTool === tool.id
            return (
              <button
                key={tool.id}
                onClick={() => {
                  if (tool.id === 'trash') {
                    toast('All chart drawings cleared.')
                  } else {
                    setActiveDrawingTool(tool.id)
                    toast(`${tool.title} selected.`)
                  }
                }}
                className={`p-2 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-white/50 hover:text-white hover:bg-white/10'
                }`}
                title={tool.title}
              >
                <Icon className="size-4" />
              </button>
            )
          })}
        </aside>

        {/* Center: Chart Canvas + Bottom Panel */}
        <div className="flex-1 flex flex-col min-w-0 h-full relative">
          {/* Main Candlestick Chart */}
          <div className="flex-1 relative">
            <CandleChart
              symbol={activeSymbol}
              instrument={instrument}
              timeframe={timeframe}
              candles={candles}
              chartType={chartType}
              indicators={indicators}
              theme={theme}
              onQuickTrade={handleQuickTrade}
              activeDrawingTool={activeDrawingTool}
            />
          </div>

          {/* Bottom Time Range & Trading Panel */}
          <BottomPanel
            positions={positions}
            onClosePosition={handleClosePosition}
            activeTimeRange={activeTimeRange}
            onChangeTimeRange={setActiveTimeRange}
            theme={theme}
          />
        </div>

        {/* Right Dock: Watchlist & Symbol Details */}
        <div
          className={`w-80 flex flex-col border-l select-none shrink-0 hidden md:flex ${
            isDark ? 'border-white/10 bg-[#131722]' : 'border-black/10 bg-[#f8f9fd]'
          }`}
        >
          {/* Top half: Watchlist */}
          <div className="h-[52%] overflow-hidden border-b border-white/10">
            <Watchlist
              activeSymbol={activeSymbol}
              onSelectSymbol={handleSymbolSelect}
              theme={theme}
            />
          </div>

          {/* Bottom half: Symbol Details & News */}
          <div className="h-[48%] overflow-hidden">
            <SymbolDetails instrument={instrument} timeframe={timeframe} />
          </div>
        </div>
      </div>

      {/* 3. SYMBOL SEARCH MODAL */}
      {symbolSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-[#131722] p-5 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm font-bold">Symbol Search</span>
              <button
                onClick={() => setSymbolSearchOpen(false)}
                className="p-1 text-white/50 hover:text-white rounded"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
              <input
                type="text"
                autoFocus
                placeholder="Search symbol (e.g. EURUSD, BTCUSD, NVDA, SPX)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e222d] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-4 max-h-72 overflow-y-auto space-y-1 divide-y divide-white/5">
              {Object.values(INSTRUMENTS)
                .filter(
                  (inst) =>
                    inst.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    inst.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((inst) => {
                  const isUp = inst.change >= 0
                  return (
                    <div
                      key={inst.symbol}
                      onClick={() => handleSymbolSelect(inst.symbol)}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 cursor-pointer transition font-mono text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-white">{inst.symbol}</span>
                        <span className="text-white/50 text-[11px] truncate max-w-[180px]">{inst.name}</span>
                        <span className="text-[10px] rounded bg-white/10 px-1 text-white/60">{inst.category}</span>
                      </div>

                      <div className="text-right">
                        <span className="font-semibold text-white block">
                          {inst.price.toFixed(inst.digits)}
                        </span>
                        <span className={`text-[10px] ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isUp ? '+' : ''}{inst.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      )}

      {/* 4. TECHNICAL INDICATORS MODAL */}
      {indicatorsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-[#131722] p-5 shadow-2xl text-white font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm font-bold font-sans">Technical Indicators</span>
              <button
                onClick={() => setIndicatorsOpen(false)}
                className="p-1 text-white/50 hover:text-white rounded"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { id: 'ema20', name: 'Exponential Moving Average (EMA 20)', color: 'text-blue-400' },
                { id: 'ema50', name: 'Exponential Moving Average (EMA 50)', color: 'text-orange-400' },
                { id: 'bollinger', name: 'Bollinger Bands (20, 2)', color: 'text-purple-400' },
                { id: 'rsi', name: 'Relative Strength Index (RSI 14)', color: 'text-fuchsia-400' },
                { id: 'volume', name: 'Volume Histogram', color: 'text-emerald-400' },
              ].map((ind) => {
                const isActive = (indicators as any)[ind.id]
                return (
                  <div
                    key={ind.id}
                    onClick={() =>
                      setIndicators((prev) => ({
                        ...prev,
                        [ind.id]: !isActive,
                      }))
                    }
                    className="flex items-center justify-between p-3 rounded-xl bg-[#1e222d] hover:bg-[#252a38] cursor-pointer transition border border-white/5"
                  >
                    <span className={`font-semibold ${ind.color}`}>{ind.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {isActive ? 'ACTIVE' : 'OFF'}
                    </span>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => setIndicatorsOpen(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white transition text-xs"
            >
              Apply Indicators
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

