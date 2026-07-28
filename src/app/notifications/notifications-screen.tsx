'use client'

import { Button } from '@/components/button'
import { PageHero } from '@/components/portal/portal-ui'
import { NOTIFICATIONS } from '@/data-portal'
import { CheckBadgeIcon, CheckCircleIcon, CreditCardIcon } from '@/components/material-icons'
import clsx from 'clsx'
import { useState } from 'react'

const ICONS = { success: CheckCircleIcon, info: CreditCardIcon } as const
const TONE = { success: 'text-green-600 dark:text-green-400', info: 'text-fp-blue' } as const

export function NotificationsScreen() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const filtered = NOTIFICATIONS.filter((n) => filter === 'all' || n.unread)
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length

  return (
    <div>
      <PageHero eyebrow="Account" title="Notifications" subtitle="Updates from Fitness Passport and your employer." />
      <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex gap-1">
            {(['all', 'unread'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={clsx(
                  'rounded-lg px-2.5 py-1.5 text-xs font-semibold capitalize',
                  filter === f
                    ? 'bg-fp-blue text-white'
                    : 'text-zinc-600 hover:bg-zinc-950/5 dark:text-zinc-400 dark:hover:bg-white/5'
                )}
              >
                {f}
                {f === 'unread' && (
                  <span className="ml-1 rounded-full bg-fp-blue px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
          <Button plain className="text-xs">
            <CheckBadgeIcon /> Mark all read
          </Button>
        </div>
        <div className="grid gap-1">
          {filtered.map((n, i) => {
            const Icon = ICONS[n.kind]
            return (
              <div
                key={i}
                className={clsx(
                  'flex items-start gap-3 rounded-lg p-3',
                  n.unread ? 'bg-fp-blue/5' : 'bg-transparent'
                )}
              >
                <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-white dark:bg-zinc-800">
                  <Icon className={clsx('size-4', TONE[n.kind])} />
                </span>
                <div className="flex-1">
                  <div className={clsx('text-sm text-zinc-950 dark:text-white', n.unread ? 'font-semibold' : 'font-medium')}>
                    {n.text}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{n.date}</div>
                </div>
                {n.unread && <span className="mt-3 size-2 flex-none rounded-full bg-fp-blue" />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
