'use client'

import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { PageHero, SectionHeader } from '@/components/portal/portal-ui'
import { ToastStack, usePortalToasts } from '@/components/portal/toast'
import { CheckIcon, PencilIcon, ShieldCheckIcon } from '@/components/material-icons'
import { useState } from 'react'

const UPCOMING = [
  { date: '02 Jun 2026', amount: 70.0, note: 'Fortnightly debit' },
  { date: '16 Jun 2026', amount: 70.0, note: 'Fortnightly debit' },
  { date: '30 Jun 2026', amount: 70.0, note: 'Fortnightly debit' },
]

export function DirectDebitScreen() {
  const { toasts, addToast } = usePortalToasts()
  const [editing, setEditing] = useState(false)
  const [bankName, setBankName] = useState('Commonwealth Bank')
  const [accountName, setAccountName] = useState('FP Employee')
  const [bsb, setBsb] = useState('062-001')
  const [accountNumber, setAccountNumber] = useState('0000 1234')

  return (
    <div>
      <PageHero eyebrow="Payments & Contracts" title="Direct debit details" subtitle="Where we send your fortnightly debit." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
          <SectionHeader
            title="Bank account on file"
            action={
              editing ? (
                <div className="flex gap-2">
                  <Button outline className="text-xs" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="text-xs"
                    onClick={() => {
                      setEditing(false)
                      addToast('Bank details updated.')
                    }}
                  >
                    <CheckIcon /> Save
                  </Button>
                </div>
              ) : (
                <Button outline className="text-xs" onClick={() => setEditing(true)}>
                  <PencilIcon /> Edit
                </Button>
              )
            }
          />
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <Label>Bank name</Label>
              <Input value={bankName} onChange={(e) => setBankName(e.target.value)} disabled={!editing} />
            </Field>
            <Field>
              <Label>Account name</Label>
              <Input value={accountName} onChange={(e) => setAccountName(e.target.value)} disabled={!editing} />
            </Field>
            <Field>
              <Label>BSB</Label>
              <Input className="font-mono" value={bsb} onChange={(e) => setBsb(e.target.value)} disabled={!editing} />
            </Field>
            <Field>
              <Label>Account number</Label>
              <Input className="font-mono" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} disabled={!editing} />
            </Field>
          </div>
          <div className="mt-3.5 border-t border-zinc-950/10 pt-3.5 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
            <ShieldCheckIcon className="mr-1 inline size-3 align-middle" />
            Bank details are encrypted and only used for Fitness Passport debits. We&apos;re a DDR Service Agreement participant
            (ID 422345).
          </div>
        </div>

        <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
          <h2 className="mt-0 mb-3 text-sm font-bold text-zinc-950 dark:text-white">Upcoming charges</h2>
          <div className="grid gap-2.5">
            {UPCOMING.map((u, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-zinc-950/10 py-2 last:border-b-0 dark:border-white/10"
              >
                <div>
                  <div className="text-sm font-semibold text-zinc-950 dark:text-white">{u.date}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{u.note}</div>
                </div>
                <div className="font-bold text-zinc-950 dark:text-white">${u.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastStack toasts={toasts} />
    </div>
  )
}
