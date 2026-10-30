'use client'

import React from 'react'
import { Sparkles, Quote, TrendingUp } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Vertex reduced our execution latency by 85% and eliminated adverse selection on our market making desk. The FPGA kernel bypass in NY4 alone has saved our fund seven figures in slippage.',
    author: 'Dr. Julian Thorne',
    role: 'Chief Risk Officer',
    company: 'Apex Quantitative Partners',
    stats: '85% Latency Reduction',
  },
  {
    quote:
      'We run $800M AUM across 40 automated statistical arbitrage swarms. Vertex’s hardware pre-trade risk checks have safely absorbed every major flash crash without a single margin breach.',
    author: 'Elena Rostova',
    role: 'Head of Automated Trading',
    company: 'Citadel Alpha Labs',
    stats: '$4.8B Daily Turnover',
  },
  {
    quote:
      'The seamless transition from Python research to zero-allocation Rust production execution cut our strategy time-to-market from four months to under two days.',
    author: 'Marcus Vance',
    role: 'Managing Director & CIO',
    company: 'Quantica Capital',
    stats: '4.18 Sharpe Ratio',
  },
]

const logos = [
  'APEX QUANT', 'CITADEL ALPHA', 'JUMP LIQUIDITY', 'HYPERDRIVE', 'QUANTICA', 'OPTIVER TRADE'
]

export function Testimonials() {
  return (
    <section className="relative border-b border-white/10 bg-[#080808] px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/70">
            <Sparkles className="size-3 text-rose-300" />
            <span>PROVEN IN PRODUCTION</span>
          </div>
          <h2 className="mt-5 text-4xl font-medium tracking-[-0.06em] text-white sm:text-5xl">
            Trusted by the firms defining the algorithmic frontier.
          </h2>
        </div>

        {/* Logo Cloud Strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-50">
          {logos.map((logo) => (
            <span
              key={logo}
              className="font-mono text-sm sm:text-base font-bold tracking-[0.25em] text-white/70 hover:text-white transition cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>

        {/* Testimonials Cards Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0a0d] p-7 transition hover:border-white/20 hover:bg-[#101015]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-rose-300/30 bg-rose-950/30 px-3 py-0.5 text-xs font-mono text-rose-200">
                    {t.stats}
                  </span>
                  <Quote className="size-5 text-white/20" />
                </div>
                <p className="mt-6 text-sm leading-relaxed text-white/75">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-4">
                <h4 className="text-sm font-medium text-white">{t.author}</h4>
                <p className="text-xs text-white/50">{t.role} · {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
