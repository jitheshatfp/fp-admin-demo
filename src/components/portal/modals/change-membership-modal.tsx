'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import clsx from 'clsx'
import { CheckIcon, XMarkIcon } from '@/components/material-icons'

const TIERS = [
  {
    id: 'Silver',
    price: 18.5,
    facilities: 984,
    features: ['Access across your state', 'Pools & leisure centres'],
    excluded: ['Across Australia', 'Premium gyms'],
  },
  {
    id: 'Gold',
    price: 20.0,
    facilities: 1844,
    features: ['Everything in Silver', 'Access across Australia'],
    excluded: ['Premium gyms', 'HYROX, Pilates'],
  },
  {
    id: 'Titanium',
    price: 35.0,
    facilities: 1844,
    features: ['Everything in Gold', 'Premium gyms', 'HYROX, Pilates, Sauna, Spa'],
    excluded: [],
    featured: true,
  },
]

export function ChangeMembershipModal({
  open,
  currentTier,
  onClose,
  onChoose,
}: {
  open: boolean
  currentTier: string
  onClose: () => void
  onChoose: (tier: string) => void
}) {
  return (
    <Dialog open={open} onClose={onClose} size="3xl">
      <DialogTitle>Change your membership</DialogTitle>
      <DialogBody>
        <div className="grid grid-cols-3 gap-3">
          {TIERS.map((t) => {
            const current = t.id === currentTier
            return (
              <div
                key={t.id}
                className={clsx(
                  'relative rounded-xl border p-4',
                  t.featured ? 'border-2 border-fp-blue' : 'border-zinc-950/10 dark:border-white/10'
                )}
              >
                {t.featured && (
                  <Badge color="blue" className="absolute -top-2.5 left-3">
                    Most popular
                  </Badge>
                )}
                <div className="text-xs font-bold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">{t.id}</div>
                <div className="mt-1 mb-2">
                  <span className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                    ${t.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400"> /week</span>
                </div>
                <div className="mb-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                  Access to {t.facilities.toLocaleString()} facilities
                </div>
                <div className="mb-3 flex flex-col gap-1.5">
                  {t.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-zinc-950 dark:text-white">
                      <CheckIcon className="size-3.5 flex-none text-green-600 dark:text-green-400" />
                      <span>{f}</span>
                    </div>
                  ))}
                  {t.excluded.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <XMarkIcon className="size-3.5 flex-none text-red-500" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                {current ? (
                  <Button outline disabled className="w-full justify-center">
                    Current plan
                  </Button>
                ) : (
                  <Button className="w-full justify-center" onClick={() => onChoose(t.id)}>
                    Switch to {t.id}
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </DialogBody>
      <DialogActions>
        <span className="mr-auto text-sm text-zinc-500 dark:text-zinc-400">
          Changes take effect on your next billing cycle.
        </span>
        <Button plain onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
