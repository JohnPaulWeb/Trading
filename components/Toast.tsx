'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      removeToast(id)
    }, 3800)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
              t.type === 'success'
                ? 'bg-[#0e1610]/95 border-emerald-500/30 text-emerald-200'
                : t.type === 'error'
                ? 'bg-[#1a0c0c]/95 border-rose-500/30 text-rose-200'
                : 'bg-[#0f1118]/95 border-blue-500/30 text-blue-200'
            }`}
          >
            {t.type === 'success' && <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />}
            {t.type === 'error' && <AlertCircle className="size-4 text-rose-400 shrink-0" />}
            {t.type === 'info' && <Info className="size-4 text-blue-400 shrink-0" />}
            <p className="text-xs font-medium leading-relaxed">{t.message}</p>
            <button
              onClick={() => removeToast(t.id)}
              className="ml-auto text-white/40 hover:text-white p-0.5 rounded transition"
              aria-label="Dismiss toast"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

