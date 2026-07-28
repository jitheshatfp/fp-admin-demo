'use client'

import { Button } from '@/components/button'
import { MemberCard } from '@/components/portal/member-card'
import { OrderCardModal } from '@/components/portal/modals/order-card-modal'
import { UploadPhotoModal } from '@/components/portal/modals/upload-photo-modal'
import { ViewFacilitiesModal } from '@/components/portal/modals/view-facilities-modal'
import { PageHero, QuickAction, SectionHeader, StatCard } from '@/components/portal/portal-ui'
import { ToastStack, usePortalToasts } from '@/components/portal/toast'
import { FAMILY, RECENT_VISITS } from '@/data-portal'
import {
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  CalendarIcon,
  CheckCircleIcon,
  CubeIcon,
  MapIcon,
  MapPinIcon,
  PauseCircleIcon,
  PhotoIcon,
  PresentationChartLineIcon,
  QrCodeIcon,
  TrophyIcon,
  UserGroupIcon,
} from '@/components/material-icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const NEARBY = [
  {
    name: 'Goodlife — Sandringham',
    type: 'Gym + Pool',
    distance: '1.2 km',
    img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=200&fit=crop',
  },
  {
    name: 'Fitness First — Bourke St',
    type: 'Premium Gym',
    distance: '0.4 km',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop',
  },
  {
    name: 'Bayside Aquatic Centre',
    type: 'Pool',
    distance: '5.2 km',
    img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=200&fit=crop',
  },
]

export function DashboardScreen() {
  const user = FAMILY[0]
  const router = useRouter()
  const { toasts, addToast } = usePortalToasts()
  const [modal, setModal] = useState<'upload-photo' | 'order-card' | 'view-facilities' | null>(null)

  return (
    <div>
      <PageHero
        eyebrow="Member dashboard"
        title={`Welcome back, ${user.firstName}.`}
        subtitle="Your family and you have unlimited access to 1,844 facilities."
        actions={
          <>
            <Button outline className="border-white/30 bg-white/15 text-white hover:bg-white/25">
              <MapPinIcon /> Find facility
            </Button>
            <Button className="bg-white text-fp-blue hover:bg-white/90" onClick={() => setModal('view-facilities')}>
              <QrCodeIcon /> Show my card
            </Button>
          </>
        }
      />

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(320px,360px)_1fr]">
        <MemberCard member={user} large />

        <div className="grid grid-cols-2 gap-3 self-start">
          <StatCard icon={CalendarIcon} label="Next payment" value="$70.00" sub="2 Jun 2026 · Fortnightly" tone="info" />
          <StatCard icon={PresentationChartLineIcon} label="Visits this month" value="14" sub="↑ 3 from last month" tone="success" />
          <StatCard icon={UserGroupIcon} label="People on plan" value="4" sub="You + partner + 2 dependants" />
          <StatCard icon={TrophyIcon} label="Membership" value="Titanium" sub="1,844 facilities unlocked" tone="brand" />

          <div className="col-span-2 rounded-xl border border-zinc-950/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
            <SectionHeader title="Quick actions" />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <QuickAction icon={PhotoIcon} label="Upload photo" onClick={() => setModal('upload-photo')} />
              <QuickAction icon={PauseCircleIcon} label="Suspend" onClick={() => router.push('/suspend')} />
              <QuickAction icon={ArrowsRightLeftIcon} label="Transfer" onClick={() => router.push('/transfer')} />
              <QuickAction icon={CubeIcon} label="Order card" onClick={() => setModal('order-card')} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
          <SectionHeader
            title="Recent activity"
            action={
              <Button plain className="text-xs">
                View all <ArrowRightIcon className="size-3" />
              </Button>
            }
          />
          <div className="grid gap-1.5">
            {RECENT_VISITS.map((v, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-zinc-950/10 py-2 last:border-b-0 dark:border-white/10"
              >
                <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-fp-blue/10 text-fp-blue">
                  <MapPinIcon className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-zinc-950 dark:text-white">
                    {v.who} · {v.facility}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{v.when}</div>
                </div>
                <CheckCircleIcon className="size-3.5 flex-none text-green-600 dark:text-green-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
          <SectionHeader
            title="Family on your membership"
            action={
              <Button outline className="text-xs" href="/member">
                <UserGroupIcon /> Manage
              </Button>
            }
          />
          <div className="grid grid-cols-2 gap-2.5">
            {FAMILY.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-2 rounded-lg border border-zinc-950/10 p-2 dark:border-white/10"
              >
                <Image
                  src={m.photo}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 flex-none rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-zinc-950 dark:text-white">{m.name}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{m.role} · Active</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-full rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
          <SectionHeader
            title="Nearby facilities"
            action={
              <Button outline className="text-xs" onClick={() => setModal('view-facilities')}>
                <MapIcon /> View all 1,844
              </Button>
            }
          />
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {NEARBY.map((f) => (
              <div
                key={f.name}
                className="overflow-hidden rounded-xl border border-zinc-950/10 transition-shadow hover:shadow-md dark:border-white/10"
              >
                <div className="h-28 bg-cover bg-center" style={{ backgroundImage: `url(${f.img})` }} />
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-bold text-zinc-950 dark:text-white">{f.name}</div>
                    <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[11px] font-semibold text-green-700 dark:text-green-400">
                      Open
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {f.type} · {f.distance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <UploadPhotoModal
        open={modal === 'upload-photo'}
        member={user}
        onClose={() => setModal(null)}
        onSave={() => {
          setModal(null)
          addToast('Photo uploaded.')
        }}
      />
      <OrderCardModal
        open={modal === 'order-card'}
        member={user}
        onClose={() => setModal(null)}
        onConfirm={() => {
          setModal(null)
          addToast('New card ordered.')
        }}
      />
      <ViewFacilitiesModal open={modal === 'view-facilities'} onClose={() => setModal(null)} />
      <ToastStack toasts={toasts} />
    </div>
  )
}
