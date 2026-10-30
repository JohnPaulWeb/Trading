export interface Candle {
  time: number // timestamp in seconds
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface Instrument {
  symbol: string
  name: string
  category: 'Forex' | 'Crypto' | 'Stocks' | 'Indices' | 'Commodities'
  exchange: string
  price: number
  change: number
  changePercent: number
  digits: number
  high24h: number
  low24h: number
  high52w: number
  low52w: number
  volume: string
  avgVolume: string
  open: number
  prevClose: number
  technicalRating: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell'
  buyCount: number
  neutralCount: number
  sellCount: number
}

export const INSTRUMENTS: Record<string, Instrument> = {
  EURUSD: {
    symbol: 'EURUSD',
    name: 'Euro / U.S. Dollar',
    category: 'Forex',
    exchange: 'ICE · Forex Major',
    price: 1.12017,
    change: 0.00256,
    changePercent: 0.23,
    digits: 5,
    high24h: 1.12147,
    low24h: 1.11760,
    high52w: 1.21500,
    low52w: 1.11000,
    volume: '14.82B',
    avgVolume: '18.40B',
    open: 1.11760,
    prevClose: 1.11761,
    technicalRating: 'Buy',
    buyCount: 16,
    neutralCount: 8,
    sellCount: 2,
  },
  BTCUSD: {
    symbol: 'BTCUSD',
    name: 'Bitcoin / U.S. Dollar',
    category: 'Crypto',
    exchange: 'Coinbase · Spot Global',
    price: 98420.50,
    change: 3240.20,
    changePercent: 3.41,
    digits: 2,
    high24h: 99150.00,
    low24h: 94800.00,
    high52w: 99800.00,
    low52w: 38500.00,
    volume: '$42.1B',
    avgVolume: '$38.5B',
    open: 95180.30,
    prevClose: 95180.30,
    technicalRating: 'Strong Buy',
    buyCount: 22,
    neutralCount: 3,
    sellCount: 1,
  },
  SPX: {
    symbol: 'SPX',
    name: 'S&P 500 Index',
    category: 'Indices',
    exchange: 'Cboe · US Major 500',
    price: 5948.25,
    change: 28.40,
    changePercent: 0.48,
    digits: 2,
    high24h: 5962.10,
    low24h: 5920.80,
    high52w: 5975.00,
    low52w: 4890.00,
    volume: '2.84B',
    avgVolume: '3.10B',
    open: 5922.00,
    prevClose: 5919.85,
    technicalRating: 'Buy',
    buyCount: 18,
    neutralCount: 6,
    sellCount: 2,
  },
  NDQ: {
    symbol: 'NDQ',
    name: 'Nasdaq 100 Index',
    category: 'Indices',
    exchange: 'Nasdaq · US Tech 100',
    price: 21120.40,
    change: 142.80,
    changePercent: 0.68,
    digits: 2,
    high24h: 21185.00,
    low24h: 20980.00,
    high52w: 21250.00,
    low52w: 16800.00,
    volume: '4.15B',
    avgVolume: '4.30B',
    open: 20990.00,
    prevClose: 20977.60,
    technicalRating: 'Strong Buy',
    buyCount: 20,
    neutralCount: 5,
    sellCount: 1,
  },
  NVDA: {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    category: 'Stocks',
    exchange: 'Nasdaq · Technology',
    price: 148.90,
    change: 2.70,
    changePercent: 1.85,
    digits: 2,
    high24h: 151.20,
    low24h: 146.50,
    high52w: 153.10,
    low52w: 45.20,
    volume: '48.9M',
    avgVolume: '52.4M',
    open: 146.80,
    prevClose: 146.20,
    technicalRating: 'Strong Buy',
    buyCount: 21,
    neutralCount: 4,
    sellCount: 1,
  },
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    category: 'Stocks',
    exchange: 'Nasdaq · Consumer Electronics',
    price: 234.80,
    change: 1.45,
    changePercent: 0.62,
    digits: 2,
    high24h: 236.10,
    low24h: 232.90,
    high52w: 237.20,
    low52w: 164.10,
    volume: '38.2M',
    avgVolume: '45.0M',
    open: 233.10,
    prevClose: 233.35,
    technicalRating: 'Buy',
    buyCount: 15,
    neutralCount: 9,
    sellCount: 2,
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    category: 'Stocks',
    exchange: 'Nasdaq · Automotive & Clean Energy',
    price: 262.40,
    change: -2.10,
    changePercent: -0.79,
    digits: 2,
    high24h: 268.50,
    low24h: 259.80,
    high52w: 271.00,
    low52w: 138.80,
    volume: '64.1M',
    avgVolume: '68.0M',
    open: 265.00,
    prevClose: 264.50,
    technicalRating: 'Neutral',
    buyCount: 10,
    neutralCount: 12,
    sellCount: 4,
  },
  ETHUSD: {
    symbol: 'ETHUSD',
    name: 'Ethereum / U.S. Dollar',
    category: 'Crypto',
    exchange: 'Coinbase · Spot Global',
    price: 3480.20,
    change: 74.50,
    changePercent: 2.19,
    digits: 2,
    high24h: 3520.00,
    low24h: 3380.00,
    high52w: 4090.00,
    low52w: 2120.00,
    volume: '$18.4B',
    avgVolume: '$16.2B',
    open: 3410.00,
    prevClose: 3405.70,
    technicalRating: 'Buy',
    buyCount: 17,
    neutralCount: 7,
    sellCount: 2,
  },
  XAUUSD: {
    symbol: 'XAUUSD',
    name: 'Gold / U.S. Dollar (Spot)',
    category: 'Commodities',
    exchange: 'LBMA · Precious Metals',
    price: 2748.50,
    change: 14.20,
    changePercent: 0.52,
    digits: 2,
    high24h: 2758.40,
    low24h: 2732.10,
    high52w: 2790.00,
    low52w: 1980.00,
    volume: '240K oz',
    avgVolume: '280K oz',
    open: 2735.00,
    prevClose: 2734.30,
    technicalRating: 'Strong Buy',
    buyCount: 19,
    neutralCount: 6,
    sellCount: 1,
  },
}

