'use client'

import React from 'react'
import { ShieldCheck, Lock, FileCheck, Key, Server, EyeOff, ArrowUpRight } from 'lucide-react'
import { useToast } from './Toast'

interface SecuritySectionProps {
  onOpenDeploy: () => void
}

const securityBadges = [
  {
    title: 'Zero Withdrawal Permissions',
    desc: 'API keys are strictly constrained to Read & Trade operations. Withdrawal permissions are cryptographically barred with mandatory IP whitelisting.',
    icon: Lock,
  },
  {
    title: 'SEC Rule 15c3-5 Risk Compliance',
    desc: 'Deterministic pre-trade risk controls enforce capital thresholds, price collars, and credit boundaries at the hardware layer in 40ns.',
    icon: ShieldCheck,
  },
  {
    title: 'SOC 2 Type II Certified & ISO 27001',
    desc: 'Independently audited annually by Big-Four compliance firms verifying continuous multi-tenant isolation and fail-safe redundancy.',
    icon: FileCheck,
  },
  {
    title: 'MPC Custody & Settlement Layer',
    desc: 'Native integration with Fireblocks, Anchorage Digital, and Copper ClearLoop for off-exchange institutional settlement with zero credit risk.',
    icon: Key,
  },
]

export function SecuritySection({ onOpenDeploy }: SecuritySectionProps) {
  const { toast } = useToast()

  const handleDownloadDDQ = () => {
    toast('Institutional Due Diligence Questionnaire (DDQ) downloaded!')
  }

  return (
    <section id="security" className="border-t border-white/10 bg-[#f1ede8] px-6 py-24 text-[#0a0a0a] lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        {/* Header Grid */}
        <div className="grid max-w-[1440px] items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2">
              <span className="section-kicker !text-black/60">05 / Custody &amp; Security</span>
              <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-mono text-black font-semibold">
                NON-CUSTODIAL
              </span>
            </div>
            <h2 className="mt-5 max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.07em] sm:text-7xl">
              Institutional security for mission-critical capital.
            </h2>
            <p className="mt-5 max-w-2xl text-base text-black/70">
              When software executes millions of trades across global liquidity pools, security cannot be an afterthought.
              Vertex is architected to guarantee zero custodial risk and non-bypassable pre-trade controls.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownloadDDQ}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black transition hover:bg-black/5"
            >
              <span>Download Institutional DDQ</span>
              <ArrowUpRight className="size-4" />
            </button>
            <button
              onClick={onOpenDeploy}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-rose-950"
            >
              <span>Speak to Risk Desk</span>
              <span className="ml-1">↗</span>
            </button>
          </div>
        </div>

        {/* Security Cards Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {securityBadges.map((badge) => {
            const Icon = badge.icon
            return (
              <div
                key={badge.title}
                className="rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur-sm transition hover:bg-white/90 shadow-sm"
              >
                <div className="flex size-9 items-center justify-center rounded-lg bg-black text-white">
                  <Icon className="size-4" />
                </div>
                <h3 className="mt-5 text-base font-medium tracking-tight text-black">{badge.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-black/65">{badge.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
