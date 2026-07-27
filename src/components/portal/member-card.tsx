'use client'

import clsx from 'clsx'
import JsBarcode from 'jsbarcode'
import { useEffect, useRef } from 'react'
import type { Member } from '@/data-portal'

const TIER_STYLES = {
  Silver: 'from-zinc-500 via-zinc-400 to-zinc-300',
  Gold: 'from-amber-600 via-amber-500 to-amber-300',
  Titanium: 'from-fp-blue-deep via-[#1a3a5c] to-[#2d4b6b]',
} as const

export type Tier = keyof typeof TIER_STYLES

function Barcode({ value, height = 44 }: { value: string; height?: number }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!ref.current) return
    JsBarcode(ref.current, value, {
      format: 'CODE128',
      width: 2.2,
      height,
      displayValue: false,
      margin: 0,
      background: 'transparent',
      lineColor: '#0e2a47',
    })
  }, [value, height])

  return <svg ref={ref} />
}

export function MemberCard({ member, tier = 'Titanium', large = false }: { member: Member; tier?: Tier; large?: boolean }) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl bg-gradient-to-br text-white shadow-xl',
        TIER_STYLES[tier],
        large ? 'p-7' : 'p-5'
      )}
    >
      <div className="pointer-events-none absolute -top-10 -right-10 size-56 rounded-full bg-white/8" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 size-72 rounded-full bg-white/6" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-7 -rotate-6 items-center justify-center rounded-md bg-white/20">
            <span className="text-xs font-extrabold tracking-tight">FP</span>
          </span>
          <div>
            <div className="text-[10px] font-semibold tracking-wider text-white/80 uppercase">Fitness</div>
            <div className="text-xs font-extrabold tracking-tight">passport.</div>
          </div>
        </div>
        <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
          ★ {tier}
        </span>
      </div>

      <div className="relative mt-4 flex items-center gap-3">
        <img
          src={member.photo}
          alt={member.name}
          className={clsx('rounded-full border-2 border-white/50 object-cover', large ? 'size-18' : 'size-15')}
        />
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold tracking-wider text-white/80 uppercase">
            {member.role === 'Primary' ? 'Primary Member' : member.role}
          </div>
          <div className={clsx('truncate font-extrabold tracking-tight', large ? 'text-xl' : 'text-lg')}>
            {member.name}
          </div>
          <div className="mt-0.5 text-[11px] text-white/85">
            Member #{member.memberNumber} · ID {member.memberId}
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex flex-col items-center gap-1.5 rounded-xl bg-white p-3">
        <Barcode value={member.memberId} height={large ? 56 : 44} />
        <div className="text-[10px] font-semibold tracking-widest text-fp-blue-deep/60">
          {member.memberId.match(/.{1,4}/g)?.join(' ')}
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between text-[11px] text-white/85">
        <span>Valid through {member.validThrough}</span>
        <span className="inline-flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-green-400" />
          Active
        </span>
      </div>
    </div>
  )
}

export function MiniMemberCard({ member, tier = 'Titanium' }: { member: Member; tier?: Tier }) {
  return (
    <div className={clsx('flex items-center gap-2 rounded-xl bg-gradient-to-br p-3.5 text-white', TIER_STYLES[tier])}>
      <img src={member.photo} alt="" className="size-10 rounded-full border-2 border-white/50 object-cover" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold">{member.name}</div>
        <div className="text-[10px] text-white/80">#{member.memberNumber}</div>
      </div>
    </div>
  )
}