// Generate realistic candlestick data matching the screenshot
export function generateCandleData(symbol: string, timeframe: string = '1D', count: number = 100): Candle[] {
  const baseInst = INSTRUMENTS[symbol] || INSTRUMENTS['EURUSD']
  const basePrice = baseInst.price
  const digits = baseInst.digits

  const candles: Candle[] = []
  const now = Math.floor(Date.now() / 1000)
  
  let stepSec = 86400
  if (timeframe === '1m') stepSec = 60
  else if (timeframe === '5m') stepSec = 300
  else if (timeframe === '15m') stepSec = 900
  else if (timeframe === '1H') stepSec = 3600
  else if (timeframe === '4H') stepSec = 14400
  else if (timeframe === '1D') stepSec = 86400
  else if (timeframe === '1W') stepSec = 604800

  // Seeded pseudo-random generator for consistent and realistic charts
  let seed = 42
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  // Generate an organic trending curve that ends near current price
  // For EURUSD, recreate the swing-high and downtrend from the screenshot:
  // Starts ~1.17, peaks at ~1.205 in Feb, pulls back to ~1.15, bounces to ~1.18 in May,
  // declines to ~1.13 in Aug, rallies to ~1.16 in Sep, drops to ~1.115 in Oct, bounces to 1.12017 in Nov.
  const isEurUsd = symbol === 'EURUSD'
  
  let currentPrice = isEurUsd ? 1.1450 : basePrice * 0.92

  for (let i = count; i >= 0; i--) {
    const time = now - i * stepSec
    const progress = (count - i) / count

    // Macro curve modulation
    let macroBias = 0
    if (isEurUsd) {
      if (progress < 0.15) macroBias = 0.0006 // rise to 1.205
      else if (progress < 0.35) macroBias = -0.0004 // fall to 1.15
      else if (progress < 0.45) macroBias = 0.0003 // bounce to 1.18
      else if (progress < 0.70) macroBias = -0.00035 // drop to 1.13
      else if (progress < 0.85) macroBias = 0.00025 // bounce to 1.165
      else macroBias = -0.0003 // final drop to 1.115 and slight tick up to 1.12017
    } else {
      macroBias = Math.sin(progress * Math.PI * 3) * 0.001 + 0.0004
    }

    const volatility = basePrice * (isEurUsd ? 0.0035 : 0.012)
    const delta = (pseudoRandom() - 0.485 + macroBias * 10) * volatility
    
    // For the last candle, make sure it closes exactly at baseInst.price
    let open = currentPrice
    let close = i === 0 ? baseInst.price : currentPrice + delta
    if (close <= 0) close = open * 0.99

    const high = Math.max(open, close) + pseudoRandom() * volatility * 0.85
    const low = Math.min(open, close) - pseudoRandom() * volatility * 0.85
    const volume = Math.floor(1000 + pseudoRandom() * 9000 + (Math.abs(close - open) / volatility) * 12000)

    candles.push({
      time,
      open: Number(open.toFixed(digits)),
      high: Number(high.toFixed(digits)),
      low: Number(low.toFixed(digits)),
      close: Number(close.toFixed(digits)),
      volume,
    })

    currentPrice = close
  }

  return candles
}

