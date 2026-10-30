'use client'

import React, { useState } from 'react'
import { Terminal, Copy, Check, TrendingUp, ShieldCheck, Cpu, Zap } from 'lucide-react'
import { useToast } from './Toast'

const codeSnippets = {
  python: `from vertex import Strategy, OrderBook, AlphaModel, RiskGuard, ExecutionVenue

class CrossExchangeBasisArb(Strategy):
    """Sub-millisecond statistical arbitrage between spot & CME perpetuals."""
    
    def initialize(self):
        self.spot = self.subscribe("BINANCE:BTC-USDT", depth="L2")
        self.perp = self.subscribe("CME:BTC-PERP", depth="L2")
        
        # Enforce deterministic pre-trade risk guardrails
        self.risk = RiskGuard(
            max_drawdown_pct=1.5,
            fat_finger_max_qty=25.0,
            circuit_breaker="auto_flatten",
            latency_sla_micros=20
        )

    def on_order_book_update(self, book: OrderBook):
        spread_bps = (self.perp.mid_price - self.spot.mid_price) / self.spot.mid_price * 10000
        
        # Trigger atomic dual-leg execution when spread exceeds fee threshold
        if spread_bps > 12.5 and not self.risk.is_breached():
            self.route_atomic_pair(
                leg_a=self.spot.market_buy(qty=4.0),
                leg_b=self.perp.market_short(qty=4.0),
                venue_routing="smart_order_routing_ny4"
            )

# Deploy to co-located Equinix NY4 cluster
CrossExchangeBasisArb().deploy(mode="live_dma", allocation_usd=500_000)`,

  rust: `use vertex_core::prelude::*;
use vertex_risk::PreTradeGuard;

#[derive(Default)]
pub struct HighFrequencyMarketMaker {
    risk: PreTradeGuard,
    inventory_delta: f64,
}

impl StrategyHandler for HighFrequencyMarketMaker {
    #[inline(always)]
    fn on_tick(&mut self, tick: &L2Tick, engine: &mut ExecutionEngine) {
        // Sub-microsecond tick processing with zero heap allocations
        if self.risk.verify_order_safety(tick).is_ok() {
            let skew_offset = self.inventory_delta * -0.00015;
            let bid_price = tick.bid_price + skew_offset;
            let ask_price = tick.ask_price + skew_offset;

            // Direct DMA to FPGA network card via Solarflare Onload
            unsafe {
                engine.send_passive_quote_unchecked(bid_price, ask_price, 5.0);
            }
        }
    }
}

fn main() -> Result<(), VertexError> {
    let mut runtime = VertexEngine::new("equinix_ny4_fpga")?;
    runtime.run_strategy::<HighFrequencyMarketMaker>()
}`,

  fix: `// FIX 4.4 Direct Market Access Order Placement
8=FIX.4.4|9=178|35=D|49=VERTEX_CLIENT_NY4|56=CME_AURORA|34=1042|52=20261030-10:02:19.418|
11=ORD_99182a4|1=ACCOUNT_PROP_ALPHA|21=1|55=BTC/USD|54=1|38=5.0000|40=2|44=98420.50|
59=0|60=20261030-10:02:19.418|10=084|

// CME Execution Report Response [Filled in 11.2μs]
8=FIX.4.4|9=214|35=8|49=CME_AURORA|56=VERTEX_CLIENT_NY4|34=8891|52=20261030-10:02:19.429|
11=ORD_99182a4|37=CME_FILL_7721|150=2|39=2|55=BTC/USD|54=1|38=5.0000|44=98420.50|
32=5.0000|31=98420.50|151=0.0000|14=5.0000|6=98420.50|10=192|`,

  typescript: `import { VertexClient, OrderBook, SmartOrderRouter } from '@vertex/quant'

const client = new VertexClient({
  apiKey: process.env.VERTEX_API_KEY,
  endpoint: 'wss://dma-ny4.vertex.markets/v2/stream',
  kernelBypass: true,
})

// Stream institutional L2 order books with 0ms buffering
client.on('orderBook:update', (book: OrderBook) => {
  const spreadBps = book.getSpreadBasisPoints()
  
  if (spreadBps > 10.0) {
    SmartOrderRouter.executeTwap({
      symbol: 'SOL-USDC',
      side: 'BUY',
      quantity: 500,
      durationSeconds: 15,
      maxSlippageBps: 1.5,
      venues: ['coinbase_prime', 'binance_vip', 'bybit']
    })
  }
})`
}

export function CodePlayground() {
  const { toast } = useToast()
  const [lang, setLang] = useState<'python' | 'rust' | 'fix' | 'typescript'>('python')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[lang])
    setCopied(true)
    toast('Strategy code copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="strategies" className="relative border-t border-white/10 bg-[#080808] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* Left copy */}
          <div>
            <div className="flex items-center gap-2">
              <span className="section-kicker">Developer Ergonomics</span>
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-rose-300">
                QUANT SDK V3.2
              </span>
            </div>
            <h2 className="mt-5 text-4xl font-medium tracking-[-0.06em] text-white sm:text-6xl">
              Research in Python. Execute in microsecond Rust.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/60">
              Vertex eliminates the disconnect between quantitative backtesting and low-latency production execution.
              Code your alpha in clean Python, and our compiler automatically lowers your execution logic into zero-copy,
              FPGA-compatible binary loops.
            </p>

            {/* Feature bullets */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-rose-300">
                  <Zap className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Solarflare Kernel Bypass &amp; Direct Memory Access</h4>
                  <p className="text-xs text-white/50 mt-0.5">
                    Orders bypass operating system kernel networking stacks entirely, achieving sub-12 microsecond tick-to-trade.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-rose-300">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Nanosecond SEC Rule 15c3-5 Pre-Trade Risk Checks</h4>
                  <p className="text-xs text-white/50 mt-0.5">
                    Hard hardware gates verify price limits, order quantities, and margin collateral before packets hit the fiber.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-rose-300">
                  <TrendingUp className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Multi-Venue Smart Order Routing (SOR)</h4>
                  <p className="text-xs text-white/50 mt-0.5">
                    Atomic dual-leg fills across fragmented order books with zero adverse selection and zero residual leg risk.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right code terminal */}
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0d] shadow-2xl">
            {/* Terminal Top Bar with language tabs */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#101014] px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 mr-2">
                  <div className="size-2.5 rounded-full bg-white/20" />
                  <div className="size-2.5 rounded-full bg-white/20" />
                  <div className="size-2.5 rounded-full bg-white/20" />
                </div>

                <div className="flex rounded-lg bg-black/40 p-0.5 border border-white/10">
                  {(['python', 'rust', 'fix', 'typescript'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setLang(tab)}
                      className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded transition ${
                        lang === tab
                          ? 'bg-white/15 text-white font-semibold shadow'
                          : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {tab === 'typescript' ? 'TS' : tab}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="group flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white transition"
              >
                {copied ? (
                  <>
                    <Check className="size-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3 text-white/40 group-hover:text-white" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-6 overflow-x-auto text-xs font-mono leading-relaxed text-white/85 max-h-[460px]">
              <pre className="text-white/80">
                <code>{codeSnippets[lang]}</code>
              </pre>
            </div>

            {/* Bottom info footer */}
            <div className="flex items-center justify-between border-t border-white/10 bg-[#0d0d10] px-6 py-2.5 text-[11px] font-mono text-white/45">
              <span>Compiler: Zero-Allocation DMA Target</span>
              <span className="text-emerald-400">● FPGA Co-Location Verified · Latency: 11.2μs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
