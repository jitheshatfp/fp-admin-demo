'use client'

import { CheckCircleIcon } from '@/components/material-icons'
import { useCallback, useState } from 'react'

type Toast = { id: number; text: string }

let nextId = 1

export function usePortalToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((text: string) => {
    const id = nextId++
    setToasts((t) => [...t, { id, text }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  return { toasts, addToast }
}

export function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed right-5 bottom-5 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 rounded-xl bg-fp-blue-deep px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          <CheckCircleIcon className="size-4 flex-none text-green-400" />
          {t.text}
        </div>
      ))}
    </div>
  )
}
