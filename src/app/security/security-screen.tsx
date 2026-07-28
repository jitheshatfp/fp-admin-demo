'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { VerifyCodeModal } from '@/components/portal/modals/verify-code-modal'
import { PageHero, SectionHeader } from '@/components/portal/portal-ui'
import { ToastStack, usePortalToasts } from '@/components/portal/toast'
import clsx from 'clsx'
import {
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  KeyIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
} from '@heroicons/react/16/solid'
import { ComputerDesktopIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

const SESSIONS = [
  { device: 'Chrome — macOS', when: 'Right now', place: 'Sydney, NSW', current: true, mobile: false },
  { device: 'Fitness Passport app', when: '2 hours ago', place: 'iPhone 15', current: false, mobile: true },
  { device: 'Chrome — Windows', when: 'Yesterday', place: 'Sydney, NSW', current: false, mobile: false },
]

export function SecurityScreen() {
  const { toasts, addToast } = usePortalToasts()
  const [method, setMethod] = useState<'email' | 'sms' | 'app'>('sms')
  const [phone, setPhone] = useState('+61 450 722 733')
  const [email, setEmail] = useState('marcus.delgado@example.com')
  const [dirty, setDirty] = useState(false)
  const [verify, setVerify] = useState<{ method: string; destination: string } | null>(null)

  const methods = [
    { id: 'email' as const, label: 'Email', icon: EnvelopeIcon, desc: `Receive codes at ${email}` },
    { id: 'sms' as const, label: 'SMS', icon: DevicePhoneMobileIcon, desc: `Receive codes at ${phone}` },
    {
      id: 'app' as const,
      label: 'Authenticator app',
      icon: KeyIcon,
      desc: 'Use TOTP (Google Authenticator, 1Password, Authy)',
      recommended: true,
    },
  ]

  return (
    <div>
      <PageHero eyebrow="Account" title="Security & access" subtitle="Multi-factor authentication keeps your membership safe." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
          <SectionHeader
            title="Multi-factor authentication"
            action={
              <Badge color="green">
                <ShieldCheckIcon className="size-3" /> Enabled
              </Badge>
            }
          />
          {methods.map((m) => {
            const sel = method === m.id
            return (
              <div
                key={m.id}
                onClick={() => {
                  setMethod(m.id)
                  setDirty(true)
                }}
                className={clsx(
                  'mb-2.5 grid cursor-pointer grid-cols-[auto_1fr_auto] items-start gap-3 rounded-xl border-2 p-3.5',
                  sel ? 'border-fp-blue bg-fp-blue/5' : 'border-zinc-950/10 bg-white dark:border-white/10 dark:bg-zinc-900'
                )}
              >
                <span
                  className={clsx(
                    'mt-0.5 flex size-4.5 items-center justify-center rounded-full border-2',
                    sel ? 'border-fp-blue bg-fp-blue' : 'border-zinc-950/20 dark:border-white/20'
                  )}
                >
                  {sel && <span className="size-2 rounded-full bg-white" />}
                </span>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <m.icon className={clsx('size-4', sel ? 'text-fp-blue' : 'text-zinc-500 dark:text-zinc-400')} />
                    <strong className="text-zinc-950 dark:text-white">{m.label}</strong>
                    {m.recommended && <Badge color="green">Recommended</Badge>}
                  </div>
                  <div className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">{m.desc}</div>
                  {sel && m.id !== 'app' && (
                    <Input
                      className="max-w-64"
                      value={m.id === 'email' ? email : phone}
                      onChange={(e) => {
                        if (m.id === 'email') setEmail(e.target.value)
                        else setPhone(e.target.value)
                        setDirty(true)
                      }}
                    />
                  )}
                  {sel && m.id === 'app' && (
                    <Button
                      className="text-xs"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        setVerify({ method: 'authenticator app', destination: 'your device' })
                      }}
                    >
                      Set up authenticator
                    </Button>
                  )}
                </div>
                <CheckCircleIcon className={clsx('size-4.5', sel ? 'text-fp-blue' : 'text-zinc-300 dark:text-zinc-600')} />
              </div>
            )
          })}

          <div className="mt-3.5 flex justify-between gap-2">
            <Button
              plain
              className="text-xs"
              onClick={() => setVerify({ method: method.toUpperCase(), destination: method === 'email' ? email : phone })}
            >
              <PaperAirplaneIcon /> Send test code
            </Button>
            <Button
              disabled={!dirty}
              onClick={() => {
                setDirty(false)
                addToast('MFA preferences saved.')
              }}
            >
              Save changes
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
          <h4 className="mt-0 mb-3 text-sm font-bold text-zinc-950 dark:text-white">Account & device activity</h4>
          {SESSIONS.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 border-b border-zinc-950/10 py-2 last:border-b-0 dark:border-white/10"
            >
              {s.mobile ? (
                <DevicePhoneMobileIcon className="size-4 flex-none text-fp-blue" />
              ) : (
                <ComputerDesktopIcon className="size-4 flex-none text-fp-blue" />
              )}
              <div className="flex-1">
                <div className="text-sm font-semibold text-zinc-950 dark:text-white">
                  {s.device} {s.current && <Badge color="green">This device</Badge>}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {s.when} · {s.place}
                </div>
              </div>
            </div>
          ))}
          <Button outline className="mt-3 w-full justify-center text-xs">
            Sign out of all other devices
          </Button>
        </div>
      </div>

      {verify && (
        <VerifyCodeModal
          open
          method={verify.method}
          destination={verify.destination}
          onClose={() => setVerify(null)}
          onVerify={() => {
            setVerify(null)
            addToast('Verified.')
          }}
        />
      )}
      <ToastStack toasts={toasts} />
    </div>
  )
}
