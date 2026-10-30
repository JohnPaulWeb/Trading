'use client'

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import {
  Candle,
  calculateEMA,
  calculateBollingerBands,
  calculateRSI,
  Instrument
} from '@/lib/tradingData'
import { ChevronDown, Plus, Minus, Eye, EyeOff } from 'lucide-react'

interface CandleChartProps {
  symbol: string
  instrument: Instrument
  timeframe: string
  candles: Candle[]
  chartType: 'candles' | 'line' | 'area' | 'heikinAshi'
  indicators: {
    ema20: boolean
    ema50: boolean
    bollinger: boolean
    rsi: boolean
    volume: boolean
  }
  theme: 'dark' | 'light'
  onQuickTrade: (side: 'BUY' | 'SELL', qty: number) => void
  activeDrawingTool: string | null
}

export function CandleChart({
  symbol,
  instrument,
  timeframe,
  candles,
  chartType,
  indicators,
  theme,
  onQuickTrade,
  activeDrawingTool,
}: CandleChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Chart view state
  const [visibleCount, setVisibleCount] = useState(65)
  const [scrollOffset, setScrollOffset] = useState(0) // offset from right end (0 = latest)
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartOffset, setDragStartOffset] = useState(0)
  const [orderQty, setOrderQty] = useState(0.2)
  const [horizontalLines, setHorizontalLines] = useState<number[]>([])

  const isDark = theme === 'dark'

  // Pre-calculate indicators
  const ema20 = useMemo(() => calculateEMA(candles, 20), [candles])
  const ema50 = useMemo(() => calculateEMA(candles, 50), [candles])
  const bollinger = useMemo(() => calculateBollingerBands(candles, 20, 2), [candles])
  const rsi = useMemo(() => calculateRSI(candles, 14), [candles])

  // Current slice of visible candles
  const endIndex = Math.max(0, candles.length - scrollOffset)
  const startIndex = Math.max(0, endIndex - visibleCount)
  const visibleCandles = useMemo(() => candles.slice(startIndex, endIndex), [candles, startIndex, endIndex])

  // Min and max price calculation
  const { minPrice, maxPrice, maxVol } = useMemo(() => {
    if (visibleCandles.length === 0) return { minPrice: 0, maxPrice: 1, maxVol: 1 }
    let min = Infinity
    let max = -Infinity
    let maxV = 0

    visibleCandles.forEach((c) => {
      if (c.low < min) min = c.low
      if (c.high > max) max = c.high
      if (c.volume > maxV) maxV = c.volume
    })

    // Padding top and bottom
    const range = max - min || 1
    min -= range * 0.08
    max += range * 0.08

    return { minPrice: min, maxPrice: max, maxVol: maxV || 1 }
  }, [visibleCandles])

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      // Zoom in
      setVisibleCount((prev) => Math.max(20, prev - 4))
    } else {
      // Zoom out
      setVisibleCount((prev) => Math.min(candles.length, prev + 4))
    }
  }

  // Mouse dragging pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeDrawingTool === 'horizontal' && mousePos && canvasRef.current) {
      // Add a horizontal line at mouse price
      const rect = canvasRef.current.getBoundingClientRect()
      const chartHeight = indicators.rsi ? rect.height * 0.75 : rect.height - 28
      const price = maxPrice - (mousePos.y / chartHeight) * (maxPrice - minPrice)
      setHorizontalLines((prev) => [...prev, price])
      return
    }

    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragStartOffset(scrollOffset)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    if (isDragging) {
      const deltaX = e.clientX - dragStartX
      const candleWidth = (rect.width - 70) / visibleCount
      const shiftCandles = Math.round(deltaX / candleWidth)
      const newOffset = Math.max(0, Math.min(candles.length - visibleCount, dragStartOffset + shiftCandles))
      setScrollOffset(newOffset)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setMousePos(null)
  }

  // Draw chart on canvas
  const drawChart = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const width = canvas.width / dpr
    const height = canvas.height / dpr

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(dpr, dpr)

    // Layout metrics
    const priceAxisWidth = 68
    const timeAxisHeight = 26
    const hasRsi = indicators.rsi
    const rsiHeight = hasRsi ? Math.min(110, height * 0.22) : 0
    const mainChartHeight = height - timeAxisHeight - rsiHeight
    const chartWidth = width - priceAxisWidth

    // Palette
    const bg = isDark ? '#0b0e14' : '#ffffff'
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)'
    const textColor = isDark ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.55)'
    const textLight = isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)'
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)'
    const green = isDark ? '#089981' : '#089981'
    const red = isDark ? '#f23645' : '#f23645'
    const greenMuted = isDark ? 'rgba(8, 153, 129, 0.25)' : 'rgba(8, 153, 129, 0.2)'
    const redMuted = isDark ? 'rgba(242, 54, 69, 0.25)' : 'rgba(242, 54, 69, 0.2)'

    // Background
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)

    // Helper functions for coordinates
    const getX = (index: number) => {
      const step = chartWidth / visibleCount
      return index * step + step * 0.5
    }

    const getY = (price: number) => {
      const ratio = (price - minPrice) / (maxPrice - minPrice)
      return mainChartHeight - ratio * mainChartHeight
    }

    const getRsiY = (val: number) => {
      const rsiTop = mainChartHeight
      const ratio = val / 100
      return rsiTop + rsiHeight - ratio * rsiHeight
    }

    // 1. Grid Lines (Horizontal & Vertical)
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1

    // Horizontal Price Grid Lines (5-8 ticks)
    const priceSteps = 6
    const priceInterval = (maxPrice - minPrice) / priceSteps
    ctx.font = '10px ui-monospace, SFMono-Regular, monospace'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    for (let i = 0; i <= priceSteps; i++) {
      const p = minPrice + i * priceInterval
      const y = getY(p)

      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(chartWidth, y)
      ctx.stroke()

      // Price text on right axis
      ctx.fillStyle = textColor
      ctx.fillText(p.toFixed(instrument.digits), chartWidth + 6, y)
    }

    // Vertical Time Grid Lines
    const timeStep = Math.max(1, Math.floor(visibleCount / 7))
    for (let i = 0; i < visibleCandles.length; i += timeStep) {
      const x = getX(i)
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, mainChartHeight)
      ctx.stroke()

      // Time label on bottom axis
      const c = visibleCandles[i]
      const date = new Date(c.time * 1000)
      const label =
        timeframe === '1D'
          ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

      ctx.fillStyle = textColor
      ctx.textAlign = 'center'
      ctx.fillText(label, x, mainChartHeight + 14)
    }

    // Axis dividers
    ctx.strokeStyle = borderColor
    ctx.beginPath()
    ctx.moveTo(chartWidth, 0)
    ctx.lineTo(chartWidth, height)
    ctx.moveTo(0, mainChartHeight)
    ctx.lineTo(width, mainChartHeight)
    ctx.stroke()

    // 2. Bollinger Bands
    if (indicators.bollinger) {
      const bUpper: { x: number; y: number }[] = []
      const bLower: { x: number; y: number }[] = []

      for (let i = 0; i < visibleCandles.length; i++) {
        const fullIdx = startIndex + i
        const u = bollinger.upper[fullIdx]
        const l = bollinger.lower[fullIdx]
        if (u !== null && l !== null) {
          const x = getX(i)
          bUpper.push({ x, y: getY(u) })
          bLower.push({ x, y: getY(l) })
        }
      }

      if (bUpper.length > 1) {
        // Shading
        ctx.fillStyle = isDark ? 'rgba(112, 53, 255, 0.06)' : 'rgba(112, 53, 255, 0.05)'
        ctx.beginPath()
        ctx.moveTo(bUpper[0].x, bUpper[0].y)
        bUpper.forEach((pt) => ctx.lineTo(pt.x, pt.y))
        for (let j = bLower.length - 1; j >= 0; j--) {
          ctx.lineTo(bLower[j].x, bLower[j].y)
        }
        ctx.closePath()
        ctx.fill()

        // Upper & lower lines
        ctx.strokeStyle = 'rgba(112, 53, 255, 0.35)'
        ctx.lineWidth = 1
        ctx.beginPath()
        bUpper.forEach((pt, idx) => (idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)))
        ctx.stroke()

        ctx.beginPath()
        bLower.forEach((pt, idx) => (idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)))
        ctx.stroke()
      }
    }

    // 3. Volume Bars (at bottom of main chart)
    if (indicators.volume) {
      const volMaxHeight = mainChartHeight * 0.18
      const candleWidth = (chartWidth / visibleCount) * 0.72

      for (let i = 0; i < visibleCandles.length; i++) {
        const c = visibleCandles[i]
        const x = getX(i)
        const volHeight = (c.volume / maxVol) * volMaxHeight
        const isUp = c.close >= c.open

        ctx.fillStyle = isUp ? greenMuted : redMuted
        ctx.fillRect(x - candleWidth * 0.5, mainChartHeight - volHeight, candleWidth, volHeight)
      }
    }

    // 4. Candlesticks / Line Chart
    const candleWidth = Math.max(2, (chartWidth / visibleCount) * 0.72)

    if (chartType === 'line' || chartType === 'area') {
      // Area / Line Chart
      ctx.beginPath()
      for (let i = 0; i < visibleCandles.length; i++) {
        const c = visibleCandles[i]
        const x = getX(i)
        const y = getY(c.close)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      if (chartType === 'area') {
        ctx.lineTo(getX(visibleCandles.length - 1), mainChartHeight)
        ctx.lineTo(getX(0), mainChartHeight)
        ctx.closePath()
        const grad = ctx.createLinearGradient(0, 0, 0, mainChartHeight)
        grad.addColorStop(0, isDark ? 'rgba(0, 229, 153, 0.28)' : 'rgba(8, 153, 129, 0.25)')
        grad.addColorStop(1, 'rgba(8, 153, 129, 0.0)')
        ctx.fillStyle = grad
        ctx.fill()
      }

      ctx.strokeStyle = green
      ctx.lineWidth = 2
      ctx.stroke()
    } else {
      // Traditional Candlesticks (or Heikin-Ashi)
      for (let i = 0; i < visibleCandles.length; i++) {
        const c = visibleCandles[i]
        const x = getX(i)
        const isUp = c.close >= c.open
        const color = isUp ? green : red

        const openY = getY(c.open)
        const closeY = getY(c.close)
        const highY = getY(c.high)
        const lowY = getY(c.low)

        // Wick (1px line)
        ctx.strokeStyle = color
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(x, highY)
        ctx.lineTo(x, lowY)
        ctx.stroke()

        // Candle Body
        const topY = Math.min(openY, closeY)
        const bodyHeight = Math.max(1.5, Math.abs(closeY - openY))

        ctx.fillStyle = color
        ctx.fillRect(x - candleWidth * 0.5, topY, candleWidth, bodyHeight)
      }
    }

    // 5. EMA Indicators Overlay (EMA 20 & EMA 50)
    if (indicators.ema20) {
      ctx.strokeStyle = '#2962ff' // TradingView bright blue
      ctx.lineWidth = 1.5
      ctx.beginPath()
      let started = false

      for (let i = 0; i < visibleCandles.length; i++) {
        const fullIdx = startIndex + i
        const val = ema20[fullIdx]
        if (val !== null) {
          const x = getX(i)
          const y = getY(val)
          if (!started) {
            ctx.moveTo(x, y)
            started = true
          } else {
            ctx.lineTo(x, y)
          }
        }
      }
      ctx.stroke()
    }

    if (indicators.ema50) {
      ctx.strokeStyle = '#ff9800' // TradingView bright orange
      ctx.lineWidth = 1.5
      ctx.beginPath()
      let started = false

      for (let i = 0; i < visibleCandles.length; i++) {
        const fullIdx = startIndex + i
        const val = ema50[fullIdx]
        if (val !== null) {
          const x = getX(i)
          const y = getY(val)
          if (!started) {
            ctx.moveTo(x, y)
            started = true
          } else {
            ctx.lineTo(x, y)
          }
        }
      }
      ctx.stroke()
    }

    // 6. User-drawn Horizontal Lines
    if (horizontalLines.length > 0) {
      ctx.strokeStyle = '#00bcd4'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      horizontalLines.forEach((p) => {
        const y = getY(p)
        if (y >= 0 && y <= mainChartHeight) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(chartWidth, y)
          ctx.stroke()
        }
      })
      ctx.setLineDash([])
    }

    // 7. Live Current Price Line & Right Badge
    const latestCandle = candles[candles.length - 1]
    const curPriceY = getY(latestCandle.close)

    if (curPriceY >= 0 && curPriceY <= mainChartHeight) {
      // Dashed line across chart
      ctx.strokeStyle = green
      ctx.lineWidth = 1
      ctx.setLineDash([3, 3])
      ctx.beginPath()
      ctx.moveTo(0, curPriceY)
      ctx.lineTo(chartWidth, curPriceY)
      ctx.stroke()
      ctx.setLineDash([])

      // Right axis price badge
      ctx.fillStyle = green
      const badgeH = 18
      ctx.fillRect(chartWidth + 1, curPriceY - badgeH * 0.5, priceAxisWidth - 2, badgeH)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 10px ui-monospace, SFMono-Regular, monospace'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(latestCandle.close.toFixed(instrument.digits), chartWidth + 5, curPriceY)
    }

    // 8. RSI Sub-Panel (if active)
    if (hasRsi) {
      const rsiTop = mainChartHeight
      // Divider
      ctx.strokeStyle = borderColor
      ctx.beginPath()
      ctx.moveTo(0, rsiTop)
      ctx.lineTo(width, rsiTop)
      ctx.stroke()

      // RSI Boundaries (70 and 30)
      const y70 = getRsiY(70)
      const y30 = getRsiY(30)

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 1
      ctx.setLineDash([2, 2])
      ctx.beginPath()
      ctx.moveTo(0, y70)
      ctx.lineTo(chartWidth, y70)
      ctx.moveTo(0, y30)
      ctx.lineTo(chartWidth, y30)
      ctx.stroke()
      ctx.setLineDash([])

      // 70 & 30 labels on right
      ctx.fillStyle = textColor
      ctx.font = '9px ui-monospace, monospace'
      ctx.fillText('70', chartWidth + 8, y70)
      ctx.fillText('30', chartWidth + 8, y30)

      // RSI Curve
      ctx.strokeStyle = '#e040fb'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      let rsiStarted = false

      for (let i = 0; i < visibleCandles.length; i++) {
        const fullIdx = startIndex + i
        const val = rsi[fullIdx]
        if (val !== null) {
          const x = getX(i)
          const y = getRsiY(val)
          if (!rsiStarted) {
            ctx.moveTo(x, y)
            rsiStarted = true
          } else {
            ctx.lineTo(x, y)
          }
        }
      }
      ctx.stroke()

      // Label
      ctx.fillStyle = textColor
      ctx.font = '10px ui-sans-serif, system-ui'
      ctx.fillText('RSI (14)', 8, rsiTop + 14)
    }

    // 9. Interactive Crosshair Cursor
    if (mousePos && mousePos.x <= chartWidth && mousePos.y <= mainChartHeight) {
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])

      // Vertical line
      ctx.beginPath()
      ctx.moveTo(mousePos.x, 0)
      ctx.lineTo(mousePos.x, height - timeAxisHeight)
      ctx.stroke()

      // Horizontal line
      ctx.beginPath()
      ctx.moveTo(0, mousePos.y)
      ctx.lineTo(chartWidth, mousePos.y)
      ctx.stroke()
      ctx.setLineDash([])

      // Right axis price badge at mouse Y
      const hoverPrice = maxPrice - (mousePos.y / mainChartHeight) * (maxPrice - minPrice)
      ctx.fillStyle = isDark ? '#2a2e39' : '#e0e3eb'
      ctx.fillRect(chartWidth + 1, mousePos.y - 9, priceAxisWidth - 2, 18)

      ctx.fillStyle = textLight
      ctx.font = '10px ui-monospace, monospace'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(hoverPrice.toFixed(instrument.digits), chartWidth + 6, mousePos.y)

      // Bottom axis time badge at mouse X
      const step = chartWidth / visibleCount
      const hoverIdx = Math.floor(mousePos.x / step)
      if (hoverIdx >= 0 && hoverIdx < visibleCandles.length) {
        const hoverCandle = visibleCandles[hoverIdx]
        const d = new Date(hoverCandle.time * 1000)
        const tStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        const badgeW = 90

        ctx.fillStyle = isDark ? '#2a2e39' : '#e0e3eb'
        ctx.fillRect(mousePos.x - badgeW * 0.5, mainChartHeight + 1, badgeW, timeAxisHeight - 2)

        ctx.fillStyle = textLight
        ctx.textAlign = 'center'
        ctx.fillText(tStr, mousePos.x, mainChartHeight + 13)
      }
    }

    ctx.restore()
  }, [
    candles,
    visibleCandles,
    startIndex,
    visibleCount,
    minPrice,
    maxPrice,
    maxVol,
    chartType,
    indicators,
    isDark,
    instrument,
    mousePos,
    horizontalLines,
    ema20,
    ema50,
    bollinger,
    rsi,
    timeframe,
  ])

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvasRef.current.width = rect.width * dpr
      canvasRef.current.height = rect.height * dpr
      drawChart()
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [drawChart])

  // Trigger redraw on state updates
  useEffect(() => {
    drawChart()
  }, [drawChart])

  // Get currently hovered candle or latest candle for HUD display
  const hoveredCandle = useMemo(() => {
    if (!mousePos || !canvasRef.current) return candles[candles.length - 1]
    const rect = canvasRef.current.getBoundingClientRect()
    const chartWidth = rect.width - 68
    const step = chartWidth / visibleCount
    const idx = Math.floor(mousePos.x / step)
    if (idx >= 0 && idx < visibleCandles.length) {
      return visibleCandles[idx]
    }
    return candles[candles.length - 1]
  }, [mousePos, candles, visibleCandles, visibleCount])

  const candleChange = hoveredCandle ? hoveredCandle.close - hoveredCandle.open : 0
  const candleChangePct = hoveredCandle && hoveredCandle.open ? (candleChange / hoveredCandle.open) * 100 : 0
  const isUp = candleChange >= 0

  return (
    <div
      ref={containerRef}
      className="relative flex-1 w-full h-full select-none overflow-hidden"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Top-Left Floating HUD (O, H, L, C, Vol, Change) */}
      <div className="absolute top-3 left-4 z-20 pointer-events-none flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg text-white">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-xs">{instrument.name}</span>
          <span className="text-white/40">·</span>
          <span className="text-white/60">{timeframe}</span>
          <span className="text-white/40">·</span>
          <span className="text-white/60">{instrument.exchange.split('·')[0].trim()}</span>
        </div>

        {hoveredCandle && (
          <div className="flex items-center gap-3">
            <span>O: <strong className="text-white font-medium">{hoveredCandle.open.toFixed(instrument.digits)}</strong></span>
            <span>H: <strong className="text-white font-medium">{hoveredCandle.high.toFixed(instrument.digits)}</strong></span>
            <span>L: <strong className="text-white font-medium">{hoveredCandle.low.toFixed(instrument.digits)}</strong></span>
            <span>C: <strong className={isUp ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
              {hoveredCandle.close.toFixed(instrument.digits)}
            </strong></span>
            <span className={isUp ? 'text-emerald-400' : 'text-rose-400'}>
              {isUp ? '+' : ''}{candleChange.toFixed(instrument.digits)} ({isUp ? '+' : ''}{candleChangePct.toFixed(2)}%)
            </span>
            <span className="text-white/50">Vol: {hoveredCandle.volume.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* 2. Top-Left Quick BUY / SELL Order Placement Widget (TradingView style from screenshot!) */}
      <div className="absolute top-14 left-4 z-20 flex items-stretch rounded-lg overflow-hidden border border-white/20 bg-[#131722]/90 backdrop-blur-md shadow-2xl">
        {/* Sell Button */}
        <button
          onClick={() => onQuickTrade('SELL', orderQty)}
          className="group flex flex-col justify-center px-3.5 py-1.5 bg-[#f23645] hover:bg-[#d82a39] text-white transition active:scale-95"
          title="Place Quick Market Sell Order"
        >
          <span className="font-mono text-xs font-bold leading-tight">
            {(instrument.price - 0.00002).toFixed(instrument.digits)}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/85">
            SELL
          </span>
        </button>

        {/* Quantity Stepper Input */}
        <div className="flex items-center px-2.5 bg-[#1e222d] border-x border-white/10 text-white font-mono text-xs">
          <input
            type="number"
            step="0.1"
            min="0.01"
            value={orderQty}
            onChange={(e) => setOrderQty(Math.max(0.01, parseFloat(e.target.value) || 0.1))}
            className="w-11 bg-transparent text-center font-bold text-white focus:outline-none"
          />
        </div>

        {/* Buy Button */}
        <button
          onClick={() => onQuickTrade('BUY', orderQty)}
          className="group flex flex-col justify-center px-3.5 py-1.5 bg-[#089981] hover:bg-[#07856f] text-white transition active:scale-95"
          title="Place Quick Market Buy Order"
        >
          <span className="font-mono text-xs font-bold leading-tight">
            {(instrument.price + 0.00002).toFixed(instrument.digits)}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/85">
            BUY
          </span>
        </button>
      </div>

      {/* 3. Indicators Active Pills (EMA 20, EMA 50, BB, RSI) */}
      <div className="absolute top-26 left-4 z-10 flex flex-wrap gap-2 text-[10px] font-mono pointer-events-none">
        {indicators.ema20 && (
          <div className="px-2 py-0.5 rounded bg-[#2962ff]/20 text-[#64b5f6] border border-[#2962ff]/40">
            EMA 20 ({ema20[ema20.length - 1]?.toFixed(instrument.digits) || '—'})
          </div>
        )}
        {indicators.ema50 && (
          <div className="px-2 py-0.5 rounded bg-[#ff9800]/20 text-[#ffb74d] border border-[#ff9800]/40">
            EMA 50 ({ema50[ema50.length - 1]?.toFixed(instrument.digits) || '—'})
          </div>
        )}
        {indicators.bollinger && (
          <div className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
            BB (20, 2)
          </div>
        )}
        {indicators.rsi && (
          <div className="px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40">
            RSI 14 ({rsi[rsi.length - 1]?.toFixed(1) || '—'})
          </div>
        )}
      </div>

      {/* 4. Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
      />
    </div>
  )
}

