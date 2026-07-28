'use client'

import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import { useRef, useState } from 'react'

export function VerifyCodeModal({
  open,
  method,
  destination,
  onClose,
  onVerify,
}: {
  open: boolean
  method: string
  destination: string
  onClose: () => void
  onVerify: () => void
}) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handle = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return
    const c = [...code]
    c[i] = v
    setCode(c)
    if (v && i < 5) refs.current[i + 1]?.focus()
  }
  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) refs.current[i - 1]?.focus()
  }
  const full = code.join('')

  return (
    <Dialog open={open} onClose={onClose} size="xs">
      <DialogTitle>Verify your identity</DialogTitle>
      <DialogBody>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          We sent a 6-digit code via {method} to <strong className="text-zinc-950 dark:text-white">{destination}</strong>.
        </p>
        <div className="my-5 flex justify-center gap-2">
          {code.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el
              }}
              value={d}
              onChange={(e) => handle(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              maxLength={1}
              inputMode="numeric"
              aria-label={`Verification code digit ${i + 1} of 6`}
              className="size-11 rounded-lg border border-zinc-950/10 bg-transparent text-center text-lg font-bold text-zinc-950 focus:border-fp-blue focus:ring-2 focus:ring-fp-blue/30 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          ))}
        </div>
        <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Didn&apos;t receive a code?{' '}
          <a href="#" className="font-semibold text-fp-blue">
            Resend
          </a>
        </div>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={full.length < 6} onClick={onVerify}>
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  )
}
