'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    q: 'How does Vertex achieve sub-12 microsecond tick-to-trade execution latency?',
    a: 'Vertex execution nodes are physically co-located in Equinix NY4, LD4, and CME Aurora with direct optical fiber cross-connects into venue matching engines. We utilize Solarflare OpenOnload kernel bypass drivers, Xilinx UltraScale+ FPGA hardware market data decoders, and zero-allocation binary runtimes to eliminate operating system context-switch overhead.',
  },
  {
    q: 'Does Vertex ever hold custody or have withdrawal access to trading capital?',
    a: 'Never. Vertex operates on a strictly non-custodial architecture. Clients connect via API keys or FIX sessions where withdrawal privileges are explicitly barred and locked to dedicated co-located IP addresses. For spot crypto and cross-venue settlement, we integrate natively with institutional MPC custodians like Fireblocks and Copper ClearLoop.',
  },
  {
    q: 'How does the backtesting engine prevent overfitting and lookahead bias?',
    a: 'Our historical replay engine reconstructs full Level 3 (L3) tick-by-tick order book depth rather than aggregated OHLCV bars. It accurately computes your queue position in exchange FIFO order books, calculates taker fee tiers and maker rebates, and models market impact and execution latency slippage based on real-world order book depth.',
  },
  {
    q: 'What occurs during a market flash crash or extreme liquidity drain?',
    a: 'Vertex embeds hardware pre-trade circuit breakers that evaluate every order in 40 nanoseconds before it leaves the server. If an instrument’s spread widens past custom thresholds, or if cumulative strategy drawdown reaches your circuit cap, all open quotes are instantly cancelled, active positions are flattened, and automated alerts are dispatched to your risk desk.',
  },
  {
    q: 'Can we deploy proprietary alpha strategies without exposing our code or IP?',
    a: 'Yes. Quantitative algorithms compile into isolated bare-metal micro-enclaves protected by AMD SEV-SNP hardware memory encryption. Neither Vertex engineers nor host hypervisors can inspect strategy logic, weight matrices, or model parameters.',
  },
  {
    q: 'How does Smart Order Routing (SOR) eliminate multi-leg execution risk?',
    a: 'Our smart order router calculates fiber transit times across data centers to calibrate packet dispatch. For cross-venue basis arbitrage (e.g. Coinbase Spot vs CME Futures), child orders are timed to strike disparate exchange matching engines at the identical microsecond, eliminating adverse selection and unhedged leg exposure.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="relative border-t border-white/10 bg-[#080808] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/70">
            <HelpCircle className="size-3 text-rose-300" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="mt-5 text-4xl font-medium tracking-[-0.06em] text-white sm:text-5xl">
            Everything you need to know about Vertex.
          </h2>
        </div>

        {/* Accordion List */}
        <div className="mt-14 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0d] transition hover:border-white/20"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-medium text-white">{faq.q}</span>
                  <ChevronDown
                    className={`size-4 text-white/50 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-rose-300' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-white/5 px-6 pb-6 pt-3 text-sm leading-relaxed text-white/60">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
