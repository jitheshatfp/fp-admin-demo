import clsx from 'clsx'
import { CheckIcon } from '@heroicons/react/16/solid'
import type { ComponentType, ReactNode, SVGProps } from 'react'

type IconType = ComponentType<SVGProps<SVGSVGElement>>

export function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-4.5 rounded-2xl bg-gradient-to-r from-fp-blue via-[#1b72d1] to-fp-blue-deep p-5 text-white sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          {eyebrow && <div className="mb-1 text-[11px] font-semibold tracking-wider text-white/85 uppercase">{eyebrow}</div>}
          <h1 className="truncate text-2xl font-extrabold tracking-tight">{title}</h1>
          {subtitle && <div className="mt-1 text-sm text-white/90">{subtitle}</div>}
        </div>
        {actions && <div className="flex flex-none items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center justify-between gap-2">
      <h3 className="text-sm font-bold text-zinc-950 dark:text-white">{title}</h3>
      {action}
    </div>
  )
}

const TONES = {
  info: 'bg-fp-blue/10 text-fp-blue',
  success: 'bg-green-500/15 text-green-700 dark:text-green-400',
  brand: 'bg-fp-blue-deep text-white',
  default: 'bg-zinc-950/5 text-zinc-600 dark:bg-white/5 dark:text-zinc-400',
}

export function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  tone = 'default',
}: {
  icon: IconType
  label: string
  value: ReactNode
  sub?: string
  tone?: keyof typeof TONES
}) {
  return (
    <div className="rounded-xl border border-zinc-950/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">{label}</span>
        <span className={clsx('flex size-6.5 flex-none items-center justify-center rounded-lg', TONES[tone])}>
          <Icon className="size-3.5" />
        </span>
      </div>
      <div className="text-xl font-extrabold tracking-tight text-zinc-950 dark:text-white">{value}</div>
      {sub && <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{sub}</div>}
    </div>
  )
}

export function QuickAction({ icon: Icon, label, onClick }: { icon: IconType; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-lg border border-zinc-950/10 bg-white px-3 py-2.5 text-left transition-shadow hover:shadow-md dark:border-white/10 dark:bg-zinc-900"
    >
      <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-fp-blue/10 text-fp-blue">
        <Icon className="size-4" />
      </span>
      <span className="text-sm font-semibold text-zinc-950 dark:text-white">{label}</span>
    </button>
  )
}

export function Detail({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="mb-0.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="text-sm font-semibold text-zinc-950 dark:text-white">{value}</div>
    </div>
  )
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="mb-5.5 flex items-center">
      {steps.map((step, i) => (
        <div key={step} className="contents">
          <div className="flex flex-col items-center gap-2">
            <div
              className={clsx(
                'flex size-7.5 items-center justify-center rounded-full border-2 text-sm font-bold',
                i <= current
                  ? 'border-fp-blue bg-fp-blue text-white'
                  : 'border-zinc-950/15 bg-white text-zinc-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-400'
              )}
            >
              {i < current ? <CheckIcon className="size-3.5" /> : i + 1}
            </div>
            <div
              className={clsx(
                'text-xs font-semibold',
                i <= current ? 'text-zinc-950 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
              )}
            >
              {step}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className={clsx('mx-2 mb-5.5 h-0.5 flex-1', i < current ? 'bg-fp-blue' : 'bg-zinc-950/15 dark:bg-white/15')} />
          )}
        </div>
      ))}
    </div>
  )
}

export function ContactRow({
  icon: Icon,
  title,
  sub,
  cta,
  onCta,
}: {
  icon: IconType
  title: string
  sub: string
  cta?: string
  onCta?: () => void
}) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-950/10 py-2.5 last:border-b-0 dark:border-white/10">
      <span className="flex size-9 flex-none items-center justify-center rounded-lg bg-fp-blue/10 text-fp-blue">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-zinc-950 dark:text-white">{title}</div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{sub}</div>
      </div>
      {cta && (
        <button
          onClick={onCta}
          className="flex-none rounded-lg bg-fp-blue px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-fp-blue/90"
        >
          {cta}
        </button>
      )}
    </div>
  )
}
