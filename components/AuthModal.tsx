'use client'

import React, { useState } from 'react'
import { X, TrendingUp, Mail, CheckCircle2, ShieldCheck, Key } from 'lucide-react'
import { useToast } from './Toast'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sentMagicLink, setSentMagicLink] = useState(false)

  if (!isOpen) return null

  const handleOAuth = (provider: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast(`Authenticated with ${provider} successfully!`)
      onClose()
    }, 900)
  }

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast('Please enter a valid fund or work email', 'error')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSentMagicLink(true)
      toast(`Authentication link dispatched to ${email}`)
    }, 800)
  }

  const handleClose = () => {
    setSentMagicLink(false)
    setEmail('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-[#0d0d12] p-6 shadow-2xl sm:p-8">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition"
          aria-label="Close authentication modal"
        >
          <X className="size-5" />
        </button>

        {!sentMagicLink ? (
          <div>
            <div className="text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-rose-300">
                INSTITUTIONAL CLIENT PORTAL
              </span>
              <h3 className="mt-2 text-2xl font-medium text-white">Sign in to Vertex</h3>
              <p className="mt-1 text-xs text-white/60">
                Manage your co-located execution nodes, API keys, and risk monitors.
              </p>
            </div>

            {/* SSO & Hardware Keys */}
            <div className="mt-6 space-y-2.5">
              <button
                onClick={() => handleOAuth('Okta / SAML SSO')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition disabled:opacity-50"
              >
                <ShieldCheck className="size-4 text-emerald-400" />
                <span>Single Sign-On (Okta / SAML)</span>
              </button>

              <button
                onClick={() => handleOAuth('YubiKey / WebAuthn')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition disabled:opacity-50"
              >
                <Key className="size-4 text-rose-300" />
                <span>Hardware Token (YubiKey / FIDO2)</span>
              </button>
            </div>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] font-mono text-white/40 uppercase">or fund email</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Email Magic Link Form */}
            <form onSubmit={handleMagicLink} className="space-y-3">
              <input
                type="email"
                required
                placeholder="trader@hedgefund.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:border-rose-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-white py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-rose-100 transition shadow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Mail className="size-3.5" />
                <span>Send Magic Portal Link</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="size-6" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-white">Check your institutional inbox</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              A cryptographically signed authentication link was delivered to <span className="text-white font-medium">{email}</span>.
            </p>

            <button
              onClick={handleClose}
              className="mt-6 w-full rounded-xl border border-white/20 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition"
            >
              Return to Terminal
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
