'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, TrendingUp, Terminal, Shield, Zap } from 'lucide-react'

interface NavbarProps {
  onOpenDeploy: () => void
  onOpenAuth: () => void
}

const marketTickers = [
  { pair: 'BTC/USD', price: '$98,420.50', change: '+3.42%', up: true },
  { pair: 'ETH/USD', price: '$3,480.20', change: '+2.18%', up: true },
  { pair: 'SOL/USD', price: '$218.60', change: '+6.14%', up: true },
  { pair: 'NVDA', price: '$148.90', change: '+1.85%', up: true },
  { pair: 'SPY', price: '$592.80', change: '+0.54%', up: true },
  { pair: 'CME_ES', price: '5,948.25', change: '+0.48%', up: true },
  { pair: 'EUR/USD', price: '1.0842', change: '-0.12%', up: false },
]

export function Navbar({ onOpenDeploy, onOpenAuth }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Terminal', href: '#terminal' },
    { label: 'Strategies', href: '#strategies' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Execution', href: '#execution' },
    { label: 'Co-Location', href: '#infra' },
    { label: 'Venues', href: '#venues' },
    { label: 'Fee Schedule', href: '#pricing' },
    { label: 'Security', href: '#security' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Top Real-Time Market Ticker Ribbon */}
      <div className="bg-[#020202] border-b border-white/10 px-4 py-1.5 overflow-x-auto whitespace-nowrap text-[11px] font-mono scrollbar-none flex items-center justify-between gap-6">
        <div className="flex items-center gap-6 animate-pulse-slow">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>GLOBAL MARKETS OPEN</span>
          </div>

          <div className="flex items-center gap-6 text-white/70">
            {marketTickers.map((t) => (
              <div key={t.pair} className="inline-flex items-center gap-1.5">
                <span className="text-white/40">{t.pair}</span>
                <span className="text-white font-medium">{t.price}</span>
                <span className={t.up ? 'text-emerald-400' : 'text-rose-400'}>
                  {t.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-white/50 text-[10px]">
          <span>NY4 TICK-TO-TRADE: <strong className="text-emerald-400">11.4μs</strong></span>
          <span>·</span>
          <span>LD4 REBATE: <strong className="text-rose-300">-0.002%</strong></span>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/60'
            : 'bg-[#050505]/75 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 lg:px-12">
          {/* Brand Logo & Status */}
          <div className="flex items-center gap-4">
            <a
              href="#top"
              className="flex items-center gap-2 text-xl font-semibold tracking-[-0.06em] text-white hover:opacity-90 transition sm:text-2xl"
            >
              <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-purple-600 text-white font-mono font-bold text-sm shadow-[0_0_15px_rgba(255,90,120,0.4)]">
                V
              </div>
              <span className="bg-gradient-to-r from-white via-white to-white/75 bg-clip-text text-transparent">
                VERTEX
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300/90 font-medium">
                MARKETS
              </span>
              <sup className="text-[8px] font-mono text-white/40">TM</sup>
            </a>

            <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/30 px-2.5 py-0.5 text-[10px] font-mono text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>140+ VENUES ROUTING</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-6 text-sm text-white/70 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 text-xs font-medium uppercase tracking-wider transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-rose-400 transition-all duration-200 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 text-sm">
            <button
              onClick={onOpenAuth}
              className="hidden text-white/75 transition hover:text-white sm:block px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider hover:bg-white/5"
            >
              Client Portal
            </button>
            <button
              onClick={onOpenDeploy}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-rose-100 hover:shadow-[0_0_24px_rgba(255,180,200,0.4)] sm:px-5 sm:py-2.5"
            >
              <TrendingUp className="size-3.5 text-rose-600 transition-transform group-hover:scale-110" />
              <span>Launch Terminal</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center p-2 text-white/80 hover:text-white lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#080808]/98 backdrop-blur-2xl px-6 py-6 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Trading Platform</span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
                <span className="size-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Tick-to-Trade: 11.4μs</span>
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-white transition py-1 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="size-4 text-white/30" />
              </a>
            ))}

            <div className="mt-4 flex flex-col gap-2.5 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenAuth()
                }}
                className="w-full rounded-xl border border-white/20 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition"
              >
                Client Portal Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenDeploy()
                }}
                className="w-full rounded-xl bg-white py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-rose-100 transition shadow-lg flex items-center justify-center gap-2"
              >
                <TrendingUp className="size-4 text-rose-600" />
                <span>Launch Algorithmic Terminal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
