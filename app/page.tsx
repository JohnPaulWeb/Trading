'use client'

import React from 'react'
import { ToastProvider } from '@/components/Toast'
import { TradingViewTerminal } from '@/components/trading/TradingViewTerminal'

export default function Page() {
  return (
    <ToastProvider>
      <TradingViewTerminal />
    </ToastProvider>
  )
}
