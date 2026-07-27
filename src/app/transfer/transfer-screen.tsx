'use client'

import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Input, InputGroup } from '@/components/input'
import { Select } from '@/components/select'
import { Detail, PageHero, Stepper } from '@/components/portal/portal-ui'
import { ToastStack, usePortalToasts } from '@/components/portal/toast'
import clsx from 'clsx'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const PLANS: { id: string; price: number; facilities: number; popular?: boolean }[] = [
  { id: 'Silver', price: 18.5, facilities: 984 },
  { id: 'Gold', price: 20.0, facilities: 1844, popular: true },
  { id: 'Titanium', price: 35.0, facilities: 1844 },
]

const PLAN_PRICE: Record<string, number> = { Silver: 18.5, Gold: 20, Titanium: 35 }

export function TransferScreen() {
  const router = useRouter()
  const { toasts, addToast } = usePortalToasts()
  const [step, setStep] = useState(0)
  const [payrollNo, setPayrollNo] = useState('')
  const [state, setState] = useState('')
  const [employer, setEmployer] = useState('')
  const [suburb, setSuburb] = useState('Sydney, NSW, 2000')
  const [plan, setPlan] = useState('Titanium')
  const [cycle, setCycle] = useState('Fortnightly')
  const [bankName, setBankName] = useState('Commonwealth Bank')
  const [accountName, setAccountName] = useState('FP Employee')
  const [bsb, setBsb] = useState('062-001')
  const [accountNumber, setAccountNumber] = useState('0000 1234')

  const canStep0 = payrollNo && state && employer && suburb

  return (
    <div>
      <PageHero eyebrow="Manage Membership" title="Transfer to new employer" subtitle="Move your Fitness Passport membership to a new workplace." />

      <div className="mx-auto max-w-4xl rounded-xl border border-zinc-950/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-900">
        <Stepper steps={['Employer', 'Membership package', 'Payment details']} current={step} />

        {step === 0 && (
          <div>
            <h3 className="mt-0 mb-3 text-base font-bold text-zinc-950 dark:text-white">New employer details</h3>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <Label>Employee / Payroll #</Label>
                <Input value={payrollNo} onChange={(e) => setPayrollNo(e.target.value)} placeholder="e.g. EMP-1042" />
              </Field>
              <Field>
                <Label>Employer state</Label>
                <Select value={state} onChange={(e) => setState(e.target.value)}>
                  <option value="">Select a state</option>
                  {['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Select>
              </Field>
              <Field>
                <Label>Employer</Label>
                <InputGroup>
                  <MagnifyingGlassIcon data-slot="icon" />
                  <Input value={employer} onChange={(e) => setEmployer(e.target.value)} placeholder="Search by name…" />
                </InputGroup>
              </Field>
              <Field>
                <Label>Workplace suburb</Label>
                <Input value={suburb} onChange={(e) => setSuburb(e.target.value)} />
              </Field>
            </div>
            <div className="mt-5.5 flex justify-between gap-2">
              <Button outline onClick={() => router.push('/')}>
                <ArrowLeftIcon /> Cancel
              </Button>
              <Button
                disabled={!canStep0}
                onClick={() => (canStep0 ? setStep(1) : addToast('Please complete all required fields.'))}
              >
                Next <ArrowRightIcon />
              </Button>
            </div>
            {!canStep0 && payrollNo === '' && (
              <div className="mt-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                <InformationCircleIcon className="mr-1 inline size-3 align-middle" />
                You&apos;ll need your new payroll number and employer name to continue.
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 className="mt-0 mb-3 text-base font-bold text-zinc-950 dark:text-white">Pick your membership package</h3>
            <div className="grid grid-cols-3 gap-3">
              {PLANS.map((p) => {
                const sel = plan === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setPlan(p.id)}
                    className={clsx(
                      'relative rounded-xl border-2 p-4 text-left transition-shadow hover:shadow-md',
                      sel ? 'border-fp-blue bg-fp-blue/5' : 'border-zinc-950/10 bg-white dark:border-white/10 dark:bg-zinc-900'
                    )}
                  >
                    {p.popular && (
                      <span className="absolute -top-2.5 left-3 rounded-full bg-fp-blue px-2 py-0.5 text-[11px] font-semibold text-white">
                        Most popular
                      </span>
                    )}
                    <div className="text-xs font-bold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">{p.id}</div>
                    <div className="mt-1 text-xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                      ${p.price.toFixed(2)} <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">/week</span>
                    </div>
                    <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{p.facilities.toLocaleString()} facilities included</div>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span
                        className={clsx(
                          'flex size-4.5 items-center justify-center rounded-full border-2',
                          sel ? 'border-fp-blue bg-fp-blue' : 'border-zinc-950/20 dark:border-white/20'
                        )}
                      >
                        {sel && <CheckIcon className="size-3 text-white" />}
                      </span>
                      <span className="text-sm font-semibold text-zinc-950 dark:text-white">{sel ? 'Selected' : 'Choose this plan'}</span>
                    </div>
                  </button>
                )
              })}
            </div>
            <Field className="mt-4">
              <Label>Billing cycle</Label>
              <div className="mt-1.5 flex gap-2">
                {['Weekly', 'Fortnightly', 'Monthly'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCycle(c)}
                    className={clsx(
                      'rounded-lg border px-3 py-1.5 text-xs font-semibold',
                      cycle === c
                        ? 'border-fp-blue bg-fp-blue text-white'
                        : 'border-zinc-950/10 text-zinc-950 hover:bg-zinc-950/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5'
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Field>
            <div className="mt-5.5 flex justify-between gap-2">
              <Button outline onClick={() => setStep(0)}>
                <ArrowLeftIcon /> Back
              </Button>
              <Button onClick={() => setStep(2)}>
                Next <ArrowRightIcon />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="mt-0 mb-1 text-base font-bold text-zinc-950 dark:text-white">Direct debit details</h3>
            <p className="mt-0 mb-3 text-sm text-zinc-500 dark:text-zinc-400">Your billing transfers seamlessly — no missed payments.</p>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <Label>Bank name</Label>
                <Input value={bankName} onChange={(e) => setBankName(e.target.value)} />
              </Field>
              <Field>
                <Label>Account name</Label>
                <Input value={accountName} onChange={(e) => setAccountName(e.target.value)} />
              </Field>
              <Field>
                <Label>BSB</Label>
                <Input className="font-mono" value={bsb} onChange={(e) => setBsb(e.target.value)} />
              </Field>
              <Field>
                <Label>Account number</Label>
                <Input className="font-mono" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
              </Field>
            </div>

            <div className="mt-4 rounded-xl bg-zinc-950/[0.03] p-3.5 dark:bg-white/5">
              <div className="mb-2 text-xs font-bold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">Summary</div>
              <div className="grid grid-cols-2 gap-2.5">
                <Detail label="New employer" value={employer || '—'} />
                <Detail label="Plan" value={`${plan} · $${PLAN_PRICE[plan].toFixed(2)}/wk`} />
                <Detail label="Cycle" value={cycle} />
                <Detail label="First debit" value="On your next pay date" />
              </div>
            </div>

            <div className="mt-5.5 flex justify-between gap-2">
              <Button outline onClick={() => setStep(1)}>
                <ArrowLeftIcon /> Back
              </Button>
              <Button
                onClick={() => {
                  addToast('Transfer submitted! We sent a confirmation email.')
                  router.push('/')
                }}
              >
                <CheckIcon /> Submit transfer
              </Button>
            </div>
          </div>
        )}
      </div>
      <ToastStack toasts={toasts} />
    </div>
  )
}
