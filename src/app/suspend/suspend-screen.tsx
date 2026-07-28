'use client'

import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Detail, PageHero, StatCard, Stepper } from '@/components/portal/portal-ui'
import { ToastStack, usePortalToasts } from '@/components/portal/toast'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUturnLeftIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  HashtagIcon,
  InformationCircleIcon,
  LockClosedIcon,
  PaperAirplaneIcon,
  PauseCircleIcon,
  ReceiptPercentIcon,
} from '@/components/material-icons'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const GUIDELINES = [
  [CalendarIcon, 'Minimum 2 weeks, maximum 2 months at a time.'],
  [CalendarDaysIcon, 'Up to 2 months total suspension per calendar year.'],
  [LockClosedIcon, 'No facility access during the suspension period (start & end inclusive).'],
  [ArrowUturnLeftIcon, 'If any visit is made during the suspension, your membership reactivates automatically.'],
  [CurrencyDollarIcon, 'Suspension fee is $5 per fortnight (pro-rated), debited on your usual cycle.'],
  [PaperAirplaneIcon, 'You can also keep training — your card works at any of 1,844 facilities while you travel.'],
] as const

export function SuspendScreen() {
  const router = useRouter()
  const { toasts, addToast } = usePortalToasts()
  const [step, setStep] = useState(0)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [reason, setReason] = useState('')
  const [agreed, setAgreed] = useState(false)

  const days = start && end ? Math.max(0, Math.round((+new Date(end) - +new Date(start)) / 86400000) + 1) : 0
  const fortnights = Math.ceil(days / 14)
  const fee = fortnights * 5
  const validRange = days >= 14 && days <= 62

  return (
    <div>
      <PageHero eyebrow="Manage Membership" title="Suspend membership" subtitle="Pause access for travel, injury or any other reason." />

      <div className="mx-auto max-w-3xl rounded-xl border border-zinc-950/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-900">
        <Stepper steps={['Guidelines', 'Dates & reason', 'Review & confirm']} current={step} />

        {step === 0 && (
          <div>
            <h2 className="mt-0 mb-3 text-base font-bold text-zinc-950 dark:text-white">Before you suspend</h2>
            <div className="mb-4 grid gap-2">
              {GUIDELINES.map(([Icon, text]) => (
                <div key={text} className="flex items-center gap-2 rounded-lg bg-zinc-950/[0.03] px-2.5 py-2 dark:bg-white/5">
                  <Icon className="size-4 flex-none text-fp-blue" />
                  <span className="text-sm text-zinc-950 dark:text-white">{text}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-fp-blue/10 p-2.5 text-sm text-zinc-600 dark:text-zinc-300">
              <InformationCircleIcon className="mr-1 inline size-3.5 align-middle text-fp-blue" />
              Need a longer break or different terms?{' '}
              <a href="#" className="font-semibold text-fp-blue">
                Talk to support
              </a>
              .
            </div>
            <div className="mt-4.5 flex justify-between gap-2">
              <Button outline onClick={() => router.push('/')}>
                Cancel
              </Button>
              <Button onClick={() => setStep(1)}>
                Continue <ArrowRightIcon />
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="mt-0 mb-3 text-base font-bold text-zinc-950 dark:text-white">When would you like to pause?</h2>
            <div className="mb-3.5 grid grid-cols-2 gap-3">
              <Field>
                <Label>Start date</Label>
                <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
              </Field>
              <Field>
                <Label>End date</Label>
                <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
              </Field>
            </div>
            <Field>
              <Label>Reason (optional)</Label>
              <Select value={reason} onChange={(e) => setReason(e.target.value)}>
                <option value="">Select a reason</option>
                <option>Travel / holiday</option>
                <option>Injury or illness</option>
                <option>Work commitments</option>
                <option>Financial</option>
                <option>Other</option>
              </Select>
            </Field>

            {days > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                <StatCard
                  icon={CalendarDaysIcon}
                  label="Duration"
                  value={`${days} days`}
                  sub={validRange ? 'Within limits' : 'Outside allowed range'}
                  tone={validRange ? 'success' : 'default'}
                />
                <StatCard icon={HashtagIcon} label="Fortnights" value={fortnights.toString()} sub="Pro-rated" />
                <StatCard icon={ReceiptPercentIcon} label="Total fee" value={`$${fee.toFixed(2)}`} sub="Debited normally" tone="info" />
              </div>
            )}

            <div className="mt-5.5 flex justify-between gap-2">
              <Button outline onClick={() => setStep(0)}>
                <ArrowLeftIcon /> Back
              </Button>
              <Button disabled={!validRange} onClick={() => setStep(2)}>
                Review <ArrowRightIcon />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mt-0 mb-3 text-base font-bold text-zinc-950 dark:text-white">Confirm your suspension</h2>
            <div className="mb-3.5 rounded-xl bg-zinc-950/[0.03] p-4 dark:bg-white/5">
              <div className="grid grid-cols-2 gap-3.5">
                <Detail label="Start date" value={new Date(start).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })} />
                <Detail label="End date" value={new Date(end).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })} />
                <Detail label="Duration" value={`${days} days · ${fortnights} fortnights`} />
                <Detail label="Total fee" value={`$${fee.toFixed(2)}`} />
                <Detail label="Reason" value={reason || '—'} />
                <Detail label="Members paused" value="4 of 4" />
              </div>
            </div>
            <CheckboxField>
              <Checkbox checked={agreed} onChange={setAgreed} />
              <Label>
                I understand my entire family will lose access during this period, and I accept the $5/fortnight suspension fee.
              </Label>
            </CheckboxField>
            <div className="mt-4.5 flex justify-between gap-2">
              <Button outline onClick={() => setStep(1)}>
                <ArrowLeftIcon /> Back
              </Button>
              <Button
                disabled={!agreed}
                onClick={() => {
                  addToast('Suspension scheduled. We sent you a confirmation email.')
                  router.push('/')
                }}
              >
                <PauseCircleIcon /> Confirm suspension
              </Button>
            </div>
          </div>
        )}
      </div>
      <ToastStack toasts={toasts} />
    </div>
  )
}
