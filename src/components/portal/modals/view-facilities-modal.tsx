'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/dialog'
import { Input, InputGroup } from '@/components/input'
import { FunnelIcon, MagnifyingGlassIcon, StarIcon } from '@/components/material-icons'

const FACILITIES = [
  { name: 'Fitness First — Bourke St', type: 'Premium Gym', distance: '0.4 km', open: true },
  { name: 'Goodlife Health Club — Sandringham', type: 'Gym + Pool', distance: '1.2 km', open: true, favourite: true },
  { name: 'YMCA — Aspendale Gardens', type: 'Pool + Leisure', distance: '2.1 km', open: true },
  { name: 'Anytime Fitness — Mentone', type: 'Gym', distance: '3.4 km', open: true },
  { name: 'Plus Fitness — Cheltenham', type: 'Gym', distance: '4.0 km', open: false },
  { name: 'Bayside Aquatic Centre', type: 'Pool', distance: '5.2 km', open: true },
]

export function ViewFacilitiesModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} size="xl">
      <DialogTitle>Facilities included in your Titanium plan</DialogTitle>
      <DialogBody>
        <div className="mb-3 flex items-center gap-2">
          <InputGroup className="flex-1">
            <MagnifyingGlassIcon data-slot="icon" />
            <Input placeholder="Search facilities near you" />
          </InputGroup>
          <Button outline>
            <FunnelIcon /> Filter
          </Button>
        </div>
        <div className="space-y-2">
          {FACILITIES.map((f) => (
            <div
              key={f.name}
              className="flex items-center gap-3 rounded-lg border border-zinc-950/10 p-2.5 dark:border-white/10"
            >
              <span className="flex size-9 flex-none items-center justify-center rounded-lg bg-fp-blue/10 text-fp-blue">
                {f.type.includes('Pool') ? '🏊' : '🏋️'}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold text-zinc-950 dark:text-white">{f.name}</div>
                  {f.favourite && <StarIcon className="size-3 text-amber-500" />}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {f.type} · {f.distance}
                </div>
              </div>
              <Badge color={f.open ? 'green' : 'zinc'}>{f.open ? 'Open now' : 'Closed'}</Badge>
            </div>
          ))}
        </div>
      </DialogBody>
      <DialogActions>
        <span className="mr-auto text-sm text-zinc-500 dark:text-zinc-400">1,844 facilities across Australia</span>
        <Button onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  )
}
