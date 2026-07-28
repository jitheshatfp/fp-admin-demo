'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { ChangeMembershipModal } from '@/components/portal/modals/change-membership-modal'
import { EditMemberModal } from '@/components/portal/modals/edit-member-modal'
import { ViewFacilitiesModal } from '@/components/portal/modals/view-facilities-modal'
import { MemberCard } from '@/components/portal/member-card'
import { Detail, PageHero, SectionHeader } from '@/components/portal/portal-ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { FAMILY, type Member } from '@/data-portal'
import { ToastStack, usePortalToasts } from '@/components/portal/toast'
import { CheckIcon, MapPinIcon, PencilIcon, ArrowPathIcon, UserPlusIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import { useState } from 'react'

export function MemberDetailsScreen() {
  const user = FAMILY[0]
  const { toasts, addToast } = usePortalToasts()
  const [editing, setEditing] = useState<Member | null>(null)
  const [modal, setModal] = useState<'view-facilities' | 'change-plan' | null>(null)

  return (
    <div>
      <PageHero eyebrow="Account" title="Member Details" subtitle="Manage who's on your Fitness Passport membership." />

      <div className="mb-4 rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
        <SectionHeader
          title="People on this membership"
          action={
            <Button outline className="text-xs">
              <UserPlusIcon /> Add member
            </Button>
          }
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Member #</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Card</TableHeader>
              <TableHeader>
                <span className="sr-only">Actions</span>
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {FAMILY.map((m) => (
              <TableRow key={m.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={m.photo}
                      alt=""
                      width={30}
                      height={30}
                      className="size-7.5 flex-none rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-zinc-950 dark:text-white">{m.name}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">FPT.{m.memberNumber}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge>{m.role}</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">{m.memberId}</TableCell>
                <TableCell>
                  <Badge color="green">
                    <CheckIcon className="size-3" /> {m.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-zinc-500 dark:text-zinc-400">Valid {m.validThrough}</TableCell>
                <TableCell>
                  <Button plain onClick={() => setEditing(m)} aria-label="Edit">
                    <PencilIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr]">
        <MemberCard member={user} />
        <div className="rounded-xl border border-zinc-950/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
          <SectionHeader title="Membership details" />
          <div className="grid grid-cols-2 gap-3.5">
            <Detail label="Plan" value="Titanium" />
            <Detail label="Status" value={<Badge color="green">Active</Badge>} />
            <Detail label="Joined" value="08 Jan 2025" />
            <Detail label="Next billing" value="02 Jun 2026" />
            <Detail label="Employer" value="Ampol — NSW" />
            <Detail label="Cycle" value="Fortnightly · $70.00" />
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => setModal('view-facilities')}>
              <MapPinIcon /> See your facilities
            </Button>
            <Button outline onClick={() => setModal('change-plan')}>
              <ArrowPathIcon /> Change membership
            </Button>
          </div>
        </div>
      </div>

      {editing && (
        <EditMemberModal
          open
          member={editing}
          onClose={() => setEditing(null)}
          onSave={() => {
            setEditing(null)
            addToast('Profile updated.')
          }}
        />
      )}
      <ViewFacilitiesModal open={modal === 'view-facilities'} onClose={() => setModal(null)} />
      <ChangeMembershipModal
        open={modal === 'change-plan'}
        currentTier="Titanium"
        onClose={() => setModal(null)}
        onChoose={(tier) => {
          setModal(null)
          addToast(`Plan change to ${tier} scheduled.`)
        }}
      />
      <ToastStack toasts={toasts} />
    </div>
  )
}