// Technical indicator calculations
export function calculateSMA(data: Candle[], period: number): (number | null)[] {
  const result: (number | null)[] = []
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null)
    } else {
      let sum = 0
      for (let j = 0; j < period; j++) {
        sum += data[i - j].close
      }
      result.push(sum / period)
    }
  }
  return result
}

export function calculateEMA(data: Candle[], period: number): (number | null)[] {
  const result: (number | null)[] = []
  const k = 2 / (period + 1)
  let ema: number | null = null

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null)
    } else if (i === period - 1) {
      let sum = 0
      for (let j = 0; j < period; j++) {
        sum += data[i - j].close
      }
      ema = sum / period
      result.push(ema)
    } else {
      if (ema !== null) {
        ema = data[i].close * k + ema * (1 - k)
        result.push(ema)
      }
    }
  }
  return result
}

export function calculateBollingerBands(data: Candle[], period: number = 20, multiplier: number = 2) {
  const upper: (number | null)[] = []
  const middle: (number | null)[] = []
  const lower: (number | null)[] = []

  const sma = calculateSMA(data, period)

  for (let i = 0; i < data.length; i++) {
    const ma = sma[i]
    if (ma === null) {
      upper.push(null)
      middle.push(null)
      lower.push(null)
    } else {
      let varianceSum = 0
      for (let j = 0; j < period; j++) {
        varianceSum += Math.pow(data[i - j].close - ma, 2)
      }
      const stdDev = Math.sqrt(varianceSum / period)
      middle.push(ma)
      upper.push(ma + multiplier * stdDev)
      lower.push(ma - multiplier * stdDev)
    }
  }

  return { upper, middle, lower }
}

export function calculateRSI(data: Candle[], period: number = 14): (number | null)[] {
  const rsi: (number | null)[] = []
  let gains: number[] = []
  let losses: number[] = []

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      rsi.push(null)
      continue
    }

    const change = data[i].close - data[i - 1].close
    const gain = change > 0 ? change : 0
    const loss = change < 0 ? Math.abs(change) : 0

    gains.push(gain)
    losses.push(loss)

    if (i < period) {
      rsi.push(null)
    } else if (i === period) {
      const avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period
      const avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss
      rsi.push(100 - (100 / (1 + rs)))
    } else {
      const prevRsi = rsi[i - 1]
      // smoothed RSI
      const avgGain = (gains[i - 1] + (period - 1) * (gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period)) / period
      const avgLoss = (losses[i - 1] + (period - 1) * (losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period)) / period
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss
      rsi.push(100 - (100 / (1 + rs)))
    }
  }

  return rsi
}

export interface NewsItem {
  id: string
  title: string
  source: string
  timeAgo: string
  sentiment: 'positive' | 'negative' | 'neutral'
}

export const SAMPLE_NEWS: Record<string, NewsItem[]> = {
  EURUSD: [
    { id: '1', title: 'Euro Ends October Down More Than 1% Amid ECB Rate Speculation', source: 'Reuters', timeAgo: '36m ago', sentiment: 'negative' },
    { id: '2', title: 'Eurozone Q3 GDP Beats Estimates by 0.2%, Driven by German Export Recovery', source: 'Bloomberg', timeAgo: '2h ago', sentiment: 'positive' },
    { id: '3', title: 'Fed Balance Sheet Runoff Continues as U.S. Dollar Index Tests 101.60 Resistance', source: 'Financial Times', timeAgo: '4h ago', sentiment: 'neutral' },
    { id: '4', title: 'Options Volatility Smiles Suggest Upside Hedge Demand in EUR/USD Risk Reversals', source: 'FXStreet', timeAgo: '6h ago', sentiment: 'positive' },
  ],
  BTCUSD: [
    { id: '5', title: 'Bitcoin Surges Past $98,000 as Institutional Spot Inflows Hit New Weekly High', source: 'CoinDesk', timeAgo: '18m ago', sentiment: 'positive' },
    { id: '6', title: 'CME Bitcoin Futures Open Interest Climbs to Record $12.4 Billion', source: 'Bloomberg', timeAgo: '1h ago', sentiment: 'positive' },
    { id: '7', title: 'Mining Hashrate Crosses 750 EH/s Amid Next-Gen ASIC Hardware Deployments', source: 'CoinTelegraph', timeAgo: '3h ago', sentiment: 'neutral' },
  ],
  NVDA: [
    { id: '8', title: 'NVIDIA Expands Blackwell Ultra Server Architecture Shipments Ahead of Schedule', source: 'CNBC', timeAgo: '22m ago', sentiment: 'positive' },
    { id: '9', title: 'Semiconductor CapEx Forecasts Point to Sustained AI Accelerator Demand in 2027', source: 'Barron’s', timeAgo: '2h ago', sentiment: 'positive' },
  ],
}

